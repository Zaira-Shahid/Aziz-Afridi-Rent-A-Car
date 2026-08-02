import type { NavItem, NavLink } from "@/types";

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Company", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    label: "Our Cars",
    href: "/cars",
    children: [{ label: "All Cars", href: "/cars" }],
    groups: [
      {
        label: "Car Categories",
        items: [
          { label: "Economy Cars", href: "/categories/economy" },
          { label: "Sedan Cars", href: "/categories/sedan" },
          { label: "SUV Rental", href: "/categories/suv" },
          { label: "Luxury Cars", href: "/categories/luxury" },
          { label: "Hiace Rental", href: "/categories/hiace" },
        ],
      },
      {
        label: "Popular Cars",
        items: [
          { label: "Toyota Corolla", href: "/cars/toyota-corolla" },
          { label: "Honda Civic", href: "/cars/honda-civic" },
          { label: "Toyota Fortuner", href: "/cars/toyota-fortuner" },
          { label: "Toyota Prado", href: "/cars/toyota-prado" },
          { label: "Kia Sportage", href: "/cars/kia-sportage" },
          { label: "Toyota Hiace", href: "/cars/toyota-hiace" },
        ],
      },
    ],
  },
  {
    label: "City Services",
    href: "/city-services",
    groups: [
      {
        label: "Popular Cities",
        items: [
          { label: "Islamabad", href: "/rent-a-car/islamabad" },
          { label: "Rawalpindi", href: "/rent-a-car/rawalpindi" },
          { label: "Lahore", href: "/rent-a-car/lahore" },
          { label: "Karachi", href: "/rent-a-car/karachi" },
          { label: "Peshawar", href: "/rent-a-car/peshawar" },
          { label: "Abbottabad", href: "/rent-a-car/abbottabad" },
        ],
      },
      {
        label: "Tourist Areas",
        items: [
          { label: "Murree", href: "/rent-a-car/murree" },
          { label: "Naran", href: "/rent-a-car/naran" },
          { label: "Kaghan", href: "/rent-a-car/kaghan" },
          { label: "Hunza", href: "/rent-a-car/hunza" },
          { label: "Skardu", href: "/rent-a-car/skardu" },
          { label: "Swat", href: "/rent-a-car/swat" },
        ],
      },
      {
        label: "Islamabad Areas",
        items: [
          { label: "Bahria Town", href: "/rent-a-car/bahria-town" },
          { label: "DHA Islamabad", href: "/rent-a-car/dha-islamabad" },
          { label: "Blue Area", href: "/rent-a-car/blue-area" },
          { label: "Islamabad Airport", href: "/rent-a-car/islamabad-airport" },
          { label: "F-6", href: "/rent-a-car/f-6-islamabad" },
          { label: "F-7", href: "/rent-a-car/f-7-islamabad" },
          { label: "F-8", href: "/rent-a-car/f-8-islamabad" },
        ],
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Airport Pick & Drop", href: "/services/airport-pick-drop" },
      { label: "Corporate Car Rental", href: "/services/corporate-car-rental" },
      { label: "Daily Car Rental", href: "/services/daily-car-rental" },
      { label: "Weekly Rental", href: "/services/weekly-car-rental" },
      { label: "Monthly Rental", href: "/services/monthly-car-rental" },
      { label: "Executive Rental", href: "/services/executive-car-rental" },
      { label: "Wedding Car Rental", href: "/services/wedding-car-rental" },
      { label: "Hotel Transfer", href: "/services/hotel-transfer" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    children: [
      { label: "All Blogs", href: "/blog" },
      { label: "Car Rental Tips", href: "/blog/car-rental-tips" },
      { label: "Travel Guides", href: "/blog/travel-guides" },
      { label: "Islamabad Travel Guide", href: "/blog/islamabad-travel-guide" },
      { label: "Rawalpindi Travel Guide", href: "/blog/rawalpindi-travel-guide" },
      { label: "Company News", href: "/blog/company-news" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
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
