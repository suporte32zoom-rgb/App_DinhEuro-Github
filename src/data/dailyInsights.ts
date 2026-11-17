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
