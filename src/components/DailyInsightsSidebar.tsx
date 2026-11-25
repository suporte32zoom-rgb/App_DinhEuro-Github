import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper,
  ChevronRight,
  Globe2,
  BookOpen,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import type { SupportedLanguage } from '../i18n/translations';
import {
  DAILY_INSIGHTS_ITEMS,
  DAILY_INSIGHTS_UI_COPY,
  MAX_DAILY_INSIGHTS,
  DailyInsightItem,
} from '../data/dailyInsights';
import {
  CANONICAL_ORIGIN,
  getInstitutionalDossiersSchemaInputs,
  syncEditorialArticlesSchema,
  type EditorialArticleSchemaInput,
} from '../utils/seo';
import { EditorialInsightModal } from './EditorialInsightModal';
import usdBrlVolatilityImg from '../assets/images/usd_brl_fiscal_volatility_1795615552447.jpg';

const FEATURED_FISCAL_INSIGHT: DailyInsightItem = {
  id: 'pacote-fiscal-dolar-divida-publica-2026-11-25',
  isoDate: '2026-11-25',
  imageUrl: usdBrlVolatilityImg,
  translations: {
    pt: {
      tag: 'Câmbio & Fiscal',
      title:
        'Pacote Fiscal, Dólar e Dívida Pública: Por que o Câmbio Oscilou Após a Votação na Câmara',
      summary:
        'Após aprovação do pacote fiscal na Câmara por 353 votos a 128, o dólar comercial caiu perto de R$ 5,80 na abertura e encerrou a R$ 5,91 (-0,3%), com o mercado avaliando o impacto sobre a dívida bruta (82,9% do PIB).',
      dateAuthor: '25/11/2026 • Redação DinhEuro',
      source: 'Fontes de referência: Câmara dos Deputados, Tesouro Nacional e B3',
      readingTime: '4 min',
      keywords: [
        'pacote fiscal dolar 5 91',
        'divida publica pib 82 9',
        'cambio volatilidade camara dos deputados',
        'ibovespa ajuste fiscal 2027',
      ],
      imageAlt:
        'Gráfico de volatilidade intradiária do USD/BRL em 24/11 (início da manhã, meio-dia e fechamento)',
      fullContent: [
        `![Volatilidade intradiária USD/BRL em 24/11 — início da manhã | meio-dia | fechamento](${usdBrlVolatilityImg})`,
        'O mercado financeiro brasileiro viveu uma sessão de forte volatilidade nesta terça-feira (24) após a aprovação, na Câmara dos Deputados, do texto do pacote de ajuste fiscal por 353 votos a 128. Na abertura dos negócios, o alívio político impulsionou o Ibovespa e levou o dólar comercial a recuar para perto de R$ 5,80 — após ter superado a marca de R$ 6,00 na véspera. Ao longo da tarde, porém, os agentes financeiros reavaliaram o alcance estrutural das medidas: a moeda norte-americana encerrou o pregão em leve queda de 0,3%, cotada a R$ 5,91, enquanto o principal índice da B3 devolveu os ganhos e fechou no campo negativo.',
        'Do ponto de vista quantitativo, o plano aprovado projeta uma economia estimada entre R$ 38 bilhões e R$ 56 bilhões para 2027, buscando viabilizar um superávit primário de R$ 18,7 bilhões após um déficit previsto de R$ 52 bilhões neste ano. No radar fiscal, o mercado também acompanha a articulação de uma Proposta de Emenda à Constituição (PEC) voltada às despesas obrigatórias — que hoje consomem cerca de 92% do Orçamento federal — com potencial de impacto adicional de R$ 20 bilhões em 2027, além das próximas indicações para a diretoria do Banco Central.',
        'Para investidores e operadores de câmbio, o foco central permanece na trajetória da dívida bruta do governo geral, que atingiu 82,9% do PIB (R$ 11,1 trilhões) e tem projeção oficial de alcançar 83,7% ao fim de 2026 e 86,5% em 2027, pressionada pelo custo elevado dos juros (R$ 1,2 trilhão acumulados em 12 meses). Enquanto o alívio imediato reduz o temor de paralisia fiscal no curto prazo, a consolidação de uma queda sustentável no dólar e nas taxas de juros futuras dependerá da continuidade das reformas estruturais e da previsibilidade na condução da política monetária.',
      ],
    },
    en: {
      tag: 'FX & Fiscal',
      title:
        'Fiscal Package, Dollar, and Public Debt: Why FX Swung After the Lower House Vote',
      summary:
        'Following a 353–128 Lower House approval of Brazil’s fiscal adjustment bill, spot USD/BRL dipped near R$ 5.80 early before closing at R$ 5.91 (-0.3%) as desks weighed gross public debt at 82.9% of GDP.',
      dateAuthor: 'Nov 25, 2026 • DinhEuro Editorial',
      source: 'Reference sources: Chamber of Deputies, National Treasury & B3',
      readingTime: '4 min read',
      keywords: [
        'brazil fiscal package usd brl',
        'public debt gdp 82.9 percent',
        'usd brl volatility chamber vote',
        'ibovespa fiscal outlook 2027',
      ],
      imageAlt:
        'USD/BRL intraday volatility sparkline chart for Nov 24 (early morning, midday, and close)',
      fullContent: [
        `![USD/BRL intraday volatility on Nov 24 — early morning | midday | close](${usdBrlVolatilityImg})`,
        'Brazilian financial markets experienced heightened volatility on Tuesday (24) following the Chamber of Deputies’ 353–128 approval of the fiscal adjustment package. At the open, political relief lifted the Ibovespa and pushed commercial USD/BRL down toward R$ 5.80 after breaking above R$ 6.00 the prior session. During the afternoon, however, investors reassessed the structural scope of the measures: the dollar finished down just 0.3% at R$ 5.91, while Brazil’s benchmark equity index erased gains to close in negative territory.',
        'Quantitatively, the approved plan projects savings between R$ 38 billion and R$ 56 billion in 2027, aiming to enable a R$ 18.7 billion primary surplus after an expected R$ 52 billion deficit this year. Markets are also tracking a proposed Constitutional Amendment (PEC) addressing mandatory spending—currently around 92% of the federal budget—that could add R$ 20 billion in 2027 savings, alongside upcoming Central Bank board nominations.',
        'For investors and FX desks, the core anchor remains gross general government debt, which reached 82.9% of GDP (R$ 11.1 trillion) and is officially projected to hit 83.7% by end-2026 and 86.5% in 2027 amid R$ 1.2 trillion in trailing 12-month interest costs. While immediate passage eases short-term gridlock fears, sustaining lower dollar levels and forward yields depends on continued structural reforms and monetary predictability.',
      ],
    },
    es: {
      tag: 'Divisas y Fiscal',
      title:
        'Paquete Fiscal, Dólar y Deuda Pública: Por qué Osciló el Cambio Tras la Votación en la Cámara',
      summary:
        'Tras aprobarse el ajuste fiscal en Diputados por 353 votos contra 128, el dólar comercial cayó cerca de R$ 5,80 en la apertura y cerró en R$ 5,91 (-0,3%), mientras el mercado evalúa la deuda bruta (82,9% del PIB).',
      dateAuthor: '25/11/2026 • Redacción DinhEuro',
      source: 'Fuentes de referencia: Cámara de Diputados, Tesoro Nacional y B3',
      readingTime: '4 min',
      keywords: [
        'paquete fiscal dolar brl',
        'deuda publica pib brasil 82 9',
        'volatilidad cambiaria camara diputados',
      ],
      imageAlt:
        'Gráfico de volatilidad intradiaria USD/BRL del 24/11 (inicio de la mañana, mediodía y cierre)',
      fullContent: [
        `![Volatilidad intradiaria USD/BRL del 24/11 — mañana | mediodía | cierre](${usdBrlVolatilityImg})`,
        'El mercado financiero brasileño vivió una sesión de fuerte volatilidad este martes (24) tras aprobarse en la Cámara de Diputados el paquete de ajuste fiscal por 353 votos frente a 128. En la apertura, el alivio político impulsó al Ibovespa y llevó al dólar comercial cerca de R$ 5,80 luego de haber superado los R$ 6,00 la víspera. Durante la tarde, los operadores reevaluaron el alcance estructural de las medidas: la divisa cerró con leve baja del 0,3% en R$ 5,91 y el índice de B3 terminó en terreno negativo.',
        'En términos cuantitativos, el plan proyecta un ahorro estimado de entre R$ 38.000 millones y R$ 56.000 millones para 2027, apuntando a un superávit primario de R$ 18.700 millones tras el déficit previsto de R$ 52.000 millones este año, junto con la discusión de una PEC sobre gastos obligatorios —cercanos al 92% del presupuesto federal— con potencial de R$ 20.000 millones adicionales en 2027 y futuras designaciones para el Banco Central.',
        'El foco central sigue puesto en la trayectoria de la deuda bruta del gobierno general, que alcanzó el 82,9% del PIB (R$ 11,1 billones) con proyección oficial del 83,7% al cierre de 2026 y del 86,5% en 2027 ante costos financieros de R$ 1,2 billón en 12 meses. Aunque la votación reduce temores inmediatos de parálisis, consolidar un descenso sostenido del dólar y de las tasas futuras dependerá de nuevas reformas y previsibilidad monetaria.',
      ],
    },
  },
};

