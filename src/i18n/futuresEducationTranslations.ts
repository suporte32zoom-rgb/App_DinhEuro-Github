import type { SupportedLanguage } from './translations';

export interface FuturesEditorialSection {
  id: string;
  title: string;
  body: string[];
}

export interface FuturesFaqItem {
  question: string;
  answer: string;
}

export interface FuturesEducationCopy {
  badge: string;
  title: string;
  subtitle: string;
  topWarningTitle: string;
  topWarningBody: string;
  monitorTitle: string;
  monitorSubtitle: string;
  monitorHeaders: {
    instrument: string;
    referencePrice: string;
    change24h: string;
    intradayRange: string;
    contractSpec: string;
  };
  winLabel: string;
  winSpec: string;
  wdoLabel: string;
  wdoSpec: string;
  sp500Label: string;
  sp500Spec: string;
  eurBrlLabel: string;
  eurBrlSpec: string;
  riskCalcTitle: string;
  riskCalcBadge: string;
  riskCalcSubtitle: string;
  contractLabel: string;
  contractOptions: {
    win: string;
    wdo: string;
    es: string;
  };
  capitalLabel: string;
  contractsCountLabel: string;
  stopDistanceLabel: string;
  stopUnitPts: string;
  pointValueLabel: string;
  financialRiskLabel: string;
  capitalAtRiskPctLabel: string;
  notionalExposureLabel: string;
  riskStatusConservative: string;
  riskStatusModerate: string;
  riskStatusElevated: string;
  riskCalcNote: string;
  editorialEyebrow: string;
  editorialTitle: string;
  editorialIntro: string;
  sections: FuturesEditorialSection[];
  faqEyebrow: string;
  faqTitle: string;
  faqItems: FuturesFaqItem[];
  footerDisclaimerTitle: string;
  footerDisclaimerBody: string;
  quickLinksTitle: string;
  btnMarkets: string;
  btnFixedIncome: string;
  btnAcademy: string;
}

