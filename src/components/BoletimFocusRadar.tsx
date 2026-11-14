import React from 'react';
import { Landmark, Calendar, TrendingUp, DollarSign, Percent, FileText } from 'lucide-react';

interface FocusProjectionRow {
  indicator: string;
  v2026: string;
  v2027: string;
  v2028: string;
  v2029: string;
  accent?: 'emerald' | 'amber' | 'sky' | 'rose';
}

const FOCUS_PROJECTIONS: FocusProjectionRow[] = [
  {
    indicator: 'IPCA (Inflação %)',
    v2026: '5,22%',
    v2027: '4,76%',
    v2028: '4,00%',
    v2029: '3,98%',
    accent: 'amber',
  },
  {
    indicator: 'PIB Total (Crescimento %)',
    v2026: '1,76%',
    v2027: '1,20%',
    v2028: '1,80%',
    v2029: '2,00%',
    accent: 'emerald',
  },
  {
    indicator: 'Câmbio (R$/US$)',
    v2026: 'R$ 5,34',
    v2027: 'R$ 5,40',
    v2028: 'R$ 5,45',
    v2029: 'R$ 5,45',
    accent: 'emerald',
  },
  {
    indicator: 'Taxa Selic (% a.a.)',
    v2026: '13,50%',
    v2027: '12,50%',
    v2028: '11,00%',
    v2029: '10,25%',
    accent: 'sky',
  },
  {
    indicator: 'IGP-M (variação %)',
    v2026: '6,05%',
    v2027: '4,21%',
    v2028: '4,00%',
    v2029: '3,90%',
    accent: 'amber',
  },
  {
    indicator: 'Dívida Líquida (% PIB)',
    v2026: '70,20%',
    v2027: '74,20%',
    v2028: '77,20%',
    v2029: '79,69%',
    accent: 'rose',
  },
];

export const BoletimFocusRadar: React.FC = () => {
  return (
    <section
      aria-labelledby="boletim-focus-heading"
      className="bg-white dark:bg-[#0d1627] rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4"
    >
      {/* Cabeçalho do Componente */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 border-b border-slate-200 dark:border-slate-800 pb-3.5">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Landmark className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div>
            <h2
              id="boletim-focus-heading"
              className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug"
            >
              Radar Macroeconômico DinhEuro: Boletim Focus
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <Calendar className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>
                Projeções consolidadas do mercado — Ref.: 06 de novembro de 2026 | Fonte primária: Banco Central do Brasil (BCB)
              </span>
            </p>
          </div>
        </div>

        <span className="self-start inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-100 dark:bg-slate-800/90 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700/80 flex-shrink-0">
          DinhEuro Intelligence
        </span>
      </div>

      {/* Tabela Responsiva de Projeções Oficiais (2026 a 2029) */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800/90 bg-slate-50/60 dark:bg-[#070d18] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/70 text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Indicador (Mediana - Agregado)</th>
                <th className="py-2.5 px-3 text-right font-mono-numbers text-emerald-600 dark:text-emerald-400">
                  2026
                </th>
                <th className="py-2.5 px-3 text-right font-mono-numbers">2027</th>
                <th className="py-2.5 px-3 text-right font-mono-numbers">2028</th>
                <th className="py-2.5 px-3 text-right font-mono-numbers">2029</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800/70">
              {FOCUS_PROJECTIONS.map((row) => {
                const highlightColor =
                  row.accent === 'emerald'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : row.accent === 'amber'
                    ? 'text-amber-600 dark:text-amber-400'
                    : row.accent === 'rose'
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-sky-600 dark:text-sky-400';

                return (
                  <tr
                    key={row.indicator}
                    className="hover:bg-slate-100/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {row.indicator}
                    </td>
                    <td
                      className={`py-2 px-3 text-right font-mono-numbers font-bold whitespace-nowrap ${highlightColor}`}
                    >
                      {row.v2026}
                    </td>
                    <td className="py-2 px-3 text-right font-mono-numbers text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {row.v2027}
                    </td>
                    <td className="py-2 px-3 text-right font-mono-numbers text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {row.v2028}
                    </td>
                    <td className="py-2 px-3 text-right font-mono-numbers text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {row.v2029}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Destaques de Curto Prazo (Fechamento 2026) - 3 mini-cards horizontais */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>Câmbio Fim de Ano</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
          </div>
          <div className="text-xs font-extrabold font-mono-numbers text-slate-900 dark:text-white">
            Dez/2026 em R$ 5,34
          </div>
          <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            (Projeção atualizada)
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>Selic Fim de Ano</span>
            <Percent className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
          </div>
          <div className="text-xs font-extrabold font-mono-numbers text-slate-900 dark:text-white">
            Estável em 13,50% a.a.
          </div>
          <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Taxa básica de juros
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-3 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>IPCA Mensal Projetado</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-[11px] font-bold font-mono-numbers text-amber-600 dark:text-amber-400 leading-snug">
            Out: 0,27% | Nov: 0,35% | Dez: 0,60%
          </div>
          <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Trajetória de curto prazo
          </div>
        </div>
      </div>

      {/* Texto Editorial Analítico Original (Indexável para SEO & AdSense) */}
      <article className="rounded-lg bg-slate-50/70 dark:bg-[#070d18] border border-slate-200 dark:border-slate-800/80 p-3.5 sm:p-4 space-y-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
            Leitura DinhEuro: O cenário macroeconômico e os reflexos nos investimentos
          </h3>
        </div>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          O Boletim Focus divulgado pelo Banco Central do Brasil em novembro de 2026 consolida uma postura de cautela na política monetária. Com o IPCA projetado em 5,22% para o encerramento de 2026 e 4,76% para 2027, o mercado financeiro mantém a expectativa de uma taxa Selic elevada em 13,50% ao ano, buscando ancorar as expectativas inflacionárias frente às pressões de custos e ao comportamento da taxa de câmbio.
        </p>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          Para os investidores e operadores que acompanham os fluxos de câmbio e ativos no DinhEuro, a mediana das projeções aponta o dólar comercial cotado a R$ 5,34 para o fechamento deste ano. Paralelamente, o cenário fiscal — refletido na dívida líquida projetada em 70,20% do PIB — continua no radar do mercado, exigindo monitoramento rigoroso dos desdobramentos econômicos e das contas públicas.
        </p>

        <footer className="pt-2 border-t border-slate-200 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 italic">
          Dados estatísticos oficiais extraídos do Relatório de Mercado Focus do Banco Central do Brasil e analisados pela inteligência editorial do DinhEuro.
        </footer>
      </article>
    </section>
  );
};
