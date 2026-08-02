import Link from "next/link";
import type { CarModel } from "@/types";
import { CarCard } from "@/components/cars/CarCard";
import { Container } from "@/components/ui/Container";

type HomeFleetProps = {
  cars: CarModel[];
};

export function HomeFleet({ cars }: HomeFleetProps) {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-[100px]">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Premium Selection
            </span>
            <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Our Featured Fleet
            </h2>
          </div>
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary"
          >
            View Full Fleet <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
      </Container>
    </section>
  );
}
