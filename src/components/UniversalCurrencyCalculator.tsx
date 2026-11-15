import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  Calculator,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import {
  AwesomeQuoteMode,
  AwesomeQuotesMap,
  DINHEURO_CALCULATOR_CURRENCIES,
  buildFallbackAwesomeQuotes,
  convertUsingAwesomeQuotes,
  fetchAwesomeApiQuotes,
  formatConvertedAmount,
  formatUnitRate,
} from '../utils/awesomeCalculator';

interface UniversalCurrencyCalculatorProps {
  showRemittanceFeesDefault?: boolean;
  defaultFrom?: string;
  defaultTo?: string;
  defaultAmount?: number;
}

const AMOUNT_PRESETS = [100, 500, 1000, 5000, 10000];
const AUTO_REFRESH_INTERVAL_MS = 45000;

export const UniversalCurrencyCalculator: React.FC<UniversalCurrencyCalculatorProps> = ({
  showRemittanceFeesDefault = false,
  defaultFrom = 'EUR',
  defaultTo = 'BRL',
  defaultAmount = 1,
}) => {
  const { universalRates } = useMarket();
  const { t, lang } = useI18n();
  const numberLocale = getNumberLocale(lang);

  const [amountInput, setAmountInput] = useState<string>(String(defaultAmount));
  const [fromCurrency, setFromCurrency] = useState<string>(defaultFrom);
  const [toCurrency, setToCurrency] = useState<string>(defaultTo);
  const [quoteMode, setQuoteMode] = useState<AwesomeQuoteMode>('bid');

  const [quotes, setQuotes] = useState<AwesomeQuotesMap>(() =>
    buildFallbackAwesomeQuotes(universalRates)
  );
  const [dataSource, setDataSource] = useState<'awesomeapi' | 'fallback'>('fallback');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastSyncDate, setLastSyncDate] = useState<Date | null>(null);
  const [apiTimestamp, setApiTimestamp] = useState<string | undefined>(undefined);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Remittance fees simulator (optional accordion)
  const [showFees, setShowFees] = useState<boolean>(showRemittanceFeesDefault);
  const [spreadPercent, setSpreadPercent] = useState<number>(1.1);
  const [iofPercent, setIofPercent] = useState<number>(1.1);

  const universalRatesRef = React.useRef(universalRates);
  universalRatesRef.current = universalRates;
  const hasSyncedOnceRef = React.useRef(false);

  const syncFromAwesomeApi = useCallback(async (manual = false) => {
    if (manual) {
      setIsRefreshing(true);
    } else if (!hasSyncedOnceRef.current) {
      setIsLoading(true);
    }

    const result = await fetchAwesomeApiQuotes(universalRatesRef.current);
    hasSyncedOnceRef.current = true;
    setQuotes(result.quotes);
    setDataSource(result.source);
    setLastSyncDate(result.fetchedAt);
    setApiTimestamp(result.apiTimestamp);
    setSyncError(
      result.source === 'fallback' ? result.errorMessage || '__CACHED__' : null
    );

    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => {
    syncFromAwesomeApi(false);
    const interval = setInterval(() => {
      syncFromAwesomeApi(false);
    }, AUTO_REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [syncFromAwesomeApi]);

  // Keeps fallback synchronized if universalRates updates while offline
  useEffect(() => {
    if (dataSource === 'fallback') {
      setQuotes(buildFallbackAwesomeQuotes(universalRates));
    }
  }, [universalRates, dataSource]);

  const numericAmount = useMemo(() => {
    const normalized = amountInput.replace(',', '.');
    const parsed = parseFloat(normalized);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
  }, [amountInput]);

  const conversion = useMemo(
    () => convertUsingAwesomeQuotes(numericAmount, fromCurrency, toCurrency, quotes, quoteMode),
    [numericAmount, fromCurrency, toCurrency, quotes, quoteMode]
  );

  const fromMeta = useMemo(
    () => DINHEURO_CALCULATOR_CURRENCIES.find((c) => c.code === fromCurrency) || DINHEURO_CALCULATOR_CURRENCIES[1],
    [fromCurrency]
  );

  const toMeta = useMemo(
    () => DINHEURO_CALCULATOR_CURRENCIES.find((c) => c.code === toCurrency) || DINHEURO_CALCULATOR_CURRENCIES[0],
    [toCurrency]
  );

  const fromQuote = quotes[fromCurrency];
  const toQuote = quotes[toCurrency];

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const feeRatio = Math.max(0, (spreadPercent + iofPercent) / 100);
  const spreadAmount = conversion.convertedAmount * (Math.max(0, spreadPercent) / 100);
  const iofAmount = conversion.convertedAmount * (Math.max(0, iofPercent) / 100);
  const netConvertedAmount = Math.max(0, conversion.convertedAmount * (1 - feeRatio));

  const matrixCurrencies = useMemo(() => {
    return DINHEURO_CALCULATOR_CURRENCIES.filter((c) => c.code !== fromCurrency);
  }, [fromCurrency]);

  const activePairForRange = toCurrency === 'BRL' && fromCurrency !== 'BRL'
    ? fromQuote
    : fromCurrency === 'BRL' && toCurrency !== 'BRL'
    ? toQuote
    : toQuote;

  return (
    <section
      aria-labelledby="universal-currency-calculator-title"
      className="rounded-2xl bg-[#0d1627] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5"
    >
      {/* Top Header & Real-Time Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400 shrink-0" />
            <h2
              id="universal-currency-calculator-title"
              className="text-base sm:text-lg font-bold text-white tracking-tight"
            >
              {t.calculator.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
            <span>
              {t.calculator.sourceLabel ? `${t.calculator.sourceLabel} ` : ''}
              <strong className={dataSource === 'awesomeapi' ? 'text-emerald-400' : 'text-amber-400'}>
                {dataSource === 'awesomeapi' ? t.calculator.sourceLive : t.calculator.sourceFallback}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>{DINHEURO_CALCULATOR_CURRENCIES.length} {t.calculator.currenciesListed}</span>
            {lastSyncDate && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-numbers">
                  {t.calculator.updatedAt}{' '}
                  {lastSyncDate.toLocaleTimeString(numberLocale, {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </>
            )}
            {apiTimestamp && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-numbers text-slate-500">{t.calculator.marketRef} {apiTimestamp}</span>
              </>
            )}
          </div>
        </div>

        {/* Mode Toggle (Compra/Bid vs Venda/Ask) + Manual Refresh */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div
            role="group"
            aria-label={t.calculator.quoteModeAria}
            className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800"
          >
            <button
              type="button"
              onClick={() => setQuoteMode('bid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                quoteMode === 'bid'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {t.calculator.bidMode}
            </button>
            <button
              type="button"
              onClick={() => setQuoteMode('ask')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                quoteMode === 'ask'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {t.calculator.askMode}
            </button>
          </div>

          <button
            type="button"
            onClick={() => syncFromAwesomeApi(true)}
            disabled={isRefreshing}
            className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/40 text-xs font-semibold text-slate-200 transition cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            title={t.calculator.refresh}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? t.calculator.syncing : t.calculator.refresh}</span>
          </button>
        </div>
      </div>

      {/* Fallback Warning (when AwesomeAPI times out or returns HTTP error) */}
      {syncError && (
        <div
          role="status"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              {t.calculator.fallbackNotice} ({syncError === '__CACHED__' ? t.calculator.cachedRatesBadge : syncError})
            </span>
          </div>
          <button
            type="button"
            onClick={() => syncFromAwesomeApi(true)}
            className="text-xs font-semibold underline hover:text-amber-200 cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            {t.calculator.retry}
          </button>
        </div>
      )}

      {/* Main Conversion Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Source Input Column */}
        <div className="lg:col-span-5 bg-[#070d18] rounded-xl border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="universal-calc-amount" className="text-xs font-medium text-slate-400">
              {t.calculator.sourceAmount}
            </label>
            <span className="text-xs font-mono-numbers text-slate-400">
              {fromMeta.flag} {t.calculator.currencyNames[fromMeta.code] || fromMeta.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono-numbers font-bold text-slate-400 pointer-events-none">
                {fromMeta.symbol}
              </span>
              <input
                id="universal-calc-amount"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                className="w-full min-h-[44px] bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl pl-11 pr-3 py-2 text-lg font-bold font-mono-numbers text-white focus:outline-none transition"
                aria-label={t.calculator.amountAria}
              />
            </div>

            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              aria-label={t.calculator.fromCurrencyAria}
              className="min-h-[44px] bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none cursor-pointer shrink-0"
            >
              {DINHEURO_CALCULATOR_CURRENCIES.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.flag} {cur.code} — {t.calculator.currencyNames[cur.code] || cur.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Amount Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {AMOUNT_PRESETS.map((preset) => {
              const isSelected = numericAmount === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmountInput(String(preset))}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-numbers font-semibold transition cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {preset.toLocaleString(numberLocale)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center Swap Button */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <button
            type="button"
            onClick={handleSwap}
            aria-label={t.calculator.swapAria}
            title={t.calculator.swapTitle}
            className="w-full lg:w-auto min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 transition cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span className="lg:hidden">{t.calculator.swapButton} {fromCurrency} ↔ {toCurrency}</span>
          </button>
        </div>

        {/* Target Result Column */}
        <div className="lg:col-span-5 bg-[#070d18] rounded-xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium text-slate-400">{t.calculator.convertedAmount} ({quoteMode === 'bid' ? t.calculator.buyLabel : t.calculator.sellLabel})</span>
            <span className="text-xs font-mono-numbers text-slate-400">
              {toMeta.flag} {t.calculator.currencyNames[toMeta.code] || toMeta.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex-1 min-w-0 min-h-[44px] bg-slate-900/70 border border-slate-800 rounded-xl px-3.5 py-2 flex items-center justify-between"
              aria-live="polite"
            >
              {isLoading ? (
                <div className="h-5 w-32 bg-slate-800 rounded animate-pulse" />
              ) : (
                <span className="text-lg sm:text-xl font-black font-mono-numbers text-emerald-400 truncate">
                  {formatConvertedAmount(conversion.convertedAmount, toCurrency, numberLocale)}
                </span>
              )}
            </div>

            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              aria-label={t.calculator.toCurrencyAria}
              className="min-h-[44px] bg-slate-900 border border-slate-700 focus:border-emerald-500 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none cursor-pointer shrink-0"
            >
              {DINHEURO_CALCULATOR_CURRENCIES.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.flag} {cur.code} — {t.calculator.currencyNames[cur.code] || cur.name}
                </option>
              ))}
            </select>
          </div>

          {/* Direct & Inverse Unit Parity */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-numbers text-slate-400 pt-1">
            <span>
              1 {fromCurrency} ={' '}
              <strong className="text-slate-200">
                {formatUnitRate(conversion.directRate, toCurrency, numberLocale)} {toCurrency}
              </strong>
            </span>
            <span>
              1 {toCurrency} ={' '}
              <strong className="text-slate-200">
                {formatUnitRate(conversion.inverseRate, fromCurrency, numberLocale)} {fromCurrency}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Market Stats Strip (High / Low / 24h Variation / BRL Reference) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="bg-[#070d18] rounded-xl border border-slate-800/90 px-3.5 py-2.5">
          <span className="text-[11px] text-slate-400 block">{t.calculator.brlEquivalent}</span>
          <span className="text-sm font-bold font-mono-numbers text-white">
            {formatConvertedAmount(conversion.amountInBrl, 'BRL', numberLocale)}
          </span>
        </div>

        <div className="bg-[#070d18] rounded-xl border border-slate-800/90 px-3.5 py-2.5">
          <span className="text-[11px] text-slate-400 block">
            {activePairForRange ? `${t.calculator.dayHigh} (${activePairForRange.code}/BRL)` : t.calculator.baseParity}
          </span>
          <span className="text-sm font-bold font-mono-numbers text-slate-200">
            {activePairForRange && activePairForRange.code !== 'BRL'
              ? formatConvertedAmount(activePairForRange.highBrl, 'BRL', numberLocale)
              : formatConvertedAmount(1, 'BRL', numberLocale)}
          </span>
        </div>

        <div className="bg-[#070d18] rounded-xl border border-slate-800/90 px-3.5 py-2.5">
          <span className="text-[11px] text-slate-400 block">
            {activePairForRange ? `${t.calculator.dayLow} (${activePairForRange.code}/BRL)` : t.calculator.activeMode}
          </span>
          <span className="text-sm font-bold font-mono-numbers text-slate-200">
            {activePairForRange && activePairForRange.code !== 'BRL'
              ? formatConvertedAmount(activePairForRange.lowBrl, 'BRL', numberLocale)
              : quoteMode === 'bid'
              ? t.calculator.buyLabel
              : t.calculator.sellLabel}
          </span>
        </div>

        <div className="bg-[#070d18] rounded-xl border border-slate-800/90 px-3.5 py-2.5">
          <span className="text-[11px] text-slate-400 block">
            {activePairForRange && activePairForRange.code !== 'BRL'
              ? `${t.calculator.change24h} (${activePairForRange.code})`
              : t.calculator.change24h}
          </span>
          {activePairForRange && activePairForRange.code !== 'BRL' ? (
            <span
              className={`inline-flex items-center gap-1 text-sm font-bold font-mono-numbers ${
                activePairForRange.pctChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {activePairForRange.pctChange >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {activePairForRange.pctChange >= 0 ? '+' : ''}
              {activePairForRange.pctChange.toFixed(2)}%
            </span>
          ) : (
            <span className="text-sm font-bold font-mono-numbers text-slate-400">
              {(0).toLocaleString(numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
            </span>
          )}
        </div>
      </div>

      {/* Optional Remittance Costs Breakdown (IOF + Spread) */}
      <div className="border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={() => setShowFees((prev) => !prev)}
          aria-expanded={showFees}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition cursor-pointer"
        >
          {showFees ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          <span>{t.calculator.toggleRemittanceFees}</span>
        </button>

        {showFees && (
          <div className="mt-3 bg-[#070d18] rounded-xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label htmlFor="calc-spread" className="text-slate-400 block mb-1">
                  {t.calculator.brokerSpread}
                </label>
                <input
                  id="calc-spread"
                  type="number"
                  min="0"
                  step="0.1"
                  value={spreadPercent}
                  onChange={(e) => setSpreadPercent(Math.max(0, Number(e.target.value)))}
                  className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono-numbers text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="calc-iof" className="text-slate-400 block mb-1">
                  {t.calculator.iofLabel}
                </label>
                <input
                  id="calc-iof"
                  type="number"
                  min="0"
                  step="0.01"
                  value={iofPercent}
                  onChange={(e) => setIofPercent(Math.max(0, Number(e.target.value)))}
                  className="w-full min-h-[40px] bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono-numbers text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex sm:block justify-between">
                <span className="text-slate-400 block">Spread ({spreadPercent}%):</span>
                <span className="font-mono-numbers font-semibold text-rose-400">
                  -{formatConvertedAmount(spreadAmount, toCurrency, numberLocale)}
                </span>
              </div>
              <div className="flex sm:block justify-between">
                <span className="text-slate-400 block">IOF ({iofPercent}%):</span>
                <span className="font-mono-numbers font-semibold text-rose-400">
                  -{formatConvertedAmount(iofAmount, toCurrency, numberLocale)}
                </span>
              </div>
              <div className="flex sm:block justify-between sm:text-right">
                <span className="text-slate-300 font-semibold block">{t.calculator.netEffectiveTotal}</span>
                <span className="font-mono-numbers font-bold text-sm text-emerald-400">
                  {formatConvertedAmount(netConvertedAmount, toCurrency, numberLocale)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Multi-Currency Simultaneous Conversion Matrix */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3 className="text-xs font-bold text-slate-200">
            {t.calculator.matrixTitle}
          </h3>
          <span className="text-[11px] text-slate-400">
            {t.calculator.matrixHint}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {matrixCurrencies.map((target) => {
            const targetConv = convertUsingAwesomeQuotes(
              numericAmount,
              fromCurrency,
              target.code,
              quotes,
              quoteMode
            );
            const q = quotes[target.code];
            const isSelected = target.code === toCurrency;
            const pct = q?.pctChange ?? 0;

            return (
              <button
                key={target.code}
                type="button"
                onClick={() => setToCurrency(target.code)}
                className={`text-left rounded-xl p-3 border transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/50'
                    : 'bg-[#070d18] border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{target.flag}</span>
                    <span>{target.code}</span>
                  </span>
                  {target.code !== 'BRL' && q && (
                    <span
                      className={`text-[10px] font-mono-numbers font-semibold ${
                        pct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {pct >= 0 ? '+' : ''}
                      {pct.toFixed(2)}%
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm font-bold font-mono-numbers text-emerald-400 truncate">
                  {formatConvertedAmount(targetConv.convertedAmount, target.code, numberLocale)}
                </div>

                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {t.calculator.currencyNames[target.code] || target.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
