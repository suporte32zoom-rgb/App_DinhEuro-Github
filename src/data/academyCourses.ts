import type { NavigationTab } from '../context/MarketContext';

export type CourseLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface AcademyKeyConcept {
  term: string;
  explanation: string;
}

export interface AcademyNumericExample {
  title: string;
  scenario: string;
  steps: string[];
  result: string;
}

export interface AcademyModule {
  id: string;
  number: number;
  title: string;
  duration: string;
  summary: string;
  paragraphs: string[];
  numericExample: AcademyNumericExample;
  keyConcepts: AcademyKeyConcept[];
  targetTab: NavigationTab;
  targetButtonLabel: string;
  targetDescription: string;
}

export interface AcademyCourse {
  id: string;
  title: string;
  shortTitle: string;
  level: CourseLevel;
  duration: string;
  description: string;
  shortDescription: string;
  objective: string;
  targetTab: NavigationTab;
  modules: AcademyModule[];
}

export interface AcademyFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const ACADEMY_PROGRESS_STORAGE_KEY = 'dinheuro_academy_completed_modules_v1';

export const ACADEMY_COURSES: AcademyCourse[] = [
  {
    id: 'renda-fixa-tesouro',
    title: 'Fundamentos de Renda Fixa & Tesouro Direto',
    shortTitle: 'Renda Fixa & Tesouro Direto',
    level: 'Iniciante',
    duration: '1h 20min',
    description:
      'Domine a relação entre Selic, CDI e IPCA, compreenda a marcação a mercado nos títulos públicos e compare CDB, LCI e LCA pelo rendimento líquido real.',
    shortDescription:
      'Selic, CDI, IPCA, marcação a mercado e comparação de títulos públicos e bancários líquidos de IR.',
    objective:
      'Construir reserva de liquidez sólida e carteira de juros reais com controle de vencimentos.',
    targetTab: 'renda_fixa',
    modules: [
      {
        id: 'rf-m1',
        number: 1,
        title: 'Selic, CDI e IPCA: Como o Juro Real Molda o Patrimônio',
        duration: '20 min',
        summary:
          'Entenda a diferença entre rentabilidade nominal e juro real descontada a inflação oficial.',
        paragraphs: [
          'Toda decisão em renda fixa começa pela distinção entre taxa nominal e juro real. A taxa nominal é o percentual anunciado pelo título (por exemplo, 13,75% ao ano na Selic), enquanto o juro real mede quanto o seu dinheiro efetivamente ganha acima da inflação medida pelo IPCA.',
          'No Brasil, o Copom define a meta da taxa Selic para controlar o nível de preços. Já o CDI acompanha a Selic de perto (historicamente cerca de 0,10 ponto percentual abaixo) e serve de indexador para CDBs, LCIs, LCAs e fundos DI.',
          'Para avaliar se uma aplicação preserva o poder de compra, nunca basta subtrair a inflação da taxa nominal: o cálculo correto utiliza a equação de Fisher, dividindo os fatores acumulados ao longo de 12 meses.',
        ],
        numericExample: {
          title: 'Cálculo de Juro Real (Equação de Fisher)',
          scenario:
            'Aplicação de R$ 50.000,00 rendendo 13,75% a.a. (Selic) em um ano com IPCA projetado de 5,22% a.a.',
          steps: [
            'Fator nominal bruto: 1 + 0,1375 = 1,1375',
            'Rentabilidade líquida após IR de 17,5% (361 a 720 dias): 13,75% × (1 - 0,175) = 11,34% a.a. → fator 1,1134',
            'Fator de inflação (IPCA): 1 + 0,0522 = 1,0522',
            'Juro real líquido = (1,1134 ÷ 1,0522) - 1 = 0,05816',
          ],
          result:
            'Ganho real líquido de +5,82% acima da inflação (equivalente a R$ 2.908,00 de poder de compra adicional no primeiro ano).',
        },
        keyConcepts: [
          {
            term: 'Taxa Selic Meta',
            explanation:
              'Taxa básica de juros da economia brasileira definida pelo Comitê de Política Monetária (Copom) a cada 45 dias.',
          },
          {
            term: 'CDI (Certificado de Depósito Interbancário)',
            explanation:
              'Referência diária dos empréstimos entre bancos; base para 90% dos produtos de renda fixa privada pós-fixada.',
          },
          {
            term: 'Juro Real (Fisher)',
            explanation:
              'Rendimento efetivo após descontar imposto de renda e inflação oficial do período.',
          },
        ],
        targetTab: 'renda_fixa',
        targetButtonLabel: 'Testar na Mesa de Renda Fixa',
        targetDescription:
          'Compare títulos Selic, Prefixados e IPCA+ com projeção líquida em tempo real.',
      },
      {
        id: 'rf-m2',
        number: 2,
        title: 'Tesouro Selic, Prefixado e IPCA+: Marcação a Mercado',
        duration: '22 min',
        summary:
          'Aprenda por que títulos longos oscilam antes do vencimento e como a duration gera ganhos ou perdas antecipadas.',
        paragraphs: [
          'Os títulos do Tesouro Direto dividem-se em três famílias principais: pós-fixados (Tesouro Selic), prefixados (Tesouro Prefixado) e híbridos indexados à inflação (Tesouro IPCA+). Apenas o Tesouro Selic apresenta volatilidade próxima de zero no resgate diário.',
          'Nos papéis prefixados e IPCA+, o preço de mercado varia diariamente de forma inversa à taxa de juros negociada para o vencimento — fenômeno chamado de marcação a mercado. Se você compra um título pagando IPCA + 6,50% e a taxa cai para IPCA + 5,50%, o preço unitário (PU) do papel sobe imediatamente.',
          'O grau de sensibilidade de um título às mudanças na taxa de juros é medido pela Duration. Quanto maior o prazo restante e menor o pagamento de cupons intermediários, maior será a oscilação percentual do preço unitário.',
        ],
        numericExample: {
          title: 'Impacto da Marcação a Mercado em Título IPCA+ Longo',
          scenario:
            'Título Tesouro IPCA+ com duration de 12 anos adquirido a taxa real de 6,50% a.a. por R$ 10.000,00.',
          steps: [
            'Queda na taxa real de mercado: de 6,50% para 5,50% (-1,00 ponto percentual)',
            'Aproximação pela duration modificada: ΔP ≈ -Duration × ΔTaxa',
            'Valorização estimada no preço unitário: -12 × (-1,00%) = +12,0% de ganho de capital imediato',
            'Preço ajustado estimado: R$ 10.000,00 × 1,12 = R$ 11.200,00 (além do carrego acumulado)',
          ],
          result:
            'Se mantido até o vencimento, o investidor recebe exatamente a taxa contratada na compra; se vendido antes, apura o preço de mercado do dia.',
        },
        keyConcepts: [
          {
            term: 'Marcação a Mercado (MtM)',
            explanation:
              'Atualização diária do valor de resgate antecipado de um título conforme as taxas futuras negociadas no mercado.',
          },
          {
            term: 'Duration Modificada',
            explanation:
              'Indicador em anos que estima quanto o preço de um título varia para cada 1% de alteração na taxa de juros.',
          },
          {
            term: 'Preço Unitário (PU)',
            explanation:
              'Valor financeiro de 1 unidade integral do título público negociado na B3 e Tesouro Direto.',
          },
        ],
        targetTab: 'renda_fixa',
        targetButtonLabel: 'Simular Marcação e Curva DI',
        targetDescription:
          'Visualize curvas de juros e preços teóricos de renda fixa na seção Renda Fixa & Derivativos.',
      },
      {
        id: 'rf-m3',
        number: 3,
        title: 'CDB, LCI, LCA e Debêntures: Comparando Rentabilidade Líquida',
        duration: '20 min',
        summary:
          'Calcule a equivalência tributária entre papéis isentos (LCI/LCA) e títulos tributados (CDB/Tesouro).',
        paragraphs: [
          'Títulos emitidos por bancos privados oferecem proteção do Fundo Garantidor de Créditos (FGC) até R$ 250.000 por CPF e instituição financeira, respeitando o teto global de R$ 1 milhão a cada 4 anos. Já debêntures corporativas não possuem garantia do FGC, exigindo análise do rating de crédito da empresa emissora.',
          'Um erro recorrente entre iniciantes é comparar diretamente o percentual bruto do CDI entre um CDB e uma LCI ou LCA. Enquanto o CDB sofre retenção de Imposto de Renda pela tabela regressiva (22,5% até 180 dias; 20% de 181 a 360 dias; 17,5% de 361 a 720 dias; e 15% acima de 720 dias), LCIs e LCAs são isentas de IR para pessoa física.',
          'Para decidir racionalmente entre dois títulos de risco equivalente e mesmo prazo, basta multiplicar a taxa do CDB pelo fator (1 - alíquota de IR) e comparar com o percentual líquido da LCI/LCA.',
        ],
        numericExample: {
          title: 'Equivalência LCI 92% CDI vs CDB 112% CDI',
          scenario:
            'Investimento de R$ 20.000,00 por prazo de 24 meses (alíquota de IR de 15% para o CDB; CDI base 13,65% a.a.).',
          steps: [
            'CDB 112% do CDI bruto: 112% × 13,65% = 15,29% a.a. bruto',
            'Desconto do IR (15%): 15,29% × 0,85 = 12,99% a.a. líquido (ou 95,2% líquido do CDI)',
            'LCI 92% do CDI isenta de IR: 92% × 13,65% = 12,56% a.a. líquido',
            'Comparação direta equivalente: LCI 92% CDI equivale a um CDB de 92% ÷ 0,85 = 108,24% do CDI',
          ],
          result:
            'Neste prazo de 24 meses, o CDB a 112% do CDI entrega retorno líquido superior ao da LCI a 92% do CDI.',
        },
        keyConcepts: [
          {
            term: 'Tabela Regressiva de IR',
            explanation:
              'Alíquota sobre rendimentos cai conforme o prazo: 22,5% (≤180d), 20% (181–360d), 17,5% (361–720d) e 15% (>720d).',
          },
          {
            term: 'FGC (Fundo Garantidor de Créditos)',
            explanation:
              'Mecanismo privado que cobre depósitos, CDBs, LCIs e LCAs até R$ 250 mil por instituição e CPF.',
          },
          {
            term: 'Gross-Up Tributário',
            explanation:
              'Divisão da taxa isenta por (1 - IR) para descobrir qual taxa bruta equivalente um CDB precisaria pagar.',
          },
        ],
        targetTab: 'ferramentas',
        targetButtonLabel: 'Calcular na Ferramenta de Juros Compostos',
        targetDescription:
          'Projete o acúmulo patrimonial ao longo dos anos aplicando a taxa líquida apurada.',
      },
      {
        id: 'rf-m4',
        number: 4,
        title: 'Reserva de Emergência e Escada de Vencimentos (Bond Ladder)',
        duration: '18 min',
        summary:
          'Estruture liquidez imediata sem sacrificar rentabilidade usando vencimentos escalonados.',
        paragraphs: [
          'A reserva de emergência deve permanecer exclusivamente em ativos de liquidez diária (D+0 ou D+1) e risco soberano ou bancário de primeira linha, como Tesouro Selic ou CDBs de bancos sólidos com 100% do CDI e resgate imediato. O objetivo dessa camada não é maximizar retorno, mas impedir a venda forçada de ativos voláteis em momentos de crise.',
          'Para objetivos de médio e longo prazo, a técnica institucional da escada de vencimentos (Bond Ladder) distribui o capital entre títulos que vencem em janelas sucessivas (por exemplo, 1, 2, 3 e 5 anos).',
          'Conforme cada degrau vence, o capital e os juros acumulados são reinvestidos no vencimento mais longo da escada ou utilizados conforme a necessidade, reduzindo o risco de reinvestimento e suavizando oscilações da curva de juros.',
        ],
        numericExample: {
          title: 'Alocação em Reserva + Escada de 4 Degraus',
          scenario:
            'Patrimônio em renda fixa de R$ 100.000,00 com custo de vida mensal de R$ 5.000,00.',
          steps: [
            'Camada 1 — Reserva de Emergência (6 meses de gastos): R$ 30.000,00 no Tesouro Selic (liquidez imediata)',
            'Camada 2 — Escada de 4 degraus com R$ 70.000,00 restantes (R$ 17.500,00 por vencimento):',
            'Degrau 1 ano: CDB Pós 105% CDI | Degrau 2 anos: LCI 94% CDI | Degrau 3 anos: IPCA+ 6,4% | Degrau 5 anos: IPCA+ 6,6%',
            'A cada 12 meses, R$ 17.500,00 + juros tornam-se disponíveis sem necessidade de resgate antecipado com deságio.',
          ],
          result:
            'Estrutura combina R$ 30 mil em liquidez imediata e R$ 70 mil travando juros compostos reais sem exposição forçada à marcação a mercado.',
        },
        keyConcepts: [
          {
            term: 'Liquidez D+0 / D+1',
            explanation:
              'Prazo em dias úteis entre o pedido de resgate e o crédito efetivo do recurso em conta corrente.',
          },
          {
            term: 'Bond Ladder (Escada de Títulos)',
            explanation:
              'Distribuição escalonada de vencimentos para equilibrar liquidez recorrente e captura de taxas longas.',
          },
          {
            term: 'Risco de Reinvestimento',
            explanation:
              'Possibilidade de os juros terem caído no momento em que um título antigo vence e o dinheiro precisa ser reaplicado.',
          },
        ],
        targetTab: 'renda_fixa',
        targetButtonLabel: 'Montar Simulação em Renda Fixa',
        targetDescription:
          'Explore vencimentos, indexadores e sensibilidade a juros na ferramenta dedicada.',
      },
    ],
  },
  {
    id: 'cambio-dolar-protecao',
    title: 'Mercado de Câmbio, Dólar & Proteção Internacional',
    shortTitle: 'Câmbio, Dólar & Proteção',
    level: 'Intermediário',
    duration: '1h 35min',
    description:
      'Entenda como funciona o câmbio comercial, paridades cruzadas EUR/USD e USD/BRL, impacto de spreads e IOF, além de estratégias graduais em moeda forte.',
    shortDescription:
      'Câmbio comercial vs turismo, paridades EUR/USD e USD/BRL, IOF, spread e dolarização gradual.',
    objective:
      'Proteger poder de compra internacional reduzindo custos operacionais em remessas e conversões.',
    targetTab: 'ferramentas',
    modules: [
      {
        id: 'fx-m1',
        number: 1,
        title: 'Câmbio Comercial vs Turismo, Spread Bancário e IOF',
        duration: '22 min',
        summary:
          'Descubra por que o câmbio de vitrine custa muito mais caro que a taxa interbancária e como calcular o VET.',
        paragraphs: [
          'O mercado cambial distingue o câmbio comercial (referência interbancária utilizada em importações, exportações e investimentos internacionais) do câmbio turismo (moeda física em espécie sujeita a custos de logística, custódia e margens maiores).',
          'Além da cotação comercial PTAX/Spot, toda operação de pessoa física embute dois componentes decisivos: o spread cobrado pela instituição (que varia de 0,3% em corretoras globais até 5,5% em bancos tradicionais) e o IOF cambial.',
          'Por isso, o único critério válido para comparar plataformas é o Valor Efetivo Total (VET), que representa exatamente quantos reais você paga por unidade de dólar ou euro já somando cotação, spread e imposto.',
        ],
        numericExample: {
          title: 'Comparação de Remessa de US$ 2.000,00 via Banco vs Conta Global',
          scenario:
            'Dólar comercial spot cotado a R$ 5,5840. Envio de US$ 2.000,00 para conta de investimentos mesma titularidade (IOF 1,1%).',
          steps: [
            'Valor comercial puro: 2.000 × R$ 5,5840 = R$ 11.168,00',
            'Cenário A (Spread 1,0% + IOF 1,1%): R$ 11.168,00 × 1,010 × 1,011 = R$ 11.403,76 (VET: R$ 5,7019/US$)',
            'Cenário B (Banco tradicional com Spread 4,5% + IOF 1,1%): R$ 11.168,00 × 1,045 × 1,011 = R$ 11.798,94 (VET: R$ 5,8995/US$)',
          ],
          result:
            'A escolha da infraestrutura reduz o custo em R$ 395,18 em uma única remessa de US$ 2.000,00 (economia de 3,35%).',
        },
        keyConcepts: [
          {
            term: 'VET (Valor Efetivo Total)',
            explanation:
              'Custo final real por unidade de moeda estrangeira incluindo taxa de câmbio, spread e IOF.',
          },
          {
            term: 'PTAX (Banco Central)',
            explanation:
              'Taxa média ponderada calculada pelo Banco Central a partir de 4 janelas de consultas aos dealers de câmbio.',
          },
          {
            term: 'Spread Cambial',
            explanation:
              'Diferença percentual cobrada pela corretora ou banco acima do preço interbancário de mercado.',
          },
        ],
        targetTab: 'ferramentas',
        targetButtonLabel: 'Abrir Calculadora de Câmbio Universal',
        targetDescription:
          'Simule cotações da AwesomeAPI em tempo real com cálculo detalhado de Spread e IOF.',
      },
      {
        id: 'fx-m2',
        number: 2,
        title: 'Paridades Cruzadas (EUR/USD, USD/BRL) e Diferencial de Juros',
        duration: '25 min',
        summary:
          'Entenda como o Euro em Reais reflete tanto a força global do Dólar quanto o prêmio de risco local.',
        paragraphs: [
          'A cotação do Euro em Reais (EUR/BRL) não se move de forma independente: ela é matematicamente o produto entre a cotação do Dólar no Brasil (USD/BRL) e a paridade internacional entre Euro e Dólar (EUR/USD).',
          'Quando dados de inflação ou emprego fortalecem o Dólar globalmente, o par EUR/USD cai e o USD/BRL costuma subir. Entender essa dupla engrenagem evita interpretações equivocadas ao acompanhar o mercado europeu.',
          'Outro motor estrutural do câmbio é o diferencial de juros (Carry Trade). Quando a taxa Selic oferece prêmio substancial acima dos juros americanos (Fed Funds) e europeus (BCE), fluxos estrangeiros tendem a entrar no Brasil para capturar o carrego de renda fixa, ajudando a conter pressões cambiais.',
        ],
        numericExample: {
          title: 'Decomposição Cruzada EUR/BRL via USD/BRL e EUR/USD',
          scenario:
            'Pregão com USD/BRL a R$ 5,5840 e EUR/BRL a R$ 6,2335 no fechamento interbancário.',
          steps: [
            'Cálculo da paridade internacional implícita: EUR/USD = EUR/BRL ÷ USD/BRL',
            '6,2335 ÷ 5,5840 = 1,1163 dólares por euro',
            'Se o Euro se valorizar +2% frente ao Dólar (EUR/USD indo a 1,1386) e o USD/BRL ficar estável em 5,5840:',
            'Novo EUR/BRL projetado = 5,5840 × 1,1386 = R$ 6,3579 (+2,00%)',
          ],
          result:
            'Mesmo sem crise doméstica no Brasil, o EUR/BRL oscila proporcionalmente sempre que o BCE e o Federal Reserve alteram o par EUR/USD.',
        },
        keyConcepts: [
          {
            term: 'Cross Rate (Taxa Cruzada)',
            explanation:
              'Relação cambial obtida indiretamente por meio de uma moeda pivô comum (em geral o Dólar americano).',
          },
          {
            term: 'Carry Trade',
            explanation:
              'Estratégia que capta recursos em moedas de juros baixos para aplicar em moedas com juros elevados.',
          },
          {
            term: 'Índice DXY',
            explanation:
              'Cesta ponderada que mede a força do Dólar americano frente às seis principais moedas fortes globais (Euro tem 57,6% de peso).',
          },
        ],
        targetTab: 'ferramentas',
        targetButtonLabel: 'Converter Paridades na Calculadora',
        targetDescription:
          'Alterne entre EUR, USD, GBP, CHF e BRL na Calculadora de Câmbio Universal em tempo real.',
      },
      {
        id: 'fx-m3',
        number: 3,
        title: 'Dolarização e Euroização Gradual (Preço Médio / DCA)',
        duration: '24 min',
        summary:
          'Substitua tentativas de acertar o fundo do dólar por aportes recorrentes que suavizam o custo médio.',
        paragraphs: [
          'Tentar prever a mínima exata do câmbio no curto prazo leva frequentemente à paralisia: quando a moeda cai, o investidor espera cair mais; quando dispara em choques fiscais ou geopolíticos, acaba comprando no pico de pânico.',
          'A abordagem adotada por gestores patrimoniais é o Dollar Cost Averaging (DCA cambial): dividir o valor planejado em aportes periódicos fixos em reais (semanais ou mensais). Quando o dólar ou o euro caem, o mesmo valor em reais compra mais moeda forte; quando sobem, compra menos.',
          'Além de reduzir o preço médio ponderado no médio prazo, essa disciplina mantém o patrimônio dolarizado ou euroizado crescendo continuamente para objetivos de viagem, estudos ou aposentadoria internacional.',
        ],
        numericExample: {
          title: 'DCA Mensal de R$ 2.500,00 durante 4 Meses de Volatilidade',
          scenario:
            'Aportes fixos de R$ 2.500,00 mensais com EUR/BRL oscilando entre R$ 6,10, R$ 6,40, R$ 5,95 e R$ 6,25.',
          steps: [
            'Mês 1 (R$ 6,10): R$ 2.500 ÷ 6,10 = € 409,84',
            'Mês 2 (R$ 6,40): R$ 2.500 ÷ 6,40 = € 390,63',
            'Mês 3 (R$ 5,95): R$ 2.500 ÷ 5,95 = € 420,17',
            'Mês 4 (R$ 6,25): R$ 2.500 ÷ 6,25 = € 400,00',
            'Total acumulado: R$ 10.000,00 convertidos em € 1.620,64',
          ],
          result:
            'Preço médio efetivo obtido: R$ 10.000 ÷ € 1.620,64 = R$ 6,1704 por Euro (abaixo da média aritmética simples de R$ 6,1750).',
        },
        keyConcepts: [
          {
            term: 'DCA (Dollar Cost Averaging)',
            explanation:
              'Método de compras periódicas com valor constante em moeda local para diluir o risco de timing cambial.',
          },
          {
            term: 'Hedge Patrimonial',
            explanation:
              'Parcela da carteira alocada em moeda forte para proteger poder de consumo internacional e reduzir risco-país.',
          },
          {
            term: 'Média Harmônica',
            explanation:
              'Propriedade matemática do DCA que faz o custo médio ficar abaixo da média simples dos preços ao comprar mais unidades na baixa.',
          },
        ],
        targetTab: 'carteiras',
        targetButtonLabel: 'Registrar Posição em Carteiras',
        targetDescription:
          'Acompanhe a diversificação da sua carteira entre BRL, USD e EUR.',
      },
      {
        id: 'fx-m4',
        number: 4,
        title: 'Contas Globais, Corretoras Internacionais e Tributação',
        duration: '24 min',
        summary:
          'Diferencie contas multimoedas para consumo de corretoras reguladas no exterior com proteção SIPC.',
        paragraphs: [
          'Manter saldo parado em conta corrente internacional protege contra a desvalorização cambial, mas não protege contra a inflação americana ou europeia (CPI). Para preservar poder de compra real em dólares ou euros, os recursos podem ser alocados em Treasuries americanos, ETFs irlandeses de acumulação ou ações globais.',
          'Ao escolher corretoras internacionais, verifique sempre a regulação (SEC/FINRA nos EUA, FCA no Reino Unido, BaFin ou Banco Central Europeu na Zona do Euro) e mecanismos de proteção como o SIPC (até US$ 500 mil em custódia nos EUA).',
          'No aspecto tributário brasileiro para aplicações financeiras no exterior, os ganhos realizados e dividendos seguem apuração anual na Declaração de Ajuste Anual com alíquota unificada de 15% sobre o lucro apurado em reais (Lei 14.754), exigindo registro organizado de remessas e custos de aquisição.',
        ],
        numericExample: {
          title: 'Impacto de Inflação Externa vs Treasury Short-Term em USD',
          scenario:
            'Saldo de US$ 10.000,00 parado em conta corrente vs aplicado em títulos curtos do Tesouro dos EUA a 4,20% a.a. (CPI 2,6% a.a.).',
          steps: [
            'Conta corrente sem rendimento após 3 anos: US$ 10.000 nominais, mas poder de compra real cai para US$ 9.259 (-7,4%)',
            'Aplicação em títulos curtos a 4,20% a.a. bruto em 3 anos: US$ 10.000 × (1,042)³ = US$ 11.313,66',
            'IR brasileiro de 15% sobre o ganho nominal de US$ 1.313,66 no resgate: US$ 197,05 → saldo líquido de US$ 11.116,61',
          ],
          result:
            'A alocação em ativo produtivo em dólar supera a inflação americana e gera US$ 1.116,61 líquidos acima do principal dolarizado.',
        },
        keyConcepts: [
          {
            term: 'SIPC / FDIC',
            explanation:
              'Programas norte-americanos de proteção ao investidor: SIPC cobre até US$ 500 mil em ativos custodiados em corretoras membros.',
          },
          {
            term: 'US Treasuries / T-Bills',
            explanation:
              'Títulos soberanos emitidos pelo Tesouro dos Estados Unidos, considerados a referência global de ativo livre de risco.',
          },
          {
            term: 'ETFs Irlandeses (UCITS)',
            explanation:
              'Fundos domiciliados na Irlanda que reduzem retenção de imposto sobre dividendos americanos de 30% para 15% por acordo tributário.',
          },
        ],
        targetTab: 'corretoras',
        targetButtonLabel: 'Comparar Corretoras Globais',
        targetDescription:
          'Consulte o diretório completo de corretoras brasileiras e internacionais com links oficiais.',
      },
    ],
  },
  {
    id: 'analise-tecnica-acoes-cripto',
    title: 'Análise Técnica, Ações & Criptoativos',
    shortTitle: 'Análise Técnica, Ações & Cripto',
    level: 'Intermediário',
    duration: '1h 40min',
    description:
      'Combine leitura gráfica profissional (candlesticks, médias móveis e risco/retorno) com múltiplos fundamentalistas de ações da B3 e Wall Street e gestão de criptoativos.',
    shortDescription:
      'Candlesticks, SMA 20/50/200, múltiplos P/L e EV/EBITDA, ciclos cripto e gestão de risco.',
    objective:
      'Selecionar ações e criptoativos com critério técnico, fundamento sólido e controle rígido de perda máxima.',
    targetTab: 'graficos',
    modules: [
      {
        id: 'at-m1',
        number: 1,
        title: 'Leitura de Velas Japonesas, Suportes, Resistências e Risco/Retorno',
        duration: '25 min',
        summary:
          'Interprete a psicologia compradora e vendedora dentro de cada candle e estruture assimetrias 1:3.',
        paragraphs: [
          'Cada vela japonesa (candlestick) condensa quatro preços do período analisado: Abertura (Open), Máxima (High), Mínima (Low) e Fechamento (Close). O corpo mostra a força líquida entre compradores e vendedores, enquanto os pavios (sombras) revelam rejeição de preços extremos.',
          'Zonas de suporte concentram interesse comprador capaz de interromper quedas; zonas de resistência concentram pressão vendedora. Quando uma resistência relevante é rompida com volume acima da média, tende a inverter sua polaridade e atuar como novo suporte.',
          'Mais importante do que acertar 80% das operações é manter uma relação Risco/Retorno positiva. Com alvo 3 vezes maior que o stop loss (assimetria 1:3), até uma taxa de acerto de 40% gera expectativa matemática positiva consistente.',
        ],
        numericExample: {
          title: 'Operação Estruturada com Assimetria 1:3 em Ação B3',
          scenario:
            'Ativo rompe resistência em R$ 36,00 com suporte técnico (stop loss) posicionado abaixo do fundo em R$ 34,50 e alvo em R$ 40,50.',
          steps: [
            'Risco por ação: R$ 36,00 - R$ 34,50 = R$ 1,50 (4,17% abaixo da entrada)',
            'Retorno potencial até o alvo: R$ 40,50 - R$ 36,00 = R$ 4,50 (+12,50%)',
            'Razão Risco/Retorno: R$ 4,50 ÷ R$ 1,50 = 3,0 (1 para 3)',
            'Capital máximo aceito em perda = R$ 600,00 → Quantidade ideal: R$ 600 ÷ R$ 1,50 = 400 ações',
          ],
          result:
            'Lote de 400 ações limita eventual stop em exatos R$ 600,00 enquanto projeta ganho bruto de R$ 1.800,00 no alvo.',
        },
        keyConcepts: [
          {
            term: 'OHLC (Open, High, Low, Close)',
            explanation:
              'Os quatro preços estruturais que formam cada vela japonesa no intervalo gráfico escolhido.',
          },
          {
            term: 'Inversão de Polaridade',
            explanation:
              'Fenômeno gráfico em que uma resistência rompida passa a funcionar como suporte (ou vice-versa).',
          },
          {
            term: 'Position Sizing (Dimensionamento)',
            explanation:
              'Cálculo da quantidade de ações a partir da perda máxima aceita dividida pela distância do stop loss.',
          },
        ],
        targetTab: 'graficos',
        targetButtonLabel: 'Abrir Terminal Gráfico D3 v7',
        targetDescription:
          'Inspecione velas japonesas, máximas, mínimas e suportes nos ativos do catálogo global.',
      },
      {
        id: 'at-m2',
        number: 2,
        title: 'Médias Móveis (SMA 20/50/200), Volume e Confirmação de Tendência',
        duration: '25 min',
        summary:
          'Utilize médias móveis para filtrar ruído diário e identificar regimes de alta ou baixa institucional.',
        paragraphs: [
          'As Médias Móveis Simples (SMA) suavizam o ruído de curto prazo calculando a média dos últimos N fechamentos. Na prática profissional, a SMA 20 acompanha o impulso de curto prazo, a SMA 50 marca a tendência intermediária e a SMA 200 funciona como divisor de águas institucional entre mercado comprador e vendedor.',
          'Quando a SMA 20 ou SMA 50 cruza acima da SMA 200 com inclinação positiva (Golden Cross), reforça-se o viés comprador de médio prazo. O oposto (Death Cross) sinaliza perda estrutural de momentum.',
          'Entretanto, médias móveis funcionam como filtros de tendência e falham em mercados lateralizados (consolidação). Por isso, devem ser combinadas ao volume financeiro: rompimentos sem aumento de volume têm alta probabilidade de falso rompimento (bull/bear trap).',
        ],
        numericExample: {
          title: 'Filtro de Tendência com SMA 20 e SMA 50',
          scenario:
            'Ação de Wall Street negociada a US$ 218,00 com SMA 20 em US$ 212,40, SMA 50 em US$ 204,10 e volume diário 45% acima da média de 20 dias.',
          steps: [
            'Alinhamento de tendência: Preço (218,00) > SMA 20 (212,40) > SMA 50 (204,10)',
            'Distância saudável até a SMA 20: (218,00 - 212,40) ÷ 212,40 = +2,64% (sem esticamento excessivo)',
            'Pullback até a região da SMA 20 oferece ponto de entrada com stop técnico abaixo da SMA 50.',
          ],
          result:
            'Alinhamento ascendente das médias associado à expansão de volume confirma participação institucional no movimento.',
        },
        keyConcepts: [
          {
            term: 'SMA 20 / 50 / 200',
            explanation:
              'Médias Móveis Simples de 20, 50 e 200 pregões usadas para leitura de tendência de curto, médio e longo prazo.',
          },
          {
            term: 'Golden Cross',
            explanation:
              'Cruzamento ascendente de uma média móvel curta (como a de 50 dias) acima da média longa de 200 dias.',
          },
          {
            term: 'Falso Rompimento',
            explanation:
              'Superação momentânea de resistência com baixo volume seguida por retorno rápido do preço para dentro da faixa anterior.',
          },
        ],
        targetTab: 'graficos',
        targetButtonLabel: 'Plotar SMA 20 e 50 no Gráfico',
        targetDescription:
          'Ative sobreposição de médias móveis e volume interativo no motor gráfico do DinhEuro.',
      },
      {
        id: 'at-m3',
        number: 3,
        title: 'Múltiplos Fundamentalistas (P/L, EV/EBITDA, DY) na B3 e Wall Street',
        duration: '25 min',
        summary:
          'Avalie se uma ação está cara ou barata comparando lucro, geração de caixa operacional e dividendos.',
        paragraphs: [
          'Enquanto o gráfico indica o melhor momento de entrada, os fundamentos explicam a qualidade e o valor intrínseco do negócio. O múltiplo Preço/Lucro (P/L) mostra quantos anos de lucro atual o mercado paga pela empresa — útil para comparar companhias maduras do mesmo setor.',
          'Para comparar empresas com diferentes níveis de endividamento, analistas institucionais preferem o EV/EBITDA (Enterprise Value dividido pelo lucro operacional antes de juros, impostos, depreciação e amortização), pois o EV soma o valor de mercado à dívida líquida.',
          'Já o Dividend Yield (DY) mede o retorno anual em proventos sobre a cotação atual. Um DY muito elevado só é sustentável quando apoiado por payout saudável e fluxo de caixa livre consistente, sem queima de caixa ou aumento artificial de dívida.',
        ],
        numericExample: {
          title: 'Comparativo de Valuation: Empresa de Valor (B3) vs Crescimento (EUA)',
          scenario:
            'Ação A (setor elétrico B3): cotação R$ 40,00, Lucro por Ação R$ 5,00, provento anual R$ 3,20. Ação B (tecnologia EUA): cotação US$ 180,00, LPA US$ 6,00.',
          steps: [
            'P/L da Ação A = R$ 40,00 ÷ R$ 5,00 = 8,0x lucros | Earnings Yield = 1 ÷ 8 = 12,5% a.a.',
            'Dividend Yield da Ação A = R$ 3,20 ÷ R$ 40,00 = 8,00% ao ano | Payout = 3,20 ÷ 5,00 = 64%',
            'P/L da Ação B = US$ 180,00 ÷ US$ 6,00 = 30,0x lucros (precifica forte crescimento futuro de receitas e margens).',
          ],
          result:
            'Ação A entrega renda previsível e múltiplo descontado (8x), enquanto Ação B exige crescimento contínuo de lucro acima de 20% ao ano para justificar o P/L 30x.',
        },
        keyConcepts: [
          {
            term: 'P/L (Preço / Lucro)',
            explanation:
              'Razão entre preço da ação e lucro por ação nos últimos 12 meses; inverso do retorno implícito sobre o lucro.',
          },
          {
            term: 'EV / EBITDA',
            explanation:
              'Múltiplo que relaciona o valor total da firma (incluindo dívida líquida) à geração operacional de caixa.',
          },
          {
            term: 'Payout Ratio',
            explanation:
              'Percentual do lucro líquido distribuído aos acionistas na forma de dividendos e JCP.',
          },
        ],
        targetTab: 'mercados',
        targetButtonLabel: 'Explorar Ações B3 e Wall Street',
        targetDescription:
          'Consulte P/L, Dividend Yield e cotações em tempo real das maiores ações do Brasil e dos EUA.',
      },
      {
        id: 'at-m4',
        number: 4,
        title: 'Ciclos de Criptoativos, Dominância do Bitcoin e Gestão de Risco',
        duration: '25 min',
        summary:
          'Compreenda a liquidez global, halving e regras matemáticas de exposição máxima em ativos voláteis.',
        paragraphs: [
          'Criptoativos operam 24 horas por dia, 7 dias por semana, com volatilidade historicamente de 3 a 5 vezes superior à dos índices acionários tradicionais. O Bitcoin atua como ativo âncora do ecossistema, influenciado por sua política de emissão decrescente (halvings quadrienais) e pelas condições globais de liquidez em dólar.',
          'A Dominância do Bitcoin (BTC.D) mede a fatia da capitalização total do mercado cripto concentrada no BTC. Em fases de aversão ao risco, investidores migram de altcoins para Bitcoin ou stablecoins; em ciclos avançados de expansão de liquidez, o capital rotaciona para redes de contratos inteligentes como Ethereum e Solana.',
          'Na gestão de carteira, o tamanho da posição deve ser inversamente proporcional à volatilidade do ativo: alocar 3% a 8% do portfólio total permite capturar assimetrias expressivas de alta sem comprometer a estabilidade patrimonial em correções de -40% a -60%.',
        ],
        numericExample: {
          title: 'Dimensionamento de Risco em Carteira com Exposição Cripto',
          scenario:
            'Carteira total de R$ 100.000,00 alocando 5% (R$ 5.000,00) em Bitcoin e Ethereum, com regra de rebalanceamento na faixa de 3% a 7%.',
          steps: [
            'Se o segmento cripto sofrer correção severa de -50%: perda na carteira total = 5% × (-50%) = -2,50% (R$ 2.500,00)',
            'Se o segmento cripto valorizar +140%: posição sobe de R$ 5.000,00 para R$ 12.000,00 (11,2% da carteira)',
            'Rebalanceamento disciplinado: realiza R$ 4.500,00 de lucro excedente para Renda Fixa / ETFs, trazendo cripto de volta para ~7%.',
          ],
          result:
            'O rebalanceamento por bandas transforma a alta volatilidade cripto em fonte sistemática de realização de lucros com risco global controlado.',
        },
        keyConcepts: [
          {
            term: 'Dominância do Bitcoin (BTC.D)',
            explanation:
              'Percentual do valor de mercado total das criptomoedas representado exclusivamente pelo Bitcoin.',
          },
          {
            term: 'Halving',
            explanation:
              'Redução programada de 50% na recompensa por bloco minerado de Bitcoin aproximadamente a cada 4 anos.',
          },
          {
            term: 'Rebalanceamento por Bandas',
            explanation:
              'Regra automática de comprar ou realizar lucros parciais sempre que o peso de uma classe ultrapassa limites definidos.',
          },
        ],
        targetTab: 'ferramentas',
        targetButtonLabel: 'Calcular Lucro e Isenção DARF Cripto',
        targetDescription:
          'Verifique regras de isenção de R$ 35 mil mensais e imposto estimado na calculadora DARF.',
      },
    ],
  },
  {
    id: 'fluxo-futuros-opcoes',
    title: 'Fluxo (Tape Reading), Futuros & Opções',
    shortTitle: 'Fluxo, Futuros & Opções',
    level: 'Avançado',
    duration: '1h 50min',
    description:
      'Domine a leitura de livro de ofertas (DOM) e agressões no Times & Trades, alavancagem e ajuste diário em contratos futuros (WIN/WDO) e estratégias com opções e gregas.',
    shortDescription:
      'Livro de ofertas (DOM), agressão institucional, contratos futuros WIN/WDO e gregas de opções.',
    objective:
      'Executar leituras precisas de microestrutura de mercado, gerenciar alavancagem futura e precificar proteção com derivativos.',
    targetTab: 'tape_reading',
    modules: [
      {
        id: 'fl-m1',
        number: 1,
        title: 'Livro de Ofertas (DOM), Times & Trades e Absorção Institucional',
        duration: '28 min',
        summary:
          'Distinga ordens passivas no Book de agressões reais executadas a mercado no Times & Trades.',
        paragraphs: [
          'O preço de um ativo não se move simplesmente porque há muitos lotes no Livro de Ofertas (DOM — Depth of Market), mas sim quando compradores ou vendedores decidem agredir a contraparte consumindo a liquidez existente na fila.',
          'O Tape Reading (leitura de fluxo) cruza duas telas em tempo real: o DOM, que exibe intenção passiva em cada nível de preço, e o Times & Trades (Histórico de Negócios), que registra todas as agressões efetivamente executadas, com horário, quantidade, preço e corretora agressora.',
          'Um dos sinais mais relevantes da microestrutura é a Absorção: quando dezenas ou centenas de contratos são agredidos na venda em determinado nível de preço, mas o preço não consegue cair porque um player institucional renova ordens passivas ocultas (iceberg) na compra.',
        ],
        numericExample: {
          title: 'Detecção de Absorção Compradora no Mini-Dólar (WDO)',
          scenario:
            'WDO negociando a 5.585,00. Book exibe apenas 40 contratos visíveis na compra a 5.584,50, enquanto entram agressões de venda consecutivas.',
          steps: [
            'Times & Trades registra 480 contratos agredidos na venda a 5.584,50 em 18 segundos',
            'Apesar do volume vendedor 12 vezes maior que o lote aparente, a cotação não rompe 5.584,00',
            'O comprador passivo renova imediatamente o lote a cada execução (ordem iceberg)',
            'Na sequência, entram 150 contratos de agressão compradora consumindo 5.585,50 e 5.586,00 sem resistência.',
          ],
          result:
            'A exaustão da venda diante da absorção institucional desloca o equilíbrio de curto prazo e cria ponto técnico de entrada com stop curto abaixo de 5.583,50.',
        },
        keyConcepts: [
          {
            term: 'DOM (Depth of Market)',
            explanation:
              'Mapa vertical de preços mostrando o saldo de ofertas passivas de compra e venda acumuladas por nível de cotação.',
          },
          {
            term: 'Agressão de Mercado',
            explanation:
              'Ordem executada imediatamente contra a melhor oferta contrária disponível no book, consumindo liquidez.',
          },
          {
            term: 'Ordem Iceberg (Lote Escondido)',
            explanation:
              'Ordem institucional fracionada que exibe apenas pequena fração de seu tamanho total no book para não alertar o mercado.',
          },
        ],
        targetTab: 'tape_reading',
        targetButtonLabel: 'Observar Fluxo no Terminal DOM',
        targetDescription:
          'Acompanhe o livro de ofertas dinâmico, saldo de agressão e Times & Trades no DinhEuro.',
      },
      {
        id: 'fl-m2',
        number: 2,
        title: 'Contratos Futuros (WIN, WDO, S&P): Margem, Ponto e Ajuste Diário',
        duration: '28 min',
        summary:
          'Domine a matemática real da alavancagem nos minicontratos da B3 e evite a armadilha da margem mínima.',
        paragraphs: [
          'Contratos futuros de Índice (WIN) e Dólar (WDO) na B3 operam por ajuste diário financeiro e exigem apenas uma fração do valor nocional depositada como margem de garantia (em dinheiro, CDB ou Tesouro Selic). Essa característica multiplica tanto os ganhos quanto os prejuízos.',
          'No Mini-Índice (WIN), cada ponto vale R$ 0,20 por contrato; já no Mini-Dólar (WDO), cada ponto equivale a R$ 10,00 por contrato (com variação mínima de 0,5 ponto = R$ 5,00). Ignorar o valor nocional real do contrato é a causa número um de quebra de contas de iniciantes.',
          'Operadores consistentes calculam a alavancagem a partir do capital total alocado à estratégia, mantendo margem folgada para absorver oscilações normais sem sofrer encerramento compulsório pela corretora (zeragem de risco).',
        ],
        numericExample: {
          title: 'Valor Nocional vs Margem Exigida em 2 Contratos de WDO',
          scenario:
            'WDO cotado a 5.584,00 pontos. Cada contrato representa US$ 10.000,00 (10% do contrato cheio).',
          steps: [
            'Valor nocional de 1 contrato WDO: 10.000 × R$ 5,5840 = R$ 55.840,00',
            'Exposição nocional de 2 contratos WDO: R$ 111.680,00',
            'Oscilação adversa de 12 pontos (0,21% no câmbio): 2 contratos × 12 pts × R$ 10,00 = -R$ 240,00',
            'Para manter risco máximo diário ≤ 2% do capital, a conta alocada deve ter no mínimo R$ 12.000,00 (não apenas a margem mínima de R$ 300,00).',
          ],
          result:
            'Dimensionar contratos pelo nocional e stop financeiro evita que oscilações triviais de 0,2% destruam uma conta subcapitalizada.',
        },
        keyConcepts: [
          {
            term: 'Valor Nocional',
            explanation:
              'Valor total financeiro representado pelo contrato futuro (US$ 10 mil no WDO; 20% dos pontos do Ibovespa no WIN).',
          },
          {
            term: 'Ajuste Diário',
            explanation:
              'Liquidação financeira automática de lucros e prejuízos ocorrida diariamente ao final do pregão sobre posições em aberto.',
          },
          {
            term: 'Margem de Garantia',
            explanation:
              'Colateral (Tesouro Selic, CDB ou saldo) retido pela B3/corretora para garantir o cumprimento do ajuste diário.',
          },
        ],
        targetTab: 'daytrade',
        targetButtonLabel: 'Praticar no Terminal Day Trade Pro',
        targetDescription:
          'Teste leitura de gráfico intraday, boleta e gestão de pontos no módulo Day Trade & Scalping.',
      },
      {
        id: 'fl-m3',
        number: 3,
        title: 'Estrutura de Opções: Calls, Puts, Strike e Operações Cobertas',
        duration: '27 min',
        summary:
          'Use opções como seguro patrimonial (Protective Put) ou geração de renda extra sobre ações (Covered Call).',
        paragraphs: [
          'Opções são contratos derivativos que conferem ao titular (comprador) o direito — e não a obrigação — de comprar (Call) ou vender (Put) um ativo-objeto a um preço predeterminado (Strike) até ou na data de vencimento, mediante pagamento de um prêmio.',
          'O preço (prêmio) de uma opção compõe-se de duas partes: Valor Intrínseco (o ganho imediato caso fosse exercida agora) e Valor Extrínseco ou Valor Tempo (o prêmio pago pela incerteza e volatilidade restante até o vencimento).',
          'Em carteiras de ações, opções brilham na gestão de risco: a Venda Coberta (Covered Call) remunera ações já presentes na carteira em mercados laterais, enquanto a Compra de Put (Protective Put) estabelece um piso garantido de preço contra quedas severas.',
        ],
        numericExample: {
          title: 'Seguro de Carteira com Protective Put vs Covered Call',
          scenario:
            'Investidor possui 1.000 ações de PETR4 a R$ 38,00 (R$ 38.000,00) e analisa proteção ou remuneração para 30 dias.',
          steps: [
            'Estratégia 1 (Covered Call): Vende 1.000 Calls Strike R$ 40,00 recebendo prêmio de R$ 1,10/ação (+R$ 1.100,00 no caixa = 2,89% no mês)',
            'Se ação fechar em R$ 39,00: mantém as ações + R$ 1.100,00 livres. Se fechar acima de R$ 40,00: entrega a R$ 40,00 + R$ 1,10 = R$ 41,10 (+8,16%).',
            'Estratégia 2 (Protective Put): Compra 1.000 Puts Strike R$ 36,00 pagando prêmio de R$ 0,75/ação (custo de R$ 750,00 = 1,97% no mês).',
          ],
          result:
            'Mesmo que a ação desabe para R$ 28,00 em choque extremo, a Put garante venda a R$ 36,00, travando o patrimônio mínimo.',
        },
        keyConcepts: [
          {
            term: 'Call (Opção de Compra) & Put (Opção de Venda)',
            explanation:
              'Call dá direito de comprar o ativo no strike; Put dá direito de vender o ativo no strike.',
          },
          {
            term: 'ITM / ATM / OTM',
            explanation:
              'Classificação da opção conforme o strike em relação ao preço atual: Dentro do Dinheiro (ITM), No Dinheiro (ATM) e Fora do Dinheiro (OTM).',
          },
          {
            term: 'Covered Call (Venda Coberta)',
            explanation:
              'Venda de Call lastreada na posse equivalente do ativo-objeto, reduzindo o custo médio da posição em troca de limitar a alta acima do strike.',
          },
        ],
        targetTab: 'renda_fixa',
        targetButtonLabel: 'Simular Payoff na Calculadora de Opções',
        targetDescription:
          'Calcule Black-Scholes, preço justo e perfil de retorno no módulo Renda Fixa & Derivativos.',
      },
      {
        id: 'fl-m4',
        number: 4,
        title: 'Gregas (Delta, Gamma, Theta, Vega) e Controle de Exposição',
        duration: '27 min',
        summary:
          'Entenda como preço do ativo, passagem dos dias e volatilidade implícita alteram o prêmio das opções.',
        paragraphs: [
          'As "Gregas" quantificam a sensibilidade matemática do prêmio de uma opção em relação às variáveis do modelo de Black-Scholes. Sem compreender essas derivadas parciais, o operador fica vulnerável a perder dinheiro mesmo acertando a direção do mercado.',
          'O Delta (entre 0 e 1 para Calls; 0 e -1 para Puts) indica quanto o prêmio varia para cada R$ 1,00 de movimento na ação, servindo também como estimativa aproximada da probabilidade de exercício no vencimento. O Gamma mede a velocidade com que o Delta acelera perto do vencimento.',
          'O Theta representa a erosão diária do valor tempo contra o comprador da opção (acelera fortemente nos últimos 21 dias úteis), enquanto o Vega mede o impacto de variações na Volatilidade Implícita (IV) — comprar opções após explosões de IV costuma ser caro e desfavorável.',
        ],
        numericExample: {
          title: 'Leitura Integrada das Gregas em uma Call ATM',
          scenario:
            'Call Strike R$ 50,00 (ação a R$ 50,00) faltando 20 pregões, prêmio R$ 2,20, Delta +0,52, Gamma 0,09, Theta -0,06/dia, Vega +0,11.',
          steps: [
            'Se a ação subir R$ 1,00 hoje (para R$ 51,00): prêmio sobe aprox. +R$ 0,52 (indo a ~R$ 2,72) e novo Delta vai para ~0,61',
            'Se a ação ficar totalmente parada por 5 dias úteis: perda por Theta ≈ 5 × (-R$ 0,06) = -R$ 0,30 (-13,6% do prêmio)',
            'Se a volatilidade implícita cair 4 pontos após divulgação de balanço: impacto de Vega = -4 × 0,11 = -R$ 0,44.',
          ],
          result:
            'Mesmo em alta leve da ação, uma queda brusca de volatilidade (IV Crush) somada ao Theta pode corroer opções compradas às vésperas de eventos.',
        },
        keyConcepts: [
          {
            term: 'Delta & Gamma',
            explanation:
              'Delta mede variação de prêmio por R$ 1 do ativo; Gamma mede a aceleração dessa variação quando o ativo se aproxima do strike.',
          },
          {
            term: 'Theta (Time Decay)',
            explanation:
              'Desgaste diário do valor extrínseco da opção com a aproximação do vencimento — favorece vendedores e exige agilidade de compradores.',
          },
          {
            term: 'Vega & Volatilidade Implícita (IV)',
            explanation:
              'Vega mede a sensibilidade do prêmio a variações na expectativa de oscilação futura embutida no preço das opções.',
          },
        ],
        targetTab: 'renda_fixa',
        targetButtonLabel: 'Calcular Gregas no Simulador Black-Scholes',
        targetDescription:
          'Experimente alterar strike, prazo e volatilidade na calculadora de derivativos do portal.',
      },
    ],
  },
];

