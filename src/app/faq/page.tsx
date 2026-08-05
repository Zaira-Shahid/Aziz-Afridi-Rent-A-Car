import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { brand } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, payments, drivers, and airport pickups with Signature Rent A Car.",
  path: "/faq",
  keywords: ["car rental FAQ", "booking questions"],
});


const CONCIERGE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPLC4kkZB9hmXBWeY7xb-LD71vqjB--zSCe2BgORa44v6Wa1G35kb4aWmh_0ZoAKbIRJpD9_YH60280I2uDRdcQcKxbgpe5OPglHKzuKkip27reb4jUgZL55uCbCOkOmLKakBaK11ok5oBoVXP9fAY1t4Qqj1iU929DCEK9FyGcFsqTp0Sqn4KciEmQxf1Mo1pdG4waynxIGvH8GsoYcU_Ghp4Nd6bykfB4xkCn62fbptmogK3dnRX";

const CATEGORIES = [
  { slug: "general", label: "General" },
  { slug: "booking", label: "Booking" },
  { slug: "rental", label: "Car Rental" },
  { slug: "payment", label: "Payment" },
  { slug: "services", label: "Driver Services" },
  { slug: "airport", label: "Airport Pickup" },
];

const FAQS = [
  {
    category: "general",
    question: "Which cities do you cover?",
    answer:
      "We cover Islamabad, Rawalpindi, Lahore, Karachi, and major tourist destinations including Murree, Naran, Hunza, and more.",
  },
  {
    category: "general",
    question: "Do you offer 24/7 customer support?",
    answer: "Yes. Our concierge team is available around the clock via phone and WhatsApp for bookings and urgent support.",
  },
  {
    category: "general",
    question: "Is there a mileage limit on rentals?",
    answer:
      "Standard rentals include 200km/day. Corporate and monthly packages can be customized for unlimited mileage on request.",
  },
  {
    category: "general",
    question: "Can I add an additional driver to my booking?",
    answer: "Yes, additional drivers can be added at the time of booking with a valid license and identification.",
  },
  {
    category: "general",
    question: "Do you rent cars to tourists visiting Pakistan?",
    answer:
      "Yes. Tourists can rent self-drive or chauffeur-driven vehicles with a valid passport and an international driving permit or license from their home country.",
  },
  {
    category: "general",
    question: "What happens if the car breaks down during my rental?",
    answer:
      "Call our 24/7 support line immediately. We arrange a replacement vehicle or roadside assistance as quickly as possible at no extra cost, subject to the terms of your agreement.",
  },
  {
    category: "booking",
    question: "How can I book a car?",
    answer:
      "Booking your Signature vehicle is effortless. Browse our fleet online, select your desired dates and location, and confirm through our secure form. Alternatively, contact our concierge via WhatsApp or phone for a personalized booking experience.",
  },
  {
    category: "booking",
    question: "What documents are required to book a car?",
    answer:
      "A valid CNIC or Passport, along with a locally or internationally recognized driving license, is required for all bookings.",
  },
  {
    category: "booking",
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, reservations can be modified or cancelled free of charge up to 24 hours before pickup. Contact our concierge team to make changes.",
  },
  {
    category: "booking",
    question: "How far in advance should I book?",
    answer:
      "For standard bookings, a few hours' notice is often enough. For weddings, corporate fleets, or peak-season northern trips, we recommend booking 3-7 days ahead to guarantee your preferred vehicle.",
  },
  {
    category: "booking",
    question: "Can I book on behalf of someone else?",
    answer:
      "Yes. You can arrange and pay for a rental for a family member or guest — just ensure the actual driver's documents are shared before pickup.",
  },
  {
    category: "rental",
    question: "Do you offer self-drive and with-driver options?",
    answer: "Yes. You can book self-drive or chauffeur-driven cars depending on your trip, city, and preferred vehicle.",
  },
  {
    category: "rental",
    question: "Can I rent a car for a week or a month?",
    answer:
      "Yes. We offer daily, weekly, and monthly packages with better rates for longer durations — ideal for corporate and family use.",
  },
  {
    category: "rental",
    question: "Is fuel included in the rental price?",
    answer:
      "We operate on a full-to-full fuel policy — your vehicle is delivered with a full tank and should be returned the same way. Daily rates typically exclude fuel unless stated otherwise.",
  },
  {
    category: "rental",
    question: "Is insurance included in the price?",
    answer:
      "Yes, all our rentals include comprehensive insurance coverage with a standard excess. Premium protection packages are available for additional peace of mind.",
  },
  {
    category: "rental",
    question: "Can I take the rented car outside the city?",
    answer:
      "Yes, out-of-city and intercity trips are allowed on most rentals. Northern route trips require a 4x4-suitable vehicle, which our team will help you select.",
  },
  {
    category: "rental",
    question: "What is your policy on late returns?",
    answer:
      "A grace period of 30-60 minutes is typically allowed. Extended delays are billed at a prorated daily rate — let us know in advance if you need extra time.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer: "We accept cash, major debit/credit cards, and bank transfers. Corporate clients can arrange monthly invoicing.",
  },
  {
    category: "payment",
    question: "Is a security deposit required?",
    answer: "Yes, a refundable security deposit is required at pickup. The amount depends on the vehicle category.",
  },
  {
    category: "payment",
    question: "Do you offer discounts for long-term rentals?",
    answer: "Yes. Weekly and monthly packages come with reduced daily rates — ideal for corporate and extended family use.",
  },
  {
    category: "payment",
    question: "Is my security deposit refunded automatically?",
    answer:
      "Yes. Once the vehicle is returned in its original condition with a full tank, the deposit is refunded within 3-5 business days to your original payment method.",
  },
  {
    category: "payment",
    question: "Can corporate clients get monthly invoicing?",
    answer:
      "Yes. We offer consolidated monthly invoicing with detailed trip logs for registered companies and embassies on approved accounts.",
  },
  {
    category: "services",
    question: "Do you provide chauffeurs?",
    answer:
      "Yes, we provide professionally trained, uniformed chauffeurs with expert knowledge of Islamabad and northern routes.",
  },
  {
    category: "services",
    question: "Do you deliver cars to hotels or homes?",
    answer: "Yes. Doorstep delivery is available in major cities subject to location and timing.",
  },
  {
    category: "services",
    question: "Are your drivers background verified?",
    answer:
      "Absolutely. Every chauffeur undergoes background checks, defensive driving training, and route familiarization before joining our team.",
  },
  {
    category: "services",
    question: "Do you offer wedding car decoration?",
    answer:
      "Yes. Our wedding packages include floral and ribbon decoration options for baraat and walima convoys — let us know your theme when booking.",
  },
  {
    category: "services",
    question: "Can I request the same driver for repeat trips?",
    answer:
      "Yes, subject to availability. Regular and corporate clients can request a preferred chauffeur for consistency across bookings.",
  },
  {
    category: "airport",
    question: "Are airport pickups available?",
    answer: "Yes. Airport pick & drop is available for Islamabad Airport and other major routes on request.",
  },
  {
    category: "airport",
    question: "Can I request a car for airport delivery?",
    answer:
      "Absolutely. We provide premium airport meet-and-greet services — your chauffeur meets you at the terminal so you can begin your journey immediately.",
  },
  {
    category: "airport",
    question: "How will I find my driver at the airport?",
    answer:
      "Your dedicated chauffeur will meet you at the arrivals terminal with a signage board bearing your name for a seamless meet-and-greet.",
  },
  {
    category: "airport",
    question: "Is flight delay tracking included with airport pickups?",
    answer:
      "Yes. We track your flight status and adjust pickup timing automatically, so you're never left waiting even if your flight is delayed.",
  },
  {
    category: "airport",
    question: "Can I book a return airport drop-off in advance?",
    answer:
      "Absolutely. You can schedule your departure transfer at the same time as your arrival pickup for a seamless round trip.",
  },
];

