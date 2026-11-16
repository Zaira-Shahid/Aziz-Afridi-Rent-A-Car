# REDESIGN_CONTEXT.md — Aziz Afridi Rent A Car

Working context for the UI/UX redesign. Companion to `PROJECT_ANALYSIS.md` (the full audit).
**Rule for every change:** content, routes, SEO, forms and Firebase stay exactly as they are. Only UI and UX change.

Where content lives: almost all copy, prices, car names and image paths are in `src/data/*.ts` and `src/lib/brand.ts`. Restyling a component must keep reading from those files. Do not copy text into components.

Known placeholders in the source (`src/lib/brand.ts`): phone `03000000000`, WhatsApp `923000000000`, email `info@example.com`, social links `example.com/*`. Under the "do not change content" rule these stay as they are, and they must be replaced by the client before launch (§ Open items).

---

## 1. Pages list (route, file, sections in order)

All routes are public. Every page renders inside `app/layout.tsx` then `SiteShell` (Header, `<main class="page-enter">`, Footer, WhatsAppFloat).

| Route | File | Sections in order |
|---|---|---|
| `/` | `src/app/page.tsx` | HomeHero (+search) → PremiumFleetPreview → BrandStrip → HomeFleet (4 car grids: Executive, Premium, Luxury, Hybrid) → PromoBanner (Islamabad) → HowItWorks → WhyChooseUs (a FAQ block) → HomeServices → PromoBanner (Rawalpindi) → HomeDestinations → HomeReviews → HomeBlog → HomeCta |
| `/about` | `app/about/page.tsx` | PageHero → "Travel planned around your journey" (3 paragraphs + image) → "Plan your rental with confidence" (3 cards) → ServicesGrid → CtaBanner |
| `/cars` | `app/cars/page.tsx` | optional search banner (`?location&pickup&return`) → CarsHero → CarGridSection (all 28 cars) → CtaBanner |
| `/cars/[slug]` | `app/cars/[slug]/page.tsx` | CarsHero → CarDetailBody (+ related cars) → CtaBanner. 28 slugs |
| `/categories/[slug]` | `app/categories/[slug]/page.tsx` | CarsHero → CarGridSection → CtaBanner. 10 slugs |
| `/rent-a-car/[slug]` | `app/rent-a-car/[slug]/page.tsx` | CityDetailContent (hero + WhatsApp search form → cars → content blocks). 31 slugs |
| `/city-services` | `app/city-services/page.tsx` | CityServicesContent (hero, 7 more `h2` sections, reviews list, final CTA) |
| `/services` | `app/services/page.tsx` | PageHero → ServicesGrid → CtaBanner |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | One of 7 detail components (Airport, Hotel, Executive, Wedding, Daily (also monthly), Weekly, Corporate), each: ServiceHero → features → fleet grid → optional packages / included / booking form / testimonials / FAQ → CtaBanner. 8 slugs |
| `/blog` | `app/blog/page.tsx` | BlogPageContent: hero → BlogFilters → post grid (static + Firestore) → admin modal trigger |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Either BlogPostContent, BlogCategoryContent (5 category slugs) or BlogPostClientFallback (Firestore-only post) |
| `/contact` | `app/contact/page.tsx` | PageHero → "Tell us about your trip" + ContactForm + image → "Contact the booking team" (tel / WhatsApp / mailto buttons) |
| `/faq` | `app/faq/page.tsx` | Hero (`h1`) → topic cards → 7 categories in FaqAccordion → FaqHelpCard → CTA ("h2" at line 656) |
| `/reviews` | `app/reviews/page.tsx` | PageHero ("Customer Feedback") → "Share your rental experience" → "Planning your first booking?" |
| `/terms` | `app/terms/page.tsx` | Hero "Terms & Conditions" → 10 sections |
| `/booking-policy` | `app/booking-policy/page.tsx` | Hero → 3 content sections → "Ready To Reserve Your Car?" CTA |
| `/privacy` | `app/privacy/page.tsx` | ContentPage (2 paragraphs) |
| 404 | `app/not-found.tsx` | "Page not found" + link home |
| `/robots.txt`, `/sitemap.xml` | `app/robots.ts`, `app/sitemap.ts` | No UI. Do not touch. |

---

## 2. Content inventory (checklist to preserve)

**How to use:** after redesigning a page, compare against this list. Anything listed must still appear. Because most copy is in data files, the safest check is that the component still renders every field of its data source.

