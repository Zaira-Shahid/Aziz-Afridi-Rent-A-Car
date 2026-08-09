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
