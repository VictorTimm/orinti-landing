"use client";

import { FormEvent, useState } from "react";
import { TetrisButton } from "@/components/ui/TetrisButton";
import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

export function Contact() {
  const { t } = useI18n();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const website = String(formData.get("website") ?? "").trim();

    if (website) {
      setStatus("success");
      setFeedback(t.contact.success);
      form.reset();
      setIsSubmitting(false);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEBFORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setFeedback(t.contact.error);
      setIsSubmitting(false);
      return;
    }

    formData.delete("website");
    formData.append("access_key", accessKey);
    formData.append("subject", "New website lead via Orinti contact form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { success?: boolean; message?: string };
      if (!response.ok || data.success === false) {
        throw new Error(data.message ?? t.contact.error);
      }
      setStatus("success");
      setFeedback(t.contact.success);
      form.reset();
    } catch {
      setStatus("error");
      setFeedback(t.contact.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-copy outline-none transition-[border-color,box-shadow] duration-300 focus:border-orange focus:shadow-[0_0_0_4px_rgba(255,106,0,0.12)]";

  return (
    <section id="contact" className="scroll-mt-24 bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <Reveal>
          <p className="font-display text-sm font-medium uppercase tracking-[0.16em] text-title">
            {t.contact.label}
          </p>
          <h2 className="font-display mt-3 text-[32px] font-medium leading-[1.2] tracking-tight text-title md:text-[40px]">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-copy md:mt-6 md:text-base">
            {t.contact.intro}
          </p>
        </Reveal>

        <Reveal delay={120}>
        <form onSubmit={handleSubmit} className="mt-8 max-w-3xl md:mt-10">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="font-display text-sm font-medium text-title">
              {t.contact.name}
              <input name="name" required autoComplete="name" className={fieldClass} />
            </label>
            <label className="font-display text-sm font-medium text-title">
              {t.contact.email}
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </label>
          </div>
          <label className="mt-6 block font-display text-sm font-medium text-title">
            {t.contact.company}
            <input name="company" autoComplete="organization" className={fieldClass} />
          </label>
          <label className="mt-6 block font-display text-sm font-medium text-title">
            {t.contact.message}
            <textarea
              name="message"
              required
              rows={6}
              className={fieldClass}
              placeholder={t.contact.placeholder}
            />
          </label>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden
          />
          <div className="mt-8">
            <TetrisButton type="submit" disabled={isSubmitting} className="w-full px-6 sm:w-auto">
              {isSubmitting ? t.contact.sending : t.contact.send}
            </TetrisButton>
          </div>
          {status !== "idle" ? (
            <p
              className={`mt-4 text-sm ${status === "success" ? "text-emerald-700" : "text-red-600"}`}
            >
              {feedback}
            </p>
          ) : null}
        </form>
        </Reveal>
      </div>
    </section>
  );
}
