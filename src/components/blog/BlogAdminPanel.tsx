"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { blogCategories } from "@/data";
import {
  addStoredBlogPost,
  deleteStoredBlogPost,
  formatBlogDate,
  getStoredBlogPosts,
  isBlogAdminLoggedIn,
  setBlogAdminLoggedIn,
  slugify,
  updateStoredBlogPost,
  validateBlogAdminLogin,
} from "@/lib/blog-storage";
import { getFirebaseAuth, getGoogleProvider, isFirebaseConfigured } from "@/lib/firebase";
import type { BlogPost } from "@/types";

type BlogAdminPanelProps = {
  open: boolean;
  onClose: () => void;
  onPostsChange: (posts: BlogPost[]) => void;
};

const emptyForm = {
  title: "",
  excerpt: "",
  category: blogCategories[0]?.slug ?? "car-rental-tips",
  author: "",
  image: "",
  content: "",
  readTime: "5 min read",
};

function postToForm(post: BlogPost) {
  return {
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    image: post.image,
    content: post.content.join("\n\n"),
    readTime: post.readTime,
  };
}

export function BlogAdminPanel({ open, onClose, onPostsChange }: BlogAdminPanelProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [viewPost, setViewPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setLoggedIn(isBlogAdminLoggedIn());
    setPosts(getStoredBlogPosts());
    setForm(emptyForm);
    setEditingSlug(null);
    setFormError("");
    setLoginError("");
    setEmail("");
    setPassword("");
    setViewPost(null);
    setGoogleLoading(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  function refreshPosts(next: BlogPost[]) {
    setPosts(next);
    onPostsChange(next);
  }

  function update<K extends keyof typeof emptyForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoginError("");
    if (!validateBlogAdminLogin(email, password)) {
      setLoginError("Invalid email or password.");
      return;
    }
    setBlogAdminLoggedIn(true);
    setLoggedIn(true);
  }

  async function handleGoogleLogin() {
    setLoginError("");
    if (!isFirebaseConfigured()) {
      setLoginError("Firebase is not configured. Add Firebase keys in .env.local.");
      return;
    }

    setGoogleLoading(true);
    try {
      await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      setBlogAdminLoggedIn(true);
      setLoggedIn(true);
    } catch (error) {
      const code =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code: string }).code)
          : "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        return;
      }
      if (code === "auth/unauthorized-domain") {
        setLoginError("Add this site domain in Firebase Auth → Settings → Authorized domains.");
        return;
      }
      setLoginError(code ? `Google sign-in failed (${code}).` : "Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleLogout() {
    try {
      if (isFirebaseConfigured()) {
        await signOut(getFirebaseAuth());
      }
    } catch {
      // ignore firebase logout errors for local admin session
    }
    setBlogAdminLoggedIn(false);
    setLoggedIn(false);
    setForm(emptyForm);
    setEditingSlug(null);
    setViewPost(null);
  }

  function buildPostFromForm(slug: string): BlogPost | null {
    const title = form.title.trim();
    const excerpt = form.excerpt.trim();
    const author = form.author.trim() || "Signature Team";
    const image = form.image.trim();
    const content = form.content
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!title || !excerpt || !image || content.length === 0) {
      setFormError("Please fill title, excerpt, image link, and at least one content paragraph.");
      return null;
    }

    try {
      // eslint-disable-next-line no-new
      new URL(image);
    } catch {
      setFormError("Image must be a valid link (https://...).");
      return null;
    }

    return {
      slug,
      title,
      category: form.category,
      date: formatBlogDate(),
      excerpt,
      image,
      author,
      readTime: form.readTime.trim() || "5 min read",
      content,
    };
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    if (editingSlug) {
      const post = buildPostFromForm(editingSlug);
      if (!post) return;
      const next = updateStoredBlogPost(editingSlug, post);
      refreshPosts(next);
      setForm(emptyForm);
      setEditingSlug(null);
      return;
    }

    const baseSlug = slugify(form.title.trim()) || `post-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
    const post = buildPostFromForm(slug);
    if (!post) return;

    const next = addStoredBlogPost(post);
    refreshPosts(next);
    setForm(emptyForm);
  }

  function startEdit(post: BlogPost) {
    setEditingSlug(post.slug);
    setForm(postToForm(post));
    setViewPost(null);
    setFormError("");
  }

  function cancelEdit() {
    setEditingSlug(null);
    setForm(emptyForm);
    setFormError("");
  }

  function handleDelete(slug: string) {
    if (!window.confirm("Delete this blog post?")) return;
    const next = deleteStoredBlogPost(slug);
    refreshPosts(next);
    if (editingSlug === slug) cancelEdit();
    if (viewPost?.slug === slug) setViewPost(null);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button type="button" className="absolute inset-0 bg-primary/70 backdrop-blur-sm" aria-label="Close" onClick={onClose} />

      <div className="relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-primary/8 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">Admin</p>
            <h2 id={titleId} className="font-heading text-xl font-semibold text-primary sm:text-2xl">
              {loggedIn ? "Manage Blog Posts" : "Admin Login"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {loggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-primary/10 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-[#f8f9fa]"
              >
                Logout
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 text-primary transition hover:bg-[#f8f9fa]"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {!loggedIn ? (
          <div className="mx-auto w-full max-w-md px-5 py-10 sm:px-6 sm:py-14">
            <p className="mb-6 text-sm text-muted">Sign in to add and manage blog articles.</p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-primary/15 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-[#f8f9fa] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l.1.1 6.3 5.3C39.2 37.3 44 33 44 24c0-1.3-.1-2.5-.4-3.5z" />
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-primary/10" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">or email</span>
              <span className="h-px flex-1 bg-primary/10" />
            </div>

            <form onSubmit={handleLogin}>
              <label className="mb-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                  placeholder="admin123@gmail.com"
                  required
                  autoComplete="username"
                />
              </label>
              <label className="mb-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                  placeholder="••••••"
                  required
                  autoComplete="current-password"
                />
              </label>
              {loginError ? <p className="mb-4 text-sm font-medium text-red-600">{loginError}</p> : null}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition hover:brightness-95"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 lg:grid-cols-2">
            <div className="min-h-0 overflow-y-auto border-b border-primary/8 px-5 py-5 sm:px-6 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {editingSlug ? "Edit Blog" : "Add Blog"}
                </h3>
                {editingSlug ? (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-xs font-semibold text-secondary hover:underline"
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="Best weekend drives around Islamabad"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Short Excerpt</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => update("excerpt", e.target.value)}
                    rows={2}
                    className="w-full resize-y rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="One or two lines shown on the blog card"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Category</span>
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value)}
                      className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    >
                      {blogCategories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Author</span>
                    <input
                      value={form.author}
                      onChange={(e) => update("author", e.target.value)}
                      className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                      placeholder="Signature Team"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Image Link (URL)</span>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                    className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  />
                  {form.image ? (
                    <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-primary/8 bg-[#f3f4f5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Read Time</span>
                  <input
                    value={form.readTime}
                    onChange={(e) => update("readTime", e.target.value)}
                    className="w-full rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder="5 min read"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                    Content (one paragraph per line)
                  </span>
                  <textarea
                    value={form.content}
                    onChange={(e) => update("content", e.target.value)}
                    rows={6}
                    className="w-full resize-y rounded-xl border border-primary/10 bg-[#f8f9fa] px-4 py-3 text-sm outline-none focus:border-secondary focus:bg-white focus:ring-2 focus:ring-secondary/20"
                    placeholder={"First paragraph...\n\nSecond paragraph..."}
                    required
                  />
                </label>

                {formError ? <p className="text-sm font-medium text-red-600">{formError}</p> : null}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition hover:brightness-95"
                >
                  <span className="material-symbols-outlined text-[18px]">{editingSlug ? "save" : "add"}</span>
                  {editingSlug ? "Update Blog" : "Publish Blog"}
                </button>
              </form>
            </div>

            <div className="flex min-h-0 flex-col overflow-hidden bg-[#f8f9fa]">
              <div className="border-b border-primary/8 bg-white px-5 py-4 sm:px-6">
                <h3 className="font-heading text-lg font-semibold text-primary">All Added Blogs</h3>
                <p className="mt-1 text-xs text-muted">Newest posts appear first. Edit or view details below.</p>
              </div>

              {viewPost ? (
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => setViewPost(null)}
                    className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                    Back to list
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={viewPost.image} alt={viewPost.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
                  <h4 className="font-heading text-xl font-semibold text-primary">{viewPost.title}</h4>
                  <p className="mt-2 text-xs text-muted">
                    {viewPost.date} • {viewPost.readTime} • By {viewPost.author}
                  </p>
                  <p className="mt-3 text-sm text-primary/80">{viewPost.excerpt}</p>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-primary/75">
                    {viewPost.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(viewPost)}
                      className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                    <Link
                      href={`/blog/${viewPost.slug}`}
                      onClick={onClose}
                      className="rounded-xl border border-primary/15 px-4 py-2 text-xs font-semibold text-primary"
                    >
                      Open page
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                  {posts.length === 0 ? (
                    <p className="py-10 text-center text-sm text-muted">No custom blogs yet. Add one from the left form.</p>
                  ) : (
                    <ul className="space-y-3">
                      {posts.map((post) => {
                        const category = blogCategories.find((item) => item.slug === post.category);
                        return (
                          <li
                            key={post.slug}
                            className="overflow-hidden rounded-2xl border border-primary/8 bg-white shadow-sm"
                          >
                            <div className="flex gap-3 p-3 sm:p-4">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={post.image}
                                alt=""
                                className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                              />
                              <div className="min-w-0 flex-1">
                                {category ? (
                                  <span className="text-[10px] font-semibold uppercase tracking-wide text-secondary">
                                    {category.name}
                                  </span>
                                ) : null}
                                <h4 className="mt-0.5 line-clamp-2 font-heading text-sm font-semibold text-primary sm:text-base">
                                  {post.title}
                                </h4>
                                <p className="mt-1 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                                <p className="mt-1 text-[11px] text-muted">
                                  {post.date} • {post.readTime}
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setViewPost(post)}
                                    className="rounded-lg border border-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary transition hover:bg-[#f8f9fa]"
                                  >
                                    View
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => startEdit(post)}
                                    className="rounded-lg bg-secondary/10 px-2.5 py-1.5 text-[11px] font-semibold text-secondary transition hover:bg-secondary/20"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(post.slug)}
                                    className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-red-600 transition hover:bg-red-50"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
