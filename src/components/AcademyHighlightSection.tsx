import React from 'react';
import { GraduationCap, BookOpen, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { ACADEMY_COURSES, type CourseLevel } from '../data/academyCourses';

const LEVEL_BADGE_STYLES: Record<CourseLevel, string> = {
  Iniciante: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  Intermediário: 'bg-sky-500/10 text-sky-400 border-sky-500/25',
  Avançado: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
};

export const AcademyHighlightSection: React.FC = () => {
  const { setActiveTab, openAcademyCourse } = useMarket();

  return (
    <section
      aria-labelledby="home-academy-heading"
      className="rounded-2xl bg-[#0d1627] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5"
    >
      {/* Discreet Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/90 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Educação Financeira</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              100% Gratuito
            </span>
          </div>
          <h2 id="home-academy-heading" className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            DinhEuro Academy — Trilhas Práticas de Mercado
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Cursos estruturados em módulos de leitura interativa com exemplos numéricos aplicados e acesso direto às ferramentas do portal.
          </p>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveTab('academy');
          }}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span>Ver Todos os Cursos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Compact 4-Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACADEMY_COURSES.map((course, idx) => (
          <div
            key={course.id}
            className="rounded-xl bg-[#070e1b] border border-slate-800/90 hover:border-emerald-500/40 p-4 flex flex-col justify-between space-y-4 transition group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${LEVEL_BADGE_STYLES[course.level]}`}
                >
                  {course.level}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  GRATUITO
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono-numbers text-slate-400">
                <Layers className="w-3 h-3 text-slate-500" />
                <span>Trilha 0{idx + 1}</span>
                <span>•</span>
                <span>{course.modules.length} Módulos</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                {course.title}
              </h3>

              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {course.shortDescription}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Acesso Livre</span>
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openAcademyCourse(course.id, 0);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-emerald-600/25 border border-slate-700 hover:border-emerald-500/40 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <BookOpen className="w-3 h-3" />
                <span>Acessar Aula</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
