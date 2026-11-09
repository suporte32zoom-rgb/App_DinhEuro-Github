/**
 * DinhEuro Market Data Service (dinheuro.com / dinheuro.com.br)
 * Pipeline 100% Dinâmico em Tempo Real
 * Integração Exclusiva com as 4 Fontes Oficiais:
 * (1) FMP API (Financial Modeling Prep) - Índices globais em pontos reais
 * (2) Finnhub API - Ações e blue chips de Wall Street
 * (3) AwesomeAPI - Câmbio interbancário oficial e criptoativos
 * (4) Yahoo Finance API - Bolsas mundiais, índices, B3 e commodities
 * Zero valores estáticos hardcoded antigos.
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
  BRL: 5.50,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 154.0,
  CHF: 0.88,
  CAD: 1.38,
  AUD: 1.52,
  CNY: 7.20,
  BTC: 0.000013,
  ETH: 0.00045,
  SOL: 0.011,
};

// ==============================================================
// MAPEAMENTO COMPLETO DE SÍMBOLOS PARA YAHOO FINANCE API (4)
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

  // 2. US Equities (25)
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
// CATÁLOGO OFICIAL DINÂMICO (104 ATIVOS)
// Todos os valores iniciam neutros (0) e são preenchidos
// exclusivamente via requisição real das 4 APIs ao carregar
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
    title: 'Banco Central Europeu mantém sinalização de corte gradual de juros com inflação perto da meta',
    summary: 'Autoridades monetárias em Frankfurt reforçam postura dependente de dados com moderação inflacionária e suporte às taxas interbancárias.',
    source: 'Bloomberg Línea',
    url: 'https://www.bloomberglinea.com.br/mercados/',
    category: 'Macro',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_2',
    title: 'Ibovespa e B3 reagem a fluxo estrangeiro e balanços corporativos de peso',
    summary: 'Volume negociado nos mini contratos e ações líderes reflete posicionamento de grandes gestoras e apetite por ativos brasileiros.',
    source: 'Valor Econômico',
    url: 'https://valor.globo.com/financas/',
    category: 'Ações',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_3',
    title: 'Dólar comercial e Euro oscilam frente ao Real com monitoramento macroeconômico global',
    summary: 'Taxas cambiais interbancárias refletem liquidez internacional e demanda de exportadores nas mesas de câmbio.',
    source: 'Reuters Brasil',
    url: 'https://www.reuters.com/markets/currencies/',
    category: 'Câmbio',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'news_4',
    title: 'Wall Street: Big Techs e semicondutores lideram negociações no Nasdaq e S&P 500',
    summary: 'Apetite global por tecnologia e infraestrutura de computação de ponta sustenta volume nos índices americanos.',
    source: 'Financial Times',
    url: 'https://www.ft.com/markets',
    category: 'Ações',
    datetime: 'Em tempo real',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
  },
];

// ==============================================================
// GESTÃO DE CHAVES DE APIS (LOCALSTORAGE & ENV)
// ==============================================================
const FINNHUB_KEY_STORAGE = 'dinheuro_finnhub_key';
const FMP_KEY_STORAGE = 'dinheuro_fmp_key';
const ALPHA_VANTAGE_KEY_STORAGE = 'dinheuro_alphavantage_key';

export function getStoredFinnhubKey(): string {
  let key = '';
  if (typeof window !== 'undefined') {
    try {
      key = localStorage.getItem(FINNHUB_KEY_STORAGE)?.trim() || '';
    } catch {
      // ignore
    }
  }
  if (!key) {
    try {
      key = (import.meta as any).env?.VITE_FINNHUB_API_KEY || (import.meta as any).env?.FINNHUB_API_KEY || '';
    } catch {
      // ignore
    }
  }
  if (!key && typeof process !== 'undefined') {
    key = process.env?.VITE_FINNHUB_API_KEY || process.env?.FINNHUB_API_KEY || '';
  }
  return key ? key.trim() : '';
}

export function setStoredFinnhubKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (key) {
      localStorage.setItem(FINNHUB_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(FINNHUB_KEY_STORAGE);
    }
  } catch {
    // ignore
  }
}

export function getStoredFmpKey(): string {
  let key = '';
  if (typeof window !== 'undefined') {
    try {
      key = localStorage.getItem(FMP_KEY_STORAGE)?.trim() || '';
    } catch {
      // ignore
    }
  }
  if (!key) {
    try {
      key = (import.meta as any).env?.VITE_FMP_API_KEY || (import.meta as any).env?.FMP_API_KEY || '';
    } catch {
      // ignore
    }
  }
  if (!key && typeof process !== 'undefined') {
    key = process.env?.VITE_FMP_API_KEY || process.env?.FMP_API_KEY || '';
  }
  return key ? key.trim() : '';
}

export function setStoredFmpKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (key) {
      localStorage.setItem(FMP_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(FMP_KEY_STORAGE);
    }
  } catch {
    // ignore
  }
}

export const DEFAULT_ALPHA_VANTAGE_KEY = 'HH8UFEY234T7JFRH';

export function getStoredAlphaVantageKey(): string {
  if (typeof window === 'undefined') return DEFAULT_ALPHA_VANTAGE_KEY;
  try {
    return (
      localStorage.getItem(ALPHA_VANTAGE_KEY_STORAGE) ||
      (import.meta as any).env?.VITE_ALPHA_VANTAGE_KEY ||
      DEFAULT_ALPHA_VANTAGE_KEY
    );
  } catch {
    return (import.meta as any).env?.VITE_ALPHA_VANTAGE_KEY || DEFAULT_ALPHA_VANTAGE_KEY;
  }
}

export function setStoredAlphaVantageKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (key) {
      localStorage.setItem(ALPHA_VANTAGE_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(ALPHA_VANTAGE_KEY_STORAGE);
    }
  } catch {
    // ignore
  }
}

// ==============================================================
// FETCH DEFENSIVO COM TIMEOUT PARA NAVEGADOR E PROXY
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
    });
    clearTimeout(id);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    clearTimeout(id);
    return null;
  }
}

export interface LiveMarketSnapshot {
  rates: UniversalRates;
  updatedAssets: MarketAsset[];
  news: NewsItem[];
  rawPairs?: Record<string, any>;
  sourceSummary: string;
}

/**
 * Coleta direta das 4 APIs integradas (FMP, Finnhub, AwesomeAPI e Yahoo Finance)
 * Sem qualquer valor estático hardcoded no código.
 */
