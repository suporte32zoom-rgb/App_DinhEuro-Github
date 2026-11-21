import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Cpu, Landmark } from 'lucide-react';
import drexBanner from '../assets/images/drex_cbdc_currency_1794626746831.jpg';
import { useI18n } from '../i18n/I18nContext';
import { DREX_DOSSIER_DATA } from '../i18n/dossiers';

export const DrexDossierPanel: React.FC = () => {
  const { lang } = useI18n();
  const dossier = DREX_DOSSIER_DATA[lang];
  const [openIds, setOpenIds] = useState<string[]>(['o-que-e-drex']);
  const [imgFailed, setImgFailed] = useState(false);

  const toggleSection = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(dossier.sections.map((s) => s.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const allExpanded = openIds.length === dossier.sections.length;

  return (
    <section
      aria-labelledby="drex-dossier-heading"
      className="bg-[#FFFFFF] dark:bg-[#0d1627] rounded-2xl border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-xl"
    >
      {/* 1. Imagem Ilustrativa Institucional do Drex no Topo */}
      <div
        data-overlay-dark="true"
        className="relative h-44 sm:h-52 w-full bg-[#002266] dark:bg-[#070d18] overflow-hidden border-b border-[#E2E8F0] dark:border-slate-800"
      >
        {!imgFailed ? (
          <img
            src={drexBanner}
            alt={dossier.imageAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#003399] via-[#002266] to-[#006B52] dark:from-[#0c1a30] dark:via-[#0B1320] dark:to-[#07111a] flex items-center justify-center p-6">
            <div className="flex items-center gap-4 text-white">
              <Cpu className="w-10 h-10 text-[#66C7AE]" />
              <span className="text-sm font-bold tracking-wide">{dossier.fallbackTitle}</span>
            </div>
          </div>
        )}
        <div
          data-overlay-dark="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#002266]/95 via-[#002266]/65 to-transparent dark:from-[#0d1627] dark:via-[#0d1627]/65 dark:to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#66C7AE] dark:text-sky-300">
            <span>{dossier.tags[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{dossier.tags[1]}</span>
            <span aria-hidden="true">·</span>
            <span>{dossier.tags[2]}</span>
          </div>
          <h2
            id="drex-dossier-heading"
            className="text-base sm:text-lg font-extrabold text-white tracking-tight text-balance leading-snug"
          >
            {dossier.heading}
          </h2>
          <p className="text-[11px] text-slate-200 dark:text-slate-300 leading-snug">
            {dossier.subheading}
          </p>
        </div>
      </div>

      {/* Barra de Controle Compacta */}
      <div className="px-4 sm:px-5 py-3 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-[#1E293B] dark:text-slate-300">
          <Landmark className="w-3.5 h-3.5 text-[#003399] dark:text-sky-400 flex-shrink-0" />
          <span>{dossier.controlLabel}</span>
        </div>

        <button
          type="button"
          onClick={allExpanded ? collapseAll : expandAll}
          className="px-3 py-1 rounded-lg bg-[#FFFFFF] dark:bg-slate-800 hover:bg-[#E6EEFF] dark:hover:bg-slate-700 border border-[#E2E8F0] dark:border-slate-700/80 text-[11px] font-semibold text-[#003399] dark:text-slate-200 transition cursor-pointer whitespace-nowrap shrink-0"
        >
          {allExpanded ? dossier.collapseAll : dossier.expandAll}
        </button>
      </div>

      {/* 2. Acordeões Interativos com Seta à Esquerda e Texto Integral sempre montado no DOM */}
      <div className="divide-y divide-[#E2E8F0] dark:divide-slate-800/80">
        {dossier.sections.map((section) => {
          const isOpen = openIds.includes(section.id);
          return (
            <div key={section.id} className="transition-colors">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`drex-panel-${section.id}`}
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center gap-3 hover:bg-[#F4F7F9] dark:hover:bg-slate-800/40 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500"
              >
                <ChevronRight
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-90 text-[#009B77] dark:text-emerald-400' : 'text-[#475569] dark:text-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs sm:text-sm font-bold leading-snug ${
                    isOpen ? 'text-[#003399] dark:text-emerald-300' : 'text-[#0F172A] dark:text-slate-100'
                  }`}
                >
                  {section.title}
                </span>
              </button>

              {/* Conteúdo integral mantido no DOM para indexação SEO / AdSense */}
              <article
                id={`drex-panel-${section.id}`}
                className={`px-4 sm:px-5 pl-11 sm:pl-12 pb-4 space-y-2.5 text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed ${
                  isOpen ? 'block' : 'hidden'
                }`}
              >
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </article>
            </div>
          );
        })}
      </div>

      {/* Rodapé da Seção */}
      <footer className="px-4 sm:px-5 py-3.5 bg-[#F4F7F9] dark:bg-slate-900/70 border-t border-[#E2E8F0] dark:border-slate-800 flex items-start gap-2 text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-[#009B77] dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <span>{dossier.footerNote}</span>
      </footer>
    </section>
  );
};
