import { TAB_ROUTE_MAP, type NavigationTab } from '../context/MarketContext';
import type { SupportedLanguage } from '../i18n/translations';

export const CANONICAL_ORIGIN = 'https://dinheuro.com';
export const GA_MEASUREMENT_ID = 'G-XS3S97LWQC';
export const GLOBAL_HREFLANG_TARGETS = ['pt-BR', 'en', 'es', 'x-default'] as const;

export interface RouteSeoEntry {
  title: string;
  description: string;
  keywords: string;
}

const OG_LOCALE_MAP: Record<SupportedLanguage, string> = {
  pt: 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
};

export const ROUTE_SEO_METADATA: Record<NavigationTab, Record<SupportedLanguage, RouteSeoEntry>> = {
  dashboard: {
    pt: {
      title:
        'DinhEuro | Inteligência Financeira Global, Câmbio EUR/BRL e Radar União Europeia – Mercosul',
      description:
        'Acompanhe em tempo real a cotação do Euro e Dólar, indicadores macroeconômicos (BCE, Selic, IPCA), comércio exterior e os impactos econômicos do acordo União Europeia – Mercosul. Acesso livre, sem cadastro.',
      keywords:
        'acordo união europeia mercosul economia, cotação euro comercial tempo real, câmbio euro real hoje, radar macroeconômico europa brasil, comércio exterior mercosul união europeia, indicadores financeiros bce selic',
    },
    en: {
      title:
        'DinhEuro | Global Financial Intelligence, EUR/BRL FX & European Union – Mercosur Radar',
      description:
        'Track real-time Euro and Dollar exchange rates, macroeconomic indicators (ECB, Selic, IPCA), foreign trade, and economic impacts of the European Union – Mercosur agreement. Open access, no login required.',
      keywords:
        'eu mercosur agreement economy, commercial euro live quote, eur brl exchange rate today, europe brazil macroeconomic radar, mercosur european union foreign trade, ecb selic financial indicators',
    },
    es: {
      title:
        'DinhEuro | Inteligencia Financiera Global, Cambio EUR/BRL y Radar Unión Europea – Mercosur',
      description:
        'Sigue en tiempo real la cotización del Euro y Dólar, indicadores macroeconómicos (BCE, Selic, IPCA), comercio exterior e impactos económicos del acuerdo Unión Europea – Mercosur. Acceso libre, sin registro.',
      keywords:
        'acuerdo union europea mercosur economia, cotizacion euro comercial tiempo real, cambio euro real hoy, radar macroeconomico europa brasil, comercio exterior mercosur union europea, indicadores financieros bce selic',
    },
  },
  mercados: {
    pt: {
      title: 'Fechamento Ibovespa Hoje, Ações B3, EUA, Europa e 168 Ativos ao Vivo | DinhEuro',
      description:
        'Acompanhe fechamento Ibovespa hoje, ações da B3 com maior dividendo, ações americanas e europeias em tempo real, Ásia-Pacífico, Forex e commodities entre 168 ativos globais.',
      keywords:
        'fechamento ibovespa hoje, ações da b3 com maior dividendo, ações americanas e europeias em tempo real, 168 ativos globais, EUR to BRL live rate, USD BRL exchange rate today, cotações b3 tempo real, bolsa europeia, águia ásia pacífico, forex mundial',
    },
    en: {
      title: 'Live Ibovespa Close, Brazil B3 Dividend Stocks, US & European Equities | DinhEuro',
      description:
        'Monitor live Ibovespa close, top Brazil B3 dividend stocks, US and European equities in real time, Asia-Pacific markets, EUR to BRL live rate, and 168 global assets.',
      keywords:
        'ibovespa close today, top b3 dividend stocks, us and european stocks real time, 168 global assets, EUR to BRL live rate, USD BRL exchange rate today, global equities tracker, asia pacific stocks, live forex',
    },
    es: {
      title: 'Cierre Ibovespa Hoy, Acciones B3, EE. UU., Europa y 168 Activos en Vivo | DinhEuro',
      description:
        'Sigue el cierre del Ibovespa hoy, acciones de B3 con mayores dividendos, acciones americanas y europeas en tiempo real, Asia-Pacífico, Forex y materias primas.',
      keywords:
        'cierre ibovespa hoy, acciones b3 mayor dividendo, acciones americanas y europeas en tiempo real, 168 activos globales, EUR to BRL live rate, USD BRL exchange rate today, mercados mundiales, divisas en vivo',
    },
  },
  ferramentas: {
    pt: {
      title: 'Calculadora de Câmbio: Converter Euro para Real, Remessa, Spread e IOF | DinhEuro',
      description:
        'Converta Euro para Real (EUR/BRL) e Dólar comercial hoje em tempo real, compare como enviar remessa internacional mais barata calculando spread bancário, IOF e conta global para viagens.',
      keywords:
        'cotação euro hoje real, converter euro para real, dólar comercial hoje em tempo real, como enviar remessa internacional mais barata, spread bancário e iof remessa, conta global internacional para viagens, EUR to BRL live rate, USD BRL exchange rate today, international money transfer fees, projeção taxa selic e inflação ipca, calculadora juros compostos',
    },
    en: {
      title: 'Live Currency Converter: EUR to BRL Live Rate & International Transfer Fees | DinhEuro',
      description:
        'Convert Euro to Brazilian Real (EUR to BRL live rate) and USD BRL exchange rate today, model international money transfer fees, bank spread, IOF tax, and global travel accounts.',
      keywords:
        'EUR to BRL live rate, USD BRL exchange rate today, international money transfer fees, convert euro to brazilian real, bank spread and iof calculator, global travel multi currency account, compound interest calculator, ipca inflation simulator',
    },
    es: {
      title: 'Calculadora de Cambio: Convertir Euro a Real, Remesas, Spread e IOF | DinhEuro',
      description:
        'Convierte Euro a Real (EUR/BRL) y Dólar comercial en tiempo real, calcula cómo enviar remesa internacional más barata con spread bancario, IOF y cuenta global de viajes.',
      keywords:
        'convertir euro a real, cotizacion euro hoy real, dolar comercial en tiempo real, remesa internacional barata, spread bancario e iof, cuenta global viajes, EUR to BRL live rate, USD BRL exchange rate today, international money transfer fees, interes compuesto',
    },
  },
  noticias: {
    pt: {
      title: 'Insights do Dia, Boletim Focus, Drex, Mercosul-UE e Notícias Econômicas | DinhEuro',
      description:
        'Leia o resumo do Boletim Focus do Banco Central, impactos econômicos do Acordo Mercosul–União Europeia, o que é o Drex moeda digital, projeção Taxa Selic, IPCA e Insights do Dia.',
      keywords:
        'boletim focus banco central resumo, acordo mercosul união europeia impacto econômico, o que é o drex moeda digital do banco central, projeção taxa selic e inflação ipca, insights do dia economia, fechamento ibovespa hoje, notícias mercado financeiro',
    },
    en: {
      title: 'Daily Insights, Central Bank Focus Report, Drex & Mercosur–EU Dossiers | DinhEuro',
      description:
        'Read Brazil Central Bank Focus report summary, Mercosur–European Union trade impact, Drex digital currency dossier, Selic rate and IPCA inflation forecasts, and global news.',
      keywords:
        'central bank focus report summary, mercosur eu agreement economic impact, drex central bank digital currency, selic rate and ipca inflation projection, daily market insights, financial news',
    },
    es: {
      title: 'Insights del Día, Boletín Focus, Drex, Mercosur-UE y Noticias de Economía | DinhEuro',
      description:
        'Consulta el resumen del Boletín Focus del Banco Central, impacto económico del Acuerdo Mercosur–Unión Europea, qué es el Drex moneda digital, proyección tasa Selic, IPCA y noticias.',
      keywords:
        'boletin focus banco central resumen, acuerdo mercosur union europea impacto economico, que es el drex moneda digital, proyeccion tasa selic e inflacion ipca, noticias macroeconomia',
    },
  },
  graficos: {
    pt: {
      title: 'Gráfico D3 v7 Análise Técnica: Ações B3, EUA, Europa, Euro e Dólar | DinhEuro',
      description:
        'Terminal institucional com gráfico D3 v7 de análise técnica, velas interativas, médias móveis, fechamento Ibovespa hoje, ações americanas e europeias em tempo real e criptomoedas.',
      keywords:
        'gráfico d3 v7 análise técnica, ações americanas e europeias em tempo real, fechamento ibovespa hoje, gráfico de velas ao vivo, médias móveis, análise técnica dólar euro bitcoin',
    },
    en: {
      title: 'D3 v7 Technical Analysis Charts: US, European & B3 Equities Live | DinhEuro',
      description:
        'Institutional D3 v7 technical analysis candlestick terminal with moving averages, volume overlays, US and European stocks in real time, FX rates, and cryptocurrencies.',
      keywords:
        'd3 v7 technical analysis chart, us and european stocks live, candlestick charts, moving averages, EUR to BRL live rate, bitcoin technical chart',
    },
    es: {
      title: 'Gráfico D3 v7 Análisis Técnico: Acciones EE. UU., Europa, B3 y Divisas | DinhEuro',
      description:
        'Terminal gráfico D3 v7 de análisis técnico con velas japonesas, medias móviles, acciones estadounidenses y europeas en tiempo real, Ibovespa y criptoactivos.',
      keywords:
        'grafico d3 v7 analisis tecnico, acciones americanas y europeas en tiempo real, velas japonesas, medias moviles, grafico dolar euro',
    },
  },
  daytrade: {
    pt: {
      title: 'Mercados Futuros, Volatilidade e Gestão de Risco | DinhEuro',
      description:
        'Guia educativo e analítico sobre contratos futuros (Mini-Índice, Mini-Dólar e S&P 500), liquidez, horário de pregão, câmbio, juros e controle de risco.',
      keywords:
        'mercados futuros educação, mini índice win, mini dólar wdo, s&p 500 volatilidade, gestão de risco financeiro, liquidez e horário de pregão, câmbio e juros futuros',
    },
    en: {
      title: 'Futures Markets, Volatility & Risk Management | DinhEuro',
      description:
        'Educational and analytical guide to futures contracts (Mini-Index, Mini-Dollar, and S&P 500), market liquidity, macro drivers, and capital risk management.',
      keywords:
        'futures markets education, volatility and liquidity, index futures s&p 500, fx futures, capital risk management, macro interest rate impact',
    },
    es: {
      title: 'Mercados de Futuros, Volatilidad y Gestión de Riesgo | DinhEuro',
      description:
        'Guía educativa y analítica sobre contratos de futuros (Mini-Índice, Mini-Dólar y S&P 500), liquidez, horarios de sesión, divisas, tasas y control de riesgo.',
      keywords:
        'mercados de futuros educación, volatilidad y liquidez, futuros s&p 500, divisas y tasas, gestión de riesgo financiero',
    },
  },
  tape_reading: {
    pt: {
      title: 'Fluxo de Ordens, Tape Reading, Livro de Ofertas (DOM) e Times & Trades | DinhEuro',
      description:
        'Acompanhe o livro de ofertas (DOM), saldo de agressão compradora e vendedora e fluxo institucional em tempo real no terminal DinhEuro.',
      keywords:
        'tape reading ao vivo, fluxo de ordens, livro de ofertas dom, times and trades, agressão institucional, ações da b3',
    },
    en: {
      title: 'Order Flow, Tape Reading, Depth of Market (DOM) & Time and Sales | DinhEuro',
      description:
        'Monitor institutional Depth of Market (DOM), aggressive buyer/seller volume delta, and real-time Time & Sales microstructure.',
      keywords:
        'order flow terminal, tape reading, depth of market dom, time and sales, liquidity delta',
    },
    es: {
      title: 'Flujo de Órdenes, Tape Reading, Libro de Ofertas (DOM) y Times & Trades | DinhEuro',
      description:
        'Supervisa el libro de ofertas (DOM), saldo de agresión institucional y flujo de operaciones en tiempo real.',
      keywords:
        'tape reading, flujo de ordenes, libro de ofertas dom, times and trades',
    },
  },
  renda_fixa: {
    pt: {
      title: 'Modelo Black-Scholes Opções, Projeção Taxa Selic, IPCA e Renda Fixa | DinhEuro',
      description:
        'Entenda como funciona o modelo Black-Scholes para opções com gregas em tempo real, acompanhe projeção da Taxa Selic e inflação IPCA, curva DI e Tesouro Direto.',
      keywords:
        'como funciona o modelo black scholes opções, projeção taxa selic e inflação ipca, boletim focus banco central resumo, renda fixa hoje, tesouro direto, curva di futuros, calculadora de opções, cdb lci lca',
    },
    en: {
      title: 'Black-Scholes Options Model, Selic Rate, IPCA Inflation & Fixed Income | DinhEuro',
      description:
        'Learn how the Black-Scholes options pricing model works with live Greeks, analyze sovereign yields, Selic rate and IPCA inflation projections, and yield curves.',
      keywords:
        'black scholes options pricing model, options greeks calculator, selic rate and ipca inflation forecast, fixed income yields, sovereign bonds, yield curve',
    },
    es: {
      title: 'Modelo Black-Scholes Opciones, Proyección Selic, IPCA y Renta Fija | DinhEuro',
      description:
        'Aprende cómo funciona el modelo Black-Scholes de opciones con griegas, analiza proyecciones de tasa Selic e inflación IPCA, bonos soberanos y curva de tasas.',
      keywords:
        'modelo black scholes opciones, proyeccion tasa selic e inflacion ipca, renta fija, bonos soberanos, curva de tasas, calculadora de opciones',
    },
  },
  academy: {
    pt: {
      title: 'DinhEuro Academy — Cursos de Black-Scholes, Câmbio, D3 v7 e Drex',
      description:
        'Trilhas gratuitas sobre como funciona o modelo Black-Scholes em opções, spread bancário e IOF em remessa internacional, gráfico D3 v7, ações da B3 e o que é o Drex.',
      keywords:
        'como funciona o modelo black scholes opções, spread bancário e iof remessa, como enviar remessa internacional mais barata, o que é o drex moeda digital do banco central, gráfico d3 v7 análise técnica, ações da b3 com maior dividendo, curso educação financeira gratuito, dinheuro academy',
    },
    en: {
      title: 'DinhEuro Academy — Free Courses on Black-Scholes, FX, D3 v7 & Macro',
      description:
        'Free financial education tracks covering Black-Scholes options pricing, international money transfer fees, D3 v7 technical analysis, dividend stocks, and digital currencies.',
      keywords:
        'black scholes options guide, international money transfer fees, d3 v7 technical analysis, free financial education, fixed income course, currency hedging guide, dinheuro academy',
    },
    es: {
      title: 'DinhEuro Academy — Cursos Gratis de Black-Scholes, Divisas y Análisis Técnico',
      description:
        'Rutas educativas gratuitas sobre modelo Black-Scholes, spread bancario e IOF en remesas, gráfico D3 v7, acciones con dividendos y moneda digital Drex.',
      keywords:
        'modelo black scholes opciones, remesa internacional barata, analisis tecnico d3 v7, cursos finanzas gratis, renta fija, cobertura cambiaria, dinheuro academy',
    },
  },
  carteiras: {
    pt: {
      title: 'Minhas Carteiras — Ações B3, EUA, Europa e Câmbio Multi-Moeda | DinhEuro',
      description:
        'Consolide ações da B3 com maior dividendo, ações americanas e europeias, Bitcoin e saldo em Euro e Dólar com gráfico histórico Recharts e dupla conversão em tempo real.',
      keywords:
        'carteira de investimentos, ações da b3 com maior dividendo, ações americanas e europeias em tempo real, consolidador multi moeda, patrimônio em dólar e euro',
    },
    en: {
      title: 'Multi-Currency Portfolio Tracker in BRL, EUR & USD | DinhEuro',
      description:
        'Track US and European equities, Brazilian dividend stocks, currencies, and crypto holdings with Recharts historical curves across USD, EUR, and BRL.',
      keywords:
        'portfolio tracker, multi currency portfolio, us and european stocks, global asset allocation, usd eur brl tracker',
    },
    es: {
      title: 'Mis Carteras — Seguimiento Multidivisa en Real, Euro y Dólar | DinhEuro',
      description:
        'Organiza tus inversiones en acciones globales, B3, divisas y criptomonedas con curvas históricas Recharts y conversión simultánea en EUR, USD y BRL.',
      keywords:
        'cartera de inversiones, seguimiento multidivisa, patrimonio en dolares y euros',
    },
  },
  corretoras: {
    pt: {
      title: 'Conta Global Internacional para Viagens, Remessas e Corretoras B3 | DinhEuro',
      description:
        'Compare conta global internacional para viagens, como enviar remessa internacional mais barata com menor spread bancário e IOF, corretoras da B3 e custódia nos EUA/Europa.',
      keywords:
        'conta global internacional para viagens, como enviar remessa internacional mais barata, spread bancário e iof remessa, corretoras internacionais, corretoras b3, proteção sipc, investir no exterior',
    },
    en: {
      title: 'Global & Brazilian Brokers Directory — Custody & FX Comparison | DinhEuro',
      description:
        'Compare regulated international and Brazilian brokerages, global multi-currency accounts, SIPC custody protection, and direct links.',
      keywords:
        'global brokers, international brokerage directory, multi currency accounts, sipc protection',
    },
    es: {
      title: 'Brókeres Globales y de Brasil — Directorio de Custodia y Divisas | DinhEuro',
      description:
        'Compara brókeres internacionales regulados y plataformas brasileñas con cuentas multidivisa y protección de custodia.',
      keywords:
        'brokeres globales, invertir en el exterior, cuentas multidivisa, proteccion sipc',
    },
  },
  sobre: {
    pt: {
      title: 'Sobre o DinhEuro — Missão, Fontes de Dados e Arquitetura Financeira',
      description:
        'Conheça a metodologia de cotações em tempo real, transparência editorial e canais institucionais do portal financeiro DinhEuro.',
      keywords: 'sobre dinheuro, portal financeiro, metodologia de cotações, canal institucional',
    },
    en: {
      title: 'About DinhEuro — Mission, Market Data Feeds & Transparency',
      description:
        'Learn about DinhEuro methodology, real-time FX and equity data feeds, editorial independence, and institutional contact channels.',
      keywords: 'about dinheuro, financial hub, live data methodology, editorial transparency',
    },
    es: {
      title: 'Acerca de DinhEuro — Misión, Fuentes de Datos y Transparencia',
      description:
        'Conoce la metodología de cotizaciones en tiempo real, transparencia editorial y canales institucionales de DinhEuro.',
      keywords: 'acerca de dinheuro, portal financiero, metodologia de cotizaciones',
    },
  },
  termos: {
    pt: {
      title: 'Termos de Uso | DinhEuro',
      description: 'Condições gerais de acesso e utilização do portal financeiro informativo DinhEuro.',
      keywords: 'termos de uso, dinheuro, condições de acesso',
    },
    en: {
      title: 'Terms of Use | DinhEuro',
      description: 'General terms and conditions governing access to the DinhEuro financial portal.',
      keywords: 'terms of use, dinheuro, legal terms',
    },
    es: {
      title: 'Términos de Uso | DinhEuro',
      description: 'Condiciones generales de acceso y uso del portal financiero informativo DinhEuro.',
      keywords: 'terminos de uso, dinheuro, condiciones legales',
    },
  },
  privacidade: {
    pt: {
      title: 'Política de Privacidade & LGPD | DinhEuro',
      description: 'Saiba como o DinhEuro protege sua privacidade em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
      keywords: 'política de privacidade, lgpd, proteção de dados, dinheuro',
    },
    en: {
      title: 'Privacy Policy & Data Protection | DinhEuro',
      description: 'Learn how DinhEuro protects user privacy in compliance with LGPD and international standards.',
      keywords: 'privacy policy, data protection, lgpd, dinheuro',
    },
    es: {
      title: 'Política de Privacidad & Protección de Datos | DinhEuro',
      description: 'Conoce cómo DinhEuro protege tu privacidad conforme a la legislación vigente de protección de datos.',
      keywords: 'politica de privacidad, proteccion de datos, lgpd, dinheuro',
    },
  },
  cookies: {
    pt: {
      title: 'Política de Cookies | DinhEuro',
      description: 'Detalhes sobre o uso de cookies técnicos, preferências locais, análises de tráfego e publicidade no DinhEuro.',
      keywords: 'política de cookies, preferências de privacidade, dinheuro',
    },
    en: {
      title: 'Cookie Policy | DinhEuro',
      description: 'Details on technical cookies, local preferences, traffic analytics, and advertising disclosures on DinhEuro.',
      keywords: 'cookie policy, privacy preferences, dinheuro',
    },
    es: {
      title: 'Política de Cookies | DinhEuro',
      description: 'Detalles sobre el uso de cookies técnicas, preferencias locales y análisis en DinhEuro.',
      keywords: 'politica de cookies, privacidad, dinheuro',
    },
  },
  disclaimer: {
    pt: {
      title: 'Aviso Legal e Isenção de Responsabilidade Financeira | DinhEuro',
      description: 'Informações sobre caráter estritamente educacional e informativo dos dados e simuladores do DinhEuro.',
      keywords: 'disclaimer financeiro, aviso de risco, dinheuro',
    },
    en: {
      title: 'Legal Disclaimer & Financial Risk Disclosure | DinhEuro',
      description: 'Important disclosure on the strictly informational and educational nature of quotes and tools on DinhEuro.',
      keywords: 'financial disclaimer, risk disclosure, dinheuro',
    },
    es: {
      title: 'Aviso Legal y Exención de Responsabilidad Financiera | DinhEuro',
      description: 'Información sobre el carácter estrictamente informativo y educativo de los datos y herramientas de DinhEuro.',
      keywords: 'aviso legal, exencion financiera, dinheuro',
    },
  },
};

