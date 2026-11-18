import React from 'react';
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Scale,
  ExternalLink,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Building2,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { LEGAL_TRANSLATIONS } from '../i18n/legalTranslations';

export const TermsOfUseView: React.FC = () => {
  const { setActiveTab } = useMarket();
  const { lang } = useI18n();
  const tLegal = LEGAL_TRANSLATIONS[lang];
  const tTerms = tLegal.terms;

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
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
          {tTerms.badge}
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c182c] via-[#091322] to-[#060c16] border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              {tTerms.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {tTerms.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* 1. Natureza da Plataforma */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>{tTerms.s1Title}</span>
          </h2>
          <p>
            {tTerms.s1P1Before ? `${tTerms.s1P1Before} ` : ''}<strong>DinhEuro</strong> (<span className="text-emerald-400 font-mono">dinheuro.com</span> / <span className="text-emerald-400 font-mono">dinheuro.com.br</span>) {tTerms.s1P1Mid}{tTerms.s1P1After ? ` ${tTerms.s1P1After}` : ''}
          </p>
          <p>
            {tTerms.s1P2Before} <strong>{tTerms.s1P2Bold}</strong> {tTerms.s1P2After}
          </p>
        </div>

        {/* 2. Isenção de Responsabilidade (Disclaimer Financeiro) */}
        <div className="rounded-2xl bg-amber-500/5 border border-amber-500/20 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>{tTerms.s2Title}</span>
          </h2>
          <p className="text-slate-200">
            <strong>{tTerms.s2Warning}</strong>
          </p>
          <p>{tTerms.s2P2}</p>
          <p>{tTerms.s2P3}</p>
        </div>

        {/* 3. Regras de Navegação e Uso Aceitável */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{tTerms.s3Title}</span>
          </h2>
          <p>{tTerms.s3Intro}</p>
          <ul className="space-y-2 list-none pl-0">
            {tTerms.s3Bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Propriedade Intelectual */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>{tTerms.s4Title}</span>
          </h2>
          <p>
            {tTerms.s4P1Before} <strong>DinhEuro</strong>{tTerms.s4P1After}
          </p>
          <p>{tTerms.s4P2}</p>
        </div>

        {/* 5. Links para Terceiros e Afiliados */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>{tTerms.s5Title}</span>
          </h2>
          <p>{tTerms.s5P1}</p>
        </div>

        {/* 6. Modificações e Foro */}
        <div className="rounded-2xl bg-[#0b1322] border border-slate-800 p-6 shadow-xl space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{tTerms.s6Title}</span>
          </h2>
          <p>{tTerms.s6P1}</p>
          <p>{tTerms.s6P2}</p>
          <p className="text-slate-400 text-xs pt-2 border-t border-slate-800/80">
            {tTerms.s6Contact} <a href="mailto:admin@dinheiro.com" className="text-emerald-400 hover:underline font-mono">admin@dinheiro.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
