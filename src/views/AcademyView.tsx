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
  ACADEMY_COURSES,
  ACADEMY_FAQ,
  ACADEMY_PROGRESS_STORAGE_KEY,
  type AcademyCourse,
  type CourseLevel,
} from '../data/academyCourses';

interface GlossaryTerm {
  term: string;
  category: 'Câmbio' | 'Ações' | 'Macro' | 'Cripto';
  definition: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Spread Cambial',
    category: 'Câmbio',
    definition:
      'A diferença entre a cotação interbancária de mercado (preço de custo da moeda) e a taxa cobrada pelo banco ou corretora na conversão.',
  },
  {
    term: 'VET (Valor Efetivo Total)',
    category: 'Câmbio',
    definition:
      'Custo final real por unidade de moeda estrangeira somando taxa de câmbio comercial, spread da instituição e IOF incidente na remessa.',
  },
  {
    term: 'SIPC (Securities Investor Protection Corporation)',
    category: 'Ações',
    definition:
      'Entidade dos Estados Unidos que protege contas de clientes em corretoras reguladas até o limite de US$ 500.000 em valores mobiliários em caso de falência.',
  },
  {
    term: 'Carry Trade',
    category: 'Câmbio',
    definition:
      'Operação financeira em que um investidor capta recursos em moedas com taxa de juros baixa para aplicar em países com juros reais elevados.',
  },
  {
    term: 'P/L (Preço sobre Lucro / P/E Ratio)',
    category: 'Ações',
    definition:
      'Múltiplo de avaliação que indica quantos anos o investidor levaria para reaver o capital investido considerando o lucro atual da empresa.',
  },
  {
    term: 'Dividend Yield (DY)',
    category: 'Ações',
    definition:
      'Relação percentual entre os proventos pagos por uma ação nos últimos 12 meses e o preço de mercado atual de sua cotação.',
  },
  {
    term: 'Selic e CDI',
    category: 'Macro',
    definition:
      'A taxa Selic é a taxa básica de juros da economia brasileira definida pelo Copom. O CDI acompanha a Selic de perto e serve de referência para títulos bancários pós-fixados.',
  },
  {
    term: 'Marcação a Mercado (MtM)',
    category: 'Macro',
    definition:
      'Atualização diária do valor de um título público ou privado conforme as taxas de juros futuras negociadas no mercado secundário.',
  },
  {
    term: 'Halving do Bitcoin',
    category: 'Cripto',
    definition:
      'Evento programado no protocolo do Bitcoin a cada 210.000 blocos (aprox. 4 anos) que reduz pela metade a emissão de novas moedas por bloco minerado.',
  },
  {
    term: 'Hedge Cambial',
    category: 'Câmbio',
    definition:
      'Estratégia de proteção patrimonial utilizada para neutralizar o risco de variação abrupta de moedas estrangeiras sobre ativos ou passivos.',
  },
];

