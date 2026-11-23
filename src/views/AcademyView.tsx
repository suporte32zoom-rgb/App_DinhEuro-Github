import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  X,
  ArrowUpRight,
  Layers,
  ShieldCheck,
  Calculator,
  Compass,
  HelpCircle,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import {
  ACADEMY_PROGRESS_STORAGE_KEY,
  type AcademyCourse,
  type CourseLevel,
} from '../data/academyCourses';
import { useI18n } from '../i18n/I18nContext';
import {
  ACADEMY_UI,
  getLocalizedAcademyCourses,
  getLocalizedAcademyFaq,
  getLocalizedCourseLevel,
  getLocalizedGlossaryTerms,
} from '../i18n/academyTranslations';

const LEVEL_STYLES: Record<CourseLevel, string> = {
  Iniciante:
    'bg-[#E3F7F2] text-[#006B52] border-[#009B77]/35 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/25',
  Intermediário:
    'bg-[#E6EEFF] text-[#003399] border-[#003399]/30 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/25',
  Avançado:
    'bg-[#FEF7E0] text-[#92400E] border-[#E5A910]/45 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/25',
};

const LEVEL_FILTERS: Array<'Todos' | CourseLevel> = [
  'Todos',
  'Iniciante',
  'Intermediário',
  'Avançado',
];

