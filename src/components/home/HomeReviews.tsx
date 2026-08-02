import Image from "next/image";
import { Container } from "@/components/ui/Container";

const REVIEWS = [
  {
    quote:
      "The seamless booking process and the impeccable condition of the car made my Islamabad business trip absolutely perfect. Signature truly understands luxury service.",
    name: "Marcus Sterling",
    role: "CEO, Sterling Financial",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6NRWxH-iS-tUV8NYO5ob2C-49Quw4nm2XLYDdReyrW8QEwqV-7kayIXQBwQ1k0ovdpiyHMTErzkge7raljv1o-_QvT9sUwIBy9KX_-LA4zxEZtSvXAXMpOc32M5oU8r0JUnrDGlIoSDdPoPuUTJVCR4KNDHTfSUnFad1dSZ3RzhzU3c-nUTQDzU2h43XmJVkGqlnGHJ8HMfvn7mVWw8cQ0vO07kRKVLqEzsT8ERqXDSrreaDGF2_K",
  },
  {
    quote:
      "Renting a Fortuner for our anniversary trip to Murree was a dream. The team handled every detail. Exceptional service from start to finish.",
    name: "Elena Rodriguez",
    role: "Fashion Director",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXvbKarYODQ509NNvJBY_3OAowalzSlc9vDW22u6tcJ65LVwhp8zFrSB4mlmZgGySAfJyPlCkPEYOw86Oh2gwLLz8TAx4YLCXczQZkJ-T8ExXx2kzBp2xuin2L-NWhfB3hjIjUFKf9BG0oWVMRp1HqxdKltPOyjf5KkM5_pIaZsi8wLK0LQrN3KkxqLRH_OqCgJTyl2tomuwvAfhSByXPdVtZt7K7veK33X7Tl67PO49Yi8aTwQeim",
  },
  {
    quote:
      "Prompt delivery and pickup right at my hotel. The car was even more beautiful than in the photos. I will never use another rental service.",
    name: "Julian Thorne",
    role: "Tech Founder",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCV8yRgx55LnMPw0FiSeVAumr6y25BjyNw2ckKYz6FMDRNtzCuh63GA0UbE3T7plot5Mc9Aq2PvkP_tGUuUs4crLIFwxiI0x13d9_0_33JODUCzdpyn8oUfxi7sExy_DzIwRKmoSKsbDkitDuJdCPhvIjpdX_efWCsp7Q5uKo5Av1YdvEL1gI7Olqat76HHSP3IuY4Q4_nPVY5acEgwGcX28d2PU1fzpPJTJX94mEiPapuvKuf5z4GB",
  },
];

export function HomeReviews() {
  return (
    <section className="overflow-hidden py-16 sm:py-24 lg:py-[100px]">
      <Container>
        <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight sm:mb-16 sm:text-left sm:text-4xl">
          What Our Discerning
          <br className="hidden sm:block" /> Clients Say
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((item) => (
            <article
              key={item.name}
              className="luxury-card-shadow rounded-2xl border border-white/50 bg-[#edeeef] p-6 sm:p-8"
            >
              <div className="mb-6 flex gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="mb-8 text-sm italic leading-relaxed text-muted sm:text-base">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold sm:text-base">{item.name}</h4>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
