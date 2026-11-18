export const brand = {
  name: "Aziz Afridi Rent A Car",
  shortName: "Aziz Afridi",
  tagline: "Premium car rental across Pakistan",
  // Real client details. Used for tel: links, wa.me links and shown through formatPhoneDisplay().
  phone: "+923489899030",
  whatsapp: "923489899030",
  easypaisa: "0348 9899030",
  // Email not provided by the client yet (placeholder, see the client checklist in CLAUDE.md).
  email: "info@example.com",
  currency: "PKR",
  location: {
    label: "Aziz Afridi Rent A Car, Islamabad",
    address: "Aziz Afridi Rent A Car, Islamabad, Pakistan",
    mapsUrl: "https://share.google/IvT4geeFuCsP5LcV8",
    mapEmbedUrl: "https://www.google.com/maps?q=Aziz+Afridi+Rent+A+Car+Islamabad&output=embed",
  },
  social: {
    facebook: "https://www.facebook.com/azizafridirentacar/",
    instagram: "https://www.instagram.com/azizafridirentacar/",
    pinterest: "https://www.pinterest.com/azizafridirentacar/",
    x: "https://x.com/azizafridirentl",
  },
  colors: {
    primary: "#06264b",
    secondary: "#278a08",
    accent: "#278a08",
    background: "#F8F9FA",
  },
} as const;

export function formatPrice(amount: number) {
  return `${brand.currency} ${amount.toLocaleString("en-PK")}`;
}

/** Display phone for UI (same number used for Call Us everywhere) */
export function formatPhoneDisplay() {
  let digits = brand.phone.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length === 12) digits = `0${digits.slice(2)}`;
  if (digits.length === 11) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }
  return brand.phone;
}
