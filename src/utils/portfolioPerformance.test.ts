import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  resolvePortfolioYahooSymbol,
  buildPortfolioPerformanceData,
  PositionMetricInput,
} from './portfolioPerformance';
import { DEFAULT_UNIVERSAL_RATES } from '../services/marketData';

describe('Portfolio Historical Performance Engine', () => {
  it('resolves Yahoo Finance symbols accurately across B3, US, crypto, and FX', () => {
    assert.equal(resolvePortfolioYahooSymbol('PETR4', 'stock_br'), 'PETR4.SA');
    assert.equal(resolvePortfolioYahooSymbol('AAPL', 'stock_us'), 'AAPL');
    assert.equal(resolvePortfolioYahooSymbol('BTC/USD', 'crypto'), 'BTC-USD');
    assert.equal(resolvePortfolioYahooSymbol('EUR/BRL', 'forex'), 'EURBRL=X');
    assert.equal(resolvePortfolioYahooSymbol('USD/BRL', 'forex'), 'BRL=X');
  });

  it('builds baseline zeroed series cleanly for an empty portfolio', () => {
    const result = buildPortfolioPerformanceData({
      positions: [],
      historicalBySymbol: {},
      timeframe: '1M',
      displayCurrency: 'BRL',
      universalRates: DEFAULT_UNIVERSAL_RATES,
      locale: 'pt-BR',
    });

    assert.equal(result.equitySeries.length, 7);
    assert.equal(result.assetReturnSeries.length, 7);
    assert.equal(result.assetSeriesMeta.length, 0);
    assert.equal(result.summary.endValue, 0);
    assert.equal(result.summary.costBasis, 0);
    assert.equal(result.summary.hasLiveHistory, false);
  });

  it('computes multi-currency equity series pinned to live prices and comparative asset % lines', () => {
    const positions: PositionMetricInput[] = [
      {
        id: 'p1',
        symbol: 'PETR4',
        name: 'Petrobras PN',
        displayName: 'Petrobras PN',
        assetType: 'stock_br',
        quantity: 100,
        averageBuyPrice: 35,
        currency: 'BRL',
        purchaseDate: '2026-01-01',
        currentPrice: 42,
        totalCost: 3500,
        currentTotalValue: 4200,
        currentTotalBRL: 4200,
        profitLoss: 700,
        profitPercent: 20,
      },
      {
        id: 'p2',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        displayName: 'Apple Inc.',
        assetType: 'stock_us',
        quantity: 2,
        averageBuyPrice: 200,
        currency: 'USD',
        purchaseDate: '2026-01-01',
        currentPrice: 220,
        totalCost: 400,
        currentTotalValue: 440,
        currentTotalBRL: 440 * DEFAULT_UNIVERSAL_RATES.BRL,
        profitLoss: 40,
        profitPercent: 10,
      },
    ];

    const t0 = new Date('2026-10-20T12:00:00Z').getTime();
    const day = 24 * 60 * 60 * 1000;
    const historicalBySymbol = {
      PETR4: [
        { timestamp: t0, close: 38 },
        { timestamp: t0 + day, close: 40 },
        { timestamp: t0 + 2 * day, close: 41.5 },
      ],
      AAPL: [
        { timestamp: t0, close: 200 },
        { timestamp: t0 + day, close: 210 },
        { timestamp: t0 + 2 * day, close: 218 },
      ],
    };

    const result = buildPortfolioPerformanceData({
      positions,
      historicalBySymbol,
      timeframe: '1M',
      displayCurrency: 'BRL',
      universalRates: DEFAULT_UNIVERSAL_RATES,
      locale: 'pt-BR',
    });

    assert.equal(result.summary.hasLiveHistory, true);
    assert.equal(result.equitySeries.length, 3);
    assert.equal(result.assetReturnSeries.length, 3);
    assert.equal(result.assetSeriesMeta.length, 2);

    const expectedEndBRL = Number((4200 + 440 * DEFAULT_UNIVERSAL_RATES.BRL).toFixed(2));
    const expectedCostBRL = Number((3500 + 400 * DEFAULT_UNIVERSAL_RATES.BRL).toFixed(2));
    const lastEquity = result.equitySeries[result.equitySeries.length - 1];

    assert.ok(
      Math.abs(lastEquity.portfolioValue - expectedEndBRL) < 0.05,
      `Expected terminal portfolio value ~${expectedEndBRL}, got ${lastEquity.portfolioValue}`
    );
    assert.ok(
      Math.abs(lastEquity.costBasis - expectedCostBRL) < 0.05,
      `Expected cost basis ~${expectedCostBRL}, got ${lastEquity.costBasis}`
    );

    const lastAssetRow = result.assetReturnSeries[result.assetReturnSeries.length - 1];
    // AAPL rose from 200 to 220 (+10.00%)
    assert.equal(lastAssetRow.AAPL, 10);
    // PETR4 rose from 38 to 42 (+10.53%)
    assert.equal(lastAssetRow.PETR4, 10.53);
    assert.equal(result.summary.bestAssetSymbol, 'PETR4');
  });
});