/**
 * Constrói a URL canônica oficial para o domínio https://dinheuro.com
 * - Home ('/' ou vazio): 'https://dinheuro.com/'
 * - Sub-rotas: sem barra final e sem query/hash (ex: 'https://dinheuro.com/mercados')
 */
export function buildCanonicalUrl(routePath: string): string {
  const cleanPath = (routePath || '/')
    .split('?')[0]
    .split('#')[0]
    .trim();

  if (!cleanPath || cleanPath === '/') {
    return `${CANONICAL_ORIGIN}/`;
  }

  const withLeadingSlash = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const withoutTrailingSlash = withLeadingSlash.replace(/\/+$/, '');

  return withoutTrailingSlash ? `${CANONICAL_ORIGIN}${withoutTrailingSlash}` : `${CANONICAL_ORIGIN}/`;
}

/**
 * Normaliza um pathname para lookup no mapa de rotas (ex: '/mercados/' -> '/mercados').
 */
export function normalizeRoutePath(pathname: string): string {
  const clean = (pathname || '/').split('?')[0].split('#')[0].toLowerCase().trim();
  if (!clean || clean === '/') return '/';
  const normalized = clean.replace(/\/+$/, '');
  return normalized || '/';
}

/**
 * Garante exatamente uma tag <link rel="canonical"> no <head> com o href atualizado para a rota atual.
 */
