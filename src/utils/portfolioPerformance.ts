import type { PortfolioPosition } from '../context/MarketContext';
import {
  YAHOO_SYMBOLS_MAP,
  EXTENDED_YAHOO_SYMBOLS_MAP,
  fetchYahooQuoteDefensive,
  getYahooFinanceKey,
  UniversalRates,
} from '../services/marketData';
import { convertCurrency } from './finance';

export type PortfolioTimeframe = '7D' | '1M' | '3M' | '6M' | '1A';

export interface HistoricalPricePoint {
  timestamp: number;
  close: number;
}

export interface PositionMetricInput extends PortfolioPosition {
  displayName: string;
  currentPrice: number;
  totalCost: number;
  currentTotalValue: number;
  currentTotalBRL: number;
  profitLoss: number;
  profitPercent: number;
}

export interface PortfolioEquityPoint {
  dateKey: string;
  label: string;
  fullDate: string;
  portfolioValue: number;
  costBasis: number;
  profitLoss: number;
  returnPct: number;
}

export interface PortfolioAssetReturnPoint {
  dateKey: string;
  label: string;
  fullDate: string;
  portfolioPct: number;
  [assetKey: string]: string | number;
}

export interface AssetLineMeta {
  symbol: string;
  name: string;
  color: string;
  latestPct: number;
  weightPct: number;
}

export interface PortfolioPerformanceResult {
  equitySeries: PortfolioEquityPoint[];
  assetReturnSeries: PortfolioAssetReturnPoint[];
  assetSeriesMeta: AssetLineMeta[];
  summary: {
    periodReturnPct: number;
    periodHigh: number;
    periodLow: number;
    startValue: number;
    endValue: number;
    costBasis: number;
    bestAssetSymbol: string | null;
    bestAssetPct: number | null;
    hasLiveHistory: boolean;
  };
}

const TIMEFRAME_TO_YAHOO_RANGE: Record<PortfolioTimeframe, string> = {
  '7D': '5d',
  '1M': '1mo',
  '3M': '3mo',
  '6M': '6mo',
  '1A': '1y',
};

const TIMEFRAME_BAR_COUNTS: Record<PortfolioTimeframe, number> = {
  '7D': 7,
  '1M': 22,
  '3M': 45,
  '6M': 60,
  '1A': 52,
};

const TIMEFRAME_STEP_DAYS: Record<PortfolioTimeframe, number> = {
  '7D': 1,
  '1M': 1.4,
  '3M': 2,
  '6M': 3,
  '1A': 7,
};

export const PORTFOLIO_LINE_COLORS = [
  '#38BDF8', // cyan-400
  '#F59E0B', // amber-500
  '#A855F7', // purple-500
  '#EC4899', // pink-500
  '#3B82F6', // blue-500
  '#14B8A6', // teal-500
];

const historyCache = new Map<string, HistoricalPricePoint[]>();

export function resolvePortfolioYahooSymbol(
  symbol: string,
  assetType: PortfolioPosition['assetType']
): string {
  const upper = (symbol || '').trim().toUpperCase();
  if (!upper) return upper;

  if (YAHOO_SYMBOLS_MAP[upper]) {
    return decodeURIComponent(YAHOO_SYMBOLS_MAP[upper]);
  }
  if (EXTENDED_YAHOO_SYMBOLS_MAP[upper]) {
    return decodeURIComponent(EXTENDED_YAHOO_SYMBOLS_MAP[upper]);
  }

  if (assetType === 'crypto') {
    if (upper.includes('/')) {
      return upper.replace('/', '-');
    }
    return upper.includes('-') ? upper : `${upper}-USD`;
  }

  if (assetType === 'forex') {
    if (upper === 'USD/BRL') return 'BRL=X';
    if (upper.includes('/')) {
      return `${upper.replace('/', '')}=X`;
    }
    return upper.endsWith('=X') ? upper : `${upper}=X`;
  }

  if (assetType === 'stock_br') {
    if (!upper.includes('.') && /^[A-Z]{4}\d{1,2}$/.test(upper)) {
      return `${upper}.SA`;
    }
  }

  return upper;
}

