import type { SupportedLanguage } from '../i18n/translations';

export interface DailyInsightLocalized {
  tag: string;
  title: string;
  summary: string;
  dateAuthor: string;
  source: string;
  imageAlt: string;
  readingTime?: string;
  keywords?: string[];
  fullContent: string[];
}

export interface DailyInsightItem {
  id: string;
  isoDate?: string;
  imageUrl: string;
  translations: Record<SupportedLanguage, DailyInsightLocalized>;
}

export const MAX_DAILY_INSIGHTS = 12;

export const DAILY_INSIGHTS_UI_COPY: Record<
  SupportedLanguage,
  {
    sectionTitle: string;
    sectionBadge: string;
    readMoreLabel: string;
    sourceLabel: string;
    closeModalLabel: string;
    editorialNote: string;
  }
> = {
  pt: {
    sectionTitle: 'Insights do Dia',
    sectionBadge: 'Editorial DinhEuro',
    readMoreLabel: 'Ler síntese',
    sourceLabel: 'Fonte de referência',
    closeModalLabel: 'Fechar leitura',
    editorialNote: 'Sínteses analíticas sobre câmbio, bolsas e comércio exterior • Redação DinhEuro',
  },
  en: {
    sectionTitle: 'Daily Insights',
    sectionBadge: 'DinhEuro Editorial',
    readMoreLabel: 'Read synthesis',
    sourceLabel: 'Reference source',
    closeModalLabel: 'Close article',
    editorialNote: 'Analytical briefs on FX, global equities, and foreign trade • DinhEuro Editorial',
  },
  es: {
    sectionTitle: 'Insights del Día',
    sectionBadge: 'Editorial DinhEuro',
    readMoreLabel: 'Leer síntesis',
    sourceLabel: 'Fuente de referencia',
    closeModalLabel: 'Cerrar lectura',
    editorialNote: 'Síntesis analíticas sobre divisas, bolsas y comercio exterior • Redacción DinhEuro',
  },
};

