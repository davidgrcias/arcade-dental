"use client";

import { useMemo } from "react";
import { credentials, business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Credentials() {
  const { c, t, lang } = useLanguage();

  const verifyMessage = useMemo(
    () =>
      lang === "id"
        ? `Halo ${business.name}, saya ingin memverifikasi kredensial dokter dan izin klinik sebelum konsultasi. Apakah saya bisa minta dokumen STR / SIP yang relevan? Terima kasih.`
        : `Hi ${business.name}, I would like to verify the doctor credentials and clinic license before booking. Could I request the relevant STR / SIP documentation? Thank you.`,
    [lang],
  );

  return (
    <section
      id="credentials"
      aria-labelledby="credentials-heading"
      className="relative overflow-hidden bg-white py-20 md:py-24"
    >
      {/* Subtle dot grid for premium feel without competing with the cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#1a2332_1px,transparent_0)] [background-size:24px_24px]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow={c.credentialsLabel}
          title={c.credentialsTitle}
          body={c.credentialsBody}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((item, index) => (
            <li
              key={item.id}
              className="gs-reveal group relative flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-primary/8 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/55 hover:shadow-lg"
            >
              {/* Top accent bar reveals on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cta via-gold to-cta transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary text-gold shadow-inner">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <span className="font-accent text-[10px] font-bold uppercase tracking-[0.22em] text-primary/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div>
                <p className="font-display text-lg leading-tight text-primary">
                  {t(item.label)}
                </p>
                <p className="mt-1.5 text-[13px] leading-5 text-secondary">
                  {t(item.description)}
                </p>
                {item.reference && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 font-accent text-[10px] font-bold uppercase tracking-[0.18em] text-primary/65">
                    <Icon name="check" className="h-3 w-3 text-cta" />
                    {item.reference}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-xl border border-primary/8 bg-surface-2/55 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-cta/12 text-cta">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <p className="text-sm leading-6 text-primary/75">
              {lang === "id"
                ? "Kami terbuka untuk pertanyaan tentang lisensi dokter dan izin klinik. Tim admin akan bantu kirim dokumen verifikasi melalui WhatsApp."
                : "We welcome questions about doctor licensing and clinic permits. Our admin will share verification documents via WhatsApp."}
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(verifyMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-cta hover:shadow-lg"
          >
            <Icon name="message" className="h-4 w-4" />
            <span>{c.credentialsVerifyCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
