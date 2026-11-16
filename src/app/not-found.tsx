import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="bg-surface py-12 sm:py-16 lg:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-panel bg-navy-deep px-6 py-16 text-center text-white sm:px-12 sm:py-24">
          <span aria-hidden="true" className="absolute -right-24 top-0 -z-10 h-full w-72 -skew-x-[20deg] bg-green/15" />
          <span aria-hidden="true" className="absolute -left-32 top-0 -z-10 h-full w-44 -skew-x-[20deg] bg-navy/60" />
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green/20 text-green">
            <Icon name="car" size={40} />
          </span>
          <h1 className="mt-6 font-heading text-4xl font-extrabold italic tracking-tight sm:text-5xl">
            Page <span className="text-green">not found</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-white/85 sm:text-lg">
            The page you are looking for does not exist.
          </p>
          <div className="mt-8">
            <ButtonLink href="/" variant="green" pill size="lg">
              Back to Home
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
