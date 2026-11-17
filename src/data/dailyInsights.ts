import type { SupportedLanguage } from '../i18n/translations';
import mercosulEuTradeImg from '../assets/images/mercosul_eu_trade_1794944856986.jpg';

export interface DailyInsightLocalized {
  tag: string;
  title: string;
  summary: string;
  dateAuthor: string;
  source: string;
  imageAlt: string;
  fullContent: string[];
}

export interface DailyInsightItem {
  id: string;
  imageUrl: string;
  translations: Record<SupportedLanguage, DailyInsightLocalized>;
}

export const MAX_DAILY_INSIGHTS = 6;

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
