import type { SupportedLanguage } from './translations';

export interface GuideEditorialSection {
  id: string;
  badge: string;
  title: string;
  paragraphs: string[];
  highlights?: { label: string; value: string; note: string }[];
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface FxGuideCopy {
  badge: string;
  title: string;
  subtitle: string;
  readingMeta: string;
  noticeTitle: string;
  noticeBody: string;
  liveMonitorTitle: string;
  liveMonitorSubtitle: string;
  commercialEuroLabel: string;
  commercialDollarLabel: string;
  commercialPoundLabel: string;
  spreadComparisonTitle: string;
  spreadComparisonNote: string;
  channels: {
    label: string;
    spreadPct: number;
    iofPct: number;
    description: string;
  }[];
  sections: GuideEditorialSection[];
  stepsTitle: string;
  stepsSubtitle: string;
  steps: {
    stepNumber: string;
    title: string;
    description: string;
  }[];
  ctaCalculator: string;
  ctaBrokers: string;
  ctaMonetary: string;
  faqEyebrow: string;
  faqTitle: string;
  faqItems: GuideFaqItem[];
  footerDisclaimer: string;
}

export interface MonetaryGlossaryItem {
  term: string;
  category: string;
  definition: string;
}

export interface EuMercosurMetricRow {
  label: string;
  value: string;
  detail: string;
}

export interface EuMercosurIndicatorCard {
  id: string;
  badge: string;
  title: string;
  metrics: EuMercosurMetricRow[];
  source: string;
  takeaway: string;
}

export interface EuMercosurIndicatorsSection {
  eyebrow: string;
  title: string;
  subtitle: string;
  correlationTitle: string;
  correlationBody: string;
  cards: EuMercosurIndicatorCard[];
  staticNote: string;
}

export interface MonetaryPolicyCopy {
  badge: string;
  title: string;
  subtitle: string;
  readingMeta: string;
  noticeTitle: string;
  noticeBody: string;
  panelTitle: string;
  panelSubtitle: string;
  benchmarks: {
    label: string;
    rate: string;
    institution: string;
    role: string;
  }[];
  euMercosurIndicators: EuMercosurIndicatorsSection;
  sections: GuideEditorialSection[];
  glossaryEyebrow: string;
  glossaryTitle: string;
  glossarySubtitle: string;
  glossaryItems: MonetaryGlossaryItem[];
  ctaFixedIncome: string;
  ctaFxGuide: string;
  ctaNews: string;
  faqEyebrow: string;
  faqTitle: string;
  faqItems: GuideFaqItem[];
  footerDisclaimer: string;
}

export const FX_GUIDE_TRANSLATIONS: Record<SupportedLanguage, FxGuideCopy> = {
  pt: {
    badge: 'Guia Institucional de Câmbio & Remessas',
    title: 'Guia Completo de Câmbio Comercial, Spread, IOF e Remessas Internacionais',
    subtitle:
      'Entenda como funciona a formação do preço do Euro e do Dólar no Brasil, a diferença real entre câmbio comercial e turismo, o impacto do spread bancário e das alíquotas de IOF no Valor Efetivo Total (VET) e como simular transferências internacionais com transparência.',
    readingMeta: 'Leitura analítica • Câmbio, Tributação e Fluxo Internacional',
    noticeTitle: 'Conteúdo Educativo & Referência de Mercado',
    noticeBody:
      'Este guia explica critérios técnicos de formação cambial, encargos tributários e metodologia de comparação de custos para fins exclusivamente informativos e educacionais. Antes de contratar operações de câmbio ou remessa, confira as alíquotas vigentes e os termos de sua instituição financeira.',
    liveMonitorTitle: 'Referências Interbancárias em Tempo Real (EUR/BRL, USD/BRL e GBP/BRL)',
    liveMonitorSubtitle:
      'Simulação ilustrativa do custo efetivo final (VET) comparando a cotação comercial de referência com diferentes canais de conversão e remessa.',
    commercialEuroLabel: 'Euro Comercial (EUR/BRL)',
    commercialDollarLabel: 'Dólar Comercial (USD/BRL)',
    commercialPoundLabel: 'Libra Esterlina (GBP/BRL)',
    spreadComparisonTitle: 'Comparativo Ilustrativo de VET sobre EUR/BRL Comercial (Base: € 1.000)',
    spreadComparisonNote:
      'Fórmula didática: Cotação Efetiva = Cotação Comercial × (1 + Spread%) × (1 + IOF%). Valores de spread variam conforme instituição e volume.',
    channels: [
      {
        label: 'Conta Global / Remessa Digital Competitiva',
        spreadPct: 1.0,
        iofPct: 1.1,
        description: 'Referência típica de conta internacional de mesma titularidade ou plataforma digital especializada.',
      },
      {
        label: 'Remessa Bancária Tradicional (Mesma Titularidade)',
        spreadPct: 3.5,
        iofPct: 1.1,
        description: 'Incidência comum de spread comercial mais elevado somado ao IOF de disponibilidade no exterior.',
      },
      {
        label: 'Cartão de Crédito Internacional / Compra no Exterior',
        spreadPct: 4.5,
        iofPct: 4.38,
        description: 'Combinação de margem cambial do emissor com alíquota específica vigente para operações com cartão.',
      },
      {
        label: 'Papel-Moeda em Espécie (Câmbio Turismo)',
        spreadPct: 6.0,
        iofPct: 1.1,
        description: 'Inclui custos físicos de importação de cédulas, custódia, seguro, logística e margem da casa de câmbio.',
      },
    ],
    sections: [
      {
        id: 'comercial-vs-turismo',
        badge: 'Fundamentos do Câmbio',
        title: '1. Diferença prática entre Câmbio Comercial (interbancário) e Câmbio Turismo',
        paragraphs: [
          'Quando o noticiário econômico divulga que o Euro ou o Dólar subiu ou recuou ao longo do dia, a referência quase sempre aponta para o câmbio comercial. Trata-se da taxa negociada eletronicamente no mercado interbancário entre bancos, corretoras autorizadas, tesourarias corporativas, exportadores e importadores para liquidar operações financeiras, contratos de comércio exterior e fluxos de investimento sem trânsito físico de papel-moeda.',
          'Dentro desse mercado de atacado nasce também a taxa PTAX, calculada diariamente pelo Banco Central do Brasil a partir da média de cotações consultadas junto aos dealers autorizados em quatro janelas ao longo do pregão. Como as transações ocorrem em grandes lotes eletrônicos e liquidação escritural, o câmbio comercial apresenta liquidez elevada e margens estreitas entre preço de compra (bid) e venda (ask).',
          'O câmbio turismo, por sua vez, é a taxa de varejo aplicada na compra e venda de cédulas físicas em espécie para viagens internacionais ou gastos presenciais no exterior. Embora parta da cotação comercial como piso de referência, o dólar ou euro turismo carrega custos operacionais ausentes nas transações eletrônicas: importação segura de papel-moeda, transporte blindado, apólices de seguro, custódia em cofres, risco de estoque parado e despesas de atendimento em balcão ou entrega em domicílio.',
          'Na prática, essa estrutura logística faz com que o câmbio turismo custe frequentemente entre 4% e 8% acima do câmbio comercial puro. Para o viajante ou investidor, compreender essa fronteira evita confundir uma tela de cotação interbancária com o preço final de uma cédula física ou de um boleto de compra internacional.',
        ],
        highlights: [
          {
            label: 'Câmbio Comercial',
            value: 'Liquidação Eletrônica',
            note: 'Base para comércio exterior, PTAX, contas globais e remessas bancárias.',
          },
          {
            label: 'Câmbio Turismo',
            value: 'Cédulas em Espécie',
            note: 'Embute logística, seguro, custódia física e margem do varejo cambial.',
          },
        ],
      },
      {
        id: 'spread-e-iof',
        badge: 'Custos & Tributação',
        title: '2. Como funcionam o Spread Cambial e as alíquotas de IOF em transferências, cartões e investimentos',
        paragraphs: [
          'Comparar duas instituições financeiras olhando apenas para a taxa nominal anunciada costuma induzir ao erro. O indicador determinante em qualquer operação é o Valor Efetivo Total (VET), métrica regulamentada pelo Banco Central que consolida em reais por unidade de moeda estrangeira três componentes simultâneos: a cotação de referência de mercado, o spread cambial da instituição e o Imposto sobre Operações Financeiras (IOF), além de eventuais tarifas fixas de envio ou recepção (como despesas SWIFT).',
          'O spread cambial representa a margem percentual cobrada pelo banco, fintech ou corretora acima da taxa interbancária de compra ou venda. Em remessas digitais competitivas ou mesas de câmbio para volumes maiores, esse spread costuma oscilar entre 0,5% e 1,8%. Já em bancos tradicionais de varejo ou em faturas de cartão de crédito, a margem sobre a PTAX pode alcançar 4% a 6%, impactando diretamente o poder de compra do remetente.',
          'Além do spread, incide o IOF cambial, cuja alíquota varia conforme a natureza jurídica e a finalidade da remessa. De forma geral: transferências internacionais para conta de mesma titularidade no exterior e aquisição de moeda em espécie seguem regra distinta de remessas para conta de terceiros (0,38% na regra padrão de transferências para outra titularidade). Já compras com cartão de crédito, débito internacional ou pré-pago no exterior permanecem sujeitas ao cronograma oficial de redução gradual do IOF definido pelo governo federal, enquanto aplicações em contas de investimento ou retorno de capital seguem enquadramentos tributários específicos declarados no registro da operação.',
          'Por isso, antes de confirmar uma transferência para a Europa ou Estados Unidos — seja para pagar um curso, manter reserva em Euro, enviar recursos para familiares ou investir em ações globais — é indispensável verificar a natureza cambial selecionada e somar exatamente o impacto percentual do spread com o do IOF vigente.',
        ],
        highlights: [
          {
            label: 'Spread Bancário',
            value: '0,5% a 5,5%+',
            note: 'Margem aplicada pela instituição sobre a cotação interbancária.',
          },
          {
            label: 'IOF Cambial',
            value: '0,38% / 1,1% / Cartão',
            note: 'Alíquota definida conforme finalidade: terceiros, mesma titularidade ou cartão.',
          },
          {
            label: 'VET (Valor Efetivo Total)',
            value: 'Custo Real Final',
            note: 'Única métrica padronizada para comparar provedores com segurança.',
          },
        ],
      },
      {
        id: 'fatores-eur-usd',
        badge: 'Drivers Macroeconômicos',
        title: '3. Fatores que movimentam EUR/BRL e USD/BRL: juros (Selic vs. BCE/Fed), balança comercial e fluxo estrangeiro',
        paragraphs: [
          'As paridades EUR/BRL e USD/BRL não respondem apenas a eventos domésticos brasileiros; elas são resultado direto da interação entre juros globais, saldos comerciais e apetite internacional por risco. O primeiro grande vetor é o diferencial de taxas de juros — a distância entre a Taxa Selic definida pelo Copom no Brasil e os juros básicos praticados pelo Federal Reserve (Fed) nos Estados Unidos e pelo Banco Central Europeu (BCE) na Zona do Euro.',
          'Quando o juro real brasileiro permanece atrativo em comparação aos títulos do Tesouro americano ou aos bônus soberanos europeus, estratégias de carry trade tendem a atrair capital estrangeiro em busca de rendimento, aumentando a oferta de dólares e euros no mercado local e contribuindo para apreciação ou estabilidade do Real. Por outro lado, ciclos de aperto monetário no Fed ou no BCE reduzem esse diferencial e frequentemente fortalecem o Dólar e o Euro frente a moedas emergentes.',
          'O segundo vetor estrutural é a balança comercial. O Brasil mantém forte superávit exportador em commodities agrícolas, minério de ferro, proteína animal, celulose e petróleo, com a União Europeia figurando como um dos principais destinos comerciais do bloco Mercosul. Entrada robusta de receitas de exportação gera fluxo contínuo de divisas convertidas para reais, amortecendo pressões cambiais em momentos de turbulência externa.',
          'Finalmente, o fluxo financeiro estrangeiro na B3, o Investimento Estrangeiro Direto (IED) e a percepção sobre a trajetória fiscal brasileira atuam como amplificadores de curto prazo. Notícias sobre inflação nos EUA ou na Europa, mudanças no ritmo do BCE, resultados fiscais em Brasília ou avanços tarifários em acordos comerciais como União Europeia–Mercosul alteram rapidamente a precificação futura dos contratos de câmbio.',
        ],
      },
      {
        id: 'interpretacao-estrategica',
        badge: 'Planejamento Cambial',
        title: '4. Como reduzir custos e evitar armadilhas em remessas recorrentes para Europa e EUA',
        paragraphs: [
          'Para quem realiza envios frequentes em Euro ou Dólar — como estudantes na Europa, profissionais remotos, importadores de serviços ou investidores diversificando patrimônio internacional —, o custo oculto mais comum não está na variação diária da tela, mas na conversão em parcela única sob spread elevado ou no uso do cartão de crédito sem planejamento.',
          'A prática institucional recomendada consiste em separar a decisão em duas etapas: primeiro, acompanhar a tendência macroeconômica e estruturar envios escalonados (preço médio cambial em tranches semanais ou mensais) para suavizar o risco de converter todo o montante em um pico pontual de volatilidade; segundo, simular previamente o VET completo comparando taxa comercial pura versus a taxa final entregue pela instituição escolhida.',
        ],
      },
    ],
    stepsTitle: 'Passo a Passo: Como Usar a Calculadora de Câmbio Universal do DinhEuro para Comparar Cenários',
    stepsSubtitle:
      'Siga estas quatro etapas práticas na aba Ferramentas para medir o impacto exato do câmbio comercial, do spread e do IOF antes de enviar recursos ao exterior.',
    steps: [
      {
        stepNumber: '01',
        title: 'Escolha as moedas de origem e destino',
        description:
          'Na Calculadora de Câmbio Universal, selecione o par desejado (como EUR → BRL, USD → BRL ou BRL → EUR) ou utilize o botão de inversão rápida para visualizar tanto o poder de compra em reais quanto o montante líquido recebido na moeda estrangeira.',
      },
      {
        stepNumber: '02',
        title: 'Informe o valor ou selecione um atalho rápido',
        description:
          'Digite o valor exato da operação ou clique nos atalhos (100, 500, 1.000, 5.000 ou 10.000) e alterne entre cotação de Compra (bid) e Venda (ask) para entender a taxa interbancária pura praticada no mercado à vista.',
      },
      {
        stepNumber: '03',
        title: 'Abra o Simulador de Custos (Spread e IOF)',
        description:
          'Expanda o painel opcional de custos de remessa e ajuste os percentuais de Spread Bancário (por exemplo, 1,1% vs. 4,0%) e de IOF (0,38%, 1,1% ou alíquota de cartão). O sistema recalcula instantaneamente a cotação efetiva e o total líquido final.',
      },
      {
        stepNumber: '04',
        title: 'Compare cenários e registre o Valor Efetivo Total',
        description:
          'Anote a diferença em reais entre os dois percentuais testados para verificar quanto o spread e o imposto consomem da sua transferência. Com esse número em mãos, você avalia objetivamente qual canal de remessa oferece o menor custo total.',
      },
    ],
    ctaCalculator: 'Abrir Calculadora de Câmbio Universal',
    ctaBrokers: 'Comparar Corretoras & Contas Globais',
    ctaMonetary: 'Ler Guia de Política Monetária & Juros',
    faqEyebrow: 'Dúvidas Frequentes',
    faqTitle: 'Perguntas Frequentes sobre Câmbio Comercial, Spread, IOF e Remessas',
    faqItems: [
      {
        question: 'Por que o valor cobrado pelo banco ou casa de câmbio é maior que a cotação exibida no portal?',
        answer:
          'A cotação exibida nos gráficos e monitores do mercado representa o câmbio comercial interbancário (taxa de atacado sem tributos ou margens de varejo). Bancos, cartões e casas de câmbio aplicam sobre essa base o spread cambial (remuneração da instituição) e o IOF obrigatório, formando o Valor Efetivo Total (VET).',
      },
      {
        question: 'Qual a diferença entre PTAX e cotação em tempo real do EUR/BRL ou USD/BRL?',
        answer:
          'A cotação em tempo real reflete os negócios contínuos do mercado interbancário a cada segundo. Já a PTAX é uma taxa média de referência calculada e divulgada pelo Banco Central do Brasil em janelas específicas do dia, frequentemente usada para fechar contratos, faturas de cartão e liquidações contratuais.',
      },
      {
        question: 'Quando vale mais a pena enviar uma remessa digital do que usar cartão de crédito no exterior?',
        answer:
          'Na grande maioria dos cenários, enviar recursos previamente para uma conta global ou realizar transferência internacional com spread reduzido (entre 0,8% e 1,5%) e IOF de mesma titularidade gera economia relevante em comparação ao cartão de crédito tradicional, que costuma somar spread bancário de 4% a 5% mais IOF de cartão.',
      },
      {
        question: 'Por que a alta dos juros no BCE ou no Fed pode valorizar o Euro e o Dólar frente ao Real?',
        answer:
          'Quando o Banco Central Europeu ou o Federal Reserve elevam suas taxas básicas de juros, os títulos públicos americanos e europeus passam a pagar retornos maiores com risco soberano reduzido. Isso atrai fluxos globais de capital de volta a esses centros, reduzindo a oferta de divisas em países emergentes e pressionando o câmbio para cima.',
      },
      {
        question: 'A Calculadora de Câmbio Universal do DinhEuro realiza transferências financeiras diretamente?',
        answer:
          'Não. O DinhEuro é um portal independente de inteligência financeira, cotações e simulação educativa. A calculadora permite estimar conversões e testar cenários de spread e IOF com total liberdade e sem cadastro, para que você tome decisões informadas antes de contratar sua instituição de confiança.',
      },
    ],
    footerDisclaimer:
      'Nota Institucional: As cotações exibidas têm caráter informativo e referencial de mercado. Alíquotas tributárias e spreads comerciais variam segundo a regulamentação vigente e a política comercial de cada instituição autorizada pelo Banco Central.',
  },
  en: {
    badge: 'Institutional FX & Remittances Guide',
    title: 'Complete Guide to Commercial FX, Bank Spread, IOF & International Transfers',
    subtitle:
      'Understand how EUR/BRL and USD/BRL pricing works in Brazil, the practical gap between commercial and tourism rates, how spreads and IOF shape the Total Effective Cost (VET), and how to model cross-border transfers clearly.',
    readingMeta: 'Analytical Guide • Foreign Exchange, Taxation & Capital Flows',
    noticeTitle: 'Educational Content & Market Reference',
    noticeBody:
      'This guide outlines FX pricing mechanics, Brazilian tax rules, and cost-comparison frameworks for educational purposes only. Verify prevailing statutory tax rates and provider fee schedules before executing any currency transfer.',
    liveMonitorTitle: 'Live Interbank Benchmarks (EUR/BRL, USD/BRL & GBP/BRL)',
    liveMonitorSubtitle:
      'Illustrative Total Effective Cost (VET) breakdown comparing live commercial rates against typical remittance and card channels.',
    commercialEuroLabel: 'Commercial Euro (EUR/BRL)',
    commercialDollarLabel: 'Commercial Dollar (USD/BRL)',
    commercialPoundLabel: 'British Pound (GBP/BRL)',
    spreadComparisonTitle: 'Illustrative VET Comparison on EUR/BRL Commercial Rate (€ 1,000 Base)',
    spreadComparisonNote:
      'Formula: Effective Rate = Commercial Spot Rate × (1 + Spread%) × (1 + IOF%). Exact spreads depend on provider and ticket size.',
    channels: [
      {
        label: 'Competitive Multi-Currency Global Account',
        spreadPct: 1.0,
        iofPct: 1.1,
        description: 'Typical benchmark for digital same-ownership international accounts and specialized FX platforms.',
      },
      {
        label: 'Traditional Bank Wire (Same Ownership)',
        spreadPct: 3.5,
        iofPct: 1.1,
        description: 'Conventional retail bank FX markup combined with same-holder outward transfer IOF.',
      },
      {
        label: 'International Credit Card Purchase',
        spreadPct: 4.5,
        iofPct: 4.38,
        description: 'Issuer FX spread added to the statutory card-transaction IOF rate.',
      },
      {
        label: 'Physical Banknotes (Tourism Cash)',
        spreadPct: 6.0,
        iofPct: 1.1,
        description: 'Reflects banknote import logistics, vault custody, insurance, and retail bureau margins.',
      },
    ],
    sections: [
      {
        id: 'comercial-vs-turismo',
        badge: 'FX Fundamentals',
        title: '1. Commercial (Interbank) FX vs. Tourism Cash Rates in Practice',
        paragraphs: [
          'Headline financial quotes for EUR/BRL or USD/BRL almost always refer to the commercial exchange rate—the electronic wholesale rate negotiated across banks, authorized dealers, corporate treasuries, exporters, and importers for cross-border trade and capital settlement without moving physical banknotes.',
          'From this wholesale market, the Central Bank of Brazil computes the official daily PTAX benchmark across four intraday sampling windows. Because settlement is electronic and high-volume, bid-ask spreads in the commercial market are tight.',
          'By contrast, the tourism rate applies to physical banknotes sold over the counter for travel. Although anchored to the commercial spot price, physical currency carries vault custody, armored transport, insurance, inventory risk, and branch overhead—making tourism cash routinely 4% to 8% costlier than electronic commercial FX.',
        ],
        highlights: [
          {
            label: 'Commercial FX',
            value: 'Electronic Settlement',
            note: 'Reference for trade flows, PTAX, global accounts, and bank wires.',
          },
          {
            label: 'Tourism FX',
            value: 'Physical Banknotes',
            note: 'Embeds cash logistics, insurance, custody, and retail dealer spread.',
          },
        ],
      },
      {
        id: 'spread-e-iof',
        badge: 'Fees & Taxes',
        title: '2. How FX Spread and IOF Work Across Wires, Cards, and Investments',
        paragraphs: [
          'Evaluating providers solely on headline exchange rates can be misleading. The authoritative comparison metric is the Total Effective Value (VET), which combines the market reference rate, the institution’s FX spread, Brazil’s Financial Operations Tax (IOF), and any flat wire fees.',
          'FX spread is the percentage markup added by a bank, card issuer, or transfer platform over interbank spot prices. Specialized global accounts typically charge between 0.5% and 1.8%, whereas legacy retail banks and credit cards often charge 4% to 6% above PTAX.',
          'IOF rates vary by transaction purpose: transfers to third-party foreign accounts follow one statutory tier (0.38% standard for third-party remittances), transfers to an account under the same holder and physical cash follow 1.1%, while international credit/debit cards follow the government’s phased reduction schedule. Checking both spread and IOF together is essential before funding overseas tuition, travel, or global brokerage accounts.',
        ],
        highlights: [
          {
            label: 'Bank / Platform Spread',
            value: '0.5% to 5.5%+',
            note: 'Markup applied over wholesale interbank spot quotes.',
          },
          {
            label: 'Brazilian IOF Tax',
            value: '0.38% / 1.1% / Card',
            note: 'Determined by transfer purpose and account ownership.',
          },
          {
            label: 'VET (Total Effective Cost)',
            value: 'All-In Rate',
            note: 'Standardized all-in cost metric per unit of foreign currency.',
          },
        ],
      },
      {
        id: 'fatores-eur-usd',
        badge: 'Macro Drivers',
        title: '3. What Drives EUR/BRL and USD/BRL: Selic vs. ECB/Fed Rates, Trade Balance & Foreign Flows',
        paragraphs: [
          'EUR/BRL and USD/BRL reflect the interaction of global monetary policy, trade surpluses, and risk sentiment. First, the interest-rate differential between Brazil’s Selic rate and policy rates set by the European Central Bank (ECB) and Federal Reserve shapes carry-trade attractiveness and cross-border bond allocations.',
          'Second, Brazil’s structural trade surplus—driven by agribusiness, iron ore, energy, and protein exports, with the European Union as a key trading partner—provides recurring commercial FX inflows that cushion external shocks.',
          'Third, foreign equity flows into B3, foreign direct investment, and domestic fiscal expectations drive short-term volatility whenever US, Eurozone, or Brazilian macro releases surprise consensus.',
        ],
      },
      {
        id: 'interpretacao-estrategica',
        badge: 'Transfer Planning',
        title: '4. Practical Principles to Lower Costs on Recurring Europe & US Transfers',
        paragraphs: [
          'For recurring Euro or Dollar needs—studying abroad, remote work receipts, or international portfolio allocation—avoiding single-lump conversions at high retail spreads matters more than timing exact intraday swings.',
          'Staggering conversions in periodic tranches smooths average entry rates, while modeling all-in VET (spot rate + spread + IOF) objectively highlights cost savings across channels.',
        ],
      },
    ],
    stepsTitle: 'Step-by-Step: Using DinhEuro’s Universal Currency Calculator to Compare Scenarios',
    stepsSubtitle:
      'Follow these four steps in the Tools tab to calculate exact commercial conversion values, spreads, and IOF before sending funds abroad.',
    steps: [
      {
        stepNumber: '01',
        title: 'Select origin and destination currencies',
        description:
          'Pick the pair (such as EUR → BRL, USD → BRL, or BRL → EUR) or toggle the quick swap control to view both outgoing local cost and net foreign currency received.',
      },
      {
        stepNumber: '02',
        title: 'Enter an amount or choose a preset',
        description:
          'Type any transaction amount or pick quick presets (100 to 10,000) and switch between Bid and Ask quotes to inspect raw interbank pricing.',
      },
      {
        stepNumber: '03',
        title: 'Expand the Spread & IOF Simulator',
        description:
          'Open the optional remittance fee panel and adjust Bank Spread (e.g., 1.1% vs. 4.0%) and IOF tax rates to preview the exact Total Effective Rate.',
      },
      {
        stepNumber: '04',
        title: 'Compare total cost across providers',
        description:
          'Review the side-by-side difference in net amount and fee breakdown to identify the most cost-efficient transfer method for your purpose.',
      },
    ],
    ctaCalculator: 'Open Universal Currency Calculator',
    ctaBrokers: 'Compare Brokers & Global Accounts',
    ctaMonetary: 'Read Monetary Policy & Rates Guide',
    faqEyebrow: 'Common Questions',
    faqTitle: 'Frequently Asked Questions on Commercial FX, Spread & International Transfers',
    faqItems: [
      {
        question: 'Why does a bank or currency bureau quote a higher rate than the market ticker?',
        answer:
          'Market tickers display wholesale commercial interbank rates without retail fees or taxes. Providers add an FX spread and applicable IOF tax on top of that reference to form the all-in Total Effective Cost (VET).',
      },
      {
        question: 'What is the difference between PTAX and live spot quotes?',
        answer:
          'Live spot quotes update continuously with interbank trades, while PTAX is a daily reference average published by the Central Bank of Brazil across four intraday sampling windows for contract settlement.',
      },
      {
        question: 'Is a digital remittance cheaper than using a credit card abroad?',
        answer:
          'Usually yes. Funding a multi-currency account with a 0.8%–1.5% spread and same-owner IOF typically costs substantially less than international credit cards carrying 4%–5% issuer markups plus card IOF.',
      },
      {
        question: 'How do ECB or Fed rate hikes influence EUR/BRL and USD/BRL?',
        answer:
          'Higher European or US policy rates raise yields on core sovereign bonds, tightening the rate advantage of emerging markets and often strengthening the Euro and Dollar against the Brazilian Real.',
      },
      {
        question: 'Does DinhEuro execute currency transfers directly?',
        answer:
          'No. DinhEuro is an independent financial intelligence and educational platform providing real-time market quotes and open simulation tools without requiring registration.',
      },
    ],
    footerDisclaimer:
      'Institutional Note: Exchange quotes are provided for informational and educational reference. Applicable tax rates and commercial spreads depend on current regulations and each authorized institution’s fee schedule.',
  },
  es: {
    badge: 'Guía Institucional de Cambio y Remesas',
    title: 'Guía Completa de Cambio Comercial, Spread, IOF y Remesas Internacionales',
    subtitle:
      'Comprende cómo se forma el precio del Euro y del Dólar en Brasil, la diferencia práctica entre cambio comercial y turismo, el impacto del spread bancario y el IOF en el Valor Efectivo Total (VET) y cómo simular envíos internacionales.',
    readingMeta: 'Lectura analítica • Tipo de Cambio, Tributación y Flujos Externos',
    noticeTitle: 'Contenido Educativo y Referencia de Mercado',
    noticeBody:
      'Esta guía explica la formación del tipo de cambio, impuestos aplicables y comparación de costos con fines exclusivamente informativos y educativos. Verifica siempre las tasas vigentes y condiciones antes de operar.',
    liveMonitorTitle: 'Referencias Interbancarias en Tiempo Real (EUR/BRL, USD/BRL y GBP/BRL)',
    liveMonitorSubtitle:
      'Simulación ilustrativa del costo efectivo total (VET) comparando la cotización comercial con distintos canales de envío y pago.',
    commercialEuroLabel: 'Euro Comercial (EUR/BRL)',
    commercialDollarLabel: 'Dólar Comercial (USD/BRL)',
    commercialPoundLabel: 'Libra Esterlina (GBP/BRL)',
    spreadComparisonTitle: 'Comparativa Ilustrativa de VET sobre EUR/BRL Comercial (Base: € 1.000)',
    spreadComparisonNote:
      'Fórmula: Cotización Efectiva = Cotización Comercial × (1 + Spread%) × (1 + IOF%). Los márgenes varían según la entidad.',
    channels: [
      {
        label: 'Cuenta Global / Plataforma Digital Competitiva',
        spreadPct: 1.0,
        iofPct: 1.1,
        description: 'Referencia habitual de cuenta internacional de misma titularidad o plataforma digital especializada.',
      },
      {
        label: 'Transferencia Bancaria Tradicional (Misma Titularidad)',
        spreadPct: 3.5,
        iofPct: 1.1,
        description: 'Margen comercial bancario convencional más la alícuota de IOF por disponibilidad en el exterior.',
      },
      {
        label: 'Tarjeta de Crédito Internacional en el Exterior',
        spreadPct: 4.5,
        iofPct: 4.38,
        description: 'Combina el diferencial cambiario del emisor con el IOF específico vigente para tarjetas.',
      },
      {
        label: 'Efectivo en Billetes (Cambio Turismo)',
        spreadPct: 6.0,
        iofPct: 1.1,
        description: 'Incorpora importación física de billetes, custodia, seguro y margen minorista.',
      },
    ],
    sections: [
      {
        id: 'comercial-vs-turismo',
        badge: 'Fundamentos Cambiarios',
        title: '1. Diferencia práctica entre Cambio Comercial (interbancario) y Cambio Turismo',
        paragraphs: [
          'Las cotizaciones de Euro y Dólar que muestran los monitores financieros corresponden al cambio comercial: la tasa electrónica mayorista negociada entre bancos, tesorerías corporativas, exportadores e importadores para liquidar operaciones de comercio exterior y flujos financieros sin entrega de billetes físicos.',
          'Sobre ese mercado mayorista el Banco Central de Brasil calcula diariamente la tasa de referencia PTAX en cuatro ventanas intradiarias. Al liquidarse electrónicamente en grandes volúmenes, el mercado comercial ofrece alta liquidez y horquillas estrechas.',
          'El cambio turismo, en cambio, rige la compra y venta de billetes físicos para viajes. Aunque toma como referencia al dólar o euro comercial, incorpora transporte blindado, seguros, custodia en bóvedas y costes de sucursal, ubicándose habitualmente entre 4% y 8% por encima del comercial.',
        ],
        highlights: [
          {
            label: 'Cambio Comercial',
            value: 'Liquidación Electrónica',
            note: 'Base para comercio exterior, PTAX, cuentas globales y transferencias.',
          },
          {
            label: 'Cambio Turismo',
            value: 'Billetes Físicos',
            note: 'Incluye logística de efectivo, seguro, custodia y margen minorista.',
          },
        ],
      },
      {
        id: 'spread-e-iof',
        badge: 'Costos e Impuestos',
        title: '2. Cómo funcionan el Spread Cambiario y las alícuotas de IOF en remesas, tarjetas e inversiones',
        paragraphs: [
          'Comparar proveedores mirando solo la tasa nominal suele ocultar cargos. La métrica clave es el Valor Efectivo Total (VET), que unifica cotización base, spread bancario, IOF y eventuales comisiones fijas.',
          'El spread es el margen porcentual que añade la institución sobre la tasa interbancaria. En plataformas especializadas ronda entre 0,5% y 1,8%, mientras en bancos tradicionales o tarjetas de crédito puede superar el 4%–5%.',
          'A esto se suma el IOF brasileño según la finalidad: transferencias a terceros (0,38% estándar), disponibilidad en cuenta propia o efectivo (1,1%) y compras con tarjeta internacional conforme el calendario oficial de reducción tributaria.',
        ],
        highlights: [
          {
            label: 'Spread Bancario',
            value: '0,5% a 5,5%+',
            note: 'Margen comercial aplicado sobre el precio interbancario.',
          },
          {
            label: 'IOF Cambiario',
            value: '0,38% / 1,1% / Tarjeta',
            note: 'Varía según finalidad y titularidad de la cuenta destino.',
          },
          {
            label: 'VET (Valor Efectivo Total)',
            value: 'Costo Real Final',
            note: 'Indicador estándar para comparar proveedores de envío con transparencia.',
          },
        ],
      },
      {
        id: 'fatores-eur-usd',
        badge: 'Factores Macro',
        title: '3. Factores que mueven EUR/BRL y USD/BRL: tasas (Selic vs. BCE/Fed), balanza comercial y flujo externo',
        paragraphs: [
          'El tipo de cambio responde al diferencial de tasas de interés entre la Selic brasileña y las tasas de referencia del Banco Central Europeo (BCE) y la Reserva Federal (Fed). Diferenciales amplios atraen capital de cartera hacia Brasil, mientras ciclos restrictivos en EE. UU. o Europa fortalecen al Dólar y al Euro.',
          'Además, el superávit comercial brasileño en materias primas y agroindustria —con la Unión Europea como socio clave— genera ingresos constantes de divisas que amortiguan episodios de volatilidad externa, junto con los flujos bursátiles y la percepción fiscal.',
        ],
      },
      {
        id: 'interpretacao-estrategica',
        badge: 'Planificación',
        title: '4. Buenas prácticas para optimizar costos en envíos periódicos a Europa y EE. UU.',
        paragraphs: [
          'Escalonar conversiones en tramos periódicos reduce el riesgo de ejecutar todo el monto en un pico de volatilidad diaria, y calcular siempre el VET previo permite elegir canales con menor spread e impuestos acordes a cada operación.',
        ],
      },
    ],
    stepsTitle: 'Paso a Paso: Cómo Usar la Calculadora de Cambio Universal de DinhEuro',
    stepsSubtitle:
      'Sigue estos cuatro pasos en la pestaña Herramientas para calcular el costo real antes de realizar una transferencia internacional.',
    steps: [
      {
        stepNumber: '01',
        title: 'Selecciona monedas de origen y destino',
        description:
          'Elige el par (EUR → BRL, USD → BRL o BRL → EUR) o usa el botón de inversión para ver el equivalente exacto en ambas direcciones.',
      },
      {
        stepNumber: '02',
        title: 'Introduce el monto o usa un acceso rápido',
        description:
          'Ingresa la cantidad deseada o selecciona montos rápidos (100 a 10.000) y alterna entre compra (bid) y venta (ask) interbancaria.',
      },
      {
        stepNumber: '03',
        title: 'Activa el Simulador de Spread e IOF',
        description:
          'Despliega el panel de costos de remesa y ajusta el spread y el IOF para visualizar de inmediato la cotización efectiva y el total neto.',
      },
      {
        stepNumber: '04',
        title: 'Compara escenarios antes de transferir',
        description:
          'Contrasta el costo total obtenido entre distintas configuraciones de spread para tomar decisiones informadas.',
      },
    ],
    ctaCalculator: 'Abrir Calculadora de Cambio Universal',
    ctaBrokers: 'Comparar Brókeres y Cuentas Globales',
    ctaMonetary: 'Leer Guía de Política Monetaria',
    faqEyebrow: 'Dudas Frecuentes',
    faqTitle: 'Preguntas Frecuentes sobre Cambio Comercial, Spread, IOF y Remesas',
    faqItems: [
      {
        question: '¿Por qué el banco cobra más que la cotización mostrada en pantalla?',
        answer:
          'Los monitores muestran el cambio comercial interbancario sin márgenes minoristas ni impuestos. Al operar, las entidades añaden su spread comercial y el IOF correspondiente, conformando el Valor Efectivo Total (VET).',
      },
      {
        question: '¿Cuál es la diferencia entre la tasa PTAX y la cotización en tiempo real?',
        answer:
          'La cotización en vivo refleja operaciones continuas del mercado, mientras la PTAX es un promedio oficial publicado diariamente por el Banco Central de Brasil para liquidar contratos.',
      },
      {
        question: '¿Conviene más enviar remesa digital que usar tarjeta de crédito en el viaje?',
        answer:
          'Por lo general sí: transferir a una cuenta global con spread cercano al 1% e IOF de misma titularidad suele resultar mucho más económico que el uso de tarjeta de crédito internacional.',
      },
      {
        question: '¿Cómo afectan las decisiones del BCE y la Fed al EUR/BRL y USD/BRL?',
        answer:
          'Subidas de tasas en Europa o EE. UU. elevan el rendimiento de bonos soberanos centrales y pueden atraer capitales desde economías emergentes, presionando al alza el Euro y el Dólar.',
      },
      {
        question: '¿DinhEuro realiza envíos de dinero directamente?',
        answer:
          'No. DinhEuro es un portal independiente de inteligencia financiera y simulación educativa con acceso libre y sin registro.',
      },
    ],
    footerDisclaimer:
      'Nota Institucional: Las cotizaciones mostradas tienen carácter informativo y referencial. Las alícuotas fiscales y márgenes comerciales dependen de la normativa vigente y de cada institución autorizada.',
  },
};

export const MONETARY_POLICY_TRANSLATIONS: Record<SupportedLanguage, MonetaryPolicyCopy> = {
  pt: {
    badge: 'Dossiê de Política Monetária & Macroeconomia',
    title: 'Política Monetária: Selic, IPCA, Boletim Focus e Juros do BCE',
    subtitle:
      'Análise estruturada sobre como o Copom define a Taxa Selic, a leitura das projeções do Boletim Focus, o papel do Banco Central Europeu (BCE) e do Federal Reserve (Fed) nos fluxos globais e a relação direta entre inflação, juros reais, Tesouro Direto e câmbio.',
    readingMeta: 'Leitura analítica • Bancos Centrais, Juros Reais e Câmbio',
    noticeTitle: 'Análise Macroeconômica & Educação Financeira',
    noticeBody:
      'Este conteúdo apresenta fundamentos de política monetária, formação da curva de juros e leitura de indicadores oficiais para fins exclusivamente educativos e analíticos. Não configura recomendação de alocação em títulos públicos ou ativos financeiros.',
    panelTitle: 'Painel de Referência Monetária & Câmbio em Tempo Real',
    panelSubtitle:
      'Eixo comparativo entre os principais bancos centrais (Brasil, Zona do Euro e Estados Unidos) e as paridades cambiais sincronizadas.',
    benchmarks: [
      {
        label: 'Banco Central do Brasil (Copom)',
        rate: 'Taxa Selic Meta',
        institution: 'Meta de Inflação (CMN) • IPCA',
        role: 'Principal instrumento de controle inflacionário e referência para o CDI e títulos pós-fixados.',
      },
      {
        label: 'Banco Central Europeu (BCE)',
        rate: 'Deposit / Refi Rate',
        institution: 'Zona do Euro • HICP (Meta 2%)',
        role: 'Define o custo do capital na Europa e baliza a força estrutural do Euro (EUR/USD e EUR/BRL).',
      },
      {
        label: 'Federal Reserve (FOMC / Fed)',
        rate: 'Fed Funds Rate',
        institution: 'EUA • PCE / CPI (Meta 2%)',
        role: 'Taxa livre de risco global que dita liquidez internacional, Treasuries e apetite por emergentes.',
      },
    ],
    euMercosurIndicators: {
      eyebrow: 'Referência Estática Oficial • Novembro/2026',
      title: 'Indicadores do Eixo União Europeia – Mercosul',
      subtitle:
        'Comparativo estático de taxas básicas de juros e projeções oficiais de inflação entre a Zona do Euro (BCE) e o Brasil (BCB / Mercosul), evidenciando como os ciclos monetários dos dois blocos interagem no câmbio e no comércio exterior.',
      cards: [
        {
          id: 'juros-bce-selic',
          badge: 'Taxas Básicas de Juros',
          title: 'BCE (Zona do Euro) vs. Selic (Brasil / Mercosul)',
          metrics: [
            {
              label: 'Taxa Selic Meta (Copom)',
              value: '13,75% a.a.',
              detail: 'Mantida na 282ª reunião do Copom (04/11/2026); Focus projeta 13,00% a.a. ao fim de 2027.',
            },
            {
              label: 'Taxa de Depósito do BCE',
              value: '2,50% a.a.',
              detail: 'Deposit Facility Rate vigente (set.–nov./2026); MRO em 2,65% e empréstimo marginal em 2,90%.',
            },
            {
              label: 'Diferencial Nominal (Selic − BCE)',
              value: '11,25 p.p.',
              detail: 'Amplitude entre os juros básicos que baliza o custo de hedge cambial e o carrego em EUR/BRL.',
            },
          ],
          source: 'Fontes: Banco Central do Brasil (Copom/Focus nov./2026) e Banco Central Europeu (BCE).',
          takeaway:
            'Diferenciais elevados de juros tendem a sustentar a atratividade da renda fixa brasileira em moeda local, ao passo que ajustes restritivos no BCE encarecem o custo de captação em Euro e reduzem a folga de liquidez global.',
        },
        {
          id: 'inflacao-ipca-hicp',
          badge: 'Projeções de Inflação',
          title: 'IPCA (Boletim Focus) vs. HICP (Projeções BCE)',
          metrics: [
            {
              label: 'IPCA Brasil — 2026 (Focus)',
              value: '5,15% a.a.',
              detail: 'Mediana do Boletim Focus (23/11/2026), com projeções de 5,12% para 2027 e 4,00% para 2028.',
            },
            {
              label: 'HICP Zona do Euro — 2026 (BCE)',
              value: '3,0% a.a.',
              detail: 'Projeção de inflação cheia do BCE (núcleo em 2,5%), recuando para 2,5% em 2027 rumo à meta de 2,0%.',
            },
            {
              label: 'Diferencial Inflacionário Projetado (2026)',
              value: '2,15 p.p.',
              detail: 'Diferença entre o IPCA estimado e o HICP europeu usada para leitura comparada de juro real.',
            },
          ],
          source: 'Fontes: Boletim Focus / BCB (23/11/2026) e Projeções Macroeconômicas do Staff do BCE.',
          takeaway:
            'Comparar a inflação esperada em cada bloco permite calcular o juro real ex-ante de cada moeda e compreender pressões de paridade de poder de compra sobre bens industriais, insumos agrícolas e contratos bilaterais.',
        },
      ],
      correlationTitle: 'Leitura Educativa: Correlação entre os Blocos União Europeia e Mercosul',
      correlationBody:
        'A interação entre a política monetária do BCE e do Banco Central do Brasil afeta diretamente o corredor econômico União Europeia–Mercosul por três vias complementares: (1) Fluxo financeiro e carry, pois o diferencial entre Selic e taxa de depósito do BCE influencia a entrada e saída de capitais em títulos soberanos; (2) Formação do par EUR/BRL e custo de hedge, já que a diferença de juros determina o prêmio dos contratos futuros de Euro usados por exportadores de commodities do Mercosul e importadores de bens de capital europeus; e (3) Repasse inflacionário bilateral, em que oscilações no Euro e nos preços globais de energia modulam tanto o HICP europeu quanto os custos de insumos importados no IPCA.',
      staticNote:
        'Painel estático de referência educacional baseado em comunicados e boletins públicos oficiais de novembro de 2026. Os números não representam cotações em tempo real nem recomendação de investimento.',
    },
    sections: [
      {
        id: 'copom-selic-focus',
        badge: 'Política Monetária no Brasil',
        title: '1. Como o Banco Central do Brasil (Copom) define a Taxa Selic e qual o papel do Boletim Focus',
        paragraphs: [
          'No Brasil, a condução da política monetária opera sob o regime de metas para a inflação, no qual o Conselho Monetário Nacional (CMN) estabelece o objetivo central do Índice Nacional de Preços ao Consumidor Amplo (IPCA) e o Comitê de Política Monetária (Copom) do Banco Central ajusta a Taxa Selic para manter a inflação convergente à meta no horizonte relevante.',
          'O Copom reúne-se ordinariamente oito vezes por ano — aproximadamente a cada 45 dias — em dois dias de debates técnicos e macroeconômicos, culminando na divulgação da Taxa Selic Meta. A partir dessa taxa-alvo, as operações compromissadas com títulos públicos federais realizadas no mercado interbancário calibram a Selic Over (taxa efetiva diária), que por sua vez caminha muito próxima ao CDI (Certificado de Depósito Interbancário), indexador padrão de CDBs, LCIs, LCAs e fundos de liquidez diária.',
          'Para tomar decisões, o Banco Central observa não apenas a inflação corrente medida pelo IBGE, mas principalmente as expectativas futuras de mercado consolidadas semanalmente no Boletim Focus. Publicado toda segunda-feira, o Relatório Focus reúne as medianas das projeções de mais de uma centena de instituições financeiras, consultorias e departamentos econômicos para quatro pilares: IPCA (inflação), Taxa Selic, PIB (crescimento) e câmbio USD/BRL.',
          'Quando as expectativas do Boletim Focus desancoram acima do centro da meta de inflação, o Copom tende a adotar postura mais restritiva (hawkish), elevando ou mantendo os juros em patamar contracionista para esfriar a demanda agregada e preservar o poder de compra da moeda. Quando a inflação projetada converge com folga e a atividade perde fôlego, abre-se espaço para ciclos graduais de afrouxamento monetário (dovish).',
        ],
        highlights: [
          {
            label: 'Ciclo do Copom',
            value: '8 Reuniões / Ano',
            note: 'Decisões a cada ~45 dias com ata técnica publicada na semana seguinte.',
          },
          {
            label: 'Boletim Focus',
            value: 'Mediana Semanal',
            note: 'Consolida projeções do mercado para IPCA, Selic, PIB e câmbio.',
          },
        ],
      },
      {
        id: 'bce-fed-fluxos',
        badge: 'Bancos Centrais Globais',
        title: '2. Como o Banco Central Europeu (BCE) e o Federal Reserve (Fed) conduzem os juros globais e influenciam o fluxo de capitais',
        paragraphs: [
          'Nenhuma economia integrada opera isolada da política monetária dos grandes blocos emissores de moeda forte. Nos Estados Unidos, o Federal Open Market Committee (FOMC) do Federal Reserve persegue um mandato dual: estabilidade de preços (inflação ao consumidor próxima de 2% ao ano no índice PCE) e pleno emprego máximo sustentável. Como o dólar é a principal moeda de reserva internacional, alterações na Fed Funds Rate repercutem imediatamente nos rendimentos dos US Treasuries — referência global de ativo livre de risco — e reprecificam ações, crédito corporativo e moedas no mundo inteiro.',
          'Na Zona do Euro, o Conselho do Banco Central Europeu (BCE), sediado em Frankfurt, atua com foco prioritário na estabilidade de preços medida pelo índice harmonizado HICP em torno de 2% no médio prazo. Por meio da Deposit Facility Rate (taxa paga sobre depósitos bancários no BCE) e da taxa principal de refinanciamento, o BCE regula a liquidez de vinte países que compartilham o Euro e sustenta a paridade da moeda europeia frente ao dólar e a moedas latino-americanas.',
          'O impacto sobre o Brasil ocorre pelo canal financeiro e pelo canal comercial. Pelo canal financeiro, quando Fed e BCE mantêm juros elevados, grandes fundos globais de pensão e tesourarias conseguem rentabilidade atrativa em títulos soberanos de baixo risco em dólar ou euro, reduzindo o incentivo para assumir risco em ativos emergentes. Inversamente, ciclos sincronizados de cortes de juros nos EUA e na Europa ampliam a liquidez global e costumam impulsionar o fluxo de capital estrangeiro para bolsas emergentes, renda fixa local e projetos de infraestrutura no corredor União Europeia–Mercosul.',
        ],
        highlights: [
          {
            label: 'BCE (Zona do Euro)',
            value: 'Estabilidade de Preços',
            note: 'Meta de 2% ao ano no HICP e ancoragem direta do Euro comercial.',
          },
          {
            label: 'Fed (Estados Unidos)',
            value: 'Mandato Dual',
            note: 'Equilíbrio entre inflação de 2% e emprego máximo nos EUA.',
          },
        ],
      },
      {
        id: 'ipca-juros-reais-tesouro',
        badge: 'Renda Fixa & Câmbio',
        title: '3. A relação direta entre inflação (IPCA), juros reais, títulos públicos (Tesouro Selic/IPCA+) e taxa de câmbio',
        paragraphs: [
          'Para poupadores e analistas, olhar apenas para a taxa nominal de um investimento pode gerar ilusão monetária. O conceito central da economia financeira é o juro real, formalizado pela relação de Fisher: o rendimento real aproxima-se da taxa nominal descontada a inflação acumulada no período (de forma exata, (1 + juro nominal) ÷ (1 + inflação) − 1). Um título que paga 12% ao ano enquanto o IPCA avança 5% entrega juro real de aproximadamente 6,67% acima da inflação.',
          'Essa distinção explica o comportamento dos principais títulos do Tesouro Direto. O Tesouro Selic é um título pós-fixado atrelado à taxa básica diária; por possuir baixíssima sensibilidade às oscilações da curva futura de juros (duration reduzida), atua como instrumento típico de reserva de liquidez e margem de segurança. Já o Tesouro IPCA+ combina uma parcela pós-fixada pela inflação oficial (IPCA) com uma taxa de juro real prefixada no momento da compra.',
          'Nos títulos indexados à inflação e nos prefixados de prazo mais longo, entra em cena a marcação a mercado: quando o mercado antecipa alta da Selic ou piora das expectativas de inflação no Boletim Focus, os juros futuros (contratos de DI na B3) sobem e o preço unitário desses papéis cai no curto prazo — gerando oportunidade de retorno superior apenas se carregados até o vencimento ou caso as taxas futuras recuem posteriormente.',
          'Por fim, inflação e câmbio retroalimentam-se em dupla via. Uma desvalorização persistente do Real frente ao Euro e ao Dólar encarece bens importados, combustíveis e insumos industriais cotados em moeda forte (efeito conhecido como repasse cambial ou pass-through), pressionando o IPCA. Como resposta, o Banco Central eleva os juros reais para conter a inflação e tornar o carrego da moeda local mais competitivo, ajudando a reequilibrar a taxa de câmbio.',
        ],
        highlights: [
          {
            label: 'Tesouro Selic',
            value: 'Liquidez & Baixa Volatilidade',
            note: 'Acompanha a taxa básica diária com mínima oscilação de preço.',
          },
          {
            label: 'Tesouro IPCA+',
            value: 'Proteção Real + Marcação',
            note: 'Corrige pelo IPCA e oscila conforme juros reais da curva DI.',
          },
          {
            label: 'Repasse Cambial',
            value: 'Câmbio ↔ IPCA',
            note: 'Alta de USD/EUR encarece tradables e exige resposta monetária.',
          },
        ],
      },
    ],
    glossaryEyebrow: 'Referência Conceitual',
    glossaryTitle: 'Glossário Prático de Indicadores Monetários',
    glossarySubtitle:
      'Consulte as definições essenciais usadas em relatórios de bancos centrais, curvas de juros futuros e análises de renda fixa.',
    glossaryItems: [
      {
        term: 'Taxa Selic Meta & Selic Over',
        category: 'Banco Central (BR)',
        definition:
          'A Selic Meta é a taxa básica definida pelo Copom a cada 45 dias; a Selic Over é a média diária efetivamente praticada nos financiamentos de um dia lastreados em títulos públicos.',
      },
      {
        term: 'CDI (Certificado de Depósito Interbancário)',
        category: 'Referência de Mercado',
        definition:
          'Taxa média dos empréstimos diários entre bancos comerciais. Por acompanhar de perto a Selic Over, serve como benchmark para CDBs, LCIs, LCAs e fundos DI.',
      },
      {
        term: 'IPCA (Índice de Preços ao Consumidor Amplo)',
        category: 'Inflação Oficial',
        definition:
          'Calculado mensalmente pelo IBGE, mede a variação de custos de bens e serviços para famílias com renda de 1 a 40 salários mínimos e é o índice oficial da meta de inflação.',
      },
      {
        term: 'Boletim Focus',
        category: 'Expectativas',
        definition:
          'Relatório semanal do Banco Central do Brasil que sintetiza as projeções medianas de economistas de mercado para IPCA, Selic, PIB, câmbio e resultado fiscal.',
      },
      {
        term: 'Juro Real (Ex-Ante e Ex-Post)',
        category: 'Rendimento Real',
        definition:
          'Ganho acima da inflação. O juro real ex-post usa a inflação passada realizada; o ex-ante desconta a inflação projetada para os próximos 12 meses ou vencimento do título.',
      },
      {
        term: 'Curva de Juros Futuros (DI Futuro)',
        category: 'Derivativos de Taxa',
        definition:
          'Estrutura a termo negociada na B3 que reflete o consenso do mercado sobre onde estará a Taxa Selic acumulada em diferentes vencimentos (1, 2, 5 ou 10 anos).',
      },
      {
        term: 'Deposit Facility Rate (BCE)',
        category: 'Zona do Euro',
        definition:
          'Principal taxa de orientação do Banco Central Europeu, definindo a remuneração dos depósitos de liquidez dos bancos comerciais da Zona do Euro.',
      },
      {
        term: 'Fed Funds Rate & US Treasuries',
        category: 'Estados Unidos',
        definition:
          'Taxa básica interbancária definida pelo Federal Reserve e os rendimentos dos títulos do Tesouro americano, referência mundial para precificação de risco e fluxo cambial.',
      },
      {
        term: 'Marcação a Mercado',
        category: 'Renda Fixa',
        definition:
          'Atualização diária do valor de resgate antecipado de títulos prefixados e Tesouro IPCA+ conforme as variações das taxas de juros negociadas no momento.',
      },
      {
        term: 'Postura Hawkish vs. Dovish',
        category: 'Comunicação de BCs',
        definition:
          'Hawkish indica tom mais duro contra a inflação (propenso a subir ou manter juros altos); Dovish sinaliza preocupação maior com crescimento e tendência a cortar juros.',
      },
    ],
    ctaFixedIncome: 'Explorar Curva DI & Renda Fixa',
    ctaFxGuide: 'Ler Guia de Câmbio & Remessas',
    ctaNews: 'Acompanhar Notícias & Boletim Focus',
    faqEyebrow: 'Dúvidas Frequentes',
    faqTitle: 'Perguntas Frequentes sobre Selic, IPCA, Boletim Focus e Política Monetária',
    faqItems: [
      {
        question: 'Qual a diferença entre a Taxa Selic definida pelo Copom e o rendimento do CDI?',
        answer:
          'A Taxa Selic Meta é o objetivo oficial fixado pelo Copom a cada 45 dias, enquanto a Selic efetiva (Over) gira em torno de 0,10 ponto percentual abaixo dela. O CDI reflete operações interbancárias privadas lastreadas entre bancos e acompanha praticamente o mesmo nível da Selic Over.',
      },
      {
        question: 'Por que o Boletim Focus influencia os títulos públicos antes mesmo de o Copom mudar a Selic?',
        answer:
          'Porque os mercados financeiros precificam expectativas futuras. Quando as projeções do Boletim Focus para o IPCA ou para a Selic terminal sobem, os juros futuros (DI) ajustam-se imediatamente na mesma segunda-feira, alterando preços de títulos prefixados e IPCA+.',
      },
      {
        question: 'Um aumento nos juros do BCE ou do Fed sempre provoca alta imediata do Euro e do Dólar no Brasil?',
        answer:
          'Decisões já amplamente antecipadas pelo mercado costumam estar parcialmente incorporadas ao preço. O impacto cambial mais intenso ocorre quando o comunicado oficial do BCE ou do Fed surpreende com projeções mais rígidas de inflação e juros futuros do que o esperado.',
      },
      {
        question: 'Por que o Tesouro IPCA+ pode apresentar variação negativa temporária mesmo pagando inflação mais juros?',
        answer:
          'A rentabilidade contratada (IPCA + taxa fixa) é integralmente garantida caso o investidor carregue o papel até o vencimento. Antes dessa data, o preço diário oscila pela marcação a mercado: se os juros reais futuros subirem acima da taxa contratada, o valor presente do título cai temporariamente.',
      },
      {
        question: 'Como interpretar o juro real ao comparar investimentos no Brasil, Europa e Estados Unidos?',
        answer:
          'Deve-se descontar a inflação esperada de cada moeda (IPCA no Brasil, HICP na Zona do Euro e CPI/PCE nos EUA) das respectivas taxas soberanas, considerando ainda o risco fiscal e a volatilidade cambial envolvida na conversão de patrimônio entre moedas.',
      },
    ],
    footerDisclaimer:
      'Nota Institucional: As explicações sobre Selic, IPCA, Boletim Focus, Tesouro Direto, BCE e Federal Reserve possuem finalidade exclusivamente educativa e jornalística, não constituindo consultoria financeira ou recomendação de compra/venda.',
  },
  en: {
    badge: 'Monetary Policy & Macroeconomics Dossier',
    title: 'Monetary Policy: Selic, IPCA, Focus Report & ECB Interest Rates',
    subtitle:
      'Structured analysis of how Brazil’s Copom sets the Selic rate, the role of the Focus Report, how the European Central Bank (ECB) and Federal Reserve shape global capital flows, and the link between inflation, real yields, sovereign bonds, and FX.',
    readingMeta: 'Analytical Guide • Central Banks, Real Interest Rates & FX',
    noticeTitle: 'Macroeconomic Analysis & Financial Education',
    noticeBody:
      'This page explains monetary policy mechanics, yield curves, and official macroeconomic indicators strictly for educational and analytical reference. It does not constitute investment advice.',
    panelTitle: 'Monetary Benchmarks & Live FX Context',
    panelSubtitle:
      'Comparative framework linking major central banks (Brazil, Eurozone, and the United States) with real-time exchange rates.',
    benchmarks: [
      {
        label: 'Central Bank of Brazil (Copom)',
        rate: 'Selic Target Rate',
        institution: 'Inflation Targeting • IPCA',
        role: 'Primary monetary anchor controlling domestic inflation expectations, CDI, and floating-rate sovereign bonds.',
      },
      {
        label: 'European Central Bank (ECB)',
        rate: 'Deposit / Refi Rate',
        institution: 'Eurozone • HICP (2% Target)',
        role: 'Governs Eurozone liquidity conditions and directly underpins EUR/USD and EUR/BRL valuation.',
      },
      {
        label: 'Federal Reserve (FOMC)',
        rate: 'Fed Funds Rate',
        institution: 'United States • PCE / CPI (2%)',
        role: 'Global risk-free benchmark driving US Treasury yields, global credit spreads, and emerging-market inflows.',
      },
    ],
    euMercosurIndicators: {
      eyebrow: 'Official Static Reference • November 2026',
      title: 'EU–Mercosur Axis Macroeconomic Indicators',
      subtitle:
        'Static comparison of policy interest rates and official inflation projections across the Eurozone (ECB) and Brazil (BCB / Mercosur), illustrating how monetary cycles in both blocs interact across FX and bilateral trade.',
      cards: [
        {
          id: 'juros-bce-selic',
          badge: 'Policy Interest Rates',
          title: 'ECB (Eurozone) vs. Selic (Brazil / Mercosur)',
          metrics: [
            {
              label: 'Selic Target Rate (Copom)',
              value: '13.75% p.a.',
              detail: 'Held steady at the 282nd Copom meeting (Nov 4, 2026); Focus consensus sees 13.00% by end-2027.',
            },
            {
              label: 'ECB Deposit Facility Rate',
              value: '2.50% p.a.',
              detail: 'Prevailing rate (Sep–Nov 2026), with Main Refinancing at 2.65% and Marginal Lending at 2.90%.',
            },
            {
              label: 'Nominal Rate Spread (Selic − ECB)',
              value: '11.25 pp',
              detail: 'Policy rate gap shaping EUR/BRL forward hedging costs and cross-border yield differentials.',
            },
          ],
          source: 'Sources: Central Bank of Brazil (Copom/Focus Nov 2026) and European Central Bank (ECB).',
          takeaway:
            'Wide policy rate differentials support local-currency fixed-income carry in Brazil, while tighter ECB conditions raise Euro funding costs and temper global risk appetite.',
        },
        {
          id: 'inflacao-ipca-hicp',
          badge: 'Inflation Projections',
          title: 'IPCA (Focus Survey) vs. HICP (ECB Projections)',
          metrics: [
            {
              label: 'Brazil IPCA — 2026 (Focus)',
              value: '5.15% p.a.',
              detail: 'Focus market median (Nov 23, 2026), followed by 5.12% in 2027 and 4.00% in 2028.',
            },
            {
              label: 'Eurozone HICP — 2026 (ECB)',
              value: '3.0% p.a.',
              detail: 'ECB staff headline projection (core HICP 2.5%), moderating to 2.5% in 2027 toward the 2.0% goal.',
            },
            {
              label: 'Projected Inflation Gap (2026)',
              value: '2.15 pp',
              detail: 'Spread between expected Brazilian IPCA and Eurozone HICP used to evaluate relative real yields.',
            },
          ],
          source: 'Sources: BCB Focus Market Readout (Nov 23, 2026) and ECB Staff Macroeconomic Projections.',
          takeaway:
            'Discounting expected inflation in each currency reveals ex-ante real returns and explains long-term purchasing-power shifts affecting EU–Mercosur trade contracts.',
        },
      ],
      correlationTitle: 'Educational Note: Economic Correlation Between the European Union and Mercosur',
      correlationBody:
        'Monetary policy alignment or divergence between the ECB and the Central Bank of Brazil influences the EU–Mercosur corridor through three channels: (1) Capital flows and carry, as the Selic–ECB spread affects foreign appetite for sovereign debt; (2) EUR/BRL hedging costs, since interest differentials determine forward premiums for Mercosur agricultural exporters and European capital-goods importers; and (3) Bilateral inflation pass-through, where Euro moves and energy costs affect both HICP and imported input prices inside Brazil’s IPCA.',
      staticNote:
        'Static educational reference panel compiled from official November 2026 central bank publications. Figures do not represent live quotes or investment advice.',
    },
    sections: [
      {
        id: 'copom-selic-focus',
        badge: 'Brazilian Monetary Policy',
        title: '1. How Copom Sets the Selic Rate and the Role of the Focus Report',
        paragraphs: [
          'Brazil operates under an inflation-targeting framework where the National Monetary Council (CMN) sets the IPCA inflation target and the Central Bank’s Monetary Policy Committee (Copom) adjusts the Selic policy rate every 45 days across eight annual meetings.',
          'Rather than waiting passively for past CPI prints, Copom monitors forward expectations published every Monday in the Focus Report—a survey aggregating median projections from over 100 banks, asset managers, and economic consultancies for IPCA inflation, Selic, GDP growth, and USD/BRL.',
          'When Focus medians drift above the inflation target, Copom adopts a hawkish stance to re-anchor price expectations; when projected inflation converges comfortably, gradual easing cycles can follow.',
        ],
        highlights: [
          {
            label: 'Copom Cycle',
            value: '8 Meetings / Year',
            note: 'Policy decisions roughly every 45 days with detailed minutes.',
          },
          {
            label: 'Focus Report',
            value: 'Weekly Market Median',
            note: 'Tracks consensus expectations for IPCA, Selic, GDP, and FX.',
          },
        ],
      },
      {
        id: 'bce-fed-fluxos',
        badge: 'Global Central Banks',
        title: '2. How the ECB and Federal Reserve Steer Global Rates and Capital Flows',
        paragraphs: [
          'Global capital allocation reacts immediately to the Federal Reserve’s dual mandate (price stability near 2% and maximum employment) and the European Central Bank’s primary mandate of medium-term HICP price stability around 2% in the Eurozone.',
          'When US and European policy rates remain elevated, sovereign bonds in hard currencies deliver attractive yields with minimal credit risk, tightening financial conditions for emerging economies. Conversely, coordinated rate cuts expand global liquidity and support capital inflows into Brazil and EU–Mercosur trade financing.',
        ],
        highlights: [
          {
            label: 'ECB (Eurozone)',
            value: 'Price Stability',
            note: '2% HICP target anchoring Euro yields and EUR exchange rates.',
          },
          {
            label: 'Fed (United States)',
            value: 'Dual Mandate',
            note: 'Balances 2% inflation target with sustainable US employment.',
          },
        ],
      },
      {
        id: 'ipca-juros-reais-tesouro',
        badge: 'Fixed Income & FX',
        title: '3. Inflation (IPCA), Real Interest Rates, Sovereign Bonds & Exchange Rates',
        paragraphs: [
          'Investors measure real purchasing-power returns via the Fisher relationship: nominal yield adjusted for inflation. In Brazil’s Tesouro Direto market, floating-rate Tesouro Selic notes feature minimal duration and serve liquidity needs, whereas inflation-linked Tesouro IPCA+ bonds lock in a real yield over IPCA.',
          'Before maturity, inflation-linked and fixed-rate bonds experience mark-to-market price swings whenever forward DI interest-rate futures shift. Meanwhile, currency depreciation feeds back into domestic inflation via import and fuel pass-through, prompting tighter monetary policy when needed.',
        ],
        highlights: [
          {
            label: 'Tesouro Selic',
            value: 'Daily Liquidity',
            note: 'Tracks overnight policy rates with minimal mark-to-market volatility.',
          },
          {
            label: 'Tesouro IPCA+',
            value: 'Inflation + Real Yield',
            note: 'Prices fluctuate prior to maturity alongside forward real rates.',
          },
        ],
      },
    ],
    glossaryEyebrow: 'Conceptual Reference',
    glossaryTitle: 'Practical Glossary of Monetary Indicators',
    glossarySubtitle:
      'Essential terms used across central bank statements, interest-rate futures curves, and fixed-income analysis.',
    glossaryItems: [
      {
        term: 'Selic Target & Selic Over',
        category: 'Central Bank (BR)',
        definition:
          'Selic Target is set by Copom every 45 days; Selic Over is the effective daily overnight rate settled against federal government securities.',
      },
      {
        term: 'CDI (Interbank Deposit Rate)',
        category: 'Market Benchmark',
        definition:
          'Average overnight interbank lending rate closely tracking Selic Over, serving as the standard benchmark for private fixed-income securities.',
      },
      {
        term: 'IPCA Consumer Inflation',
        category: 'Official Inflation',
        definition:
          'Published monthly by IBGE, IPCA tracks broad consumer price changes and acts as Brazil’s official inflation-targeting index.',
      },
      {
        term: 'Focus Market Readout',
        category: 'Consensus Survey',
        definition:
          'Weekly Central Bank report compiling median market forecasts for inflation, Selic, GDP, and USD/BRL.',
      },
      {
        term: 'Real Interest Rate (Ex-Ante / Ex-Post)',
        category: 'Purchasing Power',
        definition:
          'Nominal yield minus inflation. Ex-ante uses expected future inflation; ex-post uses realized historical inflation.',
      },
      {
        term: 'DI Yield Curve (Futures)',
        category: 'Rate Derivatives',
        definition:
          'Term structure traded on B3 reflecting market expectations for cumulative Selic rates across future maturities.',
      },
      {
        term: 'ECB Deposit Facility Rate',
        category: 'Eurozone',
        definition:
          'Primary ECB policy rate determining interest paid on commercial bank overnight deposits across the Euro area.',
      },
      {
        term: 'Fed Funds Rate & Treasuries',
        category: 'United States',
        definition:
          'Federal Reserve policy target and US Treasury bond yields anchoring global asset valuation and dollar liquidity.',
      },
      {
        term: 'Mark-to-Market',
        category: 'Fixed Income',
        definition:
          'Daily revaluation of fixed-rate and inflation-linked bonds based on prevailing secondary-market interest rates prior to maturity.',
      },
      {
        term: 'Hawkish vs. Dovish',
        category: 'Policy Stance',
        definition:
          'Hawkish signals tighter policy to curb inflation; Dovish indicates emphasis on growth support and potential rate reductions.',
      },
    ],
    ctaFixedIncome: 'Explore Yield Curve & Fixed Income',
    ctaFxGuide: 'Read Commercial FX & Transfers Guide',
    ctaNews: 'Follow Macro News & Focus Report',
    faqEyebrow: 'Common Questions',
    faqTitle: 'Frequently Asked Questions on Selic, IPCA, Focus Report & Monetary Policy',
    faqItems: [
      {
        question: 'How does the Selic rate relate to CDI yields?',
        answer:
          'Copom sets the Selic Target rate, while effective overnight Selic Over trades roughly 0.10 percentage points lower. Private interbank CDI rates closely mirror Selic Over.',
      },
      {
        question: 'Why does the Focus Report move bond prices before Copom meets?',
        answer:
          'Bond markets price forward expectations. Upward revisions to IPCA or Selic medians in Monday’s Focus survey immediately adjust forward DI futures and bond prices.',
      },
      {
        question: 'Do ECB or Fed rate hikes always push EUR/BRL and USD/BRL higher immediately?',
        answer:
          'Expected moves are often priced in ahead of the announcement; sharp FX shifts typically occur when central bank guidance surprises consensus on future rates.',
      },
      {
        question: 'Why can inflation-linked bonds show short-term negative price moves?',
        answer:
          'While contracted real yields apply if held to maturity, interim mark-to-market prices fall when market real interest rates rise above the bond’s original coupon.',
      },
      {
        question: 'How should real interest rates be compared across Brazil, Europe, and the US?',
        answer:
          'Compare nominal sovereign yields net of each region’s expected inflation while factoring in fiscal risk premiums and currency volatility.',
      },
    ],
    footerDisclaimer:
      'Institutional Note: Explanations covering Selic, IPCA, the Focus Report, sovereign bonds, ECB, and Federal Reserve policy are strictly educational and analytical.',
  },
  es: {
    badge: 'Dossier de Política Monetaria y Macroeconomía',
    title: 'Política Monetaria: Selic, IPCA, Boletín Focus y Tasas del BCE',
    subtitle:
      'Análisis estructurado sobre cómo el Copom define la tasa Selic, el papel del Boletín Focus, la conducción del Banco Central Europeo (BCE) y la Reserva Federal (Fed) en los flujos globales y la relación entre inflación, tasas reales, bonos públicos y tipo de cambio.',
    readingMeta: 'Lectura analítica • Bancos Centrales, Tasas Reales y Divisas',
    noticeTitle: 'Análisis Macroeconómico y Educación Financiera',
    noticeBody:
      'Esta página presenta fundamentos de política monetaria, curvas de tasas e indicadores oficiales con fines exclusivamente educativos y analíticos. No constituye asesoramiento ni recomendación de inversión.',
    panelTitle: 'Panel de Referencia Monetaria y Cambio en Vivo',
    panelSubtitle:
      'Marco comparativo entre los principales bancos centrales (Brasil, Eurozona y EE. UU.) junto con las paridades cambiarias en tiempo real.',
    benchmarks: [
      {
        label: 'Banco Central de Brasil (Copom)',
        rate: 'Tasa Selic Meta',
        institution: 'Meta de Inflación • IPCA',
        role: 'Ancla principal para contener la inflación doméstica y referencia del CDI y bonos posfijados.',
      },
      {
        label: 'Banco Central Europeo (BCE)',
        rate: 'Tasa de Depósito / Refi',
        institution: 'Eurozona • HICP (Meta 2%)',
        role: 'Regula la liquidez europea y sostiene la valoración estructural del Euro (EUR/USD y EUR/BRL).',
      },
      {
        label: 'Reserva Federal (FOMC / Fed)',
        rate: 'Fed Funds Rate',
        institution: 'EE. UU. • PCE / CPI (2%)',
        role: 'Referencia global libre de riesgo que condiciona los Treasuries y los flujos hacia emergentes.',
      },
    ],
    euMercosurIndicators: {
      eyebrow: 'Referencia Estática Oficial • Noviembre/2026',
      title: 'Indicadores del Eje Unión Europea – Mercosur',
      subtitle:
        'Comparativa estática de tasas de interés de referencia y proyecciones oficiales de inflación entre la Eurozona (BCE) y Brasil (BCB / Mercosur), destacando la correlación macroeconómica y comercial entre ambos bloques.',
      cards: [
        {
          id: 'juros-bce-selic',
          badge: 'Tasas Básicas de Interés',
          title: 'BCE (Eurozona) vs. Selic (Brasil / Mercosur)',
          metrics: [
            {
              label: 'Tasa Selic Meta (Copom)',
              value: '13,75% anual',
              detail: 'Mantenida en la 282ª reunión del Copom (04/11/2026); el Focus proyecta 13,00% al cierre de 2027.',
            },
            {
              label: 'Tasa de Depósito del BCE',
              value: '2,50% anual',
              detail: 'Tasa vigente (sep.–nov. 2026); refinanciación principal en 2,65% y crédito marginal en 2,90%.',
            },
            {
              label: 'Diferencial Nominal (Selic − BCE)',
              value: '11,25 p.p.',
              detail: 'Brecha de tasas que determina el costo de cobertura futura (hedge) y el diferencial en EUR/BRL.',
            },
          ],
          source: 'Fuentes: Banco Central de Brasil (Copom/Focus nov. 2026) y Banco Central Europeo (BCE).',
          takeaway:
            'Diferenciales amplios de tasas sostienen el atractivo relativo de la renta fija brasileña, mientras condiciones más restrictivas del BCE elevan el costo del financiamiento en euros.',
        },
        {
          id: 'inflacao-ipca-hicp',
          badge: 'Proyecciones de Inflación',
          title: 'IPCA (Boletín Focus) vs. HICP (Proyecciones BCE)',
          metrics: [
            {
              label: 'IPCA Brasil — 2026 (Focus)',
              value: '5,15% anual',
              detail: 'Mediana del Boletín Focus (23/11/2026), con previsiones de 5,12% para 2027 y 4,00% para 2028.',
            },
            {
              label: 'HICP Eurozona — 2026 (BCE)',
              value: '3,0% anual',
              detail: 'Previsión general del equipo del BCE (subyacente 2,5%), bajando a 2,5% en 2027 hacia la meta del 2,0%.',
            },
            {
              label: 'Diferencial Inflacionario Proyectado (2026)',
              value: '2,15 p.p.',
              detail: 'Brecha entre IPCA esperado y HICP europeo empleada para comparar rendimientos reales entre monedas.',
            },
          ],
          source: 'Fuentes: Boletín Focus / BCB (23/11/2026) y Proyecciones Macroeconómicas del BCE.',
          takeaway:
            'Descontar la inflación esperada de cada moneda permite estimar la tasa real ex-ante y comprender ajustes de poder adquisitivo en contratos comerciales UE–Mercosur.',
        },
      ],
      correlationTitle: 'Lectura Educativa: Correlación Económica entre la Unión Europea y el Mercosur',
      correlationBody:
        'La interacción entre el BCE y el Banco Central de Brasil incide en el eje Unión Europea–Mercosur por tres vías: (1) Flujos de capital y carry, ya que el diferencial Selic–BCE orienta asignaciones hacia deuda soberana; (2) Costo de cobertura en EUR/BRL para exportadores de materias primas del Mercosur e importadores de bienes industriales europeos; y (3) Traslado inflacionario bilateral mediante precios energéticos e insumos transables.',
      staticNote:
        'Panel estático de referencia educativa basado en boletines oficiales públicos de noviembre de 2026. No constituye cotización en vivo ni recomendación de inversión.',
    },
    sections: [
      {
        id: 'copom-selic-focus',
        badge: 'Política Monetaria en Brasil',
        title: '1. Cómo define el Copom la Tasa Selic y cuál es el papel del Boletín Focus',
        paragraphs: [
          'Brasil opera bajo un régimen de metas de inflación donde el CMN fija el objetivo del IPCA y el Copom ajusta la Tasa Selic ocho veces al año (cada ~45 días).',
          'Cada lunes, el Boletín Focus consolida las proyecciones medianas de más de cien instituciones financieras sobre IPCA, Selic, PIB y USD/BRL, sirviendo como termómetro clave para anclar expectativas y orientar posturas restrictivas (hawkish) o expansivas (dovish).',
        ],
        highlights: [
          {
            label: 'Ciclo del Copom',
            value: '8 Reuniones / Año',
            note: 'Decisiones de tasa cada ~45 días con publicación de actas.',
          },
          {
            label: 'Boletín Focus',
            value: 'Mediana Semanal',
            note: 'Expectativas de mercado para IPCA, Selic, PIB y tipo de cambio.',
          },
        ],
      },
      {
        id: 'bce-fed-fluxos',
        badge: 'Bancos Centrales Globales',
        title: '2. Cómo el BCE y la Fed conducen las tasas globales e influyen en los flujos de capital',
        paragraphs: [
          'La Reserva Federal (mandato dual de inflación ~2% y empleo máximo) y el Banco Central Europeo (estabilidad de precios HICP ~2%) determinan el costo global del dinero en dólares y euros.',
          'Tasas altas en EE. UU. y Europa elevan la rentabilidad de bonos soberanos centrales y endurecen la liquidez hacia mercados emergentes; recortes coordinados impulsan flujos hacia Brasil y el eje comercial Unión Europea–Mercosur.',
        ],
        highlights: [
          {
            label: 'BCE (Eurozona)',
            value: 'Estabilidad de Precios',
            note: 'Meta HICP del 2% anual y soporte estructural al Euro.',
          },
          {
            label: 'Fed (EE. UU.)',
            value: 'Mandato Dual',
            note: 'Equilibrio entre inflación del 2% y máximo empleo sostenible.',
          },
        ],
      },
      {
        id: 'ipca-juros-reais-tesouro',
        badge: 'Renta Fija y Cambio',
        title: '3. Relación entre inflación (IPCA), tasas reales, bonos públicos (Tesouro Selic/IPCA+) y cambio',
        paragraphs: [
          'La tasa real descuenta la inflación del rendimiento nominal (ecuación de Fisher). En Brasil, el Tesouro Selic ofrece liquidez con mínima volatilidad, mientras el Tesouro IPCA+ protege contra la inflación sumando una tasa real sujeta a valoración a mercado antes del vencimiento.',
          'A su vez, las depreciaciones cambiarias se trasladan a precios internos mediante insumos y combustibles, reforzando el vínculo estrecho entre inflación, tasas reales y tipo de cambio.',
        ],
        highlights: [
          {
            label: 'Tesouro Selic',
            value: 'Liquidez Diaria',
            note: 'Sigue la tasa básica diaria con mínima oscilación de precio.',
          },
          {
            label: 'Tesouro IPCA+',
            value: 'Inflación + Tasa Real',
            note: 'Protege el poder adquisitivo con valoración a mercado previa al vencimiento.',
          },
        ],
      },
    ],
    glossaryEyebrow: 'Referencia Conceptual',
    glossaryTitle: 'Glosario Práctico de Indicadores Monetarios',
    glossarySubtitle:
      'Definiciones esenciales empleadas por bancos centrales, curvas de tasas futuras y análisis de renta fija.',
    glossaryItems: [
      {
        term: 'Tasa Selic Meta y Selic Over',
        category: 'Banco Central (BR)',
        definition:
          'Selic Meta es fijada por el Copom cada 45 días; Selic Over es la tasa diaria efectiva en operaciones con títulos públicos.',
      },
      {
        term: 'CDI (Certificado de Depósito Interbancario)',
        category: 'Referencia de Mercado',
        definition:
          'Tasa promedio de préstamos interbancarios diarios que replica de cerca a la Selic Over y sirve de base para renta fija privada.',
      },
      {
        term: 'IPCA (Inflación Oficial)',
        category: 'Precios al Consumidor',
        definition:
          'Índice calculado mensualmente por el IBGE que sirve como referencia oficial del régimen de metas de inflación en Brasil.',
      },
      {
        term: 'Boletín Focus',
        category: 'Expectativas',
        definition:
          'Encuesta semanal del Banco Central de Brasil con medianas de mercado para inflación, Selic, PIB y tipo de cambio.',
      },
      {
        term: 'Tasa Real (Ex-Ante y Ex-Post)',
        category: 'Poder Adquisitivo',
        definition:
          'Rendimiento descontada la inflación esperada (ex-ante) o realizada (ex-post).',
      },
      {
        term: 'Curva de Tasas Futuras (DI Futuro)',
        category: 'Derivados de Tasa',
        definition:
          'Estructura negociada en B3 que refleja las expectativas sobre la Selic acumulada a distintos plazos.',
      },
      {
        term: 'Deposit Facility Rate (BCE)',
        category: 'Eurozona',
        definition:
          'Tasa clave del Banco Central Europeo para los depósitos nocturnos de bancos comerciales del área del Euro.',
      },
      {
        term: 'Fed Funds Rate y US Treasuries',
        category: 'Estados Unidos',
        definition:
          'Tasa de referencia de la Reserva Federal y rendimientos del Tesoro estadounidense, ancla global de valoración.',
      },
      {
        term: 'Valoración a Mercado (Mark-to-Market)',
        category: 'Renta Fija',
        definition:
          'Actualización diaria del precio de bonos prefijados o indexados al IPCA según las tasas vigentes antes del vencimiento.',
      },
      {
        term: 'Postura Hawkish vs. Dovish',
        category: 'Bancos Centrales',
        definition:
          'Hawkish prioriza el control estricto de la inflación con tasas altas; Dovish favorece condiciones monetarias más acomodaticias.',
      },
    ],
    ctaFixedIncome: 'Explorar Curva DI y Renta Fija',
    ctaFxGuide: 'Leer Guía de Cambio y Remesas',
    ctaNews: 'Seguir Noticias y Boletín Focus',
    faqEyebrow: 'Dudas Frecuentes',
    faqTitle: 'Preguntas Frecuentes sobre Selic, IPCA, Boletín Focus y Política Monetaria',
    faqItems: [
      {
        question: '¿Qué diferencia hay entre la Tasa Selic Meta y el CDI?',
        answer:
          'La Selic Meta es el objetivo oficial fijado por el Copom; la Selic efectiva diaria cotiza cerca de 0,10 puntos porcentuales por debajo y el CDI privado sigue prácticamente ese mismo nivel.',
      },
      {
        question: '¿Por qué el Boletín Focus mueve los bonos antes de la reunión del Copom?',
        answer:
          'Los mercados descuentan expectativas futuras: revisiones al alza en el Focus del lunes ajustan de inmediato los contratos de DI futuro y los precios de bonos.',
      },
      {
        question: '¿Las subidas del BCE o de la Fed siempre elevan de inmediato el Euro y el Dólar en Brasil?',
        answer:
          'Las decisiones anticipadas suelen estar descontadas; los movimientos bruscos ocurren cuando la comunicación oficial sorprende al consenso.',
      },
      {
        question: '¿Por qué el Tesouro IPCA+ puede mostrar variaciones negativas antes del vencimiento?',
        answer:
          'Porque antes del vencimiento el precio responde a la valoración a mercado: si las tasas reales futuras suben por encima de la tasa contratada, el precio presente desciende temporalmente.',
      },
      {
        question: '¿Cómo comparar tasas reales entre Brasil, Europa y EE. UU.?',
        answer:
          'Se deben comparar los rendimientos nominales netos de la inflación esperada de cada bloque considerando además la prima fiscal y la volatilidad cambiaria.',
      },
    ],
    footerDisclaimer:
      'Nota Institucional: Las explicaciones sobre Selic, IPCA, Boletín Focus, bonos soberanos, BCE y Reserva Federal tienen finalidad exclusivamente educativa y analítica.',
  },
};
