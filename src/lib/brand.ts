export const brand = {
  name: "Signature Rent A Car",
  shortName: "Signature",
  tagline: "Premium car rental across Pakistan",
  phone: "03005107693",
  whatsapp: "923005107693",
  email: "info@signaturesrentacar.com",
  currency: "PKR",
  location: {
    label: "Signature Rent A Car, Islamabad",
    address: "Signature Rent A Car, Islamabad, Pakistan",
    mapsUrl: "https://share.google/sQFsY8bFiIJZUcKvR",
  },
  social: {
    facebook: "https://www.facebook.com/signaturesrentacar/",
    instagram: "https://www.instagram.com/signaturesrentacar/",
    tiktok: "https://www.tiktok.com/@signaturesrentacar/",
    youtube: "https://www.youtube.com/@signaturesrentacar",
    pinterest: "https://www.pinterest.com/signaturesrentacar/",
  },
  colors: {
    primary: "#000B1D",
    secondary: "#04C4E3",
    accent: "#BFF52C",
    background: "#F8F9FA",
  },
} as const;

export function formatPrice(amount: number) {
  return `${brand.currency} ${amount.toLocaleString("en-PK")}`;
}

/** Display phone for UI (same number used for Call Us everywhere) */
export function formatPhoneDisplay() {
  const digits = brand.phone.replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return brand.phone;
}
