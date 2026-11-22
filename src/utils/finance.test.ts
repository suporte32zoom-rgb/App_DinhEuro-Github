import test from 'node:test';
import assert from 'node:assert/strict';
import {
  convertCurrency,
  calculateCompoundInterest,
  calculateInflationImpact,
  calculateProfitAndTax,
  getDualCurrencyDisplay,
  formatPointsValue,
  formatCurrencyValue,
  formatSignedCurrencyChange,
  formatSignedPercentChange,
  getAssetPriceDecimals,
  buildAlignedMarketRates,
  resolveEurBrlRate,
  resolveUsdBrlRate,
  calculateMarketSentimentIndex,
  CurrencyRates
} from './finance';

test('convertCurrency performs accurate cross-currency conversions', () => {
  // Rates relative to 1 USD: USD = 1.0, BRL = 5.5, EUR = 0.92, GBP = 0.78
  const rates: CurrencyRates = {
    USD: 1.0,
    BRL: 5.5,
    EUR: 0.92,
    GBP: 0.78,
  };

  // Convert 100 USD to BRL -> 100 / 1.0 * 5.5 = 550
  assert.equal(convertCurrency(100, 'USD', 'BRL', rates), 550);

  // Convert 550 BRL to USD -> 550 / 5.5 * 1.0 = 100
  assert.equal(convertCurrency(550, 'BRL', 'USD', rates), 100);

  // Convert 100 EUR to BRL -> 100 / 0.92 * 5.5 = 597.8261
  const eurToBrl = convertCurrency(100, 'EUR', 'BRL', rates);
  assert.equal(eurToBrl, 597.8261);

  // Identity conversion
  assert.equal(convertCurrency(250, 'EUR', 'EUR', rates), 250);
});

test('calculateCompoundInterest computes accurate future value and breakdowns', () => {
  const result = calculateCompoundInterest({
    initialPrincipal: 1000,
    monthlyContribution: 200,
    annualRatePercent: 12,
    years: 1,
  });

  // Total invested = 1000 + 200*12 = 3400
  assert.equal(result.totalInvested, 3400);
  // Final balance must be greater than total invested due to 12% interest
  assert.ok(result.finalBalance > 3400);
  assert.ok(result.totalInterest > 0);
  assert.equal(result.breakdown.length, 1);
});

test('calculateInflationImpact projects real purchasing power erosion', () => {
  const result = calculateInflationImpact(10000, 5, 10);
  // In 10 years at 5% annual inflation, purchasing power diminishes significantly
  assert.ok(result.futurePurchasingPower < 10000);
  assert.ok(result.lossPercentage > 30);
  assert.ok(result.equivalentNeeded > 15000);
});

test('calculateProfitAndTax respects Brazilian stock exemption threshold', () => {
  // Sale of R$ 15,000 (below R$ 20,000 exemption limit)
  const exemptResult = calculateProfitAndTax({
    buyPrice: 10,
    sellPrice: 15,
    quantity: 1000, // Cost: 10,000, Sale: 15,000, Profit: 5,000
    assetType: 'stock_br',
    isDayTrade: false,
    totalMonthlySalesValue: 15000,
  });

  assert.equal(exemptResult.grossProfit, 5000);
  assert.equal(exemptResult.isTaxExempt, true);
  assert.equal(exemptResult.estimatedTaxDue, 0);
  assert.equal(exemptResult.netProfit, 5000);

  // Day trade is NOT exempt
  const dayTradeResult = calculateProfitAndTax({
    buyPrice: 10,
    sellPrice: 15,
    quantity: 1000,
    assetType: 'stock_br',
    isDayTrade: true,
    totalMonthlySalesValue: 15000,
  });

  assert.equal(dayTradeResult.isTaxExempt, false);
  assert.equal(dayTradeResult.taxRatePercent, 20);
  assert.equal(dayTradeResult.estimatedTaxDue, 1000); // 20% of 5,000
  assert.equal(dayTradeResult.netProfit, 4000);
});

