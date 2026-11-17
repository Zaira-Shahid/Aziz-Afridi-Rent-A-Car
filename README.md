# Aziz Afridi Rent a Car

Website for **Aziz Afridi Rent a Car**, a chauffeur-driven car rental business in Pakistan. Visitors can browse the fleet by category, search by city and date, request a car through WhatsApp, read city and service pages, and read the travel blog. The business owner can add and edit blog posts from a private admin page.

The site is a **static export** (plain HTML, CSS and JavaScript). It needs no server at runtime and is uploaded to Hostinger. A Vercel configuration is also included.

## Screenshots

Taken with Playwright from the production build (`scripts/take-screenshots.js`).

| Page | Desktop (1440 px) | Mobile (390 px) |
|---|---|---|
| Home | [home-desktop.jpg](docs/screenshots/home-desktop.jpg) | [home-mobile.jpg](docs/screenshots/home-mobile.jpg) |
| Cars | [cars-desktop.jpg](docs/screenshots/cars-desktop.jpg) | [cars-mobile.jpg](docs/screenshots/cars-mobile.jpg) |
| Car details | [car-details-desktop.jpg](docs/screenshots/car-details-desktop.jpg) | [car-details-mobile.jpg](docs/screenshots/car-details-mobile.jpg) |
| Contact | [contact-desktop.jpg](docs/screenshots/contact-desktop.jpg) | [contact-mobile.jpg](docs/screenshots/contact-mobile.jpg) |

Some photos (blog covers, city and service images) are loaded from third-party hosts. They appear blank in screenshots taken without internet access.

## Features

- **Home page**: hero with search bar (pickup city, dates, vehicle type), feature strip, fleet tiles, "Discover Your Drive" fleet groups, trusted-brand marquee, services, how it works, destinations, promo banners, reviews, FAQ, blog preview and a closing call to action.
- **Fleet**: 27 cars in 10 categories, with seats, transmission, fuel, daily price and a detail page for each car. The `/cars` page reads the home search (`?location&pickup&return`) in the browser.
- **Car inquiry**: a keyboard-accessible dialog collects date, times, name, email and phone, then opens a prefilled WhatsApp message. Call and WhatsApp buttons are on every car card.
- **Services**: 8 service pages (airport, hotel, executive, wedding, daily, weekly, monthly, corporate). The booking forms on the Airport, Hotel, Wedding and Corporate pages open `/contact` with the typed values filled in.
- **Cities**: 31 city and area pages with a WhatsApp search form, plus a searchable city services overview.
- **Contact**: a form that builds a WhatsApp message. It can be prefilled from the URL (`/contact?name=&email=&phone=&pickup=&message=`; any other simple parameter becomes a line at the top of the message).
- **Blog**: listing, category pages and post pages, with client-side search by title and excerpt. Posts come from `src/data/blog.ts` and from Firestore.
- **Blog admin** at `/admin/blog`: Google sign-in for allowed accounts, then create, edit, delete and sync posts in Firestore. The page is not linked from the site and is marked `noindex`.
- **Other pages**: About, FAQ (7 topics), Reviews feedback, Terms, Privacy, Booking Policy and a custom 404.
- **Chat assistant**: a small floating chat button (full-screen panel on phones). It runs entirely in the browser with keyword matching in English and Roman Urdu, answers only from the site data (cars and prices, services, cities, FAQ, how to book, contact details) and sends anything else to WhatsApp. No AI, no API, and chats are never saved. The logic is in `src/lib/chatbot.ts`.
- **Sticky Call and WhatsApp bar** on mobile, floating WhatsApp button on desktop.
- **SEO**: page titles and descriptions, JSON-LD, `sitemap.xml` and `robots.txt`.

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- Firebase (Authentication for the blog admin, Firestore for blog posts, Analytics)
- Fonts through `next/font/google`: Poppins (headings) and Inter (body)
- Playwright (dev dependency) for the screenshots

## Design system

| Token | Value | Use |
|---|---|---|
| Navy | `#00306C` | Headings, navigation, solid buttons |
| Deep navy | `#002048` | Footer, dark panels |
| Brand green | `#3CA500` | Icons and highlighted words on navy |
| Action green | `#2B7D00` | Button fills and small green text on white |
| Gray | `#4B4B4B` | Secondary text |
| Background | `#F6F7F9` / white | Page background |

