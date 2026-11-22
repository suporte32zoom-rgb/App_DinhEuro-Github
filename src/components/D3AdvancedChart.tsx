import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import {
  TrendingUp,
  TrendingDown,
  Layers,
  Activity,
  Sliders,
  Maximize2,
  BarChart2,
  Plus,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { MarketAsset, CandlePoint } from '../services/marketData';
import { formatPointsValue } from '../utils/finance';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { getLocalizedAssetName } from '../i18n/marketDataTranslations';
import { useMarket } from '../context/MarketContext';

export type D3Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1A' | '5A';
export type D3ChartStyle = 'area' | 'line' | 'candle';

interface D3AdvancedChartProps {
  asset: MarketAsset;
  comparisonAssets?: MarketAsset[];
  initialTimeframe?: D3Timeframe;
  height?: number;
}

// Deterministic PRNG for stable, reproducible series across timeframes
function createDeterministicPRNG(seedStr: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  return function () {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateD3Series(
  symbol: string,
  timeframe: D3Timeframe,
  basePrice: number,
  locale: string = 'pt-BR'
): Array<CandlePoint & { date: Date }> {
  const prng = createDeterministicPRNG(`${symbol}_${timeframe}_d3v7_dinh`);
  let count = 30;
  let intervalMs = 60 * 60 * 1000;

  switch (timeframe) {
    case '1D':
      count = 28;
      intervalMs = 15 * 60 * 1000; // 15 mins
      break;
    case '5D':
      count = 35;
      intervalMs = 4 * 60 * 60 * 1000; // 4 hours
      break;
    case '1M':
      count = 30;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day
      break;
    case '6M':
      count = 26;
      intervalMs = 7 * 24 * 60 * 60 * 1000; // 1 week
      break;
    case 'YTD':
      count = 32;
      intervalMs = 5 * 24 * 60 * 60 * 1000;
      break;
    case '1A':
      count = 52;
      intervalMs = 7 * 24 * 60 * 60 * 1000; // 1 week
      break;
    case '5A':
      count = 60;
      intervalMs = 30 * 24 * 60 * 60 * 1000; // 1 month
      break;
  }

  const series: Array<CandlePoint & { date: Date }> = [];
  let price = basePrice * (0.92 + prng() * 0.05);
  const now = Date.now();

  for (let i = count; i >= 0; i--) {
    const timeStamp = new Date(now - i * intervalMs);
    const variance = (prng() - 0.48) * (price * 0.018);
    const open = price;
    const close = Math.max(0.01, open + variance);
    const high = Math.max(open, close) + prng() * (price * 0.007);
    const low = Math.min(open, close) - prng() * (price * 0.007);
    const volume = Math.floor(prng() * 60000 + 15000);

    const timeStr =
      timeframe === '1D'
        ? timeStamp.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
        : timeStamp.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' });

    series.push({
      date: timeStamp,
      time: timeStr,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    price = close;
  }

  // Pin final bar to current price
  if (series.length > 0) {
    const last = series[series.length - 1];
    last.close = Number(basePrice.toFixed(2));
    last.high = Math.max(last.high, last.close);
    last.low = Math.min(last.low, last.close);
  }

  return series;
}

export const D3AdvancedChart: React.FC<D3AdvancedChartProps> = ({
  asset,
  comparisonAssets = [],
  initialTimeframe = '1M',
  height = 360,
}) => {
  const { lang } = useI18n();
  const { theme } = useMarket();
  const isLight = theme === 'light';
  const locale = getNumberLocale(lang);
  const tD3 = VIEWS_TRANSLATIONS[lang].d3Chart;

  const [timeframe, setTimeframe] = useState<D3Timeframe>(initialTimeframe);
  const [chartStyle, setChartStyle] = useState<D3ChartStyle>('area');
  const [showSMA, setShowSMA] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [showBenchmark, setShowBenchmark] = useState<boolean>(false);
  const [comparedSymbol, setComparedSymbol] = useState<string>('');
  const [hoveredPoint, setHoveredPoint] = useState<(CandlePoint & { date: Date; x: number; y: number }) | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  // Measure container width responsively
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0] && entries[0].contentRect.width > 0) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    setContainerWidth(containerRef.current.clientWidth || 800);
    return () => observer.disconnect();
  }, []);

  const isIndex = asset.category === 'indices' || asset.currency === 'PTS' || asset.currency === 'PONTOS';

  // Primary Series
  const data = useMemo(() => {
    return generateD3Series(asset.symbol, timeframe, asset.price, locale);
  }, [asset.symbol, timeframe, asset.price, locale]);

  // Comparison series normalized to percentage change (Base 0%)
  const comparisonAsset = useMemo(() => {
    if (!comparedSymbol) return null;
    return comparisonAssets.find((a) => a.symbol === comparedSymbol) || null;
  }, [comparedSymbol, comparisonAssets]);

  const comparisonData = useMemo(() => {
    if (!comparisonAsset || !showBenchmark) return null;
    return generateD3Series(comparisonAsset.symbol, timeframe, comparisonAsset.price, locale);
  }, [comparisonAsset, timeframe, showBenchmark, locale]);

  // Simple Moving Averages (SMA 20 & SMA 50) using D3 data
  const sma20 = useMemo(() => {
    return data.map((d, i, arr) => {
      if (i < 4) return null;
      const slice = arr.slice(i - 4, i + 1);
      const avg = d3.mean(slice, (s) => s.close) || d.close;
      return { date: d.date, value: avg };
    });
  }, [data]);

  const sma50 = useMemo(() => {
    return data.map((d, i, arr) => {
      if (i < 9) return null;
      const slice = arr.slice(i - 9, i + 1);
      const avg = d3.mean(slice, (s) => s.close) || d.close;
      return { date: d.date, value: avg };
    });
  }, [data]);

  // High & Low of the selected timeframe
  const minPrice = useMemo(() => d3.min(data, (d) => d.low) || asset.price * 0.9, [data, asset.price]);
  const maxPrice = useMemo(() => d3.max(data, (d) => d.high) || asset.price * 1.1, [data, asset.price]);
  const maxVolume = useMemo(() => d3.max(data, (d) => d.volume) || 100000, [data]);

  const isPositiveTrend = useMemo(() => {
    if (data.length < 2) return true;
    return data[data.length - 1].close >= data[0].close;
  }, [data]);

  // D3 Scales & Dimensions
  const margin = { top: 25, right: 65, bottom: showVolume ? 60 : 30, left: 15 };
  const innerWidth = Math.max(100, containerWidth - margin.left - margin.right);
  const innerHeight = Math.max(100, height - margin.top - margin.bottom);
  const volumeHeight = 45;

  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, innerWidth]);
  }, [data, innerWidth]);

  const yScale = useMemo(() => {
    const pad = (maxPrice - minPrice) * 0.08 || 1;
    return d3
      .scaleLinear()
      .domain([minPrice - pad, maxPrice + pad])
      .range([innerHeight, 0]);
  }, [minPrice, maxPrice, innerHeight]);

  const yVolumeScale = useMemo(() => {
    return d3.scaleLinear().domain([0, maxVolume]).range([volumeHeight, 0]);
  }, [maxVolume]);

  // D3 Path Generators
  const areaGenerator = useMemo(() => {
    return d3
      .area<CandlePoint & { date: Date }>()
      .x((d) => xScale(d.date))
      .y0(innerHeight)
      .y1((d) => yScale(d.close))
      .curve(d3.curveMonotoneX);
  }, [xScale, yScale, innerHeight]);

  const lineGenerator = useMemo(() => {
    return d3
      .line<CandlePoint & { date: Date }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.close))
      .curve(d3.curveMonotoneX);
  }, [xScale, yScale]);

  const areaPath = useMemo(() => areaGenerator(data) || '', [areaGenerator, data]);
  const linePath = useMemo(() => lineGenerator(data) || '', [lineGenerator, data]);

  // SMA Paths
  const sma20Path = useMemo(() => {
    const valid = sma20.filter((d): d is { date: Date; value: number } => d !== null);
    const gen = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);
    return gen(valid) || '';
  }, [sma20, xScale, yScale]);

  const sma50Path = useMemo(() => {
    const valid = sma50.filter((d): d is { date: Date; value: number } => d !== null);
    const gen = d3
      .line<{ date: Date; value: number }>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);
    return gen(valid) || '';
  }, [sma50, xScale, yScale]);

  // Comparison Line Path (Normalized to % change on right axis)
  const comparisonLinePath = useMemo(() => {
    if (!comparisonData || comparisonData.length === 0) return '';
    const baseFirst = comparisonData[0].close || 1;
    const baseTargetFirst = data[0].close || 1;

    // Project comparison % scale onto price coordinates of primary asset
    const gen = d3
      .line<CandlePoint & { date: Date }>()
      .x((d) => xScale(d.date))
      .y((d) => {
        const pctDiff = (d.close - baseFirst) / baseFirst;
        const normalizedEquiv = baseTargetFirst * (1 + pctDiff);
        return yScale(normalizedEquiv);
      })
      .curve(d3.curveMonotoneX);
    return gen(comparisonData) || '';
  }, [comparisonData, data, xScale, yScale]);

  // Y-Axis Ticks (5 levels)
  const yTicks = useMemo(() => {
    return yScale.ticks(5);
  }, [yScale]);

  // X-Axis Ticks (5 to 6 date stamps)
  const xTicks = useMemo(() => {
    return xScale.ticks(Math.max(3, Math.floor(innerWidth / 120)));
  }, [xScale, innerWidth]);

  // Interactive Hover Handler
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - margin.left;

    if (mouseX < 0 || mouseX > innerWidth) {
      setHoveredPoint(null);
      return;
    }

    const hoveredDate = xScale.invert(mouseX);
    const bisect = d3.bisector<CandlePoint & { date: Date }, Date>((d) => d.date).left;
    const index = bisect(data, hoveredDate, 1);
    const d0 = data[index - 1];
    const d1 = data[index];
    let selected = d0;

    if (d1 && d0) {
      selected =
        hoveredDate.getTime() - d0.date.getTime() > d1.date.getTime() - hoveredDate.getTime() ? d1 : d0;
    } else if (d1) {
      selected = d1;
    }

    if (selected) {
      setHoveredPoint({
        ...selected,
        x: xScale(selected.date),
        y: yScale(selected.close),
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const strokeColor = isPositiveTrend
    ? isLight
      ? '#009B77'
      : '#10B981'
    : isLight
    ? '#DC2626'
    : '#F43F5E';
  const gridStroke = isLight ? '#E2E8F0' : '#141f33';
  const tickFill = isLight ? '#475569' : '#64748b';
  const crosshairStroke = isLight ? '#003399' : '#38bdf8';
  const sma20Stroke = isLight ? '#D99B00' : '#F59E0B';
  const sma50Stroke = isLight ? '#003399' : '#38BDF8';
  const gradientId = `d3-gradient-${asset.id || asset.symbol.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#FFFFFF] dark:bg-[#08101e] border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col space-y-4"
    >
      {/* Chart Top Controls & Tools Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-slate-800/80 pb-3">
        {/* Timeframe Selector (1D, 5D, 1M, 6M, YTD, 1A, 5A) */}
        <div className="flex items-center bg-[#F4F7F9] dark:bg-[#050b14] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-0.5 text-xs">
          {(['1D', '5D', '1M', '6M', 'YTD', '1A', '5A'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              data-on-dark={timeframe === tf ? 'true' : undefined}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg transition text-xs font-bold cursor-pointer ${
                timeframe === tf
                  ? 'bg-[#003399] text-white dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-500 shadow-md'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* View Mode Buttons (Área, Linha, Candlesticks) */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#F4F7F9] dark:bg-[#050b14] border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setChartStyle('area')}
              data-on-dark={chartStyle === 'area' ? 'true' : undefined}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                chartStyle === 'area'
                  ? 'bg-[#003399] text-white dark:bg-slate-700 shadow-sm'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              {tD3.styleArea}
            </button>
            <button
              onClick={() => setChartStyle('line')}
              data-on-dark={chartStyle === 'line' ? 'true' : undefined}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                chartStyle === 'line'
                  ? 'bg-[#003399] text-white dark:bg-slate-700 shadow-sm'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              {tD3.styleLine}
            </button>
            <button
              onClick={() => setChartStyle('candle')}
              data-on-dark={chartStyle === 'candle' ? 'true' : undefined}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition ${
                chartStyle === 'candle'
                  ? 'bg-[#003399] text-white dark:bg-slate-700 shadow-sm'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              {tD3.styleCandle}
            </button>
          </div>

          {/* Indicators & Overlays toggles */}
          <div className="flex items-center gap-1.5 text-xs">
            {/* Toggle SMA */}
            <button
              onClick={() => setShowSMA((prev) => !prev)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer transition ${
                showSMA
                  ? 'bg-[#FEF7E0] text-[#D99B00] border-[#E5A910]/40 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30'
                  : 'bg-[#F4F7F9] dark:bg-slate-900 text-[#475569] dark:text-slate-400 border-[#E2E8F0] dark:border-slate-800 hover:text-[#0F172A] dark:hover:text-slate-200'
              }`}
              title={tD3.smaTitle}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{tD3.smaLabel}</span>
            </button>

            {/* Toggle Volume */}
            <button
              onClick={() => setShowVolume((prev) => !prev)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer transition ${
                showVolume
                  ? 'bg-[#E6EEFF] text-[#003399] border-[#6699CC]/40 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/30'
                  : 'bg-[#F4F7F9] dark:bg-slate-900 text-[#475569] dark:text-slate-400 border-[#E2E8F0] dark:border-slate-800 hover:text-[#0F172A] dark:hover:text-slate-200'
              }`}
              title={tD3.volumeTitle}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{tD3.volumeLabel}</span>
            </button>

            {/* Benchmark / Comparison selector */}
            {comparisonAssets.length > 0 && (
              <div className="relative inline-flex items-center">
                <button
                  onClick={() => setShowBenchmark((prev) => !prev)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer transition ${
                    showBenchmark
                      ? 'bg-[#E3F7F2] text-[#006B52] border-[#009B77]/35 dark:bg-purple-500/15 dark:text-purple-300 dark:border-purple-500/30'
                      : 'bg-[#F4F7F9] dark:bg-slate-900 text-[#475569] dark:text-slate-400 border-[#E2E8F0] dark:border-slate-800 hover:text-[#0F172A] dark:hover:text-slate-200'
                  }`}
                  title={tD3.compareTitle}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{tD3.compareLabel}</span>
                </button>

                {showBenchmark && (
                  <select
                    value={comparedSymbol}
                    onChange={(e) => setComparedSymbol(e.target.value)}
                    className="ml-1.5 bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-lg px-2 py-1 text-[11px] font-semibold text-[#003399] dark:text-purple-300 focus:outline-none cursor-pointer"
                  >
                    <option value="">{tD3.selectOption}</option>
                    {comparisonAssets
                      .filter((c) => c.symbol !== asset.symbol)
                      .slice(0, 8)
                      .map((c) => (
                        <option key={c.id} value={c.symbol}>
                          vs {c.symbol} ({getLocalizedAssetName(c, lang).slice(0, 15)})
                        </option>
                      ))}
                  </select>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Period High / Low Reference Banner */}
      <div className="flex flex-wrap items-center justify-between text-xs px-1 text-[#475569] dark:text-slate-400 font-mono-numbers">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-[#475569] dark:text-slate-500">{tD3.periodLow}</span>
            <span className="text-[#DC2626] dark:text-rose-400 font-bold">
              {isIndex
                ? formatPointsValue(minPrice, locale)
                : `${asset.currency === 'BRL' ? 'R$' : asset.currency === 'EUR' ? '€' : '$'} ${minPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-[#475569] dark:text-slate-500">{tD3.periodHigh}</span>
            <span className="text-[#006B52] dark:text-emerald-400 font-bold">
              {isIndex
                ? formatPointsValue(maxPrice, locale)
                : `${asset.currency === 'BRL' ? 'R$' : asset.currency === 'EUR' ? '€' : '$'} ${maxPrice.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </span>
          </div>
        </div>

        {/* Dynamic Hover Tooltip Info in header bar */}
        {hoveredPoint ? (
          <div className="flex items-center gap-3 text-xs bg-[#F4F7F9] dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-700/80 px-3 py-1 rounded-lg text-[#0F172A] dark:text-white">
            <span className="text-[#475569] dark:text-slate-400">{hoveredPoint.time}</span>
            <span>{tD3.openShort} <strong>{isIndex ? `${hoveredPoint.open.toFixed(2)} pts` : hoveredPoint.open.toFixed(2)}</strong></span>
            <span>{tD3.highShort} <strong className="text-[#006B52] dark:text-emerald-400">{isIndex ? `${hoveredPoint.high.toFixed(2)} pts` : hoveredPoint.high.toFixed(2)}</strong></span>
            <span>{tD3.lowShort} <strong className="text-[#DC2626] dark:text-rose-400">{isIndex ? `${hoveredPoint.low.toFixed(2)} pts` : hoveredPoint.low.toFixed(2)}</strong></span>
            <span>{tD3.closeShort} <strong>{isIndex ? `${hoveredPoint.close.toFixed(2)} pts` : hoveredPoint.close.toFixed(2)}</strong></span>
            {showVolume && <span className="text-[#475569] dark:text-slate-400">{tD3.volShort} {hoveredPoint.volume.toLocaleString(locale)}</span>}
          </div>
        ) : (
          <div className="text-[11px] text-[#475569] dark:text-slate-500 flex items-center gap-2">
            <span>{tD3.engineLabel}</span>
            <span>•</span>
            <span className="text-[#006B52] dark:text-emerald-400">{tD3.precisionLabel}</span>
          </div>
        )}
      </div>

      {/* Main Interactive D3 SVG Surface */}
      <div className="relative bg-[#F8FAFC] dark:bg-[#050b14] rounded-xl border border-[#E2E8F0] dark:border-slate-800/80 overflow-hidden">
        <svg
          width={containerWidth}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="overflow-visible select-none cursor-crosshair block"
        >
          <defs>
            {/* Linear Gradient for Area Chart */}
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.35} />
              <stop offset="50%" stopColor={strokeColor} stopOpacity={0.12} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="d3-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Group translated to margins */}
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Horizontal Grid Lines */}
            {yTicks.map((tickVal, i) => {
              const y = yScale(tickVal);
              return (
                <g key={i}>
                  <line
                    x1={0}
                    y1={y}
                    x2={innerWidth}
                    y2={y}
                    stroke={gridStroke}
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={innerWidth + 8}
                    y={y + 3}
                    fill={tickFill}
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {isIndex
                      ? tickVal.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 1 })
                      : tickVal.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {/* High/Low Reference Limit Dashed Lines */}
            <line
              x1={0}
              y1={yScale(maxPrice)}
              x2={innerWidth}
              y2={yScale(maxPrice)}
              stroke={isLight ? '#009B77' : '#10b981'}
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />
            <line
              x1={0}
              y1={yScale(minPrice)}
              x2={innerWidth}
              y2={yScale(minPrice)}
              stroke={isLight ? '#DC2626' : '#f43f5e'}
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />

            {/* Area Chart Mode */}
            {chartStyle === 'area' && (
              <>
                <path d={areaPath} fill={`url(#${gradientId})`} />
                <path
                  d={linePath}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#d3-glow)"
                />
              </>
            )}

            {/* Line Chart Mode */}
            {chartStyle === 'line' && (
              <path
                d={linePath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#d3-glow)"
              />
            )}

            {/* Candlestick Chart Mode */}
            {chartStyle === 'candle' && (
              <g className="candlesticks-group">
                {data.map((c, idx) => {
                  const x = xScale(c.date);
                  const isUp = c.close >= c.open;
                  const bodyTop = yScale(Math.max(c.open, c.close));
                  const bodyBottom = yScale(Math.min(c.open, c.close));
                  const bodyH = Math.max(2, bodyBottom - bodyTop);
                  const wickTop = yScale(c.high);
                  const wickBottom = yScale(c.low);
                  const candleW = Math.max(3, innerWidth / data.length - 3);
                  const color = isUp
                    ? isLight
                      ? '#009B77'
                      : '#10B981'
                    : isLight
                    ? '#DC2626'
                    : '#F43F5E';

                  return (
                    <g key={idx}>
                      <line
                        x1={x}
                        y1={wickTop}
                        x2={x}
                        y2={wickBottom}
                        stroke={color}
                        strokeWidth="1.2"
                      />
                      <rect
                        x={x - candleW / 2}
                        y={bodyTop}
                        width={candleW}
                        height={bodyH}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* SMA 20 Overlay */}
            {showSMA && sma20Path && (
              <path
                d={sma20Path}
                fill="none"
                stroke={sma20Stroke}
                strokeWidth="1.8"
                strokeDasharray="3 2"
                strokeOpacity="0.85"
              />
            )}

            {/* SMA 50 Overlay */}
            {showSMA && sma50Path && (
              <path
                d={sma50Path}
                fill="none"
                stroke={sma50Stroke}
                strokeWidth="1.8"
                strokeOpacity="0.85"
              />
            )}

            {/* Benchmark Comparison Line Overlay */}
            {showBenchmark && comparisonLinePath && (
              <g>
                <path
                  d={comparisonLinePath}
                  fill="none"
                  stroke="#C084FC"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
                <text
                  x={innerWidth - 10}
                  y={yScale(data[data.length - 1].close) - 10}
                  fill="#C084FC"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  vs {comparedSymbol}
                </text>
              </g>
            )}

            {/* Volume Sub-chart (Bottom) */}
            {showVolume && (
              <g transform={`translate(0, ${innerHeight + 15})`}>
                <line x1={0} y1={0} x2={innerWidth} y2={0} stroke={gridStroke} strokeWidth="1" />
                {data.map((c, idx) => {
                  const x = xScale(c.date);
                  const barH = volumeHeight - yVolumeScale(c.volume);
                  const barW = Math.max(2, innerWidth / data.length - 3);
                  const isUp = c.close >= c.open;
                  return (
                    <rect
                      key={idx}
                      x={x - barW / 2}
                      y={volumeHeight - barH}
                      width={barW}
                      height={barH}
                      fill={
                        isUp
                          ? isLight
                            ? 'rgba(0, 155, 119, 0.35)'
                            : 'rgba(16, 185, 129, 0.45)'
                          : isLight
                          ? 'rgba(220, 38, 38, 0.35)'
                          : 'rgba(244, 63, 94, 0.45)'
                      }
                      rx="1"
                    />
                  );
                })}
              </g>
            )}

            {/* X-Axis Ticks (Dates) */}
            <g transform={`translate(0, ${height - margin.top - 12})`}>
              {xTicks.map((tDate, i) => {
                const x = xScale(tDate);
                const label =
                  timeframe === '1D'
                    ? d3.timeFormat('%H:%M')(tDate)
                    : tDate.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' });
                return (
                  <text
                    key={i}
                    x={x}
                    y={0}
                    fill={tickFill}
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                );
              })}
            </g>

            {/* Interactive Crosshair & Hover Marker */}
            {hoveredPoint && (
              <g className="crosshair-indicator pointer-events-none">
                {/* Vertical Crosshair */}
                <line
                  x1={hoveredPoint.x}
                  y1={0}
                  x2={hoveredPoint.x}
                  y2={innerHeight}
                  stroke={crosshairStroke}
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                />
                {/* Horizontal Crosshair */}
                <line
                  x1={0}
                  y1={hoveredPoint.y}
                  x2={innerWidth}
                  y2={hoveredPoint.y}
                  stroke={crosshairStroke}
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                />
                {/* Glowing Dot */}
                <circle
                  cx={hoveredPoint.x}
                  cy={hoveredPoint.y}
                  r="5"
                  fill="#ffffff"
                  stroke={strokeColor}
                  strokeWidth="3"
                />
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-[#475569] dark:text-slate-400 px-1 pt-1 border-t border-[#E2E8F0] dark:border-slate-800/80">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: strokeColor }}></span>
            <span className="font-semibold text-[#0F172A] dark:text-white">{asset.symbol}</span>
          </div>
          {showSMA && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#D99B00] dark:bg-amber-400 inline-block"></span>
                <span>SMA 20</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#003399] dark:bg-sky-400 inline-block"></span>
                <span>SMA 50</span>
              </div>
            </>
          )}
          {showBenchmark && comparisonAsset && (
            <div className="flex items-center gap-1.5 text-[#003399] dark:text-purple-300">
              <span className="w-2.5 h-0.5 bg-purple-400 inline-block"></span>
              <span>{tD3.benchmarkPrefix} {comparisonAsset.symbol}</span>
            </div>
          )}
        </div>

        <div className="text-[#475569] dark:text-slate-500 font-mono text-[10px]">
          {tD3.timezoneFooter}
        </div>
      </div>
    </div>
  );
};
