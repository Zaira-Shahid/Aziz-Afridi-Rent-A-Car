"use client";

import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/button-styles";
import { blogCategories, blogPosts } from "@/data";
import { getAuthUserEmail, isAllowedBlogAdminEmail } from "@/lib/blog-admin";
import { formatBlogDate, slugify } from "@/lib/blog-storage";
import {
  createFirebaseBlogPost,
  deleteFirebaseBlogPost,
  fetchFirebaseBlogPosts,
  seedStaticBlogsToFirebase,
  updateFirebaseBlogPost,
} from "@/lib/blog-firestore";
import { getFirebaseAuth, getGoogleProvider, isFirebaseConfigured } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

const INVALID_LOGIN = "Invalid login details.";

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

function isValidUrl(value: string) {
  try {
    return Boolean(new URL(value));
  } catch {
    return false;
  }
}

const inputClass =
  "block w-full min-w-0 rounded-xl border border-line bg-surface px-4 py-3 text-base text-navy-deep placeholder:text-muted focus:border-green-strong focus:bg-white sm:text-sm";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted";
const smallButton =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-3.5 text-xs font-semibold transition";

/** Blog admin: Google sign-in for allowed accounts, then create / edit / delete posts stored in Firestore. */
export function BlogAdminPanel() {
  const configured = isFirebaseConfigured();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [viewPost, setViewPost] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const postsLoading = loggedIn && !postsLoaded;

  useEffect(() => {
    if (!configured) return;
    const unsub = onAuthStateChanged(getFirebaseAuth(), async (user) => {
      if (!user) {
        setLoggedIn(false);
        setUserEmail("");
        setPostsLoaded(false);
        return;
      }

      const email = getAuthUserEmail(user);
      if (!email) {
        await signOut(getFirebaseAuth());
        setLoggedIn(false);
        setUserEmail("");
        setLoginError("Google did not return an email. Allow email permission and try again.");
        return;
      }

      if (!isAllowedBlogAdminEmail(email)) {
        await signOut(getFirebaseAuth());
        setLoggedIn(false);
        setUserEmail("");
        setLoginError(INVALID_LOGIN);
        return;
      }

      setLoggedIn(true);
      setUserEmail(email);
      setLoginError("");
    });
    return () => unsub();
  }, [configured]);

  useEffect(() => {
    if (!loggedIn) return;

    let cancelled = false;
    (async () => {
      try {
        let items = await fetchFirebaseBlogPosts();
        if (!cancelled && items.length === 0) {
          items = await seedStaticBlogsToFirebase(blogPosts);
        }
        if (cancelled) return;
        setPosts(items);
        setFormError("");
      } catch (error) {
        if (cancelled) return;
        setPosts([]);
        const code =
          typeof error === "object" && error !== null && "code" in error
            ? String((error as { code: string }).code)
            : "";
        setFormError(
          code === "permission-denied"
            ? "Firestore permission denied. Publish blogs rules in Firebase Console → Firestore → Rules."
            : "Could not load blogs from Firebase. Create Firestore Database and publish rules.",
        );
      } finally {
        if (!cancelled) setPostsLoaded(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loggedIn]);

  async function handleSeedBlogs() {
    setSeeding(true);
    setFormError("");
    try {
      setPosts(await seedStaticBlogsToFirebase(blogPosts));
    } catch {
      setFormError("Failed to sync site blogs to Firebase. Check Firestore rules.");
    } finally {
      setSeeding(false);
    }
  }

  function update<K extends keyof typeof emptyForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGoogleLogin() {
    setLoginError("");
    if (!configured) {
      setLoginError("Firebase is not configured.");
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      const email = getAuthUserEmail(result.user);

      if (!email) {
        await signOut(getFirebaseAuth());
        setLoginError("Google did not return an email. Allow email permission and try again.");
        return;
      }

      if (!isAllowedBlogAdminEmail(email)) {
        await signOut(getFirebaseAuth());
        setLoginError(INVALID_LOGIN);
        return;
      }

      setLoggedIn(true);
      setUserEmail(email);
      setLoginError("");
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
      if (configured) {
        await signOut(getFirebaseAuth());
      }
    } catch {
      // ignore
    }
    setLoggedIn(false);
    setUserEmail("");
    setPostsLoaded(false);
    setForm(emptyForm);
    setEditingSlug(null);
    setViewPost(null);
  }

  function buildPostFromForm(slug: string): BlogPost | null {
    const title = form.title.trim();
    const excerpt = form.excerpt.trim();
    const author = form.author.trim() || "Aziz Afridi Team";
    const image = form.image.trim();
    const content = form.content
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (!title || !excerpt || !image || content.length === 0) {
      setFormError("Please fill title, excerpt, image link, and at least one content paragraph.");
      return null;
    }

    if (!isValidUrl(image)) {
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

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");

    if (editingSlug) {
      const post = buildPostFromForm(editingSlug);
      if (!post) return;
      setSaving(true);
      try {
        setPosts(await updateFirebaseBlogPost(post));
        setForm(emptyForm);
        setEditingSlug(null);
      } catch {
        setFormError("Failed to update blog in Firebase. Check Firestore rules.");
      } finally {
        setSaving(false);
      }
      return;
    }

    const baseSlug = slugify(form.title.trim()) || `post-${Date.now()}`;
    const slug = `${baseSlug}-${Date.now().toString().slice(-5)}`;
    const post = buildPostFromForm(slug);
    if (!post) return;

    setSaving(true);
    try {
      setPosts(await createFirebaseBlogPost(post));
      setForm(emptyForm);
    } catch {
      setFormError("Failed to save blog in Firebase. Check Firestore rules.");
    } finally {
      setSaving(false);
    }
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

  async function handleDelete(slug: string) {
    if (!window.confirm("Delete this blog post?")) return;
    setSaving(true);
    try {
      setPosts(await deleteFirebaseBlogPost(slug));
      if (editingSlug === slug) cancelEdit();
      if (viewPost?.slug === slug) setViewPost(null);
    } catch {
      setFormError("Failed to delete blog in Firebase.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-[70vh] bg-surface py-10 sm:py-14">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-strong">Admin</p>
            <h1 className="mt-1 font-heading text-3xl font-extrabold italic text-navy-deep sm:text-4xl">
              {loggedIn ? "Manage Blog Posts" : "Admin Login"}
            </h1>
          </div>
          {loggedIn ? (
            <div className="flex items-center gap-3">
              {userEmail ? <span className="hidden max-w-[220px] truncate text-xs text-muted sm:inline">{userEmail}</span> : null}
              <button
                type="button"
                onClick={handleLogout}
                className={buttonClasses({ variant: "outline", size: "sm", pill: true })}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>

        {!loggedIn ? (
          <div className="mx-auto w-full max-w-md rounded-panel border border-line bg-white p-7 shadow-soft sm:p-9">
            <p className="mb-6 text-sm text-muted">
              Admin access is limited to authorized Google accounts. Sign in with an allowed account only.
            </p>
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className={buttonClasses({ variant: "outline", size: "lg", className: "w-full gap-3" })}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.2 19 12 24 12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l.1.1 6.3 5.3C39.2 37.3 44 33 44 24c0-1.3-.1-2.5-.4-3.5z" />
              </svg>
              {googleLoading ? "Connecting..." : "Continue with Google"}
            </button>
            {!configured ? (
              <p role="alert" className="mt-4 text-sm font-medium text-danger">
                Firebase is not configured.
              </p>
            ) : null}
            {loginError ? (
              <p role="alert" className="mt-4 text-sm font-medium text-danger">
                {loginError}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <section aria-labelledby="blog-form-title" className="rounded-panel border border-line bg-white p-5 shadow-soft sm:p-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 id="blog-form-title" className="font-heading text-lg font-bold text-navy-deep">
                  {editingSlug ? "Edit Blog" : "Add Blog"}
                </h2>
                {editingSlug ? (
                  <button type="button" onClick={cancelEdit} className="min-h-11 text-xs font-semibold text-green-strong hover:underline">
                    Cancel edit
                  </button>
                ) : null}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className={labelClass}>Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    className={inputClass}
                    placeholder="Best weekend drives around Islamabad"
                    required
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Short Excerpt</span>
                  <textarea
                    value={form.excerpt}
                    onChange={(e) => update("excerpt", e.target.value)}
                    rows={2}
                    className={cn(inputClass, "resize-y")}
                    placeholder="One or two lines shown on the blog card"
                    required
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className={labelClass}>Category</span>
                    <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputClass}>
                      {blogCategories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className={labelClass}>Author</span>
                    <input
                      value={form.author}
                      onChange={(e) => update("author", e.target.value)}
                      className={inputClass}
                      placeholder="Aziz Afridi Team"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className={labelClass}>Image Link (URL)</span>
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => update("image", e.target.value)}
                    className={inputClass}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  />
                  {form.image ? (
                    <div className="relative mt-3 h-28 overflow-hidden rounded-xl border border-line bg-surface">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                  ) : null}
                </label>

                <label className="block">
                  <span className={labelClass}>Read Time</span>
                  <input
                    value={form.readTime}
                    onChange={(e) => update("readTime", e.target.value)}
                    className={inputClass}
                    placeholder="5 min read"
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Content (one paragraph per line)</span>
                  <textarea
                    value={form.content}
                    onChange={(e) => update("content", e.target.value)}
                    rows={6}
                    className={cn(inputClass, "resize-y")}
                    placeholder={"First paragraph...\n\nSecond paragraph..."}
                    required
                  />
                </label>

                {formError ? (
                  <p role="alert" className="text-sm font-medium text-danger">
                    {formError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={saving}
                  className={buttonClasses({ variant: "green", size: "lg", pill: true, className: "w-full" })}
                >
                  <Icon name={editingSlug ? "check" : "plus"} size={18} />
                  {saving ? "Saving..." : editingSlug ? "Update Blog" : "Publish Blog"}
                </button>
              </form>
            </section>

            <section aria-labelledby="blog-list-title" className="rounded-panel border border-line bg-white p-5 shadow-soft sm:p-7">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 id="blog-list-title" className="font-heading text-lg font-bold text-navy-deep">
                    All Added Blogs
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Saved in Firebase. Newest posts appear first. ({posts.length})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSeedBlogs}
                  disabled={seeding || postsLoading}
                  className={cn(smallButton, "border border-line text-navy-deep hover:bg-surface disabled:opacity-60")}
                >
                  {seeding ? "Syncing..." : "Sync site blogs"}
                </button>
              </div>

              {viewPost ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setViewPost(null)}
                    className="mb-4 inline-flex min-h-11 items-center gap-1 text-xs font-semibold text-green-strong hover:underline"
                  >
                    <Icon name="chevron-left" size={16} />
                    Back to list
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={viewPost.image} alt={viewPost.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
                  <h3 className="font-heading text-xl font-bold text-navy-deep">{viewPost.title}</h3>
                  <p className="mt-2 text-xs text-muted">
                    {viewPost.date} • {viewPost.readTime} • By {viewPost.author}
                  </p>
                  <p className="mt-3 text-sm text-fg">{viewPost.excerpt}</p>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-fg">
                    {viewPost.content.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(viewPost)}
                      className={cn(smallButton, "bg-navy text-white hover:bg-navy-deep")}
                    >
                      Edit
                    </button>
                    <Link
                      href={`/blog/${viewPost.slug}`}
                      className={cn(smallButton, "border border-line text-navy-deep hover:bg-surface")}
                    >
                      Open page
                    </Link>
                  </div>
                </div>
              ) : postsLoading ? (
                <p role="status" className="py-10 text-center text-sm text-muted">
                  Loading blogs from Firebase...
                </p>
              ) : posts.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted">
                  {formError ? (
                    <p role="alert" className="mb-3 font-medium text-danger">
                      {formError}
                    </p>
                  ) : null}
                  No blogs in Firebase yet. Click &quot;Sync site blogs&quot; or add one from the form.
                </div>
              ) : (
                <ul className="max-h-[70vh] space-y-3 overflow-y-auto pr-1">
                  {posts.map((post) => {
                    const category = blogCategories.find((item) => item.slug === post.category);
                    return (
                      <li key={post.slug} className="overflow-hidden rounded-2xl border border-line bg-surface">
                        <div className="flex gap-3 p-3 sm:p-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24" />
                          <div className="min-w-0 flex-1">
                            {category ? (
                              <span className="text-[11px] font-bold uppercase tracking-wide text-green-strong">
                                {category.name}
                              </span>
                            ) : null}
                            <h3 className="mt-0.5 line-clamp-2 font-heading text-sm font-bold text-navy-deep sm:text-base">
                              {post.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-xs text-muted">{post.excerpt}</p>
                            <p className="mt-1 text-[11px] text-muted">
                              {post.date} • {post.readTime}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => setViewPost(post)}
                                className={cn(smallButton, "border border-line bg-white text-navy-deep hover:bg-surface")}
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => startEdit(post)}
                                className={cn(smallButton, "bg-green-strong/10 text-green-strong hover:bg-green-strong/20")}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(post.slug)}
                                className={cn(smallButton, "text-danger hover:bg-red-50")}
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
            </section>
          </div>
        )}
      </Container>
    </div>
  );
}