function loadCompletedModules(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(ACADEMY_PROGRESS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export const AcademyView: React.FC = () => {
  const { setActiveTab, selectedAcademyTarget, setSelectedAcademyTarget } = useMarket();
  const { lang } = useI18n();
  const tAc = ACADEMY_UI[lang];

  const localizedCourses = useMemo(() => getLocalizedAcademyCourses(lang), [lang]);
  const localizedFaq = useMemo(() => getLocalizedAcademyFaq(lang), [lang]);
  const localizedGlossary = useMemo(() => getLocalizedGlossaryTerms(lang), [lang]);

  const [levelFilter, setLevelFilter] = useState<'Todos' | CourseLevel>('Todos');
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() => loadCompletedModules());
  const [activeStudySession, setActiveStudySession] = useState<{
    courseId: string;
    moduleIndex: number;
  } | null>(null);

  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Persist progress in localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(
        ACADEMY_PROGRESS_STORAGE_KEY,
        JSON.stringify(completedModuleIds)
      );
    } catch {
      // ignore storage quota restrictions
    }
  }, [completedModuleIds]);

  // Handle deep-link from Home Academy Highlight cards
  useEffect(() => {
    if (!selectedAcademyTarget) return;
    const course = localizedCourses.find((c) => c.id === selectedAcademyTarget.courseId);
    if (course) {
      const idx =
        typeof selectedAcademyTarget.moduleIndex === 'number' &&
        selectedAcademyTarget.moduleIndex >= 0 &&
        selectedAcademyTarget.moduleIndex < course.modules.length
          ? selectedAcademyTarget.moduleIndex
          : 0;
      setActiveStudySession({ courseId: course.id, moduleIndex: idx });
    }
    setSelectedAcademyTarget(null);
  }, [selectedAcademyTarget, setSelectedAcademyTarget, localizedCourses]);

  // Body scroll lock & Escape handler when Study Modal is open
  useEffect(() => {
    if (!activeStudySession) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveStudySession(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeStudySession]);

  const totalModulesCount = useMemo(
    () => localizedCourses.reduce((acc, c) => acc + c.modules.length, 0),
    [localizedCourses]
  );
  const completedCount = completedModuleIds.length;
  const overallProgressPercent =
    totalModulesCount > 0 ? Math.round((completedCount / totalModulesCount) * 100) : 0;

  const filteredCourses = useMemo(() => {
    if (levelFilter === 'Todos') return localizedCourses;
    return localizedCourses.filter((c) => c.level === levelFilter);
  }, [levelFilter, localizedCourses]);

  const filteredGlossary = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return localizedGlossary.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        item.term.toLowerCase().includes(normalizedSearch) ||
        item.definition.toLowerCase().includes(normalizedSearch);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchTerm, localizedGlossary]);

  const toggleModuleCompleted = (moduleId: string) => {
    setCompletedModuleIds((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const markModuleCompleted = (moduleId: string) => {
    setCompletedModuleIds((prev) => (prev.includes(moduleId) ? prev : [...prev, moduleId]));
  };

  const openCourse = (course: AcademyCourse, requestedModuleIndex?: number) => {
    if (typeof requestedModuleIndex === 'number') {
      setActiveStudySession({ courseId: course.id, moduleIndex: requestedModuleIndex });
      return;
    }
    const firstPendingIdx = course.modules.findIndex(
      (m) => !completedModuleIds.includes(m.id)
    );
    setActiveStudySession({
      courseId: course.id,
      moduleIndex: firstPendingIdx >= 0 ? firstPendingIdx : 0,
    });
  };

  const activeCourse = activeStudySession
    ? localizedCourses.find((c) => c.id === activeStudySession.courseId) || null
    : null;
  const activeModule =
    activeCourse && activeStudySession
      ? activeCourse.modules[activeStudySession.moduleIndex] || activeCourse.modules[0]
      : null;

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-7 pb-14 animate-in fade-in duration-300">
      {/* Institutional Header */}
      <header className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/35 dark:border-emerald-500/25 text-[#006B52] dark:text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{tAc.badgeFree}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E6EEFF] dark:bg-sky-500/10 border border-[#003399]/30 dark:border-sky-500/25 text-[#003399] dark:text-sky-400 text-[11px] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{tAc.badgeUpdated}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FEF7E0] dark:bg-amber-500/10 border border-[#E5A910]/45 dark:border-amber-500/25 text-[#92400E] dark:text-amber-400 text-[11px] font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>{tAc.badgeTracks}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-7 h-7 text-[#006B52] dark:text-emerald-400 flex-shrink-0" />
              <span>{tAc.title}</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#334155] dark:text-slate-300 leading-relaxed">
              {tAc.subtitle}
            </p>
          </div>

          {/* Study Progress Card */}
          <div className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 p-4 sm:min-w-[260px] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#334155] dark:text-slate-300">{tAc.progressTitle}</span>
              <span className="font-mono-numbers font-extrabold text-[#006B52] dark:text-emerald-400">
                {overallProgressPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#E2E8F0] dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-[#009B77] dark:bg-emerald-500 transition-all duration-300"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#475569] dark:text-slate-400 font-mono-numbers">
              <span>
                {completedCount} {tAc.progressOf} {totalModulesCount} {tAc.progressModulesCompleted}
              </span>
              <span className="text-[#006B52] dark:text-emerald-400 font-semibold">{tAc.savedOnDevice}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Level Filter Bar & Courses Grid */}
      <section aria-labelledby="academy-courses-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2
              id="academy-courses-heading"
              className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
              <span>{tAc.coursesHeading}</span>
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
              {tAc.coursesSubtitle}
            </p>
          </div>

          {/* Level Filters */}
          <div
            role="group"
            aria-label={tAc.filterAriaLabel}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
          >
            {LEVEL_FILTERS.map((level) => {
              const count =
                level === 'Todos'
                  ? localizedCourses.length
                  : localizedCourses.filter((c) => c.level === level).length;
              const isActive = levelFilter === level;
              const label = level === 'Todos' ? tAc.filterAll : getLocalizedCourseLevel(level, lang);
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelFilter(level)}
                  data-on-dark={isActive ? 'true' : undefined}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex-shrink-0 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500 ${
                    isActive
                      ? 'bg-[#003399] border-[#003399] text-white dark:bg-emerald-500/15 dark:border-emerald-500/40 dark:text-emerald-300'
                      : 'bg-[#FFFFFF] border-[#CBD5E1] text-[#334155] hover:text-[#0F172A] hover:border-[#94A3B8] dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700'
                  }`}
                >
                  {label} <span className="font-mono-numbers opacity-80">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredCourses.map((course) => {
            const doneInCourse = course.modules.filter((m) =>
              completedModuleIds.includes(m.id)
            ).length;
            const coursePercent = Math.round((doneInCourse / course.modules.length) * 100);

            return (
              <div
                key={course.id}
                className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 hover:border-[#003399]/30 dark:hover:border-slate-700 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 transition"
              >
                <div className="space-y-4">
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${LEVEL_STYLES[course.level]}`}
                      >
                        {tAc.levelPrefix} {getLocalizedCourseLevel(course.level, lang)}
                      </span>
                      <span className="text-[11px] font-mono-numbers text-[#475569] dark:text-slate-400 font-semibold">
                        {course.modules.length} {tAc.modulesCountLabel} • {course.duration}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/35 dark:border-emerald-500/25 text-[#006B52] dark:text-emerald-400">
                      {tAc.freeTag}
                    </span>
                  </div>

                  {/* Course title & description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">{course.description}</p>
                    <p className="text-[11px] text-[#475569] dark:text-slate-400 leading-relaxed">
                      <strong className="text-[#0F172A] dark:text-slate-200">{tAc.practicalObjective}</strong> {course.objective}
                    </p>
                  </div>

                  {/* Progress inside course */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#475569] dark:text-slate-400 font-medium">{tAc.trackProgress}</span>
                      <span className="font-mono-numbers font-bold text-[#006B52] dark:text-emerald-400">
                        {doneInCourse}/{course.modules.length} {tAc.modulesLowerLabel} ({coursePercent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-[#009B77] dark:bg-emerald-500 transition-all duration-300"
                        style={{ width: `${coursePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Clickable 4 Modules List */}
                  <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase tracking-wider block">
                      {tAc.fourModulesStructure}
                    </span>
                    <div className="space-y-1.5">
                      {course.modules.map((mod, mIdx) => {
                        const isDone = completedModuleIds.includes(mod.id);
                        return (
                          <button
                            key={mod.id}
                            type="button"
                            onClick={() => openCourse(course, mIdx)}
                            className="w-full text-left flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#F4F7F9] hover:bg-[#E6EEFF] dark:bg-[#070e1b] dark:hover:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800/80 hover:border-[#003399]/35 dark:hover:border-emerald-500/40 transition cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-[#006B52] dark:text-emerald-400 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-[#94A3B8] dark:text-slate-600 group-hover:text-[#003399] dark:group-hover:text-emerald-400 flex-shrink-0 transition" />
                              )}
                              <div className="min-w-0">
                                <span className="text-xs font-semibold text-[#0F172A] dark:text-slate-200 dark:group-hover:text-white truncate block">
                                  {mod.number}. {mod.title}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[10px] font-mono-numbers text-[#64748B] dark:text-slate-500">
                                {mod.duration}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#64748B] dark:text-slate-500 group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={() => openCourse(course)}
                  data-on-dark="true"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-blue-950/20 dark:shadow-emerald-950/40 transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-400"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {doneInCourse === 0
                      ? tAc.startCourse
                      : doneInCourse === course.modules.length
                        ? tAc.reviewCourse
                        : tAc.continueCourse}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dicionário Financeiro A-Z */}
      <section
        aria-labelledby="glossary-heading"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <div>
            <h2
              id="glossary-heading"
              className="text-base font-bold text-[#0F172A] dark:text-white flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-[#B45309] dark:text-amber-400" />
              <span>{tAc.glossaryTitle}</span>
            </h2>
            <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
              {tAc.glossarySubtitle}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] dark:text-slate-400" />
            <input
              type="text"
              placeholder={tAc.glossarySearchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: tAc.glossaryCategories.all },
              { id: 'Câmbio', label: tAc.glossaryCategories.Câmbio },
              { id: 'Ações', label: tAc.glossaryCategories.Ações },
              { id: 'Macro', label: tAc.glossaryCategories.Macro },
              { id: 'Cripto', label: tAc.glossaryCategories.Cripto },
            ] as const
          ).map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                data-on-dark={isActive ? 'true' : undefined}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex-shrink-0 ${
                  isActive
                    ? 'bg-[#003399] text-white dark:bg-emerald-600'
                    : 'bg-[#F4F7F9] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 text-[#334155] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Glossary Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGlossary.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4F7F9] dark:bg-[#070e1b] rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{item.term}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#E2E8F0] dark:bg-slate-800 text-[#334155] dark:text-slate-400 font-semibold uppercase flex-shrink-0">
                  {tAc.glossaryCategories[item.category]}
                </span>
              </div>
              <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial FAQ Section for SEO & Clarity */}
      <section
        aria-labelledby="academy-faq-heading"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"
      >
        <div className="border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
          <h2
            id="academy-faq-heading"
            className="text-base font-bold text-[#0F172A] dark:text-white flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
            <span>{tAc.faqTitle}</span>
          </h2>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-0.5">
            {tAc.faqSubtitle}
          </p>
        </div>

        <div className="space-y-2.5">
          {localizedFaq.map((faq) => {
            const isOpen = !!openFaqIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/90 overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-[#E6EEFF]/60 dark:hover:bg-slate-900/60 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#475569] dark:text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#003399] dark:text-emerald-400' : ''
                    }`}
                  />
                </button>
                <div className={isOpen ? 'px-4 pb-3.5 pt-0.5 block' : 'hidden'}>
                  <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Study Workspace Modal (Portal) */}
      {activeCourse &&
        activeModule &&
        activeStudySession &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="study-modal-title"
            className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-5 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setActiveStudySession(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] bg-[#FFFFFF] dark:bg-[#0b1322] border border-[#CBD5E1] dark:border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0d1627]">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${LEVEL_STYLES[activeCourse.level]}`}
                    >
                      {getLocalizedCourseLevel(activeCourse.level, lang)}
                    </span>
                    <span className="text-[11px] font-semibold text-[#006B52] dark:text-emerald-400 truncate">
                      {activeCourse.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569] dark:text-slate-400 font-mono-numbers">
                    {tAc.moduleWord} {activeModule.number} {tAc.ofWord} {activeCourse.modules.length} • {tAc.estimatedDuration}{' '}
                    {activeModule.duration}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label={tAc.closeLessonAria}
                  onClick={() => setActiveStudySession(null)}
                  className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] dark:bg-slate-900 dark:hover:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#334155] hover:text-[#0F172A] dark:text-slate-300 dark:hover:text-white transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Desktop Sidebar + Lesson Reading Area */}
              <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
                {/* Course Modules Sidebar */}
                <aside className="md:w-72 border-b md:border-b-0 md:border-r border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-[#070d18] p-3 sm:p-4 overflow-x-auto md:overflow-y-auto flex-shrink-0">
                  <div className="text-[10px] font-bold text-[#475569] dark:text-slate-400 uppercase tracking-wider mb-2 hidden md:block">
                    {tAc.trackModulesSidebar}
                  </div>
                  <div className="flex md:flex-col gap-2">
                    {activeCourse.modules.map((mod, idx) => {
                      const isCurrent = idx === activeStudySession.moduleIndex;
                      const isDone = completedModuleIds.includes(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() =>
                            setActiveStudySession({ courseId: activeCourse.id, moduleIndex: idx })
                          }
                          className={`text-left px-3 py-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 flex-shrink-0 md:flex-shrink min-w-[210px] md:min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500 ${
                            isCurrent
                              ? 'bg-[#E6EEFF] border-[#003399]/40 text-[#0F172A] dark:bg-emerald-500/15 dark:border-emerald-500/40 dark:text-white'
                              : 'bg-[#FFFFFF] border-[#E2E8F0] text-[#334155] hover:border-[#94A3B8] hover:text-[#0F172A] dark:bg-[#0d1627] dark:border-slate-800/80 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-[#006B52] dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                isCurrent ? 'text-[#003399] dark:text-emerald-400' : 'text-[#94A3B8] dark:text-slate-600'
                              }`}
                            />
                          )}
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono-numbers text-[#475569] dark:text-slate-400">
                              {tAc.moduleWord} {mod.number} • {mod.duration}
                            </div>
                            <div className="text-xs font-bold leading-snug line-clamp-2">
                              {mod.title}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* Main Didactic Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
                  {/* Lesson Title & Completion Button */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
                    <div className="space-y-1.5">
                      <h2
                        id="study-modal-title"
                        className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white tracking-tight leading-snug"
                      >
                        {activeModule.number}. {activeModule.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#006B52] dark:text-emerald-300/90 font-medium">
                        {activeModule.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleModuleCompleted(activeModule.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-500 ${
                        completedModuleIds.includes(activeModule.id)
                          ? 'bg-[#E3F7F2] border-[#009B77]/45 text-[#006B52] dark:bg-emerald-500/20 dark:border-emerald-500/40 dark:text-emerald-300'
                          : 'bg-[#F4F7F9] hover:bg-[#E2E8F0] border-[#CBD5E1] text-[#0F172A] dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {completedModuleIds.includes(activeModule.id)
                          ? tAc.moduleCompletedBtn
                          : tAc.markAsCompletedBtn}
                      </span>
                    </button>
                  </div>

                  {/* Full Educational Prose */}
                  <article className="space-y-4">
                    {activeModule.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-[#334155] dark:text-slate-200 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </article>

                  {/* Practical Numeric Example Box */}
                  <div className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#B45309] dark:text-amber-400 uppercase tracking-wider">
                      <Calculator className="w-4 h-4" />
                      <span>{tAc.appliedNumericExample} {activeModule.numericExample.title}</span>
                    </div>
                    <p className="text-xs text-[#334155] dark:text-slate-300 leading-relaxed">
                      <strong className="text-[#0F172A] dark:text-white">{tAc.scenarioLabel}</strong>{' '}
                      {activeModule.numericExample.scenario}
                    </p>
                    <ol className="space-y-1.5 pl-4 list-decimal text-xs text-[#0F172A] dark:text-slate-200 font-mono-numbers">
                      {activeModule.numericExample.steps.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80">
                      <p className="text-xs font-semibold text-[#006B52] dark:text-emerald-400 leading-relaxed">
                        {tAc.practicalConclusionLabel} {activeModule.numericExample.result}
                      </p>
                    </div>
                  </div>

                  {/* Key Concepts Grid */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#0F172A] dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
                      <span>{tAc.keyConceptsTitle}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeModule.keyConcepts.map((concept) => (
                        <div
                          key={concept.term}
                          className="rounded-xl bg-[#F8FAFC] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 p-3.5 space-y-1.5"
                        >
                          <h3 className="text-xs font-bold text-[#003399] dark:text-emerald-400">{concept.term}</h3>
                          <p className="text-[11px] text-[#334155] dark:text-slate-300 leading-relaxed">
                            {concept.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contextual Tool CTA inside DinhEuro */}
                  <div className="rounded-xl bg-[#E3F7F2]/80 dark:bg-gradient-to-r dark:from-emerald-950/50 dark:via-[#0d1627] dark:to-[#0d1627] border border-[#009B77]/35 dark:border-emerald-500/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
                        {tAc.immediatePracticeEyebrow}
                      </span>
                      <p className="text-xs text-[#0F172A] dark:text-slate-200 leading-relaxed">
                        {activeModule.targetDescription}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const target = activeModule.targetTab;
                        markModuleCompleted(activeModule.id);
                        setActiveStudySession(null);
                        setActiveTab(target);
                      }}
                      data-on-dark="true"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003399] dark:focus-visible:ring-emerald-400"
                    >
                      <span>{activeModule.targetButtonLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Footer Navigation */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0d1627]">
                <button
                  type="button"
                  disabled={activeStudySession.moduleIndex === 0}
                  onClick={() =>
                    setActiveStudySession((prev) =>
                      prev && prev.moduleIndex > 0
                        ? { ...prev, moduleIndex: prev.moduleIndex - 1 }
                        : prev
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] dark:bg-slate-900 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-[#CBD5E1] dark:border-slate-700 text-xs font-bold text-[#0F172A] dark:text-slate-200 transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{tAc.previousModule}</span>
                </button>

                <div className="hidden sm:flex items-center gap-1.5">
                  {activeCourse.modules.map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      aria-label={`${tAc.goToModulePrefix} ${m.number}`}
                      onClick={() =>
                        setActiveStudySession({ courseId: activeCourse.id, moduleIndex: idx })
                      }
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeStudySession.moduleIndex
                          ? 'w-6 bg-[#003399] dark:bg-emerald-400'
                          : completedModuleIds.includes(m.id)
                            ? 'w-2 bg-[#009B77] dark:bg-emerald-600'
                            : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8] dark:bg-slate-700 dark:hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>

                {activeStudySession.moduleIndex < activeCourse.modules.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      markModuleCompleted(activeModule.id);
                      setActiveStudySession((prev) =>
                        prev
                          ? {
                              ...prev,
                              moduleIndex: Math.min(
                                activeCourse.modules.length - 1,
                                prev.moduleIndex + 1
                              ),
                            }
                          : prev
                      );
                    }}
                    data-on-dark="true"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <span>{tAc.completeAndNext}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      markModuleCompleted(activeModule.id);
                      setActiveStudySession(null);
                    }}
                    data-on-dark="true"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#009B77] hover:bg-[#006B52] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tAc.completeTrack}</span>
                  </button>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
