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
