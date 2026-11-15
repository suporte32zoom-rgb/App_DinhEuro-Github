import React from 'react';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Landmark,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { FOCUS_RADAR_DATA } from '../i18n/dossiers';

export const FocusRadarPanel: React.FC = () => {
  const { lang } = useI18n();
  const data = FOCUS_RADAR_DATA[lang];

  return (
    <section
      aria-labelledby="focus-radar-heading"
      className="bg-[#0d1627] rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl space-y-4"
    >
      {/* 2. CABEÇALHO DO COMPONENTE */}
      <header className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Landmark className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <h2
              id="focus-radar-heading"
              className="text-sm sm:text-base font-extrabold text-white tracking-tight"
            >
              {data.heading}
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            {data.subheadingPrefix} <strong className="text-slate-300">{data.refDate}</strong> | {data.primarySourceLabel}{' '}
            <strong className="text-slate-300">{data.primarySourceName}</strong>
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider self-start flex-shrink-0">
          <Activity className="w-3 h-3" />
          <span>{data.badge}</span>
        </span>
      </header>

      {/* 3. BLOCO DE MINI-GRÁFICOS DE TENDÊNCIA (Evolução Temporal 2026) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {data.miniCards.map((card) => (
          <div
            key={card.id}
            className="bg-slate-900/75 rounded-xl border border-slate-800/90 p-3 flex flex-col justify-between space-y-2 hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white truncate">{card.title}</div>
                <div className="text-[10px] text-slate-400 truncate">{card.subtitle}</div>
              </div>
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/70 flex-shrink-0"
              >
                {card.trendLabel}
              </span>
            </div>

            {/* SVG Curve simulating BCB Focus 2026 trajectory */}
            <div className="relative h-12 w-full">
              <svg
                viewBox="0 0 200 48"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
                role="img"
                aria-label={`${card.title}: ${card.value2026}`}
              >
                <defs>
                  <linearGradient id={card.fillGradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.strokeColor} stopOpacity="0.28" />
                    <stop offset="100%" stopColor={card.strokeColor} stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {/* Reference grid lines */}
                <line x1="0" y1="14" x2="200" y2="14" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="0.7" />
                <line x1="0" y1="30" x2="200" y2="30" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="0.7" />
                {/* Area fill */}
                <path d={card.areaD} fill={`url(#${card.fillGradientId})`} />
                {/* Main trend curve */}
                <path
                  d={card.pathD}
                  fill="none"
                  stroke={card.strokeColor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                {/* Terminal highlight dot */}
                <circle
                  cx={card.endPoint.x}
                  cy={card.endPoint.y}
                  r="4"
                  fill={card.strokeColor}
                  opacity="0.25"
                />
                <circle
                  cx={card.endPoint.x}
                  cy={card.endPoint.y}
                  r="2.4"
                  fill={card.strokeColor}
                  stroke="#0d1627"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/70">
              <span className="text-[10px] text-slate-400">{data.median2026Label}</span>
              <span
                className="text-sm font-black font-mono-numbers"
                style={{ color: card.strokeColor }}
              >
                {card.value2026}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. TABELA OFICIAL DE MEDIANAS (2026 A 2029) */}
      <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#070d18]/70">
        <div className="px-3.5 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200 uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{data.tableTitle}</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono-numbers">{data.tableTag}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2 px-3">{data.colIndicator}</th>
                <th className="py-2 px-2.5 text-right text-emerald-400">2026</th>
                <th className="py-2 px-2.5 text-right">2027</th>
                <th className="py-2 px-2.5 text-right">2028</th>
                <th className="py-2 px-3 text-right">2029</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data.rows.map((row) => (
                <tr key={row.indicator} className="hover:bg-slate-800/40 transition">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-1.5">
                      {row.trend === 'up' && <TrendingUp className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                      {row.trend === 'down' && <TrendingDown className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                      {row.trend === 'stable' && <Minus className="w-3 h-3 text-sky-400 flex-shrink-0" />}
                      <span className="font-bold text-white">{row.indicator}</span>
                      <span className="text-[10px] text-slate-400">({row.unit})</span>
                    </div>
                  </td>
                  <td
                    className={`py-2 px-2.5 text-right font-mono-numbers font-extrabold ${
                      row.highlight2026 ? 'text-emerald-400' : 'text-slate-100'
                    }`}
                  >
                    {row.y2026}
                  </td>
                  <td className="py-2 px-2.5 text-right font-mono-numbers text-slate-300">
                    {row.y2027}
                  </td>
                  <td className="py-2 px-2.5 text-right font-mono-numbers text-slate-300">
                    {row.y2028}
                  </td>
                  <td className="py-2 px-3 text-right font-mono-numbers text-slate-300">
                    {row.y2029}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. TEXTO EDITORIAL ANALÍTICO ORIGINAL (INDEXÁVEL PARA SEO E ADSENSE) */}
      <article className="bg-slate-900/60 rounded-xl border border-slate-800/90 p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold text-white">
            {data.editorialTitle}
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {data.editorialP1}
        </p>

        <p className="text-xs text-slate-300 leading-relaxed">
          {data.editorialP2}
        </p>

        <footer className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>{data.footerNote}</span>
        </footer>
      </article>
    </section>
  );
};
