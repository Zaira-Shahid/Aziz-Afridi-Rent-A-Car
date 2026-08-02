export type NavLink = {
  label: string;
  href: string;
};

export type CityPage = {
  slug: string;
  name: string;
  type: "primary" | "tourist" | "local";
};

export type ServicePage = {
  slug: string;
  name: string;
};

export type CarCategory = {
  slug: string;
  name: string;
};

export type CarModel = {
  slug: string;
  name: string;
  category: string;
  brand: string;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuel: string;
  priceDay: number;
  priceMonth: number;
  image: string;
  badge?: string;
  featured?: boolean;
  sale?: boolean;
  family?: boolean;
};

export type BlogCategory = {
  slug: string;
  name: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