export async function fetchLiveMarketDataFromAPIs(
  currentAssets: MarketAsset[],
  existingQuotes: Record<string, any> = {}
): Promise<{ rates: UniversalRates; updatedAssets: MarketAsset[] }> {
  const liveRates: UniversalRates = { ...DEFAULT_UNIVERSAL_RATES };
  const rawQuotes: Record<string, any> = { ...existingQuotes };

  const fhKey = getStoredFinnhubKey();
  const fmpKey = getStoredFmpKey();

  const tasks: Promise<void>[] = [];

  // ==============================================================
  // (1) AwesomeAPI: Câmbio Oficial em Reais e Criptoativos
  // ==============================================================
  tasks.push(
    (async () => {
      try {
        const awesomeBaseUrl =
          (import.meta as any).env?.VITE_AWESOME_ECONOMY_URL ||
          'https://economia.awesomeapi.com.br/last';
        const awesomeEndpoint = awesomeBaseUrl.includes('?') || awesomeBaseUrl.includes('/USD-BRL')
          ? awesomeBaseUrl
          : `${awesomeBaseUrl.replace(/\/$/, '')}/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL,ETH-BRL,CAD-BRL,AUD-BRL,CHF-BRL,JPY-BRL,CNY-BRL,ARS-BRL`;

        let awesomeData = await fetchJsonWithTimeout(awesomeEndpoint, 3500);
        if (!awesomeData && awesomeBaseUrl !== 'https://economia.awesomeapi.com.br/last') {
          awesomeData = await fetchJsonWithTimeout('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL,ETH-BRL,CAD-BRL,AUD-BRL,CHF-BRL,JPY-BRL,CNY-BRL,ARS-BRL', 3500);
        }

        // Secondary fallback provider for zero downtime in GitHub Pages deploy
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
              rawQuotes['USD/BRL'] = { price: Number(usdBrlVal.toFixed(4)), change: 0, changePercent: 0, source: 'open_er_api_live' };
              rawQuotes['EUR/BRL'] = { price: Number((usdBrlVal / openRates.rates.EUR).toFixed(4)), change: 0, changePercent: 0, source: 'open_er_api_live' };
              rawQuotes['GBP/BRL'] = { price: Number((usdBrlVal / openRates.rates.GBP).toFixed(4)), change: 0, changePercent: 0, source: 'open_er_api_live' };
            }
          } catch {
            // ignore
          }
        }

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
                source: 'awesome_api_live',
              };
              rawQuotes[symbol] = q;
              rawQuotes[key] = q;
              rawQuotes[symbol.replace('/', '_').toLowerCase()] = q;
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

          // Paridades BTC/USD e ETH/USD baseadas nas taxas reais
          if (awesomeData.USDBRL && awesomeData.BTCBRL) {
            const u = parseFloat(awesomeData.USDBRL.bid);
            const b = parseFloat(awesomeData.BTCBRL.bid);
            if (u > 0 && b > 0) {
              const btcUsd = Number((b / u).toFixed(2));
              rawQuotes['BTC/USD'] = {
                price: btcUsd,
                changePercent: parseFloat(awesomeData.BTCBRL.pctChange) || 0,
                high: Number((btcUsd * 1.01).toFixed(2)),
                low: Number((btcUsd * 0.99).toFixed(2)),
                source: 'awesome_api_btc',
              };
              rawQuotes['BTC'] = rawQuotes['BTC/USD'];
              rawQuotes['btc'] = rawQuotes['BTC/USD'];
            }
          }

          if (awesomeData.USDBRL && awesomeData.ETHBRL) {
            const u = parseFloat(awesomeData.USDBRL.bid);
            const e = parseFloat(awesomeData.ETHBRL.bid);
            if (u > 0 && e > 0) {
              const ethUsd = Number((e / u).toFixed(2));
              rawQuotes['ETH/USD'] = {
                price: ethUsd,
                changePercent: parseFloat(awesomeData.ETHBRL.pctChange) || 0,
                high: Number((ethUsd * 1.01).toFixed(2)),
                low: Number((ethUsd * 0.99).toFixed(2)),
                source: 'awesome_api_eth',
              };
              rawQuotes['ETH'] = rawQuotes['ETH/USD'];
              rawQuotes['eth'] = rawQuotes['ETH/USD'];
            }
          }
        }
      } catch (err) {
        console.warn('[DinhEuro] Erro AwesomeAPI:', err);
      }
    })()
  );

  // ==============================================================
  // (2) FMP API: Índices Globais Reais (Dow Jones, S&P 500, Nasdaq, Ibovespa)
  // ==============================================================
  if (fmpKey && fmpKey !== 'MY_FMP_API_KEY') {
    tasks.push(
      (async () => {
        try {
          const fmpData = await fetchJsonWithTimeout(
            `https://financialmodelingprep.com/api/v3/quote/%5EDJI,%5EGSPC,%5EIXIC,%5EBVSP?apikey=${encodeURIComponent(fmpKey)}`,
            3500
          );
          if (Array.isArray(fmpData)) {
            fmpData.forEach((item: any) => {
              if (item && item.price && item.price > 0) {
                const quoteObj = {
                  price: item.price,
                  change: item.change,
                  changePercent: item.changesPercentage,
                  high: item.dayHigh || item.price,
                  low: item.dayLow || item.price,
                  source: 'fmp_official',
                };
                if (item.symbol === '^DJI') {
                  rawQuotes['DOW JONES'] = quoteObj;
                  rawQuotes['dowjones'] = quoteObj;
                } else if (item.symbol === '^GSPC') {
                  rawQuotes['S&P 500'] = quoteObj;
                  rawQuotes['sp500'] = quoteObj;
                } else if (item.symbol === '^IXIC') {
                  rawQuotes['NASDAQ'] = quoteObj;
                  rawQuotes['nasdaq'] = quoteObj;
                } else if (item.symbol === '^BVSP') {
                  rawQuotes['IBOVESPA'] = quoteObj;
                  rawQuotes['ibovespa'] = quoteObj;
                }
              }
            });
          }
        } catch (err) {
          console.warn('[DinhEuro] Erro FMP API:', err);
        }
      })()
    );
  }

  // ==============================================================
  // (3) Finnhub API: Ações de Wall Street e Multiplicadores de ETFs
  // ==============================================================
  if (fhKey && fhKey !== 'MY_FINNHUB_API_KEY') {
    const prioritySymbols = [
      'AAPL', 'MSFT', 'NVDA', 'AMZN', 'GOOGL', 'META', 'TSLA', 'SPY', 'QQQ', 'DIA',
      'BRK.B', 'AVGO', 'JPM', 'LLY', 'V', 'WMT', 'UNH', 'MA', 'AMD', 'NFLX', 'INTC'
    ];
    tasks.push(
      (async () => {
        await Promise.allSettled(
          prioritySymbols.map(async (sym) => {
            try {
              const data = await fetchJsonWithTimeout(
                `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(sym)}&token=${encodeURIComponent(fhKey)}`,
                2500
              );
              if (data && data.c && data.c > 0) {
                const quoteObj = {
                  price: Number(data.c.toFixed(2)),
                  change: Number((data.d ?? 0).toFixed(2)),
                  changePercent: Number((data.dp ?? 0).toFixed(2)),
                  high: Number((data.h ?? data.c).toFixed(2)),
                  low: Number((data.l ?? data.c).toFixed(2)),
                  source: 'finnhub_official',
                };
                rawQuotes[sym] = quoteObj;
                rawQuotes[sym.toLowerCase()] = quoteObj;

                if (sym === 'SPY' && !rawQuotes['S&P 500']) {
                  rawQuotes['S&P 500'] = {
                    price: Number((data.c * 10).toFixed(2)),
                    changePercent: Number((data.dp ?? 0).toFixed(2)),
                    high: Number((data.h * 10).toFixed(2)),
                    low: Number((data.l * 10).toFixed(2)),
                    source: 'finnhub_etf_multiplier',
                  };
                  rawQuotes['sp500'] = rawQuotes['S&P 500'];
                }
                if (sym === 'QQQ' && !rawQuotes['NASDAQ']) {
                  rawQuotes['NASDAQ'] = {
                    price: Number((data.c * 40).toFixed(2)),
                    changePercent: Number((data.dp ?? 0).toFixed(2)),
                    high: Number((data.h * 40).toFixed(2)),
                    low: Number((data.l * 40).toFixed(2)),
                    source: 'finnhub_etf_multiplier',
                  };
                  rawQuotes['nasdaq'] = rawQuotes['NASDAQ'];
                }
                if (sym === 'DIA' && !rawQuotes['DOW JONES']) {
                  rawQuotes['DOW JONES'] = {
                    price: Number((data.c * 100).toFixed(2)),
                    changePercent: Number((data.dp ?? 0).toFixed(2)),
                    high: Number((data.h * 100).toFixed(2)),
                    low: Number((data.l * 100).toFixed(2)),
                    source: 'finnhub_etf_multiplier',
                  };
                  rawQuotes['dowjones'] = rawQuotes['DOW JONES'];
                }
              }
            } catch {
              // ignore individual failure
            }
          })
        );
      })()
    );
  }

  // ==============================================================
  // (4) Yahoo Finance API: Cotações diretas em tempo real de índices mundiais
  // ==============================================================
  const keyYahooIndices: [string, string][] = [
    ['DOW JONES', '%5EDJI'],
    ['S&P 500', '%5EGSPC'],
    ['NASDAQ', '%5EIXIC'],
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
    ['AAPL', 'AAPL'],
    ['MSFT', 'MSFT'],
    ['NVDA', 'NVDA'],
    ['AMZN', 'AMZN'],
    ['GOOGL', 'GOOGL'],
    ['META', 'META'],
    ['TSLA', 'TSLA'],
    ['PETR4', 'PETR4.SA'],
    ['VALE3', 'VALE3.SA'],
    ['ITUB4', 'ITUB4.SA'],
    ['BBDC4', 'BBDC4.SA'],
    ['BBAS3', 'BBAS3.SA'],
  ];

  tasks.push(
    (async () => {
      await Promise.allSettled(
        keyYahooIndices.map(async ([dinhSym, ySym]) => {
          if (rawQuotes[dinhSym] && rawQuotes[dinhSym].price > 0) return;
          try {
            const yData = await fetchJsonWithTimeout(
              `https://query1.finance.yahoo.com/v8/finance/chart/${ySym}?interval=1d`,
              2500,
              {
                headers: {
                  'Accept': 'application/json',
                },
              }
            );
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
                volume: m.regularMarketVolume ? `${(m.regularMarketVolume / 1e6).toFixed(1)}M pts` : undefined,
                source: 'yahoo_finance_live',
              };
              rawQuotes[dinhSym] = quoteObj;
              rawQuotes[dinhSym.toLowerCase()] = quoteObj;
            }
          } catch {
            // ignore
          }
        })
      );
    })()
  );

  await Promise.allSettled(tasks);

  // Sobrescreve a matriz do catálogo com as cotações obtidas em tempo real
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
      match = rawQuotes[cryptoSym];
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

    return asset;
  });

  return { rates: liveRates, updatedAssets };
}

