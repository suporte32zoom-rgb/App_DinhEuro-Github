import React, { useState, useEffect, useMemo } from 'react';
import {
  Newspaper,
  ChevronRight,
  Globe2,
  BookOpen,
} from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
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

export const DailyInsightsSidebar: React.FC = () => {
  const { lang } = useI18n();
  const copy = DAILY_INSIGHTS_UI_COPY[lang];
  const items = useMemo(() => DAILY_INSIGHTS_ITEMS.slice(0, MAX_DAILY_INSIGHTS), []);

  const [selectedInsight, setSelectedInsight] = useState<DailyInsightItem | null>(null);
  const [failedThumbIds, setFailedThumbIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const insightSchemas = items.map((item) => toInsightSchemaInput(item, lang));
    const dossierSchemas = getInstitutionalDossiersSchemaInputs(lang);
    const focused = selectedInsight ? toInsightSchemaInput(selectedInsight, lang) : null;
    syncEditorialArticlesSchema(lang, [...insightSchemas, ...dossierSchemas], focused);
  }, [lang, selectedInsight, items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Exibição estritamente restrita a telas desktop (>= 1024px) abaixo da Matriz Cambial Global */}
      <section
        aria-labelledby="daily-insights-heading"
        className="hidden lg:block lg:mt-6 bg-[#FFFFFF] dark:bg-[#0d1627] rounded-xl border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4"
      >
        {/* Header alinhado ao padrão visual da sidebar */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-[#003399] dark:text-emerald-400" />
            <h2
              id="daily-insights-heading"
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
