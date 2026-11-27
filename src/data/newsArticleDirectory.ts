import { DAILY_INSIGHTS_ITEMS, type DailyInsightItem } from './dailyInsights';
import {
  NEWS_EDITORIAL_ARTICLES,
  type NewsEditorialArticle,
  type NewsEditorialCategory,
} from './newsEditorialArticles';
import type { SupportedLanguage } from '../i18n/translations';

export interface PublishedNewsArticle extends DailyInsightItem {
  categories?: NewsEditorialCategory[];
}

export interface ArticleFaqItem {
  question: string;
  answer: string;
}

const mergedMap = new Map<string, PublishedNewsArticle>();

for (const article of NEWS_EDITORIAL_ARTICLES) {
  mergedMap.set(article.id, article);
}

for (const insight of DAILY_INSIGHTS_ITEMS) {
  if (!mergedMap.has(insight.id)) {
    mergedMap.set(insight.id, insight);
  }
}

export const PUBLISHED_ARTICLES: PublishedNewsArticle[] = Array.from(mergedMap.values()).sort(
  (a, b) => (b.isoDate || '').localeCompare(a.isoDate || '')
);

export const PUBLISHED_ARTICLE_SLUGS: string[] = PUBLISHED_ARTICLES.map((item) => item.id);

export function getPublishedArticleBySlug(
  slug: string | null | undefined
): PublishedNewsArticle | null {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();
  if (!clean) return null;
  return mergedMap.get(clean) ?? null;
}

function tokenizeTheme(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 4)
  );
}

export function getRelatedArticles(
  currentSlug: string,
  lang: SupportedLanguage = 'pt',
  limit: number = 3
): PublishedNewsArticle[] {
  const current = getPublishedArticleBySlug(currentSlug);
  const candidates = PUBLISHED_ARTICLES.filter((item) => item.id !== currentSlug);
  if (!current) {
    return candidates.slice(0, limit);
  }

  const currentLoc = current.translations[lang];
  const currentCategories = new Set(
    (current as Partial<NewsEditorialArticle>).categories || []
  );
  const currentTokens = tokenizeTheme(
    `${currentLoc.title} ${currentLoc.tag} ${(currentLoc.keywords || []).join(' ')}`
  );

  const scored = candidates.map((candidate) => {
    const candLoc = candidate.translations[lang];
    const candCategories = (candidate as Partial<NewsEditorialArticle>).categories || [];
    let score = 0;

    for (const cat of candCategories) {
      if (currentCategories.has(cat)) {
        score += 5;
      }
    }

    const candTokens = tokenizeTheme(
      `${candLoc.title} ${candLoc.tag} ${(candLoc.keywords || []).join(' ')}`
    );
    for (const token of candTokens) {
      if (currentTokens.has(token)) {
        score += 2;
      }
    }

    if (candLoc.tag.toLowerCase() === currentLoc.tag.toLowerCase()) {
      score += 3;
    }

    return { candidate, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.candidate.isoDate || '').localeCompare(a.candidate.isoDate || '');
  });

  return scored.slice(0, limit).map((entry) => entry.candidate);
}

type TopicBucket =
  | 'fiscal_ministry'
  | 'trade_tariffs'
  | 'monetary_rates'
  | 'fx_trade'
  | 'b3_commodities'
  | 'digital_drex'
  | 'mercosur_eu'
  | 'tech_ai'
  | 'climate_energy'
  | 'crypto_infra'
  | 'europe_society'
  | 'geopolitics';

function detectTopicBucket(article: PublishedNewsArticle): TopicBucket {
  const id = article.id.toLowerCase();
  if (id.includes('trabuco') || id.includes('pacote-fiscal')) return 'fiscal_ministry';
  if (id.includes('tarifas') || id.includes('salvaguardas') || id.includes('terras-raras')) {
    return 'trade_tariffs';
  }
  if (id.includes('politica-fiscal-monetaria') || id.includes('selic-focus')) {
    return 'monetary_rates';
  }
  if (id.includes('cambio-comercial') || id.includes('aladi')) return 'fx_trade';
  if (id.includes('b3-commodities')) return 'b3_commodities';
  if (id.includes('drex')) return 'digital_drex';
  if (id.includes('mercosul-ue') || id.includes('ue-mercosul')) return 'mercosur_eu';
  if (id.includes('nvidia') || id.includes('anthropic')) return 'tech_ai';
  if (id.includes('cop31')) return 'climate_energy';
  if (id.includes('coinbase') || id.includes('deribit')) return 'crypto_infra';
  if (id.includes('greves-jovens')) return 'europe_society';
  return 'geopolitics';
}

