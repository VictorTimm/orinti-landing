"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type Ref } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

const logos = [
  { src: "/clients/j53.png", alt: "J53", className: "h-8 w-auto md:h-12" },
  { src: "/clients/truenorth.png", alt: "TrueNorth", className: "h-9 w-auto md:h-14" },
  { src: "/clients/bergtopper.png", alt: "BergTopper", className: "h-9 w-auto rounded-md md:h-14" },
  { src: "/clients/hobby-match.png", alt: "Hobby Match", className: "h-9 w-auto md:h-14" },
  { src: "/clients/van-amerongen.png", alt: "Van Amerongen Bouw", className: "h-8 w-auto md:h-12" },
  { src: "/clients/circles.png", alt: "", className: "h-8 w-auto md:h-12" },
];

function LogoSet({ hidden, setRef }: { hidden?: boolean; setRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={setRef}
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-20 md:pr-20"
      aria-hidden={hidden || undefined}
    >
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={hidden ? "" : logo.alt}
          width={180}
          height={80}
          className={`shrink-0 object-contain ${logo.className}`}
        />
      ))}
      <span className="font-display shrink-0 text-base font-medium tracking-wide text-title md:text-xl">
        Tuin Natuurlijk!
      </span>
    </div>
  );
}

export function Clients() {
  const { t } = useI18n();
  const viewportRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(4);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const unit = unitRef.current;
    if (!viewport || !unit) return;

    const sync = () => {
      const unitWidth = unit.offsetWidth;
      const viewWidth = viewport.clientWidth;
      if (unitWidth < 1) return;

      viewport.style.setProperty("--logo-marquee-shift", `${unitWidth}px`);
      const needed = Math.max(3, Math.ceil((viewWidth * 2) / unitWidth) + 1);
      setCopies((current) => (current === needed ? current : needed));
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(viewport);
    ro.observe(unit);
    const images = [...unit.querySelectorAll("img")];
    images.forEach((image) => image.addEventListener("load", sync));
    return () => {
      ro.disconnect();
      images.forEach((image) => image.removeEventListener("load", sync));
    };
  }, [copies]);

  return (
    <section id="clients" className="scroll-mt-24 overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-[32px] font-medium uppercase leading-[1.2] tracking-tight text-title md:text-[40px]">
            {t.clients.title}
          </h2>
        </Reveal>
      </div>
      <div
        ref={viewportRef}
        className="relative mt-10 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-12"
      >
        <div className="logo-marquee-track flex w-max will-change-transform">
          {Array.from({ length: copies }, (_, index) => (
            <LogoSet
              key={index}
              setRef={index === 0 ? unitRef : undefined}
              hidden={index > 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
