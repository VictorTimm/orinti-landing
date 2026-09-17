"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

export function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="scroll-mt-24 border-t border-zinc-200 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-title">
            {t.faq.label}
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[32px] font-medium leading-[1.2] tracking-tight text-title md:text-[40px]">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 md:mt-10">
          {t.faq.items.map((item) => (
            <details key={item.question} className="group">
              <summary className="font-display flex cursor-pointer list-none items-center justify-between gap-4 px-2 py-5 text-left text-lg font-medium tracking-tight text-title transition-[background-color,box-shadow] duration-300 hover:bg-orange/[0.05] hover:shadow-[inset_0_0_28px_rgba(255,106,0,0.18)] md:gap-6 md:px-4 md:text-xl [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-900/10 bg-zinc-950/80 text-lg font-light leading-none text-white transition-transform duration-300 ease-out group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="faq-answer max-w-3xl px-3 pb-5 pr-10 text-[15px] leading-7 text-copy md:px-4 md:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
