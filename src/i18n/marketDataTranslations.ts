import type { MarketAsset, NewsItem } from '../services/marketData';
import type { SupportedLanguage } from './translations';
import { TRANSLATIONS } from './translations';

const ASSET_NAMES_EN: Record<string, string> = {
  // Indices with PT words
  ibovespa: 'Bovespa Index (Brazil B3)',
  asx200: 'S&P/ASX 200 Australia',
  // Commodities (11)
  gold: 'Spot Gold / Troy Ounce',
  silver: 'Spot Silver / Troy Ounce',
  brent: 'Brent Crude Futures',
  wti: 'WTI Crude Oil (Texas)',
  gas: 'Henry Hub Natural Gas',
  copper: 'Copper Futures Contract',
  platinum: 'Spot Platinum / Troy Ounce',
  wheat: 'Chicago Board of Trade Wheat',
  corn: 'Chicago Board of Trade Corn',
  soybeans: 'Chicago Board of Trade Soybeans',
  coffee: 'NY ICE Arabica Coffee',
  // Forex (15)
  usd_brl: 'US Dollar / Brazilian Real',
  eur_brl: 'Euro / Brazilian Real',
  gbp_brl: 'British Pound / Brazilian Real',
  chf_brl: 'Swiss Franc / Brazilian Real',
  jpy_brl: 'Japanese Yen / Brazilian Real',
  cad_brl: 'Canadian Dollar / Brazilian Real',
  aud_brl: 'Australian Dollar / Brazilian Real',
  cny_brl: 'Chinese Yuan / Brazilian Real',
  ars_brl: 'Argentine Peso / Brazilian Real',
  eur_usd: 'Euro / US Dollar',
  gbp_usd: 'British Pound / US Dollar',
  usd_jpy: 'US Dollar / Japanese Yen',
  usd_chf: 'US Dollar / Swiss Franc',
  aud_usd: 'Australian Dollar / US Dollar',
  usd_cad: 'US Dollar / Canadian Dollar',
  // Brazilian equities with PT descriptors
  csna3: 'CSN National Steel Company',
  ugpa3: 'Ultrapar Holdings',
  asai3: 'Assaí Wholesale',
  hapv3: 'Hapvida Healthcare',
  lren3: 'Lojas Renner Retail',
  eqtl3: 'Equatorial Energy',
  vbbr3: 'Vibra Energy',
  sanb11: 'Santander Brazil Unit',
  suzb3: 'Suzano Pulp & Paper',
  b3sa3: 'B3 Brazil Stock Exchange',
  // Extended Europe equities (city names normalized)
  shel_l: 'Shell PLC (London)',
  azn_l: 'AstraZeneca PLC (London)',
  hsba_l: 'HSBC Holdings PLC (London)',
  novob_co: 'Novo Nordisk A/S (Copenhagen)',
  race_mi: 'Ferrari N.V. (Milan)',
  // Extended Asia-Pacific equities
  toyota_t: 'Toyota Motor Corp. (Tokyo)',
  sony_t: 'Sony Group Corp. (Tokyo)',
  softbank_t: 'SoftBank Group Corp. (Tokyo)',
  tel_t: 'Tokyo Electron Ltd. (Tokyo)',
  fastret_t: 'Fast Retailing / Uniqlo (Tokyo)',
  samsung_ks: 'Samsung Electronics Co. (Seoul)',
  dbs_si: 'DBS Group Holdings (Singapore)',
  // Extended World Forex (All Continents)
  mxn_brl: 'Mexican Peso / Brazilian Real',
  usd_mxn: 'US Dollar / Mexican Peso',
  clp_brl: 'Chilean Peso / Brazilian Real',
  cop_brl: 'Colombian Peso / Brazilian Real',
  pen_brl: 'Peruvian Sol / Brazilian Real',
  nok_brl: 'Norwegian Krone / Brazilian Real',
  sek_brl: 'Swedish Krona / Brazilian Real',
  dkk_brl: 'Danish Krone / Brazilian Real',
  pln_brl: 'Polish Zloty / Brazilian Real',
  try_brl: 'Turkish Lira / Brazilian Real',
  inr_brl: 'Indian Rupee / Brazilian Real',
  krw_brl: 'South Korean Won / Brazilian Real',
  hkd_brl: 'Hong Kong Dollar / Brazilian Real',
  sgd_brl: 'Singapore Dollar / Brazilian Real',
  aed_brl: 'UAE Dirham / Brazilian Real',
  sar_brl: 'Saudi Riyal / Brazilian Real',
  ils_brl: 'Israeli New Shekel / Brazilian Real',
  usd_cny: 'US Dollar / Chinese Yuan',
  usd_inr: 'US Dollar / Indian Rupee',
  usd_krw: 'US Dollar / South Korean Won',
  usd_sgd: 'US Dollar / Singapore Dollar',
  zar_brl: 'South African Rand / Brazilian Real',
  usd_zar: 'US Dollar / South African Rand',
  egp_brl: 'Egyptian Pound / Brazilian Real',
  ngn_brl: 'Nigerian Naira / Brazilian Real',
  mad_brl: 'Moroccan Dirham / Brazilian Real',
  nzd_brl: 'New Zealand Dollar / Brazilian Real',
  nzd_usd: 'New Zealand Dollar / US Dollar',
};