export async function fetchPositionHistoricalSeries(
  symbol: string,
  assetType: PortfolioPosition['assetType'],
  timeframe: PortfolioTimeframe
): Promise<HistoricalPricePoint[]> {
  const ySym = resolvePortfolioYahooSymbol(symbol, assetType);
  if (!ySym) return [];

  const cacheKey = `${ySym}__${timeframe}`;
  const cached = historyCache.get(cacheKey);
  if (cached && cached.length >= 2) {
    return cached;
  }

  try {
    const range = TIMEFRAME_TO_YAHOO_RANGE[timeframe];
    const data = await fetchYahooQuoteDefensive(encodeURIComponent(ySym), getYahooFinanceKey(), range);
    const result = data?.chart?.result?.[0];
    const timestamps: number[] = Array.isArray(result?.timestamp) ? result.timestamp : [];
    const closes: (number | null)[] = Array.isArray(result?.indicators?.quote?.[0]?.close)
      ? result.indicators.quote[0].close
      : [];
    const metaCurrency = result?.meta?.currency;
    const unitScale = metaCurrency === 'GBp' || metaCurrency === 'GBX' ? 0.01 : 1;

    const points: HistoricalPricePoint[] = [];
    for (let i = 0; i < Math.min(timestamps.length, closes.length); i++) {
      const ts = timestamps[i];
      const close = closes[i];
      if (typeof ts === 'number' && typeof close === 'number' && Number.isFinite(close) && close > 0) {
        points.push({
          timestamp: ts * 1000,
          close: close * unitScale,
        });
      }
    }

    if (points.length >= 2) {
      historyCache.set(cacheKey, points);
      return points;
    }
  } catch {
    // fallback handled deterministically by caller
  }

  return [];
}

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

export function buildDeterministicFallbackSeries(
  pos: Pick<PositionMetricInput, 'symbol' | 'averageBuyPrice' | 'currentPrice'>,
  timeframe: PortfolioTimeframe,
  nowMs: number = Date.now()
): HistoricalPricePoint[] {
  const count = TIMEFRAME_BAR_COUNTS[timeframe];
  const stepMs = TIMEFRAME_STEP_DAYS[timeframe] * 24 * 60 * 60 * 1000;
  const targetPrice = pos.currentPrice > 0 ? pos.currentPrice : Math.max(0.01, pos.averageBuyPrice);
  const anchorStart =
    pos.averageBuyPrice > 0 && timeframe !== '7D'
      ? pos.averageBuyPrice
      : targetPrice * (0.94 + hashSeed(`${pos.symbol}_${timeframe}`) * 0.08);

  const seed = hashSeed(pos.symbol);
  const points: HistoricalPricePoint[] = [];

  for (let i = 0; i < count; i++) {
    const progress = count > 1 ? i / (count - 1) : 1;
    const ts = nowMs - (count - 1 - i) * stepMs;
    if (i === count - 1) {
      points.push({ timestamp: ts, close: targetPrice });
    } else {
      const linear = anchorStart + (targetPrice - anchorStart) * progress;
      const wave =
        Math.sin(progress * Math.PI * (2 + seed * 3) + seed * 6) *
        targetPrice *
        0.018 *
        (1 - progress * 0.5);
      const close = Math.max(0.0001, linear + wave);
      points.push({ timestamp: ts, close });
    }
  }

  return points;
}

function formatAxisDate(ts: number, timeframe: PortfolioTimeframe, locale: string): string {
  const d = new Date(ts);
  if (timeframe === '7D' || timeframe === '1M') {
    return d.toLocaleDateString(locale, { day: '2-digit', month: 'short' }).replace('.', '');
  }
  return d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' });
}

