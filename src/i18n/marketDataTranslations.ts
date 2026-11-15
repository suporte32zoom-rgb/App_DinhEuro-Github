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
      summary: 'Chief economists and fixed-income desks reassess Brazil’s monetary policy path and impacts on B3 DI interest-rate futures.',
    },
    news_2: {
      title: 'National Congress debates public spending containment and fiscal framework targets',
      summary: 'Negotiations in Brasília between the Ministry of Finance and lawmakers seek budget balance and long-term debt sustainability.',
    },
    news_3: {
      title: 'Ibovespa tracks foreign inflows as Petrobras (PETR4) and Vale (VALE3) lead B3 turnover',
      summary: 'Non-resident capital inflows and firmer global commodity prices lift blue-chip Brazilian equities.',
    },
    news_4: {
      title: 'Commercial FX: Dollar and Euro track corporate remittances and Brazil–US rate differentials',
      summary: 'Interbank FX desks monitor spot liquidity and Central Bank FX credit-line auctions amid global volatility.',
    },
    news_5: {
      title: 'US Inflation & CPI: Federal Reserve signals caution on rate cuts amid resilient labor market',
      summary: 'Fed officials emphasize a strictly data-dependent stance before committing to further policy easing.',
    },
    news_6: {
      title: 'B3 Earnings: Major Brazilian banks beat consensus on delinquency control and credit growth',
      summary: 'Quarterly results confirm strong return on equity (ROE) and expanding payroll-deductible loan books.',
    },
    news_7: {
      title: 'Crypto Markets: Bitcoin holds deep liquidity supported by steady institutional ETF inflows',
      summary: 'Global asset managers including BlackRock and Fidelity post consistent daily net creations across listed spot products.',
    },
    news_8: {
      title: 'Tax Reform Regulation: Ministry of Finance finalizes draft rules for IBS and CBS',
      summary: 'Complementary legislation outlines governance committee powers and the multi-year consumption tax transition.',
    },
    news_9: {
      title: 'Wall Street: S&P 500 and Nasdaq advance on semiconductor and mega-cap tech momentum',
      summary: 'Sustained demand for high-performance computing infrastructure keeps New York equity benchmarks bid.',
    },
    news_10: {
      title: 'Treasuries & Global Bonds: 10-year yields draw demand from international institutional allocators',
      summary: 'US sovereign yields and emerging-market credit spreads stabilize as global bond buyers lock in carry.',
    },
    news_11: {
      title: 'Eurozone: European Central Bank monitors energy costs and regional trade balance',
      summary: 'ECB leadership reiterates vigilance on monetary transmission in Germany and France to contain residual price pressures.',
    },
    news_12: {
      title: 'Agribusiness & Trade: Soybean and corn exports sustain record Brazilian trade surplus',
      summary: 'FX inflows from agricultural shipments bolster Central Bank reserves and support domestic GDP.',
    },
    news_13: {
      title: 'Public Debt & Treasury: IPCA-linked bond issuances hit record retail demand on Tesouro Direto',
      summary: 'Individual investors step up allocations to Tesouro IPCA+ and RendA+ to lock in real yields for retirement.',
    },
    news_14: {
      title: 'Ethereum & Solana: Daily DeFi volume expands alongside dollar-backed stablecoin adoption',
      summary: 'Decentralized lending and liquidity protocols record accelerating growth in total value locked (TVL).',
    },
    news_15: {
      title: 'Energy Commodities: Brent crude swings on Middle East geopolitical tensions',
      summary: 'OPEC+ reaffirms gradual supply discipline while US domestic output holds near historical highs.',
    },
    news_16: {
      title: 'Cloud & Chips: Tech giants announce record 2026 capex for data centers and semiconductors',
      summary: 'Microsoft, Alphabet, Meta, and Amazon project combined infrastructure spending above $200 billion.',
    },
    news_17: {
      title: 'Real Estate & REITs: IFIX holds steady as brick-and-mortar funds draw demand with long leases',
      summary: 'Logistics parks and prime office towers sustain low vacancy rates across São Paulo and Rio de Janeiro.',
    },
    news_18: {
      title: 'US Fiscal Policy: Debt ceiling and mandatory spending talks drive debate in Congress',
      summary: 'Washington budget committees weigh federal deficit trajectories and long-term Treasury supply.',
    },
    news_19: {
      title: 'Brazilian Utilities: Eletrobras, Equatorial, and CPFL advance in power transmission auctions',
      summary: 'New high-voltage lines connecting Northeastern solar and wind hubs anchor multi-billion-real grid investments.',
    },
    news_20: {
      title: 'Asian Markets: Japan’s Nikkei and Hong Kong’s Hang Seng close higher on tech risk appetite',
      summary: 'Yen stability and capital-market support measures in China lift regional equity benchmarks.',
    },
    news_21: {
      title: 'Brazilian Retail: Seasonal promotions lift e-commerce sales and installment credit demand',
      summary: 'B3-listed retailers including Magazine Luiza, Mercado Livre, and Assaí report higher average ticket sizes.',
    },
    news_22: {
      title: 'Crypto Regulation in Brazil: Central Bank advances public rules on custody and stablecoins',
      summary: 'Virtual asset service provider (VASP) framework enters final implementation phase under BCB supervision.',
    },
    news_23: {
      title: 'Iron Ore: Dalian and Singapore contracts rebound on fresh Chinese urban infrastructure stimulus',
      summary: 'Chinese steel mill restocking supports benchmark ore pricing and export revenues for Vale (VALE3).',
    },
    news_24: {
      title: 'M&A Activity: Brazilian tech and agritech companies lead wave of market consolidation',
      summary: 'Investment banks report renewed deal pipelines driven by attractive valuations and operational synergies.',
    },
  },
  es: {
    news_1: {
      title: 'Copom & Política Monetaria: El mercado recalibra apuestas para la tasa Selic tras actas del BCB e inflación',
      summary: 'Economistas y mesas de renta fija ajustan sus proyecciones sobre el ciclo monetario y los futuros de tasas (DI) en B3.',
    },
    news_2: {
      title: 'Congreso Nacional debate contención del gasto público y metas del marco fiscal',
      summary: 'Negociaciones en Brasilia entre el Ministerio de Hacienda y legisladores buscan equilibrar las cuentas y la deuda pública.',
    },
    news_3: {
      title: 'Ibovespa avanza con flujo extranjero: Petrobras (PETR4) y Vale (VALE3) lideran el volumen en B3',
      summary: 'La entrada de capital no residente y el repunte de materias primas impulsan las acciones brasileñas más líquidas.',
    },
    news_4: {
      title: 'Cambio Comercial: Dólar y Euro atentos a envíos corporativos y diferencial de tasas Brasil–EE. UU.',
      summary: 'Mesas cambiarias interbancarias siguen la liquidez spot y subastas de línea del Banco Central ante la volatilidad global.',
    },
    news_5: {
      title: 'Inflación e IPC en EE. UU.: La Reserva Federal pide cautela en recortes de tasas por solidez laboral',
      summary: 'Directivos de la Fed reiteran una postura dependiente de los datos macroeconómicos antes de nuevos movimientos.',
    },
    news_6: {
      title: 'Balances en B3: Grandes bancos brasileños superan estimaciones con control de morosidad y crédito',
      summary: 'Los resultados trimestrales confirman sólida rentabilidad sobre el patrimonio (ROE) y expansión crediticia.',
    },
    news_7: {
      title: 'Mercado Cripto: Bitcoin mantiene sólida liquidez con flujo continuo en ETFs institucionales',
      summary: 'Gestoras globales como BlackRock y Fidelity registran volúmenes diarios constantes de compra en productos listados.',
    },
    news_8: {
      title: 'Reforma Tributaria: Ministerio de Hacienda concluye borradores de reglamentación del IBS y CBS',
      summary: 'El texto detalla las reglas del comité gestor y el período de transición de los tributos al consumo.',
    },
    news_9: {
      title: 'Wall Street: S&P 500 y Nasdaq suben impulsados por semiconductores y grandes tecnológicas',
      summary: 'La demanda sostenida por infraestructura de cómputo de alto rendimiento respalda el impulso en Nueva York.',
    },
    news_10: {
      title: 'Treasuries & Renta Fija Global: Rendimientos a 10 años atraen flujo de gestores internacionales',
      summary: 'Las tasas soberanas estadounidenses y los spreads emergentes muestran estabilidad ante la demanda institucional.',
    },
    news_11: {
      title: 'Zona Euro: El Banco Central Europeo monitorea costos energéticos y balanza comercial del bloque',
      summary: 'El BCE reitera vigilancia sobre la transmisión monetaria en Alemania y Francia para contener presiones de precios.',
    },
    news_12: {
      title: 'Agronegocio & Balanza: Exportaciones de soja y maíz sostienen superávit comercial récord en Brasil',
      summary: 'Los ingresos de divisas del sector agropecuario fortalecen las reservas internacionales y respaldan el PIB.',
    },
    news_13: {
      title: 'Deuda Pública & Tesoro: Emisiones indexadas al IPCA baten récord de demanda en Tesouro Direto',
      summary: 'Inversores minoristas aumentan su asignación en Tesouro IPCA+ y RendA+ buscando tasas reales atractivas.',
    },
    news_14: {
      title: 'Ethereum y Solana: El volumen diario en DeFi crece con la adopción de stablecoins en dólares',
      summary: 'Protocolos de préstamos y liquidez descentralizada registran expansión acelerada del valor total bloqueado (TVL).',
    },
    news_15: {
      title: 'Materias Primas Energéticas: El petróleo Brent oscila ante tensiones geopolíticas en Medio Oriente',
      summary: 'La OPEP+ reafirma recortes graduales de oferta mientras la producción estadounidense alcanza máximos históricos.',
    },
    news_16: {
      title: 'Centros de Datos & Chips: Gigantes tecnológicos anuncian inversión récord para 2026',
      summary: 'Microsoft, Alphabet, Meta y Amazon proyectan un capex conjunto superior a 200 mil millones de dólares.',
    },
    news_17: {
      title: 'Sector Inmobiliario & FIIs: IFIX registra estabilidad y fondos logísticos atraen contratos atípicos',
      summary: 'Naves logísticas y oficinas prime mantienen baja vacancia en las áreas metropolitanas de São Paulo y Río.',
    },
    news_18: {
      title: 'Política Fiscal de EE. UU.: Debate sobre techo de deuda y gasto obligatorio agita al Congreso',
      summary: 'Comités presupuestarios en Washington evalúan el impacto del déficit federal en la oferta de bonos del Tesoro.',
    },
    news_19: {
      title: 'Sector Eléctrico: Eletrobras, Equatorial y CPFL avanzan en subastas de transmisión eléctrica',
      summary: 'Nuevas líneas para energía solar y eólica del Nordeste consolidan inversiones multimillonarias en infraestructura.',
    },
    news_20: {
      title: 'Bolsas Asiáticas: Nikkei en Japón y Hang Seng en Hong Kong cierran al alza por apetito tecnológico',
      summary: 'La estabilidad cambiaria del yen y estímulos bursátiles en China impulsan los índices de la región.',
    },
    news_21: {
      title: 'Comercio Brasileño: Campañas estacionales impulsan ventas de e-commerce y crédito al consumo',
      summary: 'Grandes minoristas de B3 como Magazine Luiza, Mercado Livre y Assaí reportan mayor ticket promedio.',
    },
    news_22: {
      title: 'Regulación Cripto en Brasil: Banco Central avanza en normas de custodia y stablecoins',
      summary: 'El marco regulatorio para proveedores de servicios de activos virtuales (VASPs) entra en su fase final.',
    },
    news_23: {
      title: 'Mineral de Hierro: Contratos en Dalian y Singapur reaccionan a estímulos urbanos en China',
      summary: 'La reposición de inventarios siderúrgicos sostiene los precios y apoya los ingresos de exportación de Vale (VALE3).',
    },
    news_24: {
      title: 'Fusiones & Adquisiciones (M&A): Tecnológicas y agritechs brasileñas lideran consolidación',
      summary: 'Bancos de inversión registran reactivación de mandatos de fusión con valuaciones atractivas y sinergias.',
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
