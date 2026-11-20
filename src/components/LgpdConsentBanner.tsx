import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Check, ArrowRight, X } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';

const LGPD_STORAGE_KEY = 'dinheuro_lgpd_accepted';

export const LgpdConsentBanner: React.FC = () => {
  const { setActiveTab } = useMarket();
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check initial acceptance
    try {
      const accepted = localStorage.getItem(LGPD_STORAGE_KEY);
      if (!accepted) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Listener to re-open banner when user clicks "Redefinir Preferências de Cookies"
    const handleReopen = () => {
      setIsVisible(true);
    };

    window.addEventListener('dinheuro_reopen_cookie_banner', handleReopen);
    return () => {
      window.removeEventListener('dinheuro_reopen_cookie_banner', handleReopen);
    };
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(LGPD_STORAGE_KEY, JSON.stringify({
        accepted: true,
        date: new Date().toISOString(),
        version: '2026.1',
      }));
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleOpenPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab('privacidade');
  };

  const handleOpenCookies = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab('cookies');
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.lgpd.dialogAria}
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none animate-in fade-in slide-in-from-bottom-6 duration-300"
    >
      <div className="max-w-5xl mx-auto pointer-events-auto bg-[#FFFFFF]/95 dark:bg-[#0a1220]/95 backdrop-blur-xl border border-[#003399]/30 dark:border-emerald-500/30 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-slate-900/20 dark:shadow-black/80 ring-1 ring-[#E2E8F0] dark:ring-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          {/* Text & Icon */}
          <div className="flex items-start gap-3.5 flex-1">
            <div className="w-10 h-10 rounded-xl bg-[#E6EEFF] dark:bg-emerald-500/15 border border-[#6699CC]/40 dark:border-emerald-500/30 flex items-center justify-center text-[#003399] dark:text-emerald-400 shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white tracking-tight">
                  {t.lgpd.title}
                </span>
                <span className="text-[10px] font-mono text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/30 dark:border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                  LGPD & GDPR
                </span>
              </div>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                {t.lgpd.body}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs">
                <button
                  type="button"
                  onClick={handleOpenPrivacy}
                  className="text-[#003399] dark:text-emerald-400 hover:text-[#002266] dark:hover:text-emerald-300 font-semibold underline underline-offset-2 transition cursor-pointer"
                >
                  {t.lgpd.privacyLink}
                </button>
                <span className="text-[#CBD5E1] dark:text-slate-600">•</span>
                <button
                  type="button"
                  onClick={handleOpenCookies}
                  className="text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-slate-200 transition cursor-pointer"
                >
                  {t.lgpd.cookiesLink}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 justify-end pt-2 md:pt-0">
            <button
              type="button"
              onClick={handleAcceptAll}
              data-on-dark="true"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#003399] to-[#009B77] hover:from-[#002266] hover:to-[#006B52] dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400 text-white dark:text-slate-950 font-black text-xs sm:text-sm transition shadow-lg shadow-[#003399]/20 dark:shadow-emerald-950/50 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{t.lgpd.acceptBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
