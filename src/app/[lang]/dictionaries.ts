import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  fi: () => import("./dictionaries/fi.json").then((module) => module.default),
};

export type Lang = "en" | "de" | "fi";

export const getDictionary = async (locale: Lang) => dictionaries[locale]();
