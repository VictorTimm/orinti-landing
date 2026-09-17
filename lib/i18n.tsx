"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "nl";

const dictionaries = {
  en: {
    nav: {
      home: "Home",
      clients: "Clients",
      projects: "Projects",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      language: "Language",
      toDutch: "Switch to Dutch",
      toEnglish: "Switch to English",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menu: "Menu",
    },
    hero: {
      line1: "High-end",
      line2: "design + build",
      line3: "webdevelopment",
      body: "We build custom websites for individuals and businesses. We handle the design and the copy, so you can stay focused on the job.",
      cta: "Contact",
    },
    clients: {
      title: "Great projects begin with a great relationship with our clients",
    },
    work: {
      title: "Projects",
      underConstruction: "Under construction",
      view: "View",
      bergtopperAlt: "BergTopper website",
      vanAmerongenAlt: "Van Amerongen Bouw website preview",
      tuinNatuurlijkAlt: "Tuin Natuurlijk website preview",
    },
    about: {
      label: "About",
      title: "I am Victor. I design and build websites.",
      p1: "Orinti Webdevelopment is a one-person studio for individuals and local businesses. If your current site is outdated, or you do not have one yet, I take care of structure, design, and copy so the site actually represents where the company is now.",
      p2: "You stay focused on the job. I handle the website, from first conversation to launch.",
      photoAlt: "Victor, founder of Orinti Webdevelopment",
    },
    faq: {
      label: "FAQ",
      title: "Questions before we start",
      items: [
        {
          question: "How long does a website take?",
          answer:
            "Most projects take a few weeks from intake to launch, depending on how much content and how many pages you need. The process stays linear: briefing, first version, two revision rounds, then go live.",
        },
        {
          question: "How do revisions work?",
          answer:
            "Two focused revision rounds are included. You send bundled feedback per round so we stay fast and within scope. A new direction or extra pages after that is billed hourly.",
        },
        {
          question: "What happens after launch?",
          answer:
            "If something we delivered breaks in the first 12 months, I fix it at no charge. New pages, extra features, or ongoing changes are billed hourly.",
        },
        {
          question: "How does pricing work?",
          answer:
            "You get a clear price after a short call, based on the size of the site. No packages on this page on purpose: the quote matches what you actually need.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Tell me about your project",
      intro: "Send a message and I will get back to you quickly.",
      name: "Name",
      email: "Email",
      company: "Company (optional)",
      message: "Message",
      placeholder: "What do you need, and what should the site do for the business?",
      send: "Send message",
      sending: "Sending...",
      success: "Thanks. Your message was sent. I will reply quickly.",
      error: "Sending failed. Email me directly instead.",
    },
  },
  nl: {
    nav: {
      home: "Home",
      clients: "Klanten",
      projects: "Projecten",
      about: "Over mij",
      faq: "FAQ",
      contact: "Contact",
      language: "Taal",
      toDutch: "Zet de site op Nederlands",
      toEnglish: "Zet de site op Engels",
      openMenu: "Menu openen",
      closeMenu: "Menu sluiten",
      menu: "Menu",
    },
    hero: {
      line1: "High-end",
      line2: "design + build",
      line3: "webdevelopment",
      body: "Ik bouw websites op maat voor particulieren en bedrijven. Ontwerp en teksten neem ik mee, zodat jij je op je werk kunt richten.",
      cta: "Contact",
    },
    clients: {
      title: "Goede projecten beginnen bij een goede klik met de klant",
    },
    work: {
      title: "Projecten",
      underConstruction: "In aanbouw",
      view: "Bekijk",
      bergtopperAlt: "BergTopper website",
      vanAmerongenAlt: "Voorbeeld van de Van Amerongen Bouw website",
      tuinNatuurlijkAlt: "Voorbeeld van de Tuin Natuurlijk website",
    },
    about: {
      label: "Over mij",
      title: "Ik ben Victor. Ik ontwerp en bouw websites.",
      p1: "Orinti Webdevelopment, dat ben ik. Ik werk voor particulieren en lokale ondernemers. Is je huidige site verouderd, of heb je er nog geen? Dan regel ik de structuur, het ontwerp en de teksten, zodat de site laat zien waar het bedrijf nu staat.",
      p2: "Jij blijft bij je werk. Ik regel de website, van het eerste gesprek tot live.",
      photoAlt: "Victor, oprichter van Orinti Webdevelopment",
    },
    faq: {
      label: "FAQ",
      title: "Voor we beginnen",
      items: [
        {
          question: "Hoe lang duurt een website?",
          answer:
            "De meeste projecten duren een paar weken, van het eerste gesprek tot live. Dat hangt af van hoeveel teksten en pagina’s je nodig hebt. We werken in een vaste volgorde: briefing, eerste versie, twee revisierondes, en dan live.",
        },
        {
          question: "Hoe werken revisies?",
          answer:
            "Er zitten twee revisierondes bij. Lever per ronde je feedback in één keer aan, dan blijven we snel en binnen de afspraak. Wil je daarna een andere richting of extra pagina’s, dan reken ik dat per uur.",
        },
        {
          question: "Wat gebeurt er als de site live is?",
          answer:
            "Gaat er in het eerste jaar iets stuk wat ik heb gemaakt, dan los ik dat gratis op. Nieuwe pagina’s, extra functies of andere aanpassingen reken ik per uur.",
        },
        {
          question: "Hoe werkt de prijs?",
          answer:
            "Na een kort gesprek krijg je een duidelijke prijs, afhankelijk van hoe groot de site wordt. Ik zet expres geen pakketten op deze pagina. De offerte sluit aan op wat jij nodig hebt.",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Vertel over je project",
      intro: "Stuur een bericht, dan hoor je snel van me.",
      name: "Naam",
      email: "E-mail",
      company: "Bedrijf (optioneel)",
      message: "Bericht",
      placeholder: "Wat heb je nodig, en wat moet de site voor je bedrijf doen?",
      send: "Versturen",
      sending: "Even geduld...",
      success: "Bedankt, je bericht is verstuurd. Ik mail je zo snel mogelijk terug.",
      error: "Versturen is niet gelukt. Mail me dan even direct.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

const STORAGE_KEY = "orinti-lang";

const LanguageContext = createContext<{
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "nl") {
      setLocale(stored);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, ready]);

  const value = useMemo(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
      toggleLocale: () => setLocale((current) => (current === "en" ? "nl" : "en")),
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}

export const navHrefs = [
  { href: "/#top", key: "home" },
  { href: "/#clients", key: "clients" },
  { href: "/#projects", key: "projects" },
  { href: "/#about", key: "about" },
  { href: "/#faq", key: "faq" },
  { href: "/#contact", key: "contact" },
] as const;
