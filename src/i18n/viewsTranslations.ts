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
    perfSectionTitle: string;
    perfSectionSubtitle: string;
    perfPeriodLabel: string;
    perfEquityChartTitle: string;
    perfAssetChartTitle: string;
    perfModeValue: string;
    perfModeReturn: string;
    perfSeriesPortfolio: string;
    perfSeriesCostBasis: string;
    perfSeriesPortfolioPct: string;
    perfPeriodReturn: string;
    perfPeriodHighLow: string;
    perfBestAsset: string;
    perfEmptyChartTitle: string;
    perfEmptyChartDesc: string;
    perfSyncedBadge: string;
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
  news: {
    title: string;
    liveBadge: string;
    subtitle: string;
    searchPlaceholder: string;
    refreshTitle: string;
    allNews: string;
    catMacroFx: string;
    catCentralBanks: string;
    catPolicyFiscal: string;
    catMarketsB3: string;
    catDigitalInfra: string;
    showingPrefix: string;
    showingSuffix: string;
    clearSearch: string;
    emptyTitle: string;
    emptyDesc: string;
    editorialCriteria: {
      eyebrow: string;
      title: string;
      intro: string;
      points: Array<{
        title: string;
        body: string;
      }>;
      disclaimer: string;
    };
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
      perfSectionTitle: 'Performance Histórica da Carteira',
      perfSectionSubtitle: 'Curva de evolução patrimonial, custo investido e comparativo percentual por ativo em tempo real.',
      perfPeriodLabel: 'Período:',
      perfEquityChartTitle: 'Evolução Patrimonial vs. Capital Investido',
      perfAssetChartTitle: 'Rentabilidade Comparativa por Ativo (%)',
      perfModeValue: 'Valor Patrimonial',
      perfModeReturn: 'Rentabilidade (%)',
      perfSeriesPortfolio: 'Patrimônio da Carteira',
      perfSeriesCostBasis: 'Capital Investido (Custo)',
      perfSeriesPortfolioPct: 'Carteira Consolidada (%)',
      perfPeriodReturn: 'Variação no Período',
      perfPeriodHighLow: 'Máx / Mín no Período',
      perfBestAsset: 'Destaque do Período',
      perfEmptyChartTitle: 'Gráficos de performance prontos para sua carteira',
      perfEmptyChartDesc: 'Adicione seu primeiro ativo para acompanhar a evolução histórica em linha, comparativo contra o custo médio e desempenho individual.',
      perfSyncedBadge: 'Série Histórica Sincronizada',
      editorialGuide: {
        eyebrow: 'Educação Financeira & Patrimônio',
        title: 'Guia Prático de Gestão de Carteira Global e Avaliação Patrimonial',
        intro:
          'Entenda os conceitos essenciais para consolidar posições em múltiplas moedas, comparar rentabilidade real, equilibrar riscos geográficos e utilizar o simulador com privacidade.',
        sections: [
          {
            id: 'multi-currency-wealth',
            title: 'Consolidando Patrimônio em Real (BRL), Euro (EUR) e Dólar (USD)',
            body:
              'Acompanhar o portfólio simultaneamente em Real, Euro e Dólar permite medir o poder de compra real do patrimônio além da variação nominal em uma única moeda. Quando um investidor detém ativos brasileiros e internacionais, oscilações na taxa de câmbio alteram o valor consolidado: uma valorização do Dólar ou do Euro amplia o patrimônio expresso em reais, enquanto a apreciação do Real aumenta o equivalente em moeda forte dos ativos domésticos.',
          },
          {
            id: 'avg-cost-pnl',
            title: 'Preço Médio, Capital Investido e Lucro/Prejuízo (P&L)',
            body:
              'O capital investido representa o custo histórico de aquisição calculado pela multiplicação entre quantidade e preço médio de compra de cada ativo. Já o valor de mercado reflete a cotação corrente em tempo real. A diferença entre ambos forma o Lucro/Prejuízo (P&L) financeiro e o retorno percentual acumulado — permitindo avaliar de forma objetiva o desempenho de ações da B3, papéis globais e criptoativos frente ao custo inicial.',
          },
          {
            id: 'diversification-geography',
            title: 'Diversificação por Classe de Ativo e Geografia',
            body:
              'Distribuir posições entre renda variável brasileira, mercados desenvolvidos dos Estados Unidos e da Europa, moedas fortes e ativos digitais ajuda a reduzir a concentração de risco em um único ciclo econômico ou jurisdição. As barras de alocação do painel mostram visualmente o peso proporcional de cada classe na carteira, facilitando identificar excessos de exposição antes de planejar novos aportes.',
          },
          {
            id: 'local-privacy',
            title: 'Privacidade e Armazenamento Local sem Cadastro',
            body:
              'Todas as posições adicionadas, quantidades e preços médios permanecem armazenados exclusivamente no próprio navegador do usuário, sem criação de conta, exigência de senha ou envio de dados patrimoniais pessoais para servidores externos. Isso garante sigilo total nas simulações e acesso imediato sempre que retornar no mesmo dispositivo.',
          },
        ],
      },
      faq: {
        eyebrow: 'Dúvidas Frequentes',
        title: 'Perguntas Frequentes sobre o Gerenciador de Carteiras',
        items: [
          {
            question: 'Como o câmbio em tempo real afeta o patrimônio convertido em EUR e USD?',
            answer:
              'O painel calcula primeiro o valor atualizado de cada posição em reais com base nas taxas vigentes de Dólar e Euro e, em seguida, converte o total consolidado para EUR e USD. Assim, mesmo que seus ativos na B3 permaneçam estáveis em reais, variações cambiais alteram imediatamente o poder de compra equivalente em Euro e Dólar.',
          },
          {
            question: 'Qual a diferença entre rentabilidade nominal em reais e rentabilidade em dólar ou euro?',
            answer:
              'A rentabilidade nominal em reais mede o ganho exclusivamente na moeda brasileira, sem descontar eventual desvalorização cambial. Já a leitura em dólar ou euro mostra quanto o portfólio cresceu de fato em moedas fortes globais, revelando se o retorno dos ativos superou ou não a variação do câmbio no período.',
          },
          {
            question: 'Como registrar múltiplas compras do mesmo ativo para acompanhar o preço médio?',
            answer:
              'Você pode somar a quantidade total adquirida e informar o preço médio ponderado das operações em uma única posição consolidada, ou registrar aportes separados pelo botão "Nova Posição" para visualizar o impacto individual de cada entrada no retorno total.',
          },
          {
            question: 'Os resultados e gráficos do gerenciador constituem recomendação financeira?',
            answer:
              'Não. O Gerenciador de Carteiras Globais é uma ferramenta exclusivamente educativa e de simulação patrimonial, desenhada para estudo de alocação multimoeda e acompanhamento informativo de cotações, sem caráter de consultoria ou recomendação de compra ou venda.',
          },
        ],
      },
    },
    news: {
      title: 'Notícias & Cenário Político-Financeiro',
      liveBadge: 'Editorial DinhEuro',
      subtitle:
        'O DinhEuro publica análises macroeconômicas originais elaboradas pela nossa redação a partir de dados públicos do Banco Central do Brasil, MDIC, Banco Central Europeu (BCE) e relatórios institucionais de mercado, conectando política monetária, comércio exterior e câmbio.',
      searchPlaceholder: 'Buscar por tema, instituição ou palavra-chave...',
      refreshTitle: 'Sincronizar cotações e análises',
      allNews: 'Todas as Análises',
      catMacroFx: 'Macro & Câmbio',
      catCentralBanks: 'Bancos Centrais',
      catPolicyFiscal: 'Política & Comércio',
      catMarketsB3: 'Mercados & B3',
      catDigitalInfra: 'Real Digital & Drex',
      showingPrefix: 'Mostrando',
      showingSuffix: 'análises originais em ordem cronológica (mais recentes primeiro)',
      clearSearch: 'Limpar filtro de busca',
      emptyTitle: 'Nenhuma análise encontrada para este filtro',
      emptyDesc:
        'Ajuste os termos da busca ou selecione outra categoria temática para explorar todas as publicações editoriais disponíveis.',
      editorialCriteria: {
        eyebrow: 'Transparência Metodológica',
        title: 'Critérios Editoriais e Fontes de Referência',
        intro:
          'Cada estudo publicado nesta seção é redigido originalmente pela Redação DinhEuro com foco na leitura prática de impactos sobre câmbio (EUR/BRL e USD/BRL), fluxos de comércio exterior e dinâmica dos mercados globais e da B3.',
        points: [
          {
            title: 'Fontes Institucionais Primárias',
            body:
              'Os textos partem de estatísticas oficiais, atas e notas técnicas divulgadas pelo Banco Central do Brasil (Copom, Boletim Focus e Agenda BC#), Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC/SECEX), Banco Central Europeu (BCE), Comissão Europeia, B3, Aladi e relatórios setoriais de referência.',
          },
          {
            title: 'Estrutura Analítica e Contextualização Cambial',
            body:
              'Em vez de reproduzir despachos externos ou manchetes isoladas, cada análise explica mecanismos de transmissão econômica — como diferenciais de juros, saldos da balança comercial, tarifas aduaneiras e fluxos de capital influenciam preços e poder de compra.',
          },
          {
            title: 'Finalidade Educativa e Informativa',
            body:
              'Todo o conteúdo tem caráter estritamente informativo e educacional, destinado a estudantes, profissionais de comércio exterior, viajantes e investidores que buscam compreender o cenário macroeconômico sem barreiras de acesso.',
          },
          {
            title: 'Ausência de Recomendações de Investimento',
            body:
              'As análises do DinhEuro não constituem consultoria financeira, indicação de compra ou venda de ativos, nem oferta de produtos regulados. Decisões patrimoniais devem considerar o perfil individual de risco e fontes regulatórias oficiais.',
          },
        ],
        disclaimer:
          'Conteúdo editorial original • Acesso aberto e gratuito • Consulte sempre as publicações originais dos órgãos oficiais citados em cada artigo.',
      },
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
      perfSectionTitle: 'Historical Portfolio Performance',
      perfSectionSubtitle: 'Wealth trajectory curve, invested cost basis, and per-asset percentage return in real time.',
      perfPeriodLabel: 'Period:',
      perfEquityChartTitle: 'Portfolio Value vs. Cost Basis',
      perfAssetChartTitle: 'Comparative Asset Performance (%)',
      perfModeValue: 'Portfolio Value',
      perfModeReturn: 'Return (%)',
      perfSeriesPortfolio: 'Portfolio Value',
      perfSeriesCostBasis: 'Invested Cost Basis',
      perfSeriesPortfolioPct: 'Consolidated Portfolio (%)',
      perfPeriodReturn: 'Period Return',
      perfPeriodHighLow: 'Period High / Low',
      perfBestAsset: 'Top Performer',
      perfEmptyChartTitle: 'Performance line charts ready for your portfolio',
      perfEmptyChartDesc: 'Add your first holding to track historical equity curves, compare against cost basis, and inspect per-asset returns.',
      perfSyncedBadge: 'Historical Series Synced',
      editorialGuide: {
        eyebrow: 'Wealth Education & Multi-Currency Tracking',
        title: 'Practical Guide to Global Portfolio Management and Valuation',
        intro:
          'Understand the core principles behind multi-currency wealth consolidation, cost-basis P&L tracking, geographic diversification, and private browser-local simulations.',
        sections: [
          {
            id: 'multi-currency-wealth',
            title: 'Consolidating Wealth in BRL, EUR, and USD',
            body:
              'Tracking your portfolio across Real, Euro, and US Dollar simultaneously measures real purchasing power beyond nominal local-currency gains. When holding both domestic and international assets, FX fluctuations directly reshape consolidated wealth: a stronger Dollar or Euro lifts BRL-denominated totals, whereas BRL appreciation raises the hard-currency equivalent of local holdings.',
          },
          {
            id: 'avg-cost-pnl',
            title: 'Average Price, Invested Capital, and Profit/Loss (P&L)',
            body:
              'Invested capital reflects historical acquisition cost calculated from quantity multiplied by average purchase price, while market value tracks live exchange quotes. Comparing both yields cumulative financial Profit/Loss (P&L) and percentage return across Brazilian B3 equities, US stocks, and crypto assets.',
          },
          {
            id: 'diversification-geography',
            title: 'Diversification by Asset Class and Geography',
            body:
              'Spreading exposure across Brazilian equities, developed markets in the US and Europe, hard currencies, and digital assets helps curb concentration risk tied to any single economic cycle. Allocation bars summarize each category’s share so overweights stand out clearly before planning new contributions.',
          },
          {
            id: 'local-privacy',
            title: 'Privacy and Local Browser Storage Without Sign-Up',
            body:
              'Every position, quantity, and average entry price stays saved locally inside your own browser without account registration, passwords, or transmission of personal wealth records to external servers—preserving full privacy across simulations on your device.',
          },
        ],
      },
      faq: {
        eyebrow: 'Frequently Asked Questions',
        title: 'FAQ on the Portfolio Manager',
        items: [
          {
            question: 'How do real-time exchange rates affect wealth converted into EUR and USD?',
            answer:
              'The dashboard values each holding using current USD and EUR exchange rates and expresses the consolidated portfolio across BRL, EUR, and USD. Even when local B3 share prices stay flat in reais, FX movements immediately update your equivalent purchasing power in Euros and US Dollars.',
          },
          {
            question: 'What is the difference between nominal BRL return and USD/EUR-adjusted return?',
            answer:
              'Nominal return in reais measures gains purely in Brazilian currency without adjusting for currency depreciation. Viewing returns in USD or EUR reveals whether underlying asset performance outpaced exchange-rate movements in hard global currencies.',
          },
          {
            question: 'How can I log multiple purchases of the same asset to track average price?',
            answer:
              'You can enter total combined shares at your weighted average purchase price as one consolidated holding, or record separate lots via "New Position" to observe each entry’s individual impact on total return.',
          },
          {
            question: 'Do portfolio metrics and charts represent investment advice?',
            answer:
              'No. The Global Portfolio Manager is strictly an educational and simulation tool for exploring multi-currency allocation and quote tracking, and does not provide financial advice or buy/sell recommendations.',
          },
        ],
      },
    },
    news: {
      title: 'News & Political-Financial Desk',
      liveBadge: 'DinhEuro Editorial',
      subtitle:
        'DinhEuro publishes original macroeconomic analyses prepared by our editorial desk from public data released by the Central Bank of Brazil, MDIC, the European Central Bank (ECB), and institutional market reports—connecting monetary policy, foreign trade, and FX.',
      searchPlaceholder: 'Search by topic, institution, or keyword...',
      refreshTitle: 'Refresh market quotes and analyses',
      allNews: 'All Analyses',
      catMacroFx: 'Macro & FX',
      catCentralBanks: 'Central Banks',
      catPolicyFiscal: 'Policy & Trade',
      catMarketsB3: 'Markets & B3',
      catDigitalInfra: 'Digital Real & Drex',
      showingPrefix: 'Showing',
      showingSuffix: 'original analyses in chronological order (most recent first)',
      clearSearch: 'Clear search filter',
      emptyTitle: 'No analyses matched this filter',
      emptyDesc:
        'Adjust your search terms or switch topic filters to explore all available original editorial briefings.',
      editorialCriteria: {
        eyebrow: 'Methodological Transparency',
        title: 'Editorial Criteria & Reference Sources',
        intro:
          'Every report published in this section is authored originally by DinhEuro Editorial with an emphasis on practical implications for EUR/BRL and USD/BRL exchange rates, foreign trade flows, and global and B3 market dynamics.',
        points: [
          {
            title: 'Primary Institutional Sources',
            body:
              'Briefings draw directly on official statistics, policy minutes, and technical notes released by the Central Bank of Brazil (Copom, Boletim Focus, and Agenda BC#), Brazil’s Ministry of Development, Industry, Trade and Services (MDIC/SECEX), the European Central Bank (ECB), the European Commission, B3, ALADI, and established sector benchmarks.',
          },
          {
            title: 'Analytical Context Over Wire Aggregation',
            body:
              'Rather than republishing third-party headlines or external wire dispatches, each article examines economic transmission channels—showing how rate spreads, trade balances, tariffs, and capital flows shape pricing and purchasing power.',
          },
          {
            title: 'Educational & Informational Purpose',
            body:
              'All editorial material is strictly educational and informational, built for students, trade practitioners, travelers, and global market observers seeking clear macro context without paywalls or registration.',
          },
          {
            title: 'No Investment Advice',
            body:
              'DinhEuro analyses do not constitute personalized financial advice, buy or sell recommendations, or solicitation of regulated financial products. Allocation choices remain the sole responsibility of each reader.',
          },
        ],
        disclaimer:
          'Original editorial analysis • Free open access • Always consult primary releases from the official institutions cited in each briefing.',
      },
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
      perfSectionTitle: 'Rendimiento Histórico de la Cartera',
      perfSectionSubtitle: 'Curva de evolución patrimonial, capital invertido y comparativa porcentual por activo en tiempo real.',
      perfPeriodLabel: 'Período:',
      perfEquityChartTitle: 'Evolución Patrimonial vs. Capital Invertido',
      perfAssetChartTitle: 'Rendimiento Comparativo por Activo (%)',
      perfModeValue: 'Valor Patrimonial',
      perfModeReturn: 'Rentabilidad (%)',
      perfSeriesPortfolio: 'Patrimonio de la Cartera',
      perfSeriesCostBasis: 'Capital Invertido (Costo)',
      perfSeriesPortfolioPct: 'Cartera Consolidada (%)',
      perfPeriodReturn: 'Variación del Período',
      perfPeriodHighLow: 'Máx / Mín del Período',
      perfBestAsset: 'Mejor Activo del Período',
      perfEmptyChartTitle: 'Gráficos de rendimiento listos para tu cartera',
      perfEmptyChartDesc: 'Agrega tu primer activo para seguir la evolución histórica en línea, comparar contra el costo promedio y ver el desempeño individual.',
      perfSyncedBadge: 'Serie Histórica Sincronizada',
      editorialGuide: {
        eyebrow: 'Educación Financiera & Patrimonio',
        title: 'Guía Práctica de Gestión de Cartera Global y Valoración Patrimonial',
        intro:
          'Conoce los conceptos clave para consolidar posiciones multidivisa, medir el rendimiento real frente al costo invertido, diversificar por geografía y simular escenarios con total privacidad.',
        sections: [
          {
            id: 'multi-currency-wealth',
            title: 'Consolidando Patrimonio en Real (BRL), Euro (EUR) y Dólar (USD)',
            body:
              'Seguir la cartera simultáneamente en Real, Euro y Dólar permite evaluar el poder adquisitivo real más allá de la variación nominal en una sola moneda. Al combinar activos locales e internacionales, el tipo de cambio modifica el valor consolidado: una suba del Dólar o del Euro eleva el total expresado en reales, mientras la apreciación del Real aumenta el equivalente en divisas fuertes de las posiciones domésticas.',
          },
          {
            id: 'avg-cost-pnl',
            title: 'Precio Promedio, Capital Invertido y Ganancia/Pérdida (P&L)',
            body:
              'El capital invertido refleja el costo histórico de compra obtenido al multiplicar cantidad por precio promedio de entrada, mientras el valor de mercado sigue la cotización vigente en tiempo real. La diferencia arroja la Ganancia o Pérdida (P&L) y el retorno porcentual acumulado en acciones de B3, acciones globales y criptoactivos.',
          },
          {
            id: 'diversification-geography',
            title: 'Diversificación por Clase de Activo y Geografía',
            body:
              'Equilibrar exposición entre renta variable brasileña, mercados desarrollados de EE. UU. y Europa, divisas fuertes y activos digitales ayuda a reducir la concentración de riesgo en un único ciclo económico. Las barras de asignación muestran el peso de cada categoría para detectar desbalances antes de realizar nuevos aportes.',
          },
          {
            id: 'local-privacy',
            title: 'Privacidad y Almacenamiento Local sin Registro',
            body:
              'Todas las simulaciones, cantidades y precios promedio ingresados se guardan localmente en tu propio navegador, sin registro de cuenta, solicitud de contraseñas ni envío de datos patrimoniales personales a servidores externos, garantizando privacidad absoluta en cada sesión.',
          },
        ],
      },
      faq: {
        eyebrow: 'Preguntas Frecuentes',
        title: 'Preguntas Frecuentes sobre el Gestor de Carteras',
        items: [
          {
            question: '¿Cómo afecta el tipo de cambio en tiempo real al patrimonio convertido en EUR y USD?',
            answer:
              'El panel valora cada posición según las cotizaciones vigentes del Dólar y del Euro y expresa el patrimonio consolidado en BRL, EUR y USD. Incluso si tus acciones en B3 permanecen estables en reales, las variaciones cambiarias actualizan de inmediato su equivalente en Euros y Dólares.',
          },
          {
            question: '¿Qué diferencia hay entre rentabilidad nominal en reales y rentabilidad en dólares o euros?',
            answer:
              'La rentabilidad nominal en reales mide la ganancia exclusivamente en moneda brasileña, sin descontar eventuales depreciaciones cambiarias. En cambio, medir el retorno en dólares o euros muestra si la cartera realmente creció frente a divisas internacionales de referencia.',
          },
          {
            question: '¿Cómo registrar múltiples compras del mismo activo para seguir el precio promedio?',
            answer:
              'Puedes sumar la cantidad total e ingresar el precio promedio ponderado de tus compras en una posición única, o cargar lotes separados mediante el botón "Nueva Posición" para observar el aporte individual de cada entrada.',
          },
          {
            question: '¿Las métricas y gráficos del gestor constituyen asesoría o recomendación financiera?',
            answer:
              'No. El Gestor de Carteras Globales es una herramienta exclusivamente educativa y de simulación patrimonial orientada al análisis de asignación multidivisa y seguimiento informativo de cotizaciones, sin constituir recomendación de inversión.',
          },
        ],
      },
    },
    news: {
      title: 'Noticias & Escenario Político-Financiero',
      liveBadge: 'Editorial DinhEuro',
      subtitle:
        'DinhEuro publica análisis macroeconómicos originales elaborados por nuestra redacción a partir de datos públicos del Banco Central de Brasil, MDIC, el Banco Central Europeo (BCE) e informes institucionales de mercado, conectando política monetaria, comercio exterior y divisas.',
      searchPlaceholder: 'Buscar por tema, institución o palabra clave...',
      refreshTitle: 'Sincronizar cotizaciones y análisis',
      allNews: 'Todos los Análisis',
      catMacroFx: 'Macro & Divisas',
      catCentralBanks: 'Bancos Centrales',
      catPolicyFiscal: 'Política & Comercio',
      catMarketsB3: 'Mercados & B3',
      catDigitalInfra: 'Real Digital & Drex',
      showingPrefix: 'Mostrando',
      showingSuffix: 'análisis originales en orden cronológico (más recientes primero)',
      clearSearch: 'Limpiar filtro de búsqueda',
      emptyTitle: 'No se encontraron análisis para este filtro',
      emptyDesc:
        'Modifica los términos de búsqueda o cambia la categoría temática para consultar todas las publicaciones editoriales disponibles.',
      editorialCriteria: {
        eyebrow: 'Transparencia Metodológica',
        title: 'Criterios Editoriales y Fuentes de Referencia',
        intro:
          'Cada estudio publicado en esta sección es redactado originalmente por la Redacción DinhEuro con foco en el impacto práctico sobre los tipos de cambio EUR/BRL y USD/BRL, el comercio exterior y la dinámica de los mercados globales y B3.',
        points: [
          {
            title: 'Fuentes Institucionales Primarias',
            body:
              'Los artículos se apoyan en estadísticas oficiales, actas y notas técnicas divulgadas por el Banco Central de Brasil (Copom, Boletín Focus y Agenda BC#), el Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC/SECEX), el Banco Central Europeo (BCE), la Comisión Europea, B3, Aladi e informes sectoriales de referencia.',
          },
          {
            title: 'Enfoque Analítico y Transmisión Cambiaria',
            body:
              'En lugar de reproducir cables externos o titulares aislados, cada texto explica mecanismos de transmisión económica —cómo diferenciales de tasas, balanzas comerciales, aranceles y flujos de capital inciden en precios y poder adquisitivo.',
          },
          {
            title: 'Finalidad Educativa e Informativa',
            body:
              'Todo el contenido tiene carácter estrictamente informativo y educativo, pensado para estudiantes, operadores de comercio exterior, viajeros e inversores que buscan comprender la coyuntura macroeconómica con acceso abierto.',
          },
          {
            title: 'Ausencia de Recomendaciones de Inversión',
            body:
              'Los análisis de DinhEuro no constituyen asesoría financiera personalizada, recomendación de compra o venta de activos ni oferta de productos regulados. Cada lector asume sus propias decisiones patrimoniales.',
          },
        ],
        disclaimer:
          'Contenido editorial original • Acceso libre y gratuito • Consulta siempre las publicaciones primarias de los organismos oficiales citados en cada análisis.',
      },
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
