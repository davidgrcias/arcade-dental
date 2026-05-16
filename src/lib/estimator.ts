import { services, type LocalizedText } from "./content";

export type PriceUnit = "package" | "per_tooth" | "per_session";

/** Maps service id -> how the price scales when more is added. */
export const priceUnits: Record<string, PriceUnit> = {
  ortodonti: "package",
  prostodonti: "per_tooth",
  scaling: "per_session",
  odontektomi: "per_tooth",
  implan: "per_tooth",
  pencabutan: "per_tooth",
  estetika: "per_tooth",
  periodonsia: "per_session",
  konservasi: "per_tooth",
  anak: "per_session",
  "penyakit-mulut": "per_session",
  "bedah-mulut": "package",
};

export const unitLabel: Record<PriceUnit, LocalizedText> = {
  package: { id: "Paket", en: "Package" },
  per_tooth: { id: "Per gigi", en: "Per tooth" },
  per_session: { id: "Per sesi", en: "Per session" },
};

export const unitShort: Record<PriceUnit, LocalizedText> = {
  package: { id: "paket", en: "pkg" },
  per_tooth: { id: "gigi", en: "tooth" },
  per_session: { id: "sesi", en: "session" },
};

/** Hard cap on quantity per service so users can't make absurd numbers. */
export const maxQuantity: Record<PriceUnit, number> = {
  package: 1,
  per_tooth: 8,
  per_session: 6,
};

export function getPriceUnit(serviceId: string): PriceUnit {
  return priceUnits[serviceId] ?? "package";
}

export type EstimatorEntry = { serviceId: string; quantity: number };

export function estimateTotal(entries: EstimatorEntry[]): number {
  let total = 0;
  for (const entry of entries) {
    const service = services.find((s) => s.id === entry.serviceId);
    if (!service?.priceFrom) continue;
    total += service.priceFrom * entry.quantity;
  }
  return total;
}

/**
 * Formats a number as Indonesian Rupiah currency.
 * 12_000_000 -> "Rp 12.000.000" (id) / "Rp 12,000,000" (en)
 */
export function formatRupiah(amount: number, lang: "id" | "en"): string {
  if (!Number.isFinite(amount) || amount <= 0) return "Rp 0";
  const locale = lang === "id" ? "id-ID" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
