import type { SupportedLanguage } from './translations';
import {
  ACADEMY_COURSES,
  ACADEMY_FAQ,
  type AcademyCourse,
  type AcademyFaqItem,
  type CourseLevel,
} from '../data/academyCourses';
import { ACADEMY_COURSES_EN, ACADEMY_FAQ_EN } from './academyCoursesEn';
import { ACADEMY_COURSES_ES, ACADEMY_FAQ_ES } from './academyCoursesEs';

export type GlossaryCategory = 'Câmbio' | 'Ações' | 'Macro' | 'Cripto';

export interface GlossaryTerm {
  id: string;
  term: string;
  category: GlossaryCategory;
  definition: string;
}

export interface AcademyUiTranslations {
  badgeFree: string;
  badgeUpdated: string;
  badgeTracks: string;
  title: string;
  subtitle: string;
  progressTitle: string;
  progressOf: string;
  progressModulesCompleted: string;
  savedOnDevice: string;
  coursesHeading: string;
  coursesSubtitle: string;
  filterAriaLabel: string;
  filterAll: string;
  levelLabel: Record<CourseLevel, string>;
  levelPrefix: string;
  modulesCountLabel: string;
  freeTag: string;
  practicalObjective: string;
  trackProgress: string;
  modulesLowerLabel: string;
  fourModulesStructure: string;
  startCourse: string;
  reviewCourse: string;
  continueCourse: string;
  glossaryTitle: string;
  glossarySubtitle: string;
  glossarySearchPlaceholder: string;
  glossaryCategories: {
    all: string;
    Câmbio: string;
    Ações: string;
    Macro: string;
    Cripto: string;
  };
  faqTitle: string;
  faqSubtitle: string;
  closeLessonAria: string;
  moduleWord: string;
  ofWord: string;
  estimatedDuration: string;
  trackModulesSidebar: string;
  moduleCompletedBtn: string;
  markAsCompletedBtn: string;
  appliedNumericExample: string;
  scenarioLabel: string;
  practicalConclusionLabel: string;
  keyConceptsTitle: string;
  immediatePracticeEyebrow: string;
  previousModule: string;
  goToModulePrefix: string;
  completeAndNext: string;
  completeTrack: string;
}

