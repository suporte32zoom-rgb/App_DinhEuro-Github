import React from 'react';
import { GraduationCap, BookOpen, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { type CourseLevel } from '../data/academyCourses';
import { getLocalizedAcademyCourses, getLocalizedCourseLevel } from '../i18n/academyTranslations';

const LEVEL_BADGE_STYLES: Record<CourseLevel, string> = {
  Iniciante: 'bg-[#E3F7F2] text-[#006B52] border-[#009B77]/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/25',
  Intermediário: 'bg-[#E6EEFF] text-[#003399] border-[#6699CC]/40 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/25',
  Avançado: 'bg-[#FEF7E0] text-[#D99B00] border-[#E5A910]/40 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/25',
};

export const AcademyHighlightSection: React.FC = () => {
  const { setActiveTab, openAcademyCourse } = useMarket();
  const { lang, t } = useI18n();
  const courses = getLocalizedAcademyCourses(lang);

  return (
    <section
      aria-labelledby="home-academy-heading"
      className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-5"
    >
      {/* Discreet Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] dark:border-slate-800/90 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[#003399] dark:text-emerald-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">{t.academyHighlight.eyebrow}</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E3F7F2] dark:bg-emerald-500/15 border border-[#009B77]/30 dark:border-emerald-500/30 text-[#006B52] dark:text-emerald-400">
              {t.academyHighlight.freeBadge}
            </span>
          </div>
          <h2 id="home-academy-heading" className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight">
            {t.academyHighlight.title}
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400 max-w-2xl leading-relaxed">
            {t.academyHighlight.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveTab('academy');
          }}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E6EEFF] dark:bg-slate-900 hover:bg-[#003399] dark:hover:bg-slate-800 border border-[#6699CC]/40 dark:border-slate-700 hover:border-[#003399] dark:hover:border-emerald-500/40 text-xs font-bold text-[#003399] dark:text-emerald-400 hover:text-white dark:hover:text-emerald-300 transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500"
        >
          <span>{t.academyHighlight.viewAllCourses}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Compact 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course, idx) => (
          <div
            key={course.id}
            className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/90 hover:border-[#003399]/40 dark:hover:border-emerald-500/40 p-4 flex flex-col justify-between space-y-4 transition group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${LEVEL_BADGE_STYLES[course.level]}`}
                >
                  {getLocalizedCourseLevel(course.level, lang)}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
                  {t.academyHighlight.freeTag}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono-numbers text-[#475569] dark:text-slate-400">
                <Layers className="w-3 h-3 text-[#475569] dark:text-slate-500" />
                <span>0{idx + 1}</span>
                <span>•</span>
                <span>{course.modules.length} {t.academyHighlight.modulesLabel}</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white group-hover:text-[#003399] dark:group-hover:text-emerald-300 transition leading-snug">
                {course.title}
              </h3>

              <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed line-clamp-3">
                {course.shortDescription}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-[#475569] dark:text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-[#009B77] dark:text-emerald-400" />
                <span>{t.academyHighlight.freeAccess}</span>
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAcademyCourse(course.id, 0);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFFFFF] dark:bg-slate-800/90 hover:bg-[#003399] dark:hover:bg-emerald-600/25 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#003399] dark:hover:border-emerald-500/40 text-[11px] font-bold text-[#003399] dark:text-emerald-400 hover:text-white dark:hover:text-emerald-300 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500"
              >
                <BookOpen className="w-3 h-3" />
                <span>{t.academyHighlight.accessLesson}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
