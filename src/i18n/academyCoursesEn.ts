import type { AcademyCourse, AcademyFaqItem } from '../data/academyCourses';

export const ACADEMY_COURSES_EN: Record<
  string,
  Pick<AcademyCourse, 'title' | 'shortTitle' | 'duration' | 'description' | 'shortDescription' | 'objective'> & {
    modules: Array<{
      id: string;
      title: string;
      duration: string;
      summary: string;
      paragraphs: string[];
      numericExample: {
        title: string;
        scenario: string;
        steps: string[];
        result: string;
      };
      keyConcepts: Array<{ term: string; explanation: string }>;
      targetButtonLabel: string;
      targetDescription: string;
    }>;
  }
> = {
  'renda-fixa-tesouro': {
    title: 'Fixed Income & Sovereign Bonds Fundamentals',
    shortTitle: 'Fixed Income & Bonds',
    duration: '1h 20min',
    description:
      'Master the relationship between Selic, CDI, and IPCA, understand mark-to-market pricing on sovereign bonds, and compare CDB, LCI, and LCA on a real net-of-tax basis.',
    shortDescription:
      'Selic, CDI, IPCA, mark-to-market pricing, and comparing sovereign vs bank securities net of tax.',
    objective:
      'Build a solid liquidity reserve and real-yield portfolio with structured maturity management.',
    modules: [
      {
        id: 'rf-m1',
        title: 'Selic, CDI, and IPCA: How Real Interest Shapes Wealth',
        duration: '20 min',
        summary:
          'Understand the difference between nominal return and real interest rate net of official inflation.',
        paragraphs: [
          'Every fixed income decision starts by separating nominal rate from real interest rate. The nominal rate is the headline percentage advertised by the bond (e.g., 13.75% per year on Selic), whereas the real rate measures how much purchasing power your capital actually gains above inflation (IPCA).',
          'In Brazil, the Central Bank’s Copom sets the target Selic rate to anchor price stability. Meanwhile, the CDI tracks the Selic closely (historically about 0.10 percentage points below) and serves as the benchmark index for CDBs, LCIs, LCAs, and money-market funds.',
          'To evaluate whether an investment preserves purchasing power, never simply subtract inflation from the nominal rate: the exact calculation uses the Fisher equation, dividing accumulated growth factors over 12 months.',
        ],
        numericExample: {
          title: 'Real Interest Calculation (Fisher Equation)',
          scenario:
            'Investment of R$ 50,000.00 yielding 13.75% p.a. (Selic) in a year with projected IPCA inflation of 5.22% p.a.',
          steps: [
            'Gross nominal factor: 1 + 0.1375 = 1.1375',
            'Net return after 17.5% income tax (361–720 days): 13.75% × (1 - 0.175) = 11.34% p.a. → factor 1.1134',
            'Inflation factor (IPCA): 1 + 0.0522 = 1.0522',
            'Net real interest = (1.1134 ÷ 1.0522) - 1 = 0.05816',
          ],
          result:
            'Net real gain of +5.82% above inflation (equivalent to R$ 2,908.00 in additional purchasing power in year one).',
        },
        keyConcepts: [
          {
            term: 'Target Selic Rate',
            explanation:
              'Brazil’s benchmark base interest rate set by the Monetary Policy Committee (Copom) roughly every 45 days.',
          },
          {
            term: 'CDI (Interbank Deposit Rate)',
            explanation:
              'Daily reference rate for interbank overnight loans; benchmark for 90% of floating-rate private fixed income.',
          },
          {
            term: 'Real Yield (Fisher)',
            explanation:
              'Effective return remaining after deducting income tax and official period inflation.',
          },
        ],
        targetButtonLabel: 'Test on Fixed Income Desk',
        targetDescription:
          'Compare Selic, Fixed-Rate, and IPCA+ bonds with real-time net projections.',
      },
      {
        id: 'rf-m2',
        title: 'Tesouro Selic, Fixed-Rate, and IPCA+: Mark-to-Market',
        duration: '22 min',
        summary:
          'Learn why long-dated bonds fluctuate before maturity and how duration drives early capital gains or losses.',
        paragraphs: [
          'Brazilian sovereign bonds (Tesouro Direto) fall into three main families: floating-rate (Tesouro Selic), fixed-rate (Tesouro Prefixado), and inflation-linked hybrids (Tesouro IPCA+). Only Tesouro Selic exhibits near-zero daily price volatility on early redemption.',
          'For fixed-rate and IPCA+ bonds, market prices move inversely to prevailing market yields every day—a mechanism called mark-to-market. If you buy a bond paying IPCA + 6.50% and yields fall to IPCA + 5.50%, the unit price (PU) jumps immediately.',
          'A bond’s sensitivity to interest rate shifts is measured by Duration. The longer the remaining maturity and the smaller the interim coupons, the larger the percentage swing in bond price.',
        ],
        numericExample: {
          title: 'Mark-to-Market Impact on a Long IPCA+ Bond',
          scenario:
            'Tesouro IPCA+ bond with a 12-year duration purchased at a real yield of 6.50% p.a. for R$ 10,000.00.',
          steps: [
            'Drop in market real yield: from 6.50% to 5.50% (-1.00 percentage point)',
            'Modified duration approximation: ΔP ≈ -Duration × ΔYield',
            'Estimated price appreciation: -12 × (-1.00%) = +12.0% immediate capital gain',
            'Estimated adjusted value: R$ 10,000.00 × 1.12 = R$ 11,200.00 (plus accrued carry)',
          ],
          result:
            'Held to maturity, the investor earns the exact contracted yield; sold early, the position settles at that day’s market price.',
        },
        keyConcepts: [
          {
            term: 'Mark-to-Market (MtM)',
            explanation:
              'Daily revaluation of a bond’s early-exit price based on forward interest rates traded in the market.',
          },
          {
            term: 'Modified Duration',
            explanation:
              'Metric in years estimating how much a bond’s price changes for each 1% shift in interest rates.',
          },
          {
            term: 'Unit Price (PU)',
            explanation:
              'Financial price of 1 full unit of a sovereign bond traded on B3 and Tesouro Direto.',
          },
        ],
        targetButtonLabel: 'Simulate Mark-to-Market & DI Curve',
        targetDescription:
          'Visualize yield curves and theoretical fixed income prices in Fixed Income & Derivatives.',
      },
      {
        id: 'rf-m3',
        title: 'CDB, LCI, LCA, and Corporate Bonds: Comparing Net Yield',
        duration: '20 min',
        summary:
          'Calculate tax equivalence between tax-exempt instruments (LCI/LCA) and taxable bonds (CDB/Treasury).',
        paragraphs: [
          'Private bank certificates offer Deposit Guarantee Fund (FGC) protection up to R$ 250,000 per taxpayer ID and bank, capped at R$ 1 million every 4 years. Corporate debentures lack FGC backing, requiring careful issuer credit-rating analysis.',
          'A frequent beginner mistake is directly comparing gross % of CDI between a CDB and an LCI or LCA. While CDB returns face regressive income tax (22.5% up to 180 days; 20% for 181–360 days; 17.5% for 361–720 days; 15% above 720 days), LCIs and LCAs are tax-exempt for individuals.',
          'To make a rational choice across equal credit risk and maturity, multiply the CDB rate by (1 - tax rate) and compare directly against the net LCI/LCA percentage.',
        ],
        numericExample: {
          title: 'LCI 92% CDI vs CDB 112% CDI Equivalence',
          scenario:
            'R$ 20,000.00 invested for 24 months (15% income tax bracket on CDB; 13.65% p.a. CDI base).',
          steps: [
            'Gross CDB at 112% CDI: 112% × 13.65% = 15.29% p.a. gross',
            'After 15% tax deduction: 15.29% × 0.85 = 12.99% p.a. net (or 95.2% net of CDI)',
            'Tax-exempt LCI at 92% CDI: 92% × 13.65% = 12.56% p.a. net',
            'Direct gross-up equivalence: LCI 92% CDI equals a CDB paying 92% ÷ 0.85 = 108.24% of CDI',
          ],
          result:
            'Over this 24-month horizon, the 112% CDI CDB delivers a higher net return than the 92% CDI LCI.',
        },
        keyConcepts: [
          {
            term: 'Regressive Income Tax Table',
            explanation:
              'Tax rate on investment gains falls with holding time: 22.5% (≤180d), 20% (181–360d), 17.5% (361–720d), and 15% (>720d).',
          },
          {
            term: 'FGC (Credit Guarantee Fund)',
            explanation:
              'Private safety net covering deposits, CDBs, LCIs, and LCAs up to R$ 250k per institution and taxpayer ID.',
          },
          {
            term: 'Tax Gross-Up',
            explanation:
              'Dividing a tax-exempt yield by (1 - tax rate) to find the equivalent taxable CDB headline yield.',
          },
        ],
        targetButtonLabel: 'Calculate in Compound Interest Tool',
        targetDescription:
          'Project long-term wealth accumulation applying the calculated net return rate.',
      },
      {
        id: 'rf-m4',
        title: 'Emergency Reserve and Bond Ladder Strategy',
        duration: '18 min',
        summary:
          'Structure immediate liquidity without sacrificing long-term yields using staggered maturities.',
        paragraphs: [
          'Your emergency fund should sit strictly in daily-liquidity assets (D+0 or D+1) with sovereign or top-tier bank credit, such as Tesouro Selic or 100% CDI instant-redemption CDBs. Its goal is never chasing top yield, but preventing forced selling of volatile assets during downturns.',
          'For medium- and long-term goals, the institutional Bond Ladder technique distributes capital across bonds maturing in successive windows (for example, 1, 2, 3, and 5 years).',
          'As each rung matures, principal and accumulated interest are either deployed or rolled into the longest rung of the ladder, smoothing reinvestment risk and dampening yield-curve volatility.',
        ],
        numericExample: {
          title: 'Emergency Reserve + 4-Rung Bond Ladder Allocation',
          scenario:
            'Fixed income portfolio of R$ 100,000.00 with monthly living expenses of R$ 5,000.00.',
          steps: [
            'Layer 1 — Emergency Reserve (6 months expenses): R$ 30,000.00 in Tesouro Selic (immediate liquidity)',
            'Layer 2 — 4-rung ladder with remaining R$ 70,000.00 (R$ 17,500.00 per maturity):',
            '1Y Rung: 105% CDI CDB | 2Y Rung: 94% CDI LCI | 3Y Rung: IPCA+ 6.4% | 5Y Rung: IPCA+ 6.6%',
            'Every 12 months, R$ 17,500.00 + interest matures organically without mark-to-market haircut risk.',
          ],
          result:
            'Balances R$ 30k in instant liquidity alongside R$ 70k compounding real yields without forced early sales.',
        },
        keyConcepts: [
          {
            term: 'D+0 / D+1 Liquidity',
            explanation:
              'Settlement window in business days between redemption request and cash hitting your checking account.',
          },
          {
            term: 'Bond Ladder',
            explanation:
              'Staggered maturity allocation balancing recurring cash availability with higher long-term yields.',
          },
          {
            term: 'Reinvestment Risk',
            explanation:
              'Risk that prevailing interest rates have fallen when an existing bond matures and proceeds must be reinvested.',
          },
        ],
        targetButtonLabel: 'Build Simulation in Fixed Income',
        targetDescription:
          'Explore maturities, benchmarks, and rate sensitivity in the dedicated Fixed Income & Derivatives tool.',
      },
    ],
  },
  'cambio-dolar-protecao': {
    title: 'FX Market, Dollar & International Protection',
    shortTitle: 'FX, Dollar & Protection',
    duration: '1h 35min',
    description:
      'Understand commercial FX, EUR/USD and USD/BRL cross pairs, spread and tax impacts, plus gradual hard-currency accumulation strategies.',
    shortDescription:
      'Commercial vs tourist FX, EUR/USD & USD/BRL crosses, IOF tax, spreads, and gradual FX averaging.',
    objective:
      'Protect international purchasing power while cutting operational costs on remittances and currency conversions.',
    modules: [
      {
        id: 'fx-m1',
        title: 'Commercial vs Tourist FX, Bank Spread, and IOF Tax',
        duration: '22 min',
        summary:
          'Learn why over-the-counter cash costs far more than the interbank rate and how to compute Total Effective Value (VET).',
        paragraphs: [
          'Foreign exchange markets distinguish between commercial FX (the interbank benchmark used for trade, wires, and global investing) and tourist FX (physical banknotes burdened by logistics, custody, and wider dealer markups).',
          'Beyond the spot/PTAX benchmark quote, every retail conversion embeds two crucial cost layers: the institution’s spread (ranging from 0.3% at global brokers up to 5.5% at legacy banks) and applicable FX transaction taxes (IOF).',
          'Consequently, the only valid metric for comparing providers is Total Effective Value (VET)—the exact all-in amount paid per Dollar or Euro after combining quote, spread, and taxes.',
        ],
        numericExample: {
          title: 'US$ 2,000.00 Wire Comparison: Legacy Bank vs Global Account',
          scenario:
            'Commercial USD/BRL spot at R$ 5.5840. Transferring US$ 2,000.00 to same-ownership investment account (1.1% IOF).',
          steps: [
            'Pure commercial value: 2,000 × R$ 5.5840 = R$ 11,168.00',
            'Scenario A (1.0% Spread + 1.1% IOF): R$ 11,168.00 × 1.010 × 1.011 = R$ 11,403.76 (VET: R$ 5.7019/US$)',
            'Scenario B (Legacy bank 4.5% Spread + 1.1% IOF): R$ 11,168.00 × 1.045 × 1.011 = R$ 11,798.94 (VET: R$ 5.8995/US$)',
          ],
          result:
            'Choosing efficient FX rails saves R$ 395.18 on a single US$ 2,000.00 remittance (3.35% cost reduction).',
        },
        keyConcepts: [
          {
            term: 'VET (Total Effective Value)',
            explanation:
              'True all-in cost per unit of foreign currency including exchange rate, institution spread, and taxes.',
          },
          {
            term: 'PTAX (Central Bank)',
            explanation:
              'Weighted average FX rate published daily by the Central Bank of Brazil across 4 dealer polling windows.',
          },
          {
            term: 'FX Spread',
            explanation:
              'Percentage markup charged by a broker or bank above the wholesale interbank market rate.',
          },
        ],
        targetButtonLabel: 'Open Universal FX Calculator',
        targetDescription:
          'Simulate real-time global interbank quotes with itemized Spread and IOF calculations.',
      },
      {
        id: 'fx-m2',
        title: 'Cross Parities (EUR/USD, USD/BRL) and Interest Differentials',
        duration: '25 min',
        summary:
          'See how Euro vs Real reflects both global Dollar strength and local risk premia.',
        paragraphs: [
          'The EUR/BRL exchange rate does not move in isolation: mathematically, it is the product of USD/BRL and the global EUR/USD parity.',
          'Whenever US inflation or employment surprises strengthen the US Dollar globally, EUR/USD tends to fall while USD/BRL often climbs. Grasping this dual gear prevents misreading European currency moves.',
          'Another structural driver is the interest rate differential (Carry Trade). When domestic rates offer a substantial premium above Fed Funds and ECB rates, foreign fixed-income inflows tend to cushion local currency depreciation.',
        ],
        numericExample: {
          title: 'Cross Decomposition of EUR/BRL via USD/BRL and EUR/USD',
          scenario:
            'Session closing with interbank USD/BRL at R$ 5.5840 and EUR/BRL at R$ 6.2335.',
          steps: [
            'Implied international parity: EUR/USD = EUR/BRL ÷ USD/BRL',
            '6.2335 ÷ 5.5840 = 1.1163 dollars per euro',
            'If Euro appreciates +2% vs Dollar (EUR/USD reaching 1.1386) while USD/BRL holds steady at 5.5840:',
            'Projected new EUR/BRL = 5.5840 × 1.1386 = R$ 6.3579 (+2.00%)',
          ],
          result:
            'Even without domestic headlines in Brazil, EUR/BRL shifts proportionally whenever ECB and Fed policy moves EUR/USD.',
        },
        keyConcepts: [
          {
            term: 'Cross Rate',
            explanation:
              'Exchange rate between two currencies derived indirectly via a common pivot currency (typically USD).',
          },
          {
            term: 'Carry Trade',
            explanation:
              'Strategy borrowing in low-yielding currencies to invest in currencies with higher real interest rates.',
          },
          {
            term: 'DXY Index',
            explanation:
              'Weighted basket measuring US Dollar strength against six major global currencies (Euro carries a 57.6% weight).',
          },
        ],
        targetButtonLabel: 'Convert Crosses in Calculator',
        targetDescription:
          'Switch between EUR, USD, GBP, CHF, and BRL in real time on the Universal FX Calculator.',
      },
      {
        id: 'fx-m3',
        title: 'Gradual USD & EUR Allocation (Dollar Cost Averaging)',
        duration: '24 min',
        summary:
          'Replace guessing currency bottoms with recurring scheduled buys that smooth your average entry.',
        paragraphs: [
          'Trying to time the exact bottom of exchange rates often leads to paralysis: when FX falls, buyers wait for lower prints; when fiscal or geopolitical shocks hit, they panic-buy near peaks.',
          'Institutional wealth managers rely on FX Dollar Cost Averaging (DCA): splitting planned capital into fixed periodic local-currency contributions (weekly or monthly). When USD or EUR dips, the same budget buys more hard currency; when it spikes, it buys less.',
          'Beyond lowering weighted average entry cost over medium horizons, this discipline steadily builds hard-currency reserves for travel, education, or global retirement.',
        ],
        numericExample: {
          title: 'Monthly R$ 2,500.00 DCA Across 4 Volatile Months',
          scenario:
            'Fixed monthly buys of R$ 2,500.00 as EUR/BRL fluctuates across R$ 6.10, R$ 6.40, R$ 5.95, and R$ 6.25.',
          steps: [
            'Month 1 (R$ 6.10): R$ 2,500 ÷ 6.10 = € 409.84',
            'Month 2 (R$ 6.40): R$ 2,500 ÷ 6.40 = € 390.63',
            'Month 3 (R$ 5.95): R$ 2,500 ÷ 5.95 = € 420.17',
            'Month 4 (R$ 6.25): R$ 2,500 ÷ 6.25 = € 400.00',
            'Cumulative total: R$ 10,000.00 converted into € 1,620.64',
          ],
          result:
            'Effective average cost achieved: R$ 10,000 ÷ € 1,620.64 = R$ 6.1704 per Euro (below the simple arithmetic average of R$ 6.1750).',
        },
        keyConcepts: [
          {
            term: 'DCA (Dollar Cost Averaging)',
            explanation:
              'Periodic fixed-amount purchases in domestic currency designed to dilute exchange-rate timing risk.',
          },
          {
            term: 'Portfolio Currency Hedge',
            explanation:
              'Portion of wealth held in hard currencies to safeguard global purchasing power and reduce country risk.',
          },
          {
            term: 'Harmonic Mean',
            explanation:
              'Mathematical property of DCA ensuring average cost sits below the simple price mean by buying more units on dips.',
          },
        ],
        targetButtonLabel: 'Log Position in Portfolios',
        targetDescription:
          'Track your portfolio diversification across BRL, USD, and EUR in real time.',
      },
      {
        id: 'fx-m4',
        title: 'Global Accounts, International Brokers, and Taxation',
        duration: '24 min',
        summary:
          'Distinguish multi-currency spending accounts from regulated offshore brokers with SIPC custody protection.',
        paragraphs: [
          'Holding idle cash in an international checking account shields against domestic FX depreciation, yet leaves purchasing power exposed to US or European inflation (CPI). To preserve real value in USD or EUR, funds can be deployed into US Treasuries, accumulating Irish UCITS ETFs, or global equities.',
          'When selecting international brokers, always verify regulatory oversight (SEC/FINRA in the US, FCA in the UK, BaFin or ECB supervision in the Eurozone) and investor protection regimes like SIPC (covering up to US$ 500k in US brokerage custody).',
          'On the tax front for Brazilian residents investing abroad, realized capital gains and dividends follow annual assessment at a unified 15% rate on BRL-denominated profits (Law 14,754), making organized remittance and cost-basis logs essential.',
        ],
        numericExample: {
          title: 'External Inflation Erosion vs Short-Term US Treasury in USD',
          scenario:
            'US$ 10,000.00 held idle in checking vs invested in short-term US Treasuries at 4.20% p.a. (CPI 2.6% p.a.).',
          steps: [
            'Zero-yield checking after 3 years: US$ 10,000 nominal, but real purchasing power drops to US$ 9,259 (-7.4%)',
            'Short-term Treasury at 4.20% p.a. gross over 3 years: US$ 10,000 × (1.042)³ = US$ 11,313.66',
            '15% tax on US$ 1,313.66 nominal gain at exit: US$ 197.05 → net ending balance of US$ 11,116.61',
          ],
          result:
            'Productive USD fixed income outpaces US inflation and adds US$ 1,116.61 net above hard-currency principal.',
        },
        keyConcepts: [
          {
            term: 'SIPC / FDIC',
            explanation:
              'US investor protection schemes: SIPC covers up to US$ 500k in securities held at member brokerages.',
          },
          {
            term: 'US Treasuries / T-Bills',
            explanation:
              'Sovereign debt issued by the US Treasury, regarded as the global risk-free asset benchmark.',
          },
          {
            term: 'Irish ETFs (UCITS)',
            explanation:
              'Ireland-domiciled funds that cut US dividend withholding tax from 30% to 15% under bilateral tax treaties.',
          },
        ],
        targetButtonLabel: 'Compare Global Brokers',
        targetDescription:
          'Browse the full directory of regulated Brazilian and international brokers with official links.',
      },
    ],
  },
  'analise-tecnica-acoes-cripto': {
    title: 'Technical Analysis, Equities & Crypto Assets',
    shortTitle: 'Technical Analysis, Stocks & Crypto',
    duration: '1h 40min',
    description:
      'Combine professional charting (candlesticks, moving averages, risk/reward) with equity valuation multiples across B3 and Wall Street plus crypto risk sizing.',
    shortDescription:
      'Candlesticks, SMA 20/50/200, P/E and EV/EBITDA multiples, crypto cycles, and risk sizing.',
    objective:
      'Select equities and crypto assets using technical discipline, sound fundamentals, and strict max-loss control.',
    modules: [
      {
        id: 'at-m1',
        title: 'Japanese Candlesticks, Support, Resistance & Risk/Reward',
        duration: '25 min',
        summary:
          'Read buyer and seller psychology inside every candle and structure 1:3 asymmetric setups.',
        paragraphs: [
          'Every Japanese candlestick encodes four prices for its timeframe: Open, High, Low, and Close. The body captures the net battle between buyers and sellers, while wicks (shadows) expose price rejection at extremes.',
          'Support zones concentrate buying interest strong enough to halt declines; resistance zones concentrate selling supply. Once a key resistance breaks on above-average volume, polarity often flips, turning prior resistance into new support.',
          'Maintaining a favorable Risk/Reward ratio matters far more than hitting an 80% win rate. With a target 3× wider than your stop loss (1:3 asymmetry), even a 40% win rate produces consistent positive expectancy.',
        ],
        numericExample: {
          title: 'Structured 1:3 Asymmetric Trade on a B3 Stock',
          scenario:
            'Stock breaks resistance at R$ 36.00 with technical stop loss below prior swing low at R$ 34.50 and target at R$ 40.50.',
          steps: [
            'Risk per share: R$ 36.00 - R$ 34.50 = R$ 1.50 (4.17% below entry)',
            'Potential upside to target: R$ 40.50 - R$ 36.00 = R$ 4.50 (+12.50%)',
            'Reward-to-Risk ratio: R$ 4.50 ÷ R$ 1.50 = 3.0 (3 to 1)',
            'Maximum accepted capital loss = R$ 600.00 → Ideal share size: R$ 600 ÷ R$ 1.50 = 400 shares',
          ],
          result:
            'A 400-share position caps a stop-out at exactly R$ 600.00 while targeting R$ 1,800.00 gross profit.',
        },
        keyConcepts: [
          {
            term: 'OHLC (Open, High, Low, Close)',
            explanation:
              'The four structural price points forming every candlestick over the selected chart timeframe.',
          },
          {
            term: 'Polarity Flip',
            explanation:
              'Chart behavior where a broken resistance level subsequently acts as a new support floor (or vice versa).',
          },
          {
            term: 'Position Sizing',
            explanation:
              'Calculating exact share quantity by dividing maximum acceptable dollar risk by stop-loss distance.',
          },
        ],
        targetButtonLabel: 'Open D3 v7 Chart Terminal',
        targetDescription:
          'Inspect candlesticks, highs, lows, and support zones across global catalog assets.',
      },
      {
        id: 'at-m2',
        title: 'Moving Averages (SMA 20/50/200), Volume & Trend Confirmation',
        duration: '25 min',
        summary:
          'Use moving averages to filter daily noise and identify institutional bull or bear regimes.',
        paragraphs: [
          'Simple Moving Averages (SMA) smooth short-term noise by averaging the last N closing prices. In institutional practice, the SMA 20 tracks short-term momentum, the SMA 50 frames the intermediate trend, and the SMA 200 acts as the major dividing line between bull and bear regimes.',
          'When the SMA 20 or SMA 50 crosses above a rising SMA 200 (Golden Cross), medium-term bullish bias strengthens. The inverse crossover (Death Cross) warns of structural momentum deterioration.',
          'However, moving averages act as trend filters and whip-saw in sideways consolidations. Pair them with volume confirmation: breakouts without expanding volume carry high odds of bull or bear traps.',
        ],
        numericExample: {
          title: 'Trend Filter Using SMA 20 and SMA 50',
          scenario:
            'Wall Street stock trading at US$ 218.00 with SMA 20 at US$ 212.40, SMA 50 at US$ 204.10, and volume 45% above its 20-day average.',
          steps: [
            'Bullish alignment: Price (218.00) > SMA 20 (212.40) > SMA 50 (204.10)',
            'Healthy distance above SMA 20: (218.00 - 212.40) ÷ 212.40 = +2.64% (not overextended)',
            'Pullbacks toward the SMA 20 offer disciplined entry zones with a technical stop below the SMA 50.',
          ],
          result:
            'Upward-sloping moving average alignment paired with volume expansion confirms institutional sponsorship.',
        },
        keyConcepts: [
          {
            term: 'SMA 20 / 50 / 200',
            explanation:
              '20-, 50-, and 200-period Simple Moving Averages tracking short-, medium-, and long-term price trends.',
          },
          {
            term: 'Golden Cross',
            explanation:
              'Bullish crossover of a shorter moving average (such as the 50-day) above the long-term 200-day average.',
          },
          {
            term: 'False Breakout',
            explanation:
              'Brief push past resistance on weak volume followed by rapid price reversal back inside the prior range.',
          },
        ],
        targetButtonLabel: 'Plot SMA 20 & 50 on Chart',
        targetDescription:
          'Enable moving-average overlays and interactive volume bars in DinhEuro’s chart engine.',
      },
      {
        id: 'at-m3',
        title: 'Fundamental Multiples (P/E, EV/EBITDA, DY) on B3 & Wall St',
        duration: '25 min',
        summary:
          'Assess whether a stock is cheap or expensive by comparing earnings, operating cash flow, and dividends.',
        paragraphs: [
          'While charts help time entries, fundamentals reveal business quality and intrinsic value. The Price-to-Earnings (P/E) ratio indicates how many years of current earnings the market pays for a company—ideal for comparing mature peers in the same industry.',
          'When comparing companies with differing debt loads, institutional analysts favor EV/EBITDA (Enterprise Value divided by operating profit before interest, taxes, depreciation, and amortization), since EV incorporates both market cap and net debt.',
          'Dividend Yield (DY) measures annual cash payouts relative to share price. Very high yields are only sustainable when backed by healthy payout ratios and resilient free cash flow rather than debt-funded distributions.',
        ],
        numericExample: {
          title: 'Valuation Comparison: Value Utility (B3) vs Growth Tech (US)',
          scenario:
            'Stock A (B3 utility): price R$ 40.00, EPS R$ 5.00, annual dividend R$ 3.20. Stock B (US tech): price US$ 180.00, EPS US$ 6.00.',
          steps: [
            'Stock A P/E = R$ 40.00 ÷ R$ 5.00 = 8.0x earnings | Earnings Yield = 1 ÷ 8 = 12.5% p.a.',
            'Stock A Dividend Yield = R$ 3.20 ÷ R$ 40.00 = 8.00% p.a. | Payout = 3.20 ÷ 5.00 = 64%',
            'Stock B P/E = US$ 180.00 ÷ US$ 6.00 = 30.0x earnings (pricing strong multi-year revenue & margin growth).',
          ],
          result:
            'Stock A delivers predictable cash income at a discounted multiple (8x), while Stock B requires sustained >20% earnings growth to justify 30x P/E.',
        },
        keyConcepts: [
          {
            term: 'P/E Ratio (Price / Earnings)',
            explanation:
              'Ratio of share price to trailing 12-month earnings per share; inverse of implied earnings yield.',
          },
          {
            term: 'EV / EBITDA',
            explanation:
              'Valuation multiple comparing total Enterprise Value (including net debt) against operating cash earnings.',
          },
          {
            term: 'Payout Ratio',
            explanation:
              'Share of net income distributed back to shareholders as dividends or interest on equity.',
          },
        ],
        targetButtonLabel: 'Explore B3 & Wall Street Stocks',
        targetDescription:
          'Check P/E, Dividend Yield, and live prices for top equities across Brazil and the United States.',
      },
      {
        id: 'at-m4',
        title: 'Crypto Cycles, Bitcoin Dominance, and Risk Management',
        duration: '25 min',
        summary:
          'Understand global USD liquidity, halvings, and mathematical caps on volatile asset exposure.',
        paragraphs: [
          'Crypto assets trade 24/7 with historical volatility 3× to 5× higher than traditional equity indices. Bitcoin acts as the ecosystem anchor, driven by programmatic supply deceleration (quadrennial halvings) and global US Dollar liquidity cycles.',
          'Bitcoin Dominance (BTC.D) tracks Bitcoin’s share of total crypto market capitalization. During risk-off phases, capital consolidates into Bitcoin or stablecoins; during advanced liquidity expansions, capital rotates out toward smart-contract networks like Ethereum and Solana.',
          'In portfolio management, position size should scale inversely with asset volatility: allocating 3% to 8% of total net worth captures strong asymmetric upside while preventing -40% to -60% drawdowns from derailing financial stability.',
        ],
        numericExample: {
          title: 'Portfolio Risk Sizing with 5% Crypto Allocation',
          scenario:
            'Total R$ 100,000.00 portfolio allocating 5% (R$ 5,000.00) to Bitcoin & Ethereum with a 3%–7% rebalancing band.',
          steps: [
            'If crypto suffers a severe -50% drawdown: total portfolio impact = 5% × (-50%) = -2.50% (R$ 2,500.00)',
            'If crypto rallies +140%: position grows from R$ 5,000.00 to R$ 12,000.00 (11.2% of portfolio)',
            'Disciplined rebalancing: trim R$ 4,500.00 of excess gains into Fixed Income / ETFs, restoring crypto weight near ~7%.',
          ],
          result:
            'Band rebalancing converts extreme crypto volatility into systematic profit-taking while keeping overall portfolio risk capped.',
        },
        keyConcepts: [
          {
            term: 'Bitcoin Dominance (BTC.D)',
            explanation:
              'Percentage of total cryptocurrency market capitalization represented exclusively by Bitcoin.',
          },
          {
            term: 'Halving',
            explanation:
              'Programmatic 50% cut to Bitcoin’s block mining reward occurring roughly every 4 years.',
          },
          {
            term: 'Band Rebalancing',
            explanation:
              'Rule-based buying or trimming whenever an asset class drifts outside pre-set allocation thresholds.',
          },
        ],
        targetButtonLabel: 'Estimate Crypto Profit & Tax',
        targetDescription:
          'Check monthly exemption rules and estimated capital gains tax in the Tax/DARF simulator.',
      },
    ],
  },
  'fluxo-futuros-opcoes': {
    title: 'Order Flow (Tape Reading), Futures & Options',
    shortTitle: 'Flow, Futures & Options',
    duration: '1h 50min',
    description:
      'Master Depth of Market (DOM) and Times & Trades aggression, futures leverage and daily settlement (WIN/WDO), plus options structures and Greeks.',
    shortDescription:
      'Order book (DOM), institutional aggression, WIN/WDO futures contracts, and option Greeks.',
    objective:
      'Execute precise market-microstructure reads, manage futures leverage, and price derivatives hedging.',
    modules: [
      {
        id: 'fl-m1',
        title: 'Order Book (DOM), Times & Trades & Institutional Absorption',
        duration: '28 min',
        summary:
          'Distinguish passive resting limit orders in the Book from executed market aggression on the Tape.',
        paragraphs: [
          'Asset prices do not move merely because large size sits in the Order Book (DOM — Depth of Market); prices move when buyers or sellers aggressively cross the spread and consume resting liquidity.',
          'Tape Reading pairs two live views: the DOM, displaying passive limit intent at every price tick, and Times & Trades (the Tape), logging every executed print with timestamp, lot size, price, and aggressor broker.',
          'A premier microstructure signal is Absorption: hundreds of contracts hit the bid aggressively at a key level, yet price refuses to break lower because an institutional player continuously reloads hidden passive bids (iceberg orders).',
        ],
        numericExample: {
          title: 'Spotting Buyer Absorption on Mini-Dollar Futures (WDO)',
          scenario:
            'WDO trading at 5,585.00. Only 40 visible bid contracts sit at 5,584.50 while aggressive sell market orders pour in.',
          steps: [
            'Times & Trades prints 480 contracts sold aggressively at 5,584.50 in 18 seconds',
            'Despite selling volume 12× larger than the visible resting size, price fails to breach 5,584.00',
            'The passive buyer instantly refreshes resting bids on every fill (iceberg execution)',
            'Immediately after, 150 buy-aggressor contracts sweep 5,585.50 and 5,586.00 with zero resistance.',
          ],
          result:
            'Seller exhaustion against institutional absorption shifts short-term supply/demand, offering a tight-stop long setup below 5,583.50.',
        },
        keyConcepts: [
          {
            term: 'DOM (Depth of Market)',
            explanation:
              'Vertical price ladder displaying resting passive bid and ask quantities across price levels.',
          },
          {
            term: 'Market Aggression',
            explanation:
              'Order executed immediately against the opposing best quote in the book, consuming resting liquidity.',
          },
          {
            term: 'Iceberg Order',
            explanation:
              'Sliced institutional order revealing only a small visible portion on the book to disguise true size.',
          },
        ],
        targetButtonLabel: 'Observe Flow on DOM Terminal',
        targetDescription:
          'Watch live order-book depth, aggression delta, and Times & Trades on DinhEuro.',
      },
      {
        id: 'fl-m2',
        title: 'Futures Contracts (WIN, WDO, S&P): Margin, Tick & Settlement',
        duration: '28 min',
        summary:
          'Master the real leverage math of B3 mini contracts and avoid the minimum-margin trap.',
        paragraphs: [
          'Index (WIN) and Dollar (WDO) futures on B3 settle via daily mark-to-market cash variation and require only a small collateral margin (cash, CDB, or Tesouro Selic) relative to notional size—amplifying both profits and losses.',
          'On Mini-Index (WIN), each point equals R$ 0.20 per contract; on Mini-Dollar (WDO), each point equals R$ 10.00 per contract (0.5-point minimum tick = R$ 5.00). Ignoring true notional exposure is the #1 reason retail accounts blow up.',
          'Consistent traders size contracts off total strategy capital rather than broker minimum intraday margin, leaving ample cushion to weather routine swings without forced risk liquidation.',
        ],
        numericExample: {
          title: 'Notional Value vs Required Margin on 2 WDO Contracts',
          scenario:
            'WDO quoted at 5,584.00 points. Each mini contract represents US$ 10,000.00 (10% of the standard full contract).',
          steps: [
            'Notional value of 1 WDO contract: 10,000 × R$ 5.5840 = R$ 55,840.00',
            'Total notional exposure for 2 WDO contracts: R$ 111,680.00',
            'Adverse 12-point move (0.21% FX move): 2 contracts × 12 pts × R$ 10.00 = -R$ 240.00',
            'To keep daily max risk ≤ 2% of capital, allocated equity should be at least R$ 12,000.00 (not merely R$ 300 minimum margin).',
          ],
          result:
            'Sizing contracts by notional exposure and financial stop distance prevents routine 0.2% ripples from wiping out undercapitalized accounts.',
        },
        keyConcepts: [
          {
            term: 'Notional Value',
            explanation:
              'Full underlying financial exposure represented by a futures contract (US$ 10k on WDO; 20% of Ibovespa points on WIN).',
          },
          {
            term: 'Daily Settlement',
            explanation:
              'Automated end-of-session cash credit/debit of profits and losses across open futures positions.',
          },
          {
            term: 'Margin Collateral',
            explanation:
              'Posted assets (Tesouro Selic, CDB, or cash) held by the clearinghouse/broker to cover daily settlement obligations.',
          },
        ],
        targetButtonLabel: 'Practice on Day Trade Pro',
        targetDescription:
          'Test intraday charting, order tickets, and point-risk management in Day Trade & Scalping.',
      },
      {
        id: 'fl-m3',
        title: 'Options Structure: Calls, Puts, Strike & Covered Strategies',
        duration: '27 min',
        summary:
          'Deploy options as portfolio insurance (Protective Put) or extra yield generation on shares (Covered Call).',
        paragraphs: [
          'Options are derivative contracts granting the buyer the right—but not the obligation—to buy (Call) or sell (Put) an underlying asset at a set price (Strike) on or before expiration in exchange for paying a premium.',
          'An option’s premium consists of two parts: Intrinsic Value (immediate exercise value if settled right now) and Extrinsic or Time Value (the premium paid for remaining time and uncertainty until expiry).',
          'In stock portfolios, options shine in risk management: a Covered Call generates extra income on existing holdings during sideways markets, while a Protective Put establishes a guaranteed price floor against severe sell-offs.',
        ],
        numericExample: {
          title: 'Portfolio Hedging with Protective Put vs Covered Call',
          scenario:
            'Investor holds 1,000 PETR4 shares at R$ 38.00 (R$ 38,000.00) evaluating 30-day income vs downside protection.',
          steps: [
            'Strategy 1 (Covered Call): Sell 1,000 Calls Strike R$ 40.00 collecting R$ 1.10/share (+R$ 1,100.00 cash = 2.89% monthly yield)',
            'If stock settles at R$ 39.00: keep shares + R$ 1,100.00 free. Above R$ 40.00: shares called away at R$ 40.00 + R$ 1.10 = R$ 41.10 (+8.16%).',
            'Strategy 2 (Protective Put): Buy 1,000 Puts Strike R$ 36.00 paying R$ 0.75/share (R$ 750.00 insurance cost = 1.97%/month).',
          ],
          result:
            'Even if shares crash to R$ 28.00 in an extreme shock, the Put guarantees a minimum sale price of R$ 36.00.',
        },
        keyConcepts: [
          {
            term: 'Call & Put Options',
            explanation:
              'A Call grants the right to buy the underlying at the strike; a Put grants the right to sell at the strike.',
          },
          {
            term: 'ITM / ATM / OTM',
            explanation:
              'Moneyness comparing strike against current spot price: In-the-Money (ITM), At-the-Money (ATM), and Out-of-the-Money (OTM).',
          },
          {
            term: 'Covered Call',
            explanation:
              'Selling Call options backed by owning the underlying shares, lowering average cost in exchange for capping upside above the strike.',
          },
        ],
        targetButtonLabel: 'Simulate Payoff in Options Calculator',
        targetDescription:
          'Compute Black-Scholes fair value and expiry payoff curves in Fixed Income & Derivatives.',
      },
      {
        id: 'fl-m4',
        title: 'The Greeks (Delta, Gamma, Theta, Vega) & Exposure Control',
        duration: '27 min',
        summary:
          'See how spot moves, passing calendar days, and implied volatility reshape option premiums.',
        paragraphs: [
          'The “Greeks” quantify an option premium’s mathematical sensitivity to inputs in the Black-Scholes pricing model. Without tracking these partial derivatives, traders can lose money even when calling market direction correctly.',
          'Delta (0 to 1 for Calls; 0 to -1 for Puts) estimates how much the option moves per $1 move in the underlying, while also serving as an approximate probability of expiring in-the-money. Gamma measures how rapidly Delta accelerates near expiry.',
          'Theta captures daily time-value decay working against option buyers (accelerating sharply over the final 21 trading days), whereas Vega measures sensitivity to Implied Volatility (IV)—buying options right after IV spikes is often overpriced.',
        ],
        numericExample: {
          title: 'Integrated Greeks Read on an ATM Call',
          scenario:
            'Call Strike R$ 50.00 (spot R$ 50.00) with 20 sessions left, premium R$ 2.20, Delta +0.52, Gamma 0.09, Theta -0.06/day, Vega +0.11.',
          steps: [
            'If spot rises R$ 1.00 today (to R$ 51.00): premium rises ~+R$ 0.52 (to ~R$ 2.72) and new Delta shifts toward ~0.61',
            'If spot stays completely flat for 5 trading days: Theta erosion ≈ 5 × (-R$ 0.06) = -R$ 0.30 (-13.6% of premium)',
            'If implied volatility drops 4 points post-earnings: Vega impact = -4 × 0.11 = -R$ 0.44.',
          ],
          result:
            'Even on a mild stock rally, a sharp volatility drop (IV Crush) combined with Theta can erode long options bought right before major events.',
        },
        keyConcepts: [
          {
            term: 'Delta & Gamma',
            explanation:
              'Delta tracks premium change per 1-unit move in the stock; Gamma measures Delta’s acceleration near the strike.',
          },
          {
            term: 'Theta (Time Decay)',
            explanation:
              'Daily erosion of an option’s extrinsic value as expiration nears—benefiting option sellers and pressuring buyers.',
          },
          {
            term: 'Vega & Implied Volatility (IV)',
            explanation:
              'Vega measures premium sensitivity to shifts in market expectations of future price volatility.',
          },
        ],
        targetButtonLabel: 'Compute Greeks in Black-Scholes',
        targetDescription:
          'Experiment with strike, days to expiry, and volatility in the portal’s derivatives calculator.',
      },
    ],
  },
};

