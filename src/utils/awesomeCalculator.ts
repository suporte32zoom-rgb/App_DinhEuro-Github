import type { UniversalRates } from '../services/marketData';

export interface AwesomeCurrencyOption {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  decimals: number;
  isCrypto?: boolean;
}

export interface AwesomeQuoteEntry {
  code: string;
  bidBrl: number;
  askBrl: number;
  highBrl: number;
  lowBrl: number;
  pctChange: number;
  varBid: number;
  createDate?: string;
}

export type AwesomeQuotesMap = Record<string, AwesomeQuoteEntry>;
export type AwesomeQuoteMode = 'bid' | 'ask';

export const AWESOME_API_ENDPOINT =
  'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,CAD-BRL,AUD-BRL,CHF-BRL,JPY-BRL,CNY-BRL,ARS-BRL,BTC-BRL,ETH-BRL';

/**
 * Principais moedas e criptoativos listados no DinhEuro compatíveis com AwesomeAPI.
 */
export const DINHEURO_CALCULATOR_CURRENCIES: AwesomeCurrencyOption[] = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷', decimals: 2 },
  { code: 'USD', name: 'Dólar Americano', symbol: 'US$', flag: '🇺🇸', decimals: 2 },
  { code: 'EUR', name: 'Euro (Zona do Euro)', symbol: '€', flag: '🇪🇺', decimals: 2 },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£', flag: '🇬🇧', decimals: 2 },
  { code: 'CAD', name: 'Dólar Canadense', symbol: 'C$', flag: '🇨🇦', decimals: 2 },
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', flag: '🇦🇺', decimals: 2 },
  { code: 'CHF', name: 'Franco Suíço', symbol: 'CHF', flag: '🇨🇭', decimals: 2 },
  { code: 'JPY', name: 'Iene Japonês', symbol: '¥', flag: '🇯🇵', decimals: 0 },
  { code: 'CNY', name: 'Yuan Chinês', symbol: 'CN¥', flag: '🇨🇳', decimals: 2 },
  { code: 'ARS', name: 'Peso Argentino', symbol: 'ARS$', flag: '🇦🇷', decimals: 2 },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🌐', decimals: 6, isCrypto: true },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '🌐', decimals: 5, isCrypto: true },
];

export interface AwesomeRawTicker {
  code?: string;
  codein?: string;
  bid?: string | number;
  ask?: string | number;
  high?: string | number;
  low?: string | number;
  varBid?: string | number;
  pctChange?: string | number;
  create_date?: string;
}

/**
 * Constrói o mapa de cotações ancoradas em BRL a partir das taxas globais de fallback.
 */
export function buildFallbackAwesomeQuotes(rates: UniversalRates): AwesomeQuotesMap {
  const brlPerUsd = rates.BRL && rates.BRL > 0 ? rates.BRL : 5.584;

  const map: AwesomeQuotesMap = {
    BRL: {
      code: 'BRL',
      bidBrl: 1,
      askBrl: 1,
      highBrl: 1,
      lowBrl: 1,
      pctChange: 0,
      varBid: 0,
    },
  };

  for (const currency of DINHEURO_CALCULATOR_CURRENCIES) {
    if (currency.code === 'BRL') continue;
    const unitsPerUsd = rates[currency.code];
    const brlValue =
      currency.code === 'USD'
        ? brlPerUsd
        : unitsPerUsd && unitsPerUsd > 0
        ? brlPerUsd / unitsPerUsd
        : brlPerUsd;

    map[currency.code] = {
      code: currency.code,
      bidBrl: brlValue,
      askBrl: brlValue * 1.0005,
      highBrl: brlValue * 1.005,
      lowBrl: brlValue * 0.995,
      pctChange: 0,
      varBid: 0,
    };
  }

  return map;
}

/**
 * Faz o parse defensivo da resposta JSON oficial da AwesomeAPI (/last/...).
 */
export function parseAwesomeApiResponse(
  payload: Record<string, AwesomeRawTicker> | null | undefined,
  fallbackQuotes: AwesomeQuotesMap
): { quotes: AwesomeQuotesMap; matchedCount: number; latestTimestamp?: string } {
  const quotes: AwesomeQuotesMap = {
    ...fallbackQuotes,
    BRL: {
      code: 'BRL',
      bidBrl: 1,
      askBrl: 1,
      highBrl: 1,
      lowBrl: 1,
      pctChange: 0,
      varBid: 0,
    },
  };

  if (!payload || typeof payload !== 'object') {
    return { quotes, matchedCount: 0 };
  }

  let matchedCount = 0;
  let latestTimestamp: string | undefined;

  for (const currency of DINHEURO_CALCULATOR_CURRENCIES) {
    if (currency.code === 'BRL') continue;
    const key = `${currency.code}BRL`;
    const item = payload[key];
    if (!item) continue;

    const bid = Number(item.bid);
    if (!Number.isFinite(bid) || bid <= 0) continue;

    const askParsed = Number(item.ask);
    const highParsed = Number(item.high);
    const lowParsed = Number(item.low);
    const pctParsed = Number(item.pctChange);
    const varParsed = Number(item.varBid);

    quotes[currency.code] = {
      code: currency.code,
      bidBrl: bid,
      askBrl: Number.isFinite(askParsed) && askParsed > 0 ? askParsed : bid,
      highBrl: Number.isFinite(highParsed) && highParsed > 0 ? highParsed : bid,
      lowBrl: Number.isFinite(lowParsed) && lowParsed > 0 ? lowParsed : bid,
      pctChange: Number.isFinite(pctParsed) ? pctParsed : 0,
      varBid: Number.isFinite(varParsed) ? varParsed : 0,
      createDate: item.create_date,
    };

    matchedCount += 1;
    if (item.create_date && (!latestTimestamp || item.create_date > latestTimestamp)) {
      latestTimestamp = item.create_date;
    }
  }

  return { quotes, matchedCount, latestTimestamp };
}