test('getDualCurrencyDisplay formats USD assets with BRL converted values', () => {
  const rates: CurrencyRates = { USD: 1.0, BRL: 5.50 };

  // For Apple stock at 200 USD: primary is USD, secondary is BRL (200 * 5.5 = 1100 BRL)
  const dualUsd = getDualCurrencyDisplay(200, 'USD', rates);
  assert.equal(dualUsd.primaryCurrency, 'USD');
  assert.equal(dualUsd.secondaryCurrency, 'BRL');
  assert.equal(dualUsd.convertedBRL, 1100);
  assert.ok(dualUsd.primaryFormatted.includes('200'));
  assert.ok(dualUsd.secondaryFormatted.includes('1.100') || dualUsd.secondaryFormatted.includes('1100'));

  // For Petrobras at 35 BRL: primary is BRL, secondary is USD (35 / 5.5 = 6.36 USD)
  const dualBrl = getDualCurrencyDisplay(35, 'BRL', rates);
  assert.equal(dualBrl.primaryCurrency, 'BRL');
  assert.equal(dualBrl.secondaryCurrency, 'USD');
  assert.equal(Number(dualBrl.convertedUSD.toFixed(2)), 6.36);
  assert.ok(dualBrl.primaryFormatted.includes('35'));
  assert.ok(dualBrl.secondaryFormatted.includes('6.36') || dualBrl.secondaryFormatted.includes('6,36'));
});

test('formatPointsValue and index points display format strictly in points (pts)', () => {
  const rates: CurrencyRates = { USD: 1.0, BRL: 5.50 };

  // IBOVESPA points formatting
  const ibovPoints = formatPointsValue(171670);
  assert.ok(ibovPoints.includes('171.670 pts') || ibovPoints.includes('171670 pts'));
  assert.ok(!ibovPoints.includes('R$'));
  assert.ok(!ibovPoints.includes('$'));

  // S&P 500 points formatting
  const spPoints = formatPointsValue(7575.40);
  assert.ok(spPoints.includes('pts'));
  assert.ok(!spPoints.includes('$'));

  // getDualCurrencyDisplay for indices with PTS currency
  const dualIndex = getDualCurrencyDisplay(171670, 'PTS', rates, true);
  assert.equal(dualIndex.primaryCurrency, 'PTS');
  assert.equal(dualIndex.secondaryFormatted, '');
  assert.ok(dualIndex.primaryFormatted.includes('pts'));
  // formatCurrencyValue with PTS currency
  const ptsCurrencyVal = formatCurrencyValue(5820.50, 'PTS');
  assert.ok(ptsCurrencyVal.includes('pts'));
  assert.ok(!ptsCurrencyVal.includes('$'));
  assert.ok(!ptsCurrencyVal.includes('R$'));
});

test('formatSignedCurrencyChange never emits +-/-+ and strips signs from rounded zero', () => {
  const dogeZero = formatSignedCurrencyChange(-0.00001, 'USD', 4);
  assert.equal(dogeZero, '$0.0000');
  assert.ok(!dogeZero.includes('+-'));
  assert.ok(!dogeZero.includes('-+'));

  const adaZero = formatSignedCurrencyChange(0, 'USD', 4);
  assert.equal(adaZero, '$0.0000');

  const cnyZero = formatSignedCurrencyChange(-0.001, 'CNY', 2);
  assert.ok(!cnyZero.includes('+-'));
  assert.ok(!cnyZero.includes('-+'));
  assert.ok(!cnyZero.startsWith('+'));
  assert.ok(!cnyZero.startsWith('-'));
  assert.ok(!cnyZero.includes('\uFFE5'));

  const posUsd = formatSignedCurrencyChange(0.025, 'USD', 4);
  assert.equal(posUsd, '+$0.0250');

  const negUsd = formatSignedCurrencyChange(-0.025, 'USD', 4);
  assert.equal(negUsd, '-$0.0250');

  const ptsZero = formatSignedCurrencyChange(-0.001, 'PTS', 2);
  assert.equal(ptsZero, '0 pts');
});

