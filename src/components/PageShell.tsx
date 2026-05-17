"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "./sections/Navbar";
import Footer from "./sections/Footer";
import BookingCTA from "./sections/BookingCTA";
import { useShellState } from "@/hooks/useArcadeDental";

// Live chat is large and rarely needed before user interaction. Defer its
// JS until after the rest of the page paints.
const LiveChat = dynamic(
  () => import("./LiveChat").then((m) => m.LiveChat),
  { ssr: false },
);

interface PageShellProps {
  children: React.ReactNode;
  /**
   * Optional pre-built WhatsApp deep-link message. Pages that render the
   * full booking form (HomePage) supply the user-edited version; other
   * pages fall back to the shell's default greeting.
   */
  smartMessage?: string;
}

/**
 * Smoothly scroll to a hash target after layout has settled.
 *
 * The page used to be gated on `languageReady`, so this used to be the only
 * way fragment links worked at all. We keep the helper because GSAP's
 * ScrollTrigger sometimes shifts layout after the browser's native fragment
 * scroll fires; one extra rAF after paint reliably re-centres the target.
 */
function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  if (!hash || hash === "#") return;
  const id = hash.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior, block: "start" });
    });
  });
}

export function PageShell({ children, smartMessage }: PageShellProps) {
  const shell = useShellState();
  const message = smartMessage ?? shell.smartMessage;
  const { languageReady } = useLanguage();
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Force scroll to top on every route change so cross-page links land at the
  // top — Next.js's default scroll-on-navigation can leave the user mid-page
  // when layout shifts during hydration. Skip when a hash is present so
  // hash-anchor links still work.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  // Scroll to a hash target whenever the URL hash changes, or the user
  // clicks a link to the hash that is already current. On initial mount we
  // use "auto" (instant) so a page that loads at /articles or /book lands at
  // the top — smooth scrolling here causes layout-shift surprises.
  useEffect(() => {
    // Force-top on initial mount: layout shifts during hydration can leave
    // the viewport mid-page when the user clicks an in-app link.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    } else {
      scrollToHash(window.location.hash, "auto");
    }

    const onHashChange = () => scrollToHash(window.location.hash, "smooth");
    window.addEventListener("hashchange", onHashChange);

    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;
      if (url.hash !== window.location.hash) return;
      event.preventDefault();
      scrollToHash(url.hash, "smooth");
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onAnchorClick);
    };
  }, []);

  useEffect(() => {
    if (!languageReady) return;

    // Defer ScrollTrigger setup until after the browser is idle so it doesn't
    // compete with first contentful paint, especially on low-end mobile.
    const ric = "requestIdleCallback" in window;
    const scheduleId = ric
      ? window.requestIdleCallback(run, { timeout: 1500 })
      : (window.setTimeout(run, 200) as unknown as number);

    function run() {
      gsap.registerPlugin(ScrollTrigger);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const root = mainRef.current;
      if (!root) return;

      if (reduceMotion) {
        gsap.set(
          root.querySelectorAll(
            ".gs-word, .gs-sub, .hero-title-word, .hero-chip, .gs-reveal, .gs-card, .gs-counter",
          ),
          { clearProps: "all", opacity: 1 },
        );
        return;
      }

      const ctx = gsap.context(() => {
        ScrollTrigger.batch(".gs-reveal, .gs-card", {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.65,
              stagger: 0.055,
              ease: "power2.out",
            });
          },
        });
        // Only refresh after a frame so layout is stable
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, root);

      cleanupRef.current = () => ctx.revert();
    }

    return () => {
      if (ric) {
        (window as Window & { cancelIdleCallback?: (id: number) => void })
          .cancelIdleCallback?.(scheduleId);
      } else {
        window.clearTimeout(scheduleId);
      }
      cleanupRef.current?.();
    };
  }, [languageReady]);

  return (
    <main ref={mainRef} className="min-h-screen bg-surface text-primary">
      <Navbar />
      {children}
      <BookingCTA smartMessage={message} ctaRef={ctaRef} />
      <Footer />

      {/* Floating live chat with WhatsApp handoff (loaded on demand) */}
      <LiveChat />
    </main>
  );
}
