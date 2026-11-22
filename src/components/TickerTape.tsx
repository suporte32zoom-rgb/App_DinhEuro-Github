import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { getDualCurrencyDisplay, formatSignedPercentChange } from '../utils/finance';
import { useI18n } from '../i18n/I18nContext';
import { getLocalizedAssetSymbol } from '../i18n/marketDataTranslations';

export const TickerTape: React.FC = () => {
  const { assets, setSelectedAsset, universalRates } = useMarket();
  const { lang, t } = useI18n();

  // Curated list for the ticker
  const tickerItems = assets.slice(0, 14);
  // Duplicate for seamless infinite loop
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-[#F4F7F9] dark:bg-[#070d18] border-b border-[#E2E8F0] dark:border-slate-800/80 text-xs py-1.5 overflow-hidden select-none relative group max-w-[100vw]">
      <div className="flex items-center">
        {/* Live Badge */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 bg-[#FFFFFF] dark:bg-slate-900 border-r border-[#E2E8F0] dark:border-slate-800 z-10 flex-shrink-0 text-[10px] font-semibold text-[#003399] dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#009B77] dark:bg-emerald-500 animate-pulse"></span>
          <span className="hidden sm:inline">{t.ticker.liveDesktop}</span>
          <span className="sm:hidden">{t.ticker.liveMobile}</span>
        </div>

        {/* Ticker marquee */}
        <div className="overflow-hidden flex-1 no-scrollbar">
          <div className="animate-ticker flex items-center gap-6">
            {displayItems.map((item, idx) => {
              const pctInfo = formatSignedPercentChange(item.change24h, 2);
              const isIndex = item.category === 'indices' || item.currency === 'PTS';
              const dual = getDualCurrencyDisplay(item.price, item.currency, universalRates, isIndex, undefined, item.category);

              return (
                <button
                  key={`${item.id}-${idx}`}
                  onClick={() => setSelectedAsset(item)}
                  className="flex items-center gap-2 hover:bg-[#E6EEFF]/80 dark:hover:bg-slate-800/60 px-2 py-0.5 rounded transition cursor-pointer flex-shrink-0"
                >
                  <span className="font-bold text-[#002266] dark:text-slate-200">{getLocalizedAssetSymbol(item, lang)}</span>
                  <div className="flex items-baseline gap-1.5 font-mono-numbers">
                    <span className="text-[#0F172A] dark:text-slate-100 font-bold">{dual.primaryFormatted}</span>
                    {!isIndex && dual.secondaryFormatted && (
                      <span className="text-[10px] text-[#006B52] dark:text-emerald-400/90 font-semibold">
                        (≈ {dual.secondaryFormatted})
                      </span>
                    )}
                  </div>
                  <span
                    className={`flex items-center text-[11px] font-semibold font-mono-numbers ${
                      !pctInfo.isNegative ? 'text-[#009B77] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
                    }`}
                  >
                    {pctInfo.isPositive ? (
                      <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    ) : pctInfo.isNegative ? (
                      <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                    ) : null}
                    {pctInfo.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