test('formatSignedPercentChange avoids -0.00% and +- artifacts', () => {
  const nearZeroNeg = formatSignedPercentChange(-0.004, 2);
  assert.equal(nearZeroNeg.text, '0.00%');
  assert.equal(nearZeroNeg.isZero, true);
  assert.equal(nearZeroNeg.isPositive, false);
  assert.equal(nearZeroNeg.isNegative, false);

  const pos = formatSignedPercentChange(1.26, 2);
  assert.equal(pos.text, '+1.26%');
  assert.equal(pos.isPositive, true);

  const neg = formatSignedPercentChange(-2.35, 2);
  assert.equal(neg.text, '-2.35%');
  assert.equal(neg.isNegative, true);
});

test('getAssetPriceDecimals standardizes precision across all 8 market asset blocks', () => {
  assert.equal(getAssetPriceDecimals(3.56, 'BRL', 'stocks_br'), 2);
  assert.equal(getAssetPriceDecimals(4.65, 'EUR', 'stocks_eu'), 2);
  assert.equal(getAssetPriceDecimals(2.85, 'USD', 'commodities'), 2);
  assert.equal(getAssetPriceDecimals(2850, 'JPY', 'stocks_asia'), 0);
  assert.equal(getAssetPriceDecimals(68400, 'KRW', 'stocks_asia'), 0);
  assert.equal(getAssetPriceDecimals(154.2, 'JPY', 'forex'), 2);
  assert.equal(getAssetPriceDecimals(5.584, 'BRL', 'forex'), 4);
  assert.equal(getAssetPriceDecimals(6.6653, 'CNY', 'forex'), 4);
  assert.equal(getAssetPriceDecimals(0.00537, 'BRL', 'forex'), 5);
  assert.equal(getAssetPriceDecimals(0.1425, 'USD', 'crypto'), 4);
  assert.equal(getAssetPriceDecimals(72990, 'USD', 'crypto'), 2);
});

test('formatCurrencyValue enforces half-width yen/CNY symbols and clean spacing', () => {
  const jpy = formatCurrencyValue(1235, 'JPY', 0);
  assert.ok(!jpy.includes('\uFFE5'));
  assert.ok(jpy.startsWith('¥ '));

  const cny = formatCurrencyValue(6.6653, 'CNY', 4, 'pt-BR');
  assert.ok(!cny.includes('\uFFE5'));
  assert.ok(cny.includes('CN¥ '));
});

test('getDualCurrencyDisplay computes accurate BRL conversion for non-USD/EUR currencies', () => {
  const rates: CurrencyRates = {
    USD: 1.0,
    BRL: 5.584,
    EUR: 0.8958,
    JPY: 154.2,
    GBP: 0.7432,
  };

  const dualJpy = getDualCurrencyDisplay(1542, 'JPY', rates, false, 'pt-BR', 'stocks_asia');
  assert.equal(dualJpy.primaryCurrency, 'JPY');
  assert.equal(dualJpy.secondaryCurrency, 'BRL');
  assert.ok(Math.abs(dualJpy.convertedBRL - 55.84) < 0.05);

  const dualGbp = getDualCurrencyDisplay(100, 'GBP', rates, false, 'pt-BR', 'stocks_eu');
  assert.equal(dualGbp.primaryCurrency, 'GBP');
  assert.equal(dualGbp.secondaryCurrency, 'BRL');
  assert.ok(Math.abs(dualGbp.convertedBRL - (100 / 0.7432) * 5.584) < 0.1);
});

test('buildAlignedMarketRates keeps EUR/BRL, USD/BRL, and FX matrix rates synchronized', () => {
  const assets = [
    { id: 'usd_brl', symbol: 'USD/BRL', price: 5.584, category: 'forex' },
    { id: 'eur_brl', symbol: 'EUR/BRL', price: 6.2335, category: 'forex' },
    { id: 'gbp_brl', symbol: 'GBP/BRL', price: 7.512, category: 'forex' },
  ];
  const rawRates: CurrencyRates = {
    USD: 1.0,
    BRL: 5.45, // Divergent raw rate below floor
    EUR: 0.90,
    GBP: 0.75,
  };

  assert.equal(resolveUsdBrlRate(assets, rawRates), 5.584);
  assert.equal(resolveEurBrlRate(assets, rawRates), 6.2335);

  const aligned = buildAlignedMarketRates(assets, rawRates);
  assert.equal(aligned.BRL, 5.584);
  assert.ok(Math.abs(aligned.BRL / aligned.EUR - 6.2335) < 1e-9);
  assert.ok(Math.abs(aligned.BRL / aligned.GBP - 7.512) < 1e-9);
});

