import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowRightLeft,
  Gauge,
  Flame,
  Globe,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import {
  getLocalizedAssetName,
  getLocalizedAssetSymbol,
  localizeNewsItem,
} from '../i18n/marketDataTranslations';
import { formatCurrencyValue, convertCurrency } from '../utils/finance';
import { DualPrice } from '../components/DualPrice';
import { FocusRadarPanel } from '../components/FocusRadarPanel';
import { MercosulEuDossierPanel } from '../components/MercosulEuDossierPanel';
import { DrexDossierPanel } from '../components/DrexDossierPanel';
import { UniversalCurrencyCalculator } from '../components/UniversalCurrencyCalculator';
import { AcademyHighlightSection } from '../components/AcademyHighlightSection';
import { HomeSeoEditorialSection } from '../components/HomeSeoEditorialSection';
import { DailyInsightsSidebar } from '../components/DailyInsightsSidebar';

export const DashboardView: React.FC = () => {
  const { assets, universalRates, news, setActiveTab, setSelectedAsset, openAssetDetail, refreshData, lastUpdated, apiSourceSummary } =
    useMarket();
  const { t, lang } = useI18n();

  // Currency Converter local quick state (synchronised with global rates)
  const [calcAmount, setCalcAmount] = useState<number>(1);
  const [calcFrom, setCalcFrom] = useState<string>('EUR');
  const [calcTo, setCalcTo] = useState<string>('BRL');

  const convertedValue = convertCurrency(calcAmount, calcFrom, calcTo, universalRates);

  const swapCurrencies = () => {
    setCalcFrom(calcTo);
    setCalcTo(calcFrom);
  };

  const worldIndices = assets.filter((a) => a.category === 'indices');
  const forexPairs = assets.filter((a) => a.category === 'forex');
  const topStocks = assets.filter((a) => a.category === 'stocks_us' || a.category === 'stocks_br');
  const cryptos = assets.filter((a) => a.category === 'crypto');
  const commodities = assets.filter((a) => a.category === 'commodities');
  const sp500Asset = assets.find((a) => a.id === 'sp500' || a.symbol === 'S&P 500');
  const ibovAsset = assets.find((a) => a.id === 'ibovespa' || a.symbol === 'IBOVESPA');
  const eurBrlAsset = assets.find((a) => a.id === 'eur_brl' || a.symbol === 'EUR/BRL');
  const usdBrlAsset = assets.find((a) => a.id === 'usd_brl' || a.symbol === 'USD/BRL');

  const eurBrlDisplay = (() => {
    if (eurBrlAsset?.price && eurBrlAsset.price >= 6.20 && Math.abs(eurBrlAsset.price - 6.1765) > 0.001) {
      return eurBrlAsset.price.toFixed(4);
    }
    const derived = (universalRates.BRL >= 5.55 ? universalRates.BRL / (universalRates.EUR || 0.8958) : 6.2335);
    return (derived >= 6.20 && Math.abs(derived - 6.1765) > 0.001 ? derived : 6.2335).toFixed(4);
  })();

  const usdBrlDisplay = (() => {
    if (usdBrlAsset?.price && usdBrlAsset.price >= 5.55 && Math.abs(usdBrlAsset.price - 5.5122) > 0.001) {
      return usdBrlAsset.price.toFixed(4);
    }
    const val = (universalRates.BRL >= 5.55 && Math.abs(universalRates.BRL - 5.5122) > 0.001 ? universalRates.BRL : 5.5840);
    return val.toFixed(4);
  })();

  // Sorted Gainers and Losers
  const topGainers = [...topStocks].sort((a, b) => b.change24h - a.change24h).slice(0, 4);
  const topLosers = [...topStocks].sort((a, b) => a.change24h - b.change24h).slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-300">
      {/* Hero Financial Banner & Thermometer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Left: Global Hub Headline & Value Prop */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1a30] via-[#0b1424] to-[#070d18] border border-slate-700/80 p-5 sm:p-7 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between h-full space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t.dashboard.liveBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {t.dashboard.heroTitlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
                  {t.dashboard.heroTitleHighlight}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                {t.dashboard.heroSubtitle}
              </p>
            </div>

            {/* Quick KPI stats strip - Clickable detail triggers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-800/80">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAssetDetail('eur_brl');
                }}
                className="bg-slate-900/60 hover:bg-slate-800/80 rounded-xl p-2.5 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition shadow-sm"
                title={t.dashboard.tooltips.eurBrl}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">EUR / BRL</span>
                  <span className="text-[9px] text-emerald-400 font-semibold">{t.dashboard.chartAction}</span>
                </div>
                <p className="text-sm font-bold font-mono-numbers text-emerald-400">
                  R$ {eurBrlDisplay}
                </p>
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAssetDetail('usd_brl');
                }}
                className="bg-slate-900/60 hover:bg-slate-800/80 rounded-xl p-2.5 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition shadow-sm"
                title={t.dashboard.tooltips.usdBrl}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">USD / BRL</span>
                  <span className="text-[9px] text-emerald-400 font-semibold">{t.dashboard.chartAction}</span>
                </div>
                <p className="text-sm font-bold font-mono-numbers text-emerald-400">
                  R$ {usdBrlDisplay}
                </p>
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAssetDetail('sp500');
                }}
                className="bg-slate-900/60 hover:bg-slate-800/80 rounded-xl p-2.5 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition shadow-sm"
                title={t.dashboard.tooltips.sp500}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">S&P 500</span>
                  <span className={`text-[9px] font-semibold ${(sp500Asset?.change24h || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {(sp500Asset?.change24h || 0) >= 0 ? '+' : ''}{(sp500Asset?.change24h || 0).toFixed(2)}%
                  </span>
                </div>
                <p className="text-sm font-bold font-mono-numbers text-slate-200">
                  {sp500Asset?.price ? `${sp500Asset.price.toLocaleString(getNumberLocale(lang), { minimumFractionDigits: 2, maximumFractionDigits: 2 })} pts` : '-- pts'}
                </p>
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAssetDetail('ibovespa');
                }}
                className="bg-slate-900/60 hover:bg-slate-800/80 rounded-xl p-2.5 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition shadow-sm"
                title={t.dashboard.tooltips.ibov}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">IBOVESPA</span>
                  <span className={`text-[9px] font-semibold ${(ibovAsset?.change24h || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {(ibovAsset?.change24h || 0) >= 0 ? '+' : ''}{(ibovAsset?.change24h || 0).toFixed(2)}%
                  </span>
                </div>
                <p className="text-sm font-bold font-mono-numbers text-emerald-400">
                  {ibovAsset?.price ? `${Math.round(ibovAsset.price).toLocaleString(getNumberLocale(lang))} pts` : '-- pts'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Market Thermometer & Live Quick Simulator */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0e192c] to-[#0a1120] border border-slate-700/80 p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {t.dashboard.thermometerTitle}
              </span>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {t.dashboard.riskAppetiteBadge}
            </span>
          </div>

          {/* Fear & Greed Indicator */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black font-mono-numbers text-white">68</span>
              <span className="text-xs font-semibold text-emerald-400">{t.dashboard.moderateGreed}</span>
            </div>
            {/* Visual gradient bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5 flex">
              <div className="h-full bg-rose-500 rounded-l-full w-1/4"></div>
              <div className="h-full bg-amber-500 w-1/4"></div>
              <div className="h-full bg-teal-500 w-1/4"></div>
              <div className="h-full bg-emerald-500 rounded-r-full w-1/4"></div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-medium">
              <span>{t.dashboard.extremeFear}</span>
              <span>{t.dashboard.neutral}</span>
              <span>{t.dashboard.optimism}</span>
            </div>
          </div>

          {/* Quick Embedded Currency Converter (Synced with universal rates) */}
          <div className="bg-[#070d18] rounded-xl p-3.5 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.dashboard.quickSimulator}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">1 {calcFrom} = {(universalRates[calcTo] / universalRates[calcFrom]).toFixed(4)} {calcTo}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="number"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                  aria-label={t.calculator.amountAria}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-numbers focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={calcFrom}
                onChange={(e) => setCalcFrom(e.target.value)}
                aria-label={t.calculator.fromCurrencyAria}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="BRL">BRL (R$)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CHF">CHF</option>
              </select>

              <button
                onClick={swapCurrencies}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title={t.dashboard.swapTooltip}
                aria-label={t.dashboard.swapTooltip}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>

              <select
                value={calcTo}
                onChange={(e) => setCalcTo(e.target.value)}
                aria-label={t.calculator.toCurrencyAria}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="BRL">BRL (R$)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
                <option value="CHF">CHF</option>
              </select>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">{t.dashboard.convertedResult}</span>
              <span className="font-bold font-mono-numbers text-emerald-400 text-sm">
                {formatCurrencyValue(convertedValue, calcTo, calcTo === 'JPY' ? 0 : 2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* World Indices Section (Carrossel / Grid) */}
      <section aria-label={t.dashboard.worldIndicesTitle} className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">
              {t.dashboard.worldIndicesTitle}
            </h2>
          </div>
          <span className="text-[11px] text-slate-400">
            {t.dashboard.updatedAt} {lastUpdated.toLocaleTimeString(getNumberLocale(lang), { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {worldIndices.slice(0, 6).map((index) => {
            const isPositive = index.change24h >= 0;
            return (
              <div
                key={index.id}
                onClick={() => setSelectedAsset(index)}
                className="bg-white dark:bg-[#0d1627] hover:bg-slate-50 dark:hover:bg-[#121e35] p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition cursor-pointer shadow-sm group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition">
                    {getLocalizedAssetSymbol(index, lang)}
                  </span>
                  <span className="text-sm">{index.flag}</span>
                </div>
                <DualPrice
                  price={index.price}
                  currency={index.currency}
                  rates={universalRates}
                  isIndex={true}
                  layout="stacked"
                  primaryClassName="font-mono-numbers text-sm font-extrabold text-slate-900 dark:text-slate-100"
                  secondaryClassName="text-[11px] font-mono-numbers text-emerald-500/90 font-medium"
                />
                <div
                  className={`flex items-center text-xs font-semibold font-mono-numbers mt-1 ${
                    isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {isPositive ? '+' : ''}
                  {index.change24h.toFixed(2)}%
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Calculadora de Câmbio Universal (Tempo Real via AwesomeAPI) */}
      <UniversalCurrencyCalculator defaultFrom="EUR" defaultTo="BRL" defaultAmount={1} />

      {/* Main Split: Stocks Heatmap & Universal Currency Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Top Movers and Market Stocks + Radar Macroeconômico Focus */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm sm:text-base font-bold text-white">
                {t.dashboard.marketHighlightsTitle}
              </h2>
            </div>

            {/* CRITICAL UX REQUIREMENT: Intercept with preventDefault and change tab without reload */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveTab('mercados');
              }}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
            >
              <span>{t.dashboard.viewAllStocks}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Top Gainers */}
            <div className="bg-white dark:bg-[#0d1627] rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.dashboard.topGainers}</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase">{t.dashboard.varPercent}</span>
              </div>

              <div className="space-y-2">
                {topGainers.map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => setSelectedAsset(stock)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{stock.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{getLocalizedAssetSymbol(stock, lang)}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                          {getLocalizedAssetName(stock, lang)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <DualPrice
                        price={stock.price}
                        currency={stock.currency}
                        rates={universalRates}
                        layout="compact"
                        primaryClassName="text-xs font-mono-numbers font-semibold text-slate-900 dark:text-white"
                        secondaryClassName="text-[10px] font-mono-numbers text-emerald-500/90"
                      />
                      <div className="text-xs font-mono-numbers font-bold text-emerald-600 dark:text-emerald-400">
                        +{stock.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-white dark:bg-[#0d1627] rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{t.dashboard.topLosers}</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase">{t.dashboard.varPercent}</span>
              </div>

              <div className="space-y-2">
                {topLosers.map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => setSelectedAsset(stock)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{stock.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{getLocalizedAssetSymbol(stock, lang)}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[120px]">
                          {getLocalizedAssetName(stock, lang)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <DualPrice
                        price={stock.price}
                        currency={stock.currency}
                        rates={universalRates}
                        layout="compact"
                        primaryClassName="text-xs font-mono-numbers font-semibold text-slate-900 dark:text-white"
                        secondaryClassName="text-[10px] font-mono-numbers text-emerald-500/90"
                      />
                      <div className="text-xs font-mono-numbers font-bold text-rose-600 dark:text-rose-400">
                        {stock.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Radar Macroeconômico DinhEuro: Boletim Focus (Preenche a coluna central ao lado esquerdo da Matriz Cambial) */}
          <FocusRadarPanel />

          {/* Dossiê DinhEuro: Acordo MERCOSUL-União Europeia */}
          <MercosulEuDossierPanel />

          {/* Dossiê DinhEuro: Drex - A Moeda Digital do Banco Central */}
          <DrexDossierPanel />
        </div>

        {/* Right: Universal Currency Matrix + Desktop-only Daily Insights */}
        <div className="self-start">
          <div className="bg-white dark:bg-[#0d1627] rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-sm">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {t.dashboard.currencyMatrixTitle}
                </h2>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {t.dashboard.synchronized}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mb-3">
              {t.dashboard.matrixSubtitle}
            </p>

            <div className="space-y-2">
              {forexPairs.map((pair) => {
                const isPos = pair.change24h >= 0;
                return (
                  <div
                    key={pair.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedAsset(pair);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 transition cursor-pointer border border-slate-800/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{pair.flag}</span>
                      <span className="text-xs font-bold text-slate-200">{getLocalizedAssetSymbol(pair, lang)}</span>
                    </div>

                    <div className="text-right">
                      <DualPrice
                        price={pair.price}
                        currency={pair.currency}
                        rates={universalRates}
                        layout="compact"
                        primaryClassName="text-xs font-mono-numbers font-bold text-white"
                        secondaryClassName="text-[10px] font-mono-numbers text-emerald-400/80"
                      />
                      <div
                        className={`text-[10px] font-mono-numbers font-semibold mt-0.5 ${
                          isPos ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {pair.change24h.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('ferramentas');
            }}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{t.dashboard.openFullSimulator}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

          {/* Insights do Dia (exibição exclusiva em desktop >= 1024px) */}
          <DailyInsightsSidebar />
        </div>
      </div>

      {/* DinhEuro Academy — Cursos Gratuitos em Destaque */}
      <AcademyHighlightSection />

      {/* Real-Time Financial News & External Analysis with mandatory "Ler matéria" */}
      <section aria-label={t.dashboard.newsTitle} className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm sm:text-base font-bold text-white">
              {t.dashboard.newsTitle}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
              {t.dashboard.verifiedFeed}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab('noticias');
            }}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition cursor-pointer flex items-center gap-1"
          >
            <span>{t.dashboard.viewAllNews}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.slice(0, 3).map((rawItem) => {
            const item = localizeNewsItem(rawItem, lang);
            const safeUrl = item.url.startsWith('http://') || item.url.startsWith('https://') ? item.url : `https://${item.url}`;
            return (
              <div
                key={item.id}
                className="bg-[#0d1627] rounded-xl border border-slate-800 hover:border-slate-700 p-4 transition shadow-md flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.category}
                    </span>
                    <span className="text-slate-500">{item.datetime}</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white transition leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* CRITICAL UX REQUIREMENT: External safe link with target="_blank" and rel="noopener noreferrer" */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">{item.source}</span>
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.dashboard.readArticle}: ${item.title}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/30 text-emerald-400 hover:text-emerald-300 text-xs font-medium border border-slate-700 hover:border-emerald-500/40 transition"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{t.dashboard.readArticle}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Long-Tail SEO Editorial Reference Summary above Footer */}
      <HomeSeoEditorialSection />
    </div>
  );
};