- Bold italic Poppins headings with the last words in green; Inter for body text.
- 12 px buttons and inputs, 16 px cards, pill buttons in the header and hero, soft shadows, 4 px spacing base.
- Icons are inline SVG from `src/components/ui/Icon.tsx` (no icon font, no emoji).
- Every button is at least 44 px tall with a visible focus ring. Motion respects `prefers-reduced-motion`.
- Mobile first, checked at 390, 768 and 1440 px.

## Pages and routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About us |
| `/cars` | All cars, grouped by fleet |
| `/cars/[slug]` | Car details (27) |
| `/categories/[slug]` | Cars in one category (10) |
| `/services` | Services overview |
| `/services/[slug]` | Service pages (8) |
| `/city-services` | City services overview |
| `/rent-a-car/[slug]` | City and area pages (31) |
| `/blog` | Blog listing with search |
| `/blog/[slug]` | A blog post or a blog category |
| `/admin/blog` | Blog admin (private, `noindex`) |
| `/contact` | Contact form and details |
| `/faq` | Frequently asked questions |
| `/reviews` | Customer feedback |
| `/terms`, `/privacy`, `/booking-policy` | Legal pages |

## Getting started

Requirements: Node.js 20 or newer and npm.

```bash
git clone <repository-url>
cd aziz-rent-a-car
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Set these in `.env.local` (names only; get the values from the Firebase project settings):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_SITE_URL` (optional, used for the sitemap and `robots.txt`)

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build, then the Hostinger path fix-up (`scripts/sanitize-hostinger-paths.js`) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |
| `node scripts/take-screenshots.js` | Retake the README screenshots from `out/` (run `npm run build` first) |

## Build and deployment

### Hostinger (static export)

1. Run `npm run build`. This creates the `out/` folder.
   The build step renames folders that contain `$` (for example `__next.cars.$d$slug`) because Hostinger's Apache returns 404 for them. It prints `OK: no $ left in out/ names` when it is done.
2. In Hostinger, open **File Manager** (or connect over FTP) and go to `public_html`.
3. Upload **the contents** of `out/` (not the folder itself) into `public_html`, replacing the old files.
4. Visit the site and check `/`, `/cars`, a car page and `/contact`.

To show the custom 404 page, add this line to `public_html/.htaccess`: `ErrorDocument 404 /404.html`.

Before going live, add the final domain to **Firebase Authentication → Settings → Authorized domains**, otherwise Google sign-in on `/admin/blog` will not work.

### Vercel

`vercel.json` is included. On Vercel the site is built as a normal Next.js app (the static export is only used when `VERCEL` is not set). Add the environment variables above in the project settings. The install command in `vercel.json` is `yarn install`, so keep `yarn.lock` in sync or change it to `npm install`.

## Folder structure

```
src/
  app/            Routes (App Router), global styles, sitemap, robots
  components/
    blog/         Blog listing, post, category and admin
    chat/         Chat assistant panel and button
    cars/         Car card, grids, detail page, inquiry dialog, search banner
    city/         City pages and city services overview
    contact/      Contact form, booking bar, URL prefill helper
    faq/          FAQ accordion and help card
    home/         Home page sections
    layout/       Header, footer, mobile menu, sticky action bar
    services/     Service pages and their shared blocks
    shared/       Page hero, call-to-action banner, simple content page
    ui/           Button, Card, Container, Section, Icon and other building blocks
  data/           Cars, services, cities, blog posts, navigation (page content lives here)
  lib/            Brand details, Firebase, blog helpers, SEO, chat assistant engine
  types/          Shared TypeScript types
public/           Images (fleet, brands, services) and brand assets
scripts/          Build fix-up, screenshots and one-off maintenance scripts
docs/screenshots/ README screenshots
firestore.rules   Firestore security rules
```

## Content and data

Most text, prices and images are in `src/data/*.ts` and `src/lib/brand.ts` (phone, WhatsApp, social links). Components read from there, so changing a price or a phone number means editing one place and rebuilding.
