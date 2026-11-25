import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Newspaper,
  Clock,
  RefreshCw,
  BookOpen,
  ShieldCheck,
  FileText,
  Calendar,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import type { SupportedLanguage } from '../i18n/translations';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { DAILY_INSIGHTS_UI_COPY, type DailyInsightItem } from '../data/dailyInsights';
import {
  NEWS_EDITORIAL_ARTICLES,
  type NewsEditorialCategory,
} from '../data/newsEditorialArticles';
import { EditorialInsightModal } from '../components/EditorialInsightModal';
import { toInsightSchemaInput } from '../components/DailyInsightsSidebar';
import {
  getInstitutionalDossiersSchemaInputs,
  syncEditorialArticlesSchema,
} from '../utils/seo';
import eurBrlSparklineImg from '../assets/images/eur_brl_sparkline_1795613773523.jpg';
import usdBrlVolatilityImg from '../assets/images/usd_brl_fiscal_volatility_1795615552447.jpg';

const FEATURED_FISCAL_EDITORIAL_NOTE: Record<
  SupportedLanguage,
  {
    badge: string;
    date: string;
    title: string;
    chartAlt: string;
    chartAxisCaption: string;
    paragraphs: [string, string, string];
    author: string;
  }
> = {
  pt: {
    badge: 'Nota Editorial • Política & Fiscal',
    date: '25/11/2026',
    title:
      'Pacote Fiscal, Dólar e Dívida Pública: Por que o Câmbio Oscilou Após a Votação na Câmara',
    chartAlt:
      'Gráfico minimalista ilustrando a volatilidade intradiária do USD/BRL em 24/11 (início da manhã, meio-dia e fechamento)',
    chartAxisCaption: 'Tendência USD/BRL (24/11) • Início da manhã | Meio-dia | Fechamento',
    paragraphs: [
      'O mercado financeiro brasileiro viveu uma sessão de forte volatilidade nesta terça-feira (24) após a aprovação, na Câmara dos Deputados, do texto do pacote de ajuste fiscal por 353 votos a 128. Na abertura dos negócios, o alívio político impulsionou o Ibovespa e levou o dólar comercial a recuar para perto de R$ 5,80 — após ter superado a marca de R$ 6,00 na véspera. Ao longo da tarde, porém, os agentes financeiros reavaliaram o alcance estrutural das medidas: a moeda norte-americana encerrou o pregão em leve queda de 0,3%, cotada a R$ 5,91, enquanto o principal índice da B3 devolveu os ganhos e fechou no campo negativo.',
      'Do ponto de vista quantitativo, o plano aprovado projeta uma economia estimada entre R$ 38 bilhões e R$ 56 bilhões para 2027, buscando viabilizar um superávit primário de R$ 18,7 bilhões após um déficit previsto de R$ 52 bilhões neste ano. No radar fiscal, o mercado também acompanha a articulação de uma Proposta de Emenda à Constituição (PEC) voltada às despesas obrigatórias — que hoje consomem cerca de 92% do Orçamento federal — com potencial de impacto adicional de R$ 20 bilhões em 2027, além das próximas indicações para a diretoria do Banco Central.',
      'Para investidores e operadores de câmbio, o foco central permanece na trajetória da dívida bruta do governo geral, que atingiu 82,9% do PIB (R$ 11,1 trilhões) e tem projeção oficial de alcançar 83,7% ao fim de 2026 e 86,5% em 2027, pressionada pelo custo elevado dos juros (R$ 1,2 trilhão acumulados em 12 meses). Enquanto o alívio imediato reduz o temor de paralisia fiscal no curto prazo, a consolidação de uma queda sustentável no dólar e nas taxas de juros futuras dependerá da continuidade das reformas estruturais e da previsibilidade na condução da política monetária.',
    ],
    author: '25/11/2026 • Redação DinhEuro',
  },
  en: {
    badge: 'Editorial Note • Policy & Fiscal',
    date: '25/11/2026',
    title:
      'Fiscal Package, Dollar, and Public Debt: Why FX Swung After the Lower House Vote',
    chartAlt:
      'Minimalist chart illustrating USD/BRL intraday volatility on Nov 24 (early morning, midday, and close)',
    chartAxisCaption: 'USD/BRL Trend (Nov 24) • Early morning | Midday | Close',
    paragraphs: [
      'Brazilian financial markets experienced heightened volatility on Tuesday (24) following the Chamber of Deputies’ 353–128 approval of the fiscal adjustment package. At the open, political relief lifted the Ibovespa and pushed commercial USD/BRL down toward R$ 5.80 after breaking above R$ 6.00 the prior session. During the afternoon, however, investors reassessed the structural scope of the measures: the dollar finished down just 0.3% at R$ 5.91, while Brazil’s benchmark equity index erased gains to close in negative territory.',
      'Quantitatively, the approved plan projects savings between R$ 38 billion and R$ 56 billion in 2027, aiming to enable a R$ 18.7 billion primary surplus after an expected R$ 52 billion deficit this year. Markets are also tracking a proposed Constitutional Amendment (PEC) addressing mandatory spending—currently around 92% of the federal budget—that could add R$ 20 billion in 2027 savings, alongside upcoming Central Bank board nominations.',
      'For investors and FX desks, the core anchor remains gross general government debt, which reached 82.9% of GDP (R$ 11.1 trillion) and is officially projected to hit 83.7% by end-2026 and 86.5% in 2027 amid R$ 1.2 trillion in trailing 12-month interest costs. While immediate passage eases short-term gridlock fears, sustaining lower dollar levels and forward yields depends on continued structural reforms and monetary predictability.',
    ],
    author: 'Nov 25, 2026 • DinhEuro Editorial',
  },
  es: {
    badge: 'Nota Editorial • Política y Fiscal',
    date: '25/11/2026',
    title:
      'Paquete Fiscal, Dólar y Deuda Pública: Por qué Osciló el Cambio Tras la Votación en la Cámara',
    chartAlt:
      'Gráfico minimalista que ilustra la volatilidad intradiaria del USD/BRL del 24/11 (mañana, mediodía y cierre)',
    chartAxisCaption: 'Tendencia USD/BRL (24/11) • Inicio de la mañana | Mediodía | Cierre',
    paragraphs: [
      'El mercado financiero brasileño vivió una sesión de fuerte volatilidad este martes (24) tras aprobarse en la Cámara de Diputados el paquete de ajuste fiscal por 353 votos frente a 128. En la apertura, el alivio político impulsó al Ibovespa y llevó al dólar comercial cerca de R$ 5,80 luego de haber superado los R$ 6,00 la víspera. Durante la tarde, los operadores reevaluaron el alcance estructural de las medidas: la divisa cerró con leve baja del 0,3% en R$ 5,91 y el índice de B3 terminó en terreno negativo.',
      'En términos cuantitativos, el plan proyecta un ahorro estimado de entre R$ 38.000 millones y R$ 56.000 millones para 2027, apuntando a un superávit primario de R$ 18.700 millones tras el déficit previsto de R$ 52.000 millones este año, junto con la discusión de una PEC sobre gastos obligatorios —cercanos al 92% del presupuesto federal— con potencial de R$ 20.000 millones adicionales en 2027 y futuras designaciones para el Banco Central.',
      'El foco central sigue puesto en la trayectoria de la deuda bruta del gobierno general, que alcanzó el 82,9% del PIB (R$ 11,1 billones) con proyección oficial del 83,7% al cierre de 2026 y del 86,5% en 2027 ante costos financieros de R$ 1,2 billón en 12 meses. Aunque la votación reduce temores inmediatos de parálisis, consolidar un descenso sostenido del dólar y de las tasas futuras dependerá de nuevas reformas y previsibilidad monetaria.',
    ],
    author: '25/11/2026 • Redacción DinhEuro',
  },
};

