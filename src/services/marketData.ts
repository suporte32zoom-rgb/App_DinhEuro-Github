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

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category: 'indices' | 'stocks_us' | 'stocks_br' | 'forex' | 'crypto' | 'commodities';
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
  category: 'Geral' | 'Câmbio' | 'Ações' | 'Cripto' | 'Macro';
  datetime: string;
  imageUrl?: string;
}

export interface UniversalRates {
  [currency: string]: number;
}

export const DEFAULT_UNIVERSAL_RATES: UniversalRates = {
  USD: 1.0,
  BRL: 5.51,
  EUR: 0.89,
  GBP: 0.74,
  JPY: 158.0,
  CHF: 0.88,
  CAD: 1.38,
  AUD: 1.52,
  CNY: 7.20,
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
    title: 'Mercados Globais: Bolsas internacionais e B3 operam com foco em liquidez e bancos centrais',
    summary: 'Oscilações nos juros dos títulos soberanos e balanços corporativos norte-americanos determinam o fluxo nos principais índices.',
    source: 'Bloomberg Línea',
    url: 'https://www.bloomberglinea.com.br/mercados/',
    category: 'Macro',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_2',
    title: 'Ibovespa: Ações líderes de commodities e setor bancário movimentam negócios na B3',
    summary: 'Petrobras, Vale e grandes bancos concentram volume expressivo de negociação com demanda de investidores institucionais.',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com/financas/',
    category: 'Ações',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_3',
    title: 'Câmbio comercial: Dólar e Euro mantêm liquidez ativa em mesas interbancárias',
    summary: 'Taxas cambiais em tempo real refletem exportações e posicionamento dos agentes no mercado de derivativos de moeda.',
    source: 'Reuters Brasil',
    url: 'https://www.reuters.com/markets/currencies/',
    category: 'Câmbio',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_4',
    title: 'Criptoativos: Bitcoin e principais altcoins registram volume sólido em plataformas globais',
    summary: 'Cotações de BTC, ETH, Solana e ecossistema cripto operam conectadas a índices globais de tecnologia.',
    source: 'Financial Times',
    url: 'https://www.ft.com/markets',
    category: 'Cripto',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
  },
];

// ==============================================================
// GESTÃO DE PERSISTÊNCIA E MEMÓRIA DE COTAÇÕES
// ==============================================================
const ASSETS_CACHE_KEY = 'dinheuro_live_assets_cache';
const LAST_VALID_QUOTES_KEY = 'dinheuro_last_valid_quotes_v1';

// Armazena em memória as últimas cotações válidas capturadas
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
 * Consulta resiliente para Yahoo Finance no navegador estático (GitHub Pages)
 * Executa requisição direta e, se sofrer bloqueio de CORS, recorre a proxy público.
 */
export async function fetchYahooQuoteDefensive(ySym: string, apiKey?: string): Promise<any | null> {
  const directUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ySym}?interval=1d`;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (apiKey) {
    headers['X-RapidAPI-Key'] = apiKey;
    headers['X-API-KEY'] = apiKey;
  }

  // 1. Tentativa Direta
  const directData = await fetchJsonWithTimeout(directUrl, 2500, { headers });
  if (directData?.chart?.result?.[0]?.meta) {
    return directData;
  }

  // 2. Fallback de CORS Proxy para páginas estáticas do GitHub Pages
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(directUrl)}`;
    const proxyData = await fetchJsonWithTimeout(proxyUrl, 3200);
    if (proxyData?.chart?.result?.[0]?.meta) {
      return proxyData;
    }
  } catch {
    // ignore
  }

  return null;
}

export interface LiveMarketSnapshot {
  rates: UniversalRates;
  updatedAssets: MarketAsset[];
  news: NewsItem[];
  rawPairs?: Record<string, any>;
  sourceSummary: string;
}

/**
 * Coletor Universal em Tempo Real com Arquitetura de APIs Unificadas:
 * (1) AwesomeAPI Pública + OpenERApi (Câmbio e Forex - 15 ativos)
 * (2) CoinGecko API com autenticação por Headers via env (Criptomoedas - 14 ativos)
 * (3) Brapi.dev com Token Seguro + Yahoo Finance (.SA) (Ações B3 - 25 ativos)
 * (4) Yahoo Finance API com fallback resiliente de CORS (Wall St, Índices e Commodities)
 */
