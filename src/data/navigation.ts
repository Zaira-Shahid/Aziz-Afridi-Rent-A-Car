import type { NavItem, NavLink } from "@/types";
import { carModels } from "@/data/cars";
import { cities } from "@/data/cities";

/** Project palette for nav icons */
const C = "#278a08"; // secondary
const A = "#278a08"; // accent

const BRAND_LOGOS: Record<string, string> = {
  Suzuki: "/brands/suzuki-logo.webp",
  Toyota: "/brands/toyota-logo.webp",
  Honda: "/brands/honda-logo.webp",
  Hyundai: "/brands/hyundai-logo.webp",
  Kia: "/brands/kia-logo.webp",
  Mercedes: "/brands/mercedes-logo.webp",
  "Mercedes-Benz": "/brands/mercedes-logo.webp",
  Audi: "/brands/audi-logo.webp",
  Lexus: "/brands/lexus-logo.webp",
  Changan: "/brands/changan-logo.webp",
};

export function brandLogo(brand: string) {
  return BRAND_LOGOS[brand] ?? BRAND_LOGOS[brand.replace(/-Benz$/i, "")] ?? undefined;
}

const CITY_TYPE_ICONS: Record<string, { icon: string; iconColor: string }> = {
  primary: { icon: "location_city", iconColor: C },
  tourist: { icon: "landscape", iconColor: A },
  local: { icon: "home_work", iconColor: C },
};

const allCarNavItems: NavLink[] = carModels.map((car) => ({
  label: car.name,
  href: `/cars/${car.slug}`,
  logo: brandLogo(car.brand),
}));

const allCityNavItems: NavLink[] = cities.map((city, index) => {
  const meta = CITY_TYPE_ICONS[city.type] ?? CITY_TYPE_ICONS.primary;
  return {
    label: city.name,
    href: `/rent-a-car/${city.slug}`,
    icon: meta.icon,
    iconColor: index % 2 === 0 ? meta.iconColor : A,
  };
});

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", icon: "home", iconColor: C },
  {
    label: "About Us",
    href: "/about",
    icon: "info",
    iconColor: C,
    children: [
      { label: "About Company", href: "/about", icon: "apartment", iconColor: C },
      { label: "Reviews", href: "/reviews", icon: "star", iconColor: A },
      { label: "FAQ", href: "/faq", icon: "help", iconColor: C },
    ],
  },
  {
    label: "Our Cars",
    href: "/cars",
    icon: "directions_car",
    iconColor: A,
    children: [],
    groups: [
      {
        label: "Car Categories",
        items: [
          { label: "Economy Fleet", href: "/categories/economy", icon: "savings", iconColor: C },
          { label: "Standard Fleet", href: "/categories/standard", icon: "directions_car", iconColor: A },
          { label: "Executive SUV", href: "/categories/executive-suv", icon: "directions_car", iconColor: A },
          { label: "SUV & Hybrid", href: "/categories/suv-hybrid", icon: "airport_shuttle", iconColor: A },
          { label: "Premium Fleet", href: "/categories/premium", icon: "workspace_premium", iconColor: C },
          { label: "Luxury Fleet", href: "/categories/luxury", icon: "diamond", iconColor: C },
          { label: "Group Travel", href: "/categories/group-travel", icon: "groups", iconColor: C },
          { label: "Corporate Fleet", href: "/categories/corporate", icon: "business_center", iconColor: A },
          { label: "Wedding & Event", href: "/categories/wedding-event", icon: "celebration", iconColor: C },
          { label: "Tourism Fleet", href: "/categories/tourism", icon: "landscape", iconColor: A },
        ],
      },
      {
        label: "All Cars",
        items: allCarNavItems,
      },
    ],
  },
  {
    label: "City Services",
    href: "/city-services",
    icon: "location_on",
    iconColor: C,
    children: [{ label: "All Cities", href: "/city-services#all", icon: "map", iconColor: A }],
    groups: [
      {
        label: "City Categories",
        items: [
          { label: "Popular Cities", href: "/city-services#popular", icon: "location_city", iconColor: C },
          { label: "Tourist Areas", href: "/city-services#tourist", icon: "landscape", iconColor: A },
          { label: "Islamabad Areas", href: "/city-services#local", icon: "home_work", iconColor: C },
        ],
      },
      {
        label: "All Cities",
        items: allCityNavItems,
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    icon: "support_agent",
    iconColor: A,
    children: [
      { label: "Airport Pick & Drop", href: "/services/airport-pick-drop", icon: "flight_land", iconColor: C },
      { label: "Corporate Car Rental", href: "/services/corporate-car-rental", icon: "business_center", iconColor: A },
      { label: "Daily Car Rental", href: "/services/daily-car-rental", icon: "today", iconColor: C },
      { label: "Weekly Rental", href: "/services/weekly-car-rental", icon: "date_range", iconColor: A },
      { label: "Monthly Rental", href: "/services/monthly-car-rental", icon: "calendar_month", iconColor: C },
      { label: "Executive Rental", href: "/services/executive-car-rental", icon: "workspace_premium", iconColor: A },
      { label: "Wedding Car Rental", href: "/services/wedding-car-rental", icon: "celebration", iconColor: C },
      { label: "Hotel Transfer", href: "/services/hotel-transfer", icon: "hotel", iconColor: A },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    icon: "article",
    iconColor: C,
    children: [
      { label: "All Blogs", href: "/blog", icon: "library_books", iconColor: C },
      { label: "Car Rental Tips", href: "/blog/car-rental-tips", icon: "lightbulb", iconColor: A },
      { label: "Travel Guides", href: "/blog/travel-guides", icon: "travel_explore", iconColor: C },
      { label: "Islamabad Travel Guide", href: "/blog/islamabad-travel-guide", icon: "map", iconColor: A },
      { label: "Rawalpindi Travel Guide", href: "/blog/rawalpindi-travel-guide", icon: "map", iconColor: C },
      { label: "Company News", href: "/blog/company-news", icon: "newspaper", iconColor: A },
    ],
  },
  { label: "Contact Us", href: "/contact", icon: "call", iconColor: A },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  { label: "Airport Pick & Drop", href: "/services/airport-pick-drop" },
  { label: "Corporate Rental", href: "/services/corporate-car-rental" },
  { label: "Wedding Rental", href: "/services/wedding-car-rental" },
  { label: "Monthly Rental", href: "/services/monthly-car-rental" },
];

export const footerLocationLinks: NavLink[] = [
  { label: "Islamabad", href: "/rent-a-car/islamabad" },
  { label: "Rawalpindi", href: "/rent-a-car/rawalpindi" },
  { label: "Lahore", href: "/rent-a-car/lahore" },
  { label: "Murree", href: "/rent-a-car/murree" },
  { label: "Hunza", href: "/rent-a-car/hunza" },
  { label: "Skardu", href: "/rent-a-car/skardu" },
];

export const policyLinks: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Booking Policy", href: "/booking-policy" },
];
