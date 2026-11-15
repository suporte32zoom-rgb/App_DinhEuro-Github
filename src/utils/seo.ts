import { TAB_ROUTE_MAP, type NavigationTab } from '../context/MarketContext';
import type { SupportedLanguage } from '../i18n/translations';

export const CANONICAL_ORIGIN = 'https://dinheuro.com';

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
      title: 'DinhEuro — Cotação Dólar Hoje, Euro Hoje, Real, Cripto e Bolsas em Tempo Real',
      description:
        'Acompanhe a cotação do Euro hoje, valor do Dólar comercial em Real, Ibovespa, S&P 500, Bitcoin, Boletim Focus e conversor de moedas em tempo real no DinhEuro.',
      keywords:
        'cotação euro hoje, dólar hoje, eur brl, usd brl, conversor de moedas, ibovespa hoje, s&p 500, criptomoedas tempo real, dinheuro',
    },
    en: {
      title: 'DinhEuro — Live USD/BRL, EUR/BRL Exchange Rates, Global Markets & Financial Hub',
      description:
        'Live USD/BRL and EUR/BRL exchange rates, real-time Euro to Brazilian Real converter, S&P 500, Nasdaq, Ibovespa, cryptocurrencies, and macro analysis on DinhEuro.',
      keywords:
        'live usd brl, eur brl exchange rate, euro to brazilian real, currency converter, global markets, s&p 500, ibovespa, crypto quotes, dinheuro',
    },
    es: {
      title: 'DinhEuro — Cotización Dólar Hoy, Euro Hoy, Real, Cripto y Bolsas en Tiempo Real',
      description:
        'Sigue la cotización del Euro hoy, valor del Dólar comercial en Real brasileño, Ibovespa, S&P 500, Bitcoin y conversor de divisas en tiempo real en DinhEuro.',
      keywords:
        'cotizacion euro hoy, dolar hoy, eur brl, usd brl, conversor de divisas, mercados globales, criptomonedas en vivo, dinheuro',
    },
  },
  mercados: {
    pt: {
      title: 'Ibovespa Hoje, S&P 500, Nasdaq, Forex e Índices Globais ao Vivo | DinhEuro',
      description:
        'Cotações em tempo real do Ibovespa, ações da B3, Wall Street (S&P 500 e Nasdaq), pares Forex, criptomoedas e commodities globais.',
      keywords:
        'ibovespa hoje, s&p 500 ao vivo, nasdaq hoje, ações b3, ações eua, forex tempo real, commodities, criptomoedas',
    },
    en: {
      title: 'Live Ibovespa, S&P 500, Nasdaq, Forex & Global Market Indices | DinhEuro',
      description:
        'Real-time quotes for S&P 500, Nasdaq, Brazil B3 equities, Ibovespa, major Forex pairs, cryptocurrencies, and global commodities.',
      keywords:
        's&p 500 live, nasdaq quotes, ibovespa today, brazilian stocks b3, forex pairs, global indices, cryptocurrencies',
    },
    es: {
      title: 'Ibovespa Hoy, S&P 500, Nasdaq, Forex e Índices Globales en Vivo | DinhEuro',
      description:
        'Cotizaciones en tiempo real de Ibovespa, acciones B3, S&P 500, Nasdaq, pares Forex, criptomonedas y materias primas globales.',
      keywords:
        'ibovespa hoy, s&p 500 en vivo, nasdaq hoy, acciones brasil b3, forex, indices globales, criptomonedas',
    },
  },
  ferramentas: {
    pt: {
      title: 'Conversor de Euro para Real Hoje, Calculadora de Dólar, Juros Compostos e Câmbio | DinhEuro',
      description:
        'Converta Euro para Real (EUR/BRL) e Dólar hoje em tempo real, simule remessas com IOF e spread, calcule juros compostos, inflação e imposto DARF.',
      keywords:
        'conversor de euro para real hoje, calculadora de dólar, calculadora de câmbio, eur para brl, juros compostos, simulador darf',
    },
    en: {
      title: 'Live Euro to BRL Converter, Dollar Calculator, Compound Interest & FX Tools | DinhEuro',
      description:
        'Convert Euro to Brazilian Real (EUR/BRL) and USD in real time, model remittance spread and taxes, compound interest, and inflation impact.',
      keywords:
        'euro to brl converter, dollar to real calculator, fx converter, compound interest calculator, inflation calculator, dinheuro',
    },
    es: {
      title: 'Conversor de Euro a Real Hoy, Calculadora de Dólar, Interés Compuesto y Divisas | DinhEuro',
      description:
        'Convierte Euro a Real brasileño (EUR/BRL) y Dólar en tiempo real, simula costos de envío internacional, interés compuesto e inflación.',
      keywords:
        'conversor de euro a real hoy, calculadora de dolar, conversor de divisas, interes compuesto, calculadora financiera',
    },
  },
  noticias: {
    pt: {
      title: 'Notícias Financeiras, Macroeconomia, Copom, Fed e BCE ao Vivo | DinhEuro',
      description:
        'Últimas notícias e análises macroeconômicas sobre câmbio, taxa Selic, Federal Reserve, Banco Central Europeu, B3 e mercados globais.',
      keywords:
        'notícias financeiras hoje, macroeconomia, boletim focus, copom selic, federal reserve, bce euro, mercado financeiro',
    },
    en: {
      title: 'Financial News, Macroeconomics, Fed, ECB & Brazil Central Bank Live | DinhEuro',
      description:
        'Breaking macroeconomic coverage on global FX markets, Federal Reserve, ECB, Brazil Selic policy, equities, and commodities.',
      keywords:
        'financial news live, macroeconomics, federal reserve, ecb rate, brazil central bank, forex news',
    },
    es: {
      title: 'Noticias Financieras, Macroeconomía, Fed, BCE y Bancos Centrales | DinhEuro',
      description:
        'Últimas noticias y análisis macroeconómicos sobre divisas, Reserva Federal, Banco Central Europeo, tasa Selic y bolsas mundiales.',
      keywords:
        'noticias financieras hoy, macroeconomia, reserva federal, bce euro, bolsas mundiales, divisas',
    },
  },
  graficos: {
    pt: {
      title: 'Gráficos Avançados de Velas, Médias Móveis, B3, Ações EUA e Cripto | DinhEuro',
      description:
        'Terminal gráfico interativo de candlesticks com médias móveis, volume e análise técnica para Forex, ações B3, Wall Street e criptoativos.',
      keywords:
        'gráfico de velas ao vivo, análise técnica, médias móveis, gráfico dólar, gráfico bitcoin, gráfico ações b3',
    },
    en: {
      title: 'Advanced Candlestick Charts, Moving Averages, FX, Equities & Crypto | DinhEuro',
      description:
        'Interactive candlestick terminal with moving averages, volume overlays, and technical analysis across Forex, US/Brazil equities, and crypto.',
      keywords:
        'candlestick charts, technical analysis terminal, moving averages, forex charts, bitcoin chart, stock charts',
    },
    es: {
      title: 'Gráficos Avanzados de Velas, Medias Móviles, Forex, Acciones y Cripto | DinhEuro',
      description:
        'Terminal gráfico interactivo de velas japonesas con medias móviles, volumen y análisis técnico para divisas, acciones y criptoactivos.',
      keywords:
        'graficos de velas en vivo, analisis tecnico, medias moviles, grafico dolar, grafico bitcoin',
    },
  },
  daytrade: {
    pt: {
      title: 'Terminal Day Trade & Scalping, Mini-Índice, Mini-Dólar e S&P 500 ao Vivo | DinhEuro',
      description:
        'Ambiente de alta performance para leitura intraday de Mini-Índice (WIN), Mini-Dólar (WDO), S&P 500 e ativos de liquidez global.',
      keywords:
        'terminal day trade, scalping b3, mini índice win, mini dólar wdo, leitura intraday, s&p 500 ao vivo',
    },
    en: {
      title: 'Day Trade & Scalping Terminal, Index Futures, FX & Intraday Flow | DinhEuro',
      description:
        'High-precision intraday terminal for index futures, currency scalping, volatility tracking, and real-time order execution simulation.',
      keywords:
        'day trade terminal, scalping workstation, futures trading, intraday fx, s&p 500 live',
    },
    es: {
      title: 'Terminal Day Trade & Scalping, Futuros de Índices y Divisas en Vivo | DinhEuro',
      description:
        'Entorno de alta precisión para operativa intradía en futuros de índices, dólar comercial y pares de alta liquidez.',
      keywords:
        'terminal day trade, scalping en vivo, futuros de indices, intradia forex',
    },
  },
  tape_reading: {
    pt: {
      title: 'Fluxo de Ordens, Tape Reading, Livro de Ofertas (DOM) e Times & Trades | DinhEuro',
      description:
        'Acompanhe o livro de ofertas (DOM), saldo de agressão compradora e vendedora e fluxo institucional em tempo real no terminal DinhEuro.',
      keywords:
        'tape reading ao vivo, fluxo de ordens, livro de ofertas dom, times and trades, agressão institucional',
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
      title: 'Renda Fixa, Tesouro Direto, Curva DI, Selic e Calculadora de Opções | DinhEuro',
      description:
        'Simule títulos do Tesouro Direto, CDB, LCI/LCA, curva de juros futuros DI, juro real e precificação Black-Scholes de opções com gregas.',
      keywords:
        'renda fixa hoje, tesouro direto, taxa selic 2026, curva di futuros, calculadora de opções, black scholes, cdb lci lca',
    },
    en: {
      title: 'Fixed Income, Government Bonds, Yield Curves & Options Black-Scholes | DinhEuro',
      description:
        'Analyze sovereign bonds, real yield calculations, forward rate curves, and Black-Scholes options pricing with Delta, Gamma, Theta, and Vega.',
      keywords:
        'fixed income yields, sovereign bonds, yield curve, options calculator, black scholes greeks',
    },
    es: {
      title: 'Renta Fija, Bonos Soberanos, Curva de Tasas y Calculadora de Opciones | DinhEuro',
      description:
        'Simula rendimientos reales de renta fija, curvas de tasas de interés y valoración Black-Scholes de opciones con griegas.',
      keywords:
        'renta fija, bonos soberanos, curva de tasas, calculadora de opciones, black scholes',
    },
  },
  academy: {
    pt: {
      title: 'DinhEuro Academy — Cursos Gratuitos de Renda Fixa, Câmbio, Ações e Opções',
      description:
        'Trilhas gratuitas de educação financeira sobre Renda Fixa & Tesouro Direto, Câmbio e Dólar, Análise Técnica, Cripto, Fluxo e Opções.',
      keywords:
        'curso educação financeira gratuito, aprender renda fixa, curso câmbio e dólar, curso análise técnica, tape reading, dinheuro academy',
    },
    en: {
      title: 'DinhEuro Academy — Free Courses on Fixed Income, FX, Equities & Options',
      description:
        '100% free structured financial education tracks covering fixed income, global currency hedging, technical analysis, crypto risk, and derivatives.',
      keywords:
        'free financial education, fixed income course, currency hedging guide, technical analysis, options trading, dinheuro academy',
    },
    es: {
      title: 'DinhEuro Academy — Cursos Gratuitos de Renta Fija, Divisas, Acciones y Opciones',
      description:
        'Rutas educativas gratuitas sobre renta fija, cobertura cambiaria en euros y dólares, análisis técnico, criptoactivos y derivados.',
      keywords:
        'cursos finanzas gratis, renta fija, cobertura cambiaria, analisis tecnico, opciones financieras, dinheuro academy',
    },
  },
  carteiras: {
    pt: {
      title: 'Minhas Carteiras — Consolidador Multi-Moeda em Real, Euro e Dólar | DinhEuro',
      description:
        'Gerencie sua carteira de ações B3, Wall Street, câmbio e criptoativos com conversão automática entre Real, Euro e Dólar.',
      keywords:
        'carteira de investimentos, consolidador multi moeda, patrimônio em dólar e euro, controle de ações',
    },
    en: {
      title: 'Multi-Currency Portfolio Tracker in BRL, EUR & USD | DinhEuro',
      description:
        'Track global equities, Brazilian stocks, currencies, and crypto holdings with real-time conversion across USD, EUR, and BRL.',
      keywords:
        'portfolio tracker, multi currency portfolio, global asset allocation, usd eur brl tracker',
    },
    es: {
      title: 'Mis Carteras — Seguimiento Multidivisa en Real, Euro y Dólar | DinhEuro',
      description:
        'Organiza tus inversiones en acciones globales, B3, divisas y criptomonedas con conversión simultánea en EUR, USD y BRL.',
      keywords:
        'cartera de inversiones, seguimiento multidivisa, patrimonio en dolares y euros',
    },
  },
  corretoras: {
    pt: {
      title: 'Corretoras Globais & Brasileiras — Comparativo de Custódia e Câmbio | DinhEuro',
      description:
        'Diretório de corretoras internacionais (EUA/Europa) e brasileiras (B3), contas globais, proteção SIPC e acesso direto aos canais oficiais.',
      keywords:
        'corretoras internacionais, corretoras b3, conta global dólar euro, proteção sipc, investir no exterior',
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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_ORIGIN}/#website`,
    name: 'DinhEuro',
    alternateName: ['DinhEuro Global Financial Hub', 'DinhEuro Câmbio e Mercados'],
    url: `${CANONICAL_ORIGIN}/`,
    inLanguage: ['pt-BR', 'en', 'es'],
    description: homeEntry.description,
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
    url: `${CANONICAL_ORIGIN}/`,
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

  return { websiteSchema, financialServiceSchema };
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

export function syncRouteHeadMetadata(
  tab: NavigationTab,
  lang: SupportedLanguage = 'pt',
  doc: Document | undefined = typeof document !== 'undefined' ? document : undefined
): RouteSeoEntry & { canonicalUrl: string } {
  const routePath = TAB_ROUTE_MAP[tab] || '/';
  const canonicalUrl = syncCanonicalLink(routePath, doc);
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

  upsertMetaTag(doc, 'name', 'twitter:card', 'summary_large_image');
  upsertMetaTag(doc, 'name', 'twitter:title', entry.title);
  upsertMetaTag(doc, 'name', 'twitter:description', entry.description);
  upsertMetaTag(doc, 'name', 'twitter:url', canonicalUrl);

  const { websiteSchema, financialServiceSchema } = buildStructuredDataSchemas(lang);
  upsertJsonLdScript(doc, 'website', websiteSchema);
  upsertJsonLdScript(doc, 'financial-service', financialServiceSchema);

  return { ...entry, canonicalUrl };
}
