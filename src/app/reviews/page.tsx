import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Customer reviews and testimonials for Signature Rent A Car.",
};

const HERO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0KMKhRNrVTWjs6lo2c5IpQiTRMm4yN05WhPyEApAC8nEZH_q-Xki_olgfUckmoavNUnXYFxnIpnhl_U15wSjcpsjixHrbxZMT2JI9skG4qoQOqbNavHQBNGr34B4OtJuKMRFwUgj7FV-T9uHItfApXOYv57c_f6LILs-v5KvfcqETwMgtok1RXunj_QYj8tpmVm781mZeFaDy_PvDAM5hoa3PRts2nfsmN3Th-t1_0y1Aza-JdutX";

const FEATURED_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBCiCdpmNPgWu1RLbTSrtTecjjP7BZFxMt2wDWnClnja6XQW0-7ec0ihnUHota9y6PLfcEfsxrAMriNZ-TFrHZwkaPUY541-CUIOjEMFToDY2M7eaENE0M7Cp_KegBT3UkuT-DMvqlQaL9NHJpB1K86vXpjZOlqDnjw0DwTJWcOqyPF2_Q7yalBQkqZg2_B3bQFyTIOo1eib0GCJFmyDk5UL_LpZ1g_1EaiFDOZvcCARNur6YHTok-o";

const STATS = [
  { icon: "stars", value: "4.9/5", label: "Average Rating" },
  { icon: "groups", value: "15k+", label: "Total Customers" },
  { icon: "verified", value: "48k+", label: "Successful Trips" },
  { icon: "location_city", value: "12+", label: "Cities Served" },
];

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    location: "London, UK",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-jH65fFHbwxazcRaJoXnjpigOC5mkNfdl-JCt4-yEaLUcT2NoiKAoZ3EWR3PKQ1qdDMlDFCBcPHT0xAFVhlc8BC0vvtBHBMwZFDah2cqsS8a32r6koYMrb-jsKeXWvmU2Wf06CcF3K71eRXBwOn6e6UayvzMvleBVHvmqQC0KWPchrAHhsc-mOPv4yhGzfGT5vRF4q8XiCGAOkWjqmMOut7IN01DH6s16bvXhtUPZsUV8VEqkDzCb",
    quote:
      "Incredible attention to detail. I needed a chauffeur-driven Rolls Royce for a gala, and the service was impeccable. Professional and punctual.",
    rented: "Rented: Rolls Royce Ghost",
  },
  {
    name: "Marcus Chen",
    location: "Singapore",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBD54XqtGHkbo4g4zNUrmodU-6YdgmYlyKUVgq7TyMfo6KlFeydq-nYKTeZg2wamx_hehkH0jy7T6jdtUCpA2gESjFJOzB2qv67sDlS0I4nMtPyEQv8M5W5gdHaC4NG_vvpyMgk81A_omTl_xRLM_1u0cctkK61mlVsiXRv7nWPsKOJ_rPUiYKR85lI3r0S7LhpveEKIbXIcM3L-zvQGa-gHnUVkFtL_2pHc-swyxffdTKlRhDDQVr",
    quote:
      "The Porsche 911 GT3 was in mint condition. The delivery was right on time at my hotel. Truly a premium experience for car enthusiasts.",
    rented: "Rented: Porsche 911 GT3",
  },
  {
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBn0DsNeEZCHYmAmI82noo3Zh7NUkEiBW_6eCigHvgvykOvlTkfyliZkAHmxg5hUglA5JO1vD5kUClDEBvmNBcJkUhRtROFCLsFzM_diRKSRv6TR_9IDR9Q6NWNoRHguI3oiLrK7oo9qHH9KUNDl3A36ejimt-D7LvJU-JTTuTralOjJ6OANsqG5Q0AXJUmalIUIM5UxLCeWnJwxbWa-t_yFMpGwZTgI-h6xX4d9sMpzM8kqwUDSeMj",
    quote:
      "Best car rental service in the city. The Range Rover was perfect for our family mountain retreat. Luxurious, clean, and powerful.",
    rented: "Rented: Range Rover Autobiography",
  },
  {
    name: "Bilal Aslam",
    location: "Islamabad, Pakistan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC7JEVuwNoVXmUgTPjzQ6AlK4p2DSLM9JmzzzLCOYK2qECyGQp_lfzuByd7St9d-SpaOhWC6bXWPLykbjFGi7-_z9jiRce3k50XGTtbm1r_jgCyrcEaGPiPy8j4sC-x9ifhD7rbdKxEkFFQJ_71H0b83oh2S8reeXn6XieGR70lMO7j1HUzbYo67SUD3rs-4OMMFVd0LrrJUPPW-dHbxXjNV7uv_T5KOW0X-gbULQDZAczUN31wAVGr",
    quote:
      "Booked a monthly corporate lease for our sales team. Invoicing was simple, the fleet was reliable, and support was always a WhatsApp message away.",
    rented: "Rented: Corporate Sedan Fleet",
  },
  {
    name: "Ayesha Malik",
    location: "Lahore, Pakistan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDkhJ8xVigWRxdITDWuF9wO4gF-nEWyT0_A1Ae0P3S_p5vySH_HUItr5yCnZFMDgEA63U49wbUzop4CqsestBI9sH9qL2CiXsLCJfl_fyAw6BhSjL9sawAdh5gTlwCIu57jN_jhRyqdlr7uytlAy83-yyhpdrK_SUvIna3vpY95T0SEBtmsWgLhcFMrPvI3hjavwyO3cg1Au58O0LKaWHhtf-zVrPp1WD_H4-_lhliO2HJs8v7rMwgk",
    quote:
      "Our wedding convoy was flawless — three decorated cars arrived on time, spotless, and the drivers were incredibly courteous all day.",
    rented: "Rented: Wedding Car Package",
  },
  {
    name: "Usman Tariq",
    location: "Hunza, Pakistan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3yi3-6EYniRfyW6rYApkWKB49Sfy_R3CMb8OOyrQMsHKMjBVaiIxMUJ_XID05A48V5wtvs53OcaUOc57yQvz5oetAO7Od1pFQNeybIrM2MdSBrvfh5mjpLKEgaFNIGyykXQ7x85zUxikcZcjEyFrnrG3-tNUjYdjqLcRMuArYHRpw6vhuDjOk9kg5EXEx8HJVnOtWjDGaTDxUnSECUd7BM7RL4ww3KBQL5677sMw00unpuP_3EJX4",
    quote:
      "Rented a 4x4 for our Hunza and Skardu circuit. The vehicle handled the mountain passes with ease and the driver knew every rest stop along the way.",
    rented: "Rented: 4x4 SUV",
  },
];

