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
          'O Drex é a moeda digital oficial do Banco Central do Brasil (Real Digital). O nome Drex vem da combinação de letras em uma palavra com som forte e moderno: as letras "d" e "r" fazem referência ao Real Digital, o "e" vem de eletrônico e o "x" traz a ideia de conexão, associada à tecnologia utilizada.',
          'O Drex vai permitir que vários tipos de transações financeiras seguras com ativos digitais estejam à sua disposição. Esses serviços financeiros serão liquidados dentro da Plataforma Drex do Banco Central (BC), que é um ambiente integrado e padronizado.',
          'Para ter acesso à Plataforma Drex, você precisará de um intermediário financeiro autorizado, como um banco. Esse intermediário fará a transferência do seu dinheiro depositado em conta para sua carteira digital do Drex, para que você possa realizar transações com ativos digitais com total segurança.',
        ],
      },
      {
        id: 'infraestrutura-smart-contracts',
        title: 'Infraestrutura de Segurança e Execução (Smart Contracts)',
        paragraphs: [
          'Os serviços na Plataforma Drex serão realizados dentro de uma infraestrutura integrada e padronizada, desenhada para garantir que as transações ocorram apenas quando todas as condições necessárias forem cumpridas, trazendo previsibilidade e segurança para todas as partes.',
          'O Drex vai democratizar o acesso aos benefícios da economia digital, tornando as transações financeiras mais simples, eficientes e seguras.',
          'Exemplo prático de liquidação atômica: Se você for comprar um carro, pode ficar com receio de pagar e o vendedor não passar a propriedade do veículo. Com o Drex, não importa quem vai fazer o primeiro movimento, pois o contrato só será concluído quando ambos acontecerem. Assim, o dinheiro e a propriedade do carro serão transferidos de forma simultânea. Se uma das partes falhar, o valor pago e o carro voltam para seus respectivos donos.',
        ],
      },
      {
        id: 'identidade-visual-drex',
        title: 'Conceito Visual e Identidade da Marca',
        paragraphs: [
          'O conceito visual da marca Drex remete ao universo digital, refletindo o contexto da agenda de modernização financeira conduzida pelo Banco Central, a Agenda BC#.',
          'As duas setas inseridas na letra "d" representam etapas de uma transação digital e simbolizam a evolução da moeda brasileira para o ambiente digital.',
          'A transição de cores nas setas, do azul para verde claro, passa a mensagem de "transação concluída". Todos os elementos reforçam a ideia de agilidade da moeda digital do Banco Central, o Drex.',
          'Veja mais casos de usos testados no LIFT Challenge Real Digital e exemplos práticos em Perguntas e Respostas oficiais do Drex.',
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
          'Drex is the official central bank digital currency (CBDC) of the Central Bank of Brazil (Digital Real). The name Drex combines letters into a modern, memorable word: "d" and "r" reference the Digital Real, "e" stands for electronic, and "x" conveys connection and distributed-ledger technology.',
          'Drex enables a wide range of secure financial transactions involving tokenized digital assets. These operations are settled within the Central Bank’s integrated and standardized Drex Platform.',
          'To access the Drex Platform, users interact through an authorized financial intermediary such as a commercial bank, which converts deposits from a checking account into a digital Drex wallet for safe settlement of tokenized assets.',
        ],
      },
      {
        id: 'infraestrutura-smart-contracts',
        title: 'Security Infrastructure & Smart Contract Execution',
        paragraphs: [
          'Services on the Drex Platform run on an integrated, standardized DLT infrastructure engineered so transactions execute only when every required condition is satisfied, delivering predictability and legal certainty for all counterparties.',
          'Drex democratizes access to digital-economy financial infrastructure, making asset transfers simpler, faster, and safer.',
          'Practical example of atomic settlement: When buying a vehicle, a buyer may worry about paying before ownership is transferred. With Drex, the smart contract settles only when both payment and title transfer are ready—so money and ownership change hands simultaneously, or both revert automatically if either side fails.',
        ],
      },
      {
        id: 'identidade-visual-drex',
        title: 'Visual Concept & Brand Identity',
        paragraphs: [
          'Drex’s visual identity evokes the digital financial ecosystem and aligns with the Central Bank’s structural modernization program, Agenda BC#.',
          'The two arrows embedded inside the letter "d" represent the stages of a digital transaction and symbolize the evolution of the Brazilian currency.',
          'The color gradient transitioning from blue to light green communicates "transaction completed," reinforcing the agility and finality of Brazil’s official digital currency.',
          'Additional pilot use cases were tested under the LIFT Challenge Real Digital and documented in the Central Bank’s official Drex Q&A.',
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
          'El Drex es la moneda digital oficial del Banco Central de Brasil (Real Digital). El nombre Drex combina letras en una palabra moderna: la "d" y la "r" remiten al Real Digital, la "e" proviene de electrónico y la "x" aporta la idea de conexión tecnológica.',
          'El Drex permitirá realizar diversos tipos de transacciones financieras seguras con activos digitales, liquidadas dentro de la Plataforma Drex del Banco Central en un entorno integrado y estandarizado.',
          'Para acceder a la Plataforma Drex se requiere un intermediario financiero autorizado, como un banco, que transferirá fondos de la cuenta bancaria a la billetera digital Drex del usuario.',
        ],
      },
      {
        id: 'infraestrutura-smart-contracts',
        title: 'Infraestructura de Seguridad y Ejecución (Smart Contracts)',
        paragraphs: [
          'Los servicios en la Plataforma Drex operan sobre una infraestructura integrada y estandarizada diseñada para garantizar que las operaciones se completen únicamente cuando se cumplen todas las condiciones pactadas, aportando previsibilidad y seguridad.',
          'El Drex democratizará el acceso a la economía digital, haciendo las transacciones financieras más simples, eficientes y seguras.',
          'Ejemplo práctico de liquidación atómica: Al comprar un automóvil, el contrato inteligente garantiza que el pago y la transferencia de propiedad se ejecuten de forma simultánea; si una de las partes falla, el dinero y el bien regresan automáticamente a sus titulares.',
        ],
      },
      {
        id: 'identidade-visual-drex',
        title: 'Concepto Visual e Identidad de Marca',
        paragraphs: [
          'El concepto visual de la marca Drex remite al universo digital y refleja la agenda de modernización financiera impulsada por el Banco Central, la Agenda BC#.',
          'Las dos flechas integradas en la letra "d" representan las etapas de una transacción digital y simbolizan la evolución de la moneda brasileña.',
          'La transición de color de azul a verde claro transmite el mensaje de "transacción concluida", reforzando la agilidad de la moneda digital oficial.',
          'Diversos casos de uso adicionales fueron probados en el LIFT Challenge Real Digital y recopilados en las Preguntas y Respuestas oficiales del Drex.',
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
          'O Capítulo denominado “Diálogos” estabelece mecanismos de cooperação entre o Mercosul e a União Europeia em temas como bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana e segurança alimentar. O objetivo é trocar informações, harmonizar abordagens regulatórias e promover pesquisa colaborativa, criando subcomitês e grupos de trabalho com representantes técnicos de ambas as partes.',
        ],
      },
      {
        id: 'defesa-comercial',
        title: '7. Defesa Comercial',
        paragraphs: [
          'O capítulo de defesa comercial reafirma as obrigações contidas nos Acordos da OMC sobre o tema, garantindo o direito de adotar medidas antidumping, medidas compensatórias e salvaguardas globais, determinando que eventuais disputas sejam submetidas ao sistema de solução de controvérsias da OMC.',
        ],
      },
      {
        id: 'salvaguardas-bilaterais',
        title: '8. Salvaguardas Bilaterais e Anexo de Veículos',
        paragraphs: [
          'O Capítulo de Salvaguardas bilaterais fundamenta-se nas melhores práticas internacionais, protegendo as partes contra surtos de importação decorrentes da liberalização que causem ou ameacem causar prejuízo grave às indústrias domésticas. Vigência de até 2 anos (prorrogáveis por igual período) e medidas provisórias de até 200 dias (conduzidas no Brasil pelo Departamento de Defesa Comercial do MDIC).',
          'Anexo X.A (Setor Automotivo): Ao aplicar salvaguarda bilateral para veículos, uma parte poderá suspender o cronograma de desgravação ou retomar a alíquota aplicável às demais origens por um período de 3 anos (renovável por mais 2 anos) sem compensação, além de medida provisória de até 270 dias, mediante comprovação de dano material ou ameaça à indústria doméstica.',
        ],
      },
      {
        id: 'servicos-investimentos',
        title: '9. Serviços e Investimentos',
        paragraphs: [
          'O tratamento do comércio de serviços e de investimentos está contido em um só capítulo, ampliando transparência e segurança jurídica. Estabelece compromissos de tratamento nacional, acesso a mercados e movimentação temporária de profissionais.',
          'Contém disciplinas para regulamentação doméstica de serviços, serviços financeiros (preservando prerrogativas prudenciais e permitindo transferência de dados para processamento no exterior), telecomunicações (marcos regulatórios competitivos), serviços postais e comércio eletrônico (documentos eletrônicos, assinaturas e combate ao spam).',
          'Lista Brasileira: O Brasil assumiu compromissos em setores como telecomunicações, serviços financeiros, construção, engenharia, arquitetura, publicidade, distribuição, varejo, consultoria e informática, excluindo expressamente setores sensíveis e estratégicos como defesa, saúde, educação, mineração e extração de petróleo.',
        ],
      },
      {
        id: 'transacoes-correntes',
        title: '10. Transações Correntes e Movimentos de Capitais',
        paragraphs: [
          'Estabelece regras para a livre movimentação de capitais e pagamentos correntes entre os blocos, permitindo medidas excepcionais e temporárias em caso de dificuldades financeiras (consistentes com as normas do FMI) e garantindo a aplicação de leis nacionais de insolvência e combate à lavagem de dinheiro de forma não discriminatória.',
        ],
      },
      {
        id: 'compras-governamentais',
        title: '11. Compras Governamentais',
        paragraphs: [
          'Tem como objetivo promover maior integração econômico-comercial. Garante às empresas brasileiras acesso ao mercado de compras públicas da União Europeia (que representou 13,7% do PIB do bloco em 2020, totalizando EUR 2,4 bilhões, com destaque para máquinas, equipamentos, eletroeletrônicos, obras públicas, arquitetura, engenharia, publicidade, serviços de construção e financeiros).',
          'O Brasil incluiu aquisições federais e estaduais, mas excluiu expressamente de sua oferta políticas de fomento e desenvolvimento industrial, tais como: margens de preferência para produtos/serviços nacionais, encomendas tecnológicas, compensação comercial, compras do Sistema Único de Saúde (SUS), incentivos a Micro e Pequenas Empresas e apoio a produtores rurais.',
        ],
      },
      {
        id: 'propriedade-intelectual',
        title: '12. Propriedade Intelectual e Indicações Geográficas (IGs)',
        paragraphs: [
          'Cobre direitos de autor, patentes, marcas, desenhos industriais e IGs, preservando os compromissos do Acordo TRIPS (sem extensão de patentes ou proteção adicional de dados clínicos).',
          'Reconhecimento Mútuo de Indicações Geográficas: 37 indicações geográficas brasileiras passarão a ser protegidas na UE, incluindo "Cachaça", queijo "Canastra" e os vinhos e espumantes do "Vale dos Vinhedos", com trâmite ágil para novas IGs. O MERCOSUL reconheceu 358 IGs europeias, garantindo prazos de readequação e direitos aos produtores locais de boa-fé.',
        ],
      },
      {
        id: 'pmes',
        title: '13. Pequenas e Médias Empresas (PMEs)',
        paragraphs: [
          'Dedica ações específicas para PMEs, incluindo programas de capacitação, facilitação na integração em cadeias globais de valor, participação em licitações públicas, formação de joint ventures, parcerias e redes empresariais.',
        ],
      },
      {
        id: 'defesa-concorrencia',
        title: '14. Defesa da Concorrência',
        paragraphs: [
          'Reitera o compromisso de combater práticas anticompetitivas em consonância com as legislações nacionais e estabelece bases para cooperação entre autoridades competentes.',
        ],
      },
      {
        id: 'subsidios',
        title: '15. Subsídios',
        paragraphs: [
          'Permite subsídios para alcançar objetivos de políticas públicas, reconhecendo a necessidade de cooperação para melhorar a transparência, coordenar posições na OMC e trocar informações sobre sistemas de controle de subsídios que possam distorcer o comércio.',
        ],
      },
      {
        id: 'empresas-estatais',
        title: '16. Empresas Estatais',
        paragraphs: [
          'O capítulo busca estabelecer um equilíbrio entre a atuação comercial e o papel público das empresas estatais. Ele determina que essas empresas devem, em regra, operar com base em critérios comerciais, promovendo condições mais justas e competitivas no mercado. Contudo, reconhece a importância de sua natureza especial, permitindo que atuem fora dessas bases sempre que necessário para cumprir mandatos ou objetivos de interesse público e serviços públicos sob sua responsabilidade. No caso do Brasil, as disposições aplicam-se respeitando o marco institucional nacional.',
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
          'Establishes ongoing bilateral working groups covering food safety, agricultural biotech, antimicrobial stewardship, and regulatory cooperation between technical agencies.',
        ],
      },
      {
        id: 'defesa-comercial',
        title: '7. Trade Remedies',
        paragraphs: [
          'Reaffirms WTO rights and obligations regarding anti-dumping, countervailing duties, and global safeguards, keeping disputes under WTO settlement procedures.',
        ],
      },
      {
        id: 'salvaguardas-bilaterais',
        title: '8. Bilateral Safeguards & Vehicles Annex',
        paragraphs: [
          'Allows temporary tariff suspension (up to 2 years, extendable once) and provisional measures up to 200 days if liberalization causes or threatens serious injury to domestic industry.',
          'Annex X.A (Automotive): Permits suspending tariff phase-outs on vehicles for up to 3 years (renewable for 2 years) without compensation, plus provisional remedies up to 270 days.',
        ],
      },
      {
        id: 'servicos-investimentos',
        title: '9. Services & Investment',
        paragraphs: [
          'Unifies services trade and investment rules, guaranteeing national treatment, market access, and temporary movement of business professionals.',
          'Covers domestic regulation, financial services (preserving prudential oversight and cross-border data processing), telecoms, postal services, and e-commerce.',
          'Brazil’s Schedule: Opens telecoms, financial services, engineering, construction, retail, IT, and consulting while explicitly carving out defense, public healthcare, education, mining, and oil extraction.',
        ],
      },
      {
        id: 'transacoes-correntes',
        title: '10. Current Payments & Capital Movements',
        paragraphs: [
          'Guarantees free movement of capital and current-account payments between blocs while permitting temporary IMF-consistent safeguards during balance-of-payments stress and upholding AML/insolvency laws.',
        ],
      },
      {
        id: 'compras-governamentais',
        title: '11. Government Procurement',
        paragraphs: [
          'Grants Brazilian firms access to the EU public procurement market (13.7% of EU GDP), spanning machinery, electronics, engineering, public works, and financial services.',
          'Brazil included federal and state tenders while explicitly excluding industrial preference margins, technological orders, public healthcare (SUS) purchases, SME incentives, and family-farming programs.',
        ],
      },
      {
        id: 'propriedade-intelectual',
        title: '12. Intellectual Property & Geographical Indications (GIs)',
        paragraphs: [
          'Covers copyright, patents, trademarks, industrial designs, and GIs while upholding TRIPS flexibilities with no patent-term extensions.',
          'Mutual GI Recognition: Protects 37 Brazilian GIs in the EU—including "Cachaça", "Canastra" cheese, and "Vale dos Vinhedos" wines—while MERCOSUR recognizes 358 European GIs with grandfathering for good-faith local producers.',
        ],
      },
      {
        id: 'pmes',
        title: '13. Small & Medium-Sized Enterprises (SMEs)',
        paragraphs: [
          'Includes dedicated capacity-building, value-chain integration, public-tender onboarding, and cross-border partnership programs tailored for SMEs.',
        ],
      },
      {
        id: 'defesa-concorrencia',
        title: '14. Competition Policy',
        paragraphs: [
          'Reaffirms commitments against anti-competitive conduct under domestic laws and fosters cooperation between competition authorities.',
        ],
      },
      {
        id: 'subsidios',
        title: '15. Subsidies',
        paragraphs: [
          'Permits public-policy subsidies while enhancing transparency, WTO coordination, and information sharing on trade-distorting support.',
        ],
      },
      {
        id: 'empresas-estatais',
        title: '16. State-Owned Enterprises (SOEs)',
        paragraphs: [
          'Balances commercial neutrality with public-service mandates: SOEs generally operate on commercial terms, while retaining flexibility when fulfilling statutory public-interest obligations under domestic institutional frameworks.',
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
          'Establece grupos técnicos bilaterales de cooperación en inocuidad alimentaria, biotecnología, resistencia antimicrobiana y armonización regulatoria.',
        ],
      },
      {
        id: 'defesa-comercial',
        title: '7. Defensa Comercial',
        paragraphs: [
          'Reafirma derechos y obligaciones de la OMC en materia de antidumping, medidas compensatorias y salvaguardias globales.',
        ],
      },
      {
        id: 'salvaguardas-bilaterais',
        title: '8. Salvaguardias Bilaterales y Anexo Automotor',
        paragraphs: [
          'Protege contra aumentos súbitos de importaciones con salvaguardias de hasta 2 años (prorrogables) y medidas provisionales de hasta 200 días.',
          'Anexo X.A (Automotor): Permite suspender desgravaciones en vehículos hasta 3 años (renovables 2 años) sin compensación y medidas provisionales de hasta 270 días.',
        ],
      },
      {
        id: 'servicos-investimentos',
        title: '9. Servicios e Inversiones',
        paragraphs: [
          'Reúne reglas de servicios e inversiones con trato nacional, acceso a mercados y movilidad temporal de profesionales.',
          'Incluye servicios financieros, telecomunicaciones, servicios postales y comercio electrónico.',
          'Lista Brasileña: Incluye telecomunicaciones, finanzas, construcción, ingeniería, comercio, TI y consultoría, excluyendo defensa, salud pública, educación, minería y extracción petrolera.',
        ],
      },
      {
        id: 'transacoes-correntes',
        title: '10. Transacciones Corrientes y Movimientos de Capital',
        paragraphs: [
          'Garantiza la libre circulación de capitales y pagos corrientes, permitiendo salvaguardias temporales consistentes con el FMI y respetando leyes contra el lavado de dinero.',
        ],
      },
      {
        id: 'compras-governamentais',
        title: '11. Compras Públicas',
        paragraphs: [
          'Brinda acceso a licitaciones públicas de la UE (13,7% del PIB europeo) en maquinaria, electrónica, obras, ingeniería y servicios financieros.',
          'Brasil incluyó compras federales y estatales excluyendo márgenes de preferencia industrial, compras del SUS, apoyo a MiPymes y agricultura familiar.',
        ],
      },
      {
        id: 'propriedade-intelectual',
        title: '12. Propiedad Intelectual e Indicaciones Geográficas (IGs)',
        paragraphs: [
          'Abarca derechos de autor, patentes, marcas, diseños industriales e IGs respetando el Acuerdo TRIPS sin extensión de patentes.',
          'Reconocimiento Mutuo: Protege 37 IGs brasileñas en la UE —como "Cachaça", queso "Canastra" y vinos de "Vale dos Vinhedos"— y 358 IGs europeas en el MERCOSUR.',
        ],
      },
      {
        id: 'pmes',
        title: '13. Pequeñas y Medianas Empresas (PyMEs)',
        paragraphs: [
          'Contempla programas de capacitación, integración en cadenas globales de valor, acceso a licitaciones y redes empresariales para PyMEs.',
        ],
      },
      {
        id: 'defesa-concorrencia',
        title: '14. Defensa de la Competencia',
        paragraphs: [
          'Reitera el combate a prácticas anticompetitivas y fortalece la cooperación entre autoridades de competencia.',
        ],
      },
      {
        id: 'subsidios',
        title: '15. Subsidios',
        paragraphs: [
          'Permite subsidios de políticas públicas reforzando la transparencia, la coordinación en la OMC y el intercambio de información.',
        ],
      },
      {
        id: 'empresas-estatais',
        title: '16. Empresas Estatales',
        paragraphs: [
          'Equilibra la actuación comercial y el mandato público de las empresas estatales, respetando los marcos institucionales nacionales.',
        ],
      },
    ],
  },
};