const FEATURED_FX_EDITORIAL_NOTE: Record<
  SupportedLanguage,
  {
    badge: string;
    date: string;
    title: string;
    chartAlt: string;
    chartCaption: string;
    paragraphs: [string, string];
    author: string;
  }
> = {
  pt: {
    badge: 'Nota Editorial • Câmbio & Macro',
    date: '25/11/2026',
    title:
      'Panorama Cambial EUR/BRL e USD/BRL: Atenção aos Juros Globais e ao Fluxo Comercial Europa–Brasil',
    chartAlt:
      'Gráfico minimalista de tendência de alta da paridade EUR/BRL em 25/11/2026',
    chartCaption: 'Indicador visual de tendência EUR/BRL • 25/11/2026',
    paragraphs: [
      'O mercado de câmbio inicia a reta final de novembro com atenção redobrada ao diferencial de taxas de juros entre o Banco Central Europeu (BCE), o Federal Reserve e o Banco Central do Brasil. No corredor comercial União Europeia – Mercosul, a paridade EUR/BRL segue como termômetro essencial para importadores, exportadores e remessas internacionais, refletindo tanto o comportamento do dólar global quanto o apetite por risco nos mercados emergentes.',
      'No ambiente doméstico, o acompanhamento dos índices de referência como o Ibovespa e das curvas de juros futuros orienta a precificação dos ativos locais. Investidores e agentes de comércio exterior devem monitorar a volatilidade intradiária e utilizar ferramentas de comparação de paridade em tempo real para acompanhar o impacto das oscilações cambiais no poder de compra internacional.',
    ],
    author: '25/11/2026 • Redação DinhEuro',
  },
  en: {
    badge: 'Editorial Note • FX & Macro',
    date: '25/11/2026',
    title:
      'EUR/BRL & USD/BRL FX Outlook: Focus on Global Interest Rates and Europe–Brazil Trade Flows',
    chartAlt:
      'Minimalist upward trend sparkline chart for EUR/BRL parity on November 25, 2026',
    chartCaption: 'EUR/BRL visual trend indicator • Nov 25, 2026',
    paragraphs: [
      'The foreign-exchange market enters the final stretch of November with heightened focus on the interest-rate differential between the European Central Bank (ECB), the Federal Reserve, and the Central Bank of Brazil. Across the European Union–Mercosur trade corridor, EUR/BRL remains an essential barometer for importers, exporters, and international remittances, reflecting both global dollar dynamics and emerging-market risk appetite.',
      'Domestically, tracking benchmark indices such as the Ibovespa alongside forward interest-rate curves guides local asset pricing. Investors and foreign-trade participants should monitor intraday volatility and use real-time parity comparison tools to assess the impact of exchange-rate swings on international purchasing power.',
    ],
    author: 'Nov 25, 2026 • DinhEuro Editorial',
  },
  es: {
    badge: 'Nota Editorial • Divisas y Macro',
    date: '25/11/2026',
    title:
      'Panorama Cambiario EUR/BRL y USD/BRL: Atención a las Tasas Globales y al Flujo Comercial Europa–Brasil',
    chartAlt:
      'Gráfico minimalista de tendencia alcista de la paridad EUR/BRL del 25/11/2026',
    chartCaption: 'Indicador visual de tendencia EUR/BRL • 25/11/2026',
    paragraphs: [
      'El mercado cambiario inicia la recta final de noviembre con especial atención al diferencial de tasas de interés entre el Banco Central Europeo (BCE), la Reserva Federal y el Banco Central de Brasil. En el corredor comercial Unión Europea – Mercosur, la paridad EUR/BRL sigue siendo un termómetro esencial para importadores, exportadores y remesas internacionales, reflejando tanto el comportamiento global del dólar como el apetito por riesgo en mercados emergentes.',
      'En el ámbito doméstico, el seguimiento de índices de referencia como el Ibovespa y las curvas de tasas futuras orienta la valoración de los activos locales. Inversores y operadores de comercio exterior deben monitorear la volatilidad intradiaria y utilizar herramientas de comparación de paridades en tiempo real para evaluar el impacto cambiario en el poder adquisitivo internacional.',
    ],
    author: '25/11/2026 • Redacción DinhEuro',
  },
};

