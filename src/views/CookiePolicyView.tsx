import React from 'react';
import {
  Cookie,
  ShieldCheck,
  RotateCcw,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';

export const CookiePolicyView: React.FC = () => {
  const { setActiveTab } = useMarket();
  const { lang } = useI18n();
  const tLegal = LEGAL_TRANSLATIONS[lang];
  const tCookies = tLegal.cookies;

  const handleResetCookieConsent = () => {
    try {
      localStorage.removeItem('dinheuro_lgpd_accepted');
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event('dinheuro_reopen_cookie_banner'));
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Breadcrumb & Back */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/60 border border-[#CBD5E1] dark:border-slate-800 hover:border-[#003399] dark:hover:border-slate-700 cursor-pointer shadow-sm dark:shadow-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tLegal.backToHome}</span>
        </button>
        <span className="text-[11px] font-mono text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/30 dark:border-emerald-500/20 px-2.5 py-1 rounded-md font-bold">
          {tCookies.badge}
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FEF7E0] via-white to-[#E6EEFF] dark:from-[#121626] dark:via-[#091122] dark:to-[#060c16] border border-[#E5A910]/40 dark:border-slate-700/80 p-6 sm:p-10 shadow-lg dark:shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E5A910]/15 dark:bg-amber-500/15 border border-[#E5A910]/40 dark:border-amber-500/30 flex items-center justify-center text-[#B45309] dark:text-amber-400 shrink-0">
            <Cookie className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {tCookies.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {tCookies.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Cookie Preference Action Box */}
      <div className="rounded-2xl bg-[#FEF7E0]/70 dark:bg-[#0b1424] border border-[#E5A910]/40 dark:border-amber-500/30 p-6 shadow-md dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#B45309] dark:text-amber-400 tracking-wider uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span>{tCookies.manageTitle}</span>
          </span>
          <p className="text-xs text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed">
            {tCookies.manageDesc}
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetCookieConsent}
          data-on-dark="true"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-black text-xs transition shadow-lg shrink-0 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{tCookies.resetBtn}</span>
        </button>
      </div>

      {/* Detailed Legal Sections */}
      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* 1. O que são cookies */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tCookies.s1Title}</span>
          </h2>
          <p>{tCookies.s1Desc}</p>
        </div>

        {/* 2. Categorias de Cookies Usadas */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tCookies.s2Title}</span>
          </h2>

          <div className="space-y-3">
            {/* Categoria 1: Essenciais */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#009B77]/30 dark:border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006B52] dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{tCookies.catATitle}</span>
                </span>
                <span className="text-[10px] font-mono text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10 px-2 py-0.5 rounded font-bold">{tCookies.catABadge}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{tCookies.catADesc}</p>
              <div className="text-[11px] font-mono text-slate-700 dark:text-slate-400 bg-[#F1F5F9] dark:bg-slate-950/60 p-2.5 rounded-lg border border-[#E2E8F0] dark:border-slate-800 space-y-1">
                {tCookies.catAItems.map((item, idx) => (
                  <div key={idx}>• <strong className="text-slate-900 dark:text-slate-200">{item.key}</strong> {item.desc}</div>
                ))}
              </div>
            </div>

            {/* Categoria 2: Preferências & Funcionalidade */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#003399] dark:text-blue-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{tCookies.catBTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-[#003399] dark:text-blue-400 bg-[#E6EEFF] dark:bg-blue-500/10 px-2 py-0.5 rounded font-bold">{tCookies.catBBadge}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{tCookies.catBDesc}</p>
              <div className="text-[11px] font-mono text-slate-700 dark:text-slate-400 bg-[#F1F5F9] dark:bg-slate-950/60 p-2.5 rounded-lg border border-[#E2E8F0] dark:border-slate-800 space-y-1">
                {tCookies.catBItems.map((item, idx) => (
                  <div key={idx}>• <strong className="text-slate-900 dark:text-slate-200">{item.key}</strong> {item.desc}</div>
                ))}
              </div>
            </div>

            {/* Categoria 3: Análise e Desempenho */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#B45309] dark:text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{tCookies.catCTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-[#B45309] dark:text-amber-400 bg-[#FEF7E0] dark:bg-amber-500/10 px-2 py-0.5 rounded font-bold">{tCookies.catCBadge}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{tCookies.catCDesc}</p>
            </div>
          </div>
        </div>

        {/* 3. Como Desativar no Navegador */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tCookies.s3Title}</span>
          </h2>
          <p>{tCookies.s3Desc}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {tCookies.browsers.map((b, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 space-y-1">
                <strong className="text-slate-900 dark:text-white">{b.name}</strong>
                <p className="text-slate-600 dark:text-slate-400">{b.steps}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
