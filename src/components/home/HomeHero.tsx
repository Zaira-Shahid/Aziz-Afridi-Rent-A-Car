"use client";

import Image from "next/image";
import { BookingBar } from "@/components/home/BookingBar";
import { Container } from "@/components/ui/Container";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0gWHItipLCUO6-sPJF1gzLgvyWSzuYs5zqVwktRNeJSEGS1Dc_mtxfywnp6ZLhn-hRqm2tBPml377VAX1f0dV0Cz8-UgY3wJ6fCjMPdHdwc7dZZPyrIf-hVYbhMx2mdOEEEEhuRn8kv12ApODyonWHLMUUivN2LVqoH9ARznO_w5-TcKj28oopcWjJI67uIr5Sv4AARGd-223hvJrx4HcI5evgCgLXhDMHqBggXCnGJBGbyEkwjzh";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden py-16 sm:min-h-[85vh] sm:py-20 lg:min-h-[90vh] lg:py-24">
      <Image
        src={HERO_IMAGE}
        alt="Luxury sedan on a coastal road"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/40 to-navy/25" />

      <Container className="relative z-10 grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="text-white lg:col-span-7">
          <h1 className="hero-shadow animate-fade-up font-heading text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-[64px] xl:leading-[72px]">
            Drive the <span className="text-accent">Extraordinary.</span>
          </h1>
          <p className="animate-fade-up-delay mt-4 max-w-xl text-sm text-white/90 sm:mt-6 sm:text-base lg:text-lg">
            Experience the peak of automotive luxury and performance. From executive sedans to premium
            SUVs, we provide a fleet that matches your ambition across Pakistan.
          </p>
        </div>

        <div className="animate-fade-up-delay-2 w-full lg:col-span-5">
          <BookingBar />
        </div>
      </Container>
    </section>
  );
}
