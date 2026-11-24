import type { SupportedLanguage } from './translations';

export interface FocusRow {
  indicator: string;
  unit: string;
  y2026: string;
  y2027: string;
  y2028: string;
  y2029: string;
  trend: 'up' | 'down' | 'stable';
  highlight2026?: boolean;
}

export interface MiniChartCardData {
  id: string;
  title: string;
  subtitle: string;
  value2026: string;
  trendLabel: string;
  trendType: 'stable' | 'down-up' | 'up';
  strokeColor: string;
  fillGradientId: string;
  pathD: string;
  areaD: string;
  endPoint: { x: number; y: number };
}

export interface FocusRadarTranslations {
  heading: string;
  subheadingPrefix: string;
  refDate: string;
  primarySourceLabel: string;
  primarySourceName: string;
  badge: string;
  median2026Label: string;
  tableTitle: string;
  tableTag: string;
  colIndicator: string;
  editorialTitle: string;
  editorialP1: string;
  editorialP2: string;
  footerNote: string;
  miniCards: MiniChartCardData[];
  rows: FocusRow[];
}

export const FOCUS_RADAR_DATA: Record<SupportedLanguage, FocusRadarTranslations> = {
  pt: {
    heading: 'Radar Macroeconômico DinhEuro: Boletim Focus',
    subheadingPrefix: 'Comparativo monetário: Política do Banco Central Europeu (BCE) vs. Taxa Selic e inflação no Mercosul — Ref.:',
    refDate: '06 de novembro de 2026',
    primarySourceLabel: 'Fonte primária:',
    primarySourceName: 'Banco Central do Brasil (BCB)',
    badge: 'DinhEuro Intelligence',
    median2026Label: 'Mediana 2026',
    tableTitle: 'Tabela Oficial de Medianas (2026 a 2029)',
    tableTag: 'BCB Focus • 06/11/2026',
    colIndicator: 'Indicador',
    editorialTitle: 'Leitura DinhEuro: O cenário macroeconômico e os reflexos nos investimentos',
    editorialP1:
      'O Boletim Focus divulgado pelo Banco Central do Brasil em novembro de 2026 consolida uma postura de cautela na política monetária. Com o IPCA projetado em 5,22% para o encerramento de 2026 e 4,76% para 2027, o mercado financeiro mantém a expectativa de uma taxa Selic elevada em 13,75% ao ano, buscando ancorar as expectativas inflacionárias frente às pressões de custos e ao comportamento da taxa de câmbio.',
    editorialP2:
      'Para os investidores e operadores que acompanham os fluxos de câmbio e ativos no DinhEuro, a mediana das projeções aponta o dólar comercial cotado a R$ 5,34 para o fechamento deste ano. Paralelamente, o cenário fiscal — refletido na dívida líquida projetada em 70,20% do PIB — continua no radar do mercado, exigindo monitoramento rigoroso dos desdobramentos econômicos e das contas públicas.',
    footerNote:
      'Dados estatísticos oficiais extraídos do Relatório de Mercado Focus do Banco Central do Brasil e analisados pela inteligência editorial do DinhEuro.',
    miniCards: [
      {
        id: 'ipca-2026',
        title: 'IPCA 2026',
        subtitle: 'Curva de inflação anual',
        value2026: '5,22%',
        trendLabel: 'Estabilidade',
        trendType: 'stable',
        strokeColor: '#D99B00',
        fillGradientId: 'focusIpcaGrad',
        pathD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21',
        areaD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 21 },
      },
      {
        id: 'cambio-2026',
        title: 'Câmbio 2026 (R$/US$)',
        subtitle: 'Curva de desaquecimento/alta',
        value2026: 'R$ 5,34',
        trendLabel: 'Fechamento 2026',
        trendType: 'down-up',
        strokeColor: '#009B77',
        fillGradientId: 'focusCambioGrad',
        pathD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26',
        areaD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 26 },
      },
      {
        id: 'selic-2026',
        title: 'Taxa Selic 2026',
        subtitle: 'Curva de juros (% a.a.)',
        value2026: '13,75%',
        trendLabel: 'Estabilização',
        trendType: 'up',
        strokeColor: '#003399',
        fillGradientId: 'focusSelicGrad',
        pathD: 'M 4 33 C 38 30, 68 22, 102 16 C 138 16, 166 16, 194 16',
        areaD: 'M 4 33 C 38 30, 68 22, 102 16 C 138 16, 166 16, 194 16 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 16 },
      },
    ],
    rows: [
      { indicator: 'IPCA', unit: '%', y2026: '5,22%', y2027: '4,76%', y2028: '4,00%', y2029: '3,98%', trend: 'stable', highlight2026: true },
      { indicator: 'PIB Total', unit: '%', y2026: '1,76%', y2027: '1,20%', y2028: '1,80%', y2029: '2,00%', trend: 'up' },
      { indicator: 'Câmbio', unit: 'R$/US$', y2026: 'R$ 5,34', y2027: 'R$ 5,40', y2028: 'R$ 5,45', y2029: 'R$ 5,45', trend: 'up', highlight2026: true },
      { indicator: 'Taxa Selic', unit: '% a.a.', y2026: '13,75%', y2027: '12,50%', y2028: '11,00%', y2029: '10,25%', trend: 'stable', highlight2026: true },
      { indicator: 'IGP-M', unit: '%', y2026: '6,05%', y2027: '4,21%', y2028: '4,00%', y2029: '3,90%', trend: 'down' },
      { indicator: 'Dívida Líquida', unit: '% PIB', y2026: '70,20%', y2027: '74,20%', y2028: '77,20%', y2029: '79,69%', trend: 'up' },
    ],
  },
  en: {
    heading: 'DinhEuro Macro Radar: Focus Market Readout',
    subheadingPrefix: 'Monetary comparison: European Central Bank (ECB) policy vs. Selic rate and Mercosur inflation — Ref.:',
    refDate: 'November 06, 2026',
    primarySourceLabel: 'Primary source:',
    primarySourceName: 'Central Bank of Brazil (BCB)',
    badge: 'DinhEuro Intelligence',
    median2026Label: '2026 Median',
    tableTitle: 'Official Consensus Medians (2026 to 2029)',
    tableTag: 'BCB Focus • 2026-11-06',
    colIndicator: 'Indicator',
    editorialTitle: 'DinhEuro Brief: Brazil’s macro outlook and portfolio positioning',
    editorialP1:
      'The Focus Market Survey published by the Central Bank of Brazil in November 2026 reflects a cautious monetary policy stance. With IPCA inflation projected at 5.22% for year-end 2026 and 4.76% for 2027, market consensus anticipates the benchmark Selic policy rate holding at 13.75% per annum to anchor inflation expectations against cost pressures and FX volatility.',
    editorialP2:
      'For global investors and FX desks monitoring currency flows on DinhEuro, the survey median projects USD/BRL closing the year at R$ 5.34. At the same time, fiscal dynamics—captured by projected net public debt of 70.20% of GDP—remain closely watched across local rates and equity risk premia.',
    footerNote:
      'Official statistical medians extracted from the Central Bank of Brazil Focus Market Report and analyzed by the DinhEuro editorial desk.',
    miniCards: [
      {
        id: 'ipca-2026',
        title: 'IPCA 2026',
        subtitle: 'Annual inflation curve',
        value2026: '5.22%',
        trendLabel: 'Steady',
        trendType: 'stable',
        strokeColor: '#D99B00',
        fillGradientId: 'focusIpcaGrad',
        pathD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21',
        areaD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 21 },
      },
      {
        id: 'cambio-2026',
        title: 'FX 2026 (BRL/USD)',
        subtitle: 'Year-end FX trajectory',
        value2026: 'R$ 5.34',
        trendLabel: '2026 Close',
        trendType: 'down-up',
        strokeColor: '#009B77',
        fillGradientId: 'focusCambioGrad',
        pathD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26',
        areaD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 26 },
      },
      {
        id: 'selic-2026',
        title: 'Selic Rate 2026',
        subtitle: 'Policy rate curve (% p.a.)',
        value2026: '13.75%',
        trendLabel: 'Plateau',
        trendType: 'up',
        strokeColor: '#003399',
        fillGradientId: 'focusSelicGrad',
        pathD: 'M 4 33 C 38 30, 68 22, 102 16 C 138 16, 166 16, 194 16',
        areaD: 'M 4 33 C 38 30, 68 22, 102 16 C 138 16, 166 16, 194 16 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 16 },
      },
    ],
    rows: [
      { indicator: 'IPCA (CPI)', unit: '%', y2026: '5.22%', y2027: '4.76%', y2028: '4.00%', y2029: '3.98%', trend: 'stable', highlight2026: true },
      { indicator: 'Real GDP', unit: '%', y2026: '1.76%', y2027: '1.20%', y2028: '1.80%', y2029: '2.00%', trend: 'up' },
      { indicator: 'USD/BRL FX', unit: 'BRL/USD', y2026: 'R$ 5.34', y2027: 'R$ 5.40', y2028: 'R$ 5.45', y2029: 'R$ 5.45', trend: 'up', highlight2026: true },
      { indicator: 'Selic Rate', unit: '% p.a.', y2026: '13.75%', y2027: '12.50%', y2028: '11.00%', y2029: '10.25%', trend: 'stable', highlight2026: true },
      { indicator: 'IGP-M Index', unit: '%', y2026: '6.05%', y2027: '4.21%', y2028: '4.00%', y2029: '3.90%', trend: 'down' },
      { indicator: 'Net Public Debt', unit: '% GDP', y2026: '70.20%', y2027: '74.20%', y2028: '77.20%', y2029: '79.69%', trend: 'up' },
    ],
  },
  es: {
    heading: 'Radar Macroeconómico DinhEuro: Boletín Focus',
    subheadingPrefix: 'Comparativa monetaria: Política del Banco Central Europeo (BCE) vs. Tasa Selic e inflación en el Mercosur — Ref.:',
    refDate: '06 de noviembre de 2026',
    primarySourceLabel: 'Fuente primaria:',
    primarySourceName: 'Banco Central de Brasil (BCB)',
    badge: 'DinhEuro Intelligence',
    median2026Label: 'Mediana 2026',
    tableTitle: 'Tabla Oficial de Medianas (2026 a 2029)',
    tableTag: 'BCB Focus • 06/11/2026',
    colIndicator: 'Indicador',
    editorialTitle: 'Lectura DinhEuro: El escenario macroeconómico y su impacto en las inversiones',
    editorialP1:
      'El Boletín Focus divulgado por el Banco Central de Brasil en noviembre de 2026 consolida una postura de cautela en la política monetaria. Con el IPCA proyectado en 5,22% para el cierre de 2026 y 4,76% para 2027, el mercado mantiene la expectativa de una tasa Selic elevada en 13,75% anual para anclar las expectativas inflacionarias frente a presiones de costos y volatilidad cambiaria.',
    editorialP2:
      'Para los inversores y operadores que siguen los flujos de divisas y activos en DinhEuro, la mediana apunta al dólar comercial en R$ 5,34 al cierre del año. Paralelamente, el escenario fiscal —reflejado en la deuda neta proyectada en 70,20% del PIB— sigue bajo estricto monitoreo del mercado.',
    footerNote:
      'Datos estadísticos oficiales extraídos del Informe de Mercado Focus del Banco Central de Brasil y analizados por el equipo editorial de DinhEuro.',
    miniCards: [
      {
        id: 'ipca-2026',
        title: 'IPCA 2026',
        subtitle: 'Curva de inflación anual',
        value2026: '5,22%',
        trendLabel: 'Estabilidad',
        trendType: 'stable',
        strokeColor: '#D99B00',
        fillGradientId: 'focusIpcaGrad',
        pathD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21',
        areaD: 'M 4 29 C 35 28, 60 25, 92 22 C 122 21, 152 21, 194 21 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 21 },
      },
      {
        id: 'cambio-2026',
        title: 'Cambio 2026 (R$/US$)',
        subtitle: 'Curva de tipo de cambio',
        value2026: 'R$ 5,34',
        trendLabel: 'Cierre 2026',
        trendType: 'down-up',
        strokeColor: '#009B77',
        fillGradientId: 'focusCambioGrad',
        pathD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26',
        areaD: 'M 4 15 C 38 18, 72 24, 110 28 C 142 30, 168 28, 194 26 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 26 },
      },
      {
        id: 'selic-2026',
        title: 'Tasa Selic 2026',
        subtitle: 'Curva de tasas (% anual)',
        value2026: '13,75%',
        trendLabel: 'Estabilización',
        trendType: 'up',
        strokeColor: '#003399',
        fillGradientId: 'focusSelicGrad',
        pathD: 'M 4 33 C 38 30, 68 22, 102 16 C 138 16, 166 16, 194 16',
        areaD: 'M 4 33 C 38 30, 68 22, 102 16 C 138 16, 166 16, 194 16 L 194 46 L 4 46 Z',
        endPoint: { x: 194, y: 16 },
      },
    ],
    rows: [
      { indicator: 'IPCA', unit: '%', y2026: '5,22%', y2027: '4,76%', y2028: '4,00%', y2029: '3,98%', trend: 'stable', highlight2026: true },
      { indicator: 'PIB Total', unit: '%', y2026: '1,76%', y2027: '1,20%', y2028: '1,80%', y2029: '2,00%', trend: 'up' },
      { indicator: 'Tipo de Cambio', unit: 'R$/US$', y2026: 'R$ 5,34', y2027: 'R$ 5,40', y2028: 'R$ 5,45', y2029: 'R$ 5,45', trend: 'up', highlight2026: true },
      { indicator: 'Tasa Selic', unit: '% anual', y2026: '13,75%', y2027: '12,50%', y2028: '11,00%', y2029: '10,25%', trend: 'stable', highlight2026: true },
      { indicator: 'IGP-M', unit: '%', y2026: '6,05%', y2027: '4,21%', y2028: '4,00%', y2029: '3,90%', trend: 'down' },
      { indicator: 'Deuda Neta', unit: '% PIB', y2026: '70,20%', y2027: '74,20%', y2028: '77,20%', y2029: '79,69%', trend: 'up' },
    ],
  },
};

