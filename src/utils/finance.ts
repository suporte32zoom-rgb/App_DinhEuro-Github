/**
 * Financial Calculation Engine for DinhEuro
 * Pure functions decoupled from UI for robust testing and instant reactivity.
 */

export interface CurrencyRates {
  [currencyCode: string]: number; // Rate relative to USD (USD = 1.0)
}

/**
 * Converts an amount from one currency to another using USD-based exchange rates.
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates?: CurrencyRates
): number {
  if (amount <= 0 || isNaN(amount)) return 0;
  const from = (fromCurrency || 'USD').toUpperCase();
  const to = (toCurrency || 'BRL').toUpperCase();
  if (from === to) return amount;

  const fromRate = rates?.[from] ?? (from === 'USD' ? 1.0 : 0);
  const toRate = rates?.[to] ?? (to === 'USD' ? 1.0 : 0);

  if (!Number.isFinite(fromRate) || fromRate <= 0 || !Number.isFinite(toRate) || toRate <= 0) {
    return 0;
  }

  try {
    const amountInUSD = amount / fromRate;
    const result = amountInUSD * toRate;
    return Number(result.toFixed(4));
  } catch {
    return 0;
  }
}

/**
 * Calculates compound interest with initial deposit and monthly contributions.
 */
export interface CompoundInterestInput {
  initialPrincipal: number;
  monthlyContribution: number;
  annualRatePercent: number; // e.g. 10 for 10%
  years: number;
}

export interface YearBreakdown {
  year: number;
  totalInvested: number;
  interestEarned: number;
  totalBalance: number;
}

