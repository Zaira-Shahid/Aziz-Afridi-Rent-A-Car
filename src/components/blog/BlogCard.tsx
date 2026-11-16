import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPost } from "@/types";
import { BlogPostImage } from "./BlogPostImage";

type BlogCardProps = {
  post: BlogPost;
  /** Category name shown as a badge on the photo. */
  categoryName?: string;
  index?: number;
};

/** Tall card: date and title above the photo, photo with one large rounded corner, excerpt and "Read More" below. */
export function BlogCard({ post, categoryName, index = 0 }: BlogCardProps) {
  return (
    <Reveal delay={(index % 3) * 80} className="h-full">
      <article className="group flex h-full flex-col rounded-card border border-line bg-white p-5 shadow-soft transition duration-300 hover:shadow-lift sm:p-6">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-green-strong">
          <Icon name="calendar" size={14} />
          {post.date} <span aria-hidden="true">•</span> {post.readTime}
        </p>
        <h3 className="mt-2 font-heading text-xl font-extrabold italic leading-snug text-navy-deep">
          <Link href={`/blog/${post.slug}`} className="hover:text-green-strong">
            {post.title}
          </Link>
        </h3>

        <Link
          href={`/blog/${post.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative mt-4 block aspect-[4/3] overflow-hidden rounded-xl rounded-tr-[4.5rem] bg-navy-deep"
        >
          <BlogPostImage
            src={post.image}
            alt=""
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="transition duration-700 motion-safe:group-hover:scale-105"
          />
          {categoryName ? (
            <span className="absolute left-3 top-3 rounded-full bg-green-strong px-3 py-1 text-xs font-semibold text-white shadow-soft">
              {categoryName}
            </span>
          ) : null}
        </Link>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-bold text-green-strong transition-all hover:gap-3"
        >
          Read More
          <Icon name="arrow-right" size={16} />
        </Link>
      </article>
    </Reveal>
  );
}