test('calculateMarketSentimentIndex falls back to 50 neutral and reacts dynamically to asset variations', () => {
  // Neutral fallback of 50 when empty, invalid, or only initial forex placeholders are present
  assert.equal(calculateMarketSentimentIndex([]).score, 50);
  assert.equal(calculateMarketSentimentIndex([]).zone, 'neutral');
  assert.equal(calculateMarketSentimentIndex([]).hasMarketBreadth, false);

  assert.equal(
    calculateMarketSentimentIndex([{ price: 0, change24h: 2.5, category: 'indices' }]).score,
    50
  );
  assert.equal(
    calculateMarketSentimentIndex([{ price: 5.58, change24h: 1.26, category: 'forex' }]).score,
    50
  );

  // Bullish session -> moderate greed or extreme optimism (> 55)
  const bullish = calculateMarketSentimentIndex([
    { id: 'ibovespa', symbol: 'IBOVESPA', price: 171670, change24h: 1.4, category: 'indices' },
    { id: 'sp500', symbol: 'S&P 500', price: 7575, change24h: 0.9, category: 'indices' },
    { id: 'aapl', symbol: 'AAPL', price: 220, change24h: 1.2, category: 'stocks_us' },
    { id: 'vix', symbol: 'VIX', price: 14.5, change24h: -3.2, category: 'indices' },
    { id: 'usd_brl', symbol: 'USD/BRL', price: 5.58, change24h: 0.3, category: 'forex' },
  ]);
  assert.equal(bullish.hasMarketBreadth, true);
  assert.ok(bullish.score > 65 && bullish.score <= 100);
  assert.ok(bullish.zone === 'moderate_greed' || bullish.zone === 'extreme_optimism');
  assert.equal(bullish.vixPrice, 14.5);

  // Bearish session with VIX surge -> extreme fear (< 25)
  const bearish = calculateMarketSentimentIndex([
    { id: 'ibovespa', symbol: 'IBOVESPA', price: 165000, change24h: -2.6, category: 'indices' },
    { id: 'sp500', symbol: 'S&P 500', price: 6910, change24h: -3.7, category: 'indices' },
    { id: 'aapl', symbol: 'AAPL', price: 190, change24h: -3.0, category: 'stocks_us' },
    { id: 'vix', symbol: 'VIX', price: 35.89, change24h: 26.2, category: 'indices' },
    { id: 'usd_brl', symbol: 'USD/BRL', price: 5.72, change24h: -0.8, category: 'forex' },
  ]);
  assert.equal(bearish.hasMarketBreadth, true);
  assert.ok(bearish.score >= 0 && bearish.score < 25);
  assert.equal(bearish.zone, 'extreme_fear');
  assert.equal(bearish.vixPrice, 35.89);

  // Benchmark weighting reacts strongly when major global indices shift
  const shiftedBenchmarks = calculateMarketSentimentIndex([
    { id: 'sp500', symbol: 'S&P 500', price: 7100, change24h: 2.2, category: 'indices' },
    { id: 'nasdaq', symbol: 'NASDAQ', price: 23500, change24h: 2.8, category: 'indices' },
    { id: 'ibovespa', symbol: 'IBOVESPA', price: 170000, change24h: 1.5, category: 'indices' },
    { id: 'vix', symbol: 'VIX', price: 15.2, change24h: -8.5, category: 'indices' },
    { id: 'minor_fx', symbol: 'ZAR/BRL', price: 0.33, change24h: -0.2, category: 'forex' },
  ]);
  assert.ok(shiftedBenchmarks.score > bearish.score + 50);
});