export interface CompoundInterestResult {
  totalInvested: number;
  totalInterest: number;
  finalBalance: number;
  breakdown: YearBreakdown[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { initialPrincipal, monthlyContribution, annualRatePercent, years } = input;
  const monthlyRate = Math.pow(1 + annualRatePercent / 100, 1 / 12) - 1;
  const totalMonths = Math.max(1, Math.round(years * 12));

  let currentBalance = Math.max(0, initialPrincipal);
  let totalInvested = Math.max(0, initialPrincipal);
  const breakdown: YearBreakdown[] = [];

  for (let month = 1; month <= totalMonths; month++) {
    currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
    totalInvested += monthlyContribution;

    if (month % 12 === 0 || month === totalMonths) {
      const yearNumber = Math.ceil(month / 12);
      breakdown.push({
        year: yearNumber,
        totalInvested: Number(totalInvested.toFixed(2)),
        interestEarned: Number((currentBalance - totalInvested).toFixed(2)),
        totalBalance: Number(currentBalance.toFixed(2)),
      });
    }
  }

  return {
    totalInvested: Number(totalInvested.toFixed(2)),
    totalInterest: Number((currentBalance - totalInvested).toFixed(2)),
    finalBalance: Number(currentBalance.toFixed(2)),
    breakdown,
  };
}

/**
 * Calculates purchasing power erosion by inflation (e.g. IPCA or CPI).
 */
export function calculateInflationImpact(
  amount: number,
  annualInflationPercent: number,
  years: number
): { futurePurchasingPower: number; lossPercentage: number; equivalentNeeded: number } {
  if (amount <= 0 || years <= 0) {
    return { futurePurchasingPower: amount, lossPercentage: 0, equivalentNeeded: amount };
  }
  const factor = Math.pow(1 + annualInflationPercent / 100, years);
  const futurePurchasingPower = Number((amount / factor).toFixed(2));
  const equivalentNeeded = Number((amount * factor).toFixed(2));
  const lossPercentage = Number(((1 - futurePurchasingPower / amount) * 100).toFixed(2));

  return {
    futurePurchasingPower,
    lossPercentage,
    equivalentNeeded,
  };
}

/**
 * Calculates capital gains tax and net profit for Brazilian and global asset sales.
 * Rule: Brazilian equities swing trade: 15% (tax-free under R$ 20,000 monthly sales).
 * Day trade: 20%. Cryptocurrencies: 15% over R$ 35,000 monthly sales.
 */
export interface TaxCalculationInput {
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  assetType: 'stock_br' | 'stock_us' | 'crypto' | 'forex';
  isDayTrade: boolean;
  totalMonthlySalesValue: number;
}

export function calculateProfitAndTax(input: TaxCalculationInput): {
  grossProfit: number;
  isTaxExempt: boolean;
  taxRatePercent: number;
  estimatedTaxDue: number;
  netProfit: number;
  returnPercentage: number;
} {
  const totalCost = input.buyPrice * input.quantity;
  const totalSale = input.sellPrice * input.quantity;
  const grossProfit = Number((totalSale - totalCost).toFixed(2));
  const returnPercentage = totalCost > 0 ? Number(((grossProfit / totalCost) * 100).toFixed(2)) : 0;

  if (grossProfit <= 0) {
    return {
      grossProfit,
      isTaxExempt: true,
      taxRatePercent: 0,
      estimatedTaxDue: 0,
      netProfit: grossProfit,
      returnPercentage,
    };
  }

  let isTaxExempt = false;
  let taxRatePercent = 15;

  if (input.assetType === 'stock_br') {
    if (input.isDayTrade) {
      taxRatePercent = 20;
      isTaxExempt = false;
    } else {
      // Swing trade exempt under R$ 20,000/month
      if (input.totalMonthlySalesValue <= 20000) {
        isTaxExempt = true;
      }
      taxRatePercent = 15;
    }
  } else if (input.assetType === 'crypto') {
    // Crypto exempt under R$ 35,000/month
    if (input.totalMonthlySalesValue <= 35000) {
      isTaxExempt = true;
    }
    taxRatePercent = 15;
  } else if (input.assetType === 'stock_us') {
    // US equities standard 15% on capital gains
    taxRatePercent = 15;
  }

  const estimatedTaxDue = isTaxExempt ? 0 : Number(((grossProfit * taxRatePercent) / 100).toFixed(2));
  const netProfit = Number((grossProfit - estimatedTaxDue).toFixed(2));

  return {
    grossProfit,
    isTaxExempt,
    taxRatePercent: isTaxExempt ? 0 : taxRatePercent,
    estimatedTaxDue,
    netProfit,
    returnPercentage,
  };
}

/**
 * Normalizes a numeric value to a fixed number of decimals and eliminates -0.
 */
export function roundToDecimals(value: number, decimals: number = 2): number {
  if (!Number.isFinite(value)) return 0;
  const rounded = Number(value.toFixed(decimals));
  return Object.is(rounded, -0) || rounded === 0 ? 0 : rounded;
}

/**
 * Standardizes decimal precision across all 8 market asset blocks by category, currency, and price tier.
 */
export function getAssetPriceDecimals(
  price: number,
  currency: string = 'USD',
  category?: string
): number {
  const normCur = (currency || 'USD').toUpperCase();
  const absPrice = Number.isFinite(price) ? Math.abs(price) : 0;

  if (normCur === 'PTS' || normCur === 'PONTOS' || normCur === 'POINTS' || category === 'indices') {
    return Math.abs(absPrice % 1) < 1e-6 ? 0 : 2;
  }

  if (normCur === 'JPY') {
    return category === 'forex' ? 2 : 0;
  }

  if (normCur === 'KRW') {
    return 0;
  }

  if (absPrice <= 0) {
    return 2;
  }

  if (category === 'stocks_br') {
    return 2;
  }

  if (category === 'forex') {
    if (absPrice < 0.02) return 5;
    if (absPrice < 20) return 4;
    return 2;
  }

  if (category === 'crypto') {
    if (absPrice < 0.02) return 5;
    if (absPrice < 10) return 4;
    return 2;
  }

  if (category === 'stocks_us' || category === 'stocks_eu' || category === 'stocks_asia' || category === 'commodities') {
    if (absPrice < 0.02) return 5;
    if (absPrice < 1) return 4;
    return 2;
  }

  if (absPrice < 0.02) return 5;
  if (absPrice < 1) return 4;
  return 2;
}

/**
 * Normalizes formatted currency strings (half-width ¥ for JPY/CNY and uniform spacing).
 */
function normalizeFormattedCurrencyOutput(formatted: string): string {
  return formatted
    .replace(/\uFFE5/g, '¥')
    .replace(/\u00A0/g, ' ')
    .replace(/(CN¥|¥)(?=\d)/g, '$1 ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Format currency with locale and symbol.
 */
export function formatCurrencyValue(
  value: number,
  currency: string = 'BRL',
  decimals: number = 2,
  fallbackLocale: string = 'pt-BR'
): string {
  const normCur = (currency || 'BRL').toUpperCase();
  if (normCur === 'PTS' || normCur === 'PONTOS' || normCur === 'POINTS') {
    return formatPointsValue(value, fallbackLocale);
  }

  const safeVal = roundToDecimals(Number.isFinite(value) ? value : 0, decimals);

  const localeMap: Record<string, string> = {
    BRL: 'pt-BR',
    EUR: 'de-DE',
    USD: 'en-US',
    GBP: 'en-GB',
    JPY: 'ja-JP',
  };

  const locale = localeMap[normCur] || fallbackLocale;

  try {
    const raw = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: normCur,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(safeVal);
    return normalizeFormattedCurrencyOutput(raw);
  } catch {
    return `${normCur} ${safeVal.toFixed(decimals)}`;
  }
}

/**
 * Formats an absolute price/value variation strictly without combined signs ("+-" or "-+").
 * When the rounded value equals 0, renders without any "+" or "-" sign.
 */
export function formatSignedCurrencyChange(
  value: number,
  currency: string = 'BRL',
  decimals: number = 2,
  fallbackLocale: string = 'pt-BR'
): string {
  const normCur = (currency || 'BRL').toUpperCase();
  if (normCur === 'PTS' || normCur === 'PONTOS' || normCur === 'POINTS') {
    const ptsDec = Math.abs(value) >= 100 || Math.abs(value % 1) < 1e-6 ? 0 : 2;
    const roundedPts = roundToDecimals(value, ptsDec);
    if (roundedPts === 0) return formatPointsValue(0, fallbackLocale);
    const sign = roundedPts > 0 ? '+' : '-';
    return `${sign}${formatPointsValue(Math.abs(roundedPts), fallbackLocale)}`;
  }

  const rounded = roundToDecimals(value, decimals);
  if (rounded === 0) {
    return formatCurrencyValue(0, normCur, decimals, fallbackLocale);
  }
  const sign = rounded > 0 ? '+' : '-';
  return `${sign}${formatCurrencyValue(Math.abs(rounded), normCur, decimals, fallbackLocale)}`;
}

/**
 * Formats a percentage variation cleanly without "+-" / "-+" or "-0.00%".
 * Preserves "+" strictly for > 0 and "-" strictly for < 0 after rounding.
 */
export function formatSignedPercentChange(
  pct: number,
  decimals: number = 2,
  locale?: string
): { text: string; isPositive: boolean; isNegative: boolean; isZero: boolean } {
  const rounded = roundToDecimals(pct, decimals);
  const isZero = rounded === 0;
  const isPositive = rounded > 0;
  const isNegative = rounded < 0;

  const absNumStr = locale
    ? Math.abs(rounded).toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : Math.abs(rounded).toFixed(decimals);

  const text = isZero ? `${absNumStr}%` : `${isPositive ? '+' : '-'}${absNumStr}%`;
  return { text, isPositive, isNegative, isZero };
}

/**
 * Formata pontuação de índices mundiais (IBOVESPA, S&P 500, etc.) em PONTOS (pts).
 * Índices nunca devem ser exibidos em formato monetário (R$ ou $).
 */
export function formatPointsValue(value: number, locale: string = 'pt-BR'): string {
  if (value === undefined || value === null || isNaN(value)) return '0 pts';
  const decimals = Math.abs(value % 1) < 1e-6 ? 0 : 2;
  const safeVal = roundToDecimals(value, decimals);
  try {
    return `${new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: 2,
    }).format(safeVal)} pts`;
  } catch {
    return `${safeVal.toFixed(decimals)} pts`;
  }
}

export interface DualCurrencyInfo {
  primaryFormatted: string;
  secondaryFormatted: string;
  tertiaryFormatted: string;
  primaryCurrency: string;
  secondaryCurrency: string;
  tertiaryCurrency: string;
  primaryValue: number;
  secondaryValue: number;
  tertiaryValue: number;
  convertedBRL: number;
  convertedUSD: number;
  convertedEUR: number;
  summaryTriCurrency: string;
}

function getConvertedDecimals(value: number): number {
  const abs = Math.abs(value);
  if (abs <= 0) return 2;
  if (abs < 0.02) return 4;
  if (abs < 1) return 3;
  return 2;
}

/**
 * Standardized Multicurrency Engine (BRL, USD and EUR):
 * For every asset listed on DinhEuro:
 * - If asset is an index (category 'indices' or currency 'PTS'): strictly formatted in PONTOS (pts).
 * - If asset is in USD: displays native in USD, and converted in BRL and EUR.
 * - If asset is in BRL: displays native in BRL, and converted in USD and EUR.
 * - If asset is in EUR: displays native in EUR, and converted in BRL and USD.
 * - Always keeps synchronized dual/tri currency representation in real-time.
 */
export function getDualCurrencyDisplay(
  price: number,
  currency: string = 'USD',
  rates: CurrencyRates = { USD: 1.0 },
  isIndex?: boolean,
  locale: string = 'pt-BR',
  category?: string
): DualCurrencyInfo {
  const normCur = (currency || 'USD').toUpperCase();
  const isPointAsset = isIndex || normCur === 'PTS' || normCur === 'PONTOS' || category === 'indices';

  if (isPointAsset) {
    const ptsFormatted = formatPointsValue(price, locale);
    return {
      primaryFormatted: ptsFormatted,
      secondaryFormatted: '',
      tertiaryFormatted: '',
      primaryCurrency: 'PTS',
      secondaryCurrency: 'PTS',
      tertiaryCurrency: 'PTS',
      primaryValue: price,
      secondaryValue: price,
      tertiaryValue: price,
      convertedBRL: price,
      convertedUSD: price,
      convertedEUR: price,
      summaryTriCurrency: ptsFormatted,
    };
  }

  const brlRate = rates['BRL'] && rates['BRL'] > 0 ? rates['BRL'] : 0;
  const eurRate = rates['EUR'] && rates['EUR'] > 0 ? rates['EUR'] : 0;
  const curRate = rates[normCur] && rates[normCur] > 0 ? rates[normCur] : (normCur === 'USD' ? 1.0 : 0);

  // Convert to USD base first without fabricating static FX multipliers
  const valueInUSD =
    normCur === 'USD'
      ? price
      : curRate > 0
      ? price / curRate
      : 0;
  const valueInBRL = normCur === 'BRL' ? price : (valueInUSD > 0 && brlRate > 0 ? valueInUSD * brlRate : 0);
  const valueInEUR = normCur === 'EUR' ? price : (valueInUSD > 0 && eurRate > 0 ? valueInUSD * eurRate : 0);

  const decimals = getAssetPriceDecimals(price, normCur, category);
  const primaryFormatted = formatCurrencyValue(price, normCur, decimals, locale);

  if (normCur === 'BRL') {
    const secondaryFormatted = formatCurrencyValue(valueInUSD, 'USD', getConvertedDecimals(valueInUSD), locale);
    const tertiaryFormatted = formatCurrencyValue(valueInEUR, 'EUR', getConvertedDecimals(valueInEUR), locale);
    return {
      primaryFormatted,
      secondaryFormatted,
      tertiaryFormatted,
      primaryCurrency: 'BRL',
      secondaryCurrency: 'USD',
      tertiaryCurrency: 'EUR',
      primaryValue: price,
      secondaryValue: valueInUSD,
      tertiaryValue: valueInEUR,
      convertedBRL: price,
      convertedUSD: valueInUSD,
      convertedEUR: valueInEUR,
      summaryTriCurrency: `${primaryFormatted} (≈ ${secondaryFormatted} | ${tertiaryFormatted})`,
    };
  } else if (normCur === 'USD') {
    const secondaryFormatted = formatCurrencyValue(valueInBRL, 'BRL', getConvertedDecimals(valueInBRL), locale);
    const tertiaryFormatted = formatCurrencyValue(valueInEUR, 'EUR', getConvertedDecimals(valueInEUR), locale);
    return {
      primaryFormatted,
      secondaryFormatted,
      tertiaryFormatted,
      primaryCurrency: 'USD',
      secondaryCurrency: 'BRL',
      tertiaryCurrency: 'EUR',
      primaryValue: price,
      secondaryValue: valueInBRL,
      tertiaryValue: valueInEUR,
      convertedBRL: valueInBRL,
      convertedUSD: price,
      convertedEUR: valueInEUR,
      summaryTriCurrency: `${primaryFormatted} (≈ ${secondaryFormatted} | ${tertiaryFormatted})`,
    };
  } else if (normCur === 'EUR') {
    const secondaryFormatted = formatCurrencyValue(valueInBRL, 'BRL', getConvertedDecimals(valueInBRL), locale);
    const tertiaryFormatted = formatCurrencyValue(valueInUSD, 'USD', getConvertedDecimals(valueInUSD), locale);
    return {
      primaryFormatted,
      secondaryFormatted,
      tertiaryFormatted,
      primaryCurrency: 'EUR',
      secondaryCurrency: 'BRL',
      tertiaryCurrency: 'USD',
      primaryValue: price,
      secondaryValue: valueInBRL,
      tertiaryValue: valueInUSD,
      convertedBRL: valueInBRL,
      convertedUSD: valueInUSD,
      convertedEUR: price,
      summaryTriCurrency: `${primaryFormatted} (≈ ${secondaryFormatted} | ${tertiaryFormatted})`,
    };
  } else {
    const secondaryFormatted = formatCurrencyValue(valueInBRL, 'BRL', getConvertedDecimals(valueInBRL), locale);
    const tertiaryFormatted = formatCurrencyValue(valueInUSD, 'USD', getConvertedDecimals(valueInUSD), locale);
    return {
      primaryFormatted,
      secondaryFormatted,
      tertiaryFormatted,
      primaryCurrency: normCur,
      secondaryCurrency: 'BRL',
      tertiaryCurrency: 'USD',
      primaryValue: price,
      secondaryValue: valueInBRL,
      tertiaryValue: valueInUSD,
      convertedBRL: valueInBRL,
      convertedUSD: valueInUSD,
      convertedEUR: valueInEUR,
      summaryTriCurrency: `${primaryFormatted} (≈ ${secondaryFormatted} | ${tertiaryFormatted})`,
    };
  }
}

export interface MinimalMarketAssetForRates {
  id?: string;
  symbol?: string;
  price: number;
  category?: string;
}

export function resolveUsdBrlRate(
  assets: MinimalMarketAssetForRates[],
  rates?: CurrencyRates
): number {
  const usdBrlAsset = assets.find((a) => a.id === 'usd_brl' || a.symbol === 'USD/BRL');
  if (usdBrlAsset?.price && Number.isFinite(usdBrlAsset.price) && usdBrlAsset.price > 0) {
    return usdBrlAsset.price;
  }
  const brl = rates?.BRL ?? 0;
  return Number.isFinite(brl) && brl > 0 ? brl : 0;
}

export function resolveEurBrlRate(
  assets: MinimalMarketAssetForRates[],
  rates?: CurrencyRates
): number {
  const eurBrlAsset = assets.find((a) => a.id === 'eur_brl' || a.symbol === 'EUR/BRL');
  if (eurBrlAsset?.price && Number.isFinite(eurBrlAsset.price) && eurBrlAsset.price > 0) {
    return eurBrlAsset.price;
  }
  const brl = rates?.BRL ?? 0;
  const eur = rates?.EUR ?? 0;
  if (Number.isFinite(brl) && brl > 0 && Number.isFinite(eur) && eur > 0) {
    return brl / eur;
  }
  return 0;
}

/**
 * Aligns USD-based conversion rates with displayed MarketContext FX pair assets
 * so Hero KPIs, Quick Simulator, Currency Matrix, Ticker, and fallback quotes match.
 */
export function buildAlignedMarketRates(
  assets: MinimalMarketAssetForRates[],
  rates: CurrencyRates
): CurrencyRates {
  const usdBrl = resolveUsdBrlRate(assets, rates);
  const eurBrl = resolveEurBrlRate(assets, rates);

  const aligned: CurrencyRates = {
    ...rates,
    USD: 1.0,
  };

  if (usdBrl > 0) {
    aligned.BRL = usdBrl;
    if (eurBrl > 0) {
      aligned.EUR = usdBrl / eurBrl;
    }
  }

  const brlSynced = new Set<string>(['USD', 'BRL', 'EUR']);

  if (usdBrl > 0) {
    for (const asset of assets) {
      if (asset.category !== 'forex' || !asset.price || asset.price <= 0 || !asset.symbol) continue;
      const parts = asset.symbol.split('/');
      if (parts.length !== 2) continue;
      const [base, quote] = parts;
      if (quote === 'BRL' && !brlSynced.has(base)) {
        aligned[base] = usdBrl / asset.price;
        brlSynced.add(base);
      }
    }
  }

  for (const asset of assets) {
    if (asset.category !== 'forex' || !asset.price || asset.price <= 0 || !asset.symbol) continue;
    const parts = asset.symbol.split('/');
    if (parts.length !== 2) continue;
    const [base, quote] = parts;
    if (base === 'USD' && !brlSynced.has(quote)) {
      aligned[quote] = asset.price;
    } else if (quote === 'USD' && !brlSynced.has(base)) {
      aligned[base] = 1 / asset.price;
    }
  }

  return aligned;
}

export type MarketSentimentZone =
  | 'extreme_fear'
  | 'fear'
  | 'neutral'
  | 'moderate_greed'
  | 'extreme_optimism';

export interface MarketSentimentResult {
  score: number;
  zone: MarketSentimentZone;
  hasMarketBreadth: boolean;
  activeAssetsCount: number;
  advancers: number;
  decliners: number;
  avgChangePercent: number;
  vixPrice: number | null;
}

/**
 * Computes a dynamic 0–100 Market Sentiment (Risk Appetite) index directly from
 * the current percentage variations (`change24h`) of loaded assets and currencies.
 * Falls back strictly to neutral 50 when risk market variations have not arrived yet.
 */
export function calculateMarketSentimentIndex(
  assets: Array<{ id?: string; symbol?: string; price?: number; change24h?: number; category?: string }>
): MarketSentimentResult {
  const validAssets = Array.isArray(assets)
    ? assets.filter(
        (a) =>
          typeof a?.price === 'number' &&
          Number.isFinite(a.price) &&
          a.price > 0 &&
          typeof a?.change24h === 'number' &&
          Number.isFinite(a.change24h)
      )
    : [];

  const nonForexValid = validAssets.filter((a) => a.category !== 'forex');

  if (validAssets.length === 0 || nonForexValid.length === 0) {
    return {
      score: 50,
      zone: 'neutral',
      hasMarketBreadth: false,
      activeAssetsCount: validAssets.length,
      advancers: 0,
      decliners: 0,
      avgChangePercent: 0,
      vixPrice: null,
    };
  }

  const categoryWeights: Record<string, number> = {
    indices: 1.5,
    stocks_br: 1.2,
    stocks_us: 1.2,
    stocks_eu: 1.1,
    stocks_asia: 1.1,
    crypto: 1.0,
    commodities: 0.7,
    forex: 0.4,
  };

  // Higher weights for flagship global benchmarks loaded in MarketContext
  const globalBenchmarkWeights: Record<string, number> = {
    sp500: 3.0,
    nasdaq: 2.6,
    dowjones: 2.2,
    ibovespa: 2.6,
    stoxx50: 2.2,
    dax: 2.0,
    ftse100: 1.8,
    nikkei: 1.8,
    vix: 3.0,
    btc: 2.0,
    btc_usd: 2.0,
    eth: 1.5,
    eth_usd: 1.5,
    gold: 1.3,
    usd_brl: 0.9,
    eur_brl: 0.9,
    eur_usd: 0.9,
  };

  let weightedSum = 0;
  let totalWeight = 0;
  let sentimentAdvancers = 0;
  let sentimentDecliners = 0;
  let displayAdvancers = 0;
  let displayDecliners = 0;
  let riskAssetChgSum = 0;
  let riskAssetCount = 0;
  let vixPrice: number | null = null;

  for (const asset of validAssets) {
    const chg = asset.change24h as number;
    const normId = asset.id?.toLowerCase() || '';
    const normSym = asset.symbol?.toUpperCase() || '';
    const isVix = normId === 'vix' || normSym === 'VIX';

    if (isVix && typeof asset.price === 'number' && asset.price > 0) {
      vixPrice = asset.price;
    }

    const effectiveChg = isVix ? -chg : chg;
    const clampedChg = Math.max(-8, Math.min(8, effectiveChg));
    const baseWeight = (asset.category && categoryWeights[asset.category]) || 1.0;
    const benchmarkWeight = globalBenchmarkWeights[normId];
    const weight = benchmarkWeight !== undefined ? benchmarkWeight : baseWeight;

    weightedSum += clampedChg * weight;
    totalWeight += weight;

    if (effectiveChg > 0.005) sentimentAdvancers += 1;
    else if (effectiveChg < -0.005) sentimentDecliners += 1;

    if (!isVix) {
      if (chg > 0.005) displayAdvancers += 1;
      else if (chg < -0.005) displayDecliners += 1;
      if (asset.category !== 'forex') {
        riskAssetChgSum += chg;
        riskAssetCount += 1;
      }
    }
  }

  const avgChange = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const breadthRatio = (sentimentAdvancers - sentimentDecliners) / validAssets.length;
  const vixLevelAdjustment =
    vixPrice !== null
      ? vixPrice > 22
        ? (22 - Math.min(45, vixPrice)) * 0.5
        : vixPrice < 16
        ? (16 - Math.max(10, vixPrice)) * 0.5
        : 0
      : 0;

  const rawScore = 50 + avgChange * 12 + breadthRatio * 20 + vixLevelAdjustment;
  const score = Math.round(Math.max(0, Math.min(100, rawScore)));
  const avgChangePercent =
    riskAssetCount > 0 ? Number((riskAssetChgSum / riskAssetCount).toFixed(2)) : 0;

  let zone: MarketSentimentZone = 'neutral';
  if (score < 25) zone = 'extreme_fear';
  else if (score < 45) zone = 'fear';
  else if (score <= 55) zone = 'neutral';
  else if (score < 75) zone = 'moderate_greed';
  else zone = 'extreme_optimism';

  return {
    score,
    zone,
    hasMarketBreadth: true,
    activeAssetsCount: validAssets.length,
    advancers: displayAdvancers,
    decliners: displayDecliners,
    avgChangePercent,
    vixPrice,
  };
}



