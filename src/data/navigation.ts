import type { NavItem, NavLink } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  {
    label: "About Us",
    href: "/about",
    icon: "info",
    children: [
      { label: "About Company", href: "/about", icon: "apartment" },
      { label: "Reviews", href: "/reviews", icon: "star" },
      { label: "FAQ", href: "/faq", icon: "help" },
    ],
  },
  {
    label: "Our Cars",
    href: "/cars",
    icon: "directions_car",
    children: [{ label: "All Cars", href: "/cars", icon: "garage" }],
    groups: [
      {
        label: "Car Categories",
        items: [
          { label: "Economy Cars", href: "/categories/economy", icon: "savings" },
          { label: "Sedan Cars", href: "/categories/sedan", icon: "directions_car" },
          { label: "SUV Rental", href: "/categories/suv", icon: "airport_shuttle" },
          { label: "Luxury Cars", href: "/categories/luxury", icon: "diamond" },
          { label: "Hiace Rental", href: "/categories/hiace", icon: "airport_shuttle" },
        ],
      },
      {
        label: "Popular Cars",
        items: [
          { label: "Toyota Corolla", href: "/cars/toyota-corolla", icon: "directions_car" },
          { label: "Honda Civic", href: "/cars/honda-civic", icon: "directions_car" },
          { label: "Toyota Fortuner", href: "/cars/toyota-fortuner", icon: "airport_shuttle" },
          { label: "Toyota Prado", href: "/cars/toyota-prado", icon: "airport_shuttle" },
          { label: "Kia Sportage", href: "/cars/kia-sportage", icon: "directions_car" },
          { label: "Toyota Hiace", href: "/cars/toyota-hiace", icon: "airport_shuttle" },
        ],
      },
    ],
  },
  {
    label: "City Services",
    href: "/city-services",
    icon: "location_on",
    groups: [
      {
        label: "Popular Cities",
        items: [
          { label: "Islamabad", href: "/rent-a-car/islamabad", icon: "location_city" },
          { label: "Rawalpindi", href: "/rent-a-car/rawalpindi", icon: "location_city" },
          { label: "Lahore", href: "/rent-a-car/lahore", icon: "location_city" },
          { label: "Karachi", href: "/rent-a-car/karachi", icon: "location_city" },
          { label: "Peshawar", href: "/rent-a-car/peshawar", icon: "location_city" },
          { label: "Abbottabad", href: "/rent-a-car/abbottabad", icon: "location_city" },
        ],
      },
      {
        label: "Tourist Areas",
        items: [
          { label: "Murree", href: "/rent-a-car/murree", icon: "landscape" },
          { label: "Naran", href: "/rent-a-car/naran", icon: "landscape" },
          { label: "Kaghan", href: "/rent-a-car/kaghan", icon: "landscape" },
          { label: "Hunza", href: "/rent-a-car/hunza", icon: "terrain" },
          { label: "Skardu", href: "/rent-a-car/skardu", icon: "terrain" },
          { label: "Swat", href: "/rent-a-car/swat", icon: "landscape" },
        ],
      },
      {
        label: "Islamabad Areas",
        items: [
          { label: "Bahria Town", href: "/rent-a-car/bahria-town", icon: "home_work" },
          { label: "DHA Islamabad", href: "/rent-a-car/dha-islamabad", icon: "home_work" },
          { label: "Blue Area", href: "/rent-a-car/blue-area", icon: "apartment" },
          { label: "Islamabad Airport", href: "/rent-a-car/islamabad-airport", icon: "flight" },
          { label: "F-6", href: "/rent-a-car/f-6-islamabad", icon: "map" },
          { label: "F-7", href: "/rent-a-car/f-7-islamabad", icon: "map" },
          { label: "F-8", href: "/rent-a-car/f-8-islamabad", icon: "map" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    icon: "miscellaneous_services",
    children: [
      { label: "Airport Pick & Drop", href: "/services/airport-pick-drop", icon: "flight_land" },
      { label: "Corporate Car Rental", href: "/services/corporate-car-rental", icon: "business_center" },
      { label: "Daily Car Rental", href: "/services/daily-car-rental", icon: "today" },
      { label: "Weekly Rental", href: "/services/weekly-car-rental", icon: "date_range" },
      { label: "Monthly Rental", href: "/services/monthly-car-rental", icon: "calendar_month" },
      { label: "Executive Rental", href: "/services/executive-car-rental", icon: "workspace_premium" },
      { label: "Wedding Car Rental", href: "/services/wedding-car-rental", icon: "celebration" },
      { label: "Hotel Transfer", href: "/services/hotel-transfer", icon: "hotel" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    icon: "article",
    children: [
      { label: "All Blogs", href: "/blog", icon: "library_books" },
      { label: "Car Rental Tips", href: "/blog/car-rental-tips", icon: "lightbulb" },
      { label: "Travel Guides", href: "/blog/travel-guides", icon: "travel_explore" },
      { label: "Islamabad Travel Guide", href: "/blog/islamabad-travel-guide", icon: "map" },
      { label: "Rawalpindi Travel Guide", href: "/blog/rawalpindi-travel-guide", icon: "map" },
      { label: "Company News", href: "/blog/company-news", icon: "newspaper" },
    ],
  },
  { label: "Contact Us", href: "/contact", icon: "call" },
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
