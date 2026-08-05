import Image from "next/image";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/types";
import { ServiceFleetGrid } from "./ServiceFleetGrid";
import { ServiceHero } from "./ServiceHero";
import { ServiceTestimonials } from "./ServiceTestimonials";

type ExecutiveCarRentalDetailProps = {
  data: ServiceDetail;
};

export function ExecutiveCarRentalDetail({ data }: ExecutiveCarRentalDetailProps) {
  const { hero, fleet, features, story, process, testimonials, included, audience, notes } = data;

  return (
    <>
      <ServiceHero hero={hero} />

      <section className="py-16 sm:py-24 lg:py-[100px]" id="fleet">
        <Container>
          <Reveal>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{fleet.title}</h2>
              <p className="mt-4 text-muted sm:text-lg">{fleet.description}</p>
            </div>
          </Reveal>
          <ServiceFleetGrid items={fleet.items} />
        </Container>
      </section>

      <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="border-white/10 lg:col-span-1 lg:border-r lg:pr-8">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{features.title}</h2>
              <p className="mt-6 text-white/55">{features.description}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2">
              {features.items.map((item) => (
                <div
                  key={item.title}
                  className="glass-panel rounded-xl p-8 transition duration-300 hover:-translate-y-2 sm:p-10"
                >
                  <span className="material-symbols-outlined mb-6 text-4xl text-accent">{item.icon}</span>
                  <h3 className="font-heading text-lg font-semibold sm:text-xl">{item.title}</h3>
                  <p className="mt-4 text-sm text-white/60 sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {included ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{included.title}</h2>
              {included.description ? <p className="mt-4 text-muted sm:text-lg">{included.description}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {included.items.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 rounded-xl border border-primary/8 bg-white p-5 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </span>
                  <p className="text-sm font-medium text-primary">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {audience ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{audience.title}</h2>
              {audience.description ? <p className="mt-4 text-muted sm:text-lg">{audience.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {audience.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-primary/8 bg-white p-8 shadow-[0_10px_30px_rgba(14,28,46,0.04)]"
                >
                  <span className="material-symbols-outlined mb-4 text-3xl text-secondary">{item.icon}</span>
                  <h4 className="mb-2 font-heading text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {story ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="relative">
              <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-accent/20" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl border border-primary/8 bg-white/90 p-6 shadow-lg backdrop-blur sm:p-8">
                <p className="mb-1 font-heading text-3xl font-bold text-primary sm:text-4xl">{story.stat.value}</p>
                <p className="text-sm text-muted">{story.stat.label}</p>
              </div>
            </div>
            <div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{story.title}</h2>
              <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{story.description}</p>
              <div className="mt-10 space-y-8">
                {story.points.map((point) => (
                  <div key={point.title} className="flex gap-6">
                    <span className="material-symbols-outlined text-3xl text-primary">{point.icon}</span>
                    <div>
                      <h4 className="text-lg font-semibold">{point.title}</h4>
                      <p className="mt-2 text-sm text-muted sm:text-base">{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {process ? (
        <section className="bg-[#f8f9fa] py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight sm:mb-20 sm:text-4xl">
              {process.title}
            </h2>
            <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div className="absolute left-0 top-12 hidden h-px w-full bg-primary/10 lg:block" />
              {process.steps.map((step, index) => (
                <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#f8f9fa] shadow-[0_10px_30px_rgba(14,28,46,0.04)] ${
                      index === process.steps.length - 1 ? "bg-primary text-white" : "bg-white text-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">{step.icon}</span>
                  </div>
                  <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                  <p className="px-2 text-sm text-muted">{step.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {notes ? (
        <section className="bg-navy py-16 text-white sm:py-24 lg:py-[100px]">
          <Container>
            <div className="mb-12 max-w-xl sm:mb-16">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{notes.title}</h2>
              {notes.description ? <p className="mt-4 text-white/60 sm:text-lg">{notes.description}</p> : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {notes.items.map((item) => (
                <div key={item.title ?? item.text} className="glass-panel rounded-xl p-8">
                  <span className="material-symbols-outlined mb-4 text-3xl text-accent">{item.icon}</span>
                  {item.title ? <h4 className="mb-2 text-lg font-semibold">{item.title}</h4> : null}
                  <p className="text-sm text-white/60">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {testimonials ? (
        <section className="py-16 sm:py-24 lg:py-[100px]">
          <Container>
            <h2 className="mb-12 text-center font-heading text-3xl font-semibold tracking-tight sm:mb-16 sm:text-4xl">
              {testimonials.title}
            </h2>
            <ServiceTestimonials items={testimonials.items} />
          </Container>
        </section>
      ) : null}

      <CtaBanner
        title="Ready to travel like an executive?"
        description="Reserve a chauffeur-driven vehicle for your next meeting, transfer, or corporate event."
      />
    </>
  );
}
