import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Newspaper,
  Clock,
  RefreshCw,
  BookOpen,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
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

  const totalCount = filteredEditorialArticles.length;

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

      {/* Original Editorial Analyses Grid */}
      {filteredEditorialArticles.length > 0 ? (
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
