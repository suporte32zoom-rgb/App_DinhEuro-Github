import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Globe2,
  HelpCircle,
  Home,
  Newspaper,
  ShieldCheck,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import type { SupportedLanguage } from '../i18n/translations';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { DAILY_INSIGHTS_UI_COPY } from '../data/dailyInsights';
import {
  getArticleFaqs,
  getPublishedArticleBySlug,
  getRelatedArticles,
} from '../data/newsArticleDirectory';
import { toInsightSchemaInput } from '../components/DailyInsightsSidebar';
import { syncEditorialArticlesSchema } from '../utils/seo';

interface NewsArticleDetailViewProps {
  slug: string;
}

const ARTICLE_PAGE_UI: Record<
  SupportedLanguage,
  {
    homeLabel: string;
    newsSectionLabel: string;
    backToNewsLabel: string;
    faqEyebrow: string;
    faqTitle: string;
    faqSubtitle: string;
    relatedEyebrow: string;
    relatedTitle: string;
    relatedReadMore: string;
    notFoundTitle: string;
    notFoundDesc: string;
    defaultReadTime: string;
  }
> = {
  pt: {
    homeLabel: 'Início',
    newsSectionLabel: 'Notícias e Macros',
    backToNewsLabel: 'Voltar para Notícias e Macros',
    faqEyebrow: 'Esclarecimentos sobre o Tema',
    faqTitle: 'Perguntas Frequentes (FAQ)',
    faqSubtitle:
      'Respostas objetivas sobre os mecanismos econômicos, cambiais e institucionais relacionados a esta reportagem.',
    relatedEyebrow: 'Continue Lendo',
    relatedTitle: 'Assuntos e Notícias Relacionadas',
    relatedReadMore: 'Ler matéria completa',
    notFoundTitle: 'Matéria não encontrada',
    notFoundDesc:
      'A análise solicitada não está disponível neste endereço. Retorne à central de Notícias e Macros para acessar todas as reportagens.',
    defaultReadTime: '5 min',
  },
  en: {
    homeLabel: 'Home',
    newsSectionLabel: 'News & Macro',
    backToNewsLabel: 'Back to News & Macro',
    faqEyebrow: 'Topic Context',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqSubtitle:
      'Clear answers explaining the macroeconomic, currency, and institutional mechanisms covered in this report.',
    relatedEyebrow: 'Continue Reading',
    relatedTitle: 'Related Topics & News',
    relatedReadMore: 'Read full article',
    notFoundTitle: 'Article not found',
    notFoundDesc:
      'The requested report could not be located at this path. Return to News & Macro to browse all published analyses.',
    defaultReadTime: '5 min',
  },
  es: {
    homeLabel: 'Inicio',
    newsSectionLabel: 'Noticias y Macro',
    backToNewsLabel: 'Volver a Noticias y Macro',
    faqEyebrow: 'Contexto del Tema',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    faqSubtitle:
      'Respuestas claras sobre los mecanismos económicos, cambiarios e institucionales vinculados a este informe.',
    relatedEyebrow: 'Seguir Leyendo',
    relatedTitle: 'Temas y Noticias Relacionadas',
    relatedReadMore: 'Leer artículo completo',
    notFoundTitle: 'Artículo no encontrado',
    notFoundDesc:
      'El informe solicitado no está disponible en esta dirección. Regresa a Noticias y Macro para explorar todas las publicaciones.',
    defaultReadTime: '5 min',
  },
};