export interface DossierSectionItem {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface DrexDossierTranslations {
  imageAlt: string;
  fallbackTitle: string;
  tags: [string, string, string];
  heading: string;
  subheading: string;
  controlLabel: string;
  collapseAll: string;
  expandAll: string;
  footerNote: string;
  sections: DossierSectionItem[];
}

export const DREX_DOSSIER_DATA: Record<SupportedLanguage, DrexDossierTranslations> = {
  pt: {
    imageAlt:
      'Identidade conceitual do Drex — Moeda Digital Oficial do Banco Central do Brasil com setas de liquidação atômica',
    fallbackTitle: 'Drex · Real Digital (BCB)',
    tags: ['Agenda BC#', 'Real Digital', 'Liquidação Atômica'],
    heading: 'Dossiê DinhEuro: Drex — A Moeda Digital do Banco Central (BC)',
    subheading:
      'Arquitetura, Casos de Uso, Liquidação Atômica e Identidade Visual | Fonte oficial: Banco Central do Brasil (Agenda BC#)',
    controlLabel: '3 capítulos técnicos e conceituais sobre o Real Digital (Drex)',
    collapseAll: 'Recolher capítulos',
    expandAll: 'Expandir todos',
    footerNote:
      'Dossiê compilado e estruturado pela equipe editorial do DinhEuro com base nas diretrizes oficiais e documentações técnicas do Banco Central do Brasil (BCB).',
    sections: [
      {
        id: 'o-que-e-drex',
        title: 'O que é o Drex e como vai funcionar?',
        paragraphs: [
          'O Drex é a moeda digital oficial emitida pelo Banco Central do Brasil (Real Digital), concebida para ampliar a eficiência do sistema financeiro por meio da tokenização de ativos e da liquidação programável. O nome combina as letras "d" e "r" (de Real Digital), o "e" (de eletrônico) e o "x" (de conexão e tecnologia distribuída), alinhado ao ecossistema de pagamentos instantâneos do país.',
          'Diferentemente de criptoativos privados sem lastro soberano, o Drex preserva o mesmo valor legal, paridade de 1 para 1 com o real físico e segurança jurídica da moeda fiduciária brasileira. Suas operações ocorrem na Plataforma Drex do Banco Central (BC), um ambiente integrado e padronizado voltado à liquidação de transações financeiras com ativos digitais.',
          'Para utilizar os serviços baseados no Drex no varejo, o cidadão ou empresa atua por meio de um intermediário financeiro autorizado, como bancos e instituições de pagamento reguladas pelo BC. Esse intermediário converte recursos mantidos em conta corrente para a carteira digital de Drex tokenizado, habilitando operações financeiras avançadas com garantia institucional e observância integral ao sigilo bancário e à LGPD.',
        ],
      },
      {
        id: 'infraestrutura-smart-contracts',
        title: 'Infraestrutura de Segurança e Execução (Smart Contracts)',
        paragraphs: [
          'A Plataforma Drex utiliza infraestrutura de registro distribuído (DLT) integrada e padronizada para permitir a execução de contratos inteligentes (smart contracts). Esses contratos programáveis garantem que uma transação financeira só seja concluída quando todas as condições jurídicas e operacionais pactuadas forem verificadas simultaneamente.',
          'Esse modelo viabiliza a liquidação atômica (Entrega contra Pagamento — DvP), reduzindo o risco de contraparte, os custos operacionais de intermediação cartorária ou financeira e o tempo de compensação de títulos públicos, crédito, garantias reais e bens registráveis.',
          'Exemplo prático de liquidação atômica: na compra e venda de um veículo ou título financeiro, nenhuma das partes precisa confiar isoladamente que a outra cumprirá a entrega após o envio do recurso. O contrato inteligente vincula o pagamento em Drex à transferência digital da propriedade: se uma das etapas falhar, os recursos e o ativo retornam automaticamente aos respectivos titulares, protegendo comprador e vendedor.',
        ],
      },
      {
        id: 'identidade-visual-drex',
        title: 'Conceito Visual, Privacidade e Identidade da Marca',
        paragraphs: [
          'O conceito visual da marca Drex remete ao ambiente digital e acompanha a Agenda BC#, programa estrutural do Banco Central do Brasil voltado à democratização, competitividade e modernização tecnológica do Sistema Financeiro Nacional.',
          'As duas setas integradas à letra "d" representam o fluxo bidirecional e as etapas simultâneas de uma transação programável, simbolizando a evolução da moeda brasileira para contratos digitais com liquidação segura.',
          'A transição cromática do azul para o verde claro nas setas comunica o conceito de "transação concluída" e agilidade operacional. Paralelamente, os pilotos conduzidos no âmbito do LIFT Challenge Real Digital e dos testes do Piloto Drex avaliam soluções de privacidade criptográfica compatíveis com a Lei Complementar nº 105/2001 (sigilo bancário) e com a Lei Geral de Proteção de Dados (LGPD).',
        ],
      },
    ],
  },
  en: {
    imageAlt:
      'Conceptual identity of Drex — Official Digital Currency of the Central Bank of Brazil with atomic settlement arrows',
    fallbackTitle: 'Drex · Digital Real (BCB)',
    tags: ['Agenda BC#', 'Digital Real', 'Atomic Settlement'],
    heading: 'DinhEuro Dossier: Drex — The Central Bank of Brazil’s Digital Currency',
    subheading:
      'Architecture, Use Cases, Atomic Settlement & Brand Identity | Official source: Central Bank of Brazil (Agenda BC#)',
    controlLabel: '3 technical and conceptual chapters on Brazil’s Digital Real (Drex)',
    collapseAll: 'Collapse chapters',
    expandAll: 'Expand all',
    footerNote:
      'Dossier compiled and structured by the DinhEuro editorial team based on official guidelines and technical specifications from the Central Bank of Brazil (BCB).',
    sections: [
      {
        id: 'o-que-e-drex',
        title: 'What is Drex and how will it work?',
        paragraphs: [
          'Drex is the official central bank digital currency (CBDC) issued by the Central Bank of Brazil (Digital Real), engineered to expand financial-system efficiency through asset tokenization and programmable settlement. The name blends "d" and "r" (Digital Real), "e" (electronic), and "x" (connectivity and distributed-ledger technology).',
          'Unlike unbacked private crypto assets, Drex maintains strict 1:1 parity with the sovereign Brazilian Real and full legal-tender backing. Wholesale and interbank settlement takes place inside the Central Bank’s integrated, standardized Drex Platform.',
          'Retail users and businesses access Drex-enabled services through authorized financial intermediaries such as commercial banks and BCB-regulated payment institutions, which convert checking-account balances into tokenized Drex deposits under full banking-secrecy and data-protection safeguards.',
        ],
      },
      {
        id: 'infraestrutura-smart-contracts',
        title: 'Security Infrastructure & Smart Contract Execution',
        paragraphs: [
          'The Drex Platform runs on an integrated distributed-ledger (DLT) architecture supporting programmable smart contracts. Each contract ensures a financial operation executes only when every legal and operational prerequisite is simultaneously verified.',
          'This design enables atomic Delivery-versus-Payment (DvP) settlement, lowering counterparty risk, reducing administrative intermediation costs, and accelerating settlement for government bonds, collateralized credit, and registered assets.',
          'Practical example of atomic settlement: when purchasing a vehicle or financial security, neither buyer nor seller faces unilateral delivery risk. The smart contract links Drex payment directly to digital title transfer—if either leg fails, both funds and title automatically revert to their original owners.',
        ],
      },
      {
        id: 'identidade-visual-drex',
        title: 'Visual Concept, Privacy & Brand Identity',
        paragraphs: [
          'Drex’s visual identity reflects the digital finance ecosystem and aligns with Agenda BC#, the Central Bank of Brazil’s structural roadmap for inclusion, competition, and technological modernization.',
          'The two arrows embedded inside the letter "d" represent the synchronized stages of a digital transaction and symbolize the evolution of Brazil’s national currency into programmable settlement infrastructure.',
          'The blue-to-light-green color transition communicates "transaction completed" and speed of finality. In parallel, pilot tests under the LIFT Challenge Real Digital and the Drex Pilot evaluate cryptographic privacy layers designed to meet Brazil’s Banking Secrecy Law and LGPD data-protection rules.',
        ],
      },
    ],
  },
  es: {
    imageAlt:
      'Identidad conceptual del Drex — Moneda Digital Oficial del Banco Central de Brasil con flechas de liquidación atómica',
    fallbackTitle: 'Drex · Real Digital (BCB)',
    tags: ['Agenda BC#', 'Real Digital', 'Liquidación Atómica'],
    heading: 'Dossier DinhEuro: Drex — La Moneda Digital del Banco Central de Brasil (BC)',
    subheading:
      'Arquitectura, Casos de Uso, Liquidación Atómica e Identidad Visual | Fuente oficial: Banco Central de Brasil (Agenda BC#)',
    controlLabel: '3 capítulos técnicos y conceptuales sobre el Real Digital (Drex)',
    collapseAll: 'Contraer capítulos',
    expandAll: 'Expandir todos',
    footerNote:
      'Dossier compilado y estructurado por el equipo editorial de DinhEuro con base en directrices oficiales y documentación técnica del Banco Central de Brasil (BCB).',
    sections: [
      {
        id: 'o-que-e-drex',
        title: '¿Qué es el Drex y cómo funcionará?',
        paragraphs: [
          'El Drex es la moneda digital oficial emitida por el Banco Central de Brasil (Real Digital), diseñada para ampliar la eficiencia del sistema financiero mediante tokenización de activos y liquidación programable. Su nombre combina las letras "d" y "r" (Real Digital), "e" (electrónico) y "x" (conexión tecnológica).',
          'A diferencia de criptoactivos privados sin respaldo soberano, el Drex mantiene paridad estricta 1 a 1 con el real brasileño y pleno respaldo legal. Su liquidación se ejecuta en la Plataforma Drex del Banco Central en un entorno integrado y estandarizado.',
          'Los usuarios minoristas y empresas acceden a servicios sobre Drex mediante intermediarios financieros autorizados —como bancos e instituciones reguladas—, que convierten depósitos en cuenta corriente a saldos tokenizados bajo normas estrictas de secreto bancario y protección de datos.',
        ],
      },
      {
        id: 'infraestrutura-smart-contracts',
        title: 'Infraestructura de Seguridad y Ejecución (Smart Contracts)',
        paragraphs: [
          'La Plataforma Drex opera sobre una arquitectura de registro distribuido (DLT) estandarizada que habilita contratos inteligentes (smart contracts). Estos garantizan que una operación se ejecute únicamente cuando todas las condiciones legales y operativas pactadas se cumplen de forma simultánea.',
          'Este esquema hace posible la liquidación atómica (Entrega contra Pago — DvP), reduciendo el riesgo de contraparte, los costos de intermediación y los plazos de compensación en títulos públicos, crédito con garantía y activos registrables.',
          'Ejemplo práctico de liquidación atómica: en la compraventa de un vehículo o activo financiero, el contrato inteligente vincula el pago en Drex a la transferencia digital de la titularidad; si una de las partes falla, dinero y bien regresan automáticamente a sus titulares originales.',
        ],
      },
      {
        id: 'identidade-visual-drex',
        title: 'Concepto Visual, Privacidad e Identidad de Marca',
        paragraphs: [
          'El concepto visual de la marca Drex remite al ecosistema financiero digital y forma parte de la Agenda BC#, el programa estructural del Banco Central para impulsar eficiencia, inclusión y modernización financiera.',
          'Las dos flechas integradas en la letra "d" representan las etapas sincronizadas de una transacción programable y simbolizan la evolución de la moneda brasileña.',
          'La transición cromática de azul a verde claro transmite el mensaje de "transacción concluida". Paralelamente, las pruebas del LIFT Challenge Real Digital y del Piloto Drex evalúan soluciones criptográficas de privacidad compatibles con el secreto bancario y la LGPD.',
        ],
      },
    ],
  },
};

export interface MercosulEuDossierTranslations {
  imageAlt: string;
  fallbackTitle: string;
  tags: [string, string, string];
  heading: string;
  subheading: string;
  controlLabel: string;
  collapseAll: string;
  expandAll: string;
  footerNote: string;
  sections: DossierSectionItem[];
}

export const MERCOSUL_EU_DOSSIER_DATA: Record<SupportedLanguage, MercosulEuDossierTranslations> = {
  pt: {
    imageAlt: 'Ilustração institucional do Acordo de Parceria MERCOSUL e União Europeia — Brasil e UE',
    fallbackTitle: 'MERCOSUL · União Europeia',
    tags: ['Dossiê Especial', 'Comércio Internacional', '720 milhões de consumidores'],
    heading: 'Dossiê DinhEuro: Acordo MERCOSUL–União Europeia (Capítulo a Capítulo)',
    subheading: 'Publicado em 23/06/2026 | Atualizado em 03/11/2026 | Fontes oficiais: MDIC e Governo Federal',
    controlLabel: '17 seções integrais (EMPA & ITA — 16 capítulos + visão estratégica)',
    collapseAll: 'Recolher capítulos',
    expandAll: 'Expandir todos',
    footerNote:
      'Dossiê compilado e estruturado pela equipe editorial do DinhEuro com base nas informações oficiais do Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC) e do Governo Federal.',
    sections: [
      {
        id: 'visao-geral',
        title: 'Sobre o Acordo (Visão Geral e Contexto Estratégico)',
        paragraphs: [
          'O Acordo de Parceria entre o MERCOSUL e a União Europeia, assinado em 17 de janeiro de 2026, representa o maior acordo comercial já celebrado pelo bloco sul-americano e estabelece uma das maiores zonas de livre comércio do mundo, integrando um mercado de aproximadamente 720 milhões de pessoas e um Produto Interno Bruto combinado superior a US$ 22 trilhões.',
          'Na etapa final das negociações, conduzida entre 2023 e 2024, o Brasil liderou um processo de revisão dos textos então em negociação, que resultou no chamado “Pacote de Brasília”. Os ajustes promovidos conferiram maior equilíbrio aos compromissos assumidos pelas Partes, fortaleceram a dimensão do desenvolvimento sustentável, preservaram espaço para a implementação de políticas públicas e industriais de interesse nacional e permitiram o estabelecimento de um mecanismo de reequilíbrio de concessões, assim como a conclusão de temas que permaneciam em aberto, como propriedade intelectual, cooperação e disposições políticas.',
          'Foram assinados dois instrumentos jurídicos distintos: o Acordo de Parceria entre MERCOSUL e União Europeia (European Union and Mercosur Partnership Agreement – EMPA), com os três pilares – político, de cooperação e comercial, esse último de competência exclusiva da Comissão Europeia (pelo lado europeu); e o Acordo Provisório de Comércio (Interim Trade Agreement – ITA), que replica os compromissos do pilar comercial do EMPA. Ambos foram assinados pela Comissão Europeia, pelo MERCOSUL e por seus Estados Partes, permanecendo pendente, no caso do EMPA, a conclusão dos procedimentos necessários à internalização pelos Estados-Membros da União Europeia e pelos Estados Partes do MERCOSUL.',
          'As Partes decidiram aplicar provisoriamente o ITA a partir de 1º de maio de 2026, após a conclusão célere dos respectivos procedimentos internos e a troca das notificações pertinentes. O acordo comercial permanece sujeito à aprovação do Parlamento Europeu para sua entrada em vigor definitiva, enquanto o EMPA dependerá, adicionalmente, da ratificação pelos parlamentos nacionais dos Estados-Membros da União Europeia, assim como pelos Estados Partes do MERCOSUL. Com o início da aplicação provisória do ITA, passaram a produzir efeitos os cronogramas de eliminação tarifária, bem como as demais disposições do acordo comercial, incluindo a criação das instâncias institucionais responsáveis por sua implementação, monitoramento, revisão e governança.',
          'Além de seus efeitos econômicos, o Acordo possui elevada relevância política e estratégica. Ao consolidar uma associação abrangente entre o MERCOSUL e a União Europeia, fortalece o diálogo institucional e a cooperação em temas de interesse comum, reafirma o compromisso de ambas as regiões com a democracia, o multilateralismo e a promoção dos direitos humanos e cria mecanismos permanentes de coordenação política. O instrumento também reforça a inserção internacional do MERCOSUL, amplia sua atratividade para futuras negociações com terceiros parceiros e contribui para aprofundar a cooperação em áreas como desenvolvimento sustentável, inovação, investimentos e políticas públicas, preservando o espaço regulatório necessário para que os Estados implementem medidas voltadas à saúde, ao meio ambiente, ao desenvolvimento industrial e à inclusão social.',
          'A aplicação provisória do ITA representa, assim, um importante avanço na estratégia de inserção internacional do Brasil e do MERCOSUL, reforçando a diversificação das parcerias econômicas, ampliando oportunidades de comércio e investimentos e aprofundando as relações comerciais, políticas e de cooperação entre as duas regiões.',
        ],
      },
      {
        id: 'capitulo-bens',
        title: '1. Capítulo de Bens (Compromissos de Desgravação Tarifária)',
        paragraphs: [
          'O capítulo de comércio de bens do Acordo MERCOSUL-União Europeia é uma das áreas centrais do pacto, estruturado para promover maior integração econômica e competitividade entre as economias dos dois blocos. O instrumento contempla um amplo compromisso de liberalização tarifária em setores industriais e agrícolas, respeitando as especificidades de cada mercado e garantindo vantagens significativas para ambas as partes.',
          'No setor agrícola, o acordo representa um avanço importante para as exportações do MERCOSUL, com a União Europeia comprometendo-se a liberalizar 77% das linhas tarifárias do setor, que correspondem a um volume de comércio superior a 80%. Isso inclui acesso preferencial para uma série de produtos brasileiros de alto interesse, como carnes, frutas, grãos e café. Carnes bovinas, por exemplo, terão uma cota de 99 mil toneladas que, hoje sujeitas a tarifas que chegam a superar 100%, terão acesso ao mercado europeu com tarifas reduzidas para níveis competitivos. A carne de aves terá uma cota de 180 mil toneladas com isenção tarifária dentro da quota, enquanto a carne suína contará com 25 mil toneladas sob condições preferenciais. Produtos como açúcar e etanol, fundamentais para o Brasil, também terão tratamento especial: o açúcar contará com uma cota inicial de 180 mil toneladas, enquanto o etanol terá 450 mil toneladas destinadas a usos industriais e 200 mil toneladas para outros usos com tarifas reduzidas progressivamente.',
          'Outros produtos agrícolas igualmente relevantes receberão acesso preferencial ou desgravação total. Entre eles, destacam-se café torrado e solúvel, abacates, melões, limões, melancias, uvas de mesa e crustáceos, muitos dos quais terão tarifas completamente eliminadas em prazos que variam de 4 a 10 anos. Essa abertura reforça a posição do Brasil como um dos maiores fornecedores mundiais de produtos agrícolas e assegura vantagens competitivas no mercado europeu, mesmo em meio às regulamentações rigorosas do bloco.',
          'Já no setor industrial, a União Europeia se comprometeu a eliminar 100% de suas tarifas em até 10 anos, com aproximadamente 80% das linhas tarifárias liberalizadas já na entrada em vigor do acordo. Isso beneficiará diretamente exportadores de bens de alta complexidade tecnológica, como químicos, máquinas, equipamentos médicos e autopeças, setores em que o Brasil busca ampliar sua participação no mercado global. No caso do MERCOSUL, a liberalização será mais gradual, com prazos de até 30 anos para produtos sensíveis, como veículos automotivos baseados em novas tecnologias, garantindo tempo suficiente para que a indústria local se adapte ao aumento da concorrência.',
          'Produtos específicos também foram objeto de negociações detalhadas para assegurar o equilíbrio entre concessões e salvaguardas. Autopeças terão desgravação tarifária em prazos de 7 a 10 anos, enquanto têxteis e calçados serão liberalizados em até 10 anos, com medidas para proteger a produção local durante o período de transição. O setor de metais, por sua vez, contará com 80% de suas exportações livres de tarifas já na entrada em vigor do acordo, com o restante liberalizado em até 10 anos. Esses compromissos refletem o esforço conjunto de fomentar o comércio de bens industriais de maior valor agregado, promovendo inovação e competitividade.',
          'Além disso, o acordo prevê o uso de regimes aduaneiros especiais, como drawback, que permitem a importação temporária de insumos com isenção fiscal, desde que sejam utilizados para a produção de bens exportados. Essa medida, aliada à flexibilidade possível nas regras de origem, promove maior integração das economias locais em cadeias globais de valor, especialmente em setores com forte comércio intrafirma, como automotivo e eletrônico.',
          'Em resumo, o capítulo de comércio de bens oferece um equilíbrio estratégico, ampliando o acesso do MERCOSUL ao mercado europeu, enquanto protege os setores sensíveis da economia local. Com prazos adequados e concessões bem estruturadas, o acordo reforça o papel do MERCOSUL como um parceiro comercial estratégico da União Europeia, garantindo condições favoráveis para produtores agrícolas e industriais, além de fomentar o crescimento econômico sustentável em toda a região.',
          '1.1 Anexo sobre Direitos de Exportação: Mercosul e União Europeia se comprometem a não estabelecer entraves às exportações, com exceções específicas para aplicação de imposto de exportação para determinados produtos.',
          '1.2 Anexo sobre Monopólios: O anexo aborda os monopólios de importação e exportação, e define, no contexto do Acordo, os setores em que o Brasil e outros países do Mercosul podem manter ou designar monopólios, como petróleo, gás, hidrocarbonetos e minerais nucleares.',
          '1.3 Anexo de Vinhos e Destilados: O anexo trata das regras para comércio de vinhos e bebidas alcoólicas entre o Mercosul e a União Europeia, incluindo definições, práticas enológicas, rotulagem e certificação. Ele estabelece padrões alinhados à Organização Internacional da Vinha e do Vinho (OIV), prevendo cooperação, proteção de indicações geográficas e simplificação de certificações.',
        ],
      },
      {
        id: 'regras-origem',
        title: '2. Regras de Origem',
        paragraphs: [
          'O Capítulo sobre Regras de Origem do acordo está alinhado com as melhores práticas internacionais. Além da não alteração, disciplina que permite estabelecer centros de distribuição ao redor do mundo, estão previstas as seguintes inovações no acordo: disciplina sobre materiais fungíveis, jogos e sortidos e materiais neutros.',
          'Em relação à acumulação de origem, a disciplina prevê a acumulação apenas entre os Estados Partes do acordo. Adicionalmente, o texto estabelece 10% de tolerância aos produtos em geral e flexibilidades específicas para produtos têxteis.',
          'Já na seção de prova de origem, destaca-se que o modelo adotado é o da autocertificação, após um período de transição de cinco anos, no qual se poderá utilizar o Certificado de Origem opcionalmente. Na parte de verificação e controle, por seu turno, cumpre apontar que a verificação é conduzida pelo país exportador, com procedimentos rápidos e menos burocráticos, com o fito de preservar um ambiente de negócios justo.',
          'Desta forma, o texto de origem é uma normativa moderna, pautada no princípio de facilitação de comércio, garantindo que os operadores econômicos das Partes sejam os reais beneficiários das preferências negociadas.',
          'Em relação aos requisitos específicos de origem foram negociadas regras para todo o universo tarifário, privilegiando a formação de cadeias regionais de valor e as sensibilidades dos blocos, como em relação à utilização de açúcar originário e a aplicação de salto qualificado (que exclui as peças) para determinadas máquinas.',
          'Ferramenta ROSA: Adicionalmente, destaca-se a disponibilização, pela União Europeia, da ferramenta ROSA - Rules of Origin Self-Assessment, integrada ao portal Access2Markets. A ferramenta permite que exportadores e importadores realizem uma autoavaliação do cumprimento das regras de origem aplicáveis a cada produto no âmbito dos acordos comerciais celebrados pela União Europeia, inclusive o acordo com o Mercosul, auxiliando na verificação da elegibilidade para o tratamento tarifário preferencial.',
        ],
      },
      {
        id: 'facilitacao-comercio',
        title: '3. Facilitação de Comércio e Cooperação Aduaneira',
        paragraphs: [
          'O capítulo visa a acelerar e reduzir os custos dos processos relacionados à importação e exportação de bens, promovendo maior eficiência ao reduzir a burocracia e aumentar a transparência para os operadores econômicos.',
          'Está prevista a revisão e aprimoramento contínuo de regulamentos e práticas aduaneiras, em diálogo com o setor empresarial. Também se busca adotar o uso de sistemas eletrônicos para simplificar as operações alfandegárias.',
          'Destacam-se, entre as disposições do capítulo, a assunção de compromissos ambiciosos no tratamento de bens perecíveis nas aduanas; a utilização do gerenciamento de risco como forma de evitar discriminação ou restrições disfarçadas no comércio internacional; a simplificação da admissão temporária de bens, como o uso de carnês ATA; a colaboração para o reconhecimento mútuo de Operadores Econômicos Autorizados (OEA); e o estabelecimento de um Comitê para assegurar o funcionamento correto das disposições do capítulo de facilitação.',
          'De acordo com a Organização Mundial do Comércio (OMC), a simplificação e a harmonização de procedimentos alfandegários, como a melhoria na transparência e previsibilidade, podem reduzir os custos do comércio internacional em até 10% para países desenvolvidos e em até 15% para países em desenvolvimento.',
          'O Acordo inclui o Protocolo de Assistência Mútua e Cláusula Antifraude, que aborda a assistência administrativa mútua em matéria aduaneira entre os países do Mercosul e da União Europeia, e define mecanismos de cooperação para combater fraudes, garantir a aplicação correta das legislações aduaneiras e facilitar o comércio legítimo.',
          'Cláusula de Integração Regional: Visa facilitar - entre e dentro das duas regiões, respeitando os processos de integração regional de cada parte - o movimento de Bens (livre circulação de produtos do Mercosul na UE, tratamento aduaneiro não inferior para produtos europeus no Mercosul e revisão periódica de procedimentos) e Serviços (esforços para facilitar a liberdade de prestação de serviços entre empresas e indivíduos). A Cláusula também trata de cooperação e harmonização regulatória.',
        ],
      },
      {
        id: 'barreiras-tecnicas',
        title: '4. Barreiras Técnicas ao Comércio (TBT) e Anexo Automotivo',
        paragraphs: [
          'O capítulo de Barreiras Técnicas ao Comércio (TBT) do Acordo de Parceria entre Mercosul e União Europeia reflete o compromisso de ambos os blocos em facilitar o comércio de bens, promovendo Boas Práticas Regulatórias (BPR) e prevenindo barreiras técnicas desnecessárias. Em alinhamento com compromissos internacionais, como o Acordo TBT da OMC, e com a Estratégia Nacional de Melhoria Regulatória lançada pelo Brasil em 2024, o texto reforça a importância de equilibrar a facilitação do comércio com o direito dos países de regulamentar para atingir objetivos de políticas públicas, como a proteção da saúde humana, animal e vegetal, do meio ambiente, da segurança nacional e dos consumidores.',
          'Entre os compromissos assumidos, destaca-se o uso de padrões internacionais como base para regulamentos técnicos e procedimentos de avaliação da conformidade (ISO, IEC, ITU e Codex Alimentarius). A realização de consultas públicas com prazos adequados, permitindo a participação de stakeholders, e a implementação de análises de impacto regulatório (PRO-REG) também são elementos fundamentais do acordo.',
          'No que diz respeito aos procedimentos de avaliação da conformidade, o capítulo aborda os diferentes modelos adotados pelas partes: no Brasil, predominam certificações emitidas por organismos independentes, enquanto na União Europeia prevalece o sistema de declarações de conformidade do fornecedor. O Acordo estabelece que certificados emitidos por uma das partes poderão ser aceitos pela outra, respeitando os requisitos legais do país importador.',
          'Anexo Automotivo: Reforça a transparência e consolida a prática já adotada pelo Brasil e demais países do Mercosul de reconhecer como equivalentes os testes realizados com base nos requisitos da Comissão Econômica das Nações Unidas para a Europa (UNECE), mesmo sem serem membros da organização. A União Europeia também poderá reconhecer testes de laboratórios situados no Mercosul que integrem redes acreditadas pela UNECE ou sejam subcontratados.',
        ],
      },
      {
        id: 'medidas-sps',
        title: '5. Medidas Sanitárias e Fitossanitárias (SPS)',
        paragraphs: [
          'O Capítulo SPS estabelece disciplinas que vão além das previstas pela OMC, com o objetivo de facilitar o comércio inter-regional de produtos agropecuários. Para isso, promove princípios como o uso de evidências científicas, a transparência e a previsibilidade no estabelecimento de medidas sanitárias e fitossanitárias, além de trazer maior clareza a procedimentos relacionados a instrumentos como “regionalização” e “pré-listing”.',
          'A implementação do sistema de “pré-listing” visa simplificar e reduzir prazos e custos em processos como inspeção, aprovação e habilitação de estabelecimentos exportadores de produtos de origem animal, como carne bovina, frango, suínos e lácteos. Cabe ao país exportador atestar o cumprimento dos requisitos sanitários do país importador, eliminando a necessidade de inspeção individual. O capítulo estabelece limite de 60 dias para emissão de relatórios de missões de inspeção.',
          'O capítulo detalha e fixa prazos para os procedimentos de “regionalização” (reconhecimento de áreas livres de pragas ou doenças) e cria um subcomitê SPS para resolução de conflitos.',
          'Diálogos: Temas relevantes para o agronegócio, como bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana (AMR) e definição de limites máximos de resíduos (LMRs), poderão ser discutidos por meio de mecanismos denominados “Diálogos”.',
        ],
      },
      {
        id: 'dialogos',
        title: '6. Diálogos',
        paragraphs: [
          'O Capítulo denominado “Diálogos” cria canais permanentes de cooperação técnica entre o Mercosul e a União Europeia em temas sensíveis e estratégicos para as cadeias agroindustriais, incluindo bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana (AMR), métodos de segurança alimentar e aplicação científica de padrões regulatórios.',
          'Com o intuito de trocar informações técnicas, aproximar metodologias de avaliação e estimular pesquisas colaborativas, o texto institui subcomitês e grupos de trabalho compostos por representantes especializados de ambas as partes, preservando integralmente a autonomia regulatória de cada bloco e assegurando a proteção de informações confidenciais.',
        ],
      },
      {
        id: 'defesa-comercial',
        title: '7. Defesa Comercial',
        paragraphs: [
          'O capítulo de Defesa Comercial reafirma integralmente os direitos e as obrigações assumidos por Mercosul e União Europeia nos Acordos da Organização Mundial do Comércio (OMC) sobre instrumentos de proteção contra práticas desleais ou surtos de importação.',
          'Na prática, o texto assegura a manutenção do direito de investigar e aplicar medidas antidumping, medidas compensatórias contra subsídios acionáveis e salvaguardas globais conforme a legislação multilateral, reforçando o compromisso de transparência processual e determinando que eventuais controvérsias sobre essas medidas sigam o sistema multilateral de solução de controvérsias da OMC.',
        ],
      },
      {
        id: 'salvaguardas-bilaterais',
        title: '8. Salvaguardas Bilaterais e Anexo de Veículos',
        paragraphs: [
          'O Capítulo de Salvaguardas Bilaterais fundamenta-se nas melhores práticas internacionais para proteger as partes contra surtos súbitos de importação decorrentes da própria redução tarifária que causem ou ameacem causar prejuízo grave às indústrias domésticas. As medidas têm caráter excepcional, vigoram por até 2 anos (prorrogáveis por igual período) e admitem providências provisórias de até 200 dias — conduzidas no Brasil pelo Departamento de Defesa Comercial (DECOM/MDIC) com garantia de ampla defesa.',
          'Anexo X.A (Setor Automotivo): Para o segmento de veículos, uma parte poderá suspender temporariamente o cronograma de desgravação ou restabelecer a alíquota aplicada a terceiros países por 3 anos (renováveis por mais 2 anos) sem obrigação de compensação, além de aplicar medida provisória de até 270 dias mediante comprovação objetiva de dano material em indicadores de produção, vendas, emprego e capacidade instalada.',
        ],
      },
      {
        id: 'servicos-investimentos',
        title: '9. Serviços e Investimentos',
        paragraphs: [
          'O tratamento do comércio de serviços e do estabelecimento de investimentos está reunido em um único capítulo normativo, ampliando transparência e segurança jurídica. O texto fixa compromissos de tratamento nacional, acesso a mercados e movimentação temporária de profissionais e executivos entre os dois blocos.',
          'Contém ainda disciplinas específicas para regulamentação doméstica de serviços, serviços financeiros (resguardando prerrogativas prudenciais dos bancos centrais e permitindo transferência de dados para processamento no exterior), telecomunicações (marcos pró-concorrência), serviços postais e comércio eletrônico (reconhecimento de assinaturas e documentos digitais e combate ao spam).',
          'Lista Brasileira: O Brasil assumiu compromissos em segmentos alinhados à legislação vigente — como telecomunicações, serviços financeiros, construção, engenharia, arquitetura, publicidade, distribuição, varejo, consultoria e informática — excluindo expressamente setores estratégicos e sensíveis como defesa, saúde pública, educação, mineração e extração de petróleo.',
        ],
      },
      {
        id: 'transacoes-correntes',
        title: '10. Transações Correntes e Movimentos de Capitais',
        paragraphs: [
          'Este capítulo assegura a livre realização de pagamentos correntes e movimentações de capitais vinculados a investimentos diretos e operações comerciais abrangidas pelo acordo entre o Mercosul e a União Europeia, oferecendo previsibilidade cambial para empresas e investidores.',
          'Ao mesmo tempo, preserva o direito das autoridades econômicas de adotar salvaguardas excepcionais e temporárias em cenários de graves dificuldades no balanço de pagamentos — desde que proporcionais e consistentes com as normas do Fundo Monetário Internacional (FMI) — e garante a aplicação não discriminatória das leis nacionais tributárias, de insolvência e de prevenção à lavagem de dinheiro.',
        ],
      },
      {
        id: 'compras-governamentais',
        title: '11. Compras Governamentais',
        paragraphs: [
          'O capítulo promove integração institucional por meio de regras de transparência e igualdade de tratamento em licitações públicas. Garante às empresas brasileiras acesso ao mercado de compras governamentais da União Europeia — que representou cerca de 13,7% do PIB do bloco segundo a Revisão de Política Comercial da UE na OMC —, com destaque para oportunidades em máquinas, equipamentos, eletroeletrônicos, obras públicas, arquitetura, engenharia, publicidade, construção e serviços financeiros.',
          'Em sua oferta, o Brasil contemplou aquisições federais e estaduais, mas excluiu expressamente instrumentos estratégicos de fomento e política pública, incluindo margens de preferência para produtos e serviços nacionais, encomendas tecnológicas, compensação comercial (offsets), compras do Sistema Único de Saúde (SUS), incentivos a Micro e Pequenas Empresas e programas de apoio a produtores rurais.',
        ],
      },
      {
        id: 'propriedade-intelectual',
        title: '12. Propriedade Intelectual e Indicações Geográficas (IGs)',
        paragraphs: [
          'Consolida regras para direitos de autor, patentes, marcas, desenhos industriais e indicações geográficas em estrita observância ao Acordo TRIPS da OMC, sem incluir extensão de prazo de patentes nem exclusividade adicional sobre dados de testes clínicos.',
          'Reconhecimento Mútuo de Indicações Geográficas: 37 indicações geográficas brasileiras passam a contar com proteção jurídica na União Europeia — incluindo "Cachaça", queijo "Canastra" e os vinhos e espumantes do "Vale dos Vinhedos" — com trâmite simplificado para novos registros. Em contrapartida, o MERCOSUL reconheceu 358 IGs europeias, resguardando prazos de transição e direitos de produtores locais de boa-fé.',
        ],
      },
      {
        id: 'pmes',
        title: '13. Pequenas e Médias Empresas (PMEs)',
        paragraphs: [
          'Reconhecendo o peso das Pequenas e Médias Empresas (PMEs) na geração de emprego, inovação e renda em ambos os blocos, o acordo dedica um capítulo exclusivo para reduzir assimetrias de informação que tradicionalmente dificultam a internacionalização de negócios de menor porte.',
          'Entre as medidas previstas estão portais públicos centralizados com informações sobre tarifas preferenciais, regras de origem, requisitos sanitários e normas técnicas, além de ações de capacitação para integração em cadeias globais de valor, acesso a licitações públicas e formação de parcerias, joint ventures e redes empresariais entre empresas sul-americanas e europeias.',
        ],
      },
      {
        id: 'defesa-concorrencia',
        title: '14. Defesa da Concorrência',
        paragraphs: [
          'Neste capítulo, o Mercosul e a União Europeia reiteram o compromisso de coibir práticas anticompetitivas — como cartéis, abuso de posição dominante e concentrações econômicas lesivas ao mercado — assegurando que os benefícios da abertura tarifária não sejam neutralizados por condutas privadas restritivas.',
          'O texto resguarda a autonomia institucional e as legislações nacionais de defesa da concorrência (como a atuação do CADE no Brasil e da Comissão Europeia na UE), prevê garantias de devido processo legal e não discriminação e estabelece canais de cooperação e intercâmbio técnico entre as autoridades antitruste de ambos os blocos.',
        ],
      },
      {
        id: 'subsidios',
        title: '15. Subsídios',
        paragraphs: [
          'O Capítulo de Subsídios reconhece o direito dos governos de conceder subvenções legítimas para alcançar objetivos de interesse público, desenvolvimento regional, inovação e transição sustentável, ao mesmo tempo em que estabelece parâmetros de disciplina para evitar distorções graves sobre os fluxos bilaterais de comércio.',
          'Para reforçar a previsibilidade, o acordo prevê mecanismos de transparência, troca periódica de informações sobre programas de subvenções potencialmente distorcivos, coordenação de posições no âmbito da Organização Mundial do Comércio (OMC) e revisões conjuntas após a entrada em vigor.',
        ],
      },
      {
        id: 'empresas-estatais',
        title: '16. Empresas Estatais',
        paragraphs: [
          'O capítulo busca equilibrar a atuação competitiva no mercado e o papel estratégico desempenhado por empresas estatais e companhias sob controle público. Como regra geral, quando atuam em ambientes concorrenciais de venda de bens ou serviços, essas entidades devem orientar suas decisões por critérios comerciais e de não discriminação.',
          'Contudo, o texto reconhece expressamente os mandatos de interesse público e a prestação de serviços essenciais sob responsabilidade estatal, garantindo flexibilidade para cumprimento de obrigações legais específicas. No caso do Brasil, as disciplinas aplicam-se respeitando o marco constitucional e institucional vigente, abrangendo apenas estatais federais acima de determinados limites de faturamento e preservando exceções para setores estratégicos como o de defesa.',
        ],
      },
    ],
  },
  en: {
    imageAlt: 'Institutional illustration of the MERCOSUR–European Union Partnership Agreement — Brazil and EU',
    fallbackTitle: 'MERCOSUR · European Union',
    tags: ['Special Dossier', 'International Trade', '720 million consumers'],
    heading: 'DinhEuro Dossier: MERCOSUR–European Union Agreement (Chapter by Chapter)',
    subheading: 'Published 2026-06-23 | Updated 2026-11-03 | Official sources: MDIC & Federal Government',
    controlLabel: '17 complete sections (EMPA & ITA — 16 chapters + strategic overview)',
    collapseAll: 'Collapse chapters',
    expandAll: 'Expand all',
    footerNote:
      'Dossier compiled and structured by the DinhEuro editorial team based on official releases from Brazil’s Ministry of Development, Industry, Trade and Services (MDIC) and the Federal Government.',
    sections: [
      {
        id: 'visao-geral',
        title: 'About the Agreement (Overview & Strategic Context)',
        paragraphs: [
          'The MERCOSUR–European Union Partnership Agreement, signed on January 17, 2026, is the largest trade pact ever concluded by the South American bloc, creating one of the world’s largest free-trade areas encompassing roughly 720 million consumers and a combined GDP exceeding US$ 22 trillion.',
          'During the final negotiating round (2023–2024), Brazil led a comprehensive review known as the "Brasília Package," balancing commitments, strengthening sustainable development clauses, preserving regulatory space for industrial and public policies, establishing a concession rebalancing mechanism, and closing open chapters on intellectual property and cooperation.',
          'Two legal instruments were signed: the EU–Mercosur Partnership Agreement (EMPA)—spanning political, cooperation, and trade pillars—and the Interim Trade Agreement (ITA), which mirrors the trade pillar of EMPA so commercial schedules can take effect ahead of full national parliament ratifications.',
          'The Parties agreed to apply the ITA provisionally as of May 1, 2026, triggering tariff-elimination schedules and institutional governance committees while final approval by the European Parliament and national legislatures proceeds.',
          'Beyond tariff relief, the Agreement deepens institutional dialogue on climate, innovation, investment protection, multilateralism, and democratic governance while safeguarding national policy space for health, environment, and industrial modernization.',
          'Provisional application of the ITA marks a major milestone in diversifying Brazil’s and MERCOSUR’s external trade links and expanding two-way investment flows.',
        ],
      },
      {
        id: 'capitulo-bens',
        title: '1. Trade in Goods (Tariff Elimination Schedules)',
        paragraphs: [
          'The Trade in Goods chapter drives economic integration across industrial and agricultural sectors while respecting sensitivities on both sides.',
          'In agriculture, the EU will liberalize 77% of tariff lines representing over 80% of trade volume, establishing preferential quotas for Brazilian beef (99,000 tons), poultry (180,000 tons duty-free inside quota), pork (25,000 tons), sugar (180,000 tons initial quota), and ethanol (450,000 tons industrial + 200,000 tons other uses).',
          'Key exports such as roasted and instant coffee, avocados, melons, limes, table grapes, and crustaceans receive preferential access or full duty elimination over 4 to 10 years.',
          'In manufacturing, the EU eliminates 100% of industrial tariffs within 10 years (~80% upon entry into force), benefiting chemicals, machinery, medical devices, and auto parts. MERCOSUR adopts a gradual schedule up to 30 years for sensitive emerging-tech vehicles.',
          'Specific phase-outs cover auto parts (7–10 years), textiles and footwear (up to 10 years), and metals (80% duty-free at launch, remainder within 10 years).',
          'Special customs regimes such as drawback remain permitted for inputs incorporated into exported manufactures, supporting regional value-chain integration.',
          'Overall, the chapter expands MERCOSUR market access to Europe while giving domestic industries predictable transition horizons.',
          '1.1 Annex on Export Duties: Both blocs commit against export restrictions, with narrow carved-out exceptions.',
          '1.2 Annex on Monopolies: Defines sectors where Brazil and MERCOSUR partners may maintain state monopolies, including oil, gas, hydrocarbons, and nuclear minerals.',
          '1.3 Annex on Wines & Spirits: Harmonizes oenological practices, labeling, certification, and geographical indications in line with OIV standards.',
        ],
      },
      {
        id: 'regras-origem',
        title: '2. Rules of Origin',
        paragraphs: [
          'Aligned with international best practices, the chapter enables global distribution hubs via non-alteration rules alongside provisions for fungible materials, sets, and neutral elements.',
          'Cumulation applies across Parties, accompanied by a general 10% tolerance rule and tailored flexibilities for textiles.',
          'Proof of origin transitions to exporter self-certification after a five-year phase-in during which Certificates of Origin remain optional, with fast, streamlined verification led by the exporting country.',
          'These modern rules ensure that genuine producers in both blocs capture the negotiated tariff preferences.',
          'Product-specific rules span the full tariff schedule to strengthen regional value chains.',
          'ROSA Tool: The EU makes available the Rules of Origin Self-Assessment (ROSA) portal via Access2Markets so exporters and importers can verify preference eligibility product by product.',
        ],
      },
      {
        id: 'facilitacao-comercio',
        title: '3. Trade Facilitation & Customs Cooperation',
        paragraphs: [
          'Designed to lower customs clearance time and costs by cutting red tape and boosting regulatory predictability for traders.',
          'Includes ongoing dialogue with business associations and deployment of electronic customs clearance systems.',
          'Covers expedited release of perishable goods, risk-based inspections, temporary admission (ATA carnets), mutual recognition of Authorized Economic Operators (AEOs), and a joint Facilitation Committee.',
          'According to WTO estimates, streamlining customs procedures can cut trade costs by up to 10% in developed economies and 15% in developing nations.',
          'Incorporates a Mutual Administrative Assistance Protocol and Anti-Fraud Clause to combat customs evasion.',
          'Regional Integration Clause: Facilitates intra- and inter-regional circulation of goods and services while respecting each bloc’s internal integration rules.',
        ],
      },
      {
        id: 'barreiras-tecnicas',
        title: '4. Technical Barriers to Trade (TBT) & Automotive Annex',
        paragraphs: [
          'Promotes Good Regulatory Practices (GRP) and prevents unnecessary technical obstacles while preserving the right to regulate for health, safety, and environmental protection.',
          'Prioritizes international standards (ISO, IEC, ITU, Codex Alimentarius), transparent public consultations, and regulatory impact assessments.',
          'Addresses conformity assessment alignment between Brazil’s third-party certification model and the EU’s supplier declaration system.',
          'Automotive Annex: Consolidates equivalence for UNECE vehicle safety and emissions testing, including recognition of qualified MERCOSUR testing laboratories.',
        ],
      },
      {
        id: 'medidas-sps',
        title: '5. Sanitary & Phytosanitary Measures (SPS)',
        paragraphs: [
          'Goes beyond baseline WTO commitments to facilitate bilateral agricultural trade using science-based rules, transparency, regionalization, and pre-listing.',
          'The pre-listing system streamlines approval of beef, poultry, pork, and dairy exporters by relying on exporting-country sanitary audits and setting a 60-day deadline for inspection reports.',
          'Fixes clear timelines for pest- and disease-free regionalization recognition and creates an SPS subcommittee for rapid dispute resolution.',
          'Dialogues: Establishes structured technical channels on animal welfare, agricultural biotechnology, antimicrobial resistance (AMR), and maximum residue limits (MRLs).',
        ],
      },
      {
        id: 'dialogos',
        title: '6. Dialogues',
        paragraphs: [
          'The Dialogues chapter establishes structured bilateral cooperation channels covering topics sensitive to agri-food supply chains, including animal welfare, agricultural biotechnology, antimicrobial resistance (AMR), and science-based food-safety standards.',
          'By establishing specialized subcommittees and technical working groups from both blocs, the framework promotes regulatory exchange and joint research while fully preserving each party’s regulatory autonomy and safeguarding confidential technical data.',
        ],
      },
      {
        id: 'defesa-comercial',
        title: '7. Trade Remedies',
        paragraphs: [
          'The Trade Remedies chapter reaffirms the rights and obligations of MERCOSUR and the European Union under World Trade Organization (WTO) agreements governing unfair trade practices and import surges.',
          'Both blocs retain full authority to investigate and impose anti-dumping duties, countervailing duties against actionable subsidies, and global safeguards under multilateral rules, ensuring procedural transparency and keeping any resulting disputes under the WTO Dispute Settlement system.',
        ],
      },
      {
        id: 'salvaguardas-bilaterais',
        title: '8. Bilateral Safeguards & Vehicles Annex',
        paragraphs: [
          'Allows temporary tariff suspension (up to 2 years, extendable once for an equal period) and provisional measures up to 200 days if tariff liberalization triggers import surges causing or threatening serious injury to domestic industry, conducted in Brazil by MDIC’s Department of Trade Defense (DECOM) with full due-process guarantees.',
          'Annex X.A (Automotive): Permits suspending tariff phase-outs on motor vehicles or reverting to MFN rates for up to 3 years (renewable for 2 additional years) without compensation, alongside provisional remedies up to 270 days upon substantiated injury to output, sales, employment, or capacity utilization.',
        ],
      },
      {
        id: 'servicos-investimentos',
        title: '9. Services & Investment',
        paragraphs: [
          'Unifies cross-border services trade and investment establishment rules, guaranteeing national treatment, market access, and temporary movement of business visitors and intra-corporate specialists.',
          'Covers domestic licensing regulation, financial services (preserving central-bank prudential authority and cross-border data processing), competitive telecoms frameworks, postal services, and e-commerce (electronic signatures, digital contracts, and anti-spam enforcement).',
          'Brazil’s Schedule: Opens telecoms, financial services, engineering, construction, architecture, advertising, retail, IT, and consulting while explicitly carving out defense, public healthcare, education, mining, and oil extraction.',
        ],
      },
      {
        id: 'transacoes-correntes',
        title: '10. Current Payments & Capital Movements',
        paragraphs: [
          'Guarantees the free transfer of current-account payments and capital flows linked to direct investments and commercial transactions under the Agreement, giving cross-border companies and investors clear currency predictability.',
          'At the same time, it preserves the right to adopt temporary, proportionate balance-of-payments safeguards consistent with International Monetary Fund (IMF) rules during acute financial stress, while upholding non-discriminatory domestic tax, insolvency, and anti-money-laundering enforcement.',
        ],
      },
      {
        id: 'compras-governamentais',
        title: '11. Government Procurement',
        paragraphs: [
          'Grants Brazilian firms transparent, non-discriminatory access to the European Union public procurement market (accounting for roughly 13.7% of EU GDP according to WTO EU Trade Policy Review figures), spanning machinery, electronics, engineering, architecture, public works, construction, and financial services.',
          'Brazil included federal and state-level tenders while explicitly excluding strategic domestic policy tools such as local-content preference margins, public-technology procurement orders, offsets, public healthcare (SUS) purchases, SME set-asides, and smallholder farming programs.',
        ],
      },
      {
        id: 'propriedade-intelectual',
        title: '12. Intellectual Property & Geographical Indications (GIs)',
        paragraphs: [
          'Covers copyright, patents, trademarks, industrial designs, and Geographical Indications in strict alignment with WTO TRIPS obligations, without patent-term extensions or expanded clinical-trial data exclusivity.',
          'Mutual GI Recognition: Protects 37 Brazilian GIs in the EU—including "Cachaça", "Canastra" cheese, and "Vale dos Vinhedos" wines—with streamlined paths for future additions, while MERCOSUR recognizes 358 European GIs alongside transition periods and protections for good-faith local producers.',
        ],
      },
      {
        id: 'pmes',
        title: '13. Small & Medium-Sized Enterprises (SMEs)',
        paragraphs: [
          'Recognizing the vital role of Small and Medium-Sized Enterprises in employment and innovation, the Agreement dedicates an entire chapter to lowering information barriers that disproportionately affect smaller exporters.',
          'Provisions include centralized digital portals publishing preferential tariff tables, rules of origin, sanitary requirements, and technical standards, alongside capacity-building initiatives to integrate SMEs into global value chains, public-tender opportunities, and cross-border joint ventures.',
        ],
      },
      {
        id: 'defesa-concorrencia',
        title: '14. Competition Policy',
        paragraphs: [
          'Reaffirms commitments by both blocs to combat anti-competitive practices—including cartels, abuse of market dominance, and restrictive mergers—so that private restraints do not erode the gains of tariff liberalization.',
          'The chapter safeguards national competition laws and independent enforcement agencies (such as Brazil’s CADE and the European Commission), guarantees procedural fairness and non-discrimination, and establishes technical cooperation mechanisms between antitrust authorities.',
        ],
      },
      {
        id: 'subsidios',
        title: '15. Subsidies',
        paragraphs: [
          'Acknowledges the legitimate role of public subsidies in supporting regional development, innovation, and green transition goals, while setting transparency disciplines to curb support measures that materially distort bilateral trade.',
          'Includes bilateral information-sharing channels on trade-distorting subsidies, closer policy coordination within the WTO framework, and periodic joint reviews following entry into force.',
        ],
      },
      {
        id: 'empresas-estatais',
        title: '16. State-Owned Enterprises (SOEs)',
        paragraphs: [
          'Balances competitive neutrality in commercial markets with the statutory public-service mandates entrusted to state-owned enterprises. When operating commercially, covered SOEs are expected to act according to commercial considerations and non-discriminatory treatment.',
          'Simultaneously, the chapter protects their ability to perform public-interest duties outside strict commercial criteria whenever required by law. In Brazil’s case, disciplines apply strictly within the national institutional framework, limited to large federal SOEs above defined revenue thresholds and carving out strategic defense entities.',
        ],
      },
    ],
  },
  es: {
    imageAlt: 'Ilustración institucional del Acuerdo de Asociación MERCOSUR y Unión Europea — Brasil y UE',
    fallbackTitle: 'MERCOSUR · Unión Europea',
    tags: ['Dossier Especial', 'Comercio Internacional', '720 millones de consumidores'],
    heading: 'Dossier DinhEuro: Acuerdo MERCOSUR–Unión Europea (Capítulo por Capítulo)',
    subheading: 'Publicado el 23/06/2026 | Actualizado el 03/11/2026 | Fuentes oficiales: MDIC y Gobierno Federal',
    controlLabel: '17 secciones integrales (EMPA & ITA — 16 capítulos + visión estratégica)',
    collapseAll: 'Contraer capítulos',
    expandAll: 'Expandir todos',
    footerNote:
      'Dossier compilado y estructurado por el equipo editorial de DinhEuro con base en información oficial del Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC) y del Gobierno Federal.',
    sections: [
      {
        id: 'visao-geral',
        title: 'Sobre el Acuerdo (Visión General y Contexto Estratégico)',
        paragraphs: [
          'El Acuerdo de Asociación entre el MERCOSUR y la Unión Europea, firmado el 17 de enero de 2026, constituye el mayor acuerdo comercial suscrito por el bloque sudamericano y crea una de las mayores zonas de libre comercio del mundo, abarcando cerca de 720 millones de habitantes y un PIB combinado superior a US$ 22 billones.',
          'En la fase final de negociación (2023–2024), Brasil lideró la revisión conocida como "Paquete de Brasilia", equilibrando compromisos, reforzando la dimensión de desarrollo sostenible, preservando espacio para políticas públicas e industriales y cerrando capítulos pendientes de propiedad intelectual y cooperación.',
          'Se firmaron dos instrumentos jurídicos: el Acuerdo de Asociación (EMPA), con pilares político, de cooperación y comercial, y el Acuerdo Interino de Comercio (ITA), que replica el pilar comercial para acelerar su entrada en vigor.',
          'Las Partes acordaron aplicar provisionalmente el ITA desde el 1 de mayo de 2026, activando los cronogramas de desgravación arancelaria y los órganos institucionales de seguimiento mientras avanzan las ratificaciones parlamentarias.',
          'Más allá del comercio, el Acuerdo consolida el diálogo político y la cooperación en innovación, inversiones, multilateralismo y sostenibilidad.',
          'La aplicación provisional del ITA marca un paso clave en la diversificación de alianzas económicas de Brasil y del MERCOSUR.',
        ],
      },
      {
        id: 'capitulo-bens',
        title: '1. Capítulo de Bienes (Compromisos de Desgravación Arancelaria)',
        paragraphs: [
          'El capítulo de comercio de bienes estructura la apertura arancelaria en sectores industriales y agrícolas respetando las sensibilidades de ambos bloques.',
          'En el sector agrícola, la UE liberalizará el 77% de las líneas arancelarias (más del 80% del comercio), otorgando cuotas preferenciales para carne bovina (99 mil t), aviar (180 mil t libres de arancel dentro de cuota), porcina (25 mil t), azúcar (180 mil t) y etanol (450 mil t uso industrial + 200 mil t otros usos).',
          'Productos como café tostado y soluble, aguacate, melón, limón, uva de mesa y crustáceos recibirán acceso preferencial o eliminación total de aranceles en plazos de 4 a 10 años.',
          'En el sector industrial, la UE eliminará el 100% de sus aranceles en hasta 10 años (~80% desde el inicio), beneficiando químicos, maquinaria, equipos médicos y autopartes, mientras el MERCOSUR aplicará plazos graduales de hasta 30 años para vehículos sensibles.',
          'Autopartes (7–10 años), textiles y calzado (hasta 10 años) y metales (80% libre al inicio) cuentan con cronogramas calibrados.',
          'Se mantiene el uso de regímenes especiales como el drawback para insumos incorporados a bienes exportados.',
          'En conjunto, el capítulo amplía el acceso a Europa y protege la transición de la industria local.',
          '1.1 Anexo sobre Derechos de Exportación: Compromiso de no imponer trabas, con excepciones específicas.',
          '1.2 Anexo sobre Monopolios: Define sectores donde Brasil y socios pueden mantener monopolios (petróleo, gas, hidrocarburos, minerales nucleares).',
          '1.3 Anexo de Vinos y Bebidas Espirituosas: Alinea normas enológicas, etiquetado e indicaciones geográficas según la OIV.',
        ],
      },
      {
        id: 'regras-origem',
        title: '2. Reglas de Origen',
        paragraphs: [
          'Alineado con estándares internacionales, permite centros de distribución globales bajo la regla de no alteración e incluye normas para materiales fungibles, surtidos y elementos neutros.',
          'Prevé acumulación entre las Partes, tolerancia general del 10% y flexibilidades textiles.',
          'Adopta la autocertificación tras un período de transición de cinco años en que el Certificado de Origen será opcional, con verificación ágil a cargo del país exportador.',
          'Garantiza que los operadores económicos de ambas regiones aprovechen las preferencias pactadas.',
          'Reglas específicas cubren todo el universo arancelario priorizando cadenas regionales de valor.',
          'Herramienta ROSA: La UE ofrece en Access2Markets la herramienta de autoevaluación ROSA para verificar elegibilidad de origen producto por producto.',
        ],
      },
      {
        id: 'facilitacao-comercio',
        title: '3. Facilitación del Comercio y Cooperación Aduanera',
        paragraphs: [
          'Acelera y abarata los despachos de importación y exportación reduciendo burocracia y ampliando la transparencia.',
          'Prevé diálogo continuo con el sector privado y digitalización de trámites aduaneros.',
          'Incluye trato prioritario para perecederos, gestión de riesgos, cuadernos ATA, reconocimiento mutuo de Operadores Económicos Autorizados (OEA) y un Comité de Facilitación.',
          'Según la OMC, la simplificación aduanera puede reducir costos comerciales hasta un 10% en países desarrollados y 15% en países en desarrollo.',
          'Incorpora el Protocolo de Asistencia Mutua y Cláusula Antifraude.',
          'Cláusula de Integración Regional: Facilita la circulación intra e interregional de bienes y servicios respetando cada bloque.',
        ],
      },
      {
        id: 'barreiras-tecnicas',
        title: '4. Obstáculos Técnicos al Comercio (OTC/TBT) y Anexo Automotriz',
        paragraphs: [
          'Promueve Buenas Prácticas Regulatorias y evita barreras técnicas innecesarias preservando el derecho a regular en salud, seguridad y medio ambiente.',
          'Adopta normas internacionales (ISO, IEC, UIT, Codex Alimentarius), consultas públicas y análisis de impacto regulatorio.',
          'Compatibiliza la certificación por terceros utilizada en Brasil con la declaración de conformidad del proveedor europea.',
          'Anexo Automotriz: Reconoce equivalencia de ensayos bajo normas UNECE, incluyendo laboratorios acreditados del MERCOSUR.',
        ],
      },
      {
        id: 'medidas-sps',
        title: '5. Medidas Sanitarias y Fitosanitarias (MSF/SPS)',
        paragraphs: [
          'Supera los compromisos base de la OMC mediante rigor científico, transparencia, regionalización y pre-listado.',
          'El sistema de "pré-listing" agiliza habilitaciones de establecimientos exportadores de carnes y lácteos con plazo máximo de 60 días para informes de inspección.',
          'Fija plazos para reconocimiento de zonas libres de plagas o enfermedades y crea un subcomité MSF.',
          'Diálogos: Crea canales técnicos sobre bienestar animal, biotecnología agrícola, resistencia antimicrobiana y límites máximos de residuos.',
        ],
      },
      {
        id: 'dialogos',
        title: '6. Diálogos',
        paragraphs: [
          'El capítulo denominado "Diálogos" establece canales permanentes de cooperación técnica entre el MERCOSUR y la Unión Europea en áreas sensibles para las cadenas agroindustriales, incluyendo bienestar animal, biotecnología agrícola, lucha contra la resistencia antimicrobiana (RAM), metodologías de inocuidad alimentaria y aplicación científica de estándares regulatorios.',
          'Con el objetivo de intercambiar información técnica, acercar criterios de evaluación e impulsar la investigación conjunta, el texto instituye subcomités y grupos de trabajo integrados por especialistas de ambas partes, preservando plenamente la autonomía regulatoria de cada bloque y la confidencialidad de los datos técnicos.',
        ],
      },
      {
        id: 'defesa-comercial',
        title: '7. Defensa Comercial',
        paragraphs: [
          'El capítulo de Defensa Comercial reafirma íntegramente los derechos y las obligaciones asumidos por el MERCOSUR y la Unión Europea en los Acuerdos de la Organización Mundial del Comercio (OMC) frente a prácticas desleales o aumentos súbitos de importaciones.',
          'En la práctica, ambos bloques conservan plena facultad para investigar y aplicar derechos antidumping, medidas compensatorias frente a subsidios recurribles y salvaguardias globales conforme a la normativa multilateral, reforzando la transparencia procesal y manteniendo cualquier controversia bajo el mecanismo de solución de diferencias de la OMC.',
        ],
      },
      {
        id: 'salvaguardas-bilaterais',
        title: '8. Salvaguardias Bilaterales y Anexo Automotor',
        paragraphs: [
          'El capítulo de Salvaguardias Bilaterales protege contra aumentos súbitos de importaciones derivados de la propia rebaja arancelaria que causen o amenacen causar daño grave a la industria doméstica, habilitando medidas excepcionales de hasta 2 años (prorrogables por igual plazo) y medidas provisionales de hasta 200 días —conducidas en Brasil por el Departamento de Defensa Comercial (DECOM/MDIC) con garantía de debido proceso—.',
          'Anexo X.A (Sector Automotor): Para vehículos, una parte podrá suspender temporalmente la desgravación o restablecer el arancel NMF hasta 3 años (renovables por 2 años adicionales) sin obligación de compensación, además de aplicar medidas provisionales de hasta 270 días ante evidencia objetiva de daño material en producción, ventas, empleo o capacidad instalada.',
        ],
      },
      {
        id: 'servicos-investimentos',
        title: '9. Servicios e Inversiones',
        paragraphs: [
          'Reúne en un único marco normativo las reglas sobre comercio transfronterizo de servicios y establecimiento de inversiones, garantizando trato nacional, acceso a mercados y movilidad temporal de profesionales y ejecutivos entre ambos bloques.',
          'Incluye disciplinas específicas para regulación doméstica, servicios financieros (resguardando atribuciones prudenciales de los bancos centrales y permitiendo la transferencia de datos para procesamiento), telecomunicaciones procompetitivas, servicios postales y comercio electrónico (validez de firmas digitales y combate al correo no deseado).',
          'Lista Brasileña: Brasil asumió compromisos en telecomunicaciones, finanzas, construcción, ingeniería, arquitectura, publicidad, distribución, comercio minorista, TI y consultoría, excluyendo expresamente sectores estratégicos como defensa, salud pública, educación, minería y extracción de petróleo.',
        ],
      },
      {
        id: 'transacoes-correntes',
        title: '10. Transacciones Corrientes y Movimientos de Capital',
        paragraphs: [
          'Garantiza la libre transferencia de pagos corrientes y movimientos de capital vinculados a inversiones directas y operaciones comerciales cubiertas por el acuerdo entre el MERCOSUR y la Unión Europea, aportando previsibilidad cambiaria a empresas e inversores.',
          'Al mismo tiempo, preserva la facultad de las autoridades económicas para adoptar salvaguardias temporales y proporcionales ante graves dificultades de balanza de pagos —en consonancia con las reglas del Fondo Monetario Internacional (FMI)— y resguarda la aplicación no discriminatoria de leyes fiscales, concursales y de prevención del lavado de activos.',
        ],
      },
      {
        id: 'compras-governamentais',
        title: '11. Compras Públicas',
        paragraphs: [
          'Brinda a las empresas del bloque acceso transparente y no discriminatorio a las licitaciones públicas de la Unión Europea —un mercado equivalente a cerca del 13,7% del PIB europeo según el Examen de Políticas Comerciales de la UE en la OMC—, con oportunidades en maquinaria, equipos electrónicos, obras públicas, ingeniería, arquitectura, construcción y servicios financieros.',
          'Brasil incorporó compras federales y estatales, pero excluyó expresamente instrumentos estratégicos de política pública, tales como márgenes de preferencia para producción nacional, encomiendas tecnológicas, compensaciones comerciales (offsets), adquisiciones del Sistema Único de Salud (SUS), reservas para MiPymes y programas de apoyo a la agricultura familiar.',
        ],
      },
      {
        id: 'propriedade-intelectual',
        title: '12. Propiedad Intelectual e Indicaciones Geográficas (IGs)',
        paragraphs: [
          'Consolida disciplinas en derechos de autor, patentes, marcas, diseños industriales e Indicaciones Geográficas en estricto apego al Acuerdo sobre los ADPIC (TRIPS) de la OMC, sin incluir ampliación del plazo de patentes ni exclusividad adicional sobre datos de ensayos clínicos.',
          'Reconocimiento Mutuo: Protege jurídicamente en la Unión Europea 37 IGs brasileñas —entre ellas "Cachaça", queso "Canastra" y los vinos y espumantes de "Vale dos Vinhedos"— con trámite simplificado para nuevos registros, mientras el MERCOSUR reconoce 358 IGs europeas resguardando plazos de transición y derechos de productores locales de buena fe.',
        ],
      },
      {
        id: 'pmes',
        title: '13. Pequeñas y Medianas Empresas (PyMEs)',
        paragraphs: [
          'Reconociendo el peso de las Pequeñas y Medianas Empresas en la generación de empleo, innovación e ingresos, el acuerdo dedica un capítulo específico a reducir las asimetrías de información que suelen frenar la internacionalización de firmas de menor porte.',
          'Contempla portales públicos centralizados con acceso directo a aranceles preferenciales, reglas de origen, requisitos sanitarios y reglamentos técnicos, junto a programas de capacitación para integrarse en cadenas globales de valor, acceder a licitaciones públicas y conformar alianzas y empresas conjuntas entre Sudamérica y Europa.',
        ],
      },
      {
        id: 'defesa-concorrencia',
        title: '14. Defensa de la Competencia',
        paragraphs: [
          'Reitera el compromiso del MERCOSUR y de la Unión Europea de combatir prácticas anticompetitivas —como cárteles, abuso de posición dominante y concentraciones económicas restrictivas— para que las conductas privadas no anulen los beneficios de la apertura comercial.',
          'El capítulo resguarda la autonomía de las legislaciones y agencias nacionales de competencia (como el CADE en Brasil y la Comisión Europea en la UE), garantiza el debido proceso legal y la no discriminación, y habilita mecanismos de cooperación e intercambio técnico entre autoridades antimonopolio.',
        ],
      },
      {
        id: 'subsidios',
        title: '15. Subsidios',
        paragraphs: [
          'Reconoce la legitimidad de las subvenciones públicas orientadas al desarrollo regional, la innovación y la transición sostenible, estableciendo al mismo tiempo reglas de disciplina para evitar distorsiones graves sobre los flujos bilaterales de comercio.',
          'Incluye compromisos de transparencia, intercambio periódico de información sobre programas de apoyo potencialmente distorsivos, coordinación técnica en el ámbito de la OMC y revisiones conjuntas tras la entrada en vigor.',
        ],
      },
      {
        id: 'empresas-estatais',
        title: '16. Empresas Estatales',
        paragraphs: [
          'Equilibra la actuación competitiva en el mercado y el mandato de interés público confiado a las empresas estatales. Cuando compiten en actividades comerciales de compra o venta de bienes y servicios, estas compañías deben guiarse por criterios comerciales y de trato no discriminatorio.',
          'No obstante, el texto protege expresamente el cumplimiento de obligaciones legales de servicio público fuera de criterios estrictamente comerciales. En el caso de Brasil, las disciplinas se aplican dentro del marco constitucional vigente, restringidas a grandes empresas estatales federales por encima de determinados umbrales de facturación y excluyendo sectores estratégicos como defensa.',
        ],
      },
    ],
  },
};
