/**
 * Shared Market Data Parsing, Spot Parity & Split Sanity Utilities
 * Used by both server proxy (marketProxy.ts) and client-side feeds (marketData.ts).
 */

export const TROY_OUNCE_GRAMS = 31.1034768;
export const DEFAULT_GOLD_SILVER_RATIO = 79.91;
export const MIN_GOLD_SILVER_RATIO = 25;
export const MAX_GOLD_SILVER_RATIO = 130;

export interface ParsedYahooOHLCV {
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume?: number;
  volumeFormatted?: string;
  hasSplitEvent: boolean;
  marketTimeMs?: number;
}

interface AlignedBar {
  ts?: number;
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

function isPositiveFinite(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v > 0;
}

export function normalizePriceBounds(
  price: number,
  high?: number,
  low?: number,
  decimals: number = 2
): { price: number; high: number; low: number } {
  const round = (n: number) => {
    const r = Number(n.toFixed(decimals));
    return Object.is(r, -0) || r === 0 ? 0 : r;
  };
  const safePrice = isPositiveFinite(price) ? round(price) : 0;
  const candidates = [safePrice, high, low].filter(isPositiveFinite);
  if (candidates.length === 0) {
    return { price: 0, high: 0, low: 0 };
  }
  return {
    price: safePrice,
    high: round(Math.max(...candidates)),
    low: round(Math.min(...candidates)),
  };
}

export function formatCompactVolume(volume?: number): string | undefined {
  if (typeof volume !== 'number' || !Number.isFinite(volume) || volume <= 0) {
    return undefined;
  }
  if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
  if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
  if (volume >= 1e3) return `${Math.round(volume / 1e3)}K`;
  return String(Math.round(volume));
}

/**
 * Parses Yahoo Finance v8 /chart response defensively.
 * Crucial for B3 (.SA) and ^BVSP where Yahoo returns regularMarketDayHigh: 0 and regularMarketDayLow: 0
 * in `meta`, while the actual session High, Low, Open, and Volume reside in `indicators.quote[0]`.
 * Also handles range=5d payloads by aligning timestamps & OHLCV bars and choosing the latest session.
 */
export function extractYahooChartOHLCV(
  yData: any,
  priceDecimals: number = 2
): ParsedYahooOHLCV | null {
  const result = yData?.chart?.result?.[0];
  const m = result?.meta;
  if (!m) return null;

  const quote = result?.indicators?.quote?.[0];
  const timestamps: unknown[] = Array.isArray(result?.timestamp) ? result.timestamp : [];
  const closes: unknown[] = Array.isArray(quote?.close) ? quote.close : [];
  const highs: unknown[] = Array.isArray(quote?.high) ? quote.high : [];
  const lows: unknown[] = Array.isArray(quote?.low) ? quote.low : [];
  const opens: unknown[] = Array.isArray(quote?.open) ? quote.open : [];
  const volumes: unknown[] = Array.isArray(quote?.volume) ? quote.volume : [];

  const bars: AlignedBar[] = [];
  for (let i = 0; i < closes.length; i++) {
    const c = closes[i];
    if (!isPositiveFinite(c)) continue;
    const rawTs = timestamps[i];
    bars.push({
      ts: isPositiveFinite(rawTs) ? rawTs * 1000 : undefined,
      open: isPositiveFinite(opens[i]) ? (opens[i] as number) : undefined,
      high: isPositiveFinite(highs[i]) ? (highs[i] as number) : undefined,
      low: isPositiveFinite(lows[i]) ? (lows[i] as number) : undefined,
      close: c,
      volume: isPositiveFinite(volumes[i]) ? (volumes[i] as number) : undefined,
    });
  }

  const latestBar = bars.length > 0 ? bars[bars.length - 1] : undefined;
  const prevBar = bars.length >= 2 ? bars[bars.length - 2] : undefined;

  // London Stock Exchange (.L) tickers are often quoted in pence (GBp / GBX); normalize to GBP
  const unitScale = m.currency === 'GBp' || m.currency === 'GBX' ? 0.01 : 1;
  const metaMarketTimeMs = isPositiveFinite(m.regularMarketTime) ? (m.regularMarketTime as number) * 1000 : undefined;

  const barIsNewerThanMeta = Boolean(
    latestBar?.ts && metaMarketTimeMs && latestBar.ts > metaMarketTimeMs + 3600 * 1000
  );

  const rawPrice =
    (barIsNewerThanMeta && latestBar
      ? latestBar.close
      : isPositiveFinite(m.regularMarketPrice)
      ? (m.regularMarketPrice as number)
      : latestBar
      ? latestBar.close
      : 0) * unitScale;

  if (rawPrice <= 0) return null;

  const roundPrice = (n: number) => {
    const r = Number(n.toFixed(priceDecimals));
    return Object.is(r, -0) || r === 0 ? 0 : r;
  };

  const currentPrice = roundPrice(rawPrice);

  // In range=5d queries, chartPreviousClose is 5 days old; prefer previousClose or prevBar.close first.
  const rawPrevClose =
    (barIsNewerThanMeta && prevBar
      ? prevBar.close
      : isPositiveFinite(m.previousClose)
      ? (m.previousClose as number)
      : prevBar
      ? prevBar.close
      : isPositiveFinite(m.chartPreviousClose)
      ? (m.chartPreviousClose as number)
      : rawPrice / unitScale) * unitScale;

  const previousClose = roundPrice(rawPrevClose);
  const change = roundPrice(currentPrice - previousClose);
  const rawChangePct = previousClose > 0 ? Number(((change / previousClose) * 100).toFixed(2)) : 0;
  const changePercent = Object.is(rawChangePct, -0) || rawChangePct === 0 ? 0 : rawChangePct;

  // Use meta High/Low ONLY if strictly > 0 and meta is not stale relative to latestBar; otherwise read real bar High/Low
  const rawHigh =
    (!barIsNewerThanMeta && isPositiveFinite(m.regularMarketDayHigh)
      ? (m.regularMarketDayHigh as number) * unitScale
      : latestBar?.high !== undefined
      ? latestBar.high * unitScale
      : rawPrice);

  const rawLow =
    (!barIsNewerThanMeta && isPositiveFinite(m.regularMarketDayLow)
      ? (m.regularMarketDayLow as number) * unitScale
      : latestBar?.low !== undefined
      ? latestBar.low * unitScale
      : rawPrice);

  const bounds = normalizePriceBounds(
    currentPrice,
    Math.max(rawHigh, rawLow),
    Math.min(rawHigh, rawLow),
    priceDecimals
  );

  const rawOpen =
    (!barIsNewerThanMeta && isPositiveFinite(m.regularMarketOpen)
      ? (m.regularMarketOpen as number) * unitScale
      : latestBar?.open !== undefined
      ? latestBar.open * unitScale
      : rawPrevClose);
  const open = roundPrice(rawOpen);

  const rawVolume =
    !barIsNewerThanMeta && isPositiveFinite(m.regularMarketVolume)
      ? (m.regularMarketVolume as number)
      : latestBar?.volume;

  const splits = result?.events?.splits;
  const hasSplitEvent = Boolean(splits && typeof splits === 'object' && Object.keys(splits).length > 0);
  const marketTimeMs = Math.max(metaMarketTimeMs || 0, latestBar?.ts || 0) || undefined;

  return {
    price: bounds.price,
    previousClose,
    change,
    changePercent: Number(changePercent.toFixed(2)),
    high: bounds.high,
    low: bounds.low,
    open,
    volume: rawVolume,
    volumeFormatted: formatCompactVolume(rawVolume),
    hasSplitEvent,
    marketTimeMs,
  };
}

export interface SilverSpotParityResult {
  price: number;
  high: number;
  low: number;
  change: number;
  changePercent: number;
  goldSilverRatio: number;
  adjustedFromAnomaly: boolean;
}

/**
 * Validates and reconciles Silver (XAG) Spot price per troy ounce against Gold (XAU) Spot.
 * - Normalizes US-cents quotes (e.g. 4865 -> 48.65) or per-gram quotes (e.g. 1.56 -> 48.65).
 * - Checks Gold/Silver ratio parity within realistic bounds [25, 130].
 * - Recalculates XAG spot from XAU parity if candidate is missing or outside bounds.
 */
export function reconcileSilverSpotParity(params: {
  goldSpotUsd: number;
  silverCandidateUsd?: number | null;
  referenceRatio?: number;
  futuresPrice?: number;
  futuresHigh?: number;
  futuresLow?: number;
  futuresPrevClose?: number;
}): SilverSpotParityResult {
  const {
    goldSpotUsd,
    silverCandidateUsd,
    referenceRatio = DEFAULT_GOLD_SILVER_RATIO,
    futuresPrice,
    futuresHigh,
    futuresLow,
    futuresPrevClose,
  } = params;

  const safeRatio =
    Number.isFinite(referenceRatio) &&
    referenceRatio >= MIN_GOLD_SILVER_RATIO &&
    referenceRatio <= MAX_GOLD_SILVER_RATIO
      ? referenceRatio
      : DEFAULT_GOLD_SILVER_RATIO;

  let spotPrice = 0;
  let adjustedFromAnomaly = false;

  if (typeof silverCandidateUsd === 'number' && Number.isFinite(silverCandidateUsd) && silverCandidateUsd > 0) {
    let candidate = silverCandidateUsd;
    if (goldSpotUsd > 0) {
      const rawRatio = goldSpotUsd / candidate;
      if (rawRatio < 5 && goldSpotUsd / (candidate / 100) >= MIN_GOLD_SILVER_RATIO && goldSpotUsd / (candidate / 100) <= MAX_GOLD_SILVER_RATIO) {
        // Quoted in US cents per troy ounce
        candidate = candidate / 100;
        adjustedFromAnomaly = true;
      } else if (rawRatio > 1500 && goldSpotUsd / (candidate * TROY_OUNCE_GRAMS) >= MIN_GOLD_SILVER_RATIO && goldSpotUsd / (candidate * TROY_OUNCE_GRAMS) <= MAX_GOLD_SILVER_RATIO) {
        // Quoted per gram instead of troy ounce
        candidate = candidate * TROY_OUNCE_GRAMS;
        adjustedFromAnomaly = true;
      }

      const normalizedRatio = goldSpotUsd / candidate;
      if (normalizedRatio >= MIN_GOLD_SILVER_RATIO && normalizedRatio <= MAX_GOLD_SILVER_RATIO) {
        spotPrice = Number(candidate.toFixed(2));
      } else {
        // Outlier/corrupted silver feed -> recalculate from XAU spot parity
        spotPrice = Number((goldSpotUsd / safeRatio).toFixed(2));
        adjustedFromAnomaly = true;
      }
    } else {
      spotPrice = Number(candidate.toFixed(2));
    }
  } else if (goldSpotUsd > 0) {
    spotPrice = Number((goldSpotUsd / safeRatio).toFixed(2));
    adjustedFromAnomaly = true;
  }

  const goldSilverRatio =
    goldSpotUsd > 0 && spotPrice > 0 ? Number((goldSpotUsd / spotPrice).toFixed(2)) : safeRatio;

  // Compute intraday % change & High/Low anchored consistently to the reconciled Spot price
  let changePercent = 0;
  let change = 0;
  let high = Number((spotPrice * 1.015).toFixed(2));
  let low = Number((spotPrice * 0.985).toFixed(2));

  if (futuresPrice && futuresPrice > 0) {
    if (futuresPrevClose && futuresPrevClose > 0) {
      changePercent = Number((((futuresPrice - futuresPrevClose) / futuresPrevClose) * 100).toFixed(2));
      change = Number(((spotPrice * changePercent) / 100).toFixed(2));
    }
    if (futuresHigh && futuresHigh > 0 && futuresLow && futuresLow > 0) {
      const highRatio = futuresHigh / futuresPrice;
      const lowRatio = futuresLow / futuresPrice;
      high = Number(Math.max(spotPrice, spotPrice * highRatio).toFixed(2));
      low = Number(Math.min(spotPrice, spotPrice * lowRatio).toFixed(2));
    }
  }

  return {
    price: spotPrice,
    high,
    low,
    change,
    changePercent,
    goldSilverRatio,
    adjustedFromAnomaly,
  };
}

/**
 * Cross-validates a US equity price against primary exchange data (e.g., Nasdaq)
 * to guard against unadjusted stock splits, reverse splits, or fraction anomalies.
 */
export function auditSplitAndFractionSanity(params: {
  yahooPrice: number;
  primaryExchangePrice?: number | null;
  primaryExchangeChange?: number | null;
  primaryExchangeChangePct?: number | null;
}): {
  resolvedPrice: number;
  resolvedChange?: number;
  resolvedChangePct?: number;
  divergenceDetected: boolean;
} {
  const { yahooPrice, primaryExchangePrice, primaryExchangeChange, primaryExchangeChangePct } = params;

  if (
    typeof primaryExchangePrice === 'number' &&
    Number.isFinite(primaryExchangePrice) &&
    primaryExchangePrice > 0
  ) {
    if (yahooPrice <= 0) {
      return {
        resolvedPrice: Number(primaryExchangePrice.toFixed(2)),
        resolvedChange:
          typeof primaryExchangeChange === 'number' && Number.isFinite(primaryExchangeChange)
            ? Number(primaryExchangeChange.toFixed(2))
            : undefined,
        resolvedChangePct:
          typeof primaryExchangeChangePct === 'number' && Number.isFinite(primaryExchangeChangePct)
            ? Number(primaryExchangeChangePct.toFixed(2))
            : undefined,
        divergenceDetected: true,
      };
    }

    const diffRatio = Math.abs(yahooPrice - primaryExchangePrice) / primaryExchangePrice;
    // Divergence > 5% indicates stale/split/fraction discrepancy on secondary feed; prefer primary exchange
    if (diffRatio > 0.05) {
      return {
        resolvedPrice: Number(primaryExchangePrice.toFixed(2)),
        resolvedChange:
          typeof primaryExchangeChange === 'number' && Number.isFinite(primaryExchangeChange)
            ? Number(primaryExchangeChange.toFixed(2))
            : undefined,
        resolvedChangePct:
          typeof primaryExchangeChangePct === 'number' && Number.isFinite(primaryExchangeChangePct)
            ? Number(primaryExchangeChangePct.toFixed(2))
            : undefined,
        divergenceDetected: true,
      };
    }
  }

  return {
    resolvedPrice: Number(yahooPrice.toFixed(2)),
    divergenceDetected: false,
  };
}
