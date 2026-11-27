/**
 * DinhEuro Market Data Service (dinheuro.com / dinheuro.com.br)
 * Operação 100% com APIs Públicas Gratuitas (Sem Chaves de API / Sem Cadastro)
 * 
 * 1. Câmbio & Forex: AwesomeAPI (economia.awesomeapi.com.br) + Open Exchange Rates público
 * 2. Criptomoedas: CoinGecko API Pública (api.coingecko.com) + AwesomeAPI
 * 3. Índices Mundiais & Wall Street: Yahoo Finance API Pública (query1.finance.yahoo.com)
 * 4. Ações da B3 (Brasil): Yahoo Finance (.SA) + Brapi.dev pública
 * 5. Commodities Globais: Yahoo Finance Futures (GC=F, CL=F, etc.)
 * 
 * Tratamento de Exceção Defensivo: Persistência em cache (localStorage + memória)
 * garantindo que nenhum ativo exiba R$ 0,00 ou $0.0000 mesmo durante oscilações de rede no GitHub Pages.
 */

import { extractYahooChartOHLCV, reconcileSilverSpotParity, normalizePriceBounds } from '../utils/marketParsing';
import { getAssetPriceDecimals, roundToDecimals, buildAlignedMarketRates } from '../utils/finance';

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category:
    | 'indices'
    | 'stocks_us'
    | 'stocks_br'
    | 'stocks_eu'
    | 'stocks_asia'
    | 'forex'
    | 'crypto'
    | 'commodities';
  price: number;
  currency: string;
  change24h: number;
  changeValue: number;
  high24h: number;
  low24h: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  dividendYield?: number;
  sparkline: number[];
  flag?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
  datetime: string;
  imageUrl?: string;
  timestamp?: number;
}

export interface UniversalRates {
  [currency: string]: number;
}