const SIDEBAR_AXIS_LABELS: Record<SupportedLanguage, string> = {
  pt: 'Início da manhã  •  Meio-dia  •  Fechamento',
  en: 'Early morning  •  Midday  •  Close',
  es: 'Inicio de la mañana  •  Mediodía  •  Cierre',
};

function extractIsoDate(dateAuthor: string, fallbackIso?: string): string {
  if (fallbackIso) return fallbackIso;
  const brMatch = dateAuthor.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (brMatch) {
    return `${brMatch[3]}-${brMatch[2]}-${brMatch[1]}`;
  }
  const ptWrittenMatch = dateAuthor.match(/(\d{1,2})\s+de\s+novembro\s+de\s+(\d{4})/i);
  if (ptWrittenMatch) {
    return `${ptWrittenMatch[2]}-11-${ptWrittenMatch[1].padStart(2, '0')}`;
  }
  const esWrittenMatch = dateAuthor.match(/(\d{1,2})\s+de\s+noviembre\s+de\s+(\d{4})/i);
  if (esWrittenMatch) {
    return `${esWrittenMatch[2]}-11-${esWrittenMatch[1].padStart(2, '0')}`;
  }
  const enMatch = dateAuthor.match(/Nov\s+(\d{1,2}),\s+(\d{4})/i);
  if (enMatch) {
    return `${enMatch[2]}-11-${enMatch[1].padStart(2, '0')}`;
  }
  return '2026-11-17';
}

