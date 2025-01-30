'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Lang } from '../[lang]/dictionaries';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' }
];

export function LanguageSelector({lang}: {lang: Lang}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (value: string) => {
    const url = pathname.replace(`/${lang}`, `/${value}`);
    router.replace(url);
    setIsOpen(false);
  };

  const currentLanguage = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];
  const otherLanguages = LANGUAGES.filter(l => l.code !== lang);

  return (
    <div
      className="fixed top-4 right-4 z-50"
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-12 h-12 rounded-full
            flex items-center justify-center
            bg-white/50 backdrop-blur-sm
            hover:bg-white/70 transition-all duration-200
            focus:outline-none
          "
        >
          <span className="text-2xl">{currentLanguage.flag}</span>
        </button>

        {isOpen && (
          <div
            className="
              absolute top-full right-0 mt-2
              bg-white/50 backdrop-blur-sm
              rounded-lg shadow-lg
              overflow-hidden
              transition-all duration-300
            "
          >
            {otherLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className="
                  w-full px-4 py-2
                  text-left hover:bg-gray-100
                  flex items-center space-x-2
                  transition-colors duration-200
                "
              >
                <span className="text-xl">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}