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

interface FocusRow {
  indicator: string;
  unit: string;
  y2026: string;
  y2027: string;
  y2028: string;
  y2029: string;
  trend: 'up' | 'down' | 'stable';
  highlight2026?: boolean;
}

interface MiniChartCard {
  id: string;
  title: string;
  subtitle: string;
  value2026: string;
  trendLabel: string;
  trendType: 'stable' | 'down-up' | 'up';
  strokeColor: string;
  fillGradientId: string;
  points: { label: string; val: number; svgY: number }[];
  pathD: string;
  areaD: string;
  endPoint: { x: number; y: number };
}

const FOCUS_MEDIAN_TABLE: FocusRow[] = [
  {
    indicator: 'IPCA',
    unit: '%',
    y2026: '5,22%',
    y2027: '4,76%',
    y2028: '4,00%',
    y2029: '3,98%',
    trend: 'stable',
    highlight2026: true,
  },
  {
    indicator: 'PIB Total',
    unit: '%',
    y2026: '1,76%',
    y2027: '1,20%',
    y2028: '1,80%',
    y2029: '2,00%',
    trend: 'up',
  },
  {
    indicator: 'Câmbio',
    unit: 'R$/US$',
    y2026: 'R$ 5,34',
    y2027: 'R$ 5,40',
    y2028: 'R$ 5,45',
    y2029: 'R$ 5,45',
    trend: 'up',
    highlight2026: true,
  },
  {
    indicator: 'Taxa Selic',
    unit: '% a.a.',
    y2026: '13,50%',
    y2027: '12,50%',
    y2028: '11,00%',
    y2029: '10,25%',
    trend: 'stable',
    highlight2026: true,
  },
  {
    indicator: 'IGP-M',
    unit: '%',
    y2026: '6,05%',
    y2027: '4,21%',
    y2028: '4,00%',
    y2029: '3,90%',
    trend: 'down',
  },
  {
    indicator: 'Dívida Líquida',
    unit: '% PIB',
    y2026: '70,20%',
    y2027: '74,20%',
    y2028: '77,20%',
    y2029: '79,69%',
    trend: 'up',
  },
];

const MINI_TREND_CARDS: MiniChartCard[] = [
  {
    id: 'ipca-2026',
    title: 'IPCA 2026',
    subtitle: 'Curva de inflação anual',
    value2026: '5,22%',
    trendLabel: 'Estabilidade',
    trendType: 'stable',
    strokeColor: '#fbbf24',
    fillGradientId: 'focusIpcaGrad',
    points: [
      { label: 'Out/26 (4 sem)', val: 5.18, svgY: 28 },
      { label: 'Out/26 (3 sem)', val: 5.20, svgY: 25 },
      { label: 'Out/26 (2 sem)', val: 5.22, svgY: 21 },
      { label: 'Out/26 (1 sem)', val: 5.22, svgY: 21 },
      { label: '06/11/2026', val: 5.22, svgY: 21 },
    ],
    pathD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21',
    areaD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21 L 194 46 L 4 46 Z',
    endPoint: { x: 194, y: 21 },
  },
  {
    id: 'cambio-2026',
    title: 'Câmbio 2026 (R$/US$)',
    subtitle: 'Curva de desaquecimento/alta',
    value2026: 'R$ 5,34',
    trendLabel: 'Fechamento 2026',
    trendType: 'down-up',
    strokeColor: '#34d399',
    fillGradientId: 'focusCambioGrad',
    points: [
      { label: 'Out/26 (4 sem)', val: 5.42, svgY: 16 },
      { label: 'Out/26 (3 sem)', val: 5.38, svgY: 22 },
      { label: 'Out/26 (2 sem)', val: 5.35, svgY: 26 },
      { label: 'Out/26 (1 sem)', val: 5.33, svgY: 29 },
      { label: '06/11/2026', val: 5.34, svgY: 27 },
    ],
    pathD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26',
    areaD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26 L 194 46 L 4 46 Z',
    endPoint: { x: 194, y: 26 },
  },
  {
    id: 'selic-2026',
    title: 'Taxa Selic 2026',
    subtitle: 'Curva de juros (% a.a.)',
    value2026: '13,50%',
    trendLabel: 'Estabilização',
    trendType: 'up',
    strokeColor: '#38bdf8',
    fillGradientId: 'focusSelicGrad',
    points: [
      { label: 'Out/26 (4 sem)', val: 13.0, svgY: 32 },
      { label: 'Out/26 (3 sem)', val: 13.25, svgY: 25 },
      { label: 'Out/26 (2 sem)', val: 13.5, svgY: 18 },
      { label: 'Out/26 (1 sem)', val: 13.5, svgY: 18 },
      { label: '06/11/2026', val: 13.5, svgY: 18 },
    ],
    pathD: 'M 4 33 C 38 30, 68 23, 102 18 C 138 18, 166 18, 194 18',
    areaD: 'M 4 33 C 38 30, 68 23, 102 18 C 138 18, 166 18, 194 18 L 194 46 L 4 46 Z',
    endPoint: { x: 194, y: 18 },
  },
];

export const FocusRadarPanel: React.FC = () => {
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
              Radar Macroeconômico DinhEuro: Boletim Focus
            </h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">
            Projeções e Gráficos de Tendência — Ref.: <strong className="text-slate-300">06 de novembro de 2026</strong> | Fonte primária: <strong className="text-slate-300">Banco Central do Brasil (BCB)</strong>
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider self-start flex-shrink-0">
          <Activity className="w-3 h-3" />
          <span>DinhEuro Intelligence</span>
        </span>
      </header>

      {/* 3. BLOCO DE MINI-GRÁFICOS DE TENDÊNCIA (Evolução Temporal 2026) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {MINI_TREND_CARDS.map((card) => (
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
              <span className="text-[10px] text-slate-400">Mediana 2026</span>
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
            <span>Tabela Oficial de Medianas (2026 a 2029)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono-numbers">BCB Focus • 06/11/2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2 px-3">Indicador</th>
                <th className="py-2 px-2.5 text-right text-emerald-400">2026</th>
                <th className="py-2 px-2.5 text-right">2027</th>
                <th className="py-2 px-2.5 text-right">2028</th>
                <th className="py-2 px-3 text-right">2029</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {FOCUS_MEDIAN_TABLE.map((row) => (
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
            Leitura DinhEuro: O cenário macroeconômico e os reflexos nos investimentos
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          O Boletim Focus divulgado pelo Banco Central do Brasil em novembro de 2026 consolida uma postura de cautela na política monetária. Com o IPCA projetado em 5,22% para o encerramento de 2026 e 4,76% para 2027, o mercado financeiro mantém a expectativa de uma taxa Selic elevada em 13,50% ao ano, buscando ancorar as expectativas inflacionárias frente às pressões de custos e ao comportamento da taxa de câmbio.
        </p>

        <p className="text-xs text-slate-300 leading-relaxed">
          Para os investidores e operadores que acompanham os fluxos de câmbio e ativos no DinhEuro, a mediana das projeções aponta o dólar comercial cotado a R$ 5,34 para o fechamento deste ano. Paralelamente, o cenário fiscal — refletido na dívida líquida projetada em 70,20% do PIB — continua no radar do mercado, exigindo monitoramento rigoroso dos desdobramentos econômicos e das contas públicas.
        </p>

        <footer className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>
            Dados estatísticos oficiais extraídos do Relatório de Mercado Focus do Banco Central do Brasil e analisados pela inteligência editorial do DinhEuro.
          </span>
        </footer>
      </article>
    </section>
  );
};