export const ACADEMY_UI: Record<SupportedLanguage, AcademyUiTranslations> = {
  pt: {
    badgeFree: 'Acesso Livre',
    badgeUpdated: 'Conteúdo Atualizado',
    badgeTracks: '4 Trilhas Completas',
    title: 'DinhEuro Academy',
    subtitle:
      'Educação financeira independente e 100% gratuita, sem cadastro obrigatório, sem paywalls e sem dependência de vídeos externos. Estude por leitura estruturada, acompanhe exemplos numéricos reais e aplique cada conceito diretamente nos simuladores e terminais do portal.',
    progressTitle: 'Seu Progresso de Estudo',
    progressOf: 'de',
    progressModulesCompleted: 'módulos concluídos',
    savedOnDevice: 'Salvo no dispositivo',
    coursesHeading: 'Trilhas de Educação Financeira & Mercados',
    coursesSubtitle:
      'Selecione uma trilha abaixo ou clique diretamente em qualquer módulo para abrir o ambiente de leitura.',
    filterAriaLabel: 'Filtrar cursos por nível',
    filterAll: 'Todos',
    levelLabel: {
      Iniciante: 'Iniciante',
      Intermediário: 'Intermediário',
      Avançado: 'Avançado',
    },
    levelPrefix: 'Nível:',
    modulesCountLabel: 'Módulos',
    freeTag: 'Gratuito',
    practicalObjective: 'Objetivo prático:',
    trackProgress: 'Progresso da trilha',
    modulesLowerLabel: 'módulos',
    fourModulesStructure: 'Estrutura dos 4 Módulos:',
    startCourse: 'Iniciar Curso',
    reviewCourse: 'Revisar Curso Completo',
    continueCourse: 'Continuar Curso',
    glossaryTitle: 'Glossário & Dicionário Financeiro A-Z',
    glossarySubtitle:
      'Definições claras de termos técnicos do mercado financeiro brasileiro e global.',
    glossarySearchPlaceholder: 'Buscar termo no glossário...',
    glossaryCategories: {
      all: 'Todos os Termos',
      Câmbio: 'Câmbio & Moedas',
      Ações: 'Ações & Bolsa',
      Macro: 'Macroeconomia',
      Cripto: 'Criptoativos',
    },
    faqTitle: 'Perguntas Frequentes — DinhEuro Academy',
    faqSubtitle:
      'Informações sobre funcionamento, acesso gratuito, armazenamento de progresso e uso dos simuladores.',
    closeLessonAria: 'Fechar aula',
    moduleWord: 'Módulo',
    ofWord: 'de',
    estimatedDuration: 'Duração estimada:',
    trackModulesSidebar: 'Módulos da Trilha',
    moduleCompletedBtn: 'Módulo Concluído',
    markAsCompletedBtn: 'Marcar como Concluído',
    appliedNumericExample: 'Exemplo Numérico Aplicado:',
    scenarioLabel: 'Cenário:',
    practicalConclusionLabel: 'Conclusão prática:',
    keyConceptsTitle: 'Conceitos-Chave do Módulo',
    immediatePracticeEyebrow: 'Prática Imediata no Terminal DinhEuro',
    previousModule: 'Módulo Anterior',
    goToModulePrefix: 'Ir para módulo',
    completeAndNext: 'Concluir & Próximo Módulo',
    completeTrack: 'Concluir Trilha',
  },
  en: {
    badgeFree: 'Free Access',
    badgeUpdated: 'Updated Content',
    badgeTracks: '4 Complete Tracks',
    title: 'DinhEuro Academy',
    subtitle:
      'Independent, 100% free financial education with no registration required, no paywalls, and no reliance on external videos. Study through structured reading, follow real numerical examples, and apply every concept directly in the portal’s simulators and terminals.',
    progressTitle: 'Your Study Progress',
    progressOf: 'of',
    progressModulesCompleted: 'modules completed',
    savedOnDevice: 'Saved on device',
    coursesHeading: 'Financial Education & Markets Tracks',
    coursesSubtitle:
      'Select a track below or click directly on any module to open the reading workspace.',
    filterAriaLabel: 'Filter courses by level',
    filterAll: 'All',
    levelLabel: {
      Iniciante: 'Beginner',
      Intermediário: 'Intermediate',
      Avançado: 'Advanced',
    },
    levelPrefix: 'Level:',
    modulesCountLabel: 'Modules',
    freeTag: 'Free',
    practicalObjective: 'Practical objective:',
    trackProgress: 'Track progress',
    modulesLowerLabel: 'modules',
    fourModulesStructure: '4-Module Curriculum:',
    startCourse: 'Start Course',
    reviewCourse: 'Review Full Course',
    continueCourse: 'Continue Course',
    glossaryTitle: 'A-Z Financial Glossary & Dictionary',
    glossarySubtitle:
      'Clear definitions of technical terms across Brazilian and global financial markets.',
    glossarySearchPlaceholder: 'Search glossary term...',
    glossaryCategories: {
      all: 'All Terms',
      Câmbio: 'FX & Currencies',
      Ações: 'Equities & Stocks',
      Macro: 'Macroeconomics',
      Cripto: 'Crypto Assets',
    },
    faqTitle: 'Frequently Asked Questions — DinhEuro Academy',
    faqSubtitle:
      'Information on how the academy works, free access, local progress storage, and simulator integration.',
    closeLessonAria: 'Close lesson',
    moduleWord: 'Module',
    ofWord: 'of',
    estimatedDuration: 'Estimated duration:',
    trackModulesSidebar: 'Track Modules',
    moduleCompletedBtn: 'Module Completed',
    markAsCompletedBtn: 'Mark as Completed',
    appliedNumericExample: 'Applied Numerical Example:',
    scenarioLabel: 'Scenario:',
    practicalConclusionLabel: 'Practical takeaway:',
    keyConceptsTitle: 'Module Key Concepts',
    immediatePracticeEyebrow: 'Hands-On Practice in the DinhEuro Terminal',
    previousModule: 'Previous Module',
    goToModulePrefix: 'Go to module',
    completeAndNext: 'Complete & Next Module',
    completeTrack: 'Finish Track',
  },
  es: {
    badgeFree: 'Acceso Libre',
    badgeUpdated: 'Contenido Actualizado',
    badgeTracks: '4 Rutas Completas',
    title: 'DinhEuro Academy',
    subtitle:
      'Educación financiera independiente y 100% gratuita, sin registro obligatorio, sin muros de pago ni dependencia de videos externos. Estudia mediante lectura estructurada, sigue ejemplos numéricos reales y aplica cada concepto directamente en los simuladores y terminales del portal.',
    progressTitle: 'Tu Progreso de Estudio',
    progressOf: 'de',
    progressModulesCompleted: 'módulos completados',
    savedOnDevice: 'Guardado en el dispositivo',
    coursesHeading: 'Rutas de Educación Financiera & Mercados',
    coursesSubtitle:
      'Selecciona una ruta a continuación o haz clic directamente en cualquier módulo para abrir el entorno de lectura.',
    filterAriaLabel: 'Filtrar cursos por nivel',
    filterAll: 'Todos',
    levelLabel: {
      Iniciante: 'Principiante',
      Intermediário: 'Intermedio',
      Avançado: 'Avanzado',
    },
    levelPrefix: 'Nivel:',
    modulesCountLabel: 'Módulos',
    freeTag: 'Gratuito',
    practicalObjective: 'Objetivo práctico:',
    trackProgress: 'Progreso de la ruta',
    modulesLowerLabel: 'módulos',
    fourModulesStructure: 'Estructura de los 4 Módulos:',
    startCourse: 'Iniciar Curso',
    reviewCourse: 'Repasar Curso Completo',
    continueCourse: 'Continuar Curso',
    glossaryTitle: 'Glosario & Diccionario Financiero A-Z',
    glossarySubtitle:
      'Definiciones claras de términos técnicos del mercado financiero brasileño y global.',
    glossarySearchPlaceholder: 'Buscar término en el glosario...',
    glossaryCategories: {
      all: 'Todos los Términos',
      Câmbio: 'Divisas & Cambio',
      Ações: 'Acciones & Bolsa',
      Macro: 'Macroeconomía',
      Cripto: 'Criptoactivos',
    },
    faqTitle: 'Preguntas Frecuentes — DinhEuro Academy',
    faqSubtitle:
      'Información sobre el funcionamiento, acceso gratuito, almacenamiento de progreso y uso de los simuladores.',
    closeLessonAria: 'Cerrar clase',
    moduleWord: 'Módulo',
    ofWord: 'de',
    estimatedDuration: 'Duración estimada:',
    trackModulesSidebar: 'Módulos de la Ruta',
    moduleCompletedBtn: 'Módulo Completado',
    markAsCompletedBtn: 'Marcar como Completado',
    appliedNumericExample: 'Ejemplo Numérico Aplicado:',
    scenarioLabel: 'Escenario:',
    practicalConclusionLabel: 'Conclusión práctica:',
    keyConceptsTitle: 'Conceptos Clave del Módulo',
    immediatePracticeEyebrow: 'Práctica Inmediata en el Terminal DinhEuro',
    previousModule: 'Módulo Anterior',
    goToModulePrefix: 'Ir al módulo',
    completeAndNext: 'Completar & Siguiente Módulo',
    completeTrack: 'Finalizar Ruta',
  },
};

