import type { SupportedLanguage } from './translations';
import type { BrokerInfo } from '../views/BrokersView';

export interface BrokersEditorialSection {
  id: string;
  title: string;
  body: string;
}

export interface BrokersFaqItem {
  question: string;
  answer: string;
}

export interface BrokersUiTranslations {
  title: string;
  subtitleBeforeCount: string;
  subtitleAfterCount: string;
  searchPlaceholder: string;
  tabAllPrefix: string;
  tabBrasil: string;
  tabGlobal: string;
  tabCrypto: string;
  tabZero: string;
  disclaimerBold: string;
  disclaimerText: string;
  showingPrefix: string;
  showingSuffix: string;
  clearSearch: string;
  zeroFeeBadge: string;
  specBrokerage: string;
  specSpread: string;
  specMinDeposit: string;
  specRegulation: string;
  officialSiteBtn: string;
  officialSiteTitlePrefix: string;
  editorialGuide: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: BrokersEditorialSection[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: BrokersFaqItem[];
  };
}

export const BROKERS_UI: Record<SupportedLanguage, BrokersUiTranslations> = {
  pt: {
    title: 'Guia Oficial de Corretoras do Brasil & do Mundo',
    subtitleBeforeCount: 'Catálogo informativo com',
    subtitleAfterCount:
      'corretoras e plataformas que atuam na B3, nos Estados Unidos, na Europa e no ecossistema de ativos digitais. Compare estruturas de taxas, spreads cambiais e canais oficiais.',
    searchPlaceholder: 'Buscar por nome, país, taxa zero...',
    tabAllPrefix: 'Todas as Corretoras',
    tabBrasil: 'Brasil / B3 (12)',
    tabGlobal: 'Internacionais & Europa (12)',
    tabCrypto: 'Cripto & Web3 (7)',
    tabZero: 'Taxa Zero / Low Cost',
    disclaimerBold: 'Transparência & Critério Informativo:',
    disclaimerText:
      'Este guia reúne instituições com atuação regulada ou registrada junto a órgãos competentes em suas respectivas jurisdições (como CVM e Banco Central no Brasil, SEC e FINRA nos Estados Unidos, além de FCA, BaFin e FINMA na Europa), conforme o escopo de cada serviço. Confirme sempre as condições comerciais e a cobertura regulatória vigentes diretamente no portal oficial da instituição.',
    showingPrefix: 'Exibindo',
    showingSuffix: 'instituições encontradas',
    clearSearch: 'Limpar busca',
    zeroFeeBadge: 'Taxa Zero',
    specBrokerage: 'Corretagem:',
    specSpread: 'Câmbio / Spread:',
    specMinDeposit: 'Depósito Mínimo:',
    specRegulation: 'Regulação Oficial:',
    officialSiteBtn: 'Acessar Site Oficial',
    officialSiteTitlePrefix: 'Acessar portal oficial de',
    editorialGuide: {
      eyebrow: 'Educação Financeira & Análise Comparativa',
      title: 'Como Comparar Corretoras no Brasil, no Exterior e no Mercado Cripto',
      intro:
        'A escolha de uma corretora envolve analisar não apenas tarifas promocionais de corretagem, mas também o arcabouço regulatório da jurisdição, as regras de custódia patrimonial, os custos cambiais embutidos e os mercados acessíveis em cada conta.',
      sections: [
        {
          id: 'regulation-custody',
          title: 'Regulação, Custódia e Proteção ao Investidor',
          body:
            'No Brasil, corretoras e bancos de investimento são fiscalizados pela CVM e pelo Banco Central, com ativos de renda variável registrados na B3 sob o CPF do titular e segregação patrimonial em relação ao caixa da instituição. Nos Estados Unidos, corretoras registradas na SEC e na FINRA contam com cobertura da SIPC (em geral até US$ 500 mil por titular, com limite de US$ 250 mil para saldo em espécie, conforme regras do programa) em caso de falência da corretora — sem cobrir oscilações de mercado. Na Europa, autoridades como FCA (Reino Unido), BaFin (Alemanha) e FINMA (Suíça) aplicam exigências específicas de capital, segregação de contas e transparência operacional.',
        },
        {
          id: 'zero-brokerage-fx-spread',
          title: 'Corretagem Zero, Custos Operacionais e Spread Cambial',
          body:
            'Mesmo quando a corretagem por ordem é zero, o custo efetivo de operar pode incluir emolumentos e taxas de liquidação cobrados pelas bolsas, assinatura de plataformas profissionais de negociação, tarifas de inatividade ou custódia e, principalmente, o spread cambial em remessas internacionais. Ao enviar recursos em reais para investir em dólar ou euro, uma diferença de 1% a 2% no spread sobre o câmbio comercial e a incidência de IOF conforme a natureza da operação impactam diretamente o ponto de equilíbrio financeiro do investimento.',
        },
        {
          id: 'b3-global-crypto-access',
          title: 'Acesso à B3, Bolsas Globais e Ativos Digitais',
          body:
            'Corretoras locais atendem investidores com foco em ações brasileiras, fundos imobiliários, Tesouro Direto e títulos de renda fixa emitidos no país. Para investir diretamente em ações americanas, ETFs europeus ou títulos internacionais na moeda de origem, contas globais e corretoras estrangeiras oferecem acesso direto às bolsas dos EUA e da Europa. Já as exchanges de criptoativos operam em infraestrutura própria de negociação contínua (24/7) para compra, venda e transferência on-chain de moedas digitais, seguindo regimes específicos de registro e custódia distintos do mercado tradicional de valores mobiliários.',
        },
        {
          id: 'usage-direct-verification',
          title: 'Critérios de Uso e Verificação Direta',
          body:
            'Políticas de isenção de corretagem, spreads cambiais, requisitos de depósito mínimo, faixas de IOF, disponibilidade para residentes no Brasil e cobertura de planos mudam periodicamente por decisão comercial ou regulatória. Utilize os filtros e fichas deste catálogo como ponto de partida comparativo e confirme todas as tabelas de tarifas, contratos de adesão e documentos regulatórios diretamente no site oficial de cada instituição antes de abrir conta ou realizar qualquer operação.',
        },
      ],
    },
    faq: {
      eyebrow: 'Dúvidas Frequentes',
      title: 'Perguntas Frequentes sobre Corretoras e Contas Globais',
      items: [
        {
          question: 'O que significa conta internacional e investimento no exterior?',
          answer:
            'Uma conta internacional permite manter saldos em moedas estrangeiras, como dólar americano ou euro, e investir diretamente em ativos negociados em bolsas de outros países (ações, ETFs e títulos). Diferente da compra de BDRs na B3 em reais, o investimento direto ocorre na moeda e na jurisdição de origem, exigindo atenção às regras cambiais e à declaração fiscal anual.',
        },
        {
          question: 'Como comparar o spread cambial em remessas e operações em moeda estrangeira?',
          answer:
            'Compare a taxa de câmbio final oferecida pela instituição com a cotação do câmbio comercial interbancário no mesmo instante. A diferença percentual representa o spread cambial. Some a esse percentual eventuais tarifas fixas de transferência (wire/remessa) e o IOF aplicável para enxergar o custo total efetivo (VET) da conversão.',
        },
        {
          question: 'Qual a diferença entre corretora de valores mobiliários e exchange de criptoativos?',
          answer:
            'A corretora de valores mobiliários atua na intermediação de ativos tradicionais regulados — como ações, ETFs, fundos e títulos públicos ou privados — em bolsas como a B3, NYSE ou bolsas europeias, sob normas de custódia e proteção como CVM/B3 ou SEC/SIPC. Já a exchange de criptoativos intermedia a negociação de moedas digitais e tokens em livros de ofertas próprios, com regras específicas de liquidação, custódia e transferência em blockchain.',
        },
        {
          question: 'O guia do DinhEuro constitui indicação ou recomendação de corretora ou investimento?',
          answer:
            'Não. O Guia de Corretoras do DinhEuro possui caráter estritamente informativo, educativo e comparativo. A presença de qualquer instituição no catálogo não representa recomendação de abertura de conta, endosso comercial nem aconselhamento financeiro personalizado.',
        },
      ],
    },
  },
  en: {
    title: 'Official Guide to Brazilian & Global Brokers',
    subtitleBeforeCount: 'Informational directory featuring',
    subtitleAfterCount:
      'brokers and platforms operating across B3 (Brazil), the United States, Europe, and digital assets. Compare fee structures, FX spreads, and official institutional portals.',
    searchPlaceholder: 'Search by name, country, zero fee...',
    tabAllPrefix: 'All Brokers',
    tabBrasil: 'Brazil / B3 (12)',
    tabGlobal: 'International & Europe (12)',
    tabCrypto: 'Crypto & Web3 (7)',
    tabZero: 'Zero Fee / Low Cost',
    disclaimerBold: 'Transparency & Informational Scope:',
    disclaimerText:
      'This directory lists institutions operating under regulatory oversight or registration in their respective jurisdictions (such as CVM and the Central Bank in Brazil, SEC and FINRA in the United States, and FCA, BaFin, and FINMA in Europe), according to the scope of each service. Always verify current terms and regulatory coverage directly on each institution’s official portal.',
    showingPrefix: 'Showing',
    showingSuffix: 'institutions found',
    clearSearch: 'Clear search',
    zeroFeeBadge: 'Zero Fee',
    specBrokerage: 'Brokerage Fee:',
    specSpread: 'FX / Spread:',
    specMinDeposit: 'Minimum Deposit:',
    specRegulation: 'Official Regulation:',
    officialSiteBtn: 'Visit Official Website',
    officialSiteTitlePrefix: 'Open official website for',
    editorialGuide: {
      eyebrow: 'Financial Education & Comparative Framework',
      title: 'How to Compare Brokers in Brazil, Abroad, and in Crypto Markets',
      intro:
        'Evaluating a brokerage requires looking beyond headline zero-commission offers to examine jurisdictional regulation, asset custody and segregation rules, embedded currency conversion spreads, and eligible market access.',
      sections: [
        {
          id: 'regulation-custody',
          title: 'Regulation, Custody, and Investor Protection',
          body:
            'In Brazil, broker-dealers and investment banks are supervised by the CVM and the Central Bank, with exchange-traded equities registered at B3 under the investor’s tax ID and segregated from the broker’s own balance sheet. In the United States, SEC- and FINRA-registered brokerages participate in SIPC protection (generally up to US$ 500,000 per customer, including a US$ 250,000 limit for cash, subject to program rules) against broker insolvency—not market losses. In Europe, regulators such as the FCA (UK), BaFin (Germany), and FINMA (Switzerland) enforce capital adequacy, client asset segregation, and operational transparency standards.',
        },
        {
          id: 'zero-brokerage-fx-spread',
          title: 'Zero Brokerage, Operational Fees, and FX Spread',
          body:
            'Even when headline order commissions are zero, total execution costs can include exchange and clearing fees, advanced trading platform subscriptions, inactivity or custody charges, and especially FX conversion spreads on cross-border funding. Converting BRL into USD or EUR with a 1% to 2% spread above the commercial interbank rate, plus applicable FX taxes (such as IOF), materially affects net portfolio breakeven and long-term compounding.',
        },
        {
          id: 'b3-global-crypto-access',
          title: 'Access to B3, Global Exchanges, and Digital Assets',
          body:
            'Domestic Brazilian brokerages focus on B3 equities, real estate funds (FIIs), Tesouro Direto sovereign bonds, and local fixed-income instruments. Accessing US or European stocks, UCITS/US ETFs, and hard-currency bonds directly requires international accounts or foreign brokerages connected to Wall Street and European venues. Digital asset exchanges operate continuous 24/7 order books for spot cryptocurrencies and on-chain transfers under distinct licensing and custody frameworks separate from traditional securities clearinghouses.',
        },
        {
          id: 'usage-direct-verification',
          title: 'Practical Usage and Direct Verification',
          body:
            'Fee waivers, FX spreads, minimum deposit thresholds, tax rules, account eligibility for non-residents, and platform terms evolve over time due to commercial or regulatory updates. Treat the profiles in this directory strictly as a structured starting point and verify current fee schedules, legal disclosures, and onboarding requirements directly on the institution’s official website prior to opening an account or placing trades.',
        },
      ],
    },
    faq: {
      eyebrow: 'Frequently Asked Questions',
      title: 'Frequently Asked Questions About Brokers and Global Accounts',
      items: [
        {
          question: 'What does an international account and offshore investing mean?',
          answer:
            'An international account enables holding foreign-currency balances such as US Dollars or Euros and investing directly in overseas securities—such as US or European stocks, ETFs, and bonds—settled in their native currency and jurisdiction, unlike locally listed BDRs traded in BRL on B3.',
        },
        {
          question: 'How should I compare FX spreads on cross-border transfers and currency conversions?',
          answer:
            'Compare the final exchange rate quoted by the provider against the live interbank commercial FX rate at the exact same moment. The percentage gap represents the FX spread; add any fixed wire fees and applicable transaction taxes (such as IOF) to determine the all-in effective conversion cost.',
        },
        {
          question: 'What is the difference between a securities brokerage and a cryptocurrency exchange?',
          answer:
            'A securities brokerage intermediates regulated traditional financial assets—equities, ETFs, funds, and sovereign or corporate bonds—on regulated exchanges under investor custody frameworks such as CVM/B3 or SEC/SIPC. A crypto exchange runs order books for digital currencies and blockchain tokens with separate settlement, wallet custody, and on-chain transfer mechanics.',
        },
        {
          question: 'Does the DinhEuro broker guide represent financial advice or an investment recommendation?',
          answer:
            'No. The DinhEuro Brokers Directory is strictly informational, educational, and comparative. Listing an institution does not constitute an endorsement, commercial solicitation, or personalized recommendation to open an account or trade any asset.',
        },
      ],
    },
  },
  es: {
    title: 'Guía Oficial de Brókeres de Brasil & del Mundo',
    subtitleBeforeCount: 'Catálogo informativo con',
    subtitleAfterCount:
      'brókeres y plataformas que operan en B3, Estados Unidos, Europa y el ecosistema de activos digitales. Compare comisiones, spreads cambiarios y portales oficiales.',
    searchPlaceholder: 'Buscar por nombre, país, comisión cero...',
    tabAllPrefix: 'Todos los Brókeres',
    tabBrasil: 'Brasil / B3 (12)',
    tabGlobal: 'Internacionales & Europa (12)',
    tabCrypto: 'Cripto & Web3 (7)',
    tabZero: 'Comisión Cero / Low Cost',
    disclaimerBold: 'Transparencia & Criterio Informativo:',
    disclaimerText:
      'Esta guía reúne instituciones con actuación regulada o registrada ante organismos competentes en sus jurisdicciones (como CVM y Banco Central en Brasil, SEC y FINRA en Estados Unidos, además de FCA, BaFin y FINMA en Europa), según el alcance específico de cada servicio. Confirme siempre las condiciones vigentes y la cobertura regulatoria directamente en el portal oficial de la institución.',
    showingPrefix: 'Mostrando',
    showingSuffix: 'instituciones encontradas',
    clearSearch: 'Limpiar búsqueda',
    zeroFeeBadge: 'Comisión Cero',
    specBrokerage: 'Comisión:',
    specSpread: 'Cambio / Spread:',
    specMinDeposit: 'Depósito Mínimo:',
    specRegulation: 'Regulación Oficial:',
    officialSiteBtn: 'Ir al Sitio Oficial',
    officialSiteTitlePrefix: 'Abrir portal oficial de',
    editorialGuide: {
      eyebrow: 'Educación Financiera & Análisis Comparativo',
      title: 'Cómo Comparar Brókeres en Brasil, en el Exterior y en el Mercado Cripto',
      intro:
        'Elegir un bróker exige analizar más allá de la comisión cero promocional: conviene revisar el marco regulatorio de la jurisdicción, las reglas de custodia patrimonial, el spread cambiario implícito y los mercados accesibles desde cada cuenta.',
      sections: [
        {
          id: 'regulation-custody',
          title: 'Regulación, Custodia y Protección al Inversor',
          body:
            'En Brasil, las casas de bolsa y bancos de inversión son supervisados por la CVM y el Banco Central, con acciones registradas en B3 a nombre del titular y segregación patrimonial frente a la entidad. En Estados Unidos, los brókeres registrados ante la SEC y FINRA cuentan con cobertura SIPC (generalmente hasta US$ 500.000 por titular, con límite de US$ 250.000 para efectivo, según reglas del programa) ante insolvencia del intermediario, sin cubrir pérdidas de mercado. En Europa, organismos como FCA (Reino Unido), BaFin (Alemania) y FINMA (Suiza) exigen requisitos de capital y segregación de cuentas.',
        },
        {
          id: 'zero-brokerage-fx-spread',
          title: 'Comisión Cero, Costos Operativos y Spread Cambiario',
          body:
            'Incluso cuando el corretaje por orden es cero, el costo total operativo puede incluir derechos de bolsa y liquidación, suscripciones a plataformas avanzadas, cargos de inactividad o custodia y, especialmente, el spread cambiario al convertir moneda local a dólares o euros. Una diferencia del 1% al 2% sobre el tipo de cambio comercial interbancario, sumada a impuestos cambiarios aplicables como el IOF, incide de forma directa en la rentabilidad neta.',
        },
        {
          id: 'b3-global-crypto-access',
          title: 'Acceso a B3, Bolsas Globales y Activos Digitales',
          body:
            'Los brókeres locales están orientados a renta variable brasileña, FIIs, Tesouro Direto y renta fija doméstica. Para operar directamente acciones estadounidenses, ETFs europeos o bonos internacionales en moneda fuerte se requieren cuentas globales o brókeres extranjeros conectados a EE. UU. y Europa. Por su parte, las exchanges de criptoactivos funcionan de manera continua (24/7) para compraventa y transferencias en blockchain bajo esquemas regulatorios y de custodia propios.',
        },
        {
          id: 'usage-direct-verification',
          title: 'Criterios de Uso y Verificación Directa',
          body:
            'Las políticas de exención de comisiones, spreads cambiarios, depósitos mínimos, tributación aplicable y elegibilidad para residentes extranjeros cambian periódicamente por decisiones comerciales o normativas. Utilice estas fichas únicamente como referencia comparativa inicial y verifique siempre los tarifarios vigentes y contratos oficiales directamente en el sitio web de cada institución antes de abrir cuenta u operar.',
        },
      ],
    },
    faq: {
      eyebrow: 'Preguntas Frecuentes',
      title: 'Preguntas Frecuentes sobre Brókeres y Cuentas Globales',
      items: [
        {
          question: '¿Qué significa tener una cuenta internacional e invertir en el exterior?',
          answer:
            'Una cuenta internacional permite mantener saldos en divisas extranjeras como Dólar o Euro e invertir directamente en activos listados en bolsas del exterior (acciones, ETFs y bonos) en su moneda y jurisdicción de origen, a diferencia de los certificados locales negociados en reales en B3.',
        },
        {
          question: '¿Cómo comparar el spread cambiario en remesas y operaciones en moneda extranjera?',
          answer:
            'Compare la cotización final ofrecida por la plataforma frente al tipo de cambio comercial interbancario en ese mismo momento. La brecha porcentual corresponde al spread; sume eventuales tarifas fijas de envío e impuestos aplicables para conocer el costo efectivo total de conversión.',
        },
        {
          question: '¿Cuál es la diferencia entre un bróker de valores mobiliarios y una exchange de criptoactivos?',
          answer:
            'Un bróker de valores intermedia instrumentos tradicionales regulados —acciones, ETFs, fondos y bonos— en bolsas como B3, NYSE o plazas europeas bajo marcos como CVM/B3 o SEC/SIPC. Una exchange cripto opera libros de órdenes para monedas digitales y tokens con custodia, liquidación y retiros en redes blockchain.',
        },
        {
          question: '¿La guía de DinhEuro constituye asesoría o recomendación de inversión?',
          answer:
            'No. La Guía de Brókeres de DinhEuro tiene carácter estrictamente informativo, educativo y comparativo. La inclusión de cualquier institución no implica recomendación de apertura de cuenta, patrocinio ni asesoramiento financiero personalizado.',
        },
      ],
    },
  },
};

