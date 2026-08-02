import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-primary/70">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block text-secondary hover:underline">
        Back to Home
      </Link>
    </Container>
  );
}