const GLOSSARY_TERMS_BY_LANG: Record<SupportedLanguage, GlossaryTerm[]> = {
  pt: [
    {
      id: 'spread-cambial',
      term: 'Spread Cambial',
      category: 'Câmbio',
      definition:
        'A diferença entre a cotação interbancária de mercado (preço de custo da moeda) e a taxa cobrada pelo banco ou corretora na conversão.',
    },
    {
      id: 'vet',
      term: 'VET (Valor Efetivo Total)',
      category: 'Câmbio',
      definition:
        'Custo final real por unidade de moeda estrangeira somando taxa de câmbio comercial, spread da instituição e IOF incidente na remessa.',
    },
    {
      id: 'sipc',
      term: 'SIPC (Securities Investor Protection Corporation)',
      category: 'Ações',
      definition:
        'Entidade dos Estados Unidos que protege contas de clientes em corretoras reguladas até o limite de US$ 500.000 em valores mobiliários em caso de falência.',
    },
    {
      id: 'carry-trade',
      term: 'Carry Trade',
      category: 'Câmbio',
      definition:
        'Operação financeira em que um investidor capta recursos em moedas com taxa de juros baixa para aplicar em países com juros reais elevados.',
    },
    {
      id: 'pe-ratio',
      term: 'P/L (Preço sobre Lucro / P/E Ratio)',
      category: 'Ações',
      definition:
        'Múltiplo de avaliação que indica quantos anos o investidor levaria para reaver o capital investido considerando o lucro atual da empresa.',
    },
    {
      id: 'dividend-yield',
      term: 'Dividend Yield (DY)',
      category: 'Ações',
      definition:
        'Relação percentual entre os proventos pagos por uma ação nos últimos 12 meses e o preço de mercado atual de sua cotação.',
    },
    {
      id: 'selic-cdi',
      term: 'Selic e CDI',
      category: 'Macro',
      definition:
        'A taxa Selic é a taxa básica de juros da economia brasileira definida pelo Copom. O CDI acompanha a Selic de perto e serve de referência para títulos bancários pós-fixados.',
    },
    {
      id: 'mtm',
      term: 'Marcação a Mercado (MtM)',
      category: 'Macro',
      definition:
        'Atualização diária do valor de um título público ou privado conforme as taxas de juros futuras negociadas no mercado secundário.',
    },
    {
      id: 'halving',
      term: 'Halving do Bitcoin',
      category: 'Cripto',
      definition:
        'Evento programado no protocolo do Bitcoin a cada 210.000 blocos (aprox. 4 anos) que reduz pela metade a emissão de novas moedas por bloco minerado.',
    },
    {
      id: 'hedge-cambial',
      term: 'Hedge Cambial',
      category: 'Câmbio',
      definition:
        'Estratégia de proteção patrimonial utilizada para neutralizar o risco de variação abrupta de moedas estrangeiras sobre ativos ou passivos.',
    },
    {
      id: 'bce',
      term: 'Banco Central Europeu (BCE)',
      category: 'Macro',
      definition:
        'Autoridade monetária responsável pela política de juros, estabilidade de preços (inflação na Zona do Euro) e emissão do Euro nos países que integram a união monetária europeia.',
    },
    {
      id: 'paridade-eur-brl',
      term: 'Paridade EUR/BRL',
      category: 'Câmbio',
      definition:
        'Relação cambial que expressa quantos Reais brasileiros são necessários para adquirir um Euro, refletindo conjuntamente o comportamento do câmbio local (USD/BRL) e da taxa internacional EUR/USD.',
    },
    {
      id: 'comercio-ue-mercosul',
      term: 'Comércio Exterior UE–Mercosul',
      category: 'Macro',
      definition:
        'Fluxo bilateral de exportações, importações e acordos tarifários e regulatórios entre os países do Mercosul e a União Europeia, influenciando receitas cambiais, cadeias produtivas e contratos internacionais.',
    },
  ],
  en: [
    {
      id: 'spread-cambial',
      term: 'FX Spread',
      category: 'Câmbio',
      definition:
        'The difference between the interbank mid-market exchange rate (wholesale currency cost) and the rate charged by a bank or broker during conversion.',
    },
    {
      id: 'vet',
      term: 'VET (Total Effective FX Rate)',
      category: 'Câmbio',
      definition:
        'The true all-in cost per unit of foreign currency, combining the commercial exchange rate, institution spread, and applicable transfer taxes (such as IOF).',
    },
    {
      id: 'sipc',
      term: 'SIPC (Securities Investor Protection Corporation)',
      category: 'Ações',
      definition:
        'U.S. statutory entity that protects brokerage client accounts at member firms up to US$ 500,000 in securities in the event of broker insolvency.',
    },
    {
      id: 'carry-trade',
      term: 'Carry Trade',
      category: 'Câmbio',
      definition:
        'A macro strategy in which an investor borrows in a low-interest-rate currency to allocate capital into higher-yielding sovereign markets.',
    },
    {
      id: 'pe-ratio',
      term: 'P/E Ratio (Price-to-Earnings)',
      category: 'Ações',
      definition:
        'Valuation multiple measuring how many years of current net earnings are required to recover the share price paid by the investor.',
    },
    {
      id: 'dividend-yield',
      term: 'Dividend Yield (DY)',
      category: 'Ações',
      definition:
        'Percentage ratio between cash distributions paid per share over the trailing 12 months and the asset’s current market price.',
    },
    {
      id: 'selic-cdi',
      term: 'Selic & CDI Benchmarks',
      category: 'Macro',
      definition:
        'The Selic is Brazil’s policy interest rate set by the Central Bank’s Copom. The CDI interbank rate tracks Selic closely and anchors floating-rate bank securities.',
    },
    {
      id: 'mtm',
      term: 'Mark-to-Market (MtM)',
      category: 'Macro',
      definition:
        'Daily revaluation of a sovereign or corporate bond according to prevailing forward interest rates traded in the secondary market.',
    },
    {
      id: 'halving',
      term: 'Bitcoin Halving',
      category: 'Cripto',
      definition:
        'Scheduled event in the Bitcoin protocol every 210,000 blocks (roughly every 4 years) that cuts the block issuance reward for miners in half.',
    },
    {
      id: 'hedge-cambial',
      term: 'Currency Hedge',
      category: 'Câmbio',
      definition:
        'Portfolio protection strategy used to neutralize the risk of abrupt foreign-exchange fluctuations on cross-border assets or liabilities.',
    },
    {
      id: 'bce',
      term: 'European Central Bank (ECB)',
      category: 'Macro',
      definition:
        'Monetary authority responsible for setting policy interest rates, safeguarding Eurozone price stability (inflation target), and managing the Euro across Eurozone member states.',
    },
    {
      id: 'paridade-eur-brl',
      term: 'EUR/BRL Exchange Parity',
      category: 'Câmbio',
      definition:
        'Exchange rate expressing how many Brazilian Reais are required to buy one Euro, mathematically reflecting both local USD/BRL dynamics and the global EUR/USD cross rate.',
    },
    {
      id: 'comercio-ue-mercosul',
      term: 'EU–Mercosur Foreign Trade',
      category: 'Macro',
      definition:
        'Bilateral exports, imports, and tariff/regulatory frameworks connecting Mercosur economies and the European Union, shaping FX inflows, supply chains, and cross-border contracts.',
    },
  ],
  es: [
    {
      id: 'spread-cambial',
      term: 'Spread Cambiario',
      category: 'Câmbio',
      definition:
        'La diferencia entre el tipo de cambio interbancario de mercado (precio mayorista de la divisa) y la tasa cobrada por el banco o bróker al convertir.',
    },
    {
      id: 'vet',
      term: 'VET (Valor Efectivo Total)',
      category: 'Câmbio',
      definition:
        'Costo final real por unidad de moneda extranjera sumando el tipo de cambio comercial, el spread de la entidad y los impuestos aplicables (como el IOF).',
    },
    {
      id: 'sipc',
      term: 'SIPC (Securities Investor Protection Corporation)',
      category: 'Ações',
      definition:
        'Entidad de Estados Unidos que protege cuentas de clientes en brókeres regulados hasta un límite de US$ 500.000 en valores mobiliarios en caso de insolvencia.',
    },
    {
      id: 'carry-trade',
      term: 'Carry Trade',
      category: 'Câmbio',
      definition:
        'Operación financiera en la que un inversor toma financiamiento en divisas de tasas bajas para invertir en países con tasas de interés reales elevadas.',
    },
    {
      id: 'pe-ratio',
      term: 'PER / P/L (Precio sobre Beneficio)',
      category: 'Ações',
      definition:
        'Múltiplo de valuación que indica cuántos años de beneficios actuales se necesitarían para recuperar el capital invertido en la acción.',
    },
    {
      id: 'dividend-yield',
      term: 'Dividend Yield (DY)',
      category: 'Ações',
      definition:
        'Relación porcentual entre los dividendos pagados por una acción en los últimos 12 meses y el precio de mercado actual de su cotización.',
    },
    {
      id: 'selic-cdi',
      term: 'Selic y CDI',
      category: 'Macro',
      definition:
        'La tasa Selic es la tasa básica de interés de Brasil definida por el Copom. El CDI sigue de cerca a la Selic y sirve de referencia para títulos bancarios indexados.',
    },
    {
      id: 'mtm',
      term: 'Valoración a Mercado (Mark-to-Market)',
      category: 'Macro',
      definition:
        'Actualización diaria del valor de un bono soberano o privado según las tasas de interés futuras negociadas en el mercado secundario.',
    },
    {
      id: 'halving',
      term: 'Halving de Bitcoin',
      category: 'Cripto',
      definition:
        'Evento programado en el protocolo de Bitcoin cada 210.000 bloques (aprox. 4 años) que reduce a la mitad la emisión de nuevas monedas por bloque minado.',
    },
    {
      id: 'hedge-cambial',
      term: 'Cobertura Cambiaria (Hedge)',
      category: 'Câmbio',
      definition:
        'Estrategia de protección patrimonial utilizada para neutralizar el riesgo de variaciones abruptas en divisas extranjeras sobre activos o pasivos.',
    },
    {
      id: 'bce',
      term: 'Banco Central Europeo (BCE)',
      category: 'Macro',
      definition:
        'Autoridad monetaria encargada de definir las tasas de interés de política monetaria, velar por la estabilidad de precios (inflación de la Eurozona) y gestionar el Euro.',
    },
    {
      id: 'paridade-eur-brl',
      term: 'Paridad EUR/BRL',
      category: 'Câmbio',
      definition:
        'Relación cambiaria que indica cuántos Reales brasileños se requieren para comprar un Euro, reflejando en conjunto el comportamiento de USD/BRL y la paridad global EUR/USD.',
    },
    {
      id: 'comercio-ue-mercosul',
      term: 'Comercio Exterior UE–Mercosur',
      category: 'Macro',
      definition:
        'Intercambio bilateral de exportaciones, importaciones y marcos arancelarios y regulatorios entre el Mercosur y la Unión Europea, con impacto directo en flujos de divisas y contratos internacionales.',
    },
  ],
};