type BrokerOverride = Partial<
  Pick<
    BrokerInfo,
    | 'country'
    | 'badge'
    | 'description'
    | 'spreadCambio'
    | 'brokerageFee'
    | 'regulation'
    | 'minDeposit'
    | 'platforms'
    | 'features'
  >
>;

const BROKER_OVERRIDES: Record<'en' | 'es', Record<string, BrokerOverride>> = {
  en: {
    xp: {
      country: 'Brazil',
      badge: 'Largest in Brazil',
      description:
        'Brazil’s largest independent financial ecosystem. Broad portfolio of B3 equities, real estate funds (FIIs), exclusive fixed income securities, and an integrated international account.',
      spreadCambio: '1.5% to 2.0%',
      brokerageFee: 'Zero for FIIs & Fixed Income; R$ 0 online',
      regulation: 'CVM, ANBIMA, Central Bank of Brazil',
      minDeposit: 'No minimum',
      features: [
        'Specialized investment advisory service',
        'Integrated USD international account inside the same app',
        'XP Visa Infinite card with investback rewards',
      ],
    },
    btg: {
      country: 'Brazil',
      badge: 'Institutional Investment Bank',
      description:
        'Major investment bank in Latin America offering proprietary fixed income issuance, structured credit, and full-service wealth banking.',
      spreadCambio: '1.2% to 1.8%',
      brokerageFee: 'Zero on digital plans',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'R$ 0 (No minimum)',
      features: [
        'Institutional strength and governance of an established investment bank',
        'Broad shelf of fixed income securities including CDB and LCA options',
        'Modular Black card with cashback or Livelo miles',
      ],
    },
    nuinvest: {
      country: 'Brazil',
      badge: 'Integrated Super App',
      description:
        'Investment functionality integrated directly inside the Nubank app for buying fractional B3 stocks, Tesouro Direto sovereign bonds, CDBs, and digital assets.',
      spreadCambio: '1.5% via international transfer',
      brokerageFee: 'Zero Fee for Stocks, FIIs & BDRs',
      regulation: 'CVM, Central Bank of Brazil',
      minDeposit: 'R$ 1 via PIX',
      platforms: ['Nubank App (iOS & Android)'],
      features: [
        'Streamlined and intuitive mobile interface',
        'Fractional stock investing starting from R$ 1',
        'Yield boxes tracking 100% of CDI',
      ],
    },
    rico: {
      country: 'Brazil',
      badge: 'Modern & Zero Fee',
      description:
        'XP Group’s retail-focused arm built for beginner and intermediate investors. Zero commission on core assets, dynamic educational content, and curated portfolios.',
      spreadCambio: '1.5% to 2.0%',
      brokerageFee: 'Zero Fee on Stocks, FIIs, BDRs & Fixed Income',
      regulation: 'CVM, ANBIMA, Central Bank of Brazil',
      minDeposit: 'No minimum',
      platforms: ['Rico App', 'Web Home Broker', 'Profit Rico Trader'],
      features: [
        'Zero brokerage commission to trade on B3',
        'Monthly recommended stock and dividend portfolios',
        'Riconnect mode with courses and live webinars',
      ],
    },
    clear: {
      country: 'Brazil',
      badge: 'Zero Day Trade Focus',
      description:
        'Brazilian brokerage that adopted zero brokerage commissions early on, focused on active mini-index, mini-dollar, stock, and swing traders with professional platforms.',
      spreadCambio: 'N/A (B3 Focus)',
      brokerageFee: 'Zero Commission on all B3 trades',
      regulation: 'CVM, ANBIMA (XP Group)',
      minDeposit: 'No minimum',
      features: [
        'Zero brokerage fee in Day Trade and Swing Trade',
        'High-performance platforms (free Profit Pro when active)',
        'Built-in income tax calculator for active traders',
      ],
    },
    toro: {
      country: 'Brazil',
      badge: 'Santander Group',
      description:
        'Banco Santander’s brokerage focused on usability, one-click trade ideas, and an innovative win-win fee model alongside zero standard brokerage.',
      spreadCambio: '1.4% to 1.9%',
      brokerageFee: 'Zero Fee on Stocks, FIIs & Fixed Income',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'No minimum',
      platforms: ['Toro App', 'Toro Trader (Profit)', 'Web'],
      features: [
        'Win-Win model: fees apply only if a recommended trade profits',
        'Cashback on investment funds',
        'Backed by Banco Santander’s global financial strength',
      ],
    },
    genial: {
      country: 'Brazil',
      badge: 'High Performance',
      description:
        'One of Brazil’s fastest-growing brokers, combining zero commission on stocks and FIIs with robust trading infrastructure (direct B3 DMA2 and daily live rooms).',
      spreadCambio: '1.3% to 1.8%',
      brokerageFee: 'Zero Commission on Stocks, FIIs & BDRs',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'No minimum',
      platforms: ['Free Profit Pro', 'Genial Trader', 'Genial App'],
      features: [
        '100% free Profit Pro by trading 1 mini-contract per month',
        'Daily YouTube live rooms covering technical and order-flow analysis',
        'Benchmark macroeconomic and political research (Genial/Quaest)',
      ],
    },
    agora: {
      country: 'Brazil',
      badge: 'Bradesco BBI',
      description:
        'Banco Bradesco’s investment house. Connects award-winning Bradesco BBI equity research with traditional financial products, structured notes, and wealth solutions.',
      spreadCambio: '1.5% to 2.0%',
      brokerageFee: 'Zero-commission plans & advisory tiers',
      regulation: 'CVM, Central Bank of Brazil, ANBIMA',
      minDeposit: 'No minimum',
      platforms: ['Ágora Mobile', 'Ágora Home Broker', 'Ágora Trader'],
      features: [
        'Institutional reports and research from Bradesco BBI',
        'Seamless balance and account integration for Bradesco clients',
        'Ágora Academy with comprehensive educational tracks',
      ],
    },
    inter: {
      country: 'Brazil',
      badge: 'Brazil + US Integrated',
      description:
        'Banco Inter’s investment platform uniting the Brazilian Exchange (B3) and US Exchanges (Nasdaq/NYSE) on one screen, with direct FX conversion and zero brokerage.',
      spreadCambio: '0.99% to 1.5% (one of the lowest bank spreads)',
      brokerageFee: 'Zero Commission on B3 & US equities',
      regulation: 'CVM, Central Bank, SEC/FINRA (via Apex)',
      minDeposit: 'R$ 0 / $ 1',
      platforms: ['Inter Super App (iOS & Android)', 'Web Home Broker'],
      features: [
        'Global Account with international Mastercard debit card',
        'Zero commission to trade equities in the US and Brazil',
        'Daily cashback on funds and Inter Shop purchases',
      ],
    },
    c6: {
      country: 'Brazil',
      badge: 'Global USD & EUR Account',
      description:
        'C6 Bank’s investment hub (JP Morgan partnership). Known for its multi-currency Global Account with native support for US Dollars and European Euros.',
      spreadCambio: '1.0% to 2.0% on commercial USD & EUR',
      brokerageFee: 'Zero commission on B3',
      regulation: 'CVM, Central Bank of Brazil',
      minDeposit: 'No minimum',
      platforms: ['C6 Bank App'],
      features: [
        'International accounts in Euro (€) and Dollar ($) with dedicated cards',
        'C6 TechInvest with algorithmically managed portfolios',
        'Átomos points that never expire and convert to cashback or miles',
      ],
    },
    safra: {
      country: 'Brazil',
      badge: 'Private & Heritage',
      description:
        'Investment arm of Brazil’s fourth-largest private bank. Focused on high-net-worth clients, wealth preservation, private credit, and top-performing Safra funds.',
      spreadCambio: 'Negotiable with FX desk',
      brokerageFee: 'Competitive upon consultation',
      regulation: 'CVM, Central Bank, ANBIMA',
      minDeposit: 'R$ 1,000 for account opening',
      platforms: ['Safra App', 'Safra Internet Banking', 'Home Broker'],
      features: [
        'Globally recognized for financial soundness and conservative stewardship',
        'Flagship Safra Galileu and Safra Consumo investment funds',
        'Consultative service and exclusive private banking',
      ],
    },
    guide: {
      country: 'Brazil',
      badge: 'Fosun Multinational',
      description:
        'Brazilian brokerage controlled by global conglomerate Fosun. Offers personalized advisory, curated third-party funds, and private pension solutions.',
      spreadCambio: '1.5%',
      brokerageFee: 'Fee-exempt plans for equities',
      regulation: 'CVM, ANBIMA, Central Bank',
      minDeposit: 'No minimum',
      platforms: ['Guide App', 'Guide Home Broker'],
      features: [
        'Market research with a global macroeconomic perspective',
        'Comprehensive platform for mutual funds and pensions',
        'Tailored support from accredited investment advisors',
      ],
    },
    ibkr: {
      country: 'United States / Global',
      badge: 'Global Multi-Exchange Access',
      description:
        'Broad international brokerage providing direct access to 150+ exchanges across 33 countries trading USD, EUR, GBP, and JPY with institutional FX pricing.',
      spreadCambio: 'From 0.08% (institutional interbank rate)',
      brokerageFee: 'From $0.005 / share in US; €1.25 in Europe',
      regulation: 'SEC, FINRA, SIPC, FCA (UK), BaFin (Germany)',
      minDeposit: '$0 (No minimum deposit)',
      features: [
        'Direct trading on European exchanges (DAX, Euronext Paris, Amsterdam, London)',
        'Interest paid on eligible uninvested USD and EUR cash balances',
        'Competitive margin financing rates across global markets',
      ],
    },
    avenue: {
      country: 'United States / Brazil',
      badge: 'Portuguese-Language US Broker',
      description:
        'US-registered brokerage built for cross-border Brazilian investors, featuring a Portuguese interface, local support, instant PIX funding, and structured tax reports.',
      spreadCambio: '1.4% to 2.0% (tiered by volume)',
      brokerageFee: 'Zero commission on selected plans',
      regulation: 'SEC, FINRA, SIPC (Protection up to $500k)',
      minDeposit: 'R$ 100 via PIX with instant FX conversion',
      platforms: ['Avenue App (iOS & Android)', 'Web Portal'],
      features: [
        'Deposits via PIX with immediate conversion to US dollars',
        'Structured annual income tax reporting support (DARF/GCAP)',
        'Avenue Mastercard debit card for international payments',
      ],
    },
    nomad: {
      country: 'United States / Brazil',
      badge: 'Global Account & Travel',
      description:
        'US-based fintech providing a USD checking account and Wall Street investing platform. Known for its debit card for travel in Europe and global shopping.',
      spreadCambio: '1.0% to 2.0% with Nomad Pass tiers',
      brokerageFee: 'Zero commission on US stocks & ETFs',
      regulation: 'SIPC (Up to $500,000), FDIC (Up to $250,000 banking)',
      minDeposit: 'R$ 100 via PIX',
      platforms: ['Nomad App (iOS & Android)'],
      features: [
        'Debit card accepted in 180+ countries with reduced 1.1% IOF',
        'VIP Lounge access at Guarulhos Airport for loyalty tiers',
        'Fractional US share investing starting from $1',
      ],
    },
    schwab: {
      country: 'United States',
      badge: 'Major US Brokerage',
      description:
        'Major US wealth and brokerage firm providing international clients with the thinkorswim platform, equity research reports, and multi-decade market presence.',
      spreadCambio: 'Direct interbank',
      brokerageFee: '$0 on US-listed stocks and ETFs',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$25,000 for international accounts',
      features: [
        'thinkorswim platform for technical analysis and options trading',
        'Equity research and market reports from Wall Street analysts',
        'Checking account with global ATM fee rebates',
      ],
    },
    fidelity: {
      country: 'United States',
      badge: 'Wall Street Custodian',
      description:
        'Established US capital-markets institution managing large custodial assets, known for zero-expense-ratio index funds and competitive order execution.',
      spreadCambio: 'Market interbank',
      brokerageFee: '$0 for online US stocks and ETFs',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0 for residents / upon inquiry for non-residents',
      features: [
        'Order execution focused on competitive price improvement',
        'Fidelity ZERO index funds with 0.00% management fee',
        'Comprehensive retirement and wealth planning suite',
      ],
    },
    robinhood: {
      country: 'United States / Europe',
      badge: 'Zero Fee Pioneer',
      description:
        'The brokerage that democratized Wall Street for modern investors. Offers 24-hour trading in selected stocks, options, and crypto with a streamlined interface.',
      spreadCambio: 'Built into market spread',
      brokerageFee: '$0 on all US stocks and ETFs',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        '24-Hour Market trading on selected US equities',
        'Competitive yield on uninvested USD cash (Robinhood Gold)',
        'Native Web3 wallet for self-custody crypto transfers',
      ],
    },
    etoro: {
      country: 'United Kingdom / Europe',
      badge: 'Copy Trading Leader',
      description:
        'Global pioneer in social investing and Copy Trading. Automatically mirror the portfolios and strategies of verified top-performing investors worldwide.',
      spreadCambio: 'Standard market spread',
      brokerageFee: 'Zero commission on stocks and ETFs',
      regulation: 'FCA (UK), CySEC (Cyprus), ASIC (Australia), FinCEN',
      minDeposit: '$50 to $100',
      platforms: ['eToro Web Trader', 'eToro App'],
      features: [
        'CopyTrader: automatic portfolio replication of verified investors',
        'Thematic Smart Portfolios (AI Tech, Clean Energy, Dividend Leaders)',
        'Trade US, European equities, and crypto in one portfolio',
      ],
    },
    saxobank: {
      country: 'Denmark / Europe',
      badge: 'European Trading Bank',
      description:
        'Danish investment bank specialized in multi-asset global trading. Connects over 71,000 instruments across European equities, sovereign bonds, and currencies.',
      spreadCambio: 'Tight institutional spreads',
      brokerageFee: 'Low, transparent tiered fees across Europe',
      regulation: 'Danish FSA (Denmark), FCA, BaFin, FINMA',
      minDeposit: '€0 (No minimum)',
      platforms: ['SaxoTraderGO', 'SaxoTraderPRO (Multi-screen)'],
      features: [
        'Direct access to all Eurozone exchanges quoted in €',
        'Full banking license with European deposit guarantee',
        'Extensive catalog of European and US sovereign government bonds',
      ],
    },
    degiro: {
      country: 'Germany / Netherlands',
      badge: 'European Low-Cost Leader',
      description:
        'Europe’s largest retail execution-only broker (flatexDEGIRO Group). Present in 18+ European countries with ultra-low commissions on DAX, CAC 40, and global exchanges.',
      spreadCambio: '0.25% (Auto FX)',
      brokerageFee: '€1 to €2 per order in Europe / US',
      regulation: 'BaFin (Germany), Bundesbank, AFM (Netherlands)',
      minDeposit: '€0.01',
      features: [
        'Curated Core Selection of popular ETFs with ZERO commission',
        'Direct Euro bank funding via dedicated IBAN',
        '50+ international stock exchanges accessible from one account',
      ],
    },
    swissquote: {
      country: 'Switzerland',
      badge: 'Swiss Private Bank',
      description:
        'Leading online trading bank headquartered in Gland, Switzerland. Combines the prestige and stability of Swiss banking with modern multi-asset trading technology.',
      spreadCambio: 'Secure interbank FX',
      brokerageFee: 'Swiss banking fee schedule',
      regulation: 'FINMA (Swiss Financial Market Supervisory Authority)',
      minDeposit: '$0 for trading account',
      features: [
        'Swiss statutory deposit guarantee up to CHF 100,000 per client',
        'Multi-currency accounts in CHF, EUR, USD, and GBP',
        'Direct access to hedge funds and international private equity',
      ],
    },
    webull: {
      country: 'United States',
      badge: 'Trading Tech & Charts',
      description:
        'Platform built around advanced charting and free real-time market data. Provides full extended-hours trading (4:00 AM to 8:00 PM New York time) at zero commission.',
      spreadCambio: 'Market rates',
      brokerageFee: '$0 Commission on Stocks & Options',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        'Full Pre-Market and After-Hours trading (16 hours a day)',
        'Advanced charts with dozens of free technical indicators',
        'Built-in Paper Trading simulator to practice strategies',
      ],
    },
    xtb: {
      country: 'United Kingdom / Poland',
      badge: 'Real Stocks + CFDs',
      description:
        'One of the largest stock-exchange listed brokers in Europe. Over 1 million clients use its award-winning xStation platform for 0% commission real stocks and derivatives.',
      spreadCambio: '0.5% on currency conversion',
      brokerageFee: '0% commission up to €100,000 monthly turnover',
      regulation: 'FCA (UK), KNF (Poland), CySEC',
      minDeposit: 'No minimum',
      features: [
        '0% commission across 3,000+ real stocks and ETFs',
        'Monthly interest paid on uninvested cash balances',
        'Award-winning xStation platform praised for execution speed',
      ],
    },
    binance: {
      country: 'Global',
      badge: 'High Global Volume',
      description:
        'High-volume digital asset exchange supporting Bitcoin, Ethereum, Solana, and broad altcoin pairs with PIX and SEPA transfer rails.',
      spreadCambio: 'Direct order book parity',
      brokerageFee: 'From 0.075% (with BNB fee discount)',
      regulation: 'Global compliance & authorizations across multiple countries',
      minDeposit: 'R$ 10 via instant PIX',
      features: [
        'Fast deposits and withdrawals in BRL and Euros (EUR)',
        'Secure Asset Fund for Users (SAFU) emergency reserve',
        'Futures markets, yield Staking, and Launchpool rewards',
      ],
    },
    mercadobitcoin: {
      country: 'Brazil',
      badge: 'Brazilian Crypto Platform',
      description:
        'Brazilian crypto exchange operating since 2013 and licensed as a Payment Institution by the Central Bank of Brazil, offering digital assets and tokenized fixed income.',
      spreadCambio: 'Direct BRL pairs',
      brokerageFee: '0.3% to 0.7% per trade',
      regulation: 'Central Bank of Brazil (PI License), ABcripto',
      minDeposit: 'R$ 1 via PIX',
      platforms: ['MB App', 'Pro Web Portal'],
      features: [
        'Digital Fixed Income tokens linked to private credit receivables',
        '24/7 customer support in Portuguese',
        'Domestic custody operations with local governance standards',
      ],
    },
    coinbase: {
      country: 'United States',
      badge: 'Nasdaq Listed (COIN)',
      description:
        'Publicly traded US crypto exchange listed on Nasdaq (COIN), subject to regular public financial audits, regulatory filings, and institutional custody services.',
      spreadCambio: 'Transparent official spread',
      brokerageFee: 'From 0.05% on Coinbase Advanced',
      regulation: 'SEC, FinCEN, FCA (UK), BaFin (Germany)',
      minDeposit: '$2 / R$ 10',
      features: [
        'Public financial audits filed with US securities regulators',
        'Custodian partner for multiple US spot Bitcoin and Ethereum ETFs',
        'Segregated institutional custody controls alongside retail accounts',
      ],
    },
    kraken: {
      country: 'United States / Europe',
      badge: 'Long-Standing Security Record',
      description:
        'Founded in 2011, an established international crypto exchange noted for long-term operational continuity and periodic Proof of Reserves audits.',
      spreadCambio: 'Deep EUR and USD order books',
      brokerageFee: 'From 0.16% Maker / 0.26% Taker',
      regulation: 'FinCEN (US), FCA (UK), AUSTRAC',
      minDeposit: '€10 / $10',
      features: [
        'Cryptographic Proof of Reserves audit verifiable by clients',
        'Deep liquidity in Euro (EUR) pairs with SEPA transfers',
        'Futures and margin trading with structured risk controls',
      ],
    },
    foxbit: {
      country: 'Brazil',
      badge: 'Brazilian Exchange',
      description:
        'Established Brazilian Bitcoin exchange offering 24/7 PIX deposits and withdrawals alongside crypto payment gateway solutions for merchants.',
      spreadCambio: 'BRL quoted pairs',
      brokerageFee: 'From 0.25%',
      regulation: 'ABcripto, Brazilian Federal Revenue (IN 1888)',
      minDeposit: 'R$ 10 via PIX',
      platforms: ['Foxbit App', 'Foxbit Pro Web'],
      features: [
        'Automated 24/7 PIX settlement',
        'Foxbit Pay to accept Bitcoin payments in retail businesses',
        'Exportable annual tax compliance reports',
      ],
    },
    okx: {
      country: 'Global',
      badge: 'Web3 & Multi-Chain Tools',
      description:
        'Global derivatives and spot digital-asset exchange featuring a non-custodial Web3 wallet supporting 80+ blockchains and BRL PIX deposits.',
      spreadCambio: 'Order book screen pricing',
      brokerageFee: 'From 0.08%',
      regulation: 'VARA (Dubai), Bahamas, Hong Kong',
      minDeposit: 'R$ 10 via PIX',
      platforms: ['OKX Web3 Wallet', 'OKX App', 'Integrated TradingView'],
      features: [
        'Non-custodial Web3 wallet compatible with 80+ blockchains',
        'Fast BRL deposits via PIX',
        'DEX aggregator and NFT/Ordinals marketplace integration',
      ],
    },
    bybit: {
      country: 'Global',
      badge: 'Derivatives & Liquidity',
      description:
        'Digital-asset exchange widely used for perpetual futures and spot liquidity, offering automated trading tools and PIX funding support.',
      spreadCambio: 'High-liquidity order book',
      brokerageFee: 'From 0.02% Maker / 0.055% Taker on futures',
      regulation: 'International licenses & regular Proof of Reserves',
      minDeposit: 'R$ 10 via PIX',
      platforms: ['Bybit App', 'Bybit Web Pro', 'High-Frequency API'],
      features: [
        'Copy Trading for perpetual futures contracts',
        'Built-in algorithmic trading bots (Grid Bots, DCA Bots)',
        'Support for PIX payments and international cards',
      ],
    },
  },
  es: {
    xp: {
      country: 'Brasil',
      badge: 'Mayor de Brasil',
      description:
        'El mayor ecosistema financiero independiente de Brasil. Amplio portafolio de acciones en B3, fondos inmobiliarios (FIIs), renta fija exclusiva y cuenta internacional integrada.',
      spreadCambio: '1,5% a 2,0%',
      brokerageFee: 'Cero para FIIs y Renta Fija; R$ 0 online',
      regulation: 'CVM, ANBIMA, Banco Central de Brasil',
      minDeposit: 'Sin monto mínimo',
      features: [
        'Asesoría especializada de inversiones',
        'Cuenta internacional en dólares integrada en la misma app',
        'Tarjeta XP Visa Infinite con investback',
      ],
    },
    btg: {
      country: 'Brasil',
      badge: 'Banco de Inversiones',
      description:
        'Banco de inversiones latinoamericano con amplio catálogo de renta fija de emisión propia, crédito estructurado y banca patrimonial.',
      spreadCambio: '1,2% a 1,8%',
      brokerageFee: 'Cero en planes digitales',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'R$ 0 (Sin mínimo)',
      features: [
        'Solidez institucional y gobernanza bancaria consolidada',
        'Amplia oferta de renta fija con opciones de CDB y LCA',
        'Tarjeta Black modular con cashback o millas Livelo',
      ],
    },
    nuinvest: {
      country: 'Brasil',
      badge: 'Super App Integrada',
      description:
        'Funcionalidad de inversiones integrada dentro de la aplicación de Nubank para comprar acciones fraccionarias en B3, Tesouro Direto, CDBs y cripto.',
      spreadCambio: '1,5% vía transferencia internacional',
      brokerageFee: 'Comisión Cero en Acciones, FIIs y BDRs',
      regulation: 'CVM, Banco Central de Brasil',
      minDeposit: 'R$ 1 vía PIX',
      platforms: ['App Nubank (iOS & Android)'],
      features: [
        'Experiencia móvil ágil e intuitiva',
        'Inversión en fracciones de acciones desde R$ 1',
        'Cajitas de ahorro con rendimiento del 100% del CDI',
      ],
    },
    rico: {
      country: 'Brasil',
      badge: 'Comisión Cero B3',
      description:
        'División del Grupo XP enfocada en inversores principiantes e intermedios. Comisión cero en activos principales, contenido educativo dinámico y carteras recomendadas.',
      spreadCambio: '1,5% a 2,0%',
      brokerageFee: 'Comisión Cero en Acciones, FIIs, BDRs y Renta Fija',
      regulation: 'CVM, ANBIMA, Banco Central de Brasil',
      minDeposit: 'Sin mínimo',
      platforms: ['App Rico', 'Home Broker Web', 'Profit Rico Trader'],
      features: [
        'Cero comisión de corretaje para operar en B3',
        'Carteras mensuales recomendadas de acciones y dividendos',
        'Modo Riconnect con cursos y seminarios en vivo',
      ],
    },
    clear: {
      country: 'Brasil',
      badge: 'Enfoque Day Trade Cero',
      description:
        'Bróker brasileño que eliminó el corretaje minorista, enfocado en operadores activos de mini-índice, mini-dólar, acciones y swing trade con plataformas especializadas.',
      spreadCambio: 'N/A (Foco en B3)',
      brokerageFee: 'Cero Comisión en todas las operaciones en B3',
      regulation: 'CVM, ANBIMA (Grupo XP)',
      minDeposit: 'Sin mínimo',
      features: [
        'Cero comisión en Day Trade y Swing Trade',
        'Plataformas de alto rendimiento (Profit Pro gratis operando)',
        'Calculadora fiscal integrada para traders',
      ],
    },
    toro: {
      country: 'Brasil',
      badge: 'Grupo Santander',
      description:
        'Bróker del Banco Santander enfocado en usabilidad, recomendaciones de trading en un clic y modelo innovador ganar-ganar, además de cero corretaje.',
      spreadCambio: '1,4% a 1,9%',
      brokerageFee: 'Comisión Cero en Acciones, FIIs y Renta Fija',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'Sin mínimo',
      platforms: ['App Toro', 'Toro Trader (Profit)', 'Web'],
      features: [
        'Ganar-Ganar: solo pagas comisión si la operación recomendada da lucro',
        'Cashback en fondos de inversión',
        'Respaldo y solidez global del Banco Santander',
      ],
    },
    genial: {
      country: 'Brasil',
      badge: 'Alto Rendimiento',
      description:
        'Uno de los brókeres de mayor crecimiento en Brasil, combinando comisión cero en acciones y FIIs con infraestructura robusta para traders (DMA2 directo en B3 y salas en vivo).',
      spreadCambio: '1,3% a 1,8%',
      brokerageFee: 'Cero Comisión en Acciones, FIIs y BDRs',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'Sin mínimo',
      platforms: ['Profit Pro Gratis', 'Genial Trader', 'App Genial'],
      features: [
        'Profit Pro 100% gratis operando 1 minicontrato al mes',
        'Salas en vivo en YouTube con análisis técnico y de flujo',
        'Estudios macroeconómicos y electorales de referencia (Genial/Quaest)',
      ],
    },
    agora: {
      country: 'Brasil',
      badge: 'Bradesco BBI',
      description:
        'Casa de inversiones del Banco Bradesco. Conecta análisis premiados de Bradesco BBI con productos financieros tradicionales, notas estructuradas y asesoría.',
      spreadCambio: '1,5% a 2,0%',
      brokerageFee: 'Planes con comisión cero y asesoría',
      regulation: 'CVM, Banco Central de Brasil, ANBIMA',
      minDeposit: 'Sin mínimo',
      platforms: ['Ágora Mobile', 'Home Broker Ágora', 'Ágora Trader'],
      features: [
        'Informes y recomendaciones institucionales de Bradesco BBI',
        'Integración de saldo y cuentas para clientes Bradesco',
        'Ágora Academy con rutas educativas completas',
      ],
    },
    inter: {
      country: 'Brasil',
      badge: 'Brasil + EE. UU. Integrados',
      description:
        'Plataforma de inversiones de Banco Inter que une la Bolsa Brasileña (B3) y la Bolsa Americana (Nasdaq/NYSE) en la misma pantalla, con cambio directo y cero corretaje.',
      spreadCambio: '0,99% a 1,5% (uno de los menores spreads bancarios)',
      brokerageFee: 'Cero Comisión en B3 y acciones estadounidenses',
      regulation: 'CVM, Banco Central, SEC/FINRA (vía Apex)',
      minDeposit: 'R$ 0 / $ 1',
      platforms: ['Super App Inter (iOS & Android)', 'Home Broker Web'],
      features: [
        'Global Account con tarjeta de débito internacional Mastercard',
        'Cero comisión para negociar acciones en EE. UU. y Brasil',
        'Cashback diario en fondos y compras en Inter Shop',
      ],
    },
    c6: {
      country: 'Brasil',
      badge: 'Cuenta Global Dólar & Euro',
      description:
        'Solución de inversiones de C6 Bank (alianza JP Morgan). Destaca por su Cuenta Global multidivisa con soporte nativo para Dólar estadounidense y Euro de la Unión Europea.',
      spreadCambio: '1,0% a 2,0% en Dólar y Euro comercial',
      brokerageFee: 'Cero comisión en B3',
      regulation: 'CVM, Banco Central de Brasil',
      minDeposit: 'Sin mínimo',
      platforms: ['App C6 Bank'],
      features: [
        'Cuentas internacionales en Euro (€) y Dólar ($) con tarjetas dedicadas',
        'C6 TechInvest con carteras gestionadas por algoritmo',
        'Puntos Átomos que no caducan y se convierten en cashback o millas',
      ],
    },
    safra: {
      country: 'Brasil',
      badge: 'Private & Tradición',
      description:
        'División de inversiones del cuarto mayor banco privado de Brasil. Enfoque en altos patrimonios, preservación de capital, crédito privado y fondos Safra.',
      spreadCambio: 'Negociable con mesa de cambio',
      brokerageFee: 'Competitiva bajo consulta',
      regulation: 'CVM, Banco Central, ANBIMA',
      minDeposit: 'R$ 1.000 para apertura de cuenta',
      platforms: ['App Safra', 'Safra Internet Banking', 'Home Broker'],
      features: [
        'Reconocido mundialmente por su solidez y gestión conservadora',
        'Fondos de inversión Safra Galileu y Safra Consumo',
        'Atención consultiva y banca privada exclusiva',
      ],
    },
    guide: {
      country: 'Brasil',
      badge: 'Multinacional Fosun',
      description:
        'Bróker brasileño controlado por el conglomerado global Fosun. Ofrece asesoría personalizada, curaduría de fondos independientes y planes de previsión privada.',
      spreadCambio: '1,5%',
      brokerageFee: 'Planes exentos en renta variable',
      regulation: 'CVM, ANBIMA, Banco Central',
      minDeposit: 'Sin mínimo',
      platforms: ['Guide App', 'Home Broker Guide'],
      features: [
        'Análisis de mercado con visión macroeconómica global',
        'Plataforma completa de fondos y previsión',
        'Apoyo consultivo personalizado con asesores acreditados',
      ],
    },
    ibkr: {
      country: 'Estados Unidos / Global',
      badge: 'Acceso Multi-Bolsa Global',
      description:
        'Bróker internacional con acceso directo a más de 150 bolsas en 33 países operando Dólar, Euro, Libra y Yen con márgenes institucionales competitivos.',
      spreadCambio: 'Desde 0,08% (tasa interbancaria institucional)',
      brokerageFee: 'Desde $0.005 / acción en EE. UU.; €1,25 en Europa',
      regulation: 'SEC, FINRA, SIPC, FCA (Reino Unido), BaFin (Alemania)',
      minDeposit: '$0 (Sin depósito mínimo)',
      features: [
        'Negociación en bolsas europeas (DAX, Euronext París, Ámsterdam, Londres)',
        'Remuneración sobre saldo de efectivo elegible en dólar y euro no invertido',
        'Tasas competitivas de margen y financiamiento en mercados globales',
      ],
    },
    avenue: {
      country: 'Estados Unidos / Brasil',
      badge: 'Interfaz en Portugués EE. UU.',
      description:
        'Fundado en EE. UU. con foco en inversores latinoamericanos y brasileños. Interfaz accesible, soporte dedicado, fondeo rápido y reportes fiscales automatizados.',
      spreadCambio: '1,4% a 2,0% (decreciente por volumen)',
      brokerageFee: 'Cero comisión en planes seleccionados',
      regulation: 'SEC, FINRA, SIPC (Protección hasta $500k)',
      minDeposit: 'R$ 100 vía PIX con conversión inmediata',
      platforms: ['App Avenue (iOS & Android)', 'Portal Web'],
      features: [
        'Depósitos vía PIX con conversión inmediata a dólares',
        'Informe fiscal automatizado para declaración anual',
        'Tarjeta de débito Avenue Mastercard para pagos internacionales',
      ],
    },
    nomad: {
      country: 'Estados Unidos / Brasil',
      badge: 'Cuenta Global & Viajes',
      description:
        'Fintech con sede en EE. UU. que ofrece cuenta corriente en dólares y plataforma de inversión en Wall Street. Destaca por su tarjeta de débito para viajes a Europa y compras globales.',
      spreadCambio: '1,0% a 2,0% con programa Nomad Pass',
      brokerageFee: 'Cero comisión en acciones y ETFs de EE. UU.',
      regulation: 'SIPC (Hasta $500.000), FDIC (Hasta $250.000 en banca)',
      minDeposit: 'R$ 100 vía PIX',
      platforms: ['App Nomad (iOS & Android)'],
      features: [
        'Tarjeta aceptada en más de 180 países con impuesto reducido',
        'Salas VIP en el Aeropuerto de Guarulhos para clientes fidelizados',
        'Inversión en fracciones de acciones desde $1',
      ],
    },
    schwab: {
      country: 'Estados Unidos',
      badge: 'Bróker Consolidado EE. UU.',
      description:
        'Firma estadounidense de gestión patrimonial y corretaje que brinda a inversores internacionales la plataforma thinkorswim, análisis de Wall Street y sólida trayectoria.',
      spreadCambio: 'Interbancario directo',
      brokerageFee: '$0 en acciones y ETFs listados en EE. UU.',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$25.000 para cuentas internacionales',
      features: [
        'Plataforma thinkorswim para análisis técnico y opciones',
        'Estudios y calificaciones de analistas de Wall Street',
        'Cuenta bancaria con reembolso de comisiones en cajeros (ATMs)',
      ],
    },
    fidelity: {
      country: 'Estados Unidos',
      badge: 'Custodia Wall Street',
      description:
        'Institución consolidada del mercado de capitales estadounidense, conocida por fondos indexados sin comisión de gestión y ejecución competitiva de órdenes.',
      spreadCambio: 'Interbancario de mercado',
      brokerageFee: '$0 para acciones y ETFs estadounidenses online',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0 para residentes / bajo consulta para no residentes',
      features: [
        'Ejecución enfocada en mejora de precios en órdenes',
        'Fondos Fidelity ZERO con 0,00% de comisión de gestión',
        'Herramientas integrales de planificación para el retiro',
      ],
    },
    robinhood: {
      country: 'Estados Unidos / Europa',
      badge: 'Pionera Zero Fee',
      description:
        'El bróker que democratizó el acceso a Wall Street para la generación moderna. Ofrece negociación de acciones, opciones y criptoactivos 24 horas al día con interfaz simple.',
      spreadCambio: 'Incluido en el spread de mercado',
      brokerageFee: '$0 en todas las acciones y ETFs de EE. UU.',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        'Trading 24 Horas en acciones seleccionadas de EE. UU.',
        'Rendimiento sobre saldo de efectivo en dólares (Robinhood Gold)',
        'Billetera Web3 nativa para transferencias cripto',
      ],
    },
    etoro: {
      country: 'Reino Unido / Europa',
      badge: 'Líder en Copy Trading',
      description:
        'Pionero global en inversión social y Copy Trading. Permite replicar automáticamente las carteras y operaciones de inversores verificados de todo el mundo.',
      spreadCambio: 'Spread estándar de mercado',
      brokerageFee: 'Cero comisión en acciones y ETFs',
      regulation: 'FCA (Reino Unido), CySEC (Chipre), ASIC (Australia), FinCEN',
      minDeposit: '$50 a $100',
      platforms: ['eToro Web Trader', 'App eToro'],
      features: [
        'CopyTrader: replicación automática de carteras de inversores verificados',
        'Smart Portfolios temáticos (IA, Energías Limpias, Dividendos)',
        'Soporte para acciones de EE. UU., Europa y criptomonedas en una cartera',
      ],
    },
    saxobank: {
      country: 'Dinamarca / Europa',
      badge: 'Banco de Trading Europeo',
      description:
        'Banco danés especializado en negociación multiactivo global. Conecta más de 71.000 instrumentos financieros entre acciones europeas, bonos soberanos y divisas.',
      spreadCambio: 'Spreads institucionales estrechos',
      brokerageFee: 'Comisiones bajas y transparentes en Europa',
      regulation: 'Danish FSA (Dinamarca), FCA, BaFin, FINMA',
      minDeposit: '€0 (Sin mínimo)',
      platforms: ['SaxoTraderGO', 'SaxoTraderPRO (Multipantalla)'],
      features: [
        'Acceso a todas las bolsas de la Eurozona cotizadas en €',
        'Licencia bancaria completa con garantía europea de depósitos',
        'Amplio catálogo de bonos soberanos de Europa y EE. UU.',
      ],
    },
    degiro: {
      country: 'Alemania / Países Bajos',
      badge: 'Líder Europeo Low Cost',
      description:
        'Mayor bróker minorista de Europa (Grupo flatexDEGIRO). Amplia presencia en más de 18 países europeos con comisiones ultrabajas para DAX, CAC 40 y bolsas globales.',
      spreadCambio: '0,25% (Auto FX)',
      brokerageFee: '€1 a €2 por orden en Europa / EE. UU.',
      regulation: 'BaFin (Alemania), Bundesbank, AFM (Países Bajos)',
      minDeposit: '€0,01',
      features: [
        'Selección de ETFs populares con comisión de corretaje CERO',
        'Depósito bancario directo con IBAN en euros',
        'Más de 50 bolsas internacionales accesibles en una sola cuenta',
      ],
    },
    swissquote: {
      country: 'Suiza',
      badge: 'Banco Suizo Privado',
      description:
        'Banco líder en trading online con sede en Gland, Suiza. Combina el prestigio y la estabilidad histórica de la banca suiza con tecnología financiera moderna.',
      spreadCambio: 'Interbancario seguro',
      brokerageFee: 'Tarifario bancario suizo',
      regulation: 'FINMA (Autoridad Supervisora del Mercado Financiero Suizo)',
      minDeposit: '$0 para cuenta de trading',
      features: [
        'Garantía legal suiza de depósitos hasta CHF 100.000 por cliente',
        'Negociación en Franco Suizo (CHF), Euro (EUR), Dólar (USD) y Libra (GBP)',
        'Acceso directo a fondos de cobertura y private equity internacional',
      ],
    },
    webull: {
      country: 'Estados Unidos',
      badge: 'Trading Tech & Gráficos',
      description:
        'Plataforma enfocada en gráficos avanzados y datos de mercado gratuitos. Ofrece horario extendido completo (4:00 a 20:00 de Nueva York) y cero comisiones.',
      spreadCambio: 'Tasas de mercado',
      brokerageFee: '$0 Comisión en Acciones y Opciones',
      regulation: 'SEC, FINRA, SIPC',
      minDeposit: '$0',
      features: [
        'Negociación completa en Pre-Market y After-Hours (16 horas al día)',
        'Gráficos avanzados con decenas de indicadores técnicos sin costo',
        'Simulador de inversiones (Paper Trading) integrado',
      ],
    },
    xtb: {
      country: 'Reino Unido / Polonia',
      badge: 'Acciones Reales + CFD',
      description:
        'Uno de los mayores brókeres cotizados en bolsa de Europa. Más de 1 millón de clientes usan su premiada plataforma xStation para acciones reales con 0% de comisión y derivados.',
      spreadCambio: '0,5% en conversión de divisas',
      brokerageFee: '0% de comisión hasta €100.000 de volumen mensual',
      regulation: 'FCA (Reino Unido), KNF (Polonia), CySEC',
      minDeposit: 'Sin mínimo',
      features: [
        '0% de comisión en más de 3.000 acciones y ETFs reales',
        'Intereses mensuales pagados sobre el saldo en efectivo no invertido',
        'Plataforma xStation premiada por su velocidad de ejecución',
      ],
    },
    binance: {
      country: 'Global',
      badge: 'Alto Volumen Global',
      description:
        'Exchange de activos digitales de alto volumen diario para operar Bitcoin, Ethereum, Solana y altcoins con depósitos y retiros rápidos.',
      spreadCambio: 'Paridad directa de libro de órdenes',
      brokerageFee: 'Desde 0,075% (con descuento pagando en BNB)',
      regulation: 'Cumplimiento global y autorizaciones en distintas jurisdicciones',
      minDeposit: 'R$ 10 vía PIX instantáneo',
      features: [
        'Depósitos y retiros rápidos en Reales (BRL) y Euros (EUR)',
        'Fondo de Garantía Seguro de Activos para Usuarios (SAFU)',
        'Mercado de Futuros, Staking con rendimientos y Launchpool',
      ],
    },
    mercadobitcoin: {
      country: 'Brasil',
      badge: 'Plataforma Cripto Brasil',
      description:
        'Exchange brasileña de criptomonedas activa desde 2013 y licenciada como Institución de Pago por el Banco Central, centrada en criptoactivos y tokens de renta fija.',
      spreadCambio: 'Pares directos en Reales',
      brokerageFee: '0,3% a 0,7% por operación',
      regulation: 'Banco Central de Brasil (Licencia IP), ABcripto',
      minDeposit: 'R$ 1 vía PIX',
      platforms: ['App MB', 'Portal Web Pro'],
      features: [
        'Renta Fija Digital vinculada a derechos crediticios privados',
        'Soporte al cliente 24/7',
        'Custodia en Brasil con gobernanza institucional',
      ],
    },
    coinbase: {
      country: 'Estados Unidos',
      badge: 'Bolsa Nasdaq (COIN)',
      description:
        'Exchange de criptoactivos cotizada públicamente en Nasdaq (COIN), sujeta a auditorías contables públicas, cumplimiento regulatorio y servicios de custodia.',
      spreadCambio: 'Spread oficial transparente',
      brokerageFee: 'Desde 0,05% en Coinbase Advanced',
      regulation: 'SEC, FinCEN, FCA (Reino Unido), BaFin (Alemania)',
      minDeposit: '$2 / R$ 10',
      features: [
        'Auditoría contable pública presentada ante reguladores de EE. UU.',
        'Custodio institucional para varios ETFs de Bitcoin y Ethereum de EE. UU.',
        'Controles segregados de custodia junto con cuentas minoristas',
      ],
    },
    kraken: {
      country: 'Estados Unidos / Europa',
      badge: 'Trayectoria de Seguridad',
      description:
        'Fundada en 2011, una de las exchanges internacionales consolidadas, conocida por su continuidad operativa y auditorías periódicas de Prueba de Reservas.',
      spreadCambio: 'Pares directos profundos en EUR y USD',
      brokerageFee: 'Desde 0,16% Maker / 0,26% Taker',
      regulation: 'FinCEN (EE. UU.), FCA (Reino Unido), AUSTRAC',
      minDeposit: '€10 / $10',
      features: [
        'Auditoría de Prueba de Reservas (Proof of Reserves) verificable por el cliente',
        'Liquidez profunda en pares de Euro (EUR) con transferencias SEPA',
        'Trading de futuros con controles de margen',
      ],
    },
    foxbit: {
      country: 'Brasil',
      badge: 'Exchange Brasileña',
      description:
        'Exchange brasileña de Bitcoin con depósitos y retiros vía PIX las 24 horas y soluciones de pasarela de pago para comercios.',
      spreadCambio: 'Cotización en Reales',
      brokerageFee: 'Desde 0,25%',
      regulation: 'ABcripto, Hacienda Federal de Brasil (IN 1888)',
      minDeposit: 'R$ 10 vía PIX',
      platforms: ['App Foxbit', 'Foxbit Pro Web'],
      features: [
        'Liquidación PIX automática las 24 horas',
        'Foxbit Pay para aceptar pagos en Bitcoin en comercios',
        'Informes exportables para declaración fiscal anual',
      ],
    },
    okx: {
      country: 'Global',
      badge: 'Herramientas Web3 & Multired',
      description:
        'Exchange global de derivados y mercado al contado con billetera Web3 sin custodia compatible con más de 80 blockchains y depósitos en reales.',
      spreadCambio: 'Precio de libro de órdenes en pantalla',
      brokerageFee: 'Desde 0,08%',
      regulation: 'VARA (Dubái), Bahamas, Hong Kong',
      minDeposit: 'R$ 10 vía PIX',
      platforms: ['OKX Web3 Wallet', 'OKX App', 'TradingView Integrado'],
      features: [
        'Billetera Web3 sin custodia compatible con más de 80 blockchains',
        'Depósito rápido en Reales vía PIX',
        'Integración con DEXs y mercado NFT/Ordinals',
      ],
    },
    bybit: {
      country: 'Global',
      badge: 'Derivados & Liquidez',
      description:
        'Exchange de activos digitales enfocada en futuros perpetuos y liquidez al contado, con herramientas algorítmicas y soporte para depósitos vía PIX.',
      spreadCambio: 'Libro de órdenes de alta liquidez',
      brokerageFee: 'Desde 0,02% Maker / 0,055% Taker en futuros',
      regulation: 'Licencias internacionales y Prueba de Reservas periódica',
      minDeposit: 'R$ 10 vía PIX',
      platforms: ['Bybit App', 'Bybit Web Pro', 'API de Alta Frecuencia'],
      features: [
        'Copy Trading de contratos futuros perpetuos',
        'Bots algorítmicos integrados (Grid Bots, DCA Bots)',
        'Soporte para pagos vía PIX y tarjetas internacionales',
      ],
    },
  },
};

export function getLocalizedBroker(broker: BrokerInfo, lang: SupportedLanguage): BrokerInfo {
  if (lang === 'pt') return broker;
  const override = BROKER_OVERRIDES[lang]?.[broker.id];
  if (!override) return broker;
  return {
    ...broker,
    ...override,
  };
}
