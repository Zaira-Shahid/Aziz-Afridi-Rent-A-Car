export const brand = {
  name: "Signature Rent A Car",
  shortName: "Signature",
  tagline: "Premium car rental across Pakistan",
  phone: "+92 300 0000000",
  whatsapp: "923000000000",
  email: "info@signaturerentacar.com",
  currency: "PKR",
  colors: {
    primary: "#000B1D",
    secondary: "#04C4E3",
    accent: "#AEE20F",
    background: "#F6F7F8",
  },
} as const;

export function formatPrice(amount: number) {
  return `${brand.currency} ${amount.toLocaleString("en-PK")}`;
}