const ASSET_NAMES_ES: Record<string, string> = {
  // Indices with PT words
  ibovespa: 'Índice Bovespa (Brasil B3)',
  asx200: 'S&P/ASX 200 Australia',
  // Commodities (11)
  gold: 'Oro Spot / Onza Troy',
  silver: 'Plata Spot / Onza Troy',
  brent: 'Petróleo Brent Contrato Futuro',
  wti: 'Petróleo WTI (Texas)',
  gas: 'Gas Natural Henry Hub',
  copper: 'Cobre Contrato Futuro',
  platinum: 'Platino Spot / Onza Troy',
  wheat: 'Trigo Chicago Board of Trade',
  corn: 'Maíz Chicago Board of Trade',
  soybeans: 'Soja Chicago Board of Trade',
  coffee: 'Café Arábica NY ICE',
  // Forex (15)
  usd_brl: 'Dólar Estadounidense / Real Brasileño',
  eur_brl: 'Euro / Real Brasileño',
  gbp_brl: 'Libra Esterlina / Real Brasileño',
  chf_brl: 'Franco Suizo / Real Brasileño',
  jpy_brl: 'Yen Japonés / Real Brasileño',
  cad_brl: 'Dólar Canadiense / Real Brasileño',
  aud_brl: 'Dólar Australiano / Real Brasileño',
  cny_brl: 'Yuan Chino / Real Brasileño',
  ars_brl: 'Peso Argentino / Real Brasileño',
  eur_usd: 'Euro / Dólar Estadounidense',
  gbp_usd: 'Libra / Dólar Estadounidense',
  usd_jpy: 'Dólar Estadounidense / Yen Japonés',
  usd_chf: 'Dólar Estadounidense / Franco Suizo',
  aud_usd: 'Dólar Australiano / Dólar Estadounidense',
  usd_cad: 'Dólar Estadounidense / Dólar Canadiense',
  // Brazilian equities
  csna3: 'CSN Compañía Siderúrgica',
  ugpa3: 'Ultrapar Participaciones',
  asai3: 'Assaí Mayorista',
  hapv3: 'Hapvida Participaciones',
  lren3: 'Lojas Renner',
  eqtl3: 'Equatorial Energía',
  vbbr3: 'Vibra Energía',
  sanb11: 'Banco Santander Brasil Unit',
  suzb3: 'Suzano Papel y Celulosa',
  b3sa3: 'B3 Brasil Bolsa Balcão',
  // Extended Europe equities (city names in Spanish)
  asml_as: 'ASML Holding N.V. (Ámsterdam)',
  shel_l: 'Shell PLC (Londres)',
  azn_l: 'AstraZeneca PLC (Londres)',
  hsba_l: 'HSBC Holdings PLC (Londres)',
  nesn_sw: 'Nestlé S.A. (Zúrich)',
  novn_sw: 'Novartis AG (Zúrich)',
  ubsg_sw: 'UBS Group AG (Zúrich)',
  novob_co: 'Novo Nordisk A/S (Copenhague)',
  race_mi: 'Ferrari N.V. (Milán)',
  // Extended Asia-Pacific equities
  toyota_t: 'Toyota Motor Corp. (Tokio)',
  sony_t: 'Sony Group Corp. (Tokio)',
  softbank_t: 'SoftBank Group Corp. (Tokio)',
  tel_t: 'Tokyo Electron Ltd. (Tokio)',
  fastret_t: 'Fast Retailing / Uniqlo (Tokio)',
  samsung_ks: 'Samsung Electronics Co. (Seúl)',
  bhp_ax: 'BHP Group Ltd. (Sídney)',
  cba_ax: 'Commonwealth Bank (Sídney)',
  dbs_si: 'DBS Group Holdings (Singapur)',
  // Extended World Forex (All Continents)
  mxn_brl: 'Peso Mexicano / Real Brasileño',
  usd_mxn: 'Dólar Estadounidense / Peso Mexicano',
  clp_brl: 'Peso Chileno / Real Brasileño',
  cop_brl: 'Peso Colombiano / Real Brasileño',
  pen_brl: 'Sol Peruano / Real Brasileño',
  nok_brl: 'Corona Noruega / Real Brasileño',
  sek_brl: 'Corona Sueca / Real Brasileño',
  dkk_brl: 'Corona Danesa / Real Brasileño',
  pln_brl: 'Zloty Polaco / Real Brasileño',
  try_brl: 'Lira Turca / Real Brasileño',
  inr_brl: 'Rupia India / Real Brasileño',
  krw_brl: 'Won Surcoreano / Real Brasileño',
  hkd_brl: 'Dólar de Hong Kong / Real Brasileño',
  sgd_brl: 'Dólar de Singapur / Real Brasileño',
  aed_brl: 'Dírham de los EAU / Real Brasileño',
  sar_brl: 'Riyal Saudí / Real Brasileño',
  ils_brl: 'Nuevo Séquel Israelí / Real Brasileño',
  usd_cny: 'Dólar Estadounidense / Yuan Chino',
  usd_inr: 'Dólar Estadounidense / Rupia India',
  usd_krw: 'Dólar Estadounidense / Won Surcoreano',
  usd_sgd: 'Dólar Estadounidense / Dólar de Singapur',
  zar_brl: 'Rand Sudafricano / Real Brasileño',
  usd_zar: 'Dólar Estadounidense / Rand Sudafricano',
  egp_brl: 'Libra Egipcia / Real Brasileño',
  ngn_brl: 'Naira Nigeriana / Real Brasileño',
  mad_brl: 'Dírham Marroquí / Real Brasileño',
  nzd_brl: 'Dólar Neozelandés / Real Brasileño',
  nzd_usd: 'Dólar Neozelandés / Dólar Estadounidense',
};