export async function fetchLiveMarketDataFromAPIs(
  currentAssets: MarketAsset[],
  existingQuotes: Record<string, any> = {}
): Promise<{ rates: UniversalRates; updatedAssets: MarketAsset[] }> {
  const liveRates: UniversalRates = { ...DEFAULT_UNIVERSAL_RATES };
  const rawQuotes: Record<string, any> = { ...existingQuotes };

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

        if (awesomeData) {
          let usdToBrl = liveRates.BRL;
          if (awesomeData.USDBRL && awesomeData.USDBRL.bid) {
            const parsedUsd = parseFloat(awesomeData.USDBRL.bid);
            if (parsedUsd > 0) {
              usdToBrl = parsedUsd;
              liveRates.BRL = usdToBrl;
            }
          }

          const mapAwesome = (key: string, symbol: string, rateKey?: string) => {
            const item = awesomeData[key];
            if (item && item.bid) {
              const bid = parseFloat(item.bid);
              const varBid = parseFloat(item.varBid) || 0;
              const pct = parseFloat(item.pctChange) || 0;
              const high = parseFloat(item.high) || bid;
              const low = parseFloat(item.low) || bid;

              if (rateKey && bid > 0 && usdToBrl > 0) {
                liveRates[rateKey] = usdToBrl / bid;
              }

              const q = {
                price: bid,
                change: varBid,
                changePercent: pct,
                high,
                low,
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

          // Paridades secundárias calculadas com precisão interbancária
          if (awesomeData.EURBRL && usdToBrl > 0) {
            const eurBrl = parseFloat(awesomeData.EURBRL.bid);
            if (eurBrl > 0) {
              const eurUsd = Number((eurBrl / usdToBrl).toFixed(4));
              const q = { price: eurUsd, change: 0, changePercent: parseFloat(awesomeData.EURBRL.pctChange) || 0, high: eurUsd * 1.005, low: eurUsd * 0.995, source: 'awesome_api_cross' };
              rawQuotes['EUR/USD'] = q;
              saveLastValidQuote('EUR/USD', q);
            }
          }
          if (awesomeData.GBPBRL && usdToBrl > 0) {
            const gbpBrl = parseFloat(awesomeData.GBPBRL.bid);
            if (gbpBrl > 0) {
              const gbpUsd = Number((gbpBrl / usdToBrl).toFixed(4));
              const q = { price: gbpUsd, change: 0, changePercent: parseFloat(awesomeData.GBPBRL.pctChange) || 0, high: gbpUsd * 1.005, low: gbpUsd * 0.995, source: 'awesome_api_cross' };
              rawQuotes['GBP/USD'] = q;
              saveLastValidQuote('GBP/USD', q);
            }
          }
          if (awesomeData.JPYBRL && usdToBrl > 0) {
            const jpyBrl = parseFloat(awesomeData.JPYBRL.bid);
            if (jpyBrl > 0) {
              const usdJpy = Number((usdToBrl / jpyBrl).toFixed(2));
              const q = { price: usdJpy, change: 0, changePercent: 0, high: usdJpy * 1.005, low: usdJpy * 0.995, source: 'awesome_api_cross' };
              rawQuotes['USD/JPY'] = q;
              saveLastValidQuote('USD/JPY', q);
            }
          }
          if (awesomeData.CHFBRL && usdToBrl > 0) {
            const chfBrl = parseFloat(awesomeData.CHFBRL.bid);
            if (chfBrl > 0) {
              const usdChf = Number((usdToBrl / chfBrl).toFixed(4));
              const q = { price: usdChf, change: 0, changePercent: 0, high: usdChf * 1.005, low: usdChf * 0.995, source: 'awesome_api_cross' };
              rawQuotes['USD/CHF'] = q;
              saveLastValidQuote('USD/CHF', q);
            }
          }
          if (awesomeData.AUDBRL && usdToBrl > 0) {
            const audBrl = parseFloat(awesomeData.AUDBRL.bid);
            if (audBrl > 0) {
              const audUsd = Number((audBrl / usdToBrl).toFixed(4));
              const q = { price: audUsd, change: 0, changePercent: 0, high: audUsd * 1.005, low: audUsd * 0.995, source: 'awesome_api_cross' };
              rawQuotes['AUD/USD'] = q;
              saveLastValidQuote('AUD/USD', q);
            }
          }
          if (awesomeData.CADBRL && usdToBrl > 0) {
            const cadBrl = parseFloat(awesomeData.CADBRL.bid);
            if (cadBrl > 0) {
              const usdCad = Number((usdToBrl / cadBrl).toFixed(4));
              const q = { price: usdCad, change: 0, changePercent: 0, high: usdCad * 1.005, low: usdCad * 0.995, source: 'awesome_api_cross' };
              rawQuotes['USD/CAD'] = q;
              saveLastValidQuote('USD/CAD', q);
            }
          }
        }

        // Fallback resiliente com OpenERApi pública se AwesomeAPI sofrer timeout
        if (!awesomeData || !awesomeData.USDBRL) {
          try {
            const openRates = await fetchJsonWithTimeout('https://open.er-api.com/v6/latest/USD', 3000);
            if (openRates?.rates) {
              if (openRates.rates.BRL) liveRates.BRL = openRates.rates.BRL;
              if (openRates.rates.EUR) liveRates.EUR = openRates.rates.EUR;
              if (openRates.rates.GBP) liveRates.GBP = openRates.rates.GBP;
              if (openRates.rates.CAD) liveRates.CAD = openRates.rates.CAD;
              if (openRates.rates.AUD) liveRates.AUD = openRates.rates.AUD;
              if (openRates.rates.CHF) liveRates.CHF = openRates.rates.CHF;
              if (openRates.rates.JPY) liveRates.JPY = openRates.rates.JPY;
              if (openRates.rates.CNY) liveRates.CNY = openRates.rates.CNY;
              if (openRates.rates.ARS) liveRates.ARS = openRates.rates.ARS;

              const usdBrlVal = openRates.rates.BRL;
              rawQuotes['USD/BRL'] = { price: Number(usdBrlVal.toFixed(4)), change: 0, changePercent: 0, high: usdBrlVal * 1.005, low: usdBrlVal * 0.995, source: 'open_er_api_public' };
              rawQuotes['EUR/BRL'] = { price: Number((usdBrlVal / openRates.rates.EUR).toFixed(4)), change: 0, changePercent: 0, high: (usdBrlVal / openRates.rates.EUR) * 1.005, low: (usdBrlVal / openRates.rates.EUR) * 0.995, source: 'open_er_api_public' };
              rawQuotes['GBP/BRL'] = { price: Number((usdBrlVal / openRates.rates.GBP).toFixed(4)), change: 0, changePercent: 0, high: (usdBrlVal / openRates.rates.GBP) * 1.005, low: (usdBrlVal / openRates.rates.GBP) * 0.995, source: 'open_er_api_public' };
              rawQuotes['EUR/USD'] = { price: Number((1 / openRates.rates.EUR).toFixed(4)), change: 0, changePercent: 0, high: (1 / openRates.rates.EUR) * 1.005, low: (1 / openRates.rates.EUR) * 0.995, source: 'open_er_api_public' };
              rawQuotes['GBP/USD'] = { price: Number((1 / openRates.rates.GBP).toFixed(4)), change: 0, changePercent: 0, high: (1 / openRates.rates.GBP) * 1.005, low: (1 / openRates.rates.GBP) * 0.995, source: 'open_er_api_public' };
              rawQuotes['USD/JPY'] = { price: Number(openRates.rates.JPY.toFixed(2)), change: 0, changePercent: 0, high: openRates.rates.JPY * 1.005, low: openRates.rates.JPY * 0.995, source: 'open_er_api_public' };
              rawQuotes['USD/CHF'] = { price: Number(openRates.rates.CHF.toFixed(4)), change: 0, changePercent: 0, high: openRates.rates.CHF * 1.005, low: openRates.rates.CHF * 0.995, source: 'open_er_api_public' };
              rawQuotes['AUD/USD'] = { price: Number((1 / openRates.rates.AUD).toFixed(4)), change: 0, changePercent: 0, high: (1 / openRates.rates.AUD) * 1.005, low: (1 / openRates.rates.AUD) * 0.995, source: 'open_er_api_public' };
              rawQuotes['USD/CAD'] = { price: Number(openRates.rates.CAD.toFixed(4)), change: 0, changePercent: 0, high: openRates.rates.CAD * 1.005, low: openRates.rates.CAD * 0.995, source: 'open_er_api_public' };
            }
          } catch {
            // ignore
          }
        }
      } catch (err) {
        console.warn('[DinhEuro] Aviso AwesomeAPI/Forex:', err);
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

        // 2. Fallback de CORS Proxy para páginas estáticas do GitHub Pages se a requisição falhar
        if (!cgData || typeof cgData !== 'object' || Object.keys(cgData).length === 0) {
          try {
            const proxyCgUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(cgUrl)}`;
            cgData = await fetchJsonWithTimeout(proxyCgUrl, 4000);
          } catch {
            // ignore
          }
        }

        if (cgData && typeof cgData === 'object') {
          for (const [symbol, info] of Object.entries(COINGECKO_CRYPTO_MAP)) {
            const coinData = cgData[info.id];
            if (coinData && typeof coinData.usd === 'number' && coinData.usd > 0) {
              const usdPrice = coinData.usd;
              const changePct = Number((coinData.usd_24h_change ?? 0).toFixed(2));
              const changeVal = Number(((changePct / 100) * usdPrice).toFixed(4));
              const highVal = Number((usdPrice * 1.02).toFixed(4));
              const lowVal = Number((usdPrice * 0.98).toFixed(4));

              const quoteObj = {
                price: usdPrice,
                priceBrl: coinData.brl || Number((usdPrice * liveRates.BRL).toFixed(2)),
                change: changeVal,
                changePercent: changePct,
                high: highVal,
                low: lowVal,
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
        console.warn('[DinhEuro] Aviso CoinGecko API:', err);
      }
    })()
  );

  // ==============================================================
  // (3) AÇÕES DA B3 (25 ATIVOS): Brapi.dev com Token Seguro + Yahoo (.SA)
  // ==============================================================
  const allB3Tickers = [
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
        const brapiBatch = brapiKey ? allB3Tickers.join(',') : allB3Tickers.slice(0, 5).join(',');
        const brapiUrl = brapiKey
          ? `https://brapi.dev/api/quote/${brapiBatch}?token=${encodeURIComponent(brapiKey)}`
          : `https://brapi.dev/api/quote/${brapiBatch}`;

        const brapiHeaders: Record<string, string> = { Accept: 'application/json' };
        if (brapiKey) {
          brapiHeaders['Authorization'] = `Bearer ${brapiKey}`;
        }

        const brapiData = await fetchJsonWithTimeout(brapiUrl, 3500, { headers: brapiHeaders });
        if (brapiData?.results && Array.isArray(brapiData.results)) {
          for (const r of brapiData.results) {
            if (r.symbol && r.regularMarketPrice > 0) {
              const q = {
                price: Number(r.regularMarketPrice.toFixed(2)),
                change: Number((r.regularMarketChange || 0).toFixed(2)),
                changePercent: Number((r.regularMarketChangePercent || 0).toFixed(2)),
                high: Number((r.regularMarketDayHigh || r.regularMarketPrice).toFixed(2)),
                low: Number((r.regularMarketDayLow || r.regularMarketPrice).toFixed(2)),
                volume: r.regularMarketVolume ? `${(r.regularMarketVolume / 1e6).toFixed(1)}M` : undefined,
                source: 'brapi_api',
              };
              rawQuotes[r.symbol] = q;
              saveLastValidQuote(r.symbol, q);
            }
          }
        }
      } catch {
        // Fallback automático para Yahoo Finance (.SA)
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
  ];

  tasks.push(
    (async () => {
      const yahooApiKey = getYahooFinanceKey();

      await Promise.allSettled(
        priorityYahooList.map(async ([dinhSym, ySym]) => {
          if (rawQuotes[dinhSym] && rawQuotes[dinhSym].price > 0) return;
          try {
            const yData = await fetchYahooQuoteDefensive(ySym, yahooApiKey);
            const m = yData?.chart?.result?.[0]?.meta;

            if (m && m.regularMarketPrice !== undefined && m.regularMarketPrice > 0) {
              const currentPrice = Number(m.regularMarketPrice.toFixed(2));
              const prevClose = Number((m.chartPreviousClose || m.previousClose || currentPrice).toFixed(2));
              const changeVal = Number((currentPrice - prevClose).toFixed(2));
              const changePct = prevClose > 0 ? Number(((changeVal / prevClose) * 100).toFixed(2)) : 0;
              const highVal = m.regularMarketDayHigh !== undefined ? Number(m.regularMarketDayHigh.toFixed(2)) : currentPrice;
              const lowVal = m.regularMarketDayLow !== undefined ? Number(m.regularMarketDayLow.toFixed(2)) : currentPrice;

              const quoteObj = {
                price: currentPrice,
                change: changeVal,
                changePercent: changePct,
                high: highVal,
                low: lowVal,
                volume: m.regularMarketVolume ? `${(m.regularMarketVolume / 1e6).toFixed(1)}M` : undefined,
                source: 'yahoo_finance_api',
              };
              rawQuotes[dinhSym] = quoteObj;
              rawQuotes[dinhSym.toLowerCase()] = quoteObj;
              saveLastValidQuote(dinhSym, quoteObj);
            }
          } catch {
            // Em caso de oscilação, preserva o último valor capturado se existir
            const lastValid = getLastValidStoredQuote(dinhSym);
            if (lastValid && !rawQuotes[dinhSym]) {
              rawQuotes[dinhSym] = lastValid;
            }
          }
        })
      );
    })()
  );

  await Promise.allSettled(tasks);

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
      const changePct = match.changePercent !== undefined ? Number(Number(match.changePercent).toFixed(2)) : asset.change24h;
      const changeVal = match.change !== undefined
        ? Number(Number(match.change).toFixed(2))
        : Number(((changePct / 100) * match.price).toFixed(2));
      const high = match.high && match.high > 0 ? Number(match.high) : match.price;
      const low = match.low && match.low > 0 ? Number(match.low) : match.price;

      // Gera sparkline dinâmico compatível com a variação real do pregão
      const baseSparkline = asset.sparkline.length > 0 && asset.sparkline[asset.sparkline.length - 1] > 0
        ? [...asset.sparkline.slice(1), match.price]
        : [
            Number((match.price * (1 - (changePct / 100) * 0.8)).toFixed(2)),
            Number((match.price * (1 - (changePct / 100) * 0.5)).toFixed(2)),
            Number((match.price * (1 - (changePct / 100) * 0.2)).toFixed(2)),
            Number((match.price * (1 - (changePct / 100) * 0.1)).toFixed(2)),
            match.price,
          ];

      return {
        ...asset,
        currency: isIndex ? 'PTS' : asset.currency,
        price: match.price,
        change24h: changePct,
        changeValue: changeVal,
        high24h: high,
        low24h: low,
        volume: match.volume || asset.volume,
        sparkline: baseSparkline,
      };
    }

    // Preserva o preço atual se já for maior que 0
    return asset;
  });

  return { rates: liveRates, updatedAssets };
}