export function toInsightSchemaInput(
  item: DailyInsightItem,
  lang: 'pt' | 'en' | 'es',
  basePath: string = '/#insight-'
): EditorialArticleSchemaInput {
  const loc = item.translations[lang];
  return {
    id: item.id,
    schemaType: 'NewsArticle',
    headline: loc.title,
    description: loc.summary,
    articleSection: loc.tag,
    datePublished: extractIsoDate(loc.dateAuthor, item.isoDate),
    authorName: loc.source || 'Redação DinhEuro',
    imageUrl: item.imageUrl,
    url: `${CANONICAL_ORIGIN}${basePath}${item.id}`,
    articleBody: loc.fullContent
      .filter((line) => !/^!\[[^\]]*\]\([^)]+\)$/.test(line))
      .map((line) => (line.startsWith('## ') ? line.slice(3) : line))
      .join('\n\n'),
    keywords:
      loc.keywords && loc.keywords.length > 0
        ? loc.keywords
        : [loc.tag, 'DinhEuro', 'Insights do Dia'],
  };
}

interface DailyInsightsSidebarProps {
  variant?: 'desktop' | 'mobile';
}

export const DailyInsightsSidebar: React.FC<DailyInsightsSidebarProps> = ({
  variant = 'desktop',
}) => {
  const { lang } = useI18n();
  const copy = DAILY_INSIGHTS_UI_COPY[lang];
  const items = useMemo(() => DAILY_INSIGHTS_ITEMS.slice(0, MAX_DAILY_INSIGHTS), []);

  const [selectedInsight, setSelectedInsight] = useState<DailyInsightItem | null>(null);
  const [failedThumbIds, setFailedThumbIds] = useState<Record<string, boolean>>({});
  const isMobileVariant = variant === 'mobile';
  const headingId = isMobileVariant ? 'daily-insights-heading-mobile' : 'daily-insights-heading';

  const featuredFiscalLoc = FEATURED_FISCAL_INSIGHT.translations[lang];

  useEffect(() => {
    if (isMobileVariant && !selectedInsight) return;
    const insightSchemas = [FEATURED_FISCAL_INSIGHT, ...items].map((item) =>
      toInsightSchemaInput(item, lang)
    );
    const dossierSchemas = getInstitutionalDossiersSchemaInputs(lang);
    const focused = selectedInsight ? toInsightSchemaInput(selectedInsight, lang) : null;
    syncEditorialArticlesSchema(lang, [...insightSchemas, ...dossierSchemas], focused);
  }, [lang, selectedInsight, items, isMobileVariant]);

  if (items.length === 0) return null;

  return (
    <>
      <section
        aria-labelledby={headingId}
        className={`${
          isMobileVariant ? 'block lg:hidden' : 'hidden lg:block lg:mt-6'
        } bg-[#FFFFFF] dark:bg-[#0d1627] rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4`}
      >
        {/* Header alinhado ao padrão visual da sidebar */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[#003399] dark:text-emerald-400" />
            <h2
              id={headingId}
              className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider"
            >
              {copy.sectionTitle}
            </h2>
          </div>
          <span className="text-[10px] font-semibold text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-[#009B77]/25 dark:border-emerald-500/20">
            {copy.sectionBadge}
          </span>
        </div>

        {/* Lista de cards */}
        <div className="space-y-3">
          {/* Nota Editorial Destaque (25/11/2026) no Topo */}
          <button
            type="button"
            aria-label={`${copy.sectionTitle}: ${featuredFiscalLoc.title}`}
            onClick={() => setSelectedInsight(FEATURED_FISCAL_INSIGHT)}
            className="w-full text-left p-3 rounded-xl bg-[#FFFFFF] dark:bg-slate-900/80 hover:bg-[#E6EEFF]/45 dark:hover:bg-slate-800/90 border border-[#003399]/30 dark:border-emerald-500/35 transition cursor-pointer group space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-300 bg-[#E6EEFF] dark:bg-emerald-500/15 px-2 py-0.5 rounded border border-[#003399]/20 dark:border-emerald-500/30">
                {featuredFiscalLoc.tag}
              </span>
              <span className="text-[10px] font-semibold text-[#475569] dark:text-slate-400">
                {featuredFiscalLoc.dateAuthor}
              </span>
            </div>

            <h3 className="text-xs font-extrabold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-300 leading-snug">
              {featuredFiscalLoc.title}
            </h3>

            <div className="rounded-lg border border-[#E2E8F0] dark:border-slate-700/80 bg-[#FFFFFF] p-2">
              <img
                src={usdBrlVolatilityImg}
                alt={featuredFiscalLoc.imageAlt}
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/1] object-contain bg-white"
              />
              <div className="text-[9px] font-medium text-[#475569] text-center pt-1 border-t border-[#E2E8F0]/80">
                {SIDEBAR_AXIS_LABELS[lang]}
              </div>
            </div>

            <p className="text-[11px] text-[#334155] dark:text-slate-300 leading-relaxed line-clamp-3">
              {featuredFiscalLoc.summary}
            </p>

            <div className="flex items-center justify-between gap-2 pt-0.5 text-[10px] font-semibold text-[#003399] dark:text-emerald-400">
              <span>{copy.readMoreLabel}</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {items.map((item) => {
            const loc = item.translations[lang];
            const thumbFailed = !!failedThumbIds[item.id];
            return (
              <button
                key={item.id}
                type="button"
                aria-label={`${copy.sectionTitle}: ${loc.title}`}
                onClick={() => setSelectedInsight(item)}
                className="w-full text-left flex items-start gap-3 p-3 rounded-xl bg-[#F4F7F9] dark:bg-slate-900/60 hover:bg-[#E6EEFF]/60 dark:hover:bg-slate-800/90 border border-[#E2E8F0] dark:border-slate-800/70 hover:border-[#003399]/40 dark:hover:border-emerald-500/40 transition cursor-pointer group"
              >
                {/* Miniatura discreta */}
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-[#E2E8F0] dark:bg-[#070d18] border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-center">
                  {!thumbFailed ? (
                    <img
                      src={item.imageUrl}
                      alt={loc.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedThumbIds((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <Globe2 className="w-6 h-6 text-[#003399] dark:text-emerald-400/80" />
                  )}
                </div>

                {/* Tag, Título conciso e Data */}
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-[#009B77]/25 dark:border-emerald-500/20">
                    {loc.tag}
                  </span>
                  <h3 className="text-xs font-bold text-[#0F172A] dark:text-slate-100 group-hover:text-[#003399] dark:group-hover:text-white leading-snug line-clamp-2">
                    {loc.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 pt-0.5 text-[10px] text-[#475569] dark:text-slate-400">
                    <span className="truncate">{loc.dateAuthor}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#003399] dark:text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-[#475569] dark:text-slate-500 pt-1 border-t border-[#E2E8F0] dark:border-slate-800/70 flex items-center gap-1.5">
          <BookOpen className="w-3 h-3 text-[#009B77] dark:text-emerald-400/80 shrink-0" />
          <span>{copy.editorialNote}</span>
        </p>
      </section>

      {/* Modal Interativo de Leitura Completa */}
      <EditorialInsightModal
        item={selectedInsight}
        lang={lang}
        onClose={() => setSelectedInsight(null)}
      />
    </>
  );
};
