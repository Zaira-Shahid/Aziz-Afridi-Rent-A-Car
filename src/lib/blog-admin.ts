import type { User } from "firebase/auth";

/** Only these Google accounts can manage blogs. */
export const BLOG_ADMIN_EMAILS = [
  "ulainnoor957@gmail.com",
  "developerx.org@gmail.com",
  "signaturesrentacar@gmail.com",
  "xfirebasc@gmail.com",
] as const;

export function getAuthUserEmail(user: User | null | undefined) {
  if (!user) return null;
  if (user.email?.trim()) return user.email.trim().toLowerCase();
  const fromProvider = user.providerData.find((item) => item.email?.trim())?.email;
  return fromProvider?.trim().toLowerCase() ?? null;
}

export function isAllowedBlogAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return BLOG_ADMIN_EMAILS.some((allowed) => allowed.toLowerCase() === normalized);
}