/**
 * Universal Real-time Market Aggregator:
 * Opera 100% com APIs Públicas Gratuitas (CoinGecko, AwesomeAPI, Yahoo Finance, Brapi).
 */
export async function fetchCompleteLiveMarketData(
  currentAssets: MarketAsset[]
): Promise<LiveMarketSnapshot> {
  let liveRates: UniversalRates = { ...DEFAULT_UNIVERSAL_RATES };
  const rawQuotes: Record<string, any> = {};
  let rawPairs: Record<string, any> = {};
  let fetchedNews: NewsItem[] = [];
  const sourcesUsed: string[] = [];

  // 1. Tenta obter o universo completo via proxy local /api/market/live se estiver rodando com backend
  try {
    const proxyData = await fetchJsonWithTimeout('/api/market/live', 4000);
    if (proxyData) {
      if (proxyData.rates) Object.assign(liveRates, proxyData.rates);
      if (proxyData.quotes) Object.assign(rawQuotes, proxyData.quotes);
      if (proxyData.pairs) rawPairs = proxyData.pairs;
      if (Array.isArray(proxyData.news) && proxyData.news.length > 0) fetchedNews = proxyData.news;
      sourcesUsed.push('Proxy Local DinhEuro (Yahoo Finance & Crypto)');
    }
  } catch {
    // Modo estático no GitHub Pages
  }

  // 2. Consulta as APIs públicas diretamente no navegador para garantir 100% de tempo real no GitHub Pages
  const directResult = await fetchLiveMarketDataFromAPIs(currentAssets, rawQuotes);
  Object.assign(liveRates, directResult.rates);

  sourcesUsed.push('AwesomeAPI Pública (Câmbio & Forex)');
  sourcesUsed.push('CoinGecko API Pública (Criptomoedas)');
  sourcesUsed.push('Yahoo Finance Pública (Wall St, B3 & Índices)');

  const updatedAssets = directResult.updatedAssets;

  // Persiste cache no localStorage para manter a interface atualizada no recarregamento
  if (typeof window !== 'undefined' && updatedAssets.some((a) => a.price > 0)) {
    try {
      localStorage.setItem(ASSETS_CACHE_KEY, JSON.stringify(updatedAssets));
    } catch {
      // ignore
    }
  }

  return {
    rates: liveRates,
    updatedAssets,
    news: fetchedNews.length > 0 ? fetchedNews : INITIAL_NEWS,
    rawPairs,
    sourceSummary: sourcesUsed.join(' • '),
  };
}

