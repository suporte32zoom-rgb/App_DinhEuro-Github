import type { MarketCategoryFilter, NavigationTab } from '../context/MarketContext';

export type SupportedLanguage = 'pt' | 'en' | 'es';

export const LANG_STORAGE_KEY = 'dinheuro_lang';

export const HTML_LANG_MAP: Record<SupportedLanguage, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
};

export function getNumberLocale(lang: SupportedLanguage): string {
  if (lang === 'en') return 'en-US';
  if (lang === 'es') return 'es-ES';
  return 'pt-BR';
}

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
    closeMenuAria: string;
    scrollLeftAria: string;
    scrollRightAria: string;
    categoryMenuAria: string;
    categoryMenuTitle: string;
    fixedIncomeShortcut: string;
    languageSelectorAria: string;
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
  ticker: {
    liveDesktop: string;
    liveMobile: string;
  };
  offline: {
    banner: string;
  };
  pwa: {
    installed: string;
    installApp: string;
    installTitle: string;
    installIOS: string;
    modalTitle: string;
    iosStep1Prefix: string;
    iosStep1Action: string;
    iosStep1Suffix: string;
    iosStep2Prefix: string;
    iosStep2Action: string;
    iosStep3Prefix: string;
    iosStep3Action: string;
    iosStep3Suffix: string;
    understood: string;
    fallbackPromptTitle: string;
    fallbackAlert: string;
  };
  lgpd: {
    dialogAria: string;
    title: string;
    body: string;
    privacyLink: string;
    cookiesLink: string;
    acceptBtn: string;
  };
  errorBoundary: {
    title: string;
    description: string;
    reconnect: string;
    reload: string;
  };
  dashboard: {
    liveBadge: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    chartAction: string;
    tooltips: {
      eurBrl: string;
      usdBrl: string;
      sp500: string;
      ibov: string;
    };
    thermometerTitle: string;
    riskAppetiteBadge: string;
    sentimentExtremeFearLabel: string;
    sentimentFearLabel: string;
    sentimentNeutralLabel: string;
    moderateGreed: string;
    sentimentExtremeOptimismLabel: string;
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
    cachedRatesBadge: string;
    currenciesListed: string;
    updatedAt: string;
    marketRef: string;
    quoteModeAria: string;
    bidMode: string;
    askMode: string;
    refresh: string;
    syncing: string;
    fallbackNotice: string;
    retry: string;
    sourceAmount: string;
    amountAria: string;
    fromCurrencyAria: string;
    toCurrencyAria: string;
    convertedAmount: string;
    buyLabel: string;
    sellLabel: string;
    swapButton: string;
    swapAria: string;
    swapTitle: string;
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
    currencyNames: Record<string, string>;
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
    realtimeBadge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    refreshBtn: string;
    assetsListed: string;
    showingOf: string;
    ofWord: string;
    assetsFound: string;
    searchTermPrefix: string;
    catalogFullVisible: string;
    assetsReadyToExpand: string;
    colAsset: string;
    colPrice: string;
    colVar24h: string;
    colHighLow: string;
    colVolume: string;
    colChart: string;
    emptyMessage: string;
    clearFilters: string;
    coverageStatus: string;
    assetsRenderedSuffix: string;
    viewMorePrefix: string;
    availableSuffix: string;
    loadAllPrefix: string;
    loadAllSuffix: string;
    fullCatalogLoadedPrefix: string;
    fullCatalogLoadedSuffix: string;
    collapseToTop20: string;
    loadMore: string;
    loadAll: string;
    categoryBadges: Record<string, string>;
    editorialGuide: {
      eyebrow: string;
      title: string;
      intro: string;
      sections: Array<{
        id: string;
        title: string;
        body: string;
      }>;
    };
    faq: {
      eyebrow: string;
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
  tools: {
    title: string;
    titleFx: string;
    titleCompound: string;
    titleInflation: string;
    titleTax: string;
    subtitle: string;
    tabFx: string;
    tabCompound: string;
    tabInflation: string;
    tabTax: string;
    compoundTitle: string;
    compoundSubtitle: string;
    initialPrincipalLabel: string;
    initialPrincipalHint: string;
    monthlyContribLabel: string;
    monthlyContribHint: string;
    annualRateLabel: string;
    rateMonthlySuffix: string;
    yearsLabel: string;
    monthsUnit: string;
    totalInvestedLabel: string;
    totalInvestedHint: string;
    totalInterestLabel: string;
    ofBalanceSuffix: string;
    finalBalanceLabel: string;
    finalBalanceHint: string;
    annualBreakdownTitle: string;
    periodsComputedSuffix: string;
    colYear: string;
    colTotalInvested: string;
    colAccumInterest: string;
    colFinalBalance: string;
    yearPrefix: string;
    presetsTitle: string;
    presetsSubtitle: string;
    presetMilhaoTitle: string;
    presetMilhaoDesc: string;
    presetAposTitle: string;
    presetAposDesc: string;
    presetIndepTitle: string;
    presetIndepDesc: string;
    presetReservaTitle: string;
    presetReservaDesc: string;
    snowballTitle: string;
    snowballBodyPrefix: string;
    snowballBodySuffix: string;
    monthlyEqRate: string;
    periodTotalContrib: string;
    periodTotalInterest: string;
    inflationTitle: string;
    inflationSubtitle: string;
    inflationCurrentAmount: string;
    inflationAvgRate: string;
    inflationPeriodYears: string;
    inflationFuturePower: string;
    inflationRealLoss: string;
    inflationNeededFuture: string;
    inflationProtectTitle: string;
    inflationProtectBody: string;
    darfTitle: string;
    darfSubtitle: string;
    darfAssetType: string;
    darfOptBr: string;
    darfOptUs: string;
    darfOptCrypto: string;
    darfBuyPrice: string;
    darfSellPrice: string;
    darfQty: string;
    darfMonthlyVol: string;
    darfDayTradeCheck: string;
    darfGrossProfit: string;
    darfExemptStatus: string;
    darfExemptBadge: string;
    darfTaxableBadge: string;
    darfApplicableRate: string;
    darfEstimatedDue: string;
    darfNetProfit: string;
    darfRulesTitle: string;
    darfRule1Title: string;
    darfRule1Body: string;
    darfRule2Title: string;
    darfRule2Body: string;
    darfRule3Title: string;
    darfRule3Body: string;
  };
  compoundChart: {
    startLabel: string;
    yearPrefix: string;
    yearsHorizonSuffix: string;
    interestImpactLabel: string;
    ofBalanceSuffix: string;
    yourSimulationPrefix: string;
    cdi100Label: string;
    tesouroIpcaLabel: string;
    poupancaLabel: string;
    doubleContribPrefix: string;
    currentContribPrefix: string;
    noContribLabel: string;
    perMonthSuffix: string;
    totalInvestedBar: string;
    accumInterestBar: string;
    totalEquityLine: string;
    compoundInterestLine: string;
    totalInvestedArea: string;
    compoundInterestArea: string;
    viewEvolution: string;
    viewBenchmark: string;
    viewContribution: string;
    typeAreaTitle: string;
    typeBarTitle: string;
    typeLineTitle: string;
    expandModalTitle: string;
    expandModalLabel: string;
    headingEvolution: string;
    headingBenchmark: string;
    headingContribution: string;
    yearsUnit: string;
    perYearUnit: string;
    multiplierTitle: string;
    multiplierBodyPrefix: string;
    multiplierBodySuffix: string;
    passiveIncomeTitle: string;
    passiveIncomeBody: string;
    tippingPointTitle: string;
    tippingPointBodyFoundPrefix: string;
    tippingPointBodyFoundSuffix: string;
    tippingPointBodyDefault: string;
    modalTitle: string;
    modalSubtitle: string;
    modalInitial: string;
    modalMonthly: string;
    modalRate: string;
    modalHorizon: string;
    modalFinalBalance: string;
    modalTableTitle: string;
    modalTableInterestSharePrefix: string;
    modalTableInterestShareSuffix: string;
    colYear: string;
    colTotalInvested: string;
    colInterest: string;
    colFinalBalance: string;
    colPctInterest: string;
    colEstPassive: string;
    tippingBadge: string;
    modalFooterNote: string;
    closeModal: string;
  };
  footer: {
    logoAlt: string;
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
    disclaimerBody: string;
    brandProtection: string;
    copyrightSuffix: string;
    navDashboard: string;
    navMarkets: string;
    navPortfolios: string;
    navNews: string;
    resCharts: string;
    resTools: string;
    resAcademy: string;
    resAbout: string;
    terms: string;
    privacy: string;
    cookies: string;
    disclaimer: string;
    shortTerms: string;
    shortPrivacy: string;
    shortCookies: string;
    shortDisclaimer: string;
  };
  seoBlock: {
    eyebrow: string;
    heading: string;
    lead: string;
    faqTitle: string;
    faqItems: {
      question: string;
      answer: string;
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
      closeMenuAria: 'Fechar menu',
      scrollLeftAria: 'Rolar navegação para a esquerda',
      scrollRightAria: 'Rolar navegação para a direita',
      categoryMenuAria: 'Seletor de Categorias',
      categoryMenuTitle: 'Categorias de Mercado',
      fixedIncomeShortcut: 'Renda Fixa',
      languageSelectorAria: 'Seletor de idioma',
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
        stocks_eu: {
          label: 'Ações Europa',
          shortLabel: 'Europa',
          description: 'ASML, LVMH, SAP, Shell...',
        },
        stocks_asia: {
          label: 'Ações Ásia-Pacífico',
          shortLabel: 'Ásia-Pac.',
          description: 'Toyota, Sony, Tencent, TSMC...',
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
    ticker: {
      liveDesktop: 'MERCADOS EM TEMPO REAL',
      liveMobile: 'AO VIVO',
    },
    offline: {
      banner: 'Modo Offline — Exibindo dados locais armazenados em cache.',
    },
    pwa: {
      installed: 'App Instalado',
      installApp: 'Instalar App',
      installTitle: 'Instalar DinhEuro como aplicativo no seu dispositivo',
      installIOS: 'Instalar no iOS',
      modalTitle: 'Instalar DinhEuro',
      iosStep1Prefix: '1. No Safari do seu iPhone ou iPad, toque no botão ',
      iosStep1Action: 'Compartilhar',
      iosStep1Suffix: ' (ícone com quadrado e seta para cima).',
      iosStep2Prefix: '2. Role para baixo e toque em ',
      iosStep2Action: '"Adicionar à Tela de Início"',
      iosStep3Prefix: '3. Toque em ',
      iosStep3Action: '"Adicionar"',
      iosStep3Suffix: ' no canto superior direito para ter acesso instantâneo ao DinhEuro.',
      understood: 'Entendido',
      fallbackPromptTitle: 'Instalar DinhEuro no seu computador ou celular',
      fallbackAlert:
        'Para instalar o DinhEuro: acesse as opções do seu navegador (três pontinhos) e selecione "Instalar aplicativo" ou "Adicionar à tela inicial".',
    },
    lgpd: {
      dialogAria: 'Consentimento de Cookies e Privacidade LGPD',
      title: 'Privacidade & Cookies no DinhEuro',
      body: 'Utilizamos cookies essenciais, armazenamento local (localStorage) e tecnologias de cache no PWA para memorizar suas carteiras, salvar preferências visuais e garantir a segurança das cotações em tempo real, em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).',
      privacyLink: 'Saber mais / Política de Privacidade',
      cookiesLink: 'Política de Cookies',
      acceptBtn: 'Aceitar e Continuar',
    },
    errorBoundary: {
      title: 'Módulo em Recuperação Automática',
      description:
        'Identificamos uma oscilação na renderização deste painel financeiro. As cotações globais e dados do DinhEuro continuam seguros e operantes.',
      reconnect: 'Reconectar Módulo',
      reload: 'Atualizar Página',
    },
    dashboard: {
      liveBadge: 'Acesso Livre em Tempo Real • Câmbio EUR/BRL, Eixo Europa–Mercosul & Mercados Globais',
      heroTitlePrefix: 'Inteligência Financeira Global e o Radar Econômico',
      heroTitleHighlight: 'União Europeia – Mercosul',
      heroSubtitle:
        'Cotações de câmbio (EUR/BRL e USD/BRL), taxas de juros do BCE e Banco Central, índices globais e análises em tempo real sobre o corredor comercial entre Europa e América do Sul — sem cadastro e sem coleta de dados.',
      chartAction: 'Gráfico ↗',
      tooltips: {
        eurBrl: 'Ver gráfico e cotação de EUR / BRL',
        usdBrl: 'Ver gráfico e cotação de USD / BRL',
        sp500: 'Ver gráfico e detalhes do S&P 500',
        ibov: 'Ver gráfico e detalhes do IBOVESPA',
      },
      thermometerTitle: 'Termômetro de Mercado',
      riskAppetiteBadge: 'Apetite por Risco',
      sentimentExtremeFearLabel: 'Medo Extremo',
      sentimentFearLabel: 'Cautela / Medo',
      sentimentNeutralLabel: 'Neutro',
      moderateGreed: 'Ganância Moderada',
      sentimentExtremeOptimismLabel: 'Otimismo Extremo',
      extremeFear: '0 Medo Extremo',
      neutral: '50 Neutro',
      optimism: '100 Otimismo',
      quickSimulator: 'Simulador Instantâneo',
      swapTooltip: 'Inverter Moedas',
      convertedResult: 'Resultado Convertido:',
      worldIndicesTitle: 'Índices Mundiais e Bolsas da Europa e Mercosul',
      updatedAt: 'Atualizado:',
      marketHighlightsTitle: 'Destaques do Mercado (Ações Globais, Europa & B3)',
      viewAllStocks: 'Ver todas as ações do mercado',
      topGainers: 'Maiores Altas (24h)',
      topLosers: 'Maiores Baixas (24h)',
      varPercent: 'Var %',
      currencyMatrixTitle: 'Matriz Cambial Global',
      synchronized: 'Sincronizada',
      matrixSubtitle: 'Cotação Euro comercial e moedas globais em tempo real — taxas interbancárias unificadas sem cadastro:',
      openFullSimulator: 'Abrir Simulador Completo',
      newsTitle: 'Notícias & Análises em Tempo Real',
      verifiedFeed: 'Feed Verificado',
      viewAllNews: 'Ver todas as análises',
      readArticle: 'Ler matéria',
    },
    calculator: {
      title: 'Calculadora de Câmbio Universal',
      sourceLabel: '',
      sourceLive: 'Cotação Euro comercial e moedas globais em tempo real',
      sourceFallback: 'Taxas Interbancárias Sincronizadas em Contingência',
      cachedRatesBadge: 'Usando taxas em cache',
      currenciesListed: 'moedas listadas no DinhEuro',
      updatedAt: 'Atualizado às',
      marketRef: 'Ref. mercado:',
      quoteModeAria: 'Modo de cotação',
      bidMode: 'Compra (Bid)',
      askMode: 'Venda (Ask)',
      refresh: 'Atualizar',
      syncing: 'Sincronizando...',
      fallbackNotice:
        'Conexão interbancária em contingência no momento. Exibindo conversão com taxas sincronizadas em cache.',
      retry: 'Tentar reconectar',
      sourceAmount: 'Valor de origem',
      amountAria: 'Valor a converter',
      fromCurrencyAria: 'Moeda de origem',
      toCurrencyAria: 'Moeda de destino',
      convertedAmount: 'Valor convertido',
      buyLabel: 'Compra',
      sellLabel: 'Venda',
      swapButton: 'Inverter',
      swapAria: 'Inverter moeda de origem e destino',
      swapTitle: 'Inverter moedas',
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
      currencyNames: {
        BRL: 'Real Brasileiro',
        USD: 'Dólar Americano',
        EUR: 'Euro (Zona do Euro)',
        GBP: 'Libra Esterlina',
        CAD: 'Dólar Canadense',
        AUD: 'Dólar Australiano',
        CHF: 'Franco Suíço',
        JPY: 'Iene Japonês',
        CNY: 'Yuan Chinês',
        ARS: 'Peso Argentino',
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
      },
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
      realtimeBadge: 'Cotações em Tempo Real • Zero Defasagem',
      title: 'Mercados Globais & B3 em Tempo Real',
      subtitle:
        'Acompanhe cotações ao vivo de ações americanas, ações brasileiras (B3), câmbio comercial, criptomoedas, commodities e índices mundiais.',
      searchPlaceholder: 'Filtrar ativo por símbolo ou empresa (ex: EUR, AAPL, PETR4, BTC)...',
      refreshBtn: 'Atualizar Cotações',
      assetsListed: 'ativos monitorados',
      showingOf: 'Exibindo',
      ofWord: 'de',
      assetsFound: 'ativos encontrados',
      searchTermPrefix: 'termo:',
      catalogFullVisible: 'Catálogo 100% visível',
      assetsReadyToExpand: 'ativos prontos para expansão',
      colAsset: 'Ativo / Ticker',
      colPrice: 'Preço Oficial & Dupla Conversão',
      colVar24h: 'Variação 24h',
      colHighLow: 'Máx / Mín (24h)',
      colVolume: 'Volume 24h',
      colChart: 'Terminal Gráfico',
      emptyMessage: 'Nenhum ativo encontrado para os filtros selecionados.',
      clearFilters: 'Limpar Filtros',
      coverageStatus: 'Status da Cobertura de Mercados:',
      assetsRenderedSuffix: 'ativos renderizados',
      viewMorePrefix: 'Ver Mais Ativos (+',
      availableSuffix: 'disponíveis)',
      loadAllPrefix: 'Carregar Todos os',
      loadAllSuffix: 'Mercados Globais',
      fullCatalogLoadedPrefix: 'Catálogo Completo Carregado (',
      fullCatalogLoadedSuffix: 'ativos mundiais)',
      collapseToTop20: 'Recolher para Top 20',
      loadMore: 'Carregar mais ativos',
      loadAll: 'Exibir todos',
      categoryBadges: {
        indices: 'Índices',
        stocks_us: 'Ações EUA',
        stocks_br: 'Ações B3',
        stocks_eu: 'Ações Europa',
        stocks_asia: 'Ásia-Pacífico',
        forex: 'Câmbio',
        crypto: 'Cripto',
        commodities: 'Commodities',
      },
      editorialGuide: {
        eyebrow: 'Guia Editorial de Mercados',
        title: 'Como Interpretar os Mercados Globais, Câmbio, Commodities e B3',
        intro:
          'Entenda a dinâmica entre fusos horários das bolsas, paridades cambiais, liquidez diária e indicadores gráficos para acompanhar ativos nacionais e internacionais com clareza.',
        sections: [
          {
            id: 'global-vs-b3',
            title: 'Ações Globais (Wall Street, Europa, Ásia-Pacífico) vs. B3',
            body:
              'Os mercados acionários operam em janelas regionais complementares: Tóquio e Hong Kong abrem o ciclo na sessão asiática, seguidos por Frankfurt, Londres e Paris na Europa, até a sobreposição entre Nova York (NYSE/Nasdaq) e o pregão regular da B3 no Brasil. Ao comparar papéis internacionais e brasileiros, observe sempre o Volume 24h — que mede a profundidade de liquidez e a facilidade de formação de preço — e a dupla conversão cambial (Dólar/Euro para Real), pois oscilações no câmbio podem ampliar ou compensar o retorno em moeda local.',
          },
          {
            id: 'world-indices',
            title: 'Índices Mundiais como Termômetro Macroeconômico',
            body:
              'Os grandes índices funcionam como painéis sintéticos do ciclo econômico global. O S&P 500 reúne as maiores companhias americanas em múltiplos setores, o Nasdaq concentra tecnologia e crescimento, o Dow Jones acompanha grandes nomes industriais e de consumo, enquanto o Russell 2000 mede a sensibilidade de empresas menores ao crédito doméstico dos EUA. Já o Ibovespa reflete o peso de commodities, bancos e estatais no Brasil. Leituras conjuntas ajudam a identificar apetite por risco, sensibilidade às taxas de juros globais e movimentos de rotação setorial.',
          },
          {
            id: 'fx-crypto-commodities',
            title: 'Câmbio, Criptoativos e Commodities (Ouro e Prata)',
            body:
              'No mercado de câmbio interbancário, as cotações refletem preços de compra (Bid) e venda (Ask) influenciados por fluxos comerciais e diferenciais de juros entre bancos centrais. Metais preciosos como Ouro (XAU) e Prata (XAG) atuam tradicionalmente como reserva de valor e proteção em períodos de aversão ao risco ou pressão inflacionária. Já os criptoativos negociam de forma contínua (24 horas por dia, 7 dias por semana) em bolsas globais digitais, exibindo volatilidade constante e reação imediata a eventos de liquidez mesmo fora do horário bancário.',
          },
          {
            id: 'terminal-indicators',
            title: 'Como Utilizar o Terminal Gráfico e os Indicadores de Variação',
            body:
              'Na tabela, a faixa Máx / Mín (24h) mostra a amplitude de negociação alcançada pelo ativo no ciclo recente, permitindo avaliar se o preço atual opera próximo ao suporte ou à resistência diária. A variação percentual de 24h indica a direção e a intensidade do movimento em relação à referência anterior. Ao clicar em um ativo ou no botão do Terminal Gráfico, você acessa séries de preços, médias móveis e histórico de volume exclusivamente para acompanhamento educacional de tendências.',
          },
        ],
      },
      faq: {
        eyebrow: 'Dúvidas Frequentes',
        title: 'Perguntas Frequentes sobre Cotações e Mercados Globais',
        items: [
          {
            question: 'O que significa a dupla conversão de moeda exibida na tabela?',
            answer:
              'Ativos negociados originalmente em Dólar (USD), Euro (EUR) ou outras divisas internacionais exibem o preço oficial na moeda de origem acompanhado do valor equivalente convertido para o Real (BRL) pela taxa de câmbio vigente. Isso facilita a comparação direta de poder de compra entre mercados sem alterar a cotação original da bolsa de referência.',
          },
          {
            question: 'Por que criptoativos oscilam aos fins de semana enquanto as bolsas fecham?',
            answer:
              'As bolsas de valores tradicionais (como B3, NYSE, Nasdaq e bolsas europeias e asiáticas) seguem calendários oficiais de pregão e liquidação bancária em dias úteis, mantendo o último preço de fechamento até a abertura seguinte. Já o mercado de criptoativos opera em redes descentralizadas e plataformas globais sem pausa (24/7), permitindo negociação contínua inclusive aos sábados, domingos e feriados.',
          },
          {
            question: 'Como interpretar a variação percentual diária junto ao volume negociado?',
            answer:
              'A variação de 24h mostra quanto o preço subiu ou caiu em termos percentuais, enquanto o Volume 24h revela a quantidade financeira ou de contratos que sustentou esse movimento. Oscilações relevantes acompanhadas de alto volume costumam indicar participação ampla de mercado, ao passo que movimentos bruscos com volume reduzido podem refletir menor liquidez momentânea.',
          },
          {
            question: 'As cotações e análises exibidas têm caráter de recomendação de investimento?',
            answer:
              'Não. Todas as cotações, indicadores de variação, gráficos e guias explicativos apresentados nesta página possuem caráter estritamente informativo e educacional, destinados à leitura macroeconômica e ao acompanhamento de mercados, não constituindo oferta, recomendação ou consultoria financeira.',
          },
        ],
      },
    },
    tools: {
      title: 'Calculadora de Câmbio Universal: Conversão de Euro e Dólar em Tempo Real',
      titleFx: 'Calculadora de Câmbio Universal: Conversão de Euro e Dólar em Tempo Real',
      titleCompound: 'Simulador de Juros Compostos, Taxa Selic e Renda Fixa',
      titleInflation: 'Simulador de Inflação IPCA e Poder de Compra',
      titleTax: 'Calculadora de Lucro em Ações da B3 e Imposto (DARF)',
      subtitle:
        'Converter Euro para Real (EUR/BRL) e dólar comercial hoje em tempo real, simular como enviar remessa internacional mais barata (spread bancário e IOF), conta global para viagens, projeção Taxa Selic e inflação IPCA.',
      tabFx: 'Calculadora de Câmbio Universal',
      tabCompound: 'Juros Compostos & Renda Fixa',
      tabInflation: 'Poder de Compra & Inflação',
      tabTax: 'Calculadora de Lucro & Imposto (DARF)',
      compoundTitle: 'Calculadora de Juros Compostos & Renda Fixa',
      compoundSubtitle: 'Simulação interativa da evolução do capital no tempo com aportes mensais e juros compostos.',
      initialPrincipalLabel: 'Aporte Inicial (R$):',
      initialPrincipalHint: 'Capital inicial',
      monthlyContribLabel: 'Aporte Mensal (R$):',
      monthlyContribHint: 'Recorrência mensal',
      annualRateLabel: 'Taxa de Juros Anual (% a.a.):',
      rateMonthlySuffix: '% a.m.',
      yearsLabel: 'Prazo em Anos:',
      monthsUnit: 'meses',
      totalInvestedLabel: 'Total Investido',
      totalInvestedHint: 'Capital do seu bolso',
      totalInterestLabel: 'Total em Juros Ganhos',
      ofBalanceSuffix: '% do saldo',
      finalBalanceLabel: 'Montante Final',
      finalBalanceHint: 'Patrimônio acumulado',
      annualBreakdownTitle: 'Detalhamento Anual dos Aportes & Rendimentos',
      periodsComputedSuffix: 'períodos computados',
      colYear: 'Ano',
      colTotalInvested: 'Total Aportado',
      colAccumInterest: 'Juros Acumulados',
      colFinalBalance: 'Saldo Final',
      yearPrefix: 'Ano',
      presetsTitle: 'Simulações Rápidas (Presets)',
      presetsSubtitle: 'Selecione um objetivo financeiro para configurar automaticamente os valores:',
      presetMilhaoTitle: 'Primeiro Milhão (R$ 1.000.000)',
      presetMilhaoDesc: 'R$ 1.500/mês • 18 anos • 11.5% a.a.',
      presetAposTitle: 'Aposentadoria Confortável',
      presetAposDesc: 'R$ 2.000/mês • 30 anos • 10.5% a.a.',
      presetIndepTitle: 'Independência em 15 Anos',
      presetIndepDesc: 'R$ 3.000/mês • 15 anos • 12% a.a.',
      presetReservaTitle: 'Reserva de Emergência',
      presetReservaDesc: 'R$ 800/mês • 3 anos • 11.5% a.a.',
      snowballTitle: 'O Poder do Efeito Bola de Neve',
      snowballBodyPrefix: 'No exemplo acima, os juros acumulados representam',
      snowballBodySuffix: 'de todo o patrimônio final conquistado.',
      monthlyEqRate: 'Taxa Mensal Equivalente:',
      periodTotalContrib: 'Aporte Total no Período:',
      periodTotalInterest: 'Juros Gerados no Período:',
      inflationTitle: 'Simulador de Perda de Poder de Compra',
      inflationSubtitle: 'Veja o impacto da inflação (IPCA/CPI) sobre o seu patrimônio ao longo do tempo.',
      inflationCurrentAmount: 'Valor Atual:',
      inflationAvgRate: 'Inflação Anual Média (% a.a.):',
      inflationPeriodYears: 'Período (Anos):',
      inflationFuturePower: 'Poder de compra equivalente futuro:',
      inflationRealLoss: 'Perda real de valor:',
      inflationNeededFuture: 'Valor necessário no futuro para comprar o mesmo que hoje:',
      inflationProtectTitle: 'Proteção Anti-Inflação',
      inflationProtectBody:
        'Deixar dinheiro parado na poupança ou em moeda fiduciária corrói seu patrimônio silenciosamente. O DinhEuro recomenda diversificar em ativos reais (Ações globais, Títulos IPCA+, Ouro e Euro).',
      darfTitle: 'Calculadora de Ganho de Capital & DARF',
      darfSubtitle: 'Conformidade com a legislação da Receita Federal para ações e criptoativos.',
      darfAssetType: 'Tipo de Ativo:',
      darfOptBr: 'Ações Brasil (B3)',
      darfOptUs: 'Ações EUA / Global',
      darfOptCrypto: 'Criptomoeda',
      darfBuyPrice: 'Preço de Compra:',
      darfSellPrice: 'Preço de Venda:',
      darfQty: 'Quantidade de Ações / Cotas:',
      darfMonthlyVol: 'Volume Total Vendido no Mês (R$):',
      darfDayTradeCheck: 'Operação Day Trade (20%)',
      darfGrossProfit: 'Lucro Bruto Apurado:',
      darfExemptStatus: 'Status de Isenção Fiscal:',
      darfExemptBadge: '✓ ISENTO de Imposto de Renda',
      darfTaxableBadge: 'TRIBUTÁVEL',
      darfApplicableRate: 'Alíquota Aplicável:',
      darfEstimatedDue: 'DARF Estimado a Pagar:',
      darfNetProfit: 'Lucro Líquido Final no Bolso:',
      darfRulesTitle: 'Regras da Receita Federal',
      darfRule1Title: 'Ações B3 (Swing Trade):',
      darfRule1Body: 'Isento para vendas totais de até R$ 20.000 no mês. Acima disso, tributação de 15% sobre o ganho.',
      darfRule2Title: 'Day Trade:',
      darfRule2Body: 'Tributação fixa de 20%, sem qualquer faixa de isenção.',
      darfRule3Title: 'Criptoativos:',
      darfRule3Body: 'Isenção para alienações totais de até R$ 35.000 mensais.',
    },
    compoundChart: {
      startLabel: 'Início',
      yearPrefix: 'Ano',
      yearsHorizonSuffix: 'anos de horizonte',
      interestImpactLabel: 'Impacto dos Juros:',
      ofBalanceSuffix: 'do saldo',
      yourSimulationPrefix: 'Sua Simulação',
      cdi100Label: 'CDI 100% (11.5% a.a.)',
      tesouroIpcaLabel: 'Tesouro IPCA+ (11.2% a.a.)',
      poupancaLabel: 'Poupança (6.17% a.a.)',
      doubleContribPrefix: 'Aporte em Dobro',
      currentContribPrefix: 'Aporte Atual',
      noContribLabel: 'Sem Aportes Mensais (Só Inicial)',
      perMonthSuffix: '/mês',
      totalInvestedBar: 'Total Aportado',
      accumInterestBar: 'Juros Acumulados',
      totalEquityLine: 'Patrimônio Total',
      compoundInterestLine: 'Juros Compostos',
      totalInvestedArea: 'Total Aportado (Seu Capital)',
      compoundInterestArea: 'Juros Compostos (Bola de Neve)',
      viewEvolution: 'Evolução do Capital',
      viewBenchmark: 'Comparador Renda Fixa',
      viewContribution: 'Impacto do Aporte',
      typeAreaTitle: 'Área Empilhada',
      typeBarTitle: 'Barras',
      typeLineTitle: 'Linhas',
      expandModalTitle: 'Expandir Gráfico no Modal',
      expandModalLabel: 'Expandir no Modal',
      headingEvolution: 'Evolução Patrimonial no Tempo',
      headingBenchmark: 'Simulação Comparativa: Sua Carteira vs Benchmarks',
      headingContribution: 'Curva de Sensibilidade por Intensidade de Aporte',
      yearsUnit: 'anos',
      perYearUnit: 'a.a.',
      multiplierTitle: 'Multiplicador de Capital',
      multiplierBodyPrefix: 'Para cada R$ 1,00 aportado, seu patrimônio final terá',
      multiplierBodySuffix: '',
      passiveIncomeTitle: 'Renda Passiva Mensal',
      passiveIncomeBody: 'Retirada perpétua sustentável de 0,8% a.m. sem consumir o montante principal.',
      tippingPointTitle: 'Ponto de Inflexão',
      tippingPointBodyFoundPrefix: 'No Ano',
      tippingPointBodyFoundSuffix: ', os juros anuais ultrapassam seus aportes anuais.',
      tippingPointBodyDefault: 'O efeito bola de neve supera seus aportes com o tempo.',
      modalTitle: 'Simulação Interativa de Juros Compostos & Renda Fixa',
      modalSubtitle: 'Projeção completa da evolução patrimonial, efeito bola de neve e comparação de rentabilidade.',
      modalInitial: 'Aporte Inicial:',
      modalMonthly: 'Aporte Mensal:',
      modalRate: 'Taxa Anual:',
      modalHorizon: 'Horizonte:',
      modalFinalBalance: 'Montante Final:',
      modalTableTitle: 'Tabela Detalhada Ano a Ano',
      modalTableInterestSharePrefix: 'Juros representam',
      modalTableInterestShareSuffix: '% do patrimônio',
      colYear: 'Ano',
      colTotalInvested: 'Total Investido',
      colInterest: 'Juros Acumulados',
      colFinalBalance: 'Saldo Final',
      colPctInterest: '% Juros',
      colEstPassive: 'Renda Passiva Est.',
      tippingBadge: 'Inflexão',
      modalFooterNote: 'Cálculo com juros compostos capitalizados mensalmente.',
      closeModal: 'Fechar Modal',
    },
    footer: {
      logoAlt: 'Logo Oficial DinhEuro',
      tagline: 'Hub Global de Finanças e Moedas',
      description:
        'Portal aberto de inteligência financeira, câmbio EUR/BRL em tempo real e monitoramento do eixo econômico União Europeia – Mercosul a partir de fontes públicas. Acesso 100% gratuito, anônimo, sem cadastro, sem login e sem coleta ou armazenamento de dados pessoais.',
      infraStatus: 'Operação Global • Infraestrutura em Nuvem de Alta Disponibilidade',
      lgpdCompliance: 'Em conformidade com a LGPD (Lei nº 13.709/2018) & SSL 256-bit',
      dpoLabel: 'Encarregado de Dados (DPO):',
      navHubTitle: 'Navegação do Hub',
      resourcesTitle: 'Recursos & Análise',
      legalTitle: 'Jurídico & LGPD',
      backToTop: 'Voltar ao topo',
      cookiePrefs: 'Preferências de Cookies',
      disclaimerPrefix: 'Aviso de Risco e Isenção de Responsabilidade Financeira:',
      disclaimerBody:
        'é um portal digital informativo e educacional de agregação de dados econômicos. As cotações em tempo real de ativos mundiais, taxas de câmbio (Euro, Dólar, Real), ações da B3, bolsas internacionais, criptoativos e simuladores são consolidados a partir de feeds institucionais de mercado, mesas de câmbio interbancário e livros públicos de negociação. O DinhEuro não presta consultoria de investimentos, análise de valores mobiliários ou recomendação direta de aporte financeiro. A negociação em mercados de renda variável e Forex envolve alto risco de perda do patrimônio investido.',
      brandProtection:
        'DinhEuro™ — Marca com registro requerido junto ao INPI (Processo nº 942746848). É expressamente proibida a cópia, reprodução, imitação ou utilização total ou parcial do nome, marca, logotipo, layout, conteúdos ou funcionalidades deste portal em quaisquer sites, aplicativos, plataformas ou categorias comerciais sem autorização prévia e por escrito do titular.',
      copyrightSuffix: 'Todos os direitos reservados.',
      navDashboard: 'Início (Dashboard)',
      navMarkets: 'Mercados Mundiais',
      navPortfolios: 'Minhas Carteiras',
      navNews: 'Notícias & Análises',
      resCharts: 'Terminal Gráfico D3 v7',
      resTools: 'Simuladores & Câmbio',
      resAcademy: 'Academy & Glossário',
      resAbout: 'Sobre o DinhEuro',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
      cookies: 'Política de Cookies',
      disclaimer: 'Aviso Legal / Disclaimer',
      shortTerms: 'Termos',
      shortPrivacy: 'Privacidade',
      shortCookies: 'Cookies',
      shortDisclaimer: 'Disclaimer',
    },
    seoBlock: {
      eyebrow: 'Portal Aberto de Inteligência Econômica',
      heading: 'Sobre o Portal DinhEuro & Perguntas Frequentes (FAQ)',
      lead:
        'O DinhEuro reúne em uma única interface dados públicos de câmbio (Euro, Dólar e pares globais), diferenciais de juros entre o Banco Central Europeu (BCE) e a Taxa Selic, cotações das bolsas da Europa e do Mercosul e análises macroeconômicas. Todo o conteúdo, os painéis e os simuladores operam com acesso livre, gratuito e sem necessidade de cadastro ou login.',
      faqTitle: 'Perguntas Frequentes',
      faqItems: [
        {
          question: 'Qual é a diferença entre câmbio comercial e câmbio turismo?',
          answer:
            'O câmbio comercial é a referência interbancária utilizada em operações de comércio exterior, remessas empresariais e liquidação financeira. Já o câmbio turismo aplica-se à compra de papel-moeda ou cartões de viagem no varejo, incorporando custos de logística, custódia, margem da instituição (spread) e tributos incidentes como o IOF.',
        },
        {
          question: 'Como acompanhar o eixo comercial União Europeia–Mercosul pelo portal?',
          answer:
            'Na própria página inicial, é possível monitorar a cotação do Euro frente ao Real, os índices europeus (como DAX, Euro Stoxx 50 e FTSE 100), as ações brasileiras e o Dossiê capítulo a capítulo do Acordo MERCOSUL–União Europeia, complementado pelas sínteses editoriais sobre tarifas, cotas e regras da SECEX/MDIC.',
        },
        {
          question: 'Como interpretar a relação entre Taxa Selic, IPCA e câmbio no Boletim Focus?',
          answer:
            'O Boletim Focus consolida as medianas semanais de mercado coletadas pelo Banco Central. Quando as expectativas de inflação (IPCA) sobem, o mercado tende a projetar uma Taxa Selic mais alta para ancorar os preços; esse diferencial de juros frente ao exterior influencia o fluxo de capitais e o comportamento do dólar e do euro frente ao real.',
        },
        {
          question: 'Como utilizar os simuladores e a DinhEuro Academy?',
          answer:
            'Os simuladores de conversão de moedas, remessas internacionais (com cálculo de spread e IOF), juros compostos e renda fixa ficam disponíveis gratuitamente no menu Simuladores & Câmbio e Renda Fixa & Derivativos. Na DinhEuro Academy, você encontra trilhas educativas completas sobre câmbio, análise técnica e economia global diretamente no navegador, sem cadastro.',
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
      closeMenuAria: 'Close menu',
      scrollLeftAria: 'Scroll navigation left',
      scrollRightAria: 'Scroll navigation right',
      categoryMenuAria: 'Category Selector',
      categoryMenuTitle: 'Market Categories',
      fixedIncomeShortcut: 'Fixed Income',
      languageSelectorAria: 'Language selector',
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
        stocks_eu: {
          label: 'Europe Equities',
          shortLabel: 'Europe',
          description: 'ASML, LVMH, SAP, Shell...',
        },
        stocks_asia: {
          label: 'Asia-Pacific Equities',
          shortLabel: 'Asia-Pac',
          description: 'Toyota, Sony, Tencent, TSMC...',
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
    ticker: {
      liveDesktop: 'LIVE GLOBAL MARKETS',
      liveMobile: 'LIVE',
    },
    offline: {
      banner: 'Offline Mode — Displaying cached local market data.',
    },
    pwa: {
      installed: 'App Installed',
      installApp: 'Install App',
      installTitle: 'Install DinhEuro as an app on your device',
      installIOS: 'Install on iOS',
      modalTitle: 'Install DinhEuro',
      iosStep1Prefix: '1. In Safari on your iPhone or iPad, tap the ',
      iosStep1Action: 'Share',
      iosStep1Suffix: ' button (square icon with upward arrow).',
      iosStep2Prefix: '2. Scroll down and tap ',
      iosStep2Action: '"Add to Home Screen"',
      iosStep3Prefix: '3. Tap ',
      iosStep3Action: '"Add"',
      iosStep3Suffix: ' in the top-right corner for instant access to DinhEuro.',
      understood: 'Got it',
      fallbackPromptTitle: 'Install DinhEuro on your desktop or phone',
      fallbackAlert:
        'To install DinhEuro: open your browser menu (three dots) and select "Install app" or "Add to Home Screen".',
    },
    lgpd: {
      dialogAria: 'Cookie Consent and Privacy Notice',
      title: 'Privacy & Cookies at DinhEuro',
      body: 'We use essential cookies, local storage (localStorage), and PWA caching to remember your portfolios, save display preferences, and secure real-time quotes in strict compliance with data protection laws (LGPD Law No. 13.709/2018 & GDPR).',
      privacyLink: 'Learn more / Privacy Policy',
      cookiesLink: 'Cookie Policy',
      acceptBtn: 'Accept & Continue',
    },
    errorBoundary: {
      title: 'Module Auto-Recovery',
      description:
        'We detected a rendering glitch in this financial panel. Global quotes and your DinhEuro data remain safe and active.',
      reconnect: 'Reconnect Module',
      reload: 'Reload Page',
    },
    dashboard: {
      liveBadge: 'Open Real-Time Access • EUR/BRL FX, Europe–Mercosur Corridor & Global Markets',
      heroTitlePrefix: 'Global Financial Intelligence &',
      heroTitleHighlight: 'European Union – Mercosur Economic Radar',
      heroSubtitle:
        'Live FX quotes (EUR/BRL & USD/BRL), ECB and Central Bank policy rates, global equity indices, and real-time trade corridor intelligence between Europe and South America — no registration and zero personal data collection.',
      chartAction: 'Chart ↗',
      tooltips: {
        eurBrl: 'View EUR / BRL chart and quote',
        usdBrl: 'View USD / BRL chart and quote',
        sp500: 'View S&P 500 chart and details',
        ibov: 'View IBOVESPA chart and details',
      },
      thermometerTitle: 'Market Sentiment',
      riskAppetiteBadge: 'Risk Appetite',
      sentimentExtremeFearLabel: 'Extreme Fear',
      sentimentFearLabel: 'Fear / Caution',
      sentimentNeutralLabel: 'Neutral',
      moderateGreed: 'Moderate Greed',
      sentimentExtremeOptimismLabel: 'Extreme Optimism',
      extremeFear: '0 Extreme Fear',
      neutral: '50 Neutral',
      optimism: '100 Optimism',
      quickSimulator: 'Instant Converter',
      swapTooltip: 'Swap Currencies',
      convertedResult: 'Converted Result:',
      worldIndicesTitle: 'Benchmark World, European & Mercosur Indices',
      updatedAt: 'Updated:',
      marketHighlightsTitle: 'Market Movers (Global, European & B3 Equities)',
      viewAllStocks: 'View all market equities',
      topGainers: 'Top Gainers (24h)',
      topLosers: 'Top Losers (24h)',
      varPercent: 'Chg %',
      currencyMatrixTitle: 'Global FX Matrix',
      synchronized: 'Synchronized',
      matrixSubtitle: 'Live commercial Euro and global currencies — unified interbank rates with zero sign-up:',
      openFullSimulator: 'Open Full FX Converter',
      newsTitle: 'Real-Time Financial News & Macro',
      verifiedFeed: 'Verified Feed',
      viewAllNews: 'View all briefings',
      readArticle: 'Read article',
    },
    calculator: {
      title: 'Universal Currency Calculator',
      sourceLabel: '',
      sourceLive: 'Live commercial Euro and global currencies in real time',
      sourceFallback: 'Synced Interbank Contingency Rates',
      cachedRatesBadge: 'Using cached rates',
      currenciesListed: 'currencies listed on DinhEuro',
      updatedAt: 'Updated at',
      marketRef: 'Market ref:',
      quoteModeAria: 'Quote mode',
      bidMode: 'Bid (Buy)',
      askMode: 'Ask (Sell)',
      refresh: 'Refresh',
      syncing: 'Syncing...',
      fallbackNotice:
        'Live interbank feed temporarily in contingency mode. Displaying synced cached rates.',
      retry: 'Reconnect',
      sourceAmount: 'Source amount',
      amountAria: 'Amount to convert',
      fromCurrencyAria: 'Source currency',
      toCurrencyAria: 'Target currency',
      convertedAmount: 'Converted amount',
      buyLabel: 'Bid',
      sellLabel: 'Ask',
      swapButton: 'Swap',
      swapAria: 'Swap source and target currencies',
      swapTitle: 'Swap currencies',
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
      currencyNames: {
        BRL: 'Brazilian Real',
        USD: 'US Dollar',
        EUR: 'Euro (Eurozone)',
        GBP: 'British Pound',
        CAD: 'Canadian Dollar',
        AUD: 'Australian Dollar',
        CHF: 'Swiss Franc',
        JPY: 'Japanese Yen',
        CNY: 'Chinese Yuan',
        ARS: 'Argentine Peso',
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
      },
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
      realtimeBadge: 'Real-Time Quotes • Zero Lag',
      title: 'Global Markets & Live Quotes',
      subtitle:
        'Track real-time quotes for US stocks, Brazilian B3 equities, interbank Forex pairs, cryptocurrencies, commodities, and global stock indices.',
      searchPlaceholder: 'Filter by ticker or company (e.g., EUR, AAPL, PETR4, BTC)...',
      refreshBtn: 'Refresh Quotes',
      assetsListed: 'monitored assets',
      showingOf: 'Showing',
      ofWord: 'of',
      assetsFound: 'assets found',
      searchTermPrefix: 'query:',
      catalogFullVisible: '100% catalog visible',
      assetsReadyToExpand: 'more assets ready to expand',
      colAsset: 'Asset / Ticker',
      colPrice: 'Official Price & Dual Conversion',
      colVar24h: '24h Change',
      colHighLow: '24h High / Low',
      colVolume: '24h Volume',
      colChart: 'Chart Terminal',
      emptyMessage: 'No assets found for the selected filters.',
      clearFilters: 'Clear Filters',
      coverageStatus: 'Market Coverage Status:',
      assetsRenderedSuffix: 'assets rendered',
      viewMorePrefix: 'View More Assets (+',
      availableSuffix: 'available)',
      loadAllPrefix: 'Load All',
      loadAllSuffix: 'Global Markets',
      fullCatalogLoadedPrefix: 'Full Catalog Loaded (',
      fullCatalogLoadedSuffix: 'global assets)',
      collapseToTop20: 'Collapse to Top 20',
      loadMore: 'Load more assets',
      loadAll: 'Show all',
      categoryBadges: {
        indices: 'Indices',
        stocks_us: 'US Stocks',
        stocks_br: 'B3 Stocks',
        stocks_eu: 'Europe Stocks',
        stocks_asia: 'Asia-Pacific',
        forex: 'Forex',
        crypto: 'Crypto',
        commodities: 'Commodities',
      },
      editorialGuide: {
        eyebrow: 'Editorial Market Guide',
        title: 'How to Read Global Markets, FX, Commodities, and B3',
        intro:
          'Understand how regional trading sessions, currency conversions, daily liquidity, and price indicators fit together when tracking domestic and international markets.',
        sections: [
          {
            id: 'global-vs-b3',
            title: 'Global Equities (Wall Street, Europe, Asia-Pacific) vs. B3',
            body:
              'Global stock exchanges trade across staggered regional windows: Tokyo and Hong Kong open the cycle in Asia-Pacific, followed by Frankfurt, London, and Paris in Europe, before New York (NYSE/Nasdaq) overlaps with Brazil’s B3 regular session. When comparing foreign and Brazilian stocks, pay attention to 24h Volume—which signals liquidity depth and price discovery—and dual currency conversion (USD/EUR into BRL), as exchange-rate swings can amplify or offset local-currency returns.',
          },
          {
            id: 'world-indices',
            title: 'World Indices as Macroeconomic Barometers',
            body:
              'Benchmark indices condense broad economic sentiment into a single reading. The S&P 500 tracks leading US large caps across sectors, the Nasdaq leans toward technology and growth, the Dow Jones follows blue-chip industrials and consumer leaders, and the Russell 2000 gauges smaller domestic companies sensitive to US credit conditions. Brazil’s Ibovespa reflects heavy weights in commodities, banks, and state-linked firms, helping observers track risk appetite, global interest rates, and sector rotation.',
          },
          {
            id: 'fx-crypto-commodities',
            title: 'Forex, Crypto Assets, and Commodities (Gold & Silver)',
            body:
              'Interbank FX quotes reflect Bid and Ask pricing shaped by cross-border trade flows and central-bank interest-rate differentials. Precious metals such as Gold (XAU) and Silver (XAG) traditionally act as stores of value and hedges during risk-off episodes or inflation uncertainty. Cryptocurrencies, by contrast, trade continuously (24/7) across global digital venues, displaying ongoing volatility and instant reaction to liquidity shifts outside banking hours.',
          },
          {
            id: 'terminal-indicators',
            title: 'Using the Chart Terminal and Variation Indicators',
            body:
              'In the table, the 24h High / Low range shows the intraday trading band reached over the latest cycle, indicating whether current pricing sits near daily support or resistance. The 24h percentage change measures direction and momentum relative to the prior reference level. Selecting any asset or opening the Chart Terminal provides price series, moving averages, and volume bars strictly for educational trend tracking.',
          },
        ],
      },
      faq: {
        eyebrow: 'Frequently Asked Questions',
        title: 'FAQ on Quotes and Global Markets',
        items: [
          {
            question: 'What does the dual currency conversion shown in the table mean?',
            answer:
              'Assets primarily priced in US Dollars (USD), Euros (EUR), or other foreign currencies display their official native exchange quote alongside the converted equivalent in Brazilian Reais (BRL) at the prevailing exchange rate, making cross-market purchasing power comparisons straightforward without altering the underlying reference quote.',
          },
          {
            question: 'Why do crypto assets move on weekends while stock exchanges are closed?',
            answer:
              'Traditional equity exchanges—such as B3, NYSE, Nasdaq, European, and Asian bourses—follow official weekday trading calendars and banking settlement hours, holding their closing price until the next open. Cryptocurrency markets run 24/7 on decentralized networks and global digital venues, enabling continuous price discovery on weekends and holidays.',
          },
          {
            question: 'How should daily percentage change be read alongside traded volume?',
            answer:
              'Daily percentage change shows how much an asset moved up or down, whereas 24h Volume reflects the financial turnover supporting that move. Sharp moves backed by heavy volume usually point to broad market participation, while big swings on thin volume may simply reflect temporary illiquidity.',
          },
          {
            question: 'Are the displayed quotes and guides intended as investment advice?',
            answer:
              'No. All quotes, change metrics, charts, and explanatory guides on this page are strictly informational and educational tools for tracking macroeconomic trends and market behavior, and do not constitute financial advice or investment recommendations.',
          },
        ],
      },
    },
    tools: {
      title: 'Universal Currency Calculator: Real-Time Euro & Dollar Conversion',
      titleFx: 'Universal Currency Calculator: Real-Time Euro & Dollar Conversion',
      titleCompound: 'Compound Interest, Selic Rate & Fixed Income Simulator',
      titleInflation: 'IPCA / CPI Inflation & Purchasing Power Simulator',
      titleTax: 'Brazil B3 Capital Gains & DARF Tax Calculator',
      subtitle:
        'Check EUR to BRL live rate and USD BRL exchange rate today, compare international money transfer fees (bank spread & IOF), model global travel accounts, Selic rate yields, and inflation impact.',
      tabFx: 'Universal Currency Calculator',
      tabCompound: 'Compound Interest & Fixed Income',
      tabInflation: 'Purchasing Power & Inflation',
      tabTax: 'Capital Gains & Tax Calculator',
      compoundTitle: 'Compound Interest & Fixed Income Calculator',
      compoundSubtitle: 'Interactive projection of wealth growth over time with monthly contributions and compounding.',
      initialPrincipalLabel: 'Initial Principal (R$):',
      initialPrincipalHint: 'Starting capital',
      monthlyContribLabel: 'Monthly Contribution (R$):',
      monthlyContribHint: 'Monthly recurring',
      annualRateLabel: 'Annual Interest Rate (% p.a.):',
      rateMonthlySuffix: '% p.m.',
      yearsLabel: 'Horizon (Years):',
      monthsUnit: 'months',
      totalInvestedLabel: 'Total Invested',
      totalInvestedHint: 'Out-of-pocket capital',
      totalInterestLabel: 'Total Interest Earned',
      ofBalanceSuffix: '% of balance',
      finalBalanceLabel: 'Final Balance',
      finalBalanceHint: 'Projected wealth',
      annualBreakdownTitle: 'Annual Breakdown of Contributions & Returns',
      periodsComputedSuffix: 'periods computed',
      colYear: 'Year',
      colTotalInvested: 'Total Invested',
      colAccumInterest: 'Cumulative Interest',
      colFinalBalance: 'Ending Balance',
      yearPrefix: 'Year',
      presetsTitle: 'Quick Scenarios (Presets)',
      presetsSubtitle: 'Select a financial goal to prefill the simulation parameters:',
      presetMilhaoTitle: 'First Million (R$ 1,000,000)',
      presetMilhaoDesc: 'R$ 1,500/mo • 18 yrs • 11.5% p.a.',
      presetAposTitle: 'Comfortable Retirement',
      presetAposDesc: 'R$ 2,000/mo • 30 yrs • 10.5% p.a.',
      presetIndepTitle: 'Financial Independence in 15 Yrs',
      presetIndepDesc: 'R$ 3,000/mo • 15 yrs • 12% p.a.',
      presetReservaTitle: 'Emergency Reserve',
      presetReservaDesc: 'R$ 800/mo • 3 yrs • 11.5% p.a.',
      snowballTitle: 'The Snowball Compounding Effect',
      snowballBodyPrefix: 'In the simulation above, compounded interest accounts for',
      snowballBodySuffix: 'of your entire final wealth.',
      monthlyEqRate: 'Equivalent Monthly Rate:',
      periodTotalContrib: 'Total Contributed in Period:',
      periodTotalInterest: 'Interest Generated in Period:',
      inflationTitle: 'Purchasing Power Erosion Simulator',
      inflationSubtitle: 'Measure the cumulative impact of inflation (IPCA/CPI) on your cash over time.',
      inflationCurrentAmount: 'Current Amount:',
      inflationAvgRate: 'Average Annual Inflation (% p.a.):',
      inflationPeriodYears: 'Time Horizon (Years):',
      inflationFuturePower: 'Future equivalent purchasing power:',
      inflationRealLoss: 'Real value erosion:',
      inflationNeededFuture: 'Future nominal amount needed to match today’s purchasing power:',
      inflationProtectTitle: 'Inflation Hedging Strategy',
      inflationProtectBody:
        'Leaving funds idle in low-yield savings or unhedged fiat erodes purchasing power silently. Diversify across productive assets such as global equities, inflation-linked bonds (IPCA+), Gold, and Euro.',
      darfTitle: 'Capital Gains & DARF Tax Calculator',
      darfSubtitle: 'Brazilian Federal Revenue (Receita Federal) tax rules for equities and digital assets.',
      darfAssetType: 'Asset Class:',
      darfOptBr: 'Brazil Equities (B3)',
      darfOptUs: 'US / Global Equities',
      darfOptCrypto: 'Cryptocurrency',
      darfBuyPrice: 'Buy Price:',
      darfSellPrice: 'Sell Price:',
      darfQty: 'Quantity / Shares:',
      darfMonthlyVol: 'Total Monthly Sales Volume (R$):',
      darfDayTradeCheck: 'Day Trade Operation (20%)',
      darfGrossProfit: 'Gross Profit:',
      darfExemptStatus: 'Tax Exemption Status:',
      darfExemptBadge: '✓ TAX EXEMPT',
      darfTaxableBadge: 'TAXABLE',
      darfApplicableRate: 'Applicable Tax Rate:',
      darfEstimatedDue: 'Estimated DARF Tax Due:',
      darfNetProfit: 'Net After-Tax Profit:',
      darfRulesTitle: 'Receita Federal Tax Rules',
      darfRule1Title: 'B3 Equities (Swing Trade):',
      darfRule1Body: 'Exempt for total monthly sales up to R$ 20,000. Above that threshold, 15% tax on capital gains.',
      darfRule2Title: 'Day Trade:',
      darfRule2Body: 'Flat 20% tax rate with no monthly exemption threshold.',
      darfRule3Title: 'Crypto Assets:',
      darfRule3Body: 'Exempt for total monthly disposals up to R$ 35,000.',
    },
    compoundChart: {
      startLabel: 'Start',
      yearPrefix: 'Year',
      yearsHorizonSuffix: 'yr horizon',
      interestImpactLabel: 'Interest Share:',
      ofBalanceSuffix: 'of balance',
      yourSimulationPrefix: 'Your Simulation',
      cdi100Label: 'CDI 100% (11.5% p.a.)',
      tesouroIpcaLabel: 'Tesouro IPCA+ (11.2% p.a.)',
      poupancaLabel: 'Savings (6.17% p.a.)',
      doubleContribPrefix: '2x Contribution',
      currentContribPrefix: 'Current Contribution',
      noContribLabel: 'No Monthly Additions (Lump Sum)',
      perMonthSuffix: '/mo',
      totalInvestedBar: 'Total Invested',
      accumInterestBar: 'Cumulative Interest',
      totalEquityLine: 'Total Wealth',
      compoundInterestLine: 'Compound Interest',
      totalInvestedArea: 'Total Invested (Principal)',
      compoundInterestArea: 'Compound Interest (Snowball)',
      viewEvolution: 'Capital Evolution',
      viewBenchmark: 'Fixed Income Benchmark',
      viewContribution: 'Contribution Sensitivity',
      typeAreaTitle: 'Stacked Area',
      typeBarTitle: 'Bar Chart',
      typeLineTitle: 'Line Chart',
      expandModalTitle: 'Expand Chart in Modal',
      expandModalLabel: 'Expand View',
      headingEvolution: 'Wealth Growth Over Time',
      headingBenchmark: 'Benchmark Comparison: Your Portfolio vs Fixed Income',
      headingContribution: 'Sensitivity Curve by Monthly Contribution Size',
      yearsUnit: 'yrs',
      perYearUnit: 'p.a.',
      multiplierTitle: 'Capital Multiplier',
      multiplierBodyPrefix: 'For every R$ 1.00 invested, your ending wealth reaches',
      multiplierBodySuffix: '',
      passiveIncomeTitle: 'Monthly Passive Income',
      passiveIncomeBody: 'Sustainable perpetual withdrawal at 0.8%/mo without depleting principal.',
      tippingPointTitle: 'Inflection Point',
      tippingPointBodyFoundPrefix: 'In Year',
      tippingPointBodyFoundSuffix: ', annual interest surpasses your annual contributions.',
      tippingPointBodyDefault: 'Compounded returns overtake your contributions over time.',
      modalTitle: 'Interactive Compound Interest & Fixed Income Simulation',
      modalSubtitle: 'Full wealth trajectory projection, snowball effect, and benchmark return comparison.',
      modalInitial: 'Initial Principal:',
      modalMonthly: 'Monthly Addition:',
      modalRate: 'Annual Rate:',
      modalHorizon: 'Horizon:',
      modalFinalBalance: 'Final Balance:',
      modalTableTitle: 'Year-by-Year Breakdown Table',
      modalTableInterestSharePrefix: 'Interest accounts for',
      modalTableInterestShareSuffix: '% of wealth',
      colYear: 'Year',
      colTotalInvested: 'Total Invested',
      colInterest: 'Cumulative Interest',
      colFinalBalance: 'Ending Balance',
      colPctInterest: '% Interest',
      colEstPassive: 'Est. Passive Income',
      tippingBadge: 'Inflection',
      modalFooterNote: 'Calculated with monthly compounded interest.',
      closeModal: 'Close Modal',
    },
    footer: {
      logoAlt: 'DinhEuro Official Logo',
      tagline: 'Global Finance & Currency Hub',
      description:
        'Open financial intelligence portal tracking live EUR/BRL exchange rates and the European Union – Mercosur economic corridor from public sources. 100% free, anonymous access with no login, no registration, and no personal data collection.',
      infraStatus: 'Global Operation • High-Availability Cloud Infrastructure',
      lgpdCompliance: 'Compliant with LGPD (Law No. 13.709/2018) & 256-bit SSL',
      dpoLabel: 'Data Protection Officer (DPO):',
      navHubTitle: 'Hub Navigation',
      resourcesTitle: 'Resources & Tools',
      legalTitle: 'Legal & Compliance',
      backToTop: 'Back to top',
      cookiePrefs: 'Cookie Preferences',
      disclaimerPrefix: 'Risk Warning & Financial Disclaimer:',
      disclaimerBody:
        'is an informational and educational digital financial data aggregation portal. Real-time quotes for global assets, exchange rates (Euro, Dollar, Real), B3 equities, international markets, crypto assets, and calculators are consolidated from institutional market feeds, interbank FX desks, and public order books. DinhEuro does not provide investment advice, securities analysis, or direct financial recommendations. Trading in equities and Forex carries high risk of capital loss.',
      brandProtection:
        'DinhEuro™ — Trademark application filed with INPI (Process No. 942746848). Any total or partial copying, reproduction, imitation, or commercial use of the name, trademark, logo, layout, content, or functionality of this portal on any website, application, or platform without prior written authorization from the owner is strictly prohibited.',
      copyrightSuffix: 'All rights reserved.',
      navDashboard: 'Home (Dashboard)',
      navMarkets: 'World Markets',
      navPortfolios: 'My Portfolios',
      navNews: 'News & Analysis',
      resCharts: 'D3 v7 Chart Terminal',
      resTools: 'FX & Calculators',
      resAcademy: 'Academy & Glossary',
      resAbout: 'About DinhEuro',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      disclaimer: 'Legal Disclaimer',
      shortTerms: 'Terms',
      shortPrivacy: 'Privacy',
      shortCookies: 'Cookies',
      shortDisclaimer: 'Disclaimer',
    },
    seoBlock: {
      eyebrow: 'Open Financial Intelligence Portal',
      heading: 'About DinhEuro & Frequently Asked Questions (FAQ)',
      lead:
        'DinhEuro consolidates public-source exchange rates (Euro, Dollar, and global currency pairs), policy-rate comparisons between the European Central Bank (ECB) and Brazil’s Selic, European and Mercosur stock market quotes, and macroeconomic analyses in one streamlined dashboard—with 100% free, open access and no registration or login required.',
      faqTitle: 'Frequently Asked Questions',
      faqItems: [
        {
          question: 'What is the difference between commercial FX and tourist FX?',
          answer:
            'Commercial FX is the interbank benchmark used in foreign trade, corporate remittances, and institutional settlement. Tourist FX applies to physical banknotes and retail travel cards, adding cash-handling logistics, retail bank spread, and applicable taxes such as Brazil’s IOF.',
        },
        {
          question: 'How can I track the European Union–Mercosur trade corridor on the portal?',
          answer:
            'Right on the Home page, you can monitor live EUR/BRL quotes, major European equity indices (DAX, Euro Stoxx 50, FTSE 100), Brazilian B3 stocks, and the chapter-by-chapter EU–Mercosur Dossier alongside editorial syntheses on tariffs, quotas, and bilateral trade rules.',
        },
        {
          question: 'How should I interpret the link between Selic, IPCA, and FX in the Focus Report?',
          answer:
            'The Central Bank of Brazil Focus Report compiles weekly market medians. When inflation expectations (IPCA) rise, markets typically price a tighter Selic policy path; the resulting interest-rate differential against global benchmarks influences capital inflows and the trajectory of the Real against the Dollar and Euro.',
        },
        {
          question: 'How do I use the calculators and DinhEuro Academy?',
          answer:
            'All currency, cross-border remittance (spread and IOF), compound-interest, fixed-income, and Black-Scholes options calculators are available free of charge under FX & Calculators and Fixed Income & Derivatives. DinhEuro Academy offers structured guides on FX, technical analysis, and global macro directly in your browser without sign-up.',
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
      closeMenuAria: 'Cerrar menú',
      scrollLeftAria: 'Desplazar navegación a la izquierda',
      scrollRightAria: 'Desplazar navegación a la derecha',
      categoryMenuAria: 'Selector de Categorías',
      categoryMenuTitle: 'Categorías de Mercado',
      fixedIncomeShortcut: 'Renta Fija',
      languageSelectorAria: 'Selector de idioma',
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
        stocks_eu: {
          label: 'Acciones Europa',
          shortLabel: 'Europa',
          description: 'ASML, LVMH, SAP, Shell...',
        },
        stocks_asia: {
          label: 'Acciones Asia-Pacífico',
          shortLabel: 'Asia-Pac.',
          description: 'Toyota, Sony, Tencent, TSMC...',
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
    ticker: {
      liveDesktop: 'MERCADOS EN TIEMPO REAL',
      liveMobile: 'EN VIVO',
    },
    offline: {
      banner: 'Modo Sin Conexión — Mostrando datos locales almacenados en caché.',
    },
    pwa: {
      installed: 'App Instalada',
      installApp: 'Instalar App',
      installTitle: 'Instalar DinhEuro como aplicación en tu dispositivo',
      installIOS: 'Instalar en iOS',
      modalTitle: 'Instalar DinhEuro',
      iosStep1Prefix: '1. En Safari de tu iPhone o iPad, pulsa el botón ',
      iosStep1Action: 'Compartir',
      iosStep1Suffix: ' (icono de cuadrado con flecha hacia arriba).',
      iosStep2Prefix: '2. Desplázate hacia abajo y pulsa ',
      iosStep2Action: '"Añadir a pantalla de inicio"',
      iosStep3Prefix: '3. Pulsa ',
      iosStep3Action: '"Añadir"',
      iosStep3Suffix: ' en la esquina superior derecha para acceder al instante a DinhEuro.',
      understood: 'Entendido',
      fallbackPromptTitle: 'Instalar DinhEuro en tu computadora o móvil',
      fallbackAlert:
        'Para instalar DinhEuro: abre el menú de tu navegador (tres puntos) y selecciona "Instalar aplicación" o "Añadir a pantalla de inicio".',
    },
    lgpd: {
      dialogAria: 'Consentimiento de Cookies y Privacidad',
      title: 'Privacidad y Cookies en DinhEuro',
      body: 'Utilizamos cookies esenciales, almacenamiento local (localStorage) y caché PWA para recordar tus carteras, guardar preferencias visuales y asegurar cotizaciones en tiempo real en estricto cumplimiento de la normativa de protección de datos (LGPD Ley n.º 13.709/2018 y GDPR).',
      privacyLink: 'Más información / Política de Privacidad',
      cookiesLink: 'Política de Cookies',
      acceptBtn: 'Aceptar y Continuar',
    },
    errorBoundary: {
      title: 'Módulo en Recuperación Automática',
      description:
        'Detectamos una oscilación al renderizar este panel financiero. Las cotizaciones globales y tus datos en DinhEuro siguen seguros y operativos.',
      reconnect: 'Reconectar Módulo',
      reload: 'Recargar Página',
    },
    dashboard: {
      liveBadge: 'Acceso Libre en Tiempo Real • Divisas EUR/BRL, Eje Europa–Mercosur & Mercados Globales',
      heroTitlePrefix: 'Inteligencia Financiera Global y el Radar Económico',
      heroTitleHighlight: 'Unión Europea – Mercosur',
      heroSubtitle:
        'Cotizaciones de divisas (EUR/BRL y USD/BRL), tasas del BCE y Banco Central, índices globales y análisis en tiempo real del corredor comercial entre Europa y Sudamérica — sin registro y sin recopilación de datos personales.',
      chartAction: 'Gráfico ↗',
      tooltips: {
        eurBrl: 'Ver gráfico y cotización de EUR / BRL',
        usdBrl: 'Ver gráfico y cotización de USD / BRL',
        sp500: 'Ver gráfico y detalles de S&P 500',
        ibov: 'Ver gráfico y detalles de IBOVESPA',
      },
      thermometerTitle: 'Termómetro de Mercado',
      riskAppetiteBadge: 'Apetito por Riesgo',
      sentimentExtremeFearLabel: 'Miedo Extremo',
      sentimentFearLabel: 'Cautela / Miedo',
      sentimentNeutralLabel: 'Neutral',
      moderateGreed: 'Codicia Moderada',
      sentimentExtremeOptimismLabel: 'Optimismo Extremo',
      extremeFear: '0 Miedo Extremo',
      neutral: '50 Neutral',
      optimism: '100 Optimismo',
      quickSimulator: 'Simulador Instantáneo',
      swapTooltip: 'Invertir Divisas',
      convertedResult: 'Resultado Convertido:',
      worldIndicesTitle: 'Índices Mundiales y Bolsas de Europa y Mercosur',
      updatedAt: 'Actualizado:',
      marketHighlightsTitle: 'Destacados del Mercado (Acciones Globales, Europa & B3)',
      viewAllStocks: 'Ver todas las acciones del mercado',
      topGainers: 'Mayores Alzas (24h)',
      topLosers: 'Mayores Bajas (24h)',
      varPercent: 'Var %',
      currencyMatrixTitle: 'Matriz Cambiaria Global',
      synchronized: 'Sincronizada',
      matrixSubtitle: 'Cotización del Euro comercial y divisas globales en tiempo real — tasas interbancarias unificadas sin registro:',
      openFullSimulator: 'Abrir Simulador Completo',
      newsTitle: 'Noticias & Análisis en Tiempo Real',
      verifiedFeed: 'Feed Verificado',
      viewAllNews: 'Ver todos los análisis',
      readArticle: 'Leer artículo',
    },
    calculator: {
      title: 'Calculadora de Cambio Universal',
      sourceLabel: '',
      sourceLive: 'Cotización del Euro comercial y divisas globales en tiempo real',
      sourceFallback: 'Tasas Interbancarias Sincronizadas de Respaldo',
      cachedRatesBadge: 'Usando tasas en caché',
      currenciesListed: 'divisas listadas en DinhEuro',
      updatedAt: 'Actualizado a las',
      marketRef: 'Ref. mercado:',
      quoteModeAria: 'Modo de cotización',
      bidMode: 'Compra (Bid)',
      askMode: 'Venta (Ask)',
      refresh: 'Actualizar',
      syncing: 'Sincronizando...',
      fallbackNotice:
        'Conexión interbancaria en modo de respaldo temporal. Mostrando tasas sincronizadas en caché.',
      retry: 'Reconectar',
      sourceAmount: 'Monto de origen',
      amountAria: 'Monto a convertir',
      fromCurrencyAria: 'Moneda de origen',
      toCurrencyAria: 'Moneda de destino',
      convertedAmount: 'Monto convertido',
      buyLabel: 'Compra',
      sellLabel: 'Venta',
      swapButton: 'Invertir',
      swapAria: 'Invertir moneda de origen y destino',
      swapTitle: 'Invertir divisas',
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
      currencyNames: {
        BRL: 'Real Brasileño',
        USD: 'Dólar Estadounidense',
        EUR: 'Euro (Eurozona)',
        GBP: 'Libra Esterlina',
        CAD: 'Dólar Canadiense',
        AUD: 'Dólar Australiano',
        CHF: 'Franco Suizo',
        JPY: 'Yen Japonés',
        CNY: 'Yuan Chino',
        ARS: 'Peso Argentino',
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
      },
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
      realtimeBadge: 'Cotizaciones en Tiempo Real • Cero Latencia',
      title: 'Mercados Globales & B3 en Tiempo Real',
      subtitle:
        'Sigue cotizaciones en vivo de acciones de EE. UU., Brasil (B3), divisas comerciales, criptomonedas, materias primas e índices mundiales.',
      searchPlaceholder: 'Filtrar activo por símbolo o empresa (ej: EUR, AAPL, PETR4, BTC)...',
      refreshBtn: 'Actualizar Cotizaciones',
      assetsListed: 'activos monitoreados',
      showingOf: 'Mostrando',
      ofWord: 'de',
      assetsFound: 'activos encontrados',
      searchTermPrefix: 'término:',
      catalogFullVisible: 'Catálogo 100% visible',
      assetsReadyToExpand: 'activos listos para expandir',
      colAsset: 'Activo / Ticker',
      colPrice: 'Precio Oficial & Doble Conversión',
      colVar24h: 'Variación 24h',
      colHighLow: 'Máx / Mín (24h)',
      colVolume: 'Volumen 24h',
      colChart: 'Terminal Gráfico',
      emptyMessage: 'No se encontró ningún activo para los filtros seleccionados.',
      clearFilters: 'Limpiar Filtros',
      coverageStatus: 'Estado de Cobertura de Mercados:',
      assetsRenderedSuffix: 'activos mostrados',
      viewMorePrefix: 'Ver Más Activos (+',
      availableSuffix: 'disponibles)',
      loadAllPrefix: 'Cargar Todos los',
      loadAllSuffix: 'Mercados Globales',
      fullCatalogLoadedPrefix: 'Catálogo Completo Cargado (',
      fullCatalogLoadedSuffix: 'activos mundiales)',
      collapseToTop20: 'Contraer a Top 20',
      loadMore: 'Cargar más activos',
      loadAll: 'Mostrar todos',
      categoryBadges: {
        indices: 'Índices',
        stocks_us: 'Acciones EE. UU.',
        stocks_br: 'Acciones B3',
        stocks_eu: 'Acciones Europa',
        stocks_asia: 'Asia-Pacífico',
        forex: 'Divisas',
        crypto: 'Cripto',
        commodities: 'Materias Primas',
      },
      editorialGuide: {
        eyebrow: 'Guía Editorial de Mercados',
        title: 'Cómo Interpretar los Mercados Globales, Divisas, Materias Primas y B3',
        intro:
          'Comprende la relación entre horarios bursátiles internacionales, conversiones cambiarias, liquidez diaria e indicadores de variación para seguir activos locales y globales con claridad.',
        sections: [
          {
            id: 'global-vs-b3',
            title: 'Acciones Globales (Wall Street, Europa, Asia-Pacífico) vs. B3',
            body:
              'Las bolsas mundiales operan en franjas regionales escalonadas: Tokio y Hong Kong inician el ciclo en Asia-Pacífico, seguidos por Fráncfort, Londres y París en Europa, hasta el cruce entre Nueva York (NYSE/Nasdaq) y la sesión regular de la B3 en Brasil. Al comparar acciones internacionales y brasileñas, conviene revisar el Volumen 24h —que refleja la profundidad de liquidez— y la doble conversión cambiaria (Dólar/Euro a Real), ya que el tipo de cambio puede amplificar o moderar el retorno en moneda local.',
          },
          {
            id: 'world-indices',
            title: 'Índices Mundiales como Termómetro Macroeconómico',
            body:
              'Los principales índices sintetizan el pulso de la economía global. El S&P 500 agrupa a las mayores compañías estadounidenses de diversos sectores, el Nasdaq concentra tecnología y crecimiento, el Dow Jones sigue grandes referentes industriales y de consumo, y el Russell 2000 mide empresas medianas y pequeñas sensibles al crédito interno de EE. UU. El Ibovespa refleja el peso de materias primas, bancos y estatales en Brasil, ayudando a observar apetito por riesgo, tasas globales y rotación sectorial.',
          },
          {
            id: 'fx-crypto-commodities',
            title: 'Divisas, Criptoactivos y Materias Primas (Oro y Plata)',
            body:
              'En el mercado cambiario interbancario, las cotizaciones reflejan precios de compra (Bid) y venta (Ask) influidos por flujos comerciales y diferenciales de tasas de interés. Metales preciosos como el Oro (XAU) y la Plata (XAG) funcionan habitualmente como resguardo de valor ante episodios de aversión al riesgo o inflación. En contraste, los criptoactivos operan de forma continua (24/7) en plataformas digitales globales, mostrando volatilidad constante y reacción inmediata fuera del horario bancario.',
          },
          {
            id: 'terminal-indicators',
            title: 'Cómo Utilizar el Terminal Gráfico y los Indicadores de Variación',
            body:
              'En la tabla, el rango Máx / Mín (24h) muestra la amplitud de negociación reciente, ayudando a identificar si el precio actual se acerca a soportes o resistencias diarias. La variación porcentual de 24h refleja la dirección e intensidad frente a la referencia previa. Al abrir el Terminal Gráfico de un activo se accede a series de precios, medias móviles y volumen exclusivamente para el seguimiento educativo de tendencias.',
          },
        ],
      },
      faq: {
        eyebrow: 'Preguntas Frecuentes',
        title: 'Preguntas Frecuentes sobre Cotizaciones y Mercados Globales',
        items: [
          {
            question: '¿Qué significa la doble conversión de moneda mostrada en la tabla?',
            answer:
              'Los activos negociados originalmente en Dólares (USD), Euros (EUR) u otras divisas extranjeras presentan su precio oficial en la moneda de origen junto al valor equivalente convertido a Reales (BRL) al tipo de cambio vigente, facilitando comparaciones directas de poder adquisitivo sin alterar la cotización original.',
          },
          {
            question: '¿Por qué los criptoactivos oscilan los fines de semana mientras las bolsas cierran?',
            answer:
              'Las bolsas tradicionales (como B3, NYSE, Nasdaq y plazas europeas o asiáticas) operan según calendarios hábiles y horarios de liquidación bancaria, conservando el último cierre hasta la siguiente apertura. Los criptoactivos, en cambio, funcionan de manera continua 24/7 en redes descentralizadas y mercados digitales globales.',
          },
          {
            question: '¿Cómo interpretar la variación porcentual diaria junto al volumen negociado?',
            answer:
              'La variación de 24h indica cuánto subió o bajó el precio en términos porcentuales, mientras que el Volumen 24h muestra el monto financiero que respaldó ese movimiento. Alzas o bajas acompañadas de alto volumen suelen reflejar mayor participación de mercado, frente a movimientos bruscos con poca liquidez.',
          },
          {
            question: '¿Las cotizaciones e información exhibidas constituyen recomendación de inversión?',
            answer:
              'No. Todas las cotizaciones, indicadores de variación, gráficos y guías explicativas de esta página tienen carácter estrictamente informativo y educativo para el seguimiento macroeconómico de mercados, sin constituir asesoría ni recomendación financiera.',
          },
        ],
      },
    },
    tools: {
      title: 'Calculadora de Cambio Universal: Conversión de Euro y Dólar en Tiempo Real',
      titleFx: 'Calculadora de Cambio Universal: Conversión de Euro y Dólar en Tiempo Real',
      titleCompound: 'Simulador de Interés Compuesto, Tasa Selic y Renta Fija',
      titleInflation: 'Simulador de Inflación IPCA y Poder Adquisitivo',
      titleTax: 'Calculadora de Ganancia en Acciones B3 e Impuesto (DARF)',
      subtitle:
        'Convierte Euro a Real (EUR/BRL) y dólar comercial en tiempo real, calcula cómo enviar remesa internacional más barata (spread bancario e IOF), cuenta global para viajes, tasa Selic e inflación IPCA.',
      tabFx: 'Calculadora de Cambio Universal',
      tabCompound: 'Interés Compuesto & Renta Fija',
      tabInflation: 'Poder Adquisitivo & Inflación',
      tabTax: 'Calculadora de Impuestos (DARF)',
      compoundTitle: 'Calculadora de Interés Compuesto & Renta Fija',
      compoundSubtitle: 'Simulación interactiva de la evolución del capital en el tiempo con aportes mensuales e interés compuesto.',
      initialPrincipalLabel: 'Aporte Inicial (R$):',
      initialPrincipalHint: 'Capital inicial',
      monthlyContribLabel: 'Aporte Mensual (R$):',
      monthlyContribHint: 'Recurrencia mensual',
      annualRateLabel: 'Tasa de Interés Anual (% anual):',
      rateMonthlySuffix: '% mensual',
      yearsLabel: 'Plazo en Años:',
      monthsUnit: 'meses',
      totalInvestedLabel: 'Total Invertido',
      totalInvestedHint: 'Capital de tu bolsillo',
      totalInterestLabel: 'Total en Intereses Ganados',
      ofBalanceSuffix: '% del saldo',
      finalBalanceLabel: 'Monto Final',
      finalBalanceHint: 'Patrimonio acumulado',
      annualBreakdownTitle: 'Desglose Anual de Aportes y Rendimientos',
      periodsComputedSuffix: 'períodos calculados',
      colYear: 'Año',
      colTotalInvested: 'Total Aportado',
      colAccumInterest: 'Interés Acumulado',
      colFinalBalance: 'Saldo Final',
      yearPrefix: 'Año',
      presetsTitle: 'Simulaciones Rápidas (Presets)',
      presetsSubtitle: 'Selecciona un objetivo financiero para configurar automáticamente los valores:',
      presetMilhaoTitle: 'Primer Millón (R$ 1.000.000)',
      presetMilhaoDesc: 'R$ 1.500/mes • 18 años • 11.5% anual',
      presetAposTitle: 'Jubilación Confortable',
      presetAposDesc: 'R$ 2.000/mes • 30 años • 10.5% anual',
      presetIndepTitle: 'Independencia en 15 Años',
      presetIndepDesc: 'R$ 3.000/mes • 15 años • 12% anual',
      presetReservaTitle: 'Fondo de Emergencia',
      presetReservaDesc: 'R$ 800/mes • 3 años • 11.5% anual',
      snowballTitle: 'El Poder del Efecto Bola de Nieve',
      snowballBodyPrefix: 'En el ejemplo anterior, los intereses acumulados representan',
      snowballBodySuffix: 'de todo el patrimonio final alcanzado.',
      monthlyEqRate: 'Tasa Mensual Equivalente:',
      periodTotalContrib: 'Aporte Total en el Período:',
      periodTotalInterest: 'Intereses Generados en el Período:',
      inflationTitle: 'Simulador de Pérdida de Poder Adquisitivo',
      inflationSubtitle: 'Observa el impacto de la inflación (IPCA/IPC) sobre tu patrimonio a lo largo del tiempo.',
      inflationCurrentAmount: 'Valor Actual:',
      inflationAvgRate: 'Inflación Anual Promedio (% anual):',
      inflationPeriodYears: 'Período (Años):',
      inflationFuturePower: 'Poder adquisitivo equivalente futuro:',
      inflationRealLoss: 'Pérdida real de valor:',
      inflationNeededFuture: 'Valor necesario en el futuro para comprar lo mismo que hoy:',
      inflationProtectTitle: 'Protección Anti-Inflación',
      inflationProtectBody:
        'Mantener dinero inactivo en cuentas de ahorro o moneda fiduciaria erosiona tu patrimonio silenciosamente. Diversifica en activos reales como acciones globales, bonos indexados a la inflación (IPCA+), Oro y Euro.',
      darfTitle: 'Calculadora de Ganancia de Capital & DARF',
      darfSubtitle: 'Normativa fiscal de la Receita Federal para acciones y criptoactivos.',
      darfAssetType: 'Tipo de Activo:',
      darfOptBr: 'Acciones Brasil (B3)',
      darfOptUs: 'Acciones EE. UU. / Global',
      darfOptCrypto: 'Criptomoneda',
      darfBuyPrice: 'Precio de Compra:',
      darfSellPrice: 'Precio de Venta:',
      darfQty: 'Cantidad de Acciones / Unidades:',
      darfMonthlyVol: 'Volumen Total Vendido en el Mes (R$):',
      darfDayTradeCheck: 'Operación Day Trade (20%)',
      darfGrossProfit: 'Ganancia Bruta Calculada:',
      darfExemptStatus: 'Estado de Exención Fiscal:',
      darfExemptBadge: '✓ EXENTO de Impuesto',
      darfTaxableBadge: 'GRAVABLE',
      darfApplicableRate: 'Tasa Aplicable:',
      darfEstimatedDue: 'DARF Estimado a Pagar:',
      darfNetProfit: 'Ganancia Neta Final:',
      darfRulesTitle: 'Reglas de la Receita Federal',
      darfRule1Title: 'Acciones B3 (Swing Trade):',
      darfRule1Body: 'Exento para ventas totales de hasta R$ 20.000 al mes. Por encima, tributación del 15% sobre la ganancia.',
      darfRule2Title: 'Day Trade:',
      darfRule2Body: 'Tributación fija del 20%, sin tramo de exención.',
      darfRule3Title: 'Criptoactivos:',
      darfRule3Body: 'Exención para enajenaciones totales de hasta R$ 35.000 mensuales.',
    },
    compoundChart: {
      startLabel: 'Inicio',
      yearPrefix: 'Año',
      yearsHorizonSuffix: 'años de horizonte',
      interestImpactLabel: 'Impacto de Intereses:',
      ofBalanceSuffix: 'del saldo',
      yourSimulationPrefix: 'Tu Simulación',
      cdi100Label: 'CDI 100% (11.5% anual)',
      tesouroIpcaLabel: 'Tesouro IPCA+ (11.2% anual)',
      poupancaLabel: 'Ahorro (6.17% anual)',
      doubleContribPrefix: 'Aporte Doble',
      currentContribPrefix: 'Aporte Actual',
      noContribLabel: 'Sin Aportes Mensuales (Solo Inicial)',
      perMonthSuffix: '/mes',
      totalInvestedBar: 'Total Aportado',
      accumInterestBar: 'Interés Acumulado',
      totalEquityLine: 'Patrimonio Total',
      compoundInterestLine: 'Interés Compuesto',
      totalInvestedArea: 'Total Aportado (Tu Capital)',
      compoundInterestArea: 'Interés Compuesto (Bola de Nieve)',
      viewEvolution: 'Evolución del Capital',
      viewBenchmark: 'Comparador Renta Fija',
      viewContribution: 'Impacto del Aporte',
      typeAreaTitle: 'Área Apilada',
      typeBarTitle: 'Barras',
      typeLineTitle: 'Líneas',
      expandModalTitle: 'Ampliar Gráfico en Modal',
      expandModalLabel: 'Ampliar Vista',
      headingEvolution: 'Evolución Patrimonial en el Tiempo',
      headingBenchmark: 'Simulación Comparativa: Tu Cartera vs Benchmarks',
      headingContribution: 'Curva de Sensibilidad por Intensidad de Aporte',
      yearsUnit: 'años',
      perYearUnit: 'anual',
      multiplierTitle: 'Multiplicador de Capital',
      multiplierBodyPrefix: 'Por cada R$ 1,00 aportado, tu patrimonio final alcanzará',
      multiplierBodySuffix: '',
      passiveIncomeTitle: 'Renta Pasiva Mensual',
      passiveIncomeBody: 'Retiro perpetuo sostenible del 0,8% mensual sin consumir el capital principal.',
      tippingPointTitle: 'Punto de Inflexión',
      tippingPointBodyFoundPrefix: 'En el Año',
      tippingPointBodyFoundSuffix: ', los intereses anuales superan tus aportes anuales.',
      tippingPointBodyDefault: 'El efecto bola de nieve supera tus aportes con el tiempo.',
      modalTitle: 'Simulación Interactiva de Interés Compuesto & Renta Fija',
      modalSubtitle: 'Proyección completa de evolución patrimonial, efecto bola de nieve y comparación de rentabilidad.',
      modalInitial: 'Aporte Inicial:',
      modalMonthly: 'Aporte Mensual:',
      modalRate: 'Tasa Anual:',
      modalHorizon: 'Horizonte:',
      modalFinalBalance: 'Monto Final:',
      modalTableTitle: 'Tabla Detallada Año por Año',
      modalTableInterestSharePrefix: 'Los intereses representan',
      modalTableInterestShareSuffix: '% del patrimonio',
      colYear: 'Año',
      colTotalInvested: 'Total Invertido',
      colInterest: 'Interés Acumulado',
      colFinalBalance: 'Saldo Final',
      colPctInterest: '% Interés',
      colEstPassive: 'Renta Pasiva Est.',
      tippingBadge: 'Inflexión',
      modalFooterNote: 'Cálculo con interés compuesto capitalizado mensualmente.',
      closeModal: 'Cerrar Modal',
    },
    footer: {
      logoAlt: 'Logotipo Oficial DinhEuro',
      tagline: 'Hub Global de Finanzas y Divisas',
      description:
        'Portal abierto de inteligencia financiera, cambio EUR/BRL en tiempo real y monitoreo del eje económico Unión Europea – Mercosur con fuentes públicas. Acceso 100% gratuito, anónimo, sin login, sin registro y sin recopilación ni almacenamiento de datos personales.',
      infraStatus: 'Operación Global • Infraestructura Cloud de Alta Disponibilidad',
      lgpdCompliance: 'En conformidad con la LGPD (Ley nº 13.709/2018) & SSL 256-bit',
      dpoLabel: 'Delegado de Protección de Datos (DPO):',
      navHubTitle: 'Navegación del Hub',
      resourcesTitle: 'Recursos & Análisis',
      legalTitle: 'Legal & Cumplimiento',
      backToTop: 'Volver arriba',
      cookiePrefs: 'Preferencias de Cookies',
      disclaimerPrefix: 'Aviso de Riesgo y Exención de Responsabilidad Financiera:',
      disclaimerBody:
        'es un portal digital informativo y educativo de agregación de datos económicos. Las cotizaciones en tiempo real de activos mundiales, tasas de cambio (Euro, Dólar, Real), acciones de B3, bolsas internacionales, criptoactivos y simuladores se consolidan a partir de feeds institucionales de mercado, mesas de cambio interbancario y libros públicos de negociación. DinhEuro no brinda asesoría de inversiones, análisis de valores mobiliarios ni recomendación directa de inversión. Operar en renta variable y Forex conlleva alto riesgo de pérdida de capital.',
      brandProtection:
        'DinhEuro™ — Marca con registro solicitado ante el INPI (Proceso nº 942746848). Queda expresamente prohibida la copia, reproducción, imitación o uso total o parcial del nombre, marca, logotipo, diseño, contenidos o funcionalidades de este portal en cualquier sitio, aplicación, plataforma o categoría comercial sin autorización previa y por escrito del titular.',
      copyrightSuffix: 'Todos los derechos reservados.',
      navDashboard: 'Inicio (Panel)',
      navMarkets: 'Mercados Mundiales',
      navPortfolios: 'Mis Carteras',
      navNews: 'Noticias & Análisis',
      resCharts: 'Terminal Gráfico D3 v7',
      resTools: 'Simuladores & Divisas',
      resAcademy: 'Academy & Glosario',
      resAbout: 'Acerca de DinhEuro',
      terms: 'Términos de Uso',
      privacy: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      disclaimer: 'Aviso Legal / Disclaimer',
      shortTerms: 'Términos',
      shortPrivacy: 'Privacidad',
      shortCookies: 'Cookies',
      shortDisclaimer: 'Aviso Legal',
    },
    seoBlock: {
      eyebrow: 'Portal Abierto de Inteligencia Económica',
      heading: 'Sobre el Portal DinhEuro y Preguntas Frecuentes (FAQ)',
      lead:
        'DinhEuro reúne en una sola interfaz datos públicos de tipo de cambio (Euro, Dólar y pares globales), diferenciales de tasas entre el Banco Central Europeo (BCE) y la Tasa Selic, cotizaciones bursátiles de Europa y del Mercosur y análisis macroeconómicos — con acceso 100% libre, gratuito y sin necesidad de registro ni inicio de sesión.',
      faqTitle: 'Preguntas Frecuentes',
      faqItems: [
        {
          question: '¿Cuál es la diferencia entre el tipo de cambio comercial y el de turismo?',
          answer:
            'El cambio comercial es la referencia interbancaria empleada en operaciones de comercio exterior, remesas corporativas y liquidación financiera. El cambio turismo corresponde a la compra de billetes físicos o tarjetas de viaje minoristas, incorporando logística, custodia, margen bancario (spread) e impuestos aplicables como el IOF.',
        },
        {
          question: '¿Cómo seguir el eje comercial Unión Europea–Mercosur desde el portal?',
          answer:
            'En la página inicial puedes monitorear la cotización del Euro frente al Real, los principales índices europeos (DAX, Euro Stoxx 50 y FTSE 100), las acciones de la bolsa brasileña y el Dossier capítulo por capítulo del Acuerdo MERCOSUR–Unión Europea, junto con síntesis editoriales sobre aranceles y cuotas.',
        },
        {
          question: '¿Cómo interpretar la relación entre Tasa Selic, IPCA y tipo de cambio en el Boletín Focus?',
          answer:
            'El Boletín Focus compila las medianas semanales del mercado recopiladas por el Banco Central de Brasil. Cuando las expectativas de inflación (IPCA) suben, el mercado suele descontar una Selic más alta; ese diferencial de tasas frente al exterior influye en el flujo de capitales y en la evolución del dólar y del euro frente al real.',
        },
        {
          question: '¿Cómo utilizar los simuladores y DinhEuro Academy?',
          answer:
            'Los simuladores de conversión de divisas, envíos internacionales (con cálculo de spread e IOF), interés compuesto y renta fija están disponibles gratis en Simuladores & Divisas y Renta Fija & Derivados. En DinhEuro Academy encontrarás rutas educativas sobre divisas, análisis técnico y macroeconomía global sin registro.',
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
