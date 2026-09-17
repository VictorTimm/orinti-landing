"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="scroll-mt-24 border-t border-white/10 bg-dark pt-16 md:pt-24">
      <div className="mx-auto grid max-w-[1200px] items-end gap-10 px-6 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:px-8">
        <Reveal className="pb-16 md:pb-24">
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-title-on-dark">
            {t.about.label}
          </p>
          <h2 className="font-display mt-3 max-w-2xl text-[32px] font-medium leading-[1.2] tracking-tight text-white md:text-[40px]">
            {t.about.title}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-7 text-copy-on-dark md:mt-8 md:text-base">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
        </Reveal>
        <Reveal delay={160} className="mx-auto w-full max-w-[300px] pb-16 md:mx-0 md:justify-self-end md:max-w-[360px] md:pb-0">
          <Image
            src="/victor.png"
            alt={t.about.photoAlt}
            width={420}
            height={589}
            className="block h-auto w-full"
          />
        </Reveal>
      </div>
    </section>
  );
}
