import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const GOOGLE_REVIEWS = [
  {
    name: "Ahmed Khan",
    date: "12 July 2026",
    initials: "AK",
    rating: 5,
    text: "Excellent service from Aziz Afridi. Booked a Fortuner for Murree and the car was spotless, delivered on time, and the WhatsApp support was very helpful throughout.",
  },
  {
    name: "Sara Malik",
    date: "3 July 2026",
    initials: "SM",
    rating: 5,
    text: "Rented a Corolla for Islamabad airport pickup. Smooth booking, fair pricing, and the driver was professional. Highly recommend for family trips.",
  },
  {
    name: "Usman Raza",
    date: "28 June 2026",
    initials: "UR",
    rating: 5,
    text: "Best car rental experience in Islamabad. Monthly rental for our office was easy to arrange and the cars were always well maintained.",
  },
];

/** Avatar circle colors, taken from the brand palette. */
const avatarColors = ["bg-navy", "bg-green-strong", "bg-navy-deep"];

function GoogleMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function Stars({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Icon key={index} name="star" size={size} className={index < count ? "text-green" : "text-line"} />
      ))}
    </div>
  );
}

export function HomeReviews() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          title="What Our Clients Say"
          description="Real Google reviews from customers who booked with Aziz Afridi."
          align="center"
        />
      </Reveal>

      <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10">
        <div className="flex items-center gap-2 text-sm" aria-hidden="true">
          <span className="inline-flex min-h-9 items-center gap-2 rounded-full bg-navy px-4 font-semibold text-white">
            <GoogleMark className="h-4 w-4" />
            Google
          </span>
          <span className="inline-flex min-h-9 items-center rounded-full border border-line px-4 text-muted">
            All reviews
          </span>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <GoogleMark className="h-7 w-7" />
            <span className="text-lg font-bold text-navy-deep">Excellent</span>
            <Stars count={5} />
            <span className="text-sm font-semibold text-navy-deep">4.9</span>
            <span className="text-sm text-muted">| 895 reviews</span>
          </div>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-sm font-bold text-green-strong underline-offset-4 hover:underline"
          >
            Write a review
          </a>
        </div>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {GOOGLE_REVIEWS.map((review, index) => (
          <li key={review.name}>
            <Reveal delay={index * 100} className="h-full">
              <article className="relative flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-soft sm:p-7">
                <Icon name="quote" size={40} className="text-green/40" />
                <p className="mt-4 flex-1 text-base leading-relaxed text-fg">{review.text}</p>
                <Link
                  href="/reviews"
                  className="mt-3 inline-flex min-h-11 w-fit items-center text-sm font-bold text-green-strong hover:underline"
                >
                  Read more
                </Link>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-5">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white",
                        avatarColors[index % avatarColors.length],
                      )}
                    >
                      {review.initials}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-navy-deep">{review.name}</h3>
                      <p className="text-xs text-muted">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Stars count={review.rating} size={16} />
                    <GoogleMark className="h-4 w-4" />
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link
          href="/reviews"
          className="inline-flex min-h-11 items-center text-sm font-bold text-navy-deep underline-offset-4 hover:text-green-strong hover:underline"
        >
          Read all reviews
        </Link>
      </div>
    </Section>
  );
}