export function syncCanonicalLink(
  routePath: string,
  doc: Document | undefined = typeof document !== 'undefined' ? document : undefined
): string {
  const canonicalHref = buildCanonicalUrl(routePath);
  if (!doc || !doc.head) return canonicalHref;

  const existingLinks = Array.from(doc.head.querySelectorAll('link[rel="canonical"]')) as HTMLLinkElement[];

  if (existingLinks.length > 0) {
    const primary = existingLinks[0];
    if (primary.getAttribute('href') !== canonicalHref) {
      primary.setAttribute('href', canonicalHref);
    }
    // Remove eventuais duplicatas garantindo estritamente 1 tag canonical no <head>
    for (let i = 1; i < existingLinks.length; i++) {
      existingLinks[i].parentNode?.removeChild(existingLinks[i]);
    }
  } else {
    const link = doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalHref);
    doc.head.appendChild(link);
  }

  return canonicalHref;
}

/**
 * Garante as tags globais <link rel="alternate" hreflang="..."> (pt-BR, en, es, x-default)
 * no <head>, removendo eventuais duplicatas e apontando para a URL canônica da rota atual.
 */
export function syncHreflangLinks(
  routePath: string,
  doc: Document | undefined = typeof document !== 'undefined' ? document : undefined
): Array<{ hreflang: string; href: string }> {
  const canonicalHref = buildCanonicalUrl(routePath);
  const targets = GLOBAL_HREFLANG_TARGETS.map((hreflang) => ({
    hreflang,
    href: canonicalHref,
  }));

  if (!doc || !doc.head) return targets;

  const existingAlternates = Array.from(
    doc.head.querySelectorAll('link[rel="alternate"][hreflang]')
  ) as HTMLLinkElement[];

  const byLang = new Map<string, HTMLLinkElement>();
  for (const el of existingAlternates) {
    const code = el.getAttribute('hreflang');
    if (code && GLOBAL_HREFLANG_TARGETS.includes(code as (typeof GLOBAL_HREFLANG_TARGETS)[number]) && !byLang.has(code)) {
      byLang.set(code, el);
    } else {
      el.parentNode?.removeChild(el);
    }
  }

  for (const { hreflang, href } of targets) {
    const existing = byLang.get(hreflang);
    if (existing) {
      if (existing.getAttribute('href') !== href) {
        existing.setAttribute('href', href);
      }
    } else {
      const link = doc.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      doc.head.appendChild(link);
    }
  }

  return targets;
}

