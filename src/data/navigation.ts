import type { NavItem, NavLink } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", icon: "home", iconColor: "#04C4E3" },
  {
    label: "About Us",
    href: "/about",
    icon: "info",
    iconColor: "#04C4E3",
    children: [
      { label: "About Company", href: "/about", icon: "apartment", iconColor: "#04C4E3" },
      { label: "Reviews", href: "/reviews", icon: "star", iconColor: "#F5A623" },
      { label: "FAQ", href: "/faq", icon: "help", iconColor: "#7C5CFC" },
    ],
  },
  {
    label: "Our Cars",
    href: "/cars",
    icon: "directions_car",
    iconColor: "#BFF52C",
    children: [{ label: "All Cars", href: "/cars", icon: "garage", iconColor: "#04C4E3" }],
    groups: [
      {
        label: "Car Categories",
        items: [
          { label: "Economy Cars", href: "/categories/economy", icon: "savings", iconColor: "#22C55E" },
          { label: "Sedan Cars", href: "/categories/sedan", icon: "directions_car", iconColor: "#04C4E3" },
          { label: "SUV Rental", href: "/categories/suv", icon: "airport_shuttle", iconColor: "#F59E0B" },
          { label: "Luxury Cars", href: "/categories/luxury", icon: "diamond", iconColor: "#A855F7" },
          { label: "Hiace Rental", href: "/categories/hiace", icon: "airport_shuttle", iconColor: "#EF4444" },
        ],
      },
      {
        label: "Popular Cars",
        items: [
          { label: "Toyota Corolla", href: "/cars/toyota-corolla", logo: "/brands/toyota.svg" },
          { label: "Honda Civic", href: "/cars/honda-civic", logo: "/brands/honda.svg" },
          { label: "Toyota Fortuner", href: "/cars/toyota-fortuner", logo: "/brands/toyota.svg" },
          { label: "Toyota Prado", href: "/cars/toyota-prado", logo: "/brands/toyota.svg" },
          { label: "Kia Sportage", href: "/cars/kia-sportage", logo: "/brands/kia.svg" },
          { label: "Toyota Hiace", href: "/cars/toyota-hiace", logo: "/brands/toyota.svg" },
        ],
      },
    ],
  },
  {
    label: "City Services",
    href: "/city-services",
    icon: "location_on",
    iconColor: "#EF4444",
    groups: [
      {
        label: "Popular Cities",
        items: [
          { label: "Islamabad", href: "/rent-a-car/islamabad", icon: "location_city", iconColor: "#04C4E3" },
          { label: "Rawalpindi", href: "/rent-a-car/rawalpindi", icon: "location_city", iconColor: "#F59E0B" },
          { label: "Lahore", href: "/rent-a-car/lahore", icon: "location_city", iconColor: "#EF4444" },
          { label: "Karachi", href: "/rent-a-car/karachi", icon: "location_city", iconColor: "#22C55E" },
          { label: "Peshawar", href: "/rent-a-car/peshawar", icon: "location_city", iconColor: "#A855F7" },
          { label: "Abbottabad", href: "/rent-a-car/abbottabad", icon: "location_city", iconColor: "#0EA5E9" },
        ],
      },
      {
        label: "Tourist Areas",
        items: [
          { label: "Murree", href: "/rent-a-car/murree", icon: "landscape", iconColor: "#22C55E" },
          { label: "Naran", href: "/rent-a-car/naran", icon: "landscape", iconColor: "#14B8A6" },
          { label: "Kaghan", href: "/rent-a-car/kaghan", icon: "landscape", iconColor: "#10B981" },
          { label: "Hunza", href: "/rent-a-car/hunza", icon: "terrain", iconColor: "#3B82F6" },
          { label: "Skardu", href: "/rent-a-car/skardu", icon: "terrain", iconColor: "#6366F1" },
          { label: "Swat", href: "/rent-a-car/swat", icon: "landscape", iconColor: "#84CC16" },
        ],
      },
      {
        label: "Islamabad Areas",
        items: [
          { label: "Bahria Town", href: "/rent-a-car/bahria-town", icon: "home_work", iconColor: "#F59E0B" },
          { label: "DHA Islamabad", href: "/rent-a-car/dha-islamabad", icon: "home_work", iconColor: "#04C4E3" },
          { label: "Blue Area", href: "/rent-a-car/blue-area", icon: "apartment", iconColor: "#3B82F6" },
          { label: "Islamabad Airport", href: "/rent-a-car/islamabad-airport", icon: "flight", iconColor: "#0EA5E9" },
          { label: "F-6", href: "/rent-a-car/f-6-islamabad", icon: "map", iconColor: "#A855F7" },
          { label: "F-7", href: "/rent-a-car/f-7-islamabad", icon: "map", iconColor: "#EC4899" },
          { label: "F-8", href: "/rent-a-car/f-8-islamabad", icon: "map", iconColor: "#F43F5E" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    icon: "support_agent",
    iconColor: "#7C5CFC",
    children: [
      { label: "Airport Pick & Drop", href: "/services/airport-pick-drop", icon: "flight_land", iconColor: "#0EA5E9" },
      { label: "Corporate Car Rental", href: "/services/corporate-car-rental", icon: "business_center", iconColor: "#6366F1" },
      { label: "Daily Car Rental", href: "/services/daily-car-rental", icon: "today", iconColor: "#22C55E" },
      { label: "Weekly Rental", href: "/services/weekly-car-rental", icon: "date_range", iconColor: "#14B8A6" },
      { label: "Monthly Rental", href: "/services/monthly-car-rental", icon: "calendar_month", iconColor: "#F59E0B" },
      { label: "Executive Rental", href: "/services/executive-car-rental", icon: "workspace_premium", iconColor: "#A855F7" },
      { label: "Wedding Car Rental", href: "/services/wedding-car-rental", icon: "celebration", iconColor: "#EC4899" },
      { label: "Hotel Transfer", href: "/services/hotel-transfer", icon: "hotel", iconColor: "#04C4E3" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    icon: "article",
    iconColor: "#F59E0B",
    children: [
      { label: "All Blogs", href: "/blog", icon: "library_books", iconColor: "#04C4E3" },
      { label: "Car Rental Tips", href: "/blog/car-rental-tips", icon: "lightbulb", iconColor: "#F5A623" },
      { label: "Travel Guides", href: "/blog/travel-guides", icon: "travel_explore", iconColor: "#22C55E" },
      { label: "Islamabad Travel Guide", href: "/blog/islamabad-travel-guide", icon: "map", iconColor: "#3B82F6" },
      { label: "Rawalpindi Travel Guide", href: "/blog/rawalpindi-travel-guide", icon: "map", iconColor: "#EF4444" },
      { label: "Company News", href: "/blog/company-news", icon: "newspaper", iconColor: "#A855F7" },
    ],
  },
  { label: "Contact Us", href: "/contact", icon: "call", iconColor: "#BFF52C" },
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