export const DEFAULT_UNIVERSAL_RATES: UniversalRates = {
  USD: 1.0,
  BRL: 5.584,
  EUR: 0.8958,
  GBP: 0.7432,
  JPY: 154.2,
  CHF: 0.8845,
  CAD: 1.3920,
  AUD: 1.5180,
  CNY: 7.2350,
  HKD: 7.8460,
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

// ==============================================================
// MAPEAMENTO COMPLETO DE SÍMBOLOS PARA YAHOO FINANCE API PÚBLICA
// ==============================================================
export const YAHOO_SYMBOLS_MAP: Record<string, string> = {
  // 1. World Indices (14)
  'S&P 500': '%5EGSPC',
  'NASDAQ': '%5EIXIC',
  'DOW JONES': '%5EDJI',
  'IBOVESPA': '%5EBVSP',
  'DAX 40': '%5EGDAXI',
  'FTSE 100': '%5EFTSE',
  'NIKKEI 225': '%5EN225',
  'HANG SENG': '%5EHSI',
  'CAC 40': '%5EFCHI',
  'EURO STOXX 50': '%5ESTOXX50E',
  'SHANGHAI COMPOSITE': '000001.SS',
  'ASX 200': '%5EAXJO',
  'RUSSELL 2000': '%5ERUT',
  'VIX': '%5EVIX',

  // 2. US Equities - Wall Street (25)
  'AAPL': 'AAPL',
  'MSFT': 'MSFT',
  'NVDA': 'NVDA',
  'AMZN': 'AMZN',
  'GOOGL': 'GOOGL',
  'META': 'META',
  'TSLA': 'TSLA',
  'BRK.B': 'BRK-B',
  'AVGO': 'AVGO',
  'JPM': 'JPM',
  'LLY': 'LLY',
  'V': 'V',
  'WMT': 'WMT',
  'UNH': 'UNH',
  'MA': 'MA',
  'AMD': 'AMD',
  'NFLX': 'NFLX',
  'INTC': 'INTC',
  'CRM': 'CRM',
  'ORCL': 'ORCL',
  'COST': 'COST',
  'PG': 'PG',
  'DIS': 'DIS',
  'ADBE': 'ADBE',
  'PYPL': 'PYPL',

  // 3. Brazilian Equities - B3 (25)
  'PETR4': 'PETR4.SA',
  'VALE3': 'VALE3.SA',
  'ITUB4': 'ITUB4.SA',
  'BBDC4': 'BBDC4.SA',
  'BBAS3': 'BBAS3.SA',
  'WEGE3': 'WEGE3.SA',
  'MGLU3': 'MGLU3.SA',
  'ABEV3': 'ABEV3.SA',
  'RENT3': 'RENT3.SA',
  'B3SA3': 'B3SA3.SA',
  'PRIO3': 'PRIO3.SA',
  'RADL3': 'RADL3.SA',
  'SUZB3': 'SUZB3.SA',
  'GGBR4': 'GGBR4.SA',
  'CSNA3': 'CSNA3.SA',
  'UGPA3': 'UGPA3.SA',
  'TIMS3': 'TIMS3.SA',
  'ASAI3': 'ASAI3.SA',
  'HAPV3': 'HAPV3.SA',
  'LREN3': 'LREN3.SA',
  'EQTL3': 'EQTL3.SA',
  'VBBR3': 'VBBR3.SA',
  'KLBN11': 'KLBN11.SA',
  'SANB11': 'SANB11.SA',
  'CMIG4': 'CMIG4.SA',

  // 4. Commodities Globais (11)
  'OURO (XAU)': 'GC=F',
  'PRATA (XAG)': 'SI=F',
  'BRENT': 'BZ=F',
  'WTI': 'CL=F',
  'GÁS NATURAL': 'NG=F',
  'COBRE': 'HG=F',
  'PLATINA': 'PL=F',
  'TRIGO': 'ZW=F',
  'MILHO': 'ZC=F',
  'SOJA': 'ZS=F',
  'CAFÉ': 'KC=F',

  // 5. Câmbio & Forex (15)
  'USD/BRL': 'BRL=X',
  'EUR/BRL': 'EURBRL=X',
  'GBP/BRL': 'GBPBRL=X',
  'CHF/BRL': 'CHFBRL=X',
  'JPY/BRL': 'JPYBRL=X',
  'CAD/BRL': 'CADBRL=X',
  'AUD/BRL': 'AUDBRL=X',
  'CNY/BRL': 'CNYBRL=X',
  'ARS/BRL': 'ARSBRL=X',
  'EUR/USD': 'EURUSD=X',
  'GBP/USD': 'GBPUSD=X',
  'USD/JPY': 'USDJPY=X',
  'USD/CHF': 'USDCHF=X',
  'AUD/USD': 'AUDUSD=X',
  'USD/CAD': 'USDCAD=X',
};

// ==============================================================
// MAPEAMENTO DE CRIPTOMOEDAS PARA COINGECKO API PÚBLICA (14)
// ==============================================================
export const COINGECKO_CRYPTO_MAP: Record<string, { id: string; symbol: string }> = {
  'BTC/USD': { id: 'bitcoin', symbol: 'BTC' },
  'ETH/USD': { id: 'ethereum', symbol: 'ETH' },
  'SOL/USD': { id: 'solana', symbol: 'SOL' },
  'BNB/USD': { id: 'binancecoin', symbol: 'BNB' },
  'XRP/USD': { id: 'ripple', symbol: 'XRP' },
  'ADA/USD': { id: 'cardano', symbol: 'ADA' },
  'DOGE/USD': { id: 'dogecoin', symbol: 'DOGE' },
  'AVAX/USD': { id: 'avalanche-2', symbol: 'AVAX' },
  'DOT/USD': { id: 'polkadot', symbol: 'DOT' },
  'LINK/USD': { id: 'chainlink', symbol: 'LINK' },
  'LTC/USD': { id: 'litecoin', symbol: 'LTC' },
  'NEAR/USD': { id: 'near', symbol: 'NEAR' },
  'SUI/USD': { id: 'sui', symbol: 'SUI' },
  'APT/USD': { id: 'aptos', symbol: 'APT' },
};

// ==============================================================
// CATÁLOGO OFICIAL DINÂMICO (EXATAMENTE 104 ATIVOS)
// Sem valores estáticos obsoletos. Cotações reais são injetadas
// dinamicamente pelas APIs públicas gratuitas.
// ==============================================================
export const INITIAL_ASSETS: MarketAsset[] = [
  // 1. ÍNDICES MUNDIAIS (14)
  { id: 'sp500', symbol: 'S&P 500', name: "Standard & Poor's 500 Index", category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'nasdaq', symbol: 'NASDAQ', name: 'Nasdaq Composite', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'dowjones', symbol: 'DOW JONES', name: 'Dow Jones Industrial Average', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'ibovespa', symbol: 'IBOVESPA', name: 'Índice Bovespa (Brasil B3)', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'dax', symbol: 'DAX 40', name: 'Frankfurt Stock Exchange Index', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇪' },
  { id: 'ftse100', symbol: 'FTSE 100', name: 'London Stock Exchange Index', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇬🇧' },
  { id: 'nikkei', symbol: 'NIKKEI 225', name: 'Tokyo Stock Exchange', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'hangseng', symbol: 'HANG SENG', name: 'Hong Kong Hang Seng Index', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇭🇰' },
  { id: 'cac40', symbol: 'CAC 40', name: 'Paris Euronext CAC 40', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇫🇷' },
  { id: 'stoxx50', symbol: 'EURO STOXX 50', name: 'Euro Stoxx 50 Blue Chip', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇪🇺' },
  { id: 'shanghai', symbol: 'SHANGHAI COMPOSITE', name: 'Shanghai Stock Exchange Composite', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇳' },
  { id: 'asx200', symbol: 'ASX 200', name: 'S&P/ASX 200 Austrália', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇺' },
  { id: 'russell2000', symbol: 'RUSSELL 2000', name: 'Russell 2000 Small-Caps Index', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'vix', symbol: 'VIX', name: 'CBOE Volatility Index', category: 'indices', price: 0, currency: 'PTS', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '📉' },

  // 2. AÇÕES EUA / WALL STREET (25)
  { id: 'aapl', symbol: 'AAPL', name: 'Apple Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'msft', symbol: 'MSFT', name: 'Microsoft Corporation', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'nvda', symbol: 'NVDA', name: 'NVIDIA Corporation', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'amzn', symbol: 'AMZN', name: 'Amazon.com Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'googl', symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'meta', symbol: 'META', name: 'Meta Platforms Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'tsla', symbol: 'TSLA', name: 'Tesla Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'brk_b', symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'avgo', symbol: 'AVGO', name: 'Broadcom Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'jpm', symbol: 'JPM', name: 'JPMorgan Chase & Co.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'lly', symbol: 'LLY', name: 'Eli Lilly and Company', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'v_stock', symbol: 'V', name: 'Visa Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'wmt', symbol: 'WMT', name: 'Walmart Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'unh', symbol: 'UNH', name: 'UnitedHealth Group', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'ma', symbol: 'MA', name: 'Mastercard Incorporated', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'amd', symbol: 'AMD', name: 'Advanced Micro Devices', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'nflx', symbol: 'NFLX', name: 'Netflix Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'intc', symbol: 'INTC', name: 'Intel Corporation', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'crm', symbol: 'CRM', name: 'Salesforce Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'orcl', symbol: 'ORCL', name: 'Oracle Corporation', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'cost', symbol: 'COST', name: 'Costco Wholesale', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'pg', symbol: 'PG', name: 'Procter & Gamble Co.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'dis', symbol: 'DIS', name: 'Walt Disney Company', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'adbe', symbol: 'ADBE', name: 'Adobe Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'pypl', symbol: 'PYPL', name: 'PayPal Holdings Inc.', category: 'stocks_us', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },

  // 3. AÇÕES BRASIL / B3 (25)
  { id: 'petr4', symbol: 'PETR4', name: 'Petrobras PN', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'vale3', symbol: 'VALE3', name: 'Vale ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'itub4', symbol: 'ITUB4', name: 'Itaú Unibanco PN', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'bbdc4', symbol: 'BBDC4', name: 'Banco Bradesco PN', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'bbas3', symbol: 'BBAS3', name: 'Banco do Brasil ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'wege3', symbol: 'WEGE3', name: 'WEG S.A. ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'mglu3', symbol: 'MGLU3', name: 'Magazine Luiza ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'abev3', symbol: 'ABEV3', name: 'Ambev S.A. ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'rent3', symbol: 'RENT3', name: 'Localiza Rent a Car', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'b3sa3', symbol: 'B3SA3', name: 'B3 S.A. Brasil Bolsa Balcão', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'prio3', symbol: 'PRIO3', name: 'PRIO S.A. (PetroRio)', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'radl3', symbol: 'RADL3', name: 'RaiaDrogasil ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'suzb3', symbol: 'SUZB3', name: 'Suzano Papel e Celulose', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'ggbr4', symbol: 'GGBR4', name: 'Gerdau S.A. PN', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'csna3', symbol: 'CSNA3', name: 'CSN Companhia Siderúrgica', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'ugpa3', symbol: 'UGPA3', name: 'Ultrapar Participações', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'tims3', symbol: 'TIMS3', name: 'TIM S.A. ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'asai3', symbol: 'ASAI3', name: 'Assaí Atacadista ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'hapv3', symbol: 'HAPV3', name: 'Hapvida Participações', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'lren3', symbol: 'LREN3', name: 'Lojas Renner ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'eqtl3', symbol: 'EQTL3', name: 'Equatorial Energia ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'vbbr3', symbol: 'VBBR3', name: 'Vibra Energia ON', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'klbn11', symbol: 'KLBN11', name: 'Klabin S.A. Unit', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'sanb11', symbol: 'SANB11', name: 'Banco Santander Brasil Unit', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },
  { id: 'cmig4', symbol: 'CMIG4', name: 'Cemig PN', category: 'stocks_br', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇧🇷' },

  // 4. CRIPTOMOEDAS (14)
  { id: 'btc', symbol: 'BTC/USD', name: 'Bitcoin', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'eth', symbol: 'ETH/USD', name: 'Ethereum', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'sol', symbol: 'SOL/USD', name: 'Solana', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'bnb', symbol: 'BNB/USD', name: 'BNB (Binance)', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'xrp', symbol: 'XRP/USD', name: 'Ripple (XRP)', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'ada', symbol: 'ADA/USD', name: 'Cardano (ADA)', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'doge', symbol: 'DOGE/USD', name: 'Dogecoin', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'avax', symbol: 'AVAX/USD', name: 'Avalanche', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'dot', symbol: 'DOT/USD', name: 'Polkadot', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'link', symbol: 'LINK/USD', name: 'Chainlink', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'ltc', symbol: 'LTC/USD', name: 'Litecoin', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'near', symbol: 'NEAR/USD', name: 'NEAR Protocol', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'sui', symbol: 'SUI/USD', name: 'Sui Network', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },
  { id: 'apt', symbol: 'APT/USD', name: 'Aptos', category: 'crypto', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌐' },

  // 5. COMMODITIES GLOBAIS (11)
  { id: 'gold', symbol: 'OURO (XAU)', name: 'Ouro Spot / Onça Troy', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🥇' },
  { id: 'silver', symbol: 'PRATA (XAG)', name: 'Prata Spot / Onça Troy', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🥈' },
  { id: 'brent', symbol: 'BRENT', name: 'Petróleo Brent Contrato Futuro', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🛢️' },
  { id: 'wti', symbol: 'WTI', name: 'Petróleo WTI (Texas)', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🛢️' },
  { id: 'gas', symbol: 'GÁS NATURAL', name: 'Gás Natural Henry Hub', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🔥' },
  { id: 'copper', symbol: 'COBRE', name: 'Cobre Contrato Futuro', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🧱' },
  { id: 'platinum', symbol: 'PLATINA', name: 'Platina Spot / Onça Troy', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '✨' },
  { id: 'wheat', symbol: 'TRIGO', name: 'Trigo Chicago Board of Trade', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌾' },
  { id: 'corn', symbol: 'MILHO', name: 'Milho Chicago Board of Trade', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌽' },
  { id: 'soybeans', symbol: 'SOJA', name: 'Soja Chicago Board of Trade', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🌱' },
  { id: 'coffee', symbol: 'CAFÉ', name: 'Café Arábica NY ICE', category: 'commodities', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '☕' },

  // 6. CÂMBIO & FOREX (15)
  { id: 'usd_brl', symbol: 'USD/BRL', name: 'Dólar Americano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇺🇸' },
  { id: 'eur_brl', symbol: 'EUR/BRL', name: 'Euro / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇪🇺' },
  { id: 'gbp_brl', symbol: 'GBP/BRL', name: 'Libra Esterlina / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇬🇧' },
  { id: 'chf_brl', symbol: 'CHF/BRL', name: 'Franco Suíço / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇭' },
  { id: 'jpy_brl', symbol: 'JPY/BRL', name: 'Iene Japonês / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'cad_brl', symbol: 'CAD/BRL', name: 'Dólar Canadense / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇦' },
  { id: 'aud_brl', symbol: 'AUD/BRL', name: 'Dólar Australiano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇺' },
  { id: 'cny_brl', symbol: 'CNY/BRL', name: 'Yuan Chinês / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇳' },
  { id: 'ars_brl', symbol: 'ARS/BRL', name: 'Peso Argentino / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇷' },
  { id: 'eur_usd', symbol: 'EUR/USD', name: 'Euro / Dólar Americano', category: 'forex', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇪🇺' },
  { id: 'gbp_usd', symbol: 'GBP/USD', name: 'Libra / Dólar Americano', category: 'forex', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇬🇧' },
  { id: 'usd_jpy', symbol: 'USD/JPY', name: 'Dólar Americano / Iene Japonês', category: 'forex', price: 0, currency: 'JPY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'usd_chf', symbol: 'USD/CHF', name: 'Dólar Americano / Franco Suíço', category: 'forex', price: 0, currency: 'CHF', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇭' },
  { id: 'aud_usd', symbol: 'AUD/USD', name: 'Dólar Australiano / Dólar Americano', category: 'forex', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇺' },
  { id: 'usd_cad', symbol: 'USD/CAD', name: 'Dólar Americano / Dólar Canadense', category: 'forex', price: 0, currency: 'CAD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇦' },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news_1',
    title: 'Copom & Política Monetária: Mercado recalibra projeções para a taxa Selic após ata do Banco Central e dados de inflação',
    summary: 'Síntese DinhEuro: A reprecificação da curva de juros futuros (DI) na B3 afeta diretamente o diferencial de retorno frente aos EUA e ao Euro, influenciando o fluxo cambial no curto prazo.',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com/financas/',
    category: 'Política & Fiscal',
    datetime: 'Há 5 min',
    timestamp: Date.now() - 5 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_2',
    title: 'Congresso Nacional: Lideranças debatem medidas de contenção de gastos públicos e metas do arcabouço fiscal',
    summary: 'Síntese DinhEuro: O ritmo de convergência das contas públicas condiciona o prêmio de risco soberano, impactando o dólar comercial, os juros longos e o apetite por ativos brasileiros.',
    source: 'CNN Brasil Economia',
    url: 'https://www.cnnbrasil.com.br/economia/',
    category: 'Política & Fiscal',
    datetime: 'Há 12 min',
    timestamp: Date.now() - 12 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_3',
    title: 'Ibovespa opera com fluxo estrangeiro: Ações de Petrobras (PETR4) e Vale (VALE3) lideram volume na B3',
    summary: 'Síntese DinhEuro: A combinação de capital externo e cotações firmes de petróleo e minério sustenta os papéis de maior peso no índice e amplia a liquidez de entrada de divisas no país.',
    source: 'InfoMoney',
    url: 'https://www.infomoney.com.br/mercados/',
    category: 'Mercados & B3',
    datetime: 'Há 18 min',
    timestamp: Date.now() - 18 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_4',
    title: 'Câmbio Comercial: Dólar e Euro operam com foco nas remessas corporativas e diferencial de juros Brasil-EUA',
    summary: 'Síntese DinhEuro: Fluxos sazonais de remessas e atuações pontuais do Banco Central via leilões de linha calibram a liquidez no câmbio pronto e a formação da PTAX.',
    source: 'Reuters Brasil',
    url: 'https://www.reuters.com/markets/currencies/',
    category: 'Macro & Câmbio',
    datetime: 'Há 25 min',
    timestamp: Date.now() - 25 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_5',
    title: 'Inflação e CPI dos EUA: Federal Reserve sinaliza cautela nos cortes de juros diante da resiliência do mercado de trabalho',
    summary: 'Síntese DinhEuro: Taxas dos Treasuries sustentadas em patamar restritivo mantêm o dólar fortalecido globalmente e exigem seletividade maior em moedas emergentes.',
    source: 'Bloomberg Línea',
    url: 'https://www.bloomberglinea.com.br/mercados/',
    category: 'Macro & Bancos Centrais',
    datetime: 'Há 32 min',
    timestamp: Date.now() - 32 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_6',
    title: 'Balanços da B3: Grandes bancos (Itaú, Bradesco, BB) superam estimativas com controle de inadimplência e crédito',
    summary: 'Síntese DinhEuro: Margens financeiras estáveis e menor provisão para devedores sustentam o setor financeiro no Ibovespa e reforçam a atratividade por dividendos na B3.',
    source: 'Exame Invest',
    url: 'https://exame.com/invest/',
    category: 'Mercados & B3',
    datetime: 'Há 45 min',
    timestamp: Date.now() - 45 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_7',
    title: 'Mercado de Criptoativos: Bitcoin sustenta liquidez robusta com influxo líquido contínuo em ETFs institucionais',
    summary: 'Síntese DinhEuro: Captações consistentes em ETFs regulados reduzem a oferta circulante e aumentam a correlação tática dos criptoativos com índices de tecnologia.',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com/',
    category: 'Criptoativos',
    datetime: 'Há 50 min',
    timestamp: Date.now() - 50 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_8',
    title: 'Reforma Tributária e Regulamentação: Ministério da Fazenda conclui minutas de regulamentação do IBS e CBS',
    summary: 'Síntese DinhEuro: A definição das regras de transição para o IVA dual amplia a previsibilidade para cadeias exportadoras e reduz custos cumulativos no comércio exterior.',
    source: 'G1 Economia',
    url: 'https://g1.globo.com/economia/',
    category: 'Política & Fiscal',
    datetime: 'Há 1h',
    timestamp: Date.now() - 60 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_9',
    title: 'Wall Street: S&P 500 e Nasdaq registram ganhos impulsionados por semicondutores e big techs (NVDA, MSFT)',
    summary: 'Síntese DinhEuro: O avanço das empresas ligadas à infraestrutura de IA eleva o apetite por risco em Nova York e apoia ações globais de tecnologia.',
    source: 'CNBC Markets',
    url: 'https://www.cnbc.com/markets/',
    category: 'Empresas & Wall St',
    datetime: 'Há 1h 15m',
    timestamp: Date.now() - 75 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_10',
    title: 'Treasuries & Renda Fixa Global: Rendimento dos títulos de 10 anos atrai fluxo de gestores internacionais',
    summary: 'Síntese DinhEuro: A estabilização dos rendimentos soberanos dos EUA alivia pressões sobre moedas emergentes e reduz a volatilidade nas curvas de juros globais.',
    source: 'The Wall Street Journal',
    url: 'https://www.wsj.com/finance',
    category: 'Macro & Bancos Centrais',
    datetime: 'Há 1h 30m',
    timestamp: Date.now() - 90 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1534951009808-766178b47a4f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_11',
    title: 'Zona do Euro: Banco Central Europeu (BCE) monitora custos de energia e balança comercial do bloco europeu',
    summary: 'Síntese DinhEuro: Decisões do BCE diante da inflação de serviços e custos energéticos redefinem o patamar do Euro frente ao Dólar (EUR/USD) e ao Real (EUR/BRL).',
    source: 'Financial Times',
    url: 'https://www.ft.com/markets',
    category: 'Macro & Câmbio',
    datetime: 'Há 1h 45m',
    timestamp: Date.now() - 105 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_12',
    title: 'Agronegócio & Balança Comercial: Exportações de soja e milho mantêm superávit recorde na balança comercial brasileira',
    summary: 'Síntese DinhEuro: O saldo comercial positivo amplia a entrada líquida de divisas estrangeiras, atuando como amortecedor estrutural para o Real em cenários de estresse externo.',
    source: 'Investing.com Brasil',
    url: 'https://br.investing.com/news/',
    category: 'Mercados & B3',
    datetime: 'Há 2h',
    timestamp: Date.now() - 120 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_13',
    title: 'Dívida Pública e Tesouro Nacional: Emissões de títulos indexados ao IPCA batem recorde de demanda no Tesouro Direto',
    summary: 'Síntese DinhEuro: Juros reais elevados nos papéis públicos atraem poupança doméstica de longo prazo e competem diretamente com alocações em renda variável local.',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com/financas/',
    category: 'Política & Fiscal',
    datetime: 'Há 2h 20m',
    timestamp: Date.now() - 140 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_14',
    title: 'Ethereum e Solana: Volume diário em finanças descentralizadas (DeFi) cresce com adoção de stablecoins lastreadas em dólar',
    summary: 'Síntese DinhEuro: A expansão das liquidações em stablecoins reforça a utilidade de redes de contratos inteligentes e amplia a velocidade de remessas globais.',
    source: 'CoinDesk',
    url: 'https://www.coindesk.com/',
    category: 'Criptoativos',
    datetime: 'Há 2h 45m',
    timestamp: Date.now() - 165 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_15',
    title: 'Commodities de Energia: Petróleo Brent oscila no mercado internacional diante de tensões geopolíticas no Oriente Médio',
    summary: 'Síntese DinhEuro: Variações no Brent afetam diretamente as expectativas de inflação global, o custo de fretes marítimos e as ações do setor de óleo e gás na B3.',
    source: 'Bloomberg Línea',
    url: 'https://www.bloomberglinea.com.br/mercados/',
    category: 'Mercados & B3',
    datetime: 'Há 3h',
    timestamp: Date.now() - 180 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_16',
    title: 'Inteligência Artificial: Gigantes de tecnologia anunciam investimentos recordes em data centers e semicondutores para 2026',
    summary: 'Síntese DinhEuro: A escala de capex das big techs sustenta cadeias globais de chips, energia e equipamentos elétricos, impactando exportadores industriais.',
    source: 'Reuters Brasil',
    url: 'https://www.reuters.com/markets/',
    category: 'Empresas & Wall St',
    datetime: 'Há 3h 30m',
    timestamp: Date.now() - 210 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_17',
    title: 'Setor Imobiliário & FIIs: IFIX registra estabilidade e fundos de tijolo atraem investidores com contratos atípicos',
    summary: 'Síntese DinhEuro: Vacância reduzida em galpões logísticos e lajes corporativas sustenta rendimentos isentos no Brasil mesmo sob juros restritivos.',
    source: 'InfoMoney',
    url: 'https://www.infomoney.com.br/mercados/',
    category: 'Mercados & B3',
    datetime: 'Há 4h',
    timestamp: Date.now() - 240 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_18',
    title: 'Política Fiscal dos EUA: Discussões sobre teto da dívida e despesas obrigatórias movimentam o Congresso americano',
    summary: 'Síntese DinhEuro: Impasses fiscais em Washington costumam elevar a volatilidade dos Treasuries e gerar ajustes rápidos na precificação do dólar frente a moedas globais.',
    source: 'The Wall Street Journal',
    url: 'https://www.wsj.com/finance',
    category: 'Política & Fiscal',
    datetime: 'Há 4h 30m',
    timestamp: Date.now() - 270 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_19',
    title: 'Setor Elétrico Nacional: Eletrobras, Equatorial e CPFL avançam em leilões de transmissão e transição energética',
    summary: 'Síntese DinhEuro: Receitas reguladas corrigidas pela inflação mantêm o setor elétrico como porto defensivo em carteiras expostas à B3.',
    source: 'Exame Invest',
    url: 'https://exame.com/invest/',
    category: 'Mercados & B3',
    datetime: 'Há 5h',
    timestamp: Date.now() - 300 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_20',
    title: 'Bolsas Asiáticas: Nikkei no Japão e Hang Seng em Hong Kong fecham pregão com apetite a risco em ações de tecnologia',
    summary: 'Síntese DinhEuro: Sinais de estabilidade na Ásia melhoram o humor global antes da abertura europeia e americana, favorecendo commodities metálicas.',
    source: 'Financial Times',
    url: 'https://www.ft.com/markets',
    category: 'Macro & Bancos Centrais',
    datetime: 'Há 6h',
    timestamp: Date.now() - 360 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_21',
    title: 'Varejo Brasileiro: Black Friday e fim de ano impulsionam vendas no e-commerce e crédito parcelado',
    summary: 'Síntese DinhEuro: O desempenho das vendas sazonais serve de termômetro para o consumo das famílias e para as margens das varejistas listadas na B3.',
    source: 'CNN Brasil Economia',
    url: 'https://www.cnnbrasil.com.br/economia/',
    category: 'Mercados & B3',
    datetime: 'Há 7h',
    timestamp: Date.now() - 420 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_22',
    title: 'Regulamentação Cripto no Brasil: Banco Central avança na consulta pública sobre regras de custódia e stablecoins',
    summary: 'Síntese DinhEuro: Regras claras de segregação patrimonial e câmbio para ativos virtuais aproximam o mercado cripto brasileiro de fluxos institucionais.',
    source: 'InfoMoney',
    url: 'https://www.infomoney.com.br/mercados/',
    category: 'Política & Fiscal',
    datetime: 'Há 8h',
    timestamp: Date.now() - 480 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_23',
    title: 'Minério de Ferro: Cotações em Dalian e Cingapura reagem a novos estímulos de infraestrutura urbana na China',
    summary: 'Síntese DinhEuro: A reposição de estoques siderúrgicos na China sustenta os preços do minério, impactando diretamente a geração de caixa da Vale e a balança brasileira.',
    source: 'Investing.com Brasil',
    url: 'https://br.investing.com/news/',
    category: 'Mercados & B3',
    datetime: 'Há 9h',
    timestamp: Date.now() - 540 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_24',
    title: 'Fusões & Aquisições (M&A): Empresas brasileiras de tecnologia e agritech lideram rodadas de consolidação de mercado',
    summary: 'Síntese DinhEuro: Valuations descontados e busca por ganhos de escala reativam operações estratégicas em setores exportadores e de tecnologia no Brasil.',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com/financas/',
    category: 'Mercados & B3',
    datetime: 'Há 10h',
    timestamp: Date.now() - 600 * 60 * 1000,
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
  },
];

// ==============================================================
// GESTÃO DE PERSISTÊNCIA E MEMÓRIA DE COTAÇÕES
// ==============================================================
const ASSETS_CACHE_KEY = 'dinheuro_live_assets_cache';
const LAST_VALID_QUOTES_KEY = 'dinheuro_last_valid_quotes_v1';

// Armazena em memória exclusivamente cotações reais capturadas na sessão (sem dados congelados)
const memoryQuotesCache: Record<string, any> = {};

export function getLastValidStoredQuote(symbolOrId: string): any | null {
  const norm = symbolOrId.toUpperCase();
  if (memoryQuotesCache[norm]) return memoryQuotesCache[norm];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LAST_VALID_QUOTES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[norm]) {
          memoryQuotesCache[norm] = parsed[norm];
          return parsed[norm];
        }
      }
    } catch {
      // ignore
    }
  }
  return null;
}

export function saveLastValidQuote(symbolOrId: string, quote: any): void {
  const norm = symbolOrId.toUpperCase();
  memoryQuotesCache[norm] = quote;
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LAST_VALID_QUOTES_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[norm] = quote;
      localStorage.setItem(LAST_VALID_QUOTES_KEY, JSON.stringify(parsed));
    } catch {
      // ignore
    }
  }
}

// ==============================================================
// GESTÃO SEGURA DE VARIÁVEIS DE AMBIENTE (ISOLAMENTO DE CHAVES)
// ==============================================================

/**
 * Resolve variáveis de ambiente de forma segura no Vite (browser), Node.js (SSR/testes)
 * e runtime local, ignorando placeholders estáticos de exemplo (como "MY_*").
 */
export function getEnvVar(name: string): string {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      const val = (import.meta.env as Record<string, string | undefined>)[name];
      if (val && typeof val === 'string' && !val.startsWith('MY_')) {
        return val.trim();
      }
    }
  } catch {
    // ignore
  }

  try {
    if (typeof process !== 'undefined' && process.env) {
      const val = process.env[name];
      if (val && typeof val === 'string' && !val.startsWith('MY_')) {
        return val.trim();
      }
    }
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    try {
      const localVal = localStorage.getItem(`dinheuro_env_${name.toLowerCase()}`);
      if (localVal && !localVal.startsWith('MY_')) {
        return localVal.trim();
      }
    } catch {
      // ignore
    }
  }

  return '';
}

export function getCoinGeckoKey(): string {
  return getEnvVar('VITE_COINGECKO_API_KEY') || getEnvVar('COINGECKO_API_KEY');
}

export function getBrapiKey(): string {
  return getEnvVar('VITE_BRAPI_API_KEY') || getEnvVar('BRAPI_API_KEY') || getEnvVar('BRAPI_TOKEN');
}

export function getYahooFinanceKey(): string {
  return getEnvVar('VITE_YAHOO_FINANCE_API_KEY') || getEnvVar('YAHOO_FINANCE_API_KEY');
}

// Funções de compatibilidade (retrocompatibilidade)
export function getStoredFinnhubKey(): string {
  return getEnvVar('VITE_FINNHUB_API_KEY') || getEnvVar('FINNHUB_API_KEY');
}
export function setStoredFinnhubKey(_key: string): void {}
export function getStoredFmpKey(): string {
  return getEnvVar('VITE_FMP_API_KEY') || getEnvVar('FMP_API_KEY');
}
export function setStoredFmpKey(_key: string): void {}
export function getStoredAlphaVantageKey(): string {
  return getEnvVar('VITE_ALPHA_VANTAGE_KEY') || getEnvVar('ALPHA_VANTAGE_KEY');
}
export function setStoredAlphaVantageKey(_key: string): void {}

// ==============================================================
// FETCH DEFENSIVO COM TIMEOUT, HEADERS E SUPORTE A CORS PROXY
// ==============================================================
export async function fetchJsonWithTimeout(
  url: string,
  timeoutMs: number = 3500,
  options?: RequestInit
): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      cache: options?.cache ?? 'no-store',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(options?.headers || {}),
      },
    });
    clearTimeout(id);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    clearTimeout(id);
    return null;
  }
}

/**
 * Consulta resiliente para feed de cotações globais no navegador com multi-host e fallback de CORS proxy.
 * Evita cabeçalhos customizados na chamada direta para não disparar falhas de preflight CORS.
 */
export async function fetchYahooQuoteDefensive(ySym: string, _apiKey?: string, range?: string): Promise<any | null> {
  const rangeParam = range ? `&range=${range}` : '';
  const directUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ySym}?interval=1d&events=div,split${rangeParam}`;
  const backupUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${ySym}?interval=1d&events=div,split${rangeParam}`;

  // 1. Tentativa Direta (query1 -> query2) sem cabeçalhos customizados que bloqueiam CORS
  const directData = await fetchJsonWithTimeout(directUrl, 2400);
  if (directData?.chart?.result?.[0]?.meta) {
    return directData;
  }

  const backupData = await fetchJsonWithTimeout(backupUrl, 2400);
  if (backupData?.chart?.result?.[0]?.meta) {
    return backupData;
  }

  // 2. Fallbacks de CORS Proxy para hospedagem estática no navegador
  const corsProxies = [
    `https://corsproxy.io/?url=${encodeURIComponent(directUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`,
  ];

  for (const proxyUrl of corsProxies) {
    try {
      const proxyData = await fetchJsonWithTimeout(proxyUrl, 3400);
      if (proxyData?.chart?.result?.[0]?.meta) {
        return proxyData;
      }
    } catch {
      // tenta próximo proxy
    }
  }

  return null;
}

export interface LiveMarketSnapshot {
  rates: UniversalRates;
  updatedAssets: MarketAsset[];
  news: NewsItem[];
  rawPairs?: Record<string, any>;
  sourceSummary: string;
  hasLiveData: boolean;
  syncedAt: string | null;
}

/**
 * Coletor Universal em Tempo Real com Arquitetura Multi-Fonte e Fallback Automático.
 */
export async function fetchLiveMarketDataFromAPIs(
  currentAssets: MarketAsset[],
  existingQuotes: Record<string, any> = {}
): Promise<{
  rates: UniversalRates;
  updatedAssets: MarketAsset[];
  hasLiveData: boolean;
  liveRatesReceived: boolean;
}> {
  const liveRates: UniversalRates = { USD: 1.0 };
  const rawQuotes: Record<string, any> = { ...existingQuotes };
  let liveUpdatesCount = Object.values(existingQuotes).some((q) => q && Number(q.price) > 0) ? 1 : 0;
  let liveRatesReceived = false;

  const tasks: Promise<void>[] = [];

  // ==============================================================
  // (1) CÂMBIO & FOREX (15 ATIVOS): AwesomeAPI Pública (sem bloqueio de CORS)
  // ==============================================================
  tasks.push(
    (async () => {
      try {
        const awesomeConfiguredUrl = getEnvVar('VITE_AWESOME_ECONOMY_URL');
        const awesomeUrl = awesomeConfiguredUrl || 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,CAD-BRL,AUD-BRL,CHF-BRL,JPY-BRL,CNY-BRL,ARS-BRL,BTC-BRL,ETH-BRL';
        const awesomeData = await fetchJsonWithTimeout(awesomeUrl, 3500);

        if (awesomeData && awesomeData.USDBRL && awesomeData.USDBRL.bid) {
          let usdToBrl = parseFloat(awesomeData.USDBRL.bid);
          if (Number.isFinite(usdToBrl) && usdToBrl > 0) {
            liveRates.BRL = usdToBrl;
            liveRatesReceived = true;
            liveUpdatesCount += 1;

            const mapAwesome = (key: string, symbol: string, rateKey?: string) => {
              const item = awesomeData[key];
              if (item && item.bid) {
                const bid = parseFloat(item.bid);
                if (!Number.isFinite(bid) || bid <= 0) return;
                const varBid = parseFloat(item.varBid) || 0;
                const pct = parseFloat(item.pctChange) || 0;
                const rawHigh = parseFloat(item.high) || bid;
                const rawLow = parseFloat(item.low) || bid;
                const dec = symbol.startsWith('ARS') ? 5 : symbol.includes('BTC') || symbol.includes('ETH') ? 2 : 4;
                const bounds = normalizePriceBounds(bid, rawHigh, rawLow, dec);

                if (rateKey && bounds.price > 0 && usdToBrl > 0) {
                  liveRates[rateKey] = usdToBrl / bounds.price;
                }

                const q = {
                  price: bounds.price,
                  change: varBid,
                  changePercent: pct,
                  high: bounds.high,
                  low: bounds.low,
                  volume: symbol.includes('BTC') || symbol.includes('ETH') ? undefined : '--',
                  source: 'awesome_api_public',
                };
                rawQuotes[symbol] = q;
                rawQuotes[key] = q;
                rawQuotes[symbol.replace('/', '_').toLowerCase()] = q;
                saveLastValidQuote(symbol, q);
              }
            };

            mapAwesome('USDBRL', 'USD/BRL');
            mapAwesome('EURBRL', 'EUR/BRL', 'EUR');
            mapAwesome('GBPBRL', 'GBP/BRL', 'GBP');
            mapAwesome('CADBRL', 'CAD/BRL', 'CAD');
            mapAwesome('AUDBRL', 'AUD/BRL', 'AUD');
            mapAwesome('CHFBRL', 'CHF/BRL', 'CHF');
            mapAwesome('JPYBRL', 'JPY/BRL', 'JPY');
            mapAwesome('CNYBRL', 'CNY/BRL', 'CNY');
            mapAwesome('ARSBRL', 'ARS/BRL', 'ARS');
            mapAwesome('BTCBRL', 'BTC/BRL');
            mapAwesome('ETHBRL', 'ETH/BRL');

            // Paridades secundárias calculadas em tempo real
            if (awesomeData.EURBRL && usdToBrl > 0) {
              const eurBrl = parseFloat(awesomeData.EURBRL.bid);
              if (eurBrl > 0) {
                const eurUsd = Number((eurBrl / usdToBrl).toFixed(4));
                const bounds = normalizePriceBounds(eurUsd, eurUsd, eurUsd, 4);
                const q = { price: bounds.price, change: 0, changePercent: parseFloat(awesomeData.EURBRL.pctChange) || 0, high: bounds.high, low: bounds.low, volume: '--', source: 'awesome_api_cross' };
                rawQuotes['EUR/USD'] = q;
                saveLastValidQuote('EUR/USD', q);
              }
            }
            if (awesomeData.GBPBRL && usdToBrl > 0) {
              const gbpBrl = parseFloat(awesomeData.GBPBRL.bid);
              if (gbpBrl > 0) {
                const gbpUsd = Number((gbpBrl / usdToBrl).toFixed(4));
                const bounds = normalizePriceBounds(gbpUsd, gbpUsd, gbpUsd, 4);
                const q = { price: bounds.price, change: 0, changePercent: parseFloat(awesomeData.GBPBRL.pctChange) || 0, high: bounds.high, low: bounds.low, volume: '--', source: 'awesome_api_cross' };
                rawQuotes['GBP/USD'] = q;
                saveLastValidQuote('GBP/USD', q);
              }
            }
            if (awesomeData.JPYBRL && usdToBrl > 0) {
              const jpyBrl = parseFloat(awesomeData.JPYBRL.bid);
              if (jpyBrl > 0) {
                const usdJpy = Number((usdToBrl / jpyBrl).toFixed(2));
                const bounds = normalizePriceBounds(usdJpy, usdJpy, usdJpy, 2);
                const q = { price: bounds.price, change: 0, changePercent: 0, high: bounds.high, low: bounds.low, volume: '--', source: 'awesome_api_cross' };
                rawQuotes['USD/JPY'] = q;
                saveLastValidQuote('USD/JPY', q);
              }
            }
            if (awesomeData.CHFBRL && usdToBrl > 0) {
              const chfBrl = parseFloat(awesomeData.CHFBRL.bid);
              if (chfBrl > 0) {
                const usdChf = Number((usdToBrl / chfBrl).toFixed(4));
                const bounds = normalizePriceBounds(usdChf, usdChf, usdChf, 4);
                const q = { price: bounds.price, change: 0, changePercent: 0, high: bounds.high, low: bounds.low, volume: '--', source: 'awesome_api_cross' };
                rawQuotes['USD/CHF'] = q;
                saveLastValidQuote('USD/CHF', q);
              }
            }
            if (awesomeData.AUDBRL && usdToBrl > 0) {
              const audBrl = parseFloat(awesomeData.AUDBRL.bid);
              if (audBrl > 0) {
                const audUsd = Number((audBrl / usdToBrl).toFixed(4));
                const bounds = normalizePriceBounds(audUsd, audUsd, audUsd, 4);
                const q = { price: bounds.price, change: 0, changePercent: 0, high: bounds.high, low: bounds.low, volume: '--', source: 'awesome_api_cross' };
                rawQuotes['AUD/USD'] = q;
                saveLastValidQuote('AUD/USD', q);
              }
            }
            if (awesomeData.CADBRL && usdToBrl > 0) {
              const cadBrl = parseFloat(awesomeData.CADBRL.bid);
              if (cadBrl > 0) {
                const usdCad = Number((usdToBrl / cadBrl).toFixed(4));
                const bounds = normalizePriceBounds(usdCad, usdCad, usdCad, 4);
                const q = { price: bounds.price, change: 0, changePercent: 0, high: bounds.high, low: bounds.low, volume: '--', source: 'awesome_api_cross' };
                rawQuotes['USD/CAD'] = q;
                saveLastValidQuote('USD/CAD', q);
              }
            }
          }
        }

        // Fallback automático multi-fonte em tempo real: Coinbase spot primeiro, depois Frankfurter/ECB apenas para moedas faltantes
        if (!rawQuotes['USD/BRL']?.price) {
          let fallbackUsdBrl = 0;
          const fallbackRatesMap: Record<string, number> = {};

          const [cbRes, frankRes] = await Promise.allSettled([
            fetchJsonWithTimeout('https://api.coinbase.com/v2/exchange-rates?currency=USD', 3000),
            fetchJsonWithTimeout('https://api.frankfurter.dev/v1/latest?base=USD', 3000),
          ]);

          if (cbRes.status === 'fulfilled') {
            const cbRates = cbRes.value?.data?.rates;
            if (cbRates && typeof cbRates === 'object') {
              const cbBrl = parseFloat(cbRates.BRL);
              if (Number.isFinite(cbBrl) && cbBrl > 0) {
                fallbackUsdBrl = cbBrl;
              }
              for (const [k, v] of Object.entries(cbRates)) {
                const num = parseFloat(String(v));
                if (Number.isFinite(num) && num > 0) {
                  fallbackRatesMap[k] = num;
                }
              }
            }
          }

          if (frankRes.status === 'fulfilled' && frankRes.value?.rates) {
            if (fallbackUsdBrl <= 0 && typeof frankRes.value.rates.BRL === 'number' && frankRes.value.rates.BRL > 0) {
              fallbackUsdBrl = frankRes.value.rates.BRL;
            }
            for (const [k, v] of Object.entries(frankRes.value.rates)) {
              if (typeof v === 'number' && v > 0 && !fallbackRatesMap[k]) {
                fallbackRatesMap[k] = v;
              }
            }
          }

          if (fallbackUsdBrl <= 0) {
            const avKey = getStoredAlphaVantageKey();
            if (avKey) {
              try {
                const avUsd = await fetchJsonWithTimeout(
                  `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=BRL&apikey=${encodeURIComponent(avKey)}`,
                  3000
                );
                const avRate = parseFloat(avUsd?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate']);
                if (Number.isFinite(avRate) && avRate > 0) {
                  fallbackUsdBrl = avRate;
                }
              } catch {
                // ignore
              }
            }
          }

          if (fallbackUsdBrl > 0) {
            liveRates.BRL = Number(fallbackUsdBrl.toFixed(4));
            liveRatesReceived = true;
            liveUpdatesCount += 1;

            const usdBounds = normalizePriceBounds(liveRates.BRL, liveRates.BRL, liveRates.BRL, 4);
            const qUsd = { price: usdBounds.price, change: 0, changePercent: 0, high: usdBounds.high, low: usdBounds.low, volume: '--', source: 'interbank_fx_live' };
            rawQuotes['USD/BRL'] = qUsd;
            rawQuotes['USDBRL'] = qUsd;
            saveLastValidQuote('USD/BRL', qUsd);

            const assignCrossFromRate = (code: string, pairSym: string, dec: number) => {
              const rawRate = fallbackRatesMap[code];
              if (!Number.isFinite(rawRate) || rawRate <= 0) return;
              liveRates[code] = rawRate;
              const p = Number((fallbackUsdBrl / rawRate).toFixed(dec));
              const b = normalizePriceBounds(p, p, p, dec);
              const q = { price: b.price, change: 0, changePercent: 0, high: b.high, low: b.low, volume: '--', source: 'interbank_fx_live' };
              rawQuotes[pairSym] = q;
              saveLastValidQuote(pairSym, q);
            };

            assignCrossFromRate('EUR', 'EUR/BRL', 4);
            assignCrossFromRate('GBP', 'GBP/BRL', 4);
            assignCrossFromRate('CAD', 'CAD/BRL', 4);
            assignCrossFromRate('AUD', 'AUD/BRL', 4);
            assignCrossFromRate('CHF', 'CHF/BRL', 4);
            assignCrossFromRate('JPY', 'JPY/BRL', 4);
            assignCrossFromRate('CNY', 'CNY/BRL', 4);
            assignCrossFromRate('ARS', 'ARS/BRL', 5);

            if (fallbackRatesMap.EUR > 0) {
              const eurUsdVal = Number((1 / fallbackRatesMap.EUR).toFixed(4));
              const eurUsdBounds = normalizePriceBounds(eurUsdVal, eurUsdVal, eurUsdVal, 4);
              const qEurUsd = { price: eurUsdBounds.price, change: 0, changePercent: 0, high: eurUsdBounds.high, low: eurUsdBounds.low, volume: '--', source: 'interbank_fx_live' };
              rawQuotes['EUR/USD'] = qEurUsd;
              saveLastValidQuote('EUR/USD', qEurUsd);
            }

            for (const [code, val] of Object.entries(fallbackRatesMap)) {
              if (Number.isFinite(val) && val > 0 && !liveRates[code]) {
                liveRates[code] = val;
              }
            }
          }
        }
      } catch (err) {
        console.warn('[DinhEuro] Aviso Câmbio/Forex:', err);
      }
    })()
  );

  // ==============================================================
  // (2) CRIPTOMOEDAS (14 ATIVOS): CoinGecko API com Headers Autenticados
  // ==============================================================
  tasks.push(
    (async () => {
      try {
        const coinGeckoIds = Object.values(COINGECKO_CRYPTO_MAP).map((c) => c.id).join(',');
        const cgKey = getCoinGeckoKey();

        // Configuração de Cabeçalhos Autenticados
        const cgHeaders: Record<string, string> = {
          Accept: 'application/json',
        };

        if (cgKey) {
          if (cgKey.startsWith('CG-')) {
            cgHeaders['x-cg-demo-api-key'] = cgKey;
          } else {
            cgHeaders['x-cg-demo-api-key'] = cgKey;
            cgHeaders['x-cg-pro-api-key'] = cgKey;
          }
        }

        const cgUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinGeckoIds}&vs_currencies=usd,brl&include_24hr_change=true`;

        // 1. Consulta direta com headers
        let cgData = await fetchJsonWithTimeout(cgUrl, 4000, { headers: cgHeaders });

        // 2. Fallbacks de CORS Proxy para hospedagem estática no navegador
        if (!cgData || typeof cgData !== 'object' || Object.keys(cgData).length === 0) {
          for (const proxyCgUrl of [
            `https://corsproxy.io/?url=${encodeURIComponent(cgUrl)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(cgUrl)}`,
          ]) {
            try {
              cgData = await fetchJsonWithTimeout(proxyCgUrl, 3600);
              if (cgData && typeof cgData === 'object' && Object.keys(cgData).length > 0) break;
            } catch {
              // ignore
            }
          }
        }

        if (cgData && typeof cgData === 'object') {
          for (const [symbol, info] of Object.entries(COINGECKO_CRYPTO_MAP)) {
            const coinData = cgData[info.id];
            if (coinData && typeof coinData.usd === 'number' && coinData.usd > 0) {
              liveUpdatesCount += 1;
              const usdPrice = coinData.usd;
              const dec = getAssetPriceDecimals(usdPrice, 'USD', 'crypto');
              const changePct = roundToDecimals(coinData.usd_24h_change ?? 0, 2);
              const changeVal = roundToDecimals((changePct / 100) * usdPrice, dec);
              const bounds = normalizePriceBounds(usdPrice, usdPrice * 1.02, usdPrice * 0.98, dec);

              const quoteObj = {
                price: bounds.price,
                priceBrl: coinData.brl || (liveRates.BRL > 0 ? Number((usdPrice * liveRates.BRL).toFixed(2)) : undefined),
                change: changeVal,
                changePercent: changePct,
                high: bounds.high,
                low: bounds.low,
                source: 'coingecko_api',
              };

              rawQuotes[symbol] = quoteObj;
              rawQuotes[info.symbol] = quoteObj;
              rawQuotes[symbol.replace('/', '_').toLowerCase()] = quoteObj;
              rawQuotes[info.id] = quoteObj;

              saveLastValidQuote(symbol, quoteObj);
            }
          }
        }
      } catch (err) {
        console.warn('[DinhEuro] Aviso Criptoativos:', err);
      }
    })()
  );

  // ==============================================================
  // (3) ÍNDICE IBOVESPA (^BVSP) E AÇÕES DA B3: Brapi.dev com Token Seguro
  // ==============================================================
  const allB3Tickers = [
    '^BVSP',
    'PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'BBAS3',
    'WEGE3', 'MGLU3', 'ABEV3', 'RENT3', 'B3SA3',
    'PRIO3', 'RADL3', 'SUZB3', 'GGBR4', 'CSNA3',
    'UGPA3', 'TIMS3', 'ASAI3', 'HAPV3', 'LREN3',
    'EQTL3', 'VBBR3', 'KLBN11', 'SANB11', 'CMIG4',
  ];

  tasks.push(
    (async () => {
      try {
        const brapiKey = getBrapiKey();
        const brapiHeaders: Record<string, string> = { Accept: 'application/json' };
        if (brapiKey) {
          brapiHeaders['Authorization'] = `Bearer ${brapiKey}`;
        }

        const batches = brapiKey ? [allB3Tickers.join(',')] : ['^BVSP', 'PETR4', 'VALE3', 'ITUB4'];
        for (const batch of batches) {
          const brapiUrl = brapiKey
            ? `https://brapi.dev/api/quote/${encodeURIComponent(batch)}?token=${encodeURIComponent(brapiKey)}`
            : `https://brapi.dev/api/quote/${encodeURIComponent(batch)}`;

          const brapiData = await fetchJsonWithTimeout(brapiUrl, 3500, { headers: brapiHeaders });
          if (brapiData?.results && Array.isArray(brapiData.results)) {
            for (const r of brapiData.results) {
              if (r.symbol && r.regularMarketPrice > 0) {
                liveUpdatesCount += 1;
                const isIbov = r.symbol === '^BVSP';
                const targetSym = isIbov ? 'IBOVESPA' : r.symbol;
                const rawPrice = Number(r.regularMarketPrice.toFixed(2));
                const rawHigh =
                  typeof r.regularMarketDayHigh === 'number' && r.regularMarketDayHigh > 0
                    ? Number(r.regularMarketDayHigh.toFixed(2))
                    : rawPrice;
                const rawLow =
                  typeof r.regularMarketDayLow === 'number' && r.regularMarketDayLow > 0
                    ? Number(r.regularMarketDayLow.toFixed(2))
                    : rawPrice;
                const bounds = normalizePriceBounds(rawPrice, rawHigh, rawLow, 2);
                const marketTimeMs = r.regularMarketTime ? new Date(r.regularMarketTime).getTime() : undefined;
                const q = {
                  price: bounds.price,
                  change: roundToDecimals(r.regularMarketChange || 0, 2),
                  changePercent: roundToDecimals(r.regularMarketChangePercent || 0, 2),
                  high: bounds.high,
                  low: bounds.low,
                  volume: isIbov ? '--' : r.regularMarketVolume ? `${(r.regularMarketVolume / 1e6).toFixed(1)}M` : undefined,
                  marketTimeMs: Number.isFinite(marketTimeMs) ? marketTimeMs : undefined,
                  source: 'brapi_api',
                };
                rawQuotes[targetSym] = q;
                saveLastValidQuote(targetSym, q);
              }
            }
          }
        }
      } catch {
        // Fallback automático para feed internacional (.SA / ^BVSP)
      }
    })()
  );

  // ==============================================================
  // (4) ÍNDICES MUNDIAIS (14), WALL STREET (25), COMMODITIES (11) E B3:
  // Yahoo Finance API Pública (Direta + Fallback Resiliente de CORS)
  // ==============================================================
  const priorityYahooList: [string, string][] = [
    // Índices Mundiais (14)
    ['S&P 500', '%5EGSPC'],
    ['NASDAQ', '%5EIXIC'],
    ['DOW JONES', '%5EDJI'],
    ['IBOVESPA', '%5EBVSP'],
    ['DAX 40', '%5EGDAXI'],
    ['FTSE 100', '%5EFTSE'],
    ['NIKKEI 225', '%5EN225'],
    ['HANG SENG', '%5EHSI'],
    ['CAC 40', '%5EFCHI'],
    ['EURO STOXX 50', '%5ESTOXX50E'],
    ['SHANGHAI COMPOSITE', '000001.SS'],
    ['ASX 200', '%5EAXJO'],
    ['RUSSELL 2000', '%5ERUT'],
    ['VIX', '%5EVIX'],

    // Ações dos EUA - Wall Street (25)
    ['AAPL', 'AAPL'],
    ['MSFT', 'MSFT'],
    ['NVDA', 'NVDA'],
    ['AMZN', 'AMZN'],
    ['GOOGL', 'GOOGL'],
    ['META', 'META'],
    ['TSLA', 'TSLA'],
    ['BRK.B', 'BRK-B'],
    ['AVGO', 'AVGO'],
    ['JPM', 'JPM'],
    ['LLY', 'LLY'],
    ['V', 'V'],
    ['WMT', 'WMT'],
    ['UNH', 'UNH'],
    ['MA', 'MA'],
    ['AMD', 'AMD'],
    ['NFLX', 'NFLX'],
    ['INTC', 'INTC'],
    ['CRM', 'CRM'],
    ['ORCL', 'ORCL'],
    ['COST', 'COST'],
    ['PG', 'PG'],
    ['DIS', 'DIS'],
    ['ADBE', 'ADBE'],
    ['PYPL', 'PYPL'],

    // Ações da B3 (.SA) - 25
    ['PETR4', 'PETR4.SA'],
    ['VALE3', 'VALE3.SA'],
    ['ITUB4', 'ITUB4.SA'],
    ['BBDC4', 'BBDC4.SA'],
    ['BBAS3', 'BBAS3.SA'],
    ['WEGE3', 'WEGE3.SA'],
    ['MGLU3', 'MGLU3.SA'],
    ['ABEV3', 'ABEV3.SA'],
    ['RENT3', 'RENT3.SA'],
    ['B3SA3', 'B3SA3.SA'],
    ['PRIO3', 'PRIO3.SA'],
    ['RADL3', 'RADL3.SA'],
    ['SUZB3', 'SUZB3.SA'],
    ['GGBR4', 'GGBR4.SA'],
    ['CSNA3', 'CSNA3.SA'],
    ['UGPA3', 'UGPA3.SA'],
    ['TIMS3', 'TIMS3.SA'],
    ['ASAI3', 'ASAI3.SA'],
    ['HAPV3', 'HAPV3.SA'],
    ['LREN3', 'LREN3.SA'],
    ['EQTL3', 'EQTL3.SA'],
    ['VBBR3', 'VBBR3.SA'],
    ['KLBN11', 'KLBN11.SA'],
    ['SANB11', 'SANB11.SA'],
    ['CMIG4', 'CMIG4.SA'],

    // Commodities Globais (11)
    ['OURO (XAU)', 'GC=F'],
    ['PRATA (XAG)', 'SI=F'],
    ['BRENT', 'BZ=F'],
    ['WTI', 'CL=F'],
    ['GÁS NATURAL', 'NG=F'],
    ['COBRE', 'HG=F'],
    ['PLATINA', 'PL=F'],
    ['TRIGO', 'ZW=F'],
    ['MILHO', 'ZC=F'],
    ['SOJA', 'ZS=F'],
    ['CAFÉ', 'KC=F'],

    // Câmbio & Forex completos (garante cotação exata, Máx/Mín e Variação reais em tempo real)
    ['USD/BRL', 'BRL=X'],
    ['EUR/BRL', 'EURBRL=X'],
    ['GBP/BRL', 'GBPBRL=X'],
    ['CHF/BRL', 'CHFBRL=X'],
    ['JPY/BRL', 'JPYBRL=X'],
    ['CAD/BRL', 'CADBRL=X'],
    ['AUD/BRL', 'AUDBRL=X'],
    ['CNY/BRL', 'CNYBRL=X'],
    ['ARS/BRL', 'ARSBRL=X'],
    ['EUR/USD', 'EURUSD=X'],
    ['GBP/USD', 'GBPUSD=X'],
    ['USD/JPY', 'USDJPY=X'],
    ['USD/CHF', 'USDCHF=X'],
    ['AUD/USD', 'AUDUSD=X'],
    ['USD/CAD', 'USDCAD=X'],
  ];

  tasks.push(
    (async () => {
      const yahooApiKey = getYahooFinanceKey();
      // Índices (0..13) + Câmbio/Forex (75..) têm prioridade máxima; Ações EUA (14..38), B3 (39..63) e Commodities (64..74) vêm em seguida
      const priorityFirst = [...priorityYahooList.slice(0, 14), ...priorityYahooList.slice(75)];
      const secondaryRest = priorityYahooList.slice(14, 75);

      const processSymbol = async ([dinhSym, ySym]: [string, string]) => {
        const existing = rawQuotes[dinhSym];
        const isCrossFallback =
          existing?.source === 'awesome_api_cross' ||
          existing?.source === 'interbank_fx_live' ||
          existing?.source === 'fx_rate_cross_live';
        const isB3OrBvsp = ySym.endsWith('.SA') || ySym === '%5EBVSP';
        if (
          !isCrossFallback &&
          existing?.source !== 'brapi_api' &&
          existing &&
          existing.price > 0 &&
          existing.high > 0 &&
          existing.low > 0 &&
          existing.high !== existing.low
        ) {
          return;
        }
        try {
          const yData = await fetchYahooQuoteDefensive(ySym, yahooApiKey, isB3OrBvsp ? '5d' : undefined);
          const pDec = dinhSym === 'USD/JPY' ? 2 : dinhSym.includes('/') ? (dinhSym.startsWith('ARS') ? 5 : 4) : 2;
          const parsed = extractYahooChartOHLCV(yData, pDec);

          if (parsed && parsed.price > 0) {
            if (
              existing &&
              existing.source === 'brapi_api' &&
              existing.high > existing.low &&
              existing.marketTimeMs &&
              parsed.marketTimeMs &&
              existing.marketTimeMs >= parsed.marketTimeMs
            ) {
              return;
            }
            liveUpdatesCount += 1;
            const quoteObj = {
              price: parsed.price,
              change: parsed.change,
              changePercent: parsed.changePercent,
              high: parsed.high,
              low: parsed.low,
              previousClose: parsed.previousClose,
              volume: dinhSym.includes('/') ? '--' : parsed.volumeFormatted,
              marketTimeMs: parsed.marketTimeMs,
              source: 'yahoo_finance_api',
            };
            rawQuotes[dinhSym] = quoteObj;
            rawQuotes[dinhSym.toLowerCase()] = quoteObj;
            saveLastValidQuote(dinhSym, quoteObj);

            if (dinhSym.includes('/')) {
              liveRatesReceived = true;
              const [baseC, quoteC] = dinhSym.split('/');
              if (dinhSym === 'USD/BRL') {
                liveRates.BRL = parsed.price;
              } else if (quoteC === 'BRL' && baseC && liveRates.BRL && liveRates.BRL > 0) {
                liveRates[baseC] = Number((liveRates.BRL / parsed.price).toFixed(6));
              } else if (baseC === 'USD' && quoteC) {
                liveRates[quoteC] = parsed.price;
              } else if (quoteC === 'USD' && baseC) {
                liveRates[baseC] = Number((1 / parsed.price).toFixed(6));
              }
            }
          }
        } catch {
          // Em caso de falha de rede, mantém último dado real válido em cache se existir (sem falsos positivos)
          const lastValid = getLastValidStoredQuote(dinhSym);
          if (lastValid && !rawQuotes[dinhSym]) {
            rawQuotes[dinhSym] = lastValid;
          }
        }
      };

      // Prioriza Índices Mundiais (IBOVESPA, S&P 500, NASDAQ, DOW JONES, DAX 40, FTSE 100, RUSSELL 2000) em lotes controlados
      for (let i = 0; i < priorityFirst.length; i += 6) {
        await Promise.allSettled(priorityFirst.slice(i, i + 6).map(processSymbol));
      }

      // Demais ações e commodities em lotes controlados de 10 para evitar rate-limit de CORS
      for (let i = 0; i < secondaryRest.length; i += 10) {
        await Promise.allSettled(secondaryRest.slice(i, i + 10).map(processSymbol));
      }

      // Fallback automático via FMP (VITE_FMP_API_KEY) para índices ou ações ainda ausentes
      const fmpKey = getStoredFmpKey();
      if (fmpKey) {
        const missing = priorityYahooList.filter(([dinhSym]) => !rawQuotes[dinhSym]?.price);
        if (missing.length > 0) {
          try {
            const fmpSyms = missing.map(([, y]) => encodeURIComponent(decodeURIComponent(y))).join(',');
            const fmpData = await fetchJsonWithTimeout(
              `https://financialmodelingprep.com/api/v3/quote/${fmpSyms}?apikey=${encodeURIComponent(fmpKey)}`,
              3200
            );
            if (Array.isArray(fmpData)) {
              const mapByRaw = new Map<string, any>();
              for (const row of fmpData) {
                if (row?.symbol && typeof row.price === 'number' && row.price > 0) {
                  mapByRaw.set(String(row.symbol).toUpperCase(), row);
                }
              }
              for (const [dinhSym, ySym] of missing) {
                const row = mapByRaw.get(decodeURIComponent(ySym).toUpperCase());
                if (row) {
                  liveUpdatesCount += 1;
                  const dec = dinhSym.includes('/') ? 4 : 2;
                  const bounds = normalizePriceBounds(row.price, row.dayHigh || row.price, row.dayLow || row.price, dec);
                  const q = {
                    price: bounds.price,
                    change: roundToDecimals(row.change || 0, dec),
                    changePercent: roundToDecimals(row.changesPercentage || 0, 2),
                    high: bounds.high,
                    low: bounds.low,
                    previousClose: roundToDecimals(row.previousClose || bounds.price, dec),
                    volume: dinhSym.includes('/') ? '--' : row.volume ? `${(row.volume / 1e6).toFixed(1)}M` : '--',
                    source: 'fmp_api',
                  };
                  rawQuotes[dinhSym] = q;
                  saveLastValidQuote(dinhSym, q);
                }
              }
            }
          } catch {
            // ignore
          }
        }
      }

      // Fallback automático via Finnhub (VITE_FINNHUB_API_KEY) para ações americanas ainda ausentes
      const finnhubKey = getStoredFinnhubKey();
      if (finnhubKey) {
        const missingUsStocks = priorityYahooList
          .slice(14, 39)
          .filter(([dinhSym]) => !rawQuotes[dinhSym]?.price)
          .slice(0, 12);
        if (missingUsStocks.length > 0) {
          await Promise.allSettled(
            missingUsStocks.map(async ([dinhSym]) => {
              const fh = await fetchJsonWithTimeout(
                `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(dinhSym)}&token=${encodeURIComponent(finnhubKey)}`,
                2200
              );
              if (fh && fh.c > 0) {
                liveUpdatesCount += 1;
                const bounds = normalizePriceBounds(fh.c, fh.h || fh.c, fh.l || fh.c, 2);
                const q = {
                  price: bounds.price,
                  change: roundToDecimals(fh.d || 0, 2),
                  changePercent: roundToDecimals(fh.dp || 0, 2),
                  high: bounds.high,
                  low: bounds.low,
                  previousClose: roundToDecimals(fh.pc || bounds.price, 2),
                  volume: '--',
                  source: 'finnhub_api',
                };
                rawQuotes[dinhSym] = q;
                saveLastValidQuote(dinhSym, q);
              }
            })
          );
        }
      }
    })()
  );

  await Promise.allSettled(tasks);

  // ==============================================================
  // (5) METAIS SPOT (OURO XAU, PRATA XAG, PLATINA XPT):
  // Valida Spot real por onça troy e recalcula paridade XAG vs XAU
  // ==============================================================
  try {
    const needsSpotMetals =
      rawQuotes['OURO (XAU)']?.source !== 'metals_spot_live' ||
      rawQuotes['PRATA (XAG)']?.source !== 'metals_spot_live';

    let xauSpotPrice: number | null = null;
    let xagSpotPrice: number | null = null;
    let xptSpotPrice: number | null = null;

    if (needsSpotMetals) {
      const [xauRes, xagRes, xptRes] = await Promise.all([
        fetchJsonWithTimeout('https://api.gold-api.com/price/XAU', 2500),
        fetchJsonWithTimeout('https://api.gold-api.com/price/XAG', 2500),
        fetchJsonWithTimeout('https://api.gold-api.com/price/XPT', 2500),
      ]);
      if (typeof xauRes?.price === 'number' && xauRes.price > 0) xauSpotPrice = xauRes.price;
      if (typeof xagRes?.price === 'number' && xagRes.price > 0) xagSpotPrice = xagRes.price;
      if (typeof xptRes?.price === 'number' && xptRes.price > 0) xptSpotPrice = xptRes.price;
    }

    const goldRef = rawQuotes['OURO (XAU)'];
    const silverRef = rawQuotes['PRATA (XAG)'];
    const platRef = rawQuotes['PLATINA'];

    const resolvedGold = xauSpotPrice
      ? Number(xauSpotPrice.toFixed(2))
      : goldRef?.price || 0;

    if (resolvedGold > 0) {
      if (xauSpotPrice) {
        liveUpdatesCount += 1;
        const gPct = goldRef?.changePercent || 0;
        const gChg = Number(((resolvedGold * gPct) / 100).toFixed(2));
        const gHighRatio = goldRef && goldRef.price > 0 ? goldRef.high / goldRef.price : 1.01;
        const gLowRatio = goldRef && goldRef.price > 0 ? goldRef.low / goldRef.price : 0.99;
        const qGold = {
          price: resolvedGold,
          change: gChg,
          changePercent: gPct,
          high: Number(Math.max(resolvedGold, resolvedGold * gHighRatio).toFixed(2)),
          low: Number(Math.min(resolvedGold, resolvedGold * gLowRatio).toFixed(2)),
          volume: goldRef?.volume || 'Spot',
          source: 'metals_spot_live',
        };
        rawQuotes['OURO (XAU)'] = qGold;
        saveLastValidQuote('OURO (XAU)', qGold);
      }

      if (xagSpotPrice || silverRef) {
        if (xagSpotPrice) liveUpdatesCount += 1;
        const silverParity = reconcileSilverSpotParity({
          goldSpotUsd: resolvedGold,
          silverCandidateUsd: xagSpotPrice ?? silverRef?.price ?? null,
          futuresPrice: silverRef?.price,
          futuresHigh: silverRef?.high,
          futuresLow: silverRef?.low,
          futuresPrevClose: silverRef?.previousClose,
        });

        if (silverParity.price > 0) {
          const qSilver = {
            price: silverParity.price,
            change: xagSpotPrice || silverParity.adjustedFromAnomaly ? silverParity.change : silverRef?.change ?? silverParity.change,
            changePercent: silverRef?.changePercent ?? silverParity.changePercent,
            high: silverParity.high,
            low: silverParity.low,
            volume: silverRef?.volume || 'Spot',
            source: xagSpotPrice ? 'metals_spot_live' : 'metals_parity_validated',
          };
          rawQuotes['PRATA (XAG)'] = qSilver;
          saveLastValidQuote('PRATA (XAG)', qSilver);
        }
      }
    }

    if (xptSpotPrice && xptSpotPrice > 0) {
      liveUpdatesCount += 1;
      const ptPrice = Number(xptSpotPrice.toFixed(2));
      const ptPct = platRef?.changePercent || 0;
      const ptChg = Number(((ptPrice * ptPct) / 100).toFixed(2));
      const ptHighRatio = platRef && platRef.price > 0 ? platRef.high / platRef.price : 1.015;
      const ptLowRatio = platRef && platRef.price > 0 ? platRef.low / platRef.price : 0.985;
      const qPlat = {
        price: ptPrice,
        change: ptChg,
        changePercent: ptPct,
        high: Number(Math.max(ptPrice, ptPrice * ptHighRatio).toFixed(2)),
        low: Number(Math.min(ptPrice, ptPrice * ptLowRatio).toFixed(2)),
        volume: platRef?.volume || 'Spot',
        source: 'metals_spot_live',
      };
      rawQuotes['PLATINA'] = qPlat;
      saveLastValidQuote('PLATINA', qPlat);
    }
  } catch {
    // Preserva cotações existentes se Spot Metals oscilar
  }

  // ==============================================================
  // Sobrescreve a matriz com as cotações obtidas em tempo real
  // Tratamento defensivo: Nunca zera um ativo válido
  // ==============================================================
  const updatedAssets = currentAssets.map((asset) => {
    let match =
      rawQuotes[asset.symbol] ||
      rawQuotes[asset.id] ||
      rawQuotes[asset.symbol.toUpperCase()] ||
      rawQuotes[asset.id.toUpperCase()];

    if (!match && asset.category === 'forex') {
      const slash = asset.symbol.includes('/') ? asset.symbol : asset.symbol.replace('_', '/');
      match = rawQuotes[slash] || rawQuotes[asset.symbol.replace('/', '')];
    }

    if (!match && asset.category === 'crypto') {
      const cryptoSym = asset.symbol.includes('/') ? asset.symbol : `${asset.symbol}/USD`;
      match = rawQuotes[cryptoSym] || rawQuotes[asset.symbol.split('/')[0]];
    }

    // Se a chamada da vez oscilou, busca a última cotação válida do cache
    if ((!match || !match.price || match.price <= 0)) {
      const fallbackStored = getLastValidStoredQuote(asset.symbol) || getLastValidStoredQuote(asset.id);
      if (fallbackStored && fallbackStored.price > 0) {
        match = fallbackStored;
      }
    }

    if (match && match.price && match.price > 0) {
      const isIndex = asset.category === 'indices' || asset.currency === 'PTS';
      const resolvedCurrency = isIndex ? 'PTS' : asset.currency;
      const dec = getAssetPriceDecimals(Number(match.price), resolvedCurrency, asset.category);
      const changePct = match.changePercent !== undefined ? roundToDecimals(Number(match.changePercent), 2) : asset.change24h;
      const changeVal = match.change !== undefined
        ? roundToDecimals(Number(match.change), dec)
        : roundToDecimals((changePct / 100) * Number(match.price), dec);
      const bounds = normalizePriceBounds(Number(match.price), Number(match.high), Number(match.low), dec);

      // Gera sparkline dinâmico compatível com a variação real do pregão
      const baseSparkline = asset.sparkline.length > 0 && asset.sparkline[asset.sparkline.length - 1] > 0
        ? [...asset.sparkline.slice(1), bounds.price]
        : [
            roundToDecimals(bounds.price * (1 - (changePct / 100) * 0.8), dec),
            roundToDecimals(bounds.price * (1 - (changePct / 100) * 0.5), dec),
            roundToDecimals(bounds.price * (1 - (changePct / 100) * 0.2), dec),
            roundToDecimals(bounds.price * (1 - (changePct / 100) * 0.1), dec),
            bounds.price,
          ];

      const resolvedVolume =
        asset.category === 'forex'
          ? '--'
          : match.volume && match.volume !== 'N/A'
          ? match.volume
          : asset.volume;

      return {
        ...asset,
        currency: resolvedCurrency,
        price: bounds.price,
        change24h: changePct,
        changeValue: changeVal,
        high24h: bounds.high,
        low24h: bounds.low,
        volume: resolvedVolume,
        sparkline: baseSparkline,
      };
    }

    // Preserva o preço atual se já for maior que 0
    return asset.category === 'forex' && asset.volume !== '--' ? { ...asset, volume: '--' } : asset;
  });

  const syncedRates = buildAlignedMarketRates(updatedAssets, liveRates);
  return { rates: syncedRates, updatedAssets, hasLiveData: liveUpdatesCount > 0, liveRatesReceived };
}

/**
 * Coletor Universal em Tempo Real com agregação multi-fonte e fallback transparente.
 */
export async function fetchCompleteLiveMarketData(
  currentAssets: MarketAsset[]
): Promise<LiveMarketSnapshot> {
  const liveRates: UniversalRates = { USD: 1.0 };
  const rawQuotes: Record<string, any> = {};
  let rawPairs: Record<string, any> = {};
  let fetchedNews: NewsItem[] = [];
  let proxyHasLiveData = false;
  let proxySyncedAt: string | null = null;

  // 1. Tenta obter o universo completo via proxy local /api/market/live se estiver rodando com backend
  try {
    const proxyData = await fetchJsonWithTimeout('/api/market/live', 6500);
    if (proxyData) {
      if (proxyData.rates) {
        for (const [k, v] of Object.entries(proxyData.rates)) {
          if (typeof v === 'number' && Number.isFinite(v) && v > 0) {
            liveRates[k] = v;
          }
        }
      }
      if (proxyData.quotes) Object.assign(rawQuotes, proxyData.quotes);
      if (proxyData.pairs) rawPairs = proxyData.pairs;
      if (Array.isArray(proxyData.news) && proxyData.news.length > 0) fetchedNews = proxyData.news;
      proxyHasLiveData = Boolean(proxyData.hasLiveData);
      proxySyncedAt = typeof proxyData.syncedAt === 'string' && proxyData.syncedAt ? proxyData.syncedAt : null;
    }
  } catch {
    // Ambiente estático sem backend
  }

  // 2. Consulta feeds diretamente no navegador (suplementa e faz fallback transparente)
  const directResult = await fetchLiveMarketDataFromAPIs(currentAssets, rawQuotes);
  if (directResult.liveRatesReceived) {
    for (const [k, v] of Object.entries(directResult.rates)) {
      if (typeof v === 'number' && Number.isFinite(v) && v > 0) {
        liveRates[k] = v;
      }
    }
  }

  const updatedAssets = directResult.updatedAssets;
  const alignedLiveRates = buildAlignedMarketRates(updatedAssets, liveRates);
  const hasLiveData = proxyHasLiveData || directResult.hasLiveData;
  const syncedAt = directResult.hasLiveData
    ? new Date().toISOString()
    : proxyHasLiveData
    ? proxySyncedAt || new Date().toISOString()
    : null;

  // Persiste cache no localStorage somente quando houver cotações reais recebidas
  if (typeof window !== 'undefined' && hasLiveData && updatedAssets.some((a) => a.price > 0)) {
    try {
      localStorage.setItem(ASSETS_CACHE_KEY, JSON.stringify(updatedAssets));
    } catch {
      // ignore
    }
  }

  return {
    rates: alignedLiveRates,
    updatedAssets,
    news: fetchedNews.length > 0 ? fetchedNews : INITIAL_NEWS,
    rawPairs,
    sourceSummary: 'Bolsas Mundiais & B3 • Câmbio Interbancário em Tempo Real • Criptoativos Globais',
    hasLiveData,
    syncedAt,
  };
}

export async function fetchLiveExchangeRates(): Promise<UniversalRates> {
  // 1. Endpoint principal de câmbio configurado no ambiente
  try {
    const awesomeConfiguredUrl = getEnvVar('VITE_AWESOME_ECONOMY_URL');
    const awesomeUrl =
      awesomeConfiguredUrl ||
      'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,CAD-BRL,AUD-BRL,CHF-BRL,JPY-BRL,CNY-BRL,ARS-BRL';
    const awesomeData = await fetchJsonWithTimeout(awesomeUrl, 2800);
    if (awesomeData && awesomeData.USDBRL && awesomeData.USDBRL.bid) {
      const u = parseFloat(awesomeData.USDBRL.bid);
      if (Number.isFinite(u) && u > 0) {
        const rates: UniversalRates = { USD: 1.0, BRL: u };
        const assignIfValid = (pairKey: string, code: string) => {
          const val = awesomeData[pairKey]?.bid ? parseFloat(awesomeData[pairKey].bid) : NaN;
          if (Number.isFinite(val) && val > 0) rates[code] = u / val;
        };
        assignIfValid('EURBRL', 'EUR');
        assignIfValid('GBPBRL', 'GBP');
        assignIfValid('JPYBRL', 'JPY');
        assignIfValid('CADBRL', 'CAD');
        assignIfValid('AUDBRL', 'AUD');
        assignIfValid('CHFBRL', 'CHF');
        assignIfValid('CNYBRL', 'CNY');
        assignIfValid('ARSBRL', 'ARS');
        return rates;
      }
    }
  } catch {
    // continue
  }

  // 2. Fallback em tempo real: Coinbase spot primeiro, Frankfurter/ECB apenas para moedas faltantes
  const merged: UniversalRates = { USD: 1.0 };
  const [cbRes, frankRes] = await Promise.allSettled([
    fetchJsonWithTimeout('https://api.coinbase.com/v2/exchange-rates?currency=USD', 2800),
    fetchJsonWithTimeout('https://api.frankfurter.dev/v1/latest?base=USD', 2800),
  ]);

  if (cbRes.status === 'fulfilled') {
    const cbRates = cbRes.value?.data?.rates;
    if (cbRates && typeof cbRates === 'object') {
      for (const [code, rawVal] of Object.entries(cbRates)) {
        const parsed = parseFloat(String(rawVal));
        if (Number.isFinite(parsed) && parsed > 0) {
          merged[code] = parsed;
        }
      }
    }
  }

  if (frankRes.status === 'fulfilled' && frankRes.value?.rates) {
    for (const [k, v] of Object.entries(frankRes.value.rates)) {
      if (typeof v === 'number' && v > 0 && !merged[k]) {
        merged[k] = v;
      }
    }
  }

  return merged;
}

export interface FinnhubQuoteResult {
  simbolo: string;
  precoAtual: number;
  variacao: number;
  percentualVariacao: number;
  maximaDia: number;
  minimaDia: number;
  abertura: number;
  fechamentoAnterior: number;
}

/**
 * Função de consulta unificada compatível, alimentada 100% por APIs públicas gratuitas
 */
export async function obterCotacaoFinnhub(
  symbol: string,
  _apiKey?: string
): Promise<FinnhubQuoteResult | null> {
  const cleanSym = symbol.toUpperCase().trim();
  const ySymbol = YAHOO_SYMBOLS_MAP[cleanSym] || cleanSym;

  try {
    const yahooKey = getYahooFinanceKey();
    const data = await fetchYahooQuoteDefensive(encodeURIComponent(ySymbol), yahooKey);
    const parsed = extractYahooChartOHLCV(data, 2);
    if (parsed) {
      return {
        simbolo: cleanSym,
        precoAtual: parsed.price,
        variacao: parsed.change,
        percentualVariacao: parsed.changePercent,
        maximaDia: parsed.high,
        minimaDia: parsed.low,
        abertura: parsed.open,
        fechamentoAnterior: parsed.previousClose,
      };
    }
  } catch {
    // ignore
  }

  return null;
}

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function generateAssetCandles(
  currentPrice: number,
  timeframe: string,
  locale: string = 'pt-BR'
): CandlePoint[] {
  let count = 24;
  let intervalMinutes = 60;

  if (timeframe === '1D') {
    count = 24;
    intervalMinutes = 60;
  } else if (timeframe === '5D') {
    count = 30;
    intervalMinutes = 240;
  } else if (timeframe === '1M') {
    count = 30;
    intervalMinutes = 1440;
  } else if (timeframe === '6M') {
    count = 26;
    intervalMinutes = 1440 * 7;
  } else if (timeframe === '1A') {
    count = 52;
    intervalMinutes = 1440 * 7;
  } else {
    count = 60;
    intervalMinutes = 1440 * 30;
  }

  const candles: CandlePoint[] = [];
  let price = (currentPrice > 0 ? currentPrice : 100) * 0.95;
  const now = Date.now();

  for (let i = count; i >= 0; i--) {
    const timeStamp = new Date(now - i * intervalMinutes * 60 * 1000);
    const variance = (Math.random() - 0.48) * (price * 0.02);
    const open = price;
    const close = Math.max(0.01, open + variance);
    const high = Math.max(open, close) + Math.random() * (price * 0.008);
    const low = Math.min(open, close) - Math.random() * (price * 0.008);
    const volume = Math.floor(Math.random() * 50000 + 10000);

    candles.push({
      time: timeframe === '1D'
        ? timeStamp.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
        : timeStamp.toLocaleDateString(locale, { day: '2-digit', month: '2-digit' }),
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
    });

    price = close;
  }

  if (candles.length > 0 && currentPrice > 0) {
    candles[candles.length - 1].close = currentPrice;
  }

  return candles;
}

// ==============================================================
// EXTENDED GLOBAL MARKETS FOR /mercados
// - Ações Europa (20 blue chips europeias)
// - Ações Ásia-Pacífico (16 blue chips Tóquio, Hong Kong, Taiwan, Coreia, Austrália, Singapura, Índia)
// - Ampliação Câmbio & Moedas Mundiais (todos os continentes: Américas, Europa, Ásia, África, Oceania)
// ==============================================================

const EXTENDED_MARKETS_CACHE_KEY = 'dinheuro_extended_markets_cache_v1';

export const EXTENDED_YAHOO_SYMBOLS_MAP: Record<string, string> = {
  // 1. Ações Europa (20)
  'ASML.AS': 'ASML.AS',
  'MC.PA': 'MC.PA',
  'OR.PA': 'OR.PA',
  'TTE.PA': 'TTE.PA',
  'AIR.PA': 'AIR.PA',
  'SU.PA': 'SU.PA',
  'SAP.DE': 'SAP.DE',
  'SIE.DE': 'SIE.DE',
  'ALV.DE': 'ALV.DE',
  'BMW.DE': 'BMW.DE',
  'NESN.SW': 'NESN.SW',
  'NOVN.SW': 'NOVN.SW',
  'UBSG.SW': 'UBSG.SW',
  'SHEL.L': 'SHEL.L',
  'AZN.L': 'AZN.L',
  'HSBA.L': 'HSBA.L',
  'SAN.MC': 'SAN.MC',
  'ITX.MC': 'ITX.MC',
  'NOVO-B.CO': 'NOVO-B.CO',
  'RACE.MI': 'RACE.MI',

  // 2. Ações Ásia-Pacífico (16)
  '7203.T': '7203.T',
  '6758.T': '6758.T',
  '9984.T': '9984.T',
  '8035.T': '8035.T',
  '9983.T': '9983.T',
  '0700.HK': '0700.HK',
  '9988.HK': '9988.HK',
  '1299.HK': '1299.HK',
  '3690.HK': '3690.HK',
  '2330.TW': '2330.TW',
  '005930.KS': '005930.KS',
  'BHP.AX': 'BHP.AX',
  'CBA.AX': 'CBA.AX',
  'D05.SI': 'D05.SI',
  'RELIANCE.NS': 'RELIANCE.NS',
  'TCS.NS': 'TCS.NS',

  // 3. Ampliação Câmbio & Moedas Mundiais (direct Yahoo crosses)
  'MXN/BRL': 'MXNBRL=X',
  'USD/MXN': 'MXN=X',
  'CLP/BRL': 'CLPBRL=X',
  'COP/BRL': 'COPBRL=X',
  'NOK/BRL': 'NOKBRL=X',
  'SEK/BRL': 'SEKBRL=X',
  'DKK/BRL': 'DKKBRL=X',
  'INR/BRL': 'INRBRL=X',
  'KRW/BRL': 'KRWBRL=X',
  'HKD/BRL': 'HKDBRL=X',
  'SGD/BRL': 'SGDBRL=X',
  'ILS/BRL': 'ILSBRL=X',
  'USD/CNY': 'USDCNY=X',
  'USD/INR': 'INR=X',
  'USD/KRW': 'KRW=X',
  'USD/SGD': 'SGD=X',
  'ZAR/BRL': 'ZARBRL=X',
  'USD/ZAR': 'ZAR=X',
  'NZD/BRL': 'NZDBRL=X',
  'NZD/USD': 'NZDUSD=X',
  // USD base legs used to derive XXX/BRL pairs not listed directly on Yahoo
  'USD/PEN': 'PEN=X',
  'USD/PLN': 'PLN=X',
  'USD/TRY': 'TRY=X',
  'USD/AED': 'AED=X',
  'USD/SAR': 'SAR=X',
  'USD/EGP': 'EGP=X',
  'USD/NGN': 'NGN=X',
  'USD/MAD': 'MAD=X',
};

export const EXTENDED_MARKETS_ASSETS: MarketAsset[] = [
  // Ações Europa (20)
  { id: 'asml_as', symbol: 'ASML.AS', name: 'ASML Holding N.V. (Amsterdam)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇳🇱' },
  { id: 'mc_pa', symbol: 'MC.PA', name: 'LVMH Moët Hennessy (Paris)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇫🇷' },
  { id: 'or_pa', symbol: 'OR.PA', name: "L'Oréal S.A. (Paris)", category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇫🇷' },
  { id: 'tte_pa', symbol: 'TTE.PA', name: 'TotalEnergies SE (Paris)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇫🇷' },
  { id: 'air_pa', symbol: 'AIR.PA', name: 'Airbus SE (Paris)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇫🇷' },
  { id: 'su_pa', symbol: 'SU.PA', name: 'Schneider Electric SE (Paris)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇫🇷' },
  { id: 'sap_de', symbol: 'SAP.DE', name: 'SAP SE (Frankfurt)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇪' },
  { id: 'sie_de', symbol: 'SIE.DE', name: 'Siemens AG (Frankfurt)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇪' },
  { id: 'alv_de', symbol: 'ALV.DE', name: 'Allianz SE (Frankfurt)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇪' },
  { id: 'bmw_de', symbol: 'BMW.DE', name: 'BMW AG (Frankfurt)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇪' },
  { id: 'nesn_sw', symbol: 'NESN.SW', name: 'Nestlé S.A. (Zurich)', category: 'stocks_eu', price: 0, currency: 'CHF', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇭' },
  { id: 'novn_sw', symbol: 'NOVN.SW', name: 'Novartis AG (Zurich)', category: 'stocks_eu', price: 0, currency: 'CHF', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇭' },
  { id: 'ubsg_sw', symbol: 'UBSG.SW', name: 'UBS Group AG (Zurich)', category: 'stocks_eu', price: 0, currency: 'CHF', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇭' },
  { id: 'shel_l', symbol: 'SHEL.L', name: 'Shell PLC (London)', category: 'stocks_eu', price: 0, currency: 'GBP', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇬🇧' },
  { id: 'azn_l', symbol: 'AZN.L', name: 'AstraZeneca PLC (London)', category: 'stocks_eu', price: 0, currency: 'GBP', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇬🇧' },
  { id: 'hsba_l', symbol: 'HSBA.L', name: 'HSBC Holdings PLC (London)', category: 'stocks_eu', price: 0, currency: 'GBP', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇬🇧' },
  { id: 'san_mc', symbol: 'SAN.MC', name: 'Banco Santander S.A. (Madrid)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇪🇸' },
  { id: 'itx_mc', symbol: 'ITX.MC', name: 'Inditex S.A. / Zara (Madrid)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇪🇸' },
  { id: 'novob_co', symbol: 'NOVO-B.CO', name: 'Novo Nordisk A/S (Copenhagen)', category: 'stocks_eu', price: 0, currency: 'DKK', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇰' },
  { id: 'race_mi', symbol: 'RACE.MI', name: 'Ferrari N.V. (Milan)', category: 'stocks_eu', price: 0, currency: 'EUR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇮🇹' },

  // Ações Ásia-Pacífico (16)
  { id: 'toyota_t', symbol: '7203.T', name: 'Toyota Motor Corp. (Tóquio)', category: 'stocks_asia', price: 0, currency: 'JPY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'sony_t', symbol: '6758.T', name: 'Sony Group Corp. (Tóquio)', category: 'stocks_asia', price: 0, currency: 'JPY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'softbank_t', symbol: '9984.T', name: 'SoftBank Group Corp. (Tóquio)', category: 'stocks_asia', price: 0, currency: 'JPY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'tel_t', symbol: '8035.T', name: 'Tokyo Electron Ltd. (Tóquio)', category: 'stocks_asia', price: 0, currency: 'JPY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'fastret_t', symbol: '9983.T', name: 'Fast Retailing / Uniqlo (Tóquio)', category: 'stocks_asia', price: 0, currency: 'JPY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇯🇵' },
  { id: 'tencent_hk', symbol: '0700.HK', name: 'Tencent Holdings Ltd. (Hong Kong)', category: 'stocks_asia', price: 0, currency: 'HKD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇭🇰' },
  { id: 'alibaba_hk', symbol: '9988.HK', name: 'Alibaba Group Holding (Hong Kong)', category: 'stocks_asia', price: 0, currency: 'HKD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇭🇰' },
  { id: 'aia_hk', symbol: '1299.HK', name: 'AIA Group Ltd. (Hong Kong)', category: 'stocks_asia', price: 0, currency: 'HKD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇭🇰' },
  { id: 'meituan_hk', symbol: '3690.HK', name: 'Meituan (Hong Kong)', category: 'stocks_asia', price: 0, currency: 'HKD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇭🇰' },
  { id: 'tsmc_tw', symbol: '2330.TW', name: 'TSMC Taiwan Semiconductor (Taipei)', category: 'stocks_asia', price: 0, currency: 'TWD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇹🇼' },
  { id: 'samsung_ks', symbol: '005930.KS', name: 'Samsung Electronics Co. (Seul)', category: 'stocks_asia', price: 0, currency: 'KRW', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇰🇷' },
  { id: 'bhp_ax', symbol: 'BHP.AX', name: 'BHP Group Ltd. (Sydney)', category: 'stocks_asia', price: 0, currency: 'AUD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇺' },
  { id: 'cba_ax', symbol: 'CBA.AX', name: 'Commonwealth Bank (Sydney)', category: 'stocks_asia', price: 0, currency: 'AUD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇺' },
  { id: 'dbs_si', symbol: 'D05.SI', name: 'DBS Group Holdings (Singapura)', category: 'stocks_asia', price: 0, currency: 'SGD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇸🇬' },
  { id: 'reliance_ns', symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd. (Mumbai)', category: 'stocks_asia', price: 0, currency: 'INR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇮🇳' },
  { id: 'tcs_ns', symbol: 'TCS.NS', name: 'Tata Consultancy Services (Mumbai)', category: 'stocks_asia', price: 0, currency: 'INR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇮🇳' },

  // Câmbio & Moedas Mundiais — Todos os Continentes (26 pares adicionais, preenchidos em tempo real)
  // Américas
  { id: 'mxn_brl', symbol: 'MXN/BRL', name: 'Peso Mexicano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇲🇽' },
  { id: 'usd_mxn', symbol: 'USD/MXN', name: 'Dólar Americano / Peso Mexicano', category: 'forex', price: 0, currency: 'MXN', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇲🇽' },
  { id: 'clp_brl', symbol: 'CLP/BRL', name: 'Peso Chileno / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇱' },
  { id: 'cop_brl', symbol: 'COP/BRL', name: 'Peso Colombiano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇴' },
  { id: 'pen_brl', symbol: 'PEN/BRL', name: 'Sol Peruano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇵🇪' },
  // Europa (Não-Euro)
  { id: 'nok_brl', symbol: 'NOK/BRL', name: 'Coroa Norueguesa / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇳🇴' },
  { id: 'sek_brl', symbol: 'SEK/BRL', name: 'Coroa Sueca / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇸🇪' },
  { id: 'dkk_brl', symbol: 'DKK/BRL', name: 'Coroa Dinamarquesa / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇩🇰' },
  { id: 'pln_brl', symbol: 'PLN/BRL', name: 'Zlóti Polonês / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇵🇱' },
  { id: 'try_brl', symbol: 'TRY/BRL', name: 'Lira Turca / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇹🇷' },
  // Ásia & Oriente Médio
  { id: 'inr_brl', symbol: 'INR/BRL', name: 'Rupia Indiana / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇮🇳' },
  { id: 'krw_brl', symbol: 'KRW/BRL', name: 'Won Sul-Coreano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇰🇷' },
  { id: 'hkd_brl', symbol: 'HKD/BRL', name: 'Dólar de Hong Kong / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇭🇰' },
  { id: 'sgd_brl', symbol: 'SGD/BRL', name: 'Dólar de Singapura / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇸🇬' },
  { id: 'aed_brl', symbol: 'AED/BRL', name: 'Dirham dos Emirados / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇦🇪' },
  { id: 'sar_brl', symbol: 'SAR/BRL', name: 'Riyal Saudita / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇸🇦' },
  { id: 'ils_brl', symbol: 'ILS/BRL', name: 'Novo Shekel Israelense / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇮🇱' },
  { id: 'usd_cny', symbol: 'USD/CNY', name: 'Dólar Americano / Yuan Chinês', category: 'forex', price: 0, currency: 'CNY', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇨🇳' },
  { id: 'usd_inr', symbol: 'USD/INR', name: 'Dólar Americano / Rupia Indiana', category: 'forex', price: 0, currency: 'INR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇮🇳' },
  { id: 'usd_krw', symbol: 'USD/KRW', name: 'Dólar Americano / Won Sul-Coreano', category: 'forex', price: 0, currency: 'KRW', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇰🇷' },
  { id: 'usd_sgd', symbol: 'USD/SGD', name: 'Dólar Americano / Dólar de Singapura', category: 'forex', price: 0, currency: 'SGD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇸🇬' },
  // África
  { id: 'zar_brl', symbol: 'ZAR/BRL', name: 'Rand Sul-Africano / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇿🇦' },
  { id: 'usd_zar', symbol: 'USD/ZAR', name: 'Dólar Americano / Rand Sul-Africano', category: 'forex', price: 0, currency: 'ZAR', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇿🇦' },
  { id: 'egp_brl', symbol: 'EGP/BRL', name: 'Libra Egípcia / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇪🇬' },
  { id: 'ngn_brl', symbol: 'NGN/BRL', name: 'Naira Nigeriana / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇳🇬' },
  { id: 'mad_brl', symbol: 'MAD/BRL', name: 'Dirham Marroquino / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇲🇦' },
  // Oceania
  { id: 'nzd_brl', symbol: 'NZD/BRL', name: 'Dólar Neozelandês / Real Brasileiro', category: 'forex', price: 0, currency: 'BRL', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇳🇿' },
  { id: 'nzd_usd', symbol: 'NZD/USD', name: 'Dólar Neozelandês / Dólar Americano', category: 'forex', price: 0, currency: 'USD', change24h: 0, changeValue: 0, high24h: 0, low24h: 0, volume: '--', sparkline: [0, 0, 0, 0, 0], flag: '🇳🇿' },
];

export function getExtendedMarketsInitialAssets(): MarketAsset[] {
  if (typeof window === 'undefined') return EXTENDED_MARKETS_ASSETS;
  try {
    const cached = localStorage.getItem(EXTENDED_MARKETS_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const byId = new Map<string, MarketAsset>();
        for (const item of parsed) {
          if (item && item.id) byId.set(item.id, item);
        }
        return EXTENDED_MARKETS_ASSETS.map((base) => {
          const hit = byId.get(base.id);
          if (hit && hit.price > 0) {
            const dec = getAssetPriceDecimals(hit.price, base.currency, base.category);
            const bounds = normalizePriceBounds(hit.price, hit.high24h, hit.low24h, dec);
            return {
              ...base,
              price: bounds.price,
              change24h: roundToDecimals(hit.change24h ?? base.change24h, 2),
              changeValue: roundToDecimals(hit.changeValue ?? base.changeValue, dec),
              high24h: bounds.high,
              low24h: bounds.low,
              volume: base.category === 'forex' ? '--' : (hit.volume && hit.volume !== 'N/A' ? hit.volume : base.volume),
              sparkline: Array.isArray(hit.sparkline) && hit.sparkline.some((v) => v > 0) ? hit.sparkline : base.sparkline,
            };
          }
          return base;
        });
      }
    }
  } catch {
    // ignore
  }
  return EXTENDED_MARKETS_ASSETS;
}

export async function fetchExtendedMarketsAssets(
  currentExtended: MarketAsset[],
  baseRates: UniversalRates
): Promise<{ updatedAssets: MarketAsset[]; extendedRates: UniversalRates }> {
  const extendedRates: UniversalRates = { USD: 1.0, ...baseRates };
  const rawQuotes: Record<string, any> = {};
  const yahooKey = getYahooFinanceKey();

  // 1. Fetch global FX rates in one lightweight request to guarantee live parity across all continents
  const coinbaseTask = (async () => {
    try {
      const cbData = await fetchJsonWithTimeout('https://api.coinbase.com/v2/exchange-rates?currency=USD', 3000);
      const cbRates = cbData?.data?.rates;
      if (cbRates && typeof cbRates === 'object') {
        const currencies = [
          'BRL', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'CNY', 'HKD', 'TWD', 'KRW', 'SGD',
          'INR', 'NZD', 'MXN', 'CLP', 'COP', 'PEN', 'ZAR', 'EGP', 'NGN', 'MAD', 'NOK', 'SEK',
          'DKK', 'PLN', 'TRY', 'AED', 'SAR', 'ILS', 'ARS',
        ];
        for (const code of currencies) {
          const parsed = parseFloat(cbRates[code]);
          if (Number.isFinite(parsed) && parsed > 0) {
            if (!baseRates[code] || !['BRL', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'CNY', 'ARS'].includes(code)) {
              extendedRates[code] = parsed;
            }
          }
        }
      }
    } catch {
      // keep existing rates
    }
  })();

  // 2. Fetch live international quotes for European stocks, Asia-Pacific stocks & world FX pairs
  const yahooEntries = Object.entries(EXTENDED_YAHOO_SYMBOLS_MAP);
  const batchSize = 12;
  const yahooTask = (async () => {
    for (let i = 0; i < yahooEntries.length; i += batchSize) {
      const slice = yahooEntries.slice(i, i + batchSize);
      await Promise.allSettled(
        slice.map(async ([sym, ySym]) => {
          try {
            const yData = await fetchYahooQuoteDefensive(encodeURIComponent(ySym), yahooKey);
            const isSmallFx = sym.includes('/');
            const parsed = extractYahooChartOHLCV(yData, isSmallFx ? 5 : 2);
            if (parsed && parsed.price > 0) {
              const q = {
                price: parsed.price,
                change: parsed.change,
                changePercent: parsed.changePercent,
                high: parsed.high,
                low: parsed.low,
                volume: isSmallFx ? '--' : parsed.volumeFormatted,
                source: 'yahoo_finance_api',
              };
              rawQuotes[sym] = q;
              saveLastValidQuote(sym, q);

              // Also feed live USD/XXX rates when returned a USD/XXX pair
              if (sym.startsWith('USD/')) {
                const targetCode = sym.split('/')[1];
                if (targetCode && parsed.price > 0 && targetCode !== 'CNY') {
                  extendedRates[targetCode] = parsed.price;
                }
              }
            }
          } catch {
            const cached = getLastValidStoredQuote(sym);
            if (cached && cached.price > 0) {
              rawQuotes[sym] = cached;
            }
          }
        })
      );
    }
  })();

  await Promise.allSettled([coinbaseTask, yahooTask]);

  const usdToBrl = extendedRates.BRL && extendedRates.BRL > 0 ? extendedRates.BRL : 0;

  // 3. Derive XXX/BRL and USD/XXX live values from Coinbase/Yahoo cross rates for any missing FX pairs
  const updatedAssets = currentExtended.map((asset) => {
    let match = rawQuotes[asset.symbol] || rawQuotes[asset.id.toUpperCase()];

    if ((!match || !match.price || match.price <= 0) && asset.category === 'forex') {
      const [baseCur, quoteCur] = asset.symbol.split('/');
      if (quoteCur === 'BRL' && baseCur && extendedRates[baseCur] > 0) {
        const usdLegQuote = rawQuotes[`USD/${baseCur}`];
        const derivedPrice = usdToBrl / extendedRates[baseCur];
        const decimals = getAssetPriceDecimals(derivedPrice, asset.currency, asset.category);
        const cleanPrice = roundToDecimals(derivedPrice, decimals);
        const pct = usdLegQuote?.changePercent !== undefined ? roundToDecimals(-usdLegQuote.changePercent, 2) : asset.change24h;
        const chg = roundToDecimals((cleanPrice * pct) / 100, decimals);
        const bounds = normalizePriceBounds(cleanPrice, cleanPrice, cleanPrice, decimals);
        match = {
          price: bounds.price,
          change: chg,
          changePercent: pct,
          high: bounds.high,
          low: bounds.low,
          volume: '--',
          source: 'interbank_cross_live',
        };
      } else if (baseCur === 'USD' && quoteCur && extendedRates[quoteCur] > 0) {
        const decimals = getAssetPriceDecimals(extendedRates[quoteCur], asset.currency, asset.category);
        const cleanPrice = roundToDecimals(extendedRates[quoteCur], decimals);
        const bounds = normalizePriceBounds(cleanPrice, cleanPrice, cleanPrice, decimals);
        match = {
          price: bounds.price,
          change: 0,
          changePercent: 0,
          high: bounds.high,
          low: bounds.low,
          volume: '--',
          source: 'interbank_cross_live',
        };
      } else if (quoteCur === 'USD' && baseCur && extendedRates[baseCur] > 0) {
        const derived = 1 / extendedRates[baseCur];
        const decimals = getAssetPriceDecimals(derived, asset.currency, asset.category);
        const cleanPrice = roundToDecimals(derived, decimals);
        const bounds = normalizePriceBounds(cleanPrice, cleanPrice, cleanPrice, decimals);
        match = {
          price: bounds.price,
          change: 0,
          changePercent: 0,
          high: bounds.high,
          low: bounds.low,
          volume: '--',
          source: 'interbank_cross_live',
        };
      }
    }

    if (!match || !match.price || match.price <= 0) {
      const last = getLastValidStoredQuote(asset.symbol);
      if (last && last.price > 0) {
        match = last;
      }
    }

    if (match && match.price > 0) {
      const dec = getAssetPriceDecimals(Number(match.price), asset.currency, asset.category);
      const bounds = normalizePriceBounds(Number(match.price), Number(match.high), Number(match.low), dec);
      const pct = match.changePercent !== undefined ? roundToDecimals(Number(match.changePercent), 2) : asset.change24h;
      const chg =
        match.change !== undefined
          ? roundToDecimals(Number(match.change), dec)
          : roundToDecimals((pct / 100) * bounds.price, dec);
      const sparkline =
        asset.sparkline.length > 0 && asset.sparkline[asset.sparkline.length - 1] > 0
          ? [...asset.sparkline.slice(1), bounds.price]
          : [
              roundToDecimals(bounds.price * (1 - (pct / 100) * 0.8), dec),
              roundToDecimals(bounds.price * (1 - (pct / 100) * 0.5), dec),
              roundToDecimals(bounds.price * (1 - (pct / 100) * 0.2), dec),
              roundToDecimals(bounds.price * (1 - (pct / 100) * 0.1), dec),
              bounds.price,
            ];

      const resolvedVolume =
        asset.category === 'forex'
          ? '--'
          : match.volume && match.volume !== 'N/A'
          ? match.volume
          : asset.volume;

      return {
        ...asset,
        price: bounds.price,
        change24h: pct,
        changeValue: chg,
        high24h: bounds.high,
        low24h: bounds.low,
        volume: resolvedVolume,
        sparkline,
      };
    }

    return asset.category === 'forex' && asset.volume !== '--' ? { ...asset, volume: '--' } : asset;
  });

  if (typeof window !== 'undefined' && updatedAssets.some((a) => a.price > 0)) {
    try {
      localStorage.setItem(EXTENDED_MARKETS_CACHE_KEY, JSON.stringify(updatedAssets));
    } catch {
      // ignore
    }
  }

  return { updatedAssets, extendedRates };
}

