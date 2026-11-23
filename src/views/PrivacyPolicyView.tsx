import React from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  UserCheck,
  Mail,
  ArrowLeft,
  FileCheck2,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';

export const PrivacyPolicyView: React.FC = () => {
  const { setActiveTab } = useMarket();
  const { lang } = useI18n();
  const tLegal = LEGAL_TRANSLATIONS[lang];
  const tPrivacy = tLegal.privacy;

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
          {tPrivacy.badge}
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E3F7F2] via-white to-[#E6EEFF] dark:from-[#071a1c] dark:via-[#091522] dark:to-[#060c16] border border-[#009B77]/30 dark:border-emerald-500/30 p-6 sm:p-10 shadow-lg dark:shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#009B77]/15 dark:bg-emerald-500/20 border border-[#009B77]/40 dark:border-emerald-500/40 flex items-center justify-center text-[#006B52] dark:text-emerald-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {tPrivacy.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {tPrivacy.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* DPO Highlight Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#E3F7F2] via-white to-[#F8FAFC] dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-[#009B77]/35 dark:border-emerald-500/30 p-5 sm:p-6 shadow-md dark:shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-[#006B52] dark:text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            <span>{tPrivacy.dpoTitle}</span>
          </span>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {tPrivacy.dpoDesc}
          </p>
        </div>
        <a
          href="mailto:admin@dinheuro.com"
          data-on-dark="true"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#009B77] hover:bg-[#008263] dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-950 font-bold text-xs transition shadow-lg shrink-0 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>admin@dinheuro.com</span>
        </a>
      </div>

      {/* Detailed Legal Sections */}
      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* 1. Compromisso e Princípios */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tPrivacy.s1Title}</span>
          </h2>
          <p>{tPrivacy.s1P1}</p>
          <p>{tPrivacy.s1P2}</p>
        </div>

        {/* 2. Dados Coletados e Finalidades */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tPrivacy.s2Title}</span>
          </h2>
          <p>{tPrivacy.s2Intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-[#006B52] dark:text-emerald-400 block">
                {tPrivacy.s2ATitle}
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-xs">{tPrivacy.s2ADesc}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-[#003399] dark:text-blue-400 block">
                {tPrivacy.s2BTitle}
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-xs">{tPrivacy.s2BDesc}</p>
            </div>
          </div>
        </div>

        {/* 3. Bases Legais LGPD */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tPrivacy.s3Title}</span>
          </h2>
          <p>{tPrivacy.s3Intro}</p>
          <ul className="space-y-2 pl-2">
            {tPrivacy.s3Items.map((item, idx) => (
              <li key={idx}>
                <strong className="text-slate-900 dark:text-white">{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Compartilhamento com Terceiros */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tPrivacy.s4Title}</span>
          </h2>
          <p>{tPrivacy.s4Intro}</p>
          <ul className="space-y-1.5 list-disc pl-5 text-slate-600 dark:text-slate-400">
            {tPrivacy.s4Items.map((item, idx) => (
              <li key={idx}>
                <strong className="text-slate-800 dark:text-slate-200">{item.strong}</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Direitos do Titular (Art. 18 LGPD) */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tPrivacy.s5Title}</span>
          </h2>
          <p>{tPrivacy.s5Intro}</p>
          <ul className="space-y-1.5 list-disc pl-5 text-slate-600 dark:text-slate-400">
            {tPrivacy.s5Bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
          <p className="pt-2">
            {tPrivacy.s5ContactPrefix} <a href="mailto:admin@dinheuro.com" className="text-[#006B52] dark:text-emerald-400 hover:underline font-mono font-semibold">admin@dinheuro.com</a>. {tPrivacy.s5ContactSuffix}
          </p>
        </div>

        {/* 6. Segurança da Informação */}
        <div className="rounded-2xl bg-white dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-6 shadow-md dark:shadow-xl space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
            <span>{tPrivacy.s6Title}</span>
          </h2>
          <p>{tPrivacy.s6Desc}</p>
        </div>
      </div>
    </div>
  );
};
