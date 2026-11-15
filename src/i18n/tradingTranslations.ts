import type { SupportedLanguage } from './translations';

export interface FutureContractOverride {
  name: string;
  market: string;
  tickValue: string;
  marginReq: string;
  maturity: string;
  volume: string;
}

export interface FixedIncomeAssetOverride {
  name: string;
  category: string;
  issuer: string;
  rateDescription: string;
  maturity: string;
  irTax: string;
  guarantee: string;
}

export interface FixedIncomeUiTranslations {
  bannerTitle: string;
  bannerBadge: string;
  bannerSubtitle: string;
  tabOptions: string;
  tabFutures: string;
  tabFixedIncome: string;
  optionsParamsTitle: string;
  contractTypeLabel: string;
  callBtn: string;
  putBtn: string;
  spotPriceLabel: string;
  strikePriceLabel: string;
  daysToExpiryLabel: string;
  daysUnit: string;
  impliedVolLabel: string;
  perYearUnit: string;
  riskFreeRateLabel: string;
  theoreticalCallTitle: string;
  theoreticalPutTitle: string;
  itmLabel: string;
  otmLabel: string;
  callDesc: string;
  putDesc: string;
  greeksTitle: string;
  realTimeTag: string;
  deltaDesc: string;
  gammaDesc: string;
  thetaDesc: string;
  vegaDesc: string;
  rhoDesc: string;
  payoffTitle: string;
  strategies: {
    BUY_CALL: string;
    BUY_PUT: string;
    BULL_CALL_SPREAD: string;
    STRADDLE: string;
  };
  breakevenText: string;
  minPriceLabel: string;
  strikeLabel: string;
  maxPriceLabel: string;
  futuresTitle: string;
  futuresSubtitle: string;
  tickValueLabel: string;
  recommendedMarginLabel: string;
  maturityLabel: string;
  volume24hLabel: string;
  simTitle: string;
  initialDepositLabel: string;
  termMonthsLabel: string;
  selicCdiRefLabel: string;
  cdiCardTitle: string;
  netProfitLabel: string;
  irWithheldLabel: string;
  lciCardTitle: string;
  incomeTaxLabel: string;
  exemptZeroLabel: string;
  poupancaCardTitle: string;
  profitLabel: string;
  dinheuroDiffLabel: string;
  losesPrefix: string;
  catalogTitle: string;
  catalogSubtitle: string;
  colTitleAsset: string;
  colIssuer: string;
  colYield: string;
  colMaturity: string;
  colMinimum: string;
  colTaxation: string;
  colGuarantee: string;
  futuresOverrides: Record<string, FutureContractOverride>;
  fixedIncomeOverrides: Record<string, FixedIncomeAssetOverride>;
}

export interface TapeAssetOverride {
  name: string;
  type: string;
}

export interface TapeReadingUiTranslations {
  selectAssetAria: string;
  lotsUnit: string;
  buyLetter: string;
  sellLetter: string;
  pauseBtn: string;
  playBtn: string;
  allFilter: string;
  filterBrokerAria: string;
  allBrokersOption: string;
  buyLimitSent: string;
  sellLimitSent: string;
  sentAtWord: string;
  domTitle: string;
  levelsUnit: string;
  colOrd: string;
  colBid: string;
  colPrice: string;
  colAsk: string;
  buyMarketBtn: string;
  sellMarketBtn: string;
  tapeTitle: string;
  tradesCountLabel: string;
  colTime: string;
  colLot: string;
  colBuyer: string;
  colSeller: string;
  aggressorBuy: string;
  aggressorSell: string;
  bigLotLegend: string;
  playersTitle: string;
  institutionalTag: string;
  colBroker: string;
  colNetBalance: string;
  colVolPct: string;
  tip1Title: string;
  tip1Desc: string;
  tip2Title: string;
  tip2Desc: string;
  assetOverrides: Record<string, TapeAssetOverride>;
}

export interface DayTradeUiTranslations {
  feedGlobalLive: string;
  dollarLabel: string;
  euroLabel: string;
  paperSimulatorBadge: string;
  winfutName: string;
  wdofutName: string;
  winfutShort: string;
  wdofutShort: string;
  typeCrypto: string;
  typeForex: string;
  typeBdrs: string;
  typeStocks: string;
  typeFutures: string;
  sidebar: {
    dashboard: string;
    mercados: string;
    graficos: string;
    ordens: string;
    posicoes: string;
    carteira: string;
    analises: string;
    noticias: string;
    alertas: string;
    estrategias: string;
    simulador: string;
    configuracoes: string;
    ajuda: string;
  };
  proSealTitle: string;
  selectAssetAria: string;
  groupFuturesB3: string;
  groupStocksBr: string;
  groupWallStBdrs: string;
  groupCrypto: string;
  groupForex: string;
  groupIndicesCommodities: string;
  minShort: string;
  maxShort: string;
  volShort: string;
  tabs: {
    chart: string;
    tape: string;
    book: string;
    indicators: string;
    strategies: string;
  };
  avgPriceOverlay: string;
  tapeTabTitle: string;
  currentPriceLabel: string;
  colTime: string;
  colTradedPrice: string;
  colLotVolume: string;
  colBuyer: string;
  colSeller: string;
  lotsUnit: string;
  bookTabTitle: string;
  buyTotalLabel: string;
  sellTotalLabel: string;
  colBidQty: string;
  colOfficialPrice: string;
  colAskQty: string;
  bookClickTitlePrefix: string;
  bookClickTitleSuffix: string;
  indicatorsTabTitle: string;
  rsiLabel: string;
  rsiStatus: string;
  macdLabel: string;
  macdStatus: string;
  stochLabel: string;
  stochStatus: string;
  bollingerLabel: string;
  bollingerStatus: string;
  strategiesTabTitle: string;
  strat1Title: string;
  strat1Desc: string;
  strat2Title: string;
  strat2Desc: string;
  myPositions: string;
  closeAllShort: string;
  noOpenPositions: string;
  noOpenPositionsMobile: string;
  colAsset: string;
  colSide: string;
  colQty: string;
  colEntry: string;
  colCurrent: string;
  colAction: string;
  sideBuy: string;
  sideSell: string;
  flattenBtn: string;
  dayPerformance: string;
  winRateLabel: string;
  netResultLabel: string;
  dayReturnLabel: string;
  tradesWord: string;
  totalWord: string;
  marketNewsTitle: string;
  realTimeTag: string;
  realTimeMarketTitle: string;
  assetsCountSuffix: string;
  categories: {
    all: string;
    stocks: string;
    futures: string;
    forex: string;
    crypto: string;
    bdrs: string;
  };
  searchAssetPlaceholder: string;
  filterAssetsMobilePlaceholder: string;
  quickTicketTitle: string;
  ticketBuyTab: string;
  ticketSellTab: string;
  marketOrderBtn: string;
  limitOrderBtn: string;
  contractsQtyLabel: string;
  limitPriceLabel: string;
  buyActionVerb: string;
  sellActionVerb: string;
  flattenAllBtn: string;
  reverseBtn: string;
  mobileTabs: {
    ticket: string;
    market: string;
    bookDom: string;
    tape: string;
    positions: string;
  };
  expandPanelTitle: string;
  collapsePanelTitle: string;
  priceShort: string;
  bidMobile: string;
  askMobile: string;
  liveFlowTag: string;
  aggressorCol: string;
  entryShort: string;
  currentShort: string;
  closePositionMobile: string;
  connectionStable: string;
  feedFooter: string;
  latencyFooter: string;
  e2eEncryption: string;
  lgpdAudited: string;
  riskModalTitle: string;
  gainGoalLabel: string;
  dailyStopLossLabel: string;
  riskLockTriggered: string;
  unlockBtn: string;
  saveParamsBtn: string;
  alertModalTitle: string;
  alertModalDescPrefix: string;
  alertModalDescSuffix: string;
  createAlertBtn: string;
  helpModalTitle: string;
  shortcutBuyMarket: string;
  shortcutSellMarket: string;
  shortcutFlattenNow: string;
  shortcutSpaceEsc: string;
  shortcutReverse: string;
  closeBtn: string;
  notifications: {
    riskLockedError: string;
    riskLimitAutoClose: string;
    orderExecutedPrefix: string;
    orderExecutedMiddle: string;
    orderExecutedAt: string;
    positionClosedPrefix: string;
    positionClosedResult: string;
    allClosedPrefix: string;
    reverseExecutedPrefix: string;
    boughtState: string;
    soldState: string;
    inWord: string;
    simulatorReset: string;
    alertConfiguredPrefix: string;
    alertConfiguredSuffix: string;
  };
}

