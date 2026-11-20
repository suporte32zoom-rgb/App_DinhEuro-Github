import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  TrendingUp,
  Coins,
  Sparkles,
  Maximize2,
  X,
  Layers,
  BarChart3,
  LineChart as LineChartIcon,
  PiggyBank,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Calendar,
  Zap,
} from 'lucide-react';
import { formatCurrencyValue, YearBreakdown } from '../utils/finance';
import { useI18n } from '../i18n/I18nContext';
import { useMarket } from '../context/MarketContext';

export interface CompoundChartProps {
  initialPrincipal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  breakdown: YearBreakdown[];
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
  onUpdateParams?: (params: {
    initialPrincipal?: number;
    monthlyContribution?: number;
    annualRate?: number;
    years?: number;
  }) => void;
}

// Fixed income benchmark calculation helper
function simulateFixedIncome(
  initial: number,
  monthly: number,
  ratePercent: number,
  years: number
): { final: number; breakdown: { year: number; balance: number }[] } {
  const monthlyRate = Math.pow(1 + ratePercent / 100, 1 / 12) - 1;
  const totalMonths = Math.max(1, Math.round(years * 12));
  let balance = initial;
  const breakdown: { year: number; balance: number }[] = [];

  for (let m = 1; m <= totalMonths; m++) {
    balance = balance * (1 + monthlyRate) + monthly;
    if (m % 12 === 0 || m === totalMonths) {
      breakdown.push({
        year: Math.ceil(m / 12),
        balance: Math.round(balance),
      });
    }
  }
  return { final: Math.round(balance), breakdown };
}

