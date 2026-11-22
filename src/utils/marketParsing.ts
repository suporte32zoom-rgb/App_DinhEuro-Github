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
}

function getValidPositiveNumbers(arr: unknown): number[] {
  if (!Array.isArray(arr)) return [];
  return arr.filter((v): v is number => typeof v === 'number' && Number.isFinite(v) && v > 0);
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
 */
export function extractYahooChartOHLCV(
  yData: any,
  priceDecimals: number = 2
): ParsedYahooOHLCV | null {
  const result = yData?.chart?.result?.[0];
  const m = result?.meta;
  if (!m) return null;

  const quote = result?.indicators?.quote?.[0];
  const validCloses = getValidPositiveNumbers(quote?.close);
  const validHighs = getValidPositiveNumbers(quote?.high);
  const validLows = getValidPositiveNumbers(quote?.low);
  const validOpens = getValidPositiveNumbers(quote?.open);
  const validVolumes = getValidPositiveNumbers(quote?.volume);

  // London Stock Exchange (.L) tickers are often quoted in pence (GBp / GBX); normalize to GBP
  const unitScale = m.currency === 'GBp' || m.currency === 'GBX' ? 0.01 : 1;

  const rawPrice =
    (typeof m.regularMarketPrice === 'number' && Number.isFinite(m.regularMarketPrice) && m.regularMarketPrice > 0
      ? m.regularMarketPrice
      : validCloses.length > 0
      ? validCloses[validCloses.length - 1]
      : 0) * unitScale;

  if (rawPrice <= 0) return null;

  const roundPrice = (n: number) => Number(n.toFixed(priceDecimals));

  const currentPrice = roundPrice(rawPrice);

  const rawPrevClose =
    (typeof m.chartPreviousClose === 'number' && Number.isFinite(m.chartPreviousClose) && m.chartPreviousClose > 0
      ? m.chartPreviousClose
      : typeof m.previousClose === 'number' && Number.isFinite(m.previousClose) && m.previousClose > 0
      ? m.previousClose
      : rawPrice / unitScale) * unitScale;

  const previousClose = roundPrice(rawPrevClose);
  const change = roundPrice(currentPrice - previousClose);
  const changePercent = previousClose > 0 ? Number(((change / previousClose) * 100).toFixed(2)) : 0;

  // Use meta High/Low ONLY if strictly > 0; otherwise read real exchange High/Low from indicators.quote[0]
  const rawHigh =
    typeof m.regularMarketDayHigh === 'number' && Number.isFinite(m.regularMarketDayHigh) && m.regularMarketDayHigh > 0
      ? m.regularMarketDayHigh * unitScale
      : validHighs.length > 0
      ? validHighs[validHighs.length - 1] * unitScale
      : rawPrice;

  const rawLow =
    typeof m.regularMarketDayLow === 'number' && Number.isFinite(m.regularMarketDayLow) && m.regularMarketDayLow > 0
      ? m.regularMarketDayLow * unitScale
      : validLows.length > 0
      ? validLows[validLows.length - 1] * unitScale
      : rawPrice;

  const high = roundPrice(Math.max(rawHigh, rawLow));
  const low = roundPrice(Math.min(rawHigh, rawLow));

  const rawOpen =
    typeof m.regularMarketOpen === 'number' && Number.isFinite(m.regularMarketOpen) && m.regularMarketOpen > 0
      ? m.regularMarketOpen * unitScale
      : validOpens.length > 0
      ? validOpens[validOpens.length - 1] * unitScale
      : rawPrevClose;
  const open = roundPrice(rawOpen);

  const rawVolume =
    typeof m.regularMarketVolume === 'number' && Number.isFinite(m.regularMarketVolume) && m.regularMarketVolume > 0
      ? m.regularMarketVolume
      : validVolumes.length > 0
      ? validVolumes[validVolumes.length - 1]
      : undefined;

  const splits = result?.events?.splits;
  const hasSplitEvent = Boolean(splits && typeof splits === 'object' && Object.keys(splits).length > 0);

  return {
    price: currentPrice,
    previousClose,
    change,
    changePercent,
    high,
    low,
    open,
    volume: rawVolume,
    volumeFormatted: formatCompactVolume(rawVolume),
    hasSplitEvent,
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