const PLATFORM_RATINGS = [
  { icon: "reviews", value: "4.9/5", label: "Google Reviews" },
  { icon: "share", value: "62%", label: "WhatsApp Referrals" },
  { icon: "repeat", value: "78%", label: "Repeat Clients" },
];

const VIDEO_TESTIMONIALS = [
  {
    name: "David's Weekend Escape",
    car: "Bentley Continental GT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlWOlOtXqryy0vSVM80bM_LdZsIsHLILjtSe-SE8JHlaaU7R-bpaKUfvK4DGZbSMEuoxQX31IvSAxgqUKk6iOQJsYE2AegRUgHvYJhlBHjJlJ_2gUlcycISAhoijc82AK9bC3tP1b3onlAXmXP4OZAN2dUfC4YaRWDhPXh3nprimOMJg6ez-FRuy0wciIcl37WerZMPbQn7JNlMpT4twGUya5ZjO6y2RvKPfNXFvDbmCNz7yNaIZdx",
  },
  {
    name: "Sophia's Business Trip",
    car: "Mercedes-Benz S-Class",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCwOeLUXZOq9qJf7hVierud0NcQiT2VHU_FPCcpGgXQ9BV-z3LvBWeOtcBT91TI8zSGZ7sG1Xg-ZH_HMYfTgrasTHkvYNcpzlXakjBkI7KajxPAPQBuiOgGcA7w0oHS54uNAAs3rYVH4TMh8HRAvKqsaqHEGzZ8pWBJ0Y2JkG6on3kVyXqijbu7OngaB5UqCUnJcY0kacaqLpsVl7xF-m3FDGpb-Ux1NiYy1Lw-vExmtQwx3SHUujCq",
  },
  {
    name: "The Executive Experience",
    car: "BMW 7 Series",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiMjtlqzuhkeZVPwq55VAosnhsnMYaZoJ50IAFTU9-VmsKVoh3ZkJqsbZsXg0ksytcbHFUgyUwF0SBT3xYskNsvsTyzIU-7hJ4zzWhj6mxpKviGcIvpBcsrK3TwO0W0wS2dPga73fKW7X9FGrROpL-aB3qQim2CiSWk9QAQekkQPgyPUh_7lh2Rlke0sxcKKTJCtX1LXcLfhvF_VGeBofDKgUrbf2ggpGyzpttG004YUuy792XX6TZ",
  },
];

