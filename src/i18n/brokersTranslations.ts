import type { SupportedLanguage } from './translations';
import type { BrokerInfo } from '../views/BrokersView';

export interface BrokersUiTranslations {
  title: string;
  subtitleBeforeCount: string;
  subtitleAfterCount: string;
  searchPlaceholder: string;
  tabAllPrefix: string;
  tabBrasil: string;
  tabGlobal: string;
  tabCrypto: string;
  tabZero: string;
  disclaimerBold: string;
  disclaimerText: string;
  showingPrefix: string;
  showingSuffix: string;
  clearSearch: string;
  zeroFeeBadge: string;
  specBrokerage: string;
  specSpread: string;
  specMinDeposit: string;
  specRegulation: string;
  officialSiteBtn: string;
  officialSiteTitlePrefix: string;
}

export const BROKERS_UI: Record<SupportedLanguage, BrokersUiTranslations> = {
  pt: {
    title: 'Guia Oficial de Corretoras do Brasil & do Mundo',
    subtitleBeforeCount: 'Catálogo completo com',
    subtitleAfterCount:
      'corretoras reguladas na B3, Wall Street, Europa e ecossistema Cripto. Compare taxas, spreads, plataformas e acesse os sites oficiais com segurança.',
    searchPlaceholder: 'Buscar por nome, país, taxa zero...',
    tabAllPrefix: 'Todas as Corretoras',
    tabBrasil: 'Brasil / B3 (12)',
    tabGlobal: 'Internacionais & Europa (12)',
    tabCrypto: 'Cripto & Web3 (7)',
    tabZero: 'Taxa Zero / Low Cost',
    disclaimerBold: 'Transparência & Segurança Institucional:',
    disclaimerText:
      'Todas as instituições listadas pelo DinhEuro são autorizadas pelos órgãos competentes de suas jurisdições: CVM e Banco Central no Brasil, SEC e FINRA nos Estados Unidos (com proteção SIPC de até $500.000), BaFin, FCA e FINMA na Europa. Sempre verifique os termos diretamente no portal oficial da instituição.',
    showingPrefix: 'Exibindo',
    showingSuffix: 'instituições encontradas',
    clearSearch: 'Limpar busca',
    zeroFeeBadge: 'Taxa Zero',
    specBrokerage: 'Corretagem:',
    specSpread: 'Câmbio / Spread:',
    specMinDeposit: 'Depósito Mínimo:',
    specRegulation: 'Regulação Oficial:',
    officialSiteBtn: 'Acessar Site Oficial',
    officialSiteTitlePrefix: 'Acessar portal oficial de',
  },
  en: {
    title: 'Official Guide to Brazilian & Global Brokers',
    subtitleBeforeCount: 'Complete directory of',
    subtitleAfterCount:
      'regulated brokers across B3 (Brazil), Wall Street, Europe, and the Crypto ecosystem. Compare fees, spreads, platforms, and access official websites safely.',
    searchPlaceholder: 'Search by name, country, zero fee...',
    tabAllPrefix: 'All Brokers',
    tabBrasil: 'Brazil / B3 (12)',
    tabGlobal: 'International & Europe (12)',
    tabCrypto: 'Crypto & Web3 (7)',
    tabZero: 'Zero Fee / Low Cost',
    disclaimerBold: 'Transparency & Institutional Security:',
    disclaimerText:
      'All institutions listed by DinhEuro are authorized by competent regulators in their jurisdictions: CVM and Central Bank in Brazil, SEC and FINRA in the United States (with SIPC protection up to $500,000), and BaFin, FCA, and FINMA in Europe. Always verify terms directly on the institution’s official website.',
    showingPrefix: 'Showing',
    showingSuffix: 'institutions found',
    clearSearch: 'Clear search',
    zeroFeeBadge: 'Zero Fee',
    specBrokerage: 'Brokerage Fee:',
    specSpread: 'FX / Spread:',
    specMinDeposit: 'Minimum Deposit:',
    specRegulation: 'Official Regulation:',
    officialSiteBtn: 'Visit Official Website',
    officialSiteTitlePrefix: 'Open official website for',
  },
  es: {
    title: 'Guía Oficial de Brókeres de Brasil & del Mundo',
    subtitleBeforeCount: 'Catálogo completo con',
    subtitleAfterCount:
      'brókeres regulados en B3, Wall Street, Europa y el ecosistema Cripto. Compare comisiones, spreads, plataformas y acceda a los sitios oficiales de forma segura.',
    searchPlaceholder: 'Buscar por nombre, país, comisión cero...',
    tabAllPrefix: 'Todos los Brókeres',
    tabBrasil: 'Brasil / B3 (12)',
    tabGlobal: 'Internacionales & Europa (12)',
    tabCrypto: 'Cripto & Web3 (7)',
    tabZero: 'Comisión Cero / Low Cost',
    disclaimerBold: 'Transparencia & Seguridad Institucional:',
    disclaimerText:
      'Todas las instituciones listadas por DinhEuro están autorizadas por los reguladores competentes de sus jurisdicciones: CVM y Banco Central en Brasil, SEC y FINRA en Estados Unidos (con protección SIPC de hasta $500.000), BaFin, FCA y FINMA en Europa. Verifique siempre los términos directamente en el portal oficial de la institución.',
    showingPrefix: 'Mostrando',
    showingSuffix: 'instituciones encontradas',
    clearSearch: 'Limpiar búsqueda',
    zeroFeeBadge: 'Comisión Cero',
    specBrokerage: 'Comisión:',
    specSpread: 'Cambio / Spread:',
    specMinDeposit: 'Depósito Mínimo:',
    specRegulation: 'Regulación Oficial:',
    officialSiteBtn: 'Ir al Sitio Oficial',
    officialSiteTitlePrefix: 'Abrir portal oficial de',
  },
};

type BrokerOverride = Partial<
  Pick<
    BrokerInfo,
    | 'country'
    | 'badge'
    | 'description'
    | 'spreadCambio'
    | 'brokerageFee'
    | 'regulation'
    | 'minDeposit'
    | 'platforms'
    | 'features'
  >
>;

