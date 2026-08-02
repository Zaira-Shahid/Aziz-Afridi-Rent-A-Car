# Signature Rent A Car

Next.js 16 website for Signature Rent A Car — component-based, reusable structure with brand guidelines and Phase 1 SEO pages.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Yarn

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `yarn dev` — start development server (Turbopack)
- `yarn build` — production build
- `yarn start` — start production server
- `yarn lint` — run ESLint

## Signature Rent A Car – Website Brand Guidelines

Please follow the brand guidelines below throughout the website for a consistent and professional look.

### Brand Colors

| Role | Hex | Name |
|------|-----|------|
| Primary | `#000B1D` | Deep Midnight Navy |
| Secondary | `#04C4E3` | Signature Cyan |
| Accent / CTA | `#AEE20F` | Lime Green |
| Background | `#F6F7F8` | Soft Ice White |

### Usage

- `#000B1D` — Header, Footer, Navigation, Hero Sections, Headings
- `#04C4E3` — Primary Buttons, Icons, Links, Hover Effects
- `#AEE20F` — Book Now, WhatsApp, Offers, Important CTAs (use sparingly)
- `#F6F7F8` — Website Background, Cards, Forms, Content Sections

### Typography

- Headings: **Sora**
- Body Text: **Inter**

### Design Style

Keep the design modern, premium, clean, minimal, and fully responsive. Use consistent spacing, subtle animations, rounded corners (10–12px), and avoid excessive gradients or effects.

**Goal:** Build a professional, trustworthy, and modern car rental website that reflects the Signature Rent A Car brand.

> These guidelines are already applied in the project (`src/lib/brand.ts`, `src/app/globals.css`, layout + UI components).

## Folder structure

```text
src/
  app/                 # Routes (pages)
  components/
    ui/                # Reusable base UI (Button, Container, Section…)
    layout/            # Header, Footer, SiteShell
    shared/            # Cross-page blocks (PageHero, CtaBanner…)
    home/              # Home-only sections
  data/                # Cities, cars, services, navigation
  lib/                 # Brand + helpers
  types/               # Shared TypeScript types
```
