export const brand = {
  name: "Signature Rent A Car",
  shortName: "Signature",
  tagline: "Premium car rental across Pakistan",
  phone: "03299499996",
  whatsapp: "923299499996",
  email: "info@signaturerentacar.com",
  currency: "PKR",
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