export const CompoundInterestChart: React.FC<CompoundChartProps> = ({
  initialPrincipal,
  monthlyContribution,
  annualRate,
  years,
  breakdown,
  finalBalance,
  totalInvested,
  totalInterest,
  onUpdateParams,
}) => {
  const { t } = useI18n();
  const { theme } = useMarket();
  const isLight = theme === 'light';
  const gridStroke = isLight ? '#E2E8F0' : '#1e293b';
  const axisStroke = isLight ? '#475569' : '#64748b';
  const investedColor = isLight ? '#003399' : '#3B82F6';
  const interestColor = isLight ? '#009B77' : '#10B981';
  const balanceColor = isLight ? '#D99B00' : '#F59E0B';
  const cdiColor = isLight ? '#003399' : '#06B6D4';
  const poupColor = isLight ? '#DC2626' : '#EF4444';
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area');
  const [viewMode, setViewMode] = useState<'evolution' | 'benchmark' | 'contribution'>('evolution');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Formatted data for Main Evolution Chart (Aportes vs Juros)
  const evolutionData = [
    {
      year: 0,
      label: t.compoundChart.startLabel,
      totalInvested: Math.round(initialPrincipal),
      interestEarned: 0,
      totalBalance: Math.round(initialPrincipal),
      interestPercent: 0,
    },
    ...breakdown.map((row) => ({
      year: row.year,
      label: `${t.compoundChart.yearPrefix} ${row.year}`,
      totalInvested: Math.round(row.totalInvested),
      interestEarned: Math.max(0, Math.round(row.interestEarned)),
      totalBalance: Math.round(row.totalBalance),
      interestPercent:
        row.totalBalance > 0
          ? Number(((row.interestEarned / row.totalBalance) * 100).toFixed(1))
          : 0,
    })),
  ];

  // Benchmark data comparing Fixed Income asset classes
  const poupancaSim = simulateFixedIncome(initialPrincipal, monthlyContribution, 6.17, years);
  const cdi100Sim = simulateFixedIncome(initialPrincipal, monthlyContribution, 11.5, years);
  const ipcaSim = simulateFixedIncome(initialPrincipal, monthlyContribution, 11.2, years);

  const benchmarkData = [
    {
      year: 0,
      label: t.compoundChart.startLabel,
      suaTaxa: Math.round(initialPrincipal),
      cdi100: Math.round(initialPrincipal),
      tesouroIpca: Math.round(initialPrincipal),
      poupanca: Math.round(initialPrincipal),
    },
    ...breakdown.map((row, idx) => ({
      year: row.year,
      label: `${t.compoundChart.yearPrefix} ${row.year}`,
      suaTaxa: Math.round(row.totalBalance),
      cdi100: cdi100Sim.breakdown[idx]?.balance || Math.round(row.totalBalance),
      tesouroIpca: ipcaSim.breakdown[idx]?.balance || Math.round(row.totalBalance),
      poupanca: poupancaSim.breakdown[idx]?.balance || Math.round(row.totalInvested),
    })),
  ];

  // Contribution sensitivity comparison (0, 1x, 1.5x, 2x do aporte mensal)
  const doubleContribSim = simulateFixedIncome(initialPrincipal, monthlyContribution * 2, annualRate, years);
  const zeroContribSim = simulateFixedIncome(initialPrincipal, 0, annualRate, years);

  const contributionData = [
    {
      year: 0,
      label: t.compoundChart.startLabel,
      atual: Math.round(initialPrincipal),
      dobro: Math.round(initialPrincipal),
      semAporte: Math.round(initialPrincipal),
    },
    ...breakdown.map((row, idx) => ({
      year: row.year,
      label: `${t.compoundChart.yearPrefix} ${row.year}`,
      atual: Math.round(row.totalBalance),
      dobro: doubleContribSim.breakdown[idx]?.balance || Math.round(row.totalBalance),
      semAporte: zeroContribSim.breakdown[idx]?.balance || Math.round(row.totalBalance),
    })),
  ];

  // Key metrics
  const multiplier = totalInvested > 0 ? (finalBalance / totalInvested).toFixed(2) : '1.00';
  const passiveMonthlyIncome = Math.round(finalBalance * 0.008); // 0.8% a.m. conservative safe withdrawal
  const interestPercentage = finalBalance > 0 ? ((totalInterest / finalBalance) * 100).toFixed(1) : '0';

  // Find tipping point year (when annual interest generated exceeds total invested that year)
  const annualContribution = monthlyContribution * 12;
  const tippingPoint = breakdown.find((b, idx) => {
    if (idx === 0) return b.interestEarned >= annualContribution;
    const prevInterest = breakdown[idx - 1].interestEarned;
    const yearInterest = b.interestEarned - prevInterest;
    return yearInterest >= annualContribution;
  });

  // Custom Theme Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#E2E8F0] dark:border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[210px]">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-1.5">
            <span className="font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#003399] dark:text-emerald-400" />
              {label}
            </span>
            <span className="text-[10px] text-[#475569] dark:text-slate-400 font-mono-numbers">
              {years} {t.compoundChart.yearsHorizonSuffix}
            </span>
          </div>

          <div className="space-y-1.5 font-mono-numbers">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-[#475569] dark:text-slate-300 text-[11px]">{entry.name}:</span>
                </div>
                <span className="font-bold text-[#0F172A] dark:text-white text-[11px]">
                  {formatCurrencyValue(entry.value, 'BRL', 0)}
                </span>
              </div>
            ))}
          </div>

          {viewMode === 'evolution' && (
            <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80 text-[10px] text-[#475569] dark:text-slate-400 flex items-center justify-between">
              <span>{t.compoundChart.interestImpactLabel}</span>
              <span className="font-bold text-[#006B52] dark:text-emerald-400">
                {payload[1] && payload[0] && (payload[1].value + payload[0].value) > 0
                  ? `${(((payload[1]?.value || 0) / ((payload[0]?.value || 1) + (payload[1]?.value || 0))) * 100).toFixed(0)}% ${t.compoundChart.ofBalanceSuffix}`
                  : '0%'}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderChart = (height: number = 280) => {
    if (viewMode === 'benchmark') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={benchmarkData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
            <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 11 }} />
            <YAxis
              stroke={axisStroke}
              tick={{ fontSize: 10 }}
              tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            <Line
              type="monotone"
              dataKey="suaTaxa"
              name={`${t.compoundChart.yourSimulationPrefix} (${annualRate}% ${t.compoundChart.perYearUnit})`}
              stroke={interestColor}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: interestColor }}
            />
            <Line
              type="monotone"
              dataKey="cdi100"
              name={t.compoundChart.cdi100Label}
              stroke={cdiColor}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="tesouroIpca"
              name={t.compoundChart.tesouroIpcaLabel}
              stroke={balanceColor}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="poupanca"
              name={t.compoundChart.poupancaLabel}
              stroke={poupColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (viewMode === 'contribution') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={contributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDobro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={interestColor} stopOpacity={0.35} />
                <stop offset="95%" stopColor={interestColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAtual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={investedColor} stopOpacity={0.35} />
                <stop offset="95%" stopColor={investedColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSemAporte" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#64748B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
            <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 11 }} />
            <YAxis
              stroke={axisStroke}
              tick={{ fontSize: 10 }}
              tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            <Area
              type="monotone"
              dataKey="dobro"
              name={`${t.compoundChart.doubleContribPrefix} (${formatCurrencyValue(monthlyContribution * 2, 'BRL', 0)}${t.compoundChart.perMonthSuffix})`}
              stroke={interestColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorDobro)"
            />
            <Area
              type="monotone"
              dataKey="atual"
              name={`${t.compoundChart.currentContribPrefix} (${formatCurrencyValue(monthlyContribution, 'BRL', 0)}${t.compoundChart.perMonthSuffix})`}
              stroke={investedColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAtual)"
            />
            <Area
              type="monotone"
              dataKey="semAporte"
              name={t.compoundChart.noContribLabel}
              stroke="#64748B"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#colorSemAporte)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    // Default: Evolution of Capital (Invested vs Interest)
    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={evolutionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
            <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 11 }} />
            <YAxis
              stroke={axisStroke}
              tick={{ fontSize: 10 }}
              tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            <Bar dataKey="totalInvested" name={t.compoundChart.totalInvestedBar} stackId="a" fill={investedColor} radius={[0, 0, 0, 0]} />
            <Bar dataKey="interestEarned" name={t.compoundChart.accumInterestBar} stackId="a" fill={interestColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={evolutionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
            <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 11 }} />
            <YAxis
              stroke={axisStroke}
              tick={{ fontSize: 10 }}
              tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            <Line
              type="monotone"
              dataKey="totalBalance"
              name={t.compoundChart.totalEquityLine}
              stroke={balanceColor}
              strokeWidth={3}
              dot={{ r: 3, fill: balanceColor }}
            />
            <Line
              type="monotone"
              dataKey="interestEarned"
              name={t.compoundChart.compoundInterestLine}
              stroke={interestColor}
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="totalInvested"
              name={t.compoundChart.totalInvestedBar}
              stroke={investedColor}
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Default: Area Chart (Stacked Area)
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={evolutionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={investedColor} stopOpacity={0.5} />
              <stop offset="95%" stopColor={investedColor} stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={interestColor} stopOpacity={0.7} />
              <stop offset="95%" stopColor={interestColor} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.8} />
          <XAxis dataKey="label" stroke={axisStroke} tick={{ fontSize: 11 }} />
          <YAxis
            stroke={axisStroke}
            tick={{ fontSize: 10 }}
            tickFormatter={(val) => `R$${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Area
            type="monotone"
            dataKey="totalInvested"
            name={t.compoundChart.totalInvestedArea}
            stackId="1"
            stroke={investedColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorInvested)"
          />
          <Area
            type="monotone"
            dataKey="interestEarned"
            name={t.compoundChart.compoundInterestArea}
            stackId="1"
            stroke={interestColor}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorInterest)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-4">
      {/* Chart Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F4F7F9] dark:bg-[#0a1221] p-3 rounded-2xl border border-[#E2E8F0] dark:border-slate-800">
        {/* View Mode Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setViewMode('evolution')}
            data-on-dark={viewMode === 'evolution' ? 'true' : undefined}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              viewMode === 'evolution'
                ? 'bg-[#003399] text-white dark:bg-emerald-500/20 dark:text-emerald-400 border border-[#002266] dark:border-emerald-500/30 shadow-sm'
                : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white hover:bg-[#E6EEFF] dark:hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.compoundChart.viewEvolution}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('benchmark')}
            data-on-dark={viewMode === 'benchmark' ? 'true' : undefined}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              viewMode === 'benchmark'
                ? 'bg-[#003399] text-white dark:bg-blue-500/20 dark:text-blue-400 border border-[#002266] dark:border-blue-500/30 shadow-sm'
                : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white hover:bg-[#E6EEFF] dark:hover:bg-slate-800'
            }`}
          >
            <PiggyBank className="w-3.5 h-3.5" />
            <span>{t.compoundChart.viewBenchmark}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('contribution')}
            data-on-dark={viewMode === 'contribution' ? 'true' : undefined}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
              viewMode === 'contribution'
                ? 'bg-[#003399] text-white dark:bg-purple-500/20 dark:text-purple-400 border border-[#002266] dark:border-purple-500/30 shadow-sm'
                : 'text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white hover:bg-[#E6EEFF] dark:hover:bg-slate-800'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>{t.compoundChart.viewContribution}</span>
          </button>
        </div>

        {/* Chart Type Switches & Modal Trigger */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {viewMode === 'evolution' && (
            <div className="flex items-center bg-[#FFFFFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-1 text-[#475569] dark:text-slate-400">
              <button
                type="button"
                onClick={() => setChartType('area')}
                title={t.compoundChart.typeAreaTitle}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  chartType === 'area' ? 'bg-[#E3F7F2] text-[#006B52] dark:bg-slate-800 dark:text-emerald-400' : 'hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setChartType('bar')}
                title={t.compoundChart.typeBarTitle}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  chartType === 'bar' ? 'bg-[#E3F7F2] text-[#006B52] dark:bg-slate-800 dark:text-emerald-400' : 'hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setChartType('line')}
                title={t.compoundChart.typeLineTitle}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  chartType === 'line' ? 'bg-[#E3F7F2] text-[#006B52] dark:bg-slate-800 dark:text-emerald-400' : 'hover:text-[#003399] dark:hover:text-white'
                }`}
              >
                <LineChartIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] dark:bg-slate-900 hover:bg-[#E6EEFF] dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/35 dark:hover:border-slate-700 text-xs text-[#003399] dark:text-slate-300 hover:text-[#002266] dark:hover:text-white transition cursor-pointer"
            title={t.compoundChart.expandModalTitle}
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
            <span className="hidden sm:inline">{t.compoundChart.expandModalLabel}</span>
          </button>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="bg-[#FFFFFF] dark:bg-[#070e1b] rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#009B77] dark:bg-emerald-400 animate-pulse" />
            <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
              {viewMode === 'evolution' && t.compoundChart.headingEvolution}
              {viewMode === 'benchmark' && t.compoundChart.headingBenchmark}
              {viewMode === 'contribution' && t.compoundChart.headingContribution}
            </h4>
          </div>
          <span className="text-[11px] text-[#475569] dark:text-slate-400 font-mono-numbers">
            {years} {t.compoundChart.yearsUnit} • {annualRate}% {t.compoundChart.perYearUnit}
          </span>
        </div>

        {renderChart(300)}
      </div>

      {/* Key Analytical Badges / Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#FFFFFF] dark:bg-gradient-to-br dark:from-[#0c1a2e] dark:to-[#070e1b] rounded-xl p-3.5 border border-[#E2E8F0] dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D99B00] dark:text-amber-400" />
              {t.compoundChart.multiplierTitle}
            </span>
            <span className="text-xs font-black text-[#D99B00] dark:text-amber-400 font-mono-numbers">
              {multiplier}x
            </span>
          </div>
          <p className="text-[11px] text-[#1E293B] dark:text-slate-300 leading-snug">
            {t.compoundChart.multiplierBodyPrefix}{' '}
            <strong className="text-[#0F172A] dark:text-white font-mono-numbers">R$ {multiplier}</strong>
            {t.compoundChart.multiplierBodySuffix ? ` ${t.compoundChart.multiplierBodySuffix}` : '.'}
          </p>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-gradient-to-br dark:from-[#0c1a2e] dark:to-[#070e1b] rounded-xl p-3.5 border border-[#E2E8F0] dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
              {t.compoundChart.passiveIncomeTitle}
            </span>
            <span className="text-xs font-black text-[#006B52] dark:text-emerald-400 font-mono-numbers">
              {formatCurrencyValue(passiveMonthlyIncome, 'BRL', 0)}{t.compoundChart.perMonthSuffix}
            </span>
          </div>
          <p className="text-[11px] text-[#1E293B] dark:text-slate-300 leading-snug">
            {t.compoundChart.passiveIncomeBody}
          </p>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-gradient-to-br dark:from-[#0c1a2e] dark:to-[#070e1b] rounded-xl p-3.5 border border-[#E2E8F0] dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#003399] dark:text-cyan-400" />
              {t.compoundChart.tippingPointTitle}
            </span>
            <span className="text-xs font-black text-[#003399] dark:text-cyan-400">
              {tippingPoint ? `${t.compoundChart.yearPrefix} ${tippingPoint.year}` : `${t.compoundChart.yearPrefix} ${Math.min(years, 6)}`}
            </span>
          </div>
          <p className="text-[11px] text-[#1E293B] dark:text-slate-300 leading-snug">
            {tippingPoint
              ? `${t.compoundChart.tippingPointBodyFoundPrefix} ${tippingPoint.year}${t.compoundChart.tippingPointBodyFoundSuffix}`
              : t.compoundChart.tippingPointBodyDefault}
          </p>
        </div>
      </div>

      {/* Interactive Modal Dialog */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-[#FFFFFF] dark:bg-[#0c1527] border border-[#E2E8F0] dark:border-slate-700/80 rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between bg-[#F4F7F9] dark:bg-[#080f1e]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E3F7F2] dark:bg-emerald-500/15 border border-[#009B77]/30 flex items-center justify-center text-[#006B52] dark:text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                    <span>{t.compoundChart.modalTitle}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E6EEFF] dark:bg-emerald-500/20 text-[#003399] dark:text-emerald-400 text-[10px] font-bold">
                      DinhEuro Hub
                    </span>
                  </h3>
                  <p className="text-xs text-[#475569] dark:text-slate-400">
                    {t.compoundChart.modalSubtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-xl bg-[#FFFFFF] dark:bg-slate-800/80 hover:bg-[#E6EEFF] dark:hover:bg-slate-700 text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white border border-[#E2E8F0] dark:border-transparent flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* Controls inside modal */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F4F7F9] dark:bg-[#070e1b] p-4 rounded-xl border border-[#E2E8F0] dark:border-slate-800/80">
                <div>
                  <label className="text-[11px] text-[#475569] dark:text-slate-400 block mb-1">{t.compoundChart.modalInitial}</label>
                  <div className="text-sm font-bold font-mono-numbers text-[#0F172A] dark:text-white">
                    {formatCurrencyValue(initialPrincipal, 'BRL')}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#475569] dark:text-slate-400 block mb-1">{t.compoundChart.modalMonthly}</label>
                  <div className="text-sm font-bold font-mono-numbers text-[#003399] dark:text-blue-400">
                    {formatCurrencyValue(monthlyContribution, 'BRL')}{t.compoundChart.perMonthSuffix}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#475569] dark:text-slate-400 block mb-1">{t.compoundChart.modalRate}</label>
                  <div className="text-sm font-bold font-mono-numbers text-[#006B52] dark:text-emerald-400">
                    {annualRate}% {t.compoundChart.perYearUnit}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-[#475569] dark:text-slate-400 block mb-1">{t.compoundChart.modalHorizon}</label>
                  <div className="text-sm font-bold font-mono-numbers text-[#D99B00] dark:text-amber-400">
                    {years} {t.compoundChart.yearsUnit} ({years * 12} {t.tools.monthsUnit})
                  </div>
                </div>
              </div>

              {/* View Selector inside modal */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('evolution')}
                    data-on-dark={viewMode === 'evolution' ? 'true' : undefined}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      viewMode === 'evolution'
                        ? 'bg-[#003399] text-white dark:bg-emerald-500 dark:text-slate-950 font-bold'
                        : 'bg-[#F4F7F9] dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#E6EEFF] dark:hover:bg-slate-700'
                    }`}
                  >
                    {t.compoundChart.viewEvolution}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('benchmark')}
                    data-on-dark={viewMode === 'benchmark' ? 'true' : undefined}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      viewMode === 'benchmark'
                        ? 'bg-[#003399] text-white dark:bg-blue-500 font-bold'
                        : 'bg-[#F4F7F9] dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#E6EEFF] dark:hover:bg-slate-700'
                    }`}
                  >
                    {t.compoundChart.viewBenchmark}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('contribution')}
                    data-on-dark={viewMode === 'contribution' ? 'true' : undefined}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                      viewMode === 'contribution'
                        ? 'bg-[#009B77] text-white dark:bg-purple-500 font-bold'
                        : 'bg-[#F4F7F9] dark:bg-slate-800 text-[#475569] dark:text-slate-300 hover:bg-[#E6EEFF] dark:hover:bg-slate-700'
                    }`}
                  >
                    {t.compoundChart.viewContribution}
                  </button>
                </div>

                <div className="text-xs text-[#475569] dark:text-slate-400 font-mono-numbers">
                  {t.compoundChart.modalFinalBalance} <strong className="text-[#006B52] dark:text-amber-400 text-sm">{formatCurrencyValue(finalBalance, 'BRL')}</strong>
                </div>
              </div>

              {/* Expanded Chart */}
              <div className="bg-[#FFFFFF] dark:bg-[#070e1b] rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] dark:border-slate-800">
                {renderChart(380)}
              </div>

              {/* Detailed Comparative Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
                    {t.compoundChart.modalTableTitle}
                  </h4>
                  <span className="text-[11px] text-[#475569] dark:text-slate-400 font-mono-numbers">
                    {t.compoundChart.modalTableInterestSharePrefix} {interestPercentage}{t.compoundChart.modalTableInterestShareSuffix}
                  </span>
                </div>

                <div className="max-h-56 overflow-y-auto no-scrollbar rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-[#FFFFFF] dark:bg-[#070e1b]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F4F7F9] dark:bg-slate-900/90 text-[#475569] dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 sticky top-0 backdrop-blur-sm">
                      <tr>
                        <th className="py-2.5 px-3">{t.compoundChart.colYear}</th>
                        <th className="py-2.5 px-3 text-right">{t.compoundChart.colTotalInvested}</th>
                        <th className="py-2.5 px-3 text-right">{t.compoundChart.colInterest}</th>
                        <th className="py-2.5 px-3 text-right">{t.compoundChart.colFinalBalance}</th>
                        <th className="py-2.5 px-3 text-right">{t.compoundChart.colPctInterest}</th>
                        <th className="py-2.5 px-3 text-right">{t.compoundChart.colEstPassive}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60 font-mono-numbers text-[11px]">
                      {breakdown.map((row) => {
                        const pct = row.totalBalance > 0 ? ((row.interestEarned / row.totalBalance) * 100).toFixed(0) : '0';
                        const estIncome = Math.round(row.totalBalance * 0.008);
                        const isTipping = tippingPoint && tippingPoint.year === row.year;

                        return (
                          <tr
                            key={row.year}
                            className={`hover:bg-[#E6EEFF]/50 dark:hover:bg-slate-800/50 transition ${
                              isTipping ? 'bg-[#E3F7F2]/70 dark:bg-emerald-950/20 border-l-2 border-[#009B77] dark:border-emerald-400' : ''
                            }`}
                          >
                            <td className="py-2 px-3 font-semibold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                              <span>{t.compoundChart.yearPrefix} {row.year}</span>
                              {isTipping && (
                                <span className="px-1.5 py-0.5 rounded bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-400 text-[9px] font-bold">
                                  {t.compoundChart.tippingBadge}
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-right text-[#1E293B] dark:text-slate-300">
                              {formatCurrencyValue(row.totalInvested, 'BRL')}
                            </td>
                            <td className="py-2 px-3 text-right text-[#006B52] dark:text-emerald-400 font-semibold">
                              +{formatCurrencyValue(row.interestEarned, 'BRL')}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-[#003399] dark:text-amber-300">
                              {formatCurrencyValue(row.totalBalance, 'BRL')}
                            </td>
                            <td className="py-2 px-3 text-right text-[#475569] dark:text-slate-400">
                              {pct}%
                            </td>
                            <td className="py-2 px-3 text-right text-[#006B52] dark:text-cyan-400 font-medium">
                              {formatCurrencyValue(estIncome, 'BRL', 0)}{t.compoundChart.perMonthSuffix}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-[#080f1e] flex items-center justify-between text-xs">
              <span className="text-[#475569] dark:text-slate-400 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#003399] dark:text-emerald-400" />
                {t.compoundChart.modalFooterNote}
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                data-on-dark="true"
                className="px-4 py-1.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-medium transition cursor-pointer"
              >
                {t.compoundChart.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