export const ACADEMY_FAQ: AcademyFaqItem[] = [
  {
    id: 'faq-1',
    question: 'Os cursos do DinhEuro Academy são realmente 100% gratuitos?',
    answer:
      'Sim. Todas as 4 trilhas e seus 16 módulos completos têm acesso livre, sem cobrança de matrícula, assinatura ou cadastro obrigatório. O objetivo é democratizar o conhecimento financeiro e cambial com padrão institucional.',
  },
  {
    id: 'faq-2',
    question: 'Preciso assistir a vídeos externos para acompanhar as aulas?',
    answer:
      'Não. Todo o conteúdo foi estruturado em formato de leitura interativa direta na plataforma, com explicações objetivas, cálculos numéricos passo a passo, cards de conceitos-chave e integração imediata com os simuladores do próprio portal.',
  },
  {
    id: 'faq-3',
    question: 'Como meu progresso nos módulos é salvo?',
    answer:
      'Quando você marca qualquer aula como concluída, o histórico fica armazenado localmente no navegador do seu dispositivo (via localStorage), mantendo sua evolução preservada entre visitas sem envio de dados pessoais a servidores.',
  },
  {
    id: 'faq-4',
    question: 'Qual trilha devo escolher se estou começando agora?',
    answer:
      'Recomendamos iniciar pela trilha "Fundamentos de Renda Fixa & Tesouro Direto" (Nível Iniciante) para dominar juros reais, marcação a mercado e liquidez, avançando em seguida para Câmbio & Proteção Internacional.',
  },
  {
    id: 'faq-5',
    question: 'Como praticar os cálculos aprendidos nos módulos?',
    answer:
      'Ao final de cada módulo existe um atalho contextual direto para a ferramenta correspondente do DinhEuro, incluindo a Calculadora de Câmbio Universal (AwesomeAPI), Simuladores de Juros Compostos/DARF, Terminal Gráfico D3 v7, Fluxo & Tape Reading e Renda Fixa & Derivativos.',
  },
  {
    id: 'faq-6',
    question: 'O conteúdo das trilhas constitui recomendação de compra ou venda?',
    answer:
      'Não. Os materiais do DinhEuro Academy têm caráter exclusivamente educacional e analítico. Os exemplos numéricos utilizam cenários didáticos para ilustrar funcionamento de mercado, gestão de risco e matemática financeira.',
  },
];
