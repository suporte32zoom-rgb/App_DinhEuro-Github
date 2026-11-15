import React from 'react';
import { Globe, Coins, TrendingUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useMarket } from '../context/MarketContext';

export const HomeSeoEditorialSection: React.FC = () => {
  const { t, lang } = useI18n();
  const { assets, universalRates } = useMarket();

  const eurBrl =
    assets.find((a) => a.id === 'eur_brl')?.price ||
    (universalRates.BRL && universalRates.EUR
      ? universalRates.BRL / universalRates.EUR
      : 6.2335);
  const usdBrl =
    assets.find((a) => a.id === 'usd_brl')?.price || universalRates.BRL || 5.584;

  const formattedEur = eurBrl.toLocaleString(lang === 'en' ? 'en-US' : 'pt-BR', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
  const formattedUsd = usdBrl.toLocaleString(lang === 'en' ? 'en-US' : 'pt-BR', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });

  const icons = [
    <Coins key="eur" className="w-4 h-4 text-emerald-400 flex-shrink-0" />,
    <TrendingUp key="usd" className="w-4 h-4 text-sky-400 flex-shrink-0" />,
    <Globe key="global" className="w-4 h-4 text-amber-400 flex-shrink-0" />,
  ];

  return (
    <section
      aria-labelledby="home-seo-editorial-heading"
      className="rounded-2xl bg-[#0d1627] border border-slate-800/90 p-5 sm:p-6 shadow-xl space-y-5"
    >
      <div className="border-b border-slate-800/80 pb-4 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            {t.seoBlock.eyebrow}
          </span>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono-numbers text-slate-300">
            <span>
              EUR/BRL: <strong className="text-emerald-400">R$ {formattedEur}</strong>
            </span>
            <span className="text-slate-600" aria-hidden="true">
              •
            </span>
            <span>
              USD/BRL: <strong className="text-emerald-400">R$ {formattedUsd}</strong>
            </span>
          </div>
        </div>

        <h2
          id="home-seo-editorial-heading"
          className="text-base sm:text-lg font-extrabold text-white tracking-tight"
        >
          {t.seoBlock.heading}
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          {t.seoBlock.lead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {t.seoBlock.cards.map((card, idx) => (
          <article
            key={card.title}
            className="rounded-xl bg-[#070e1b] border border-slate-800/80 p-4 space-y-2"
          >
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              {icons[idx % icons.length]}
              <span>{card.title}</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
