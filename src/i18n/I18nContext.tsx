import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  HTML_LANG_MAP,
  LANG_STORAGE_KEY,
  SupportedLanguage,
  TRANSLATIONS,
  AppTranslations,
  detectInitialLanguage,
} from './translations';

interface I18nContextValue {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  t: AppTranslations;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function resolveInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'pt';

  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    stored = null;
  }

  const browserLang =
    typeof navigator !== 'undefined'
      ? navigator.language || (Array.isArray(navigator.languages) ? navigator.languages[0] : '')
      : 'en';

  return detectInitialLanguage(browserLang, stored);
}

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLanguage>(() => resolveInitialLanguage());

  const setLang = useCallback((nextLang: SupportedLanguage) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
    } catch {
      // ignore storage quota errors
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = HTML_LANG_MAP[lang];
    }
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: TRANSLATIONS[lang],
    }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}