/**
 * Dispara o evento page_view do Google Analytics (gtag.js) de forma não bloqueante
 * nas transições de rota do PWA para capturar origem geográfica e navegação global.
 */
export function trackAnalyticsPageView(
  routePath: string,
  pageTitle: string,
  canonicalUrl?: string,
  win: (Window & { gtag?: (...args: unknown[]) => void }) | undefined =
    typeof window !== 'undefined' ? (window as Window & { gtag?: (...args: unknown[]) => void }) : undefined
): boolean {
  if (!win || typeof win.gtag !== 'function') return false;
  const pageLocation = canonicalUrl || buildCanonicalUrl(routePath);
  try {
    win.gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: normalizeRoutePath(routePath),
    });
    return true;
  } catch {
    return false;
  }
}

function upsertMetaTag(
  doc: Document,
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
) {
  if (!doc.head) return;
  let meta = doc.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = doc.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    doc.head.appendChild(meta);
  }
  if (meta.getAttribute('content') !== content) {
    meta.setAttribute('content', content);
  }
}

export function buildStructuredDataSchemas(lang: SupportedLanguage = 'pt') {
  const homeEntry = ROUTE_SEO_METADATA.dashboard[lang] || ROUTE_SEO_METADATA.dashboard.pt;
  const orgDescription =
    lang === 'en'
      ? 'Global portal for financial intelligence, foreign exchange, and macroeconomic monitoring focused on commercial and monetary integration between the European Union and Mercosur.'
      : lang === 'es'
      ? 'Portal global de inteligencia financiera, divisas y seguimiento macroeconómico con foco en la integración comercial y monetaria entre la Unión Europea y Mercosur.'
      : 'Portal global de inteligência financeira, câmbio e acompanhamento macroeconômico com foco na integração comercial e monetária entre União Europeia e Mercosul.';

  const knowsAboutTopics =
    lang === 'en'
      ? [
          'Global Financial Markets',
          'European Union-Mercosur Agreement',
          'EUR/BRL Exchange Rate',
          'ECB and Central Bank Monetary Policy',
          'Foreign Trade',
          'Macroeconomics',
        ]
      : lang === 'es'
      ? [
          'Mercado Financiero Global',
          'Acuerdo Unión Europea-Mercosur',
          'Tipo de Cambio EUR/BRL',
          'Política Monetaria BCE y Banco Central',
          'Comercio Exterior',
          'Macroeconomía',
        ]
      : [
          'Mercado Financeiro Global',
          'Acordo União Europeia-Mercosul',
          'Câmbio EUR/BRL',
          'Política Monetária BCE e Banco Central',
          'Comércio Exterior',
          'Macroeconomia',
        ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': `${CANONICAL_ORIGIN}/#organization`,
    name: 'DinhEuro',
    url: CANONICAL_ORIGIN,
    email: 'admin@dinheuro.com',
    logo: {
      '@type': 'ImageObject',
      url: `${CANONICAL_ORIGIN}/logo.png`,
    },
    areaServed: 'Worldwide',
    inLanguage: ['pt-BR', 'en', 'es'],
    description: orgDescription,
    knowsAbout: knowsAboutTopics,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_ORIGIN}/#website`,
    name: 'DinhEuro',
    alternateName: ['DinhEuro Global Financial Hub', 'DinhEuro Câmbio e Mercados'],
    url: CANONICAL_ORIGIN,
    publisher: {
      '@id': `${CANONICAL_ORIGIN}/#organization`,
    },
    inLanguage: ['pt-BR', 'en', 'es'],
    description: orgDescription,
    knowsAbout: knowsAboutTopics,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${CANONICAL_ORIGIN}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const financialServiceSchema = {
    '@context': 'https://schema.org',
    '@type': ['FinancialService', 'WebApplication'],
    '@id': `${CANONICAL_ORIGIN}/#webapp`,
    name: 'DinhEuro',
    url: CANONICAL_ORIGIN,
    logo: `${CANONICAL_ORIGIN}/logo.png`,
    image: `${CANONICAL_ORIGIN}/logo.png`,
    provider: {
      '@id': `${CANONICAL_ORIGIN}/#organization`,
    },
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    inLanguage: ['pt-BR', 'en', 'es'],
    areaServed: 'Worldwide',
    description: homeEntry.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    serviceType: [
      'Real-Time Currency Converter',
      'Live Forex and Equity Quotes',
      'Fixed Income and Financial Calculators',
      'Free Financial Education Academy',
    ],
  };

  return { organizationSchema, websiteSchema, financialServiceSchema };
}

