import React, { useMemo } from 'react';
import {
  ArrowRight,
  ArrowRightLeft,
  BookOpen,
  CheckCircle2,
  Globe2,
  HelpCircle,
  Landmark,
  Newspaper,
  Percent,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { MONETARY_POLICY_TRANSLATIONS } from '../i18n/editorialGuidesTranslations';
import {
  formatCurrencyValue,
  formatSignedPercentChange,
  getAssetPriceDecimals,
} from '../utils/finance';

export const MonetaryPolicyView: React.FC = () => {
  const { assets, setActiveTab } = useMarket();
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const copy = MONETARY_POLICY_TRANSLATIONS[lang];

  const fxBenchmarks = useMemo(() => {
    const eur = assets.find((a) => a.symbol === 'EUR/BRL');
    const usd = assets.find((a) => a.symbol === 'USD/BRL');
    return {
      eurPrice: eur && eur.price > 0 ? eur.price : 6.2335,
      eurChange: eur ? eur.change24h : 0.21,
      usdPrice: usd && usd.price > 0 ? usd.price : 5.584,
      usdChange: usd ? usd.change24h : -0.18,
    };
  }, [assets]);

  return (
    <article className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Editorial Header */}
      <header className="bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#E6EEFF]/60 dark:from-[#0f172a] dark:via-[#0b1322] dark:to-[#0f242b] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E6EEFF] text-[#003399] border border-[#003399]/20 dark:bg-cyan-500/15 dark:text-cyan-300 dark:border-cyan-500/30">
            <Landmark className="w-3.5 h-3.5" />
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

        <div className="bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#CBD5E1] dark:border-slate-700/80 rounded-xl p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#003399] dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs leading-relaxed text-[#334155] dark:text-slate-300">
            <p className="font-bold text-[#0F172A] dark:text-white">{copy.noticeTitle}</p>
            <p>{copy.noticeBody}</p>
          </div>
        </div>
      </header>

      {/* Central Bank Pillars & Live FX Bar */}
      <section className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#003399] dark:text-cyan-400" />
              <span>{copy.panelTitle}</span>
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400">{copy.panelSubtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400">EUR/BRL</span>
              <span className="text-xs font-extrabold font-mono-numbers text-[#0F172A] dark:text-white">
                {formatCurrencyValue(
                  fxBenchmarks.eurPrice,
                  'BRL',
                  getAssetPriceDecimals(fxBenchmarks.eurPrice, 'BRL', 'forex'),
                  locale
                )}
              </span>
              <span
                className={`text-[11px] font-bold font-mono-numbers ${
                  fxBenchmarks.eurChange >= 0
                    ? 'text-[#006B52] dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {formatSignedPercentChange(fxBenchmarks.eurChange, 2, locale).text}
              </span>
            </div>

            <div className="bg-[#F8FAFC] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
              <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400">USD/BRL</span>
              <span className="text-xs font-extrabold font-mono-numbers text-[#0F172A] dark:text-white">
                {formatCurrencyValue(
                  fxBenchmarks.usdPrice,
                  'BRL',
                  getAssetPriceDecimals(fxBenchmarks.usdPrice, 'BRL', 'forex'),
                  locale
                )}
              </span>
              <span
                className={`text-[11px] font-bold font-mono-numbers ${
                  fxBenchmarks.usdChange >= 0
                    ? 'text-[#006B52] dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {formatSignedPercentChange(fxBenchmarks.usdChange, 2, locale).text}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.benchmarks.map((item) => (
            <div
              key={item.label}
              className="bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 space-y-2"
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#003399] dark:text-cyan-400">
                {item.label}
              </div>
              <div className="text-base font-extrabold text-[#0F172A] dark:text-white">
                {item.rate}
              </div>
              <div className="text-[11px] font-semibold text-[#006B52] dark:text-emerald-400">
                {item.institution}
              </div>
              <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Indicadores do Eixo União Europeia – Mercosul (Static Official Comparative Panel) */}
      <section
        aria-labelledby="eu-mercosur-indicators-heading"
        className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5"
      >
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
            <Scale className="w-3.5 h-3.5" />
            <span>{copy.euMercosurIndicators.eyebrow}</span>
          </span>
          <h2
            id="eu-mercosur-indicators-heading"
            className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white leading-snug"
          >
            {copy.euMercosurIndicators.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed max-w-4xl">
            {copy.euMercosurIndicators.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {copy.euMercosurIndicators.cards.map((card) => (
            <div
              key={card.id}
              className="bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#E6EEFF] text-[#003399] dark:bg-cyan-500/15 dark:text-cyan-300">
                    {card.badge}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
                    {card.title}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {card.metrics.map((row) => (
                    <div
                      key={row.label}
                      className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-lg p-3 space-y-1"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-[#334155] dark:text-slate-300">
                          {row.label}
                        </span>
                        <span className="text-sm font-extrabold font-mono-numbers text-[#003399] dark:text-cyan-300">
                          {row.value}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
                        {row.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                  {card.takeaway}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800 text-[11px] font-medium text-[#475569] dark:text-slate-400">
                {card.source}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#CBD5E1] dark:border-slate-700/80 rounded-xl p-4 space-y-1.5">
          <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
            {copy.euMercosurIndicators.correlationTitle}
          </h3>
          <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
            {copy.euMercosurIndicators.correlationBody}
          </p>
          <p className="text-[11px] text-[#475569] dark:text-slate-400 pt-1">
            {copy.euMercosurIndicators.staticNote}
          </p>
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
                    <div className="text-sm font-extrabold text-[#003399] dark:text-cyan-300">
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

      {/* Practical Glossary of Monetary Indicators */}
      <section className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-sm space-y-5">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#003399] dark:text-cyan-400">
            <Percent className="w-3.5 h-3.5" />
            <span>{copy.glossaryEyebrow}</span>
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
            {copy.glossaryTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 max-w-3xl">
            {copy.glossarySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {copy.glossaryItems.map((entry) => (
            <div
              key={entry.term}
              className="bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 space-y-1.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
                  {entry.term}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E6EEFF] text-[#003399] dark:bg-slate-800 dark:text-cyan-300">
                  {entry.category}
                </span>
              </div>
              <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                {entry.definition}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('renda_fixa')}
            data-on-dark="true"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer shadow-sm"
          >
            <Percent className="w-4 h-4" />
            <span>{copy.ctaFixedIncome}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guia_cambio')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4 text-[#003399] dark:text-emerald-400" />
            <span>{copy.ctaFxGuide}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('noticias')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            <Newspaper className="w-4 h-4 text-[#006B52] dark:text-cyan-400" />
            <span>{copy.ctaNews}</span>
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
