import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import type { BlogPost } from "@/types";

const COLLECTION = "blogs";

function toBlogPost(id: string, data: DocumentData): BlogPost {
  return {
    slug: typeof data.slug === "string" ? data.slug : id,
    title: String(data.title ?? ""),
    category: String(data.category ?? ""),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    image: String(data.image ?? ""),
    author: String(data.author ?? ""),
    readTime: String(data.readTime ?? ""),
    content: Array.isArray(data.content) ? data.content.map(String) : [],
    tips: Array.isArray(data.tips) ? data.tips.map(String) : undefined,
    cta: typeof data.cta === "string" ? data.cta : undefined,
  };
}

export async function fetchFirebaseBlogPosts(): Promise<BlogPost[]> {
  const q = query(collection(getFirebaseDb(), COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((item) => toBlogPost(item.id, item.data()));
}

export async function fetchFirebaseBlogPost(slug: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(getFirebaseDb(), COLLECTION, slug));
  if (!snap.exists()) return null;
  return toBlogPost(snap.id, snap.data());
}

export async function createFirebaseBlogPost(post: BlogPost) {
  await setDoc(doc(getFirebaseDb(), COLLECTION, post.slug), {
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    excerpt: post.excerpt,
    image: post.image,
    author: post.author,
    readTime: post.readTime,
    content: post.content,
    tips: post.tips ?? null,
    cta: post.cta ?? null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return fetchFirebaseBlogPosts();
}

export async function updateFirebaseBlogPost(post: BlogPost) {
  const ref = doc(getFirebaseDb(), COLLECTION, post.slug);
  const existing = await getDoc(ref);
  await setDoc(
    ref,
    {
      slug: post.slug,
      title: post.title,
      category: post.category,
      date: post.date,
      excerpt: post.excerpt,
      image: post.image,
      author: post.author,
      readTime: post.readTime,
      content: post.content,
      tips: post.tips ?? null,
      cta: post.cta ?? null,
      updatedAt: serverTimestamp(),
      createdAt: existing.exists() ? (existing.data().createdAt ?? serverTimestamp()) : serverTimestamp(),
    },
    { merge: true },
  );
  return fetchFirebaseBlogPosts();
}

export async function deleteFirebaseBlogPost(slug: string) {
  await deleteDoc(doc(getFirebaseDb(), COLLECTION, slug));
  return fetchFirebaseBlogPosts();
}
