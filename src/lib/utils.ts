import { business } from "./content";
import type { Language } from "./content";

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

/**
 * Formats an IDR price as a short, readable starting value.
 * 350_000 -> "Rp 350rb"  (id) / "Rp 350K" (en)
 * 1_500_000 -> "Rp 1,5jt" (id) / "Rp 1.5M" (en)
 * 12_000_000 -> "Rp 12jt" (id) / "Rp 12M" (en)
 */
export function formatPriceFrom(amount: number, lang: Language): string {
  if (!Number.isFinite(amount) || amount <= 0) return "";

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const rounded = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1);
    if (lang === "id") {
      return `Rp ${rounded.replace(".", ",")}jt`;
    }
    return `Rp ${rounded}M`;
  }

  if (amount >= 1_000) {
    const thousands = Math.round(amount / 1_000);
    return lang === "id" ? `Rp ${thousands}rb` : `Rp ${thousands}K`;
  }

  return `Rp ${amount}`;
}
