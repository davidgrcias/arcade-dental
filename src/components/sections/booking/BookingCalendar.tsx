"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { doctors, services, business } from "@/lib/content";
import {
  formatHumanDate,
  formatShortDate,
  generateBookingRef,
  getDoctorAvailability,
  nextAvailableCount,
} from "@/lib/booking";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/utils";
import { getInitials } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Step = "doctor" | "schedule" | "details" | "confirm";

const stepOrder: Step[] = ["doctor", "schedule", "details", "confirm"];

const stepLabels: Record<Step, { id: string; en: string }> = {
  doctor: { id: "Pilih Dokter", en: "Pick Doctor" },
  schedule: { id: "Pilih Jadwal", en: "Pick Schedule" },
  details: { id: "Data Pasien", en: "Patient Details" },
  confirm: { id: "Konfirmasi", en: "Confirmation" },
};

export function BookingCalendar({
  initialDoctorId,
}: {
  initialDoctorId?: string;
} = {}) {
  const { t, lang, c } = useLanguage();

  const presetDoctor = useMemo(() => {
    if (!initialDoctorId) return null;
    return doctors.find((d) => d.id === initialDoctorId) ?? null;
  }, [initialDoctorId]);

  const [step, setStep] = useState<Step>(presetDoctor ? "schedule" : "doctor");
  const [doctorId, setDoctorId] = useState<string | null>(presetDoctor?.id ?? null);
  const [serviceId, setServiceId] = useState<string>(services[0].id);
  const [dateIso, setDateIso] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingRef, setBookingRef] = useState<string>("");

  // If the URL doctor param changes after mount (client-side navigation),
  // resync once so the wizard reflects the latest preselection.
  useEffect(() => {
    if (!initialDoctorId) return;
    if (initialDoctorId === doctorId) return;
    const next = doctors.find((d) => d.id === initialDoctorId);
    if (!next) return;
    setDoctorId(next.id);
    setDateIso(null);
    setTime(null);
    setStep("schedule");
    // Intentionally only reacting to initialDoctorId here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDoctorId]);

  // The "now" reference. Frozen on mount so the SSR HTML matches the first
  // client render, and so the slot grid does not shift mid-interaction.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  const stats = useMemo(() => {
    if (!now) return { today: 0, week: 0 };
    return nextAvailableCount(now);
  }, [now]);

  const doctor = useMemo(
    () => doctors.find((d) => d.id === doctorId) ?? null,
    [doctorId],
  );

  const schedule = useMemo(() => {
    if (!doctor || !now) return [];
    return getDoctorAvailability(doctor.id, now, 14);
  }, [doctor, now]);

  const day = useMemo(() => {
    if (!dateIso) return null;
    return schedule.find((d) => d.dateIso === dateIso) ?? null;
  }, [schedule, dateIso]);

  function selectDoctor(id: string) {
    setDoctorId(id);
    setDateIso(null);
    setTime(null);
    setStep("schedule");
  }

  function selectSlot(d: string, slot: string) {
    setDateIso(d);
    setTime(slot);
    setStep("details");
  }

  function submitDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBookingRef(generateBookingRef(`${doctorId}-${dateIso}-${time}`));
    setStep("confirm");
  }

  function buildWaMessage(): string {
    if (!doctor || !dateIso || !time) return "";
    const service = services.find((s) => s.id === serviceId);
    return [
      lang === "id"
        ? `Halo ${business.name}, saya ingin konfirmasi booking dengan rincian berikut:`
        : `Hi ${business.name}, please confirm my booking with the following details:`,
      "",
      `${lang === "id" ? "Ref" : "Ref"}: ${bookingRef}`,
      `${lang === "id" ? "Nama" : "Name"}: ${name}`,
      `${lang === "id" ? "No. WA" : "WA"}: ${phone}`,
      `${lang === "id" ? "Dokter" : "Doctor"}: ${doctor.name} (${t(doctor.role)})`,
      `${lang === "id" ? "Layanan" : "Service"}: ${service ? t(service.title) : "-"}`,
      `${lang === "id" ? "Tanggal" : "Date"}: ${formatHumanDate(dateIso, lang)}`,
      `${lang === "id" ? "Jam" : "Time"}: ${time}`,
      notes ? `${lang === "id" ? "Catatan" : "Notes"}: ${notes}` : "",
      "",
      lang === "id"
        ? "Mohon konfirmasi ya, terima kasih."
        : "Please confirm. Thank you.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  const heroStats = [
    {
      value: String(stats.today),
      label: lang === "id" ? "Slot tersedia hari ini" : "Slots open today",
      icon: "spark" as const,
    },
    {
      value: String(stats.week),
      label: lang === "id" ? "Slot 7 hari ke depan" : "Slots in next 7 days",
      icon: "calendar" as const,
    },
    {
      value: String(doctors.length),
      label: lang === "id" ? "Dokter aktif" : "Active doctors",
      icon: "heart" as const,
    },
  ];

  const stepIndex = stepOrder.indexOf(step);

  return (
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <SectionHeading
          eyebrow={c.bookingLabel}
          title={c.bookingTitle}
          body={c.bookingBody}
        />

        {/* Live availability strip */}
        <div className="gs-reveal grid gap-3 rounded-2xl border border-primary/8 bg-white p-3 shadow-sm sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl bg-surface-2/45 px-3 py-3 sm:px-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary text-gold">
                <Icon name={stat.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-2xl leading-none text-primary">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/55">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stepper — compact pills on mobile (number only), full label on sm+ */}
        <ol className="no-scrollbar mt-6 flex items-center gap-2 overflow-x-auto pb-1 text-sm sm:mt-8 sm:flex-wrap sm:overflow-visible">
          {stepOrder.map((s, i) => {
            const active = i === stepIndex;
            const done = i < stepIndex;
            return (
              <li key={s} className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Only allow stepping back to a completed step
                    if (done) setStep(s);
                  }}
                  disabled={!done}
                  className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-bold transition-colors sm:px-3 ${
                    active
                      ? "bg-primary text-white shadow-md"
                      : done
                        ? "bg-cta/12 text-cta hover:bg-cta hover:text-white"
                        : "bg-surface-2 text-primary/55"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-accent text-[10px] ${
                      active
                        ? "bg-gold text-primary"
                        : done
                          ? "bg-cta text-white"
                          : "bg-white text-primary/55"
                    }`}
                  >
                    {done ? <Icon name="check" className="h-2.5 w-2.5" /> : i + 1}
                  </span>
                  <span className={active ? "inline" : "hidden sm:inline"}>
                    {stepLabels[s][lang]}
                  </span>
                </button>
                {i < stepOrder.length - 1 && (
                  <span aria-hidden className="hidden h-px w-8 bg-primary/15 sm:inline-block" />
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Left: step content */}
          <div className="rounded-2xl border border-primary/8 bg-white p-4 shadow-sm sm:p-5 md:p-6">
            {step === "doctor" && (
              <DoctorPicker
                onSelect={selectDoctor}
                lang={lang}
                t={t}
                serviceId={serviceId}
                setServiceId={setServiceId}
              />
            )}
            {step === "schedule" && doctor && (
              <SchedulePicker
                doctor={doctor}
                schedule={schedule}
                dateIso={dateIso}
                setDateIso={setDateIso}
                onSelectSlot={selectSlot}
                onBack={() => setStep("doctor")}
                day={day}
                lang={lang}
              />
            )}
            {step === "details" && doctor && dateIso && time && (
              <DetailsForm
                onSubmit={submitDetails}
                onBack={() => setStep("schedule")}
                doctorName={doctor.name}
                dateIso={dateIso}
                time={time}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                notes={notes}
                setNotes={setNotes}
                lang={lang}
              />
            )}
            {step === "confirm" && doctor && dateIso && time && (
              <Confirmation
                bookingRef={bookingRef}
                doctorName={doctor.name}
                doctorRole={t(doctor.role)}
                serviceTitle={t(
                  services.find((s) => s.id === serviceId)?.title ?? { id: "-", en: "-" },
                )}
                dateIso={dateIso}
                time={time}
                name={name}
                onWa={() => window.open(buildWhatsAppUrl(buildWaMessage()), "_blank")}
                onReset={() => {
                  setStep("doctor");
                  setDoctorId(null);
                  setDateIso(null);
                  setTime(null);
                  setName("");
                  setPhone("");
                  setNotes("");
                  setBookingRef("");
                }}
                lang={lang}
              />
            )}
          </div>

          {/* Right: booking summary */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <BookingSummary
              doctor={doctor}
              dateIso={dateIso}
              time={time}
              serviceId={serviceId}
              name={name}
              phone={phone}
              lang={lang}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface DoctorPickerProps {
  onSelect: (id: string) => void;
  lang: "id" | "en";
  t: (loc: { id: string; en: string }) => string;
  serviceId: string;
  setServiceId: (id: string) => void;
}

function DoctorPicker({ onSelect, lang, t, serviceId, setServiceId }: DoctorPickerProps) {
  return (
    <div>
      <p className="font-display text-2xl text-primary">
        {lang === "id" ? "Mau konsultasi soal apa?" : "What is the consultation about?"}
      </p>
      <p className="mt-1 text-sm text-secondary">
        {lang === "id"
          ? "Pilih layanan dulu, lalu pilih dokter yang menanganinya."
          : "Pick the service first, then choose the doctor handling it."}
      </p>

      <label htmlFor="booking-service" className="form-label mt-5">
        {lang === "id" ? "Layanan" : "Service"}
      </label>
      <select
        id="booking-service"
        value={serviceId}
        onChange={(e) => setServiceId(e.target.value)}
        className="form-control"
      >
        {services.map((service) => (
          <option key={service.id} value={service.id}>
            {t(service.title)}
          </option>
        ))}
      </select>

      <p className="mt-7 font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
        {lang === "id" ? "Pilih dokter" : "Choose a doctor"}
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {doctors.map((doctor) => (
          <li key={doctor.id}>
            <button
              type="button"
              onClick={() => onSelect(doctor.id)}
              className="group flex w-full items-center gap-3 rounded-xl border border-primary/10 bg-white p-3 text-left transition-all hover:-translate-y-0.5 hover:border-gold/55 hover:shadow-md"
            >
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-surface-2 ring-1 ring-primary/8">
                {doctor.photo ? (
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center font-display text-base font-bold text-primary/70">
                    {getInitials(doctor.name)}
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base text-primary">{doctor.name}</p>
                <p className="truncate text-xs text-secondary">{t(doctor.role)}</p>
              </div>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-cta transition-colors group-hover:bg-cta group-hover:text-white">
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SchedulePickerProps {
  doctor: (typeof doctors)[number];
  schedule: ReturnType<typeof getDoctorAvailability>;
  dateIso: string | null;
  setDateIso: (iso: string) => void;
  onSelectSlot: (dateIso: string, time: string) => void;
  onBack: () => void;
  day: ReturnType<typeof getDoctorAvailability>[number] | null;
  lang: "id" | "en";
}

function SchedulePicker({
  doctor,
  schedule,
  dateIso,
  setDateIso,
  onSelectSlot,
  onBack,
  day,
  lang,
}: SchedulePickerProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary/65 transition-colors hover:text-primary"
      >
        <Icon name="arrow" className="h-3 w-3 rotate-180" />
        {lang === "id" ? "Ganti dokter" : "Change doctor"}
      </button>

      <p className="mt-3 font-display text-2xl text-primary">
        {lang === "id" ? "Pilih tanggal & jam" : "Pick a date & time"}
      </p>
      <p className="mt-1 text-sm text-secondary">
        {lang === "id"
          ? `Jadwal ${doctor.name} untuk 14 hari ke depan. Slot abu-abu sudah dibooking.`
          : `${doctor.name}'s schedule for the next 14 days. Greyed slots are already booked.`}
      </p>

      {/* Horizontal-scroll date strip — extra inline padding so first/last
          chip aren't flush against the card edge on mobile. */}
      <div className="no-scrollbar mt-5 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-5 sm:px-5 md:-mx-6 md:px-6">
        {schedule.map((d) => {
          const open = d.slots.filter((s) => !s.booked).length;
          const isSelected = dateIso === d.dateIso;
          const isClosed = d.closed;
          return (
            <button
              key={d.dateIso}
              type="button"
              onClick={() => !isClosed && setDateIso(d.dateIso)}
              disabled={isClosed}
              className={`min-w-[88px] shrink-0 rounded-xl border px-3 py-3 text-center transition-all ${
                isSelected
                  ? "border-cta bg-cta text-white shadow-md"
                  : isClosed
                    ? "cursor-not-allowed border-primary/8 bg-surface-2/40 text-primary/35"
                    : "border-primary/10 bg-white text-primary hover:-translate-y-0.5 hover:border-gold/60"
              }`}
            >
              <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] opacity-70">
                {formatShortDate(d.dateIso, lang).split(",")[0]}
              </p>
              <p className="mt-1 font-display text-2xl leading-none">{d.dayOfMonth}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">
                {isClosed
                  ? lang === "id" ? "Tutup" : "Closed"
                  : `${open} ${lang === "id" ? "slot" : "slots"}`}
              </p>
            </button>
          );
        })}
      </div>

      {!day && (
        <p className="mt-6 rounded-xl border border-dashed border-primary/15 bg-surface-2/45 p-6 text-center text-sm text-primary/60">
          {lang === "id" ? "Pilih tanggal untuk melihat slot." : "Pick a date to see available slots."}
        </p>
      )}

      {day && day.closed && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          {lang === "id"
            ? "Klinik tutup di tanggal ini. Silakan pilih tanggal lain."
            : "The clinic is closed on this date. Please pick another."}
        </p>
      )}

      {day && !day.closed && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-base text-primary">
              {formatHumanDate(day.dateIso, lang)}
            </p>
            <p className="text-xs text-primary/55">
              {day.slots.filter((s) => !s.booked).length} {lang === "id" ? "slot tersedia" : "slots open"}
            </p>
          </div>
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {day.slots.map((slot) => (
              <li key={slot.time}>
                <button
                  type="button"
                  onClick={() => !slot.booked && onSelectSlot(day.dateIso, slot.time)}
                  disabled={slot.booked}
                  className={`min-h-10 w-full rounded-lg border text-sm font-bold transition-all ${
                    slot.booked
                      ? "cursor-not-allowed border-primary/8 bg-surface-2/45 text-primary/30 line-through"
                      : "border-primary/12 bg-white text-primary hover:-translate-y-0.5 hover:border-cta hover:bg-cta hover:text-white"
                  }`}
                  aria-label={
                    slot.booked
                      ? `${slot.time} ${lang === "id" ? "sudah dibooking" : "already booked"}`
                      : `${lang === "id" ? "Pilih jam" : "Pick"} ${slot.time}`
                  }
                >
                  {slot.time}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface DetailsFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  doctorName: string;
  dateIso: string;
  time: string;
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  notes: string;
  setNotes: (v: string) => void;
  lang: "id" | "en";
}

function DetailsForm({
  onSubmit,
  onBack,
  doctorName,
  dateIso,
  time,
  name,
  setName,
  phone,
  setPhone,
  notes,
  setNotes,
  lang,
}: DetailsFormProps) {
  const canSubmit = name.trim().length >= 2 && phone.trim().length >= 8;

  return (
    <form onSubmit={onSubmit}>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary/65 transition-colors hover:text-primary"
      >
        <Icon name="arrow" className="h-3 w-3 rotate-180" />
        {lang === "id" ? "Ganti jadwal" : "Change schedule"}
      </button>

      <p className="mt-3 font-display text-2xl text-primary">
        {lang === "id" ? "Data pasien" : "Patient details"}
      </p>
      <p className="mt-1 text-sm text-secondary">
        {lang === "id"
          ? `Booking ${doctorName} · ${formatHumanDate(dateIso, lang)} · ${time}`
          : `Booking ${doctorName} · ${formatHumanDate(dateIso, lang)} · ${time}`}
      </p>

      <label className="form-label mt-5" htmlFor="booking-name">
        {lang === "id" ? "Nama lengkap" : "Full name"}
      </label>
      <input
        id="booking-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
        placeholder={lang === "id" ? "Mis. Aulia Pratama" : "e.g. Aulia Pratama"}
        required
      />

      <label className="form-label mt-5" htmlFor="booking-phone">
        {lang === "id" ? "No. WhatsApp" : "WhatsApp number"}
      </label>
      <input
        id="booking-phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="form-control"
        placeholder={lang === "id" ? "08xxxxxxxxxx" : "+62 8xx xxxx xxxx"}
        required
      />

      <label className="form-label mt-5" htmlFor="booking-notes">
        {lang === "id" ? "Catatan tambahan (opsional)" : "Additional notes (optional)"}
      </label>
      <textarea
        id="booking-notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="form-control min-h-[6rem]"
        placeholder={lang === "id" ? "Mis. saya pernah punya alergi anestesi" : "e.g. I have an anesthesia allergy"}
      />

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cta px-5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-all hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon name="check" className="h-4 w-4" />
        {lang === "id" ? "Konfirmasi booking" : "Confirm booking"}
      </button>
    </form>
  );
}

interface ConfirmationProps {
  bookingRef: string;
  doctorName: string;
  doctorRole: string;
  serviceTitle: string;
  dateIso: string;
  time: string;
  name: string;
  onWa: () => void;
  onReset: () => void;
  lang: "id" | "en";
}

function Confirmation({
  bookingRef,
  doctorName,
  doctorRole,
  serviceTitle,
  dateIso,
  time,
  name,
  onWa,
  onReset,
  lang,
}: ConfirmationProps) {
  return (
    <div>
      <div className="grid h-14 w-14 place-items-center rounded-full bg-cta/12 text-cta">
        <Icon name="check" className="h-7 w-7" />
      </div>
      <p className="mt-4 font-display text-2xl text-primary sm:text-3xl">
        {lang === "id" ? "Booking tercatat!" : "Booking received!"}
      </p>
      <p className="mt-1 text-sm text-secondary">
        {lang === "id"
          ? `Hi ${name || lang}, kami akan menghubungi Anda untuk konfirmasi final dalam 1-2 jam kerja.`
          : `Hi ${name}, we will reach out for final confirmation within 1-2 working hours.`}
      </p>

      <dl className="mt-6 grid gap-3 rounded-2xl border border-primary/8 bg-surface-2/45 p-5 sm:grid-cols-2">
        <div>
          <dt className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
            {lang === "id" ? "Nomor referensi" : "Reference number"}
          </dt>
          <dd className="mt-1 font-display text-lg text-primary">{bookingRef}</dd>
        </div>
        <div>
          <dt className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
            {lang === "id" ? "Layanan" : "Service"}
          </dt>
          <dd className="mt-1 font-display text-lg text-primary">{serviceTitle}</dd>
        </div>
        <div>
          <dt className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
            {lang === "id" ? "Dokter" : "Doctor"}
          </dt>
          <dd className="mt-1 text-base text-primary">
            {doctorName} <span className="text-secondary">· {doctorRole}</span>
          </dd>
        </div>
        <div>
          <dt className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
            {lang === "id" ? "Jadwal" : "Schedule"}
          </dt>
          <dd className="mt-1 text-base text-primary">
            {formatHumanDate(dateIso, lang)} · {time} WIB
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={onWa}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-cta px-5 text-sm font-bold text-white shadow-lg shadow-cta/25 transition-all hover:-translate-y-0.5 hover:bg-primary"
        >
          <Icon name="message" className="h-4 w-4" />
          {lang === "id" ? "Kirim ke WhatsApp" : "Send to WhatsApp"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-5 text-sm font-bold text-primary transition-colors hover:border-gold/60"
        >
          {lang === "id" ? "Booking lagi" : "Book again"}
        </button>
      </div>
    </div>
  );
}

interface BookingSummaryProps {
  doctor: (typeof doctors)[number] | null;
  dateIso: string | null;
  time: string | null;
  serviceId: string;
  name: string;
  phone: string;
  lang: "id" | "en";
}

function BookingSummary({
  doctor,
  dateIso,
  time,
  serviceId,
  name,
  phone,
  lang,
}: BookingSummaryProps) {
  const service = services.find((s) => s.id === serviceId);
  return (
    <div className="overflow-hidden rounded-2xl border border-primary/10 bg-primary text-white shadow-2xl shadow-primary/15">
      <div className="relative px-5 py-5 sm:px-6">
        <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/20 blur-2xl" />
        <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          {lang === "id" ? "Ringkasan booking" : "Booking summary"}
        </p>
        <p className="mt-1 font-display text-2xl text-white">{business.name}</p>
        <p className="mt-1 text-xs text-white/65">
          {lang === "id" ? "Bintaro Jaya Sektor 7" : "Bintaro Jaya Sector 7"}
        </p>
      </div>

      <ul className="grid gap-3 bg-white px-5 py-5 text-primary sm:px-6">
        <SummaryRow
          icon="spark"
          label={lang === "id" ? "Layanan" : "Service"}
          value={service ? (lang === "id" ? service.title.id : service.title.en) : "-"}
        />
        <SummaryRow
          icon="heart"
          label={lang === "id" ? "Dokter" : "Doctor"}
          value={doctor ? doctor.name : lang === "id" ? "Belum dipilih" : "Not selected"}
          empty={!doctor}
        />
        <SummaryRow
          icon="calendar"
          label={lang === "id" ? "Tanggal" : "Date"}
          value={dateIso ? formatHumanDate(dateIso, lang) : lang === "id" ? "Belum dipilih" : "Not selected"}
          empty={!dateIso}
        />
        <SummaryRow
          icon="clock"
          label={lang === "id" ? "Jam" : "Time"}
          value={time ? `${time} WIB` : lang === "id" ? "Belum dipilih" : "Not selected"}
          empty={!time}
        />
        <SummaryRow
          icon="phone"
          label={lang === "id" ? "Pasien" : "Patient"}
          value={
            name || phone
              ? `${name}${phone ? ` · ${phone}` : ""}`
              : lang === "id"
                ? "Akan diisi"
                : "To be filled"
          }
          empty={!name && !phone}
        />
      </ul>

      <div className="border-t border-primary/8 bg-surface-2/45 px-5 py-4 text-xs text-primary/60 sm:px-6">
        {lang === "id"
          ? "Slot ditahan selama 30 menit setelah konfirmasi sambil menunggu admin verifikasi."
          : "Slot is held for 30 minutes after confirmation while admin verifies."}
      </div>
    </div>
  );
}

function SummaryRow({
  icon,
  label,
  value,
  empty = false,
}: {
  icon: React.ComponentProps<typeof Icon>["name"];
  label: string;
  value: string;
  empty?: boolean;
}) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
          empty ? "bg-surface-2 text-primary/40" : "bg-cta/12 text-cta"
        }`}
      >
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/55">
          {label}
        </p>
        <p className={`mt-0.5 truncate font-bold ${empty ? "text-primary/45" : "text-primary"}`}>
          {value}
        </p>
      </div>
    </li>
  );
}
