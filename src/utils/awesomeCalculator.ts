import { getEnvVar, type MarketAsset, type UniversalRates } from '../services/marketData';

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
 * Principais moedas e criptoativos listados no DinhEuro.
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
 * Constrói o mapa de cotações ancoradas em BRL a partir das taxas globais e ativos sincronizados.
 * Não fabrica cotações estáticas quando a taxa BRL ainda não foi recebida.
 */
export function buildFallbackAwesomeQuotes(
  rates: UniversalRates,
  assets?: Pick<MarketAsset, 'id' | 'symbol' | 'price' | 'high24h' | 'low24h' | 'change24h' | 'changeValue' | 'category'>[]
): AwesomeQuotesMap {
  const brlPerUsd = rates.BRL && Number.isFinite(rates.BRL) && rates.BRL > 0 ? rates.BRL : 0;

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

    const matchingAsset = assets?.find((a) => {
      const sym = a.symbol.toUpperCase();
      if (currency.code === 'BTC' || currency.code === 'ETH') {
        return sym === `${currency.code}/USD` || a.id === `${currency.code.toLowerCase()}_usd`;
      }
      return sym === `${currency.code}/BRL` || a.id === `${currency.code.toLowerCase()}_brl`;
    });

    if (matchingAsset && matchingAsset.price > 0 && (currency.code !== 'BTC' && currency.code !== 'ETH')) {
      const p = matchingAsset.price;
      map[currency.code] = {
        code: currency.code,
        bidBrl: p,
        askBrl: p * 1.0005,
        highBrl: matchingAsset.high24h > 0 ? Math.max(p, matchingAsset.high24h) : p,
        lowBrl: matchingAsset.low24h > 0 ? Math.min(p, matchingAsset.low24h) : p,
        pctChange: Number.isFinite(matchingAsset.change24h) ? matchingAsset.change24h : 0,
        varBid: Number.isFinite(matchingAsset.changeValue) ? matchingAsset.changeValue : 0,
      };
      continue;
    }

    if (brlPerUsd <= 0) {
      map[currency.code] = {
        code: currency.code,
        bidBrl: 0,
        askBrl: 0,
        highBrl: 0,
        lowBrl: 0,
        pctChange: 0,
        varBid: 0,
      };
      continue;
    }

    if (matchingAsset && matchingAsset.price > 0 && (currency.code === 'BTC' || currency.code === 'ETH')) {
      const brlValue = matchingAsset.price * brlPerUsd;
      const highBrl = matchingAsset.high24h > 0 ? matchingAsset.high24h * brlPerUsd : brlValue;
      const lowBrl = matchingAsset.low24h > 0 ? matchingAsset.low24h * brlPerUsd : brlValue;
      map[currency.code] = {
        code: currency.code,
        bidBrl: brlValue,
        askBrl: brlValue * 1.001,
        highBrl: Math.max(brlValue, highBrl),
        lowBrl: Math.min(brlValue, lowBrl),
        pctChange: Number.isFinite(matchingAsset.change24h) ? matchingAsset.change24h : 0,
        varBid: 0,
      };
      continue;
    }

    const unitsPerUsd = rates[currency.code];
    const brlValue =
      currency.code === 'USD'
        ? brlPerUsd
        : unitsPerUsd && unitsPerUsd > 0
        ? brlPerUsd / unitsPerUsd
        : 0;

    map[currency.code] = {
      code: currency.code,
      bidBrl: brlValue,
      askBrl: brlValue > 0 ? brlValue * 1.0005 : 0,
      highBrl: brlValue > 0 ? brlValue * 1.005 : 0,
      lowBrl: brlValue > 0 ? brlValue * 0.995 : 0,
      pctChange: 0,
      varBid: 0,
    };
  }

  return map;
}

/**
 * Faz o parse defensivo da resposta JSON de câmbio em BRL (/last/...).
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
  source: 'live' | 'fallback';
  fetchedAt: Date | null;
  apiTimestamp?: string;
  errorMessage?: string;
}

async function fetchJsonSafely(url: string, timeoutMs: number): Promise<any> {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      signal: controller?.signal,
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/**
 * Consulta cotações em tempo real com fallback automático multi-fonte (inclui proxies CORS e feeds globais).
 * O carimbo fetchedAt só é definido quando cotações reais são efetivamente recebidas.
 */
export async function fetchAwesomeApiQuotes(
  fallbackRates: UniversalRates,
  timeoutMs = 5000
): Promise<AwesomeFetchResult> {
  const fallbackQuotes = buildFallbackAwesomeQuotes(fallbackRates);
  const configuredFxUrl = getEnvVar('VITE_AWESOME_ECONOMY_URL') || AWESOME_API_ENDPOINT;

  // 1. Endpoint primário configurado (direto e via proxies CORS caso bloqueado no browser)
  const fxCandidates = [
    configuredFxUrl,
    `https://corsproxy.io/?url=${encodeURIComponent(configuredFxUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(configuredFxUrl)}`,
  ];

  for (const url of fxCandidates) {
    const data = (await fetchJsonSafely(url, timeoutMs)) as Record<string, AwesomeRawTicker> | null;
    const parsed = parseAwesomeApiResponse(data, fallbackQuotes);
    if (parsed.matchedCount > 0) {
      return {
        quotes: parsed.quotes,
        source: 'live',
        fetchedAt: new Date(),
        apiTimestamp: parsed.latestTimestamp,
      };
    }
  }

  // 2. Fallback automático para feeds cambiais globais (BCE/Frankfurter, Coinbase, Alpha Vantage configurado)
  const mergedRates: UniversalRates = { USD: 1.0 };
  const [frankData, coinbaseData] = await Promise.all([
    fetchJsonSafely('https://api.frankfurter.dev/v1/latest?base=USD', 3200),
    fetchJsonSafely('https://api.coinbase.com/v2/exchange-rates?currency=USD', 3200),
  ]);

  if (frankData?.rates && typeof frankData.rates === 'object') {
    for (const [k, v] of Object.entries(frankData.rates)) {
      if (typeof v === 'number' && Number.isFinite(v) && v > 0) {
        mergedRates[k] = v;
      }
    }
  }

  const cbRates = coinbaseData?.data?.rates;
  if (cbRates && typeof cbRates === 'object') {
    for (const [k, rawVal] of Object.entries(cbRates)) {
      const parsedVal = parseFloat(String(rawVal));
      if (Number.isFinite(parsedVal) && parsedVal > 0 && !mergedRates[k]) {
        mergedRates[k] = parsedVal;
      }
    }
  }

  if (!mergedRates.BRL || mergedRates.BRL <= 0) {
    const avKey = getEnvVar('VITE_ALPHA_VANTAGE_KEY') || getEnvVar('ALPHA_VANTAGE_KEY');
    if (avKey) {
      const avUsd = await fetchJsonSafely(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=BRL&apikey=${encodeURIComponent(avKey)}`,
        3200
      );
      const avRate = parseFloat(avUsd?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate']);
      if (Number.isFinite(avRate) && avRate > 0) {
        mergedRates.BRL = avRate;
      }
    }
  }

  if (mergedRates.BRL && mergedRates.BRL > 0) {
    const liveCrossQuotes = buildFallbackAwesomeQuotes(mergedRates);
    return {
      quotes: liveCrossQuotes,
      source: 'live',
      fetchedAt: new Date(),
    };
  }

  return {
    quotes: fallbackQuotes,
    source: 'fallback',
    fetchedAt: null,
    errorMessage: '__CACHED__',
  };
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