const BROKER_OVERRIDES: Record<'en' | 'es', Record<string, BrokerOverride>> = {
  en: {
    xp: {
      country: 'Brazil',
      badge: 'Largest in Brazil',
      description:
        'Brazil’s largest independent financial ecosystem. Broad portfolio of B3 equities, real estate funds (FIIs), exclusive fixed income securities, and an integrated international account.',
      spreadCambio: '1.5% to 2.0%',
      brokerageFee: 'Zero for FIIs & Fixed Income; R$ 0 online',
      regulation: 'CVM, ANBIMA, Central Bank of Brazil',
      minDeposit: 'No minimum',
      features: [
        'Specialized investment advisory service',
        'Integrated USD international account inside the same app',
        'XP Visa Infinite card with investback rewards',
      ],
    },
    btg: {
      country: 'Brazil',
      badge: 'Best Investment Bank',
      description:
        'Largest investment bank in Latin America. Premier fixed income shelf with proprietary issuance, structured credit, and full top-tier private banking.',
      spreadCambio: '1.2% to 1.8%',
      brokerageFee: 'Zero on digital plans',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'R$ 0 (No minimum)',
      features: [
        'Institutional strength and governance of a leading bank',
        'Fixed income featuring top CDB and LCA yields in Brazil',
        'Modular Black card with cashback or Livelo miles',
      ],
    },
    nuinvest: {
      country: 'Brazil',
      badge: 'Popular Super App',
      description:
        'Full investment integration inside the Nubank app. Convenient for buying fractional B3 stocks, Tesouro Direto sovereign bonds, CDBs, and crypto in a few taps.',
      spreadCambio: '1.5% via international transfer',
      brokerageFee: '100% Zero Fee for Stocks, FIIs & BDRs',
      regulation: 'CVM, Central Bank of Brazil',
      minDeposit: 'R$ 1 via PIX',
      platforms: ['Nubank App (iOS & Android)'],
      features: [
        'Ultra-fast and intuitive mobile experience',
        'Fractional stock investing starting from R$ 1',
        'Savings boxes yielding 100% of CDI immediately',
      ],
    },
    rico: {
      country: 'Brazil',
      badge: 'Modern & Zero Fee',
      description:
        'XP Group’s retail-focused arm built for beginner and intermediate investors. Zero commission on core assets, dynamic educational content, and curated portfolios.',
      spreadCambio: '1.5% to 2.0%',
      brokerageFee: 'Zero Fee on Stocks, FIIs, BDRs & Fixed Income',
      regulation: 'CVM, ANBIMA, Central Bank of Brazil',
      minDeposit: 'No minimum',
      platforms: ['Rico App', 'Web Home Broker', 'Profit Rico Trader'],
      features: [
        'Zero brokerage commission to trade on B3',
        'Monthly recommended stock and dividend portfolios',
        'Riconnect mode with courses and live webinars',
      ],
    },
    clear: {
      country: 'Brazil',
      badge: 'Zero Day Trade Pioneer',
      description:
        'The broker that revolutionized the Brazilian market by eliminating brokerage fees. Specialized in active mini-index, mini-dollar, stock, and swing traders with pro platforms.',
      spreadCambio: 'N/A (B3 Focus)',
      brokerageFee: 'Zero Commission on all B3 trades',
      regulation: 'CVM, ANBIMA (XP Group)',
      minDeposit: 'No minimum',
      features: [
        'Zero brokerage fee in Day Trade and Swing Trade',
        'High-performance platforms (free Profit Pro when active)',
        'Built-in income tax calculator for active traders',
      ],
    },
    toro: {
      country: 'Brazil',
      badge: 'Santander Group',
      description:
        'Banco Santander’s brokerage focused on usability, one-click trade ideas, and an innovative win-win fee model alongside zero standard brokerage.',
      spreadCambio: '1.4% to 1.9%',
      brokerageFee: 'Zero Fee on Stocks, FIIs & Fixed Income',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'No minimum',
      platforms: ['Toro App', 'Toro Trader (Profit)', 'Web'],
      features: [
        'Win-Win model: fees apply only if a recommended trade profits',
        'Cashback on investment funds',
        'Backed by Banco Santander’s global financial strength',
      ],
    },
    genial: {
      country: 'Brazil',
      badge: 'High Performance',
      description:
        'One of Brazil’s fastest-growing brokers, combining zero commission on stocks and FIIs with robust trading infrastructure (direct B3 DMA2 and daily live rooms).',
      spreadCambio: '1.3% to 1.8%',
      brokerageFee: 'Zero Commission on Stocks, FIIs & BDRs',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'No minimum',
      platforms: ['Free Profit Pro', 'Genial Trader', 'Genial App'],
      features: [
        '100% free Profit Pro by trading 1 mini-contract per month',
        'Daily YouTube live rooms covering technical and order-flow analysis',
        'Benchmark macroeconomic and political research (Genial/Quaest)',
      ],
    },
    agora: {
      country: 'Brazil',
      badge: 'Bradesco BBI',
      description:
        'Banco Bradesco’s investment house. Connects award-winning Bradesco BBI equity research with traditional financial products, structured notes, and wealth solutions.',
      spreadCambio: '1.5% to 2.0%',
      brokerageFee: 'Zero-commission plans & advisory tiers',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'No minimum',
      platforms: ['Ágora Mobile', 'Ágora Home Broker', 'Ágora Trader'],
      features: [
        'Institutional reports and research from Bradesco BBI',
        'Seamless balance and account integration for Bradesco clients',
        'Ágora Academy with comprehensive educational tracks',
      ],
    },
    inter: {
      country: 'Brazil',
      badge: 'Brazil + US Integrated',
      description:
        'Banco Inter’s investment platform uniting the Brazilian Exchange (B3) and US Exchanges (Nasdaq/NYSE) on one screen, with direct FX conversion and zero brokerage.',
      spreadCambio: '0.99% to 1.5% (one of the lowest bank spreads)',
      brokerageFee: 'Zero Commission on B3 & US equities',
      regulation: 'CVM, Central Bank, SEC/FINRA (via Apex)',
      minDeposit: 'R$ 0 / $ 1',
      platforms: ['Inter Super App (iOS & Android)', 'Web Home Broker'],
      features: [
        'Global Account with international Mastercard debit card',
        'Zero commission to trade equities in the US and Brazil',
        'Daily cashback on funds and Inter Shop purchases',
      ],
    },
    c6: {
      country: 'Brazil',
      badge: 'Global USD & EUR Account',
      description:
        'C6 Bank’s investment hub (JP Morgan partnership). Known for its multi-currency Global Account with native support for US Dollars and European Euros.',
      spreadCambio: '1.0% to 2.0% on commercial USD & EUR',
      brokerageFee: 'Zero commission on B3',
      regulation: 'CVM, Central Bank of Brazil',
      minDeposit: 'No minimum',
      platforms: ['C6 Bank App'],
      features: [
        'International accounts in Euro (€) and Dollar ($) with dedicated cards',
        'C6 TechInvest with algorithmically managed portfolios',
        'Átomos points that never expire and convert to cashback or miles',
      ],
    },
    safra: {
      country: 'Brazil',
      badge: 'Private & Heritage',
      description:
        'Investment arm of Brazil’s fourth-largest private bank. Focused on high-net-worth clients, wealth preservation, private credit, and top-performing Safra funds.',
      spreadCambio: 'Negotiable with FX desk',
      brokerageFee: 'Competitive upon consultation',
      regulation: 'CVM, Central Bank, ANBIMA',
      minDeposit: 'R$ 1,000 for account opening',
      platforms: ['Safra App', 'Safra Internet Banking', 'Home Broker'],
      features: [
        'Globally recognized for financial soundness and conservative stewardship',
        'Flagship Safra Galileu and Safra Consumo investment funds',
        'Consultative service and exclusive private banking',
      ],
    },
    guide: {
      country: 'Brazil',
      badge: 'Fosun Multinational',
      description:
        'Brazilian brokerage controlled by global conglomerate Fosun. Offers personalized advisory, curated third-party funds, and private pension solutions.',
      spreadCambio: '1.5%',
      brokerageFee: 'Fee-exempt plans for equities',
      regulation: 'CVM, ANBIMA, Central Bank',
      minDeposit: 'No minimum',
      platforms: ['Guide App', 'Guide Home Broker'],
      features: [
        'Market research with a global macroeconomic perspective',
        'Comprehensive platform for mutual funds and pensions',
        'Tailored support from accredited investment advisors',
      ],
    },
    ibkr: {
      country: 'United States / Global',
      badge: 'Absolute Global Leader',
      description:
        'The world’s most comprehensive international brokerage. Direct access to 150+ exchanges across 33 countries trading USD, EUR, GBP, and JPY at minimal margins.',
      spreadCambio: 'From 0.08% (institutional interbank rate)',
      brokerageFee: 'From $0.005 / share in US; €1.25 in Europe',
      regulation: 'SEC, FINRA, SIPC, FCA (UK), BaFin (Germany)',
      minDeposit: '$0 (No minimum deposit)',
      features: [
        'Direct trading on European exchanges (DAX, Euronext Paris, Amsterdam, London)',
        'Competitive interest paid on uninvested USD and EUR cash balances',
        'Lowest margin financing rates in the global market',
      ],
    },
    avenue: {
      country: 'United States / Brazil',
      badge: 'Top Choice for Brazilians',
      description:
        'US-founded brokerage built for cross-border Brazilian investors. Bilingual interface, local support, instant PIX funding, and ready-to-file tax reports.',
      spreadCambio: '1.4% to 2.0% (tiered by volume)',
      brokerageFee: 'Zero commission on selected plans',
      regulation: 'SEC, FINRA, SIPC (Protection up to $500k)',
      minDeposit: 'R$ 100 via PIX with instant FX conversion',
      platforms: ['Avenue App (iOS & Android)', 'Web Portal'],
      features: [
        'Deposits via PIX with immediate conversion to US dollars',
        'Automated income tax reporting (DARF/GCAP/Annual Filing)',
        'Avenue Mastercard debit card accepted worldwide',
      ],
    },
    nomad: {
      country: 'United States / Brazil',
      badge: 'Global Account & Travel',
      description:
        'US-based fintech providing a USD checking account and Wall Street investing platform. Known for its debit card for travel in Europe and global shopping.',
      spreadCambio: '1.0% to 2.0% with Nomad Pass tiers',
      brokerageFee: 'Zero commission on US stocks & ETFs',
      regulation: 'SIPC (Up to $500,000), FDIC (Up to $250,000 banking)',
      minDeposit: 'R$ 100 via PIX',
      platforms: ['Nomad App (iOS & Android)'],
      features: [
        'Debit card accepted in 180+ countries with reduced 1.1% IOF',
        'VIP Lounge access at Guarulhos Airport for loyalty tiers',
        'Fractional US share investing starting from $1',
      ],
    },
    schwab: {
      country: 'United States',
      badge: 'Largest US Broker',
      description:
        'One of the world’s largest wealth managers. Provides international investors with the renowned thinkorswim platform, Wall Street equity research, and unmatched reliability.',
      spreadCambio: 'Direct interbank',
      brokerageFee: '$0 on US-listed stocks and ETFs',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$25,000 for international accounts',
      features: [
        'Cutting-edge thinkorswim platform for technical analysis and options',
        'In-depth research and ratings from top Wall Street analysts',
        'Checking account with unlimited global ATM fee rebates',
      ],
    },
    fidelity: {
      country: 'United States',
      badge: 'Wall Street Giant',
      description:
        'Cornerstone of US capital markets with trillions in assets under custody. Famous for ZERO expense ratio index funds and superior order price improvement.',
      spreadCambio: 'Market interbank',
      brokerageFee: '$0 for online US stocks and ETFs',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0 for residents / upon inquiry for non-residents',
      features: [
        'Industry-leading price improvement on trade execution',
        'Fidelity ZERO index funds with 0.00% management fee',
        'Comprehensive retirement and wealth planning suite',
      ],
    },
    robinhood: {
      country: 'United States / Europe',
      badge: 'Zero Fee Pioneer',
      description:
        'The brokerage that democratized Wall Street for modern investors. Offers 24-hour trading in selected stocks, options, and crypto with a streamlined interface.',
      spreadCambio: 'Built into market spread',
      brokerageFee: '$0 on all US stocks and ETFs',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        '24-Hour Market trading on selected US equities',
        'Competitive yield on uninvested USD cash (Robinhood Gold)',
        'Native Web3 wallet for self-custody crypto transfers',
      ],
    },
    etoro: {
      country: 'United Kingdom / Europe',
      badge: 'Copy Trading Leader',
      description:
        'Global pioneer in social investing and Copy Trading. Automatically mirror the portfolios and strategies of verified top-performing investors worldwide.',
      spreadCambio: 'Standard market spread',
      brokerageFee: 'Zero commission on stocks and ETFs',
      regulation: 'FCA (UK), CySEC (Cyprus), ASIC (Australia), FinCEN',
      minDeposit: '$50 to $100',
      platforms: ['eToro Web Trader', 'eToro App'],
      features: [
        'CopyTrader: automatic portfolio replication of verified investors',
        'Thematic Smart Portfolios (AI Tech, Clean Energy, Dividend Leaders)',
        'Trade US, European equities, and crypto in one portfolio',
      ],
    },
    saxobank: {
      country: 'Denmark / Europe',
      badge: 'European Trading Bank',
      description:
        'Danish investment bank specialized in multi-asset global trading. Connects over 71,000 instruments across European equities, sovereign bonds, and currencies.',
      spreadCambio: 'Tight institutional spreads',
      brokerageFee: 'Low, transparent tiered fees across Europe',
      regulation: 'Danish FSA (Denmark), FCA, BaFin, FINMA',
      minDeposit: '€0 (No minimum)',
      platforms: ['SaxoTraderGO', 'SaxoTraderPRO (Multi-screen)'],
      features: [
        'Direct access to all Eurozone exchanges quoted in €',
        'Full banking license with European deposit guarantee',
        'Extensive catalog of European and US sovereign government bonds',
      ],
    },
    degiro: {
      country: 'Germany / Netherlands',
      badge: 'European Low-Cost Leader',
      description:
        'Europe’s largest retail execution-only broker (flatexDEGIRO Group). Present in 18+ European countries with ultra-low commissions on DAX, CAC 40, and global exchanges.',
      spreadCambio: '0.25% (Auto FX)',
      brokerageFee: '€1 to €2 per order in Europe / US',
      regulation: 'BaFin (Germany), Bundesbank, AFM (Netherlands)',
      minDeposit: '€0.01',
      features: [
        'Curated Core Selection of popular ETFs with ZERO commission',
        'Direct Euro bank funding via dedicated IBAN',
        '50+ international stock exchanges accessible from one account',
      ],
    },
    swissquote: {
      country: 'Switzerland',
      badge: 'Swiss Private Bank',
      description:
        'Leading online trading bank headquartered in Gland, Switzerland. Combines the prestige and stability of Swiss banking with modern multi-asset trading technology.',
      spreadCambio: 'Secure interbank FX',
      brokerageFee: 'Swiss banking fee schedule',
      regulation: 'FINMA (Swiss Financial Market Supervisory Authority)',
      minDeposit: '$0 for trading account',
      features: [
        'Swiss statutory deposit guarantee up to CHF 100,000 per client',
        'Multi-currency accounts in CHF, EUR, USD, and GBP',
        'Direct access to hedge funds and international private equity',
      ],
    },
    webull: {
      country: 'United States',
      badge: 'Trading Tech & Charts',
      description:
        'Platform built around advanced charting and free real-time market data. Provides full extended-hours trading (4:00 AM to 8:00 PM New York time) at zero commission.',
      spreadCambio: 'Market rates',
      brokerageFee: '$0 Commission on Stocks & Options',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        'Full Pre-Market and After-Hours trading (16 hours a day)',
        'Advanced charts with dozens of free technical indicators',
        'Built-in Paper Trading simulator to practice strategies',
      ],
    },
    xtb: {
      country: 'United Kingdom / Poland',
      badge: 'Real Stocks + CFDs',
      description:
        'One of the largest stock-exchange listed brokers in Europe. Over 1 million clients use its award-winning xStation platform for 0% commission real stocks and derivatives.',
      spreadCambio: '0.5% on currency conversion',
      brokerageFee: '0% commission up to €100,000 monthly turnover',
      regulation: 'FCA (UK), KNF (Poland), CySEC',
      minDeposit: 'No minimum',
      features: [
        '0% commission across 3,000+ real stocks and ETFs',
        'Monthly interest paid on uninvested cash balances',
        'Award-winning xStation platform praised for execution speed',
      ],
    },
    binance: {
      country: 'Global',
      badge: 'World’s Largest by Volume',
      description:
        'The world’s largest digital asset exchange by daily trading volume. Trade Bitcoin, Ethereum, Solana, and hundreds of altcoins with instant PIX and SEPA rails.',
      spreadCambio: 'Direct order book parity',
      brokerageFee: 'From 0.075% (with BNB fee discount)',
      regulation: 'Global compliance & authorizations across multiple countries',
      minDeposit: 'R$ 10 via instant PIX',
      features: [
        'Instant deposits and withdrawals in BRL and Euros (EUR)',
        'Secure Asset Fund for Users (SAFU) emergency reserve',
        'Futures markets, yield Staking, and Launchpool rewards',
      ],
    },
    mercadobitcoin: {
      country: 'Brazil',
      badge: 'Largest in LatAm',
      description:
        'Crypto pioneer in Brazil since 2013 and licensed as a Payment Institution by the Central Bank of Brazil. Excels in digital assets, tokenized fixed income, and custody.',
      spreadCambio: 'Direct BRL pairs',
      brokerageFee: '0.3% to 0.7% per trade',
      regulation: 'Central Bank of Brazil (PI License), ABcripto',
      minDeposit: 'R$ 1 via PIX',
      platforms: ['MB App', 'Pro Web Portal'],
      features: [
        'Digital Fixed Income tokens with predictable yields above CDI',
        '24/7 customer support in Portuguese',
        '100% Brazilian custody with institutional-grade governance',
      ],
    },
    coinbase: {
      country: 'United States',
      badge: 'Nasdaq Listed (COIN)',
      description:
        'The flagship publicly traded crypto exchange on Nasdaq (COIN). Highest standard of public financial auditing, regulatory compliance, and institutional ETF custody.',
      spreadCambio: 'Transparent official spread',
      brokerageFee: 'From 0.05% on Coinbase Advanced',
      regulation: 'SEC, FinCEN, FCA (UK), BaFin (Germany)',
      minDeposit: '$2 / R$ 10',
      features: [
        'Public financial audits by a Big Four accounting firm',
        'Official custodian for most US spot Bitcoin and Ethereum ETFs',
        'Institutional-grade security guarantees for retail accounts',
      ],
    },
    kraken: {
      country: 'United States / Europe',
      badge: 'Impeccable Security Track Record',
      description:
        'Founded in 2011, one of the oldest and most respected crypto exchanges on earth. Renowned for its clean security record and client-verifiable Proof of Reserves.',
      spreadCambio: 'Deep EUR and USD order books',
      brokerageFee: 'From 0.16% Maker / 0.26% Taker',
      regulation: 'FinCEN (US), FCA (UK), AUSTRAC',
      minDeposit: '€10 / $10',
      features: [
        'Cryptographic Proof of Reserves audit verifiable by clients',
        'Deep liquidity in Euro (EUR) pairs with instant SEPA transfers',
        'Futures and margin trading with competitive funding',
      ],
    },
    foxbit: {
      country: 'Brazil',
      badge: 'Brazilian Pioneer',
      description:
        'One of Brazil’s first Bitcoin exchanges. Fast trading interface, 24/7 PIX deposits and withdrawals, and commercial crypto payment gateway solutions.',
      spreadCambio: 'BRL quoted pairs',
      brokerageFee: 'From 0.25%',
      regulation: 'ABcripto, Brazilian Federal Revenue (IN 1888)',
      minDeposit: 'R$ 10 via PIX',
      platforms: ['Foxbit App', 'Foxbit Pro Web'],
      features: [
        'Automated 24/7 PIX settlement any time of day or night',
        'Foxbit Pay to accept Bitcoin payments in retail businesses',
        'Ready-to-export annual tax compliance reports',
      ],
    },
    okx: {
      country: 'Global',
      badge: 'Web3 & DeFi Innovation',
      description:
        'Second-largest global exchange by derivatives volume. Market leader in non-custodial Web3 wallets supporting 80+ blockchains alongside instant fiat rails.',
      spreadCambio: 'Interbank screen pricing',
      brokerageFee: 'From 0.08%',
      regulation: 'VARA (Dubai), Bahamas, Hong Kong',
      minDeposit: 'R$ 10 via PIX',
      platforms: ['OKX Web3 Wallet', 'OKX App', 'Integrated TradingView'],
      features: [
        'Industry-leading non-custodial Web3 wallet across 80+ chains',
        'Instant zero-fee BRL deposits via PIX',
        'Native DEX aggregator and NFT/Ordinals marketplace integration',
      ],
    },
    bybit: {
      country: 'Global',
      badge: 'High Frequency & Futures',
      description:
        'High-liquidity platform favored by quantitative and derivatives traders. Ultra-low latency matching engine capable of 100,000 transactions per second.',
      spreadCambio: 'Deep-liquidity order book',
      brokerageFee: 'From 0.02% Maker / 0.055% Taker on futures',
      regulation: 'International licenses & regular Proof of Reserves',
      minDeposit: 'R$ 10 via PIX',
      platforms: ['Bybit App', 'Bybit Web Pro', 'High-Frequency API'],
      features: [
        'Copy Trading for high-liquidity perpetual futures contracts',
        'Built-in algorithmic trading bots (Grid Bots, DCA Bots)',
        'Support for PIX payments and international cards',
      ],
    },
  },
  es: {
    xp: {
      country: 'Brasil',
      badge: 'Mayor de Brasil',
      description:
        'El mayor ecosistema financiero independiente de Brasil. Amplio portafolio de acciones en B3, fondos inmobiliarios (FIIs), renta fija exclusiva y cuenta internacional integrada.',
      spreadCambio: '1,5% a 2,0%',
      brokerageFee: 'Cero para FIIs y Renta Fija; R$ 0 online',
      regulation: 'CVM, ANBIMA, Banco Central de Brasil',
      minDeposit: 'Sin monto mínimo',
      features: [
        'Asesoría especializada de inversiones',
        'Cuenta internacional en dólares integrada en la misma app',
        'Tarjeta XP Visa Infinite con investback',
      ],
    },
    btg: {
      country: 'Brasil',
      badge: 'Mejor Banco de Inversiones',
      description:
        'Mayor banco de inversiones de América Latina. Catálogo premium de renta fija con emisión propia, crédito estructurado y banca privada de primer nivel.',
      spreadCambio: '1,2% a 1,8%',
      brokerageFee: 'Cero en planes digitales',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'R$ 0 (Sin mínimo)',
      features: [
        'Solidez institucional y gobernanza de banco líder',
        'Renta fija con las mejores tasas de CDB y LCA del país',
        'Tarjeta Black modular con cashback o millas Livelo',
      ],
    },
    nuinvest: {
      country: 'Brasil',
      badge: 'Super App Popular',
      description:
        'Integración total de inversiones dentro de la aplicación de Nubank. Práctico para comprar acciones fraccionarias en B3, Tesouro Direto, CDBs y cripto en pocos toques.',
      spreadCambio: '1,5% vía transferencia internacional',
      brokerageFee: '100% Comisión Cero en Acciones, FIIs y BDRs',
      regulation: 'CVM, Banco Central de Brasil',
      minDeposit: 'R$ 1 vía PIX',
      platforms: ['App Nubank (iOS & Android)'],
      features: [
        'Experiencia móvil ultrarrápida e intuitiva',
        'Inversión en fracciones de acciones desde R$ 1',
        'Cajitas de ahorro con rendimiento del 100% del CDI inmediato',
      ],
    },
    rico: {
      country: 'Brasil',
      badge: 'Joven & Comisión Cero',
      description:
        'División del Grupo XP enfocada en inversores principiantes e intermedios. Comisión cero en activos principales, contenido educativo dinámico y carteras recomendadas.',
      spreadCambio: '1,5% a 2,0%',
      brokerageFee: 'Comisión Cero en Acciones, FIIs, BDRs y Renta Fija',
      regulation: 'CVM, ANBIMA, Banco Central de Brasil',
      minDeposit: 'Sin mínimo',
      platforms: ['App Rico', 'Home Broker Web', 'Profit Rico Trader'],
      features: [
        'Cero comisión de corretaje para operar en B3',
        'Carteras mensuales recomendadas de acciones y dividendos',
        'Modo Riconnect con cursos y seminarios en vivo',
      ],
    },
    clear: {
      country: 'Brasil',
      badge: 'Pionera Day Trade Cero',
      description:
        'El bróker que revolucionó el mercado brasileño al eliminar el corretaje. Especializado en traders activos de mini-índice, mini-dólar, acciones y swing trade con plataformas pro.',
      spreadCambio: 'N/A (Foco en B3)',
      brokerageFee: 'Cero Comisión en todas las operaciones en B3',
      regulation: 'CVM, ANBIMA (Grupo XP)',
      minDeposit: 'Sin mínimo',
      features: [
        'Cero comisión en Day Trade y Swing Trade',
        'Plataformas de alto rendimiento (Profit Pro gratis operando)',
        'Calculadora fiscal integrada para traders',
      ],
    },
    toro: {
      country: 'Brasil',
      badge: 'Grupo Santander',
      description:
        'Bróker del Banco Santander enfocado en usabilidad, recomendaciones de trading en un clic y modelo innovador ganar-ganar, además de cero corretaje.',
      spreadCambio: '1,4% a 1,9%',
      brokerageFee: 'Comisión Cero en Acciones, FIIs y Renta Fija',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'Sin mínimo',
      platforms: ['App Toro', 'Toro Trader (Profit)', 'Web'],
      features: [
        'Ganar-Ganar: solo pagas comisión si la operación recomendada da lucro',
        'Cashback en fondos de inversión',
        'Respaldo y solidez global del Banco Santander',
      ],
    },
    genial: {
      country: 'Brasil',
      badge: 'Alto Rendimiento',
      description:
        'Uno de los brókeres de mayor crecimiento en Brasil, combinando comisión cero en acciones y FIIs con infraestructura robusta para traders (DMA2 directo en B3 y salas en vivo).',
      spreadCambio: '1,3% a 1,8%',
      brokerageFee: 'Cero Comisión en Acciones, FIIs y BDRs',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'Sin mínimo',
      platforms: ['Profit Pro Gratis', 'Genial Trader', 'App Genial'],
      features: [
        'Profit Pro 100% gratis operando 1 minicontrato al mes',
        'Salas en vivo en YouTube con análisis técnico y de flujo',
        'Estudios macroeconómicos y electorales de referencia (Genial/Quaest)',
      ],
    },
    agora: {
      country: 'Brasil',
      badge: 'Bradesco BBI',
      description:
        'Casa de inversiones del Banco Bradesco. Conecta análisis premiados de Bradesco BBI con productos financieros tradicionales, notas estructuradas y asesoría.',
      spreadCambio: '1,5% a 2,0%',
      brokerageFee: 'Planes con comisión cero y asesoría',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'Sin mínimo',
      platforms: ['Ágora Mobile', 'Home Broker Ágora', 'Ágora Trader'],
      features: [
        'Informes y recomendaciones institucionales de Bradesco BBI',
        'Integración de saldo y cuentas para clientes Bradesco',
        'Ágora Academy con rutas educativas completas',
      ],
    },
    inter: {
      country: 'Brasil',
      badge: 'Brasil + EE. UU. Integrados',
      description:
        'Plataforma de inversiones de Banco Inter que une la Bolsa Brasileña (B3) y la Bolsa Americana (Nasdaq/NYSE) en la misma pantalla, con cambio directo y cero corretaje.',
      spreadCambio: '0,99% a 1,5% (uno de los menores spreads bancarios)',
      brokerageFee: 'Cero Comisión en B3 y acciones estadounidenses',
      regulation: 'CVM, Banco Central, SEC/FINRA (vía Apex)',
      minDeposit: 'R$ 0 / $ 1',
      platforms: ['Super App Inter (iOS & Android)', 'Home Broker Web'],
      features: [
        'Global Account con tarjeta de débito internacional Mastercard',
        'Cero comisión para negociar acciones en EE. UU. y Brasil',
        'Cashback diario en fondos y compras en Inter Shop',
      ],
    },
    c6: {
      country: 'Brasil',
      badge: 'Cuenta Global Dólar & Euro',
      description:
        'Solución de inversiones de C6 Bank (alianza JP Morgan). Destaca por su Cuenta Global multidivisa con soporte nativo para Dólar estadounidense y Euro de la Unión Europea.',
      spreadCambio: '1,0% a 2,0% en Dólar y Euro comercial',
      brokerageFee: 'Cero comisión en B3',
      regulation: 'CVM, Banco Central de Brasil',
      minDeposit: 'Sin mínimo',
      platforms: ['App C6 Bank'],
      features: [
        'Cuentas internacionales en Euro (€) y Dólar ($) con tarjetas dedicadas',
        'C6 TechInvest con carteras gestionadas por algoritmo',
        'Puntos Átomos que no caducan y se convierten en cashback o millas',
      ],
    },
    safra: {
      country: 'Brasil',
      badge: 'Private & Tradición',
      description:
        'División de inversiones del cuarto mayor banco privado de Brasil. Enfoque en altos patrimonios, preservación de capital, crédito privado y fondos Safra.',
      spreadCambio: 'Negociable con mesa de cambio',
      brokerageFee: 'Competitiva bajo consulta',
      regulation: 'CVM, Banco Central, ANBIMA',
      minDeposit: 'R$ 1.000 para apertura de cuenta',
      platforms: ['App Safra', 'Safra Internet Banking', 'Home Broker'],
      features: [
        'Reconocido mundialmente por su solidez y gestión conservadora',
        'Fondos de inversión Safra Galileu y Safra Consumo',
        'Atención consultiva y banca privada exclusiva',
      ],
    },
    guide: {
      country: 'Brasil',
      badge: 'Multinacional Fosun',
      description:
        'Bróker brasileño controlado por el conglomerado global Fosun. Ofrece asesoría personalizada, curaduría de fondos independientes y planes de previsión privada.',
      spreadCambio: '1,5%',
      brokerageFee: 'Planes exentos en renta variable',
      regulation: 'CVM, ANBIMA, Banco Central',
      minDeposit: 'Sin mínimo',
      platforms: ['Guide App', 'Home Broker Guide'],
      features: [
        'Análisis de mercado con visión macroeconómica global',
        'Plataforma completa de fondos y previsión',
        'Apoyo consultivo personalizado con asesores acreditados',
      ],
    },
    ibkr: {
      country: 'Estados Unidos / Global',
      badge: 'Líder Mundial Absoluto',
      description:
        'El bróker internacional más completo del planeta. Acceso directo a más de 150 bolsas en 33 países operando Dólar, Euro, Libra y Yen con los menores márgenes.',
      spreadCambio: 'Desde 0,08% (tasa interbancaria institucional)',
      brokerageFee: 'Desde $0.005 / acción en EE. UU.; €1,25 en Europa',
      regulation: 'SEC, FINRA, SIPC, FCA (Reino Unido), BaFin (Alemania)',
      minDeposit: '$0 (Sin depósito mínimo)',
      features: [
        'Negociación en bolsas europeas (DAX, Euronext París, Ámsterdam, Londres)',
        'Remuneración sobre saldo de efectivo en dólar y euro no invertido',
        'Menores tasas de margen y apalancamiento del mercado global',
      ],
    },
    avenue: {
      country: 'Estados Unidos / Brasil',
      badge: 'Líder para Brasileños',
      description:
        'Fundado en EE. UU. con foco en inversores latinoamericanos y brasileños. Interfaz accesible, soporte dedicado, fondeo rápido y reportes fiscales automatizados.',
      spreadCambio: '1,4% a 2,0% (decreciente por volumen)',
      brokerageFee: 'Cero comisión en planes seleccionados',
      regulation: 'SEC, FINRA, SIPC (Protección hasta $500k)',
      minDeposit: 'R$ 100 vía PIX con conversión inmediata',
      platforms: ['App Avenue (iOS & Android)', 'Portal Web'],
      features: [
        'Depósitos vía PIX con conversión inmediata a dólares',
        'Informe fiscal automatizado para declaración anual',
        'Tarjeta de débito Avenue Mastercard aceptada en todo el mundo',
      ],
    },
    nomad: {
      country: 'Estados Unidos / Brasil',
      badge: 'Cuenta Global & Viajes',
      description:
        'Fintech con sede en EE. UU. que ofrece cuenta corriente en dólares y plataforma de inversión en Wall Street. Destaca por su tarjeta de débito para viajes a Europa y compras globales.',
      spreadCambio: '1,0% a 2,0% con programa Nomad Pass',
      brokerageFee: 'Cero comisión en acciones y ETFs de EE. UU.',
      regulation: 'SIPC (Hasta $500.000), FDIC (Hasta $250.000 en banca)',
      minDeposit: 'R$ 100 vía PIX',
      platforms: ['App Nomad (iOS & Android)'],
      features: [
        'Tarjeta aceptada en más de 180 países con impuesto reducido',
        'Salas VIP en el Aeropuerto de Guarulhos para clientes fidelizados',
        'Inversión en fracciones de acciones desde $1',
      ],
    },
    schwab: {
      country: 'Estados Unidos',
      badge: 'Mayor Bróker de EE. UU.',
      description:
        'Una de las mayores gestoras de patrimonio del mundo. Brinda a inversores internacionales la renombrada plataforma thinkorswim, análisis de Wall Street y máxima solidez.',
      spreadCambio: 'Interbancario directo',
      brokerageFee: '$0 en acciones y ETFs listados en EE. UU.',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$25.000 para cuentas internacionales',
      features: [
        'Plataforma thinkorswim de vanguardia para análisis técnico y opciones',
        'Estudios y calificaciones de reconocidos analistas de Wall Street',
        'Cuenta bancaria con reembolso ilimitado de comisiones en cajeros (ATMs)',
      ],
    },
    fidelity: {
      country: 'Estados Unidos',
      badge: 'Gigante de Wall Street',
      description:
        'Pilar del mercado de capitales estadounidense con billones de dólares bajo custodia. Famosa por fondos indexados con comisión ZERO y ejecución superior de órdenes.',
      spreadCambio: 'Interbancario de mercado',
      brokerageFee: '$0 para acciones y ETFs estadounidenses online',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0 para residentes / bajo consulta para no residentes',
      features: [
        'Mejora de precio líder del mercado en la ejecución de órdenes',
        'Fondos Fidelity ZERO con 0,00% de comisión de gestión',
        'Herramientas integrales de planificación para el retiro',
      ],
    },
    robinhood: {
      country: 'Estados Unidos / Europa',
      badge: 'Pionera Zero Fee',
      description:
        'El bróker que democratizó el acceso a Wall Street para la generación moderna. Ofrece negociación de acciones, opciones y criptoactivos 24 horas al día con interfaz simple.',
      spreadCambio: 'Incluido en el spread de mercado',
      brokerageFee: '$0 en todas las acciones y ETFs de EE. UU.',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        'Trading 24 Horas en acciones seleccionadas de EE. UU.',
        'Rendimiento sobre saldo de efectivo en dólares (Robinhood Gold)',
        'Billetera Web3 nativa para transferencias cripto',
      ],
    },
    etoro: {
      country: 'Reino Unido / Europa',
      badge: 'Líder en Copy Trading',
      description:
        'Pionero global en inversión social y Copy Trading. Permite replicar automáticamente las carteras y operaciones de inversores verificados de todo el mundo.',
      spreadCambio: 'Spread estándar de mercado',
      brokerageFee: 'Cero comisión en acciones y ETFs',
      regulation: 'FCA (Reino Unido), CySEC (Chipre), ASIC (Australia), FinCEN',
      minDeposit: '$50 a $100',
      platforms: ['eToro Web Trader', 'App eToro'],
      features: [
        'CopyTrader: replicación automática de carteras de inversores verificados',
        'Smart Portfolios temáticos (IA, Energías Limpias, Dividendos)',
        'Soporte para acciones de EE. UU., Europa y criptomonedas en una cartera',
      ],
    },
    saxobank: {
      country: 'Dinamarca / Europa',
      badge: 'Banco de Trading Europeo',
      description:
        'Banco danés especializado en negociación multiactivo global. Conecta más de 71.000 instrumentos financieros entre acciones europeas, bonos soberanos y divisas.',
      spreadCambio: 'Spreads institucionales estrechos',
      brokerageFee: 'Comisiones bajas y transparentes en Europa',
      regulation: 'Danish FSA (Dinamarca), FCA, BaFin, FINMA',
      minDeposit: '€0 (Sin mínimo)',
      platforms: ['SaxoTraderGO', 'SaxoTraderPRO (Multipantalla)'],
      features: [
        'Acceso a todas las bolsas de la Eurozona cotizadas en €',
        'Licencia bancaria completa con garantía europea de depósitos',
        'Amplio catálogo de bonos soberanos de Europa y EE. UU.',
      ],
    },
    degiro: {
      country: 'Alemania / Países Bajos',
      badge: 'Líder Europeo Low Cost',
      description:
        'Mayor bróker minorista de Europa (Grupo flatexDEGIRO). Amplia presencia en más de 18 países europeos con comisiones ultrabajas para DAX, CAC 40 y bolsas globales.',
      spreadCambio: '0,25% (Auto FX)',
      brokerageFee: '€1 a €2 por orden en Europa / EE. UU.',
      regulation: 'BaFin (Alemania), Bundesbank, AFM (Países Bajos)',
      minDeposit: '€0,01',
      features: [
        'Selección de ETFs populares con comisión de corretaje CERO',
        'Depósito bancario directo con IBAN en euros',
        'Más de 50 bolsas internacionales accesibles en una sola cuenta',
      ],
    },
    swissquote: {
      country: 'Suiza',
      badge: 'Banco Suizo Privado',
      description:
        'Banco líder en trading online con sede en Gland, Suiza. Combina el prestigio y la estabilidad histórica de la banca suiza con tecnología financiera moderna.',
      spreadCambio: 'Interbancario seguro',
      brokerageFee: 'Tarifario bancario suizo',
      regulation: 'FINMA (Autoridad Supervisora del Mercado Financiero Suizo)',
      minDeposit: '$0 para cuenta de trading',
      features: [
        'Garantía legal suiza de depósitos hasta CHF 100.000 por cliente',
        'Negociación en Franco Suizo (CHF), Euro (EUR), Dólar (USD) y Libra (GBP)',
        'Acceso directo a fondos de cobertura y private equity internacional',
      ],
    },
    webull: {
      country: 'Estados Unidos',
      badge: 'Trading Tech & Gráficos',
      description:
        'Plataforma enfocada en gráficos avanzados y datos de mercado gratuitos. Ofrece horario extendido completo (4:00 a 20:00 de Nueva York) y cero comisiones.',
      spreadCambio: 'Tasas de mercado',
      brokerageFee: '$0 Comisión en Acciones y Opciones',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        'Negociación completa en Pre-Market y After-Hours (16 horas al día)',
        'Gráficos avanzados con decenas de indicadores técnicos sin costo',
        'Simulador de inversiones (Paper Trading) integrado',
      ],
    },
    xtb: {
      country: 'Reino Unido / Polonia',
      badge: 'Acciones Reales + CFD',
      description:
        'Uno de los mayores brókeres cotizados en bolsa de Europa. Más de 1 millón de clientes usan su premiada plataforma xStation para acciones reales con 0% de comisión y derivados.',
      spreadCambio: '0,5% en conversión de divisas',
      brokerageFee: '0% de comisión hasta €100.000 de volumen mensual',
      regulation: 'FCA (Reino Unido), KNF (Polonia), CySEC',
      minDeposit: 'Sin mínimo',
      features: [
        '0% de comisión en más de 3.000 acciones y ETFs reales',
        'Intereses mensuales pagados sobre el saldo en efectivo no invertido',
        'Plataforma xStation premiada por su velocidad de ejecución',
      ],
    },
    binance: {
      country: 'Global',
      badge: 'Mayor del Mundo en Volumen',
      description:
        'La mayor exchange de activos digitales del mundo por volumen diario. Negociación de Bitcoin, Ethereum, Solana y cientos de altcoins con depósitos inmediatos.',
      spreadCambio: 'Paridad directa de libro de órdenes',
      brokerageFee: 'Desde 0,075% (con descuento pagando en BNB)',
      regulation: 'Cumplimiento global y autorizaciones en decenas de países',
      minDeposit: 'R$ 10 vía PIX instantáneo',
      features: [
        'Depósitos y retiros instantáneos en Reales (BRL) y Euros (EUR)',
        'Fondo de Garantía Seguro de Activos para Usuarios (SAFU)',
        'Mercado de Futuros, Staking con rendimientos y Launchpool',
      ],
    },
    mercadobitcoin: {
      country: 'Brasil',
      badge: 'Mayor de América Latina',
      description:
        'Pionera en criptomonedas en Brasil desde 2013 y licenciada como Institución de Pago por el Banco Central. Destaca en criptoactivos, tokens de renta fija y seguridad.',
      spreadCambio: 'Pares directos en Reales',
      brokerageFee: '0,3% a 0,7% por operación',
      regulation: 'Banco Central de Brasil (Licencia IP), ABcripto',
      minDeposit: 'R$ 1 vía PIX',
      platforms: ['App MB', 'Portal Web Pro'],
      features: [
        'Renta Fija Digital con rendimientos previsibles superiores al CDI',
        'Soporte humanizado 24/7',
        'Custodia 100% en Brasil con gobernanza institucional',
      ],
    },
    coinbase: {
      country: 'Estados Unidos',
      badge: 'Bolsa Nasdaq (COIN)',
      description:
        'Exchange de criptoactivos cotizada públicamente en Nasdaq (COIN). Máximo estándar de auditoría contable, cumplimiento regulatorio y custodia para ETFs de Bitcoin.',
      spreadCambio: 'Spread oficial transparente',
      brokerageFee: 'Desde 0,05% en Coinbase Advanced',
      regulation: 'SEC, FinCEN, FCA (Reino Unido), BaFin (Alemania)',
      minDeposit: '$2 / R$ 10',
      features: [
        'Auditoría contable pública por firma Big Four',
        'Custodio oficial de casi todos los ETFs de Bitcoin y Ethereum de EE. UU.',
        'Garantía de seguridad institucional para clientes minoristas',
      ],
    },
    kraken: {
      country: 'Estados Unidos / Europa',
      badge: 'Seguridad Histórica Impecable',
      description:
        'Fundada en 2011, es una de las exchanges más antiguas y respetadas del planeta. Conocida por su historial impecable de seguridad y su Prueba de Reservas auditada.',
      spreadCambio: 'Pares directos profundos en EUR y USD',
      brokerageFee: 'Desde 0,16% Maker / 0,26% Taker',
      regulation: 'FinCEN (EE. UU.), FCA (Reino Unido), AUSTRAC',
      minDeposit: '€10 / $10',
      features: [
        'Auditoría de Prueba de Reservas (Proof of Reserves) verificable por el cliente',
        'Liquidez profunda en pares de Euro (EUR) con transferencias SEPA',
        'Trading de futuros con márgenes competitivos',
      ],
    },
    foxbit: {
      country: 'Brasil',
      badge: 'Tradición Brasileña',
      description:
        'Una de las primeras exchanges de Bitcoin creadas en Brasil. Plataforma rápida, depósitos y retiros 24 horas al día y soluciones de pasarela de pago para comercios.',
      spreadCambio: 'Cotización en Reales',
      brokerageFee: 'Desde 0,25%',
      regulation: 'ABcripto, Hacienda Federal de Brasil (IN 1888)',
      minDeposit: 'R$ 10 vía PIX',
      platforms: ['App Foxbit', 'Foxbit Pro Web'],
      features: [
        'Liquidación PIX automática las 24 horas',
        'Foxbit Pay para aceptar pagos en Bitcoin en comercios',
        'Informes listos para declaración fiscal anual',
      ],
    },
    okx: {
      country: 'Global',
      badge: 'Innovación Web3 & DeFi',
      description:
        'Segunda mayor exchange mundial por volumen de derivados. Líder en billeteras Web3 sin custodia con soporte para más de 80 blockchains y depósitos rápidos.',
      spreadCambio: 'Precio interbancario en pantalla',
      brokerageFee: 'Desde 0,08%',
      regulation: 'VARA (Dubái), Bahamas, Hong Kong',
      minDeposit: 'R$ 10 vía PIX',
      platforms: ['OKX Web3 Wallet', 'OKX App', 'TradingView Integrado'],
      features: [
        'Potente billetera Web3 sin custodia multired',
        'Depósito instantáneo en Reales vía PIX sin comisiones',
        'Integración nativa con DEXs y mercado NFT/Ordinals',
      ],
    },
    bybit: {
      country: 'Global',
      badge: 'Alta Frecuencia & Futuros',
      description:
        'Plataforma de alta liquidez preferida por traders cuantitativos y profesionales de derivados. Motor de ejecución con capacidad de 100.000 transacciones por segundo.',
      spreadCambio: 'Libro de órdenes de alta liquidez',
      brokerageFee: 'Desde 0,02% Maker / 0,055% Taker en futuros',
      regulation: 'Licencias internacionales y Prueba de Reservas periódica',
      minDeposit: 'R$ 10 vía PIX',
      platforms: ['Bybit App', 'Bybit Web Pro', 'API de Alta Frecuencia'],
      features: [
        'Copy Trading de contratos futuros de alta liquidez',
        'Bots algorítmicos integrados (Grid Bots, DCA Bots)',
        'Soporte para pagos vía PIX y tarjetas internacionales',
      ],
    },
  },
};

export function getLocalizedBroker(broker: BrokerInfo, lang: SupportedLanguage): BrokerInfo {
  if (lang === 'pt') return broker;
  const override = BROKER_OVERRIDES[lang]?.[broker.id];
  if (!override) return broker;
  return {
    ...broker,
    ...override,
  };
}
