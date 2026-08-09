import type { BlogPost } from "@/types";

const STORAGE_KEY = "signature-blog-posts";
const AUTH_KEY = "signature-blog-admin";

export const BLOG_ADMIN_EMAIL = "admin123@gmail.com";
export const BLOG_ADMIN_PASSWORD = "123";

export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function getStoredBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BlogPost[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredBlogPosts(posts: BlogPost[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/** Newest posts first. */
export function addStoredBlogPost(post: BlogPost) {
  const existing = getStoredBlogPosts();
  const next = [post, ...existing.filter((item) => item.slug !== post.slug)];
  saveStoredBlogPosts(next);
  return next;
}

export function updateStoredBlogPost(slug: string, patch: Omit<BlogPost, "slug"> & { slug?: string }) {
  const existing = getStoredBlogPosts();
  const next = existing.map((item) =>
    item.slug === slug ? { ...item, ...patch, slug: item.slug } : item,
  );
  saveStoredBlogPosts(next);
  return next;
}

export function deleteStoredBlogPost(slug: string) {
  const next = getStoredBlogPosts().filter((item) => item.slug !== slug);
  saveStoredBlogPosts(next);
  return next;
}

export function getStoredBlogPost(slug: string) {
  return getStoredBlogPosts().find((post) => post.slug === slug);
}

export function formatBlogDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function isBlogAdminLoggedIn() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

export function setBlogAdminLoggedIn(value: boolean) {
  if (value) {
    window.localStorage.setItem(AUTH_KEY, "1");
  } else {
    window.localStorage.removeItem(AUTH_KEY);
  }
}

export function validateBlogAdminLogin(email: string, password: string) {
  return (
    email.trim().toLowerCase() === BLOG_ADMIN_EMAIL &&
    password === BLOG_ADMIN_PASSWORD
  );
}
