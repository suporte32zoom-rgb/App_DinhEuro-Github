import type { MarketCategoryFilter, NavigationTab } from '../context/MarketContext';

export type SupportedLanguage = 'pt' | 'en' | 'es';

export const LANG_STORAGE_KEY = 'dinheuro_lang';

export const HTML_LANG_MAP: Record<SupportedLanguage, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

export interface AppTranslations {
  header: {
    financialHubs: string;
    syncTooltip: string;
    hubSubtitle: string;
    searchPlaceholder: string;
    openSearchAria: string;
    themeLight: string;
    themeDark: string;
    openMenuAria: string;
    categoriesLabel: string;
    categoriesShort: string;
    allAssets: string;
    assetsCountLabel: string;
    displayCurrency: string;
    drawerSubtitle: string;
    drawerNavTitle: string;
    drawerCategoriesTitle: string;
    drawerFooterNote: string;
    searchResults: string;
    featuredAssets: string;
    noAssetFound: string;
    nav: Record<
      | 'dashboard'
      | 'mercados'
      | 'carteiras'
      | 'noticias'
      | 'corretoras'
      | 'daytrade'
      | 'tape_reading'
      | 'renda_fixa'
      | 'graficos'
      | 'ferramentas'
      | 'academy'
      | 'sobre',
      string
    >;
    categories: Record<
      MarketCategoryFilter,
      { label: string; shortLabel: string; description: string }
    >;
  };
  dashboard: {
    liveBadge: string;
    heroTitlePrefix: string;
    heroSubtitle: string;
    chartAction: string;
    thermometerTitle: string;
    riskAppetiteBadge: string;
    moderateGreed: string;
    extremeFear: string;
    neutral: string;
    optimism: string;
    quickSimulator: string;
    swapTooltip: string;
    convertedResult: string;
    worldIndicesTitle: string;
    updatedAt: string;
    marketHighlightsTitle: string;
    viewAllStocks: string;
    topGainers: string;
    topLosers: string;
    varPercent: string;
    currencyMatrixTitle: string;
    synchronized: string;
    matrixSubtitle: string;
    openFullSimulator: string;
    newsTitle: string;
    verifiedFeed: string;
    viewAllNews: string;
    readArticle: string;
  };
  calculator: {
    title: string;
    sourceLabel: string;
    sourceLive: string;
    sourceFallback: string;
    currenciesListed: string;
    updatedAt: string;
    marketRef: string;
    bidMode: string;
    askMode: string;
    refresh: string;
    syncing: string;
    fallbackNotice: string;
    retry: string;
    sourceAmount: string;
    convertedAmount: string;
    buyLabel: string;
    sellLabel: string;
    swapButton: string;
    brlEquivalent: string;
    dayHigh: string;
    dayLow: string;
    baseParity: string;
    activeMode: string;
    change24h: string;
    toggleRemittanceFees: string;
    brokerSpread: string;
    iofLabel: string;
    netEffectiveTotal: string;
    matrixTitle: string;
    matrixHint: string;
  };
  academyHighlight: {
    eyebrow: string;
    freeBadge: string;
    title: string;
    subtitle: string;
    viewAllCourses: string;
    modulesLabel: string;
    freeTag: string;
    freeAccess: string;
    accessLesson: string;
  };
  markets: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    refreshBtn: string;
    assetsListed: string;
    showingOf: string;
    loadMore: string;
    loadAll: string;
  };
  tools: {
    title: string;
    subtitle: string;
    tabFx: string;
    tabCompound: string;
    tabInflation: string;
    tabTax: string;
  };
  footer: {
    tagline: string;
    description: string;
    infraStatus: string;
    lgpdCompliance: string;
    dpoLabel: string;
    navHubTitle: string;
    resourcesTitle: string;
    legalTitle: string;
    backToTop: string;
    cookiePrefs: string;
    disclaimerPrefix: string;
    brandProtection: string;
    copyrightSuffix: string;
    navDashboard: string;
    navMarkets: string;
    navPortfolios: string;
    navNews: string;
    navBrokers: string;
    resCharts: string;
    resTools: string;
    resAcademy: string;
    resAbout: string;
    terms: string;
    privacy: string;
    cookies: string;
    disclaimer: string;
  };
  seoBlock: {
    eyebrow: string;
    heading: string;
    lead: string;
    cards: {
      title: string;
      body: string;
    }[];
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, AppTranslations> = {
  pt: {
    header: {
      financialHubs: 'Centros Financeiros:',
      syncTooltip: 'Clique para sincronizar cotações agora',
      hubSubtitle: 'Hub Financeiro em Tempo Real',
      searchPlaceholder: 'Buscar ações (AAPL, PETR4), pares forex, cripto, índices...',
      openSearchAria: 'Abrir busca de ativos',
      themeLight: 'Tema Claro',
      themeDark: 'Tema Escuro',
      openMenuAria: 'Abrir menu de navegação lateral',
      categoriesLabel: 'Categorias',
      categoriesShort: 'Categorias',
      allAssets: 'Todos os Ativos',
      assetsCountLabel: 'ativos',
      displayCurrency: 'Moeda de Exibição',
      drawerSubtitle: 'Menu Institucional',
      drawerNavTitle: 'Navegação Principal',
      drawerCategoriesTitle: 'Categorias de Mercado',
      drawerFooterNote: 'DinhEuro • Cotações em Tempo Real',
      searchResults: 'Resultados Encontrados',
      featuredAssets: 'Ativos em Destaque',
      noAssetFound: 'Nenhum ativo encontrado. Tente outro símbolo ou nome.',
      nav: {
        dashboard: 'Início',
        mercados: 'Mercados',
        carteiras: 'Carteiras',
        noticias: 'Notícias & Macro',
        corretoras: 'Corretoras Globais',
        daytrade: 'Day Trade & Scalping',
        tape_reading: 'Fluxo & Tape Reading',
        renda_fixa: 'Renda Fixa & Derivativos',
        graficos: 'Gráficos Avançados',
        ferramentas: 'Ferramentas',
        academy: 'Academy',
        sobre: 'Sobre o DinhEuro',
      },
      categories: {
        all: {
          label: 'Todos os Ativos',
          shortLabel: 'Todos',
          description: 'Catálogo completo em tempo real',
        },
        stocks_br: {
          label: 'Ações Brasil (B3)',
          shortLabel: 'B3',
          description: 'PETR4, VALE3, ITUB4, WEGE3...',
        },
        stocks_us: {
          label: 'Ações EUA (Wall St)',
          shortLabel: 'EUA',
          description: 'AAPL, NVDA, MSFT, TSLA...',
        },
        indices: {
          label: 'Índices Mundiais',
          shortLabel: 'Índices',
          description: 'Ibovespa, S&P 500, Nasdaq, DAX...',
        },
        forex: {
          label: 'Câmbio & Forex',
          shortLabel: 'Câmbio',
          description: 'USD/BRL, EUR/BRL, EUR/USD...',
        },
        crypto: {
          label: 'Criptomoedas',
          shortLabel: 'Cripto',
          description: 'Bitcoin, Ethereum, Solana...',
        },
        commodities: {
          label: 'Commodities',
          shortLabel: 'Commodities',
          description: 'Ouro, Petróleo Brent, Prata...',
        },
      },
    },
    dashboard: {
      liveBadge: 'Dados Globais em Tempo Real • Câmbio Interbancário, Bolsas Mundiais & Criptoativos',
      heroTitlePrefix: 'Hub Financeiro Global',
      heroSubtitle:
        'Monitore cotações internacionais e B3, câmbio universal com Euro e Dólar, índices mundiais, criptomoedas e análises no padrão institucional dos maiores terminais de finanças.',
      chartAction: 'Gráfico ↗',
      thermometerTitle: 'Termômetro de Mercado',
      riskAppetiteBadge: 'Apetite por Risco',
      moderateGreed: 'Ganância Moderada',
      extremeFear: '0 Medo Extremo',
      neutral: '50 Neutro',
      optimism: '100 Otimismo',
      quickSimulator: 'Simulador Instantâneo',
      swapTooltip: 'Inverter Moedas',
      convertedResult: 'Resultado Convertido:',
      worldIndicesTitle: 'Índices Mundiais de Referência',
      updatedAt: 'Atualizado:',
      marketHighlightsTitle: 'Destaques do Mercado (Ações Globais & B3)',
      viewAllStocks: 'Ver todas as ações do mercado',
      topGainers: 'Maiores Altas (24h)',
      topLosers: 'Maiores Baixas (24h)',
      varPercent: 'Var %',
      currencyMatrixTitle: 'Matriz Cambial Global',
      synchronized: 'Sincronizada',
      matrixSubtitle: 'Cotações universais unificadas entre a Home e o Simulador Interno:',
      openFullSimulator: 'Abrir Simulador Completo',
      newsTitle: 'Notícias & Análises em Tempo Real',
      verifiedFeed: 'Feed Verificado',
      viewAllNews: 'Ver todas as análises',
      readArticle: 'Ler matéria',
    },
    calculator: {
      title: 'Calculadora de Câmbio Universal',
      sourceLabel: '',
      sourceLive: 'Cotações Interbancárias Globais em Tempo Real',
      sourceFallback: 'Taxas Interbancárias Sincronizadas em Contingência',
      currenciesListed: 'moedas listadas no DinhEuro',
      updatedAt: 'Atualizado às',
      marketRef: 'Ref. mercado:',
      bidMode: 'Compra (Bid)',
      askMode: 'Venda (Ask)',
      refresh: 'Atualizar',
      syncing: 'Sincronizando...',
      fallbackNotice:
        'Conexão interbancária em contingência no momento. Exibindo conversão com taxas sincronizadas em cache.',
      retry: 'Tentar reconectar',
      sourceAmount: 'Valor de origem',
      convertedAmount: 'Valor convertido',
      buyLabel: 'Compra',
      sellLabel: 'Venda',
      swapButton: 'Inverter',
      brlEquivalent: 'Equivalente em Real (BRL)',
      dayHigh: 'Máx. Dia',
      dayLow: 'Mín. Dia',
      baseParity: 'Paridade Base',
      activeMode: 'Modo Ativo',
      change24h: 'Variação 24h',
      toggleRemittanceFees: 'Simular custos de remessa internacional (Spread bancário e IOF)',
      brokerSpread: 'Spread da Corretora / Banco (%)',
      iofLabel: 'IOF Cambial (%) — 1,1% conta mesma titularidade / 0,38% terceiros',
      netEffectiveTotal: 'Total Líquido Efetivo:',
      matrixTitle: 'Conversão Simultânea — Principais Moedas Listadas no DinhEuro',
      matrixHint: 'Clique em qualquer moeda para selecioná-la como destino',
    },
    academyHighlight: {
      eyebrow: 'Educação Financeira',
      freeBadge: '100% Gratuito',
      title: 'DinhEuro Academy — Trilhas Práticas de Mercado',
      subtitle:
        'Cursos estruturados em módulos de leitura interativa com exemplos numéricos aplicados e acesso direto às ferramentas do portal.',
      viewAllCourses: 'Ver Todos os Cursos',
      modulesLabel: 'Módulos',
      freeTag: 'GRATUITO',
      freeAccess: 'Acesso Livre',
      accessLesson: 'Acessar Aula',
    },
    markets: {
      title: 'Mercados Globais & B3 em Tempo Real',
      subtitle:
        'Acompanhe cotações ao vivo de ações americanas, ações brasileiras (B3), câmbio comercial, criptomoedas, commodities e índices mundiais.',
      searchPlaceholder: 'Filtrar ativo por símbolo ou empresa (ex: EUR, AAPL, PETR4, BTC)...',
      refreshBtn: 'Atualizar Cotações',
      assetsListed: 'ativos monitorados',
      showingOf: 'Exibindo',
      loadMore: 'Carregar mais ativos',
      loadAll: 'Exibir todos',
    },
    tools: {
      title: 'Ferramentas & Simuladores Financeiros Globais',
      subtitle:
        'Cálculos precisos em tempo real para conversão de Euro para Real, dólar comercial, planejamento de juros compostos e tributação.',
      tabFx: 'Calculadora de Câmbio Universal',
      tabCompound: 'Juros Compostos & Renda Fixa',
      tabInflation: 'Poder de Compra & Inflação',
      tabTax: 'Calculadora de Lucro & Imposto (DARF)',
    },
    footer: {
      tagline: 'Hub Global de Finanças e Moedas',
      description:
        'Plataforma digital de dados econômicos em tempo real, paridade universal Euro-Dólar-Real, cotações mundiais e ferramentas analíticas sem paywall.',
      infraStatus: 'Operação Global • Infraestrutura em Nuvem de Alta Disponibilidade',
      lgpdCompliance: 'Em conformidade com a LGPD (Lei nº 13.709/2018) & SSL 256-bit',
      dpoLabel: 'Encarregado de Dados (DPO):',
      navHubTitle: 'Navegação do Hub',
      resourcesTitle: 'Recursos & Análise',
      legalTitle: 'Jurídico & LGPD',
      backToTop: 'Voltar ao topo',
      cookiePrefs: 'Preferências de Cookies',
      disclaimerPrefix: 'Aviso de Risco e Isenção de Responsabilidade Financeira:',
      brandProtection:
        'DinhEuro™ — Marca com registro requerido junto ao INPI (Processo nº 942746848). É expressamente proibida a cópia, reprodução, imitação ou utilização total ou parcial do nome, marca, logotipo, layout, conteúdos ou funcionalidades deste portal em quaisquer sites, aplicativos, plataformas ou categorias comerciais sem autorização prévia e por escrito do titular.',
      copyrightSuffix: 'Todos os direitos reservados.',
      navDashboard: 'Início (Dashboard)',
      navMarkets: 'Mercados Mundiais',
      navPortfolios: 'Minhas Carteiras',
      navNews: 'Notícias & Análises',
      navBrokers: 'Guia de Corretoras',
      resCharts: 'Terminal Gráfico D3 v7',
      resTools: 'Simuladores & Câmbio',
      resAcademy: 'Academy & Glossário',
      resAbout: 'Sobre o DinhEuro',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      cookies: 'Política de Cookies',
      disclaimer: 'Aviso Legal / Disclaimer',
    },
    seoBlock: {
      eyebrow: 'Guia & Indexação Global de Cotações',
      heading: 'Cotação do Euro Hoje, Dólar Comercial e Moedas Fortes em Tempo Real',
      lead:
        'O DinhEuro consolida em uma única interface institucional o acompanhamento contínuo de câmbio internacional, bolsas brasileiras e americanas, renda fixa e criptoativos para investidores e viajantes.',
      cards: [
        {
          title: 'Cotação do Euro hoje em Real (EUR/BRL)',
          body: 'Consulte o valor do Euro comercial hoje convertido automaticamente para Real Brasileiro na calculadora padrão (1 EUR → BRL), com cálculo imediato de paridade direta, inversa, máxima, mínima diária e simulação opcional de spread e IOF para remessas.',
        },
        {
          title: 'Valor do Dólar comercial hoje (USD/BRL)',
          body: 'Acompanhe a oscilação do Dólar comercial em tempo real frente ao Real e ao Euro (EUR/USD), integrando dados interbancários para tomada de decisão em câmbio, proteção patrimonial em moeda forte e comércio exterior.',
        },
        {
          title: 'Moedas fortes, Bolsas e Criptoativos',
          body: 'Monitoramento unificado de USD, EUR, GBP, CHF, JPY, CAD, AUD, ARS, índices como Ibovespa, S&P 500, Nasdaq e DAX, além de Bitcoin, Ethereum e Solana com conversão instantânea entre moedas.',
        },
      ],
    },
  },
  en: {
    header: {
      financialHubs: 'Financial Hubs:',
      syncTooltip: 'Click to sync live quotes now',
      hubSubtitle: 'Real-Time Global Financial Hub',
      searchPlaceholder: 'Search stocks (AAPL, PETR4), forex pairs, crypto, indices...',
      openSearchAria: 'Open asset search',
      themeLight: 'Light Theme',
      themeDark: 'Dark Theme',
      openMenuAria: 'Open navigation drawer',
      categoriesLabel: 'Categories',
      categoriesShort: 'Categories',
      allAssets: 'All Assets',
      assetsCountLabel: 'assets',
      displayCurrency: 'Display Currency',
      drawerSubtitle: 'Institutional Menu',
      drawerNavTitle: 'Main Navigation',
      drawerCategoriesTitle: 'Market Categories',
      drawerFooterNote: 'DinhEuro • Real-Time Quotes',
      searchResults: 'Search Results',
      featuredAssets: 'Featured Assets',
      noAssetFound: 'No matching asset found. Try another ticker or name.',
      nav: {
        dashboard: 'Home',
        mercados: 'Markets',
        carteiras: 'Portfolios',
        noticias: 'News & Macro',
        corretoras: 'Global Brokers',
        daytrade: 'Day Trade & Scalping',
        tape_reading: 'Order Flow & DOM',
        renda_fixa: 'Fixed Income & Options',
        graficos: 'Advanced Charts',
        ferramentas: 'Tools',
        academy: 'Academy',
        sobre: 'About DinhEuro',
      },
      categories: {
        all: {
          label: 'All Assets',
          shortLabel: 'All',
          description: 'Complete real-time market catalog',
        },
        stocks_br: {
          label: 'Brazil Equities (B3)',
          shortLabel: 'B3',
          description: 'PETR4, VALE3, ITUB4, WEGE3...',
        },
        stocks_us: {
          label: 'US Equities (Wall St)',
          shortLabel: 'US',
          description: 'AAPL, NVDA, MSFT, TSLA...',
        },
        indices: {
          label: 'World Indices',
          shortLabel: 'Indices',
          description: 'S&P 500, Nasdaq, Ibovespa, DAX...',
        },
        forex: {
          label: 'Forex & Currencies',
          shortLabel: 'Forex',
          description: 'EUR/BRL, USD/BRL, EUR/USD...',
        },
        crypto: {
          label: 'Cryptocurrencies',
          shortLabel: 'Crypto',
          description: 'Bitcoin, Ethereum, Solana...',
        },
        commodities: {
          label: 'Commodities',
          shortLabel: 'Commodities',
          description: 'Gold, Brent Crude, Silver...',
        },
      },
    },
    dashboard: {
      liveBadge: 'Real-Time Global Data • Interbank FX, World Equities & Digital Assets',
      heroTitlePrefix: 'Global Financial Hub',
      heroSubtitle:
        'Track live USD/BRL, EUR/BRL exchange rates, global equity markets, Brazilian B3 equities, crypto assets, and macro intelligence in one institutional terminal.',
      chartAction: 'Chart ↗',
      thermometerTitle: 'Market Sentiment',
      riskAppetiteBadge: 'Risk Appetite',
      moderateGreed: 'Moderate Greed',
      extremeFear: '0 Extreme Fear',
      neutral: '50 Neutral',
      optimism: '100 Optimism',
      quickSimulator: 'Instant Converter',
      swapTooltip: 'Swap Currencies',
      convertedResult: 'Converted Result:',
      worldIndicesTitle: 'Benchmark World Indices',
      updatedAt: 'Updated:',
      marketHighlightsTitle: 'Market Movers (Global & B3 Equities)',
      viewAllStocks: 'View all market equities',
      topGainers: 'Top Gainers (24h)',
      topLosers: 'Top Losers (24h)',
      varPercent: 'Chg %',
      currencyMatrixTitle: 'Global FX Matrix',
      synchronized: 'Synchronized',
      matrixSubtitle: 'Unified live currency rates across Home and FX Tools:',
      openFullSimulator: 'Open Full FX Converter',
      newsTitle: 'Real-Time Financial News & Macro',
      verifiedFeed: 'Verified Feed',
      viewAllNews: 'View all briefings',
      readArticle: 'Read article',
    },
    calculator: {
      title: 'Universal Currency Calculator',
      sourceLabel: '',
      sourceLive: 'Global Interbank Quotes in Real Time',
      sourceFallback: 'Synced Interbank Contingency Rates',
      currenciesListed: 'currencies listed on DinhEuro',
      updatedAt: 'Updated at',
      marketRef: 'Market ref:',
      bidMode: 'Bid (Buy)',
      askMode: 'Ask (Sell)',
      refresh: 'Refresh',
      syncing: 'Syncing...',
      fallbackNotice:
        'Live interbank feed temporarily in contingency mode. Displaying synced cached rates.',
      retry: 'Reconnect',
      sourceAmount: 'Source amount',
      convertedAmount: 'Converted amount',
      buyLabel: 'Bid',
      sellLabel: 'Ask',
      swapButton: 'Swap',
      brlEquivalent: 'Brazilian Real Equivalent (BRL)',
      dayHigh: 'Day High',
      dayLow: 'Day Low',
      baseParity: 'Base Parity',
      activeMode: 'Active Mode',
      change24h: '24h Change',
      toggleRemittanceFees: 'Simulate international remittance fees (Bank spread & IOF)',
      brokerSpread: 'Broker / Bank Spread (%)',
      iofLabel: 'FX Tax / IOF (%) — 1.1% own account / 0.38% third-party',
      netEffectiveTotal: 'Net Effective Total:',
      matrixTitle: 'Simultaneous Conversion — Major Currencies on DinhEuro',
      matrixHint: 'Click any currency card to set it as target',
    },
    academyHighlight: {
      eyebrow: 'Financial Education',
      freeBadge: '100% Free',
      title: 'DinhEuro Academy — Practical Market Tracks',
      subtitle:
        'Structured reading modules with applied numerical case studies and direct shortcuts to live terminal tools.',
      viewAllCourses: 'View All Courses',
      modulesLabel: 'Modules',
      freeTag: 'FREE',
      freeAccess: 'Open Access',
      accessLesson: 'Open Lesson',
    },
    markets: {
      title: 'Global Markets & Live Quotes',
      subtitle:
        'Track real-time quotes for US stocks, Brazilian B3 equities, interbank Forex pairs, cryptocurrencies, commodities, and global stock indices.',
      searchPlaceholder: 'Filter by ticker or company (e.g., EUR, AAPL, PETR4, BTC)...',
      refreshBtn: 'Refresh Quotes',
      assetsListed: 'monitored assets',
      showingOf: 'Showing',
      loadMore: 'Load more assets',
      loadAll: 'Show all',
    },
    tools: {
      title: 'Global Financial Tools & Calculators',
      subtitle:
        'Real-time calculations for Euro to Brazilian Real conversion, commercial Dollar, compound interest projections, and tax estimates.',
      tabFx: 'Universal Currency Calculator',
      tabCompound: 'Compound Interest & Fixed Income',
      tabInflation: 'Purchasing Power & Inflation',
      tabTax: 'Capital Gains & Tax Calculator',
    },
    footer: {
      tagline: 'Global Finance & Currency Hub',
      description:
        'Real-time financial data terminal, universal Euro-Dollar-Real parity, global stock quotes, and institutional calculators without paywalls.',
      infraStatus: 'Global Operation • High-Availability Cloud Infrastructure',
      lgpdCompliance: 'Compliant with LGPD (Law No. 13.709/2018) & 256-bit SSL',
      dpoLabel: 'Data Protection Officer (DPO):',
      navHubTitle: 'Hub Navigation',
      resourcesTitle: 'Resources & Tools',
      legalTitle: 'Legal & Compliance',
      backToTop: 'Back to top',
      cookiePrefs: 'Cookie Preferences',
      disclaimerPrefix: 'Risk Warning & Financial Disclaimer:',
      brandProtection:
        'DinhEuro™ — Trademark application filed with INPI (Process No. 942746848). Any total or partial copying, reproduction, imitation, or commercial use of the name, trademark, logo, layout, content, or functionality of this portal on any website, application, or platform without prior written authorization from the owner is strictly prohibited.',
      copyrightSuffix: 'All rights reserved.',
      navDashboard: 'Home (Dashboard)',
      navMarkets: 'World Markets',
      navPortfolios: 'My Portfolios',
      navNews: 'News & Analysis',
      navBrokers: 'Brokers Directory',
      resCharts: 'D3 v7 Chart Terminal',
      resTools: 'FX & Calculators',
      resAcademy: 'Academy & Glossary',
      resAbout: 'About DinhEuro',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      disclaimer: 'Legal Disclaimer',
    },
    seoBlock: {
      eyebrow: 'Global Market Reference',
      heading: 'Live Euro to BRL, Commercial Dollar & Major Currencies in Real Time',
      lead:
        'DinhEuro unifies live interbank exchange rates, Brazilian and US equities, fixed income intelligence, and digital asset tracking in a single institutional portal.',
      cards: [
        {
          title: 'Live Euro to Brazilian Real (EUR/BRL)',
          body: 'Check the live commercial Euro rate converted to Brazilian Real in the default 1 EUR → BRL calculator with bid/ask spread toggles, daily highs and lows, and remittance cost modeling.',
        },
        {
          title: 'Live Commercial US Dollar (USD/BRL)',
          body: 'Monitor real-time USD/BRL and EUR/USD interbank parity to support cross-border transfers, currency hedging, and international portfolio valuation.',
        },
        {
          title: 'Major Currencies, Equities & Crypto',
          body: 'Unified tracking across USD, EUR, GBP, CHF, JPY, CAD, AUD, ARS, global benchmarks (S&P 500, Nasdaq, Ibovespa, DAX), plus Bitcoin, Ethereum, and Solana.',
        },
      ],
    },
  },
  es: {
    header: {
      financialHubs: 'Centros Financieros:',
      syncTooltip: 'Haz clic para sincronizar cotizaciones ahora',
      hubSubtitle: 'Hub Financiero en Tiempo Real',
      searchPlaceholder: 'Buscar acciones (AAPL, PETR4), pares forex, cripto, índices...',
      openSearchAria: 'Abrir búsqueda de activos',
      themeLight: 'Tema Claro',
      themeDark: 'Tema Oscuro',
      openMenuAria: 'Abrir menú lateral',
      categoriesLabel: 'Categorías',
      categoriesShort: 'Categorías',
      allAssets: 'Todos los Activos',
      assetsCountLabel: 'activos',
      displayCurrency: 'Moneda de Visualización',
      drawerSubtitle: 'Menú Institucional',
      drawerNavTitle: 'Navegación Principal',
      drawerCategoriesTitle: 'Categorías de Mercado',
      drawerFooterNote: 'DinhEuro • Cotizaciones en Tiempo Real',
      searchResults: 'Resultados Encontrados',
      featuredAssets: 'Activos Destacados',
      noAssetFound: 'No se encontró ningún activo. Prueba otro símbolo o nombre.',
      nav: {
        dashboard: 'Inicio',
        mercados: 'Mercados',
        carteiras: 'Carteras',
        noticias: 'Noticias & Macro',
        corretoras: 'Brókeres Globales',
        daytrade: 'Day Trade & Scalping',
        tape_reading: 'Flujo & Tape Reading',
        renda_fixa: 'Renta Fija & Derivados',
        graficos: 'Gráficos Avanzados',
        ferramentas: 'Herramientas',
        academy: 'Academy',
        sobre: 'Acerca de DinhEuro',
      },
      categories: {
        all: {
          label: 'Todos los Activos',
          shortLabel: 'Todos',
          description: 'Catálogo completo en tiempo real',
        },
        stocks_br: {
          label: 'Acciones Brasil (B3)',
          shortLabel: 'B3',
          description: 'PETR4, VALE3, ITUB4, WEGE3...',
        },
        stocks_us: {
          label: 'Acciones EE. UU. (Wall St)',
          shortLabel: 'EE. UU.',
          description: 'AAPL, NVDA, MSFT, TSLA...',
        },
        indices: {
          label: 'Índices Mundiales',
          shortLabel: 'Índices',
          description: 'Ibovespa, S&P 500, Nasdaq, DAX...',
        },
        forex: {
          label: 'Divisas & Forex',
          shortLabel: 'Divisas',
          description: 'EUR/BRL, USD/BRL, EUR/USD...',
        },
        crypto: {
          label: 'Criptomonedas',
          shortLabel: 'Cripto',
          description: 'Bitcoin, Ethereum, Solana...',
        },
        commodities: {
          label: 'Materias Primas',
          shortLabel: 'Commodities',
          description: 'Oro, Petróleo Brent, Plata...',
        },
      },
    },
    dashboard: {
      liveBadge: 'Datos Globales en Tiempo Real • Divisas Interbancarias, Bolsas Mundiales & Cripto',
      heroTitlePrefix: 'Hub Financiero Global',
      heroSubtitle:
        'Monitorea cotizaciones internacionales y B3, cambio universal Euro-Dólar-Real, índices mundiales, criptomonedas y análisis en estándar institucional.',
      chartAction: 'Gráfico ↗',
      thermometerTitle: 'Termómetro de Mercado',
      riskAppetiteBadge: 'Apetito por Riesgo',
      moderateGreed: 'Codicia Moderada',
      extremeFear: '0 Miedo Extremo',
      neutral: '50 Neutral',
      optimism: '100 Optimismo',
      quickSimulator: 'Simulador Instantáneo',
      swapTooltip: 'Invertir Divisas',
      convertedResult: 'Resultado Convertido:',
      worldIndicesTitle: 'Índices Mundiales de Referencia',
      updatedAt: 'Actualizado:',
      marketHighlightsTitle: 'Destacados del Mercado (Acciones Globales & B3)',
      viewAllStocks: 'Ver todas las acciones del mercado',
      topGainers: 'Mayores Alzas (24h)',
      topLosers: 'Mayores Bajas (24h)',
      varPercent: 'Var %',
      currencyMatrixTitle: 'Matriz Cambiaria Global',
      synchronized: 'Sincronizada',
      matrixSubtitle: 'Cotizaciones universales unificadas entre Inicio y Simulador:',
      openFullSimulator: 'Abrir Simulador Completo',
      newsTitle: 'Noticias & Análisis en Tiempo Real',
      verifiedFeed: 'Feed Verificado',
      viewAllNews: 'Ver todos los análisis',
      readArticle: 'Leer artículo',
    },
    calculator: {
      title: 'Calculadora de Cambio Universal',
      sourceLabel: '',
      sourceLive: 'Cotizaciones Interbancarias Globales en Tiempo Real',
      sourceFallback: 'Tasas Interbancarias Sincronizadas de Respaldo',
      currenciesListed: 'divisas listadas en DinhEuro',
      updatedAt: 'Actualizado a las',
      marketRef: 'Ref. mercado:',
      bidMode: 'Compra (Bid)',
      askMode: 'Venta (Ask)',
      refresh: 'Actualizar',
      syncing: 'Sincronizando...',
      fallbackNotice:
        'Conexión interbancaria en modo de respaldo temporal. Mostrando tasas sincronizadas en caché.',
      retry: 'Reconectar',
      sourceAmount: 'Monto de origen',
      convertedAmount: 'Monto convertido',
      buyLabel: 'Compra',
      sellLabel: 'Venta',
      swapButton: 'Invertir',
      brlEquivalent: 'Equivalente en Real Brasileño (BRL)',
      dayHigh: 'Máx. Día',
      dayLow: 'Mín. Día',
      baseParity: 'Paridad Base',
      activeMode: 'Modo Activo',
      change24h: 'Variación 24h',
      toggleRemittanceFees: 'Simular costos de envío internacional (Spread bancario e IOF)',
      brokerSpread: 'Spread del Bróker / Banco (%)',
      iofLabel: 'Impuesto Cambiario / IOF (%) — 1,1% misma titularidad / 0,38% terceros',
      netEffectiveTotal: 'Total Neto Efectivo:',
      matrixTitle: 'Conversión Simultánea — Principales Divisas en DinhEuro',
      matrixHint: 'Haz clic en cualquier divisa para seleccionarla como destino',
    },
    academyHighlight: {
      eyebrow: 'Educación Financiera',
      freeBadge: '100% Gratuito',
      title: 'DinhEuro Academy — Rutas Prácticas de Mercado',
      subtitle:
        'Cursos estructurados en módulos de lectura interactiva con ejemplos numéricos aplicados y acceso directo a las herramientas del portal.',
      viewAllCourses: 'Ver Todos los Cursos',
      modulesLabel: 'Módulos',
      freeTag: 'GRATIS',
      freeAccess: 'Acceso Libre',
      accessLesson: 'Acceder a Clase',
    },
    markets: {
      title: 'Mercados Globales & B3 en Tiempo Real',
      subtitle:
        'Sigue cotizaciones en vivo de acciones de EE. UU., Brasil (B3), divisas comerciales, criptomonedas, materias primas e índices mundiales.',
      searchPlaceholder: 'Filtrar activo por símbolo o empresa (ej: EUR, AAPL, PETR4, BTC)...',
      refreshBtn: 'Actualizar Cotizaciones',
      assetsListed: 'activos monitoreados',
      showingOf: 'Mostrando',
      loadMore: 'Cargar más activos',
      loadAll: 'Mostrar todos',
    },
    tools: {
      title: 'Herramientas & Simuladores Financieros Globales',
      subtitle:
        'Cálculos precisos en tiempo real para conversión de Euro a Real, dólar comercial, interés compuesto e impuestos.',
      tabFx: 'Calculadora de Cambio Universal',
      tabCompound: 'Interés Compuesto & Renta Fija',
      tabInflation: 'Poder Adquisitivo & Inflación',
      tabTax: 'Calculadora de Impuestos (DARF)',
    },
    footer: {
      tagline: 'Hub Global de Finanzas y Divisas',
      description:
        'Plataforma digital de datos económicos en tiempo real, paridad universal Euro-Dólar-Real, cotizaciones mundiales y herramientas analíticas sin muro de pago.',
      infraStatus: 'Operación Global • Infraestructura Cloud de Alta Disponibilidad',
      lgpdCompliance: 'En conformidad con la LGPD (Ley nº 13.709/2018) & SSL 256-bit',
      dpoLabel: 'Delegado de Protección de Datos (DPO):',
      navHubTitle: 'Navegación del Hub',
      resourcesTitle: 'Recursos & Análisis',
      legalTitle: 'Legal & Cumplimiento',
      backToTop: 'Volver arriba',
      cookiePrefs: 'Preferencias de Cookies',
      disclaimerPrefix: 'Aviso de Riesgo y Exención de Responsabilidad Financiera:',
      brandProtection:
        'DinhEuro™ — Marca con registro solicitado ante el INPI (Proceso nº 942746848). Queda expresamente prohibida la copia, reproducción, imitación o uso total o parcial del nombre, marca, logotipo, diseño, contenidos o funcionalidades de este portal en cualquier sitio, aplicación, plataforma o categoría comercial sin autorización previa y por escrito del titular.',
      copyrightSuffix: 'Todos los derechos reservados.',
      navDashboard: 'Inicio (Panel)',
      navMarkets: 'Mercados Mundiales',
      navPortfolios: 'Mis Carteras',
      navNews: 'Noticias & Análisis',
      navBrokers: 'Guía de Brókeres',
      resCharts: 'Terminal Gráfico D3 v7',
      resTools: 'Simuladores & Divisas',
      resAcademy: 'Academy & Glosario',
      resAbout: 'Acerca de DinhEuro',
      terms: 'Términos de Uso',
      privacy: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      disclaimer: 'Aviso Legal / Disclaimer',
    },
    seoBlock: {
      eyebrow: 'Referencia Global de Cotizaciones',
      heading: 'Cotización del Euro Hoy, Dólar Comercial y Divisas Fuertes en Tiempo Real',
      lead:
        'DinhEuro reúne en una interfaz institucional el seguimiento continuo del mercado cambiario internacional, bolsas de Brasil y Estados Unidos, renta fija y criptoactivos.',
      cards: [
        {
          title: 'Cotización del Euro hoy en Real (EUR/BRL)',
          body: 'Consulta el valor del Euro comercial hoy convertido automáticamente a Real Brasileño (1 EUR → BRL) con paridad directa e inversa, máximos y mínimos diarios y simulación de costos de envío.',
        },
        {
          title: 'Valor del Dólar comercial hoy (USD/BRL)',
          body: 'Monitorea la cotización del Dólar comercial frente al Real y al Euro (EUR/USD) en tiempo real para operaciones internacionales, cobertura patrimonial y comercio exterior.',
        },
        {
          title: 'Divisas fuertes, Bolsas y Criptoactivos',
          body: 'Seguimiento unificado de USD, EUR, GBP, CHF, JPY, CAD, AUD, ARS, índices como S&P 500, Nasdaq, Ibovespa y DAX, además de Bitcoin, Ethereum y Solana.',
        },
      ],
    },
  },
};

export function detectInitialLanguage(
  navigatorLang?: string,
  storedLang?: string | null
): SupportedLanguage {
  if (storedLang === 'pt' || storedLang === 'en' || storedLang === 'es') {
    return storedLang;
  }

  const normalized = (navigatorLang || '').toLowerCase().trim();
  if (normalized.startsWith('pt')) return 'pt';
  if (normalized.startsWith('es')) return 'es';
  return 'en';
}