### Site-wide (Header, Footer, WhatsAppFloat)
- Brand name "Aziz Afridi Rent A Car", tagline, logo (`src/lib/logo.png`, `public/images/aziz-afridi-wordmark.svg`).
- Main nav from `src/data/navigation.ts`: Home, Our Cars (28 cars with brand logos, plus categories), Services (8), Cities (31), Blog (5 categories), About, FAQ, Contact and the rest of the list in that file. Keep every item and its icon or logo.
- Header CTAs: WhatsApp, Book Now (`/contact`), phone.
- Footer: brand blurb, column links, phone, email, address, five social icons, legal links (Terms, Privacy, Booking Policy), copyright, DeveloperX credit link `https://www.developerx.org/`.
- WhatsAppFloat: floating WhatsApp link.

### `/` Home
- **HomeHero:** h1 "Your Ride, Ready When You Are", h2 "Choose from premium and executive vehicles.", "More Information" link, search fields (pickup location, pickup date-time, return date-time) with location autocomplete over all cities, submit → `/cars?location&pickup&return`, hero cars image.
- **PremiumFleetPreview:** eyebrow "Our Premium Fleet", h2 "Explore Our Premium Fleet", category tiles with badge and arrow, mobile description.
- **BrandStrip:** h2 and the 10 brand logos (Suzuki, Toyota, Honda, Hyundai, Kia, Mercedes, Audi, Lexus, Changan, Haval) in a marquee.
- **HomeFleet:** four titled grids "Executive Fleet", "Premium Fleet", "Luxury Fleet", "Hybrid Fleet", each with "View <title>" button.
- **PromoBanner ×2:** "Serving Islamabad / Best Rent a Car with Driver in Islamabad" (defaults in `PromoBanner.tsx`) and the Rawalpindi version with its full paragraph, CTA "Rent a Car in Rawalpindi" → `/rent-a-car/rawalpindi`, and image.
- **HowItWorks:** "Choose Your Vehicle", "Share Your Trip Details", "Confirm Your Booking", "Enjoy a Comfortable Ride" with descriptions.
- **WhyChooseUs:** it is a FAQ; keep all `homeFaqs` items (8, from `src/data/cars.ts:526-567`) and its heading text.
- **HomeServices:** "Chauffeur Service", "Airport Transfers", "Corporate Events" with text, images and links.
- **HomeDestinations:** heading and 4 destination tiles with images and links.
- **HomeReviews:** heading, rating summary, 3 reviews (names, text, stars, dates), links.
- **HomeBlog:** heading and the first 6 posts from `blogPosts`.
- **HomeCta:** h2, text, buttons, image.

### `/about`
- Hero: "About Aziz Afridi Rent A Car" and its description. Block: "Travel planned around your journey" with its 3 paragraphs and the image `/images/about-hero-v2.png` (alt "Vehicles for journeys in Islamabad"). Block: "Plan your rental with confidence" with 3 cards: "Choose your vehicle", "Share your itinerary", "Confirm the details" (full text in file). ServicesGrid (all 8 services). CtaBanner.

### `/cars`, `/cars/[slug]`, `/categories/[slug]`
- For every car in `carModels`: name, brand, category, seats, transmission, fuel, `priceDay`, `priceMonth`, image, alternate image, colors, badge, featured/sale/family flags, link to detail.
- Card actions: Inquire (opens InquireModal), Call (`tel:`), WhatsApp (`wa.me` with car name).
- Detail page: gallery/colors, spec list, prices (day and month), call and WhatsApp buttons, related cars, description text from `CarDetailBody.tsx`.
- Category pages: title, description and `carSlugs` from `fleetSections` (10: Economy, Standard, Premium, SUV & Hybrid, Luxury, Executive SUV, Group Travel, Corporate, Wedding & Event, Tourism).
- `/cars` search banner showing the submitted location, pickup, return.

### `/rent-a-car/[slug]` and `/city-services`
- City name, hero copy, search form (pickup readonly, drop, dates, car) → WhatsApp, car list, content blocks, FAQs or reviews as written in `CityDetailContent.tsx` and `CityServicesContent.tsx` (including hard-coded REVIEWS and `CITY_CARDS`/`CITY_HERO_IMAGES` image maps). Keep every `h2` section.

