import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data";

/** Heading on top, then tall cards: date and title above the photo, photo with one large rounded corner, excerpt below. */
export function HomeBlog() {
  return (
    <Section tone="white">
      <Reveal>
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <SectionHeading
            eyebrow="Blog"
            title="Travel guides & tips"
            description="Useful reads for planning city trips and mountain getaways."
          />
          <ButtonLink href="/blog" variant="outline" pill size="md" className="shrink-0">
            View Blog
            <Icon name="arrow-right" size={18} />
          </ButtonLink>
        </div>
      </Reveal>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(0, 6).map((post, index) => (
          <li key={post.slug}>
            <Reveal delay={(index % 3) * 80} className="h-full">
              <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-soft transition duration-300 hover:shadow-lift sm:p-6">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-green-strong">
                  <Icon name="calendar" size={14} />
                  {post.date}
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
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition duration-700 motion-safe:group-hover:scale-105"
                  />
                </Link>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex min-h-11 w-fit items-center gap-1.5 text-sm font-bold text-green-strong transition-all hover:gap-3"
                >
                  Read more
                  <Icon name="arrow-right" size={16} />
                </Link>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