export function getArticleFaqs(
  article: PublishedNewsArticle,
  lang: SupportedLanguage
): ArticleFaqItem[] {
  const loc = article.translations[lang];
  const topic = detectTopicBucket(article);

  if (lang === 'en') {
    const baseTopicFaqs: Record<TopicBucket, ArticleFaqItem[]> = {
      fiscal_ministry: [
        {
          question: 'How do fiscal announcements and cabinet appointments affect USD/BRL and EUR/BRL?',
          answer:
            'Foreign exchange reacts immediately to perceived budget credibility and sovereign risk. Signals of predictable spending control typically narrow risk premia on Brazil yield curves, easing pressure on the U.S. dollar and commercial euro against the real.',
        },
        {
          question: 'Why does the trajectory of gross public debt matter for long-term interest rates?',
          answer:
            'Investors price future DI contracts according to debt-to-GDP projections and annual interest costs. Credible primary balance paths reduce term risk premia, lowering corporate borrowing benchmarks and supporting equity valuations.',
        },
        {
          question: 'Where can readers monitor the market impact of this report on DinhEuro?',
          answer:
            'You can track live USD/BRL, EUR/BRL, Ibovespa performance, and multi-currency equivalents continuously in the Markets and Charts sections, or simulate remittance spreads in the Financial Tools area.',
        },
        {
          question: 'Does this analysis represent an investment recommendation?',
          answer:
            'No. DinhEuro publishes purely educational and informational macroeconomic reporting based on institutional data and public policy records, without financial advisory or asset recommendations.',
        },
      ],
      trade_tariffs: [
        {
          question: 'How can new import tariffs or bilateral safeguards impact exporting companies?',
          answer:
            'Additional import duties alter landed price competitiveness, squeeze supplier margins, or redirect export flows toward alternative markets, directly influencing sector stocks and bilateral trade balances.',
        },
        {
          question: 'What is the connection between trade disputes and commercial exchange rates?',
          answer:
            'Trade restrictions that weigh on export revenues can affect expected foreign currency inflows, adding short-term volatility to emerging and partner currencies relative to USD and EUR.',
        },
        {
          question: 'Why are critical minerals and agro-industrial quotas central in trade talks?',
          answer:
            'Strategic supply chains—such as rare earths, aerospace, sugar, and critical raw materials—anchor industrial competitiveness and tariff negotiations across major economic blocs.',
        },
        {
          question: 'How does DinhEuro verify facts in international trade coverage?',
          answer:
            'Reports rely on official trade ministries, bilateral treaty documentation, customs bulletins, and institutional economic research cited directly in each article.',
        },
      ],
      monetary_rates: [
        {
          question: 'How do Selic and ECB interest rate paths influence exchange rates?',
          answer:
            'The interest-rate differential between Brazil, the Eurozone, and the United States guides cross-border capital allocation. Narrowing or widening rate spreads directly shapes EUR/BRL and USD/BRL pricing.',
        },
        {
          question: 'Why does coordination between fiscal and monetary policy affect credit costs?',
          answer:
            'When fiscal trajectories align with inflation targets, central banks face lower pressure to keep benchmark rates restrictive, helping anchor forward yield curves and lower household and business credit costs.',
        },
        {
          question: 'What role does the Focus readout play in forward rate expectations?',
          answer:
            'Market consensus projections for IPCA inflation, Selic, GDP, and exchange rates serve as a key thermometer for fixed-income pricing and inflation-linked bond strategies.',
        },
        {
          question: 'Can I compare real yields and sovereign benchmarks directly on the portal?',
          answer:
            'Yes. Visit the Monetary Policy and Fixed Income sections on DinhEuro to examine interactive calculators, real yield comparisons, and central bank frameworks.',
        },
      ],
      fx_trade: [
        {
          question: 'What differentiates commercial exchange rates from tourism or remittance quotes?',
          answer:
            'The commercial rate reflects interbank wholesale settlement for trade and capital flows, whereas retail tourism or international transfers incorporate institution spreads and applicable taxes.',
        },
        {
          question: 'How do export agreements in Latin America and Europe affect currency demand?',
          answer:
            'Regional tariff preferences and higher value-added exports diversify foreign exchange inflows beyond raw commodities, strengthening bilateral commercial settlements.',
        },
        {
          question: 'Which macroeconomic indicators move EUR/BRL and USD/BRL most sharply intraday?',
          answer:
            'Inflation surprises, central bank policy statements, trade balance releases, and fiscal votes are the primary catalysts driving intraday FX repricing.',
        },
        {
          question: 'How can users estimate international transfer totals accurately?',
          answer:
            'The DinhEuro FX & Remittance Guide and Currency Converter allow instant calculations across live commercial rates, spreads, and tax scenarios.',
        },
      ],
      b3_commodities: [
        {
          question: 'Why are foreign capital inflows and commodities so decisive for Brazil’s B3?',
          answer:
            'Large-cap exporters in oil, iron ore, and agribusiness carry heavy index weight on the B3, making global commodity cycles and international institutional flows primary drivers of daily index direction.',
        },
        {
          question: 'How do Brent crude and iron ore prices relate to the Brazilian real?',
          answer:
            'Stronger commodity terms of trade improve Brazil’s external accounts and export receipts, often providing fundamental support to the local currency.',
        },
        {
          question: 'How can readers follow global equities alongside B3 leaders?',
          answer:
            'The Markets hub and Interactive Charts terminal group Brazilian, U.S., European, and Asia-Pacific equities alongside commodities and FX in real time.',
        },
        {
          question: 'Are historical valuations and risk disclosures clearly stated?',
          answer:
            'Yes. All DinhEuro market analyses are educational in scope and encourage cross-checking official exchange filings and regulatory documents.',
        },
      ],
      digital_drex: [
        {
          question: 'What distinguishes Drex from Pix for everyday users and financial institutions?',
          answer:
            'While Pix settles instant retail payments in traditional bank balances, Drex focuses on programmable wholesale and tokenized asset settlement using smart contracts under Central Bank oversight.',
        },
        {
          question: 'How are privacy and banking secrecy addressed in Brazil’s CBDC pilot?',
          answer:
            'Technical pilot phases prioritize cryptographic privacy mechanisms to ensure transaction settlement complies with LGPD and Brazilian banking secrecy legislation.',
        },
        {
          question: 'Could tokenized settlement change fixed income and FX efficiency?',
          answer:
            'Delivery-versus-payment protocols aim to lower settlement counterparty risk and operational friction across sovereign bonds, credit, and regulated financial instruments.',
        },
        {
          question: 'Where can I explore the full institutional Drex dossier?',
          answer:
            'You can read the technical Drex dossier directly on the DinhEuro homepage or explore dedicated infrastructure lessons in DinhEuro Academy.',
        },
      ],
      mercosur_eu: [
        {
          question: 'Why is the Mercosur–European Union agreement strategically relevant for 2026–2040?',
          answer:
            'Integrating a market exceeding 700 million consumers reshapes tariff schedules across agriculture, manufacturing, critical minerals, and services between both continents.',
        },
        {
          question: 'Which sectors see the largest projected trade and investment shifts?',
          answer:
            'European machinery, industrial inputs, and specialized manufacturing gain phased tariff access, while Mercosur agribusiness, metals, and sustainable value chains expand export quotas.',
        },
        {
          question: 'How can companies and analysts review official trade implementation milestones?',
          answer:
            'Ministry of Foreign Trade (MDIC) bulletins and European Commission impact studies track ratification stages, tariff phase-out calendars, and safeguard consultations.',
        },
        {
          question: 'Does the accord influence EUR/BRL structural dynamics over time?',
          answer:
            'Deeper bilateral trade and direct foreign investment flows over multi-year horizons strengthen commercial and financial ties between euro and real-denominated economies.',
        },
      ],
      tech_ai: [
        {
          question: 'Why do semiconductor leadership and AI IPOs shift global equity sentiment?',
          answer:
            'Mega-cap technology and AI infrastructure leaders represent substantial weight across U.S. benchmarks, influencing institutional risk appetite, capital expenditure cycles, and tech valuations globally.',
        },
        {
          question: 'How should investors read valuation volatility around flagship AI listings?',
          answer:
            'Public debuts of high-growth AI firms test market assumptions about compute margins, recurring enterprise revenue, and capital intensity across market cycles.',
        },
        {
          question: 'Can I monitor U.S. and European tech stocks live on DinhEuro?',
          answer:
            'Yes. Global technology shares, major indices, and technical charts are available in real time across the Markets and Charts sections.',
        },
        {
          question: 'Is this coverage intended as buy or sell advice on technology stocks?',
          answer:
            'No. All articles provide neutral market context and structural analysis for informational and educational study only.',
        },
      ],
      climate_energy: [
        {
          question: 'How do global climate summits affect energy markets and sovereign financing?',
          answer:
            'Multilateral negotiations on transition finance, carbon pricing, and grid investments influence capital allocation across renewables, hydrocarbons, and sovereign green debt.',
        },
        {
          question: 'Why does the deadlock over climate finance matter for emerging economies?',
          answer:
            'Predictable concessional funding and private co-investment determine the pace at which developing nations modernize grids and meet decarbonization targets without fiscal strain.',
        },
        {
          question: 'Which commodities respond fastest to energy transition policy shifts?',
          answer:
            'Brent crude, natural gas, copper, lithium, and critical minerals frequently react to policy signals on transition timelines and supply-chain incentives.',
        },
        {
          question: 'Where does DinhEuro track commodities linked to energy transition?',
          answer:
            'Commodity benchmarks and macro coverage are accessible continuously through the Markets dashboard and News & Macro section.',
        },
      ],
      crypto_infra: [
        {
          question: 'Why are derivatives platforms central to institutional crypto market structure?',
          answer:
            'Options and futures liquidity allow institutional desks to hedge volatility, manage basis risk, and structure disciplined portfolio exposure beyond spot holdings.',
        },
        {
          question: 'How does consolidation in digital asset infrastructure affect market maturity?',
          answer:
            'Integrating regulated custody, clearing, and options books increases transparency and operational resilience across spot and derivative venues.',
        },
        {
          question: 'Can users monitor major crypto assets in BRL, EUR, and USD on DinhEuro?',
          answer:
            'Yes. Major digital assets display synchronized multi-currency pricing and interactive historical curves across the portal.',
        },
        {
          question: 'Does digital asset coverage carry risk disclosures?',
          answer:
            'Always. Digital assets exhibit high volatility and regulatory differences; DinhEuro publishes informational analysis strictly without investment recommendations.',
        },
      ],
      europe_society: [
        {
          question: 'How do cost-of-living pressures and labor tensions affect European macro outlooks?',
          answer:
            'Housing costs, real wage erosion, and public-service disruptions feed directly into European fiscal debates, productivity outlooks, and ECB inflation monitoring.',
        },
        {
          question: 'What is the link between European domestic demand and ECB monetary policy?',
          answer:
            'Wage negotiations and consumer sentiment help determine whether services inflation cools sustainably enough for interest-rate normalization.',
        },
        {
          question: 'Why does European economic stability matter for Mercosur partners?',
          answer:
            'The European Union is a cornerstone trading and investment partner; European growth and euro stability directly influence transatlantic export demand.',
        },
        {
          question: 'Where can readers track EUR/BRL alongside European stock indices?',
          answer:
            'European indices, equities, and real-time Euro exchange rates are updated continuously across DinhEuro’s Markets and Currency Converter tools.',
        },
      ],
      geopolitics: [
        {
          question: 'How do multilateral summits reshape global trade and currency expectations?',
          answer:
            'High-level diplomatic talks on tariffs, technology supply chains, and regional corridors recalibrate risk premia across equities, commodities, and major reserve currencies.',
        },
        {
          question: 'Why do supply-chain corridors in Asia-Pacific matter to global investors?',
          answer:
            'Manufacturing, semiconductor trade, and shipping routes across Asia-Pacific anchor global inflation trends and industrial input costs.',
        },
        {
          question: 'How does DinhEuro synthesize geopolitical events for financial readers?',
          answer:
            'Our editorial coverage connects institutional declarations directly to measurable transmission channels—exchange rates, bond yields, and equity sectors.',
        },
        {
          question: 'Are all institutional sources referenced transparently?',
          answer:
            'Yes. Each dedicated article states its reference institutions and publication context for independent verification.',
        },
      ],
    };

    const specificFirst: ArticleFaqItem = {
      question: `What is the core takeaway of "${loc.title}"?`,
      answer: `${loc.summary} Readers can review the full data, institutional context, and cross-market implications directly in the sections above.`,
    };

    return [specificFirst, ...baseTopicFaqs[topic].slice(0, 3)];
  }

  if (lang === 'es') {
    const baseTopicFaqs: Record<TopicBucket, ArticleFaqItem[]> = {
      fiscal_ministry: [
        {
          question: '¿Cómo influyen los anuncios fiscales y designaciones económicas en el USD/BRL y EUR/BRL?',
          answer:
            'El mercado cambiario reacciona de inmediato a la credibilidad fiscal y al riesgo soberano. Las señales de disciplina presupuestaria suelen comprimir la prima de riesgo y moderar la presión sobre el dólar y el euro.',
        },
        {
          question: '¿Por qué la trayectoria de la deuda pública bruta condiciona las tasas de interés futuras?',
          answer:
            'Los contratos futuros de tasas incorporan las proyecciones de deuda/PIB y el costo financiero anual. Metas primarias creíbles reducen la inclinación de la curva y mejoran el costo del crédito.',
        },
        {
          question: '¿Dónde seguir en vivo las cotizaciones citadas en este análisis dentro de DinhEuro?',
          answer:
            'Puedes consultar USD/BRL, EUR/BRL, Ibovespa y acciones globales en tiempo real en Mercados y Gráficos, o simular remesas en Herramientas.',
        },
        {
          question: '¿Este contenido editorial constituye asesoramiento financiero?',
          answer:
            'No. DinhEuro publica análisis estrictamente informativos y educativos basados en fuentes institucionales, sin recomendaciones de compra o venta de activos.',
        },
      ],
      trade_tariffs: [
        {
          question: '¿Cómo impactan los nuevos aranceles o salvaguardas bilaterales en los sectores exportadores?',
          answer:
            'Los recargos arancelarios o ajustes de cuotas modifican la competitividad de precios, presionan márgenes sectoriales y reorientan flujos comerciales hacia mercados alternativos.',
        },
        {
          question: '¿Qué relación existe entre tensiones comerciales y tipo de cambio comercial?',
          answer:
            'Restricciones sobre sectores clave afectan las expectativas de ingreso de divisas por exportaciones y elevan la volatilidad cambiaria frente al dólar y al euro.',
        },
        {
          question: '¿Por qué los minerales críticos y cuotas agroindustriales son centrales en las negociaciones?',
          answer:
            'Cadenas estratégicas como tierras raras, aeronáutica, azúcar y materias primas críticas definen la seguridad industrial entre bloques comerciales.',
        },
        {
          question: '¿Qué fuentes respaldan la cobertura de comercio exterior de DinhEuro?',
          answer:
            'Cada informe cita organismos oficiales de comercio, comunicados ministeriales y estudios institucionales de referencia.',
        },
      ],
      monetary_rates: [
        {
          question: '¿Cómo influye el diferencial entre la tasa Selic y las tasas del BCE en el tipo de cambio?',
          answer:
            'El diferencial de tasas orienta los flujos globales de capital. Cambios esperados entre Brasil, la Eurozona y EE. UU. impactan directamente en la cotización EUR/BRL y USD/BRL.',
        },
        {
          question: '¿Por qué la coordinación fiscal-monetaria reduce el costo del crédito?',
          answer:
            'Cuando las cuentas públicas anclan las expectativas de inflación, la autoridad monetaria dispone de mayor margen para estabilizar las tasas de interés reales.',
        },
        {
          question: '¿Para qué sirve seguir las proyecciones del Boletín Focus?',
          answer:
            'Reúne la mediana de expectativas de mercado para inflación IPCA, Selic, PIB y cambio, sirviendo como termómetro clave para la renta fija.',
        },
        {
          question: '¿Dónde profundizar sobre tasas reales y renta fija en el portal?',
          answer:
            'En las secciones Política Monetaria y Renta Fija y Derivados encontrarás calculadoras y guías educativas detalladas.',
        },
      ],
      fx_trade: [
        {
          question: '¿Cuál es la diferencia entre cambio comercial y cotizaciones para remesas o turismo?',
          answer:
            'El cambio comercial refleja operaciones mayoristas e interbancarias de comercio exterior, mientras que las operaciones minoristas incluyen spread institucional e impuestos aplicables.',
        },
        {
          question: '¿Cómo favorecen los acuerdos regionales las exportaciones de mayor valor agregado?',
          answer:
            'Preferencias arancelarias y normas técnicas armonizadas reducen costos de entrada y diversifican la balanza comercial más allá de materias primas básicas.',
        },
        {
          question: '¿Qué datos mueven con mayor fuerza el EUR/BRL y USD/BRL intradía?',
          answer:
            'Lecturas de inflación, decisiones de bancos centrales, balanza comercial y votaciones fiscales son los principales catalizadores.',
        },
        {
          question: '¿Cómo simular costos efectivos de envío internacional en DinhEuro?',
          answer:
            'La Guía de Cambio y Remesas y la Calculadora Universal permiten comparar tasas en tiempo real, spreads e impuestos.',
        },
      ],
      b3_commodities: [
        {
          question: '¿Por qué el flujo extranjero y las materias primas pesan tanto en el Ibovespa?',
          answer:
            'Grandes exportadoras de petróleo, mineral de hierro y agronegocio concentran una fracción relevante del índice, vinculando la bolsa brasileña al ciclo global.',
        },
        {
          question: '¿Cómo se relacionan el crudo Brent y el mineral de hierro con el real brasileño?',
          answer:
            'Mejores precios internacionales fortalecen los términos de intercambio y el saldo comercial externo, brindando soporte fundamental a la moneda local.',
        },
        {
          question: '¿Puedo comparar acciones brasileñas con bolsas de EE. UU. y Europa?',
          answer:
            'Sí. La sección Mercados y los Gráficos D3 muestran activos globales en paralelo con conversión multidivisa.',
        },
        {
          question: '¿El análisis incluye recomendaciones de inversión en bolsa?',
          answer:
            'No. Todo el contenido tiene finalidad educativa e informativa para comprender la dinámica de mercados.',
        },
      ],
      digital_drex: [
        {
          question: '¿Qué diferencia al Drex de los sistemas de pago instantáneo como Pix?',
          answer:
            'Pix procesa pagos minoristas tradicionales, mientras que el Drex habilita infraestructura mayorista programable con contratos inteligentes y liquidación de activos tokenizados.',
        },
        {
          question: '¿Cómo se aborda la privacidad y el secreto bancario en las pruebas del Drex?',
          answer:
            'Los pilotos priorizan soluciones criptográficas compatibles con la legislación de protección de datos y secreto financiero antes de habilitar operaciones abiertas.',
        },
        {
          question: '¿Qué beneficios puede aportar la tokenización a la renta fija y divisas?',
          answer:
            'La liquidación atómica reduce riesgos de contraparte, plazos operativos y costos de transacción en títulos públicos y crédito.',
        },
        {
          question: '¿Dónde consultar el dossier completo del Drex en DinhEuro?',
          answer:
            'El dossier institucional del Drex está disponible en la página principal y en los módulos educativos de DinhEuro Academy.',
        },
      ],
      mercosur_eu: [
        {
          question: '¿Por qué el acuerdo Mercosur–Unión Europea es clave en el horizonte 2026–2040?',
          answer:
            'Crea una zona comercial de más de 700 millones de consumidores con desgravación arancelaria gradual en bienes industriales, agroindustria, servicios y materias primas críticas.',
        },
        {
          question: '¿Qué sectores proyectan los mayores cambios en comercio bilateral?',
          answer:
            'Maquinaria, química e industria europea ganan acceso preferencial, mientras cadenas agroalimentarias y minerales estratégicos del Mercosur amplían cuotas de exportación.',
        },
        {
          question: '¿Cómo afectan las salvaguardas y reglamentos a la implementación práctica?',
          answer:
            'Consultas públicas, reglas de origen y mecanismos de salvaguarda bilateral buscan equilibrar la apertura comercial con la protección de sectores sensibles.',
        },
        {
          question: '¿Dónde seguir indicadores macro del eje Europa–Mercosur?',
          answer:
            'El Radar Unión Europea–Mercosur en el panel principal reúne estadísticas comerciales, cambios y noticias clave.',
        },
      ],
      tech_ai: [
        {
          question: '¿Por qué el liderazgo en semiconductores e IA impacta en los índices globales?',
          answer:
            'Las principales empresas tecnológicas ponderan fuertemente en EE. UU., marcando expectativas de inversión en centros de datos y apetito global por riesgo.',
        },
        {
          question: '¿Qué evalúa el mercado ante grandes salidas a bolsa de inteligencia artificial?',
          answer:
            'Los inversores analizan márgenes de cómputo, recurrencia de ingresos corporativos y disciplina de capital frente a tasas de interés vigentes.',
        },
        {
          question: '¿Se pueden seguir acciones tecnológicas estadounidenses y europeas en DinhEuro?',
          answer:
            'Sí, la sección Mercados y los gráficos interactivos monitorean cotizaciones globales en tiempo real.',
        },
        {
          question: '¿Esta nota sugiere comprar o vender acciones tecnológicas?',
          answer:
            'No. Es un análisis periodístico y educativo sobre estructura de mercado y hechos corporativos.',
        },
      ],
      climate_energy: [
        {
          question: '¿Cómo influyen las cumbres climáticas en los mercados de energía y materias primas?',
          answer:
            'Definiciones sobre financiamiento de transición, redes eléctricas y metas de descarbonización orientan inversiones en renovables, hidrocarburos y minerales críticos.',
        },
        {
          question: '¿Por qué el debate sobre financiamiento climático es decisivo para países emergentes?',
          answer:
            'El acceso a capital en condiciones previsibles condiciona la velocidad de modernización energética sin presionar cuentas fiscales locales.',
        },
        {
          question: '¿Qué commodities reaccionan primero ante cambios en política energética?',
          answer:
            'Petróleo Brent, gas natural, cobre y minerales críticos suelen reflejar rápidamente ajustes en expectativas de oferta y transición.',
        },
        {
          question: '¿Dónde seguir precios de materias primas en tiempo real?',
          answer:
            'En el tablero de Mercados de DinhEuro encontrarás cotizaciones actualizadas y conversión automática.',
        },
      ],
      crypto_infra: [
        {
          question: '¿Por qué los derivados son esenciales en la infraestructura cripto institucional?',
          answer:
            'Opciones y futuros permiten cubrir volatilidad, gestionar riesgos de cartera y mejorar el descubrimiento de precios más allá del mercado al contado.',
        },
        {
          question: '¿Qué indica la consolidación entre plataformas de custodia y derivados?',
          answer:
            'Refleja la búsqueda de escala regulatoria, liquidez integrada y estándares operativos próximos a las finanzas tradicionales.',
        },
        {
          question: '¿Dónde seguir Bitcoin y otros criptoactivos en EUR, USD y BRL?',
          answer:
            'DinhEuro actualiza las principales criptomonedas en tiempo real con visualización multidivisa.',
        },
        {
          question: '¿Qué precauciones recuerda el portal sobre activos digitales?',
          answer:
            'Los criptoactivos presentan elevada volatilidad y cambios regulatorios; toda cobertura del portal es estrictamente informativa.',
        },
      ],
      europe_society: [
        {
          question: '¿Cómo afectan las tensiones por el costo de vida a la economía europea?',
          answer:
            'La pérdida de poder adquisitivo, el costo habitacional y las huelgas repercuten en el consumo interno, presupuestos fiscales y proyecciones de productividad.',
        },
        {
          question: '¿Qué observa el BCE en el mercado laboral europeo?',
          answer:
            'La evolución de salarios y precios de servicios resulta clave para calibrar el ritmo de las tasas de interés en la Eurozona.',
        },
        {
          question: '¿Por qué la coyuntura europea importa al comercio exterior brasileño?',
          answer:
            'La Unión Europea es uno de los mayores socios comerciales de Brasil, influyendo en la demanda exportadora y la estabilidad del euro.',
        },
        {
          question: '¿Dónde monitorear índices europeos y EUR/BRL en vivo?',
          answer:
            'En Mercados y el Conversor Universal de DinhEuro puedes seguir las plazas europeas y el tipo de cambio en tiempo real.',
        },
      ],
      geopolitics: [
        {
          question: '¿Cómo influyen las cumbres multilaterales en divisas, comercio y bolsas?',
          answer:
            'Acuerdos o fricciones sobre aranceles, cadenas tecnológicas y rutas comerciales modifican las primas de riesgo y las proyecciones de crecimiento global.',
        },
        {
          question: '¿Por qué los corredores de Asia-Pacífico impactan en la inflación mundial?',
          answer:
            'La concentración manufacturera y logística de la región condiciona precios de insumos industriales y fletes internacionales.',
        },
        {
          question: '¿Cómo aborda DinhEuro los acontecimientos geopolíticos?',
          answer:
            'Conectando las declaraciones institucionales con sus canales concretos hacia tipo de cambio, tasas de interés y mercados bursátiles.',
        },
        {
          question: '¿Las fuentes están debidamente identificadas?',
          answer:
            'Sí, cada artículo detalla sus fuentes institucionales de referencia para consulta independiente.',
        },
      ],
    };

    const specificFirst: ArticleFaqItem = {
      question: `¿Cuál es el punto central de "${loc.title}"?`,
      answer: `${loc.summary} El desarrollo completo, cifras e implicaciones para los mercados se detallan en el cuerpo íntegro del artículo.`,
    };

    return [specificFirst, ...baseTopicFaqs[topic].slice(0, 3)];
  }

  // Portuguese (PT)
  const baseTopicFaqs: Record<TopicBucket, ArticleFaqItem[]> = {
    fiscal_ministry: [
      {
        question: 'Como anúncios fiscais e nomes da equipe econômica afetam o dólar (USD/BRL) e o euro (EUR/BRL)?',
        answer:
          'O câmbio responde rapidamente à percepção de previsibilidade orçamentária e risco soberano. Sinais técnicos de controle de gastos e articulação política tendem a comprimir prêmios na curva de juros e aliviar a pressão sobre o real.',
      },
      {
        question: 'Por que a trajetória da dívida bruta é o principal termômetro dos juros futuros?',
        answer:
          'Os contratos de DI futuro incorporam a evolução da dívida/PIB e o custo anual dos juros sobre o orçamento. Metas primárias críveis reduzem a incerteza de longo prazo e ajudam a destravar o crédito produtivo.',
      },
      {
        question: 'Onde acompanhar ao vivo as cotações e impactos citados nesta reportagem?',
        answer:
          'No DinhEuro você acompanha USD/BRL, EUR/BRL, Ibovespa e bolsas globais em tempo real nas abas Mercados e Gráficos, além de simular custos cambiais na seção Ferramentas.',
      },
      {
        question: 'Esta reportagem constitui recomendação de compra ou venda de ativos?',
        answer:
          'Não. Todo o conteúdo editorial do DinhEuro possui caráter estritamente informativo e educacional, apoiado em registros institucionais e dados econômicos, sem consultoria financeira.',
      },
    ],
    trade_tariffs: [
      {
        question: 'Como novas tarifas aduaneiras ou alterações de cotas impactam empresas exportadoras?',
        answer:
          'Sobretaxas e restrições de cota alteram a competitividade de preço no destino, comprimem margens operacionais e exigem redirecionamento comercial ou negociações bilaterais.',
      },
      {
        question: 'Qual é a relação entre disputas comerciais e a volatilidade do câmbio comercial?',
        answer:
          'Barreiras comerciais sobre pautas estratégicas influenciam a expectativa de entrada de divisas pela balança comercial, gerando ajustes nas cotações frente ao dólar e ao euro.',
      },
      {
        question: 'Por que setores industriais e minerais críticos ganham peso nas negociações bilaterais?',
        answer:
          'Cadeias como aeronáutica, açúcar, terras raras e insumos de transição energética concentram valor estratégico e sensibilidade regulatória entre blocos econômicos.',
      },
      {
        question: 'Quais fontes embasam a cobertura de comércio exterior do DinhEuro?',
        answer:
          'As matérias partem de documentos oficiais de órgãos de comércio exterior, consultas públicas, boletins ministeriais e pesquisas setoriais indicadas em cada artigo.',
      },
    ],
    monetary_rates: [
      {
        question: 'Como o diferencial entre a Taxa Selic e os juros do BCE influencia o EUR/BRL e o USD/BRL?',
        answer:
          'O diferencial de juros entre Brasil, Zona do Euro e Estados Unidos orienta fluxos internacionais de capital. Mudanças nas expectativas dos bancos centrais reprecificam rapidamente os pares cambiais.',
      },
      {
        question: 'Por que o equilíbrio entre política fiscal e monetária reduz o custo do crédito?',
        answer:
          'Com maior ancoragem fiscal e previsibilidade orçamentária, o Banco Central enfrenta menor pressão inflacionária, favorecendo taxas de juros futuras mais baixas para famílias e empresas.',
      },
      {
        question: 'Para que serve acompanhar o Boletim Focus e a curva de juros?',
        answer:
          'O Focus consolida as projeções de mercado para IPCA, Selic, PIB e câmbio, funcionando como referência prática para decisões de renda fixa e planejamento financeiro.',
      },
      {
        question: 'Onde aprofundar o estudo sobre Selic, IPCA e renda fixa no portal?',
        answer:
          'As abas Política Monetária e Renda Fija & Derivativos reúnem explicações detalhadas, glossário técnico e simuladores interativos gratuitos.',
      },
    ],
    fx_trade: [
      {
        question: 'Qual a diferença prática entre câmbio comercial, turismo e remessas internacionais?',
        answer:
          'O câmbio comercial reflete transações interbancárias de comércio exterior e fluxo financeiro, enquanto operações de varejo incluem spread da instituição e alíquotas de IOF aplicáveis.',
      },
      {
        question: 'Como acordos regionais fortalecem exportações de maior valor agregado?',
        answer:
          'Preferências tarifárias e convergência regulatória reduzem custos de acesso a mercados vizinhos e diversificam a pauta exportadora além de commodities primárias.',
      },
      {
        question: 'Quais indicadores mais movimentam o câmbio ao longo do pregão?',
        answer:
          'Divulgações de inflação, comunicados de bancos centrais, balança comercial e votações fiscais concentram os principais movimentos intradiários.',
      },
      {
        question: 'Como calcular o valor líquido de uma conversão ou remessa no DinhEuro?',
        answer:
          'O Guia de Câmbio & Remessas e a Calculadora Universal permitem simular valores em tempo real considerando spread e IOF.',
      },
    ],
    b3_commodities: [
      {
        question: 'Por que o fluxo estrangeiro e as commodities têm peso decisivo no Ibovespa?',
        answer:
          'Empresas de petróleo, mineração e agronegócio respondem por parcela relevante do índice da B3, tornando o apetite institucional externo e os preços globais determinantes para a bolsa brasileira.',
      },
      {
        question: 'Como o petróleo Brent e o minério de ferro influenciam a taxa de câmbio no Brasil?',
        answer:
          'Cotações mais firmes de commodities melhoram os termos de troca e o superávit comercial, ampliando a entrada de moeda estrangeira no país.',
      },
      {
        question: 'É possível comparar ações da B3 com bolsas dos EUA e Europa no portal?',
        answer:
          'Sim. A aba Mercados e o Terminal de Gráficos acompanham 168 ativos globais em tempo real com conversão entre BRL, EUR e USD.',
      },
      {
        question: 'As análises substituem consultoria financeira individual?',
        answer:
          'Não. Todas as análises têm finalidade estritamente informativa e educacional, sem indicação de compra ou venda de ativos.',
      },
    ],
    digital_drex: [
      {
        question: 'Qual a diferença entre o Drex (Real Digital) e o Pix no sistema financeiro brasileiro?',
        answer:
          'O Pix liquida pagamentos instantâneos no varejo com saldo tradicional, enquanto o Drex estrutura uma infraestrutura programável baseada em contratos inteligentes para ativos tokenizados e liquidação financeira.',
      },
      {
        question: 'Como privacidade e sigilo bancário são tratados nos testes do Banco Central?',
        answer:
          'O desenvolvimento prioriza soluções criptográficas capazes de conciliar a rastreabilidade regulatória com as exigências da LGPD e da Lei Complementar nº 105.',
      },
      {
        question: 'Quais ganhos a tokenização pode trazer para renda fixa e câmbio?',
        answer:
          'Protocolos de entrega contra pagamento (DvP) reduzem riscos de contraparte, custos operacionais e prazos de liquidação entre instituições financeiras.',
      },
      {
        question: 'Onde ler o dossiê institucional completo sobre o Drex?',
        answer:
          'O Dossiê Drex está disponível na página inicial do DinhEuro e nos módulos educativos da DinhEuro Academy.',
      },
    ],
    mercosur_eu: [
      {
        question: 'Por que o Acordo Mercosul–União Europeia é estratégico entre 2026 e 2040?',
        answer:
          'A integração tarifária cria uma zona econômica de mais de 700 milhões de consumidores, impulsionando comércio bilateral, investimentos industriais e cadeias agroalimentares e minerais.',
      },
      {
        question: 'Quais setores brasileiros e europeus concentram os maiores impactos econômicos?',
        answer:
          'Bens de capital, químicos e manufatura europeia ganham redução tarifária gradual, enquanto o Mercosul amplia acesso para agronegócio, alimentos e matérias-primas críticas.',
      },
      {
        question: 'Qual o papel das consultas públicas e salvaguardas bilaterais no acordo?',
        answer:
          'Mecanismos de salvaguarda e regras de origem calibram períodos de transição para proteger setores sensíveis durante a abertura comercial.',
      },
      {
        question: 'Onde acompanhar os números atualizados do corredor UE–Mercosul no DinhEuro?',
        answer:
          'O Radar União Europeia – Mercosul na página inicial reúne dados macroeconômicos, câmbio EUR/BRL e análises dedicadas.',
      },
    ],
    tech_ai: [
      {
        question: 'Por que movimentos de gigantes de semicondutores e IPOs de IA impactam bolsas globais?',
        answer:
          'Empresas líderes em computação acelerada e inteligência artificial possuem alto peso nos índices dos EUA, influenciando o apetite global por risco e os investimentos corporativos em tecnologia.',
      },
      {
        question: 'O que o mercado observa em estreias e avaliações bilionárias do setor de IA?',
        answer:
          'Investidores analisam margens de infraestrutura, receita recorrente corporativa e disciplina de capital diante do custo de financiamento vigente.',
      },
      {
        question: 'É possível acompanhar ações de tecnologia dos EUA e Europa ao vivo no DinhEuro?',
        answer:
          'Sim. A aba Mercados e os Gráficos Interativos exibem cotações e variações em tempo real com suporte a múltiplas moedas.',
      },
      {
        question: 'Este material indica compra ou venda de ações de tecnologia?',
        answer:
          'Não. A reportagem apresenta contexto factual e análise estrutural para fins estritamente informativos e educativos.',
      },
    ],
    climate_energy: [
      {
        question: 'Como cúpulas climáticas internacionais afetam mercados de energia e financiamento soberano?',
        answer:
          'Acordos sobre financiamento da transição, redes elétricas e metas de descarbonização orientam fluxos de capital entre energias renováveis, combustíveis tradicionais e títulos sustentáveis.',
      },
      {
        question: 'Por que o impasse financeiro climático impacta economias emergentes?',
        answer:
          'A previsibilidade de recursos internacionais condiciona o ritmo de modernização energética e infraestrutura sem pressionar excessivamente as contas públicas domésticas.',
      },
      {
        question: 'Quais commodities respondem mais rapidamente a sinais da transição energética?',
        answer:
          'Petróleo Brent, gás natural, cobre, lítio e minerais críticos costumam refletir mudanças regulatórias e projeções de demanda industrial.',
      },
      {
        question: 'Onde acompanhar commodities e moedas correlacionadas no portal?',
        answer:
          'As cotações atualizadas de commodities e câmbio ficam disponíveis continuamente no painel Mercados do DinhEuro.',
      },
    ],
    crypto_infra: [
      {
        question: 'Por que plataformas de derivativos são estratégicas para o mercado institucional cripto?',
        answer:
          'Contratos de opções e futuros permitem gestão de volatilidade, proteção de carteira e formação de liquidez além das negociações à vista.',
      },
      {
        question: 'O que sinaliza a consolidação de infraestrutura no ecossistema de ativos digitais?',
        answer:
          'Indica busca por escala operacional, custódia integrada e maior aproximação com padrões de risco e governança do mercado financeiro tradicional.',
      },
      {
        question: 'Onde acompanhar Bitcoin e criptoativos em BRL, EUR e USD no DinhEuro?',
        answer:
          'O painel Mercados exibe cotações sincronizadas nas três moedas com gráficos históricos em tempo real.',
      },
      {
        question: 'Quais cuidados são destacados na cobertura de ativos digitais?',
        answer:
          'Ativos digitais possuem alta volatilidade e variações regulatórias; todas as análises do portal têm foco exclusivamente informativo.',
      },
    ],
    europe_society: [
      {
        question: 'Como pressões no custo de vida e mobilizações afetam o cenário econômico europeu?',
        answer:
          'Custos de habitação, recomposição salarial e paralisações em serviços influenciam o consumo doméstico, debates fiscais e projeções de crescimento na Zona do Euro.',
      },
      {
        question: 'Qual a importância da dinâmica salarial para o Banco Central Europeu (BCE)?',
        answer:
          'A evolução dos salários e da inflação de serviços orienta o ritmo das decisões de juros do BCE e a força relativa do euro.',
      },
      {
        question: 'Por que o ritmo econômico da Europa interessa diretamente ao Brasil e ao Mercosul?',
        answer:
          'A União Europeia é um dos principais parceiros comerciais e investidores da região, impactando exportações, fluxos de capital e o par EUR/BRL.',
      },
      {
        question: 'Onde acompanhar índices europeus e a cotação do euro hoje?',
        answer:
          'Na aba Mercados e no Conversor Universal você consulta índices da Europa e o EUR/BRL em tempo real.',
      },
    ],
    geopolitics: [
      {
        question: 'Como cúpulas multilaterais influenciam comércio exterior, moedas e bolsas de valores?',
        answer:
          'Negociações sobre tarifas, cadeias tecnológicas e corredores comerciais redefinem prêmios de risco, preços de commodities e fluxos globais de investimento.',
      },
      {
        question: 'Por que a Ásia-Pacífico tem peso central nas cadeias produtivas globais?',
        answer:
          'Polos manufatureiros, logística marítima e produção de semicondutores da região afetam diretamente custos industriais e inflação mundial.',
      },
      {
        question: 'Qual a abordagem editorial do DinhEuro em temas geopolíticos?',
        answer:
          'A redação traduz eventos diplomáticos para canais econômicos concretos — câmbio, juros, balança comercial e setores listados em bolsa.',
      },
      {
        question: 'As fontes oficiais são citadas de forma transparente em cada matéria?',
        answer:
          'Sim. Cada página dedicada apresenta as referências institucionais consultadas e links para análises relacionadas.',
      },
    ],
  };

  const specificFirst: ArticleFaqItem = {
    question: `Qual é o principal impacto prático da matéria "${loc.title}"?`,
    answer: `${loc.summary} O desdobramento completo, dados numéricos e o contexto econômico estão detalhados ao longo desta reportagem.`,
  };

  return [specificFirst, ...baseTopicFaqs[topic].slice(0, 3)];
}