### `/services` and `/services/[slug]`
- 8 services (`src/data/services.ts`) with all fields in `src/data/service-details.ts` (1,612 lines): hero title/description/image, features, fleet items with `priceDay`, included lists, audience, packages (names, prices, bullets), booking steps/form fields, testimonials, FAQs, CTA text, email entries.

### `/blog` and `/blog/[slug]`
- Post fields: title, category, date, excerpt, image, author, readTime, content[], tips, cta. Category list and filters. Related reads. Static posts (8, `src/data/blog.ts`) **and** Firestore posts, merged by slug.

### `/contact`
- PageHero, "Tell us about your trip" with form fields (name, email, phone, pickup select with 4 options, message), submit label, "Contact the booking team" with Call, WhatsApp and Email buttons, image `/images/contact-hero-v2.png`.

### `/faq`
- Hero text, topic cards, 7 categories with every question and answer (697-line file), FaqHelpCard, bottom CTA.

### `/reviews`, `/terms`, `/booking-policy`, `/privacy`, 404
- Every heading and paragraph as in the files. Terms keeps "Last Updated: October 24, 2024". Booking-policy keeps its steps and "Ready To Reserve Your Car?" CTA.

### Images (all must keep rendering)
- `public/images/*` (fleet photos, heroes, wordmark), `public/images/fleet/*` (duplicates), `public/brands/*`, `public/services/islambad.jpeg`, remote Unsplash and `lh3.googleusercontent.com` URLs used in `faq`, `terms`, `booking-policy`, `page.tsx`, `PromoBanner`, `service-details.ts`, `HomeDestinations`, city components. Do not swap or delete images without approval.

---

## 3. Functionality inventory (must keep working)

| Feature | File(s) | Behavior to preserve |
|---|---|---|
| Home search | `components/home/HomeHero.tsx` | Combobox over cities, keyboard nav, pickup/return datetime, navigates to `/cars?location&pickup&return` |
| `/cars` search banner | `app/cars/page.tsx:22-25` | Reads the three query params. Currently breaks static export (build fails); fixing it is an approved-first item |
| BookingBar | `components/home/BookingBar.tsx` (used in DailyCarRentalDetail) | Pickup, drop, dates, car → `wa.me` message |
| Car inquiry | `components/cars/InquireModal.tsx` (opened from `CarCard.tsx`, `ServiceFleetGrid.tsx`) | Date, pickup/drop times, name, email, +92 phone, confirm checkbox → `wa.me` message; Escape closes; portal |
| Car actions | `components/cars/CarCard.tsx` | Whole-card click → detail, Call `tel:`, WhatsApp `wa.me`, hover/auto image swap |
| City search | `components/city/CityDetailContent.tsx:~128` | Search form → `wa.me` |
| Contact form | `components/contact/ContactForm.tsx` | Fields → WhatsApp message, reset, "Opening WhatsApp..." state |
| Service booking forms | Corporate, Hotel, Wedding, Airport `*Detail.tsx` | Currently decorative, submit links to `/contact`. Keep behavior unless you ask to change it |
| FAQ accordions | `FaqAccordion.tsx`, `WhyChooseUs.tsx`, `ServiceFaqAccordion.tsx`, (`HomeFaq.tsx` unused) | Expand/collapse, category switching on `/faq` |
| Blog list | `components/blog/BlogPageContent.tsx` | Merge static + Firestore, filters by category (search box is non-functional today) |
| Blog post | `blog/[slug]/page.tsx`, `BlogPostClientFallback.tsx` | Static post, category page, or Firestore fallback via `getDoc` |
| Blog admin | `components/blog/BlogAdminPanel.tsx`, `lib/blog-firestore.ts`, `lib/blog-admin.ts`, `lib/firebase.ts` | Google sign-in, email allowlist, create / edit / delete / seed posts in `blogs` |
| Analytics | `components/FirebaseAnalytics.tsx`, gtag in `layout.tsx` | Keep loading |
| SEO | `lib/seo.ts`, `layout.tsx` (JSON-LD), `robots.ts`, `sitemap.ts` | Titles, descriptions, canonical, OG, JSON-LD unchanged |
| Routing | `next.config.ts` | `trailingSlash: true`, static export off Vercel, `images.unoptimized` (change only if approved) |

**Firebase (do not change):** `src/lib/firebase.ts`, `firestore.rules`, `.env*`, collection `blogs` (fields: slug, title, category, date, excerpt, image, author, readTime, content, tips, cta, createdAt, updatedAt).