export interface AwesomeFetchResult {
  quotes: AwesomeQuotesMap;
  source: 'awesomeapi' | 'fallback';
  fetchedAt: Date;
  apiTimestamp?: string;
  errorMessage?: string;
}

/**
 * Consulta cotações em tempo real diretamente na AwesomeAPI com timeout e fallback resiliente.
 */
export async function fetchAwesomeApiQuotes(
  fallbackRates: UniversalRates,
  timeoutMs = 5000
): Promise<AwesomeFetchResult> {
  const fallbackQuotes = buildFallbackAwesomeQuotes(fallbackRates);
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const response = await fetch(AWESOME_API_ENDPOINT, {
      method: 'GET',
      cache: 'no-store',
      signal: controller?.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = (await response.json()) as Record<string, AwesomeRawTicker>;
    const parsed = parseAwesomeApiResponse(data, fallbackQuotes);

    if (parsed.matchedCount === 0) {
      throw new Error('Resposta sem pares cambiais válidos');
    }

    return {
      quotes: parsed.quotes,
      source: 'awesomeapi',
      fetchedAt: new Date(),
      apiTimestamp: parsed.latestTimestamp,
    };
  } catch (err) {
    return {
      quotes: fallbackQuotes,
      source: 'fallback',
      fetchedAt: new Date(),
      errorMessage: err instanceof Error ? err.message : 'Instabilidade temporária de conexão',
    };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export interface AwesomeConversionResult {
  convertedAmount: number;
  directRate: number;
  inverseRate: number;
  amountInBrl: number;
}

/**
 * Converte valores entre quaisquer duas moedas suportadas usando cruzamento exato via BRL.
 */
export function convertUsingAwesomeQuotes(
  amount: number,
  fromCode: string,
  toCode: string,
  quotes: AwesomeQuotesMap,
  mode: AwesomeQuoteMode = 'bid'
): AwesomeConversionResult {
  const fromQuote = quotes[fromCode];
  const toQuote = quotes[toCode];

  const fromRateBrl =
    fromCode === 'BRL'
      ? 1
      : mode === 'ask'
      ? fromQuote?.askBrl || 0
      : fromQuote?.bidBrl || 0;

  const toRateBrl =
    toCode === 'BRL'
      ? 1
      : mode === 'ask'
      ? toQuote?.askBrl || 0
      : toQuote?.bidBrl || 0;

  if (fromRateBrl <= 0 || toRateBrl <= 0) {
    return {
      convertedAmount: 0,
      directRate: 0,
      inverseRate: 0,
      amountInBrl: 0,
    };
  }

  const safeAmount = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const directRate = fromCode === toCode ? 1 : fromRateBrl / toRateBrl;
  const inverseRate = fromCode === toCode ? 1 : toRateBrl / fromRateBrl;
  const amountInBrl = safeAmount * fromRateBrl;
  const convertedAmount = safeAmount * directRate;

  return {
    convertedAmount,
    directRate,
    inverseRate,
    amountInBrl,
  };
}

/**
 * Formata valores convertidos preservando clareza entre fiat, ARS e frações de cripto.
 */
export function formatConvertedAmount(
  value: number,
  currencyCode: string,
  locale = 'pt-BR'
): string {
  if (!Number.isFinite(value)) return locale.startsWith('en') ? '0.00' : '0,00';
  const meta = DINHEURO_CALCULATOR_CURRENCIES.find((c) => c.code === currencyCode);

  let decimals = meta?.decimals ?? 2;
  if (meta?.isCrypto) {
    decimals = value >= 100 ? 2 : value >= 1 ? 4 : meta.decimals;
  } else if (value > 0 && value < 0.1 && currencyCode !== 'JPY') {
    decimals = 4;
  }

  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${meta?.symbol ?? currencyCode} ${formattedNumber}`;
}

export function formatUnitRate(
  rate: number,
  targetCode: string,
  locale = 'pt-BR'
): string {
  if (!Number.isFinite(rate) || rate <= 0) {
    return locale.startsWith('en') ? '0.0000' : '0,0000';
  }
  const meta = DINHEURO_CALCULATOR_CURRENCIES.find((c) => c.code === targetCode);

  let decimals = 4;
  if (meta?.isCrypto && rate < 0.01) {
    decimals = 6;
  } else if (rate >= 100) {
    decimals = 2;
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(rate);
}
