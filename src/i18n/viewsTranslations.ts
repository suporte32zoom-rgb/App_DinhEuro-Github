import type { SupportedLanguage } from './translations';

export interface ViewsTranslations {
  portfolio: {
    title: string;
    subtitle: string;
    newPosition: string;
    totalPortfolioValue: string;
    totalPL: string;
    accumulatedZero: string;
    accumulatedReturnSuffix: string;
    diversification: string;
    assetsUnit: string;
    noAssetsAdded: string;
    zeroAllocated: string;
    allocStocksBr: string;
    allocStocksUs: string;
    allocCrypto: string;
    allocForex: string;
    openPositionsTitle: string;
    updatedEverySecond: string;
    emptyPortfolioBadge: string;
    emptyTitle: string;
    emptyDesc: string;
    addFirstAsset: string;
    colAsset: string;
    colQty: string;
    colAvgPrice: string;
    colCurrentPrice: string;
    colTotalValue: string;
    colReturnPL: string;
    colActions: string;
    removeTooltip: string;
    modalTitle: string;
    selectCatalogLabel: string;
    selectCatalogPlaceholder: string;
    groupStocksBr: string;
    groupStocksUs: string;
    groupCrypto: string;
    groupForex: string;
    tickerLabel: string;
    tickerPlaceholder: string;
    assetNameLabel: string;
    assetNamePlaceholder: string;
    categoryLabel: string;
    catStockBr: string;
    catStockUs: string;
    catCrypto: string;
    catForex: string;
    currencyLabel: string;
    curBrl: string;
    curEur: string;
    curUsd: string;
    qtyLabel: string;
    avgBuyPriceLabel: string;
    cancel: string;
    addToPortfolio: string;
  };
  news: {
    title: string;
    liveBadge: string;
    subtitle: string;
    searchPlaceholder: string;
    refreshTitle: string;
    allNews: string;
    catPolicyFiscal: string;
    catMarketsB3: string;
    catMacroFx: string;
    catCentralBanks: string;
    catCrypto: string;
    catWallSt: string;
    showingPrefix: string;
    showingSuffix: string;
    clearSearch: string;
    nowFallback: string;
    readFull: string;
    readFullTitlePrefix: string;
  };
  about: {
    logoAlt: string;
    brandTagline: string;
    heroDescPrefix: string;
    heroDescSuffix: string;
    exploreMarkets: string;
    d3TerminalBtn: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    valuesTitle: string;
    valuesDesc: string;
    techTitle: string;
    techIntroPrefix: string;
    techIntroBold: string;
    techIntroSuffix: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    pillar4Title: string;
    pillar4Desc: string;
    pressTitle: string;
    pressDesc: string;
  };
  advancedCharts: {
    title: string;
    subtitle: string;
    selectAsset: string;
    groupIndices: string;
    groupStocksBr: string;
    groupStocksUs: string;
    groupForex: string;
    groupCrypto: string;
    groupCommodities: string;
  };
  assetDetail: {
    modalAriaPrefix: string;
    modalTopTitle: string;
    closeTitle: string;
    closeBtn: string;
    backToOverview: string;
    tradeDayTradePro: string;
    followingAsset: string;
    followAsset: string;
    alertActive: string;
    addAlert: string;
    addToPortfolio: string;
    liveBadge: string;
    officialQuoteRealtime: string;
    indexScoreLabel: string;
    currentQuoteDualLabel: string;
    indexPointsUnit: string;
    indexParityNote: string;
    quoteRegimeLabel: string;
    refRateLabel: string;
    dailyPerformance: string;
    syncedTodayAt: string;
    brasiliaTime: string;
    d3SectionTitle: string;
    keyStatsTitle: string;
    statOpen: string;
    statOpenIndexDesc: string;
    statOpenAssetDesc: string;
    statDayHigh: string;
    statDayHighIndexDesc: string;
    statDayHighAssetDesc: string;
    statDayLow: string;
    statDayLowIndexDesc: string;
    statDayLowAssetDesc: string;
    statVolume: string;
    statVolumeIndexDesc: string;
    statVolumeAssetDesc: string;
    stat52wHigh: string;
    stat52wHighIndexDesc: string;
    stat52wHighAssetDesc: string;
    stat52wLow: string;
    stat52wLowIndexDesc: string;
    stat52wLowAssetDesc: string;
    statPE: string;
    statPEDesc: string;
    statDY: string;
    statDYDesc: string;
    diagnosisTitle: string;
    diagnosisBadge: string;
    diagnosisSubtitle: string;
    scenarioSummaryTitle: string;
    immediateSupport: string;
    technicalResistance: string;
    liquidityTurnover: string;
    strengthsTitle: string;
    risksTitle: string;
    institutionalProfileTitle: string;
    legalNature: string;
    sectorLabel: string;
    segmentLabel: string;
    primaryBenchmark: string;
    governanceLabel: string;
    foundationYearLabel: string;
    addedToPortfolioToast: string;
    createPriceAlertTitle: string;
    createAlertDescPrefix: string;
    createAlertDescSuffix: string;
    targetPointsLabel: string;
    targetPriceLabel: string;
    cancel: string;
    saveAlert: string;
  };
  d3Chart: {
    styleArea: string;
    styleLine: string;
    styleCandle: string;
    smaTitle: string;
    smaLabel: string;
    volumeTitle: string;
    volumeLabel: string;
    compareTitle: string;
    compareLabel: string;
    selectOption: string;
    periodLow: string;
    periodHigh: string;
    openShort: string;
    highShort: string;
    lowShort: string;
    closeShort: string;
    volShort: string;
    engineLabel: string;
    precisionLabel: string;
    benchmarkPrefix: string;
    timezoneFooter: string;
  };
}