export const DAILY_INSIGHTS_ITEMS: DailyInsightItem[] = [
  {
    id: 'pacote-fiscal-camara-dolar-divida-2026',
    isoDate: '2026-11-25',
    imageUrl: '/assets/aistudio/image_459c4fc4.png',
    translations: {
      pt: {
        tag: 'Política Fiscal & Câmbio',
        title:
          'Pacote Fiscal na Câmara e a Montanha-Russa do Dólar: Por que o Câmbio Reverteu Parte da Queda',
        summary:
          'Após a aprovação do ajuste fiscal por 353 votos a 128, o dólar recuou até R$ 5,80 pela manhã, fechou a R$ 5,91 e o Ibovespa virou para o negativo. Entenda o impacto real do alívio de até R$ 56 bilhões frente à conta de R$ 1,2 trilhão em juros.',
        dateAuthor: '25/11/2026 • Redação DinhEuro',
        source:
          'Referências institucionais: Câmara dos Deputados, Tesouro Nacional, IFI/Senado e Boletim Prisma Fiscal',
        readingTime: '4 min',
        keywords: [
          'pacote fiscal camara 353 votos',
          'dolar 5 91 ibovespa hoje',
          'divida bruta pib tesouro nacional',
          'pec despesas obrigatorias 2027',
          'conta de juros 1 2 trilhao',
        ],
        imageAlt:
          'Plenário da Câmara dos Deputados em Brasília durante sessão de votação do pacote de ajuste fiscal com painel eletrônico exibindo apuração',
        fullContent: [
          'Síntese DinhEuro sobre a sessão legislativa e a reação dos mercados: a aprovação do pacote de ajuste fiscal na Câmara dos Deputados por 353 votos a 128 — mantendo integralmente o texto vindo do Senado — provocou forte alívio inicial na abertura do pregão de terça-feira (24), levando o dólar comercial para perto de R$ 5,80 pela manhã e impulsionando o Ibovespa em mais de 1%.',
          '## Por que o dólar devolveu parte da queda e o Ibovespa virou',
          'Ao longo da tarde, porém, mesas institucionais recalcularam o alcance estrutural do projeto. Com impacto estimado em até R$ 56 bilhões para 2027 — menos de 0,5% do PIB — e forte peso em receitas e revisão de renúncias, enquanto cerca de 92% do Orçamento segue engessado em gastos obrigatórios, o dólar devolveu parte do recuo e fechou a R$ 5,91 (-0,3%), ao passo que o Ibovespa perdeu tração e encerrou no negativo pressionado por Vale e Petrobras.',
          '## PEC dos gastos obrigatórios e peso da conta de juros',
          'Os agentes financeiros passaram a condicionar uma melhora sustentável da curva de juros e do câmbio ao avanço da próxima etapa em Brasília — uma PEC voltada a despesas obrigatórias com economia adicional estimada em R$ 20 bilhões para 2027 —, às indicações técnicas para o Banco Central e à trajetória da dívida bruta (82,9% do PIB, ou R$ 11,1 trilhões), pressionada por uma conta de juros de R$ 1,2 trilhão em doze meses.',
        ],
      },
      en: {
        tag: 'Fiscal Policy & FX',
        title:
          'Fiscal Package in Brazil’s Lower House and the Dollar Rollercoaster: Why FX Reversed Part of Its Drop',
        summary:
          'DinhEuro Synthesis: Following a 353–128 vote passing the fiscal bill, the U.S. dollar fell toward R$ 5.80 in the morning before rebounding to close at R$ 5.91 as the Ibovespa turned negative. See how up to R$ 56 billion in 2027 savings compares with a R$ 1.2 trillion interest bill.',
        dateAuthor: 'Nov 25, 2026 • DinhEuro Editorial',
        source:
          'Institutional references: Chamber of Deputies, National Treasury, Senate IFI, and Prisma Fiscal Survey',
        readingTime: '4 min read',
        keywords: [
          'brazil fiscal package chamber vote',
          'usd brl 5 91 ibovespa reversal',
          'brazil gross debt gdp treasury',
          'mandatory spending pec 2027',
          'brazil debt interest cost',
        ],
        imageAlt:
          'Chamber of Deputies plenary floor in Brasília during the fiscal package vote with the electronic tally board displayed',
        fullContent: [
          'DinhEuro synthesis of the legislative vote and market reaction: after Brazil’s Chamber of Deputies passed the fiscal adjustment package by 353 votes to 128—preserving the Senate text unchanged—Tuesday’s session (24) opened with sharp risk relief, pushing USD/BRL down toward R$ 5.80 in morning trading while lifting the Ibovespa over 1%.',
          '## Why USD/BRL trimmed losses and the Ibovespa turned negative',
          'During afternoon trading, institutional desks reassessed the structural reach of the bill. With 2027 fiscal relief estimated at up to R$ 56 billion—under 0.5% of GDP—and relying heavily on revenue measures while roughly 92% of federal spending remains mandatory, the U.S. dollar pared intraday losses to close at R$ 5.91 (-0.3%) and the Ibovespa reversed into the red amid declines in Vale and Petrobras.',
          '## Mandatory-spending PEC and the R$ 1.2 trillion interest burden',
          'Investors now tie durable curve and currency compression to a follow-up constitutional amendment targeting mandatory outlays (estimated at R$ 20 billion for 2027), technical Central Bank board nominations, and gross public debt dynamics (82.9% of GDP, or R$ 11.1 trillion) weighed down by R$ 1.2 trillion in 12-month debt-service costs.',
        ],
      },
      es: {
        tag: 'Política Fiscal y Divisas',
        title:
          'Paquete Fiscal en Diputados y la Montaña Rusa del Dólar: Por qué el Tipo de Cambio Revirtió Parte de la Caída',
        summary:
          'Síntesis DinhEuro: Tras aprobarse el ajuste por 353 votos contra 128, el dólar retrocedió hasta R$ 5,80 por la mañana, cerró en R$ 5,91 y el Ibovespa pasó a terreno negativo. Claves del alivio de hasta R$ 56 mil millones frente a R$ 1,2 billones en intereses.',
        dateAuthor: '25/11/2026 • Redacción DinhEuro',
        source:
          'Referencias institucionales: Cámara de Diputados, Tesoro Nacional, IFI/Senado y Boletín Prisma Fiscal',
        readingTime: '4 min',
        keywords: [
          'paquete fiscal diputados brasil',
          'dolar 5 91 ibovespa cierre',
          'deuda bruta pib tesoro nacional',
          'pec gastos obligatorios 2027',
          'costo intereses deuda brasil',
        ],
        imageAlt:
          'Plenario de la Cámara de Diputados en Brasilia durante la votación del paquete fiscal con el tablero electrónico de resultados',
        fullContent: [
          'Síntesis de DinhEuro sobre la votación parlamentaria y el ajuste de mercado: la aprobación del paquete fiscal en la Cámara de Diputados por 353 votos a 128 —manteniendo íntegro el texto del Senado— generó un alivio inicial en la apertura del martes (24), llevando al dólar cerca de R$ 5,80 por la mañana y al Ibovespa a subir más de 1%.',
          '## Por qué el dólar moderó la baja y el Ibovespa retrocedió',
          'Por la tarde, los operadores recalibraron el alcance estructural de las medidas. Con un alivio estimado en hasta R$ 56 mil millones para 2027 —menos de 0,5% del PIB— apoyado principalmente en recaudación y revisión de beneficios fiscales mientras el 92% del presupuesto es obligatorio, el dólar cerró en R$ 5,91 (-0,3%) y el Ibovespa terminó en negativo presionado por Vale y Petrobras.',
          '## Próxima PEC de gastos obligatorios y el peso de los intereses',
          'El mercado condiciona una caída sostenida del dólar y las tasas futuras al avance de una nueva PEC sobre gastos obligatorios (estimada en R$ 20 mil millones para 2027), a designaciones técnicas en el Banco Central y al control de la deuda bruta (82,9% del PIB o R$ 11,1 billones) ante un costo financiero anual de R$ 1,2 billones.',
        ],
      },
    },
  },
  {
    id: 'nvidia-retorno-jensen-huang-ceo-2026',
    isoDate: '2026-11-23',
    imageUrl: '/assets/aistudio/image_41c94597.png',
    translations: {
      pt: {
        tag: 'Empresas & Wall St',
        title: 'Nvidia anuncia retorno de Jensen Huang ao cargo de CEO',
        summary:
          'Síntese DinhEuro: A reintegração unânime do cofundador reverte parte do prêmio de incerteza em semicondutores, impulsionando a ação em quase 29% (US$ 161,24) e influenciando o apetite por risco na Nasdaq e no dólar global.',
        dateAuthor: '23/11/2026 • Redação DinhEuro',
        source: 'Referência jornalística: CNN Brasil • São Paulo (Vitória Gomez)',
        readingTime: '3 min',
        keywords: [
          'nvidia retorno jensen huang ceo',
          'jensen huang nvda ações alta',
          'conselho nvidia colette kress',
          'semicondutores nasdaq dolar',
          'governanca controle exportacoes eua',
        ],
        imageAlt:
          'Jensen Huang, cofundador e CEO da Nvidia, durante apresentação sobre semicondutores e inteligência artificial',
        fullContent: [
          'Análise da Redação DinhEuro a partir de informações divulgadas pela CNN Brasil (São Paulo): a decisão unânime do Conselho de Administração da Nvidia de reintegrar o cofundador Jensen Huang à presidência executiva e ao conselho, sucedendo o período interino da CFO Colette Kress, encerra um vácuo de liderança que vinha pressionando o setor global de tecnologia desde a renúncia de 12 de novembro.',
          '## Governança corporativa e leitura de risco regulatório',
          'Sob a ótica de governança, o mercado precificou positivamente a criação de dois comitês independentes: um dedicado a apurar as alegações envolvendo executiva da Megaspeed (Singapura) e outro focado exclusivamente em Segurança Nacional e Controle de Exportações. Embora a administração descarte riscos imediatos à segurança nacional, a continuidade das apurações sobre conformidade exportadora nos EUA — reforçada por declarações do presidente Donald Trump — mantém o tema geopolítico no radar dos investidores.',
          '## Impacto em Wall Street, Nasdaq e câmbio',
          'A reação imediata em Nova York, com salto superior a 30% no pré-mercado e alta de quase 29% perto de US$ 161,24 no intradia, ajuda a recompor múltiplos da cadeia de inteligência artificial e semicondutores no S&P 500 e na Nasdaq. Quando ativos líderes de tecnologia recuperam liquidez compradora, o apetite por risco global tende a se fortalecer, aliviando parte da demanda defensiva por dólar e favorecendo fluxos para bolsas emergentes como a B3.',
        ],
      },
      en: {
        tag: 'Companies & Wall St',
        title: 'Nvidia announces Jensen Huang’s return as CEO',
        summary:
          'DinhEuro Synthesis: The Board’s unanimous reinstatement of Nvidia’s co-founder strips out part of the semiconductor governance risk premium, lifting shares nearly 29% to US$ 161.24 and supporting broader Nasdaq risk appetite.',
        dateAuthor: 'Nov 23, 2026 • DinhEuro Editorial',
        source: 'Journalistic reference: CNN Brasil • São Paulo (Vitória Gomez)',
        readingTime: '3 min read',
        keywords: [
          'nvidia jensen huang returns ceo',
          'nvda stock surges 29 percent',
          'nvidia board harvey jones colette kress',
          'semiconductors nasdaq risk appetite',
          'us export controls governance',
        ],
        imageAlt:
          'Jensen Huang, co-founder and CEO of Nvidia, speaking during a semiconductor and artificial intelligence presentation',
        fullContent: [
          'DinhEuro Editorial synthesis based on reporting by CNN Brasil (São Paulo): the unanimous decision by Nvidia’s Board of Directors to reinstate co-founder Jensen Huang as president, CEO, and director—following CFO Colette Kress’s interim tenure—resolves the leadership uncertainty that had weighed on global technology valuations since his November 12 resignation.',
          '## Corporate governance and export-compliance oversight',
          'Institutional investors focused closely on the Board’s creation of two independent committees: one continuing the inquiry tied to an executive at Singapore-based Megaspeed and a dedicated National Security and Export Control Committee. While directors stated Huang’s return poses no national security risk, remarks from President Donald Trump urging ongoing scrutiny of U.S. export controls keep regulatory oversight central to semiconductor risk pricing.',
          '## Market impact across Wall Street and emerging FX',
          'With shares jumping over 30% in pre-market trading and holding near +29% around US$ 161.24 intraday, Nvidia’s rebound restores valuation support across AI infrastructure suppliers on the S&P 500 and Nasdaq. Stronger mega-cap tech momentum typically lowers safe-haven dollar demand and improves cross-border flows into risk assets, including B3 equities.',
        ],
      },
      es: {
        tag: 'Empresas y Wall St',
        title: 'Nvidia anuncia el regreso de Jensen Huang al cargo de CEO',
        summary:
          'Síntesis DinhEuro: La reincorporación unánime del cofundador reduce la prima de incertidumbre en semiconductores, impulsando la acción casi un 29% hasta US$ 161,24 y favoreciendo el apetito por riesgo en el Nasdaq.',
        dateAuthor: '23/11/2026 • Redacción DinhEuro',
        source: 'Referencia periodística: CNN Brasil • São Paulo (Vitória Gomez)',
        readingTime: '3 min',
        keywords: [
          'nvidia regreso jensen huang ceo',
          'acciones nvidia nvda alza',
          'consejo nvidia colette kress',
          'semiconductores nasdaq dolar',
          'controles exportacion eeuu',
        ],
        imageAlt:
          'Jensen Huang, cofundador y CEO de Nvidia, durante una presentación sobre semiconductores e inteligencia artificial',
        fullContent: [
          'Análisis de la Redacción DinhEuro a partir de información publicada por CNN Brasil (São Paulo): la decisión unánime del Consejo de Administración de Nvidia de reincorporar a Jensen Huang como CEO y consejero —tras el interinato de la CFO Colette Kress— cierra la incertidumbre de liderazgo abierta tras su renuncia del 12 de noviembre.',
          '## Gobernanza y vigilancia sobre controles de exportación',
          'Para los inversores institucionales resultó clave la creación de dos comités independientes: uno para proseguir la investigación vinculada a una ejecutiva de Megaspeed (Singapur) y un Comité de Seguridad Nacional y Control de Exportaciones. Pese a descartar riesgos inmediatos, los pedidos de Donald Trump para mantener la vigilancia sobre exportaciones tecnológicas sostienen el factor regulatorio en el radar.',
          '## Impacto en Wall Street y monedas emergentes',
          'El repunte superior al 30% previo a la apertura y cercano al 29% intradiario (US$ 161,24) recompone el ánimo en toda la cadena de IA del Nasdaq y el S&P 500. Un mayor apetito por riesgo en Wall Street suele moderar la demanda defensiva de dólar y aliviar presiones sobre divisas y bolsas emergentes como la B3.',
        ],
      },
    },
  },
  {
    id: 'cop31-fracasso-antalia-cinco-fatores-2026',
    isoDate: '2026-11-23',
    imageUrl: '/assets/aistudio/image_71c949d8.png',
    translations: {
      pt: {
        tag: 'Geopolítica, Energia & Clima',
        title: 'Entenda as cinco razões que levaram ao fracasso da COP31',
        summary:
          'Síntese DinhEuro: O encerramento sem acordo em Antália expõe o choque entre transição energética, crise de oferta de petróleo no Estreito de Ormuz e o pacto de derivados em Shenzhen — vetor direto de volatilidade para energia, inflação e exportações sustentáveis.',
        dateAuthor: '23/11/2026 • Por Américo Martins',
        source: 'Referência autoral: Américo Martins • Especialista em jornalismo internacional, ex-diretor da BBC de Londres e VP de Conteúdo da CNN',
        readingTime: '4 min',
        keywords: [
          'fracasso cop31 antalia turquia',
          'eletrificacao combustiveis fosseis cop31',
          'estreito de ormuz petroleo crise energetica',
          'shenzhen trump xi putin petroleo',
          'transicao energetica commodities comercio',
        ],
        imageAlt:
          'Letreiro oficial da Conferência das Nações Unidas sobre Mudanças Climáticas (COP31) na entrada do centro de convenções em Antália, na Turquia',
        fullContent: [
          'Síntese analítica da Redação DinhEuro com base na cobertura e análise internacional de Américo Martins: a conferência do clima mais longa da história encerrou-se em 22 de novembro em Antália, na Turquia, sem consenso final após duas semanas de impasses e dois dias de prorrogação.',
          '## Os cinco vetores do impasse em Antália',
          'O levantamento aponta cinco causas combinadas para o esvaziamento da cúpula: (1) baixa ambição inicial já evidente desde os encontros preparatórios de junho em Bonn; (2) presidência inédita dividida entre Turquia e Austrália, ambos países fortemente dependentes do carvão; (3) prioridade turca em metas de eletrificação (35% do consumo global até 2035) acompanhada da retirada de referências aos combustíveis fósseis no rascunho de quinta-feira (19), rejeitada pela União Europeia; (4) choques energéticos decorrentes das guerras na Ucrânia e no Irã com bloqueios no Estreito de Ormuz; e (5) a declaração conjunta em Shenzhen, onde Donald Trump, Xi Jinping e Vladimir Putin sinalizaram expansão da oferta de derivados de petróleo.',
          '## Reflexos econômicos para energia, inflação e comércio exterior',
          'Do ponto de vista macroeconômico, o impasse em Antália reforça a fragmentação regulatória entre blocos. Enquanto os EUA e grandes produtores priorizam segurança de oferta fóssil no curto prazo, a União Europeia tende a intensificar barreiras climáticas unilaterais em fronteira e exigências de rastreabilidade verde — fator estratégico para exportadores brasileiros de agronegócio, aço, etanol e minerais críticos no eixo Mercosul–UE.',
          'Nos mercados financeiros, a persistência de prêmios de risco no petróleo Brent eleva a sensibilidade das expectativas de inflação global, influenciando a trajetória dos juros do Fed e do BCE, as ações do setor energético na B3 e o comportamento das moedas ligadas a commodities como o Real.',
          'Autor de referência: Américo Martins — Especialista em jornalismo internacional e fascinado pelo mundo desde sempre, foi diretor da BBC de Londres e VP de Conteúdo da CNN.',
        ],
      },
      en: {
        tag: 'Geopolitics, Energy & Climate',
        title: 'Understanding the five reasons behind the collapse of COP31',
        summary:
          'DinhEuro Synthesis: The deadlock in Antalya underscores the clash between climate transition goals, Strait of Hormuz oil shocks, and the Shenzhen petroleum pledge—directly impacting energy prices, global inflation bets, and green trade rules.',
        dateAuthor: 'Nov 23, 2026 • By Américo Martins',
        source: 'Authored reference: Américo Martins • International journalism specialist, former Director at BBC London and VP of Content at CNN',
        readingTime: '4 min read',
        keywords: [
          'cop31 antalya collapse reasons',
          'electrification fossil fuels cop31',
          'strait of hormuz oil energy crisis',
          'shenzhen trump xi putin oil pledge',
          'energy commodities trade implications',
        ],
        imageAlt:
          'Official United Nations Climate Change Conference (COP31) signage outside the summit venue in Antalya, Turkey',
        fullContent: [
          'DinhEuro Editorial synthesis drawing on international reporting and analysis by Américo Martins: the longest UN climate summit on record concluded on November 22 in Antalya, Turkey, without a final agreement after two weeks of negotiations and two days of overtime.',
          '## Five structural drivers of the Antalya deadlock',
          'Five converging pressures undermined consensus: (1) muted ambition carried over from deadlocked June preparatory talks in Bonn; (2) an unprecedented split presidency between coal-reliant Turkey and Australia; (3) Turkey’s push for a 35%-by-2035 electrification headline alongside a Thursday (19) draft removing fossil-fuel phaseout language—promptly rejected by the European Union; (4) energy shocks tied to wars in Ukraine and Iran and Strait of Hormuz disruptions; and (5) a joint Shenzhen statement by Donald Trump, Xi Jinping, and Vladimir Putin pledging expanded petroleum-derivative output.',
          '## Economic impact on oil, inflation, and EU–Mercosur trade',
          'For global markets and trade policy, the breakdown signals deeper regulatory divergence. While major hydrocarbon producers emphasize near-term fossil supply security, the European Union is likely to lean more heavily on unilateral border carbon adjustments and deforestation-traceability mandates—heightening compliance relevance for Brazilian agribusiness, ethanol, metals, and critical-mineral exporters.',
          'Across asset classes, persistent geopolitical premia in Brent crude sustain inflation tail risks, weighing on Fed and ECB easing paths, B3 energy equities, and commodity-linked currencies such as the Brazilian real.',
          'Reference author: Américo Martins — Specialist in international journalism with a lifelong fascination for global affairs; former Director at BBC London and VP of Content at CNN.',
        ],
      },
      es: {
        tag: 'Geopolítica, Energía y Clima',
        title: 'Las cinco razones que llevaron al fracaso de la COP31',
        summary:
          'Síntesis DinhEuro: El cierre sin acuerdo en Antalya refleja el choque entre la transición climática, las tensiones petroleras en el estrecho de Ormuz y la señal de Shenzhen, con efectos directos sobre energía, inflación y comercio exterior.',
        dateAuthor: '23/11/2026 • Por Américo Martins',
        source: 'Referencia autoral: Américo Martins • Especialista en periodismo internacional, exdirector de la BBC de Londres y VP de Contenido de CNN',
        readingTime: '4 min',
        keywords: [
          'fracaso cop31 antalya turquia',
          'electrificacion combustibles fosiles cop31',
          'estrecho de ormuz petroleo crisis energetica',
          'shenzhen trump xi putin petroleo',
          'energia inflacion comercio exterior',
        ],
        imageAlt:
          'Letrero oficial de la Conferencia de las Naciones Unidas sobre el Cambio Climático (COP31) en Antalya, Turquía',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro basada en la cobertura internacional de Américo Martins: la conferencia climática más larga de la historia cerró el 22 de noviembre en Antalya, Turquía, sin consenso tras dos semanas de deliberaciones y dos días de prórroga.',
          '## Los cinco vectores del bloqueo en Antalya',
          'Cinco factores convergieron en el desenlace: (1) escasa ambición inicial tras las trabas ya visibles en las reuniones previas de Bonn; (2) una presidencia dividida entre Turquía y Australia, ambas con alta dependencia del carbón; (3) la prioridad turca por metas de electrificación (35% hacia 2035) junto a un borrador del jueves (19) sin mención al fin de los fósiles, rechazado por la Unión Europea; (4) la crisis energética agravada por las guerras en Ucrania e Irán y los cierres en el estrecho de Ormuz; y (5) el comunicado conjunto en Shenzhen de Donald Trump, Xi Jinping y Vladimir Putin prometiendo ampliar la oferta de derivados del petróleo.',
          '## Implicaciones sobre energía, tasas y exportaciones',
          'En el plano económico, el fracaso profundiza la fragmentación normativa internacional. Frente a prioridades de seguridad energética fósil en EE. UU. y productores petroleros, la Unión Europea tiende a reforzar sus mecanismos fronterizos de carbono y trazabilidad verde —aspecto clave para exportadores del Mercosur hacia Europa en agroindustria, biocombustibles y metales—.',
          'En los mercados, la prima geopolítica sobre el crudo Brent condiciona las expectativas de inflación mundial, las decisiones de la Fed y el BCE, la cotización de petroleras en B3 y el desempeño del real brasileño.',
          'Autor de referencia: Américo Martins — Especialista en periodismo internacional y apasionado por el mundo desde siempre; fue director de la BBC de Londres y VP de Contenido de CNN.',
        ],
      },
    },
  },
  {
    id: 'acordo-comercial-ue-mercosul-2026',
    isoDate: '2026-11-21',
    imageUrl: '/assets/aistudio/image_0205078f.png',
    translations: {
      pt: {
        tag: 'Comércio Exterior & Acordo UE–Mercosul',
        title:
          'Acordo comercial UE–Mercosul: por que é importante e quais os impactos econômicos projetados até 2040',
        summary:
          'Síntese DinhEuro: A aplicação provisória desde 1º de maio de 2026 integra um mercado de 700 milhões de consumidores, com ganhos projetados de € 77,6 bilhões no PIB europeu até 2040 e efeito estrutural sobre o fluxo EUR/BRL, tarifas industriais e cadeias verdes.',
        dateAuthor: '21/11/2026 • Redação DinhEuro',
        source: 'Referência oficial: Comissão Europeia • Acordo Comercial UE–Mercosul',
        readingTime: '5 min',
        keywords: [
          'acordo comercial ue mercosul 2026',
          'exportações agroalimentares ue 2040',
          'matérias-primas críticas nióbio mercosul',
          'indicações geográficas segurança alimentar ue',
          'tarifas automóveis máquinas compras públicas',
        ],
        imageAlt:
          'Navio porta-contêineres cruzando ponte simbólica com as bandeiras de Argentina, Brasil, Paraguai, Uruguai e União Europeia representando o acordo comercial UE–Mercosul',
        fullContent: [
          'Síntese da Redação DinhEuro sobre as projeções oficiais da Comissão Europeia: com a entrada em vigor provisória em 1º de maio de 2026, o eixo comercial entre a União Europeia e Argentina, Brasil, Paraguai e Uruguai consolida uma área de aproximadamente 700 milhões de consumidores, redefinindo custos tarifários e fluxos de investimento direto entre os dois blocos.',
          '## Desgravação industrial, minerais críticos e compras públicas',
          'As estimativas oficiais da Comissão Europeia projetam até 2040 acréscimo superior a € 77,6 bilhões no PIB europeu, alta de 39% nas exportações anuais da UE (até € 50 bilhões) e suporte a até 600 mil empregos. A redução gradual de alíquotas sobre automóveis (antes até 35%), máquinas (14%–20%) e farmacêuticos (até 14%) tende a economizar mais de € 4 bilhões anuais para empresas europeias, ao mesmo tempo em que amplia a concorrência tecnológica e o acesso a bens de capital no Mercosul.',
          'Em insumos estratégicos para a transição energética e digital, o bloco sul-americano responde por 82% do nióbio importado pela UE para ímãs supercondutores e equipamentos médicos. Paralelamente, a abertura recíproca de licitações públicas — incluindo o mercado federal brasileiro acima de € 8 bilhões anuais — cria novas oportunidades de parceria em infraestrutura.',
          '## Projeções agroalimentares até 2040 e salvaguardas',
          'No setor agroalimentar europeu, o corte de tarifas em vinhos e destilados (até 35%), chocolates (20%) e azeite (até 31,5%) sustenta projeção de alta próxima a 50% nas exportações setoriais até 2040, acompanhada de proteção às Indicações Geográficas e de cotas calibradas para itens sensíveis (1,5% para carne bovina e 1,3% para aves em relação à produção total da UE), além de uma rede de segurança de € 6,3 bilhões.',
          'Ganhos esperados com a redução das tarifas até 2040 - Prevê-se que a maioria dos setores agrícolas da UE aumente as suas exportações',
          '![Ganhos esperados com a redução das tarifas até 2040 - Prevê-se que a maioria dos setores agrícolas da UE aumente as suas exportações](/assets/aistudio/expected-gains-from-redu_9daa9c58.png)',
          'O gráfico oficial projeta expansão de 54% em Bebidas (de 395 para 605), 37% em Frutas e vegetais (de 135 para 185), 21% em Óleos vegetais (de 152 para 185) e 102% em Laticínios (de 42 para 85). Para o câmbio EUR/BRL e a balança comercial brasileira, a maior integração tende a diversificar receitas em euro e elevar o peso de exigências sanitárias e ambientais do Acordo de Paris nas cadeias exportadoras.',
        ],
      },
      en: {
        tag: 'International Trade & EU–Mercosur',
        title:
          'The EU–Mercosur trade agreement: why it matters and projected economic gains by 2040',
        summary:
          'DinhEuro Synthesis: Provisional entry into force on May 1, 2026 connects 700 million consumers, projecting over €77.6 billion in EU GDP gains by 2040 while reshaping EUR/BRL trade settlement, industrial tariffs, and critical-mineral chains.',
        dateAuthor: 'Nov 21, 2026 • DinhEuro Editorial',
        source: 'Official reference: European Commission • EU–Mercosur Trade Agreement',
        readingTime: '5 min read',
        keywords: [
          'eu mercosur trade agreement 2026',
          'eu agricultural exports 2040',
          'critical raw materials niobium mercosur',
          'geographical indications food safety eu',
          'tariffs cars machinery public procurement',
        ],
        imageAlt:
          'Container vessel passing beneath an illustrated bridge displaying the flags of Argentina, Brazil, Paraguay, Uruguay, and the European Union symbolizing the EU–Mercosur trade accord',
        fullContent: [
          'DinhEuro Editorial synthesis of European Commission impact projections: following provisional application starting May 1, 2026, the commercial corridor linking the European Union with Argentina, Brazil, Paraguay, and Uruguay integrates roughly 700 million consumers and reshapes bilateral capital-goods and commodity flows.',
          '## Industrial tariff relief, critical raw materials, and procurement',
          'European Commission modeling projects over €77.6 billion in additional EU GDP, a 39% expansion in annual EU exports (up to €50 billion), and support for up to 600,000 European jobs by 2040. Phasing down high duties on vehicles (up to 35%), machinery (14%–20%), and pharmaceuticals (up to 14%) is estimated to save EU firms over €4 billion annually while lowering capital-equipment import costs in Mercosur.',
          'Supply-chain resilience is equally central: Mercosur provides 82% of the niobium imported by the EU for superconducting magnets and medical imaging, while reciprocal access to public tenders—including Brazil’s federal procurement market worth over €8 billion a year—supports bilateral infrastructure investment.',
          '## Agri-food 2040 projections and sensitive-sector quotas',
          'Across European agri-food exports, tariff cuts on wine and spirits (up to 35%), chocolate (20%), and olive oil (up to 31.5%) anchor a projected near-50% rise in sector shipments by 2040, paired with Geographical Indication protections, tight quotas on beef (1.5%) and poultry (1.3% of EU production), and a €6.3 billion farm safety net.',
          'Expected gains from reduced tariffs by 2040 – Most EU agricultural sectors are projected to increase their exports',
          '![Expected gains from reduced tariffs by 2040 – Most EU agricultural sectors are projected to increase their exports](/assets/aistudio/expected-gains-from-redu_9daa9c58.png)',
          'Category projections point to gains of +54% in Beverages (395 to 605), +37% in Fruit and vegetables (135 to 185), +21% in Vegetable oils (152 to 185), and +102% in Dairy products (42 to 85). For EUR/BRL commercial flows, deeper bilateral settlement broadens euro-denominated trade receipts alongside stricter sanitary and Paris-aligned sustainability audits.',
        ],
      },
      es: {
        tag: 'Comercio Exterior y Acuerdo UE–Mercosur',
        title:
          'El acuerdo comercial UE–Mercosur: por qué es importante y proyecciones económicas al 2040',
        summary:
          'Síntesis DinhEuro: La aplicación provisional desde el 1 de mayo de 2026 integra un mercado de 700 millones de personas, proyectando más de € 77,6 mil millones en el PIB europeo al 2040 con efecto directo sobre el comercio en euros y cadenas estratégicas.',
        dateAuthor: '21/11/2026 • Redacción DinhEuro',
        source: 'Referencia oficial: Comisión Europea • Acuerdo Comercial UE–Mercosul',
        readingTime: '5 min',
        keywords: [
          'acuerdo comercial ue mercosur 2026',
          'exportaciones agroalimentarias ue 2040',
          'materias primas criticas niobio mercosur',
          'indicaciones geograficas seguridad alimentaria ue',
          'aranceles automoviles maquinaria compras publicas',
        ],
        imageAlt:
          'Buque portacontenedores cruzando bajo un puente ilustrado con las banderas de Argentina, Brasil, Paraguay, Uruguay y la Unión Europea en alusión al acuerdo comercial UE–Mercosur',
        fullContent: [
          'Síntesis de la Redacción DinhEuro sobre las proyecciones oficiales de la Comisión Europea: con su entrada en vigor provisional el 1 de mayo de 2026, el corredor comercial entre la Unión Europea y Argentina, Brasil, Paraguay y Uruguay enlaza a unos 700 millones de consumidores y reordena las corrientes arancelarias y de inversión.',
          '## Desgravación industrial, materias primas críticas y compras públicas',
          'Las estimaciones oficiales proyectan hacia 2040 un aporte superior a € 77,6 mil millones al PIB europeo, un avance del 39% en exportaciones anuales de la UE (hasta € 50 mil millones) y respaldo para hasta 600.000 empleos. La rebaja gradual en automóviles (antes hasta 35%), maquinaria (14%–20%) y farmacéuticos (hasta 14%) generará ahorros superiores a € 4 mil millones anuales, abaratando bienes de capital en el Mercosur.',
          'En insumos críticos para la transición verde y digital, el Mercosur abastece el 82% del niobio utilizado por la UE en imanes superconductores y equipos médicos, al tiempo que la apertura de licitaciones —incluido el mercado federal brasileño de más de € 8 mil millones anuales— impulsa proyectos conjuntos.',
          '## Proyecciones agroalimentarias al 2040 y resguardos',
          'En el segmento agroalimentario, los recortes en vinos y espirituosas (hasta 35%), chocolate (20%) y aceite de oliva (hasta 31,5%) sustentan un aumento proyectado cercano al 50% en exportaciones europeas al 2040, combinado con protección de Indicaciones Geográficas, cuotas acotadas en carne bovina (1,5%) y aves (1,3%) y una red de seguridad de € 6,3 mil millones.',
          'Ganancias esperadas con la reducción de aranceles hasta 2040 – Se prevé que la mayoría de los sectores agrícolas de la UE aumenten sus exportaciones',
          '![Ganancias esperadas con la reducción de aranceles hasta 2040 – Se prevé que la mayoría de los sectores agrícolas de la UE aumenten sus exportaciones](/assets/aistudio/expected-gains-from-redu_9daa9c58.png)',
          'Las proyecciones sectoriales destacan alzas en Bebidas (+54%, de 395 a 605), Frutas y hortalizas (+37%, de 135 a 185), Aceites vegetales (+21%, de 152 a 185) y Lácteos (+102%, de 42 a 85), diversificando los flujos comerciales en euros para las economías del Mercosur bajo exigentes estándares sanitarios y ambientales.',
        ],
      },
    },
  },
  {
    id: 'mdic-consulta-publica-salvaguardas-bilaterais-2026',
    isoDate: '2026-11-20',
    imageUrl: '/assets/aistudio/image_74407743.png',
    translations: {
      pt: {
        tag: 'Comércio Exterior & Defesa Comercial',
        title:
          'MDIC abre consulta pública sobre regulamentação de salvaguardas bilaterais',
        summary:
          'Síntese DinhEuro: A regulamentação procedimental sob o Decreto nº 12.866/2026 cria o rito operacional para proteger a indústria nacional diante de surtos de importação na vigência do acordo Mercosul–UE e de novos tratados comerciais.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'Referência oficial: Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC / SECEX)',
        readingTime: '3 min',
        keywords: [
          'mdic consulta pública salvaguardas bilaterais',
          'portaria secex defesa comercial 2026',
          'decreto 12866 salvaguardas bilaterais',
          'acordo mercosul união europeia decom camex',
          'comércio exterior proteção indústria nacional',
        ],
        imageAlt:
          'Fachada institucional do Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC) em Brasília com as bandeiras do Brasil e do ministério',
        fullContent: [
          'Análise da Redação DinhEuro com base em comunicado oficial do MDIC/SECEX: a abertura de consulta pública de 15 dias sobre a minuta de Portaria das salvaguardas bilaterais consolida o arcabouço operacional iniciado com o Decreto nº 12.866, de 4 de março de 2026, com publicação prevista ainda neste ano.',
          '## Segurança jurídica para a indústria na transição tarifária',
          'Na prática do comércio exterior, a salvaguarda bilateral funciona como válvula de segurança temporária sempre que a redução tarifária de um acordo de livre comércio — como o tratado Mercosul–União Europeia — provocar aumento abrupto de importações que cause ou ameace causar prejuízo grave à produção doméstica.',
          'A minuta disciplina fluxos de petição, produção de provas, sigilo comercial, prazos de medidas provisórias e definitivas e revisões de prorrogação sob condução técnica do Departamento de Defesa Comercial (DECOM/SECEX) e deliberação da CAMEX.',
          '## Impacto sobre importadores, câmbio comercial e setores na B3',
          'Para companhias industriais listadas na B3, tradings e importadores que fecham contratos de câmbio comercial para bens europeus, a previsibilidade desse rito reduz incertezas regulatórias: protege cadeias sensíveis de manufatura local sem inviabilizar o cronograma geral de desgravação tarifária.',
        ],
      },
      en: {
        tag: 'Foreign Trade & Trade Defense',
        title:
          'MDIC opens public consultation on regulation of bilateral safeguards',
        summary:
          'DinhEuro Synthesis: Draft SECEX procedural rules under Decree No. 12,866/2026 establish Brazil’s operational toolkit to address import surges under the Mercosur–EU agreement and future trade treaties.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Official reference: Ministry of Development, Industry, Trade and Services (MDIC / SECEX)',
        readingTime: '3 min read',
        keywords: [
          'mdic bilateral safeguards public consultation',
          'secex trade defense ordinance 2026',
          'brazil decree 12866 bilateral safeguards',
          'mercosur eu trade agreement decom camex',
          'brazilian industry import surge protection',
        ],
        imageAlt:
          'Institutional facade of Brazil’s Ministry of Development, Industry, Trade and Services (MDIC) in Brasília with Brazilian and ministry flags',
        fullContent: [
          'DinhEuro Editorial synthesis based on official MDIC/SECEX releases: the 15-day public consultation on a draft bilateral-safeguards ordinance advances the regulatory framework introduced by Decree No. 12,866 of March 4, 2026, with final enactment scheduled for later this year.',
          '## Operational safeguard predictability during tariff phase-outs',
          'Bilateral safeguards act as a temporary safety valve whenever preferential tariff cuts under free-trade accords—including Mercosur–European Union—trigger sudden import surges that cause or threaten serious injury to domestic producers. Following an earlier call for stakeholder inputs between March and April 2026, the draft standardizes petitions, evidentiary standards, confidentiality rules, provisional remedies, and extension reviews overseen by DECOM/SECEX and CAMEX.',
          '## Relevance for Brazilian manufacturers, importers, and FX desks',
          'For B3-listed manufacturers, trading firms, and corporate FX buyers hedging European import invoices, clear procedural timelines minimize regulatory surprise—giving sensitive industrial segments structured relief while keeping broader bilateral tariff-reduction schedules intact.',
        ],
      },
      es: {
        tag: 'Comercio Exterior y Defensa Comercial',
        title:
          'El MDIC abre consulta pública sobre la reglamentación de salvaguardias bilaterales',
        summary:
          'Síntesis DinhEuro: El proyecto de ordenanza de la SECEX bajo el Decreto nº 12.866/2026 ordena el mecanismo operativo para contener alzas súbitas de importaciones bajo el acuerdo Mercosur–UE y futuros tratados.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'Referencia oficial: Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC / SECEX)',
        readingTime: '3 min',
        keywords: [
          'mdic consulta publica salvaguardias bilaterales',
          'ordenanza secex defensa comercial 2026',
          'decreto 12866 brasil salvaguardias',
          'acuerdo mercosur union europea decom camex',
          'comercio exterior industria brasilena',
        ],
        imageAlt:
          'Fachada institucional del Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC) en Brasilia con las banderas de Brasil y del ministerio',
        fullContent: [
          'Análisis de la Redacción DinhEuro sobre información oficial del MDIC/SECEX: la consulta pública de 15 días en torno al proyecto de ordenanza sobre salvaguardias bilaterales consolida la reglamentación del Decreto nº 12.866/2026, con publicación prevista aún en 2026.',
          '## Previsibilidad regulatoria frente a desgravaciones arancelarias',
          'Las salvaguardias bilaterales funcionan como resguardo temporal cuando la rebaja de aranceles en un tratado —como Mercosur–Unión Europea— genera aumentos bruscos de importaciones que dañan o amenazan a la producción nacional. El texto ordena peticiones, pruebas, confidencialidad, medidas provisionales y revisiones bajo competencia técnica del DECOM/SECEX y la CAMEX.',
          '## Efecto en empresas, importadores y comercio exterior',
          'Para industrias cotizadas en B3, operadores logísticos y empresas con compromisos en euros, contar con reglas procesales uniformes reduce la incertidumbre jurídica durante la transición arancelaria sin frenar la apertura comercial pactada.',
        ],
      },
    },
  },
  {
    id: 'anthropic-ipo-turbulencia-wall-street-2026',
    isoDate: '2026-11-20',
    imageUrl: '/assets/aistudio/image_31f7e667.png',
    translations: {
      pt: {
        tag: 'Empresas & Wall Street',
        title:
          'A busca por culpados começou após a turbulenta estreia da Anthropic no mercado de ações',
        summary:
          'Síntese DinhEuro: A volatilidade do megadebut na Nasdaq (-8,5% no segundo pregão, para US$ 88,91) expõe o estresse de liquidez em big techs de IA após perdas de US$ 4 trilhões no índice e afeta o apetite global por risco e dólar.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'Referência jornalística: The Wall Street Journal (WSJ) • Nasdaq MarketSite',
        readingTime: '4 min',
        keywords: [
          'ipo anthropic nasdaq 2026',
          'ações anthropic queda wall street',
          'claude ia mercado financeiro',
          'liquidez nasdaq big techs',
          'bolsa americana inteligência artificial',
        ],
        imageAlt:
          'Pessoas observam anúncios da oferta pública inicial (IPO) da Anthropic na fachada do Nasdaq MarketSite em Nova York',
        fullContent: [
          'Síntese analítica da Redação DinhEuro com base em apuração do The Wall Street Journal (Corrie Driebusch, Kate Clark, Peter Rudegeair e Ben Dummett): após estrear avaliada em US$ 1,8 trilhão e levantar mais de US$ 100 bilhões somando oferta pública e venda simultânea, a Anthropic enfrentou forte realização no segundo dia na Nasdaq, recuando até 15% intradia — perto do piso do IPO — antes de fechar em queda de 8,5%, a US$ 88,91 (cerca de US$ 109 bilhões evaporados em valor de mercado).',
          '## Estrutura da oferta e pressão de oferta secundária',
          'O episódio ilustra como a mecânica de alocação influencia a formação de preço pós-IPO. Segundo a reportagem, mais da metade do lote de US$ 81 bilhões foi direcionada a acionistas prévios (como Altimeter, Lightspeed e Menlo Ventures) e grandes usuários institucionais, deixando cerca de 60% dos fundos solicitantes sem alocação e atendendo apenas metade da demanda estimada da BlackRock (~US$ 10 bilhões). Soma-se a isso a liberação imediata de ~300 milhões de ações de colaboradores (~US$ 26 bilhões no preço de estreia), o esgotamento rápido da opção de estabilização ("green shoe" de 15%) e a expectativa por outro destravamento semelhante em 15 de dezembro.',
          '## Efeitos em cadeia na Nasdaq, OpenAI e fluxos globais',
          'Com a companhia ainda sem lucro líquido e o setor pressionado por custos elevados de financiamento para data centers em nuvem, o tropeço amplificou a cautela em todo o ecossistema de IA — arrastando pares como Nvidia, Meta e Oracle em uma semana de perda combinada de US$ 4 trilhões na Nasdaq e elevando a régua para os planos de listagem da OpenAI. Em cenários de desalavancagem em Nova York, gestores globais costumam reforçar caixa em dólar e Treasuries, elevando a volatilidade de curto prazo sobre o Real e o Ibovespa.',
        ],
      },
      en: {
        tag: 'Companies & Wall Street',
        title:
          'Finger-pointing begins after Anthropic’s turbulent stock market debut',
        summary:
          'DinhEuro Synthesis: Day-two selling on the Nasdaq (-8.5% to US$ 88.91) highlights stretched AI valuations and tight post-IPO float mechanics amid a US$ 4 trillion tech pullback, spilling over into USD safe-haven flows.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Journalistic reference: The Wall Street Journal (WSJ) • Nasdaq MarketSite',
        readingTime: '4 min read',
        keywords: [
          'anthropic ipo nasdaq 2026',
          'anthropic stock drop wall street',
          'claude ai financial markets',
          'nasdaq liquidity selloff',
          'ai stocks valuation pressure',
        ],
        imageAlt:
          'Pedestrians looking up at Anthropic initial public offering banners outside the Nasdaq MarketSite in New York',
        fullContent: [
          'DinhEuro Editorial synthesis based on reporting by The Wall Street Journal (Corrie Driebusch, Kate Clark, Peter Rudegeair, and Ben Dummett): after debuting at a US$ 1.8 trillion valuation and raising over US$ 100 billion across its IPO and concurrent share sale, Anthropic tumbled as much as 15% intraday in its second Nasdaq session before closing down 8.5% at US$ 88.91—wiping out roughly US$ 109 billion in market value.',
          '## Allocation skew and early lock-up supply',
          'From a market-structure standpoint, the selloff reflected concentrated allocation and immediate secondary supply. Over half of the US$ 81 billion IPO pool reportedly went to existing backers such as Altimeter Capital, Lightspeed, and Menlo Ventures alongside major institutional clients like Citadel, shutting out ~60% of bidding funds and filling roughly half of BlackRock’s ~US$ 10 billion order. Immediate employee selling eligibility (~300 million shares, or ~US$ 26 billion at the IPO price), an already-exercised 15% green-shoe stabilization buffer, and another ~300 million shares unlocking on December 15 added technical overhang.',
          '## Spillover across tech multiples, OpenAI, and FX',
          'With Anthropic still unprofitable and cloud-borrowing costs elevated, day-two turbulence spread across Nvidia, Meta, and Oracle during a broader US$ 4 trillion Nasdaq valuation drawdown—complicating sentiment ahead of OpenAI’s prospective listing. Sharp Nasdaq drawdowns routinely trigger global risk-off rebalancing into the U.S. dollar and Treasuries, adding short-term headwinds to emerging currencies and B3 flows.',
        ],
      },
      es: {
        tag: 'Empresas y Wall Street',
        title:
          'Comienza la búsqueda de culpables tras el turbulento debut bursátil de Anthropic',
        summary:
          'Síntesis DinhEuro: El retroceso del 8,5% en el segundo día en el Nasdaq (US$ 88,91) expone tensiones de valoración y liquidez en IA tras una pérdida de US$ 4 billones en el índice, reforzando la cautela en divisas emergentes.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'Referencia periodística: The Wall Street Journal (WSJ) • Nasdaq MarketSite',
        readingTime: '4 min',
        keywords: [
          'opv anthropic nasdaq 2026',
          'acciones anthropic caida wall street',
          'claude ia mercado financiero',
          'liquidez nasdaq tecnologicas',
          'bolsa estadounidense inteligencia artificial',
        ],
        imageAlt:
          'Personas observando los anuncios de la oferta pública inicial de Anthropic frente al Nasdaq MarketSite en Nueva York',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro basada en información de The Wall Street Journal (Corrie Driebusch, Kate Clark, Peter Rudegeair y Ben Dummett): tras debutar valorada en US$ 1,8 billones y captar más de US$ 100 mil millones entre la OPV y la venta paralela de títulos, Anthropic cedió hasta un 15% intradiario en su segunda jornada en el Nasdaq y cerró con baja del 8,5% en US$ 88,91, borrando cerca de US$ 109 mil millones de capitalización.',
          '## Asignación institucional y oferta anticipada de títulos',
          'El movimiento puso bajo la lupa la estructura de colocación: más de la mitad de los US$ 81 mil millones ofertados quedó en inversores existentes y grandes clientes, dejando fuera al 60% de los fondos solicitantes y cubriendo solo la mitad del pedido de BlackRock (~US$ 10 mil millones). Además, la liberación inmediata de unos 300 millones de acciones de empleados (~US$ 26 mil millones), el uso ya agotado del "green shoe" del 15% y un nuevo desbloqueo previsto para el 15 de diciembre presionaron la cotización.',
          '## Contagio al Nasdaq y efecto sobre el dólar',
          'En un contexto de mayores costos financieros para centros de datos y ausencia de beneficios netos, la caída acompañó retrocesos en Nvidia, Meta y Oracle dentro de un ajuste de US$ 4 billones en el Nasdaq, enfriando el entorno rumbo a la futura salida a bolsa de OpenAI. Episodios de aversión al riesgo en Wall Street suelen fortalecer al dólar global y moderar flujos hacia mercados emergentes.',
        ],
      },
    },
  },
  {
    id: 'mdic-acordo-mercosul-ue-exportacoes-21-por-cento-2026',
    isoDate: '2026-11-21',
    imageUrl: '/assets/aistudio/image_fae53297.png',
    translations: {
      pt: {
        tag: 'Empresa, Indústria e Comércio',
        title:
          'Acordo Mercosul–União Europeia impulsiona em 21% exportações brasileiras beneficiadas ao mercado europeu',
        summary:
          'Síntese DinhEuro: A alta de 21% nas exportações elegíveis entre maio e setembro de 2026 comprova ganho imediato de competitividade na pauta agroindustrial e elétrica rumo à Europa, fortalecendo a entrada de euros na balança comercial brasileira.',
        dateAuthor: '21/11/2026 • Redação DinhEuro',
        source: 'Referência oficial: Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC)',
        readingTime: '3 min',
        keywords: [
          'acordo mercosul união europeia exportações',
          'mdic exportações brasil europa 2026',
          'comércio exterior mercosul ue',
          'portal siscomex regras de origem',
          'desgravação tarifária brasil europa',
        ],
        imageAlt:
          'Bandeiras do Mercosul e da União Europeia hasteadas diante de terminal portuário de contêineres simbolizando o avanço das exportações brasileiras',
        fullContent: [
          'Análise da Redação DinhEuro sobre balanço oficial do MDIC: nos primeiros cinco meses de vigência provisória do acordo comercial Mercosul–União Europeia (maio a setembro de 2026), os embarques brasileiros de mercadorias contempladas por preferências tarifárias avançaram 21% em comparação com igual intervalo de 2025.',
          '## Diversificação entre agroindústria e bens de maior valor agregado',
          'Os ganhos não se restringiram a commodities tradicionais. No segmento agroalimentar, destacaram-se abacates frescos (+421%), mel (+367%), óleo de milho (+266%), etanol (+95,2%), óleo essencial de laranja (+75,8%) e maçãs frescas (+29%). Na indústria de base e bens manufaturados, houve avanço em ferrossilício-manganês (+173%), alumínio em bruto (+107%), óleos combustíveis (+102%) e transformadores elétricos — que saltaram de zero para US$ 39 milhões no período.',
          '## Efeito prático no comércio exterior e fluxo de EUR/BRL',
          'Para exportadores apoiados pelos manuais de regras de origem e tabelas de desgravação do Portal Siscomex, o tratado amplia a diversificação geográfica da pauta brasileira em um mercado integrado de ~720 milhões de pessoas e PIB superior a US$ 22 trilhões. O aumento estrutural de receitas em euro tende a reforçar o saldo comercial do Brasil e reduzir a dependência exclusiva de ciclos em dólar.',
        ],
      },
      en: {
        tag: 'Business, Industry & Trade',
        title:
          'Mercosur–EU Agreement lifts tariff-benefited Brazilian exports to Europe by 21%',
        summary:
          'DinhEuro Synthesis: A 21% surge in eligible Brazilian shipments between May and September 2026 demonstrates early tariff competitiveness across agribusiness and electrical manufacturing, diversifying euro-denominated export receipts.',
        dateAuthor: 'Nov 21, 2026 • DinhEuro Editorial',
        source: 'Official reference: Ministry of Development, Industry, Trade and Services (MDIC)',
        readingTime: '3 min read',
        keywords: [
          'mercosur eu trade agreement exports',
          'brazil exports to europe 2026',
          'mdic siscomex rules of origin',
          'tariff elimination mercosur eu',
          'brazilian foreign trade',
        ],
        imageAlt:
          'Mercosur and European Union flags raised in front of a container port terminal symbolizing expanding Brazilian exports to Europe',
        fullContent: [
          'DinhEuro Editorial synthesis of official MDIC trade figures: during the first five months of provisional application of the Mercosur–European Union trade accord (May through September 2026), Brazilian exports of tariff-eligible products rose 21% year-on-year compared with the same window in 2025.',
          '## Broad-based gains across agribusiness and industrial equipment',
          'Detailed sector data show expansion well beyond bulk commodities: fresh avocados (+421%), honey (+367%), corn oil (+266%), ethanol (+95.2%), orange essential oil (+75.8%), and fresh apples (+29%) led agricultural growth, while industrial shipments accelerated in ferrosilicon-manganese (+173%), unwrought aluminum (+107%), fuel oils (+102%), and electrical transformers—which climbed from zero to US$ 39 million.',
          '## Implications for Brazil’s trade balance and EUR/BRL liquidity',
          'Supported by origin-compliance guides and tariff schedules published on the Siscomex Portal, Brazilian exporters are gaining traction across a 720-million-consumer transatlantic market exceeding US$ 22 trillion in combined GDP—diversifying export earnings in euros and cushioning Brazil’s external accounts.',
        ],
      },
      es: {
        tag: 'Empresa, Industria y Comercio',
        title:
          'El Acuerdo Mercosur–Unión Europea impulsa en 21% las exportaciones brasileñas beneficiadas hacia Europa',
        summary:
          'Síntesis DinhEuro: El aumento del 21% entre mayo y septiembre de 2026 confirma mejoras tempranas de competitividad en agroindustria y equipos eléctricos hacia Europa, fortaleciendo los ingresos comerciales en euros.',
        dateAuthor: '21/11/2026 • Redacción DinhEuro',
        source: 'Referencia oficial: Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC)',
        readingTime: '3 min',
        keywords: [
          'acuerdo mercosur union europea exportaciones',
          'mdic exportaciones brasil europa 2026',
          'comercio exterior mercosur ue',
          'portal siscomex reglas de origen',
          'desgravacion arancelaria brasil europa',
        ],
        imageAlt:
          'Banderas del Mercosur y la Unión Europea izadas frente a una terminal portuaria de contenedores simbolizando el crecimiento exportador hacia Europa',
        fullContent: [
          'Análisis de la Redacción DinhEuro sobre datos oficiales del MDIC: en los primeros cinco meses de aplicación provisional del Acuerdo Mercosur–Unión Europea (mayo a septiembre de 2026), las ventas brasileñas hacia Europa de bienes alcanzados por preferencias arancelarias crecieron un 21% interanual respecto al mismo tramo de 2025.',
          '## Impulso en agroalimentos y manufacturas eléctricas',
          'Entre los rubros agroindustriales sobresalieron aguacates frescos (+421%), miel (+367%), aceite de maíz (+266%), etanol (+95,2%), aceite esencial de naranja (+75,8%) y manzanas frescas (+29%). En el frente industrial avanzaron el ferrosilicio-manganeso (+173%), aluminio en bruto (+107%), aceites combustibles (+102%) y transformadores eléctricos, que pasaron de cero a US$ 39 millones.',
          '## Impacto cambiario y diversificación comercial',
          'Con el respaldo técnico del Portal Siscomex en reglas de origen e indicaciones geográficas, el acceso preferencial a una zona de 720 millones de habitantes y más de US$ 22 billones de PIB diversifica las exportaciones brasileñas y amplía la entrada estructural de divisas en euros.',
        ],
      },
    },
  },
  {
    id: 'trump-inteligencia-jensen-huang-nvidia-2026',
    isoDate: '2026-11-20',
    imageUrl: '/assets/aistudio/image_47a5c2bb.png',
    translations: {
      pt: {
        tag: 'Geopolítica & Tecnologia',
        title:
          'Por que Trump não tomou nenhuma providência em relação ao escândalo de manipulação de Jensen Huang?',
        summary:
          'Síntese DinhEuro: A tensão histórica entre a Casa Branca e a CIA ajuda a explicar por que alertas de contrainteligência sobre semicondutores demoram a se traduzir em sanções imediatas, mantendo prêmios de risco político sobre tecnologia e comércio EUA–China.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'Referência de opinião: Tevi Troy • Expressão Livre / Foto: Carolyn Kaster (AP)',
        readingTime: '4 min',
        keywords: [
          'trump jensen huang nvidia',
          'cia inteligência estados unidos',
          'howard lutnick comércio china',
          'risco geopolitico semicondutores',
          'tevi troy expressão livre',
        ],
        imageAlt:
          'Selo oficial da Agência Central de Inteligência dos Estados Unidos (CIA) ao lado da bandeira americana (Foto: Carolyn Kaster / Associated Press)',
        fullContent: [
          'Síntese analítica da Redação DinhEuro sobre artigo de opinião de Tevi Troy (Expressão Livre): ao examinar a lentidão inicial do governo Trump diante de alertas de inteligência envolvendo o executivo Jensen Huang e contatos ligados à China, o ensaio aponta um fator estrutural além da proximidade política ou de resistências na área comercial (citando o secretário Howard Lutnick): o desgaste acumulado entre presidentes americanos e a CIA ao longo de sete décadas.',
          '## Precedentes institucionais e desconfiança decisória',
          'A análise remonta a episódios clássicos que erodiram a confiança presidencial nas agências de espionagem — da Baía dos Porcos sob Kennedy às falhas estratégicas no Camboja (1970) e na Guerra do Yom Kippur (1973) sob Nixon, passando pelas investigações do Comitê Church na era Ford, pela surpresa com a Revolução Iraniana no governo Carter e pelas avaliações equivocadas sobre armas de destruição em massa no Iraque sob George W. Bush.',
          'Esse histórico, somado às fricções do primeiro mandato em torno do Russiagate, ajuda investidores a compreender por que informes sigilosos nem sempre geram reação regulatória automática em Washington.',
          '## Implicações para mercados de tecnologia, exportações e dólar',
          'Do ponto de vista financeiro, a coexistência entre ceticismo político e pressão por controle de exportações de chips avançados mantém elevada incerteza sobre big techs listadas nos EUA e cadeias globais de semicondutores, influenciando o apetite por risco na Nasdaq e a precificação geopolítica do dólar.',
        ],
      },
      en: {
        tag: 'Geopolitics & Technology',
        title:
          'Why did Trump take no action on the Jensen Huang handling scandal?',
        summary:
          'DinhEuro Synthesis: Historical friction between the White House and the CIA helps explain why counterintelligence warnings around semiconductor leaders rarely trigger immediate policy action, preserving political risk premia across U.S.–China tech trade.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Opinion reference: Tevi Troy • Free Expression / Photo: Carolyn Kaster (AP)',
        readingTime: '4 min read',
        keywords: [
          'trump jensen huang nvidia',
          'cia us intelligence community',
          'howard lutnick commerce china',
          'semiconductor geopolitical risk',
          'tevi troy analysis',
        ],
        imageAlt:
          'Official seal of the United States Central Intelligence Agency (CIA) beside the American flag (Photo: Carolyn Kaster / Associated Press)',
        fullContent: [
          'DinhEuro Editorial synthesis of an opinion essay by Tevi Troy (Free Expression): examining why the Trump administration hesitated to act on intelligence alerts concerning Nvidia leader Jensen Huang’s alleged China-linked contacts, the analysis points beyond personal rapport or Commerce Department pushback under Howard Lutnick to decades of presidential skepticism toward the CIA.',
          '## Seven decades of intelligence friction in Washington',
          'The essay traces how high-profile intelligence misses—from Kennedy’s Bay of Pigs to Nixon’s Cambodia and 1973 Yom Kippur surprises, the 1975–76 Church Committee disclosures under Ford, Carter’s Iran blind spot, and faulty pre-2003 Iraq WMD assessments—built enduring caution inside the Oval Office, compounded for President Trump by first-term Russiagate tensions.',
          '## Why it matters for markets and chip supply chains',
          'For global investors, that institutional tension underscores why geopolitical enforcement over advanced AI hardware can unfold unevenly—creating sudden regulatory headline risk for Nasdaq semiconductor names, U.S.–China trade negotiations, and safe-haven demand for the U.S. dollar.',
        ],
      },
      es: {
        tag: 'Geopolítica y Tecnología',
        title:
          '¿Por qué Trump no tomó ninguna medida ante el escándalo de captación de Jensen Huang?',
        summary:
          'Síntesis DinhEuro: La fricción histórica entre la Casa Blanca y la CIA explica por qué las alertas de inteligencia sobre semiconductores no derivan en sanciones automáticas, manteniendo prima de riesgo político en el eje EE. UU.–China.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'Referencia de opinión: Tevi Troy • Expressão Livre / Foto: Carolyn Kaster (AP)',
        readingTime: '4 min',
        keywords: [
          'trump jensen huang nvidia',
          'cia inteligencia estados unidos',
          'howard lutnick comercio china',
          'riesgo geopolitico semiconductores',
          'tevi troy analisis',
        ],
        imageAlt:
          'Sello oficial de la Agencia Central de Inteligencia de Estados Unidos (CIA) junto a la bandera estadounidense (Foto: Carolyn Kaster / Associated Press)',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro sobre un artículo de opinión de Tevi Troy (Expressão Livre): al analizar la demora inicial de la administración Trump ante alertas de inteligencia en torno a Jensen Huang y contactos vinculados a China, el ensayo señala —más allá de afinidades personales o del peso de Comercio bajo Howard Lutnick— el escepticismo acumulado de la Casa Blanca frente a la CIA.',
          '## Desgaste institucional entre presidentes y agencias',
          'El análisis repasa episodios históricos desde Bahía de Cochinos bajo Kennedy, Camboya y Yom Kippur con Nixon, el Comité Church bajo Ford, Irán en tiempos de Carter y las fallas sobre Irak en 2003, factores que junto al episodio del Russiagate explican la cautela presidencial ante informes de espionaje.',
          '## Lectura para tecnología y comercio internacional',
          'Para los mercados financieros, esta dinámica confirma que las decisiones sobre control de exportaciones de chips avanzados combinan política y seguridad nacional, sosteniendo episodios de volatilidad en el Nasdaq y en la demanda global de dólares.',
        ],
      },
    },
  },
  {
    id: 'terras-raras-disparidade-precos-brasil-china-2026',
    isoDate: '2026-11-20',
    imageUrl: '/assets/aistudio/image_c7f7f8fe.png',
    translations: {
      pt: {
        tag: 'Minerais Críticos & Commodities',
        title:
          'Preço de terras raras chega a ser quase 11 vezes maior na América do Norte do que na China e impulsiona projetos no Brasil',
        summary:
          'Síntese DinhEuro: A disparidade de quase 11x no óxido de disprósio (US$ 2.300/kg na América do Norte vs. US$ 215/kg na China) reposiciona o Brasil como rota estratégica para diversificar cadeias ocidentais de ímãs, atraindo capex em dólar e contratos de longo prazo.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'Referência setorial: S&P Global Energy • Minerais Críticos',
        readingTime: '4 min',
        keywords: [
          'terras raras brasil',
          'disprósio térbio preço',
          'serra verde usa rare earth',
          'caldeira colossus carina',
          'minerais críticos china ocidente',
        ],
        imageAlt:
          'Tabela periódica iluminada com os elementos de terras raras — incluindo térbio (Tb) e disprósio (Dy) — essenciais para ímãs permanentes e indústria de alta tecnologia',
        fullContent: [
          'Síntese analítica da Redação DinhEuro sobre relatório da S&P Global Energy: a concentração chinesa de aproximadamente 98% da capacidade global de separação e refino de disprósio e térbio — agravada por restrições de exportação desde abril de 2025 — abriu uma diferença de preços próxima de 10,7 vezes no óxido de disprósio entre a América do Norte (US$ 2.300/kg em julho de 2026, com frete e seguro) e a referência de exportação chinesa (US$ 215/kg), além de quase 5x no térbio (US$ 4.900/kg vs. US$ 1.005/kg).',
          '## O Brasil na corrida ocidental por minerais pesados',
          'Por abrigar argilas iônicas ricas em terras raras pesadas essenciais a veículos elétricos, turbinas eólicas e defesa, o Brasil emergiu como peça central fora da Ásia. A operação comercial da Serra Verde em Minaçu (GO) — adquirida pela norte-americana USA Rare Earth — já iniciou embarques e firmou contrato de ~15 anos com pisos de referência de US$ 575/kg (disprósio) e US$ 2.050/kg (térbio).',
          'Em paralelo, três projetos em estruturação somam mais de US$ 2 bilhões em investimentos e acordos potenciais: Caldeira (MG), alvo de acordo de aquisição de ~US$ 672 milhões pela Lynas Rare Earths (capex inicial de US$ 498 milhões e meta em 2028); Colossus (Poços de Caldas/MG), da Viridis Mining (capex de US$ 449 milhões e contrato mínimo de US$ 915 milhões até 2034 com a belga Solvay para refino na França); e Carina (Nova Roma/GO), da Aclara Resources, voltado a abastecer futura planta nos EUA a partir de 2029.',
          '## Impacto na balança comercial, IED e câmbio brasileiro',
          'Caso avancem do licenciamento à operação plena entre 2028 e 2029, esses empreendimentos tendem a elevar a entrada de Investimento Estrangeiro Direto (IED) em dólar e euro no Brasil, agregar valor mineral além do minério de ferro tradicional e inserir o país em cadeias industriais estratégicas dos EUA e da União Europeia.',
        ],
      },
      en: {
        tag: 'Critical Minerals & Commodities',
        title:
          'Rare earth prices reach nearly 11x China levels in North America, boosting outlook for Brazilian projects',
        summary:
          'DinhEuro Synthesis: A nearly 11x North America–China spread in dysprosium oxide (US$ 2,300/kg vs. US$ 215/kg) turns Brazil into a prime Western diversification hub for magnet supply chains, drawing multi-year dollar and euro capex.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Industry reference: S&P Global Energy • Critical Minerals',
        readingTime: '4 min read',
        keywords: [
          'brazil rare earths',
          'dysprosium terbium prices',
          'serra verde usa rare earth',
          'caldeira colossus carina',
          'critical minerals supply chain',
        ],
        imageAlt:
          'Illuminated periodic table highlighting rare earth elements—including terbium (Tb) and dysprosium (Dy)—crucial for permanent magnets and high-tech industries',
        fullContent: [
          'DinhEuro Editorial synthesis of S&P Global Energy research: China’s ~98% share of global dysprosium and terbium separation and refining—combined with export curbs tightened since April 2025—drove July 2026 delivered North American dysprosium oxide benchmarks to US$ 2,300/kg versus US$ 215/kg in China (10.7x), while terbium reached US$ 4,900/kg versus US$ 1,005/kg.',
          '## Brazil’s emerging role outside China',
          'Brazil’s ionic-clay deposits position the country as a key non-Chinese source of heavy rare earths used in EV motors, wind turbines, and defense. Serra Verde in Minaçu (GO)—acquired by USA Rare Earth—has already begun commercial shipments backed by a ~15-year offtake contract featuring floor prices of US$ 575/kg (dysprosium) and US$ 2,050/kg (terbium).',
          'Three pipeline developments add substantial scale subject to permitting and execution: Caldeira in Minas Gerais (targeted in a ~US$ 672M Lynas Rare Earths takeover, US$ 498M initial capex, 2028 target), Colossus in Poços de Caldas (US$ 449M initial capex and a US$ 915M minimum supply deal with Belgium’s Solvay through 2034 for refining in France), and Aclara’s Carina project in Goiás (targeted for 2029 to feed a U.S. separation plant).',
          '## Trade balance and FX implications',
          'Successful execution between 2028 and 2029 would attract sustained USD and EUR foreign direct investment into Brazil’s mining corridor and diversify mineral export receipts beyond traditional iron ore.',
        ],
      },
      es: {
        tag: 'Minerales Críticos y Commodities',
        title:
          'El precio de las tierras raras supera casi 11 veces al de China en Norteamérica e impulsa proyectos en Brasil',
        summary:
          'Síntesis DinhEuro: La brecha de casi 11x en óxido de disprosio (US$ 2.300/kg en Norteamérica frente a US$ 215/kg en China) posiciona a Brasil como polo estratégico para diversificar cadenas occidentales de imanes y atraer inversión extranjera.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'Referencia sectorial: S&P Global Energy • Minerales Críticos',
        readingTime: '4 min',
        keywords: [
          'tierras raras brasil',
          'disprosio terbio precio',
          'serra verde usa rare earth',
          'caldeira colossus carina',
          'minerales criticos china occidente',
        ],
        imageAlt:
          'Tabla periódica iluminada con los elementos de tierras raras —incluidos terbio (Tb) y disprosio (Dy)— esenciales para imanes permanentes y alta tecnología',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro sobre un informe de S&P Global Energy: el dominio chino de cerca del 98% del refinado mundial de disprosio y terbio, sumado a restricciones de exportación vigentes desde abril de 2025, llevó las cotizaciones de julio de 2026 en América del Norte a US$ 2.300/kg en disprosio frente a US$ 215/kg en China (~10,7 veces más) y a US$ 4.900/kg frente a US$ 1.005/kg en terbio.',
          '## Brasil como alternativa estratégica fuera de Asia',
          'Sus depósitos de arcillas iónicas ubican a Brasil en el centro de la diversificación occidental. Serra Verde en Minaçu (GO), adquirida por USA Rare Earth, ya inició embarques comerciales respaldados por un contrato a 15 años con pisos de US$ 575/kg (disprosio) y US$ 2.050/kg (terbio).',
          'Se suman tres proyectos en desarrollo: Caldeira en Minas Gerais (acuerdo de adquisición por US$ 672 millones con Lynas, inversión inicial de US$ 498 millones y meta 2028), Colossus de Viridis Mining (US$ 449 millones de inversión y contrato mínimo de US$ 915 millones hasta 2034 con la belga Solvay para refinación en Francia) y Carina de Aclara Resources en Goiás (meta 2029 rumbo a EE. UU.).',
          '## Impacto en divisas y balanza comercial',
          'Su concreción operativa consolidaría nuevos ingresos de inversión directa en dólares y euros hacia Brasil y ampliaría las exportaciones de minerales críticos hacia EE. UU. y la Unión Europea.',
        ],
      },
    },
  },
  {
    id: 'greves-jovens-europa-custo-vida-2026',
    isoDate: '2026-11-20',
    imageUrl: '/assets/aistudio/image_9efbf558.png',
    translations: {
      pt: {
        tag: 'Europa & Custo de Vida',
        title: 'Greves lideradas por jovens se espalham pela Europa',
        summary:
          'Síntese DinhEuro: A mobilização estudantil em mais de 25 países reflete a pressão do custo de vida e da disputa orçamentária entre gasto social e defesa na Zona do Euro e Reino Unido, influenciando o debate fiscal do BCE e ativos europeus.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'Referência jornalística: CNN / Reuters / Sky TG24 (Sana Noor Haq)',
        readingTime: '3 min',
        keywords: [
          'greves jovens europa',
          'custo de vida europa 2026',
          'politica fiscal zona do euro',
          'orcamento defesa educacao europa',
          'inflacao servicos bce euro',
        ],
        imageAlt:
          'Estudantes italianos reúnem-se em Roma para protestar contra a guerra e a disparada do custo de vida, exibindo faixa com os dizeres "I muri crollano, noi no" ("Os muros caem, nós não")',
        fullContent: [
          'Síntese analítica da Redação DinhEuro com base em despachos da CNN, Reuters e Sky TG24: as paralisações coordenadas por grupos estudantis em mais de 25 países — com adesão relevante em cidades alemãs (até 10 mil estudantes estimados em Colônia), italianas (Roma, Gênova, Bolonha e Milão) e britânicas (mais de 350 instituições de ensino) — colocam no centro do debate político a erosão do poder de compra dos jovens europeus.',
          '## Dilema fiscal entre custo de vida e rearmamento',
          'Os protestos combinam insatisfação com inflação persistente de habitação e ensino, desemprego juvenil, transição tecnológica impulsionada por IA e o contraste entre cortes em educação e expansão de orçamentos militares.',
          '## Reflexos para títulos soberanos, BCE e câmbio EUR/USD',
          'Para os mercados financeiros da Europa, pressões sociais desse porte estreitam a margem dos governos em Paris, Berlim, Roma e Londres para consolidar déficits sem reabrir concessões salariais ou subsídios sociais. Esse equilíbrio fiscal delicado tende a afetar o prêmio dos títulos públicos europeus (Bunds e BTPs), o ritmo de flexibilização do Banco Central Europeu e a competitividade do Euro frente ao Dólar e ao Real.',
        ],
      },
      en: {
        tag: 'Europe & Cost of Living',
        title: 'Youth-led strikes spread across Europe',
        summary:
          'DinhEuro Synthesis: Student walkouts across over 25 countries underscore cost-of-living strain and fiscal friction between social budgets and defense spending, feeding into sovereign yield spreads and ECB policy sensitivity.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Journalistic reference: CNN / Reuters / Sky TG24 (Sana Noor Haq)',
        readingTime: '3 min read',
        keywords: [
          'europe youth strikes',
          'europe cost of living 2026',
          'eurozone fiscal policy spreads',
          'defense spending social budgets',
          'ecb inflation euro outlook',
        ],
        imageAlt:
          'Italian students gather in Rome to protest against war and the soaring cost of living, holding a banner reading "I muri crollano, noi no" ("Walls crumble, we do not")',
        fullContent: [
          'DinhEuro Editorial synthesis based on reporting from CNN, Reuters, and Sky TG24: coordinated student demonstrations spanning more than 25 countries—drawing notable turnouts across Germany (up to 10,000 expected in Cologne), Italy (Rome, Genoa, Bologna, and Milan), and over 350 schools and universities in the United Kingdom—highlight mounting strain on household affordability across Europe.',
          '## Budget trade-offs: welfare, tuition, and defense',
          'Demonstrators link elevated living and tuition costs, youth labor-market anxiety, and AI disruption directly to national budget priorities as European governments balance education funding against higher defense outlays.',
          '## Implications for European yields, the ECB, and EUR/BRL',
          'In European capital markets, sustained social pressure narrows fiscal maneuvering room in Berlin, Rome, Paris, and London—complicating deficit-reduction paths, influencing Bund and BTP sovereign yields, and shaping ECB rate expectations that directly feed into EUR/USD and EUR/BRL pricing.',
        ],
      },
      es: {
        tag: 'Europa y Costo de Vida',
        title: 'Huelgas lideradas por jóvenes se extienden por Europa',
        summary:
          'Síntesis DinhEuro: Las protestas estudiantiles en más de 25 países reflejan la presión sobre el costo de vida y la tensión fiscal entre gasto social y defensa en Europa, con implicaciones para bonos soberanos y el Euro.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'Referencia periodística: CNN / Reuters / Sky TG24 (Sana Noor Haq)',
        readingTime: '3 min',
        keywords: [
          'huelgas jovenes europa',
          'costo de vida europa 2026',
          'politica fiscal zona euro',
          'presupuesto defensa educacion',
          'bce euro inflacion',
        ],
        imageAlt:
          'Estudiantes italianos se reúnen en Roma para protestar contra la guerra y el alza del costo de vida, con una pancarta que dice "I muri crollano, noi no" ("Los muros caen, nosotros no")',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro basada en reportes de CNN, Reuters y Sky TG24: las movilizaciones estudiantiles convocadas en más de 25 países —con marchas destacadas en Alemania (hasta 10.000 jóvenes previstos en Colonia), Italia (Roma, Génova, Bolonia y Milán) y más de 350 centros educativos del Reino Unido— exponen el desgaste del poder adquisitivo juvenil en Europa.',
          '## Tensión presupuestaria entre gasto social y defensa',
          'Las protestas conectan la carestía de la vivienda y las matrículas universitarias, el desempleo juvenil y el impacto de la automatización con el giro fiscal europeo hacia mayores presupuestos militares.',
          '## Efectos sobre la deuda europea y el tipo de cambio del Euro',
          'Para los mercados de renta fija y divisas, este malestar acota el margen de ajuste fiscal en las principales economías europeas, influyendo en las primas de riesgo soberano, la hoja de ruta del BCE y la cotización del Euro frente al Dólar y el Real.',
        ],
      },
    },
  },
  {
    id: 'coinbase-deribit-aquisicao-infraestrutura-2026',
    isoDate: '2026-11-20',
    imageUrl: '/assets/aistudio/image_312cc483.png',
    translations: {
      pt: {
        tag: 'Criptoativos & Mercado Institucional',
        title:
          'Coinbase e Deribit avançam na integração de infraestrutura após aquisição histórica de US$ 2,9 bilhões',
        summary:
          'Síntese DinhEuro: A unificação das plataformas em um motor de baixa latência consolida liquidez institucional em opções de criptoativos — alterando a formação de volatilidade do Bitcoin e destacando fronteiras regulatórias para residentes no Brasil.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'Referência institucional: Coinbase / Deribit • Mercado Global de Ativos Digitais',
        readingTime: '3 min',
        keywords: [
          'coinbase deribit aquisição',
          'opções de criptomoedas institucional',
          'derivativos criptoativos nasdaq',
          'baixa latência liquidez cripto',
          'regulacao cripto brasil derivativos',
        ],
        imageAlt:
          'Peças conectadas com os logotipos da Coinbase e da Deribit simbolizando a integração tecnológica das plataformas de ativos digitais',
        fullContent: [
          'Análise da Redação DinhEuro sobre a consolidação do mercado institucional de ativos digitais: um ano após a aquisição da Deribit pela Coinbase por cerca de US$ 2,9 bilhões (concluída em agosto de 2025), as duas operações avançam na integração tecnológica para unificar spot, custódia, stablecoins, futuros e opções em um único motor de execução de baixa latência.',
          '## Escala institucional, liquidez e precificação de risco',
          'A combinação reúne centenas de bilhões de dólares em volume trimestral de derivativos, concentrando liquidez de grandes mesas institucionais que utilizam opções para hedge direcional de Bitcoin e Ethereum. Em mercados financeiros globais, livros de ordens mais profundos tendem a comprimir spreads entre compra e venda e reduzir distorções repentinas de preço em momentos de estresse macroeconômico.',
          '## Enquadramento regulatório e mercado brasileiro',
          'À medida que diferentes jurisdições formalizam regras para ativos virtuais, a oferta de produtos varia por país: no Brasil, a Coinbase não disponibiliza serviços locais de derivativos a residentes, restringindo a atuação dessas opções e contratos perpétuos ao mercado internacional.',
        ],
      },
      en: {
        tag: 'Crypto Assets & Institutional Markets',
        title:
          'Coinbase and Deribit advance infrastructure integration following historic US$ 2.9 billion acquisition',
        summary:
          'DinhEuro Synthesis: Unifying both venues under a single low-latency matching engine deepens institutional crypto-options liquidity, shaping Bitcoin volatility pricing while underscoring jurisdictional rules such as Brazil’s derivatives restriction.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Institutional reference: Coinbase / Deribit • Global Digital Assets Market',
        readingTime: '3 min read',
        keywords: [
          'coinbase deribit acquisition',
          'crypto options institutional market',
          'digital asset derivatives nasdaq',
          'low latency crypto liquidity',
          'crypto m&a consolidation',
        ],
        imageAlt:
          'Interlocking pieces featuring the Coinbase and Deribit logos symbolizing the integration of their digital asset and derivatives platforms',
        fullContent: [
          'DinhEuro Editorial synthesis on institutional digital-asset infrastructure: one year after Nasdaq-listed Coinbase closed its roughly US$ 2.9 billion buyout of crypto-options leader Deribit (completed in August 2025), both platforms are converging onto a single low-latency matching engine combining spot, custody, stablecoins, futures, and options.',
          '## Institutional scale, order-book depth, and hedging flows',
          'Generating hundreds of billions of dollars in quarterly derivatives volume, the combined venue anchors institutional hedging across Bitcoin and Ethereum. Deeper centralized order books typically tighten bid-ask spreads and moderate abrupt liquidation spikes when macro volatility hits Wall Street.',
          '## Cross-border regulatory boundaries',
          'Product availability remains strictly governed by local regulation: in Brazil, Coinbase does not locally offer crypto derivatives to residents, keeping options, futures, and perpetual contracts confined to international jurisdictions.',
        ],
      },
      es: {
        tag: 'Criptoactivos y Mercado Institucional',
        title:
          'Coinbase y Deribit avanzan en la integración de infraestructura tras histórica adquisición de US$ 2.900 millones',
        summary:
          'Síntesis DinhEuro: La unificación en un motor de ejecución de baja latencia consolida la liquidez institucional en opciones cripto, influyendo en la volatilidad del Bitcoin bajo estrictos límites regulatorios por jurisdicción.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'Referencia institucional: Coinbase / Deribit • Mercado Global de Activos Digitales',
        readingTime: '3 min',
        keywords: [
          'coinbase deribit adquisicion',
          'opciones criptomonedas institucional',
          'derivados activos digitales nasdaq',
          'baja latencia liquidez cripto',
          'fusiones y adquisiciones cripto',
        ],
        imageAlt:
          'Piezas conectadas con los logotipos de Coinbase y Deribit simbolizando la integración tecnológica de sus plataformas globales',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro sobre la consolidación institucional en activos digitales: a un año de la adquisición de Deribit por parte de Coinbase por unos US$ 2.900 millones (cerrada en agosto de 2025), ambas compañías avanzan en la unificación tecnológica hacia un único motor de baja latencia que integra mercado contado, custodia, stablecoins, futuros y opciones.',
          '## Liquidez institucional y formación de volatilidad',
          'Con cientos de miles de millones de dólares en volumen trimestral de derivados, la infraestructura integrada refuerza las coberturas institucionales en Bitcoin y Ethereum, reduciendo diferenciales de precios ante episodios de volatilidad global.',
          '## Alcance regulatorio regional',
          'La oferta de derivados depende de cada marco nacional: en Brasil, Coinbase no ofrece servicios locales de derivados a residentes, manteniendo estos instrumentos exclusivamente en operaciones internacionales.',
        ],
      },
    },
  },
  {
    id: 'aladi-cosmeticos-exportacao-brasil-2026',
    isoDate: '2026-11-18',
    imageUrl: '/assets/aistudio/image_559daecb.png',
    translations: {
      pt: {
        tag: 'Comércio Exterior & Economia Regional',
        title:
          'Comércio Exterior: Brasil Simplifica Exportação de Cosméticos para a América Latina via Acordo da Aladi',
        summary:
          'Síntese DinhEuro: A internalização do acordo sanitário da Aladi reduz custos não tarifários em um mercado regional de US$ 55 bilhões que já absorve 76,3% das exportações brasileiras do setor, impulsionando margens de PMEs exportadoras.',
        dateAuthor: '18/11/2026 • Redação DinhEuro',
        source: 'Referência oficial: MDIC / MRE / Anvisa / Aladi',
        readingTime: '3 min',
        keywords: [
          'exportação cosméticos brasil',
          'acordo aladi comércio exterior',
          'balança comercial brasil 2026',
          'comércio américa latina mdic',
          'exportações brasileiras superávit',
        ],
        imageAlt:
          'Vista aérea de terminal portuário de contêineres e navio cargueiro operando exportações brasileiras para a América Latina',
        fullContent: [
          'Análise da Redação DinhEuro sobre decreto federal coordenado por MDIC, MRE e Anvisa: o Brasil tornou-se o primeiro signatário a internalizar o acordo da Associação Latino-Americana de Integração (Aladi) voltado à eliminação de barreiras técnicas no comércio de higiene pessoal, perfumaria e cosméticos, sem alteração de alíquotas tarifárias.',
          '## Peso regional na balança comercial setorial',
          'Segundo o MDIC, o setor brasileiro exportou US$ 1,06 bilhão em 2025 (+20,1% anual e superávit de US$ 29,6 milhões), com 76,3% (~US$ 791 milhões) destinados aos parceiros da Aladi — liderados por Argentina (US$ 222 milhões), México (US$ 115 milhões), Colômbia (US$ 104 milhões), Chile (US$ 100 milhões) e Paraguai (US$ 73 milhões). A convergência atinge um mercado latino-americano estimado em mais de US$ 55 bilhões.',
          '## Ganho de eficiência cambial e competitividade para PMEs',
          'Ao extinguir o Certificado de Livre Venda, padronizar boas práticas de fabricação e substituir registros lentos por notificação simplificada após a adesão de pelo menos dois países (60 dias após notificação à Aladi), a medida encurta prazos de embarque e eleva a geração de divisas de mais de 3 mil indústrias brasileiras.',
        ],
      },
      en: {
        tag: 'Foreign Trade & Regional Economy',
        title:
          'Foreign Trade: Brazil Simplifies Cosmetics Exports to Latin America Under ALADI Accord',
        summary:
          'DinhEuro Synthesis: Domestic enactment of the ALADI technical accord trims non-tariff compliance costs across a US$ 55 billion regional market that absorbs 76.3% of Brazil’s cosmetics exports, boosting SME margins and FX inflows.',
        dateAuthor: 'Nov 18, 2026 • DinhEuro Editorial',
        source: 'Official reference: MDIC / MRE / Anvisa / ALADI',
        readingTime: '3 min read',
        keywords: [
          'brazil cosmetics exports',
          'aladi foreign trade agreement',
          'brazil trade balance 2026',
          'latin america trade mdic',
          'brazilian exports surplus',
        ],
        imageAlt:
          'Aerial view of a container port terminal and cargo vessel handling Brazilian exports to Latin America',
        fullContent: [
          'DinhEuro Editorial synthesis of the federal decree coordinated by MDIC, MRE, and Anvisa: Brazil became the first signatory to complete domestic ratification of the ALADI agreement removing technical barriers in personal care, perfumery, and cosmetics trade without altering customs tariffs.',
          '## Strategic weight in Brazil’s trade surplus',
          'MDIC data show Brazilian exports in the sector hit US$ 1.06 billion in 2025 (+20.1% YoY, delivering a US$ 29.6 million surplus), with 76.3% (~US$ 791 million) shipped to ALADI members led by Argentina (US$ 222M), Mexico (US$ 115M), Colombia (US$ 104M), Chile (US$ 100M), and Paraguay (US$ 73M) inside a regional market exceeding US$ 55 billion.',
          '## Faster shipments and lower overhead for exporters',
          'Eliminating the Certificate of Free Sale, harmonizing GMP rules, and adopting risk-based simplified notifications—taking operational effect 60 days after at least two countries notify ALADI—shortens time-to-market and boosts foreign-exchange earnings across over 3,000 Brazilian manufacturers.',
        ],
      },
      es: {
        tag: 'Comercio Exterior y Economía Regional',
        title:
          'Comercio Exterior: Brasil Simplifica la Exportación de Cosméticos hacia América Latina mediante Acuerdo de la Aladi',
        summary:
          'Síntesis DinhEuro: La internalización del acuerdo sanitario de la Aladi reduce costos no arancelarios en un mercado regional de US$ 55 mil millones que concentra el 76,3% de los envíos brasileños del rubro, impulsando a las PyMEs.',
        dateAuthor: '18/11/2026 • Redacción DinhEuro',
        source: 'Referencia oficial: MDIC / MRE / Anvisa / Aladi',
        readingTime: '3 min',
        keywords: [
          'exportacion cosmeticos brasil',
          'acuerdo aladi comercio exterior',
          'balanza comercial brasil 2026',
          'comercio america latina mdic',
          'exportaciones brasilenas superavit',
        ],
        imageAlt:
          'Vista aérea de terminal portuario de contenedores y buque de carga operando exportaciones brasileñas hacia América Latina',
        fullContent: [
          'Análisis de la Redacción DinhEuro sobre el decreto coordinado por el MDIC, MRE y Anvisa: Brasil se convirtió en el primer país signatario en internalizar el acuerdo de la Aladi que suprime obstáculos técnicos en higiene personal, perfumería y cosméticos sin modificar alícuotas arancelarias.',
          '## Peso regional en la balanza comercial',
          'Según el MDIC, el sector exportó US$ 1,06 mil millones en 2025 (+20,1% interanual y superávit de US$ 29,6 millones), con un 76,3% (~US$ 791 millones) absorbido por socios de la Aladi encabezados por Argentina (US$ 222M), México (US$ 115M), Colombia (US$ 104M), Chile (US$ 100M) y Paraguay (US$ 73M) en un mercado de más de US$ 55 mil millones.',
          '## Menor burocracia y competitividad exportadora',
          'La eliminación del Certificado de Libre Venta, la convergencia en buenas prácticas y la notificación sanitaria simplificada —vigente 60 días después de la ratificación de al menos dos países— agilizan despachos e incrementan la generación de divisas de más de 3 mil firmas brasileñas.',
        ],
      },
    },
  },
  {
    id: 'apec-2026-trump-xi-putin-shenzhen',
    isoDate: '2026-11-18',
    imageUrl: '/assets/aistudio/image_e7fa591e.png',
    translations: {
      pt: {
        tag: 'Geopolítica & Comércio Global',
        title:
          'Cúpula da APEC 2026: Trump, Xi Jinping e Putin Fazem Primeiro Contato na China Antes de Reunião Trilateral Histórica',
        summary:
          'Síntese DinhEuro: A agenda em Shenzhen envolvendo trégua tarifária de 2027, restrições a chips de IA e oferta energética coloca dólar, ouro, petróleo e fluxos agrícolas brasileiros no centro da precificação de risco global.',
        dateAuthor: '18/11/2026 • Redação DinhEuro',
        source: 'Referência institucional: Cúpula APEC 2026 • Shenzhen',
        readingTime: '3 min',
        keywords: [
          'trump xi putin apec 2026',
          'reunião trilateral china',
          'comércio global tarifas',
          'semicondutores inteligência artificial nvidia',
          'geopolítica e dólar hoje',
          'mercados globais shenzhen',
        ],
        imageAlt:
          'Donald Trump, Xi Jinping e Vladimir Putin durante encontro na Cúpula da APEC 2026 em Shenzhen, na China',
        fullContent: [
          'Síntese analítica da Redação DinhEuro sobre a agenda diplomática em Shenzhen: o encontro preliminar entre Donald Trump, Xi Jinping e Vladimir Putin na abertura da Cúpula da APEC 2026 concentrou atenções das mesas de câmbio e commodities antes da reunião trilateral.',
          '## Três vetores decisivos para os mercados globais',
          'Mesmo com duração curta prevista para o diálogo trilateral, três eixos dominam a formação de preços: (1) renovação ou ruptura da trégua tarifária EUA–China antes do vencimento no início de 2027, contrapondo protecionismo à defesa chinesa da OMC; (2) controles americanos sobre exportação de semicondutores avançados de IA e possíveis retaliações regulatórias de Pequim; e (3) negociações de segurança energética e conflitos na Ucrânia e no Irã, com reflexo imediato no petróleo e na busca por proteção em dólar e ouro.',
          '## Efeitos potenciais para o Brasil e o Mercosul',
          'Para a economia brasileira e o Ibovespa, eventuais concessões comerciais de compra agrícola entre Washington e Pequim podem alterar o prêmio de exportação da soja e do milho nacionais em 2027, enquanto o desfecho sobre tarifas e energia dita a direção do dólar comercial frente ao Real.',
        ],
      },
      en: {
        tag: 'Geopolitics & Global Trade',
        title:
          'APEC Summit 2026: Trump, Xi Jinping, and Putin Make First Contact in China Ahead of Historic Trilateral Meeting',
        summary:
          'DinhEuro Synthesis: Shenzhen talks spanning the early-2027 tariff truce, AI chip curbs, and global energy supply place the U.S. dollar, gold, crude oil, and Brazilian agricultural trade at the center of global risk pricing.',
        dateAuthor: 'Nov 18, 2026 • DinhEuro Editorial',
        source: 'Institutional reference: 2026 APEC Summit • Shenzhen',
        readingTime: '3 min read',
        keywords: [
          'trump xi putin apec 2026',
          'china trilateral summit',
          'global trade tariffs',
          'ai semiconductors nvidia',
          'geopolitics us dollar',
          'shenzhen global markets',
        ],
        imageAlt:
          'Donald Trump, Xi Jinping, and Vladimir Putin during a meeting at the 2026 APEC Summit in Shenzhen, China',
        fullContent: [
          'DinhEuro Editorial synthesis on the diplomatic agenda in Shenzhen: initial in-person exchanges among Donald Trump, Xi Jinping, and Vladimir Putin ahead of their trilateral summit at APEC 2026 put FX, bond, and commodity desks on high alert.',
          '## Three market-moving pillars in Shenzhen',
          'Investor focus centers on three cross-border risk catalysts: (1) avoiding renewed U.S.–China tariff escalation before the existing trade truce expires in early 2027; (2) export restrictions on advanced AI semiconductors and potential Chinese regulatory countermeasures; and (3) negotiations affecting Ukraine, Iran, and energy supply security, directly shaping oil benchmarks alongside safe-haven flows into gold and the U.S. dollar.',
          '## Spillover to Brazil and emerging markets',
          'For Brazil and Mercosur exporters, any bilateral U.S.–China agricultural purchase commitments could shift 2027 soybean and corn trade premiums, while tariff signals guide USD/BRL and emerging-market risk appetite.',
        ],
      },
      es: {
        tag: 'Geopolítica y Comercio Global',
        title:
          'Cumbre APEC 2026: Trump, Xi Jinping y Putin Tienen Primer Contacto en China Antes de Histórica Reunión Trilateral',
        summary:
          'Síntesis DinhEuro: La agenda en Shenzhen sobre la tregua arancelaria de 2027, chips de IA y seguridad energética sitúa al dólar, oro, petróleo y exportaciones agrícolas brasileñas en el centro del mercado global.',
        dateAuthor: '18/11/2026 • Redacción DinhEuro',
        source: 'Referencia institucional: Cumbre APEC 2026 • Shenzhen',
        readingTime: '3 min',
        keywords: [
          'trump xi putin apec 2026',
          'reunion trilateral china',
          'comercio global aranceles',
          'semiconductores inteligencia artificial',
          'geopolitica dolar mercados shenzhen',
        ],
        imageAlt:
          'Donald Trump, Xi Jinping y Vladimir Putin durante un encuentro en la Cumbre de la APEC 2026 en Shenzhen, China',
        fullContent: [
          'Síntesis analítica de la Redacción DinhEuro sobre la cumbre diplomática en Shenzhen: el primer encuentro presencial entre Donald Trump, Xi Jinping y Vladimir Putin en el marco de la APEC 2026 concentró la atención de las mesas de divisas y materias primas.',
          '## Tres ejes de impacto para los mercados financieros',
          'Las expectativas giran en torno a tres vectores: (1) evitar una nueva escalada arancelaria entre Washington y Pekín antes de que venza la tregua vigente a comienzos de 2027; (2) las restricciones sobre semiconductores avanzados de IA; y (3) negociaciones ligadas a Ucrania, Irán y el suministro energético global, con incidencia directa en el crudo, el oro y el dólar.',
          '## Efectos potenciales sobre Brasil y el Mercosur',
          'Eventuales compromisos agrícolas entre EE. UU. y China podrían modificar los premios de exportación de soja y maíz sudamericanos en 2027, condicionando el saldo comercial brasileño y el tipo de cambio USD/BRL.',
        ],
      },
    },
  },
];