export interface EditorialArticleSchemaInput {
  id: string;
  headline: string;
  description: string;
  articleSection?: string;
  datePublished?: string;
  authorName?: string;
  publisherSourceName?: string;
  imageUrl?: string;
  url?: string;
  articleBody?: string;
  keywords?: string[];
  schemaType?: 'NewsArticle' | 'Article';
}

export function getInstitutionalDossiersSchemaInputs(
  lang: SupportedLanguage = 'pt'
): EditorialArticleSchemaInput[] {
  if (lang === 'en') {
    return [
      {
        id: 'dossier-boletim-focus',
        schemaType: 'Article',
        headline: 'Brazil Central Bank Focus Market Readout Summary: Selic Rate & IPCA Projections',
        description:
          'Institutional summary of the Central Bank of Brazil Focus Report with Selic interest rate, IPCA inflation, GDP, and USD/BRL exchange rate projections.',
        articleSection: 'Macroeconomics & Central Bank',
        datePublished: '2026-11-17',
        authorName: 'DinhEuro Research',
        url: `${CANONICAL_ORIGIN}/`,
        imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
        keywords: ['central bank focus report summary', 'selic rate forecast', 'ipca inflation'],
      },
      {
        id: 'dossier-drex-bc',
        schemaType: 'Article',
        headline: 'Drex Digital Currency Dossier: How the Central Bank of Brazil CBDC Works',
        description:
          'Complete institutional guide explaining what Drex is, Hyperledger Besu smart-contract architecture, privacy guarantees, and tokenized financial settlement.',
        articleSection: 'CBDC & Financial Innovation',
        datePublished: '2026-11-17',
        authorName: 'DinhEuro Research',
        url: `${CANONICAL_ORIGIN}/`,
        imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
        keywords: ['what is drex central bank digital currency', 'tokenized real', 'cbdc brazil'],
      },
      {
        id: 'dossier-mercosul-ue',
        schemaType: 'Article',
        headline: 'Mercosur–European Union Trade Agreement Dossier: Economic Impact & Tariffs',
        description:
          'Chapter-by-chapter analysis of the Mercosur–European Union trade accord, tariff elimination schedules, 700M+ consumer bloc, and bilateral investment impact.',
        articleSection: 'International Trade & Geopolitics',
        datePublished: '2026-11-17',
        authorName: 'DinhEuro Research',
        url: `${CANONICAL_ORIGIN}/`,
        imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
        keywords: ['mercosur eu trade agreement economic impact', 'tariff elimination', 'eur brl trade'],
      },
    ];
  }

  if (lang === 'es') {
    return [
      {
        id: 'dossier-boletim-focus',
        schemaType: 'Article',
        headline: 'Resumen del Boletín Focus del Banco Central: Proyección Tasa Selic e Inflación IPCA',
        description:
          'Síntesis oficial del Boletín Focus del Banco Central de Brasil con proyecciones de tasa Selic, inflación IPCA, PIB y tipo de cambio.',
        articleSection: 'Macroeconomía y Banco Central',
        datePublished: '2026-11-17',
        authorName: 'Redacción DinhEuro',
        url: `${CANONICAL_ORIGIN}/`,
        imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
        keywords: ['boletin focus banco central resumen', 'proyeccion tasa selic e inflacion ipca'],
      },
      {
        id: 'dossier-drex-bc',
        schemaType: 'Article',
        headline: 'Dossier Drex: Qué es la Moneda Digital del Banco Central de Brasil y Cómo Funciona',
        description:
          'Análisis técnico e institucional sobre el Drex, contratos inteligentes, privacidad bancaria y liquidación financiera tokenizada.',
        articleSection: 'Monedas Digitales CBDC',
        datePublished: '2026-11-17',
        authorName: 'Redacción DinhEuro',
        url: `${CANONICAL_ORIGIN}/`,
        imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
        keywords: ['que es el drex moneda digital del banco central', 'real digital'],
      },
      {
        id: 'dossier-mercosul-ue',
        schemaType: 'Article',
        headline: 'Dossier Acuerdo Mercosur–Unión Europea: Impacto Económico y Comercio Exterior',
        description:
          'Estudio capítulo a capítulo del Acuerdo Mercosur–Unión Europea, desgravación arancelaria, mercado de 700 millones de consumidores e inversión bilateral.',
        articleSection: 'Comercio Exterior y Geopolítica',
        datePublished: '2026-11-17',
        authorName: 'Redacción DinhEuro',
        url: `${CANONICAL_ORIGIN}/`,
        imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
        keywords: ['acuerdo mercosur union europea impacto economico', 'comercio internacional'],
      },
    ];
  }

  return [
    {
      id: 'dossier-boletim-focus',
      schemaType: 'Article',
      headline: 'Boletim Focus Banco Central Resumo: Projeção Taxa Selic e Inflação IPCA',
      description:
        'Resumo institucional do Relatório Focus do Banco Central do Brasil com projeções de taxa Selic, inflação IPCA, PIB e câmbio USD/BRL.',
      articleSection: 'Macroeconomia & Banco Central',
      datePublished: '2026-11-17',
      authorName: 'Redação DinhEuro',
      url: `${CANONICAL_ORIGIN}/`,
      imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
      keywords: ['boletim focus banco central resumo', 'projeção taxa selic e inflação ipca'],
    },
    {
      id: 'dossier-drex-bc',
      schemaType: 'Article',
      headline: 'O que é o Drex: Dossiê da Moeda Digital do Banco Central (BC)',
      description:
        'Guia técnico e institucional sobre o que é o Drex, moeda digital do Banco Central do Brasil, infraestrutura de contratos inteligentes e privacidade.',
      articleSection: 'Inovação Financeira & CBDC',
      datePublished: '2026-11-17',
      authorName: 'Redação DinhEuro',
      url: `${CANONICAL_ORIGIN}/`,
      imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
      keywords: ['o que é o drex moeda digital do banco central', 'real digital'],
    },
    {
      id: 'dossier-mercosul-ue',
      schemaType: 'Article',
      headline: 'Acordo Mercosul–União Europeia: Dossiê sobre Impacto Econômico e Tarifas',
      description:
        'Análise capítulo a capítulo do Acordo Mercosul–União Europeia, impacto econômico no comércio exterior, desgravação tarifária e mercado de 700 milhões de pessoas.',
      articleSection: 'Comércio Exterior & Geopolítica',
      datePublished: '2026-11-17',
      authorName: 'Redação DinhEuro',
      url: `${CANONICAL_ORIGIN}/`,
      imageUrl: `${CANONICAL_ORIGIN}/logo.png`,
      keywords: ['acordo mercosul união europeia impacto econômico', 'comércio exterior'],
    },
  ];
}

