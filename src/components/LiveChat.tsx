"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/content";
import { useLanguage } from "@/context/LanguageContext";
import { buildWhatsAppUrl } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type Sender = "agent" | "user";
type Message = {
  id: string;
  sender: Sender;
  text: string;
  /** Suggested replies attached to this message. */
  replies?: { id: string; label: string }[];
};

type ScriptKey =
  | "welcome"
  | "booking"
  | "price"
  | "insurance"
  | "location"
  | "anxious"
  | "fallback";

interface ScriptStep {
  agent: string;
  replies?: { id: ScriptKey; label: string }[];
}

const scripts: Record<"id" | "en", Record<ScriptKey, ScriptStep>> = {
  id: {
    welcome: {
      agent:
        "Halo! Saya Mira dari tim admin Arcade Dental. Saya bisa bantu booking, info layanan, atau cek slot dokter. Mau mulai dari mana?",
      replies: [
        { id: "booking", label: "Mau booking" },
        { id: "price", label: "Tanya biaya" },
        { id: "insurance", label: "Asuransi BCA Life" },
        { id: "location", label: "Lokasi klinik" },
      ],
    },
    booking:
      {
        agent:
          "Siap! Booking paling cepat lewat halaman kalender kami. Slotnya real-time per dokter. Kalau mau saya kirim link langsung?",
        replies: [
          { id: "price", label: "Tanya biaya dulu" },
          { id: "anxious", label: "Sedikit cemas" },
        ],
      },
    price:
      {
        agent:
          "Setiap layanan kami punya harga awal yang transparan, contoh: scaling mulai Rp 350rb, behel mulai Rp 8,5jt, implan mulai Rp 12jt. Mau saya bantu hitung estimasi paket Anda?",
        replies: [
          { id: "insurance", label: "Pakai asuransi" },
          { id: "booking", label: "Langsung booking" },
        ],
      },
    insurance:
      {
        agent:
          "Arcade Dental adalah klinik rekanan resmi BCA Life. Untuk perawatan tertentu klaim bisa diproses melalui kami. Kirim foto kartu polis Anda saat booking, ya.",
        replies: [
          { id: "booking", label: "Mau lanjut booking" },
        ],
      },
    location:
      {
        agent:
          "Kami di Ruko Kebayoran Arcade 2 Blok B2 No. 19, Jl. Boulevard Bintaro Jaya Sektor 7. Buka Senin-Sabtu, 10:00-20:00 WIB. Mau saya buka Google Maps?",
        replies: [
          { id: "booking", label: "Booking dulu" },
        ],
      },
    anxious:
      {
        agent:
          "Tenang, banyak pasien kami juga awalnya cemas. Kami punya pendekatan painless dan dokter akan menjelaskan tiap tahap sebelum dimulai. Mau saya hubungkan langsung ke dokter via WhatsApp?",
        replies: [
          { id: "booking", label: "Mulai dengan booking" },
        ],
      },
    fallback:
      {
        agent:
          "Terima kasih pertanyaannya! Untuk yang detail seperti ini, lebih enak kalau saya hubungkan ke admin manusia kami via WhatsApp. Boleh ya?",
      },
  },
  en: {
    welcome: {
      agent:
        "Hi! I'm Mira from the Arcade Dental admin team. I can help with bookings, service info, or doctor schedules. Where would you like to start?",
      replies: [
        { id: "booking", label: "I want to book" },
        { id: "price", label: "Ask about pricing" },
        { id: "insurance", label: "BCA Life insurance" },
        { id: "location", label: "Clinic location" },
      ],
    },
    booking:
      {
        agent:
          "Got it. Our calendar page shows live slots per doctor. Want me to point you straight to it?",
        replies: [
          { id: "price", label: "Ask price first" },
          { id: "anxious", label: "I'm a bit anxious" },
        ],
      },
    price:
      {
        agent:
          "Each service has a transparent starting price. For example: scaling from Rp 350K, braces from Rp 8.5M, implant from Rp 12M. Would you like to estimate a treatment plan?",
        replies: [
          { id: "insurance", label: "I have insurance" },
          { id: "booking", label: "Book directly" },
        ],
      },
    insurance:
      {
        agent:
          "Arcade Dental is an official BCA Life provider. Certain treatments can be claimed directly through us. Please share your policy card photo when booking.",
        replies: [
          { id: "booking", label: "Continue booking" },
        ],
      },
    location:
      {
        agent:
          "We are at Ruko Kebayoran Arcade 2 Blok B2 No. 19, Bintaro Jaya Sector 7. Open Monday-Saturday, 10:00-20:00 WIB. Want me to open Google Maps?",
        replies: [
          { id: "booking", label: "Book first" },
        ],
      },
    anxious:
      {
        agent:
          "It's totally normal. Many of our patients started off the same way. We use a painless approach and doctors explain every step before starting. Want me to connect you straight to a doctor via WhatsApp?",
        replies: [
          { id: "booking", label: "Start with booking" },
        ],
      },
    fallback:
      {
        agent:
          "Thanks for the question! For details like this, it's better if I connect you to our human admin via WhatsApp. Sound good?",
      },
  },
};

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function LiveChat() {
  const { lang, c } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true); // Show a dot until first opened
  const [hydrated, setHydrated] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Avoid SSR / first-render hash mismatches: render the floater only after mount.
  useEffect(() => {
    setHydrated(true);
  }, []);

  const intro = useMemo(() => scripts[lang].welcome, [lang]);

  // Seed welcome on first open, reset when language flips so the script stays consistent.
  useEffect(() => {
    if (!open) return;
    setMessages((prev) => {
      if (prev.length > 0) return prev;
      return [
        {
          id: makeId(),
          sender: "agent",
          text: intro.agent,
          replies: intro.replies?.map((r) => ({ id: r.id, label: r.label })),
        },
      ];
    });
  }, [open, intro]);

  // Auto-scroll on new messages
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, agentTyping]);

  // Focus input when opening
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());
    setHasUnread(false);
  }, [open]);

  const pushAgentReply = useCallback(
    (key: ScriptKey) => {
      const step = scripts[lang][key];
      setAgentTyping(true);
      const delay = 600 + Math.min(step.agent.length * 12, 1400);
      const timeout = window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            sender: "agent",
            text: step.agent,
            replies: step.replies?.map((r) => ({ id: r.id, label: r.label })),
          },
        ]);
        setAgentTyping(false);
      }, delay);
      return () => window.clearTimeout(timeout);
    },
    [lang],
  );

  function handleQuickReply(replyId: string, label: string) {
    setMessages((prev) => [
      ...prev,
      { id: makeId(), sender: "user", text: label },
    ]);
    pushAgentReply(replyId as ScriptKey);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: makeId(), sender: "user", text: trimmed }]);
    setDraft("");

    // Tiny intent matcher so free-typed messages still feel alive.
    const lower = trimmed.toLowerCase();
    let target: ScriptKey = "fallback";
    if (/(book|janji|jadwal|reservasi|appointment)/.test(lower)) target = "booking";
    else if (/(price|biaya|harga|cost|tarif)/.test(lower)) target = "price";
    else if (/(insur|asuransi|bca|life|polis)/.test(lower)) target = "insurance";
    else if (/(lokasi|alamat|where|map|address|maps)/.test(lower)) target = "location";
    else if (/(takut|cemas|fear|anxi|nervous|gugup)/.test(lower)) target = "anxious";
    pushAgentReply(target);
  }

  function handoffMessage(): string {
    return lang === "id"
      ? `Halo Arcade Dental, saya sedang menggunakan live chat di website dan ingin lanjut konsultasi via WhatsApp.${
          messages.length > 1 ? `\n\nRingkasan obrolan terakhir: "${messages[messages.length - 1].text}"` : ""
        }`
      : `Hi Arcade Dental, I was using the website live chat and would like to continue on WhatsApp.${
          messages.length > 1 ? `\n\nLast chat snippet: "${messages[messages.length - 1].text}"` : ""
        }`;
  }

  if (!hydrated) return null;

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? (lang === "id" ? "Tutup live chat" : "Close live chat") : c.liveChatOpen}
        className="group fixed bottom-5 right-5 z-50 flex min-h-14 items-center gap-2.5 rounded-full bg-cta px-5 font-bold text-white shadow-2xl shadow-cta/35 transition-all duration-300 hover:-translate-y-1.5 hover:bg-primary"
      >
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white/15">
          <Icon name={open ? "check" : "message"} className="h-4 w-4" />
          {hasUnread && !open && (
            <span
              aria-hidden
              className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-cta"
            />
          )}
        </span>
        <span className="hidden sm:inline">
          {open ? (lang === "id" ? "Tutup" : "Close") : c.liveChatOpen}
        </span>
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label={lang === "id" ? "Live chat Arcade Dental" : "Arcade Dental live chat"}
        className={`fixed bottom-24 right-3 z-50 flex w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-primary/12 bg-white shadow-2xl ring-1 ring-primary/8 transition-all duration-300 sm:right-5 sm:w-96 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        style={{ height: "min(560px, calc(100vh - 8rem))" }}
      >
        {/* Header */}
        <div className="relative flex items-center gap-3 border-b border-primary/8 bg-primary px-4 py-3.5 text-white">
          <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold/15 blur-2xl" />
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
            <Image src="/assets/logo.jpg" alt={business.name} fill sizes="40px" className="object-cover" />
          </span>
          <div className="relative min-w-0 flex-1">
            <p className="font-display text-base text-white">
              {business.name}
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-white/70">
              <span className="relative flex h-2 w-2">
                <span aria-hidden className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cta" />
              </span>
              <span>{c.liveChatStatus}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={lang === "id" ? "Tutup" : "Close"}
            className="relative grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <span aria-hidden className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-surface-2/40 px-4 py-4">
          <ul className="grid gap-3">
            {messages.map((m) => (
              <li
                key={m.id}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "agent" && (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-gold">
                    <Icon name="heart" className="h-3.5 w-3.5" />
                  </span>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-5 shadow-sm ${
                    m.sender === "user"
                      ? "bg-cta text-white"
                      : "bg-white text-primary"
                  }`}
                >
                  {m.text}
                  {m.replies && m.replies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.replies.map((reply) => (
                        <button
                          key={reply.id}
                          type="button"
                          onClick={() => handleQuickReply(reply.id, reply.label)}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-surface-2 px-2.5 py-1 text-[11px] font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                          {reply.label}
                          <Icon name="arrow" className="h-2.5 w-2.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
            {agentTyping && (
              <li className="flex justify-start gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-gold">
                  <Icon name="heart" className="h-3.5 w-3.5" />
                </span>
                <div className="rounded-2xl bg-white px-3.5 py-2.5 shadow-sm">
                  <span className="flex items-center gap-1">
                    <span aria-hidden className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0ms]" />
                    <span aria-hidden className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:120ms]" />
                    <span aria-hidden className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:240ms]" />
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Quick links */}
        <div className="border-t border-primary/8 bg-white px-4 pt-3">
          <div className="flex flex-wrap gap-1.5 pb-2">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 rounded-full border border-primary/12 bg-white px-2.5 py-1 text-[11px] font-bold text-primary transition-colors hover:border-gold/60"
            >
              <Icon name="calendar" className="h-3 w-3 text-cta" />
              {lang === "id" ? "Booking jadwal" : "Book a slot"}
            </Link>
            <Link
              href="/services#estimator"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 rounded-full border border-primary/12 bg-white px-2.5 py-1 text-[11px] font-bold text-primary transition-colors hover:border-gold/60"
            >
              <Icon name="spark" className="h-3 w-3 text-cta" />
              {lang === "id" ? "Hitung biaya" : "Estimate cost"}
            </Link>
            <a
              href={buildWhatsAppUrl(handoffMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-cta px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-primary"
            >
              <Icon name="message" className="h-3 w-3" />
              {lang === "id" ? "Lanjut ke WhatsApp" : "Continue on WhatsApp"}
            </a>
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-primary/8 bg-white px-4 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={c.liveChatPlaceholder}
            className="min-h-10 flex-1 rounded-full border border-primary/12 bg-surface-2/50 px-4 text-sm text-primary placeholder:text-primary/40 focus:border-cta focus:outline-none focus:ring-2 focus:ring-cta/20"
            aria-label={c.liveChatPlaceholder}
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label={lang === "id" ? "Kirim pesan" : "Send message"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cta text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