export default function FaqPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-navy py-20 sm:py-28 lg:py-32">
        <Container className="relative z-10">
          <nav className="mb-6 flex gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/60 sm:text-xs">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">FAQ</span>
          </nav>
          <h1 className="hero-shadow animate-fade-up max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Frequently Asked <span className="text-accent">Questions</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm text-white/60 sm:text-base lg:text-lg">
            Everything you need to know about renting a luxury vehicle with Signature. Find answers on booking,
            payments, and our premium concierge services.
          </p>
        </Container>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
      </header>

      <section className="py-16 sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-28">
                <div className="relative h-[560px] overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={CONCIERGE_IMAGE}
                    alt="Luxury sedan in a modern showroom"
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="font-heading text-lg font-semibold text-white">Need immediate help?</h3>
                    <p className="mt-2 text-sm text-white/70">
                      Our concierge team is available 24/7 for all your requirements.
                    </p>
                    <a
                      href={`tel:${brand.phone}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-primary transition hover:brightness-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">headset_mic</span>
                      Call Concierge
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion categories={CATEGORIES} faqs={FAQS} />
            </div>
          </div>
        </Container>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 lg:pb-[100px]">
        <Container>
          <div className="relative overflow-hidden rounded-[28px] bg-navy px-6 py-14 text-center text-white sm:rounded-[40px] sm:px-12 sm:py-20 md:px-24">
            <div className="relative z-10">
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Still Have Questions?</h2>
              <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
                If you couldn&apos;t find the answer you were looking for, our team is ready to assist you
                personally with any special requests.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-10 py-4 text-sm font-semibold text-primary transition hover:brightness-95"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Contact Us
                </Link>
                <a
                  href={`https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent px-10 py-4 text-sm font-semibold text-accent transition hover:bg-accent hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          </div>
        </Container>
      </section>
    </>
  );
}
