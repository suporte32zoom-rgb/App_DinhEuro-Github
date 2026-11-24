import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Layers,
  Calculator,
  ShieldCheck,
  Calendar,
  Percent,
  DollarSign,
  ArrowRight,
  Info,
  CheckCircle2,
  Sparkles,
  Zap,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  HelpCircle,
  BookOpen,
  Globe2,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { formatCurrencyValue, formatSignedPercentChange } from '../utils/finance';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { TRADING_TRANSLATIONS } from '../i18n/tradingTranslations';
import { FIXED_INCOME_GUIDE_TRANSLATIONS } from '../i18n/fixedIncomeGuideTranslations';

// ================= BLACK-SCHOLES HELPER FUNCTIONS =================
// Standard Normal Cumulative Distribution Function (CDF) approximation
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014337 * Math.exp((-x * x) / 2);
  let p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  if (x > 0) p = 1 - p;
  return p;
}

// Standard Normal Probability Density Function (PDF)
function normalPDF(x: number): number {
  return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
}

// Black-Scholes Greeks and Theoretical Price calculation
interface BlackScholesResult {
  callPrice: number;
  putPrice: number;
  callDelta: number;
  putDelta: number;
  gamma: number;
  callTheta: number;
  putTheta: number;
  vega: number;
  callRho: number;
  putRho: number;
}