---

## 4. Shared components

| Group | Components | Path |
|---|---|---|
| Layout | Header, Footer, SiteShell, WhatsAppFloat | `src/components/layout/` |
| UI primitives | Container, Section, SectionHeading, ButtonLink, Button (unused), CardLink (unused), Logo, Reveal, AnimateIn | `src/components/ui/` |
| Heroes / banners | PageHero, CtaBanner, ContentPage, ServiceHero, CarsHero | `shared/`, `services/`, `cars/` |
| Cards | CarCard (+ inline FleetCard in `ServiceFleetGrid`), ServicesGrid, review cards (HomeReviews), blog cards (in Blog*Content) | `cars/`, `services/`, `home/`, `blog/` |
| Accordions | FaqAccordion, WhyChooseUs, ServiceFaqAccordion, HomeFaq (unused) | `faq/`, `home/`, `services/` |
| Forms / modals | ContactForm, InquireModal, BookingBar, BlogAdminPanel | `contact/`, `cars/`, `home/`, `blog/` |
| Data | `cars.ts`, `cities.ts`, `services.ts`, `service-details.ts`, `blog.ts`, `navigation.ts`, `brand.ts` | `src/data/`, `src/lib/` |
| Unused (do not delete without approval) | HomeFaq, LocationsStrip, CarSliderSection, FleetAnimatedHeading, FleetParticles, GoogleReviewsSection, LinkGridSection | |

---

## 5. Current design

- **Stack:** Tailwind CSS 4.3.3, configured only through `@theme inline` in `src/app/globals.css`. No `tailwind.config`. Plus about 120 lines of hand-written CSS (`.ride-*`, `.premium-*`, `.mobile-*`, `.brand-strip-*`, `.reveal-item`).
- **Colors:** primary `#06264b`, secondary `#278a08`, accent `#278a08` (same), background and surface `#f8f9fa` (same), muted `#44474c`, navy `#0b345e`. About 40 more ad-hoc hexes. WhatsApp links are forced to `#128c4a` by a global `!important` rule.
- **Fonts:** Sora (headings, 500–700), Inter (body, 400–700) via `next/font`. Icons: Material Symbols from the Google CDN.
- **Styling traits:** mixed radii (8–24px and full), 8+ custom shadows, five section-padding patterns, five CTA shapes, `!important` overrides (white text on `bg-primary` links, `.ride-header` repainting the header).
- **Motion:** framer-motion, gsap, a home-grown `Reveal`, `.page-enter` on `<main>`, a CSS marquee. Reduced-motion is only partly covered.

---

## 6. Proposed new design system

**Look:** premium, calm, trustworthy, mobile-first. Dark navy for authority, warm gold for the "premium" accent, one clear green for the WhatsApp/booking action. Lots of white space, large car photos, clear prices, big tap targets.

### Colors (tokens to define in `globals.css` `@theme`)
| Token | Hex | Use |
|---|---|---|
| `ink` (primary) | `#0B1F3A` | Header, headings, dark sections |
| `primary-600` | `#12365F` | Hover and secondary dark |
| `primary-50` | `#EEF3FA` | Light tinted surfaces |
| `gold` | `#C9A24A` | Badges, stars, price highlights, small accents. Never body text |
| `gold-600` | `#A8832F` | Gold on light backgrounds (AA contrast) |
| `action` | `#16A34A` | WhatsApp and main booking buttons |
| `action-700` | `#128C4A` | Action hover |
| `surface` | `#F6F7F9` | Page background |
| `card` | `#FFFFFF` | Cards |
| `line` | `#E3E6EB` | Borders |
| `text` | `#1F2937` | Body |
| `muted` | `#5B6573` | Secondary text (AA on white) |
| `danger` / `success` | `#B42318` / `#157F3B` | Form states |

The old tokens (`secondary`, `accent`, `navy`, `surface`/`background` duplicates) are mapped to these during migration so untouched pages keep working until redesigned.

### Typography
- Keep **Sora** for headings and **Inter** for body (already loaded, no new library). Optionally set `Sora 600` for h1–h3 and `Inter 500` for buttons.
- Scale: display `40/48` (mobile `32/40`), h2 `32/40` (mobile `26/34`), h3 `20/28`, body `16/26`, small `14/22`, caption `12/18`. No text below 12px.
- Eyebrow: `12px`, uppercase, `0.14em` tracking, gold-600 on light and gold on dark.

