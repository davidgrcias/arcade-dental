import { business } from "./content";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter((word) => word !== "drg.")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}