const ASSET_SYMBOLS_EN: Record<string, string> = {
  gold: 'GOLD (XAU)',
  silver: 'SILVER (XAG)',
  gas: 'NATURAL GAS',
  copper: 'COPPER',
  platinum: 'PLATINUM',
  wheat: 'WHEAT',
  corn: 'CORN',
  soybeans: 'SOYBEANS',
  coffee: 'COFFEE',
};

const ASSET_SYMBOLS_ES: Record<string, string> = {
  gold: 'ORO (XAU)',
  silver: 'PLATA (XAG)',
  gas: 'GAS NATURAL',
  copper: 'COBRE',
  platinum: 'PLATINO',
  wheat: 'TRIGO',
  corn: 'MAÍZ',
  soybeans: 'SOJA',
  coffee: 'CAFÉ',
};

export function getLocalizedAssetSymbol(asset: MarketAsset, lang: SupportedLanguage): string {
  if (lang === 'en') return ASSET_SYMBOLS_EN[asset.id] || asset.symbol;
  if (lang === 'es') return ASSET_SYMBOLS_ES[asset.id] || asset.symbol;
  return asset.symbol;
}

export function getLocalizedAssetName(asset: MarketAsset, lang: SupportedLanguage): string {
  if (lang === 'en') return ASSET_NAMES_EN[asset.id] || asset.name;
  if (lang === 'es') return ASSET_NAMES_ES[asset.id] || asset.name;
  return asset.name;
}

export function getLocalizedCategoryLabel(
  category: MarketAsset['category'] | string,
  lang: SupportedLanguage
): string {
  return TRANSLATIONS[lang].markets.categoryBadges[category] || category.replace('_', ' ');
}

