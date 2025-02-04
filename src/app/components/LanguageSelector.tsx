"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Lang } from "../[lang]/dictionaries";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
];

export function LanguageSelector({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (value: string) => {
    const url = pathname.replace(`/${lang}`, `/${value}`);
    router.replace(url);
    setIsOpen(false);
  };

  const currentLanguage =
    LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
  const otherLanguages = LANGUAGES.filter((l) => l.code !== lang);

  return (
    <div
      className="fixed top-4 right-4 z-50"
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div className="relative">
        <div
          className={`
            w-12 rounded-full
            bg-white/50 backdrop-blur-sm
            flex flex-col items-center
            transition-all duration-300 ease-out
            ${isOpen ? "h-36" : "h-12"}
            shadow-lg
            overflow-hidden
          `}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              w-full h-12
              flex items-center justify-center
              focus:outline-none
              relative
            "
          >
            <span className="relative text-2xl">{currentLanguage.flag}</span>
          </button>

          <div
            className={`
              flex flex-col items-center
              w-full
              transition-all duration-300 ease-out
              overflow-hidden
              ${
                isOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible h-0"
              }
            `}
          >
            {otherLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className="
                  w-full h-12
                  flex items-center justify-center
                  hover:bg-gray-100/30 rounded-full
                  transition-colors duration-200
                "
              >
                <span className="text-2xl">{language.flag}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
