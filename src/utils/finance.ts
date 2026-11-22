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
  if (fromCurrency === toCurrency) return amount;

  const fallbackRates: Record<string, number> = {
    USD: 1.0,
    BRL: 5.584,
    EUR: 0.8958,
    GBP: 0.7432,
    JPY: 154.2,
    CHF: 0.8845,
    CAD: 1.392,
    AUD: 1.518,
    CNY: 7.235,
    HKD: 7.846,
    TWD: 32.95,
    KRW: 1337.5,
    SGD: 1.2894,
    INR: 93.51,
    NZD: 1.8232,
    MXN: 18.515,
    CLP: 997.3,
    COP: 3324.3,
    PEN: 3.4156,
    ZAR: 16.984,
    EGP: 53.72,
    NGN: 1348.9,
    MAD: 9.98,
    NOK: 9.632,
    SEK: 10.14,
    DKK: 6.813,
    PLN: 4.014,
    TRY: 50.42,
    AED: 3.6727,
    SAR: 3.755,
    ILS: 3.247,
    ARS: 1040.0,
    BTC: 0.0000137,
    ETH: 0.000496,
    SOL: 0.0122,
  };

  const from = (fromCurrency || 'USD').toUpperCase();
  const to = (toCurrency || 'BRL').toUpperCase();

  const fromRate = rates?.[from] || fallbackRates[from] || 1.0;
  const toRate = rates?.[to] || fallbackRates[to] || 1.0;

  try {
    const amountInUSD = amount / fromRate;
    const result = amountInUSD * toRate;
    return Number(result.toFixed(4));
  } catch {
    return amount;
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
  rates: CurrencyRates = { USD: 1.0, BRL: 5.584, EUR: 0.8958 },
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

  const brlRate = rates['BRL'] && rates['BRL'] > 0 ? rates['BRL'] : 5.584;
  const eurRate = rates['EUR'] && rates['EUR'] > 0 ? rates['EUR'] : 0.8958;
  const curRate = rates[normCur] && rates[normCur] > 0 ? rates[normCur] : 1.0;

  // Convert to USD base first
  const valueInUSD = normCur === 'USD' ? price : normCur === 'BRL' ? price / brlRate : normCur === 'EUR' ? price / eurRate : price / curRate;
  const valueInBRL = valueInUSD * brlRate;
  const valueInEUR = valueInUSD * eurRate;

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
