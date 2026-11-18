import React from 'react';
import {
  AlertTriangle,
  Radio,
  Server,
  Scale,
  ShieldAlert,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';

export const DisclaimerView: React.FC = () => {
  const { setActiveTab } = useMarket();
  const { lang } = useI18n();
  const tLegal = LEGAL_TRANSLATIONS[lang];
  const tDisc = tLegal.disclaimer;
  const cardColors = ['text-emerald-400', 'text-blue-400', 'text-amber-400', 'text-purple-400'];

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Header Breadcrumb & Back */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tLegal.backToHome}</span>
        </button>
        <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
          {tDisc.badge}
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1207] via-[#140e06] to-[#0a0703] border border-amber-500/40 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {tDisc.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {tDisc.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* 1. Ausência de Recomendação */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>{tDisc.s1Title}</span>
          </h2>
          <p>
            {tDisc.s1P1Before ? `${tDisc.s1P1Before} ` : ''}<strong>DinhEuro</strong> (<span className="text-emerald-400 font-mono">dinheuro.com</span> / <span className="text-emerald-400 font-mono">dinheuro.com.br</span>) {tDisc.s1P1After}
          </p>
          <p>{tDisc.s1P2}</p>
        </div>

        {/* 2. Provedores de Dados e Latência */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>{tDisc.s2Title}</span>
          </h2>
          <p>{tDisc.s2Intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {tDisc.s2Cards.map((card, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className={`text-xs font-bold ${cardColors[idx % cardColors.length]} block`}>{card.title}</span>
                <p className="text-[11px] text-slate-400">{card.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-xs pt-1">
            <strong>{tDisc.s2LatencyLabel}</strong> {tDisc.s2LatencyDesc}
          </p>
        </div>

        {/* 3. Riscos de Perda de Capital */}
        <div className="rounded-2xl bg-red-950/20 border border-red-500/30 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>{tDisc.s3Title}</span>
          </h2>
          <p className="text-slate-200">{tDisc.s3P1}</p>
          <p className="text-slate-400">{tDisc.s3P2}</p>
        </div>

        {/* 4. Limitação de Responsabilidade */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>{tDisc.s4Title}</span>
          </h2>
          <p>{tDisc.s4P1}</p>
          <p className="text-slate-400 text-xs pt-2 border-t border-slate-800/80">
            {tDisc.s4Contact} <a href="mailto:admin@dinheiro.com" className="text-emerald-400 hover:underline font-mono">admin@dinheiro.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
