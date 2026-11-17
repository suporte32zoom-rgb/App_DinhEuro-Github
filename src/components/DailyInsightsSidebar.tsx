import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  ChevronRight,
  X,
  Calendar,
  Building2,
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

export const DailyInsightsSidebar: React.FC = () => {
  const { lang } = useI18n();
  const copy = DAILY_INSIGHTS_UI_COPY[lang];
  const items = DAILY_INSIGHTS_ITEMS.slice(0, MAX_DAILY_INSIGHTS);

  const [selectedInsight, setSelectedInsight] = useState<DailyInsightItem | null>(null);
  const [failedThumbIds, setFailedThumbIds] = useState<Record<string, boolean>>({});
  const [modalImgFailed, setModalImgFailed] = useState(false);

  useEffect(() => {
    if (!selectedInsight) return;
    setModalImgFailed(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedInsight(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedInsight]);

  if (items.length === 0) return null;

  const activeContent = selectedInsight ? selectedInsight.translations[lang] : null;

  return (
    <>
      {/* Exibição estritamente restrita a telas desktop (>= 1024px) abaixo da Matriz Cambial Global */}
      <section
        aria-labelledby="daily-insights-heading"
        className="hidden lg:block lg:mt-6 bg-white dark:bg-[#0d1627] rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4"
      >
        {/* Header alinhado ao padrão visual da sidebar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <h3
              id="daily-insights-heading"
              className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider"
            >
              {copy.sectionTitle}
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {copy.sectionBadge}
          </span>
        </div>

        {/* Lista de cards (preparada para até 6 insights diários) */}
        <div className="space-y-3">
          {items.map((item) => {
            const loc = item.translations[lang];
            const thumbFailed = !!failedThumbIds[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedInsight(item)}
                className="w-full text-left flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800/70 hover:border-emerald-500/40 transition cursor-pointer group"
              >
                {/* Miniatura discreta */}
                <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-[#070d18] border border-slate-800 flex items-center justify-center">
                  {!thumbFailed ? (
                    <img
                      src={item.imageUrl}
                      alt={loc.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedThumbIds((prev) => ({ ...prev, [item.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <Globe2 className="w-6 h-6 text-emerald-400/80" />
                  )}
                </div>

                {/* Tag, Título conciso e Data */}
                <div className="min-w-0 flex-1 space-y-1">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {loc.tag}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100 group-hover:text-white leading-snug line-clamp-2">
                    {loc.title}
                  </h4>
                  <div className="flex items-center justify-between gap-2 pt-0.5 text-[10px] text-slate-400">
                    <span className="truncate">{loc.dateAuthor}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/70 flex items-center gap-1.5">
          <BookOpen className="w-3 h-3 text-emerald-400/80 shrink-0" />
          <span>{copy.editorialNote}</span>
        </p>
      </section>

      {/* Modal Interativo de Leitura Completa */}
      {selectedInsight && activeContent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="daily-insight-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedInsight(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#0b1322] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagem em destaque */}
            <div className="relative h-52 sm:h-64 w-full bg-[#070d18] border-b border-slate-800 shrink-0 overflow-hidden">
              {!modalImgFailed ? (
                <img
                  src={selectedInsight.imageUrl}
                  alt={activeContent.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setModalImgFailed(true)}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0c1a30] via-[#0B1320] to-[#07111a] flex items-center justify-center">
                  <Globe2 className="w-14 h-14 text-emerald-400/70" />
                </div>
              )}

              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0b1322] via-[#0b1322]/45 to-transparent"
                aria-hidden="true"
              />

              {/* Tag sobreposta e botão fechar */}
              <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-[#070d18]/85 px-2.5 py-1 rounded-lg border border-emerald-500/30 backdrop-blur-sm">
                  {activeContent.tag}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedInsight(null)}
                  aria-label={copy.closeModalLabel}
                  className="w-8 h-8 rounded-xl bg-[#070d18]/85 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Corpo rolável da matéria completa */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
              <div className="space-y-3 border-b border-slate-800 pb-4">
                <h2
                  id="daily-insight-modal-title"
                  className="text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight"
                >
                  {activeContent.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {activeContent.dateAuthor}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>
                      <strong className="text-slate-300 font-semibold">{copy.sourceLabel}:</strong>{' '}
                      {activeContent.source}
                    </span>
                  </span>
                </div>
              </div>

              {/* Lead em destaque discreto */}
              <p className="text-sm font-medium text-emerald-100/90 bg-emerald-500/5 border-l-2 border-emerald-500 px-4 py-3 rounded-r-xl leading-relaxed">
                {activeContent.summary}
              </p>

              {/* Texto completo formatado em parágrafos legíveis */}
              <div className="space-y-4">
                {activeContent.fullContent.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-slate-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Rodapé do modal */}
            <div className="px-5 sm:px-7 py-3.5 border-t border-slate-800 bg-[#080f1e] flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-slate-400 truncate">
                {activeContent.source}
              </span>
              <button
                type="button"
                onClick={() => setSelectedInsight(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition cursor-pointer shrink-0"
              >
                {copy.closeModalLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