export const VIEWS_TRANSLATIONS: Record<SupportedLanguage, ViewsTranslations> = {
  pt: {
    portfolio: {
      title: 'Gerenciador de Carteiras Globais',
      subtitle: 'Controle de patrimônio unificado em Real, Euro e Dólar com valorização automática em tempo real.',
      newPosition: 'Nova Posição',
      totalPortfolioValue: 'Patrimônio Total da Carteira',
      totalPL: 'Lucro / Prejuízo Total (P&L)',
      accumulatedZero: '0,00% de rentabilidade acumulada (zerado)',
      accumulatedReturnSuffix: 'de rentabilidade acumulada',
      diversification: 'Diversificação da Carteira',
      assetsUnit: 'ativos',
      noAssetsAdded: 'Nenhum ativo adicionado',
      zeroAllocated: '0% alocado',
      allocStocksBr: 'Ações BR',
      allocStocksUs: 'Ações US',
      allocCrypto: 'Cripto',
      allocForex: 'Forex / Euro',
      openPositionsTitle: 'Posições Abertas no Portfólio',
      updatedEverySecond: 'Valores atualizados com a cotação do segundo',
      emptyPortfolioBadge: 'Carteira zerada',
      emptyTitle: 'Sua carteira está zerada e pronta',
      emptyDesc:
        'Nenhum ativo foi inserido previamente. Adicione seus investimentos em Ações (B3 e Wall St), Criptomoedas ou Moedas para calcular o patrimônio total e o lucro/prejuízo em tempo real.',
      addFirstAsset: 'Adicionar Primeiro Ativo',
      colAsset: 'Ativo',
      colQty: 'Qtd',
      colAvgPrice: 'Preço Médio',
      colCurrentPrice: 'Preço Atual',
      colTotalValue: 'Valor Total',
      colReturnPL: 'Retorno (P&L)',
      colActions: 'Ações',
      removeTooltip: 'Remover posição da carteira',
      modalTitle: 'Adicionar Nova Posição',
      selectCatalogLabel: 'Selecionar do Catálogo (Opcional)',
      selectCatalogPlaceholder: '-- Escolha um ativo ou digite manualmente abaixo --',
      groupStocksBr: 'Ações Brasil (B3)',
      groupStocksUs: 'Ações EUA (Wall Street)',
      groupCrypto: 'Criptomoedas',
      groupForex: 'Moedas & Câmbio',
      tickerLabel: 'Ticker / Código',
      tickerPlaceholder: 'Ex: PETR4, AAPL, BTC/USD, EUR/BRL',
      assetNameLabel: 'Nome do Ativo',
      assetNamePlaceholder: 'Ex: Petrobras PN',
      categoryLabel: 'Categoria',
      catStockBr: 'Ações Brasil (B3)',
      catStockUs: 'Ações EUA',
      catCrypto: 'Criptomoeda',
      catForex: 'Câmbio / Moeda',
      currencyLabel: 'Moeda',
      curBrl: 'Real (R$)',
      curEur: 'Euro (€)',
      curUsd: 'Dólar ($)',
      qtyLabel: 'Quantidade',
      avgBuyPriceLabel: 'Preço Médio de Compra',
      cancel: 'Cancelar',
      addToPortfolio: 'Adicionar à Carteira',
    },
    news: {
      title: 'Notícias & Cenário Político-Financeiro',
      liveBadge: 'Ao Vivo',
      subtitle:
        'Cobertura em tempo real dos bastidores de Brasília, Congresso, Banco Central (Copom), Wall Street, bolsas europeias e mercado cripto, com redirecionamento direto aos veículos oficiais de imprensa.',
      searchPlaceholder: 'Buscar por termo, fonte ou político...',
      refreshTitle: 'Atualizar feed de notícias',
      allNews: 'Todas as Notícias',
      catPolicyFiscal: 'Política & Fiscal',
      catMarketsB3: 'Mercados & B3',
      catMacroFx: 'Macro & Câmbio',
      catCentralBanks: 'Bancos Centrais',
      catCrypto: 'Criptoativos',
      catWallSt: 'Empresas & Wall St',
      showingPrefix: 'Mostrando',
      showingSuffix: 'matérias em ordem cronológica (mais recentes primeiro)',
      clearSearch: 'Limpar filtro de busca',
      nowFallback: 'Agora',
      readFull: 'Ler matéria completa',
      readFullTitlePrefix: 'Abrir matéria original completa em',
    },
    about: {
      logoAlt: 'Logo Oficial DinhEuro',
      brandTagline: 'dinheuro.com • Hub Financeiro Global & Mercados',
      heroDescPrefix: 'O',
      heroDescSuffix:
        'nasceu com a missão primordial de democratizar a informação econômica em tempo real e derrubar barreiras cambiais para quem investe, viaja, empreende ou constrói patrimônio entre o Brasil e o exterior.',
      exploreMarkets: 'Explorar Mercados',
      d3TerminalBtn: 'Terminal Gráfico D3 v7',
      missionTitle: 'Nossa Missão',
      missionDesc:
        'Democratizar a inteligência econômica global através de ferramentas analíticas, simulações instantâneas e cotações transparentes sem paywall ou jargões inacessíveis.',
      visionTitle: 'Visão Global',
      visionDesc:
        'Ser a principal referência em paridade Euro-Real e acompanhamento de carteiras multinacionais para brasileiros em qualquer lugar do mundo.',
      valuesTitle: 'Valores & Compliance',
      valuesDesc:
        'Transparência regulatória irrestrita, respeito à LGPD e integridade tecnológica em conformidade com as diretrizes do Banco Central do Brasil.',
      techTitle: 'Infraestrutura Tecnológica e Arquitetura PWA',
      techIntroPrefix: 'O DinhEuro é construído sob arquitetura',
      techIntroBold: 'Progressive Web App (PWA)',
      techIntroSuffix:
        'de alta performance, projetado para operação contínua e resiliente em infraestrutura global em nuvem. Ele combina:',
      pillar1Title: '• Motor Gráfico Institucional D3 v7',
      pillar1Desc:
        'Renderização vetorial SVG sem trepidação, médias móveis SMA 20/50, volume e velas japonesas de alta precisão.',
      pillar2Title: '• Caching Inteligente & Modo Offline',
      pillar2Desc:
        'Service workers Workbox para acesso instantâneo ao aplicativo mesmo em conexões lentas ou instáveis.',
      pillar3Title: '• Agregação Multiprovedor em Tempo Real',
      pillar3Desc:
        'Sincronização contínua com feeds consolidados de bolsas internacionais, mesas de câmbio e redes globais de liquidez para cobertura 360º de mercados.',
      pillar4Title: '• Privacidade Local (Zero Tracking de Carteira)',
      pillar4Desc:
        'As carteiras e ativos do usuário permanecem exclusivamente gravados no localStorage do dispositivo.',
      pressTitle: 'Canal Institucional & Imprensa',
      pressDesc: 'Para parcerias, sugestões de integração ou questões regulatórias:',
    },
    advancedCharts: {
      title: 'Terminal de Análise Técnica & Gráficos Avançados',
      subtitle: 'Motor Gráfico D3 v7 institucional com análise diagnóstica quantitativa em tempo real.',
      selectAsset: 'Selecionar Ativo:',
      groupIndices: 'Índices Globais',
      groupStocksBr: 'Ações B3 (Brasil)',
      groupStocksUs: 'Ações Internacionais (EUA)',
      groupForex: 'Câmbio & Forex',
      groupCrypto: 'Criptoativos',
      groupCommodities: 'Commodities',
    },
    assetDetail: {
      modalAriaPrefix: 'Detalhes do ativo',
      modalTopTitle: 'Detalhes & Análise do Ativo • DinhEuro',
      closeTitle: 'Fechar Detalhes (Esc)',
      closeBtn: 'Fechar',
      backToOverview: 'Voltar para Visão Geral',
      tradeDayTradePro: 'Operar Day Trade Pro',
      followingAsset: 'Seguindo Ativo',
      followAsset: 'Seguir Ativo',
      alertActive: 'Alerta Ativo',
      addAlert: 'Adicionar Alerta',
      addToPortfolio: 'Adicionar ao Portfólio',
      liveBadge: 'AO VIVO',
      officialQuoteRealtime: 'Cotação Oficial em Tempo Real',
      indexScoreLabel: 'Pontuação Oficial do Índice',
      currentQuoteDualLabel: 'Cotação Atual & Dupla Conversão',
      indexPointsUnit: 'Pontos de Índice',
      indexParityNote: 'Índice de mercado medido em pontos (pts) • Sem paridade cambial direta',
      quoteRegimeLabel: 'Regime de Cotação:',
      refRateLabel: 'Taxa de Câmbio de Referência:',
      dailyPerformance: 'Desempenho Diário',
      syncedTodayAt: 'Sincronizado hoje às',
      brasiliaTime: '(Horário de Brasília)',
      d3SectionTitle: 'Motor Gráfico D3 v7 • Análise Técnica Interativa',
      keyStatsTitle: 'Indicadores de Mercado & Estatísticas Chave',
      statOpen: 'Abertura',
      statOpenIndexDesc: 'Pontos na abertura do pregão',
      statOpenAssetDesc: 'Preço na abertura do pregão',
      statDayHigh: 'Máxima do Dia',
      statDayHighIndexDesc: 'Pico em pontos (24h)',
      statDayHighAssetDesc: 'Pico nas últimas 24h',
      statDayLow: 'Mínima do Dia',
      statDayLowIndexDesc: 'Vale em pontos (24h)',
      statDayLowAssetDesc: 'Vale nas últimas 24h',
      statVolume: 'Volume Negociado',
      statVolumeIndexDesc: 'Volume total em pontos',
      statVolumeAssetDesc: 'Liquidez de transações',
      stat52wHigh: 'Máx. 52 Semanas',
      stat52wHighIndexDesc: 'Pico anual em pontos',
      stat52wHighAssetDesc: 'Topo anual histórico',
      stat52wLow: 'Mín. 52 Semanas',
      stat52wLowIndexDesc: 'Fundo anual em pontos',
      stat52wLowAssetDesc: 'Fundo anual histórico',
      statPE: 'P/L (Preço / Lucro)',
      statPEDesc: 'Múltiplo de Valuation',
      statDY: 'Dividend Yield (DY)',
      statDYDesc: 'Rendimento anual de proventos',
      diagnosisTitle: 'Diagnóstico Quantitativo do Ativo',
      diagnosisBadge: 'DinhEuro Analytics Engine',
      diagnosisSubtitle: 'Análise quantitativa de liquidez, suporte, resistência e fatores de risco em tempo real.',
      scenarioSummaryTitle: 'Resumo do Cenário & Níveis Críticos',
      immediateSupport: 'Suporte Imediato',
      technicalResistance: 'Resistência Técnica',
      liquidityTurnover: 'Liquidez & Giro',
      strengthsTitle: 'Pontos Fortes & Oportunidades',
      risksTitle: 'Fatores de Risco & Atenção',
      institutionalProfileTitle: 'Perfil Institucional & Governança',
      legalNature: 'Natureza Jurídica / Tipo',
      sectorLabel: 'Setor de Atuação',
      segmentLabel: 'Segmento / Listagem',
      primaryBenchmark: 'Benchmark Primário',
      governanceLabel: 'Governança Corporativa',
      foundationYearLabel: 'Ano de Fundação',
      addedToPortfolioToast: 'adicionado ao seu Portfólio com sucesso!',
      createPriceAlertTitle: 'Criar Alerta de Preço',
      createAlertDescPrefix: 'Receba notificação instantânea quando',
      createAlertDescSuffix: 'atingir o patamar desejado.',
      targetPointsLabel: 'Pontuação Alvo (pts):',
      targetPriceLabel: 'Preço Alvo',
      cancel: 'Cancelar',
      saveAlert: 'Salvar Alerta',
    },
    d3Chart: {
      styleArea: 'Área',
      styleLine: 'Linha',
      styleCandle: 'Candlesticks',
      smaTitle: 'Médias Móveis (SMA 20 & SMA 50)',
      smaLabel: 'Média Móvel',
      volumeTitle: 'Exibir Volume',
      volumeLabel: 'Volume',
      compareTitle: 'Benchmark Comparativo',
      compareLabel: 'Comparar Ativo',
      selectOption: 'Selecione...',
      periodLow: 'Mín. Período:',
      periodHigh: 'Máx. Período:',
      openShort: 'Abertura:',
      highShort: 'Máx:',
      lowShort: 'Mín:',
      closeShort: 'Fech:',
      volShort: 'Vol:',
      engineLabel: 'Motor Gráfico D3 v7',
      precisionLabel: 'Precisão Institucional',
      benchmarkPrefix: 'Benchmark:',
      timezoneFooter: 'Fuso Horário: GMT-3 (São Paulo / B3) • Transmissão Contínua',
    },
  },
  en: {
    portfolio: {
      title: 'Global Portfolio Manager',
      subtitle: 'Unified wealth tracking in BRL, EUR, and USD with automatic real-time valuation.',
      newPosition: 'New Position',
      totalPortfolioValue: 'Total Portfolio Value',
      totalPL: 'Total Profit / Loss (P&L)',
      accumulatedZero: '0.00% cumulative return (empty)',
      accumulatedReturnSuffix: 'cumulative return',
      diversification: 'Portfolio Diversification',
      assetsUnit: 'assets',
      noAssetsAdded: 'No assets added',
      zeroAllocated: '0% allocated',
      allocStocksBr: 'BR Equities',
      allocStocksUs: 'US Equities',
      allocCrypto: 'Crypto',
      allocForex: 'Forex / Euro',
      openPositionsTitle: 'Open Portfolio Positions',
      updatedEverySecond: 'Values updated in real time with live quotes',
      emptyPortfolioBadge: 'Empty portfolio',
      emptyTitle: 'Your portfolio is empty and ready',
      emptyDesc:
        'No assets have been preloaded. Add your holdings in Equities (B3 & Wall St), Cryptocurrencies, or FX pairs to calculate total wealth and P&L in real time.',
      addFirstAsset: 'Add First Asset',
      colAsset: 'Asset',
      colQty: 'Qty',
      colAvgPrice: 'Avg. Price',
      colCurrentPrice: 'Current Price',
      colTotalValue: 'Total Value',
      colReturnPL: 'Return (P&L)',
      colActions: 'Actions',
      removeTooltip: 'Remove position from portfolio',
      modalTitle: 'Add New Position',
      selectCatalogLabel: 'Select from Catalog (Optional)',
      selectCatalogPlaceholder: '-- Choose an asset or enter manually below --',
      groupStocksBr: 'Brazil Equities (B3)',
      groupStocksUs: 'US Equities (Wall Street)',
      groupCrypto: 'Cryptocurrencies',
      groupForex: 'Currencies & FX',
      tickerLabel: 'Ticker / Symbol',
      tickerPlaceholder: 'E.g.: PETR4, AAPL, BTC/USD, EUR/BRL',
      assetNameLabel: 'Asset Name',
      assetNamePlaceholder: 'E.g.: Petrobras PN',
      categoryLabel: 'Category',
      catStockBr: 'Brazil Equities (B3)',
      catStockUs: 'US Equities',
      catCrypto: 'Cryptocurrency',
      catForex: 'FX / Currency',
      currencyLabel: 'Currency',
      curBrl: 'Brazilian Real (R$)',
      curEur: 'Euro (€)',
      curUsd: 'US Dollar ($)',
      qtyLabel: 'Quantity',
      avgBuyPriceLabel: 'Average Purchase Price',
      cancel: 'Cancel',
      addToPortfolio: 'Add to Portfolio',
    },
    news: {
      title: 'News & Political-Financial Desk',
      liveBadge: 'Live',
      subtitle:
        'Real-time coverage of Brasília fiscal policy, Congress, Central Bank (Copom), Wall Street, European exchanges, and crypto markets, with direct links to official press outlets.',
      searchPlaceholder: 'Search by keyword, source, or policymaker...',
      refreshTitle: 'Refresh news feed',
      allNews: 'All News',
      catPolicyFiscal: 'Policy & Fiscal',
      catMarketsB3: 'Markets & B3',
      catMacroFx: 'Macro & FX',
      catCentralBanks: 'Central Banks',
      catCrypto: 'Crypto Assets',
      catWallSt: 'Equities & Wall St',
      showingPrefix: 'Showing',
      showingSuffix: 'articles in chronological order (most recent first)',
      clearSearch: 'Clear search filter',
      nowFallback: 'Now',
      readFull: 'Read full story',
      readFullTitlePrefix: 'Open full original article on',
    },
    about: {
      logoAlt: 'Official DinhEuro Logo',
      brandTagline: 'dinheuro.com • Global Financial & Markets Hub',
      heroDescPrefix: '',
      heroDescSuffix:
        'was built with the core mission of democratizing real-time economic intelligence and removing currency barriers for anyone who invests, travels, builds a business, or grows wealth across borders.',
      exploreMarkets: 'Explore Markets',
      d3TerminalBtn: 'D3 v7 Charting Terminal',
      missionTitle: 'Our Mission',
      missionDesc:
        'Democratize global economic intelligence through analytical tools, instant simulations, and transparent quotes without paywalls or inaccessible jargon.',
      visionTitle: 'Global Vision',
      visionDesc:
        'Be the benchmark reference for Euro–Real parity and multi-currency portfolio tracking for global investors anywhere in the world.',
      valuesTitle: 'Values & Compliance',
      valuesDesc:
        'Unrestricted regulatory transparency, strict LGPD & GDPR privacy compliance, and technological integrity aligned with central bank standards.',
      techTitle: 'Technology Infrastructure & PWA Architecture',
      techIntroPrefix: 'DinhEuro is built on a high-performance',
      techIntroBold: 'Progressive Web App (PWA)',
      techIntroSuffix:
        'architecture engineered for continuous, resilient operation on global cloud infrastructure. It combines:',
      pillar1Title: '• D3 v7 Institutional Charting Engine',
      pillar1Desc:
        'Jitter-free SVG vector rendering, SMA 20/50 moving averages, volume bars, and high-precision Japanese candlesticks.',
      pillar2Title: '• Smart Caching & Offline Mode',
      pillar2Desc:
        'Workbox service workers for instant app loading even on slow or unstable connections.',
      pillar3Title: '• Real-Time Multi-Provider Aggregation',
      pillar3Desc:
        'Continuous synchronization with consolidated feeds from international exchanges, FX desks, and global liquidity networks for 360° market coverage.',
      pillar4Title: '• Local Privacy (Zero Portfolio Tracking)',
      pillar4Desc:
        'User portfolios and watchlists remain stored exclusively in the device’s localStorage.',
      pressTitle: 'Institutional & Press Contact',
      pressDesc: 'For partnerships, integration inquiries, or regulatory matters:',
    },
    advancedCharts: {
      title: 'Technical Analysis & Advanced Charts Terminal',
      subtitle: 'Institutional D3 v7 Charting Engine with real-time quantitative diagnostic analytics.',
      selectAsset: 'Select Asset:',
      groupIndices: 'Global Indices',
      groupStocksBr: 'Brazil Equities (B3)',
      groupStocksUs: 'US Equities (Wall Street)',
      groupForex: 'FX & Currencies',
      groupCrypto: 'Crypto Assets',
      groupCommodities: 'Commodities',
    },
    assetDetail: {
      modalAriaPrefix: 'Asset details for',
      modalTopTitle: 'Asset Details & Analysis • DinhEuro',
      closeTitle: 'Close Details (Esc)',
      closeBtn: 'Close',
      backToOverview: 'Back to Overview',
      tradeDayTradePro: 'Trade on Day Trade Pro',
      followingAsset: 'Following Asset',
      followAsset: 'Follow Asset',
      alertActive: 'Alert Active',
      addAlert: 'Set Price Alert',
      addToPortfolio: 'Add to Portfolio',
      liveBadge: 'LIVE',
      officialQuoteRealtime: 'Official Real-Time Quote',
      indexScoreLabel: 'Official Index Level',
      currentQuoteDualLabel: 'Current Quote & Multi-Currency Parity',
      indexPointsUnit: 'Index Points',
      indexParityNote: 'Market index measured in points (pts) • No direct FX parity',
      quoteRegimeLabel: 'Quotation Regime:',
      refRateLabel: 'Reference Exchange Rate:',
      dailyPerformance: 'Daily Performance',
      syncedTodayAt: 'Synced today at',
      brasiliaTime: '(Brasília Time)',
      d3SectionTitle: 'D3 v7 Charting Engine • Interactive Technical Analysis',
      keyStatsTitle: 'Market Indicators & Key Statistics',
      statOpen: 'Open',
      statOpenIndexDesc: 'Points at market open',
      statOpenAssetDesc: 'Price at session open',
      statDayHigh: 'Day High',
      statDayHighIndexDesc: 'Peak in points (24h)',
      statDayHighAssetDesc: '24-hour session high',
      statDayLow: 'Day Low',
      statDayLowIndexDesc: 'Low in points (24h)',
      statDayLowAssetDesc: '24-hour session low',
      statVolume: 'Trading Volume',
      statVolumeIndexDesc: 'Total session volume',
      statVolumeAssetDesc: 'Transaction liquidity',
      stat52wHigh: '52-Week High',
      stat52wHighIndexDesc: 'Annual peak in points',
      stat52wHighAssetDesc: '52-week upper range',
      stat52wLow: '52-Week Low',
      stat52wLowIndexDesc: 'Annual low in points',
      stat52wLowAssetDesc: '52-week lower range',
      statPE: 'P/E Ratio',
      statPEDesc: 'Valuation Multiple',
      statDY: 'Dividend Yield (DY)',
      statDYDesc: 'Annualized distribution yield',
      diagnosisTitle: 'Quantitative Asset Diagnostics',
      diagnosisBadge: 'DinhEuro Analytics Engine',
      diagnosisSubtitle: 'Quantitative analysis of liquidity, support, resistance, and risk factors in real time.',
      scenarioSummaryTitle: 'Scenario Summary & Key Technical Levels',
      immediateSupport: 'Immediate Support',
      technicalResistance: 'Technical Resistance',
      liquidityTurnover: 'Liquidity & Turnover',
      strengthsTitle: 'Strengths & Opportunities',
      risksTitle: 'Risk Factors & Watchlist',
      institutionalProfileTitle: 'Institutional Profile & Governance',
      legalNature: 'Legal Structure / Type',
      sectorLabel: 'Sector',
      segmentLabel: 'Segment / Listing',
      primaryBenchmark: 'Primary Benchmark',
      governanceLabel: 'Corporate Governance',
      foundationYearLabel: 'Founded',
      addedToPortfolioToast: 'added to your Portfolio successfully!',
      createPriceAlertTitle: 'Create Price Alert',
      createAlertDescPrefix: 'Receive an instant alert when',
      createAlertDescSuffix: 'reaches your target level.',
      targetPointsLabel: 'Target Level (pts):',
      targetPriceLabel: 'Target Price',
      cancel: 'Cancel',
      saveAlert: 'Save Alert',
    },
    d3Chart: {
      styleArea: 'Area',
      styleLine: 'Line',
      styleCandle: 'Candlesticks',
      smaTitle: 'Moving Averages (SMA 20 & SMA 50)',
      smaLabel: 'Moving Avg',
      volumeTitle: 'Show Volume',
      volumeLabel: 'Volume',
      compareTitle: 'Comparative Benchmark',
      compareLabel: 'Compare Asset',
      selectOption: 'Select...',
      periodLow: 'Period Low:',
      periodHigh: 'Period High:',
      openShort: 'Open:',
      highShort: 'High:',
      lowShort: 'Low:',
      closeShort: 'Close:',
      volShort: 'Vol:',
      engineLabel: 'D3 v7 Chart Engine',
      precisionLabel: 'Institutional Precision',
      benchmarkPrefix: 'Benchmark:',
      timezoneFooter: 'Timezone: GMT-3 (São Paulo / B3) • Continuous Feed',
    },
  },
  es: {
    portfolio: {
      title: 'Gestor de Carteras Globales',
      subtitle: 'Control patrimonial unificado en Real, Euro y Dólar con valoración automática en tiempo real.',
      newPosition: 'Nueva Posición',
      totalPortfolioValue: 'Patrimonio Total de la Cartera',
      totalPL: 'Ganancia / Pérdida Total (P&L)',
      accumulatedZero: '0,00% de rentabilidad acumulada (vacía)',
      accumulatedReturnSuffix: 'de rentabilidad acumulada',
      diversification: 'Diversificación de la Cartera',
      assetsUnit: 'activos',
      noAssetsAdded: 'Sin activos agregados',
      zeroAllocated: '0% asignado',
      allocStocksBr: 'Acciones BR',
      allocStocksUs: 'Acciones EE. UU.',
      allocCrypto: 'Cripto',
      allocForex: 'Forex / Euro',
      openPositionsTitle: 'Posiciones Abiertas en Cartera',
      updatedEverySecond: 'Valores actualizados en tiempo real con la cotización al segundo',
      emptyPortfolioBadge: 'Cartera vacía',
      emptyTitle: 'Tu cartera está vacía y lista',
      emptyDesc:
        'Aún no se ha agregado ningún activo. Añade tus inversiones en Acciones (B3 y Wall St), Criptomonedas o Divisas para calcular el patrimonio total y el P&L en tiempo real.',
      addFirstAsset: 'Agregar Primer Activo',
      colAsset: 'Activo',
      colQty: 'Cant.',
      colAvgPrice: 'Precio Promedio',
      colCurrentPrice: 'Precio Actual',
      colTotalValue: 'Valor Total',
      colReturnPL: 'Retorno (P&L)',
      colActions: 'Acciones',
      removeTooltip: 'Eliminar posición de la cartera',
      modalTitle: 'Agregar Nueva Posición',
      selectCatalogLabel: 'Seleccionar del Catálogo (Opcional)',
      selectCatalogPlaceholder: '-- Elige un activo o ingrésalo manualmente abajo --',
      groupStocksBr: 'Acciones Brasil (B3)',
      groupStocksUs: 'Acciones EE. UU. (Wall Street)',
      groupCrypto: 'Criptomonedas',
      groupForex: 'Divisas & Cambio',
      tickerLabel: 'Ticker / Símbolo',
      tickerPlaceholder: 'Ej.: PETR4, AAPL, BTC/USD, EUR/BRL',
      assetNameLabel: 'Nombre del Activo',
      assetNamePlaceholder: 'Ej.: Petrobras PN',
      categoryLabel: 'Categoría',
      catStockBr: 'Acciones Brasil (B3)',
      catStockUs: 'Acciones EE. UU.',
      catCrypto: 'Criptomoneda',
      catForex: 'Divisas / Cambio',
      currencyLabel: 'Moneda',
      curBrl: 'Real (R$)',
      curEur: 'Euro (€)',
      curUsd: 'Dólar ($)',
      qtyLabel: 'Cantidad',
      avgBuyPriceLabel: 'Precio Promedio de Compra',
      cancel: 'Cancelar',
      addToPortfolio: 'Agregar a la Cartera',
    },
    news: {
      title: 'Noticias & Escenario Político-Financiero',
      liveBadge: 'En Vivo',
      subtitle:
        'Cobertura en tiempo real de Brasilia, Congreso, Banco Central (Copom), Wall Street, bolsas europeas y mercado cripto, con redirección directa a medios oficiales de prensa.',
      searchPlaceholder: 'Buscar por término, fuente o funcionario...',
      refreshTitle: 'Actualizar feed de noticias',
      allNews: 'Todas las Noticias',
      catPolicyFiscal: 'Política & Fiscal',
      catMarketsB3: 'Mercados & B3',
      catMacroFx: 'Macro & Divisas',
      catCentralBanks: 'Bancos Centrales',
      catCrypto: 'Criptoactivos',
      catWallSt: 'Empresas & Wall St',
      showingPrefix: 'Mostrando',
      showingSuffix: 'artículos en orden cronológico (más recientes primero)',
      clearSearch: 'Limpiar filtro de búsqueda',
      nowFallback: 'Ahora',
      readFull: 'Leer nota completa',
      readFullTitlePrefix: 'Abrir artículo original completo en',
    },
    about: {
      logoAlt: 'Logotipo Oficial DinhEuro',
      brandTagline: 'dinheuro.com • Hub Financiero Global & Mercados',
      heroDescPrefix: '',
      heroDescSuffix:
        'nació con la misión primordial de democratizar la información económica en tiempo real y derribar barreras cambiarias para quienes invierten, viajan, emprenden o construyen patrimonio internacional.',
      exploreMarkets: 'Explorar Mercados',
      d3TerminalBtn: 'Terminal Gráfico D3 v7',
      missionTitle: 'Nuestra Misión',
      missionDesc:
        'Democratizar la inteligencia económica global mediante herramientas analíticas, simulaciones instantáneas y cotizaciones transparentes sin muros de pago ni jerga inaccesible.',
      visionTitle: 'Visión Global',
      visionDesc:
        'Ser la referencia principal en paridad Euro–Real y seguimiento de carteras multinacionales para inversores en cualquier lugar del mundo.',
      valuesTitle: 'Valores & Cumplimiento',
      valuesDesc:
        'Transparencia regulatoria irrestricta, respeto a la LGPD y GDPR e integridad tecnológica alineada con las directrices de bancos centrales.',
      techTitle: 'Infraestructura Tecnológica y Arquitectura PWA',
      techIntroPrefix: 'DinhEuro está construido bajo una arquitectura',
      techIntroBold: 'Progressive Web App (PWA)',
      techIntroSuffix:
        'de alto rendimiento, diseñada para operar de forma continua y resiliente en infraestructura global en la nube. Combina:',
      pillar1Title: '• Motor Gráfico Institucional D3 v7',
      pillar1Desc:
        'Renderizado vectorial SVG sin parpadeos, medias móviles SMA 20/50, volumen y velas japonesas de alta precisión.',
      pillar2Title: '• Caché Inteligente & Modo Offline',
      pillar2Desc:
        'Service workers Workbox para acceso instantáneo a la aplicación incluso con conexiones lentas o inestables.',
      pillar3Title: '• Agregación Multiproveedor en Tiempo Real',
      pillar3Desc:
        'Sincronización continua con feeds consolidados de bolsas internacionales, mesas de cambio y redes globales de liquidez para cobertura 360° de mercados.',
      pillar4Title: '• Privacidad Local (Cero Rastreo de Cartera)',
      pillar4Desc:
        'Las carteras y activos del usuario permanecen almacenados exclusivamente en el localStorage del dispositivo.',
      pressTitle: 'Canal Institucional & Prensa',
      pressDesc: 'Para alianzas, sugerencias de integración o consultas regulatorias:',
    },
    advancedCharts: {
      title: 'Terminal de Análisis Técnico & Gráficos Avanzados',
      subtitle: 'Motor Gráfico D3 v7 institucional con análisis diagnóstico cuantitativo en tiempo real.',
      selectAsset: 'Seleccionar Activo:',
      groupIndices: 'Índices Globales',
      groupStocksBr: 'Acciones B3 (Brasil)',
      groupStocksUs: 'Acciones Internacionales (EE. UU.)',
      groupForex: 'Divisas & Forex',
      groupCrypto: 'Criptoactivos',
      groupCommodities: 'Materias Primas',
    },
    assetDetail: {
      modalAriaPrefix: 'Detalles del activo',
      modalTopTitle: 'Detalles & Análisis del Activo • DinhEuro',
      closeTitle: 'Cerrar Detalles (Esc)',
      closeBtn: 'Cerrar',
      backToOverview: 'Volver a Vista General',
      tradeDayTradePro: 'Operar Day Trade Pro',
      followingAsset: 'Siguiendo Activo',
      followAsset: 'Seguir Activo',
      alertActive: 'Alerta Activa',
      addAlert: 'Crear Alerta',
      addToPortfolio: 'Agregar al Portafolio',
      liveBadge: 'EN VIVO',
      officialQuoteRealtime: 'Cotización Oficial en Tiempo Real',
      indexScoreLabel: 'Puntuación Oficial del Índice',
      currentQuoteDualLabel: 'Cotización Actual & Doble Conversión',
      indexPointsUnit: 'Puntos de Índice',
      indexParityNote: 'Índice de mercado medido en puntos (pts) • Sin paridad cambiaria directa',
      quoteRegimeLabel: 'Régimen de Cotización:',
      refRateLabel: 'Tipo de Cambio de Referencia:',
      dailyPerformance: 'Rendimiento Diario',
      syncedTodayAt: 'Sincronizado hoy a las',
      brasiliaTime: '(Hora de Brasilia)',
      d3SectionTitle: 'Motor Gráfico D3 v7 • Análisis Técnico Interactivo',
      keyStatsTitle: 'Indicadores de Mercado & Estadísticas Clave',
      statOpen: 'Apertura',
      statOpenIndexDesc: 'Puntos en la apertura de sesión',
      statOpenAssetDesc: 'Precio en la apertura de sesión',
      statDayHigh: 'Máximo del Día',
      statDayHighIndexDesc: 'Pico en puntos (24h)',
      statDayHighAssetDesc: 'Máximo de las últimas 24h',
      statDayLow: 'Mínimo del Día',
      statDayLowIndexDesc: 'Mínimo en puntos (24h)',
      statDayLowAssetDesc: 'Mínimo de las últimas 24h',
      statVolume: 'Volumen Negociado',
      statVolumeIndexDesc: 'Volumen total en puntos',
      statVolumeAssetDesc: 'Liquidez de transacciones',
      stat52wHigh: 'Máx. 52 Semanas',
      stat52wHighIndexDesc: 'Pico anual en puntos',
      stat52wHighAssetDesc: 'Techo anual histórico',
      stat52wLow: 'Mín. 52 Semanas',
      stat52wLowIndexDesc: 'Mínimo anual en puntos',
      stat52wLowAssetDesc: 'Piso anual histórico',
      statPE: 'PER (Precio / Beneficio)',
      statPEDesc: 'Múltiplo de Valuación',
      statDY: 'Dividend Yield (DY)',
      statDYDesc: 'Rendimiento anual por dividendos',
      diagnosisTitle: 'Diagnóstico Cuantitativo del Activo',
      diagnosisBadge: 'DinhEuro Analytics Engine',
      diagnosisSubtitle: 'Análisis cuantitativo de liquidez, soporte, resistencia y factores de riesgo en tiempo real.',
      scenarioSummaryTitle: 'Resumen del Escenario & Niveles Críticos',
      immediateSupport: 'Soporte Inmediato',
      technicalResistance: 'Resistencia Técnica',
      liquidityTurnover: 'Liquidez & Rotación',
      strengthsTitle: 'Fortalezas & Oportunidades',
      risksTitle: 'Factores de Riesgo & Atención',
      institutionalProfileTitle: 'Perfil Institucional & Gobernanza',
      legalNature: 'Naturaleza Jurídica / Tipo',
      sectorLabel: 'Sector de Actividad',
      segmentLabel: 'Segmento / Listado',
      primaryBenchmark: 'Benchmark Primario',
      governanceLabel: 'Gobernanza Corporativa',
      foundationYearLabel: 'Año de Fundación',
      addedToPortfolioToast: 'agregado a tu Portafolio con éxito!',
      createPriceAlertTitle: 'Crear Alerta de Precio',
      createAlertDescPrefix: 'Recibe una notificación instantánea cuando',
      createAlertDescSuffix: 'alcance el nivel deseado.',
      targetPointsLabel: 'Puntuación Objetivo (pts):',
      targetPriceLabel: 'Precio Objetivo',
      cancel: 'Cancelar',
      saveAlert: 'Guardar Alerta',
    },
    d3Chart: {
      styleArea: 'Área',
      styleLine: 'Línea',
      styleCandle: 'Velas Japonesas',
      smaTitle: 'Medias Móviles (SMA 20 & SMA 50)',
      smaLabel: 'Media Móvil',
      volumeTitle: 'Mostrar Volumen',
      volumeLabel: 'Volumen',
      compareTitle: 'Benchmark Comparativo',
      compareLabel: 'Comparar Activo',
      selectOption: 'Seleccionar...',
      periodLow: 'Mín. Período:',
      periodHigh: 'Máx. Período:',
      openShort: 'Apertura:',
      highShort: 'Máx:',
      lowShort: 'Mín:',
      closeShort: 'Cierre:',
      volShort: 'Vol:',
      engineLabel: 'Motor Gráfico D3 v7',
      precisionLabel: 'Precisión Institucional',
      benchmarkPrefix: 'Benchmark:',
      timezoneFooter: 'Huso Horario: GMT-3 (São Paulo / B3) • Transmisión Continua',
    },
  },
};
