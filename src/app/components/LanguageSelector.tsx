'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Lang } from '../[lang]/dictionaries';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' }
];

export function LanguageSelector({lang}: {lang: Lang}) {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (value: string) => {
    const url = pathname.replace(`/${lang}`, `/${value}`);
    router.replace(url);
  };

  return (
    <div className="language-selector flex items-center space-x-2">
      {LANGUAGES.map((language) => (
        <button
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          className={`
            px-2 py-1 rounded-full transition-all duration-200
            ${language.code === lang
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100'}
          `}
        >
          <span className="text-xl">{language.flag}</span>
        </button>
      ))}
    </div>
  );
}