export const NewsArticleDetailView: React.FC<NewsArticleDetailViewProps> = ({ slug }) => {
  const { setActiveTab, openArticle } = useMarket();
  const { lang } = useI18n();
  const ui = ARTICLE_PAGE_UI[lang];
  const insightsCopy = DAILY_INSIGHTS_UI_COPY[lang];
  const tNews = VIEWS_TRANSLATIONS[lang].news;

  const article = useMemo(() => getPublishedArticleBySlug(slug), [slug]);
  const relatedArticles = useMemo(
    () => (article ? getRelatedArticles(article.id, lang, 3) : []),
    [article, lang]
  );
  const faqs = useMemo(
    () => (article ? getArticleFaqs(article, lang) : []),
    [article, lang]
  );

  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [failedRelatedImgs, setFailedRelatedImgs] = useState<Record<string, boolean>>({});
  const [openFaqIndices, setOpenFaqIndices] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
    3: true,
  });

  useEffect(() => {
    setHeroImgFailed(false);
    setOpenFaqIndices({ 0: true, 1: true, 2: true, 3: true });
  }, [slug]);

  useEffect(() => {
    if (!article) return;
    const focused = toInsightSchemaInput(article, lang, '/noticias/');
    syncEditorialArticlesSchema(lang, [focused], focused);
  }, [article, lang]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndices((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto pb-12 animate-in fade-in duration-200">
        <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <Newspaper className="w-10 h-10 text-[#003399] dark:text-emerald-400 mx-auto" />
          <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
            {ui.notFoundTitle}
          </h1>
          <p className="text-sm text-[#475569] dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            {ui.notFoundDesc}
          </p>
          <button
            type="button"
            data-on-dark="true"
            onClick={() => setActiveTab('noticias')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-xs sm:text-sm font-bold text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{ui.backToNewsLabel}</span>
          </button>
        </div>
      </div>
    );
  }

  const loc = article.translations[lang] || article.translations.pt;

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Clear Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-[#475569] dark:text-slate-400"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('dashboard');
            }}
            className="inline-flex items-center gap-1 hover:text-[#003399] dark:hover:text-emerald-400 transition font-medium"
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span>{ui.homeLabel}</span>
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" aria-hidden="true" />
          <a
            href="/noticias"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('noticias');
            }}
            className="hover:text-[#003399] dark:hover:text-emerald-400 transition font-medium whitespace-nowrap"
          >
            {ui.newsSectionLabel}
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" aria-hidden="true" />
          <span className="text-[#0F172A] dark:text-slate-200 font-semibold truncate max-w-[220px] sm:max-w-xs">
            {loc.tag}
          </span>
        </nav>

        <button
          type="button"
          onClick={() => setActiveTab('noticias')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 hover:border-[#003399] dark:hover:border-emerald-500 text-xs font-bold text-[#003399] dark:text-emerald-400 hover:bg-[#E6EEFF]/60 dark:hover:bg-slate-800 transition cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{ui.backToNewsLabel}</span>
        </button>
      </div>

      {/* Main Dedicated Full-Page Editorial Article */}
      <article
        aria-labelledby="dedicated-article-title"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="p-5 sm:p-8 lg:p-10 space-y-6">
          {/* Editorial Category & Metadata Header */}
          <header className="space-y-4 border-b border-[#E2E8F0] dark:border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
              <span className="uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
                {loc.tag}
              </span>
              <span className="text-[#CBD5E1] dark:text-slate-700" aria-hidden="true">
                ·
              </span>
              <span className="text-[#003399] dark:text-slate-300">
                {insightsCopy.sectionBadge}
              </span>
            </div>

            <h1
              id="dedicated-article-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] dark:text-white leading-tight tracking-tight [text-wrap:balance]"
            >
              {loc.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#475569] dark:text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[#1E293B] dark:text-slate-200 font-medium">
                <Calendar className="w-4 h-4 text-[#009B77] dark:text-emerald-400 shrink-0" />
                <span>{loc.dateAuthor}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#1E293B] dark:text-slate-200 font-medium tabular-nums">
                <Clock className="w-4 h-4 text-[#D99B00] dark:text-amber-400 shrink-0" />
                <span>{loc.readingTime || ui.defaultReadTime}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#475569] dark:text-slate-400">
                <Building2 className="w-4 h-4 text-[#003399] dark:text-cyan-400 shrink-0" />
                <span>
                  <strong className="text-[#0F172A] dark:text-slate-200 font-semibold">
                    {insightsCopy.sourceLabel}:
                  </strong>{' '}
                  {loc.source}
                </span>
              </span>
            </div>
          </header>

          {/* Featured Editorial Image */}
          <figure className="rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 bg-[#002266] dark:bg-[#070d18]">
            {!heroImgFailed ? (
              <div className="relative aspect-[16/9] max-h-[460px] w-full overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={loc.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] max-h-[360px] w-full bg-gradient-to-br from-[#003399] via-[#002266] to-[#006B52] dark:from-[#0c1a30] dark:via-[#0B1320] dark:to-[#07111a] flex flex-col items-center justify-center gap-3 p-6 text-center">
                <Globe2 className="w-14 h-14 text-[#66C7AE]" />
                <span className="text-xs font-semibold text-white/90 max-w-md">
                  {loc.imageAlt}
                </span>
              </div>
            )}
            {loc.imageAlt && (
              <figcaption className="px-4 py-2.5 text-xs text-[#475569] dark:text-slate-400 bg-[#F8FAFC] dark:bg-[#080f1e] border-t border-[#E2E8F0] dark:border-slate-800">
                {loc.imageAlt}
              </figcaption>
            )}
          </figure>

          {/* Reading Column */}
          <div className="max-w-3xl mx-auto space-y-6 pt-2">
            {/* Highlighted Executive Lead / Summary */}
            <div className="rounded-xl bg-[#F4F7F9] dark:bg-slate-900/75 border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6">
              <p className="text-sm sm:text-base font-semibold text-[#002266] dark:text-emerald-100/95 leading-relaxed">
                {loc.summary}
              </p>
            </div>

            {/* Full Article Body */}
            <div className="space-y-5">
              {loc.fullContent.map((block, idx) => {
                if (block.startsWith('## ')) {
                  return (
                    <h2
                      key={idx}
                      className="text-lg sm:text-xl font-extrabold text-[#003399] dark:text-white pt-3 tracking-tight [text-wrap:balance]"
                    >
                      {block.slice(3)}
                    </h2>
                  );
                }

                const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                if (imgMatch) {
                  const [, altText, imgSrc] = imgMatch;
                  return (
                    <figure
                      key={idx}
                      className="my-4 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#0d1627] shadow-sm"
                    >
                      <img
                        src={imgSrc}
                        alt={altText}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain bg-white"
                      />
                      {altText && (
                        <figcaption className="px-4 py-2.5 text-xs text-[#475569] dark:text-slate-400 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#080f1e]">
                          {altText}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (block.startsWith('• ')) {
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 pl-1 sm:pl-2 text-[15px] sm:text-base text-[#1E293B] dark:text-slate-200 leading-[1.75]"
                    >
                      <span
                        className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#009B77] dark:bg-emerald-400 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{block.slice(2)}</span>
                    </div>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="text-[15px] sm:text-base text-[#1E293B] dark:text-slate-200 leading-[1.75]"
                  >
                    {block}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </article>

      {/* Topic-Relevant FAQ Section */}
      <section
        aria-labelledby="article-faq-title"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-5"
      >
        <div className="space-y-1.5 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
            <HelpCircle className="w-4 h-4 shrink-0" />
            <span>{ui.faqEyebrow}</span>
          </div>
          <h2
            id="article-faq-title"
            className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight"
          >
            {ui.faqTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed max-w-3xl">
            {ui.faqSubtitle}
          </p>
        </div>

        <div className="divide-y divide-[#E2E8F0] dark:divide-slate-800">
          {faqs.map((faq, idx) => {
            const isOpen = !!openFaqIndices[idx];
            return (
              <div key={idx} className="py-4 first:pt-1 last:pb-1">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#475569] dark:text-slate-400 shrink-0 mt-1 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Topics & News Cards */}
      {relatedArticles.length > 0 && (
        <section
          aria-labelledby="related-articles-title"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
                {ui.relatedEyebrow}
              </span>
              <h2
                id="related-articles-title"
                className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight"
              >
                {ui.relatedTitle}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('noticias')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#003399] dark:text-emerald-400 hover:underline cursor-pointer self-start sm:self-auto whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{ui.backToNewsLabel}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => {
              const relLoc = rel.translations[lang] || rel.translations.pt;
              const imgFailed = !!failedRelatedImgs[rel.id];
              return (
                <a
                  key={rel.id}
                  href={`/noticias/${rel.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openArticle(rel.id);
                  }}
                  className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/40 dark:hover:border-emerald-500/40 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div className="relative h-40 w-full bg-[#002266] dark:bg-[#070d18] border-b border-[#E2E8F0] dark:border-slate-800 overflow-hidden shrink-0">
                    {!imgFailed ? (
                      <img
                        src={rel.imageUrl}
                        alt={relLoc.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedRelatedImgs((prev) => ({ ...prev, [rel.id]: true }))
                        }
                        className="w-full h-full object-cover object-[50%_20%] group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#003399] via-[#002266] to-[#006B52] flex items-center justify-center">
                        <Globe2 className="w-8 h-8 text-[#66C7AE]" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400 truncate">
                          {relLoc.tag}
                        </span>
                        <span className="text-[#475569] dark:text-slate-400 shrink-0 tabular-nums">
                          {relLoc.readingTime || ui.defaultReadTime}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-300 transition leading-snug line-clamp-2">
                        {relLoc.title}
                      </h3>

                      <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed line-clamp-2">
                        {relLoc.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2E8F0] dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                      <span className="text-[#475569] dark:text-slate-400 truncate">
                        {relLoc.dateAuthor}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-[#003399] dark:text-emerald-400 shrink-0 whitespace-nowrap">
                        <span>{ui.relatedReadMore}</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Complementary Editorial Block Consistent with Notícias & Macros */}
      <section
        aria-labelledby="article-editorial-criteria-title"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-5"
      >
        <div className="space-y-2 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{tNews.editorialCriteria.eyebrow}</span>
          </div>
          <h2
            id="article-editorial-criteria-title"
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
    </div>
  );
};
