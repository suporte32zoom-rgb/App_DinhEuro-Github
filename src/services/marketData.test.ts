import { describe, it } from 'node:test';
import assert from 'node:assert';
import { INITIAL_ASSETS, DEFAULT_UNIVERSAL_RATES } from './marketData';
import { getDualCurrencyDisplay } from '../utils/finance';

describe('Real-Time Market Data Engine & Catalog Expansion', () => {
  it('contains comprehensive catalog of 95+ assets across all market categories', () => {
    assert.ok(INITIAL_ASSETS.length >= 95, `Expected >= 95 assets, got ${INITIAL_ASSETS.length}`);

    const categories = new Set(INITIAL_ASSETS.map((a) => a.category));
    assert.ok(categories.has('indices'), 'Missing indices');
    assert.ok(categories.has('stocks_us'), 'Missing US stocks');
    assert.ok(categories.has('stocks_br'), 'Missing B3 Brazilian stocks');
    assert.ok(categories.has('forex'), 'Missing forex pairs');
    assert.ok(categories.has('crypto'), 'Missing crypto assets');
    assert.ok(categories.has('commodities'), 'Missing commodities');
  });

  it('guarantees every asset in initial catalog has valid symbol, category, currency and flag', () => {
    for (const asset of INITIAL_ASSETS) {
      assert.ok(asset.id, `Asset missing id`);
      assert.ok(asset.symbol, `Asset missing symbol`);
      assert.ok(asset.name, `Asset ${asset.symbol} missing name`);
      assert.ok(asset.category, `Asset ${asset.symbol} missing category`);
      assert.ok(asset.currency && asset.currency.length >= 3, `Asset ${asset.symbol} missing currency`);
      assert.ok(asset.flag, `Asset ${asset.symbol} missing flag or category icon`);
      assert.ok(Array.isArray(asset.sparkline), `Asset ${asset.symbol} missing sparkline array`);
    }
  });

  it('provides accurate dual currency display (Native & Converted BRL) for all assets', () => {
    // US Stock in USD -> displays USD and converted BRL
    const appleDual = getDualCurrencyDisplay(349.51, 'USD', DEFAULT_UNIVERSAL_RATES);
    assert.strictEqual(appleDual.primaryCurrency, 'USD');
    assert.strictEqual(appleDual.secondaryCurrency, 'BRL');
    assert.ok(appleDual.convertedBRL > 1800, `Expected BRL value > 1800, got ${appleDual.convertedBRL}`);

    // B3 Stock in BRL -> displays BRL and converted USD
    const petrDual = getDualCurrencyDisplay(47.20, 'BRL', DEFAULT_UNIVERSAL_RATES);
    assert.strictEqual(petrDual.primaryCurrency, 'BRL');
    assert.strictEqual(petrDual.secondaryCurrency, 'USD');
    assert.ok(petrDual.convertedUSD > 8 && petrDual.convertedUSD < 12, `Expected USD value ~8-12, got ${petrDual.convertedUSD}`);
  });

  it('contains balanced representation of market segments', () => {
    const counts = INITIAL_ASSETS.reduce((acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    assert.ok(counts.indices >= 10, 'Expected at least 10 indices');
    assert.ok(counts.stocks_us >= 20, 'Expected at least 20 US stocks');
    assert.ok(counts.stocks_br >= 20, 'Expected at least 20 B3 stocks');
    assert.ok(counts.crypto >= 10, 'Expected at least 10 cryptos');
    assert.ok(counts.commodities >= 10, 'Expected at least 10 commodities');
    assert.ok(counts.forex >= 12, 'Expected at least 12 forex pairs');
  });

  it('provides tri-currency conversion including EUR and tertiaryFormatted', () => {
    const dual = getDualCurrencyDisplay(100, 'USD', DEFAULT_UNIVERSAL_RATES);
    assert.strictEqual(dual.primaryCurrency, 'USD');
    assert.strictEqual(dual.secondaryCurrency, 'BRL');
    assert.ok(dual.convertedEUR > 0, `Expected positive EUR converted value, got ${dual.convertedEUR}`);
    assert.ok(dual.tertiaryFormatted && dual.tertiaryFormatted.includes('€'), `Expected EUR tertiaryFormatted, got ${dual.tertiaryFormatted}`);
    assert.ok(dual.summaryTriCurrency.includes('R$') && dual.summaryTriCurrency.includes('€'));
  });

  it('validates exact 104 assets in catalog and zero obsolete hardcoded static prices', () => {
    assert.strictEqual(INITIAL_ASSETS.length, 104, `Expected exactly 104 assets, got ${INITIAL_ASSETS.length}`);

    // Verify initial state has zero obsolete hardcoded static numbers
    const sp500 = INITIAL_ASSETS.find((a) => a.symbol === 'S&P 500');
    assert.ok(sp500, 'S&P 500 must exist');
    assert.notStrictEqual(sp500.price, 5885, 'Obsolete hardcoded price 5885 must be removed');

    const dow = INITIAL_ASSETS.find((a) => a.symbol === 'DOW JONES');
    assert.ok(dow, 'Dow Jones must exist');
    assert.notStrictEqual(dow.price, 43720, 'Obsolete hardcoded price 43720 must be removed');

    const ibov = INITIAL_ASSETS.find((a) => a.symbol === 'IBOVESPA');
    assert.ok(ibov, 'Ibovespa must exist');
    assert.notStrictEqual(ibov.price, 132450, 'Obsolete hardcoded price 132450 must be removed');
  });

  it('dynamically populates assets when live API quotes are ingested', async () => {
    const { fetchLiveMarketDataFromAPIs } = await import('./marketData');
    const mockLiveQuotes: Record<string, any> = {
      'S&P 500': { price: 7575.40, changePercent: 0.85, high: 7590.0, low: 7550.0 },
      'DOW JONES': { price: 52514.42, changePercent: 0.42, high: 52600.0, low: 52400.0 },
      'NASDAQ': { price: 25346.44, changePercent: 1.15, high: 25400.0, low: 25200.0 },
      'IBOVESPA': { price: 171670.27, changePercent: 0.65, high: 172000.0, low: 171000.0 },
      'AAPL': { price: 349.50, changePercent: 1.20, high: 352.0, low: 347.0 },
      'PETR4': { price: 47.30, changePercent: -0.40, high: 48.0, low: 46.9 },
    };

    const result = await fetchLiveMarketDataFromAPIs(INITIAL_ASSETS, mockLiveQuotes);
    const updatedSp500 = result.updatedAssets.find((a) => a.symbol === 'S&P 500');
    assert.ok(updatedSp500 && updatedSp500.price === 7575.40, 'S&P 500 must receive live price');
    assert.strictEqual(updatedSp500.currency, 'PTS');
    assert.ok(updatedSp500.sparkline.length >= 4, 'Sparkline generated dynamically');

    const updatedDow = result.updatedAssets.find((a) => a.symbol === 'DOW JONES');
    assert.ok(updatedDow && updatedDow.price === 52514.42, 'Dow Jones must receive live price');

    const updatedIbov = result.updatedAssets.find((a) => a.symbol === 'IBOVESPA');
    assert.ok(updatedIbov && updatedIbov.price === 171670.27, 'Ibovespa must receive live price');
  });
});


