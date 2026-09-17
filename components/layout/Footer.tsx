"use client";

import { navHrefs, useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/tetris_bg.jpg')] bg-cover bg-right opacity-40"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/40" />
      <div className="relative mx-auto max-w-[1200px] py-16 pb-[max(4rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] md:px-8 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 md:gap-16">
          <div>
            <p className="font-display text-base font-medium tracking-[0.2em] text-white">
              ORINTI
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm leading-6 text-copy-on-dark">
              <a href="mailto:victor.m.timmermans@gmail.com" className="break-all transition-colors duration-300 hover:text-white">
                victor.m.timmermans@gmail.com
              </a>
              <a href="tel:+31610361096" className="transition-colors duration-300 hover:text-white">
                +31 06 10361096
              </a>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-sm leading-6 text-copy-on-dark md:pt-0">
            {navHrefs.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors duration-300 hover:text-white">
                {t.nav[item.key]}
              </a>
            ))}
          </nav>
        </div>

        <p
          className="mt-12 border-t border-white/10 pt-6 text-sm leading-6 text-copy-on-dark"
          suppressHydrationWarning
        >
          &copy; {new Date().getFullYear()} Orinti Webdevelopment
        </p>
      </div>
    </footer>
  );
}
