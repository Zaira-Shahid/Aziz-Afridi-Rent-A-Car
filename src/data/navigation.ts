import type { NavItem, NavLink } from "@/types";

/** Project palette for nav icons */
const C = "#04C4E3"; // secondary
const A = "#BFF52C"; // accent

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
    children: [{ label: "All Cars", href: "/cars", icon: "garage", iconColor: C }],
    groups: [
      {
        label: "Car Categories",
        items: [
          { label: "Economy Fleet", href: "/categories/economy", icon: "savings", iconColor: C },
          { label: "Standard Fleet", href: "/categories/standard", icon: "directions_car", iconColor: A },
          { label: "Premium Fleet", href: "/categories/premium", icon: "workspace_premium", iconColor: C },
          { label: "SUV & Hybrid", href: "/categories/suv-hybrid", icon: "airport_shuttle", iconColor: A },
          { label: "Luxury Fleet", href: "/categories/luxury", icon: "diamond", iconColor: C },
          { label: "Executive SUV", href: "/categories/executive-suv", icon: "directions_car", iconColor: A },
          { label: "Group Travel", href: "/categories/group-travel", icon: "groups", iconColor: C },
          { label: "Corporate Fleet", href: "/categories/corporate", icon: "business_center", iconColor: A },
          { label: "Wedding & Event", href: "/categories/wedding-event", icon: "celebration", iconColor: C },
          { label: "Tourism Fleet", href: "/categories/tourism", icon: "landscape", iconColor: A },
        ],
      },
      {
        label: "Popular Cars",
        items: [
          { label: "Toyota Corolla", href: "/cars/toyota-corolla", logo: "/brands/toyota-logo.png" },
          { label: "Honda Civic 2025", href: "/cars/honda-civic-2025", logo: "/brands/honda-logo.png" },
          { label: "Toyota Revo", href: "/cars/toyota-revo", logo: "/brands/toyota-logo.png" },
          { label: "Toyota Prado", href: "/cars/toyota-prado", logo: "/brands/toyota-logo.png" },
          { label: "Kia Sportage", href: "/cars/kia-sportage", logo: "/brands/kia-logo.png" },
          { label: "Mercedes S500", href: "/cars/mercedes-s500", logo: "/brands/mercedes-logo.png" },
        ],
      },
    ],
  },
  {
    label: "City Services",
    href: "/city-services",
    icon: "location_on",
    iconColor: C,
    groups: [
      {
        label: "Popular Cities",
        items: [
          { label: "Islamabad", href: "/rent-a-car/islamabad", icon: "location_city", iconColor: C },
          { label: "Rawalpindi", href: "/rent-a-car/rawalpindi", icon: "location_city", iconColor: A },
          { label: "Lahore", href: "/rent-a-car/lahore", icon: "location_city", iconColor: C },
          { label: "Karachi", href: "/rent-a-car/karachi", icon: "location_city", iconColor: A },
          { label: "Peshawar", href: "/rent-a-car/peshawar", icon: "location_city", iconColor: C },
          { label: "Abbottabad", href: "/rent-a-car/abbottabad", icon: "location_city", iconColor: A },
        ],
      },
      {
        label: "Tourist Areas",
        items: [
          { label: "Murree", href: "/rent-a-car/murree", icon: "landscape", iconColor: A },
          { label: "Naran", href: "/rent-a-car/naran", icon: "landscape", iconColor: C },
          { label: "Kaghan", href: "/rent-a-car/kaghan", icon: "landscape", iconColor: A },
          { label: "Hunza", href: "/rent-a-car/hunza", icon: "terrain", iconColor: C },
          { label: "Skardu", href: "/rent-a-car/skardu", icon: "terrain", iconColor: A },
          { label: "Swat", href: "/rent-a-car/swat", icon: "landscape", iconColor: C },
        ],
      },
      {
        label: "Islamabad Areas",
        items: [
          { label: "Bahria Town", href: "/rent-a-car/bahria-town", icon: "home_work", iconColor: A },
          { label: "DHA Islamabad", href: "/rent-a-car/dha-islamabad", icon: "home_work", iconColor: C },
          { label: "Blue Area", href: "/rent-a-car/blue-area", icon: "apartment", iconColor: A },
          { label: "Islamabad Airport", href: "/rent-a-car/islamabad-airport", icon: "flight", iconColor: C },
          { label: "F-6", href: "/rent-a-car/f-6-islamabad", icon: "map", iconColor: A },
          { label: "F-7", href: "/rent-a-car/f-7-islamabad", icon: "map", iconColor: C },
          { label: "F-8", href: "/rent-a-car/f-8-islamabad", icon: "map", iconColor: A },
        ],
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