export function getLocalizedCourseLevel(level: CourseLevel, lang: SupportedLanguage): string {
  return ACADEMY_UI[lang].levelLabel[level] ?? level;
}

export function getLocalizedAcademyCourses(lang: SupportedLanguage): AcademyCourse[] {
  if (lang === 'pt') return ACADEMY_COURSES;
  const overrides = lang === 'en' ? ACADEMY_COURSES_EN : ACADEMY_COURSES_ES;

  return ACADEMY_COURSES.map((course) => {
    const tr = overrides[course.id];
    if (!tr) return course;

    return {
      ...course,
      title: tr.title,
      shortTitle: tr.shortTitle,
      duration: tr.duration,
      description: tr.description,
      shortDescription: tr.shortDescription,
      objective: tr.objective,
      modules: course.modules.map((mod) => {
        const modTr = tr.modules.find((m) => m.id === mod.id);
        if (!modTr) return mod;
        return {
          ...mod,
          title: modTr.title,
          duration: modTr.duration,
          summary: modTr.summary,
          paragraphs: modTr.paragraphs,
          numericExample: modTr.numericExample,
          keyConcepts: modTr.keyConcepts,
          targetButtonLabel: modTr.targetButtonLabel,
          targetDescription: modTr.targetDescription,
        };
      }),
    };
  });
}

export function getLocalizedAcademyFaq(lang: SupportedLanguage): AcademyFaqItem[] {
  if (lang === 'pt') return ACADEMY_FAQ;
  const overrides = lang === 'en' ? ACADEMY_FAQ_EN : ACADEMY_FAQ_ES;
  return ACADEMY_FAQ.map((item) => {
    const tr = overrides[item.id];
    return tr ? { ...item, question: tr.question, answer: tr.answer } : item;
  });
}

export function getLocalizedGlossaryTerms(lang: SupportedLanguage): GlossaryTerm[] {
  return GLOSSARY_TERMS_BY_LANG[lang] ?? GLOSSARY_TERMS_BY_LANG.pt;
}
