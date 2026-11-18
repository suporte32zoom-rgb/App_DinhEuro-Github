import type { SupportedLanguage } from '../i18n/translations';
import mercosulEuTradeImg from '../assets/images/mercosul_eu_trade_1794944856986.jpg';

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

export const MAX_DAILY_INSIGHTS = 11;

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
    sectionBadge: 'Editorial',
    readMoreLabel: 'Ler completo',
    sourceLabel: 'Fonte oficial',
    closeModalLabel: 'Fechar leitura',
    editorialNote: 'Curadoria macroeconômica e comércio exterior • DinhEuro',
  },
  en: {
    sectionTitle: 'Daily Insights',
    sectionBadge: 'Editorial',
    readMoreLabel: 'Read full story',
    sourceLabel: 'Official source',
    closeModalLabel: 'Close article',
    editorialNote: 'Macroeconomic & international trade curation • DinhEuro',
  },
  es: {
    sectionTitle: 'Insights del Día',
    sectionBadge: 'Editorial',
    readMoreLabel: 'Leer completo',
    sourceLabel: 'Fuente oficial',
    closeModalLabel: 'Cerrar lectura',
    editorialNote: 'Curaduría macroeconómica y comercio exterior • DinhEuro',
  },
};

export const DAILY_INSIGHTS_ITEMS: DailyInsightItem[] = [
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
          'Líderes dos Estados Unidos, China e Rússia se encontram em Shenzhen antes de cúpula trilateral nesta quinta-feira (19); negociações sobre tarifas comerciais, semicondutores de IA, conflitos geopolíticos e cadeias de suprimentos estão no radar dos mercados globais.',
        dateAuthor: '18 de novembro de 2026 • Redação DinhEuro',
        source: 'APEC 2026 / Redação DinhEuro',
        readingTime: '4 min',
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
          'Os mercados financeiros e as chancelarias globais acompanham com máxima atenção a movimentação diplomática em Shenzhen, no sul da China. Nesta quarta-feira (18), os presidentes dos Estados Unidos, Donald Trump, da China, Xi Jinping, e da Rússia, Vladimir Putin, realizaram o primeiro contato pessoal durante a recepção oficial da cúpula da Cooperação Econômica Ásia-Pacífico (APEC), preparando o terreno para uma reunião trilateral inédita agendada para esta quinta-feira (19).',
          '## Recepção Diplomática e Sinais de Distensão',
          'Ao desembarcar em Shenzhen vindo de Manila, Trump foi recebido com honras militares pelo presidente Xi Jinping, que destacou o interesse de Pequim em construir uma relação bilateral estrategicamente estável, pautada pela reciprocidade. Durante o banquete de boas-vindas da APEC, Trump e Putin também apertaram as mãos — no primeiro encontro presencial entre ambos desde a cúpula realizada no Alasca em agosto de 2025 — e posaram para registros oficiais ao lado do anfitrião chinês.',
          '## O Que Está na Mesa: Tarifas, Chips de IA e Conflitos',
          'Embora analistas internacionais apontem que a reunião trilateral terá duração estimada inferior a uma hora, a pauta concentra os principais vetores de risco para a economia global e para os ativos financeiros:',
          '1. Trégua Comercial e Protecionismo: Nos discursos inaugurais para executivos do fórum empresarial da APEC, Xi Jinping defendeu o sistema multilateral baseado nas regras da Organização Mundial do Comércio (OMC) e criticou o avanço das tarifas protecionistas. Washington e Pequim buscam evitar uma nova escalada tarifária antes do vencimento da atual trégua comercial no início de 2027.',
          '2. Disputa por Semicondutores e Inteligência Artificial: As negociações ocorrem logo após novas restrições impostas pelos Estados Unidos à exportação de chips avançados de inteligência artificial para o mercado chinês, medida que pressiona empresas do setor de tecnologia e provoca reações regulatórias de Pequim.',
          '3. Segurança Global e Energia: Além das tratativas sobre o encerramento do conflito na Ucrânia — tema abordado previamente entre Xi e Putin —, a pauta inclui a crise no Oriente Médio envolvendo o Irã e o controle de armamentos nucleares, fatores que exercem influência direta sobre a cotação do petróleo e a busca por proteção em dólar e ouro.',
          '## Impacto para Economias Emergentes e Mercados',
          'A concentração de poder decisório entre Washington, Pequim e Moscou levou observadores a compararem o encontro à histórica Conferência de Yalta de 1945, gerando cautela entre economias médias da Europa e da Ásia. Para o mercado brasileiro e o agronegócio exportador, eventuais acordos de compra agrícola ou realinhamentos tarifários entre Estados Unidos e China podem redesenhar fluxos comerciais globais ao longo de 2027.',
        ],
      },
      en: {
        tag: 'Geopolitics & Global Trade',
        title:
          'APEC Summit 2026: Trump, Xi Jinping, and Putin Make First Contact in China Ahead of Historic Trilateral Meeting',
        summary:
          'Leaders of the United States, China, and Russia meet in Shenzhen ahead of Thursday’s (19) trilateral summit; talks on trade tariffs, AI semiconductors, geopolitical conflicts, and supply chains are in global market focus.',
        dateAuthor: 'Nov 18, 2026 • DinhEuro Editorial',
        source: 'APEC 2026 / DinhEuro Editorial',
        readingTime: '4 min read',
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
          'Global financial markets and diplomatic ministries are closely monitoring events in Shenzhen, southern China. On Wednesday (18), U.S. President Donald Trump, Chinese President Xi Jinping, and Russian President Vladimir Putin made their first in-person contact during the official welcome reception of the Asia-Pacific Economic Cooperation (APEC) summit, setting the stage for an unprecedented trilateral meeting scheduled for Thursday (19).',
          '## Diplomatic Reception and Signals of De-escalation',
          'Upon arriving in Shenzhen from Manila, Trump was welcomed with military honors by President Xi Jinping, who emphasized Beijing’s interest in building a strategically stable bilateral relationship anchored in reciprocity. During the APEC welcome banquet, Trump and Putin also shook hands—marking their first face-to-face encounter since the August 2025 summit in Alaska—and posed for official photographs alongside their Chinese host.',
          '## What Is on the Table: Tariffs, AI Chips, and Conflicts',
          'Although international analysts note that the trilateral meeting is expected to last under an hour, its agenda concentrates the main risk drivers for the global economy and financial assets:',
          '1. Trade Truce and Protectionism: In opening remarks to executives at the APEC business forum, Xi Jinping defended the rules-based multilateral system under the World Trade Organization (WTO) and criticized rising protectionist tariffs. Washington and Beijing are seeking to avert a fresh tariff escalation before the current trade truce expires in early 2027.',
          '2. Semiconductors and Artificial Intelligence Dispute: Talks come right after new U.S. export restrictions on advanced artificial intelligence chips bound for the Chinese market, a move pressuring technology shares and prompting regulatory responses from Beijing.',
          '3. Global Security and Energy: Beyond negotiations aimed at ending the war in Ukraine—a topic discussed earlier between Xi and Putin—the agenda covers the Middle East crisis involving Iran and nuclear arms control, factors with direct influence over crude oil pricing and safe-haven demand in the U.S. dollar and gold.',
          '## Impact on Emerging Economies and Markets',
          'The concentration of decision-making power among Washington, Beijing, and Moscow led observers to compare the gathering to the historic 1945 Yalta Conference, prompting caution among mid-sized European and Asian economies. For Brazilian markets and agricultural exporters, potential U.S.–China agricultural purchase accords or tariff realignments could reshape global trade flows throughout 2027.',
        ],
      },
      es: {
        tag: 'Geopolítica y Comercio Global',
        title:
          'Cumbre APEC 2026: Trump, Xi Jinping y Putin Tienen Primer Contacto en China Antes de Histórica Reunión Trilateral',
        summary:
          'Líderes de Estados Unidos, China y Rusia se reúnen en Shenzhen antes de la cumbre trilateral de este jueves (19); negociaciones sobre aranceles, semiconductores de IA, conflictos geopolíticos y cadenas de suministro están en el foco de los mercados.',
        dateAuthor: '18 de noviembre de 2026 • Redacción DinhEuro',
        source: 'APEC 2026 / Redacción DinhEuro',
        readingTime: '4 min',
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
          'Los mercados financieros y las cancillerías globales siguen con máxima atención los movimientos diplomáticos en Shenzhen, en el sur de China. Este miércoles (18), los presidentes de Estados Unidos, Donald Trump, de China, Xi Jinping, y de Rusia, Vladimir Putin, mantuvieron su primer contacto personal durante la recepción oficial de la cumbre de Cooperación Económica Asia-Pacífico (APEC), preparando el terreno para una reunión trilateral inédita prevista para este jueves (19).',
          '## Recepción Diplomática y Señales de Distensión',
          'Al aterrizar en Shenzhen procedente de Manila, Trump fue recibido con honores militares por el presidente Xi Jinping, quien destacó el interés de Pekín en construir una relación bilateral estratégicamente estable y basada en la reciprocidad. Durante el banquete de bienvenida de la APEC, Trump y Putin también se estrecharon la mano —en su primer encuentro presencial desde la cumbre celebrada en Alaska en agosto de 2025— y posaron para fotografías oficiales junto al anfitrión chino.',
          '## Qué Está Sobre la Mesa: Aranceles, Chips de IA y Conflictos',
          'Aunque analistas internacionales señalan que la reunión trilateral tendría una duración estimada inferior a una hora, la agenda concentra los principales vectores de riesgo para la economía mundial y los activos financieros:',
          '1. Tregua Comercial y Proteccionismo: En sus discursos inaugurales ante ejecutivos del foro empresarial de la APEC, Xi Jinping defendió el sistema multilateral basado en las reglas de la Organización Mundial del Comercio (OMC) y criticó el avance de los aranceles proteccionistas. Washington y Pekín buscan evitar una nueva escalada arancelaria antes del vencimiento de la actual tregua comercial a comienzos de 2027.',
          '2. Disputa por Semiconductores e Inteligencia Artificial: Las conversaciones ocurren tras nuevas restricciones impuestas por Estados Unidos a la exportación de chips avanzados de inteligencia artificial hacia el mercado chino, una medida que presiona al sector tecnológico y genera respuestas regulatorias de Pekín.',
          '3. Seguridad Global y Energía: Además de las gestiones sobre el fin del conflicto en Ucrania —tema abordado previamente entre Xi y Putin—, la agenda incluye la crisis en Medio Oriente con Irán y el control de armas nucleares, factores que influyen directamente en el precio del petróleo y en la demanda de refugio en dólar y oro.',
          '## Impacto para Economías Emergentes y Mercados',
          'La concentración del poder de decisión entre Washington, Pekín y Moscú llevó a observadores a comparar la cita con la histórica Conferencia de Yalta de 1945, generando cautela entre economías medias de Europa y Asia. Para el mercado brasileño y el agronegocio exportador, eventuales acuerdos agrícolas o reajustes arancelarios entre Estados Unidos y China podrían reconfigurar los flujos comerciales globales a lo largo de 2027.',
        ],
      },
    },
  },
  {
    id: 'balancos-3t26-cemig-hapvida-bb-2026',
    imageUrl: '/assets/aistudio/image_c38b3f81.png',
    translations: {
      pt: {
        tag: 'EMPRESAS & BALANÇOS',
        title:
          'Temporada de balanços movimenta a B3 com salto no lucro da Cemig e forte alta de Hapvida',
        summary:
          'Enquanto Hapvida liderou os ganhos do Ibovespa subindo quase 10% após resultados trimestrais e a Cemig dobrou seu lucro para R$ 1,72 bilhão, Banco do Brasil recuou após revisar projeções e dividendos.',
        dateAuthor: '17/11/2026 • Redação DinhEuro',
        source: 'TradeMap / UOL',
        imageAlt:
          'Mesa de operações na B3 acompanhando balanços corporativos do 3T26 de Cemig, Hapvida, XP Inc. e Banco do Brasil',
        fullContent: [
          'A reta final da temporada de resultados do terceiro trimestre de 2026 ditou o ritmo das negociações corporativas na Bolsa brasileira nesta terça-feira (17), com forte dispersão entre os papéis listados no Ibovespa.',
          'Entre os destaques positivos, a Cemig reportou lucro líquido de R$ 1,72 bilhão no período — mais que o dobro do registrado um ano antes —, enquanto a XP Inc. elevou seu lucro em 4%, para R$ 1,4 bilhão, e o PagBank apurou ganho de R$ 611 milhões (+7%). No pregão, as ações da Hapvida dispararam perto de 10%, liderando as altas do índice ao lado de Cosan e CSN.',
          'Na ponta negativa, o Banco do Brasil sofreu pressão vendedora após reduzir sua projeção de lucro e revisar o fluxo de dividendos, enquanto construtoras e varejistas ligadas ao ciclo doméstico recuaram diante da curva de juros elevada.',
        ],
      },
      en: {
        tag: 'COMPANIES & EARNINGS',
        title:
          'Earnings season drives B3 trading as Cemig profit surges and Hapvida rallies',
        summary:
          'While Hapvida led Ibovespa gainers surging nearly 10% after quarterly results and Cemig doubled its profit to BRL 1.72 billion, Banco do Brasil retreated after revising its guidance and dividend outlook.',
        dateAuthor: 'Nov 17, 2026 • DinhEuro Editorial',
        source: 'TradeMap / UOL',
        imageAlt:
          'B3 trading desk tracking 3Q26 corporate earnings for Cemig, Hapvida, XP Inc., and Banco do Brasil',
        fullContent: [
          'The closing stretch of the third-quarter 2026 earnings season set the pace for corporate stock trading on Brazil’s exchange on Tuesday (17), producing sharp dispersion across Ibovespa constituents.',
          'Among positive standouts, Cemig reported net income of BRL 1.72 billion for the quarter—more than double its figure from a year earlier—while XP Inc. grew profit by 4% to BRL 1.4 billion and PagBank posted net earnings of BRL 611 million (+7%). In equity trading, Hapvida shares jumped nearly 10%, leading index gains alongside Cosan and CSN.',
          'On the downside, Banco do Brasil faced selling pressure after trimming its profit guidance and revising dividend payouts, while domestic-cycle homebuilders and retailers slipped under elevated interest-rate expectations.',
        ],
      },
      es: {
        tag: 'EMPRESAS Y BALANCES',
        title:
          'La temporada de resultados mueve la bolsa B3 con salto en las ganancias de Cemig y fuerte alza de Hapvida',
        summary:
          'Mientras Hapvida lideró las ganancias del Ibovespa al subir casi un 10% tras sus resultados trimestrales y Cemig duplicó su beneficio hasta R$ 1,72 mil millones, Banco do Brasil retrocedió tras revisar proyecciones y dividendos.',
        dateAuthor: '17/11/2026 • Redacción DinhEuro',
        source: 'TradeMap / UOL',
        imageAlt:
          'Mesa de operaciones en la B3 siguiendo los balances corporativos del 3T26 de Cemig, Hapvida, XP Inc. y Banco do Brasil',
        fullContent: [
          'La recta final de la temporada de resultados del tercer trimestre de 2026 marcó el ritmo de las negociaciones corporativas en la bolsa brasileña este martes (17), con fuerte dispersión entre las acciones que integran el Ibovespa.',
          'Entre los destacados positivos, Cemig reportó una utilidad neta de R$ 1,72 mil millones en el período —más del doble de lo registrado un año atrás—, mientras XP Inc. elevó su beneficio en un 4% hasta R$ 1,4 mil millones y PagBank alcanzó una ganancia de R$ 611 millones (+7%). En la rueda, los títulos de Hapvida se dispararon cerca de un 10%, liderando las subas del índice junto a Cosan y CSN.',
          'En el lado negativo, Banco do Brasil sufrió presión vendedora tras recortar su proyección de ganancias y revisar el flujo de dividendos, mientras constructoras y minoristas ligadas al ciclo local retrocedieron frente a la elevada curva de tasas de interés.',
        ],
      },
    },
  },
  {
    id: 'fed-juros-inflacao-williams-2026',
    imageUrl: '/assets/aistudio/image_87b108f6.png',
    translations: {
      pt: {
        tag: 'JUROS & FEDERAL RESERVE',
        title:
          'Dirigentes do Fed alertam que inflação nos EUA ainda exige cautela e mercado precifica alta de juros',
        summary:
          'Em discurso nesta terça-feira (17), o presidente do Fed de Nova York, John Williams, afirmou que a economia americana segue forte e que o banco central ainda tem trabalho a fazer para levar a inflação à meta, reforçando apostas de aperto monetário em dezembro.',
        dateAuthor: '17/11/2026 • Redação DinhEuro',
        source: 'InfoMoney / Dow Jones',
        imageAlt:
          'Sede do Federal Reserve (Banco Central dos Estados Unidos) em Washington, D.C.',
        fullContent: [
          'Os rumos da taxa básica de juros dos Estados Unidos voltaram ao centro das atenções dos mercados globais nesta terça-feira (17) após declarações de dirigentes do Federal Reserve (Fed) sobre a persistência das pressões inflacionárias.',
          'Durante evento à tarde, o presidente do Fed de Nova York, John Williams, destacou que a atividade econômica americana permanece robusta, mas avaliou que a inflação ainda não caminha na direção necessária para convergir à meta oficial, indicando que o banco central tem trabalho adicional pela frente.',
          'De acordo com dados da LSEG, os contratos futuros apontam 96% de probabilidade de um novo aumento de 0,25 ponto percentual na reunião de dezembro do Fed, mantendo os rendimentos dos títulos do Tesouro americano pressionados e exigindo cautela dos mercados emergentes.',
        ],
      },
      en: {
        tag: 'RATES & FEDERAL RESERVE',
        title:
          'Fed officials warn US inflation still warrants caution as markets price in rate hike',
        summary:
          'In remarks on Tuesday (17), New York Fed President John Williams said the U.S. economy remains resilient and that the central bank still has work to do to bring inflation back to target, reinforcing bets on monetary tightening in December.',
        dateAuthor: 'Nov 17, 2026 • DinhEuro Editorial',
        source: 'InfoMoney / Dow Jones',
        imageAlt:
          'Federal Reserve Board headquarters building in Washington, D.C.',
        fullContent: [
          'The trajectory of U.S. benchmark interest rates returned to the spotlight across global markets on Tuesday (17) after remarks from Federal Reserve (Fed) officials underscoring the persistence of inflationary pressures.',
          'Speaking at an afternoon event, New York Fed President John Williams noted that U.S. economic activity remains robust, but cautioned that inflation is not yet moving on the path required to converge toward the official target, signaling the central bank still has more work ahead.',
          'According to LSEG data, futures contracts reflect a 96% probability of another 0.25-percentage-point rate increase at the Fed’s December policy meeting, keeping U.S. Treasury yields elevated and prompting caution across emerging markets.',
        ],
      },
      es: {
        tag: 'TASAS Y RESERVA FEDERAL',
        title:
          'Directivos de la Fed advierten que la inflación en EE. UU. aún exige cautela y el mercado descuenta alza de tasas',
        summary:
          'En un discurso este martes (17), el presidente de la Fed de Nueva York, John Williams, afirmó que la economía estadounidense sigue sólida y que el banco central aún tiene trabajo por hacer para llevar la inflación a la meta, reforzando apuestas de ajuste monetario en diciembre.',
        dateAuthor: '17/11/2026 • Redacción DinhEuro',
        source: 'InfoMoney / Dow Jones',
        imageAlt:
          'Sede de la Reserva Federal de Estados Unidos en Washington, D.C.',
        fullContent: [
          'El rumbo de la tasa de interés de referencia de Estados Unidos volvió al centro de la atención de los mercados globales este martes (17) tras declaraciones de directivos de la Reserva Federal (Fed) sobre la persistencia de las presiones inflacionarias.',
          'Durante un evento por la tarde, el presidente de la Fed de Nueva York, John Williams, destacó que la actividad económica estadounidense se mantiene sólida, pero evaluó que la inflación aún no avanza en la dirección necesaria para converger hacia la meta oficial, indicando que el banco central tiene tarea pendiente.',
          'De acuerdo con datos de LSEG, los contratos futuros reflejan una probabilidad del 96% de un nuevo incremento de 0,25 puntos porcentuales en la reunión de diciembre de la Fed, manteniendo presionados los rendimientos de los bonos del Tesoro estadounidense y exigiendo cautela a los mercados emergentes.',
        ],
      },
    },
  },
  {
    id: 'eua-restricoes-chips-ia-brasil-2026',
    imageUrl: '/assets/aistudio/image_72477e45.png',
    translations: {
      pt: {
        tag: 'TECNOLOGIA & COMÉRCIO GLOBAL',
        title:
          'EUA impõem novas restrições à exportação de chips avançados de IA para Brasil e mais 11 países',
        summary:
          'O Departamento de Comércio dos Estados Unidos anunciou exigência de licenças para envio e acesso remoto a semicondutores de inteligência artificial em 12 países — incluindo o Brasil —, pressionando ações de tecnologia antes do balanço da Nvidia.',
        dateAuthor: '17/11/2026 • Redação DinhEuro',
        source: 'Bloomberg / Al Jazeera',
        imageAlt:
          'Sala limpa de fabricação de semicondutores e wafers de silício usados em chips avançados de inteligência artificial',
        fullContent: [
          'O governo dos Estados Unidos anunciou novas regras de controle de exportação que exigem autorização prévia do Departamento de Comércio para a venda, reexportação ou acesso remoto em nuvem de chips avançados de inteligência artificial destinados a 12 países, entre eles Brasil, Singapura, Malásia, Tailândia, Indonésia e Índia.',
          'Segundo autoridades americanas, a medida busca impedir que empresas chinesas contornem as sanções vigentes utilizando centros de dados instalados em terceiros países para treinar modelos avançados de IA. O anúncio ocorre em meio à crise corporativa na Nvidia após a saída do CEO Jensen Huang e à véspera da divulgação do balanço trimestral da fabricante.',
          'A notícia provocou queda nas ações de semicondutores nos Estados Unidos e na Ásia, derrubando índices em Tóquio, Seul e Hong Kong, enquanto investidores reavaliam os impactos regulatórios sobre a cadeia global de infraestrutura de IA.',
        ],
      },
      en: {
        tag: 'TECHNOLOGY & GLOBAL TRADE',
        title:
          'US imposes new export curbs on advanced AI chips for Brazil and 11 other countries',
        summary:
          'The U.S. Department of Commerce announced licensing requirements for shipping and remote cloud access to artificial intelligence semiconductors across 12 countries—including Brazil—pressuring tech stocks ahead of Nvidia’s earnings report.',
        dateAuthor: 'Nov 17, 2026 • DinhEuro Editorial',
        source: 'Bloomberg / Al Jazeera',
        imageAlt:
          'Semiconductor cleanroom manufacturing silicon wafers used in advanced artificial intelligence chips',
        fullContent: [
          'The United States government announced new export-control rules requiring prior authorization from the Department of Commerce for the sale, re-export, or remote cloud access of advanced artificial intelligence chips destined for 12 countries, including Brazil, Singapore, Malaysia, Thailand, Indonesia, and India.',
          'According to U.S. officials, the measure aims to prevent Chinese companies from circumventing existing sanctions by using data centers located in third countries to train advanced AI models. The announcement comes amid corporate turmoil at Nvidia following the departure of CEO Jensen Huang and on the eve of the chipmaker’s quarterly earnings release.',
          'The news triggered declines in semiconductor shares across the United States and Asia, dragging down equity indexes in Tokyo, Seoul, and Hong Kong as investors reassess regulatory headwinds facing the global AI infrastructure supply chain.',
        ],
      },
      es: {
        tag: 'TECNOLOGÍA Y COMERCIO GLOBAL',
        title:
          'EE. UU. impone nuevas restricciones a la exportación de chips avanzados de IA para Brasil y otros 11 países',
        summary:
          'El Departamento de Comercio de Estados Unidos anunció la exigencia de licencias para el envío y acceso remoto a semiconductores de inteligencia artificial en 12 países —incluido Brasil—, presionando a las acciones tecnológicas antes del balance de Nvidia.',
        dateAuthor: '17/11/2026 • Redacción DinhEuro',
        source: 'Bloomberg / Al Jazeera',
        imageAlt:
          'Sala limpia de fabricación de semiconductores y obleas de silicio utilizadas en chips avanzados de inteligencia artificial',
        fullContent: [
          'El gobierno de Estados Unidos anunció nuevas normas de control de exportaciones que exigen autorización previa del Departamento de Comercio para la venta, reexportación o acceso remoto en la nube a chips avanzados de inteligencia artificial destinados a 12 países, entre ellos Brasil, Singapur, Malasia, Tailandia, Indonesia e India.',
          'Según autoridades estadounidenses, la medida busca impedir que empresas chinas eludan las sanciones vigentes utilizando centros de datos instalados en terceros países para entrenar modelos avanzados de IA. El anuncio se produce en medio de la crisis corporativa en Nvidia tras la salida del CEO Jensen Huang y en la víspera de la publicación de los resultados trimestrales del fabricante.',
          'La noticia provocó caídas en las acciones de semiconductores en Estados Unidos y Asia, arrastrando a los índices en Tokio, Seúl y Hong Kong mientras los inversores reevalúan el impacto regulatorio sobre la cadena global de infraestructura de IA.',
        ],
      },
    },
  },
  {
    id: 'senado-plp-299-pacote-ajuste-fiscal-2027',
    imageUrl: '/assets/aistudio/image_459c4fc4.png',
    translations: {
      pt: {
        tag: 'POLÍTICA ECONÔMICA & FISCAL',
        title:
          'Senado vota destaques finais do pacote de ajuste fiscal de até R$ 56,1 bilhões para 2027',
        summary:
          'Após aprovar o texto-base do PLP 299/2026, o Senado analisa os destaques pendentes do pacote fiscal do governo antes de enviá-lo à Câmara, mirando uma economia estimada entre R$ 45,1 bilhões e R$ 56,1 bilhões no próximo ano.',
        dateAuthor: '17/11/2026 • Redação DinhEuro',
        source: 'Agência Senado / Veja',
        imageAlt:
          'Plenário do Senado Federal em sessão durante a votação dos destaques do pacote de ajuste fiscal',
        fullContent: [
          'O Plenário do Senado Federal retomou nesta terça-feira (17) a análise dos destaques ao Projeto de Lei Complementar (PLP 299/2026), peça central do pacote de ajuste fiscal articulado pela equipe econômica para conter o avanço da dívida pública.',
          'O projeto promove alterações nas regras do arcabouço fiscal, autorizando bloqueios adicionais de despesas para o cumprimento da meta primária e reduzindo de 2,5% para 2% o teto de crescimento real dos gastos a partir de 2027 nos exercícios em que houver gatilhos de contenção.',
          'O texto também restringe o uso de créditos tributários para abatimento de impostos federais, ajusta regras de repasses da Lei Kandir e estabelece prazos para a regulamentação dos chamados supersalários no funcionalismo. A expectativa do Executivo é concluir a tramitação no Senado e acelerar a votação na Câmara dos Deputados ainda nesta semana.',
        ],
      },
      en: {
        tag: 'ECONOMIC & FISCAL POLICY',
        title:
          'Senate votes on final amendments to fiscal adjustment package of up to BRL 56.1 billion for 2027',
        summary:
          'After approving the core text of PLP 299/2026, the Brazilian Senate reviews pending amendments to the government’s fiscal package before sending it to the Lower House, targeting estimated savings of BRL 45.1 billion to BRL 56.1 billion next year.',
        dateAuthor: 'Nov 17, 2026 • DinhEuro Editorial',
        source: 'Agência Senado / Veja',
        imageAlt:
          'Brazilian Federal Senate plenary in session during voting on the fiscal adjustment package',
        fullContent: [
          'The Brazilian Federal Senate plenary resumed on Tuesday (17) its review of proposed amendments to Complementary Bill (PLP 299/2026), the centerpiece of the fiscal adjustment package crafted by the economic team to curb the rise of public debt.',
          'The bill revises Brazil’s fiscal framework rules, authorizing additional spending freezes to meet the primary budget target and lowering the real spending growth ceiling from 2.5% to 2% starting in 2027 during fiscal years when containment triggers apply.',
          'The legislation also curbs the use of tax credits to offset federal taxes, adjusts Kandir Law revenue-transfer rules, and sets deadlines to regulate top-tier public-sector compensation above the constitutional cap. The Executive branch aims to wrap up Senate deliberations and fast-track a vote in the Chamber of Deputies later this week.',
        ],
      },
      es: {
        tag: 'POLÍTICA ECONÓMICA Y FISCAL',
        title:
          'El Senado vota los puntos finales del paquete de ajuste fiscal de hasta R$ 56,1 mil millones para 2027',
        summary:
          'Tras aprobar el texto base del PLP 299/2026, el Senado brasileño analiza las enmiendas pendientes del paquete fiscal del gobierno antes de enviarlo a la Cámara de Diputados, apuntando a un ahorro estimado de entre R$ 45,1 mil millones y R$ 56,1 mil millones el próximo año.',
        dateAuthor: '17/11/2026 • Redacción DinhEuro',
        source: 'Agência Senado / Veja',
        imageAlt:
          'Pleno del Senado Federal de Brasil en sesión durante la votación del paquete de ajuste fiscal',
        fullContent: [
          'El Pleno del Senado Federal retomó este martes (17) el análisis de las enmiendas al Proyecto de Ley Complementaria (PLP 299/2026), pieza central del paquete de ajuste fiscal articulado por el equipo económico para contener el avance de la deuda pública.',
          'El proyecto introduce cambios en las reglas del marco fiscal, autorizando bloqueos adicionales de gastos para cumplir la meta primaria y reduciendo del 2,5% al 2% el techo de crecimiento real del gasto a partir de 2027 en los ejercicios en que se activen gatillos de contención.',
          'El texto también restringe el uso de créditos tributarios para compensar impuestos federales, ajusta las reglas de transferencias de la Ley Kandir y fija plazos para reglamentar los llamados sobresueldos en el sector público. La expectativa del Ejecutivo es concluir la tramitación en el Senado y acelerar la votación en la Cámara de Diputados esta misma semana.',
        ],
      },
    },
  },
  {
    id: 'dolar-ibovespa-cautela-fiscal-wall-street-2026',
    imageUrl: '/assets/aistudio/image_24999f1b.png',
    translations: {
      pt: {
        tag: 'MERCADO FINANCEIRO & CÂMBIO',
        title:
          'Dólar encosta em R$ 5,81 e fecha próximo a R$ 5,78 com cautela fiscal no Brasil e queda em Wall Street',
        summary:
          'Após atingir máxima intradiária de R$ 5,81, o dólar comercial fechou cotado em torno de R$ 5,78, enquanto o Ibovespa oscilou perto dos 169,5 mil pontos diante das incertezas fiscais e do recuo das bolsas de Nova York.',
        dateAuthor: '17/11/2026 • Redação DinhEuro',
        source: 'UOL Economia / CNN Brasil',
        imageAlt:
          'Painel de cotações do Ibovespa e do dólar comercial no pregão da B3',
        fullContent: [
          'O mercado financeiro brasileiro encerrou esta terça-feira (17) marcado por forte volatilidade nos ativos domésticos. O dólar comercial chegou a bater R$ 5,81 durante a manhã — maior patamar intradiário desde abril de 2025 — antes de reduzir o ritmo e fechar na casa de R$ 5,78.',
          'No mercado acionário, o Ibovespa tentou ensaiar uma recuperação após a queda de 1,83% registrada na véspera, chegando a superar os 171 mil pontos, mas perdeu fôlego ao longo da tarde e encerrou próximo da estabilidade, na faixa de 169.527 pontos.',
          'A cautela dos investidores reflete a saída contínua de capital estrangeiro da B3 — que acumula saldo negativo de R$ 15,5 bilhões desde o segundo turno eleitoral — somada à pressão nos juros futuros de longo prazo, com contratos acima de 15% ao ano, e ao recuo generalizado dos índices Dow Jones, S&P 500 e Nasdaq em Nova York.',
        ],
      },
      en: {
        tag: 'FINANCIAL MARKETS & FX',
        title:
          'US dollar nears BRL 5.81 and closes around BRL 5.78 amid fiscal caution in Brazil and Wall Street slide',
        summary:
          'After hitting an intraday high of BRL 5.81, the commercial dollar closed near BRL 5.78, while the Ibovespa hovered around 169,500 points amid fiscal uncertainty and losses across New York equities.',
        dateAuthor: 'Nov 17, 2026 • DinhEuro Editorial',
        source: 'UOL Economia / CNN Brasil',
        imageAlt:
          'Ibovespa and US dollar exchange rate display board at the B3 trading floor',
        fullContent: [
          'Brazil’s financial market ended Tuesday (17) marked by sharp volatility across domestic assets. The commercial US dollar reached BRL 5.81 in morning trading—its highest intraday level since April 2025—before paring gains to settle around BRL 5.78.',
          'In equities, the benchmark Ibovespa attempted an early rebound after dropping 1.83% in the prior session, briefly climbing past 171,000 points before losing momentum in the afternoon to finish nearly flat around 169,527 points.',
          'Investor caution reflects ongoing foreign capital outflows from B3—now totaling a net negative BRL 15.5 billion since the presidential runoff election—alongside upward pressure on long-term interest-rate futures, with contracts trading above 15% a year, and broad declines across the Dow Jones, S&P 500, and Nasdaq in New York.',
        ],
      },
      es: {
        tag: 'MERCADO FINANCIERO Y DIVISAS',
        title:
          'El dólar roza R$ 5,81 y cierra cerca de R$ 5,78 por cautela fiscal en Brasil y caída en Wall Street',
        summary:
          'Tras alcanzar un máximo intradiario de R$ 5,81, el dólar comercial cerró en torno a R$ 5,78, mientras el Ibovespa osciló cerca de los 169,5 mil puntos ante la incertidumbre fiscal y el retroceso de las bolsas de Nueva York.',
        dateAuthor: '17/11/2026 • Redacción DinhEuro',
        source: 'UOL Economia / CNN Brasil',
        imageAlt:
          'Panel de cotizaciones del Ibovespa y del dólar comercial en la bolsa brasileña B3',
        fullContent: [
          'El mercado financiero brasileño cerró este martes (17) marcado por una fuerte volatilidad en los activos locales. El dólar comercial llegó a alcanzar R$ 5,81 durante la mañana —su mayor nivel intradiario desde abril de 2025— antes de moderar el avance y cerrar en torno a R$ 5,78.',
          'En el mercado bursátil, el índice Ibovespa intentó ensayar una recuperación tras la caída del 1,83% registrada en la jornada previa, llegando a superar los 171 mil puntos, pero perdió impulso durante la tarde y terminó cerca de la estabilidad, en el rango de los 169.527 puntos.',
          'La cautela de los inversores refleja la salida continua de capital extranjero de B3 —que acumula un saldo negativo de R$ 15,5 mil millones desde la segunda vuelta electoral—, sumada a la presión en las tasas de interés futuras de largo plazo, con contratos por encima del 15% anual, y al retroceso generalizado de los índices Dow Jones, S&P 500 y Nasdaq en Nueva York.',
        ],
      },
    },
  },
  {
    id: 'lula-trump-xi-putin-ucrania-canada-2026',
    imageUrl: '/assets/aistudio/image_f609767d.png',
    translations: {
      pt: {
        tag: 'GEOPOLÍTICA & DIPLOMACIA',
        title:
          'Lula sugeriu encontro entre Trump, Xi e Putin para discutir Ucrânia, diz Canadá',
        summary:
          'O primeiro-ministro canadense Mark Carney atribuiu ao presidente Lula a ideia da reunião inédita entre os líderes dos EUA, China e Rússia, marcada para quinta-feira (19) durante a cúpula da Apec em Shenzhen.',
        dateAuthor: '17/11/2026 • Por Marina Verenicz',
        source: 'CBN / SBT News',
        imageAlt:
          'Presidente brasileiro Luiz Inácio Lula da Silva em reunião com o primeiro-ministro canadense Mark Carney durante a cúpula da Asean nas Filipinas',
        fullContent: [
          'O presidente Luiz Inácio Lula da Silva teria sido o responsável por sugerir a reunião entre Donald Trump, Vladimir Putin e Xi Jinping, marcada para quinta-feira (19), na China. A informação foi revelada pelo primeiro-ministro canadense, Mark Carney, após um encontro com Lula nas Filipinas, durante a cúpula da Associação das Nações do Sudeste Asiático (Asean).',
          'Segundo Carney, o brasileiro apresentou a iniciativa como uma tentativa de contribuir para o fim da guerra entre Rússia e Ucrânia. O premiê classificou a proposta como interessante e atribuiu diretamente a Lula a articulação, versão que foi confirmada por integrantes do governo brasileiro.',
          'A reunião será realizada em Shenzhen, durante a cúpula da Cooperação Econômica Ásia-Pacífico (Apec), e reunirá pela primeira vez nesse formato os presidentes das três principais potências nucleares. O Ministério das Relações Exteriores da China classificou o encontro como um acontecimento de importância histórica voltado à segurança internacional e estabilidade estratégica.',
          'Apesar da intenção atribuída a Lula, ainda não há consenso sobre a inclusão da guerra na Ucrânia entre os principais assuntos da reunião. Segundo a imprensa americana, a Casa Branca pretende concentrar as discussões no controle de armamentos nucleares — após o vencimento do tratado New START em fevereiro de 2026 — e em questões relacionadas ao Irã, enquanto autoridades russas veem oportunidade para tratar do conflito ucraniano.',
          'O presidente ucraniano, Volodymyr Zelensky, manifestou preocupação com a possibilidade de as grandes potências discutirem o conflito sem a participação de Kiev. Embora a cúpula entre Trump, Putin e Xi esteja confirmada para quinta-feira (19), o alcance das negociações e a possibilidade de avanços concretos permanecem indefinidos.',
        ],
      },
      en: {
        tag: 'GEOPOLITICS & DIPLOMACY',
        title:
          'Lula suggested meeting between Trump, Xi, and Putin to discuss Ukraine, says Canada',
        summary:
          'Canadian Prime Minister Mark Carney credited President Lula with proposing the unprecedented meeting among the leaders of the U.S., China, and Russia, scheduled for Thursday (19) during the APEC summit in Shenzhen.',
        dateAuthor: 'Nov 17, 2026 • By Marina Verenicz',
        source: 'CBN / SBT News',
        imageAlt:
          'Brazilian President Luiz Inácio Lula da Silva meeting with Canadian Prime Minister Mark Carney during the ASEAN summit in the Philippines',
        fullContent: [
          'Brazilian President Luiz Inácio Lula da Silva reportedly proposed the meeting among Donald Trump, Vladimir Putin, and Xi Jinping scheduled for Thursday (19) in China. The disclosure was made by Canadian Prime Minister Mark Carney following a bilateral meeting with Lula in the Philippines during the Association of Southeast Asian Nations (ASEAN) summit.',
          'According to Carney, the Brazilian leader framed the initiative as an effort to help bring the war between Russia and Ukraine to an end. The Canadian prime minister described the proposal as interesting and directly credited Lula with brokering the idea, an account confirmed by members of the Brazilian government.',
          'The meeting will take place in Shenzhen during the Asia-Pacific Economic Cooperation (APEC) summit and will bring together the presidents of the three leading nuclear powers in this format for the first time. China’s Ministry of Foreign Affairs described the gathering as an event of historic significance aimed at international security and strategic stability.',
          'Despite the objective attributed to Lula, there is still no consensus on placing the war in Ukraine among the summit’s primary agenda items. According to U.S. media, the White House intends to focus talks on nuclear arms control—following the expiration of the New START treaty in February 2026—and matters concerning Iran, whereas Russian officials see an opening to address the Ukrainian conflict.',
          'Ukrainian President Volodymyr Zelensky voiced concern that major powers might discuss the conflict without Kyiv at the table. Although the summit among Trump, Putin, and Xi is confirmed for Thursday (19), the scope of negotiations and the prospects for concrete breakthroughs remain uncertain.',
        ],
      },
      es: {
        tag: 'GEOPOLÍTICA & DIPLOMACIA',
        title:
          'Lula sugirió reunión entre Trump, Xi y Putin para debatir sobre Ucrania, dice Canadá',
        summary:
          'El primer ministro canadiense Mark Carney atribuyó al presidente Lula la idea del encuentro inédito entre los líderes de EE. UU., China y Rusia, previsto para el jueves (19) durante la cumbre de la Apec en Shenzhen.',
        dateAuthor: '17/11/2026 • Por Marina Verenicz',
        source: 'CBN / SBT News',
        imageAlt:
          'El presidente brasileño Luiz Inácio Lula da Silva reunido con el primer ministro canadiense Mark Carney durante la cumbre de la Asean en Filipinas',
        fullContent: [
          'El presidente Luiz Inácio Lula da Silva habría sido el responsable de sugerir la reunión entre Donald Trump, Vladímir Putin y Xi Jinping, prevista para el jueves (19) en China. La información fue revelada por el primer ministro canadiense, Mark Carney, tras un encuentro con Lula en Filipinas durante la cumbre de la Asociación de Naciones del Sudeste Asiático (Asean).',
          'Según Carney, el mandatario brasileño presentó la iniciativa como un intento de contribuir al fin de la guerra entre Rusia y Ucrania. El jefe de gobierno canadiense calificó la propuesta de interesante y atribuyó directamente a Lula la articulación, versión que fue confirmada por integrantes del gobierno brasileño.',
          'La reunión se celebrará en Shenzhen durante la cumbre de Cooperación Económica Asia-Pacífico (Apec) y reunirá por primera vez en este formato a los presidentes de las tres principales potencias nucleares. El Ministerio de Relaciones Exteriores de China calificó el encuentro como un acontecimiento de importancia histórica orientado a la seguridad internacional y la estabilidad estratégica.',
          'Pese a la intención atribuida a Lula, aún no existe consenso sobre la inclusión de la guerra en Ucrania entre los asuntos centrales de la cita. Según la prensa estadounidense, la Casa Blanca pretende centrar las conversaciones en el control de armas nucleares —tras el vencimiento del tratado New START en febrero de 2026— y en cuestiones vinculadas a Irán, mientras que autoridades rusas ven una oportunidad para abordar el conflicto ucraniano.',
          'El presidente ucraniano, Volodímir Zelenski, expresó preocupación ante la posibilidad de que las grandes potencias debatan el conflicto sin la participación de Kiev. Aunque la cumbre entre Trump, Putin y Xi está confirmada para el jueves (19), el alcance de las negociaciones y la posibilidad de avances concretos permanecen indefinidos.',
        ],
      },
    },
  },
  {
    id: 'trump-filipinas-asia-comercio-seguranca-2026',
    imageUrl: '/assets/aistudio/image_e9f58b10.png',
    translations: {
      pt: {
        tag: 'GEOPOLÍTICA E COMÉRCIO',
        title:
          'Trump chega às Filipinas para viagem à Ásia com foco em comércio e segurança regional',
        summary:
          'Em sua primeira viagem internacional após as eleições de meio de mandato, Donald Trump desembarca em Manila para a cúpula da Asean, reunião do Quad e negociações comerciais na Ásia antes de seguir para a China.',
        dateAuthor: '17/11/2026 • Por Estadão Conteúdo',
        source: 'Associated Press / Estadão Conteúdo',
        imageAlt:
          'Presidente dos Estados Unidos Donald Trump desembarcando em Manila, nas Filipinas, para a cúpula da Asean e reuniões comerciais na Ásia',
        fullContent: [
          'O presidente dos Estados Unidos, Donald Trump, chegou nesta terça-feira (17) às Filipinas, primeira parada de uma viagem de três dias à Ásia marcada por negociações comerciais e encontros com aliados regionais. A agenda inclui reuniões com líderes do Sudeste Asiático, um acordo com a Tailândia e uma visita à China, onde estão previstas conversas sobre armas nucleares com Xi Jinping e Vladimir Putin. Trump também mencionou a possibilidade de se reunir com o líder norte-coreano Kim Jong Un.',
          'É a primeira viagem internacional do republicano desde as derrotas de seu partido nas eleições de meio de mandato. O presidente deixa os EUA em meio a problemas no setor aéreo e à repercussão da saída de Jensen Huang da Nvidia, após o executivo admitir um caso com uma suposta agente do governo chinês. Pequim negou envolvimento.',
          'Em Manila, Trump participará da cúpula da Associação das Nações do Sudeste Asiático (Asean) como convidado de honra, com recepção e jantar de gala. Antes, deverá se reunir com os líderes do Quad, formado por EUA, Austrália, Índia e Japão, que busca conter a influência chinesa na Ásia-Pacífico. Será o primeiro encontro do grupo desde o retorno de Trump à Casa Branca.',
          'O presidente também deve assinar um acordo comercial com a Tailândia. Em outubro de 2025, os países anunciaram um entendimento preliminar pelo qual Bangkok eliminaria tarifas sobre a maioria dos produtos americanos e barreiras a importações de automóveis, alimentos e medicamentos. O governo Trump afirmou ainda que a Tailândia compraria mais de US$ 18 bilhões em aeronaves dos EUA, além de produtos agrícolas e gás natural liquefeito (GNL). Em fevereiro, a Suprema Corte americana derrubou a tarifa de 19% imposta por Trump sobre produtos tailandeses, levando o governo a estabelecer uma taxa substituta de 12,5% em julho.',
          'Em uma reunião especial com os líderes da Asean, Trump deverá abordar comércio, segurança, a violência em Mianmar e as disputas no Mar do Sul da China. Os países do bloco negociam um pacto de não agressão com Pequim, que reivindica quase toda a região marítima, enquanto Washington rejeita as reivindicações chinesas e reafirma sua obrigação de defender as Filipinas, aliadas por tratado, em caso de ataque armado.',
          'A chegada de Trump foi precedida por um protesto de cerca de 1.500 manifestantes de esquerda em Manila, que criticaram a influência dos EUA sobre a política externa filipina. Na quarta-feira (18), Trump será recebido pelo presidente Ferdinand Marcos Jr. com honras militares e banquete de Estado no Palácio de Malacañang, além de uma possível visita à ex-primeira-dama Imelda Marcos, de 97 anos.',
          'O presidente americano também deverá anunciar acordos e investimentos em aviação, defesa, energia e tecnologia antes de seguir a Shenzhen, na China, para a cúpula da Cooperação Econômica Ásia-Pacífico (Apec).',
        ],
      },
      en: {
        tag: 'GEOPOLITICS & TRADE',
        title:
          'Trump arrives in the Philippines for Asia trip focused on trade and regional security',
        summary:
          'On his first international trip since the midterm elections, Donald Trump lands in Manila for the ASEAN summit, a Quad meeting, and trade talks in Asia before heading to China.',
        dateAuthor: 'Nov 17, 2026 • By Estadão Conteúdo',
        source: 'Associated Press / Estadão Conteúdo',
        imageAlt:
          'U.S. President Donald Trump arriving in Manila, Philippines, for the ASEAN summit and regional trade meetings',
        fullContent: [
          'U.S. President Donald Trump arrived on Tuesday (17) in the Philippines, the first stop on a three-day trip to Asia marked by trade negotiations and meetings with regional allies. The itinerary includes sessions with Southeast Asian leaders, an agreement with Thailand, and a visit to China, where talks on nuclear weapons with Xi Jinping and Vladimir Putin are expected. Trump also raised the possibility of meeting North Korean leader Kim Jong Un.',
          'It is the Republican president’s first international trip since his party’s losses in the midterm elections. He leaves the United States amid aviation-sector disruptions and fallout from Jensen Huang’s departure from Nvidia after the executive admitted an affair with an alleged Chinese government agent. Beijing denied any involvement.',
          'In Manila, Trump will attend the Association of Southeast Asian Nations (ASEAN) summit as guest of honor, including a reception and gala dinner. Earlier, he is set to meet with leaders of the Quad—comprising the United States, Australia, India, and Japan—aimed at countering Chinese influence in the Indo-Pacific, marking the group’s first summit since Trump returned to the White House.',
          'The president is also expected to sign a trade agreement with Thailand. In October 2025, the two countries announced a preliminary framework under which Bangkok would eliminate tariffs on most U.S. goods and remove import barriers on automobiles, food, and pharmaceuticals. The Trump administration also stated that Thailand would purchase more than US$ 18 billion in U.S. aircraft, alongside agricultural goods and liquefied natural gas (LNG). In February, the U.S. Supreme Court struck down Trump’s 19% tariff on Thai products, prompting the administration to introduce a replacement 12.5% duty in July.',
          'In a special session with ASEAN leaders, Trump is expected to address trade, security, violence in Myanmar, and disputes in the South China Sea. Bloc members are negotiating a non-aggression pact with Beijing, which claims nearly the entire maritime corridor, while Washington rejects China’s claims and reaffirms its treaty obligation to defend the Philippines in the event of an armed attack.',
          'Trump’s arrival was preceded by a protest of roughly 1,500 left-wing demonstrators in Manila criticizing U.S. influence over Philippine foreign policy. On Wednesday (18), Trump will be welcomed by President Ferdinand Marcos Jr. with military honors and a state banquet at Malacañang Palace, along with a possible visit to 97-year-old former first lady Imelda Marcos.',
          'The U.S. president is also slated to announce deals and investments in aviation, defense, energy, and technology before traveling to Shenzhen, China, for the Asia-Pacific Economic Cooperation (APEC) summit.',
        ],
      },
      es: {
        tag: 'GEOPOLÍTICA Y COMERCIO',
        title:
          'Trump llega a Filipinas en viaje por Asia con foco en comercio y seguridad regional',
        summary:
          'En su primer viaje internacional tras las elecciones de medio término, Donald Trump aterriza en Manila para la cumbre de la Asean, reunión del Quad y negociaciones comerciales en Asia antes de seguir rumbo a China.',
        dateAuthor: '17/11/2026 • Por Estadão Conteúdo',
        source: 'Associated Press / Estadão Conteúdo',
        imageAlt:
          'El presidente de Estados Unidos Donald Trump llegando a Manila, Filipinas, para la cumbre de la Asean y reuniones comerciales en Asia',
        fullContent: [
          'El presidente de Estados Unidos, Donald Trump, llegó este martes (17) a Filipinas, primera escala de una gira de tres días por Asia marcada por negociaciones comerciales y encuentros con aliados regionales. La agenda incluye reuniones con líderes del Sudeste Asiático, un acuerdo con Tailandia y una visita a China, donde están previstas conversaciones sobre armas nucleares con Xi Jinping y Vladímir Putin. Trump también mencionó la posibilidad de reunirse con el líder norcoreano Kim Jong Un.',
          'Es el primer viaje internacional del republicano desde las derrotas de su partido en las elecciones de medio término. El mandatario deja EE. UU. en medio de problemas en el sector aéreo y la repercusión por la salida de Jensen Huang de Nvidia, luego de que el ejecutivo admitiera una relación con una supuesta agente del gobierno chino. Pekín negó cualquier implicación.',
          'En Manila, Trump participará en la cumbre de la Asociación de Naciones del Sudeste Asiático (Asean) como invitado de honor, con recepción y cena de gala. Previamente, deberá reunirse con los líderes del Quad —integrado por EE. UU., Australia, India y Japón—, que busca contener la influencia china en Asia-Pacífico, en el primer encuentro del grupo desde el regreso de Trump a la Casa Blanca.',
          'El presidente también prevé firmar un acuerdo comercial con Tailandia. En octubre de 2025, ambos países anunciaron un entendimiento preliminar por el cual Bangkok eliminaría aranceles sobre la mayoría de los productos estadounidenses y barreras a importaciones de automóviles, alimentos y medicamentos. El gobierno de Trump afirmó además que Tailandia compraría más de US$ 18 mil millones en aeronaves estadounidenses, además de productos agrícolas y gas natural licuado (GNL). En febrero, la Corte Suprema de EE. UU. anuló el arancel del 19% impuesto por Trump a productos tailandeses, lo que llevó a la administración a fijar una tasa sustitutiva del 12,5% en julio.',
          'En una reunión especial con los líderes de la Asean, Trump deberá abordar comercio, seguridad, la violencia en Myanmar y las disputas en el Mar de China Meridional. Los países del bloque negocian un pacto de no agresión con Pekín, que reclama casi toda esa zona marítima, mientras Washington rechaza las reivindicaciones chinas y reafirma su obligación de defender a Filipinas, aliada por tratado, en caso de ataque armado.',
          'La llegada de Trump estuvo precedida por una protesta de cerca de 1.500 manifestantes de izquierda en Manila, que criticaron la influencia de EE. UU. sobre la política exterior filipina. El miércoles (18), Trump será recibido por el presidente Ferdinand Marcos Jr. con honores militares y banquete de Estado en el Palacio de Malacañán, además de una posible visita a la exprimera dama Imelda Marcos, de 97 años.',
          'El mandatario estadounidense también anunciará acuerdos e inversiones en aviación, defensa, energía y tecnología antes de trasladarse a Shenzhen, China, para la cumbre de Cooperación Económica Asia-Pacífico (Apec).',
        ],
      },
    },
  },
  {
    id: 'ue-direitos-autor-ia-2026',
    imageUrl: '/assets/aistudio/image_05dbcb78.png',
    translations: {
      pt: {
        tag: 'TECNOLOGIA & REGULAÇÃO',
        title: 'Alemanha e 10 países da UE pedem novas regras de direitos de autor para era da IA',
        summary:
          'Grupo de 11 Estados-membros da União Europeia pressiona a Comissão Europeia por legislação urgente que proteja obras criativas contra a coleta automatizada de dados no treinamento de modelos de inteligência artificial.',
        dateAuthor: '17/11/2026 • Por Luca Bertuzzi',
        source: 'Euronews / Conselho da União Europeia',
        imageAlt:
          'Wolfram Weimer, Ministro de Estado e Comissário do Governo Federal para a Cultura e os Media da Alemanha, discursando sobre direitos autorais na era da IA',
        fullContent: [
          'A Alemanha e outros dez Estados-membros da União Europeia — Espanha, Polónia, Áustria, Chipre, Croácia, Dinamarca, Estónia, Portugal, Eslováquia e Eslovénia — solicitaram formalmente que a Comissão Europeia apresente com urgência uma nova proposta legislativa para proteger obras protegidas por direitos de autor na era da inteligência artificial, antes da reunião de ministros da Cultura.',
          'Sistemas avançados de IA, como grandes modelos de linguagem, são treinados com bilhões de dados extraídos da internet aberta muitas vezes sem autorização. Enquanto as indústrias criativas e culturais denunciam o uso não remunerado de suas obras, setores tecnológicos e ministérios da Economia alertam que restrições rígidas podem deixar a Europa atrás dos Estados Unidos e da China na corrida da IA.',
          'Os países signatários defendem um equilíbrio entre a proteção do trabalho criativo humano e o fomento à inovação, exigindo concorrência leal e condições de igualdade com desenvolvedores não europeus, independentemente de onde os modelos foram treinados.',
          'Embora a UE já conte com uma diretiva que permite aos criadores recusar o uso de suas obras em sistemas de IA, o bloco pede mecanismos mais eficazes para fazer cumprir essa exclusão. A Comissão Europeia encerrou recentemente uma consulta pública sobre o tema e prevê apresentar um novo pacote legislativo digital no segundo trimestre de 2027.',
        ],
      },
      en: {
        tag: 'TECHNOLOGY & REGULATION',
        title: 'Germany and 10 EU countries call for new copyright rules for the AI era',
        summary:
          'A coalition of 11 European Union member states is urging the European Commission for urgent legislation protecting creative works against automated data scraping for training artificial intelligence models.',
        dateAuthor: 'Nov 17, 2026 • By Luca Bertuzzi',
        source: 'Euronews / Council of the European Union',
        imageAlt:
          'Wolfram Weimer, German Minister of State and Federal Government Commissioner for Culture and the Media, speaking on copyright in the AI era',
        fullContent: [
          'Germany and ten other European Union member states — Spain, Poland, Austria, Cyprus, Croatia, Denmark, Estonia, Portugal, Slovakia, and Slovenia — have formally urged the European Commission to urgently bring forward a new legislative proposal safeguarding copyrighted works in the age of artificial intelligence ahead of the EU Culture Ministers meeting.',
          'Advanced AI systems such as large language models are trained on billions of data points scraped from the open web, frequently without prior authorization. While creative and cultural industries denounce the unremunerated use of their works, technology groups and economy ministries warn that overly strict curbs could leave Europe trailing the United States and China in the global AI race.',
          'The signatory nations advocate striking a balance between protecting human creative labor and fostering technological innovation, calling for fair competition and a level playing field with non-European developers regardless of where the models were trained.',
          'Although the EU already has a directive allowing rightsholders to opt out of having their works used in AI training, the coalition seeks stronger enforcement mechanisms to make those opt-outs effective. The European Commission recently closed a public consultation on the issue and plans to unveil a new digital legislative package in the second quarter of 2027.',
        ],
      },
      es: {
        tag: 'TECNOLOGÍA & REGULACIÓN',
        title: 'Alemania y 10 países de la UE piden nuevas normas de derechos de autor para la era de la IA',
        summary:
          'Un grupo de 11 Estados miembros de la Unión Europea presiona a la Comisión Europea por una legislación urgente que proteja las obras creativas frente a la extracción automatizada de datos para entrenar modelos de inteligencia artificial.',
        dateAuthor: '17/11/2026 • Por Luca Bertuzzi',
        source: 'Euronews / Consejo de la Unión Europea',
        imageAlt:
          'Wolfram Weimer, ministro de Estado y comisionado federal de Cultura y Medios de Alemania, interviniendo sobre derechos de autor en la era de la IA',
        fullContent: [
          'Alemania y otros diez Estados miembros de la Unión Europea — España, Polonia, Austria, Chipre, Croacia, Dinamarca, Estonia, Portugal, Eslovaquia y Eslovenia — solicitaron formalmente a la Comisión Europea que presente con urgencia una nueva propuesta legislativa para proteger las obras con derechos de autor en la era de la inteligencia artificial, antes de la reunión de ministros de Cultura.',
          'Los sistemas avanzados de IA, como los grandes modelos de lenguaje, se entrenan con miles de millones de datos extraídos de la internet abierta, muchas veces sin autorización. Mientras las industrias creativas y culturales denuncian el uso no remunerado de sus obras, sectores tecnológicos y ministerios de Economía advierten que restricciones rígidas podrían dejar a Europa por detrás de Estados Unidos y China en la carrera de la IA.',
          'Los países firmantes defienden un equilibrio entre la protección del trabajo creativo humano y el impulso a la innovación, exigiendo competencia leal e igualdad de condiciones frente a desarrolladores no europeos, con independencia de dónde hayan sido entrenados los modelos.',
          'Aunque la UE ya cuenta con una directiva que permite a los creadores rechazar el uso de sus obras en sistemas de IA, el bloque pide mecanismos más eficaces para hacer cumplir esa exclusión. La Comisión Europea cerró recientemente una consulta pública sobre el tema y prevé presentar un nuevo paquete legislativo digital en el segundo trimestre de 2027.',
        ],
      },
    },
  },
  {
    id: 'ue-crescimento-energia-inflacao-2026',
    imageUrl: '/assets/aistudio/Capturar-1_94d673b9.webp',
    translations: {
      pt: {
        tag: 'MACROECONOMIA & EUROPA',
        title: 'União Europeia cresce acima do previsto mas energia mantém inflação elevada',
        summary:
          'A Comissão Europeia elevou a projeção de crescimento da UE para 1,4% este ano impulsionada por exportações de tecnologia e energia, mas alerta que a inflação seguirá acima de 3% até 2027 devido aos altos custos energéticos.',
        dateAuthor: '17/11/2026 • Por Quirino Mealha',
        source: 'Euronews / Comissão Europeia',
        imageAlt:
          'Comissário europeu da Economia Valdis Dombrovskis durante apresentação das projeções econômicas na Comissão Europeia',
        fullContent: [
          'A Comissão Europeia prevê que a economia da UE cresça 1,4% este ano (acima dos 1,1% estimados em maio), enquanto a zona euro deve avançar 1,2% em 2026 e 2027. O crescimento foi impulsionado pelas exportações de equipamentos de geração de energia, arrefecimento e fabricação de chips para centros de dados de IA e redes elétricas globais.',
          'Por outro lado, a inflação média da UE deve ficar em 3,3% este ano e 3,2% em 2027 (ante 2,4% previstos anteriormente), atingindo pico acima de 4% na virada do ano e retornando a 2,3% apenas em 2028, pressionada pelos custos energéticos decorrentes do conflito com o Irã e pelo repasse nas faturas domésticas de gás, eletricidade e alimentos.',
          'Segundo o comissário europeu da Economia, Valdis Dombrovskis, os preços elevados pressionam famílias e empresas. Ainda assim, a Comissão observa que uma queda recente de cerca de 20% no petróleo e gás desde o fim de outubro pode aliviar a inflação do próximo ano caso se mantenha.',
          'No campo fiscal e trabalhista, o défice orçamental agregado da UE deve subir de 3,1% para 3,6% do PIB, com a dívida pública alcançando 85,6% até 2028 e os juros do BCE pressionando o crédito. Entre as maiores economias da zona euro, a Espanha lidera o crescimento (2,6%), seguida por Alemanha (1,3%), Itália (1,0%) e França (0,4%). O mercado de trabalho segue resiliente com a criação estimada de 800 mil empregos e desemprego próximo de 6%, embora os salários reais cresçam apenas 0,6%.',
        ],
      },
      en: {
        tag: 'MACROECONOMICS & EUROPE',
        title: 'European Union grows faster than expected, but energy keeps inflation elevated',
        summary:
          'The European Commission raised its EU growth forecast to 1.4% this year driven by technology and power-equipment exports, but warns inflation will remain above 3% through 2027 on high energy costs.',
        dateAuthor: 'Nov 17, 2026 • By Quirino Mealha',
        source: 'Euronews / European Commission',
        imageAlt:
          'European Commissioner for Economy Valdis Dombrovskis presenting economic forecasts at the European Commission',
        fullContent: [
          'The European Commission expects the EU economy to grow 1.4% this year (up from the 1.1% projected in May), while the eurozone is forecast to expand 1.2% in both 2026 and 2027. Growth has been propelled by exports of power generation, cooling, and semiconductor manufacturing equipment for AI data centers and global electricity grids.',
          'On the other hand, average EU inflation is projected at 3.3% this year and 3.2% in 2027 (compared with 2.4% previously estimated), peaking above 4% around the turn of the year before easing toward 2.3% only in 2028, pressured by energy costs stemming from the conflict with Iran and pass-through into household gas, electricity, and food bills.',
          'According to European Commissioner for Economy Valdis Dombrovskis, elevated prices are squeezing households and businesses. Even so, the Commission notes that a recent drop of roughly 20% in oil and gas prices since late October could temper next year’s inflation if sustained.',
          'On the fiscal and labor front, the EU’s aggregate budget deficit is projected to widen from 3.1% to 3.6% of GDP, with public debt reaching 85.6% by 2028 and ECB interest rates weighing on credit. Among major eurozone economies, Spain leads growth (2.6%), followed by Germany (1.3%), Italy (1.0%), and France (0.4%). The labor market remains resilient with an estimated 800,000 jobs created and unemployment near 6%, though real wages grow just 0.6%.',
        ],
      },
      es: {
        tag: 'MACROECONOMÍA & EUROPA',
        title: 'La Unión Europea crece por encima de lo previsto, pero la energía mantiene la inflación elevada',
        summary:
          'La Comisión Europea elevó su previsión de crecimiento de la UE al 1,4% este año impulsada por exportaciones de tecnología y energía, pero advierte que la inflación seguirá por encima del 3% hasta 2027 debido a los altos costos energéticos.',
        dateAuthor: '17/11/2026 • Por Quirino Mealha',
        source: 'Euronews / Comisión Europea',
        imageAlt:
          'El comisario europeo de Economía Valdis Dombrovskis durante la presentación de previsiones económicas en la Comisión Europea',
        fullContent: [
          'La Comisión Europea prevé que la economía de la UE crezca un 1,4% este año (por encima del 1,1% estimado en mayo), mientras que la eurozona avanzaría un 1,2% en 2026 y 2027. El crecimiento estuvo impulsado por las exportaciones de equipos de generación eléctrica, refrigeración y fabricación de chips para centros de datos de IA y redes eléctricas globales.',
          'Por otro lado, la inflación media de la UE se situaría en 3,3% este año y 3,2% en 2027 (frente al 2,4% previsto anteriormente), alcanzando un pico superior al 4% hacia el cambio de año y regresando al 2,3% recién en 2028, presionada por los costos energéticos derivados del conflicto con Irán y su traslado a las facturas domésticas de gas, electricidad y alimentos.',
          'Según el comisario europeo de Economía, Valdis Dombrovskis, los precios elevados presionan a familias y empresas. Aun así, la Comisión señala que una caída reciente cercana al 20% en el petróleo y el gas desde finales de octubre podría moderar la inflación del próximo año si se mantiene.',
          'En el ámbito fiscal y laboral, el déficit presupuestario agregado de la UE subiría del 3,1% al 3,6% del PIB, con la deuda pública alcanzando el 85,6% hacia 2028 y las tasas del BCE presionando el crédito. Entre las mayores economías de la eurozona, España lidera el crecimiento (2,6%), seguida por Alemania (1,3%), Italia (1,0%) y Francia (0,4%). El mercado laboral sigue resiliente con la creación estimada de 800 mil empleos y desempleo cercano al 6%, aunque los salarios reales crecen solo un 0,6%.',
        ],
      },
    },
  },
  {
    id: 'mdic-apex-webserie-mercosul-ue',
    imageUrl: mercosulEuTradeImg,
    translations: {
      pt: {
        tag: 'Comércio Exterior',
        title:
          'MDIC e ApexBrasil lançam websérie sobre oportunidades do Acordo Mercosul – União Europeia',
        summary:
          'Com 10 episódios exibidos às terças e quintas-feiras, a série "Do Acordo ao Mercado" orienta exportadores brasileiros sobre o espaço integrado de mais de 700 milhões de pessoas e PIB de US$ 22 trilhões.',
        dateAuthor: '04/11/2026 • Por Fabiana Ceyhan',
        source: 'Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC)',
        imageAlt:
          'Bandeiras do Brasil, Mercosul e União Europeia lado a lado simbolizando o acordo comercial internacional',
        fullContent: [
          'O Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC) e a Agência Brasileira de Promoção de Exportações e Investimentos (ApexBrasil) lançaram oficialmente a websérie educativa "Do Acordo ao Mercado", dedicada a detalhar as oportunidades comerciais, tarifárias e produtivas geradas pelo Acordo Mercosul – União Europeia.',
          'Estruturada em 10 episódios, com estreias programadas às terças e quintas-feiras, a produção foi concebida para traduzir os capítulos técnicos do tratado em orientações práticas para empresários, associações setoriais, tradings e micro, pequenas e médias empresas interessadas em iniciar ou ampliar exportações para o mercado europeu.',
          'Ao longo dos episódios, autoridades e técnicos diretamente ligados às negociações e à agenda de comércio exterior analisam os impactos setoriais e os caminhos de habilitação exportadora. Entre os participantes confirmados estão Márcio Elias Rosa, secretário-executivo do MDIC, Tatiana Prazeres, secretária de Comércio Exterior do MDIC, além dos especialistas Daniela Ferreira de Matos e Laudemir Müller.',
          'Os conteúdos abordam temas estratégicos para a competitividade do setor produtivo nacional, incluindo cronogramas de desgravação tarifária, regras de origem, exigências sanitárias e fitossanitárias, sustentabilidade nas cadeias produtivas, compras governamentais, propriedade intelectual e acesso a mercados de alto valor agregado.',
          'Segundo os dados apresentados na iniciativa, a integração entre o Mercosul e a União Europeia consolida uma das maiores áreas de livre comércio do mundo, conectando um mercado consumidor superior a 700 milhões de pessoas e um Produto Interno Bruto (PIB) combinado estimado em cerca de US$ 22 trilhões.',
          'Para investidores e empresas brasileiras, o acordo amplia a previsibilidade jurídica e institucional no relacionamento econômico com os 27 países do bloco europeu, estimulando o adensamento industrial, a diversificação da pauta exportadora e novos fluxos de investimento produtivo bilateral.',
        ],
      },
      en: {
        tag: 'Foreign Trade',
        title:
          'MDIC and ApexBrasil launch web series on opportunities under the Mercosur–European Union Agreement',
        summary:
          'Spanning 10 episodes released on Tuesdays and Thursdays, "From Agreement to Market" guides Brazilian exporters through a combined bloc of over 700 million people and US$ 22 trillion in GDP.',
        dateAuthor: 'Nov 04, 2026 • By Fabiana Ceyhan',
        source: 'Ministry of Development, Industry, Trade and Services (MDIC)',
        imageAlt:
          'Flags of Brazil, Mercosur, and the European Union side by side symbolizing the bilateral trade accord',
        fullContent: [
          'Brazil’s Ministry of Development, Industry, Trade and Services (MDIC) and the Brazilian Trade and Investment Promotion Agency (ApexBrasil) have officially launched the educational web series "Do Acordo ao Mercado" ("From Agreement to Market"), designed to unpack the commercial, tariff, and industrial opportunities created by the Mercosur–European Union Agreement.',
          'Comprising 10 episodes airing every Tuesday and Thursday, the series translates the technical chapters of the treaty into practical guidance for executives, industry associations, and micro, small, and medium-sized enterprises aiming to enter or scale exports across the European single market.',
          'Throughout the program, senior policymakers and trade specialists involved in the negotiations and foreign-trade strategy break down sectoral impacts and export readiness steps. Featured contributors include Márcio Elias Rosa, Executive Secretary of MDIC, Tatiana Prazeres, Secretary of Foreign Trade at MDIC, alongside trade experts Daniela Ferreira de Matos and Laudemir Müller.',
          'Episodes cover core pillars for export competitiveness, including tariff phase-out schedules, rules of origin, sanitary and phytosanitary standards, supply-chain sustainability requirements, public procurement, intellectual property, and market access for higher value-added goods.',
          'As highlighted in the initiative, full implementation of the Mercosur–European Union framework establishes one of the largest free-trade areas in the world, encompassing more than 700 million consumers and a combined gross domestic product (GDP) of approximately US$ 22 trillion.',
          'For Brazilian companies and international investors, the accord strengthens legal and regulatory predictability with all 27 EU member states, fostering industrial integration, export diversification, and sustained bilateral capital flows.',
        ],
      },
      es: {
        tag: 'Comercio Exterior',
        title:
          'MDIC y ApexBrasil lanzan serie web sobre oportunidades del Acuerdo Mercosur – Unión Europea',
        summary:
          'Con 10 episodios emitidos los martes y jueves, la serie "Del Acuerdo al Mercado" orienta a exportadores brasileños sobre un espacio integrado de más de 700 millones de personas y un PIB de US$ 22 billones.',
        dateAuthor: '04/11/2026 • Por Fabiana Ceyhan',
        source: 'Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC)',
        imageAlt:
          'Banderas de Brasil, Mercosur y la Unión Europea lado a lado simbolizando el acuerdo comercial internacional',
        fullContent: [
          'El Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC) y la Agencia Brasileña de Promoción de Exportaciones e Inversiones (ApexBrasil) lanzaron oficialmente la serie web educativa "Do Acordo ao Mercado" ("Del Acuerdo al Mercado"), dedicada a explicar las oportunidades comerciales, arancelarias y productivas derivadas del Acuerdo Mercosur – Unión Europea.',
          'Estructurada en 10 episodios que se estrenan los martes y jueves, la producción busca traducir los capítulos técnicos del tratado en orientación práctica para empresas, cámaras sectoriales y micro, pequeñas y medianas firmas interesadas en iniciar o ampliar sus exportaciones hacia Europa.',
          'A lo largo de la serie, autoridades y especialistas vinculados directamente con las negociaciones y la agenda de comercio exterior analizan el impacto sectorial y la preparación exportadora. Entre los participantes confirmados se encuentran Márcio Elias Rosa, secretario ejecutivo del MDIC, Tatiana Prazeres, secretaria de Comercio Exterior del MDIC, junto a los especialistas Daniela Ferreira de Matos y Laudemir Müller.',
          'Los contenidos abordan ejes clave para la competitividad internacional, entre ellos cronogramas de desgravación arancelaria, reglas de origen, requisitos sanitarios y fitosanitarios, sostenibilidad en cadenas de suministro, compras públicas, propiedad intelectual y acceso para bienes de mayor valor agregado.',
          'De acuerdo con las cifras presentadas en la iniciativa, la integración entre el Mercosur y la Unión Europea conforma una de las mayores zonas de libre comercio del planeta, reuniendo un mercado consumidor de más de 700 millones de personas y un Producto Interno Bruto (PIB) conjunto cercano a US$ 22 billones.',
          'Para empresas e inversores, el tratado amplía la previsibilidad jurídica e institucional en la relación económica con los 27 países del bloque europeo, impulsando la modernización industrial, la diversificación exportadora y nuevos flujos de inversión productiva bilateral.',
        ],
      },
    },
  },
];
