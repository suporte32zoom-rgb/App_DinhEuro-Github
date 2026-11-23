import React, { useState } from 'react';
import {
  Calculator,
  ArrowRightLeft,
  Percent,
  TrendingUp,
  Receipt,
  Sparkles,
  ArrowUpRight,
  PiggyBank,
} from 'lucide-react';
import {
  calculateCompoundInterest,
  calculateInflationImpact,
  calculateProfitAndTax,
  formatCurrencyValue,
} from '../utils/finance';
import { CompoundInterestChart } from '../components/CompoundInterestChart';
import { UniversalCurrencyCalculator } from '../components/UniversalCurrencyCalculator';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';

export const ToolsView: React.FC = () => {
  const { t, lang } = useI18n();
  const numberLocale = getNumberLocale(lang);
  const [activeTool, setActiveTool] = useState<'cambio' | 'juros' | 'inflacao' | 'darf'>('cambio');

  // --- 2. Juros Compostos State ---
  const [initialPrincipal, setInitialPrincipal] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(11.5); // 11.5% a.a. (CDI/Selic approx)
  const [years, setYears] = useState<number>(10);

  const compoundResult = calculateCompoundInterest({
    initialPrincipal,
    monthlyContribution,
    annualRatePercent: annualRate,
    years,
  });

  const applyPreset = (preset: 'milhao' | 'aposentadoria' | 'independencia' | 'reserva') => {
    switch (preset) {
      case 'milhao':
        setInitialPrincipal(5000);
        setMonthlyContribution(1500);
        setAnnualRate(11.5);
        setYears(18);
        break;
      case 'aposentadoria':
        setInitialPrincipal(10000);
        setMonthlyContribution(2000);
        setAnnualRate(10.5);
        setYears(30);
        break;
      case 'independencia':
        setInitialPrincipal(25000);
        setMonthlyContribution(3000);
        setAnnualRate(12.0);
        setYears(15);
        break;
      case 'reserva':
        setInitialPrincipal(2000);
        setMonthlyContribution(800);
        setAnnualRate(11.5);
        setYears(3);
        break;
    }
  };

  // --- 3. Inflação State ---
  const [inflationAmount, setInflationAmount] = useState<number>(50000);
  const [inflationRate, setInflationRate] = useState<number>(4.5); // 4.5% IPCA approx
  const [inflationYears, setInflationYears] = useState<number>(10);

  const inflationResult = calculateInflationImpact(inflationAmount, inflationRate, inflationYears);

  // --- 4. DARF & Imposto de Renda State ---
  const [darfBuyPrice, setDarfBuyPrice] = useState<number>(30.0);
  const [darfSellPrice, setDarfSellPrice] = useState<number>(42.0);
  const [darfQty, setDarfQty] = useState<number>(500);
  const [darfAssetType, setDarfAssetType] = useState<'stock_br' | 'stock_us' | 'crypto' | 'forex'>('stock_br');
  const [isDayTrade, setIsDayTrade] = useState<boolean>(false);
  const [monthlySalesVolume, setMonthlySalesVolume] = useState<number>(21000);

  const taxResult = calculateProfitAndTax({
    buyPrice: darfBuyPrice,
    sellPrice: darfSellPrice,
    quantity: darfQty,
    assetType: darfAssetType,
    isDayTrade,
    totalMonthlySalesValue: monthlySalesVolume,
  });

  const toolTabs = [
    { id: 'cambio', label: t.tools.tabFx, icon: ArrowRightLeft },
    { id: 'juros', label: t.tools.tabCompound, icon: TrendingUp },
    { id: 'inflacao', label: t.tools.tabInflation, icon: Percent },
    { id: 'darf', label: t.tools.tabTax, icon: Receipt },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#006B52] dark:text-emerald-400 shrink-0" />
          <span>
            {activeTool === 'cambio'
              ? t.tools.titleFx
              : activeTool === 'juros'
              ? t.tools.titleCompound
              : activeTool === 'inflacao'
              ? t.tools.titleInflation
              : t.tools.titleTax}
          </span>
        </h1>
        <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
          {t.tools.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
        style={{ flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch' }}
      >
        {toolTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id as any)}
              data-on-dark={isActive ? 'true' : undefined}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 text-white shadow-md shadow-blue-950/20 dark:shadow-emerald-950/40'
                  : 'bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 text-[#334155] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TOOL 1: CALCULADORA DE CÂMBIO UNIVERSAL (AWESOMEAPI) --- */}
      {activeTool === 'cambio' && (
        <UniversalCurrencyCalculator
          showRemittanceFeesDefault={true}
          defaultFrom="EUR"
          defaultTo="BRL"
          defaultAmount={1}
        />
      )}

      {/* --- TOOL 2: JUROS COMPOSTOS & RENDA FIXA --- */}
      {activeTool === 'juros' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#006B52] dark:text-emerald-400" />
                    <span>{t.tools.compoundTitle}</span>
                  </h2>
                  <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
                    {t.tools.compoundSubtitle}
                  </p>
                </div>
              </div>

              {/* Input Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F4F7F9] dark:bg-[#070e1b] p-4 rounded-xl border border-[#E2E8F0] dark:border-slate-800/80">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#334155] dark:text-slate-400 font-medium">{t.tools.initialPrincipalLabel}</label>
                    <span className="text-[#64748B] dark:text-slate-500 font-mono-numbers text-[11px]">{t.tools.initialPrincipalHint}</span>
                  </div>
                  <input
                    type="number"
                    value={initialPrincipal}
                    onChange={(e) => setInitialPrincipal(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 focus:border-[#003399] dark:focus:border-emerald-500 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers text-sm transition outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#334155] dark:text-slate-400 font-medium">{t.tools.monthlyContribLabel}</label>
                    <span className="text-[#006B52] dark:text-emerald-400 font-mono-numbers text-[11px]">{t.tools.monthlyContribHint}</span>
                  </div>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 focus:border-[#003399] dark:focus:border-emerald-500 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers text-sm transition outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#334155] dark:text-slate-400 font-medium">{t.tools.annualRateLabel}</label>
                    <span className="text-[#003399] dark:text-cyan-400 font-mono-numbers text-[11px]">
                      ~{((Math.pow(1 + annualRate / 100, 1 / 12) - 1) * 100).toFixed(2)}{t.tools.rateMonthlySuffix}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 focus:border-[#003399] dark:focus:border-emerald-500 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers text-sm transition outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[#334155] dark:text-slate-400 font-medium">{t.tools.yearsLabel}</label>
                    <span className="text-[#B45309] dark:text-amber-400 font-mono-numbers text-[11px]">
                      {years * 12} {t.tools.monthsUnit}
                    </span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={years}
                    onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 focus:border-[#003399] dark:focus:border-emerald-500 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers text-sm transition outline-none"
                  />
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F4F7F9] dark:bg-[#070e1b] rounded-xl p-3.5 border border-[#E2E8F0] dark:border-slate-800">
                  <span className="text-[10px] text-[#475569] dark:text-slate-400 uppercase tracking-wider">{t.tools.totalInvestedLabel}</span>
                  <p className="text-lg font-bold font-mono-numbers text-[#003399] dark:text-blue-400 mt-1">
                    {formatCurrencyValue(compoundResult.totalInvested, 'BRL')}
                  </p>
                  <span className="text-[10px] text-[#64748B] dark:text-slate-500">{t.tools.totalInvestedHint}</span>
                </div>

                <div className="bg-[#F4F7F9] dark:bg-[#070e1b] rounded-xl p-3.5 border border-[#E2E8F0] dark:border-slate-800">
                  <span className="text-[10px] text-[#475569] dark:text-slate-400 uppercase tracking-wider">{t.tools.totalInterestLabel}</span>
                  <p className="text-lg font-bold font-mono-numbers text-[#006B52] dark:text-emerald-400 mt-1">
                    +{formatCurrencyValue(compoundResult.totalInterest, 'BRL')}
                  </p>
                  <span className="text-[10px] text-[#006B52] dark:text-emerald-500 font-semibold">
                    {((compoundResult.totalInterest / compoundResult.finalBalance) * 100).toFixed(0)}{t.tools.ofBalanceSuffix}
                  </span>
                </div>

                <div className="bg-[#F4F7F9] dark:bg-[#070e1b] rounded-xl p-3.5 border border-[#E2E8F0] dark:border-slate-800">
                  <span className="text-[10px] text-[#475569] dark:text-slate-400 uppercase tracking-wider">{t.tools.finalBalanceLabel}</span>
                  <p className="text-lg font-black font-mono-numbers text-[#B45309] dark:text-amber-400 mt-1">
                    {formatCurrencyValue(compoundResult.finalBalance, 'BRL')}
                  </p>
                  <span className="text-[10px] text-[#64748B] dark:text-slate-500">{t.tools.finalBalanceHint}</span>
                </div>
              </div>

              {/* Recharts Visual Component */}
              <CompoundInterestChart
                initialPrincipal={initialPrincipal}
                monthlyContribution={monthlyContribution}
                annualRate={annualRate}
                years={years}
                breakdown={compoundResult.breakdown}
                finalBalance={compoundResult.finalBalance}
                totalInvested={compoundResult.totalInvested}
                totalInterest={compoundResult.totalInterest}
              />

              {/* Annual Breakdown Table */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                    {t.tools.annualBreakdownTitle}
                  </h3>
                  <span className="text-[11px] text-[#475569] dark:text-slate-400 font-mono-numbers">
                    {compoundResult.breakdown.length} {t.tools.periodsComputedSuffix}
                  </span>
                </div>
                <div className="max-h-52 overflow-y-auto no-scrollbar rounded-xl border border-[#E2E8F0] dark:border-slate-800">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-[#F4F7F9] dark:bg-[#070e1b] text-[#475569] dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 sticky top-0">
                      <tr>
                        <th className="py-2.5 px-3">{t.tools.colYear}</th>
                        <th className="py-2.5 px-3 text-right">{t.tools.colTotalInvested}</th>
                        <th className="py-2.5 px-3 text-right">{t.tools.colAccumInterest}</th>
                        <th className="py-2.5 px-3 text-right">{t.tools.colFinalBalance}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60 font-mono-numbers">
                      {compoundResult.breakdown.map((row) => (
                        <tr key={row.year} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition">
                          <td className="py-2 px-3 font-semibold text-[#0F172A] dark:text-white">{t.tools.yearPrefix} {row.year}</td>
                          <td className="py-2 px-3 text-right text-[#334155] dark:text-slate-300">
                            {formatCurrencyValue(row.totalInvested, 'BRL')}
                          </td>
                          <td className="py-2 px-3 text-right text-[#006B52] dark:text-emerald-400">
                            +{formatCurrencyValue(row.interestEarned, 'BRL')}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-[#B45309] dark:text-amber-300">
                            {formatCurrencyValue(row.totalBalance, 'BRL')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Presets & Educational Strategy */}
            <div className="space-y-5">
              {/* Quick Presets */}
              <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B45309] dark:text-amber-400" />
                  <span>{t.tools.presetsTitle}</span>
                </h3>
                <p className="text-xs text-[#475569] dark:text-slate-400">
                  {t.tools.presetsSubtitle}
                </p>
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => applyPreset('milhao')}
                    className="w-full p-3 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/35 dark:hover:border-emerald-500/40 text-left transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition">
                        {t.tools.presetMilhaoTitle}
                      </div>
                      <div className="text-[11px] text-[#475569] dark:text-slate-400">
                        {t.tools.presetMilhaoDesc}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-slate-500 group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition" />
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset('aposentadoria')}
                    className="w-full p-3 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/35 dark:hover:border-emerald-500/40 text-left transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition">
                        {t.tools.presetAposTitle}
                      </div>
                      <div className="text-[11px] text-[#475569] dark:text-slate-400">
                        {t.tools.presetAposDesc}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-slate-500 group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition" />
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset('independencia')}
                    className="w-full p-3 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/35 dark:hover:border-emerald-500/40 text-left transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition">
                        {t.tools.presetIndepTitle}
                      </div>
                      <div className="text-[11px] text-[#475569] dark:text-slate-400">
                        {t.tools.presetIndepDesc}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-slate-500 group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition" />
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset('reserva')}
                    className="w-full p-3 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/35 dark:hover:border-emerald-500/40 text-left transition cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition">
                        {t.tools.presetReservaTitle}
                      </div>
                      <div className="text-[11px] text-[#475569] dark:text-slate-400">
                        {t.tools.presetReservaDesc}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] dark:text-slate-500 group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition" />
                  </button>
                </div>
              </div>

              {/* Educational Card */}
              <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
                  <span>{t.tools.snowballTitle}</span>
                </h3>
                <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                  {t.tools.snowballBodyPrefix}{' '}
                  <strong className="text-[#006B52] dark:text-emerald-400 font-mono-numbers">
                    {((compoundResult.totalInterest / compoundResult.finalBalance) * 100).toFixed(1)}%
                  </strong>{' '}
                  {t.tools.snowballBodySuffix}
                </p>
                <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80 text-[11px] text-[#475569] dark:text-slate-400 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>{t.tools.monthlyEqRate}</span>
                    <span className="font-mono-numbers text-[#0F172A] dark:text-white font-semibold">
                      {((Math.pow(1 + annualRate / 100, 1 / 12) - 1) * 100).toFixed(2)}{t.tools.rateMonthlySuffix}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.tools.periodTotalContrib}</span>
                    <span className="font-mono-numbers text-[#334155] dark:text-slate-300">
                      {formatCurrencyValue(compoundResult.totalInvested, 'BRL')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.tools.periodTotalInterest}</span>
                    <span className="font-mono-numbers text-[#006B52] dark:text-emerald-400 font-bold">
                      +{formatCurrencyValue(compoundResult.totalInterest, 'BRL')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TOOL 3: INFLAÇÃO & PODER DE COMPRA --- */}
      {activeTool === 'inflacao' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] dark:text-white">{t.tools.inflationTitle}</h2>
              <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
                {t.tools.inflationSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.inflationCurrentAmount}</label>
                <input
                  type="number"
                  value={inflationAmount}
                  onChange={(e) => setInflationAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.inflationAvgRate}</label>
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.inflationPeriodYears}</label>
                <input
                  type="number"
                  value={inflationYears}
                  onChange={(e) => setInflationYears(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>
            </div>

            {/* Impact Box */}
            <div className="bg-[#F4F7F9] dark:bg-[#070e1b] rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#475569] dark:text-slate-400">{t.tools.inflationFuturePower}</span>
                <span className="text-xl font-bold font-mono-numbers text-[#DC2626] dark:text-rose-400">
                  {formatCurrencyValue(inflationResult.futurePurchasingPower, 'BRL')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[#475569] dark:text-slate-400">{t.tools.inflationRealLoss}</span>
                <span className="text-sm font-bold font-mono-numbers text-[#DC2626] dark:text-rose-400">
                  -{inflationResult.lossPercentage}%
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0] dark:border-slate-800">
                <span className="text-xs text-[#334155] dark:text-slate-300 font-semibold">
                  {t.tools.inflationNeededFuture}
                </span>
                <span className="text-lg font-bold font-mono-numbers text-[#B45309] dark:text-amber-400">
                  {formatCurrencyValue(inflationResult.equivalentNeeded, 'BRL')}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">{t.tools.inflationProtectTitle}</h3>
            <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
              {t.tools.inflationProtectBody}
            </p>
          </div>
        </div>
      )}

      {/* --- TOOL 4: DARF & TRIBUTAÇÃO --- */}
      {activeTool === 'darf' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-5">
            <div>
              <h2 className="text-base font-bold text-[#0F172A] dark:text-white">{t.tools.darfTitle}</h2>
              <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
                {t.tools.darfSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.darfAssetType}</label>
                <select
                  value={darfAssetType}
                  onChange={(e) => setDarfAssetType(e.target.value as any)}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white"
                >
                  <option value="stock_br">{t.tools.darfOptBr}</option>
                  <option value="stock_us">{t.tools.darfOptUs}</option>
                  <option value="crypto">{t.tools.darfOptCrypto}</option>
                </select>
              </div>

              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.darfBuyPrice}</label>
                <input
                  type="number"
                  step="any"
                  value={darfBuyPrice}
                  onChange={(e) => setDarfBuyPrice(Number(e.target.value))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.darfSellPrice}</label>
                <input
                  type="number"
                  step="any"
                  value={darfSellPrice}
                  onChange={(e) => setDarfSellPrice(Number(e.target.value))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.darfQty}</label>
                <input
                  type="number"
                  value={darfQty}
                  onChange={(e) => setDarfQty(Number(e.target.value))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="text-[#334155] dark:text-slate-400 block mb-1">{t.tools.darfMonthlyVol}</label>
                <input
                  type="number"
                  value={monthlySalesVolume}
                  onChange={(e) => setMonthlySalesVolume(Number(e.target.value))}
                  className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-[#0F172A] dark:text-white font-mono-numbers"
                />
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#0F172A] dark:text-slate-200 font-medium">
                  <input
                    type="checkbox"
                    checked={isDayTrade}
                    onChange={(e) => setIsDayTrade(e.target.checked)}
                    className="rounded bg-[#FFFFFF] dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-700 text-[#009B77] dark:text-emerald-500"
                  />
                  <span>{t.tools.darfDayTradeCheck}</span>
                </label>
              </div>
            </div>

            {/* Results */}
            <div className="bg-[#F4F7F9] dark:bg-[#070e1b] rounded-2xl p-5 border border-[#E2E8F0] dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#475569] dark:text-slate-400">{t.tools.darfGrossProfit}</span>
                <span className="text-base font-bold font-mono-numbers text-[#0F172A] dark:text-white">
                  {formatCurrencyValue(taxResult.grossProfit, 'BRL')} ({taxResult.returnPercentage.toLocaleString(numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%)
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#475569] dark:text-slate-400">{t.tools.darfExemptStatus}</span>
                <span
                  className={`font-semibold px-2 py-0.5 rounded text-xs ${
                    taxResult.isTaxExempt
                      ? 'text-[#006B52] bg-[#E3F7F2] dark:text-emerald-400 dark:bg-emerald-500/15'
                      : 'text-[#92400E] bg-[#FEF7E0] dark:text-amber-400 dark:bg-amber-500/15'
                  }`}
                >
                  {taxResult.isTaxExempt ? t.tools.darfExemptBadge : t.tools.darfTaxableBadge}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#475569] dark:text-slate-400">{t.tools.darfApplicableRate}</span>
                <span className="font-mono text-[#0F172A] dark:text-slate-200 font-semibold">{taxResult.taxRatePercent}%</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-[#475569] dark:text-slate-400">{t.tools.darfEstimatedDue}</span>
                <span className="text-base font-bold font-mono-numbers text-[#DC2626] dark:text-rose-400">
                  {formatCurrencyValue(taxResult.estimatedTaxDue, 'BRL')}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-[#0F172A] dark:text-white pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
                <span>{t.tools.darfNetProfit}</span>
                <span className="text-lg font-black font-mono-numbers text-[#006B52] dark:text-emerald-400">
                  {formatCurrencyValue(taxResult.netProfit, 'BRL')}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">{t.tools.darfRulesTitle}</h3>
            <ul className="text-xs text-[#334155] dark:text-slate-300 space-y-2 leading-relaxed">
              <li>• <strong className="text-[#0F172A] dark:text-white">{t.tools.darfRule1Title}</strong> {t.tools.darfRule1Body}</li>
              <li>• <strong className="text-[#0F172A] dark:text-white">{t.tools.darfRule2Title}</strong> {t.tools.darfRule2Body}</li>
              <li>• <strong className="text-[#0F172A] dark:text-white">{t.tools.darfRule3Title}</strong> {t.tools.darfRule3Body}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
