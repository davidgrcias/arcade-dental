import { doctors } from "./content";

export type Slot = {
  /** "10:00" - "19:30" */
  time: string;
  /** Hardcoded "booked" mark for the demo. */
  booked: boolean;
};

export type DaySchedule = {
  /** YYYY-MM-DD in local clock. */
  dateIso: string;
  /** Day of month, 1-31. */
  dayOfMonth: number;
  /** 0 = Sunday, 6 = Saturday. */
  weekday: number;
  /** True for Sundays in our hours. */
  closed: boolean;
  slots: Slot[];
};

const OPEN_HOUR = 10;
const CLOSE_HOUR = 20;
const SLOT_MINUTES = 30;

/**
 * Deterministic pseudo-random in [0, 1) based on a string.
 * Used so SSR and the client agree on which slots are "booked".
 */
function hash01(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Generate a 14-day availability map for a given doctor, starting at `from`.
 * Sundays are closed, ~35% of slots flagged as booked, deterministic by doctor + time.
 */
export function getDoctorAvailability(
  doctorId: string,
  from: Date,
  days = 14,
): DaySchedule[] {
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);

  const result: DaySchedule[] = [];
  for (let d = 0; d < days; d++) {
    const date = new Date(start);
    date.setDate(start.getDate() + d);

    const dateIso = toIsoDate(date);
    const weekday = date.getDay();
    const closed = weekday === 0; // Sundays closed

    const slots: Slot[] = [];
    if (!closed) {
      for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
        for (let min = 0; min < 60; min += SLOT_MINUTES) {
          const time = `${pad(hour)}:${pad(min)}`;
          const seed = `${doctorId}|${dateIso}|${time}`;
          const booked = hash01(seed) < 0.35;
          slots.push({ time, booked });
        }
      }
    }

    result.push({
      dateIso,
      dayOfMonth: date.getDate(),
      weekday,
      closed,
      slots,
    });
  }
  return result;
}

/** Quick "any available specialist today" stat for the marketing strip. */
export function nextAvailableCount(from: Date): { today: number; week: number } {
  const today = toIsoDate(from);
  let todayCount = 0;
  let weekCount = 0;
  for (const doctor of doctors) {
    const sched = getDoctorAvailability(doctor.id, from, 7);
    for (const day of sched) {
      const open = day.slots.filter((s) => !s.booked).length;
      if (day.dateIso === today) todayCount += open;
      weekCount += open;
    }
  }
  return { today: todayCount, week: weekCount };
}

export function generateBookingRef(seed?: string): string {
  const base = seed ?? Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 0xffff)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `AD-${base.slice(-4)}${rand}`;
}

export function formatHumanDate(dateIso: string, lang: "id" | "en"): string {
  const date = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateIso;
  const locale = lang === "id" ? "id-ID" : "en-US";
  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(dateIso: string, lang: "id" | "en"): string {
  const date = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateIso;
  const locale = lang === "id" ? "id-ID" : "en-US";
  return date.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
