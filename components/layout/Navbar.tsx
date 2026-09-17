"use client";

import { useEffect, useId, useRef, useState } from "react";
import { navHrefs, useI18n, type Locale } from "@/lib/i18n";

function UkFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <rect width="60" height="30" rx="2" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function NlFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <rect width="60" height="13.34" fill="#AE1C28" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.66" width="60" height="13.34" fill="#21468B" />
    </svg>
  );
}

function Flags({
  locale,
  setLocale,
  toEnglish,
  toDutch,
}: {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toEnglish: string;
  toDutch: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-label={toEnglish}
        aria-pressed={locale === "en"}
        className={`overflow-hidden rounded-[3px] ring-1 ring-white/25 transition-opacity ${
          locale === "en" ? "opacity-100" : "opacity-40 hover:opacity-80"
        }`}
      >
        <UkFlag className="block h-4 w-6 md:h-[18px] md:w-[27px]" />
      </button>
      <button
        type="button"
        onClick={() => setLocale("nl")}
        aria-label={toDutch}
        aria-pressed={locale === "nl"}
        className={`overflow-hidden rounded-[3px] ring-1 ring-white/25 transition-opacity ${
          locale === "nl" ? "opacity-100" : "opacity-40 hover:opacity-80"
        }`}
      >
        <NlFlag className="block h-4 w-6 md:h-[18px] md:w-[27px]" />
      </button>
    </div>
  );
}

export function Navbar() {
  const { locale, t, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const panel = panelRef.current;
    const panelLinks = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>("a[href]"))
      : [];
    const focusable = [hamburgerRef.current, ...panelLinks].filter(
      (node): node is HTMLElement => Boolean(node),
    );
    panelLinks[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open) {
      hamburgerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  const flags = (
    <Flags
      locale={locale}
      setLocale={setLocale}
      toEnglish={t.nav.toEnglish}
      toDutch={t.nav.toDutch}
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] pt-[max(1rem,env(safe-area-inset-top))] md:absolute ${
        open ? "bottom-0 bg-dark pointer-events-auto md:bottom-auto md:bg-transparent" : "pointer-events-none"
      }`}
    >
      <div className="relative z-10 px-4 md:px-6">
      <div className="nav-shell pointer-events-auto mx-auto flex w-full max-w-[1200px] items-center justify-between rounded-md border border-white/20 bg-dark/75 px-2 py-1.5 backdrop-blur-sm md:hidden">
        <button
          ref={hamburgerRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((current) => !current)}
          className="flex h-11 w-11 items-center justify-center text-white"
        >
          <span className="relative block h-4 w-[18px]" aria-hidden>
            <span
              className={`absolute inset-x-0 top-[3px] h-0.5 bg-white transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[7px] h-0.5 bg-white transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[11px] h-0.5 bg-white transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        {flags}
      </div>

      <nav className="nav-shell pointer-events-auto mx-auto hidden w-fit max-w-full items-center justify-center gap-x-7 rounded-md border border-white/20 bg-white/15 px-8 py-3 font-display text-sm font-medium text-white backdrop-blur-sm md:flex">
        {navHrefs.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="tracking-wide text-title-on-dark transition-colors duration-300 hover:text-white"
          >
            {t.nav[item.key]}
          </a>
        ))}
        <div className="ml-1">{flags}</div>
      </nav>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          className="px-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 md:hidden"
        >
          <nav className="flex flex-col gap-1 font-display text-2xl font-medium text-white">
            {navHrefs.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center tracking-wide text-title-on-dark transition-colors duration-300 hover:text-white"
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
