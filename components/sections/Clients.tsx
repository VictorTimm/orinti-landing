"use client";

import Image from "next/image";
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

function LogoSet({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 px-5 md:gap-20 md:px-10"
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

  return (
    <section id="clients" className="scroll-mt-24 overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-[32px] font-medium uppercase leading-[1.2] tracking-tight text-title md:text-[40px]">
            {t.clients.title}
          </h2>
        </Reveal>
      </div>
      <div className="relative mt-10 mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-12">
        <div className="logo-marquee-track flex w-max">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
}
