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
    BRL: 5.4596,
    EUR: 0.8905,
    GBP: 0.7423,
    JPY: 158.45,
    CHF: 0.8168,
    CAD: 1.3968,
    AUD: 1.4271,
    CNY: 6.6738,
    HKD: 7.7820,
    ARS: 1015.0,
    BTC: 0.00001246,
    ETH: 0.0004128,
    SOL: 0.01054,
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
 * Format currency with locale and symbol.
 */
export function formatCurrencyValue(
  value: number,
  currency: string = 'BRL',
  decimals: number = 2
): string {
  const normCur = (currency || 'BRL').toUpperCase();
  if (normCur === 'PTS' || normCur === 'PONTOS' || normCur === 'POINTS') {
    return formatPointsValue(value);
  }

  const localeMap: Record<string, string> = {
    BRL: 'pt-BR',
    EUR: 'de-DE',
    USD: 'en-US',
    GBP: 'en-GB',
    JPY: 'ja-JP',
  };

  const locale = localeMap[currency] || 'pt-BR';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(decimals)}`;
  }
}

/**
 * Formata pontuação de índices mundiais (IBOVESPA, S&P 500, etc.) em PONTOS (pts).
 * Índices nunca devem ser exibidos em formato monetário (R$ ou $).
 */
export function formatPointsValue(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '0 pts';
  const decimals = value % 1 === 0 ? 0 : 2;
  try {
    return `${new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: 2,
    }).format(value)} pts`;
  } catch {
    return `${value.toFixed(decimals)} pts`;
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
  rates: CurrencyRates = { USD: 1.0, BRL: 5.485, EUR: 0.8905 },
  isIndex?: boolean
): DualCurrencyInfo {
  const normCur = (currency || 'USD').toUpperCase();
  const isPointAsset = isIndex || normCur === 'PTS' || normCur === 'PONTOS';

  if (isPointAsset) {
    const ptsFormatted = formatPointsValue(price);
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

  const brlRate = rates['BRL'] && rates['BRL'] > 0 ? rates['BRL'] : 5.485;
  const eurRate = rates['EUR'] && rates['EUR'] > 0 ? rates['EUR'] : 0.8905;
  const curRate = rates[normCur] && rates[normCur] > 0 ? rates[normCur] : 1.0;

  // Convert to USD base first
  const valueInUSD = normCur === 'USD' ? price : normCur === 'BRL' ? price / brlRate : normCur === 'EUR' ? price / eurRate : price / curRate;
  const valueInBRL = valueInUSD * brlRate;
  const valueInEUR = valueInUSD * eurRate;

  const decimals = normCur === 'JPY' ? 0 : price < 10 && normCur !== 'BRL' ? 4 : 2;
  const primaryFormatted = formatCurrencyValue(price, normCur, decimals);

  if (normCur === 'BRL') {
    const secondaryFormatted = formatCurrencyValue(valueInUSD, 'USD', 2);
    const tertiaryFormatted = formatCurrencyValue(valueInEUR, 'EUR', 2);
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
    const secondaryFormatted = formatCurrencyValue(valueInBRL, 'BRL', 2);
    const tertiaryFormatted = formatCurrencyValue(valueInEUR, 'EUR', 2);
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
    const secondaryFormatted = formatCurrencyValue(valueInBRL, 'BRL', 2);
    const tertiaryFormatted = formatCurrencyValue(valueInUSD, 'USD', 2);
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
    const secondaryFormatted = formatCurrencyValue(valueInBRL, 'BRL', 2);
    const tertiaryFormatted = formatCurrencyValue(valueInUSD, 'USD', 2);
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
