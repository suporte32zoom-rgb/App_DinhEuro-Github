import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildFallbackAwesomeQuotes,
  parseAwesomeApiResponse,
  convertUsingAwesomeQuotes,
  mergeCrossExchangeRates,
  buildAwesomeQuotesFromMarketLive,
  DINHEURO_CALCULATOR_CURRENCIES,
} from './awesomeCalculator';
import { DEFAULT_UNIVERSAL_RATES } from '../services/marketData';

test('parseAwesomeApiResponse extracts bid/ask rates and updates timestamp', () => {
  const fallback = buildFallbackAwesomeQuotes(DEFAULT_UNIVERSAL_RATES);
  const { quotes, matchedCount, latestTimestamp } = parseAwesomeApiResponse(
    {
      USDBRL: {
        code: 'USD',
        codein: 'BRL',
        bid: '5.60',
        ask: '5.62',
        high: '5.65',
        low: '5.55',
        pctChange: '0.85',
        varBid: '0.047',
        create_date: '2026-11-13 18:00:00',
      },
      EURBRL: {
        code: 'EUR',
        codein: 'BRL',
        bid: '6.25',
        ask: '6.27',
        high: '6.30',
        low: '6.20',
        pctChange: '0.50',
        varBid: '0.031',
        create_date: '2026-11-13 18:01:00',
      },
    },
    fallback
  );

  assert.equal(matchedCount, 2);
  assert.equal(quotes.USD.bidBrl, 5.6);
  assert.equal(quotes.USD.askBrl, 5.62);
  assert.equal(quotes.EUR.bidBrl, 6.25);
  assert.equal(latestTimestamp, '2026-11-13 18:01:00');
});

test('convertUsingAwesomeQuotes performs accurate cross-currency conversion in bid and ask modes', () => {
  const fallback = buildFallbackAwesomeQuotes(DEFAULT_UNIVERSAL_RATES);
  const { quotes } = parseAwesomeApiResponse(
    {
      USDBRL: { bid: '5.00', ask: '5.10' },
      EURBRL: { bid: '6.00', ask: '6.12' },
    },
    fallback
  );

  const eurToBrl = convertUsingAwesomeQuotes(100, 'EUR', 'BRL', quotes, 'bid');
  assert.equal(eurToBrl.convertedAmount, 600);
  assert.equal(eurToBrl.directRate, 6);

  const eurToUsdBid = convertUsingAwesomeQuotes(100, 'EUR', 'USD', quotes, 'bid');
  assert.ok(Math.abs(eurToUsdBid.convertedAmount - 120) < 0.0001);
  assert.ok(Math.abs(eurToUsdBid.directRate - 1.2) < 0.0001);

  const brlToUsdAsk = convertUsingAwesomeQuotes(510, 'BRL', 'USD', quotes, 'ask');
  assert.ok(Math.abs(brlToUsdAsk.convertedAmount - 100) < 0.0001);
});

test('calculator catalog covers all major currencies listed on DinhEuro', () => {
  const codes = new Set(DINHEURO_CALCULATOR_CURRENCIES.map((c) => c.code));
  for (const required of ['BRL', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'CHF', 'JPY', 'CNY', 'ARS', 'BTC', 'ETH']) {
    assert.ok(codes.has(required), `Missing currency ${required}`);
  }
});

test('mergeCrossExchangeRates prioritizes real-time spot over stale daily fixing', () => {
  const merged = mergeCrossExchangeRates({
    coinbaseRates: { BRL: '5.6518', EUR: '0.9116', ARS: '1150.5' },
    frankfurterRates: { BRL: 5.7651, EUR: 0.9112, CHF: 0.8341 },
  });

  assert.equal(merged.USD, 1.0);
  assert.equal(merged.BRL, 5.6518);
  assert.equal(merged.EUR, 0.9116);
  assert.equal(merged.ARS, 1150.5);
  assert.equal(merged.CHF, 0.8341);
});

test('buildAwesomeQuotesFromMarketLive preserves exact live FX market values without artificial discounts or markups', () => {
  const { quotes, matchedCount } = buildAwesomeQuotesFromMarketLive(
    {
      rates: { USD: 1, BRL: 5.6513, EUR: 0.91138 },
      pairs: {
        USDBRL: { bid: 5.6513, ask: 5.6513, high: 5.8254, low: 5.6413, pctChange: -1.2, varBid: -0.068 },
        EURBRL: { bid: 6.2008, ask: 6.2008, high: 6.3946, low: 6.1874, pctChange: -1.1, varBid: -0.069 },
      },
    },
    { USD: 1, BRL: 5.7651 }
  );

  assert.equal(matchedCount, 2);
  assert.equal(quotes.USD.bidBrl, 5.6513);
  assert.equal(quotes.USD.askBrl, 5.6513);
  assert.equal(quotes.EUR.bidBrl, 6.2008);
  assert.equal(quotes.EUR.askBrl, 6.2008);
  assert.equal(quotes.EUR.highBrl, 6.3946);
  assert.equal(quotes.EUR.lowBrl, 6.1874);
});