export const FUTURES_EDUCATION_COPY: Record<SupportedLanguage, FuturesEducationCopy> = {
  pt: {
    badge: 'Conteúdo Educativo & Analítico',
    title: 'Mercados Futuros, Liquidez, Volatilidade e Gestão de Risco (Mini-Índice, Mini-Dólar e S&P 500)',
    subtitle:
      'Estudo estruturado sobre o funcionamento de contratos futuros negociados na B3 e nos Estados Unidos, janelas de liquidez, impacto de juros, câmbio e indicadores macroeconômicos na volatilidade e princípios essenciais de preservação de capital.',
    topWarningTitle: 'Aviso de Risco e Finalidade Estritamente Educativa',
    topWarningBody:
      'Operações com contratos futuros envolvem alavancagem financeira, margem de garantia e ajustes diários que podem gerar perdas superiores ao capital alocado em cenários de alta volatilidade. Esta página tem caráter exclusivamente educativo e analítico: não constitui recomendação de investimento, sinal operacional ou promessa de retorno financeiro.',
    monitorTitle: 'Monitor Analítico de Referência: Índices, Câmbio e Amplitude Intraday',
    monitorSubtitle:
      'Referências de mercado em tempo real para estudo comparativo entre variação diária, amplitude máxima/mínima e especificações contratuais.',
    monitorHeaders: {
      instrument: 'Instrumento de Referência',
      referencePrice: 'Cotação / Pontuação',
      change24h: 'Variação 24h',
      intradayRange: 'Amplitude (Mín – Máx)',
      contractSpec: 'Especificação Didática',
    },
    winLabel: 'Mini-Índice B3 (Ref. Ibovespa / WIN)',
    winSpec: 'Tick: 5 pts • R$ 0,20 / ponto',
    wdoLabel: 'Mini-Dólar B3 (Ref. USD/BRL x1000 / WDO)',
    wdoSpec: 'Tick: 0,5 pt • R$ 10,00 / ponto',
    sp500Label: 'S&P 500 (Índice de Referência EUA)',
    sp500Spec: 'Micro E-mini (MES): $ 5,00 / ponto',
    eurBrlLabel: 'Euro Comercial (EUR/BRL)',
    eurBrlSpec: 'Paridade cambial de referência Europa–Brasil',
    riskCalcTitle: 'Simulador Didático de Exposição e Limite de Risco por Posição',
    riskCalcBadge: 'Controle de Risco',
    riskCalcSubtitle:
      'Calcule quanto uma variação adversa em pontos representa em valor financeiro e em percentual do capital de referência antes de estudar qualquer cenário.',
    contractLabel: 'Contrato de Referência',
    contractOptions: {
      win: 'Mini-Índice B3 (WIN • R$ 0,20/pt)',
      wdo: 'Mini-Dólar B3 (WDO • R$ 10,00/pt)',
      es: 'S&P 500 Micro E-mini (MES • US$ 5,00/pt)',
    },
    capitalLabel: 'Capital de Referência',
    contractsCountLabel: 'Quantidade de Contratos',
    stopDistanceLabel: 'Distância Máxima de Risco (Pontos)',
    stopUnitPts: 'pts',
    pointValueLabel: 'Valor por Ponto (Total)',
    financialRiskLabel: 'Risco Financeiro Estimado no Cenário',
    capitalAtRiskPctLabel: 'Comprometimento do Capital',
    notionalExposureLabel: 'Exposição Nocional Estimada',
    riskStatusConservative: 'Exposição de risco dentro do limite conservador (≤ 1,5% do capital)',
    riskStatusModerate: 'Exposição de risco moderada (entre 1,5% e 3,0% do capital)',
    riskStatusElevated: 'Alerta didático: exposição elevada (> 3,0% do capital em um único evento)',
    riskCalcNote:
      'Cálculo matemático puramente ilustrativo sem incluir emolumentos, taxas de registro, IR ou eventuais deslizamentos (slippage) em momentos de baixa liquidez.',
    editorialEyebrow: 'Fundamentos de Mercado & Microestrutura',
    editorialTitle: 'Guia Estruturado: Contratos Futuros, Liquidez, Catalisadores Macro e Gestão de Risco',
    editorialIntro:
      'Compreender mercados futuros exige separar o mecanismo econômico de formação de preços e proteção cambial (hedge) da exposição alavancada de curto prazo. Abaixo estão os quatro pilares analíticos fundamentais.',
    sections: [
      {
        id: 'contracts-mechanics',
        title: '1. Como Funcionam os Contratos Futuros (Mini-Índice, Mini-Dólar e S&P 500)',
        body: [
          'Um contrato futuro é um acordo padronizado negociado em bolsa (como a B3 no Brasil ou a CME nos Estados Unidos) no qual as partes se comprometem a comprar ou vender um ativo-objeto, índice ou moeda em uma data futura de vencimento a um preço ajustado diariamente. No Brasil, o Mini-Índice (WIN) acompanha o desempenho futuro do Ibovespa com multiplicador de R$ 0,20 por ponto e variação mínima (tick) de 5 pontos; já o Mini-Dólar (WDO) representa contratos de US$ 10 mil cotados em reais por mil dólares, com valor de R$ 10,00 por ponto inteiro.',
          'Diferente da compra à vista de ações, os mercados futuros utilizam margem de garantia — ativos como títulos públicos, CDBs ou saldo em caixa bloqueados na corretora para assegurar o cumprimento de eventuais perdas diárias. Todos os dias úteis, a câmara de compensação realiza o ajuste diário (mark-to-market), creditando ganhos e debitando perdas em conta conforme a variação do preço de ajuste. Essa característica torna os contratos futuros ferramentas amplamente empregadas por empresas exportadoras, importadoras e fundos institucionais para hedge de carteira, mas amplia significativamente o impacto da alavancagem para participantes individuais.',
        ],
      },
      {
        id: 'liquidity-sessions',
        title: '2. Liquidez, Livro de Ofertas e Horários de Pregão',
        body: [
          'Liquidez representa a capacidade de absorver ordens de compra ou venda próximas ao último preço negociado sem provocar deslocamentos bruscos na cotação. Nos contratos futuros da B3, o pregão regular ocorre entre 09h00 e 18h25 (horário de Brasília), sendo influenciado diretamente por janelas de sobreposição internacional: a abertura do mercado à vista de ações brasileiras (10h00), a formação das prévias da taxa PTAX pelo Banco Central (10h00, 11h00, 12h00 e 13h00) e a abertura das bolsas de Nova York (10h30 ou 11h30 em Brasília, conforme o horário de verão norte-americano).',
          'Nos contratos norte-americanos do S&P 500 (E-mini e Micro E-mini), a negociação eletrônica ocorre quase 24 horas por dia durante a semana útil, mas o maior volume concentrado acontece durante a sessão regular da NYSE e da Nasdaq. Em horários de menor profundidade no livro de ofertas — como intervalos de almoço, pós-fechamento à vista ou instantes imediatamente anteriores a anúncios oficiais — o spread entre melhor oferta de compra e de venda tende a se alargar, elevando o risco de execução fora do preço esperado (slippage).',
        ],
      },
      {
        id: 'macro-drivers',
        title: '3. Impacto de Juros, Câmbio e Notícias Macroeconômicas na Volatilidade',
        body: [
          'Os preços dos contratos futuros reagem em milissegundos a alterações nas expectativas de juros, inflação e atividade econômica. Decisões de política monetária do Copom (Taxa Selic), do Federal Reserve (Fed Funds) e do Banco Central Europeu (BCE) modificam o custo de oportunidade do capital e o diferencial de juros entre economias, impactando simultaneamente os contratos futuros de Dólar (WDO), a curva de juros futuros (DI) e os índices acionários (WIN e S&P 500).',
          'Divulgações periódicas como IPCA, Boletim Focus, índice de preços ao consumidor dos EUA (CPI/PCE), relatório de emprego norte-americano (Payroll) e anúncios fiscais ou tarifários costumam gerar picos abruptos de volatilidade intraday. Nessas janelas, a correlação entre dólar e bolsa brasileira frequentemente se torna negativa: um aumento inesperado da percepção de risco ou dos rendimentos dos Treasuries americanos tende a fortalecer o dólar contra o real e pressionar índices acionários emergentes.',
        ],
      },
      {
        id: 'risk-management',
        title: '4. Princípios de Controle de Risco e Preservação de Capital',
        body: [
          'Em ambientes alavancados, o controle quantitativo de risco antecede qualquer análise gráfica ou macroeconômica. Como o valor nocional de um único contrato é muitas vezes superior à margem mínima exigida, pequenas oscilações percentuais no índice ou no câmbio podem comprometer parcela expressiva do patrimônio depositado. Por isso, práticas institucionais de gestão de risco priorizam limitar a perda máxima aceita por evento a uma fração reduzida do capital total (frequentemente abaixo de 1% a 2%), dimensionando a quantidade de contratos de forma inversamente proporcional à amplitude de volatilidade do período.',
          'Outros pilares fundamentais incluem o uso prévio de ordens de proteção (stop loss) coerentes com a volatilidade estatística do ativo, a definição de limites máximos de perda diária ou semanal para evitar decisões emocionais após sequências negativas (overtrading) e a contabilização realista de custos operacionais, emolumentos de bolsa e tributação aplicável. Sem disciplina rigorosa de preservação de capital, a alavancagem acelera a erosão patrimonial mesmo diante de análises corretas de longo prazo.',
        ],
      },
    ],
    faqEyebrow: 'Perguntas Frequentes',
    faqTitle: 'Perguntas Frequentes sobre Mercados Futuros, Volatilidade e Risco',
    faqItems: [
      {
        question: 'O que são contratos futuros de Mini-Índice (WIN), Mini-Dólar (WDO) e S&P 500?',
        answer:
          'São contratos derivativos padronizados negociados em bolsa que refletem a expectativa futura do Ibovespa, da taxa de câmbio USD/BRL e do índice norte-americano S&P 500. Por exigirem apenas margem de garantia em vez do valor integral do contrato, operam com alavancagem e liquidação financeira por ajuste diário.',
      },
      {
        question: 'O que significam margem de garantia e ajuste diário?',
        answer:
          'Margem de garantia é o valor em dinheiro ou títulos aceitos pela bolsa mantido como caução para cobrir eventuais oscilações adversas. Ajuste diário é a apuração diária da diferença entre o preço de fechamento anterior (ou de entrada) e o preço de ajuste do dia, debitada ou creditada automaticamente na conta.',
      },
      {
        question: 'Por que notícias econômicas e decisões de juros aumentam tanto a volatilidade?',
        answer:
          'Relatórios como IPCA, Payroll, CPI e reuniões do Copom ou do Federal Reserve alteram instantaneamente as projeções para juros reais, câmbio e lucros corporativos. Como os contratos futuros concentram alta liquidez institucional, o reajuste de expectativas gera movimentos rápidos e ampliação temporária do spread.',
      },
      {
        question: 'Por que a alavancagem exige gestão de risco rigorosa nos mercados futuros?',
        answer:
          'Porque um contrato controla um valor nocional elevado em relação à margem depositada. Assim, variações modestas no índice ou na taxa de câmbio multiplicam-se em reais ou dólares sobre a conta, podendo provocar chamadas de margem e perdas relevantes caso não haja dimensionamento adequado de posição e limites de perda.',
      },
      {
        question: 'Esta página fornece recomendações, sinais de operação ou promessa de retorno?',
        answer:
          'Não. Todo o conteúdo desta página — incluindo referências de mercado, calculadora didática de risco e textos explicativos — possui caráter estritamente educativo e informativo, sem qualquer recomendação financeira, sinal de compra/venda ou garantia de resultado.',
      },
    ],
    footerDisclaimerTitle: 'Nota Institucional de Risco & Educação Financeira',
    footerDisclaimerBody:
      'O DinhEuro não presta consultoria de valores mobiliários, não emite recomendações personalizadas de compra ou venda de derivativos e não garante resultados financeiros. Estude sempre as especificações oficiais da B3 e das bolsas internacionais e avalie sua tolerância a risco antes de participar de mercados futuros.',
    quickLinksTitle: 'Continuar Estudos no DinhEuro:',
    btnMarkets: 'Explorar Mercados Globais',
    btnFixedIncome: 'Renda Fixa, Opções & Derivativos',
    btnAcademy: 'Cursos Gratuitos na Academy',
  },
  en: {
    badge: 'Educational & Analytical Guide',
    title: 'Futures Markets, Liquidity, Volatility & Risk Management (Mini-Index, Mini-Dollar & S&P 500)',
    subtitle:
      'Structured analytical overview of exchange-traded futures contracts in Brazil (B3) and the United States, intraday liquidity windows, interest-rate and FX macro catalysts, and capital preservation principles.',
    topWarningTitle: 'Risk Disclosure & Strictly Educational Purpose',
    topWarningBody:
      'Futures contracts involve financial leverage, margin collateral, and daily mark-to-market settlement that can amplify losses beyond initial margin during periods of heightened volatility. This page is strictly educational and analytical: it does not provide investment advice, trading signals, or return guarantees.',
    monitorTitle: 'Reference Market Monitor: Indices, FX & Intraday Volatility Range',
    monitorSubtitle:
      'Live market benchmarks for comparative study of daily percentage moves, intraday high–low amplitude, and reference contract specifications.',
    monitorHeaders: {
      instrument: 'Reference Instrument',
      referencePrice: 'Quote / Index Level',
      change24h: '24h Change',
      intradayRange: 'Intraday Range (Low – High)',
      contractSpec: 'Contract Specification',
    },
    winLabel: 'Brazil Mini-Index (Ibovespa / WIN Ref.)',
    winSpec: 'Tick: 5 pts • R$ 0.20 / point',
    wdoLabel: 'Brazil Mini-Dollar (USD/BRL x1000 / WDO Ref.)',
    wdoSpec: 'Tick: 0.5 pt • R$ 10.00 / point',
    sp500Label: 'S&P 500 (US Equity Benchmark)',
    sp500Spec: 'Micro E-mini (MES): $5.00 / point',
    eurBrlLabel: 'Commercial Euro (EUR/BRL)',
    eurBrlSpec: 'Europe–Brazil FX Reference Rate',
    riskCalcTitle: 'Educational Position Exposure & Risk-Limit Calculator',
    riskCalcBadge: 'Risk Discipline',
    riskCalcSubtitle:
      'Measure how an adverse point move translates into financial risk and percentage of reference capital before analyzing any market scenario.',
    contractLabel: 'Reference Contract',
    contractOptions: {
      win: 'B3 Mini-Index (WIN • R$ 0.20/pt)',
      wdo: 'B3 Mini-Dollar (WDO • R$ 10.00/pt)',
      es: 'S&P 500 Micro E-mini (MES • US$ 5.00/pt)',
    },
    capitalLabel: 'Reference Capital',
    contractsCountLabel: 'Number of Contracts',
    stopDistanceLabel: 'Max Adverse Move / Stop Distance (Points)',
    stopUnitPts: 'pts',
    pointValueLabel: 'Combined Point Value',
    financialRiskLabel: 'Estimated Scenario Risk',
    capitalAtRiskPctLabel: 'Share of Reference Capital',
    notionalExposureLabel: 'Estimated Notional Exposure',
    riskStatusConservative: 'Risk exposure within conservative threshold (≤ 1.5% of capital)',
    riskStatusModerate: 'Moderate risk exposure (between 1.5% and 3.0% of capital)',
    riskStatusElevated: 'Educational alert: elevated risk exposure (> 3.0% of capital on a single scenario)',
    riskCalcNote:
      'Purely illustrative mathematical calculation excluding exchange/clearing fees, brokerage charges, taxes, or potential execution slippage during thin liquidity.',
    editorialEyebrow: 'Market Structure & Microstructure Fundamentals',
    editorialTitle: 'Structured Guide: Futures Contracts, Liquidity, Macro Catalysts & Risk Control',
    editorialIntro:
      'Understanding futures markets starts with separating their economic role in price discovery and corporate hedging from leveraged short-term exposure. Below are four core analytical pillars.',
    sections: [
      {
        id: 'contracts-mechanics',
        title: '1. How Futures Contracts Work (Mini-Index, Mini-Dollar, and S&P 500)',
        body: [
          'A futures contract is a standardized exchange-traded agreement (such as on B3 in Brazil or CME in the United States) committing parties to buy or sell an underlying equity index, currency pair, or commodity at a specified expiration date. In Brazil, the Mini-Index (WIN) tracks Ibovespa futures with a multiplier of R$ 0.20 per point and a minimum tick increment of 5 points, whereas the Mini-Dollar (WDO) represents US$ 10,000 contracts quoted in BRL per US$ 1,000, equivalent to R$ 10.00 per full point.',
          'Unlike buying spot equities outright, futures operate on margin collateral—cash or eligible fixed-income securities pledged as security against adverse price swings. At the end of each business day, the clearinghouse executes daily mark-to-market settlement (ajuste diário), crediting gains and debiting losses based on official settlement prices. This design makes futures widely used by exporters, importers, and institutional funds for hedging, while magnifying the impact of leverage on unhedged accounts.',
        ],
      },
      {
        id: 'liquidity-sessions',
        title: '2. Order-Book Liquidity and Market Session Hours',
        body: [
          'Liquidity measures how readily the order book absorbs buy or sell volume near the prevailing quote without abrupt price distortion. On B3, futures trade from 09:00 to 18:25 Brasília time, with activity shifting around key international overlaps: the Brazilian cash equity open (10:00 BRT), Central Bank PTAX FX fixing windows (10:00, 11:00, 12:00, and 13:00 BRT), and the US cash market open in New York (10:30 or 11:30 BRT depending on US daylight saving time).',
          'For US S&P 500 futures (E-mini and Micro E-mini), electronic trading runs nearly 24 hours across weekdays, though depth peaks sharply during regular NYSE and Nasdaq hours. During thinner sessions—such as midday lulls, late afternoon close, or seconds before major policy releases—bid-ask spreads widen and execution slippage risk rises significantly.',
        ],
      },
      {
        id: 'macro-drivers',
        title: '3. Impact of Interest Rates, FX, and Macroeconomic Releases on Volatility',
        body: [
          'Futures prices reprice within milliseconds when interest-rate, inflation, or growth expectations shift. Policy announcements from Brazil’s Copom (Selic), the US Federal Reserve (Fed Funds), and the European Central Bank (ECB) reshape global funding costs and sovereign rate differentials, simultaneously affecting USD/BRL futures (WDO), domestic DI rate curves, and equity index futures (WIN and S&P 500).',
          'Scheduled releases—such as IPCA inflation, the Central Bank Focus Survey, US CPI/PCE inflation, US Nonfarm Payrolls, and fiscal policy announcements—frequently trigger sharp intraday volatility bursts. In those episodes, correlations tighten rapidly: rising US Treasury yields or heightened fiscal uncertainty often strengthen the US dollar against emerging currencies while pressuring local equity benchmarks.',
        ],
      },
      {
        id: 'risk-management',
        title: '4. Risk Control Principles and Capital Preservation',
        body: [
          'In leveraged derivatives markets, quantitative risk control comes before any chart pattern or macro thesis. Because a single contract controls notional exposure many times larger than minimum margin collateral, modest percentage moves in an index or currency can erode a substantial share of posted capital. Institutional risk frameworks therefore cap maximum loss per scenario at a small fraction of total capital (commonly 1% to 2% or less) and scale contract size inversely to prevailing volatility.',
          'Core preservation safeguards also include pre-defined stop-loss thresholds aligned with statistical price range, strict daily or weekly drawdown caps to prevent emotional overtrading after consecutive losses, and realistic accounting for exchange fees and taxes. Without disciplined capital preservation, financial leverage accelerates drawdowns even when longer-term macro views are sound.',
        ],
      },
    ],
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'Frequently Asked Questions About Futures Markets, Volatility & Risk',
    faqItems: [
      {
        question: 'What are Mini-Index (WIN), Mini-Dollar (WDO), and S&P 500 futures contracts?',
        answer:
          'They are standardized exchange-traded derivative contracts tracking forward expectations for Brazil’s Ibovespa equity index, the USD/BRL exchange rate, and the US S&P 500 benchmark. Because they require pledged margin rather than full notional cash, they carry embedded leverage and daily settlement.',
      },
      {
        question: 'What do margin collateral and daily mark-to-market settlement mean?',
        answer:
          'Margin collateral is the cash or eligible sovereign/bank securities pledged with the broker and clearinghouse to back potential losses. Daily settlement (mark-to-market) calculates the profit or loss versus the previous settlement or entry price at the close of each trading day and settles it in cash.',
      },
      {
        question: 'Why do central bank decisions and economic reports amplify volatility?',
        answer:
          'Indicators such as IPCA, US CPI, Payrolls, and Copom or Federal Reserve decisions immediately change fair-value expectations for real interest rates, FX parity, and corporate earnings, causing institutional desks to re-hedge simultaneously.',
      },
      {
        question: 'Why does leverage require strict risk sizing in futures markets?',
        answer:
          'A small percentage swing on a high notional contract value multiplies directly into substantial gains or losses relative to posted margin, creating margin-call risk if contract counts and maximum loss limits are not strictly controlled.',
      },
      {
        question: 'Does this page provide trade recommendations, signals, or profit promises?',
        answer:
          'No. Everything on this page—including live benchmark quotes, the educational risk calculator, and analytical commentary—is strictly informational and educational, with zero investment recommendations, buy/sell signals, or return guarantees.',
      },
    ],
    footerDisclaimerTitle: 'Institutional Risk & Financial Education Notice',
    footerDisclaimerBody:
      'DinhEuro does not offer investment advisory services, issue personalized derivatives recommendations, or guarantee financial outcomes. Always review official contract specifications published by B3 and international exchanges and assess your risk tolerance carefully.',
    quickLinksTitle: 'Continue Studying on DinhEuro:',
    btnMarkets: 'Explore Global Markets',
    btnFixedIncome: 'Fixed Income, Options & Derivatives',
    btnAcademy: 'Free Courses on Academy',
  },
  es: {
    badge: 'Contenido Educativo & Analítico',
    title: 'Mercados de Futuros, Liquidez, Volatilidad y Gestión de Riesgo (Mini-Índice, Mini-Dólar y S&P 500)',
    subtitle:
      'Estudio estructurado sobre el funcionamiento de contratos de futuros negociados en B3 y Estados Unidos, horarios de liquidez, impacto de tasas de interés, divisas y noticias macroeconómicas, y principios de preservación de capital.',
    topWarningTitle: 'Aviso de Riesgo y Finalidad Estrictamente Educativa',
    topWarningBody:
      'Operar con contratos de futuros implica apalancamiento financiero, margen de garantía y liquidación diaria (ajuste diario) que pueden generar pérdidas superiores al capital depositado en episodios de alta volatilidad. Esta página es exclusivamente educativa y analítica: no constituye asesoría financiera, señal operativa ni promesa de rentabilidad.',
    monitorTitle: 'Monitor Analítico de Referencia: Índices, Divisas y Amplitud Intradía',
    monitorSubtitle:
      'Referencias de mercado en tiempo real para estudio comparativo entre variación diaria, amplitud máxima/mínima y especificaciones contractuales.',
    monitorHeaders: {
      instrument: 'Instrumento de Referencia',
      referencePrice: 'Cotización / Nivel',
      change24h: 'Variación 24h',
      intradayRange: 'Amplitud (Mín – Máx)',
      contractSpec: 'Especificación Didáctica',
    },
    winLabel: 'Mini-Índice B3 (Ref. Ibovespa / WIN)',
    winSpec: 'Tick: 5 pts • R$ 0,20 / punto',
    wdoLabel: 'Mini-Dólar B3 (Ref. USD/BRL x1000 / WDO)',
    wdoSpec: 'Tick: 0,5 pt • R$ 10,00 / punto',
    sp500Label: 'S&P 500 (Índice de Referencia EE. UU.)',
    sp500Spec: 'Micro E-mini (MES): $ 5,00 / punto',
    eurBrlLabel: 'Euro Comercial (EUR/BRL)',
    eurBrlSpec: 'Paridad cambiaria de referencia Europa–Brasil',
    riskCalcTitle: 'Simulador Didáctico de Exposición y Límite de Riesgo por Posición',
    riskCalcBadge: 'Control de Riesgo',
    riskCalcSubtitle:
      'Calcula cuánto representa una variación adversa en puntos en valor financiero y en porcentaje del capital de referencia antes de analizar cualquier escenario.',
    contractLabel: 'Contrato de Referencia',
    contractOptions: {
      win: 'Mini-Índice B3 (WIN • R$ 0,20/pt)',
      wdo: 'Mini-Dólar B3 (WDO • R$ 10,00/pt)',
      es: 'S&P 500 Micro E-mini (MES • US$ 5,00/pt)',
    },
    capitalLabel: 'Capital de Referencia',
    contractsCountLabel: 'Cantidad de Contratos',
    stopDistanceLabel: 'Distancia Máxima de Riesgo (Puntos)',
    stopUnitPts: 'pts',
    pointValueLabel: 'Valor por Punto (Total)',
    financialRiskLabel: 'Riesgo Financiero Estimado en el Escenario',
    capitalAtRiskPctLabel: 'Compromiso del Capital',
    notionalExposureLabel: 'Exposición Nocional Estimada',
    riskStatusConservative: 'Exposición de riesgo dentro del límite conservador (≤ 1,5% del capital)',
    riskStatusModerate: 'Exposición de riesgo moderada (entre 1,5% y 3,0% del capital)',
    riskStatusElevated: 'Alerta didáctica: exposición elevada (> 3,0% del capital en un solo evento)',
    riskCalcNote:
      'Cálculo matemático puramente ilustrativo sin incluir derechos de bolsa, comisiones, impuestos ni eventuales deslizamientos (slippage) en momentos de menor liquidez.',
    editorialEyebrow: 'Fundamentos de Mercado & Microestructura',
    editorialTitle: 'Guía Estructurada: Contratos de Futuros, Liquidez, Catalizadores Macro y Control de Riesgo',
    editorialIntro:
      'Comprender los mercados de futuros exige distinguir su función económica de formación de precios y cobertura cambiaria (hedge) frente a la exposición apalancada de corto plazo. A continuación se detallan los cuatro pilares analíticos.',
    sections: [
      {
        id: 'contracts-mechanics',
        title: '1. Cómo Funcionan los Contratos de Futuros (Mini-Índice, Mini-Dólar y S&P 500)',
        body: [
          'Un contrato de futuros es un acuerdo estandarizado negociado en bolsa (como B3 en Brasil o CME en Estados Unidos) mediante el cual las partes se comprometen a comprar o vender un índice, divisa o activo en una fecha de vencimiento futura. En Brasil, el Mini-Índice (WIN) sigue los futuros del Ibovespa con un multiplicador de R$ 0,20 por punto y variación mínima de 5 puntos; mientras que el Mini-Dólar (WDO) equivale a US$ 10.000 cotizados en reales por mil dólares, con un valor de R$ 10,00 por punto entero.',
          'A diferencia de la compra al contado de acciones, los futuros operan mediante margen de garantía —efectivo o títulos elegibles depositados como respaldo ante variaciones adversas— y liquidación diaria (mark-to-market), acreditando ganancias o debitando pérdidas cada jornada según el precio oficial de ajuste. Por ello, son ampliamente utilizados por exportadores, importadores y fondos institucionales para cobertura, aunque el apalancamiento amplifica el riesgo para participantes individuales.',
        ],
      },
      {
        id: 'liquidity-sessions',
        title: '2. Liquidez, Libro de Órdenes y Horarios de Sesión',
        body: [
          'La liquidez refleja la capacidad del mercado para absorber órdenes cerca de la cotización vigente sin saltos bruscos de precio. En los futuros de B3, la sesión regular transcurre entre las 09:00 y las 18:25 (hora de Brasilia), concentrando picos de actividad en la apertura de acciones brasileñas (10:00), las ventanas de referencia PTAX del Banco Central (10:00, 11:00, 12:00 y 13:00) y la apertura de Nueva York.',
          'En los futuros estadounidenses del S&P 500 (E-mini y Micro E-mini), la negociación electrónica opera casi 24 horas entre semana, aunque la mayor profundidad se observa durante la sesión regular de NYSE y Nasdaq. En tramos de menor volumen —como pausas de mediodía o segundos previos a comunicados oficiales— el spread entre compra y venta suele ampliarse, incrementando el riesgo de deslizamiento (slippage).',
        ],
      },
      {
        id: 'macro-drivers',
        title: '3. Impacto de Tasas de Interés, Divisas y Noticias Macroeconómicas en la Volatilidad',
        body: [
          'Los precios de los futuros reaccionan en milisegundos ante cambios en las expectativas de tasas de interés, inflación y crecimiento. Decisiones monetarias del Copom (tasa Selic), la Reserva Federal (Fed Funds) y el Banco Central Europeo (BCE) modifican el costo del capital y los diferenciales de rendimiento entre monedas, impactando de forma simultánea los futuros del dólar (WDO), la curva de tasas DI y los índices bursátiles (WIN y S&P 500).',
          'Publicaciones periódicas como el IPCA, el Boletín Focus, la inflación estadounidense (CPI/PCE), el informe laboral Payroll y anuncios fiscales suelen provocar episodios abruptos de volatilidad intradía. En esas ventanas, un repunte de los rendimientos del Tesoro estadounidense o mayor incertidumbre fiscal suele fortalecer el dólar frente al real y presionar los índices accionarios.',
        ],
      },
      {
        id: 'risk-management',
        title: '4. Principios de Control de Riesgo y Preservación de Capital',
        body: [
          'En instrumentos apalancados, la gestión cuantitativa del riesgo precede a cualquier lectura técnica o macroeconómica. Dado que un contrato representa un valor nocional muy superior al margen mínimo exigido, pequeñas variaciones porcentuales pueden afectar una proporción significativa del capital. Por ello, las prácticas prudentes limitan la pérdida máxima por escenario a un porcentaje acotado del patrimonio (generalmente inferior al 1% o 2%) y ajustan la cantidad de contratos en proporción inversa a la volatilidad.',
          'Entre las reglas esenciales también figuran el uso previo de órdenes de protección (stop loss) acordes a la amplitud estadística del activo, límites máximos de pérdida diaria o semanal para evitar decisiones impulsivas (overtrading) y el cálculo realista de aranceles bursátiles e impuestos. Sin disciplina de preservación de capital, el apalancamiento acelera las pérdidas incluso con diagnósticos macroeconómicos correctos.',
        ],
      },
    ],
    faqEyebrow: 'Preguntas Frecuentes',
    faqTitle: 'Preguntas Frecuentes sobre Mercados de Futuros, Volatilidad y Riesgo',
    faqItems: [
      {
        question: '¿Qué son los contratos de futuros de Mini-Índice (WIN), Mini-Dólar (WDO) y S&P 500?',
        answer:
          'Son contratos derivados estandarizados negociados en bolsa que reflejan la expectativa futura del índice Ibovespa, el tipo de cambio USD/BRL y el índice estadounidense S&P 500. Al requerir margen de garantía en lugar del monto nocional íntegro, operan con apalancamiento y ajuste diario.',
      },
      {
        question: '¿Qué significan margen de garantía y ajuste diario?',
        answer:
          'El margen de garantía es el respaldo en efectivo o títulos aceptados depositado para cubrir oscilaciones adversas. El ajuste diario es la liquidación cotidiana de la diferencia frente al cierre anterior o precio de entrada, debitada o acreditada automáticamente en cuenta.',
      },
      {
        question: '¿Por qué los informes económicos y decisiones de tasas elevan la volatilidad?',
        answer:
          'Datos como IPCA, CPI, Payroll y decisiones del Copom o la Reserva Federal modifican de inmediato las previsiones de tasas reales, divisas y utilidades corporativas, generando reacomodos simultáneos de carteras institucionales.',
      },
      {
        question: '¿Por qué el apalancamiento exige una gestión estricta del riesgo?',
        answer:
          'Porque cada contrato controla un valor nocional elevado frente al margen exigido, de modo que variaciones moderadas del mercado se multiplican sobre el saldo de la cuenta, pudiendo generar llamadas de margen si no existen límites estrictos de posición y pérdida.',
      },
      {
        question: '¿Esta página ofrece recomendaciones, señales operativas o garantías de ganancia?',
        answer:
          'No. Todo el contenido —incluidas las referencias en tiempo real, la calculadora didáctica de riesgo y los textos explicativos— tiene fines estrictamente educativos e informativos, sin asesoría financiera ni promesas de rentabilidad.',
      },
    ],
    footerDisclaimerTitle: 'Nota Institucional de Riesgo & Educación Financiera',
    footerDisclaimerBody:
      'DinhEuro no brinda asesoramiento financiero personalizado, no emite recomendaciones de compra o venta de derivados ni garantiza rendimientos. Consulte siempre las especificaciones oficiales de B3 y de las bolsas internacionales y evalúe su tolerancia al riesgo.',
    quickLinksTitle: 'Continuar Estudiando en DinhEuro:',
    btnMarkets: 'Explorar Mercados Globales',
    btnFixedIncome: 'Renta Fija, Opciones & Derivativos',
    btnAcademy: 'Cursos Gratis en Academy',
  },
};