### Buttons
- **Primary action (WhatsApp / Book):** `action` background, white text, `12px` radius, `48px` min height on mobile (44px minimum everywhere), subtle shadow, hover `action-700` and a 1px lift.
- **Secondary:** `ink` background, white text.
- **Outline:** `1.5px` `ink` border, transparent, fills on hover.
- **Ghost / link:** gold-600 text with an underline on hover.
- **Call:** outline `ink` with phone icon.
- One `Button` component with variants `whatsapp | primary | outline | ghost | call` and sizes `sm | md | lg`. A visible `:focus-visible` ring (`2px` gold, `2px` offset) on all interactive elements.

### Cards
- Surface `card`, `1px line` border, `16px` radius, shadow `0 1px 2px rgba(11,31,58,.06)`; hover `0 12px 28px rgba(11,31,58,.12)` with a 2px lift.
- Car card: 4:3 photo on a light-grey tile, brand and name, spec chips (seats, transmission, fuel), price per day in `ink` semibold with "per day" muted, then a primary WhatsApp button and a secondary Call/Inquire pair.

### Spacing, radius, shadow, layout
- Spacing base 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Section rhythm `py-12` (mobile), `py-16` (tablet), `py-24` (desktop). Container max `1200px`, `16px` side gutter on mobile, `24px` on tablet, `32px` on desktop.
- Radius scale: `8px` inputs and chips, `12px` buttons, `16px` cards, `24px` hero panels, `full` pills.
- Shadow scale: `sm`, `md`, `lg` as above.
- Breakpoints to design and test at: **390px, 768px, 1440px**.

### Patterns
- **Header:** white or ink bar, logo left, nav center, right: Call and WhatsApp. On mobile a sticky bottom bar with Call and WhatsApp, plus a full-screen menu with Escape and focus trap. Dropdowns open with click and keyboard, not hover only.
- **Hero:** big headline, search card overlapping the image, trust row beneath.
- **Forms:** visible labels always, `48px` inputs, inline errors, helper text, `autocomplete` attributes, clear submit and loading states.
- **Motion:** 150–250ms ease-out fades and lifts only, always off under `prefers-reduced-motion`. One reveal system.
- **Icons:** keep Material Symbols for now (no new library), mark decorative icons `aria-hidden`. Revisit inline SVG later with approval.
- **Accessibility:** AA contrast on all text, skip-to-content link, semantic headings in order, alt text kept as-is, `aria-expanded` and `aria-controls` on accordions.

---

## 7. Suggested redesign order

0. **Foundation (no visible redesign; needs your approval of each item).** Add the new design tokens next to the old ones in `globals.css`; shared `Button`, `Field`, `Section`, `Card` primitives; fix the `/cars` static-export build failure and the ESLint config so `npm run build` works; remove the global `wa.me` `!important` override once its callers are restyled.
1. **Header, mobile menu, Footer, WhatsApp/call bar** (on every page).
2. **Home page**, section by section in the order of §1.
3. **Cars:** `/cars`, `CarCard`, `/categories/[slug]`, `/cars/[slug]` (+ InquireModal).
4. **Contact page and ContactForm.**
5. **Services:** `/services` and the 8 `/services/[slug]` pages (one shared layout).
6. **City pages:** `/rent-a-car/[slug]` and `/city-services`.
7. **About, FAQ, Reviews.**
8. **Blog:** list, post, category (admin panel last, behavior untouched).
9. **Legal:** Terms, Booking Policy, Privacy, 404.

---

## 8. Open items to settle before launch (do not change without approval)

- Replace placeholder phone, WhatsApp, email and social links in `src/lib/brand.ts`.
- `/og-default.png` is missing. Large image sizes (about 169 MB in `public/`). Decide on image optimisation.
- Hosting target (Vercel vs static export). The build currently fails off Vercel because `/cars` reads `searchParams`.
- The review block text ("4.9 / 895 reviews", "Real Google reviews") is unverified. Content stays as is unless the client says otherwise.
- `npm run lint` crashes (FlatCompat config). Fix only with approval.
- Domain and brand mismatch in `seo.ts` / `robots.ts` / `sitemap.ts` (`signaturerentacar.com`). SEO values must stay the same unless told otherwise.