function resolveAbsoluteImageUrl(imageUrl?: string): string {
  if (!imageUrl) return `${CANONICAL_ORIGIN}/logo.png`;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  const clean = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl.replace(/^\.\//, '')}`;
  return `${CANONICAL_ORIGIN}${clean}`;
}

export function buildEditorialArticlesSchema(
  lang: SupportedLanguage = 'pt',
  articles: EditorialArticleSchemaInput[],
  focusedArticle?: EditorialArticleSchemaInput | null
) {
  const inLanguage = lang === 'pt' ? 'pt-BR' : lang;
  const publisherRef = {
    '@type': 'Organization',
    '@id': `${CANONICAL_ORIGIN}/#organization`,
    name: 'DinhEuro',
    url: `${CANONICAL_ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${CANONICAL_ORIGIN}/logo.png`,
    },
  };

  const toArticleNode = (item: EditorialArticleSchemaInput) => ({
    '@type': item.schemaType || 'NewsArticle',
    headline: item.headline,
    description: item.description,
    ...(item.articleSection ? { articleSection: item.articleSection } : {}),
    ...(item.datePublished ? { datePublished: item.datePublished, dateModified: item.datePublished } : {}),
    inLanguage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': item.url || `${CANONICAL_ORIGIN}/`,
    },
    image: [resolveAbsoluteImageUrl(item.imageUrl)],
    author: {
      '@type': 'Organization',
      name: item.authorName || 'Redação DinhEuro',
    },
    publisher: publisherRef,
    ...(item.articleBody ? { articleBody: item.articleBody } : {}),
    ...(item.keywords && item.keywords.length > 0 ? { keywords: item.keywords.join(', ') } : {}),
    isAccessibleForFree: true,
  });

  if (focusedArticle) {
    return {
      '@context': 'https://schema.org',
      ...toArticleNode(focusedArticle),
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name:
      lang === 'en'
        ? 'DinhEuro Daily Insights & Macroeconomic Dossiers'
        : lang === 'es'
        ? 'DinhEuro Insights del Día y Dossiers Macroeconómicos'
        : 'DinhEuro Insights do Dia & Dossiês Macroeconômicos',
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: articles.length,
    itemListElement: articles.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: toArticleNode(item),
    })),
  };
}

