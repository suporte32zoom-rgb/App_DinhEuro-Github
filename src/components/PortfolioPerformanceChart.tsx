import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  LineChart as LineChartIcon,
  TrendingUp,
  TrendingDown,
  Calendar,
  PlusCircle,
  Award,
  Activity,
} from 'lucide-react';
import type { UniversalRates } from '../services/marketData';
import { formatCurrencyValue } from '../utils/finance';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { useMarket } from '../context/MarketContext';
import {
  PortfolioTimeframe,
  PositionMetricInput,
  HistoricalPricePoint,
  fetchPositionHistoricalSeries,
  buildPortfolioPerformanceData,
} from '../utils/portfolioPerformance';

interface PortfolioPerformanceChartProps {
  positions: PositionMetricInput[];
  universalRates: UniversalRates;
  onAddAsset: () => void;
}

const TIMEFRAMES: PortfolioTimeframe[] = ['7D', '1M', '3M', '6M', '1A'];
const DISPLAY_CURRENCIES: Array<'BRL' | 'EUR' | 'USD'> = ['BRL', 'EUR', 'USD'];

export const PortfolioPerformanceChart: React.FC<PortfolioPerformanceChartProps> = ({
  positions,
  universalRates,
  onAddAsset,
}) => {
  const { lang } = useI18n();
  const { theme } = useMarket();
  const isLight = theme === 'light';
  const gridStroke = isLight ? '#E2E8F0' : '#1e293b';
  const axisStroke = isLight ? '#475569' : '#64748b';
  const refLineStroke = isLight ? '#94A3B8' : '#475569';
  const activeDotStroke = isLight ? '#FFFFFF' : '#070e1b';
  const emeraldLineColor = isLight ? '#009B77' : '#10B981';
  const locale = getNumberLocale(lang);
  const tPort = VIEWS_TRANSLATIONS[lang].portfolio;

  const [timeframe, setTimeframe] = useState<PortfolioTimeframe>('1M');
  const [displayCurrency, setDisplayCurrency] = useState<'BRL' | 'EUR' | 'USD'>('BRL');
  const [equityMode, setEquityMode] = useState<'value' | 'return'>('value');
  const [hiddenSymbols, setHiddenSymbols] = useState<Record<string, boolean>>({});
  const [historicalBySymbol, setHistoricalBySymbol] = useState<
    Record<string, HistoricalPricePoint[]>
  >({});
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);

  const requestSeqRef = useRef<number>(0);

  // Deduplicated position signature for fetching historical series
  const symbolSignature = positions
    .map((p) => `${p.symbol}:${p.assetType}`)
    .sort()
    .join('|');

  useEffect(() => {
    if (positions.length === 0) {
      setHistoricalBySymbol({});
      setIsLoadingHistory(false);
      return;
    }

    const reqId = ++requestSeqRef.current;
    setIsLoadingHistory(true);

    const uniqueTargets = new Map<string, PositionMetricInput['assetType']>();
    for (const pos of positions) {
      if (!uniqueTargets.has(pos.symbol)) {
        uniqueTargets.set(pos.symbol, pos.assetType);
      }
    }

    Promise.allSettled(
      Array.from(uniqueTargets.entries()).map(async ([symbol, assetType]) => {
        const series = await fetchPositionHistoricalSeries(symbol, assetType, timeframe);
        return { symbol, series };
      })
    ).then((results) => {
      if (requestSeqRef.current !== reqId) return;
      const nextMap: Record<string, HistoricalPricePoint[]> = {};
      for (const res of results) {
        if (res.status === 'fulfilled' && res.value.series.length >= 2) {
          nextMap[res.value.symbol] = res.value.series;
        }
      }
      setHistoricalBySymbol(nextMap);
      setIsLoadingHistory(false);
    });
  }, [symbolSignature, timeframe]);

  const perf = useMemo(
    () =>
      buildPortfolioPerformanceData({
        positions,
        historicalBySymbol,
        timeframe,
        displayCurrency,
        universalRates,
        locale,
      }),
    [positions, historicalBySymbol, timeframe, displayCurrency, universalRates, locale]
  );

  const { equitySeries, assetReturnSeries, assetSeriesMeta, summary } = perf;
  const isPeriodPositive = summary.periodReturnPct >= 0;
  const positiveHex = isLight ? '#009B77' : '#10B981';
  const negativeHex = isLight ? '#DC2626' : '#F43F5E';
  const mainLineColor =
    equityMode === 'value'
      ? summary.endValue >= summary.costBasis
        ? positiveHex
        : negativeHex
      : isPeriodPositive
      ? positiveHex
      : negativeHex;

  const formatCompactAxisCurrency = (val: number) => {
    const sym = displayCurrency === 'BRL' ? 'R$' : displayCurrency === 'EUR' ? '€' : '$';
    const abs = Math.abs(val);
    if (abs >= 1_000_000) return `${sym}${(val / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `${sym}${(val / 1_000).toFixed(0)}k`;
    return `${sym}${val.toFixed(0)}`;
  };

  const toggleAssetVisibility = (symbol: string) => {
    setHiddenSymbols((prev) => ({
      ...prev,
      [symbol]: !prev[symbol],
    }));
  };

  const EquityTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const row = payload[0]?.payload;
    if (!row) return null;

    return (
      <div className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[215px]">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-1.5">
          <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
            {row.fullDate}
          </span>
          <span className="text-[10px] font-mono text-[#475569] dark:text-slate-400">{timeframe}</span>
        </div>
        <div className="space-y-1 font-mono-numbers">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#475569] dark:text-slate-300 text-[11px]">{tPort.perfSeriesPortfolio}:</span>
            <span className="font-bold text-[#0F172A] dark:text-white text-[11px]">
              {formatCurrencyValue(row.portfolioValue, displayCurrency, 2, locale)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[#475569] dark:text-slate-400 text-[11px]">{tPort.perfSeriesCostBasis}:</span>
            <span className="font-semibold text-[#1E293B] dark:text-slate-300 text-[11px]">
              {formatCurrencyValue(row.costBasis, displayCurrency, 2, locale)}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#E2E8F0] dark:border-slate-800/70">
            <span className="text-[#475569] dark:text-slate-400 text-[11px]">{tPort.perfModeReturn}:</span>
            <span
              className={`font-bold text-[11px] ${
                row.returnPct >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
              }`}
            >
              {row.returnPct >= 0 ? '+' : ''}
              {row.returnPct.toLocaleString(locale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </span>
          </div>
        </div>
      </div>
    );
  };

  const AssetComparisonTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const row = payload[0]?.payload;
    if (!row) return null;

    return (
      <div className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[215px]">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-1.5">
          <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#003399] dark:text-cyan-400" />
            {row.fullDate}
          </span>
          <span className="text-[10px] font-mono text-[#475569] dark:text-slate-400">{timeframe}</span>
        </div>
        <div className="space-y-1 font-mono-numbers">
          {payload.map((entry: any) => {
            const val = Number(entry.value ?? 0);
            return (
              <div key={entry.dataKey} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-[#475569] dark:text-slate-300 text-[11px]">{entry.name}:</span>
                </div>
                <span
                  className={`font-bold text-[11px] ${
                    val >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
                  }`}
                >
                  {val >= 0 ? '+' : ''}
                  {val.toLocaleString(locale, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-xl space-y-4">
      {/* Section Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-slate-800/80 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <LineChartIcon className="w-4 h-4 text-[#003399] dark:text-emerald-400" />
            <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white tracking-tight">
              {tPort.perfSectionTitle}
            </h2>
            {positions.length > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/30 dark:border-emerald-500/20 text-[10px] font-semibold text-[#006B52] dark:text-emerald-400">
                {tPort.perfSyncedBadge}
              </span>
            )}
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400">{tPort.perfSectionSubtitle}</p>
        </div>

        {/* Timeframe & Currency Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Currency selector */}
          <div className="flex items-center bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-1">
            {DISPLAY_CURRENCIES.map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setDisplayCurrency(cur)}
                data-on-dark={displayCurrency === cur ? 'true' : undefined}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition cursor-pointer ${
                  displayCurrency === cur
                    ? 'bg-[#003399] dark:bg-emerald-600 text-white shadow-sm'
                    : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          {/* Period selector */}
          <div className="flex items-center gap-1 bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-1">
            <span className="text-[10px] text-[#475569] dark:text-slate-500 px-1.5 hidden sm:inline">
              {tPort.perfPeriodLabel}
            </span>
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                data-on-dark={timeframe === tf ? 'true' : undefined}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono transition cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#003399] text-white dark:bg-slate-800 dark:text-emerald-400 border border-[#002266] dark:border-emerald-500/30'
                    : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Period Summary Strip when positions exist */}
      {positions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
              {isPeriodPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-[#DC2626] dark:text-rose-400" />
              )}
              {tPort.perfPeriodReturn} ({timeframe})
            </span>
            <span
              className={`text-xs font-black font-mono-numbers ${
                isPeriodPositive ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
              }`}
            >
              {isPeriodPositive ? '+' : ''}
              {summary.periodReturnPct.toLocaleString(locale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </span>
          </div>

          <div className="bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#003399] dark:text-cyan-400" />
              {tPort.perfPeriodHighLow}
            </span>
            <span className="text-[11px] font-bold font-mono-numbers text-[#0F172A] dark:text-slate-200">
              {formatCurrencyValue(summary.periodHigh, displayCurrency, 0, locale)} /{' '}
              {formatCurrencyValue(summary.periodLow, displayCurrency, 0, locale)}
            </span>
          </div>

          <div className="bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
            <span className="text-[11px] text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#D99B00] dark:text-amber-400" />
              {tPort.perfBestAsset}
            </span>
            <span className="text-xs font-black font-mono-numbers text-[#D99B00] dark:text-amber-400">
              {summary.bestAssetSymbol
                ? `${summary.bestAssetSymbol} (${(summary.bestAssetPct ?? 0) >= 0 ? '+' : ''}${(
                    summary.bestAssetPct ?? 0
                  ).toLocaleString(locale, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}%)`
                : '--'}
            </span>
          </div>
        </div>
      )}

      {/* Dual Recharts LineCharts Grid */}
      <div className="relative grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Chart 1: Equity Value vs Cost Basis / Return % */}
        <div className="bg-[#F8FAFC] dark:bg-[#070e1b] rounded-2xl border border-[#E2E8F0] dark:border-slate-800/90 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isLoadingHistory ? 'bg-[#E5A910] dark:bg-amber-400 animate-pulse' : 'bg-[#009B77] dark:bg-emerald-400'
                }`}
              />
              <h3 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                {tPort.perfEquityChartTitle}
              </h3>
            </div>

            <div className="flex items-center bg-[#FFFFFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-lg p-0.5 text-[10px]">
              <button
                type="button"
                onClick={() => setEquityMode('value')}
                className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer ${
                  equityMode === 'value'
                    ? 'bg-[#E6EEFF] text-[#003399] dark:bg-slate-800 dark:text-emerald-400'
                    : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                {tPort.perfModeValue}
              </button>
              <button
                type="button"
                onClick={() => setEquityMode('return')}
                className={`px-2 py-1 rounded-md font-semibold transition cursor-pointer ${
                  equityMode === 'return'
                    ? 'bg-[#E6EEFF] text-[#003399] dark:bg-slate-800 dark:text-emerald-400'
                    : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                {tPort.perfModeReturn}
              </button>
            </div>
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equitySeries} margin={{ top: 8, right: 12, left: -4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
                <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 10 }} minTickGap={18} />
                <YAxis
                  stroke={axisStroke}
                  tick={{ fontSize: 10 }}
                  width={56}
                  domain={equityMode === 'value' ? ['auto', 'auto'] : ['auto', 'auto']}
                  tickFormatter={(val: number) =>
                    equityMode === 'value'
                      ? formatCompactAxisCurrency(val)
                      : `${val >= 0 ? '+' : ''}${val.toFixed(1)}%`
                  }
                />
                <Tooltip content={<EquityTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                {equityMode === 'return' && (
                  <ReferenceLine y={0} stroke={refLineStroke} strokeDasharray="3 3" />
                )}
                {equityMode === 'value' ? (
                  <>
                    <Line
                      type="monotone"
                      dataKey="portfolioValue"
                      name={tPort.perfSeriesPortfolio}
                      stroke={mainLineColor}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, fill: mainLineColor, stroke: activeDotStroke, strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="costBasis"
                      name={tPort.perfSeriesCostBasis}
                      stroke="#64748B"
                      strokeWidth={1.75}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </>
                ) : (
                  <Line
                    type="monotone"
                    dataKey="returnPct"
                    name={tPort.perfSeriesPortfolioPct}
                    stroke={mainLineColor}
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: mainLineColor, stroke: activeDotStroke, strokeWidth: 2 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Per-Asset Comparative Return % */}
        <div className="bg-[#F8FAFC] dark:bg-[#070e1b] rounded-2xl border border-[#E2E8F0] dark:border-slate-800/90 p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#003399] dark:bg-cyan-400" />
              <h3 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                {tPort.perfAssetChartTitle}
              </h3>
            </div>

            {/* Interactive Asset Filter Chips */}
            {assetSeriesMeta.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {assetSeriesMeta.map((meta) => {
                  const isHidden = !!hiddenSymbols[meta.symbol];
                  return (
                    <button
                      key={meta.symbol}
                      type="button"
                      onClick={() => toggleAssetVisibility(meta.symbol)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition cursor-pointer ${
                        isHidden
                          ? 'bg-[#F4F7F9] dark:bg-slate-900/60 border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-500 opacity-50'
                          : 'bg-[#FFFFFF] dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-700 text-[#0F172A] dark:text-slate-200 hover:border-[#003399] dark:hover:border-slate-500'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span>{meta.symbol}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={assetReturnSeries}
                margin={{ top: 8, right: 12, left: -4, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
                <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 10 }} minTickGap={18} />
                <YAxis
                  stroke={axisStroke}
                  tick={{ fontSize: 10 }}
                  width={52}
                  tickFormatter={(val: number) => `${val >= 0 ? '+' : ''}${val.toFixed(1)}%`}
                />
                <Tooltip content={<AssetComparisonTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
                <ReferenceLine y={0} stroke={refLineStroke} strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="portfolioPct"
                  name={tPort.perfSeriesPortfolioPct}
                  stroke={emeraldLineColor}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: emeraldLineColor, stroke: activeDotStroke, strokeWidth: 2 }}
                />
                {assetSeriesMeta.map((meta) =>
                  hiddenSymbols[meta.symbol] ? null : (
                    <Line
                      key={meta.symbol}
                      type="monotone"
                      dataKey={meta.symbol}
                      name={meta.symbol}
                      stroke={meta.color}
                      strokeWidth={1.85}
                      dot={false}
                      activeDot={{ r: 4, fill: meta.color }}
                    />
                  )
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Empty Portfolio Overlay over Recharts baseline grids */}
        {positions.length === 0 && (
          <div className="absolute inset-0 rounded-2xl bg-[#F8FAFC]/85 dark:bg-[#070e1b]/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="max-w-md space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#E6EEFF] dark:bg-emerald-500/15 border border-[#6699CC]/40 dark:border-emerald-500/30 text-[#003399] dark:text-emerald-400 flex items-center justify-center mx-auto">
                <LineChartIcon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#0F172A] dark:text-white">{tPort.perfEmptyChartTitle}</h4>
              <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed">{tPort.perfEmptyChartDesc}</p>
              <button
                type="button"
                onClick={onAddAsset}
                data-on-dark="true"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-xs font-bold text-white shadow-lg transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{tPort.addFirstAsset}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