const NEWS_CATEGORY_MAP: Record<Exclude<SupportedLanguage, 'pt'>, Record<string, string>> = {
  en: {
    'Política & Fiscal': 'Policy & Fiscal',
    'Mercados & B3': 'Markets & B3',
    'Macro & Câmbio': 'Macro & FX',
    'Macro & Bancos Centrais': 'Macro & Central Banks',
    Criptoativos: 'Crypto Assets',
    'Empresas & Wall St': 'Equities & Wall St',
  },
  es: {
    'Política & Fiscal': 'Política & Fiscal',
    'Mercados & B3': 'Mercados & B3',
    'Macro & Câmbio': 'Macro & Divisas',
    'Macro & Bancos Centrais': 'Macro & Bancos Centrales',
    Criptoativos: 'Criptoactivos',
    'Empresas & Wall St': 'Empresas & Wall St',
  },
};

export function getLocalizedNewsCategory(category: string, lang: SupportedLanguage): string {
  if (lang === 'pt') return category;
  return NEWS_CATEGORY_MAP[lang][category] || category;
}

export function localizeRelativeTime(datetime: string, lang: SupportedLanguage): string {
  if (lang === 'pt') return datetime;
  const trimmed = datetime.trim();
  if (trimmed.startsWith('Há ')) {
    const rest = trimmed.slice(3);
    if (lang === 'en') return `${rest} ago`;
    if (lang === 'es') return `Hace ${rest}`;
  }
  return datetime;
}

interface TranslatedNewsContent {
  title: string;
  summary: string;
}

const INITIAL_NEWS_TRANSLATIONS: Record<
  Exclude<SupportedLanguage, 'pt'>,
  Record<string, TranslatedNewsContent>
