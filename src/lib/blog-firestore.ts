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
  Timestamp,
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

function createdAtMs(post: BlogPost, index: number) {
  const parsed = Date.parse(post.date);
  if (!Number.isNaN(parsed)) return parsed;
  return Date.now() - index * 60_000;
}

export async function fetchFirebaseBlogPosts(): Promise<BlogPost[]> {
  const db = getFirebaseDb();
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((item) => toBlogPost(item.id, item.data()));
  } catch {
    const snap = await getDocs(collection(db, COLLECTION));
    return snap.docs
      .map((item) => toBlogPost(item.id, item.data()))
      .sort((a, b) => createdAtMs(b, 0) - createdAtMs(a, 0));
  }
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

/** Upload all site blog posts into Firestore (merge by slug). */
export async function seedStaticBlogsToFirebase(posts: BlogPost[]) {
  const db = getFirebaseDb();

  await Promise.all(
    posts.map(async (post, index) => {
      const ref = doc(db, COLLECTION, post.slug);
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
          createdAt: existing.exists()
            ? (existing.data().createdAt ?? Timestamp.fromMillis(createdAtMs(post, index)))
            : Timestamp.fromMillis(createdAtMs(post, index)),
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
    }),
  );

  return fetchFirebaseBlogPosts();
}