const LEVEL_STYLES: Record<CourseLevel, string> = {
  Iniciante: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  Intermediário: 'bg-sky-500/10 text-sky-400 border-sky-500/25',
  Avançado: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
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
    const course = ACADEMY_COURSES.find((c) => c.id === selectedAcademyTarget.courseId);
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
  }, [selectedAcademyTarget, setSelectedAcademyTarget]);

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
    () => ACADEMY_COURSES.reduce((acc, c) => acc + c.modules.length, 0),
    []
  );
  const completedCount = completedModuleIds.length;
  const overallProgressPercent =
    totalModulesCount > 0 ? Math.round((completedCount / totalModulesCount) * 100) : 0;

  const filteredCourses = useMemo(() => {
    if (levelFilter === 'Todos') return ACADEMY_COURSES;
    return ACADEMY_COURSES.filter((c) => c.level === levelFilter);
  }, [levelFilter]);

  const filteredGlossary = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        item.term.toLowerCase().includes(normalizedSearch) ||
        item.definition.toLowerCase().includes(normalizedSearch);
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

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
    ? ACADEMY_COURSES.find((c) => c.id === activeStudySession.courseId) || null
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
      <header className="rounded-2xl bg-[#0d1627] border border-slate-800 p-5 sm:p-7 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Acesso Livre</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/25 text-sky-400 text-[11px] font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Conteúdo Atualizado</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>4 Trilhas Completas</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <GraduationCap className="w-7 h-7 text-emerald-400 flex-shrink-0" />
              <span>DinhEuro Academy</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Educação financeira independente e 100% gratuita, sem cadastro obrigatório, sem paywalls e sem dependência de vídeos externos. Estude por leitura estruturada, acompanhe exemplos numéricos reais e aplique cada conceito diretamente nos simuladores e terminais do portal.
            </p>
          </div>

          {/* Study Progress Card */}
          <div className="rounded-xl bg-[#070e1b] border border-slate-800 p-4 sm:min-w-[260px] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Seu Progresso de Estudo</span>
              <span className="font-mono-numbers font-extrabold text-emerald-400">
                {overallProgressPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${overallProgressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono-numbers">
              <span>
                {completedCount} de {totalModulesCount} módulos concluídos
              </span>
              <span className="text-emerald-400 font-semibold">Salvo no dispositivo</span>
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
              className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Trilhas de Educação Financeira & Mercados</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Selecione uma trilha abaixo ou clique diretamente em qualquer módulo para abrir o ambiente de leitura.
            </p>
          </div>

          {/* Level Filters */}
          <div
            role="group"
            aria-label="Filtrar cursos por nível"
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
          >
            {LEVEL_FILTERS.map((level) => {
              const count =
                level === 'Todos'
                  ? ACADEMY_COURSES.length
                  : ACADEMY_COURSES.filter((c) => c.level === level).length;
              const isActive = levelFilter === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setLevelFilter(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex-shrink-0 border focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isActive
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {level} <span className="font-mono-numbers opacity-75">({count})</span>
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
                className="rounded-2xl bg-[#0d1627] border border-slate-800 hover:border-slate-700 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 transition"
              >
                <div className="space-y-4">
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded border ${LEVEL_STYLES[course.level]}`}
                      >
                        Nível: {course.level}
                      </span>
                      <span className="text-[11px] font-mono-numbers text-slate-400 font-semibold">
                        {course.modules.length} Módulos • {course.duration}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                      Gratuito
                    </span>
                  </div>

                  {/* Course title & description */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{course.description}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      <strong className="text-slate-200">Objetivo prático:</strong> {course.objective}
                    </p>
                  </div>

                  {/* Progress inside course */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Progresso da trilha</span>
                      <span className="font-mono-numbers font-bold text-emerald-400">
                        {doneInCourse}/{course.modules.length} módulos ({coursePercent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${coursePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Clickable 4 Modules List */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Estrutura dos 4 Módulos:
                    </span>
                    <div className="space-y-1.5">
                      {course.modules.map((mod, mIdx) => {
                        const isDone = completedModuleIds.includes(mod.id);
                        return (
                          <button
                            key={mod.id}
                            type="button"
                            onClick={() => openCourse(course, mIdx)}
                            className="w-full text-left flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-[#070e1b] hover:bg-slate-900 border border-slate-800/80 hover:border-emerald-500/40 transition cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 flex-shrink-0 transition" />
                              )}
                              <div className="min-w-0">
                                <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate block">
                                  {mod.number}. {mod.title}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[10px] font-mono-numbers text-slate-500">
                                {mod.duration}
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
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
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition cursor-pointer flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>
                    {doneInCourse === 0
                      ? 'Iniciar Curso'
                      : doneInCourse === course.modules.length
                        ? 'Revisar Curso Completo'
                        : 'Continuar Curso'}
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
        className="rounded-2xl bg-[#0d1627] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2
              id="glossary-heading"
              className="text-base font-bold text-white flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Glossário & Dicionário Financeiro A-Z</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Definições claras de termos técnicos do mercado financeiro brasileiro e global.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar termo no glossário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'Todos os Termos' },
              { id: 'Câmbio', label: 'Câmbio & Moedas' },
              { id: 'Ações', label: 'Ações & Bolsa' },
              { id: 'Macro', label: 'Macroeconomia' },
              { id: 'Cripto', label: 'Criptoativos' },
            ] as const
          ).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex-shrink-0 ${
                activeCategory === c.id
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Glossary Terms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredGlossary.map((item) => (
            <div
              key={item.term}
              className="bg-[#070e1b] rounded-xl p-4 border border-slate-800/80 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-white">{item.term}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold uppercase flex-shrink-0">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial FAQ Section for SEO & Clarity */}
      <section
        aria-labelledby="academy-faq-heading"
        className="rounded-2xl bg-[#0d1627] border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"
      >
        <div className="border-b border-slate-800 pb-4">
          <h2
            id="academy-faq-heading"
            className="text-base font-bold text-white flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>Perguntas Frequentes — DinhEuro Academy</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Informações sobre funcionamento, acesso gratuito, armazenamento de progresso e uso dos simuladores.
          </p>
        </div>

        <div className="space-y-2.5">
          {ACADEMY_FAQ.map((faq) => {
            const isOpen = !!openFaqIds[faq.id];
            return (
              <div
                key={faq.id}
                className="rounded-xl bg-[#070e1b] border border-slate-800/90 overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 hover:bg-slate-900/60 transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                <div className={isOpen ? 'px-4 pb-3.5 pt-0.5 block' : 'hidden'}>
                  <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
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
            className="fixed inset-0 z-[9990] flex items-center justify-center p-2 sm:p-5 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setActiveStudySession(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] bg-[#0b1322] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-[#0d1627]">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${LEVEL_STYLES[activeCourse.level]}`}
                    >
                      {activeCourse.level}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 truncate">
                      {activeCourse.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono-numbers">
                    Módulo {activeModule.number} de {activeCourse.modules.length} • Duração estimada:{' '}
                    {activeModule.duration}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Fechar aula"
                  onClick={() => setActiveStudySession(null)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Desktop Sidebar + Lesson Reading Area */}
              <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
                {/* Course Modules Sidebar */}
                <aside className="md:w-72 border-b md:border-b-0 md:border-r border-slate-800 bg-[#070d18] p-3 sm:p-4 overflow-x-auto md:overflow-y-auto flex-shrink-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 hidden md:block">
                    Módulos da Trilha
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
                          className={`text-left px-3 py-2.5 rounded-xl border transition cursor-pointer flex items-start gap-2.5 flex-shrink-0 md:flex-shrink min-w-[210px] md:min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                            isCurrent
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                              : 'bg-[#0d1627] border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                isCurrent ? 'text-emerald-400' : 'text-slate-600'
                              }`}
                            />
                          )}
                          <div className="min-w-0">
                            <div className="text-[10px] font-mono-numbers text-slate-400">
                              Módulo {mod.number} • {mod.duration}
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
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="space-y-1.5">
                      <h2
                        id="study-modal-title"
                        className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug"
                      >
                        {activeModule.number}. {activeModule.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-emerald-300/90 font-medium">
                        {activeModule.summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleModuleCompleted(activeModule.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        completedModuleIds.includes(activeModule.id)
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {completedModuleIds.includes(activeModule.id)
                          ? 'Módulo Concluído'
                          : 'Marcar como Concluído'}
                      </span>
                    </button>
                  </div>

                  {/* Full Educational Prose */}
                  <article className="space-y-4">
                    {activeModule.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </article>

                  {/* Practical Numeric Example Box */}
                  <div className="rounded-xl bg-[#070e1b] border border-slate-800 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                      <Calculator className="w-4 h-4" />
                      <span>Exemplo Numérico Aplicado: {activeModule.numericExample.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-white">Cenário:</strong>{' '}
                      {activeModule.numericExample.scenario}
                    </p>
                    <ol className="space-y-1.5 pl-4 list-decimal text-xs text-slate-200 font-mono-numbers">
                      {activeModule.numericExample.steps.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                    <div className="pt-2 border-t border-slate-800/80">
                      <p className="text-xs font-semibold text-emerald-400 leading-relaxed">
                        Conclusão prática: {activeModule.numericExample.result}
                      </p>
                    </div>
                  </div>

                  {/* Key Concepts Grid */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Compass className="w-4 h-4 text-emerald-400" />
                      <span>Conceitos-Chave do Módulo</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeModule.keyConcepts.map((concept) => (
                        <div
                          key={concept.term}
                          className="rounded-xl bg-[#0d1627] border border-slate-800 p-3.5 space-y-1.5"
                        >
                          <h3 className="text-xs font-bold text-emerald-400">{concept.term}</h3>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {concept.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contextual Tool CTA inside DinhEuro */}
                  <div className="rounded-xl bg-gradient-to-r from-emerald-950/50 via-[#0d1627] to-[#0d1627] border border-emerald-500/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Prática Imediata no Terminal DinhEuro
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed">
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
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      <span>{activeModule.targetButtonLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Bottom Footer Navigation */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-slate-800 bg-[#0d1627]">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-xs font-bold text-slate-200 transition cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Módulo Anterior</span>
                </button>

                <div className="hidden sm:flex items-center gap-1.5">
                  {activeCourse.modules.map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      aria-label={`Ir para módulo ${m.number}`}
                      onClick={() =>
                        setActiveStudySession({ courseId: activeCourse.id, moduleIndex: idx })
                      }
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeStudySession.moduleIndex
                          ? 'w-6 bg-emerald-400'
                          : completedModuleIds.includes(m.id)
                            ? 'w-2 bg-emerald-600'
                            : 'w-2 bg-slate-700 hover:bg-slate-600'
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <span>Concluir & Próximo Módulo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      markModuleCompleted(activeModule.id);
                      setActiveStudySession(null);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Concluir Trilha</span>
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
