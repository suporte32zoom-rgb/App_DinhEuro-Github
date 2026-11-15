import React from 'react';
import {
  Globe,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle,
  FileText,
  Mail,
  Cpu,
  Lock,
  ArrowRight,
  TrendingUp,
  Compass,
  Award,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useMarket();
  const { lang } = useI18n();
  const tAbout = VIEWS_TRANSLATIONS[lang].about;

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Brand Hero with New Official Logo */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1a30] via-[#091120] to-[#060a12] border border-slate-700/80 p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-amber-400/50 p-1.5 mb-5 shadow-2xl shadow-emerald-950/80 bg-white/5 transition-transform hover:scale-105 duration-300">
          <img
            src="/logo.png"
            alt={tAbout.logoAlt}
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Dinh<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">Euro</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-emerald-400 tracking-widest uppercase mt-1">
          {tAbout.brandTagline}
        </p>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-4 leading-relaxed">
          {tAbout.heroDescPrefix ? `${tAbout.heroDescPrefix} ` : ''}<strong>DinhEuro</strong> {tAbout.heroDescSuffix}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={() => setActiveTab('mercados')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-lg cursor-pointer"
          >
            <span>{tAbout.exploreMarkets}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('graficos')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700 cursor-pointer"
          >
            <span>{tAbout.d3TerminalBtn}</span>
          </button>
        </div>
      </div>

      {/* Missão, Visão e Valores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">{tAbout.missionTitle}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tAbout.missionDesc}
          </p>
        </div>

        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">{tAbout.visionTitle}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tAbout.visionDesc}
          </p>
        </div>

        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-white">{tAbout.valuesTitle}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {tAbout.valuesDesc}
          </p>
        </div>
      </div>

      {/* Pilares Tecnológicos */}
      <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 sm:p-8 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-400" />
          <span>{tAbout.techTitle}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {tAbout.techIntroPrefix} <strong>{tAbout.techIntroBold}</strong> {tAbout.techIntroSuffix}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 block">{tAbout.pillar1Title}</span>
            <p className="text-xs text-slate-400">{tAbout.pillar1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-blue-400 block">{tAbout.pillar2Title}</span>
            <p className="text-xs text-slate-400">{tAbout.pillar2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 block">{tAbout.pillar3Title}</span>
            <p className="text-xs text-slate-400">{tAbout.pillar3Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-purple-400 block">{tAbout.pillar4Title}</span>
            <p className="text-xs text-slate-400">{tAbout.pillar4Desc}</p>
          </div>
        </div>
      </div>

      {/* Contato e Governança */}
      <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">{tAbout.pressTitle}</h3>
          <p className="text-xs text-slate-400">
            {tAbout.pressDesc}
          </p>
        </div>
        <a
          href="mailto:tarcianosousa484@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition border border-slate-700 cursor-pointer shrink-0"
        >
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>tarcianosousa484@gmail.com</span>
        </a>
      </div>
    </div>
  );
};