function formatTooltipDate(ts: number, locale: string): string {
  return new Date(ts).toLocaleDateString(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function sampleSeriesToLength(
  points: HistoricalPricePoint[],
  targetLength: number,
  livePrice: number
): HistoricalPricePoint[] {
  if (points.length === 0) return [];
  if (points.length === targetLength) {
    return points.map((p, idx) =>
      idx === points.length - 1 && livePrice > 0 ? { ...p, close: livePrice } : p
    );
  }

  const sampled: HistoricalPricePoint[] = [];
  for (let i = 0; i < targetLength; i++) {
    const ratio = targetLength > 1 ? i / (targetLength - 1) : 1;
    const srcIdx = Math.min(points.length - 1, Math.round(ratio * (points.length - 1)));
    const pt = points[srcIdx];
    sampled.push({
      timestamp: pt.timestamp,
      close: i === targetLength - 1 && livePrice > 0 ? livePrice : pt.close,
    });
  }
  return sampled;
}

export function buildPortfolioPerformanceData(params: {
  positions: PositionMetricInput[];
  historicalBySymbol: Record<string, HistoricalPricePoint[]>;
  timeframe: PortfolioTimeframe;
  displayCurrency: 'BRL' | 'USD' | 'EUR';
  universalRates: UniversalRates;
  locale: string;
  nowMs?: number;
}): PortfolioPerformanceResult {
  const {
    positions,
    historicalBySymbol,
    timeframe,
    displayCurrency,
    universalRates,
    locale,
    nowMs = Date.now(),
  } = params;

  if (positions.length === 0) {
    const emptyCount = 7;
    const stepMs = 24 * 60 * 60 * 1000;
    const equitySeries: PortfolioEquityPoint[] = [];
    const assetReturnSeries: PortfolioAssetReturnPoint[] = [];
    for (let i = 0; i < emptyCount; i++) {
      const ts = nowMs - (emptyCount - 1 - i) * stepMs;
      const label = formatAxisDate(ts, '7D', locale);
      const fullDate = formatTooltipDate(ts, locale);
      equitySeries.push({
        dateKey: String(ts),
        label,
        fullDate,
        portfolioValue: 0,
        costBasis: 0,
        profitLoss: 0,
        returnPct: 0,
      });
      assetReturnSeries.push({
        dateKey: String(ts),
        label,
        fullDate,
        portfolioPct: 0,
      });
    }
    return {
      equitySeries,
      assetReturnSeries,
      assetSeriesMeta: [],
      summary: {
        periodReturnPct: 0,
        periodHigh: 0,
        periodLow: 0,
        startValue: 0,
        endValue: 0,
        costBasis: 0,
        bestAssetSymbol: null,
        bestAssetPct: null,
        hasLiveHistory: false,
      },
    };
  }

  let hasLiveHistory = false;
  const liveTimelineCandidates: HistoricalPricePoint[][] = [];

  for (const pos of positions) {
    const fetched = historicalBySymbol[pos.symbol];
    if (Array.isArray(fetched) && fetched.length >= 2) {
      hasLiveHistory = true;
      liveTimelineCandidates.push(fetched);
    }
  }

  const referenceLength =
    liveTimelineCandidates.length > 0
      ? Math.max(...liveTimelineCandidates.map((s) => s.length))
      : TIMEFRAME_BAR_COUNTS[timeframe];

  // Choose timeline timestamps from longest live series if available, else fallback timestamps
  const masterTimestamps: number[] =
    liveTimelineCandidates.length > 0
      ? (liveTimelineCandidates.find((s) => s.length === referenceLength) || liveTimelineCandidates[0]).map(
          (p) => p.timestamp
        )
      : buildDeterministicFallbackSeries(positions[0], timeframe, nowMs).map((p) => p.timestamp);

  // Build aligned price series per position in displayCurrency
  const perPositionSeries = positions.map((pos) => {
    const liveSeries = historicalBySymbol[pos.symbol];
    const baseSeries =
      Array.isArray(liveSeries) && liveSeries.length >= 2
        ? sampleSeriesToLength(liveSeries, masterTimestamps.length, pos.currentPrice)
        : buildDeterministicFallbackSeries(pos, timeframe, nowMs);

    const aligned = sampleSeriesToLength(baseSeries, masterTimestamps.length, pos.currentPrice);
    const valuesInDisplayCur = aligned.map((pt) =>
      convertCurrency(pt.close * pos.quantity, pos.currency, displayCurrency, universalRates)
    );
    const unitPricesInDisplayCur = aligned.map((pt) =>
      convertCurrency(pt.close, pos.currency, displayCurrency, universalRates)
    );
    const costInDisplayCur = convertCurrency(
      pos.totalCost,
      pos.currency,
      displayCurrency,
      universalRates
    );

    return {
      pos,
      valuesInDisplayCur,
      unitPricesInDisplayCur,
      costInDisplayCur,
    };
  });

  const totalCostInDisplay = perPositionSeries.reduce((acc, item) => acc + item.costInDisplayCur, 0);

  const equitySeries: PortfolioEquityPoint[] = [];
  const assetReturnSeries: PortfolioAssetReturnPoint[] = [];

  for (let i = 0; i < masterTimestamps.length; i++) {
    const ts = masterTimestamps[i];
    const label = formatAxisDate(ts, timeframe, locale);
    const fullDate = formatTooltipDate(ts, locale);

    let portfolioValue = 0;
    for (const item of perPositionSeries) {
      portfolioValue += item.valuesInDisplayCur[i] ?? 0;
    }

    const startPortfolioVal = perPositionSeries.reduce(
      (acc, item) => acc + (item.valuesInDisplayCur[0] ?? 0),
      0
    );

    const profitLoss = portfolioValue - totalCostInDisplay;
    const returnPct =
      totalCostInDisplay > 0 ? ((portfolioValue - totalCostInDisplay) / totalCostInDisplay) * 100 : 0;
    const portfolioPeriodPct =
      startPortfolioVal > 0 ? ((portfolioValue - startPortfolioVal) / startPortfolioVal) * 100 : 0;

    equitySeries.push({
      dateKey: String(ts),
      label,
      fullDate,
      portfolioValue: Number(portfolioValue.toFixed(2)),
      costBasis: Number(totalCostInDisplay.toFixed(2)),
      profitLoss: Number(profitLoss.toFixed(2)),
      returnPct: Number(returnPct.toFixed(2)),
    });

    const assetRow: PortfolioAssetReturnPoint = {
      dateKey: String(ts),
      label,
      fullDate,
      portfolioPct: Number(portfolioPeriodPct.toFixed(2)),
    };

    for (const item of perPositionSeries) {
      const startP = item.unitPricesInDisplayCur[0] || item.valuesInDisplayCur[0] || 0;
      const curP = item.unitPricesInDisplayCur[i] || item.valuesInDisplayCur[i] || 0;
      const pct = startP > 0 ? ((curP - startP) / startP) * 100 : 0;
      assetRow[item.pos.symbol] = Number(pct.toFixed(2));
    }

    assetReturnSeries.push(assetRow);
  }

  const endValue = equitySeries[equitySeries.length - 1]?.portfolioValue ?? 0;
  const startValue = equitySeries[0]?.portfolioValue ?? 0;
  const periodReturnPct =
    startValue > 0 ? Number((((endValue - startValue) / startValue) * 100).toFixed(2)) : 0;
  const allValues = equitySeries.map((p) => p.portfolioValue);
  const periodHigh = allValues.length > 0 ? Math.max(...allValues) : 0;
  const periodLow = allValues.length > 0 ? Math.min(...allValues) : 0;

  // Rank assets by current weight in displayCurrency (deduplicate symbol if user holds 2 entries)
  const seenSymbols = new Map<string, { name: string; value: number; latestPct: number }>();
  const lastAssetRow = assetReturnSeries[assetReturnSeries.length - 1];
  for (const item of perPositionSeries) {
    const val = item.valuesInDisplayCur[item.valuesInDisplayCur.length - 1] || 0;
    const pct = Number(lastAssetRow?.[item.pos.symbol] ?? 0);
    const prev = seenSymbols.get(item.pos.symbol);
    if (prev) {
      prev.value += val;
    } else {
      seenSymbols.set(item.pos.symbol, {
        name: item.pos.displayName,
        value: val,
        latestPct: pct,
      });
    }
  }

  const assetSeriesMeta: AssetLineMeta[] = Array.from(seenSymbols.entries())
    .sort((a, b) => b[1].value - a[1].value)
    .slice(0, PORTFOLIO_LINE_COLORS.length)
    .map(([symbol, info], idx) => ({
      symbol,
      name: info.name,
      color: PORTFOLIO_LINE_COLORS[idx % PORTFOLIO_LINE_COLORS.length],
      latestPct: Number(info.latestPct.toFixed(2)),
      weightPct: endValue > 0 ? Number(((info.value / endValue) * 100).toFixed(1)) : 0,
    }));

  let bestAssetSymbol: string | null = null;
  let bestAssetPct: number | null = null;
  for (const meta of assetSeriesMeta) {
    if (bestAssetPct === null || meta.latestPct > bestAssetPct) {
      bestAssetPct = meta.latestPct;
      bestAssetSymbol = meta.symbol;
    }
  }

  return {
    equitySeries,
    assetReturnSeries,
    assetSeriesMeta,
    summary: {
      periodReturnPct,
      periodHigh: Number(periodHigh.toFixed(2)),
      periodLow: Number(periodLow.toFixed(2)),
      startValue: Number(startValue.toFixed(2)),
      endValue: Number(endValue.toFixed(2)),
      costBasis: Number(totalCostInDisplay.toFixed(2)),
      bestAssetSymbol,
      bestAssetPct,
      hasLiveHistory,
    },
  };
}
