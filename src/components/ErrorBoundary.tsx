import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  detectInitialLanguage,
  LANG_STORAGE_KEY,
  TRANSLATIONS,
} from '../i18n/translations';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function getBoundaryCopy() {
  let stored: string | null = null;
  try {
    if (typeof window !== 'undefined') {
      stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    }
  } catch {
    stored = null;
  }
  const navLang =
    typeof navigator !== 'undefined'
      ? navigator.language || (Array.isArray(navigator.languages) ? navigator.languages[0] : '')
      : 'en';
  const lang = detectInitialLanguage(navLang, stored);
  return TRANSLATIONS[lang].errorBoundary;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[DinhEuro ErrorBoundary] Erro capturado na árvore de componentes:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const copy = getBoundaryCopy();

      return (
        <div className="min-h-[300px] w-full flex items-center justify-center p-6 bg-[#F8FAFC] dark:bg-[#0B1320] text-[#0F172A] dark:text-slate-100">
          <div className="max-w-md w-full bg-[#FFFFFF] dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-emerald-500/30 rounded-xl p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#E6EEFF] dark:bg-emerald-500/10 border border-[#6699CC]/40 dark:border-emerald-500/30 text-[#003399] dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              €
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">
              {copy.title}
            </h3>
            <p className="text-xs text-[#475569] dark:text-slate-400 mb-5 leading-relaxed">
              {copy.description}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                data-on-dark="true"
                className="px-4 py-2 bg-[#003399] hover:bg-[#002266] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
              >
                {copy.reconnect}
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-300 font-semibold text-xs rounded-lg border border-[#E2E8F0] dark:border-slate-700 transition-all cursor-pointer"
              >
                {copy.reload}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
