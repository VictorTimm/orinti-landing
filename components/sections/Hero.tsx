"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TetrisLink } from "@/components/ui/TetrisButton";
import { Typewriter } from "@/components/ui/Typewriter";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();
  const [copyIn, setCopyIn] = useState(false);
  const headline = `${t.hero.line1} ${t.hero.line2} ${t.hero.line3}`;

  useEffect(() => {
    setCopyIn(false);
  }, [headline]);

  return (
    <section id="top" className="relative overflow-hidden bg-dark text-white">
      <Image
        src="/tetris_bg_upscaled.webp"
        alt=""
        fill
        priority
        className="object-cover object-center md:object-[68%_center]"
        sizes="100vw"
      />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] items-center pb-20 pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))] pt-24 md:min-h-screen md:px-8 md:pb-24 md:pt-32">
        <div className="max-w-3xl">
          <h1
            aria-label={headline}
            className="font-hero min-h-[4.6em] text-[clamp(15px,5.2vw,22px)] uppercase leading-[1.5] text-white md:text-[32px] lg:text-[40px]"
          >
            <Typewriter
              lines={[t.hero.line1, t.hero.line2, t.hero.line3]}
              onComplete={() => setCopyIn(true)}
            />
          </h1>
          <p
            className={`hero-copy mt-8 max-w-lg text-[15px] leading-7 text-copy-on-dark md:mt-10 md:text-base ${copyIn ? "hero-copy-in" : ""}`}
          >
            {t.hero.body}
          </p>
          <TetrisLink
            href="/#contact"
            className={`hero-copy mt-8 md:mt-10 ${copyIn ? "hero-copy-in" : ""}`}
            style={{ transitionDelay: copyIn ? "120ms" : undefined }}
          >
            {t.hero.cta}
          </TetrisLink>
        </div>
      </div>
    </section>
  );
}
