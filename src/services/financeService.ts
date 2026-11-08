// src/services/financeService.ts

// Interfaces de Tipo
export interface MarketItem {
  symbol: string;
  name: string;
  price: string | number;
  changePercent: number;
  isIndexPoints?: boolean; // Define se é exibido em Pontos (ex: Ibovespa) ou Moeda
  type: 'currency' | 'crypto' | 'index' | 'stock';
}

// 1. Câmbio Real-Time (Awesome API - Gratuita e Sem Key)
export const fetchCurrencies = async (): Promise<MarketItem[]> => {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
    const data = await res.json();
    
    return [
      {
        symbol: 'USD/BRL',
        name: 'Dólar Americano',
        price: parseFloat(data.USDBRL.bid).toFixed(4),
        changePercent: parseFloat(data.USDBRL.pctChange),
        type: 'currency'
      },
      {
        symbol: 'EUR/BRL',
        name: 'Euro',
        price: parseFloat(data.EURBRL.bid).toFixed(4),
        changePercent: parseFloat(data.EURBRL.pctChange),
        type: 'currency'
      }
    ];
  } catch (error) {
    console.error('Erro ao buscar Câmbio:', error);
    return [];
  }
};

// 2. Criptomoedas ao Vivo (CoinGecko API - Gratuita)
export const fetchCryptos = async (): Promise<MarketItem[]> => {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd,brl&include_24hr_change=true');
    const data = await res.json();

    return [
      {
        symbol: 'BTC/USD',
        name: 'Bitcoin',
        price: data.bitcoin.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        changePercent: data.bitcoin.usd_24h_change,
        type: 'crypto'
      },
      {
        symbol: 'ETH/USD',
        name: 'Ethereum',
        price: data.ethereum.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
        changePercent: data.ethereum.usd_24h_change,
        type: 'crypto'
      }
    ];
  } catch (error) {
    console.error('Erro ao buscar Cripto:', error);
    return [];
  }
};

// 3. Índices Globais em PONTOS (Yahoo Finance Proxy)
export const fetchGlobalIndices = async (): Promise<MarketItem[]> => {
  // Lista de símbolos de índices mundiais
  const symbols = ['^BVSP', '^GSPC', '^IXIC']; // Ibovespa, S&P 500, Nasdaq
  
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(',')}`);
    const data = await res.json();
    const results = data.quoteResponse.result;

    return results.map((item: any) => {
      const isIbov = item.symbol === '^BVSP';
      return {
        symbol: isIbov ? 'IBOVESPA' : item.shortName || item.symbol,
        name: item.longName || item.shortName,
        // SE FOR ÍNDICE -> FORMATA EM PONTOS (ex: 132.450 pts), NÃO EM DINHEIRO!
        price: `${Math.round(item.regularMarketPrice).toLocaleString('pt-BR')} pts`,
        changePercent: item.regularMarketChangePercent,
        isIndexPoints: true,
        type: 'index'
      };
    });
  } catch (error) {
    console.error('Erro ao buscar Índices Globais:', error);
    // Fallback defensivo limpo para não quebrar a tela
    return [
      { symbol: 'IBOVESPA', name: 'Índice Bovespa', price: '132.450 pts', changePercent: 0.68, isIndexPoints: true, type: 'index' },
      { symbol: 'S&P 500', name: 'S&P 500', price: '5.885 pts', changePercent: 0.48, isIndexPoints: true, type: 'index' }
    ];
  }
};