function Stars({ className = "text-secondary" }: { className?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`material-symbols-outlined text-sm ${className}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <header className="relative flex min-h-[320px] items-center justify-center overflow-hidden py-16 sm:min-h-[420px] sm:py-20 lg:min-h-[520px]">
        <Image src={HERO} alt="Luxury sedan on a city street at twilight" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-primary/50" />
        <div className="relative z-10 px-4 text-center">
          <nav className="mb-4 flex justify-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/80 sm:mb-6 sm:text-xs">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Reviews</span>
          </nav>
          <h1 className="mx-auto max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            What Our Customers Say
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 sm:text-base lg:text-lg">
            Experience the standard of excellence that keeps our elite clientele returning for every journey.
          </p>
        </div>
      </header>

      <Container className="relative z-20 -mt-16 sm:-mt-20">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/90 p-5 text-center shadow-[0_10px_30px_rgba(14,28,46,0.08)] backdrop-blur transition hover:-translate-y-1 sm:p-8"
            >
              <span className="material-symbols-outlined mb-3 text-3xl text-secondary sm:mb-4 sm:text-4xl">{item.icon}</span>
              <h3 className="font-heading text-2xl font-bold text-primary sm:text-3xl">{item.value}</h3>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted sm:text-xs">{item.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-8 sm:mt-10">
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-primary/8 bg-white py-6 sm:flex-row sm:gap-12 sm:py-7">
          {PLATFORM_RATINGS.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-secondary">{item.icon}</span>
              <div>
                <span className="font-heading text-lg font-bold text-primary">{item.value}</span>
                <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-muted">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="flex flex-col overflow-hidden rounded-2xl bg-navy text-white shadow-2xl lg:flex-row">
            <div className="relative h-72 lg:h-auto lg:w-1/2">
              <Image src={FEATURED_IMAGE} alt="Entrepreneur beside a luxury supercar" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:w-1/2 lg:p-16">
              <Stars className="text-accent" />
              <blockquote className="mt-6 font-heading text-2xl italic leading-snug text-white sm:text-3xl">
                &ldquo;The level of service provided by Signature is unparalleled. From the seamless booking process to
                the pristine condition of the Lamborghini Urus, every detail was handled with absolute precision.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-1 w-12 bg-accent" />
                <div>
                  <p className="font-heading text-lg font-semibold">Alexander Thorne</p>
                  <p className="text-sm text-white/60">CEO, Nexus Enterprises | Rented: Lamborghini Urus</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f3f4f5] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Real Journeys, Real Stories</h2>
              <p className="mt-4 max-w-xl text-muted sm:text-lg">
                Join the thousands of satisfied clients who trust us with their most important travel needs.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-primary transition hover:brightness-95 sm:self-auto"
            >
              Share Your Experience
              <span className="material-symbols-outlined">rate_review</span>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="group rounded-2xl border border-primary/8 bg-white p-8 shadow-sm transition hover:border-secondary/40"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
                    <Image src={review.image} alt={review.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold">{review.name}</h4>
                    <p className="text-xs text-muted">{review.location}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <Stars />
                </div>
                <p className="mb-6 leading-relaxed text-primary/80">&ldquo;{review.quote}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-primary/8 pt-6">
                  <span className="text-xs font-semibold text-muted">{review.rented}</span>
                  <span className="material-symbols-outlined text-primary/30">verified_user</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Transparency
              </span>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                How We Collect Feedback
              </h2>
              <p className="mt-5 text-base text-muted sm:text-lg">
                Every review on this page comes from a verified booking. After each trip, our concierge team
                follows up by WhatsApp or phone to ask a few short questions, and we invite clients to leave a
                public rating on Google. We don&apos;t edit or filter quotes — only lightly trim them for
                length — so what you read here reflects real experiences with our fleet and drivers.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-primary/8 bg-[#f3f4f5] p-6 text-center">
                <span className="material-symbols-outlined mb-3 text-3xl text-secondary">task_alt</span>
                <p className="text-sm font-semibold text-primary">Verified Bookings Only</p>
              </div>
              <div className="rounded-2xl border border-primary/8 bg-[#f3f4f5] p-6 text-center">
                <span className="material-symbols-outlined mb-3 text-3xl text-secondary">forum</span>
                <p className="text-sm font-semibold text-primary">Post-Trip Follow-Up</p>
              </div>
              <div className="rounded-2xl border border-primary/8 bg-[#f3f4f5] p-6 text-center">
                <span className="material-symbols-outlined mb-3 text-3xl text-secondary">edit_off</span>
                <p className="text-sm font-semibold text-primary">Unedited Quotes</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#f3f4f5] py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight sm:mb-16 sm:text-4xl">
            Video Testimonials
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {VIDEO_TESTIMONIALS.map((video) => (
              <div key={video.name} className="group relative aspect-video overflow-hidden rounded-2xl bg-primary">
                <Image
                  src={video.image}
                  alt={video.name}
                  fill
                  className="object-cover opacity-60 transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition group-hover:bg-accent group-hover:text-primary sm:h-20 sm:w-20">
                    <span className="material-symbols-outlined text-3xl text-white group-hover:text-primary sm:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="text-sm font-semibold">{video.name}</p>
                  <p className="text-xs text-white/70">{video.car}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Container>
          <div className="relative overflow-hidden rounded-[28px] bg-primary px-6 py-14 text-center sm:rounded-[40px] sm:px-12 sm:py-20 md:px-24">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">Ready for a Signature Experience?</h2>
              <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
                Don&apos;t just take their word for it. Book your premium vehicle today and discover why we are the
                preferred choice for luxury rentals.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <ButtonLink href="/contact" variant="accent" size="lg">
                  Book Your Premium Ride Today
                </ButtonLink>
                <ButtonLink
                  href="/cars"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:border-secondary hover:text-secondary"
                >
                  View Fleet
                </ButtonLink>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          </div>
        </Container>
      </section>
    </>
  );
}