export interface TradingTranslations {
  fixedIncome: FixedIncomeUiTranslations;
  tapeReading: TapeReadingUiTranslations;
  dayTrade: DayTradeUiTranslations;
}

export const TRADING_TRANSLATIONS: Record<SupportedLanguage, TradingTranslations> = {
  pt: {
    fixedIncome: {
      bannerTitle: 'Renda Fixa & Derivativos Globais',
      bannerBadge: 'B3 & Chicago',
      bannerSubtitle:
        'Análise completa de contratos futuros, precificação de opções com o modelo Black-Scholes, sensibilidade das Gregas e títulos soberanos de renda fixa.',
      tabOptions: 'Calculadora de Opções',
      tabFutures: 'Contratos Futuros',
      tabFixedIncome: 'Títulos & Tesouro',
      optionsParamsTitle: 'Parâmetros da Opção',
      contractTypeLabel: 'Tipo de Contrato',
      callBtn: 'CALL (Compra)',
      putBtn: 'PUT (Venda)',
      spotPriceLabel: 'Preço Spot do Ativo (S)',
      strikePriceLabel: 'Preço de Exercício / Strike (K)',
      daysToExpiryLabel: 'Dias Corridos até o Vencimento',
      daysUnit: 'dias',
      impliedVolLabel: 'Volatilidade Implícita (IV)',
      perYearUnit: '% a.a.',
      riskFreeRateLabel: 'Taxa Livre de Risco (Selic)',
      theoreticalCallTitle: 'Preço Teórico CALL',
      theoreticalPutTitle: 'Preço Teórico PUT',
      itmLabel: 'ITM (No Dinheiro)',
      otmLabel: 'OTM (Fora)',
      callDesc: 'Prêmio justo estimado pelo modelo matemático para o direito de compra.',
      putDesc: 'Prêmio justo estimado pelo modelo matemático para o direito de venda.',
      greeksTitle: 'Sensibilidade das Gregas (Greeks)',
      realTimeTag: 'Tempo Real',
      deltaDesc: 'Variação por R$ 1 no ativo',
      gammaDesc: 'Aceleração do Delta',
      thetaDesc: 'Perda por dia útil (Decaimento)',
      vegaDesc: 'Sensibilidade por 1% IV',
      rhoDesc: 'Sensibilidade à Selic',
      payoffTitle: 'Gráfico de Payoff no Vencimento (P&L)',
      strategies: {
        BUY_CALL: 'Compra Call',
        BUY_PUT: 'Compra Put',
        BULL_CALL_SPREAD: 'Trava de Alta',
        STRADDLE: 'Straddle',
      },
      breakevenText: 'Breakeven (R$ 0,00)',
      minPriceLabel: 'Preço Mín:',
      strikeLabel: 'Strike:',
      maxPriceLabel: 'Preço Máx:',
      futuresTitle: 'Contratos Futuros de Referência (B3 & Bolsas Globais)',
      futuresSubtitle: 'Margem e Liquidação Financeira',
      tickValueLabel: 'Valor do Ponto:',
      recommendedMarginLabel: 'Margem Recomendada:',
      maturityLabel: 'Vencimento:',
      volume24hLabel: 'Volume 24h:',
      simTitle: 'Simulador Comparativo de Rentabilidade Líquida',
      initialDepositLabel: 'Aporte Inicial (R$)',
      termMonthsLabel: 'Prazo da Aplicação (Meses)',
      selicCdiRefLabel: 'Taxa Selic / CDI Referência (% a.a.)',
      cdiCardTitle: 'Tesouro Selic / CDB 100% CDI',
      netProfitLabel: 'Lucro Líquido:',
      irWithheldLabel: 'Alíquota IR Retido:',
      lciCardTitle: 'LCI / LCA (95% CDI - Isento de IR)',
      incomeTaxLabel: 'Imposto de Renda:',
      exemptZeroLabel: 'ISENTO (0%)',
      poupancaCardTitle: 'Poupança Tradicional',
      profitLabel: 'Lucro:',
      dinheuroDiffLabel: 'Diferencial DinhEuro:',
      losesPrefix: 'Perde',
      catalogTitle: 'Catálogo de Títulos Soberanos & Privados',
      catalogSubtitle: 'Tesouro Direto & Bancários',
      colTitleAsset: 'Título / Ativo',
      colIssuer: 'Emissor',
      colYield: 'Rentabilidade',
      colMaturity: 'Vencimento',
      colMinimum: 'Mínimo',
      colTaxation: 'Tributação',
      colGuarantee: 'Garantia',
      futuresOverrides: {
        WINQ26: {
          name: 'Mini Índice B3',
          market: 'B3 Brasil',
          tickValue: 'R$ 1,00 a cada 5 pts',
          marginReq: 'R$ 100,00 / contrato (Day Trade)',
          maturity: 'Ago / 2026',
          volume: 'R$ 84,2 Bi',
        },
        WDOQ26: {
          name: 'Mini Dólar B3',
          market: 'B3 Brasil',
          tickValue: 'R$ 5,00 a cada 0,5 pt',
          marginReq: 'R$ 150,00 / contrato (Day Trade)',
          maturity: 'Ago / 2026',
          volume: 'R$ 42,9 Bi',
        },
        DI1F27: {
          name: 'Juros Futuros B3 (DI 2027)',
          market: 'B3 Brasil',
          tickValue: 'R$ 100.000 PU base',
          marginReq: 'R$ 1.200 / contrato',
          maturity: 'Jan / 2027',
          volume: 'R$ 18,5 Bi',
        },
        DI1F29: {
          name: 'Juros Futuros B3 (DI 2029)',
          market: 'B3 Brasil',
          tickValue: 'R$ 100.000 PU base',
          marginReq: 'R$ 1.500 / contrato',
          maturity: 'Jan / 2029',
          volume: 'R$ 12,1 Bi',
        },
        'ES1!': {
          name: 'S&P 500 E-mini Futuro',
          market: 'CME Chicago',
          tickValue: '$ 12,50 a cada 0,25 pt',
          marginReq: '$ 500 (Intraday)',
          maturity: 'Set / 2026',
          volume: '$ 120 Bi',
        },
        'CL1!': {
          name: 'Petróleo WTI Futuro',
          market: 'NYMEX',
          tickValue: '$ 10,00 a cada 0,01',
          marginReq: '$ 1.000 (Intraday)',
          maturity: 'Jul / 2026',
          volume: '$ 35 Bi',
        },
      },
      fixedIncomeOverrides: {
        'tesouro-selic-2029': {
          name: 'Tesouro Selic 2029',
          category: 'Tesouro',
          issuer: 'Tesouro Nacional',
          rateDescription: 'Selic + 0,14% a.a.',
          maturity: '01/03/2029',
          irTax: 'Tabela Regressiva (22,5% a 15%)',
          guarantee: '100% Risco Soberano',
        },
        'tesouro-ipca-2035': {
          name: 'Tesouro IPCA+ 2035',
          category: 'Tesouro',
          issuer: 'Tesouro Nacional',
          rateDescription: 'IPCA + 6,45% a.a.',
          maturity: '15/05/2035',
          irTax: 'Tabela Regressiva (22,5% a 15%)',
          guarantee: '100% Risco Soberano',
        },
        'tesouro-prefixado-2027': {
          name: 'Tesouro Prefixado 2027',
          category: 'Tesouro',
          issuer: 'Tesouro Nacional',
          rateDescription: '12,25% a.a. fixo',
          maturity: '01/01/2027',
          irTax: 'Tabela Regressiva (22,5% a 15%)',
          guarantee: '100% Risco Soberano',
        },
        'cdb-banco-120': {
          name: 'CDB Liquidez Diária 110% CDI',
          category: 'CDB',
          issuer: 'Banco Múltiplo Institucional',
          rateDescription: '110% do CDI (~13,47% a.a.)',
          maturity: 'Liquidez Diária / 2027',
          irTax: 'Tabela Regressiva (22,5% a 15%)',
          guarantee: 'FGC até R$ 250 mil',
        },
        'lca-agronegocio': {
          name: 'LCA Agronegócio 93% CDI (Isento)',
          category: 'LCI/LCA',
          issuer: 'Banco do Brasil / Cooperativas',
          rateDescription: '93% do CDI (Equiv. a 112% CDI)',
          maturity: '24 meses',
          irTax: 'ISENTO de Imposto de Renda',
          guarantee: 'FGC até R$ 250 mil',
        },
        'debenture-infra': {
          name: 'Debênture Incentivada de Energia',
          category: 'Debênture',
          issuer: 'Concessionária de Infraestrutura',
          rateDescription: 'IPCA + 7,20% a.a. Isento',
          maturity: '15/10/2031',
          irTax: 'ISENTO de Imposto de Renda (Lei 12.431)',
          guarantee: 'Garantia Real da Concessão',
        },
      },
    },
    tapeReading: {
      selectAssetAria: 'Selecionar ativo para Tape Reading',
      lotsUnit: 'lotes',
      buyLetter: 'C',
      sellLetter: 'V',
      pauseBtn: 'Pausar',
      playBtn: 'Play',
      allFilter: 'Todos',
      filterBrokerAria: 'Filtrar corretora',
      allBrokersOption: 'Todas Corretoras',
      buyLimitSent: 'Ordem Compra Limitada',
      sellLimitSent: 'Ordem Venda Limitada',
      sentAtWord: 'enviada em',
      domTitle: 'Book de Profundidade (DOM)',
      levelsUnit: 'Níveis',
      colOrd: 'Ord',
      colBid: 'Bid (Compra)',
      colPrice: 'Preço',
      colAsk: 'Ask (Venda)',
      buyMarketBtn: 'Comprar Mercado',
      sellMarketBtn: 'Vender Mercado',
      tapeTitle: 'Times & Trades (Fita)',
      tradesCountLabel: 'Negócios',
      colTime: 'Hora',
      colLot: 'Lote',
      colBuyer: 'Comprador',
      colSeller: 'Vendedor',
      aggressorBuy: 'Agressor Compra',
      aggressorSell: 'Agressor Venda',
      bigLotLegend: 'Lote Big',
      playersTitle: 'Saldo de Players',
      institutionalTag: 'Institucional',
      colBroker: 'Corretora',
      colNetBalance: 'Saldo Líq',
      colVolPct: 'Vol %',
      tip1Title: 'Absorção Institucional:',
      tip1Desc: 'Grandes ordens passivas sustentam níveis de preço mesmo sob forte agressão contrária.',
      tip2Title: 'Delta & Exaustão (CVD):',
      tip2Desc: 'Divergência entre nova máxima do preço e queda do CVD antecipa exaustão compradora.',
      assetOverrides: {
        'WIN$': { name: 'Mini Índice B3 (Futuro)', type: 'Futuros B3' },
        'WDO$': { name: 'Mini Dólar B3 (Futuro)', type: 'Futuros B3' },
        PETR4: { name: 'Petrobras PN', type: 'Ação B3' },
        VALE3: { name: 'Vale ON', type: 'Ação B3' },
        'BTC/USD': { name: 'Bitcoin Perpétuo', type: 'Cripto' },
        'ETH/USD': { name: 'Ethereum Perpétuo', type: 'Cripto' },
      },
    },
    dayTrade: {
      feedGlobalLive: 'Feed Global Ao Vivo:',
      dollarLabel: 'DÓLAR',
      euroLabel: 'EURO',
      paperSimulatorBadge: 'Simulador Paper',
      winfutName: 'Mini Índice B3 Futuro',
      wdofutName: 'Mini Dólar B3 Futuro',
      winfutShort: 'Mini Índice B3',
      wdofutShort: 'Mini Dólar B3',
      typeCrypto: 'Cripto',
      typeForex: 'Forex',
      typeBdrs: 'BDRs',
      typeStocks: 'Ações',
      typeFutures: 'Futuros',
      sidebar: {
        dashboard: 'Início',
        mercados: 'Mercados',
        graficos: 'Gráficos Avançados',
        ordens: 'Ordens & Boleta',
        posicoes: 'Minhas Posições',
        carteira: 'Carteira',
        analises: 'Análises & Diagnóstico',
        noticias: 'Notícias do Mercado',
        alertas: 'Alertas de Preço',
        estrategias: 'Estratégias Scalping',
        simulador: 'Resetar Simulador',
        configuracoes: 'Gestão de Risco',
        ajuda: 'Ajuda & Teclas de Atalho',
      },
      proSealTitle: 'DinhEuro Pro Terminal • Conectividade B3',
      selectAssetAria: 'Selecionar ativo para Day Trade',
      groupFuturesB3: 'Futuros B3',
      groupStocksBr: 'Ações Brasil (B3)',
      groupWallStBdrs: 'Wall Street & BDRs',
      groupCrypto: 'Criptoativos',
      groupForex: 'Câmbio & Moedas',
      groupIndicesCommodities: 'Índices Globais & Commodities',
      minShort: 'Mín:',
      maxShort: 'Máx:',
      volShort: 'Vol:',
      tabs: {
        chart: 'Gráfico',
        tape: 'Tape Reading',
        book: 'Book de Ofertas',
        indicators: 'Indicadores',
        strategies: 'Estratégias',
      },
      avgPriceOverlay: 'Preço Médio',
      tapeTabTitle: 'Fita de Negócios Contínua (Times & Trades)',
      currentPriceLabel: 'Preço Atual:',
      colTime: 'Horário',
      colTradedPrice: 'Preço Negociado',
      colLotVolume: 'Volume Lotes',
      colBuyer: 'Comprador',
      colSeller: 'Vendedor',
      lotsUnit: 'lotes',
      bookTabTitle: 'Livro de Ofertas Vertical (DOM Ladder)',
      buyTotalLabel: 'Compra:',
      sellTotalLabel: 'Venda:',
      colBidQty: 'Qtd Compra (Bid)',
      colOfficialPrice: 'Preço Oficial',
      colAskQty: 'Qtd Venda (Ask)',
      bookClickTitlePrefix: 'Clique para carregar preço limite',
      bookClickTitleSuffix: 'na boleta',
      indicatorsTabTitle: 'Diagnóstico Técnico Automatizado',
      rsiLabel: 'IFR / RSI (14)',
      rsiStatus: '56.4 (Neutro-Alta)',
      macdLabel: 'MACD (12, 26, 9)',
      macdStatus: '+142.0 (Compra)',
      stochLabel: 'Estocástico Lento',
      stochStatus: '68.2 (Sobrecompra)',
      bollingerLabel: 'Bandas de Bollinger',
      bollingerStatus: 'Dentro da Banda',
      strategiesTabTitle: 'Estratégias de Scalping e Rompimento',
      strat1Title: '1. Pullback na VWAP',
      strat1Desc: 'Entrada na retração após toque e rejeição da linha média ponderada com confirmação de fluxo comprador.',
      strat2Title: '2. Cruzamento 9 x 21',
      strat2Desc: 'Gatilho de compra quando a MA 9 cruza para cima da MA 21 com candle fechado acima do patamar.',
      myPositions: 'Minhas Posições',
      closeAllShort: 'Zerar Todas',
      noOpenPositions: 'Nenhuma posição aberta no momento.',
      noOpenPositionsMobile: 'Nenhuma posição aberta no momento. Utilize a Boleta para abrir novas ordens.',
      colAsset: 'Ativo',
      colSide: 'Lado',
      colQty: 'Qtd',
      colEntry: 'Entrada',
      colCurrent: 'Atual',
      colAction: 'Ação',
      sideBuy: 'COMPRA',
      sideSell: 'VENDA',
      flattenBtn: 'Zerar',
      dayPerformance: 'Performance do Dia',
      winRateLabel: 'Acerto',
      netResultLabel: 'Resultado Líquido:',
      dayReturnLabel: 'Rentabilidade Dia:',
      tradesWord: 'Trades:',
      totalWord: 'Total:',
      marketNewsTitle: 'Notícias do Mercado',
      realTimeTag: 'Tempo Real',
      realTimeMarketTitle: 'Mercado em Tempo Real',
      assetsCountSuffix: 'Ativos',
      categories: {
        all: 'Todos',
        stocks: 'Ações',
        futures: 'Futuros',
        forex: 'Forex',
        crypto: 'Cripto',
        bdrs: 'BDRs',
      },
      searchAssetPlaceholder: 'Buscar ativo...',
      filterAssetsMobilePlaceholder: 'Filtrar ativos para operar...',
      quickTicketTitle: 'Boleta de Execução Rápida',
      ticketBuyTab: 'COMPRA',
      ticketSellTab: 'VENDA',
      marketOrderBtn: 'A Mercado',
      limitOrderBtn: 'Ordem Limitada',
      contractsQtyLabel: 'Quantidade de Contratos:',
      limitPriceLabel: 'Preço Limite:',
      buyActionVerb: 'COMPRAR',
      sellActionVerb: 'VENDER',
      flattenAllBtn: 'ZERAR TUDO',
      reverseBtn: 'Inverter',
      mobileTabs: {
        ticket: 'Boleta',
        market: 'Mercado',
        bookDom: 'Book DOM',
        tape: 'Tape',
        positions: 'Posições',
      },
      expandPanelTitle: 'Expandir painel de operações',
      collapsePanelTitle: 'Recolher painel de operações',
      priceShort: 'Preço:',
      bidMobile: 'Compra (Bid)',
      askMobile: 'Venda (Ask)',
      liveFlowTag: 'Fluxo em tempo real',
      aggressorCol: 'Agressor',
      entryShort: 'Entrada:',
      currentShort: 'Atual:',
      closePositionMobile: 'Fechar',
      connectionStable: 'Conexão: Estável',
      feedFooter: 'B3 Direct Market Feed • Liquidez Ativa',
      latencyFooter: 'Latência: 12ms • Servidor SP-01',
      e2eEncryption: 'Criptografia Ponta a Ponta',
      lgpdAudited: 'LGPD Auditado',
      riskModalTitle: 'Gerenciador de Risco Diário',
      gainGoalLabel: 'Meta Diária de Ganho (Gain Goal R$):',
      dailyStopLossLabel: 'Limite Diário de Perda (Daily Stop Loss R$):',
      riskLockTriggered: 'Trava de risco acionada!',
      unlockBtn: 'Desbloquear',
      saveParamsBtn: 'Salvar Parâmetros',
      alertModalTitle: 'Novo Alerta de Preço',
      alertModalDescPrefix: 'Receba notificações instantâneas quando o ativo',
      alertModalDescSuffix: 'atingir seu patamar:',
      createAlertBtn: 'Criar Alerta',
      helpModalTitle: 'Atalhos de Teclado do Terminal',
      shortcutBuyMarket: 'Comprar a Mercado',
      shortcutSellMarket: 'Vender a Mercado',
      shortcutFlattenNow: 'Zerar Posição Imediata',
      shortcutSpaceEsc: 'Espaço / Esc',
      shortcutReverse: 'Inverter Posição',
      closeBtn: 'Fechar',
      notifications: {
        riskLockedError: '❌ Trava de risco ativa! Limite de perda diário atingido.',
        riskLimitAutoClose: 'Limite diário de perda atingido! Trava de risco institucional acionada.',
        orderExecutedPrefix: '✓ Ordem de',
        orderExecutedMiddle: 'executada:',
        orderExecutedAt: 'a',
        positionClosedPrefix: 'Posição encerrada:',
        positionClosedResult: 'com resultado de',
        allClosedPrefix: 'Todas as posições foram zeradas a mercado! P&L consolidado:',
        reverseExecutedPrefix: 'Inversão executada: Agora',
        boughtState: 'COMPRADO',
        soldState: 'VENDIDO',
        inWord: 'em',
        simulatorReset: 'Simulador reiniciado com sucesso! Saldo restaurado para R$ 100.000,00.',
        alertConfiguredPrefix: 'Alerta configurado para',
        alertConfiguredSuffix: 'no patamar especificado!',
      },
    },
  },
  en: {
    fixedIncome: {
      bannerTitle: 'Fixed Income & Global Derivatives',
      bannerBadge: 'B3 & Chicago',
      bannerSubtitle:
        'Full analysis of futures contracts, options pricing via the Black-Scholes model, Greeks sensitivity, and sovereign fixed income bonds.',
      tabOptions: 'Options Calculator',
      tabFutures: 'Futures Contracts',
      tabFixedIncome: 'Bonds & Treasury',
      optionsParamsTitle: 'Option Parameters',
      contractTypeLabel: 'Contract Type',
      callBtn: 'CALL (Buy)',
      putBtn: 'PUT (Sell)',
      spotPriceLabel: 'Asset Spot Price (S)',
      strikePriceLabel: 'Strike Price (K)',
      daysToExpiryLabel: 'Calendar Days to Expiration',
      daysUnit: 'days',
      impliedVolLabel: 'Implied Volatility (IV)',
      perYearUnit: '% p.a.',
      riskFreeRateLabel: 'Risk-Free Rate (Selic)',
      theoreticalCallTitle: 'Theoretical CALL Price',
      theoreticalPutTitle: 'Theoretical PUT Price',
      itmLabel: 'ITM (In the Money)',
      otmLabel: 'OTM (Out)',
      callDesc: 'Estimated fair premium from the mathematical model for the right to buy.',
      putDesc: 'Estimated fair premium from the mathematical model for the right to sell.',
      greeksTitle: 'Greeks Sensitivity Matrix',
      realTimeTag: 'Real Time',
      deltaDesc: 'Change per R$ 1 asset move',
      gammaDesc: 'Delta acceleration',
      thetaDesc: 'Daily time decay loss',
      vegaDesc: 'Sensitivity per 1% IV',
      rhoDesc: 'Sensitivity to Selic rate',
      payoffTitle: 'Expiration Payoff Chart (P&L)',
      strategies: {
        BUY_CALL: 'Long Call',
        BUY_PUT: 'Long Put',
        BULL_CALL_SPREAD: 'Bull Call Spread',
        STRADDLE: 'Straddle',
      },
      breakevenText: 'Breakeven (R$ 0.00)',
      minPriceLabel: 'Min Price:',
      strikeLabel: 'Strike:',
      maxPriceLabel: 'Max Price:',
      futuresTitle: 'Benchmark Futures Contracts (B3 & Global Exchanges)',
      futuresSubtitle: 'Margin & Financial Settlement',
      tickValueLabel: 'Point Value:',
      recommendedMarginLabel: 'Recommended Margin:',
      maturityLabel: 'Expiration:',
      volume24hLabel: '24h Volume:',
      simTitle: 'Net Return Comparative Simulator',
      initialDepositLabel: 'Initial Investment (R$)',
      termMonthsLabel: 'Investment Horizon (Months)',
      selicCdiRefLabel: 'Reference Selic / CDI Rate (% p.a.)',
      cdiCardTitle: 'Tesouro Selic / CDB 100% CDI',
      netProfitLabel: 'Net Profit:',
      irWithheldLabel: 'Withheld Tax Rate:',
      lciCardTitle: 'LCI / LCA (95% CDI - Tax-Exempt)',
      incomeTaxLabel: 'Income Tax:',
      exemptZeroLabel: 'EXEMPT (0%)',
      poupancaCardTitle: 'Traditional Savings (Poupança)',
      profitLabel: 'Profit:',
      dinheuroDiffLabel: 'DinhEuro Spread:',
      losesPrefix: 'Loses',
      catalogTitle: 'Sovereign & Private Fixed Income Catalog',
      catalogSubtitle: 'Tesouro Direto & Bank Bonds',
      colTitleAsset: 'Bond / Asset',
      colIssuer: 'Issuer',
      colYield: 'Yield',
      colMaturity: 'Maturity',
      colMinimum: 'Minimum',
      colTaxation: 'Taxation',
      colGuarantee: 'Guarantee',
      futuresOverrides: {
        WINQ26: {
          name: 'B3 Mini Ibovespa Index',
          market: 'B3 Brazil',
          tickValue: 'R$ 1.00 per 5 pts',
          marginReq: 'R$ 100.00 / contract (Day Trade)',
          maturity: 'Aug / 2026',
          volume: 'R$ 84.2 Bn',
        },
        WDOQ26: {
          name: 'B3 Mini US Dollar',
          market: 'B3 Brazil',
          tickValue: 'R$ 5.00 per 0.5 pt',
          marginReq: 'R$ 150.00 / contract (Day Trade)',
          maturity: 'Aug / 2026',
          volume: 'R$ 42.9 Bn',
        },
        DI1F27: {
          name: 'B3 Interest Rate Futures (DI 2027)',
          market: 'B3 Brazil',
          tickValue: 'R$ 100,000 unit base',
          marginReq: 'R$ 1,200 / contract',
          maturity: 'Jan / 2027',
          volume: 'R$ 18.5 Bn',
        },
        DI1F29: {
          name: 'B3 Interest Rate Futures (DI 2029)',
          market: 'B3 Brazil',
          tickValue: 'R$ 100,000 unit base',
          marginReq: 'R$ 1,500 / contract',
          maturity: 'Jan / 2029',
          volume: 'R$ 12.1 Bn',
        },
        'ES1!': {
          name: 'S&P 500 E-mini Futures',
          market: 'CME Chicago',
          tickValue: '$ 12.50 per 0.25 pt',
          marginReq: '$ 500 (Intraday)',
          maturity: 'Sep / 2026',
          volume: '$ 120 Bn',
        },
        'CL1!': {
          name: 'WTI Crude Oil Futures',
          market: 'NYMEX',
          tickValue: '$ 10.00 per 0.01',
          marginReq: '$ 1,000 (Intraday)',
          maturity: 'Jul / 2026',
          volume: '$ 35 Bn',
        },
      },
      fixedIncomeOverrides: {
        'tesouro-selic-2029': {
          name: 'Tesouro Selic 2029',
          category: 'Treasury',
          issuer: 'Brazilian National Treasury',
          rateDescription: 'Selic + 0.14% p.a.',
          maturity: '2029-03-01',
          irTax: 'Regressive Tax Table (22.5% to 15%)',
          guarantee: '100% Sovereign Backing',
        },
        'tesouro-ipca-2035': {
          name: 'Tesouro IPCA+ 2035',
          category: 'Treasury',
          issuer: 'Brazilian National Treasury',
          rateDescription: 'IPCA + 6.45% p.a.',
          maturity: '2035-05-15',
          irTax: 'Regressive Tax Table (22.5% to 15%)',
          guarantee: '100% Sovereign Backing',
        },
        'tesouro-prefixado-2027': {
          name: 'Tesouro Prefixado 2027',
          category: 'Treasury',
          issuer: 'Brazilian National Treasury',
          rateDescription: '12.25% p.a. fixed',
          maturity: '2027-01-01',
          irTax: 'Regressive Tax Table (22.5% to 15%)',
          guarantee: '100% Sovereign Backing',
        },
        'cdb-banco-120': {
          name: 'Daily Liquidity CDB 110% CDI',
          category: 'CDB',
          issuer: 'Institutional Commercial Bank',
          rateDescription: '110% of CDI (~13.47% p.a.)',
          maturity: 'Daily Liquidity / 2027',
          irTax: 'Regressive Tax Table (22.5% to 15%)',
          guarantee: 'FGC up to R$ 250k',
        },
        'lca-agronegocio': {
          name: 'Agribusiness LCA 93% CDI (Tax-Free)',
          category: 'LCI/LCA',
          issuer: 'Banco do Brasil / Credit Unions',
          rateDescription: '93% of CDI (Equiv. to 112% CDI)',
          maturity: '24 months',
          irTax: 'EXEMPT from Income Tax',
          guarantee: 'FGC up to R$ 250k',
        },
        'debenture-infra': {
          name: 'Tax-Incentivized Energy Debenture',
          category: 'Debenture',
          issuer: 'Infrastructure Utility Concession',
          rateDescription: 'IPCA + 7.20% p.a. Tax-Free',
          maturity: '2031-10-15',
          irTax: 'EXEMPT from Income Tax (Law 12,431)',
          guarantee: 'Senior Concession Collateral',
        },
      },
    },
    tapeReading: {
      selectAssetAria: 'Select asset for Tape Reading',
      lotsUnit: 'lots',
      buyLetter: 'B',
      sellLetter: 'S',
      pauseBtn: 'Pause',
      playBtn: 'Play',
      allFilter: 'All',
      filterBrokerAria: 'Filter broker',
      allBrokersOption: 'All Brokers',
      buyLimitSent: 'Limit Buy Order',
      sellLimitSent: 'Limit Sell Order',
      sentAtWord: 'sent at',
      domTitle: 'Depth of Market (DOM)',
      levelsUnit: 'Levels',
      colOrd: 'Ord',
      colBid: 'Bid (Buy)',
      colPrice: 'Price',
      colAsk: 'Ask (Sell)',
      buyMarketBtn: 'Buy Market',
      sellMarketBtn: 'Sell Market',
      tapeTitle: 'Times & Trades (Tape)',
      tradesCountLabel: 'Trades',
      colTime: 'Time',
      colLot: 'Lot',
      colBuyer: 'Buyer',
      colSeller: 'Seller',
      aggressorBuy: 'Buy Aggressor',
      aggressorSell: 'Sell Aggressor',
      bigLotLegend: 'Big Lot',
      playersTitle: 'Player Net Balance',
      institutionalTag: 'Institutional',
      colBroker: 'Broker',
      colNetBalance: 'Net Bal',
      colVolPct: 'Vol %',
      tip1Title: 'Institutional Absorption:',
      tip1Desc: 'Large passive orders defend price levels even under heavy opposing market aggression.',
      tip2Title: 'Delta & Exhaustion (CVD):',
      tip2Desc: 'Divergence between a new price high and falling CVD warns of buying exhaustion.',
      assetOverrides: {
        'WIN$': { name: 'Mini Ibovespa Index (Futures)', type: 'B3 Futures' },
        'WDO$': { name: 'Mini US Dollar B3 (Futures)', type: 'B3 Futures' },
        PETR4: { name: 'Petrobras PN', type: 'B3 Stock' },
        VALE3: { name: 'Vale ON', type: 'B3 Stock' },
        'BTC/USD': { name: 'Bitcoin Perpetual', type: 'Crypto' },
        'ETH/USD': { name: 'Ethereum Perpetual', type: 'Crypto' },
      },
    },
    dayTrade: {
      feedGlobalLive: 'Live Global Feed:',
      dollarLabel: 'USD/BRL',
      euroLabel: 'EUR/BRL',
      paperSimulatorBadge: 'Paper Simulator',
      winfutName: 'Mini Ibovespa Index Futures',
      wdofutName: 'Mini US Dollar B3 Futures',
      winfutShort: 'Mini Ibovespa B3',
      wdofutShort: 'Mini Dollar B3',
      typeCrypto: 'Crypto',
      typeForex: 'Forex',
      typeBdrs: 'US/BDRs',
      typeStocks: 'Equities',
      typeFutures: 'Futures',
      sidebar: {
        dashboard: 'Home',
        mercados: 'Markets',
        graficos: 'Advanced Charts',
        ordens: 'Orders & Ticket',
        posicoes: 'My Positions',
        carteira: 'Portfolio',
        analises: 'Technical Analysis',
        noticias: 'Market News',
        alertas: 'Price Alerts',
        estrategias: 'Scalping Strategies',
        simulador: 'Reset Simulator',
        configuracoes: 'Risk Management',
        ajuda: 'Help & Keyboard Shortcuts',
      },
      proSealTitle: 'DinhEuro Pro Terminal • B3 Connectivity',
      selectAssetAria: 'Select asset for Day Trade',
      groupFuturesB3: 'B3 Futures',
      groupStocksBr: 'Brazil Equities (B3)',
      groupWallStBdrs: 'Wall Street & BDRs',
      groupCrypto: 'Crypto Assets',
      groupForex: 'FX & Currencies',
      groupIndicesCommodities: 'Global Indices & Commodities',
      minShort: 'Low:',
      maxShort: 'High:',
      volShort: 'Vol:',
      tabs: {
        chart: 'Chart',
        tape: 'Tape Reading',
        book: 'Order Book',
        indicators: 'Indicators',
        strategies: 'Strategies',
      },
      avgPriceOverlay: 'Avg Price',
      tapeTabTitle: 'Continuous Trade Tape (Times & Trades)',
      currentPriceLabel: 'Current Price:',
      colTime: 'Time',
      colTradedPrice: 'Traded Price',
      colLotVolume: 'Lot Volume',
      colBuyer: 'Buyer',
      colSeller: 'Seller',
      lotsUnit: 'lots',
      bookTabTitle: 'Vertical Order Book (DOM Ladder)',
      buyTotalLabel: 'Bids:',
      sellTotalLabel: 'Asks:',
      colBidQty: 'Bid Qty',
      colOfficialPrice: 'Official Price',
      colAskQty: 'Ask Qty',
      bookClickTitlePrefix: 'Click to load limit price',
      bookClickTitleSuffix: 'into order ticket',
      indicatorsTabTitle: 'Automated Technical Diagnostics',
      rsiLabel: 'RSI (14)',
      rsiStatus: '56.4 (Neutral-Bullish)',
      macdLabel: 'MACD (12, 26, 9)',
      macdStatus: '+142.0 (Buy)',
      stochLabel: 'Slow Stochastic',
      stochStatus: '68.2 (Overbought)',
      bollingerLabel: 'Bollinger Bands',
      bollingerStatus: 'Inside Band',
      strategiesTabTitle: 'Scalping & Breakout Strategies',
      strat1Title: '1. VWAP Pullback',
      strat1Desc: 'Entry on retracement after touching and rejecting VWAP with confirming buy order flow.',
      strat2Title: '2. 9 x 21 MA Crossover',
      strat2Desc: 'Buy trigger when MA 9 crosses above MA 21 with a candle closing firmly above the level.',
      myPositions: 'My Positions',
      closeAllShort: 'Flatten All',
      noOpenPositions: 'No open positions at the moment.',
      noOpenPositionsMobile: 'No open positions right now. Use the Ticket to place new orders.',
      colAsset: 'Asset',
      colSide: 'Side',
      colQty: 'Qty',
      colEntry: 'Entry',
      colCurrent: 'Last',
      colAction: 'Action',
      sideBuy: 'BUY',
      sideSell: 'SELL',
      flattenBtn: 'Close',
      dayPerformance: 'Day Performance',
      winRateLabel: 'Win Rate',
      netResultLabel: 'Net P&L:',
      dayReturnLabel: 'Day Return:',
      tradesWord: 'Trades:',
      totalWord: 'Total:',
      marketNewsTitle: 'Market News',
      realTimeTag: 'Real Time',
      realTimeMarketTitle: 'Real-Time Market Watch',
      assetsCountSuffix: 'Assets',
      categories: {
        all: 'All',
        stocks: 'Stocks',
        futures: 'Futures',
        forex: 'Forex',
        crypto: 'Crypto',
        bdrs: 'US/BDRs',
      },
      searchAssetPlaceholder: 'Search asset...',
      filterAssetsMobilePlaceholder: 'Filter tradable assets...',
      quickTicketTitle: 'Quick Execution Ticket',
      ticketBuyTab: 'BUY',
      ticketSellTab: 'SELL',
      marketOrderBtn: 'Market',
      limitOrderBtn: 'Limit Order',
      contractsQtyLabel: 'Contracts Quantity:',
      limitPriceLabel: 'Limit Price:',
      buyActionVerb: 'BUY',
      sellActionVerb: 'SELL',
      flattenAllBtn: 'FLATTEN ALL',
      reverseBtn: 'Reverse',
      mobileTabs: {
        ticket: 'Ticket',
        market: 'Market',
        bookDom: 'DOM Book',
        tape: 'Tape',
        positions: 'Positions',
      },
      expandPanelTitle: 'Expand trading panel',
      collapsePanelTitle: 'Collapse trading panel',
      priceShort: 'Price:',
      bidMobile: 'Bid (Buy)',
      askMobile: 'Ask (Sell)',
      liveFlowTag: 'Live order flow',
      aggressorCol: 'Aggressor',
      entryShort: 'Entry:',
      currentShort: 'Last:',
      closePositionMobile: 'Close',
      connectionStable: 'Connection: Stable',
      feedFooter: 'B3 Direct Market Feed • Active Liquidity',
      latencyFooter: 'Latency: 12ms • Server SP-01',
      e2eEncryption: 'End-to-End Encryption',
      lgpdAudited: 'LGPD Audited',
      riskModalTitle: 'Daily Risk Manager',
      gainGoalLabel: 'Daily Profit Goal (Gain Goal R$):',
      dailyStopLossLabel: 'Daily Loss Limit (Daily Stop Loss R$):',
      riskLockTriggered: 'Risk lock triggered!',
      unlockBtn: 'Unlock',
      saveParamsBtn: 'Save Parameters',
      alertModalTitle: 'New Price Alert',
      alertModalDescPrefix: 'Receive instant notifications when',
      alertModalDescSuffix: 'reaches your target price:',
      createAlertBtn: 'Create Alert',
      helpModalTitle: 'Terminal Keyboard Shortcuts',
      shortcutBuyMarket: 'Buy at Market',
      shortcutSellMarket: 'Sell at Market',
      shortcutFlattenNow: 'Flatten Position Immediately',
      shortcutSpaceEsc: 'Space / Esc',
      shortcutReverse: 'Reverse Position',
      closeBtn: 'Close',
      notifications: {
        riskLockedError: '❌ Risk lock active! Daily loss limit reached.',
        riskLimitAutoClose: 'Daily loss limit reached! Institutional risk lock activated.',
        orderExecutedPrefix: '✓',
        orderExecutedMiddle: 'order executed:',
        orderExecutedAt: 'at',
        positionClosedPrefix: 'Position closed:',
        positionClosedResult: 'with P&L of',
        allClosedPrefix: 'All positions flattened at market! Consolidated P&L:',
        reverseExecutedPrefix: 'Reversal executed: Now',
        boughtState: 'LONG',
        soldState: 'SHORT',
        inWord: 'on',
        simulatorReset: 'Simulator reset successfully! Balance restored to R$ 100,000.00.',
        alertConfiguredPrefix: 'Price alert set for',
        alertConfiguredSuffix: 'at the specified level!',
      },
    },
  },
  es: {
    fixedIncome: {
      bannerTitle: 'Renta Fija & Derivados Globales',
      bannerBadge: 'B3 & Chicago',
      bannerSubtitle:
        'Análisis completo de contratos de futuros, valoración de opciones con el modelo Black-Scholes, sensibilidad de las Griegas y bonos soberanos de renta fija.',
      tabOptions: 'Calculadora de Opciones',
      tabFutures: 'Contratos de Futuros',
      tabFixedIncome: 'Bonos & Tesoro',
      optionsParamsTitle: 'Parámetros de la Opción',
      contractTypeLabel: 'Tipo de Contrato',
      callBtn: 'CALL (Compra)',
      putBtn: 'PUT (Venta)',
      spotPriceLabel: 'Precio Spot del Activo (S)',
      strikePriceLabel: 'Precio de Ejercicio / Strike (K)',
      daysToExpiryLabel: 'Días Calendario al Vencimiento',
      daysUnit: 'días',
      impliedVolLabel: 'Volatilidad Implícita (IV)',
      perYearUnit: '% anual',
      riskFreeRateLabel: 'Tasa Libre de Riesgo (Selic)',
      theoreticalCallTitle: 'Precio Teórico CALL',
      theoreticalPutTitle: 'Precio Teórico PUT',
      itmLabel: 'ITM (En el Dinero)',
      otmLabel: 'OTM (Fuera)',
      callDesc: 'Prima justa estimada por el modelo matemático para el derecho de compra.',
      putDesc: 'Prima justa estimada por el modelo matemático para el derecho de venta.',
      greeksTitle: 'Sensibilidad de las Griegas (Greeks)',
      realTimeTag: 'Tiempo Real',
      deltaDesc: 'Variación por R$ 1 en el activo',
      gammaDesc: 'Aceleración del Delta',
      thetaDesc: 'Pérdida por día hábil (Decaimiento)',
      vegaDesc: 'Sensibilidad por 1% IV',
      rhoDesc: 'Sensibilidad a la tasa Selic',
      payoffTitle: 'Gráfico de Payoff al Vencimiento (P&L)',
      strategies: {
        BUY_CALL: 'Compra Call',
        BUY_PUT: 'Compra Put',
        BULL_CALL_SPREAD: 'Bull Call Spread',
        STRADDLE: 'Straddle',
      },
      breakevenText: 'Breakeven (R$ 0,00)',
      minPriceLabel: 'Precio Mín:',
      strikeLabel: 'Strike:',
      maxPriceLabel: 'Precio Máx:',
      futuresTitle: 'Contratos de Futuros de Referencia (B3 & Bolsas Globales)',
      futuresSubtitle: 'Margen y Liquidación Financiera',
      tickValueLabel: 'Valor del Punto:',
      recommendedMarginLabel: 'Margen Recomendado:',
      maturityLabel: 'Vencimiento:',
      volume24hLabel: 'Volumen 24h:',
      simTitle: 'Simulador Comparativo de Rentabilidad Neta',
      initialDepositLabel: 'Aporte Inicial (R$)',
      termMonthsLabel: 'Plazo de la Inversión (Meses)',
      selicCdiRefLabel: 'Tasa Selic / CDI de Referencia (% anual)',
      cdiCardTitle: 'Tesouro Selic / CDB 100% CDI',
      netProfitLabel: 'Ganancia Neta:',
      irWithheldLabel: 'Alícuota IR Retenido:',
      lciCardTitle: 'LCI / LCA (95% CDI - Exento de IR)',
      incomeTaxLabel: 'Impuesto a la Renta:',
      exemptZeroLabel: 'EXENTO (0%)',
      poupancaCardTitle: 'Caja de Ahorro Tradicional (Poupança)',
      profitLabel: 'Ganancia:',
      dinheuroDiffLabel: 'Diferencial DinhEuro:',
      losesPrefix: 'Pierde',
      catalogTitle: 'Catálogo de Bonos Soberanos & Privados',
      catalogSubtitle: 'Tesouro Direto & Bancarios',
      colTitleAsset: 'Bono / Activo',
      colIssuer: 'Emisor',
      colYield: 'Rentabilidad',
      colMaturity: 'Vencimiento',
      colMinimum: 'Mínimo',
      colTaxation: 'Tributación',
      colGuarantee: 'Garantía',
      futuresOverrides: {
        WINQ26: {
          name: 'Mini Índice B3',
          market: 'B3 Brasil',
          tickValue: 'R$ 1,00 cada 5 pts',
          marginReq: 'R$ 100,00 / contrato (Day Trade)',
          maturity: 'Ago / 2026',
          volume: 'R$ 84,2 MM',
        },
        WDOQ26: {
          name: 'Mini Dólar B3',
          market: 'B3 Brasil',
          tickValue: 'R$ 5,00 cada 0,5 pt',
          marginReq: 'R$ 150,00 / contrato (Day Trade)',
          maturity: 'Ago / 2026',
          volume: 'R$ 42,9 MM',
        },
        DI1F27: {
          name: 'Tasas Futuras B3 (DI 2027)',
          market: 'B3 Brasil',
          tickValue: 'R$ 100.000 PU base',
          marginReq: 'R$ 1.200 / contrato',
          maturity: 'Ene / 2027',
          volume: 'R$ 18,5 MM',
        },
        DI1F29: {
          name: 'Tasas Futuras B3 (DI 2029)',
          market: 'B3 Brasil',
          tickValue: 'R$ 100.000 PU base',
          marginReq: 'R$ 1.500 / contrato',
          maturity: 'Ene / 2029',
          volume: 'R$ 12,1 MM',
        },
        'ES1!': {
          name: 'S&P 500 E-mini Futuro',
          market: 'CME Chicago',
          tickValue: '$ 12,50 cada 0,25 pt',
          marginReq: '$ 500 (Intraday)',
          maturity: 'Sep / 2026',
          volume: '$ 120 MM',
        },
        'CL1!': {
          name: 'Petróleo WTI Futuro',
          market: 'NYMEX',
          tickValue: '$ 10,00 cada 0,01',
          marginReq: '$ 1.000 (Intraday)',
          maturity: 'Jul / 2026',
          volume: '$ 35 MM',
        },
      },
      fixedIncomeOverrides: {
        'tesouro-selic-2029': {
          name: 'Tesouro Selic 2029',
          category: 'Tesoro',
          issuer: 'Tesoro Nacional de Brasil',
          rateDescription: 'Selic + 0,14% anual',
          maturity: '01/03/2029',
          irTax: 'Tabla Regresiva (22,5% a 15%)',
          guarantee: '100% Riesgo Soberano',
        },
        'tesouro-ipca-2035': {
          name: 'Tesouro IPCA+ 2035',
          category: 'Tesoro',
          issuer: 'Tesoro Nacional de Brasil',
          rateDescription: 'IPCA + 6,45% anual',
          maturity: '15/05/2035',
          irTax: 'Tabla Regresiva (22,5% a 15%)',
          guarantee: '100% Riesgo Soberano',
        },
        'tesouro-prefixado-2027': {
          name: 'Tesouro Prefixado 2027',
          category: 'Tesoro',
          issuer: 'Tesoro Nacional de Brasil',
          rateDescription: '12,25% anual fijo',
          maturity: '01/01/2027',
          irTax: 'Tabla Regresiva (22,5% a 15%)',
          guarantee: '100% Riesgo Soberano',
        },
        'cdb-banco-120': {
          name: 'CDB Liquidez Diaria 110% CDI',
          category: 'CDB',
          issuer: 'Banco Múltiple Institucional',
          rateDescription: '110% del CDI (~13,47% anual)',
          maturity: 'Liquidez Diaria / 2027',
          irTax: 'Tabla Regresiva (22,5% a 15%)',
          guarantee: 'FGC hasta R$ 250 mil',
        },
        'lca-agronegocio': {
          name: 'LCA Agronegocio 93% CDI (Exento)',
          category: 'LCI/LCA',
          issuer: 'Banco do Brasil / Cooperativas',
          rateDescription: '93% del CDI (Equiv. a 112% CDI)',
          maturity: '24 meses',
          irTax: 'EXENTO de Impuesto a la Renta',
          guarantee: 'FGC hasta R$ 250 mil',
        },
        'debenture-infra': {
          name: 'Bono Corporativo de Energía Incentivado',
          category: 'Obligación',
          issuer: 'Concesionaria de Infraestructura',
          rateDescription: 'IPCA + 7,20% anual Exento',
          maturity: '15/10/2031',
          irTax: 'EXENTO de Impuesto a la Renta (Ley 12.431)',
          guarantee: 'Garantía Real de la Concesión',
        },
      },
    },
    tapeReading: {
      selectAssetAria: 'Seleccionar activo para Tape Reading',
      lotsUnit: 'lotes',
      buyLetter: 'C',
      sellLetter: 'V',
      pauseBtn: 'Pausar',
      playBtn: 'Play',
      allFilter: 'Todos',
      filterBrokerAria: 'Filtrar bróker',
      allBrokersOption: 'Todos los Brókeres',
      buyLimitSent: 'Orden Compra Limitada',
      sellLimitSent: 'Orden Venta Limitada',
      sentAtWord: 'enviada en',
      domTitle: 'Libro de Profundidad (DOM)',
      levelsUnit: 'Niveles',
      colOrd: 'Ord',
      colBid: 'Bid (Compra)',
      colPrice: 'Precio',
      colAsk: 'Ask (Venta)',
      buyMarketBtn: 'Comprar Mercado',
      sellMarketBtn: 'Vender Mercado',
      tapeTitle: 'Times & Trades (Cinta)',
      tradesCountLabel: 'Operaciones',
      colTime: 'Hora',
      colLot: 'Lote',
      colBuyer: 'Comprador',
      colSeller: 'Vendedor',
      aggressorBuy: 'Agresor Compra',
      aggressorSell: 'Agresor Venta',
      bigLotLegend: 'Lote Big',
      playersTitle: 'Saldo de Participantes',
      institutionalTag: 'Institucional',
      colBroker: 'Bróker',
      colNetBalance: 'Saldo Neto',
      colVolPct: 'Vol %',
      tip1Title: 'Absorción Institucional:',
      tip1Desc: 'Grandes órdenes pasivas sostienen niveles de precio incluso bajo fuerte agresión contraria.',
      tip2Title: 'Delta & Agotamiento (CVD):',
      tip2Desc: 'La divergencia entre un nuevo máximo del precio y una caída del CVD anticipa agotamiento comprador.',
      assetOverrides: {
        'WIN$': { name: 'Mini Índice B3 (Futuro)', type: 'Futuros B3' },
        'WDO$': { name: 'Mini Dólar B3 (Futuro)', type: 'Futuros B3' },
        PETR4: { name: 'Petrobras PN', type: 'Acción B3' },
        VALE3: { name: 'Vale ON', type: 'Acción B3' },
        'BTC/USD': { name: 'Bitcoin Perpetuo', type: 'Cripto' },
        'ETH/USD': { name: 'Ethereum Perpetuo', type: 'Cripto' },
      },
    },
    dayTrade: {
      feedGlobalLive: 'Feed Global En Vivo:',
      dollarLabel: 'DÓLAR',
      euroLabel: 'EURO',
      paperSimulatorBadge: 'Simulador Paper',
      winfutName: 'Mini Índice B3 Futuro',
      wdofutName: 'Mini Dólar B3 Futuro',
      winfutShort: 'Mini Índice B3',
      wdofutShort: 'Mini Dólar B3',
      typeCrypto: 'Cripto',
      typeForex: 'Forex',
      typeBdrs: 'EE. UU./BDRs',
      typeStocks: 'Acciones',
      typeFutures: 'Futuros',
      sidebar: {
        dashboard: 'Inicio',
        mercados: 'Mercados',
        graficos: 'Gráficos Avanzados',
        ordens: 'Órdenes & Boleta',
        posicoes: 'Mis Posiciones',
        carteira: 'Cartera',
        analises: 'Análisis & Diagnóstico',
        noticias: 'Noticias del Mercado',
        alertas: 'Alertas de Precio',
        estrategias: 'Estrategias Scalping',
        simulador: 'Reiniciar Simulador',
        configuracoes: 'Gestión de Riesgo',
        ajuda: 'Ayuda & Atajos de Teclado',
      },
      proSealTitle: 'DinhEuro Pro Terminal • Conectividad B3',
      selectAssetAria: 'Seleccionar activo para Day Trade',
      groupFuturesB3: 'Futuros B3',
      groupStocksBr: 'Acciones Brasil (B3)',
      groupWallStBdrs: 'Wall Street & BDRs',
      groupCrypto: 'Criptoactivos',
      groupForex: 'Divisas & Cambio',
      groupIndicesCommodities: 'Índices Globales & Materias Primas',
      minShort: 'Mín:',
      maxShort: 'Máx:',
      volShort: 'Vol:',
      tabs: {
        chart: 'Gráfico',
        tape: 'Tape Reading',
        book: 'Libro de Órdenes',
        indicators: 'Indicadores',
        strategies: 'Estrategias',
      },
      avgPriceOverlay: 'Precio Prom.',
      tapeTabTitle: 'Cinta Continua de Operaciones (Times & Trades)',
      currentPriceLabel: 'Precio Actual:',
      colTime: 'Hora',
      colTradedPrice: 'Precio Negociado',
      colLotVolume: 'Volumen Lotes',
      colBuyer: 'Comprador',
      colSeller: 'Vendedor',
      lotsUnit: 'lotes',
      bookTabTitle: 'Libro de Órdenes Vertical (DOM Ladder)',
      buyTotalLabel: 'Compra:',
      sellTotalLabel: 'Venta:',
      colBidQty: 'Cant. Compra (Bid)',
      colOfficialPrice: 'Precio Oficial',
      colAskQty: 'Cant. Venta (Ask)',
      bookClickTitlePrefix: 'Haz clic para cargar el precio límite',
      bookClickTitleSuffix: 'en la boleta',
      indicatorsTabTitle: 'Diagnóstico Técnico Automatizado',
      rsiLabel: 'RSI / IFR (14)',
      rsiStatus: '56.4 (Neutral-Alcista)',
      macdLabel: 'MACD (12, 26, 9)',
      macdStatus: '+142.0 (Compra)',
      stochLabel: 'Estocástico Lento',
      stochStatus: '68.2 (Sobrecompra)',
      bollingerLabel: 'Bandas de Bollinger',
      bollingerStatus: 'Dentro de la Banda',
      strategiesTabTitle: 'Estrategias de Scalping y Ruptura',
      strat1Title: '1. Pullback en la VWAP',
      strat1Desc: 'Entrada en el retroceso tras tocar y rechazar la línea media ponderada con confirmación de flujo comprador.',
      strat2Title: '2. Cruce 9 x 21',
      strat2Desc: 'Gatillo de compra cuando la MA 9 cruza por encima de la MA 21 con vela cerrada sobre el nivel.',
      myPositions: 'Mis Posiciones',
      closeAllShort: 'Cerrar Todas',
      noOpenPositions: 'Ninguna posición abierta por el momento.',
      noOpenPositionsMobile: 'Ninguna posición abierta por el momento. Usa la Boleta para abrir nuevas órdenes.',
      colAsset: 'Activo',
      colSide: 'Lado',
      colQty: 'Cant.',
      colEntry: 'Entrada',
      colCurrent: 'Actual',
      colAction: 'Acción',
      sideBuy: 'COMPRA',
      sideSell: 'VENTA',
      flattenBtn: 'Cerrar',
      dayPerformance: 'Rendimiento del Día',
      winRateLabel: 'Acierto',
      netResultLabel: 'Resultado Neto:',
      dayReturnLabel: 'Rentabilidad Día:',
      tradesWord: 'Trades:',
      totalWord: 'Total:',
      marketNewsTitle: 'Noticias del Mercado',
      realTimeTag: 'Tiempo Real',
      realTimeMarketTitle: 'Mercado en Tiempo Real',
      assetsCountSuffix: 'Activos',
      categories: {
        all: 'Todos',
        stocks: 'Acciones',
        futures: 'Futuros',
        forex: 'Forex',
        crypto: 'Cripto',
        bdrs: 'BDRs',
      },
      searchAssetPlaceholder: 'Buscar activo...',
      filterAssetsMobilePlaceholder: 'Filtrar activos para operar...',
      quickTicketTitle: 'Boleta de Ejecución Rápida',
      ticketBuyTab: 'COMPRA',
      ticketSellTab: 'VENTA',
      marketOrderBtn: 'A Mercado',
      limitOrderBtn: 'Orden Limitada',
      contractsQtyLabel: 'Cantidad de Contratos:',
      limitPriceLabel: 'Precio Límite:',
      buyActionVerb: 'COMPRAR',
      sellActionVerb: 'VENDER',
      flattenAllBtn: 'CERRAR TODO',
      reverseBtn: 'Invertir',
      mobileTabs: {
        ticket: 'Boleta',
        market: 'Mercado',
        bookDom: 'Libro DOM',
        tape: 'Cinta',
        positions: 'Posiciones',
      },
      expandPanelTitle: 'Expandir panel de operaciones',
      collapsePanelTitle: 'Contraer panel de operaciones',
      priceShort: 'Precio:',
      bidMobile: 'Compra (Bid)',
      askMobile: 'Venta (Ask)',
      liveFlowTag: 'Flujo en tiempo real',
      aggressorCol: 'Agresor',
      entryShort: 'Entrada:',
      currentShort: 'Actual:',
      closePositionMobile: 'Cerrar',
      connectionStable: 'Conexión: Estable',
      feedFooter: 'B3 Direct Market Feed • Liquidez Activa',
      latencyFooter: 'Latencia: 12ms • Servidor SP-01',
      e2eEncryption: 'Cifrado de Extremo a Extremo',
      lgpdAudited: 'LGPD Auditado',
      riskModalTitle: 'Gestor de Riesgo Diario',
      gainGoalLabel: 'Meta Diaria de Ganancia (Gain Goal R$):',
      dailyStopLossLabel: 'Límite Diario de Pérdida (Daily Stop Loss R$):',
      riskLockTriggered: '¡Bloqueo de riesgo activado!',
      unlockBtn: 'Desbloquear',
      saveParamsBtn: 'Guardar Parámetros',
      alertModalTitle: 'Nueva Alerta de Precio',
      alertModalDescPrefix: 'Recibe notificaciones instantáneas cuando el activo',
      alertModalDescSuffix: 'alcance tu nivel objetivo:',
      createAlertBtn: 'Crear Alerta',
      helpModalTitle: 'Atajos de Teclado del Terminal',
      shortcutBuyMarket: 'Comprar a Mercado',
      shortcutSellMarket: 'Vender a Mercado',
      shortcutFlattenNow: 'Cerrar Posición de Inmediato',
      shortcutSpaceEsc: 'Espacio / Esc',
      shortcutReverse: 'Invertir Posición',
      closeBtn: 'Cerrar',
      notifications: {
        riskLockedError: '❌ ¡Bloqueo de riesgo activo! Límite diario de pérdida alcanzado.',
        riskLimitAutoClose: '¡Límite diario de pérdida alcanzado! Bloqueo de riesgo institucional activado.',
        orderExecutedPrefix: '✓ Orden de',
        orderExecutedMiddle: 'ejecutada:',
        orderExecutedAt: 'a',
        positionClosedPrefix: 'Posición cerrada:',
        positionClosedResult: 'con resultado de',
        allClosedPrefix: '¡Todas las posiciones cerradas a mercado! P&L consolidado:',
        reverseExecutedPrefix: 'Inversión ejecutada: Ahora',
        boughtState: 'COMPRADO',
        soldState: 'VENDIDO',
        inWord: 'en',
        simulatorReset: '¡Simulador reiniciado con éxito! Saldo restaurado a R$ 100.000,00.',
        alertConfiguredPrefix: '¡Alerta configurada para',
        alertConfiguredSuffix: 'en el nivel especificado!',
      },
    },
  },
};
