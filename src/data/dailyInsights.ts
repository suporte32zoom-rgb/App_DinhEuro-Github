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
    id: 'mdic-acordo-mercosul-ue-exportacoes-21-por-cento-2026',
    isoDate: '2026-11-21',
    imageUrl: '/assets/aistudio/image_fae53297.png',
    translations: {
      pt: {
        tag: 'Empresa, Indústria e Comércio',
        title:
          'Acordo Mercosul–União Europeia impulsiona em 21% exportações brasileiras beneficiadas ao mercado europeu',
        summary:
          'Balanço do MDIC mostra que vendas de produtos beneficiados cresceram 21% entre maio e setembro de 2026 ante igual período de 2025, lideradas por abacates frescos (+421%), mel (+367%), óleo de milho (+266%) e transformadores elétricos (US$ 39 milhões).',
        dateAuthor: '21/11/2026 • Redação DinhEuro',
        source: 'Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC)',
        readingTime: '4 min',
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
          'O Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC) destaca os primeiros resultados do Acordo Mercosul-União Europeia para as exportações brasileiras. Entre maio, quando o acordo entrou em vigor, e setembro de 2026, as vendas de produtos brasileiros beneficiados pelo acordo ao mercado europeu cresceram 21%, na comparação com o mesmo período de 2025. Mel, abacates frescos e óleo de milho estão entre os produtos com maior crescimento nas exportações nos primeiros cinco meses de aplicação provisória do acordo, iniciada em 1º de maio.',
          'A redução ou eliminação de tarifas amplia a competitividade dos produtos brasileiros e cria oportunidades para as empresas nacionais expandirem suas vendas ao mercado europeu.',
          '“O acordo entre o Mercosul e a União Europeia é uma conquista da política comercial brasileira e um passo importante para o desenvolvimento do país. Fortalecer nossas relações econômicas com parceiros estratégicos, ampliar as oportunidades para os setores produtivos e gerar empregos de qualidade são objetivos que orientam a atuação do governo. O Brasil ganha novas condições para agregar valor à sua produção e ampliar sua participação no comércio mundial”, afirma o ministro do Desenvolvimento, Indústria, Comércio e Serviços (MDIC), Márcio Elias Rosa.',
          '## Produtos brasileiros ampliam vendas à União Europeia',
          'Entre os destaques do período, as exportações de abacates frescos cresceram 421%, enquanto as de mel avançaram 367% e as de óleo de milho, 266%. Também registraram crescimento expressivo:',
          '- Ferrossilício-manganês: +173%',
          '- Alumínio em bruto: +107%',
          '- Óleos combustíveis: +102%',
          '- Etanol: +95,2%',
          '- Óleo essencial de laranja: +75,8%',
          '- Maçãs frescas: +29%',
          'Outro destaque foram os transformadores elétricos, cujas exportações passaram de zero, entre maio e setembro de 2025, para US$ 39 milhões no mesmo período de 2026. As variações abrangem diferentes segmentos da pauta exportadora brasileira, incluindo produtos agropecuários e bens industriais, em um período marcado pelo início da aplicação das preferências tarifárias do acordo.',
          '“Os primeiros resultados são positivos e mostram que o acordo já começa a abrir oportunidades para os produtos brasileiros no mercado europeu. Nosso objetivo é fazer com que seus benefícios cheguem efetivamente a mais empresas brasileiras. Para isso, estamos trabalhando na divulgação das oportunidades e no apoio aos exportadores. Há um potencial importante a ser explorado, tanto para ampliar as vendas de quem já exporta quanto para permitir que novas empresas conquistem espaço no comércio internacional”, afirma a secretária de Comércio Exterior, Tatiana Prazeres.',
          '## Orientação às empresas',
          'Para apoiar os exportadores no aproveitamento das oportunidades comerciais, o MDIC disponibiliza informações e materiais técnicos sobre o acordo no Portal Siscomex. A página reúne orientações sobre preferências tarifárias, regras de origem e requisitos para que os produtos brasileiros possam usufruir dos benefícios negociados.',
          'Entre os materiais disponíveis estão:',
          '1. Manual de regras de origem: apresenta os critérios que os produtos precisam cumprir para ter acesso às preferências tarifárias;',
          '2. Manual de desgravação tarifária: orienta sobre a redução e a eliminação das tarifas previstas no acordo;',
          '3. Manual de indicações geográficas: reúne informações sobre a proteção de produtos associados a determinadas regiões;',
          '4. Tabelas de preferências tarifárias: permitem consultar as condições negociadas para os produtos comercializados entre os dois blocos.',
          '## Da negociação aos resultados concretos',
          'As negociações entre o Mercosul e a União Europeia começaram em 1999 e se estenderam por mais de 25 anos. Os instrumentos do acordo foram assinados em janeiro de 2026, e a aplicação provisória de suas disposições comerciais começou em 1º de maio do mesmo ano.',
          'O acordo prevê a redução ou eliminação gradual de tarifas e estabelece regras para ampliar o comércio entre os dois blocos, permitindo que empresas brasileiras utilizem as preferências negociadas desde que cumpram as condições previstas para cada produto.',
          'Conectando dois grandes mercados — com aproximadamente 720 milhões de pessoas e um Produto Interno Bruto combinado superior a US$ 22 trilhões —, a ampliação do acesso ao mercado europeu representa uma oportunidade para aumentar as exportações, diversificar os destinos dos produtos nacionais e fortalecer a competitividade das empresas brasileiras.',
        ],
      },
      en: {
        tag: 'Business, Industry & Trade',
        title:
          'Mercosur–EU Agreement lifts tariff-benefited Brazilian exports to Europe by 21%',
        summary:
          'MDIC data show eligible exports grew 21% between May and September 2026 compared with the same period in 2025, led by fresh avocados (+421%), honey (+367%), corn oil (+266%), and electrical transformers (US$ 39 million).',
        dateAuthor: 'Nov 21, 2026 • DinhEuro Editorial',
        source: 'Ministry of Development, Industry, Trade and Services (MDIC)',
        readingTime: '4 min read',
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
          'Brazil’s Ministry of Development, Industry, Trade and Services (MDIC) has highlighted the first trade results of the Mercosur–European Union Agreement for Brazilian exports. Between May—when provisional application took effect—and September 2026, European sales of Brazilian products benefiting from the accord rose 21% compared with the same period in 2025, led by honey, fresh avocados, and corn oil.',
          'Lower or eliminated customs duties strengthen the competitiveness of Brazilian goods and open new expansion opportunities across European markets.',
          '“The agreement between Mercosur and the European Union is an achievement of Brazilian trade policy and an important step for national development. Strengthening economic ties with strategic partners, expanding opportunities for productive sectors, and generating quality jobs guide our government’s work,” said MDIC Minister Márcio Elias Rosa.',
          '## Brazilian goods expand EU sales',
          'Standout performers during the five-month window included fresh avocados (+421%), honey (+367%), and corn oil (+266%), alongside strong industrial and agribusiness gains:',
          '- Ferrosilicon-manganese: +173%',
          '- Unwrought aluminum: +107%',
          '- Fuel oils: +102%',
          '- Ethanol: +95.2%',
          '- Orange essential oil: +75.8%',
          '- Fresh apples: +29%',
          'Electrical transformers also surged from zero exports between May and September 2025 to US$ 39 million in the same period of 2026, underscoring broad-based momentum across both agricultural goods and manufactured equipment.',
          '“The initial results are positive and show the agreement is already opening opportunities for Brazilian products in Europe,” noted Foreign Trade Secretary Tatiana Prazeres, emphasizing ongoing outreach to help both established and first-time exporters leverage the new rules.',
          '## Guidance for exporters',
          'To assist businesses in capturing tariff preferences, MDIC provides dedicated technical resources on the Siscomex Portal:',
          '1. Rules of Origin Manual: outlines eligibility criteria products must satisfy to qualify for preferential tariffs;',
          '2. Tariff Phase-Out Manual: details schedules for duty reductions and eliminations;',
          '3. Geographical Indications Manual: covers protection for regionally designated products;',
          '4. Tariff Preference Tables: allow exporters to look up negotiated terms between both blocs.',
          '## From negotiations to concrete results',
          'Launched in 1999, Mercosur–EU talks spanned over 25 years before instruments were signed in January 2026 and provisional trade provisions began on May 1, 2026. The accord links roughly 720 million consumers and a combined GDP exceeding US$ 22 trillion, strengthening export diversification and competitiveness for Brazilian companies.',
        ],
      },
      es: {
        tag: 'Empresa, Industria y Comercio',
        title:
          'El Acuerdo Mercosur–Unión Europea impulsa en 21% las exportaciones brasileñas beneficiadas hacia Europa',
        summary:
          'Cifras del MDIC muestran un alza del 21% entre mayo y septiembre de 2026 frente al mismo período de 2025, liderada por aguacates frescos (+421%), miel (+367%), aceite de maíz (+266%) y transformadores eléctricos (US$ 39 millones).',
        dateAuthor: '21/11/2026 • Redacción DinhEuro',
        source: 'Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC)',
        readingTime: '4 min',
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
          'El Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC) destacó los primeros resultados del Acuerdo Mercosur–Unión Europea para las exportaciones brasileñas. Entre mayo, cuando entró en vigor la aplicación provisional, y septiembre de 2026, las ventas al mercado europeo de productos brasileños beneficiados crecieron un 21% respecto al mismo período de 2025, con fuerte impulso de la miel, aguacates frescos y aceite de maíz.',
          'La reducción o eliminación de aranceles refuerza la competitividad de la oferta brasileña y abre espacio para que más empresas amplíen sus envíos hacia Europa.',
          '“El acuerdo entre el Mercosur y la Unión Europea es un logro de la política comercial brasileña y un paso relevante para el desarrollo del país, agregando valor a la producción y ampliando nuestra participación en el comercio mundial”, destacó el ministro Márcio Elias Rosa.',
          '## Productos brasileños amplían ventas a la Unión Europea',
          'Entre los principales avances del período sobresalen aguacates frescos (+421%), miel (+367%) y aceite de maíz (+266%), junto con fuertes subas en insumos industriales y energía:',
          '- Ferrosilicio-manganeso: +173%',
          '- Aluminio en bruto: +107%',
          '- Aceites combustibles: +102%',
          '- Etanol: +95,2%',
          '- Aceite esencial de naranja: +75,8%',
          '- Manzanas frescas: +29%',
          'Asimismo, las exportaciones de transformadores eléctricos pasaron de cero entre mayo y septiembre de 2025 a US$ 39 millones en igual tramo de 2026, abarcando tanto bienes agropecuarios como manufacturas.',
          'La secretaria de Comercio Exterior, Tatiana Prazeres, subrayó que el objetivo es acercar estas preferencias arancelarias a más empresas exportadoras y a nuevas firmas interesadas en ingresar al mercado internacional.',
          '## Orientación a las empresas en el Portal Siscomex',
          'Para facilitar el aprovechamiento del tratado, el MDIC reúne guías técnicas en el Portal Siscomex:',
          '1. Manual de reglas de origen: criterios exigidos para acceder a las preferencias arancelarias;',
          '2. Manual de desgravación arancelaria: cronogramas de reducción y eliminación de tarifas;',
          '3. Manual de indicaciones geográficas: normas de protección para productos regionales;',
          '4. Tablas de preferencias arancelarias: consulta directa de condiciones negociadas entre ambos bloques.',
          '## De la negociación a los resultados concretos',
          'Iniciadas en 1999 y firmadas en enero de 2026, las disposiciones comerciales entraron en aplicación provisional el 1º de mayo de 2026, conectando un mercado de aproximadamente 720 millones de habitantes y un PIB combinado superior a US$ 22 billones.',
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
          'Em artigo de opinião, Tevi Troy analisa como presidentes eficazes lidam com alertas obscuros de agências de inteligência e contextualiza o ceticismo histórico da Casa Branca diante da CIA no caso envolvendo o ex-CEO da Nvidia.',
        dateAuthor: '20/11/2026 • Por Tevi Troy',
        source: 'Expressão Livre / Foto: Carolyn Kaster (Associated Press)',
        readingTime: '5 min',
        keywords: [
          'trump jensen huang nvidia',
          'cia inteligência estados unidos',
          'howard lutnick comércio china',
          'histórico cia presidentes eua',
          'tevi troy expressão livre',
        ],
        imageAlt:
          'Selo oficial da Agência Central de Inteligência dos Estados Unidos (CIA) ao lado da bandeira americana (Foto: Carolyn Kaster / Associated Press)',
        fullContent: [
          'Segundo notícias, o governo Trump demorou a agir em relação aos alertas da comunidade de inteligência sobre um relacionamento entre o então CEO da Nvidia, Jensen Huang, e uma mulher suspeita de espionagem para a China. A questão é: por quê?',
          'Com o presidente Trump, é claro que sempre existe a possibilidade de ele ter minimizado a importância das informações devido à sua relação pessoal com o Sr. Huang. O secretário de Comércio, Howard Lutnick, também pareceu ser um obstáculo à ação nas deliberações internas do governo. É possível ainda que o governo tenha agido com base nas informações, mas de maneiras que desconhecemos.',
          'Outro fator a ser considerado nas decisões de inteligência é o infeliz e crescente ceticismo com que os presidentes passaram a encarar o mundo da inteligência ao longo do tempo.',
          '## De Eisenhower a Nixon: expectativas e rupturas com a CIA',
          'Nos primórdios da Agência Central de Inteligência (CIA), os presidentes tinham uma visão inflada das capacidades da agência. Um exemplo disso foi a autorização dada por Dwight Eisenhower ao golpe de Estado de 1953 no Irã, que restaurou o Xá ao poder. Os historiadores ainda debatem o quanto os esforços da CIA influenciaram o resultado, mas os EUA certamente foram culpados — ou creditados — pelo golpe durante décadas.',
          'Os relatos de sucessos da CIA alimentaram grandes expectativas. No último ano de mandato de Eisenhower, a CIA desenvolveu um plano para derrubar o governo cubano usando um exército de exilados. Eisenhower nunca o executou, mas John F. Kennedy tentou. A operação fracassou na Baía dos Porcos e prejudicou o novo governo. Kennedy reclamou furiosamente com Richard Nixon, seu rival na corrida presidencial de 1960. Segundo Nixon, Kennedy disse "merda" seis vezes ao se queixar do fracasso da CIA. A partir de então, Kennedy passou a desconfiar mais da agência.',
          'As décadas seguintes deram aos presidentes ainda mais motivos para ceticismo. Em 1970, os EUA foram pegos de surpresa quando Lon Nol derrubou o governo de Sihanouk no Camboja. Nixon resmungou para o Secretário de Estado William Rogers: "Que diabos aqueles palhaços fazem lá em Langley?". Nixon ficou chocado novamente em outubro de 1973, quando a inteligência americana falhou em prever a Guerra do Yom Kippur. Como escreveu em suas memórias: "A notícia do iminente ataque a Israel nos pegou completamente de surpresa. Até o dia anterior, a CIA havia relatado que uma guerra no Oriente Médio era improvável...".',
          'Nixon também tinha o problema de estar muito envolvido com as agências de inteligência. O escândalo de Watergate saiu do controle quando se descobriu que E. Howard Hunt, um dos ladrões, era um ex-agente da CIA com ligações com a Casa Branca. Nixon forneceu a "prova cabal" por meio de uma conversa gravada na qual pedia a seus assessores que o vice-diretor da CIA, Vernon Walters, convencesse o FBI a desistir da investigação. A CIA, por sua vez, recusou. E, claro, o alto funcionário do FBI, Mark Felt, era secretamente Garganta Profunda, a fonte que forneceu ao repórter do Washington Post, Bob Woodward, as informações que mantiveram o escândalo vivo e, eventualmente, forçaram a renúncia de Nixon.',
          '## De Ford a George W. Bush: desgaste institucional',
          'A situação piorou durante o governo Ford, com as audiências do Comitê Church de 1975-76 expondo as irregularidades da CIA. O Secretário de Estado Henry Kissinger vociferou que "toda vez que [o Diretor da CIA] Bill Colby se aproxima do Capitólio, aquele maldito sente um desejo irresistível de confessar algum crime horrível". A reputação da agência sofreu ainda mais.',
          'Jimmy Carter aprendeu da pior maneira que a CIA sequer cogitava a possibilidade da queda do regime do Xá no Irã. A CIA possuía gravações dos discursos radicais do Aiatolá Khomeini, mas não as reproduziu nem as traduziu. Com o colapso do regime, o vice-presidente Walter Mondale perguntou ao diretor da CIA, Stansfield Turner: "Afinal, o que diabos é um \'Aiatolá\'?" A resposta de Turner foi reveladora: "Não tenho certeza se sei."',
          'Durante o governo de George W. Bush, as agências de inteligência falharam em reunir as peças do quebra-cabeça dos ataques de 11 de setembro, mas também forneceram garantias excessivamente confiantes de que Saddam Hussein, do Iraque, possuía armas de destruição em massa. O diretor da CIA, George Tenet, teria considerado o caso "uma vitória garantida". Embora Hussein tivesse, em determinado momento, buscado obter armas de destruição em massa, nenhuma foi encontrada no Iraque.',
          '## Política, ceticismo e o caso Nvidia',
          'Essa história mostra por que é difícil prever como uma administração reagirá a informações de inteligência problemáticas. O Sr. Trump já demonstrava dúvidas em relação às agências de inteligência devido ao escândalo Russiagate que assolou seu primeiro mandato. Além disso, a cultura popular, o jornalismo e a academia têm uma visão persistentemente negativa de nossas agências de inteligência. Calder Walton escreve em seu livro "Espiões" que "é difícil pensar em uma única ação secreta dos EUA que tenha proporcionado um sucesso estratégico de longo prazo". No caso da Nvidia, é possível que essa negatividade constante em relação à inteligência americana tenha contribuído para obscurecer a situação.',
          'O mundo da inteligência é obscuro e imperfeito. Cometeu erros, mas também fornece informações valiosíssimas, essenciais para a tomada de decisões presidenciais. Presidentes eficazes saberão ignorar a negatividade e utilizar as informações de suas agências de espionagem para promover os interesses americanos. Em última análise, esta é uma questão de política, não de inteligência.',
        ],
      },
      en: {
        tag: 'Geopolitics & Technology',
        title:
          'Why did Trump take no action on the Jensen Huang handling scandal?',
        summary:
          'In an opinion analysis, Tevi Troy examines how effective presidents handle murky intelligence warnings and traces decades of White House skepticism toward the CIA in light of the case involving former Nvidia CEO Jensen Huang.',
        dateAuthor: 'Nov 20, 2026 • By Tevi Troy',
        source: 'Free Expression / Photo: Carolyn Kaster (Associated Press)',
        readingTime: '5 min read',
        keywords: [
          'trump jensen huang nvidia',
          'cia us intelligence community',
          'howard lutnick commerce china',
          'white house cia history',
          'tevi troy analysis',
        ],
        imageAlt:
          'Official seal of the United States Central Intelligence Agency (CIA) beside the American flag (Photo: Carolyn Kaster / Associated Press)',
        fullContent: [
          'According to reports, the Trump administration was slow to act on intelligence community warnings regarding a relationship between then-Nvidia CEO Jensen Huang and a woman suspected of spying for China. The question is: why?',
          'With President Trump, there is always the possibility that he downplayed the intelligence because of his personal relationship with Mr. Huang. Commerce Secretary Howard Lutnick also appeared to be an obstacle to action in internal administration deliberations. It is also possible that the administration acted on the intelligence in ways we do not know about.',
          'Another factor to consider in intelligence decisions is the unfortunate and growing skepticism with which presidents have come to view the intelligence world over time.',
          '## From Eisenhower to Nixon: high expectations and early rifts',
          'In the early days of the Central Intelligence Agency (CIA), presidents held an inflated view of the agency’s capabilities, as seen in Dwight Eisenhower’s authorization of the 1953 Iranian coup that restored the Shah to power. Historians still debate how decisive CIA efforts were, yet the United States was widely blamed—or credited—for decades.',
          'In Eisenhower’s final year, the CIA drafted a plan to overthrow the Cuban government using an exile force; John F. Kennedy went ahead with the operation, which failed catastrophically at the Bay of Pigs and damaged the new administration. Kennedy later vented furiously to Richard Nixon, his 1960 rival, growing far more distrustful of the agency.',
          'Subsequent decades offered further causes for presidential skepticism. In 1970, Washington was caught off guard when Lon Nol toppled Sihanouk’s government in Cambodia, and in October 1973 U.S. intelligence failed to anticipate the Yom Kippur War. Meanwhile, Nixon’s entanglement with CIA veterans during Watergate—culminating in recordings asking aides to press the FBI to back off and the agency’s refusal—deepened the rift.',
          '## From Ford to George W. Bush: institutional strain',
          'Tensions worsened under Gerald Ford during the 1975–76 Church Committee hearings exposing CIA abuses, prompting Secretary of State Henry Kissinger to fume over congressional disclosures. Under Jimmy Carter, the CIA failed to foresee the collapse of the Shah’s regime in Iran, having left radical speeches by Ayatollah Khomeini untranslated.',
          'During George W. Bush’s presidency, intelligence agencies failed to connect the dots ahead of the September 11 attacks and later expressed excessive confidence—famously termed a "slam dunk" by CIA Director George Tenet—that Saddam Hussein possessed weapons of mass destruction in Iraq, none of which were found.',
          '## Politics, skepticism, and the Nvidia case',
          'That history explains why predicting how an administration will respond to troubling intelligence is difficult. President Trump already harbored skepticism toward intelligence agencies after the Russiagate controversy of his first term, reinforced by persistent criticism across popular culture, media, and academia—as scholar Calder Walton notes in his book "Spies." In the Nvidia episode, such persistent negativity toward U.S. intelligence may have helped cloud the picture.',
          'The intelligence world is murky and imperfect. It has made serious mistakes, yet it also supplies indispensable insights for presidential decision-making. Effective presidents cut through the skepticism and put intelligence to work for American national interests—making this ultimately a question of policy and politics, not intelligence.',
        ],
      },
      es: {
        tag: 'Geopolítica y Tecnología',
        title:
          '¿Por qué Trump no tomó ninguna medida ante el escándalo de captación de Jensen Huang?',
        summary:
          'En un artículo de opinión, Tevi Troy analiza cómo los presidentes eficaces gestionan informes complejos de inteligencia y repasa el escepticismo histórico de la Casa Blanca hacia la CIA en torno al caso del ex-CEO de Nvidia.',
        dateAuthor: '20/11/2026 • Por Tevi Troy',
        source: 'Expressão Livre / Foto: Carolyn Kaster (Associated Press)',
        readingTime: '5 min',
        keywords: [
          'trump jensen huang nvidia',
          'cia inteligencia estados unidos',
          'howard lutnick comercio china',
          'historia cia presidentes eeuu',
          'tevi troy analisis',
        ],
        imageAlt:
          'Sello oficial de la Agencia Central de Inteligencia de Estados Unidos (CIA) junto a la bandera estadounidense (Foto: Carolyn Kaster / Associated Press)',
        fullContent: [
          'Según informaciones publicadas, el gobierno de Trump tardó en reaccionar ante las alertas de la comunidad de inteligencia sobre una relación entre el entonces CEO de Nvidia, Jensen Huang, y una mujer sospechosa de espionaje para China. La pregunta es: ¿por qué?',
          'En el caso del presidente Trump, siempre existe la posibilidad de que minimizara la relevancia de los datos por su vínculo personal con el Sr. Huang. El secretario de Comercio, Howard Lutnick, también pareció actuar como freno dentro de las deliberaciones internas, aunque tampoco se descarta que el gobierno haya actuado de formas que no han trascendido.',
          'Otro factor relevante en estas decisiones es el creciente escepticismo con el que los presidentes estadounidenses han terminado mirando a las agencias de inteligencia a lo largo de las décadas.',
          '## De Eisenhower a Nixon: expectativas y decepciones con la CIA',
          'En los primeros años de la CIA, los presidentes sobrestimaron su capacidad tras episodios como el golpe de 1953 en Irán. Sin embargo, el fracaso de Bahía de Cochinos bajo John F. Kennedy sembró una profunda desconfianza en la Casa Blanca.',
          'Bajo Richard Nixon se sumaron sorpresas estratégicas como el golpe en Camboya en 1970 y la guerra de Yom Kippur en octubre de 1973, además de las fricciones internas desatadas durante el escándalo Watergate.',
          '## De Ford a George W. Bush: desgaste institucional',
          'Las audiencias del Comité Church entre 1975 y 1976 dañaron la reputación de la CIA durante la presidencia de Gerald Ford. Más tarde, bajo Jimmy Carter, la agencia no anticipó la caída del Sha en Irán, y durante el mandato de George W. Bush falló en conectar los indicios previos al 11-S y aseguró con exceso de confianza la existencia de armas de destrucción masiva en Irak.',
          '## Política, escepticismo y el caso Nvidia',
          'Esta trayectoria explica por qué resulta difícil predecir cómo responderá una administración ante alertas delicadas. Trump ya arrastraba reservas frente a las agencias tras la polémica del Russiagate en su primer mandato, en un clima cultural e intelectual habitualmente crítico hacia la inteligencia estadounidense, como documenta Calder Walton en "Espías".',
          'Aunque el mundo de la inteligencia es complejo e imperfecto, aporta información vital para las decisiones presidenciales. Los presidentes eficaces logran sortear ese escepticismo y utilizar esos insumos en defensa de los intereses nacionales; en última instancia, concluye el autor, se trata de una cuestión política más que de inteligencia.',
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
          'Relatório da S&P Global Energy aponta óxido de disprósio a US$ 2.300/kg na América do Norte contra US$ 215/kg na China, ampliando o interesse global por projetos brasileiros como Serra Verde, Caldeira, Colossus e Carina.',
        dateAuthor: '20/11/2026 • Redação DinhEuro',
        source: 'S&P Global Energy • Minerais Críticos',
        readingTime: '5 min',
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
          'O preço de uma das terras raras mais estratégicas para a fabricação de ímãs permanentes chegou a ser quase 11 vezes maior na América do Norte do que na China, segundo relatório da S&P Global Energy divulgado em outubro.',
          'A disparidade evidencia a escassez desses minerais nos mercados ocidentais e amplia as oportunidades para projetos brasileiros que buscam fornecer matérias-primas alternativas à cadeia dominada pelos chineses.',
          'O levantamento mostra que, em julho de 2026, o óxido de disprósio era cotado a US$ 2.300 por quilo na América do Norte, ante US$ 215 na China. A diferença equivale a aproximadamente 10,7 vezes.',
          'No caso do térbio, outra terra rara pesada considerada fundamental para a indústria de alta tecnologia, o preço alcançava US$ 4.900 por quilo no mercado norte-americano, contra US$ 1.005 no chinês, uma diferença de quase cinco vezes.',
          'Os valores representam referências de mercado de julho, e não cotações atuais. A comparação considera preços com entrega na América do Norte e preços de exportação da China, calculados em condições comerciais diferentes. Na América do Norte, os valores incluem frete e seguro até o porto de destino, enquanto os preços chineses não incluem esses custos internacionais.',
          'A S&P atribui a disparidade à concentração da cadeia produtiva e às restrições chinesas à exportação de terras raras, intensificadas a partir de abril de 2025.',
          'Atualmente, a China responde por aproximadamente 98% do refino mundial de disprósio e térbio. Na mineração, China, Mianmar e Laos concentram cerca de 91% da produção global.',
          '“A concentração da cadeia produtiva torna-se ainda mais acentuada nas etapas industriais posteriores à mineração, nas quais a China representa aproximadamente 98% da capacidade global de separação e refino”, diz o relatório.',
          'Os dois minerais são utilizados principalmente na produção de ímãs permanentes de alto desempenho, empregados em motores de veículos elétricos, turbinas eólicas, equipamentos eletrônicos e aplicações de defesa. Sua principal função é aumentar a resistência dos ímãs à desmagnetização, permitindo que mantenham o desempenho mesmo quando submetidos a temperaturas elevadas.',
          '## Brasil ganha espaço na oferta internacional',
          'Nesse cenário, o Brasil aparece no levantamento da S&P Global como uma das fontes potenciais para diversificar o fornecimento mundial de terras raras pesadas.',
          'Segundo a consultoria, a Serra Verde é atualmente a única operação comercial em escala de produção de matéria-prima contendo terras raras pesadas provenientes de argilas iônicas fora da China. A companhia opera o projeto Pela Ema, em Minaçu (GO), e produz carbonato misto de terras raras, material que contém disprósio e térbio, além de outros elementos.',
          'Em setembro, a norte-americana USA Rare Earth concluiu a aquisição da Serra Verde. A operação passou a integrar uma estratégia de formação de uma cadeia internacional de fornecimento, processamento e fabricação de ímãs fora da China. Em outubro, a companhia iniciou embarques comerciais do produto brasileiro para seu comprador contratado, com as primeiras vendas registradas em novembro.',
          'Um dos efeitos concretos desse movimento aparece no contrato de fornecimento firmado pela Serra Verde com a US SIIE, empresa constituída para adquirir a produção brasileira com respaldo financeiro do governo norte-americano.',
          'Segundo documentos apresentados pela USA Rare Earth à Comissão de Valores Mobiliários dos Estados Unidos, o acordo prevê preços mínimos de referência de US$ 575 por quilo de óxido equivalente de disprósio e US$ 2.050 por quilo de óxido equivalente de térbio, além de permitir que a companhia participe de eventuais valorizações das cotações internacionais.',
          'O acordo abrange, com exceções previstas contratualmente, toda a produção da primeira fase de Pela Ema, sob um modelo de compra garantida, com duração estimada de aproximadamente 15 anos.',
          '## Outros projetos',
          'Além da operação já existente da Serra Verde, o relatório identifica outros três projetos brasileiros com potencial para ampliar a oferta internacional de terras raras pesadas nos próximos anos: Caldeira, Colossus e Carina. Os empreendimentos ainda não entraram em produção comercial e atravessam diferentes etapas de desenvolvimento, incluindo estudos técnicos, licenciamento ambiental, testes de processamento e estruturação financeira, mas já atraem o interesse de grandes empresas internacionais.',
          'Em Minas Gerais, o projeto Caldeira, desenvolvido pela australiana Meteoric Resources, ganhou nova dimensão em outubro, quando a Lynas Rare Earths anunciou um acordo para adquirir a companhia por aproximadamente US$ 672 milhões. A transação, ainda sujeita a aprovações, poderá incorporar o empreendimento brasileiro às operações da Lynas, uma das principais produtoras de óxidos separados de terras raras fora da China. O projeto possui estudo definitivo de viabilidade concluído, prevê investimento inicial de aproximadamente US$ 498 milhões e produção projetada de cerca de 122 toneladas anuais de disprósio e térbio, com início previsto para 2028.',
          'Outro empreendimento destacado é o Colossus, da também australiana Viridis Mining and Minerals, localizado em Poços de Caldas (MG). O projeto concluiu seu estudo definitivo de viabilidade em agosto e prevê investimentos iniciais de aproximadamente US$ 449 milhões, com produção projetada para 2028.',
          'No início de novembro, a Viridis anunciou um contrato vinculante de fornecimento de terras raras com a química belga Solvay, uma das principais companhias de processamento desses minerais fora da China. O acordo prevê o envio de carbonato misto produzido em Minas Gerais para a unidade industrial da Solvay em La Rochelle, na França, para separação e purificação de disprósio e térbio, com duração inicial até 2034, volumes mínimos equivalentes a cerca de 70% da produção projetada e receita contratual mínima estimada em US$ 915 milhões. As empresas discutem ainda um acordo de licenciamento tecnológico para aprimorar o processamento no Brasil.',
          'Em Goiás, a Aclara Resources desenvolve o projeto Carina, no município de Nova Roma. A companhia concluiu estudo de viabilidade em abril e projeta iniciar a produção comercial em 2029, ainda condicionada ao licenciamento e à construção das instalações. O empreendimento integra uma estratégia sul-americana e norte-americana que prevê abastecer uma futura planta de separação na Louisiana (EUA), além de etapas de metalização e ligas metálicas — com produção experimental de metal de neodímio e praseodímio anunciada em novembro em planta de demonstração.',
          'Com diferentes estágios de desenvolvimento, os empreendimentos reforçam o potencial brasileiro de participação na diversificação mundial do fornecimento de terras raras pesadas, cuja concretização dependerá da obtenção de licenças, da conclusão dos investimentos e da entrada efetiva em operação das instalações projetadas.',
        ],
      },
      en: {
        tag: 'Critical Minerals & Commodities',
        title:
          'Rare earth prices reach nearly 11x China levels in North America, boosting outlook for Brazilian projects',
        summary:
          'An S&P Global Energy report shows dysprosium oxide priced at US$ 2,300/kg in North America versus US$ 215/kg in China, highlighting Western supply shortages and accelerating interest in Brazil’s Serra Verde, Caldeira, Colossus, and Carina projects.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'S&P Global Energy • Critical Minerals',
        readingTime: '5 min read',
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
          'The price of one of the most strategic rare earth elements used in manufacturing permanent magnets reached nearly 11 times higher in North America than in China, according to an S&P Global Energy report released in October.',
          'The price gap underscores acute shortages of these minerals in Western markets and expands opportunities for Brazilian projects seeking to supply alternative raw materials outside China’s dominant chain.',
          'The study shows that in July 2026, dysprosium oxide traded at US$ 2,300 per kilogram in North America compared with US$ 215 in China—roughly a 10.7x spread.',
          'For terbium, another heavy rare earth essential to high-tech manufacturing, North American prices hit US$ 4,900 per kilogram versus US$ 1,005 in China, a nearly fivefold gap. S&P notes the figures reflect July benchmarks calculated on different commercial terms, with North American quotes including freight and insurance to destination ports.',
          'S&P attributes the divergence to supply-chain concentration and Chinese rare earth export restrictions tightened since April 2025. China currently controls roughly 98% of global dysprosium and terbium refining, while China, Myanmar, and Laos account for about 91% of global mining output.',
          '“Supply-chain concentration becomes even sharper in downstream industrial stages after mining, where China represents approximately 98% of global separation and refining capacity,” the report states.',
          'Both elements are vital to high-performance permanent magnets used in electric-vehicle motors, wind turbines, electronics, and defense systems, enhancing resistance to demagnetization at elevated operating temperatures.',
          '## Brazil gains ground in global supply',
          'In this landscape, S&P Global highlights Brazil as a key potential source to diversify global heavy rare earth supply. Serra Verde is currently the only commercial-scale operation producing ionic-clay heavy rare earth feedstock outside China, operating the Pela Ema project in Minaçu (GO).',
          'In September, U.S.-based USA Rare Earth completed the acquisition of Serra Verde, integrating Brazilian output into an international non-Chinese supply, processing, and magnet-manufacturing chain. Commercial shipments began in October, with first sales booked in November.',
          'Under a roughly 15-year guaranteed-offtake contract with US SIIE—backed by U.S. government financing—disclosed to the U.S. SEC, floor benchmark prices are set at US$ 575/kg for dysprosium oxide equivalent and US$ 2,050/kg for terbium oxide equivalent, while preserving upside participation.',
          '## Emerging Brazilian pipeline',
          'Beyond Serra Verde, the report identifies three additional Brazilian projects poised to expand heavy rare earth supply over coming years: Caldeira, Colossus, and Carina.',
          'In Minas Gerais, Australia’s Meteoric Resources advanced the Caldeira project, receiving a roughly US$ 672 million acquisition offer from Lynas Rare Earths in October. With a completed feasibility study and US$ 498 million initial capex plan, Caldeira targets about 122 metric tons per year of dysprosium and terbium starting in 2028.',
          'Also in Poços de Caldas (MG), Viridis Mining and Minerals completed a feasibility study for its Colossus project (US$ 449 million initial capex, 2028 target) and signed a binding supply agreement in November with Belgian chemical group Solvay to ship mixed rare earth carbonate to La Rochelle, France, through 2034, representing minimum revenue of roughly US$ 915 million across ~70% of projected output.',
          'In Nova Roma (GO), Aclara Resources is developing the Carina project (feasibility study completed in April, commercial startup targeted for 2029) to feed a planned separation plant in Louisiana alongside downstream metallization, having demonstrated experimental neodymium-praseodymium metal production in November. Actual delivery across all pipeline assets remains subject to permitting, financing, and construction execution.',
        ],
      },
      es: {
        tag: 'Minerales Críticos y Commodities',
        title:
          'El precio de las tierras raras supera casi 11 veces al de China en Norteamérica e impulsa proyectos en Brasil',
        summary:
          'Un informe de S&P Global Energy ubica el óxido de disprosio en US$ 2.300/kg en América del Norte frente a US$ 215/kg en China, reforzando el atractivo de proyectos brasileños como Serra Verde, Caldeira, Colossus y Carina.',
        dateAuthor: '20/11/2026 • Redacción DinhEuro',
        source: 'S&P Global Energy • Minerales Críticos',
        readingTime: '5 min',
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
          'El precio de una de las tierras raras más estratégicas para la fabricación de imanes permanentes llegó a ser casi 11 veces mayor en América del Norte que en China, según un informe de S&P Global Energy divulgado en octubre.',
          'La disparidad refleja la escasez de estos minerales en los mercados occidentales y amplía las oportunidades para proyectos brasileños que buscan suministrar materias primas alternativas a la cadena dominada por China.',
          'El relevamiento indica que, en julio de 2026, el óxido de disprosio cotizaba a US$ 2.300 por kilo en América del Norte frente a US$ 215 en China, una diferencia aproximada de 10,7 veces. En el caso del terbio, alcanzó US$ 4.900 por kilo en el mercado norteamericano frente a US$ 1.005 en el chino, casi cinco veces más.',
          'S&P atribuye esta brecha a la fuerte concentración productiva y a las restricciones chinas a la exportación intensificadas desde abril de 2025. China concentra alrededor del 98% de la capacidad mundial de separación y refinación de disprosio y terbio, utilizados en motores de vehículos eléctricos, turbinas eólicas, electrónica y defensa.',
          '## Brasil gana espacio en la oferta internacional',
          'En este escenario, Brasil figura como una de las fuentes clave para diversificar el suministro global de tierras raras pesadas. Serra Verde opera en Minaçu (GO) el proyecto Pela Ema, actualmente la única operación comercial a escala fuera de China proveniente de arcillas iónicas.',
          'En septiembre, la estadounidense USA Rare Earth completó la adquisición de Serra Verde e inició embarques comerciales en octubre, con primeras ventas registradas en noviembre. Un contrato garantizado a 15 años con US SIIE fija precios mínimos de referencia de US$ 575/kg para óxido equivalente de disprosio y US$ 2.050/kg para terbio.',
          '## Otros proyectos brasileños en desarrollo',
          'El informe destaca además tres proyectos con potencial de ampliar la oferta en los próximos años: Caldeira, Colossus y Carina.',
          'En Minas Gerais, el proyecto Caldeira (Meteoric Resources) recibió en octubre una propuesta de adquisición de Lynas Rare Earths por US$ 672 millones, con inversión inicial estimada en US$ 498 millones y proyección de 122 toneladas anuales de disprosio y terbio a partir de 2028.',
          'También en Poços de Caldas (MG), Viridis Mining and Minerals (proyecto Colossus, US$ 449 millones de inversión inicial y arranque previsto para 2028) anunció en noviembre un contrato vinculante hasta 2034 con la belga Solvay para enviar carbonato mixto a Francia, con ingresos mínimos estimados en US$ 915 millones.',
          'Por su parte, en Nova Roma (GO), Aclara Resources avanza con el proyecto Carina (arranque previsto para 2029) para abastecer una futura planta de separación en Luisiana (EE. UU.) y etapas de metalización. La concreción de todos estos planes dependerá de licencias ambientales, financiamiento y ejecución industrial.',
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
          'Manifestações organizadas por estudantes em mais de 25 nações abordam o alto custo de vida e criticam cortes na educação e gastos com guerras.',
        dateAuthor: '20/11/2026 • Por Sana Noor Haq',
        source: 'CNN / Reuters / Sky TG24',
        readingTime: '3 min',
        keywords: [
          'greves jovens europa',
          'custo de vida europa 2026',
          'protestos estudantes roma',
          'cortes educação gastos guerra',
          'geração z desemprego clima ia',
        ],
        imageAlt:
          'Estudantes italianos reúnem-se em Roma para protestar contra a guerra e a disparada do custo de vida, exibindo faixa com os dizeres "I muri crollano, noi no" ("Os muros caem, nós não")',
        fullContent: [
          'Dezenas de milhares de jovens devem ocupar as ruas da Europa nesta sexta-feira (20), em um dia de mobilização internacional organizado por estudantes, que ocorrerá em mais de 25 nações.',
          'Grupos estudantis no Reino Unido, França, Espanha, Itália e outros países realizarão paralisações e protestos contra o custo de vida exorbitante, o aumento das mensalidades escolares, a falta de financiamento nos sistemas educacionais e o que consideram ser a cumplicidade de seus líderes na guerra de Israel em Gaza.',
          'No início deste outono, protestos da "Geração Z" eclodiram, impulsionados por uma crescente frustração com o fato de os governos não estarem preparando o futuro diante de desafios como a inteligência artificial sem regulamentação, o alto desemprego e a crise climática.',
          '## Mobilização em Alemanha, Itália e Reino Unido',
          'Segundo a RTL Germany, afiliada da CNN, espera-se que até 10 mil estudantes participem de manifestações em Colônia, no oeste da Alemanha.',
          'Na Itália, milhares de pessoas já começaram a marchar em diversas cidades; em Roma, Gênova, Bolonha e Milão, os estudantes pedem o fim do rearmamento. Na capital italiana, faixas exibidas pelos manifestantes traziam mensagens como "I muri crollano, noi no" ("Os muros caem, nós não").',
          'Somente no Reino Unido, alunos de mais de 350 escolas, faculdades e universidades participarão das paralisações, de acordo com o grupo "Socialist Students" (Estudantes Socialistas), uma das organizações envolvidas.',
          '## Reivindicações sobre orçamento e futuro econômico',
          '“Os jovens não ficarão de braços cruzados enquanto nossas escolas, faculdades e universidades sofrem cortes, ao passo que bilhões são destinados à guerra”, afirmou Adam Powell-Davies, presidente nacional da organização Socialist Students, em comunicado. “Lutem pelo nosso futuro, não pelas guerras deles.”',
          'Na capital da Itália, Roma, manifestantes também entoaram palavras de ordem e exibiram cartazes com frases como “Dinheiro para as escolas, não para a guerra” e “Queremos viver sem o peso do alto custo de vida”, segundo a emissora Sky TG24.',
        ],
      },
      en: {
        tag: 'Europe & Cost of Living',
        title: 'Youth-led strikes spread across Europe',
        summary:
          'Student-organized demonstrations across more than 25 nations target the soaring cost of living while criticizing education budget cuts and military spending.',
        dateAuthor: 'Nov 20, 2026 • By Sana Noor Haq',
        source: 'CNN / Reuters / Sky TG24',
        readingTime: '3 min read',
        keywords: [
          'europe youth strikes',
          'europe cost of living 2026',
          'student protests rome uk germany',
          'education cuts war spending',
          'gen z economy inflation',
        ],
        imageAlt:
          'Italian students gather in Rome to protest against war and the soaring cost of living, holding a banner reading "I muri crollano, noi no" ("Walls crumble, we do not")',
        fullContent: [
          'Tens of thousands of young people are expected to take to the streets across Europe this Friday (20) in an international day of youth-led mobilization spanning more than 25 countries.',
          'Student groups in the United Kingdom, France, Spain, Italy, and other nations are staging walkouts and rallies against the soaring cost of living, rising tuition fees, underfunding across education systems, and what they describe as their leaders’ complicity in Israel’s war in Gaza.',
          'Earlier this autumn, "Generation Z" protests erupted, driven by growing frustration that governments are failing to prepare for the future amid challenges such as unregulated artificial intelligence, high youth unemployment, and the climate crisis.',
          '## Mobilizations in Germany, Italy, and the United Kingdom',
          'According to CNN affiliate RTL Germany, up to 10,000 students are expected to join demonstrations in Cologne, western Germany.',
          'In Italy, thousands have already begun marching in multiple cities; across Rome, Genoa, Bologna, and Milan, students are calling for an end to rearmament. In the Italian capital, banners carried by protesters included phrases such as "I muri crollano, noi no" ("Walls crumble, we do not").',
          'In the United Kingdom alone, students from more than 350 schools, colleges, and universities are set to join the walkouts, according to "Socialist Students," one of the organizing groups.',
          '## Demands over budgets and economic future',
          '“Young people will not sit idly by while our schools, colleges, and universities face cuts while billions are poured into war,” said Adam Powell-Davies, national chair of Socialist Students, in a statement. “Fight for our future, not their wars.”',
          'In Rome, demonstrators also chanted slogans and carried signs reading “Money for schools, not for war” and “We want to live without the burden of the high cost of living,” according to broadcaster Sky TG24.',
        ],
      },
      es: {
        tag: 'Europa y Costo de Vida',
        title: 'Huelgas lideradas por jóvenes se extienden por Europa',
        summary:
          'Manifestaciones organizadas por estudiantes en más de 25 países denuncian el alto costo de vida y critican los recortes en educación y el gasto en guerras.',
        dateAuthor: '20/11/2026 • Por Sana Noor Haq',
        source: 'CNN / Reuters / Sky TG24',
        readingTime: '3 min',
        keywords: [
          'huelgas jovenes europa',
          'costo de vida europa 2026',
          'protestas estudiantes roma',
          'recortes educacion gasto militar',
          'generacion z economia europea',
        ],
        imageAlt:
          'Estudiantes italianos se reúnen en Roma para protestar contra la guerra y el alza del costo de vida, con una pancarta que dice "I muri crollano, noi no" ("Los muros caen, nosotros no")',
        fullContent: [
          'Decenas de miles de jóvenes ocuparán las calles de Europa este viernes (20) en una jornada internacional de movilización organizada por estudiantes que se desarrollará en más de 25 naciones.',
          'Colectivos estudiantiles en el Reino Unido, Francia, España, Italia y otros países realizarán paros y protestas contra el costo de vida desorbitado, el aumento de las matrículas escolares, la falta de financiación en los sistemas educativos y lo que consideran la complicidad de sus dirigentes en la guerra de Israel en Gaza.',
          'A comienzos de este otoño estallaron protestas de la "Generación Z", impulsadas por una creciente frustración ante el hecho de que los gobiernos no están preparando el futuro frente a desafíos como la inteligencia artificial sin regulación, el alto desempleo y la crisis climática.',
          '## Movilizaciones en Alemania, Italia y Reino Unido',
          'Según RTL Germany, afiliada de CNN, se espera que hasta 10.000 estudiantes participen en las manifestaciones de Colonia, en el oeste de Alemania.',
          'En Italia, miles de personas ya comenzaron a marchar en distintas ciudades; en Roma, Génova, Bolonia y Milán, los estudiantes exigen el fin del rearme. En la capital italiana, las pancartas exhibidas incluían mensajes como "I muri crollano, noi no" ("Los muros caen, nosotros no").',
          'Solo en el Reino Unido, alumnos de más de 350 escuelas, institutos y universidades participarán en los paros, según el grupo "Socialist Students" (Estudiantes Socialistas), una de las organizaciones convocantes.',
          '## Reclamos sobre presupuesto y futuro económico',
          '“Los jóvenes no se quedarán de brazos cruzados mientras nuestras escuelas, institutos y universidades sufren recortes al mismo tiempo que se destinan miles de millones a la guerra”, afirmó Adam Powell-Davies, presidente nacional de Socialist Students, en un comunicado. “Luchen por nuestro futuro, no por sus guerras”.',
          'En la capital de Italia, Roma, los manifestantes también corearon consignas y portaron carteles con frases como “Dinero para las escuelas, no para la guerra” y “Queremos vivir sin el peso del alto costo de vida”, según informó Sky TG24.',
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
          'Um ano depois da maior operação de fusão e aquisição do setor de criptoativos, empresas unificam suas plataformas em um motor de execução de baixa latência para atender à crescente demanda institucional no mercado global de derivativos.',
        dateAuthor: '20 de novembro de 2026 • Redação DinhEuro',
        source: 'Coinbase / Deribit • Mercado Global de Ativos Digitais',
        readingTime: '4 min',
        keywords: [
          'coinbase deribit aquisição',
          'opções de criptomoedas institucional',
          'derivativos criptoativos nasdaq',
          'baixa latência liquidez cripto',
          'fusões e aquisições ativos digitais',
        ],
        imageAlt:
          'Peças conectadas com os logotipos da Coinbase e da Deribit simbolizando a integração tecnológica das plataformas de ativos digitais',
        fullContent: [
          'O mercado de criptoativos registrou em 2025 a maior operação de fusão e aquisição de sua história. A Coinbase, plataforma de ativos digitais com ações negociadas na Nasdaq, pagou cerca de US$ 2,9 bilhões pela Deribit, líder mundial na negociação de opções de criptomoedas. Anunciado em maio e concluído em agosto, o negócio colocou as duas empresas sob o mesmo controle.',
          'Um ano depois da conclusão da compra, Coinbase e Deribit avançam na integração de suas infraestruturas de negociação. O trabalho ocorre em um mercado que ganhou escala e ampliou a presença de investidores institucionais, aumentando as exigências sobre os sistemas que processam essas operações.',
          'Com a Deribit, a Coinbase reforçou sua atuação no mercado internacional de opções, futuros e contratos perpétuos.',
          '## Da especialização à aquisição',
          'Antes da compra, a Deribit operava de forma independente e tinha forte presença entre investidores institucionais e operadores profissionais. A empresa concentrava a maior parte do volume global negociado em opções de criptomoedas, contratos cujo valor está relacionado ao preço de outro ativo.',
          'A aquisição acrescentou esse segmento a uma estrutura que já reúne serviços de negociação, custódia, stablecoins e soluções voltadas a instituições. Para a Coinbase, a operação faz parte da estratégia de ampliar a variedade de ativos e serviços financeiros digitais disponíveis em sua plataforma global.',
          'Concluída a compra, o trabalho chegou à infraestrutura tecnológica, com a integração de sistemas desenvolvidos separadamente.',
          '## Integração chega à infraestrutura',
          'As plataformas de negociação da Coinbase e da Deribit estão sendo unificadas em um único motor de execução, preparado para processar grandes volumes com baixa latência. O projeto prevê ainda ganhos de liquidez e eficiência.',
          'Em mercados financeiros, velocidade e liquidez se tornam mais relevantes à medida que crescem os volumes negociados. Sistemas de baixa latência reduzem o tempo entre o recebimento e a execução das ordens, enquanto maior liquidez facilita operações de grande porte sem oscilações acentuadas nos preços.',
          'Essas características ganham importância com o aumento da participação institucional no mercado de ativos digitais. A infraestrutura precisa combinar capacidade de processamento, segurança e eficiência para atender operações de maior porte.',
          '## Mercado institucional ganha peso',
          'Dados divulgados pela Coinbase mostram que o volume combinado de negociação de derivativos soma centenas de bilhões de dólares por trimestre. A receita institucional também cresceu com a contribuição da Deribit.',
          'Ao mesmo tempo, diferentes países vêm estabelecendo regras para ativos e serviços financeiros digitais. As condições de oferta e negociação, porém, variam de acordo com cada jurisdição.',
          'No Brasil, a Coinbase não oferece localmente serviços de derivativos a residentes no país. As referências a opções, futuros e contratos perpétuos nesta reportagem tratam do mercado internacional e da atuação global da companhia, não da oferta desses produtos ao público brasileiro.',
          '## Consolidação muda a escala do setor',
          'Fusões e aquisições tiveram papel importante na formação dos mercados financeiros tradicionais, reunindo operações, tecnologia e liquidez em estruturas de maior porte. Negócios bilionários como a compra da Deribit mostram que a consolidação também chegou ao mercado de ativos digitais.',
          'A integração das plataformas é a etapa atual dessa consolidação e amplia a infraestrutura da Coinbase para operações no mercado global.',
        ],
      },
      en: {
        tag: 'Crypto Assets & Institutional Markets',
        title:
          'Coinbase and Deribit advance infrastructure integration following historic US$ 2.9 billion acquisition',
        summary:
          'One year after the largest M&A deal in digital asset history, the companies are unifying their trading platforms under a single low-latency matching engine to serve growing institutional derivatives demand globally.',
        dateAuthor: 'Nov 20, 2026 • DinhEuro Editorial',
        source: 'Coinbase / Deribit • Global Digital Assets Market',
        readingTime: '4 min read',
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
          'The digital asset market recorded the largest merger and acquisition transaction in its history in 2025. Coinbase, the Nasdaq-listed digital asset platform, paid roughly US$ 2.9 billion for Deribit, the global leader in cryptocurrency options trading. Announced in May and completed in August, the deal brought both companies under unified ownership.',
          'A year after closing the acquisition, Coinbase and Deribit are advancing the integration of their trading infrastructures. The effort comes as the market has scaled and broadened institutional investor participation, raising performance demands on the systems processing these transactions.',
          'With Deribit, Coinbase strengthened its presence across international options, futures, and perpetual contracts markets.',
          '## From specialization to acquisition',
          'Prior to the buyout, Deribit operated independently with a strong footprint among institutional investors and professional traders. The firm accounted for the majority of global trading volume in crypto options—derivative contracts whose value is linked to the price of an underlying asset.',
          'The acquisition added this segment to a platform already spanning spot trading, custody, stablecoins, and institutional solutions. For Coinbase, the transaction fits a broader strategy to expand the range of digital financial assets and services offered globally.',
          'Once the purchase closed, work shifted to core technology infrastructure, integrating separately engineered systems.',
          '## Integration reaches core infrastructure',
          'Coinbase and Deribit trading venues are being unified onto a single execution engine designed to process large order volumes with low latency. The project also targets deeper liquidity and higher capital efficiency.',
          'In financial markets, execution speed and order-book depth become increasingly critical as trading volumes expand. Low-latency systems cut the time between order submission and execution, while stronger liquidity supports institutional block trades without sharp price dislocations.',
          'These capabilities grow in importance as institutional participation accelerates across digital assets, requiring infrastructure that combines throughput, security, and operational resilience.',
          '## Institutional market gains weight',
          'Figures disclosed by Coinbase show combined derivatives trading volume reaching hundreds of billions of dollars per quarter, while institutional revenue has also expanded on Deribit’s contribution.',
          'At the same time, jurisdictions around the world continue rolling out regulatory frameworks for digital assets and financial services, with offering and trading conditions varying by country.',
          'In Brazil, Coinbase does not locally offer derivatives services to domestic residents. References to options, futures, and perpetual contracts in this report pertain strictly to international markets and the company’s global operations rather than product offerings to Brazilian retail or local residents.',
          '## Consolidation reshapes industry scale',
          'Mergers and acquisitions played a decisive role in shaping traditional financial markets by bringing operations, technology, and liquidity together inside larger institutions. Billion-dollar deals like the Deribit acquisition show that consolidation has firmly arrived in digital assets.',
          'Platform integration marks the current phase of that consolidation, expanding Coinbase’s infrastructure for global market operations.',
        ],
      },
      es: {
        tag: 'Criptoactivos y Mercado Institucional',
        title:
          'Coinbase y Deribit avanzan en la integración de infraestructura tras histórica adquisición de US$ 2.900 millones',
        summary:
          'Un año después de la mayor operación de fusiones y adquisiciones del sector cripto, ambas compañías unifican sus plataformas en un motor de ejecución de baja latencia para atender al creciente peso institucional en derivados globales.',
        dateAuthor: '20 de noviembre de 2026 • Redacción DinhEuro',
        source: 'Coinbase / Deribit • Mercado Global de Activos Digitales',
        readingTime: '4 min',
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
          'El mercado de criptoactivos registró en 2025 la mayor operación de fusión y adquisición de su historia. Coinbase, plataforma de activos digitales que cotiza en el Nasdaq, pagó cerca de US$ 2.900 millones por Deribit, líder mundial en la negociación de opciones de criptomonedas. Anunciada en mayo y concluida en agosto, la operación colocó a ambas compañías bajo el mismo control.',
          'Un año después de concretar la compra, Coinbase y Deribit avanzan en la integración de sus infraestructuras de negociación. El proceso se desarrolla en un mercado que ganó escala y amplió la presencia de inversores institucionales, elevando las exigencias sobre los sistemas que procesan estas operaciones.',
          'Con Deribit, Coinbase reforzó su actuación en el mercado internacional de opciones, futuros y contratos perpetuos.',
          '## De la especialización a la adquisición',
          'Antes de la compra, Deribit operaba de manera independiente y contaba con una sólida presencia entre inversores institucionales y operadores profesionales. La firma concentraba la mayor parte del volumen global negociado en opciones de criptomonedas, contratos cuyo valor depende del precio de otro activo.',
          'La adquisición incorporó este segmento a una estructura que ya reúne servicios de negociación, custodia, stablecoins y soluciones orientadas a instituciones. Para Coinbase, la operación forma parte de la estrategia de ampliar la variedad de activos y servicios financieros digitales en su plataforma global.',
          'Concluida la compra, el trabajo avanzó hacia la infraestructura tecnológica, integrando sistemas desarrollados por separado.',
          '## La integración llega a la infraestructura',
          'Las plataformas de negociación de Coinbase y Deribit están siendo unificadas en un único motor de ejecución, preparado para procesar grandes volúmenes con baja latencia. El proyecto contempla además mejoras en liquidez y eficiencia.',
          'En los mercados financieros, la velocidad y la liquidez adquieren mayor relevancia a medida que crecen los volúmenes operados. Los sistemas de baja latencia reducen el tiempo entre la recepción y la ejecución de las órdenes, mientras que una mayor liquidez facilita operaciones de gran tamaño sin oscilaciones bruscas en los precios.',
          'Estas características cobran peso con el aumento de la participación institucional en el mercado de activos digitales, exigiendo una infraestructura que combine capacidad de procesamiento, seguridad y eficiencia.',
          '## El mercado institucional gana protagonismo',
          'Datos divulgados por Coinbase muestran que el volumen combinado de negociación de derivados asciende a cientos de miles de millones de dólares por trimestre. Los ingresos institucionales también crecieron impulsados por el aporte de Deribit.',
          'Al mismo tiempo, distintos países avanzan en marcos regulatorios para activos y servicios financieros digitales, con condiciones de oferta y negociación que varían según cada jurisdicción.',
          'En Brasil, Coinbase no ofrece localmente servicios de derivados a residentes en el país. Las referencias a opciones, futuros y contratos perpetuos en este informe aluden al mercado internacional y a la operación global de la compañía, no a la oferta de estos productos al público brasileño.',
          '## La consolidación cambia la escala del sector',
          'Las fusiones y adquisiciones desempeñaron un papel decisivo en la formación de los mercados financieros tradicionales al reunir operaciones, tecnología y liquidez en estructuras de mayor envergadura. Acuerdos multimillonarios como la compra de Deribit demuestran que la consolidación también llegó al ecosistema de activos digitales.',
          'La integración de las plataformas constituye la etapa actual de esa consolidación y amplía la infraestructura de Coinbase para operar en el mercado global.',
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
          'Decreto federal internaliza acordo da Associação Latino-Americana de Integração (Aladi) que elimina barreiras técnicas e reduz custos regulatórios em um mercado regional estimado em US$ 55 bilhões.',
        dateAuthor: '18 de novembro de 2026 • Redação DinhEuro',
        source: 'MDIC / MRE / Anvisa / Aladi • Redação DinhEuro',
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
          'O governo federal publicou decreto que internaliza no Brasil o acordo da Associação Latino-Americana de Integração (Aladi) voltado à eliminação de obstáculos técnicos no comércio de produtos de higiene pessoal, perfumaria e cosméticos. A medida reduz exigências regulatórias e custos operacionais para exportadores brasileiros, sem promover alterações nas alíquotas tarifárias vigentes.',
          'Com a publicação, o Brasil torna-se o primeiro signatário a concluir os procedimentos internos do acordo firmado em fevereiro de 2026, que abrange também Argentina, Bolívia, Chile, Equador, Paraguai, Peru e Uruguai (com participação do México nas rodadas de negociação). A convergência regulatória atende a um mercado latino-americano estimado em mais de US$ 55 bilhões.',
          '## Desempenho da Balança Comercial do Setor',
          'De acordo com dados consolidados do Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC), o Brasil ocupa a posição de terceiro maior mercado global de higiene pessoal, perfumaria e cosméticos, atrás apenas dos Estados Unidos e da China, reunindo mais de 3 mil empresas e exportando para cerca de 190 destinos.',
          'Os números recentes demonstram o peso estratégico da região para a balança comercial brasileira do segmento:',
          '- Volume Exportado: As vendas externas brasileiras do setor atingiram US$ 1,06 bilhão em 2025, representando uma expansão de 20,1% na comparação anual e garantindo superávit setorial de US$ 29,6 milhões;',
          '- Concentração Regional: Os países integrantes da Aladi absorveram 76,3% de todas as exportações brasileiras do ramo (cerca de US$ 791 milhões), liderados por Argentina (US$ 222 milhões), México (US$ 115 milhões), Colômbia (US$ 104 milhões), Chile (US$ 100 milhões) e Paraguai (US$ 73 milhões).',
          '## Redução de Burocracia e Convergência Sanitária',
          'A iniciativa foi coordenada pelo MDIC, pelo Ministério das Relações Exteriores (MRE) e pela Agência Nacional de Vigilância Sanitária (Anvisa), trazendo ganhos de eficiência especialmente para micro, pequenas e médias indústrias exportadoras:',
          '1. Fim do Certificado de Livre Venda: Elimina a obrigatoriedade desse documento na comercialização entre os países aderentes;',
          '2. Padronização Técnica: Aproxima critérios de rotulagem, boas práticas de fabricação (BPF) e revisão de ingredientes com base em referências internacionais;',
          '3. Notificação Simplificada: Substitui registros sanitários prévios mais lentos por procedimentos ágeis de notificação baseados em avaliação de risco, preservando os padrões de segurança ao consumidor e farmacovigilância.',
          'O acordo entra em vigor operacional 60 dias após pelo menos dois países signatários comunicarem oficialmente à Secretaria-Geral da Aladi a conclusão de suas etapas internas.',
        ],
      },
      en: {
        tag: 'Foreign Trade & Regional Economy',
        title:
          'Foreign Trade: Brazil Simplifies Cosmetics Exports to Latin America Under ALADI Accord',
        summary:
          'A federal decree incorporates the Latin American Integration Association (ALADI) agreement eliminating technical barriers and lowering regulatory costs across a regional market estimated at US$ 55 billion.',
        dateAuthor: 'Nov 18, 2026 • DinhEuro Editorial',
        source: 'MDIC / MRE / Anvisa / ALADI • DinhEuro Editorial',
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
          'Brazil’s federal government has published a decree incorporating into domestic law the Latin American Integration Association (ALADI) agreement aimed at eliminating technical barriers in trade of personal care, perfumery, and cosmetics products. The measure reduces regulatory requirements and operating costs for Brazilian exporters without altering current customs tariff rates.',
          'With this enactment, Brazil becomes the first signatory to complete domestic ratification procedures for the accord signed in February 2026, which also encompasses Argentina, Bolivia, Chile, Ecuador, Paraguay, Peru, and Uruguay (with Mexico participating in the negotiating rounds). Regulatory convergence targets a Latin American market estimated at over US$ 55 billion.',
          '## Sector Trade Balance Performance',
          'According to consolidated data from Brazil’s Ministry of Development, Industry, Trade and Services (MDIC), Brazil ranks as the world’s third-largest market for personal hygiene, perfumery, and cosmetics—behind only the United States and China—bringing together over 3,000 companies and exporting to roughly 190 destinations.',
          'Recent trade figures highlight the region’s strategic weight in Brazil’s sectoral trade balance:',
          '- Export Volume: Brazilian foreign sales in the segment reached US$ 1.06 billion in 2025, marking 20.1% year-on-year growth and securing a sector trade surplus of US$ 29.6 million;',
          '- Regional Concentration: ALADI member states absorbed 76.3% of all Brazilian sector exports (roughly US$ 791 million), led by Argentina (US$ 222 million), Mexico (US$ 115 million), Colombia (US$ 104 million), Chile (US$ 100 million), and Paraguay (US$ 73 million).',
          '## Less Red Tape and Sanitary Convergence',
          'The initiative was coordinated by MDIC, the Ministry of Foreign Affairs (MRE), and the Brazilian Health Regulatory Agency (Anvisa), delivering efficiency gains particularly for micro, small, and medium-sized exporters:',
          '1. End of the Certificate of Free Sale: Eliminates the requirement for this document in trade among participating countries;',
          '2. Technical Standardization: Aligns labeling rules, good manufacturing practices (GMP), and ingredient reviews with international benchmarks;',
          '3. Simplified Notification: Replaces slower prior sanitary registrations with streamlined risk-based notification procedures while safeguarding consumer safety and pharmacovigilance standards.',
          'The agreement takes operational effect 60 days after at least two signatory nations officially notify the ALADI General Secretariat that they have completed domestic procedures.',
        ],
      },
      es: {
        tag: 'Comercio Exterior y Economía Regional',
        title:
          'Comercio Exterior: Brasil Simplifica la Exportación de Cosméticos hacia América Latina mediante Acuerdo de la Aladi',
        summary:
          'Decreto federal internaliza el acuerdo de la Asociación Latinoamericana de Integración (Aladi) que elimina barreras técnicas y reduce costos regulatorios en un mercado regional estimado en US$ 55 mil millones.',
        dateAuthor: '18 de noviembre de 2026 • Redacción DinhEuro',
        source: 'MDIC / MRE / Anvisa / Aladi • Redacción DinhEuro',
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
          'El gobierno federal de Brasil publicó un decreto que internaliza el acuerdo de la Asociación Latinoamericana de Integración (Aladi) destinado a eliminar obstáculos técnicos en el comercio de productos de higiene personal, perfumería y cosméticos. La medida reduce exigencias regulatorias y costos operativos para los exportadores brasileños, sin introducir cambios en los aranceles vigentes.',
          'Con la publicación, Brasil se convierte en el primer signatario en concluir los trámites internos del acuerdo suscrito en febrero de 2026, que abarca también a Argentina, Bolivia, Chile, Ecuador, Paraguay, Perú y Uruguay (con participación de México en las rondas de negociación). La convergencia regulatoria atiende a un mercado latinoamericano estimado en más de US$ 55 mil millones.',
          '## Desempeño de la Balanza Comercial del Sector',
          'Según datos consolidados del Ministerio de Desarrollo, Industria, Comercio y Servicios (MDIC), Brasil ocupa el tercer puesto mundial en higiene personal, perfumería y cosméticos, detrás únicamente de Estados Unidos y China, reuniendo más de 3 mil empresas y exportando a cerca de 190 destinos.',
          'Las cifras recientes evidencian el peso estratégico de la región para la balanza comercial brasileña del segmento:',
          '- Volumen Exportado: Las ventas externas brasileñas del sector alcanzaron US$ 1,06 mil millones en 2025, lo que representa una expansión interanual del 20,1% y un superávit sectorial de US$ 29,6 millones;',
          '- Concentración Regional: Los países integrantes de la Aladi absorbieron el 76,3% de todas las exportaciones brasileñas del rubro (cerca de US$ 791 millones), encabezados por Argentina (US$ 222 millones), México (US$ 115 millones), Colombia (US$ 104 millones), Chile (US$ 100 millones) y Paraguay (US$ 73 millones).',
          '## Reducción de Burocracia y Convergencia Sanitaria',
          'La iniciativa fue coordinada por el MDIC, el Ministerio de Relaciones Exteriores (MRE) y la Agencia Nacional de Vigilancia Sanitaria (Anvisa), generando mejoras de eficiencia especialmente para micro, pequeñas y medianas industrias exportadoras:',
          '1. Fin del Certificado de Libre Venta: Elimina la obligatoriedad de este documento en el comercio entre los países adherentes;',
          '2. Estandarización Técnica: Aproxima criterios de etiquetado, buenas prácticas de fabricación (BPF) y revisión de ingredientes con base en referencias internacionales;',
          '3. Notificación Simplificada: Sustituye registros sanitarios previos más lentos por procedimientos ágiles de notificación basados en evaluación de riesgo, preservando la seguridad del consumidor y la farmacovigilancia.',
          'El acuerdo entrará en vigor operativo 60 días después de que al menos dos países signatarios comuniquen oficialmente a la Secretaría General de la Aladi la conclusión de sus etapas internas.',
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
];
