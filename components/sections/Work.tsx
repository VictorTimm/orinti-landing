"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

function ProjectCard({
  src,
  alt,
  title,
  overlay,
  href,
}: {
  src: string;
  alt: string;
  title: string;
  overlay: string;
  href?: string;
}) {
  const media = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-zinc-100 shadow-sm md:aspect-[4/5]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="project-overlay pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 transition-opacity duration-300">
          <span className="font-display px-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-white md:text-base">
            {overlay}
          </span>
        </div>
      </div>
      <p className="mt-3 font-sans text-sm tracking-[0.04em] text-copy">{title}</p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block outline-none"
      >
        {media}
      </a>
    );
  }

  return <article className="group">{media}</article>;
}

export function Work() {
  const { t } = useI18n();

  return (
    <section id="projects" className="scroll-mt-24 bg-white pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <h2 className="font-display text-[32px] font-medium tracking-tight text-title md:text-[40px]">
            {t.work.title}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3">
          <Reveal delay={60}>
            <ProjectCard
              href="https://www.bergtopper.nl"
              src="/bergtopper.png"
              alt={t.work.bergtopperAlt}
              title="Bergtopper"
              overlay={t.work.view}
            />
          </Reveal>
          <Reveal delay={140}>
            <ProjectCard
              src="/van-amerongen.png"
              alt={t.work.vanAmerongenAlt}
              title="Van Amerongen Bouw"
              overlay={t.work.underConstruction}
            />
          </Reveal>
          <Reveal delay={220}>
            <ProjectCard
              src="/tuin-natuurlijk.png"
              alt={t.work.tuinNatuurlijkAlt}
              title="Tuin Natuurlijk!"
              overlay={t.work.underConstruction}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