function calculateBlackScholes(
  S: number, // Spot price
  K: number, // Strike price
  T: number, // Time to expiry in years
  r: number, // Risk-free rate (decimal)
  sigma: number // Volatility (decimal)
): BlackScholesResult {
  if (T <= 0 || sigma <= 0 || S <= 0 || K <= 0) {
    return {
      callPrice: Math.max(0, S - K),
      putPrice: Math.max(0, K - S),
      callDelta: S >= K ? 1 : 0,
      putDelta: S >= K ? 0 : -1,
      gamma: 0,
      callTheta: 0,
      putTheta: 0,
      vega: 0,
      callRho: 0,
      putRho: 0,
    };
  }

  const d1 = (Math.log(S / K) + (r + (sigma * sigma) / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);

  const Nd1 = normalCDF(d1);
  const Nd2 = normalCDF(d2);
  const Nnegd1 = normalCDF(-d1);
  const Nnegd2 = normalCDF(-d2);
  const pdfd1 = normalPDF(d1);

  const callPrice = S * Nd1 - K * Math.exp(-r * T) * Nd2;
  const putPrice = K * Math.exp(-r * T) * Nnegd2 - S * Nnegd1;

  const callDelta = Nd1;
  const putDelta = Nd1 - 1;

  const gamma = pdfd1 / (S * sigma * Math.sqrt(T));

  // Daily theta (divided by 365)
  const callTheta =
    (-((S * pdfd1 * sigma) / (2 * Math.sqrt(T))) - r * K * Math.exp(-r * T) * Nd2) / 365;
  const putTheta =
    (-((S * pdfd1 * sigma) / (2 * Math.sqrt(T))) + r * K * Math.exp(-r * T) * Nnegd2) / 365;

  // Vega per 1% change in vol
  const vega = (S * Math.sqrt(T) * pdfd1) / 100;

  // Rho per 1% change in interest rates
  const callRho = (K * T * Math.exp(-r * T) * Nd2) / 100;
  const putRho = (-K * T * Math.exp(-r * T) * Nnegd2) / 100;

  return {
    callPrice: Math.max(0, callPrice),
    putPrice: Math.max(0, putPrice),
    callDelta,
    putDelta,
    gamma,
    callTheta,
    putTheta,
    vega,
    callRho,
    putRho,
  };
}

// Sample market data for Futures
interface FutureContract {
  code: string;
  name: string;
  market: string;
  price: number;
  change: number;
  tickValue: string;
  marginReq: string;
  maturity: string;
  volume: string;
}

const FUTURES_CONTRACTS: FutureContract[] = [
  {
    code: 'WINQ26',
    name: 'Mini Índice B3',
    market: 'B3 Brasil',
    price: 171670,
    change: +0.65,
    tickValue: 'R$ 1,00 a cada 5 pts',
    marginReq: 'R$ 100,00 / contrato (Day Trade)',
    maturity: 'Ago / 2026',
    volume: 'R$ 84,2 Bi',
  },
  {
    code: 'WDOQ26',
    name: 'Mini Dólar B3',
    market: 'B3 Brasil',
    price: 5500.0,
    change: -0.32,
    tickValue: 'R$ 5,00 a cada 0,5 pt',
    marginReq: 'R$ 150,00 / contrato (Day Trade)',
    maturity: 'Ago / 2026',
    volume: 'R$ 42,9 Bi',
  },
  {
    code: 'DI1F27',
    name: 'Juros Futuros B3 (DI 2027)',
    market: 'B3 Brasil',
    price: 12.18,
    change: -0.04,
    tickValue: 'R$ 100.000 PU base',
    marginReq: 'R$ 1.200 / contrato',
    maturity: 'Jan / 2027',
    volume: 'R$ 18,5 Bi',
  },
  {
    code: 'DI1F29',
    name: 'Juros Futuros B3 (DI 2029)',
    market: 'B3 Brasil',
    price: 12.45,
    change: +0.02,
    tickValue: 'R$ 100.000 PU base',
    marginReq: 'R$ 1.500 / contrato',
    maturity: 'Jan / 2029',
    volume: 'R$ 12,1 Bi',
  },
  {
    code: 'ES1!',
    name: 'S&P 500 E-mini Futuro',
    market: 'CME Chicago',
    price: 7575.40,
    change: +0.48,
    tickValue: '$ 12,50 a cada 0,25 pt',
    marginReq: '$ 500 (Intraday)',
    maturity: 'Set / 2026',
    volume: '$ 120 Bi',
  },
  {
    code: 'CL1!',
    name: 'Petróleo WTI Futuro',
    market: 'NYMEX',
    price: 74.85,
    change: +1.15,
    tickValue: '$ 10,00 a cada 0,01',
    marginReq: '$ 1.000 (Intraday)',
    maturity: 'Jul / 2026',
    volume: '$ 35 Bi',
  },
];

// Sample fixed income instruments
interface FixedIncomeAsset {
  id: string;
  name: string;
  category: 'Tesouro' | 'CDB' | 'LCI/LCA' | 'Debênture';
  issuer: string;
  rateDescription: string;
  annualYieldEstimate: number;
  maturity: string;
  minInvestment: number;
  irTax: string;
  guarantee: string;
}

const FIXED_INCOME_ASSETS: FixedIncomeAsset[] = [
  {
    id: 'tesouro-selic-2029',
    name: 'Tesouro Selic 2029',
    category: 'Tesouro',
    issuer: 'Tesouro Nacional',
    rateDescription: 'Selic + 0,14% a.a.',
    annualYieldEstimate: 12.39,
    maturity: '01/03/2029',
    minInvestment: 154.20,
    irTax: 'Tabela Regressiva (22,5% a 15%)',
    guarantee: '100% Risco Soberano',
  },
  {
    id: 'tesouro-ipca-2035',
    name: 'Tesouro IPCA+ 2035',
    category: 'Tesouro',
    issuer: 'Tesouro Nacional',
    rateDescription: 'IPCA + 6,45% a.a.',
    annualYieldEstimate: 10.95,
    maturity: '15/05/2035',
    minInvestment: 48.90,
    irTax: 'Tabela Regressiva (22,5% a 15%)',
    guarantee: '100% Risco Soberano',
  },
  {
    id: 'tesouro-prefixado-2027',
    name: 'Tesouro Prefixado 2027',
    category: 'Tesouro',
    issuer: 'Tesouro Nacional',
    rateDescription: '12,25% a.a. fixo',
    annualYieldEstimate: 12.25,
    maturity: '01/01/2027',
    minInvestment: 35.80,
    irTax: 'Tabela Regressiva (22,5% a 15%)',
    guarantee: '100% Risco Soberano',
  },
  {
    id: 'cdb-banco-120',
    name: 'CDB Liquidez Diária 110% CDI',
    category: 'CDB',
    issuer: 'Banco Múltiplo Institucional',
    rateDescription: '110% do CDI (~13,47% a.a.)',
    annualYieldEstimate: 13.47,
    maturity: 'Liquidez Diária / 2027',
    minInvestment: 100.0,
    irTax: 'Tabela Regressiva (22,5% a 15%)',
    guarantee: 'FGC até R$ 250 mil',
  },
  {
    id: 'lca-agronegocio',
    name: 'LCA Agronegócio 93% CDI (Isento)',
    category: 'LCI/LCA',
    issuer: 'Banco do Brasil / Cooperativas',
    rateDescription: '93% do CDI (Equiv. a 112% CDI)',
    annualYieldEstimate: 11.39,
    maturity: '24 meses',
    minInvestment: 1000.0,
    irTax: 'ISENTO de Imposto de Renda',
    guarantee: 'FGC até R$ 250 mil',
  },
  {
    id: 'debenture-infra',
    name: 'Debênture Incentivada de Energia',
    category: 'Debênture',
    issuer: 'Concessionária de Infraestrutura',
    rateDescription: 'IPCA + 7,20% a.a. Isento',
    annualYieldEstimate: 11.70,
    maturity: '15/10/2031',
    minInvestment: 1050.0,
    irTax: 'ISENTO de Imposto de Renda (Lei 12.431)',
    guarantee: 'Garantia Real da Concessão',
  },
];

export const FixedIncomeDerivativesView: React.FC = () => {
  const { universalRates, assets, theme } = useMarket();
  const isLight = theme === 'light';
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const tFi = TRADING_TRANSLATIONS[lang].fixedIncome;

  // Dynamic futures contracts synchronized with real-time quotes
  const dynamicFutures = useMemo(() => {
    const ibov = assets.find((a) => a.symbol === 'IBOVESPA');
    const usdBrl = assets.find((a) => a.symbol === 'USD/BRL');
    const sp500 = assets.find((a) => a.symbol === 'S&P 500');

    const winPrice = ibov && ibov.price > 0 ? Math.round(ibov.price / 5) * 5 : 171670;
    const winChange = ibov ? ibov.change24h : +0.65;
    const wdoPrice = usdBrl && usdBrl.price > 0 ? Number((usdBrl.price * 1000).toFixed(1)) : 5500.0;
    const wdoChange = usdBrl ? usdBrl.change24h : -0.32;
    const spPrice = sp500 && sp500.price > 0 ? sp500.price : 7575.40;
    const spChange = sp500 ? sp500.change24h : +0.48;

    return FUTURES_CONTRACTS.map((contract) => {
      const ov = tFi.futuresOverrides[contract.code];
      const localized = ov ? { ...contract, ...ov } : contract;
      if (contract.code === 'WINQ26') {
        return { ...localized, price: winPrice, change: winChange };
      }
      if (contract.code === 'WDOQ26') {
        return { ...localized, price: wdoPrice, change: wdoChange };
      }
      if (contract.code === 'ES1!') {
        return { ...localized, price: spPrice, change: spChange };
      }
      return localized;
    });
  }, [assets, tFi]);

  // Active sub-tab
  const [activeSubTab, setActiveSubTab] = useState<'options' | 'futures' | 'fixed_income'>('options');

  // ============ OPTIONS / BLACK-SCHOLES STATE ============
  const [spotPrice, setSpotPrice] = useState<number>(38.5); // S (e.g. PETR4)
  const [strikePrice, setStrikePrice] = useState<number>(38.0); // K
  const [daysToExpiry, setDaysToExpiry] = useState<number>(30); // Days
  const [volatilityPct, setVolatilityPct] = useState<number>(32); // Sigma %
  const [interestRatePct, setInterestRatePct] = useState<number>(12.25); // Selic / Risk-free %
  const [optionType, setOptionType] = useState<'CALL' | 'PUT'>('CALL');
  const [strategyType, setStrategyType] = useState<'BUY_CALL' | 'BUY_PUT' | 'BULL_CALL_SPREAD' | 'STRADDLE'>('BUY_CALL');

  // Compute Black-Scholes results
  const bsResult = useMemo(() => {
    const T = daysToExpiry / 365;
    const r = interestRatePct / 100;
    const sigma = volatilityPct / 100;
    return calculateBlackScholes(spotPrice, strikePrice, T, r, sigma);
  }, [spotPrice, strikePrice, daysToExpiry, volatilityPct, interestRatePct]);

  // Compute payoff curve data for visual chart
  const payoffData = useMemo(() => {
    const minS = Math.max(1, spotPrice * 0.7);
    const maxS = spotPrice * 1.3;
    const step = (maxS - minS) / 30;
    const points: { price: number; pnl: number }[] = [];

    const premiumCall = bsResult.callPrice;
    const premiumPut = bsResult.putPrice;

    for (let p = minS; p <= maxS; p += step) {
      let pnl = 0;
      if (strategyType === 'BUY_CALL') {
        pnl = Math.max(0, p - strikePrice) - premiumCall;
      } else if (strategyType === 'BUY_PUT') {
        pnl = Math.max(0, strikePrice - p) - premiumPut;
      } else if (strategyType === 'BULL_CALL_SPREAD') {
        // Buy Call K, Sell Call K+2
        const k2 = strikePrice * 1.05;
        const bs2 = calculateBlackScholes(spotPrice, k2, daysToExpiry / 365, interestRatePct / 100, volatilityPct / 100);
        const netCost = premiumCall - bs2.callPrice;
        pnl = Math.max(0, p - strikePrice) - Math.max(0, p - k2) - netCost;
      } else if (strategyType === 'STRADDLE') {
        // Buy Call + Buy Put at ATM
        pnl = Math.max(0, p - strikePrice) + Math.max(0, strikePrice - p) - (premiumCall + premiumPut);
      }
      points.push({ price: Number(p.toFixed(2)), pnl: Number(pnl.toFixed(2)) });
    }
    return points;
  }, [spotPrice, strikePrice, bsResult, strategyType, daysToExpiry, interestRatePct, volatilityPct]);

  // ============ FIXED INCOME SIMULATOR STATE ============
  const [investAmount, setInvestAmount] = useState<number>(10000);
  const [investMonths, setInvestMonths] = useState<number>(24);
  const [cdiRate, setCdiRate] = useState<number>(12.15); // % a.a.

  // Simulations
  const simResults = useMemo(() => {
    const years = investMonths / 12;
    // CDI 100%
    const cdiMonthly = Math.pow(1 + cdiRate / 100, 1 / 12) - 1;
    const totalGrossCDI = investAmount * Math.pow(1 + cdiMonthly, investMonths);
    const profitCDI = totalGrossCDI - investAmount;

    // Regressive IR tax rate
    let irRate = 0.225;
    const days = investMonths * 30;
    if (days > 720) irRate = 0.15;
    else if (days > 360) irRate = 0.175;
    else if (days > 180) irRate = 0.2;

    const netProfitCDI = profitCDI * (1 - irRate);
    const netTotalCDI = investAmount + netProfitCDI;

    // Poupança (~6.17% + TR = ~7.5% a.a.)
    const poupRate = 0.075;
    const poupMonthly = Math.pow(1 + poupRate, 1 / 12) - 1;
    const totalPoup = investAmount * Math.pow(1 + poupMonthly, investMonths);
    const profitPoup = totalPoup - investAmount;

    // LCI/LCA 95% CDI (Isento de IR)
    const lciRate = (cdiRate * 0.95) / 100;
    const lciMonthly = Math.pow(1 + lciRate, 1 / 12) - 1;
    const totalLCI = investAmount * Math.pow(1 + lciMonthly, investMonths);
    const profitLCI = totalLCI - investAmount;

    return {
      cdiNet: netTotalCDI,
      cdiProfit: netProfitCDI,
      poupNet: totalPoup,
      poupProfit: profitPoup,
      lciNet: totalLCI,
      lciProfit: profitLCI,
      irPercentageApplied: (irRate * 100).toFixed(1),
    };
  }, [investAmount, investMonths, cdiRate]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="rounded-2xl bg-[#FFFFFF] dark:bg-gradient-to-br dark:from-[#0c1626] dark:to-[#070e1a] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/35 dark:border-emerald-500/30 text-[#006B52] dark:text-emerald-400">
                <Percent className="w-4 h-4" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2">
                {tFi.bannerTitle}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border border-[#009B77]/40 dark:border-emerald-500/40 uppercase font-mono-numbers font-bold">
                  {tFi.bannerBadge}
                </span>
              </h1>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400 max-w-2xl">
              {tFi.bannerSubtitle}
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 bg-[#F4F7F9] dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveSubTab('options')}
              data-on-dark={activeSubTab === 'options' ? 'true' : undefined}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'options'
                  ? 'bg-[#003399] dark:bg-emerald-600 text-white shadow-md'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              {tFi.tabOptions}
            </button>
            <button
              onClick={() => setActiveSubTab('futures')}
              data-on-dark={activeSubTab === 'futures' ? 'true' : undefined}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'futures'
                  ? 'bg-[#003399] dark:bg-emerald-600 text-white shadow-md'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              {tFi.tabFutures}
            </button>
            <button
              onClick={() => setActiveSubTab('fixed_income')}
              data-on-dark={activeSubTab === 'fixed_income' ? 'true' : undefined}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'fixed_income'
                  ? 'bg-[#003399] dark:bg-emerald-600 text-white shadow-md'
                  : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {tFi.tabFixedIncome}
            </button>
          </div>
        </div>
      </div>

      {/* ================= SECTION 1: OPTIONS & BLACK-SCHOLES ================= */}
      {activeSubTab === 'options' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Black Scholes Param Inputs (4 Cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
                  <h2 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                    {tFi.optionsParamsTitle}
                  </h2>
                </div>
                <span className="text-[10px] text-[#475569] dark:text-slate-400 font-mono-numbers">
                  Black & Scholes
                </span>
              </div>

              {/* Option Type Selector (Call vs Put) */}
              <div>
                <label className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block mb-1.5">
                  {tFi.contractTypeLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOptionType('CALL')}
                    className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                      optionType === 'CALL'
                        ? 'bg-[#E3F7F2] text-[#006B52] border-[#009B77]/50 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/50 shadow-md'
                        : 'bg-[#F4F7F9] text-[#475569] border-[#CBD5E1] hover:text-[#0F172A] dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" /> {tFi.callBtn}
                  </button>
                  <button
                    onClick={() => setOptionType('PUT')}
                    className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                      optionType === 'PUT'
                        ? 'bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/45 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/50 shadow-md'
                        : 'bg-[#F4F7F9] text-[#475569] border-[#CBD5E1] hover:text-[#0F172A] dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <ArrowDownRight className="w-3.5 h-3.5" /> {tFi.putBtn}
                  </button>
                </div>
              </div>

              {/* Spot Price (S) */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569] dark:text-slate-400 mb-1">
                  <span>{tFi.spotPriceLabel}</span>
                  <span className="text-[#0F172A] dark:text-white font-mono-numbers">{formatCurrencyValue(spotPrice, 'BRL', 2, locale)}</span>
                </div>
                <input
                  type="number"
                  step="0.10"
                  value={spotPrice}
                  onChange={(e) => setSpotPrice(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>

              {/* Strike Price (K) */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569] dark:text-slate-400 mb-1">
                  <span>{tFi.strikePriceLabel}</span>
                  <span className="text-[#0F172A] dark:text-white font-mono-numbers">{formatCurrencyValue(strikePrice, 'BRL', 2, locale)}</span>
                </div>
                <input
                  type="number"
                  step="0.10"
                  value={strikePrice}
                  onChange={(e) => setStrikePrice(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>

              {/* Days to Expiration (T) */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569] dark:text-slate-400 mb-1">
                  <span>{tFi.daysToExpiryLabel}</span>
                  <span className="text-[#0F172A] dark:text-white font-mono-numbers">{daysToExpiry} {tFi.daysUnit}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="365"
                  value={daysToExpiry}
                  onChange={(e) => setDaysToExpiry(parseInt(e.target.value) || 1)}
                  className="w-full accent-[#003399] dark:accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Volatility Implied (Sigma %) */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569] dark:text-slate-400 mb-1">
                  <span>{tFi.impliedVolLabel}</span>
                  <span className="text-[#B45309] dark:text-amber-400 font-mono-numbers">{volatilityPct}{tFi.perYearUnit}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={volatilityPct}
                  onChange={(e) => setVolatilityPct(parseInt(e.target.value) || 10)}
                  className="w-full accent-[#D99B00] dark:accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Interest Rate (r) */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#475569] dark:text-slate-400 mb-1">
                  <span>{tFi.riskFreeRateLabel}</span>
                  <span className="text-[#003399] dark:text-sky-400 font-mono-numbers">{interestRatePct}{tFi.perYearUnit}</span>
                </div>
                <input
                  type="number"
                  step="0.25"
                  value={interestRatePct}
                  onChange={(e) => setInterestRatePct(parseFloat(e.target.value) || 12)}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Right Column: Theoretical Price & Greeks Output (8 Cols) */}
            <div className="lg:col-span-8 space-y-5">
              {/* Theoretical Price Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className={`p-5 rounded-2xl border transition shadow-xl ${
                    optionType === 'CALL'
                      ? 'bg-[#E3F7F2]/80 border-[#009B77]/45 dark:bg-gradient-to-br dark:from-emerald-950/40 dark:to-slate-900 dark:border-emerald-500/50'
                      : 'bg-[#FFFFFF] border-[#E2E8F0] dark:bg-[#09111e] dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400 flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4" /> {tFi.theoreticalCallTitle}
                    </span>
                    <span className="text-[10px] text-[#475569] dark:text-slate-400 font-mono-numbers">
                      {spotPrice >= strikePrice ? tFi.itmLabel : tFi.otmLabel}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-[#0F172A] dark:text-white font-mono-numbers">
                    {formatCurrencyValue(bsResult.callPrice, 'BRL', 2, locale)}
                  </div>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400 mt-2">
                    {tFi.callDesc}
                  </p>
                </div>

                <div
                  className={`p-5 rounded-2xl border transition shadow-xl ${
                    optionType === 'PUT'
                      ? 'bg-[#FEE2E2]/70 border-[#DC2626]/40 dark:bg-gradient-to-br dark:from-rose-950/40 dark:to-slate-900 dark:border-rose-500/50'
                      : 'bg-[#FFFFFF] border-[#E2E8F0] dark:bg-[#09111e] dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] dark:text-rose-400 flex items-center gap-1">
                      <ArrowDownRight className="w-4 h-4" /> {tFi.theoreticalPutTitle}
                    </span>
                    <span className="text-[10px] text-[#475569] dark:text-slate-400 font-mono-numbers">
                      {spotPrice <= strikePrice ? tFi.itmLabel : tFi.otmLabel}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-[#0F172A] dark:text-white font-mono-numbers">
                    {formatCurrencyValue(bsResult.putPrice, 'BRL', 2, locale)}
                  </div>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400 mt-2">
                    {tFi.putDesc}
                  </p>
                </div>
              </div>

              {/* The Greeks Matrix */}
              <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B45309] dark:text-amber-400" />
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      {tFi.greeksTitle}
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#475569] dark:text-slate-400">{tFi.realTimeTag}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {/* Delta */}
                  <div className="p-3 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase block mb-1">
                      Delta (Δ)
                    </span>
                    <div className="text-base font-bold text-[#0F172A] dark:text-white font-mono-numbers">
                      {(optionType === 'CALL' ? bsResult.callDelta : bsResult.putDelta).toFixed(3)}
                    </div>
                    <span className="text-[9px] text-[#64748B] dark:text-slate-500 block mt-1">
                      {tFi.deltaDesc}
                    </span>
                  </div>

                  {/* Gamma */}
                  <div className="p-3 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase block mb-1">
                      Gamma (Γ)
                    </span>
                    <div className="text-base font-bold text-[#003399] dark:text-sky-400 font-mono-numbers">
                      {bsResult.gamma.toFixed(4)}
                    </div>
                    <span className="text-[9px] text-[#64748B] dark:text-slate-500 block mt-1">
                      {tFi.gammaDesc}
                    </span>
                  </div>

                  {/* Theta */}
                  <div className="p-3 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase block mb-1">
                      Theta (Θ)
                    </span>
                    <div className="text-base font-bold text-[#DC2626] dark:text-rose-400 font-mono-numbers">
                      {(optionType === 'CALL' ? bsResult.callTheta : bsResult.putTheta).toFixed(3)}
                    </div>
                    <span className="text-[9px] text-[#64748B] dark:text-slate-500 block mt-1">
                      {tFi.thetaDesc}
                    </span>
                  </div>

                  {/* Vega */}
                  <div className="p-3 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase block mb-1">
                      Vega (ν)
                    </span>
                    <div className="text-base font-bold text-[#B45309] dark:text-amber-400 font-mono-numbers">
                      {bsResult.vega.toFixed(3)}
                    </div>
                    <span className="text-[9px] text-[#64748B] dark:text-slate-500 block mt-1">
                      {tFi.vegaDesc}
                    </span>
                  </div>

                  {/* Rho */}
                  <div className="p-3 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase block mb-1">
                      Rho (ρ)
                    </span>
                    <div className="text-base font-bold text-[#4338CA] dark:text-indigo-400 font-mono-numbers">
                      {(optionType === 'CALL' ? bsResult.callRho : bsResult.putRho).toFixed(3)}
                    </div>
                    <span className="text-[9px] text-[#64748B] dark:text-slate-500 block mt-1">
                      {tFi.rhoDesc}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payoff Curve Visualizer */}
              <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0] dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
                    <h3 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                      {tFi.payoffTitle}
                    </h3>
                  </div>

                  {/* Strategy Selector */}
                  <div className="flex items-center gap-1 bg-[#F4F7F9] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-lg p-0.5 text-xs">
                    {(
                      [
                        { id: 'BUY_CALL', label: tFi.strategies.BUY_CALL },
                        { id: 'BUY_PUT', label: tFi.strategies.BUY_PUT },
                        { id: 'BULL_CALL_SPREAD', label: tFi.strategies.BULL_CALL_SPREAD },
                        { id: 'STRADDLE', label: tFi.strategies.STRADDLE },
                      ] as const
                    ).map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setStrategyType(st.id)}
                        data-on-dark={strategyType === st.id ? 'true' : undefined}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer ${
                          strategyType === st.id
                            ? 'bg-[#003399] dark:bg-emerald-600 text-white'
                            : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simplified SVG Payoff Line Chart */}
                <div className="h-48 w-full relative flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 180" preserveAspectRatio="none">
                    {/* Zero PnL Reference Line */}
                    <line x1="0" y1="90" x2="600" y2="90" stroke={isLight ? '#CBD5E1' : '#334155'} strokeWidth="1.5" strokeDasharray="4 4" />
                    <text x="10" y="85" fill={isLight ? '#475569' : '#64748b'} fontSize="10" fontFamily="monospace">
                      {tFi.breakevenText}
                    </text>

                    {/* Payoff Polyline */}
                    {(() => {
                      const maxPnl = Math.max(...payoffData.map((d) => Math.abs(d.pnl)), 10);
                      const pointsStr = payoffData
                        .map((d, idx) => {
                          const x = (idx / (payoffData.length - 1)) * 580 + 10;
                          // Invert Y: 90 is 0. Positive goes UP to 10, Negative goes DOWN to 170
                          const y = 90 - (d.pnl / maxPnl) * 75;
                          return `${x},${y}`;
                        })
                        .join(' ');

                      return (
                        <>
                          <polyline
                            fill="none"
                            stroke={isLight ? '#009B77' : '#10b981'}
                            strokeWidth="2.5"
                            points={pointsStr}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      );
                    })()}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#475569] dark:text-slate-400 pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80">
                  <span>{tFi.minPriceLabel} {formatCurrencyValue(spotPrice * 0.7, 'BRL', 2, locale)}</span>
                  <span className="text-[#B45309] dark:text-amber-400 font-bold">{tFi.strikeLabel} {formatCurrencyValue(strikePrice, 'BRL', 2, locale)}</span>
                  <span>{tFi.maxPriceLabel} {formatCurrencyValue(spotPrice * 1.3, 'BRL', 2, locale)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 2: FUTURES CONTRACTS ================= */}
      {activeSubTab === 'futures' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
                <h2 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                  {tFi.futuresTitle}
                </h2>
              </div>
              <span className="text-xs text-[#475569] dark:text-slate-400">{tFi.futuresSubtitle}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dynamicFutures.map((contract) => {
                const pctInfo = formatSignedPercentChange(contract.change, 2);
                return (
                  <div
                    key={contract.code}
                    className="p-4 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/80 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/35 dark:hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-[#0F172A] dark:text-white">{contract.code}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#E2E8F0] dark:bg-slate-800 text-[#334155] dark:text-slate-400 font-medium">
                            {contract.market}
                          </span>
                        </div>
                        <p className="text-xs text-[#475569] dark:text-slate-400">{contract.name}</p>
                      </div>
                      <div
                        className={`text-xs font-bold font-mono-numbers px-2 py-0.5 rounded ${
                          !pctInfo.isNegative
                            ? 'text-[#006B52] bg-[#E3F7F2] dark:text-emerald-400 dark:bg-emerald-500/10'
                            : 'text-[#DC2626] bg-[#FEE2E2] dark:text-rose-400 dark:bg-rose-500/10'
                        }`}
                      >
                        {pctInfo.text}
                      </div>
                    </div>

                    <div className="text-xl font-black text-[#0F172A] dark:text-white font-mono-numbers my-2">
                      {contract.price.toLocaleString(locale)}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80 text-[11px]">
                      <div className="flex justify-between text-[#475569] dark:text-slate-400">
                        <span>{tFi.tickValueLabel}</span>
                        <span className="text-[#0F172A] dark:text-slate-200 font-medium">{contract.tickValue}</span>
                      </div>
                      <div className="flex justify-between text-[#475569] dark:text-slate-400">
                        <span>{tFi.recommendedMarginLabel}</span>
                        <span className="text-[#B45309] dark:text-amber-400 font-medium">{contract.marginReq}</span>
                      </div>
                      <div className="flex justify-between text-[#475569] dark:text-slate-400">
                        <span>{tFi.maturityLabel}</span>
                        <span className="text-[#0F172A] dark:text-slate-200 font-medium">{contract.maturity}</span>
                      </div>
                      <div className="flex justify-between text-[#475569] dark:text-slate-400">
                        <span>{tFi.volume24hLabel}</span>
                        <span className="text-[#006B52] dark:text-emerald-400 font-medium">{contract.volume}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION 3: FIXED INCOME & TREASURY ================= */}
      {activeSubTab === 'fixed_income' && (
        <div className="space-y-6">
          {/* Simulator Calculator */}
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-gradient-to-br dark:from-[#0c1626] dark:to-[#070e1a] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-2xl">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0] dark:border-slate-800 mb-4">
              <Calculator className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                {tFi.simTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block mb-1">
                  {tFi.initialDepositLabel}
                </label>
                <input
                  type="number"
                  step="500"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Math.max(100, parseFloat(e.target.value) || 100))}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block mb-1">
                  {tFi.termMonthsLabel}
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={investMonths}
                  onChange={(e) => setInvestMonths(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block mb-1">
                  {tFi.selicCdiRefLabel}
                </label>
                <input
                  type="number"
                  step="0.25"
                  value={cdiRate}
                  onChange={(e) => setCdiRate(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CDI 100% */}
              <div className="p-4 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-[#475569] dark:text-slate-400 block mb-1">
                  {tFi.cdiCardTitle}
                </span>
                <div className="text-xl font-black text-[#006B52] dark:text-emerald-400 font-mono-numbers">
                  {formatCurrencyValue(simResults.cdiNet, 'BRL', 2, locale)}
                </div>
                <div className="text-[11px] text-[#475569] dark:text-slate-400 mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>{tFi.netProfitLabel}</span>
                    <span className="text-[#0F172A] dark:text-white font-semibold">
                      +{formatCurrencyValue(simResults.cdiProfit, 'BRL', 2, locale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#64748B] dark:text-slate-500">
                    <span>{tFi.irWithheldLabel}</span>
                    <span>{simResults.irPercentageApplied}%</span>
                  </div>
                </div>
              </div>

              {/* LCI / LCA Isento */}
              <div className="p-4 rounded-xl bg-[#E3F7F2]/80 dark:bg-gradient-to-br dark:from-emerald-950/30 dark:to-slate-900 border border-[#009B77]/45 dark:border-emerald-500/40">
                <span className="text-[10px] uppercase font-bold text-[#006B52] dark:text-emerald-400 block mb-1">
                  {tFi.lciCardTitle}
                </span>
                <div className="text-xl font-black text-[#0F172A] dark:text-white font-mono-numbers">
                  {formatCurrencyValue(simResults.lciNet, 'BRL', 2, locale)}
                </div>
                <div className="text-[11px] text-[#334155] dark:text-slate-400 mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>{tFi.netProfitLabel}</span>
                    <span className="text-[#006B52] dark:text-emerald-400 font-semibold">
                      +{formatCurrencyValue(simResults.lciProfit, 'BRL', 2, locale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#006B52] dark:text-emerald-400 font-semibold">
                    <span>{tFi.incomeTaxLabel}</span>
                    <span>{tFi.exemptZeroLabel}</span>
                  </div>
                </div>
              </div>

              {/* Poupança */}
              <div className="p-4 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/90 border border-[#E2E8F0] dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-[#64748B] dark:text-slate-500 block mb-1">
                  {tFi.poupancaCardTitle}
                </span>
                <div className="text-xl font-black text-[#334155] dark:text-slate-300 font-mono-numbers">
                  {formatCurrencyValue(simResults.poupNet, 'BRL', 2, locale)}
                </div>
                <div className="text-[11px] text-[#475569] dark:text-slate-400 mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span>{tFi.profitLabel}</span>
                    <span className="text-[#0F172A] dark:text-slate-300 font-semibold">
                      +{formatCurrencyValue(simResults.poupProfit, 'BRL', 2, locale)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#DC2626] dark:text-rose-400 font-semibold">
                    <span>{tFi.dinheuroDiffLabel}</span>
                    <span>{tFi.losesPrefix} {formatCurrencyValue(simResults.lciProfit - simResults.poupProfit, 'BRL', 2, locale)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Income Instruments Table */}
          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] dark:border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                  {tFi.catalogTitle}
                </h3>
              </div>
              <span className="text-xs text-[#475569] dark:text-slate-400">{tFi.catalogSubtitle}</span>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">{tFi.colTitleAsset}</th>
                    <th className="py-2.5 px-3">{tFi.colIssuer}</th>
                    <th className="py-2.5 px-3">{tFi.colYield}</th>
                    <th className="py-2.5 px-3">{tFi.colMaturity}</th>
                    <th className="py-2.5 px-3">{tFi.colMinimum}</th>
                    <th className="py-2.5 px-3">{tFi.colTaxation}</th>
                    <th className="py-2.5 px-3">{tFi.colGuarantee}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60 font-medium text-[#334155] dark:text-slate-200">
                  {FIXED_INCOME_ASSETS.map((asset) => {
                    const ov = tFi.fixedIncomeOverrides[asset.id];
                    const name = ov?.name || asset.name;
                    const category = ov?.category || asset.category;
                    const issuer = ov?.issuer || asset.issuer;
                    const rateDescription = ov?.rateDescription || asset.rateDescription;
                    const maturity = ov?.maturity || asset.maturity;
                    const irTax = ov?.irTax || asset.irTax;
                    const guarantee = ov?.guarantee || asset.guarantee;

                    return (
                      <tr key={asset.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition">
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#0F172A] dark:text-white">{name}</div>
                          <span className="text-[10px] text-[#006B52] dark:text-emerald-400 font-normal">{category}</span>
                        </td>
                        <td className="py-3 px-3 text-[#334155] dark:text-slate-300">{issuer}</td>
                        <td className="py-3 px-3 font-bold text-[#006B52] dark:text-emerald-400 font-mono-numbers">
                          {rateDescription}
                        </td>
                        <td className="py-3 px-3 text-[#334155] dark:text-slate-300">{maturity}</td>
                        <td className="py-3 px-3 font-mono-numbers text-[#0F172A] dark:text-white">
                          {formatCurrencyValue(asset.minInvestment, 'BRL', 2, locale)}
                        </td>
                        <td className="py-3 px-3 text-[11px] text-[#475569] dark:text-slate-400">{irTax}</td>
                        <td className="py-3 px-3 text-[11px] text-[#334155] dark:text-slate-300">{guarantee}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDITORIAL GUIDE & FAQ (BELOW PAYOFF / CALCULATORS) ================= */}
      {(() => {
        const guide = FIXED_INCOME_GUIDE_TRANSLATIONS[lang];
        return (
          <section className="space-y-6 pt-2">
            {/* Guide Header & 4 Original Blocks */}
            <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-7 shadow-xl space-y-6">
              <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-4 space-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{guide.eyebrow}</span>
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] dark:text-white tracking-tight">
                  {guide.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 leading-relaxed max-w-4xl">
                  {guide.subtitle}
                </p>
              </div>

              <div className="space-y-5">
                {guide.sections.map((section) => (
                  <article
                    key={section.id}
                    className="rounded-xl bg-[#F8FAFC] dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 space-y-3"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{section.badge}</span>
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white leading-snug">
                      {section.title}
                    </h3>
                    <div className="space-y-2.5 text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    {section.highlights && section.highlights.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                        {section.highlights.map((hl) => (
                          <div
                            key={hl.label}
                            className="rounded-lg bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-800 p-3 space-y-1"
                          >
                            <div className="text-[10px] font-bold uppercase tracking-wider text-[#475569] dark:text-slate-400">
                              {hl.label}
                            </div>
                            <div className="text-xs sm:text-sm font-extrabold text-[#003399] dark:text-emerald-300">
                              {hl.value}
                            </div>
                            <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
                              {hl.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            {/* FAQ Section (4 Items) */}
            <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-7 shadow-xl space-y-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{guide.faqEyebrow}</span>
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">
                  {guide.faqTitle}
                </h2>
              </div>

              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guide.faqItems.map((item, fIdx) => (
                  <div
                    key={fIdx}
                    className="rounded-xl bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 p-4 space-y-1.5"
                  >
                    <dt className="text-sm font-bold text-[#0F172A] dark:text-white flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#006B52] dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item.question}</span>
                    </dt>
                    <dd className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed pl-6">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="text-[11px] text-[#475569] dark:text-slate-400 pt-2 border-t border-[#E2E8F0] dark:border-slate-800 leading-relaxed">
                {guide.educationalNote}
              </p>
            </div>
          </section>
        );
      })()}
    </div>
  );
};