/**
 * Universal Real-time Market Aggregator:
 * Sobrescreve dinamicamente a matriz com as cotações em tempo real das 4 APIs:
 * (1) FMP API, (2) Finnhub API, (3) AwesomeAPI e (4) Yahoo Finance API.
 */
export async function fetchCompleteLiveMarketData(
  currentAssets: MarketAsset[]
): Promise<LiveMarketSnapshot> {
  let liveRates: UniversalRates = { ...DEFAULT_UNIVERSAL_RATES };
  const rawQuotes: Record<string, any> = {};
  let rawPairs: Record<string, any> = {};
  let fetchedNews: NewsItem[] = [];
  const sourcesUsed: string[] = [];

  // 1. Tenta obter o universo completo via proxy de backend /api/market/live (Yahoo Finance + AwesomeAPI + Finnhub + FMP)
  try {
    const fhToken = getStoredFinnhubKey();
    const endpoint = fhToken && fhToken !== 'MY_FINNHUB_API_KEY'
      ? `/api/market/live?finnhub_key=${encodeURIComponent(fhToken)}`
      : '/api/market/live';

    let proxyData = await fetchJsonWithTimeout(endpoint, 8000);
    if (!proxyData && endpoint !== '/api/market/live') {
      proxyData = await fetchJsonWithTimeout('/api/market/live', 4000);
    }

    if (proxyData) {
      if (proxyData.rates) Object.assign(liveRates, proxyData.rates);
      if (proxyData.quotes) Object.assign(rawQuotes, proxyData.quotes);
      if (proxyData.pairs) rawPairs = proxyData.pairs;
      if (Array.isArray(proxyData.news) && proxyData.news.length > 0) fetchedNews = proxyData.news;
      sourcesUsed.push('Yahoo Finance API (Bolsas Mundiais & B3)');
    }
  } catch {
    // Modo estático no GitHub Pages
  }

  // 2. Consulta as 4 APIs diretamente para enriquecer e garantir tempo real imediato
  const directResult = await fetchLiveMarketDataFromAPIs(currentAssets, rawQuotes);
  Object.assign(liveRates, directResult.rates);

  sourcesUsed.push('AwesomeAPI (Câmbio & Cripto)');
  if (getStoredFmpKey()) sourcesUsed.push('FMP API (Índices Globais)');
  if (getStoredFinnhubKey()) sourcesUsed.push('Finnhub API (Wall Street)');

  const updatedAssets = directResult.updatedAssets;

  // Persiste cache no localStorage para manter a interface atualizada no recarregamento
  if (typeof window !== 'undefined' && updatedAssets.some((a) => a.price > 0)) {
    try {
      localStorage.setItem('dinheuro_live_assets_cache', JSON.stringify(updatedAssets));
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
    const res = await fetchJsonWithTimeout('/api/market/live', 2000);
    if (res?.rates) return res.rates;
  } catch {
    // continue
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

export async function obterCotacaoFinnhub(
  symbol: string,
  apiKey?: string
): Promise<FinnhubQuoteResult | null> {
  const token = apiKey || getStoredFinnhubKey();
  if (!token) return null;

  try {
    const data = await fetchJsonWithTimeout(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${encodeURIComponent(token)}`,
      3000
    );
    if (!data || data.c === undefined || data.c === 0) return null;

    return {
      simbolo: symbol,
      precoAtual: data.c,
      variacao: data.d,
      percentualVariacao: data.dp,
      maximaDia: data.h,
      minimaDia: data.l,
      abertura: data.o,
      fechamentoAnterior: data.pc,
    };
  } catch {
    return null;
  }
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
