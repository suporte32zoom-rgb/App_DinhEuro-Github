import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  extractYahooChartOHLCV,
  reconcileSilverSpotParity,
  auditSplitAndFractionSanity,
} from './marketParsing';

describe('Market Parsing, Spot Metals Parity & Split Sanity Audit', () => {
  it('extracts real B3 High, Low, Open and Volume from indicators.quote when Yahoo meta returns 0', () => {
    const petr4YahooPayload = {
      chart: {
        result: [
          {
            meta: {
              currency: 'BRL',
              symbol: 'PETR4.SA',
              regularMarketPrice: 45.3,
              chartPreviousClose: 44.7,
              regularMarketDayHigh: 0,
              regularMarketDayLow: 0,
              regularMarketVolume: 0,
            },
            indicators: {
              quote: [
                {
                  open: [44.89],
                  high: [45.44],
                  low: [44.62],
                  close: [45.3],
                  volume: [23439200],
                },
              ],
            },
          },
        ],
      },
    };

    const parsed = extractYahooChartOHLCV(petr4YahooPayload, 2);
    assert.ok(parsed, 'Parsed result should not be null');
    assert.strictEqual(parsed.price, 45.3);
    assert.strictEqual(parsed.high, 45.44);
    assert.strictEqual(parsed.low, 44.62);
    assert.strictEqual(parsed.open, 44.89);
    assert.strictEqual(parsed.volumeFormatted, '23.4M');
    assert.notStrictEqual(parsed.high, parsed.price, 'High must not replicate closing price');
    assert.notStrictEqual(parsed.low, parsed.price, 'Low must not replicate closing price');
  });

  it('reconciles Silver (XAG) Spot parity per troy ounce against Gold (XAU)', () => {
    // 1. Valid live Spot XAU & XAG
    const validSpot = reconcileSilverSpotParity({
      goldSpotUsd: 3887.6,
      silverCandidateUsd: 48.65,
      futuresPrice: 49.12,
      futuresHigh: 50.73,
      futuresLow: 48.41,
      futuresPrevClose: 50.06,
    });
    assert.strictEqual(validSpot.price, 48.65);
    assert.strictEqual(validSpot.adjustedFromAnomaly, false);
    assert.ok(validSpot.goldSilverRatio > 75 && validSpot.goldSilverRatio < 85);
    assert.ok(validSpot.high >= validSpot.price && validSpot.low <= validSpot.price);

    // 2. US-cents anomaly (e.g. 4865 cents -> $48.65/oz)
    const centsNormalized = reconcileSilverSpotParity({
      goldSpotUsd: 3887.6,
      silverCandidateUsd: 4865,
    });
    assert.strictEqual(centsNormalized.price, 48.65);
    assert.strictEqual(centsNormalized.adjustedFromAnomaly, true);

    // 3. Per-gram anomaly (~1.564 USD/g -> ~$48.65/troy oz)
    const gramsNormalized = reconcileSilverSpotParity({
      goldSpotUsd: 3887.6,
      silverCandidateUsd: 1.5641,
    });
    assert.ok(Math.abs(gramsNormalized.price - 48.65) < 0.05);
    assert.strictEqual(gramsNormalized.adjustedFromAnomaly, true);

    // 4. Missing/zero Silver recalculated from Gold parity
    const recalculated = reconcileSilverSpotParity({
      goldSpotUsd: 3887.6,
      silverCandidateUsd: null,
    });
    assert.ok(recalculated.price > 45 && recalculated.price < 52);
    assert.strictEqual(recalculated.adjustedFromAnomaly, true);
  });

  it('audits AMD primary exchange quote and resolves any split/fraction divergence', () => {
    // Normal verified match (Yahoo $534.06 vs Nasdaq $534.06)
    const aligned = auditSplitAndFractionSanity({
      yahooPrice: 534.06,
      primaryExchangePrice: 534.06,
      primaryExchangeChange: -51.24,
      primaryExchangeChangePct: -8.75,
    });
    assert.strictEqual(aligned.resolvedPrice, 534.06);
    assert.strictEqual(aligned.divergenceDetected, false);

    // Unadjusted split or fraction anomaly (e.g. Yahoo half/2x divergent vs Nasdaq)
    const splitDivergence = auditSplitAndFractionSanity({
      yahooPrice: 1068.12,
      primaryExchangePrice: 534.06,
      primaryExchangeChange: -51.24,
      primaryExchangeChangePct: -8.75,
    });
    assert.strictEqual(splitDivergence.resolvedPrice, 534.06);
    assert.strictEqual(splitDivergence.resolvedChange, -51.24);
    assert.strictEqual(splitDivergence.resolvedChangePct, -8.75);
    assert.strictEqual(splitDivergence.divergenceDetected, true);
  });
});
