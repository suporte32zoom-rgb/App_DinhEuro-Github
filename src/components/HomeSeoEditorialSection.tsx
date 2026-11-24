import React from 'react';
import { HelpCircle, BookOpen } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { useMarket } from '../context/MarketContext';
import { resolveEurBrlRate, resolveUsdBrlRate } from '../utils/finance';

export const HomeSeoEditorialSection: React.FC = () => {
  const { t, lang } = useI18n();
  const { assets, universalRates } = useMarket();

  const eurBrl = resolveEurBrlRate(assets, universalRates);
  const usdBrl = resolveUsdBrlRate(assets, universalRates);

  const numberLocale = getNumberLocale(lang);
  const formattedEur = eurBrl.toLocaleString(numberLocale, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
  const formattedUsd = usdBrl.toLocaleString(numberLocale, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });

  return (
    <section
      aria-labelledby="home-seo-editorial-heading"
      className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800/90 p-5 sm:p-6 shadow-xl space-y-5"
    >
      <div className="border-b border-[#E2E8F0] dark:border-slate-800/80 pb-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.seoBlock.eyebrow}</span>
          </span>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-numbers text-[#475569] dark:text-slate-300">
            <span>
              EUR/BRL: <strong className="text-[#006B52] dark:text-emerald-400">R$ {formattedEur}</strong>
            </span>
            <span className="text-[#CBD5E1] dark:text-slate-600" aria-hidden="true">
              •
            </span>
            <span>
              USD/BRL: <strong className="text-[#006B52] dark:text-emerald-400">R$ {formattedUsd}</strong>
            </span>
          </div>
        </div>

        <h2
          id="home-seo-editorial-heading"
          className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight"
        >
          {t.seoBlock.heading}
        </h2>
        <p className="text-xs sm:text-[13px] text-[#1E293B] dark:text-slate-300 leading-relaxed max-w-4xl">
          {t.seoBlock.lead}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{t.seoBlock.faqTitle}</span>
        </h3>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.seoBlock.faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 p-4 space-y-2"
            >
              <dt className="text-xs sm:text-sm font-bold text-[#002266] dark:text-white leading-snug">
                {item.question}
              </dt>
              <dd className="text-[11px] sm:text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
