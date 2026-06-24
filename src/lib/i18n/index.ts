import en from "./en";
import fr from "./fr";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const dictionaries = { en, fr } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries.en) as Dictionary;
}
