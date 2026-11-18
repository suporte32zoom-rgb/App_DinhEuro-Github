import React, { useState, useMemo, useEffect } from 'react';
import {
  ExternalLink,
  Search,
  Newspaper,
  Clock,
  RefreshCw,
  Radio,
  BookOpen,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { NewsItem, INITIAL_NEWS } from '../services/marketData';
import { useI18n } from '../i18n/I18nContext';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { localizeNewsItem } from '../i18n/marketDataTranslations';
import {
  DAILY_INSIGHTS_ITEMS,
  DAILY_INSIGHTS_UI_COPY,
  type DailyInsightItem,
} from '../data/dailyInsights';
import { EditorialInsightModal } from '../components/EditorialInsightModal';
import { toInsightSchemaInput } from '../components/DailyInsightsSidebar';
import {
  CANONICAL_ORIGIN,
  getInstitutionalDossiersSchemaInputs,
  syncEditorialArticlesSchema,
  type EditorialArticleSchemaInput,
} from '../utils/seo';

const FEATURED_NEWS_EDITORIAL_IDS = new Set([
  'aladi-cosmeticos-exportacao-brasil-2026',
  'apec-2026-trump-xi-putin-shenzhen',
]);

export const NewsView: React.FC = () => {
  const { news, refreshData } = useMarket();
  const { lang } = useI18n();
  const tNews = VIEWS_TRANSLATIONS[lang].news;
  const insightsCopy = DAILY_INSIGHTS_UI_COPY[lang];
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [newsSearch, setNewsSearch] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEditorial, setSelectedEditorial] = useState<DailyInsightItem | null>(null);

  // Combine live news with comprehensive default catalogue if needed, avoiding duplicates
  const consolidatedNews = useMemo(() => {
    const rawList: NewsItem[] = Array.isArray(news) && news.length > 0 ? news : INITIAL_NEWS;
    
    // Supplement with any missing items from INITIAL_NEWS so the user always has a huge breadth of political and market stories
    const combined = [...rawList];
    for (const init of INITIAL_NEWS) {
      if (!combined.some((item) => item.title.toLowerCase() === init.title.toLowerCase())) {
        combined.push(init);
      }
    }

    // Sort: strictly most recent first
    return combined.sort((a, b) => {
      const timeA = a.timestamp || 0;
      const timeB = b.timestamp || 0;
      return timeB - timeA;
    });
  }, [news]);

  const categories = [
    { id: 'all', label: tNews.allNews },
    { id: 'Política & Fiscal', label: tNews.catPolicyFiscal },
    { id: 'Mercados & B3', label: tNews.catMarketsB3 },
    { id: 'Macro & Câmbio', label: tNews.catMacroFx },
    { id: 'Macro & Bancos Centrais', label: tNews.catCentralBanks },
    { id: 'Criptoativos', label: tNews.catCrypto },
    { id: 'Empresas & Wall St', label: tNews.catWallSt },
  ];

  const filteredEditorialArticles = useMemo(() => {
    const featured = DAILY_INSIGHTS_ITEMS.filter((item) =>
      FEATURED_NEWS_EDITORIAL_IDS.has(item.id)
    );
    const searchLower = newsSearch.trim().toLowerCase();

    return featured.filter((item) => {
      const matchesCategory = filterCategory === 'all';
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

  const filteredNews = useMemo(() => {
    return consolidatedNews
      .filter((item) => {
        const matchesCategory =
          filterCategory === 'all' ||
          item.category.toLowerCase().includes(filterCategory.toLowerCase()) ||
          (filterCategory === 'Macro & Câmbio' && (item.category === 'Câmbio' || item.category === 'Macro')) ||
          (filterCategory === 'Mercados & B3' && (item.category === 'Ações' || item.category === 'Geral'));

        const localized = localizeNewsItem(item, lang);
        const searchLower = newsSearch.toLowerCase();
        const matchesSearch =
          newsSearch.trim() === '' ||
          item.title.toLowerCase().includes(searchLower) ||
          item.summary.toLowerCase().includes(searchLower) ||
          item.source.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          localized.title.toLowerCase().includes(searchLower) ||
          localized.summary.toLowerCase().includes(searchLower) ||
          localized.category.toLowerCase().includes(searchLower);

        return matchesCategory && matchesSearch;
      })
      .map((item) => localizeNewsItem(item, lang));
  }, [consolidatedNews, filterCategory, newsSearch, lang]);

  useEffect(() => {
    const editorialSchemas = filteredEditorialArticles.map((item) =>
      toInsightSchemaInput(item, lang, '/noticias#insight-')
    );
    const remainingSlots = Math.max(0, 12 - editorialSchemas.length);
    const newsSchemas: EditorialArticleSchemaInput[] = filteredNews
      .slice(0, remainingSlots)
      .map((item) => ({
        id: item.id,
        schemaType: 'NewsArticle',
        headline: item.title,
        description: item.summary,
        articleSection: item.category,
        datePublished: item.timestamp
          ? new Date(item.timestamp).toISOString().split('T')[0]
          : '2026-11-17',
        authorName: item.source || 'Redação DinhEuro',
        url: item.url || `${CANONICAL_ORIGIN}/noticias`,
        imageUrl: item.imageUrl || `${CANONICAL_ORIGIN}/logo.png`,
        keywords: [item.category, 'DinhEuro', 'Macroeconomia'],
      }));
    const dossierSchemas = getInstitutionalDossiersSchemaInputs(lang);
    const focused = selectedEditorial
      ? toInsightSchemaInput(selectedEditorial, lang, '/noticias#insight-')
      : null;
    syncEditorialArticlesSchema(lang, [...editorialSchemas, ...newsSchemas, ...dossierSchemas], focused);
  }, [filteredEditorialArticles, filteredNews, lang, selectedEditorial]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const totalCount = filteredEditorialArticles.length + filteredNews.length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-emerald-400" />
              <span>{tNews.title}</span>
            </h1>
            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider">
              <Radio className="w-3 h-3 animate-pulse" />
              {tNews.liveBadge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            {tNews.subtitle}
          </p>
        </div>

        {/* Action Bar (Search + Refresh) */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={tNews.searchPlaceholder}
              value={newsSearch}
              onChange={(e) => setNewsSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9.5 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 text-slate-300 hover:text-white transition cursor-pointer flex-shrink-0"
            title={tNews.refreshTitle}
          >
            <RefreshCw className={`w-4 h-4 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 select-none ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Feed Status Summary */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span className="flex items-center gap-1.5">
          <span>{tNews.showingPrefix} <strong>{totalCount}</strong> {tNews.showingSuffix}</span>
        </span>
        {newsSearch && (
          <button
            onClick={() => setNewsSearch('')}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            {tNews.clearSearch}
          </button>
        )}
      </div>

      {/* News Grid (Most Recent First) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEditorialArticles.map((editorial) => {
          const loc = editorial.translations[lang];
          return (
            <article
              key={editorial.id}
              onClick={() => setSelectedEditorial(editorial)}
              className="rounded-2xl bg-[#0d1627] border border-slate-800 hover:border-emerald-500/40 overflow-hidden shadow-xl transition flex flex-col justify-between group cursor-pointer"
            >
              {/* Capa institucional com object-cover */}
              <div className="relative h-44 w-full bg-[#070d18] border-b border-slate-800 overflow-hidden shrink-0">
                <img
                  src={editorial.imageUrl}
                  alt={loc.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition duration-300"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d1627]/80 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#070d18]/85 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
                  {insightsCopy.sectionBadge}
                </span>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 truncate">
                      {loc.tag}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{loc.readingTime || '4 min'}</span>
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                    {loc.title}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {loc.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    <span className="truncate" title={loc.dateAuthor}>{loc.dateAuthor}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEditorial(editorial);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-sm shadow-emerald-950 transition active:scale-95 cursor-pointer flex-shrink-0"
                  >
                    <span>{insightsCopy.readMoreLabel}</span>
                    <BookOpen className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {filteredNews.map((item, index) => {
          // Format safe URL
          const safeUrl =
            item.url.startsWith('http://') || item.url.startsWith('https://')
              ? item.url
              : `https://${item.url}`;

          return (
            <article
              key={item.id || `news_idx_${index}`}
              className="rounded-2xl bg-[#0d1627] border border-slate-800 hover:border-slate-700/80 overflow-hidden shadow-xl transition flex flex-col justify-between group"
            >
              {/* Text-Only News Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{item.datetime || tNews.nowFallback}</span>
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                    {item.summary}
                  </p>
                </div>

                {/* Footer with Agency Name & External Direct Link */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold truncate">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="truncate" title={item.source}>{item.source}</span>
                  </div>

                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-xs font-bold text-white shadow-sm shadow-emerald-950 transition active:scale-95 cursor-pointer flex-shrink-0"
                    title={`${tNews.readFullTitlePrefix} ${item.source}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>{tNews.readFull}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal de Leitura do Artigo Editorial */}
      <EditorialInsightModal
        item={selectedEditorial}
        lang={lang}
        onClose={() => setSelectedEditorial(null)}
      />
    </div>
  );
};