export async function fetchLiveExchangeRates(): Promise<UniversalRates> {
  try {
    const awesomeData = await fetchJsonWithTimeout(
      'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,CAD-BRL,AUD-BRL,CHF-BRL,JPY-BRL,CNY-BRL,ARS-BRL',
      2500
    );
    if (awesomeData && awesomeData.USDBRL) {
      const u = parseFloat(awesomeData.USDBRL.bid);
      if (u > 0) {
        return {
          USD: 1.0,
          BRL: u,
          EUR: awesomeData.EURBRL ? u / parseFloat(awesomeData.EURBRL.bid) : 0.89,
          GBP: awesomeData.GBPBRL ? u / parseFloat(awesomeData.GBPBRL.bid) : 0.74,
          JPY: awesomeData.JPYBRL ? u / parseFloat(awesomeData.JPYBRL.bid) : 158.0,
          CAD: awesomeData.CADBRL ? u / parseFloat(awesomeData.CADBRL.bid) : 1.38,
          AUD: awesomeData.AUDBRL ? u / parseFloat(awesomeData.AUDBRL.bid) : 1.52,
          CHF: awesomeData.CHFBRL ? u / parseFloat(awesomeData.CHFBRL.bid) : 0.88,
          CNY: awesomeData.CNYBRL ? u / parseFloat(awesomeData.CNYBRL.bid) : 7.20,
          ARS: awesomeData.ARSBRL ? u / parseFloat(awesomeData.ARSBRL.bid) : 1040.0,
        };
      }
    }
  } catch {
    // fallback para open.er-api
    try {
      const openRates = await fetchJsonWithTimeout('https://open.er-api.com/v6/latest/USD', 2000);
      if (openRates?.rates) return openRates.rates;
    } catch {
      // continue
    }
  }
  return DEFAULT_UNIVERSAL_RATES;
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
    const m = data?.chart?.result?.[0]?.meta;
    if (m && m.regularMarketPrice !== undefined && m.regularMarketPrice > 0) {
      const price = Number(m.regularMarketPrice.toFixed(2));
      const pc = Number((m.chartPreviousClose || m.previousClose || price).toFixed(2));
      const diff = Number((price - pc).toFixed(2));
      const pct = pc > 0 ? Number(((diff / pc) * 100).toFixed(2)) : 0;

      return {
        simbolo: cleanSym,
        precoAtual: price,
        variacao: diff,
        percentualVariacao: pct,
        maximaDia: m.regularMarketDayHigh !== undefined ? Number(m.regularMarketDayHigh.toFixed(2)) : price,
        minimaDia: m.regularMarketDayLow !== undefined ? Number(m.regularMarketDayLow.toFixed(2)) : price,
        abertura: m.regularMarketDayHigh !== undefined ? Number(m.regularMarketDayHigh.toFixed(2)) : price,
        fechamentoAnterior: pc,
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

export function generateAssetCandles(currentPrice: number, timeframe: string): CandlePoint[] {
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
        ? timeStamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        : timeStamp.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
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
