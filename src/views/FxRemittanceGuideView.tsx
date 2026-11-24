import React, { useMemo } from 'react';
import {
  ArrowRight,
  ArrowRightLeft,
  BookOpen,
  Building2,
  Calculator,
  CheckCircle2,
  Globe2,
  HelpCircle,
  Landmark,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { FX_GUIDE_TRANSLATIONS } from '../i18n/editorialGuidesTranslations';
import {
  formatCurrencyValue,
  formatSignedPercentChange,
  getAssetPriceDecimals,
} from '../utils/finance';

export const FxRemittanceGuideView: React.FC = () => {
  const { assets, setActiveTab } = useMarket();
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const copy = FX_GUIDE_TRANSLATIONS[lang];

  const livePairs = useMemo(() => {
    const eur = assets.find((a) => a.symbol === 'EUR/BRL');
    const usd = assets.find((a) => a.symbol === 'USD/BRL');
    const gbp = assets.find((a) => a.symbol === 'GBP/BRL');

    const eurPrice = eur && eur.price > 0 ? eur.price : 6.2335;
    const usdPrice = usd && usd.price > 0 ? usd.price : 5.584;
    const gbpPrice = gbp && gbp.price > 0 ? gbp.price : 7.124;

    return {
      eurPrice,
      eurChange: eur ? eur.change24h : 0.21,
      usdPrice,
      usdChange: usd ? usd.change24h : -0.18,
      gbpPrice,
      gbpChange: gbp ? gbp.change24h : 0.14,
    };
  }, [assets]);

  const channelSimulations = useMemo(() => {
    const baseEurAmount = 1000;
    return copy.channels.map((ch) => {
      const effectiveRate = livePairs.eurPrice * (1 + ch.spreadPct / 100) * (1 + ch.iofPct / 100);
      const totalBrl = baseEurAmount * effectiveRate;
      return {
        ...ch,
        effectiveRate,
        totalBrl,
      };
    });
  }, [copy.channels, livePairs.eurPrice]);

  return (
    <article className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Editorial Header */}
      <header className="bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#E6EEFF]/60 dark:from-[#0f172a] dark:via-[#0b1322] dark:to-[#0f242b] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E6EEFF] text-[#003399] border border-[#003399]/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </span>
          <span className="text-[11px] font-medium text-[#475569] dark:text-slate-400">
            {copy.readingMeta}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-tight">
          {copy.title}
        </h1>
        <p className="text-sm sm:text-base text-[#334155] dark:text-slate-300 leading-relaxed max-w-4xl">
          {copy.subtitle}
        </p>

        {/* Notice Banner */}
        <div className="bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#CBD5E1] dark:border-slate-700/80 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#003399] dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed text-[#334155] dark:text-slate-300">
            <p className="font-bold text-[#0F172A] dark:text-white">{copy.noticeTitle}</p>
            <p>{copy.noticeBody}</p>
          </div>
        </div>
      </header>

      {/* Live FX Benchmarks & VET Channel Comparison */}
      <section className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-[#003399] dark:text-emerald-400" />
            <span>{copy.liveMonitorTitle}</span>
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400">{copy.liveMonitorSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: copy.commercialEuroLabel,
              symbol: 'EUR/BRL',
              price: livePairs.eurPrice,
              change: livePairs.eurChange,
            },
            {
              label: copy.commercialDollarLabel,
              symbol: 'USD/BRL',
              price: livePairs.usdPrice,
              change: livePairs.usdChange,
            },
            {
              label: copy.commercialPoundLabel,
              symbol: 'GBP/BRL',
              price: livePairs.gbpPrice,
              change: livePairs.gbpChange,
            },
          ].map((pair) => {
            const isPositive = pair.change >= 0;
            return (
              <div
                key={pair.symbol}
                className="bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400">
                    {pair.label}
                  </div>
                  <div className="text-xl font-extrabold font-mono-numbers text-[#0F172A] dark:text-white">
                    {formatCurrencyValue(
                      pair.price,
                      'BRL',
                      getAssetPriceDecimals(pair.price, 'BRL', 'forex'),
                      locale
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-bold font-mono-numbers px-2.5 py-1 rounded-lg ${
                    isPositive
                      ? 'bg-[#E3F7F2] text-[#006B52] dark:bg-emerald-500/15 dark:text-emerald-400'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400'
                  }`}
                >
                  {formatSignedPercentChange(pair.change, 2, locale).text}
                </span>
              </div>
            );
          })}
        </div>

        {/* VET Channel Matrix */}
        <div className="pt-2 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
              <span>{copy.spreadComparisonTitle}</span>
            </h3>
            <span className="text-[11px] text-[#475569] dark:text-slate-400">
              {copy.spreadComparisonNote}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {channelSimulations.map((ch) => (
              <div
                key={ch.label}
                className="bg-[#F8FAFC] dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-[#0F172A] dark:text-white">
                    {ch.label}
                  </span>
                  <span className="text-xs font-extrabold font-mono-numbers text-[#003399] dark:text-emerald-400 whitespace-nowrap">
                    {formatCurrencyValue(ch.effectiveRate, 'BRL', 4, locale)} / €
                  </span>
                </div>
                <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
                  {ch.description}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono-numbers border-t border-[#E2E8F0] dark:border-slate-800">
                  <span className="text-[#334155] dark:text-slate-300">
                    Spread: <strong>{ch.spreadPct.toFixed(1)}%</strong> • IOF: <strong>{ch.iofPct.toFixed(2)}%</strong>
                  </span>
                  <span className="font-bold text-[#0F172A] dark:text-white">
                    € 1.000 ≈ {formatCurrencyValue(ch.totalBrl, 'BRL', 2, locale)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Structured Editorial Sections */}
      <section className="space-y-6">
        {copy.sections.map((section) => (
          <div
            key={section.id}
            className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{section.badge}</span>
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white leading-snug">
              {section.title}
            </h2>
            <div className="space-y-3 text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
              {section.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {section.highlights && section.highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {section.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#F4F7F9] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-3.5 space-y-1"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400">
                      {item.label}
                    </div>
                    <div className="text-sm font-extrabold text-[#003399] dark:text-emerald-300">
                      {item.value}
                    </div>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Step-by-Step Guide for Universal Currency Calculator */}
      <section className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>DinhEuro Tools</span>
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
            {copy.stepsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 max-w-3xl">
            {copy.stepsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-[#003399] text-white dark:bg-emerald-500/20 dark:text-emerald-300 border border-[#002266]/20 dark:border-emerald-500/30 flex items-center justify-center text-xs font-extrabold font-mono-numbers shrink-0">
                {step.stepNumber}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                  <span>{step.title}</span>
                </h3>
                <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('ferramentas')}
            data-on-dark="true"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            <span>{copy.ctaCalculator}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('corretoras')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#003399] dark:text-emerald-400" />
            <span>{copy.ctaBrokers}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('politica_monetaria')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <Landmark className="w-4 h-4 text-[#006B52] dark:text-cyan-400" />
            <span>{copy.ctaMonetary}</span>
          </button>
        </div>
      </section>

      {/* FAQ Section (5 Items) */}
      <section className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{copy.faqEyebrow}</span>
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
            {copy.faqTitle}
          </h2>
        </div>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.faqItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 space-y-1.5"
            >
              <dt className="text-sm font-bold text-[#0F172A] dark:text-white flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006B52] dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{item.question}</span>
              </dt>
              <dd className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed pl-6">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Bottom Disclaimer */}
      <footer className="bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 text-xs text-[#475569] dark:text-slate-400 leading-relaxed">
        {copy.footerDisclaimer}
      </footer>
    </article>
  );
};
