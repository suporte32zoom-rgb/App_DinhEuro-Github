import type { SupportedLanguage } from './translations';

export interface FixedIncomeGuideSection {
  id: string;
  badge: string;
  title: string;
  paragraphs: string[];
  highlights?: { label: string; value: string; note: string }[];
}

export interface FixedIncomeGuideFaqItem {
  question: string;
  answer: string;
}

export interface FixedIncomeGuideCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  sections: FixedIncomeGuideSection[];
  faqEyebrow: string;
  faqTitle: string;
  faqItems: FixedIncomeGuideFaqItem[];
  educationalNote: string;
}

export const FIXED_INCOME_GUIDE_TRANSLATIONS: Record<SupportedLanguage, FixedIncomeGuideCopy> = {
  pt: {
    eyebrow: 'Educação Financeira & Precificação Institucional',
    title: 'Guia Educacional de Renda Fixa Global, Contratos Futuros e Precificação de Opções',
    subtitle:
      'Entenda os fundamentos econômicos por trás dos títulos públicos no Brasil, na Zona do Euro e nos Estados Unidos, o uso de contratos futuros na proteção de juros e câmbio e a lógica completa das fórmulas de Black-Scholes e das Gregas exibidas acima.',
    sections: [
      {
        id: 'titulos-soberanos-curva-juros',
        badge: 'Renda Fixa Global',
        title: 'a) Títulos Soberanos e Curva de Juros (Brasil/Mercosul, Zona do Euro e EUA)',
        paragraphs: [
          'Os títulos soberanos emitidos por governos nacionais representam a base da estrutura de taxas de juros de qualquer economia e definem o conceito de taxa livre de risco na moeda local. No Brasil, o Tesouro Direto oferece três grandes famílias que cobrem necessidades distintas de proteção e liquidez: o Tesouro Selic, título pós-fixado atrelado à taxa básica diária e marcado por baixa volatilidade no preço; o Tesouro IPCA+, título híbrido que garante uma taxa de juro real acima da inflação oficial medida pelo IBGE; e o Tesouro Prefixado, cuja remuneração nominal é conhecida exatamente no momento da aplicação caso seja levado até o vencimento.',
          'Nos mercados desenvolvidos, os referenciais equivalentes exercem influência direta sobre toda a precificação global de capital. Nos Estados Unidos, os US Treasuries — especialmente os vencimentos de 2 anos (mais sensíveis às decisões do Federal Reserve) e de 10 anos (referência longa para financiamento corporativo e imobiliário) — formam o piso mundial para o custo de oportunidade do dólar. Na Zona do Euro, os Bunds alemães e demais obrigações soberanas europeias respondem às taxas definidas pelo Banco Central Europeu (BCE) e refletem a percepção de solvência, crescimento industrial e estabilidade de preços no bloco europeu.',
          'A comparação entre essas curvas de juros soberanas explica por que fluxos de capital circulam continuamente entre América Latina, Europa e América do Norte. Quando a taxa livre de risco nos EUA ou na Zona do Euro sobe de forma sustentada, projetos privados, ações e títulos emergentes precisam oferecer prêmios adicionais para permanecer atrativos. Já na construção da curva de juros doméstica, cada vértice reflete a expectativa composta para a Selic futura e para a trajetória fiscal.',
        ],
        highlights: [
          {
            label: 'Brasil (Tesouro Nacional)',
            value: 'Selic • IPCA+ • Prefixado',
            note: 'Cobre reserva de liquidez, proteção inflacionária e travamento nominal.',
          },
          {
            label: 'Zona do Euro (BCE)',
            value: 'Bunds Alemães & Soberanos UE',
            note: 'Referência de custo do capital em Euro e estabilidade monetária europeia.',
          },
          {
            label: 'Estados Unidos (Fed)',
            value: 'US Treasuries (2Y / 10Y)',
            note: 'Taxa livre de risco global usada no desconto de ativos internacionais.',
          },
        ],
      },
      {
        id: 'contratos-futuros-hedge',
        badge: 'Derivativos & Comércio Exterior',
        title: 'b) Contratos Futuros e Proteção Cambial/Juros',
        paragraphs: [
          'Contratos futuros são compromissos padronizados negociados em bolsa — como a B3 no Brasil e a CME em Chicago — para comprar ou vender determinado ativo, índice ou taxa em uma data futura predefinida, com ajustes financeiros diários e exigência de margem de garantia. Diferentemente do mercado à vista, os futuros permitem travar preços ou taxas sem exigir desembolso integral do valor nocional no momento da contratação.',
          'No eixo comercial entre a União Europeia e o Mercosul, esses instrumentos cumprem função essencial de proteção (hedge) contra oscilações abruptas de câmbio e taxas de financiamento. Um exportador brasileiro de café, proteína animal ou manufaturados com receitas contratadas em Euro ou Dólar para recebimento em seis meses pode assumir posição contrária em contratos futuros de câmbio (como WDO/DOL ou contratos de Euro) para garantir sua margem operacional em reais caso a moeda estrangeira recue antes do embarque. De modo inverso, importadores de máquinas europeias ou insumos industriais protegem seus custos contra uma disparada repentina da paridade cambial.',
          'Da mesma forma, os contratos futuros de juros (DI Futuro na B3) permitem que tesourarias, bancos e empresas travem o custo de empréstimos ou convertam dívidas pós-fixadas em taxas fixas conhecidas, enquanto futuros de índices acionários (como Mini-Índice WIN e S&P 500 E-mini) possibilitam ajustar rapidamente a exposição de carteiras diversificadas durante eventos macroeconômicos relevantes sem precisar liquidar posições físicas.',
        ],
        highlights: [
          {
            label: 'DI Futuro (Juros)',
            value: 'Proteção de Taxa',
            note: 'Permite travar o custo de financiamento corporativo e precificar renda fixa.',
          },
          {
            label: 'Câmbio Futuro (USD / EUR)',
            value: 'Hedge Exportador & Importador',
            note: 'Estabiliza receitas e custos no comércio exterior União Europeia–Mercosul.',
          },
          {
            label: 'Índices (WIN / S&P 500)',
            value: 'Gestão de Exposição',
            note: 'Rebalanceamento ágil de portfólio diante de ciclos de volatilidade global.',
          },
        ],
      },
      {
        id: 'modelo-black-scholes',
        badge: 'Precificação Quantitativa',
        title: 'c) Como Funciona o Modelo Black-Scholes na Precificação de Opções',
        paragraphs: [
          'Uma opção é um contrato derivativo que confere ao comprador (titular) o direito — e não a obrigação — de comprar (CALL) ou vender (PUT) um ativo subjacente por um preço previamente fixado, chamado de preço de exercício (Strike), até ou em uma data de vencimento, mediante o pagamento de um prêmio ao vendedor (lançador). Enquanto uma CALL se valoriza quando o ativo sobe acima do Strike, uma PUT ganha valor intrínseco quando o ativo cai abaixo do Strike, funcionando na prática como um seguro de preço.',
          'A relação entre a cotação atual no mercado à vista (Spot) e o Strike determina a "moneyness" da opção: dizemos que está ITM (In The Money — dentro do dinheiro) quando já possui valor intrínseco positivo imediato (Spot > Strike na CALL; Spot < Strike na PUT); ATM (At The Money — no dinheiro) quando Spot e Strike estão muito próximos, concentrando máxima sensibilidade de tempo e volatilidade; e OTM (Out of The Money — fora do dinheiro) quando não possui valor intrínseco imediato, valendo exclusivamente pela probabilidade de atingir o Strike antes do vencimento (valor tempo ou extrínseco).',
          'O modelo matemático de Black-Scholes estima o preço justo teórico dessas opções europeias a partir de cinco variáveis objetivas que você pode testar na calculadora acima: (1) Preço Spot do ativo; (2) Preço de Exercício (Strike); (3) Prazo até o vencimento em dias úteis/corridos; (4) Volatilidade Implícita anualizada (σ), que traduz a dispersão esperada dos retornos futuros; e (5) Taxa livre de risco (r), responsável por trazer o Strike a valor presente líquido durante o prazo do contrato.',
        ],
        highlights: [
          {
            label: 'ITM (Dentro do Dinheiro)',
            value: 'Valor Intrínseco > 0',
            note: 'CALL com Spot acima do Strike ou PUT com Spot abaixo do Strike.',
          },
          {
            label: 'ATM (No Dinheiro)',
            value: 'Spot ≈ Strike',
            note: 'Maior valor extrínseco e máxima curvatura (Gamma e Vega elevados).',
          },
          {
            label: 'OTM (Fora do Dinheiro)',
            value: '100% Valor Tempo',
            note: 'Prêmio depende integralmente de prazo restante e volatilidade implícita.',
          },
        ],
      },
      {
        id: 'leitura-das-gregas',
        badge: 'Gestão de Risco',
        title: 'd) Leitura Prática das Gregas (Delta, Gamma, Theta, Vega e Rho)',
        paragraphs: [
          'As chamadas "Gregas" são derivadas parciais do modelo Black-Scholes que medem quanto o prêmio de uma opção tende a variar diante da mudança isolada de cada fator de mercado. No estudo técnico de derivativos, dominar essas cinco sensibilidades substitui o palpite direcional por uma análise quantitativa clara dos riscos envolvidos em uma estrutura.',
          'O Delta (Δ) mede a variação esperada no preço da opção para cada R$ 1,00 de alta no ativo subjacente (variando de 0 a +1 em CALLs e de −1 a 0 em PUTs) e também aproxima a probabilidade de a opção vencer ITM. O Gamma (Γ) indica a velocidade com que o próprio Delta muda quando o ativo se movimenta; opções curtas e ATM possuem Gamma elevado, exigindo atenção redobrada a oscilações bruscas de preço.',
          'O Theta (Θ) quantifica o decaimento diário do valor extrínseco da opção provocado pela passagem do tempo — mantendo o restante constante, opções compradas perdem valor diariamente até o vencimento. Já o Vega (ν) mede a sensibilidade do prêmio a cada 1 ponto percentual de alteração na volatilidade implícita: momentos de incerteza macroeconômica elevam o Vega e encarecem tanto CALLs quanto PUTs. Por fim, o Rho (ρ) expressa o impacto de variações de 1% na taxa livre de risco sobre o preço da opção, sendo mais perceptível em vencimentos longos ou em economias de juros elevados.',
        ],
        highlights: [
          {
            label: 'Delta (Δ) & Gamma (Γ)',
            value: 'Direção e Aceleração',
            note: 'Medem exposição equivalente ao ativo e velocidade de mudança do Delta.',
          },
          {
            label: 'Theta (Θ)',
            value: 'Decaimento Temporal',
            note: 'Mostra quanto do prêmio se perde por dia com a aproximação do vencimento.',
          },
          {
            label: 'Vega (ν) & Rho (ρ)',
            value: 'Volatilidade & Juros',
            note: 'Capturam o peso da incerteza de mercado (σ) e da taxa básica de juros (r).',
          },
        ],
      },
    ],
    faqEyebrow: 'Dúvidas Frequentes',
    faqTitle: 'Perguntas Frequentes sobre Renda Fixa e Derivativos',
    faqItems: [
      {
        question: '1. Como a taxa de juros (Selic ou BCE) influencia o preço teórico de opções via Rho?',
        answer:
          'Pela lógica do custo de carregamento no modelo Black-Scholes, taxas de juros mais altas reduzem o valor presente do Strike a ser pago no futuro. Por isso, um aumento nos juros básicos (como Selic no Brasil ou taxas do BCE na Europa) tende a elevar o preço teórico das CALLs (Rho positivo) e reduzir o preço teórico das PUTs (Rho negativo), com efeito mais pronunciado em opções de prazos mais longos.',
      },
      {
        question: '2. O que significa o decaimento temporal (Theta) conforme o vencimento se aproxima?',
        answer:
          'Theta representa a perda gradual de valor extrínseco (valor tempo) de uma opção a cada dia decorrido, assumindo preço do ativo e volatilidade constantes. Esse desgaste não é linear: ele se acelera significativamente nas últimas semanas antes do vencimento, principalmente em opções ATM, porque resta menos tempo para o ativo realizar movimentos amplos.',
      },
      {
        question: '3. Qual a diferença entre usar derivativos para proteção (hedge) e para especulação?',
        answer:
          'No hedge, o derivativo compensa um risco preexistente no mundo real ou na carteira — por exemplo, um exportador travando câmbio futuro ou um investidor comprando PUTs para limitar quedas em suas ações (Protective Put). Na especulação direcional, assume-se risco sem ativo-objeto correspondente com o intuito exclusivo de lucrar sobre a oscilação, ficando totalmente exposto à alavancagem.',
      },
      {
        question: '4. As calculadoras do DinhEuro substituem corretoras ou constituem recomendação de investimento?',
        answer:
          'Não. Todas as calculadoras desta página (Black-Scholes, Gregas, Payoff, Contratos Futuros e Simuladores de Renda Fixa) possuem finalidade estritamente educativa, analítica e simulatória. Elas servem para estudar comportamento matemático de ativos e custos sem configurar recomendação de compra, venda ou consultoria financeira.',
      },
    ],
    educationalNote:
      'Aviso Educativo: Os cálculos teóricos de Black-Scholes, matriz de Gregas, gráficos de Payoff e referências de renda fixa e futuros têm caráter exclusivamente didático e informativo.',
  },
  en: {
    eyebrow: 'Financial Education & Quantitative Pricing',
    title: 'Educational Guide to Global Fixed Income, Futures Contracts & Options Pricing',
    subtitle:
      'Explore the core principles behind sovereign bond curves in Brazil, the Eurozone, and the United States, how futures support interest-rate and FX hedging, and the intuition behind Black-Scholes pricing and Option Greeks.',
    sections: [
      {
        id: 'titulos-soberanos-curva-juros',
        badge: 'Global Fixed Income',
        title: 'a) Sovereign Bonds & Yield Curves (Brazil/Mercosur, Eurozone, and US)',
        paragraphs: [
          'Government bonds define the local-currency risk-free rate anchor for every financial market. In Brazil, Tesouro Direto offers floating-rate Tesouro Selic notes for daily liquidity, inflation-linked Tesouro IPCA+ bonds guaranteeing a real yield above consumer inflation, and nominal fixed-rate Tesouro Prefixado securities.',
          'Globally, US Treasuries (notably 2-year and 10-year benchmarks shaped by Federal Reserve policy) and German Bunds alongside Eurozone sovereign bonds (guided by European Central Bank policy rates) establish the benchmark discount rates for global equities, credit, and emerging-market capital flows.',
        ],
        highlights: [
          {
            label: 'Brazil (Tesouro Nacional)',
            value: 'Selic • IPCA+ • Fixed',
            note: 'Covers liquidity buffers, real inflation protection, and fixed yields.',
          },
          {
            label: 'Eurozone (ECB)',
            value: 'German Bunds & EU Bonds',
            note: 'Euro capital benchmark reflecting ECB policy and regional stability.',
          },
          {
            label: 'United States (Fed)',
            value: 'US Treasuries (2Y / 10Y)',
            note: 'Global risk-free reference rate used across international valuation.',
          },
        ],
      },
      {
        id: 'contratos-futuros-hedge',
        badge: 'Derivatives & Trade',
        title: 'b) Futures Contracts & Currency / Interest-Rate Hedging',
        paragraphs: [
          'Futures are exchange-traded standardized agreements (such as B3 contracts and CME index/rate futures) featuring daily mark-to-market settlement and collateral margin rather than full upfront notional payment.',
          'Across the European Union–Mercosur trade corridor, currency and DI interest-rate futures allow exporters, importers, and global investors to lock in predictable cash flows and insulate portfolios against sudden swings in EUR/BRL, USD/BRL, or sovereign funding costs.',
        ],
        highlights: [
          {
            label: 'DI Rate Futures',
            value: 'Yield-Curve Hedging',
            note: 'Locks borrowing costs and anchors forward interest-rate expectations.',
          },
          {
            label: 'FX Futures (USD / EUR)',
            value: 'Trade Cash-Flow Protection',
            note: 'Stabilizes export revenues and import costs across EU–Mercosur trade.',
          },
          {
            label: 'Equity Index Futures',
            value: 'Exposure Management',
            note: 'Adjusts beta exposure efficiently without liquidating core holdings.',
          },
        ],
      },
      {
        id: 'modelo-black-scholes',
        badge: 'Quantitative Pricing',
        title: 'c) How the Black-Scholes Options Pricing Model Works',
        paragraphs: [
          'A CALL grants the right to buy and a PUT grants the right to sell an underlying asset at a fixed Strike price up to expiration. Relative to the Spot price, options are classified as ITM (positive intrinsic value), ATM (Spot near Strike, peak time value), or OTM (pure time/extrinsic value).',
          'Black-Scholes estimates fair theoretical option value using five inputs: Spot price, Strike price, time to expiration, annualized implied volatility (σ), and the risk-free interest rate (r).',
        ],
        highlights: [
          {
            label: 'ITM (In The Money)',
            value: 'Intrinsic Value > 0',
            note: 'CALL with Spot > Strike or PUT with Spot < Strike.',
          },
          {
            label: 'ATM (At The Money)',
            value: 'Spot ≈ Strike',
            note: 'Highest extrinsic value and peak Gamma/Vega sensitivity.',
          },
          {
            label: 'OTM (Out of The Money)',
            value: 'Pure Time Value',
            note: 'Driven solely by remaining time and implied volatility.',
          },
        ],
      },
      {
        id: 'leitura-das-gregas',
        badge: 'Risk Sensitivities',
        title: 'd) Practical Reading of the Greeks (Delta, Gamma, Theta, Vega & Rho)',
        paragraphs: [
          'Delta (Δ) tracks price sensitivity per 1-unit move in the underlying; Gamma (Γ) measures how rapidly Delta accelerates; Theta (Θ) quantifies daily time decay; Vega (ν) measures sensitivity to a 1% shift in implied volatility; and Rho (ρ) captures sensitivity to a 1% change in risk-free interest rates.',
        ],
        highlights: [
          {
            label: 'Delta (Δ) & Gamma (Γ)',
            value: 'Direction & Curvature',
            note: 'Quantifies underlying exposure and Delta acceleration.',
          },
          {
            label: 'Theta (Θ)',
            value: 'Time Decay',
            note: 'Daily erosion of extrinsic option premium toward expiration.',
          },
          {
            label: 'Vega (ν) & Rho (ρ)',
            value: 'Volatility & Rates',
            note: 'Tracks implied volatility (σ) and interest-rate (r) sensitivity.',
          },
        ],
      },
    ],
    faqEyebrow: 'Common Questions',
    faqTitle: 'Frequently Asked Questions on Fixed Income & Derivatives',
    faqItems: [
      {
        question: '1. How do interest rates (Selic or ECB) influence theoretical option prices via Rho?',
        answer:
          'Higher interest rates reduce the present value of the future Strike payment, generally raising theoretical CALL premiums (positive Rho) and lowering PUT premiums (negative Rho), especially for longer-dated contracts.',
      },
      {
        question: '2. What does Theta time decay mean as expiration nears?',
        answer:
          'Theta measures daily loss of extrinsic time value assuming price and volatility stay flat. Decay accelerates sharply in the final weeks before expiration, particularly for ATM options.',
      },
      {
        question: '3. What separates hedging from speculation with derivatives?',
        answer:
          'Hedging offsets an existing commercial or portfolio risk (such as FX exposure or Protective Puts on stock holdings), whereas speculation takes leveraged directional exposure without an underlying asset to hedge.',
      },
      {
        question: '4. Are DinhEuro calculators purely educational simulation tools?',
        answer:
          'Yes. All Black-Scholes, Greeks, Payoff, Futures, and Fixed Income modules on this page exist strictly for financial education and mathematical simulation—not investment advice.',
      },
    ],
    educationalNote:
      'Educational Notice: Theoretical Black-Scholes values, Greeks, Payoff diagrams, and fixed-income/futures references are strictly for educational simulation.',
  },
  es: {
    eyebrow: 'Educación Financiera y Valoración Cuantitativa',
    title: 'Guía Educacional de Renta Fija Global, Contratos Futuros y Valoración de Opciones',
    subtitle:
      'Comprende los fundamentos de los bonos soberanos en Brasil, la Eurozona y EE. UU., el uso de futuros en cobertura cambiaria y de tasas, y la lógica intuitiva de Black-Scholes y las Griegas.',
    sections: [
      {
        id: 'titulos-soberanos-curva-juros',
        badge: 'Renta Fija Global',
        title: 'a) Bonos Soberanos y Curva de Tasas (Brasil/Mercosur, Eurozona y EE. UU.)',
        paragraphs: [
          'Los bonos gubernamentales establecen la referencia libre de riesgo en cada moneda. En Brasil, Tesouro Selic ofrece liquidez diaria, Tesouro IPCA+ garantiza rendimiento real sobre la inflación y Tesouro Prefixado fija la tasa nominal hasta el vencimiento.',
          'A escala internacional, los US Treasuries estadounidenses (guiados por la Reserva Federal) y los Bunds alemanes junto con los bonos soberanos europeos (influidos por el BCE) determinan las tasas de descuento globales para acciones, crédito y flujos externos.',
        ],
        highlights: [
          {
            label: 'Brasil (Tesouro Nacional)',
            value: 'Selic • IPCA+ • Prefixado',
            note: 'Liquidez, protección frente a la inflación y tasa fija nominal.',
          },
          {
            label: 'Eurozona (BCE)',
            value: 'Bunds Alemanes y Bonos UE',
            note: 'Referencia del costo de capital en Euro y estabilidad monetaria.',
          },
          {
            label: 'EE. UU. (Fed)',
            value: 'US Treasuries (2Y / 10Y)',
            note: 'Tasa libre de riesgo mundial para descuento de activos globales.',
          },
        ],
      },
      {
        id: 'contratos-futuros-hedge',
        badge: 'Derivados y Comercio Exterior',
        title: 'b) Contratos Futuros y Cobertura Cambiaria / de Tasas',
        paragraphs: [
          'Los futuros son contratos estandarizados en bolsa con ajuste diario y margen de garantía. En el corredor Unión Europea–Mercosur permiten a exportadores, importadores e inversores fijar tipos de cambio (Dólar/Euro), tasas de interés (DI) o exposición a índices (Ibovespa y S&P 500) con eficiencia de capital.',
        ],
        highlights: [
          {
            label: 'Futuros DI (Tasas)',
            value: 'Cobertura de Financiamiento',
            note: 'Fija costos financieros y refleja expectativas de política monetaria.',
          },
          {
            label: 'Futuros Cambiarios',
            value: 'Hedge UE–Mercosur',
            note: 'Protege márgenes comerciales ante oscilaciones bruscas de divisas.',
          },
          {
            label: 'Futuros de Índices',
            value: 'Gestión de Cartera',
            note: 'Ajusta exposición bursátil sin liquidar posiciones físicas.',
          },
        ],
      },
      {
        id: 'modelo-black-scholes',
        badge: 'Valoración Cuantitativa',
        title: 'c) Cómo Funciona el Modelo Black-Scholes en la Valoración de Opciones',
        paragraphs: [
          'Una CALL otorga el derecho a comprar y una PUT el derecho a vender al precio Strike hasta el vencimiento. Según el Spot, la opción está ITM (con valor intrínseco), ATM (Spot cercano al Strike) u OTM (solo valor temporal).',
          'Black-Scholes calcula la prima teórica combinando cinco parámetros: precio Spot, Strike, plazo al vencimiento, volatilidad implícita anualizada (σ) y tasa libre de riesgo (r).',
        ],
        highlights: [
          {
            label: 'ITM (Dentro del Dinero)',
            value: 'Valor Intrínseco > 0',
            note: 'CALL con Spot > Strike o PUT con Spot < Strike.',
          },
          {
            label: 'ATM (En el Dinero)',
            value: 'Spot ≈ Strike',
            note: 'Máximo valor extrínseco y sensibilidad elevada.',
          },
          {
            label: 'OTM (Fuera del Dinero)',
            value: '100% Valor Tiempo',
            note: 'Depende del plazo restante y la volatilidad implícita.',
          },
        ],
      },
      {
        id: 'leitura-das-gregas',
        badge: 'Lectura de Riesgo',
        title: 'd) Lectura Práctica de las Griegas (Delta, Gamma, Theta, Vega y Rho)',
        paragraphs: [
          'Delta (Δ) mide la sensibilidad al movimiento del subyacente; Gamma (Γ) la aceleración del Delta; Theta (Θ) el deterioro temporal diario; Vega (ν) el impacto de la volatilidad implícita; y Rho (ρ) el efecto de cambios en la tasa de interés libre de riesgo.',
        ],
        highlights: [
          {
            label: 'Delta (Δ) y Gamma (Γ)',
            value: 'Dirección y Aceleración',
            note: 'Exposición equivalente al activo y velocidad de cambio.',
          },
          {
            label: 'Theta (Θ)',
            value: 'Decaimiento Temporal',
            note: 'Pérdida diaria de valor extrínseco al acercarse el vencimiento.',
          },
          {
            label: 'Vega (ν) y Rho (ρ)',
            value: 'Volatilidad y Tasas',
            note: 'Sensibilidad a la incertidumbre implícita (σ) y tasas básicas (r).',
          },
        ],
      },
    ],
    faqEyebrow: 'Dudas Frecuentes',
    faqTitle: 'Preguntas Frecuentes sobre Renta Fija y Derivados',
    faqItems: [
      {
        question: '1. ¿Cómo influye la tasa de interés (Selic o BCE) en el precio teórico de opciones vía Rho?',
        answer:
          'Tasas de interés más altas reducen el valor presente del Strike futuro, elevando el precio teórico de las CALLs (Rho positivo) y reduciendo el de las PUTs (Rho negativo), especialmente en plazos largos.',
      },
      {
        question: '2. ¿Qué significa el decaimiento temporal (Theta) al acercarse el vencimiento?',
        answer:
          'Theta mide la erosión diaria del valor tiempo de la opción manteniendo constantes el precio del activo y la volatilidad, acelerándose en las semanas previas al vencimiento sobre todo en opciones ATM.',
      },
      {
        question: '3. ¿Qué diferencia existe entre usar derivados para cobertura (hedge) y para especulación?',
        answer:
          'La cobertura compensa un riesgo real preexistente (como ingresos en divisas o protección de acciones mediante PUTs), mientras la especulación busca beneficio direccional asumiendo el riesgo del apalancamiento.',
      },
      {
        question: '4. ¿Las calculadoras de DinhEuro tienen finalidad exclusivamente educativa?',
        answer:
          'Sí. Todas las calculadoras (Black-Scholes, Griegas, Payoff, Futuros y Renta Fija) son herramientas didácticas y de simulación matemática, sin constituir recomendación de inversión.',
      },
    ],
    educationalNote:
      'Aviso Educativo: Los cálculos teóricos de Black-Scholes, Griegas, gráficos de Payoff y referencias de renta fija y futuros tienen carácter exclusivamente didáctico.',
  },
};