export const ACADEMY_FAQ_EN: Record<string, Pick<AcademyFaqItem, 'question' | 'answer'>> = {
  'faq-1': {
    question: 'Are DinhEuro Academy courses really 100% free?',
    answer:
      'Yes. All 4 learning tracks and 16 complete modules are open access with no enrollment fees, subscriptions, or mandatory sign-ups. Our mission is to democratize institutional-grade financial and FX education.',
  },
  'faq-2': {
    question: 'Do I need to watch external videos to follow the lessons?',
    answer:
      'No. Every lesson is crafted as an interactive on-platform reading experience featuring clear explanations, step-by-step numeric calculations, key-concept cards, and direct shortcuts to DinhEuro simulators.',
  },
  'faq-3': {
    question: 'How is my module progress saved?',
    answer:
      'Whenever you mark a lesson as completed, your progress is stored locally in your browser (via localStorage), keeping your track record intact across visits without sending personal data to external servers.',
  },
  'faq-4': {
    question: 'Which track should I choose if I am just starting out?',
    answer:
      'We recommend starting with “Fixed Income & Sovereign Bonds Fundamentals” (Beginner level) to master real yields, mark-to-market, and liquidity, then progressing to FX & International Protection.',
  },
  'faq-5': {
    question: 'How can I practice the calculations taught in the modules?',
    answer:
      'At the bottom of every module, a contextual shortcut opens the matching DinhEuro tool—including the real-time Universal FX Calculator, Compound Interest & Tax Simulators, D3 v7 Chart Terminal, Order Flow DOM, and Fixed Income & Derivatives.',
  },
  'faq-6': {
    question: 'Does the course material constitute buy or sell investment advice?',
    answer:
      'No. DinhEuro Academy content is strictly educational and analytical. Numeric examples use illustrative scenarios to demonstrate market mechanics, risk management, and financial math.',
  },
};
