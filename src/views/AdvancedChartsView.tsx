import React, { useState } from 'react';
import { BarChart2, BookOpen, Compass, HelpCircle, ShieldCheck } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { UnifiedAssetDetailView } from '../components/UnifiedAssetDetailView';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { CHARTS_EDITORIAL_TRANSLATIONS } from '../i18n/chartsEditorialTranslations';
import { getLocalizedAssetName } from '../i18n/marketDataTranslations';
import { getAssetMetadata } from '../utils/assetProfiles';
import {
  formatCurrencyValue,
  formatPointsValue,
  formatSignedPercentChange,
  getAssetPriceDecimals,
} from '../utils/finance';
import type { MarketAsset } from '../services/marketData';

const CORRIDOR_BENCHMARK_SYMBOLS = [
  'IBOVESPA',
  'EUR/BRL',
  'USD/BRL',
  'EURO STOXX 50',
  'DAX 40',
  'S&P 500',
];

export const AdvancedChartsView: React.FC = () => {
  const { assets, setActiveTab } = useMarket();
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const tAdv = VIEWS_TRANSLATIONS[lang].advancedCharts;
  const tEditorial = CHARTS_EDITORIAL_TRANSLATIONS[lang];
  const [selectedSymbol, setSelectedSymbol] = useState<string>('IBOVESPA');

  const currentAsset =
    assets.find((a) => a.symbol === selectedSymbol || a.id === selectedSymbol) || assets[0];

  const isCurrentIndex =
    currentAsset.category === 'indices' ||
    currentAsset.currency === 'PTS' ||
    currentAsset.currency === 'PONTOS' ||
    currentAsset.currency === 'POINTS';
  const currentMeta = getAssetMetadata(currentAsset, lang);

  const formatAssetValue = (assetItem: MarketAsset, value: number): string => {
    const assetIsIndex =
      assetItem.category === 'indices' ||
      assetItem.currency === 'PTS' ||
      assetItem.currency === 'PONTOS' ||
      assetItem.currency === 'POINTS';
    if (assetIsIndex) {
      return formatPointsValue(value, locale);
    }
    const dec = getAssetPriceDecimals(value, assetItem.currency, assetItem.category);
    return formatCurrencyValue(value, assetItem.currency, dec, locale);
  };

  const corridorBenchmarks = CORRIDOR_BENCHMARK_SYMBOLS.map((sym) =>
    assets.find((a) => a.symbol === sym)
  ).filter((item): item is MarketAsset => Boolean(item && Number.isFinite(item.price) && item.price > 0));

  const currentPct = formatSignedPercentChange(currentAsset.change24h, 2, locale);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Asset Quick Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E3F7F2] dark:bg-emerald-500/15 border border-[#009B77]/35 dark:border-emerald-500/30 flex items-center justify-center text-[#006B52] dark:text-emerald-400">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2">
              <span>{tAdv.title}</span>
            </h1>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              {tAdv.subtitle}
            </p>
          </div>
        </div>

        {/* Global Asset Dropdown */}
        <div className="flex items-center gap-2.5">
          <label className="text-xs font-bold text-[#475569] dark:text-slate-400 uppercase tracking-wider">
            {tAdv.selectAsset}
          </label>
          <select
            value={currentAsset.symbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs font-bold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500 shadow-md cursor-pointer"
          >
            <optgroup label={tAdv.groupIndices}>
              {assets
                .filter((a) => a.category === 'indices')
                .map((a) => (
                  <option key={a.id} value={a.symbol}>
                    {a.symbol} - {getLocalizedAssetName(a, lang)}
                  </option>
                ))}
            </optgroup>
            <optgroup label={tAdv.groupStocksBr}>
              {assets
                .filter((a) => a.category === 'stocks_br')
                .map((a) => (
                  <option key={a.id} value={a.symbol}>
                    {a.symbol} - {getLocalizedAssetName(a, lang)}
                  </option>
                ))}
            </optgroup>
            <optgroup label={tAdv.groupStocksUs}>
              {assets
                .filter((a) => a.category === 'stocks_us')
                .map((a) => (
                  <option key={a.id} value={a.symbol}>
                    {a.symbol} - {getLocalizedAssetName(a, lang)}
                  </option>
                ))}
            </optgroup>
            <optgroup label={tAdv.groupForex}>
              {assets
                .filter((a) => a.category === 'forex')
                .map((a) => (
                  <option key={a.id} value={a.symbol}>
                    {a.symbol} - {getLocalizedAssetName(a, lang)}
                  </option>
                ))}
            </optgroup>
            <optgroup label={tAdv.groupCrypto}>
              {assets
                .filter((a) => a.category === 'crypto')
                .map((a) => (
                  <option key={a.id} value={a.symbol}>
                    {a.symbol} - {getLocalizedAssetName(a, lang)}
                  </option>
                ))}
            </optgroup>
            <optgroup label={tAdv.groupCommodities}>
              {assets
                .filter((a) => a.category === 'commodities')
                .map((a) => (
                  <option key={a.id} value={a.symbol}>
                    {a.symbol} - {getLocalizedAssetName(a, lang)}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Unified Asset Detail & Interactive Charting View */}
      <UnifiedAssetDetailView
        asset={currentAsset}
        onBack={() => setActiveTab('dashboard')}
      />

      {/* Editorial Guide & EU-Mercosur Context (below Institutional Profile & Governance) */}
      <section
        aria-labelledby="charts-editorial-guide-title"
        className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6"
      >
        <div className="space-y-2 border-b border-[#E2E8F0] dark:border-slate-800/80 pb-4">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
            <Compass className="w-4 h-4" />
            <span>{tEditorial.eyebrow}</span>
          </div>
          <h2
            id="charts-editorial-guide-title"
            className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight"
          >
            {tEditorial.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed max-w-4xl">
            {tEditorial.intro}
          </p>
        </div>

        {/* Real Loaded Screen Data Snapshot */}
        <div className="bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/90 rounded-xl p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-white flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#006B52] dark:text-emerald-400" />
              <span>{tEditorial.liveStripTitle}</span>
            </h3>
            <span className="text-[11px] text-[#475569] dark:text-slate-400">
              {tEditorial.liveStripNote}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400 block">
                {tEditorial.selectedAssetLabel} • {currentMeta.ticker}
              </span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm sm:text-base font-black font-mono-numbers text-[#0F172A] dark:text-white">
                  {formatAssetValue(currentAsset, currentAsset.price)}
                </span>
                <span
                  className={`text-xs font-bold font-mono-numbers ${
                    currentPct.isNegative
                      ? 'text-[#DC2626] dark:text-rose-400'
                      : 'text-[#006B52] dark:text-emerald-400'
                  }`}
                >
                  {currentPct.text}
                </span>
              </div>
              <span className="text-[10px] text-[#64748B] dark:text-slate-500 block">
                {isCurrentIndex ? getLocalizedAssetName(currentAsset, lang) : `${getLocalizedAssetName(currentAsset, lang)} (${currentAsset.currency})`}
              </span>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400 block">
                {tEditorial.selectedSupportLabel}
              </span>
              <span className="text-sm sm:text-base font-black font-mono-numbers text-[#DC2626] dark:text-rose-400 block">
                {formatAssetValue(currentAsset, currentMeta.aiDiagnosis.supportLevel)}
              </span>
              <span className="text-[10px] font-mono-numbers text-[#64748B] dark:text-slate-500 block">
                24h: {formatAssetValue(currentAsset, currentAsset.low24h)}
              </span>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400 block">
                {tEditorial.selectedResistanceLabel}
              </span>
              <span className="text-sm sm:text-base font-black font-mono-numbers text-[#006B52] dark:text-emerald-400 block">
                {formatAssetValue(currentAsset, currentMeta.aiDiagnosis.resistanceLevel)}
              </span>
              <span className="text-[10px] font-mono-numbers text-[#64748B] dark:text-slate-500 block">
                24h: {formatAssetValue(currentAsset, currentAsset.high24h)}
              </span>
            </div>
          </div>

          {corridorBenchmarks.length > 0 && (
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400 block">
                {tEditorial.corridorBenchmarksTitle}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {corridorBenchmarks.map((bench) => {
                  const benchPct = formatSignedPercentChange(bench.change24h, 2, locale);
                  return (
                    <div
                      key={bench.id}
                      className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 rounded-lg px-3 py-2 space-y-0.5"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-[#0F172A] dark:text-white truncate">
                          {bench.symbol}
                        </span>
                        <span
                          className={`text-[10px] font-bold font-mono-numbers ${
                            benchPct.isNegative
                              ? 'text-[#DC2626] dark:text-rose-400'
                              : 'text-[#006B52] dark:text-emerald-400'
                          }`}
                        >
                          {benchPct.text}
                        </span>
                      </div>
                      <span className="text-xs font-bold font-mono-numbers text-[#1E293B] dark:text-slate-200 block">
                        {formatAssetValue(bench, bench.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4 Educational Subsections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tEditorial.sections.map((section) => (
            <article
              key={section.id}
              className="bg-[#F8FAFC] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/90 rounded-xl p-4 sm:p-5 space-y-2"
            >
              <h3 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white">
                {section.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        {/* Short 4-Item FAQ */}
        <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-800/80 space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#003399] dark:text-sky-400">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{tEditorial.faqEyebrow}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#0F172A] dark:text-white">
              {tEditorial.faqTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tEditorial.faqItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 rounded-xl p-4 space-y-2"
              >
                <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                  {item.question}
                </h4>
                <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-[#E6EEFF]/60 dark:bg-slate-900/80 border border-[#CBD5E1] dark:border-slate-800 px-3.5 py-2.5 text-[11px] text-[#1E293B] dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#003399] dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>{tEditorial.educationalDisclaimer}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