function upsertJsonLdScript(doc: Document, schemaKey: string, payload: unknown) {
  if (!doc.head) return;
  let scriptEl = doc.head.querySelector(
    `script[type="application/ld+json"][data-dinheuro-schema="${schemaKey}"]`
  ) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = doc.createElement('script');
    scriptEl.type = 'application/ld+json';
    scriptEl.setAttribute('data-dinheuro-schema', schemaKey);
    doc.head.appendChild(scriptEl);
  }
  const serialized = JSON.stringify(payload);
  if (scriptEl.textContent !== serialized) {
    scriptEl.textContent = serialized;
  }
}

export function syncEditorialArticlesSchema(
  lang: SupportedLanguage = 'pt',
  articles: EditorialArticleSchemaInput[],
  focusedArticle: EditorialArticleSchemaInput | null = null,
  doc: Document | undefined = typeof document !== 'undefined' ? document : undefined
) {
  if (!doc || !doc.head) return null;
  const payload = buildEditorialArticlesSchema(lang, articles, focusedArticle);
  upsertJsonLdScript(doc, 'editorial-articles', payload);
  return payload;
}

export function syncRouteHeadMetadata(
  tab: NavigationTab,
  lang: SupportedLanguage = 'pt',
  doc: Document | undefined = typeof document !== 'undefined' ? document : undefined
): RouteSeoEntry & { canonicalUrl: string } {
  const routePath = TAB_ROUTE_MAP[tab] || '/';
  const canonicalUrl = syncCanonicalLink(routePath, doc);
  syncHreflangLinks(routePath, doc);
  const tabMap = ROUTE_SEO_METADATA[tab] || ROUTE_SEO_METADATA.dashboard;
  const entry = tabMap[lang] || tabMap.pt;

  if (!doc || !doc.head) {
    return { ...entry, canonicalUrl };
  }

  doc.title = entry.title;

  upsertMetaTag(doc, 'name', 'description', entry.description);
  upsertMetaTag(doc, 'name', 'keywords', entry.keywords);

  upsertMetaTag(doc, 'property', 'og:type', 'website');
  upsertMetaTag(doc, 'property', 'og:site_name', 'DinhEuro');
  upsertMetaTag(doc, 'property', 'og:locale', OG_LOCALE_MAP[lang]);
  upsertMetaTag(doc, 'property', 'og:title', entry.title);
  upsertMetaTag(doc, 'property', 'og:description', entry.description);
  upsertMetaTag(doc, 'property', 'og:url', canonicalUrl);
  upsertMetaTag(doc, 'property', 'og:image', `${CANONICAL_ORIGIN}/logo.png`);

  upsertMetaTag(doc, 'name', 'twitter:card', 'summary_large_image');
  upsertMetaTag(doc, 'name', 'twitter:title', entry.title);
  upsertMetaTag(doc, 'name', 'twitter:description', entry.description);
  upsertMetaTag(doc, 'name', 'twitter:url', canonicalUrl);
  upsertMetaTag(doc, 'name', 'twitter:image', `${CANONICAL_ORIGIN}/logo.png`);

  const { organizationSchema, websiteSchema, financialServiceSchema } =
    buildStructuredDataSchemas(lang);
  upsertJsonLdScript(doc, 'organization', organizationSchema);
  upsertJsonLdScript(doc, 'website', websiteSchema);
  upsertJsonLdScript(doc, 'financial-service', financialServiceSchema);

  return { ...entry, canonicalUrl };
}