export const NewsView: React.FC = () => {
  const { refreshData } = useMarket();
  const { lang } = useI18n();
  const tNews = VIEWS_TRANSLATIONS[lang].news;
  const insightsCopy = DAILY_INSIGHTS_UI_COPY[lang];
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [newsSearch, setNewsSearch] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEditorial, setSelectedEditorial] = useState<DailyInsightItem | null>(null);

  const categories = [
    { id: 'all', label: tNews.allNews },
    { id: 'Macro & Câmbio', label: tNews.catMacroFx },
    { id: 'Macro & Bancos Centrais', label: tNews.catCentralBanks },
    { id: 'Política & Fiscal', label: tNews.catPolicyFiscal },
    { id: 'Mercados & B3', label: tNews.catMarketsB3 },
    { id: 'Infraestrutura Digital', label: tNews.catDigitalInfra },
  ];

  const filteredEditorialArticles = useMemo(() => {
    const searchLower = newsSearch.trim().toLowerCase();

    return NEWS_EDITORIAL_ARTICLES.filter((item) => {
      const matchesCategory =
        filterCategory === 'all' ||
        item.categories.includes(filterCategory as NewsEditorialCategory);

      if (!matchesCategory) return false;
      if (!searchLower) return true;

      const loc = item.translations[lang];
      const ptLoc = item.translations.pt;
      return (
        loc.title.toLowerCase().includes(searchLower) ||
        loc.summary.toLowerCase().includes(searchLower) ||
        loc.tag.toLowerCase().includes(searchLower) ||
        loc.source.toLowerCase().includes(searchLower) ||
        (loc.keywords || []).some((k) => k.toLowerCase().includes(searchLower)) ||
        ptLoc.title.toLowerCase().includes(searchLower) ||
        ptLoc.summary.toLowerCase().includes(searchLower)
      );
    });
  }, [filterCategory, newsSearch, lang]);

  useEffect(() => {
    const editorialSchemas = filteredEditorialArticles.map((item) =>
      toInsightSchemaInput(item, lang, '/noticias#insight-')
    );
    const dossierSchemas = getInstitutionalDossiersSchemaInputs(lang);
    const focused = selectedEditorial
      ? toInsightSchemaInput(selectedEditorial, lang, '/noticias#insight-')
      : null;
    syncEditorialArticlesSchema(lang, [...editorialSchemas, ...dossierSchemas], focused);
  }, [filteredEditorialArticles, lang, selectedEditorial]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const featuredFiscalNote = FEATURED_FISCAL_EDITORIAL_NOTE[lang];
  const featuredFxNote = FEATURED_FX_EDITORIAL_NOTE[lang];

  const showFeaturedFiscalNote = useMemo(() => {
    const matchesCategory =
      filterCategory === 'all' ||
      filterCategory === 'Macro & Câmbio' ||
      filterCategory === 'Política & Fiscal';
    if (!matchesCategory) return false;
    const searchLower = newsSearch.trim().toLowerCase();
    if (!searchLower) return true;
    const ptNote = FEATURED_FISCAL_EDITORIAL_NOTE.pt;
    return (
      featuredFiscalNote.title.toLowerCase().includes(searchLower) ||
      featuredFiscalNote.paragraphs.some((p) => p.toLowerCase().includes(searchLower)) ||
      featuredFiscalNote.date.includes(searchLower) ||
      ptNote.title.toLowerCase().includes(searchLower) ||
      ptNote.paragraphs.some((p) => p.toLowerCase().includes(searchLower))
    );
  }, [filterCategory, newsSearch, featuredFiscalNote]);

  const showFeaturedFxNote = useMemo(() => {
    const matchesCategory = filterCategory === 'all' || filterCategory === 'Macro & Câmbio';
    if (!matchesCategory) return false;
    const searchLower = newsSearch.trim().toLowerCase();
    if (!searchLower) return true;
    const ptNote = FEATURED_FX_EDITORIAL_NOTE.pt;
    return (
      featuredFxNote.title.toLowerCase().includes(searchLower) ||
      featuredFxNote.paragraphs.some((p) => p.toLowerCase().includes(searchLower)) ||
      featuredFxNote.date.includes(searchLower) ||
      ptNote.title.toLowerCase().includes(searchLower) ||
      ptNote.paragraphs.some((p) => p.toLowerCase().includes(searchLower))
    );
  }, [filterCategory, newsSearch, featuredFxNote]);

  const totalCount =
    filteredEditorialArticles.length +
    (showFeaturedFiscalNote ? 1 : 0) +
    (showFeaturedFxNote ? 1 : 0);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-[#003399] dark:text-emerald-400" />
              <span>{tNews.title}</span>
            </h1>
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#E3F7F2] dark:bg-emerald-500/15 border border-[#009B77]/35 dark:border-emerald-500/30 text-[#006B52] dark:text-emerald-400 font-bold uppercase tracking-wider">
              <FileText className="w-3 h-3" />
              {tNews.liveBadge}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 mt-1.5 max-w-4xl leading-relaxed">
            {tNews.subtitle}
          </p>
        </div>

        {/* Action Bar (Search + Refresh) */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] dark:text-slate-400" />
            <input
              type="text"
              placeholder={tNews.searchPlaceholder}
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700/80 rounded-xl pl-9.5 pr-4 py-2 text-xs text-[#0F172A] dark:text-white placeholder:text-[#94A3B8] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500 transition"
            />
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700/80 hover:border-[#003399]/50 dark:hover:border-emerald-500/50 text-[#003399] dark:text-slate-300 hover:text-[#002266] dark:hover:text-white transition cursor-pointer flex-shrink-0"
            title={tNews.refreshTitle}
          >
            <RefreshCw className={`w-4 h-4 text-[#009B77] dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Category Pills (responsive, touch-friendly) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isSelected = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              data-on-dark={isSelected ? 'true' : undefined}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 select-none ${
                isSelected
                  ? 'bg-[#003399] text-white dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 shadow-md'
                  : 'bg-[#FFFFFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white hover:bg-[#E6EEFF] dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Feed Status Summary */}
      <div className="flex items-center justify-between text-xs text-[#475569] dark:text-slate-400 px-1">
        <span className="flex items-center gap-1.5">
          <span>
            {tNews.showingPrefix} <strong>{totalCount}</strong> {tNews.showingSuffix}
          </span>
        </span>
        {(newsSearch || filterCategory !== 'all') && (
          <button
            onClick={() => {
              setNewsSearch('');
              setFilterCategory('all');
            }}
            className="text-[#003399] dark:text-emerald-400 hover:underline cursor-pointer font-semibold"
          >
            {tNews.clearSearch}
          </button>
        )}
      </div>

      {/* Nota Editorial em Destaque (25/11/2026 - Pacote Fiscal & Volatilidade Cambial) no Topo da Lista */}
      {showFeaturedFiscalNote && (
        <article
          aria-labelledby="featured-fiscal-note-title"
          className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#003399]/25 dark:border-emerald-500/30 p-5 sm:p-6 shadow-md dark:shadow-xl space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#E6EEFF] dark:bg-emerald-500/15 text-[#003399] dark:text-emerald-300 border border-[#003399]/20 dark:border-emerald-500/30">
              {featuredFiscalNote.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
              <span>{featuredFiscalNote.author}</span>
            </span>
          </div>

          <h2
            id="featured-fiscal-note-title"
            className="text-base sm:text-xl font-extrabold text-[#0F172A] dark:text-white leading-snug tracking-tight"
          >
            {featuredFiscalNote.title}
          </h2>

          <figure className="rounded-xl border border-[#E2E8F0] dark:border-slate-700/80 bg-[#FFFFFF] overflow-hidden p-3 sm:p-4">
            <img
              src={usdBrlVolatilityImg}
              alt={featuredFiscalNote.chartAlt}
              referrerPolicy="no-referrer"
              className="w-full max-w-2xl mx-auto aspect-[4/1] object-contain bg-white"
            />
            <figcaption className="mt-2 pt-2 border-t border-[#E2E8F0] text-[11px] font-medium text-[#475569] text-center">
              {featuredFiscalNote.chartAxisCaption}
            </figcaption>
          </figure>

          <div className="space-y-3 text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
            {featuredFiscalNote.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      )}

      {/* Nota Editorial em Destaque (25/11/2026) no Topo da Lista */}
      {showFeaturedFxNote && (
        <article
          aria-labelledby="featured-fx-note-title"
          className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#003399]/25 dark:border-emerald-500/30 p-5 sm:p-6 shadow-md dark:shadow-xl space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-[#E6EEFF] dark:bg-emerald-500/15 text-[#003399] dark:text-emerald-300 border border-[#003399]/20 dark:border-emerald-500/30">
              {featuredFxNote.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
              <span>{featuredFxNote.author}</span>
            </span>
          </div>

          <h2
            id="featured-fx-note-title"
            className="text-base sm:text-xl font-extrabold text-[#0F172A] dark:text-white leading-snug tracking-tight"
          >
            {featuredFxNote.title}
          </h2>

          <figure className="rounded-xl border border-[#E2E8F0] dark:border-slate-700/80 bg-[#FFFFFF] overflow-hidden p-3 sm:p-4">
            <img
              src={eurBrlSparklineImg}
              alt={featuredFxNote.chartAlt}
              referrerPolicy="no-referrer"
              className="w-full max-w-2xl mx-auto aspect-[4/1] object-contain bg-white"
            />
            <figcaption className="mt-2 pt-2 border-t border-[#E2E8F0] text-[11px] font-medium text-[#475569] text-center">
              {featuredFxNote.chartCaption}
            </figcaption>
          </figure>

          <div className="space-y-3 text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
            {featuredFxNote.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      )}

      {/* Original Editorial Analyses Grid */}
      {filteredEditorialArticles.length > 0 || showFeaturedFiscalNote || showFeaturedFxNote ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEditorialArticles.map((editorial) => {
            const loc = editorial.translations[lang];
            return (
              <article
                key={editorial.id}
                onClick={() => setSelectedEditorial(editorial)}
                className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/40 dark:hover:border-emerald-500/40 overflow-hidden shadow-xl transition flex flex-col justify-between group cursor-pointer"
              >
                {/* Capa institucional com object-cover */}
                <div
                  data-overlay-dark="true"
                  className="relative h-44 w-full bg-[#002266] dark:bg-[#070d18] border-b border-[#E2E8F0] dark:border-slate-800 overflow-hidden shrink-0"
                >
                  <img
                    src={editorial.imageUrl}
                    alt={loc.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition duration-300"
                  />
                  <div
                    data-overlay-dark="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#002266]/85 via-transparent to-transparent dark:from-[#0d1627]/80"
                    aria-hidden="true"
                  />
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#002266]/90 dark:bg-[#070d18]/85 text-[#E3F7F2] dark:text-emerald-400 border border-[#009B77]/50 dark:border-emerald-500/30 backdrop-blur-sm">
                    {insightsCopy.sectionBadge}
                  </span>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#E3F7F2] dark:bg-emerald-500/10 text-[#006B52] dark:text-emerald-400 border border-[#009B77]/30 dark:border-emerald-500/25 truncate">
                        {loc.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-[#475569] dark:text-slate-400 flex items-center gap-1 flex-shrink-0">
                        <Clock className="w-3 h-3 text-[#D99B00] dark:text-amber-400" />
                        <span>{loc.readingTime || '6 min'}</span>
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-300 transition leading-snug">
                      {loc.title}
                    </h2>
                    <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed line-clamp-3">
                      {loc.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#1E293B] dark:text-slate-300 font-semibold truncate">
                      <span className="w-2 h-2 rounded-full bg-[#009B77] dark:bg-emerald-400 shrink-0"></span>
                      <span className="truncate" title={loc.dateAuthor}>
                        {loc.dateAuthor}
                      </span>
                    </div>

                    <button
                      type="button"
                      data-on-dark="true"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEditorial(editorial);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-xs font-bold text-white shadow-sm transition active:scale-95 cursor-pointer flex-shrink-0"
                    >
                      <span>{insightsCopy.readMoreLabel}</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-8 text-center shadow-lg space-y-3">
          <p className="text-sm font-bold text-[#0F172A] dark:text-white">{tNews.emptyTitle}</p>
          <p className="text-xs text-[#475569] dark:text-slate-400 max-w-md mx-auto">
            {tNews.emptyDesc}
          </p>
          <button
            type="button"
            data-on-dark="true"
            onClick={() => {
              setNewsSearch('');
              setFilterCategory('all');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs font-bold text-white transition cursor-pointer"
          >
            {tNews.clearSearch}
          </button>
        </div>
      )}

      {/* Critérios Editoriais e Fontes de Referência */}
      <section
        aria-labelledby="news-editorial-criteria-title"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-5"
      >
        <div className="space-y-2 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>{tNews.editorialCriteria.eyebrow}</span>
          </div>
          <h2
            id="news-editorial-criteria-title"
            className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight"
          >
            {tNews.editorialCriteria.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed max-w-4xl">
            {tNews.editorialCriteria.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tNews.editorialCriteria.points.map((point, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#F8FAFC] dark:bg-slate-900/70 border border-[#E2E8F0] dark:border-slate-800 p-4 space-y-1.5"
            >
              <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">
                {point.title}
              </h3>
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                {point.body}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[#E6EEFF]/60 dark:bg-emerald-500/10 border border-[#003399]/20 dark:border-emerald-500/25 px-4 py-3 text-xs font-medium text-[#002266] dark:text-emerald-300">
          {tNews.editorialCriteria.disclaimer}
        </div>
      </section>

      {/* Modal de Leitura do Artigo Editorial */}
      <EditorialInsightModal
        item={selectedEditorial}
        lang={lang}
        onClose={() => setSelectedEditorial(null)}
      />
    </div>
  );
};
