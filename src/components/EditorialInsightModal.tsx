import React, { useEffect, useState } from 'react';
import { X, Calendar, Building2, Globe2, Clock } from 'lucide-react';
import type { DailyInsightItem } from '../data/dailyInsights';
import { DAILY_INSIGHTS_UI_COPY } from '../data/dailyInsights';
import type { SupportedLanguage } from '../i18n/translations';

interface EditorialInsightModalProps {
  item: DailyInsightItem | null;
  lang: SupportedLanguage;
  onClose: () => void;
}

export const EditorialInsightModal: React.FC<EditorialInsightModalProps> = ({
  item,
  lang,
  onClose,
}) => {
  const [modalImgFailed, setModalImgFailed] = useState(false);

  useEffect(() => {
    if (!item) return;
    setModalImgFailed(false);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const copy = DAILY_INSIGHTS_UI_COPY[lang];
  const activeContent = item.translations[lang];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-insight-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] rounded-2xl bg-[#0b1322] border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem em destaque */}
        <div className="relative h-52 sm:h-64 w-full bg-[#070d18] border-b border-slate-800 shrink-0 overflow-hidden">
          {!modalImgFailed ? (
            <img
              src={item.imageUrl}
              alt={activeContent.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setModalImgFailed(true)}
              className="w-full h-full object-cover object-[50%_20%]"
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
              onClick={onClose}
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
              {activeContent.readingTime && (
                <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  {activeContent.readingTime}
                </span>
              )}
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

          {/* Texto completo formatado em parágrafos e subtítulos legíveis */}
          <div className="space-y-4">
            {activeContent.fullContent.map((block, idx) =>
              block.startsWith('## ') ? (
                <h3
                  key={idx}
                  className="text-base font-bold text-white pt-1 tracking-tight"
                >
                  {block.slice(3)}
                </h3>
              ) : (
                <p
                  key={idx}
                  className="text-sm text-slate-300 leading-relaxed"
                >
                  {block}
                </p>
              )
            )}
          </div>
        </div>

        {/* Rodapé do modal */}
        <div className="px-5 sm:px-7 py-3.5 border-t border-slate-800 bg-[#080f1e] flex items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] text-slate-400 truncate">
            {activeContent.source}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition cursor-pointer shrink-0"
          >
            {copy.closeModalLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
