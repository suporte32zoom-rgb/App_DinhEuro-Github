import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Calculator,
  Clock,
  Globe2,
  GraduationCap,
  HelpCircle,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { FUTURES_EDUCATION_COPY } from '../i18n/futuresEducationTranslations';
import {
  formatCurrencyValue,
  formatPointsValue,
  formatSignedPercentChange,
  getAssetPriceDecimals,
} from '../utils/finance';

type ContractTypeKey = 'win' | 'wdo' | 'es';

export const DayTradeView: React.FC = () => {
  const { assets, universalRates, setActiveTab } = useMarket();
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const copy = FUTURES_EDUCATION_COPY[lang];

  // Educational Risk & Position-Sizing Calculator state
  const [contractType, setContractType] = useState<ContractTypeKey>('win');
  const [referenceCapital, setReferenceCapital] = useState<number>(25000);
  const [contractCount, setContractCount] = useState<number>(1);
  const [stopDistancePts, setStopDistancePts] = useState<number>(150);

  // Live reference instruments synced from global MarketContext
  const referenceInstruments = useMemo(() => {
    const ibov = assets.find((a) => a.symbol === 'IBOVESPA');
    const usdBrl = assets.find((a) => a.symbol === 'USD/BRL');
    const eurBrl = assets.find((a) => a.symbol === 'EUR/BRL');
    const sp500 = assets.find((a) => a.symbol === 'S&P 500');

    const ibovPrice = ibov && ibov.price > 0 ? Math.round(ibov.price / 5) * 5 : 171670;
    const ibovLow = ibov && ibov.low24h > 0 ? Math.round(ibov.low24h / 5) * 5 : 171200;
    const ibovHigh = ibov && ibov.high24h > 0 ? Math.round(ibov.high24h / 5) * 5 : 172000;

    const wdoPrice = usdBrl && usdBrl.price > 0 ? Number((usdBrl.price * 1000).toFixed(1)) : 5482.5;
    const wdoLow = usdBrl && usdBrl.low24h > 0 ? Number((usdBrl.low24h * 1000).toFixed(1)) : 5468.0;
    const wdoHigh = usdBrl && usdBrl.high24h > 0 ? Number((usdBrl.high24h * 1000).toFixed(1)) : 5510.0;

    const spPrice = sp500 && sp500.price > 0 ? sp500.price : 7575.4;
    const spLow = sp500 && sp500.low24h > 0 ? sp500.low24h : 7530.0;
    const spHigh = sp500 && sp500.high24h > 0 ? sp500.high24h : 7605.0;

    const eurPrice = eurBrl && eurBrl.price > 0 ? eurBrl.price : 6.2335;
    const eurLow = eurBrl && eurBrl.low24h > 0 ? eurBrl.low24h : 6.19;
    const eurHigh = eurBrl && eurBrl.high24h > 0 ? eurBrl.high24h : 6.26;

    return [
      {
        id: 'win',
        symbol: 'WIN (Ref.)',
        label: copy.winLabel,
        priceFormatted: formatPointsValue(ibovPrice, locale),
        rawPrice: ibovPrice,
        change: ibov ? ibov.change24h : 0.68,
        rangeFormatted: `${formatPointsValue(ibovLow, locale)} – ${formatPointsValue(ibovHigh, locale)}`,
        spec: copy.winSpec,
      },
      {
        id: 'wdo',
        symbol: 'WDO (Ref.)',
        label: copy.wdoLabel,
        priceFormatted: formatPointsValue(wdoPrice, locale),
        rawPrice: wdoPrice,
        change: usdBrl ? usdBrl.change24h : -0.32,
        rangeFormatted: `${formatPointsValue(wdoLow, locale)} – ${formatPointsValue(wdoHigh, locale)}`,
        spec: copy.wdoSpec,
      },
      {
        id: 'sp500',
        symbol: 'S&P 500',
        label: copy.sp500Label,
        priceFormatted: formatPointsValue(spPrice, locale),
        rawPrice: spPrice,
        change: sp500 ? sp500.change24h : 0.48,
        rangeFormatted: `${formatPointsValue(spLow, locale)} – ${formatPointsValue(spHigh, locale)}`,
        spec: copy.sp500Spec,
      },
      {
        id: 'eurbrl',
        symbol: 'EUR/BRL',
        label: copy.eurBrlLabel,
        priceFormatted: formatCurrencyValue(
          eurPrice,
          'BRL',
          getAssetPriceDecimals(eurPrice, 'BRL', 'forex'),
          locale
        ),
        rawPrice: eurPrice,
        change: eurBrl ? eurBrl.change24h : 0.21,
        rangeFormatted: `${formatCurrencyValue(eurLow, 'BRL', 4, locale)} – ${formatCurrencyValue(eurHigh, 'BRL', 4, locale)}`,
        spec: copy.eurBrlSpec,
      },
    ];
  }, [assets, copy, locale]);

  // Risk calculation based on selected contract specifications
  const riskMetrics = useMemo(() => {
    const usdRate = universalRates.BRL > 0 ? universalRates.BRL : 5.48;
    const safeCapital = Math.max(100, Number.isFinite(referenceCapital) ? referenceCapital : 0);
    const safeContracts = Math.max(1, Math.min(500, Math.round(Number.isFinite(contractCount) ? contractCount : 1)));
    const safeStopPts = Math.max(0.5, Number.isFinite(stopDistancePts) ? stopDistancePts : 0);

    const ibovRef = referenceInstruments[0]?.rawPrice || 171670;
    const wdoRef = referenceInstruments[1]?.rawPrice || 5482.5;
    const spRef = referenceInstruments[2]?.rawPrice || 7575.4;

    let pointValueBrl = 0.2;
    let notionalBrl = ibovRef * 0.2 * safeContracts;
    let displayCurrency: 'BRL' | 'USD' = 'BRL';
    let pointValueNative = 0.2;

    if (contractType === 'win') {
      pointValueNative = 0.2;
      pointValueBrl = 0.2;
      notionalBrl = ibovRef * 0.2 * safeContracts;
      displayCurrency = 'BRL';
    } else if (contractType === 'wdo') {
      pointValueNative = 10;
      pointValueBrl = 10;
      notionalBrl = wdoRef * 10 * safeContracts;
      displayCurrency = 'BRL';
    } else {
      // Micro E-mini S&P 500 ($5/pt) converted to BRL for unified capital comparison
      pointValueNative = 5;
      pointValueBrl = 5 * usdRate;
      notionalBrl = spRef * 5 * usdRate * safeContracts;
      displayCurrency = 'USD';
    }

    const totalPointValueNative = pointValueNative * safeContracts;
    const financialRiskBrl = safeStopPts * pointValueBrl * safeContracts;
    const financialRiskNative = safeStopPts * pointValueNative * safeContracts;
    const capitalPct = (financialRiskBrl / safeCapital) * 100;

    return {
      safeContracts,
      displayCurrency,
      totalPointValueFormatted: formatCurrencyValue(totalPointValueNative, displayCurrency, 2, locale),
      financialRiskBrlFormatted: formatCurrencyValue(financialRiskBrl, 'BRL', 2, locale),
      financialRiskNativeFormatted:
        displayCurrency === 'USD'
          ? `${formatCurrencyValue(financialRiskNative, 'USD', 2, locale)} (≈ ${formatCurrencyValue(financialRiskBrl, 'BRL', 2, locale)})`
          : formatCurrencyValue(financialRiskBrl, 'BRL', 2, locale),
      notionalFormatted: formatCurrencyValue(notionalBrl, 'BRL', 2, locale),
      capitalPct,
    };
  }, [contractType, referenceCapital, contractCount, stopDistancePts, universalRates.BRL, referenceInstruments, locale]);

  const handleContractChange = (nextType: ContractTypeKey) => {
    setContractType(nextType);
    if (nextType === 'win') setStopDistancePts(150);
    else if (nextType === 'wdo') setStopDistancePts(10);
    else setStopDistancePts(15);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-5 space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E3F7F2] dark:bg-emerald-500/15 border border-[#009B77]/35 dark:border-emerald-500/30 text-[#006B52] dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{copy.badge}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight leading-snug">
          {copy.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed max-w-4xl">
          {copy.subtitle}
        </p>
      </div>

      {/* Mandatory Risk & Strictly Educational Notice */}
      <div className="rounded-2xl bg-[#FEF7E0] dark:bg-amber-950/35 border border-[#E5A910]/50 dark:border-amber-500/35 p-4 sm:p-5 flex items-start gap-3 shadow-md">
        <AlertTriangle className="w-5 h-5 text-[#B45309] dark:text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <h2 className="text-xs sm:text-sm font-extrabold text-[#92400E] dark:text-amber-300">
            {copy.topWarningTitle}
          </h2>
          <p className="text-xs text-[#78350F] dark:text-amber-100/90 leading-relaxed">
            {copy.topWarningBody}
          </p>
        </div>
      </div>

      {/* Live Analytical Reference Monitor */}
      <section
        aria-labelledby="futures-monitor-heading"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"
      >
        <div className="space-y-1">
          <h2
            id="futures-monitor-heading"
            className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2"
          >
            <Activity className="w-5 h-5 text-[#003399] dark:text-emerald-400" aria-hidden="true" />
            <span>{copy.monitorTitle}</span>
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed">
            {copy.monitorSubtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-slate-800 text-[11px] uppercase tracking-wider text-[#475569] dark:text-slate-400">
                <th className="py-2.5 pr-3 font-bold">{copy.monitorHeaders.instrument}</th>
                <th className="py-2.5 px-3 font-bold">{copy.monitorHeaders.referencePrice}</th>
                <th className="py-2.5 px-3 font-bold">{copy.monitorHeaders.change24h}</th>
                <th className="py-2.5 px-3 font-bold">{copy.monitorHeaders.intradayRange}</th>
                <th className="py-2.5 pl-3 font-bold">{copy.monitorHeaders.contractSpec}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/70">
              {referenceInstruments.map((item) => {
                const pct = formatSignedPercentChange(item.change, 2);
                return (
                  <tr key={item.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-900/40 transition">
                    <td className="py-3 pr-3">
                      <span className="font-bold text-[#0F172A] dark:text-white block">{item.symbol}</span>
                      <span className="text-[11px] text-[#475569] dark:text-slate-400">{item.label}</span>
                    </td>
                    <td className="py-3 px-3 font-mono-numbers font-extrabold text-[#0F172A] dark:text-white">
                      {item.priceFormatted}
                    </td>
                    <td className="py-3 px-3 font-mono-numbers font-bold">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[11px] ${
                          !pct.isNegative
                            ? 'bg-[#E3F7F2] dark:bg-emerald-500/15 text-[#006B52] dark:text-emerald-400'
                            : 'bg-[#FEE2E2] dark:bg-rose-500/15 text-[#DC2626] dark:text-rose-400'
                        }`}
                      >
                        {pct.text}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono-numbers text-[#334155] dark:text-slate-300">
                      {item.rangeFormatted}
                    </td>
                    <td className="py-3 pl-3 text-[#475569] dark:text-slate-300">{item.spec}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Educational Position Exposure & Risk-Limit Calculator */}
      <section
        aria-labelledby="futures-risk-calculator-heading"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h2
              id="futures-risk-calculator-heading"
              className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2"
            >
              <Calculator className="w-5 h-5 text-[#006B52] dark:text-emerald-400" aria-hidden="true" />
              <span>{copy.riskCalcTitle}</span>
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed">
              {copy.riskCalcSubtitle}
            </p>
          </div>
          <span className="self-start sm:self-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E6EEFF] dark:bg-sky-500/15 text-[#003399] dark:text-sky-300 border border-[#003399]/25 dark:border-sky-500/30 shrink-0">
            {copy.riskCalcBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="futures-contract-select"
              className="block text-xs font-semibold text-[#334155] dark:text-slate-300 mb-1.5"
            >
              {copy.contractLabel}
            </label>
            <select
              id="futures-contract-select"
              value={contractType}
              onChange={(e) => handleContractChange(e.target.value as ContractTypeKey)}
              className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
            >
              <option value="win">{copy.contractOptions.win}</option>
              <option value="wdo">{copy.contractOptions.wdo}</option>
              <option value="es">{copy.contractOptions.es}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="futures-capital-input"
              className="block text-xs font-semibold text-[#334155] dark:text-slate-300 mb-1.5"
            >
              {copy.capitalLabel} (R$)
            </label>
            <input
              id="futures-capital-input"
              type="number"
              min={500}
              step={500}
              value={referenceCapital}
              onChange={(e) => setReferenceCapital(Number(e.target.value))}
              className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono-numbers font-bold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="futures-contracts-input"
              className="block text-xs font-semibold text-[#334155] dark:text-slate-300 mb-1.5"
            >
              {copy.contractsCountLabel}
            </label>
            <input
              id="futures-contracts-input"
              type="number"
              min={1}
              max={100}
              value={contractCount}
              onChange={(e) => setContractCount(Number(e.target.value))}
              className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono-numbers font-bold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="futures-stop-input"
              className="block text-xs font-semibold text-[#334155] dark:text-slate-300 mb-1.5"
            >
              {copy.stopDistanceLabel}
            </label>
            <input
              id="futures-stop-input"
              type="number"
              min={0.5}
              step={contractType === 'win' ? 10 : 0.5}
              value={stopDistancePts}
              onChange={(e) => setStopDistancePts(Number(e.target.value))}
              className="w-full bg-[#F8FAFC] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono-numbers font-bold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block">
              {copy.pointValueLabel}
            </span>
            <span className="text-sm sm:text-base font-black font-mono-numbers text-[#0F172A] dark:text-white">
              {riskMetrics.totalPointValueFormatted} / pt
            </span>
          </div>

          <div className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block">
              {copy.financialRiskLabel}
            </span>
            <span className="text-sm sm:text-base font-black font-mono-numbers text-[#DC2626] dark:text-rose-400">
              {riskMetrics.financialRiskNativeFormatted}
            </span>
          </div>

          <div className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block">
              {copy.capitalAtRiskPctLabel}
            </span>
            <span
              className={`text-sm sm:text-base font-black font-mono-numbers ${
                riskMetrics.capitalPct <= 1.5
                  ? 'text-[#006B52] dark:text-emerald-400'
                  : riskMetrics.capitalPct <= 3
                  ? 'text-[#B45309] dark:text-amber-400'
                  : 'text-[#DC2626] dark:text-rose-400'
              }`}
            >
              {riskMetrics.capitalPct.toLocaleString(locale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              %
            </span>
          </div>

          <div className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 p-3.5 space-y-1">
            <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 block">
              {copy.notionalExposureLabel}
            </span>
            <span className="text-sm sm:text-base font-black font-mono-numbers text-[#003399] dark:text-sky-300">
              {riskMetrics.notionalFormatted}
            </span>
          </div>
        </div>

        <div
          className={`rounded-xl px-4 py-3 text-xs font-semibold border ${
            riskMetrics.capitalPct <= 1.5
              ? 'bg-[#E3F7F2]/80 dark:bg-emerald-950/30 border-[#009B77]/35 dark:border-emerald-500/30 text-[#006B52] dark:text-emerald-300'
              : riskMetrics.capitalPct <= 3
              ? 'bg-[#FEF7E0] dark:bg-amber-950/30 border-[#E5A910]/40 dark:border-amber-500/30 text-[#92400E] dark:text-amber-300'
              : 'bg-[#FEE2E2] dark:bg-rose-950/35 border-[#DC2626]/35 dark:border-rose-500/35 text-[#B91C1C] dark:text-rose-300'
          }`}
        >
          {riskMetrics.capitalPct <= 1.5
            ? copy.riskStatusConservative
            : riskMetrics.capitalPct <= 3
            ? copy.riskStatusModerate
            : copy.riskStatusElevated}
        </div>

        <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
          {copy.riskCalcNote}
        </p>
      </section>

      {/* Structured Editorial Guide & FAQ */}
      <section
        aria-labelledby="futures-editorial-guide-heading"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-6"
      >
        <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-4 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.editorialEyebrow}</span>
          </span>
          <h2
            id="futures-editorial-guide-heading"
            className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight"
          >
            {copy.editorialTitle}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#1E293B] dark:text-slate-300 leading-relaxed max-w-4xl">
            {copy.editorialIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {copy.sections.map((section, idx) => {
            const SectionIcon = [BarChart3, Clock, Globe2, ShieldCheck][idx] || BookOpen;
            return (
              <article
                key={section.id}
                className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 p-4 sm:p-5 space-y-2.5"
              >
                <h3 className="text-xs sm:text-sm font-bold text-[#002266] dark:text-white leading-snug flex items-start gap-2">
                  <SectionIcon
                    className="w-4 h-4 text-[#003399] dark:text-emerald-400 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{section.title}</span>
                </h3>
                {section.body.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[11px] sm:text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#E2E8F0] dark:border-slate-800 pt-5 space-y-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copy.faqEyebrow}</span>
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {copy.faqTitle}
            </h2>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {copy.faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 p-4 space-y-2"
              >
                <dt className="text-xs sm:text-sm font-bold text-[#002266] dark:text-white leading-snug">
                  {item.question}
                </dt>
                <dd className="text-[11px] sm:text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final Educational Disclaimer & Related Study Links */}
      <section className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#006B52] dark:text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-xs sm:text-sm font-extrabold text-[#0F172A] dark:text-white">
              {copy.footerDisclaimerTitle}
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
              {copy.footerDisclaimerBody}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-[#334155] dark:text-slate-300">
            {copy.quickLinksTitle}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('mercados')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-xs font-semibold text-[#003399] dark:text-emerald-300 transition cursor-pointer"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{copy.btnMarkets}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('renda_fixa')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-xs font-semibold text-[#003399] dark:text-emerald-300 transition cursor-pointer"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{copy.btnFixedIncome}</span>
            </button>
            <button
              type="button"
              data-on-dark="true"
              onClick={() => setActiveTab('academy')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs font-bold text-white transition cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{copy.btnAcademy}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