> = {
  en: {
    news_1: {
      title: 'Copom & Monetary Policy: Markets recalibrate Selic rate bets after Central Bank minutes and inflation data',
      summary: 'DinhEuro Synthesis: Repricing across B3 DI interest-rate futures directly alters Brazil’s yield differential versus the US and Eurozone, shaping short-term FX flows.',
    },
    news_2: {
      title: 'National Congress debates public spending containment and fiscal framework targets',
      summary: 'DinhEuro Synthesis: Fiscal consolidation signals in Brasília anchor sovereign risk premia, influencing commercial USD/BRL pricing, long yields, and local equity appetite.',
    },
    news_3: {
      title: 'Ibovespa tracks foreign inflows as Petrobras (PETR4) and Vale (VALE3) lead B3 turnover',
      summary: 'DinhEuro Synthesis: Non-resident equity inflows paired with firmer global commodities lift heavyweight B3 benchmarks and boost FX export liquidity.',
    },
    news_4: {
      title: 'Commercial FX: Dollar and Euro track corporate remittances and Brazil–US rate differentials',
      summary: 'DinhEuro Synthesis: Seasonal corporate remittance flows and Central Bank FX credit-line auctions guide spot liquidity and daily PTAX formation.',
    },
    news_5: {
      title: 'US Inflation & CPI: Federal Reserve signals caution on rate cuts amid resilient labor market',
      summary: 'DinhEuro Synthesis: Restrictive Treasury yields keep the US dollar supported globally, requiring greater selectivity toward emerging-market currencies.',
    },
    news_6: {
      title: 'B3 Earnings: Major Brazilian banks beat consensus on delinquency control and credit growth',
      summary: 'DinhEuro Synthesis: Stable net interest margins and lower credit provisions underpin banking weights on the Ibovespa and dividend appeal on B3.',
    },
    news_7: {
      title: 'Crypto Markets: Bitcoin holds deep liquidity supported by steady institutional ETF inflows',
      summary: 'DinhEuro Synthesis: Consistent net creations in regulated spot ETFs tighten circulating supply and strengthen tactical correlation with US tech benchmarks.',
    },
    news_8: {
      title: 'Tax Reform Regulation: Ministry of Finance finalizes draft rules for IBS and CBS',
      summary: 'DinhEuro Synthesis: Clearer transition rules for Brazil’s dual VAT improve long-term predictability for exporters and trim cascading tax costs.',
    },
    news_9: {
      title: 'Wall Street: S&P 500 and Nasdaq advance on semiconductor and mega-cap tech momentum',
      summary: 'DinhEuro Synthesis: Sustained AI-infrastructure spending lifts New York equity indices and reinforces broader global risk appetite.',
    },
    news_10: {
      title: 'Treasuries & Global Bonds: 10-year yields draw demand from international institutional allocators',
      summary: 'DinhEuro Synthesis: Stabilizing US sovereign yields ease pressure on emerging-market currencies and dampen volatility across global bond curves.',
    },
    news_11: {
      title: 'Eurozone: European Central Bank monitors energy costs and regional trade balance',
      summary: 'DinhEuro Synthesis: ECB policy guidance on services inflation and energy costs sets the tone for EUR/USD and EUR/BRL cross-rate pricing.',
    },
    news_12: {
      title: 'Agribusiness & Trade: Soybean and corn exports sustain record Brazilian trade surplus',
      summary: 'DinhEuro Synthesis: Strong agricultural export receipts bolster net FX inflows, acting as a structural cushion for the Brazilian real during global volatility.',
    },
    news_13: {
      title: 'Public Debt & Treasury: IPCA-linked bond issuances hit record retail demand on Tesouro Direto',
      summary: 'DinhEuro Synthesis: High real yields on inflation-linked sovereign notes capture long-term domestic savings and compete with local equity allocations.',
    },
    news_14: {
      title: 'Ethereum & Solana: Daily DeFi volume expands alongside dollar-backed stablecoin adoption',
      summary: 'DinhEuro Synthesis: Rising stablecoin settlement velocity expands smart-contract network usage and lowers friction for cross-border transfers.',
    },
    news_15: {
      title: 'Energy Commodities: Brent crude swings on Middle East geopolitical tensions',
      summary: 'DinhEuro Synthesis: Brent price swings feed directly into global inflation expectations, maritime freight costs, and B3 oil-and-gas equities.',
    },
    news_16: {
      title: 'Cloud & Chips: Tech giants announce record 2026 capex for data centers and semiconductors',
      summary: 'DinhEuro Synthesis: Mega-cap infrastructure spending sustains global demand for chips, power grids, and industrial electrical equipment exporters.',
    },
    news_17: {
      title: 'Real Estate & REITs: IFIX holds steady as brick-and-mortar funds draw demand with long leases',
      summary: 'DinhEuro Synthesis: Low vacancy in logistics parks and prime offices supports tax-exempt income yields in Brazil despite tight monetary conditions.',
    },
    news_18: {
      title: 'US Fiscal Policy: Debt ceiling and mandatory spending talks drive debate in Congress',
      summary: 'DinhEuro Synthesis: Fiscal standoffs in Washington frequently amplify Treasury yield volatility and trigger rapid repricing across dollar pairs.',
    },
    news_19: {
      title: 'Brazilian Utilities: Eletrobras, Equatorial, and CPFL advance in power transmission auctions',
      summary: 'DinhEuro Synthesis: Inflation-indexed regulated transmission revenues keep Brazilian utilities positioned as defensive anchors on B3.',
    },
    news_20: {
      title: 'Asian Markets: Japan’s Nikkei and Hong Kong’s Hang Seng close higher on tech risk appetite',
      summary: 'DinhEuro Synthesis: Constructive Asian equity sessions improve global sentiment ahead of European and US trading, supporting industrial metals.',
    },
    news_21: {
      title: 'Brazilian Retail: Seasonal promotions lift e-commerce sales and installment credit demand',
      summary: 'DinhEuro Synthesis: Seasonal retail turnover serves as a real-time gauge of household demand and margin resilience for B3-listed retailers.',
    },
    news_22: {
      title: 'Crypto Regulation in Brazil: Central Bank advances public rules on custody and stablecoins',
      summary: 'DinhEuro Synthesis: Clear asset-segregation and FX compliance standards bring Brazil’s digital-asset market closer to institutional capital.',
    },
    news_23: {
      title: 'Iron Ore: Dalian and Singapore contracts rebound on fresh Chinese urban infrastructure stimulus',
      summary: 'DinhEuro Synthesis: Chinese steel mill restocking supports benchmark ore pricing, directly boosting Vale’s cash flow and Brazil’s trade surplus.',
    },
    news_24: {
      title: 'M&A Activity: Brazilian tech and agritech companies lead wave of market consolidation',
      summary: 'DinhEuro Synthesis: Discounted valuations and operational scale synergies are reviving strategic dealmaking across Brazilian export and tech sectors.',
    },
  },
  es: {
    news_1: {
      title: 'Copom & Política Monetaria: El mercado recalibra apuestas para la tasa Selic tras actas del BCB e inflación',
      summary: 'Síntesis DinhEuro: El reajuste en la curva de futuros de tasas (DI) en B3 altera el diferencial de rendimiento frente a EE. UU. y la Eurozona, impactando el flujo cambiario.',
    },
    news_2: {
      title: 'Congreso Nacional debate contención del gasto público y metas del marco fiscal',
      summary: 'Síntesis DinhEuro: Las señales fiscales en Brasilia condicionan la prima de riesgo soberano e inciden sobre el dólar comercial, las tasas largas y los activos locales.',
    },
    news_3: {
      title: 'Ibovespa avanza con flujo extranjero: Petrobras (PETR4) y Vale (VALE3) lideran el volumen en B3',
      summary: 'Síntesis DinhEuro: La entrada de capital no residente junto a materias primas firmes impulsa las principales acciones brasileñas y fortalece la liquidez de divisas.',
    },
    news_4: {
      title: 'Cambio Comercial: Dólar y Euro atentos a envíos corporativos y diferencial de tasas Brasil–EE. UU.',
      summary: 'Síntesis DinhEuro: Remesas corporativas estacionales y subastas de línea del Banco Central guían la liquidez spot y la formación diaria de la PTAX.',
    },
    news_5: {
      title: 'Inflación e IPC en EE. UU.: La Reserva Federal pide cautela en recortes de tasas por solidez laboral',
      summary: 'Síntesis DinhEuro: Rendimientos restrictivos de los Treasuries sostienen al dólar global y exigen mayor selectividad hacia divisas emergentes.',
    },
    news_6: {
      title: 'Balances en B3: Grandes bancos brasileños superan estimaciones con control de morosidad y crédito',
      summary: 'Síntesis DinhEuro: Márgenes financieros estables y menor morosidad respaldan al sector bancario en el Ibovespa y su atractivo por dividendos.',
    },
    news_7: {
      title: 'Mercado Cripto: Bitcoin mantiene sólida liquidez con flujo continuo en ETFs institucionales',
      summary: 'Síntesis DinhEuro: Las suscripciones netas constantes en ETFs regulados reducen la oferta circulante y elevan la correlación táctica con acciones tecnológicas.',
    },
    news_8: {
      title: 'Reforma Tributaria: Ministerio de Hacienda concluye borradores de reglamentación del IBS y CBS',
      summary: 'Síntesis DinhEuro: Reglas más claras para la transición hacia el IVA dual aportan previsibilidad a exportadores y reducen costos acumulativos.',
    },
    news_9: {
      title: 'Wall Street: S&P 500 y Nasdaq suben impulsados por semiconductores y grandes tecnológicas',
      summary: 'Síntesis DinhEuro: La inversión sostenida en infraestructura de IA impulsa las bolsas de Nueva York y mejora el apetito global por riesgo.',
    },
    news_10: {
      title: 'Treasuries & Renta Fija Global: Rendimientos a 10 años atraen flujo de gestores internacionales',
      summary: 'Síntesis DinhEuro: La estabilización de las tasas soberanas de EE. UU. alivia presiones sobre divisas emergentes y modera la volatilidad en renta fija.',
    },
    news_11: {
      title: 'Zona Euro: El Banco Central Europeo monitorea costos energéticos y balanza comercial del bloque',
      summary: 'Síntesis DinhEuro: Las señales del BCE ante la inflación de servicios y energía redefinen la cotización del Euro frente al Dólar (EUR/USD) y al Real (EUR/BRL).',
    },
    news_12: {
      title: 'Agronegocio & Balanza: Exportaciones de soja y maíz sostienen superávit comercial récord en Brasil',
      summary: 'Síntesis DinhEuro: Los ingresos exportadores del agro fortalecen la entrada neta de divisas y actúan como amortiguador estructural para el real brasileño.',
    },
    news_13: {
      title: 'Deuda Pública & Tesoro: Emisiones indexadas al IPCA baten récord de demanda en Tesouro Direto',
      summary: 'Síntesis DinhEuro: Las tasas reales elevadas en bonos públicos captan ahorro doméstico de largo plazo y compiten directamente con la renta variable local.',
    },
    news_14: {
      title: 'Ethereum y Solana: El volumen diario en DeFi crece con la adopción de stablecoins en dólares',
      summary: 'Síntesis DinhEuro: El mayor uso de stablecoins amplía la actividad en redes de contratos inteligentes y agiliza las liquidaciones transfronterizas.',
    },
    news_15: {
      title: 'Materias Primas Energéticas: El petróleo Brent oscila ante tensiones geopolíticas en Medio Oriente',
      summary: 'Síntesis DinhEuro: Las oscilaciones del Brent repercuten en las expectativas de inflación global, los fletes marítimos y las petroleras en B3.',
    },
    news_16: {
      title: 'Centros de Datos & Chips: Gigantes tecnológicos anuncian inversión récord para 2026',
      summary: 'Síntesis DinhEuro: El despliegue masivo de capex sostiene la demanda global de semiconductores, redes eléctricas y fabricantes industriales exportadores.',
    },
    news_17: {
      title: 'Sector Inmobiliario & FIIs: IFIX registra estabilidad y fondos logísticos atraen contratos atípicos',
      summary: 'Síntesis DinhEuro: La baja vacancia en naves logísticas y oficinas prime respalda rentas exentas en Brasil pese al escenario de tasas restrictivas.',
    },
    news_18: {
      title: 'Política Fiscal de EE. UU.: Debate sobre techo de deuda y gasto obligatorio agita al Congreso',
      summary: 'Síntesis DinhEuro: Las discusiones presupuestarias en Washington suelen elevar la volatilidad de los Treasuries y provocar ajustes rápidos en el dólar.',
    },
    news_19: {
      title: 'Sector Eléctrico: Eletrobras, Equatorial y CPFL avanzan en subastas de transmisión eléctrica',
      summary: 'Síntesis DinhEuro: Los ingresos regulados indexados a la inflación mantienen al sector eléctrico brasileño como ancla defensiva en B3.',
    },
    news_20: {
      title: 'Bolsas Asiáticas: Nikkei en Japón y Hang Seng en Hong Kong cierran al alza por apetito tecnológico',
      summary: 'Síntesis DinhEuro: El cierre constructivo en Asia mejora el ánimo global antes de las aperturas de Europa y EE. UU., apoyando a los metales.',
    },
    news_21: {
      title: 'Comercio Brasileño: Campañas estacionales impulsan ventas de e-commerce y crédito al consumo',
      summary: 'Síntesis DinhEuro: El dinamismo estacional funciona como termómetro del consumo de los hogares y de los márgenes minoristas en B3.',
    },
    news_22: {
      title: 'Regulación Cripto en Brasil: Banco Central avanza en normas de custodia y stablecoins',
      summary: 'Síntesis DinhEuro: Reglas claras de segregación patrimonial y reporte cambiario acercan al ecosistema cripto brasileño al capital institucional.',
    },
    news_23: {
      title: 'Mineral de Hierro: Contratos en Dalian y Singapur reaccionan a estímulos urbanos en China',
      summary: 'Síntesis DinhEuro: La reposición siderúrgica en China respalda los precios del mineral, fortaleciendo la caja de Vale y el superávit brasileño.',
    },
    news_24: {
      title: 'Fusiones & Adquisiciones (M&A): Tecnológicas y agritechs brasileñas lideran consolidación',
      summary: 'Síntesis DinhEuro: Valuaciones atractivas y búsqueda de sinergias de escala reactivan operaciones estratégicas en tecnología y agroexportación.',
    },
  },
};

export function localizeNewsItem(item: NewsItem, lang: SupportedLanguage): NewsItem {
  if (lang === 'pt') return item;
  const translated = INITIAL_NEWS_TRANSLATIONS[lang][item.id];
  return {
    ...item,
    title: translated?.title || item.title,
    summary: translated?.summary || item.summary,
    category: getLocalizedNewsCategory(item.category, lang),
    datetime: localizeRelativeTime(item.datetime, lang),
  };
}

export function getLocalizedApiSourceSummary(summary: string, lang: SupportedLanguage): string {
  if (lang === 'pt') return summary;
  if (lang === 'en') {
    return 'Global Interbank Quotes in Real Time • World Exchanges & B3 • Global Crypto Assets';
  }
  return 'Cotizaciones Interbancarias Globales en Tiempo Real • Bolsas Mundiales & B3 • Criptoactivos Globales';
}
