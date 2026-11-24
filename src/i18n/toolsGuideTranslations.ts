import type { SupportedLanguage } from './translations';

export interface ToolsGuideBlock {
  id: string;
  title: string;
  body: string;
}

export interface ToolsFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ToolsGuideTranslation {
  guideEyebrow: string;
  guideTitle: string;
  guideSubtitle: string;
  blocks: ToolsGuideBlock[];
  faqEyebrow: string;
  faqTitle: string;
  faqSubtitle: string;
  faqItems: ToolsFaqItem[];
  educationalDisclaimer: string;
}

export const TOOLS_GUIDE_TRANSLATIONS: Record<SupportedLanguage, ToolsGuideTranslation> = {
  pt: {
    guideEyebrow: 'Guia Editorial de Apoio aos Simuladores',
    guideTitle: 'Guia Prático de Câmbio, Juros, Inflação e Tributação',
    guideSubtitle:
      'Referência educacional para interpretar cotações em tempo real, custos efetivos de remessas internacionais no eixo União Europeia – Mercosul, juros compostos, inflação e apuração fiscal responsável.',
    blocks: [
      {
        id: 'eur-brl-eu-mercosul',
        title: 'Câmbio EUR/BRL, Moedas Globais e Eixo União Europeia – Mercosul',
        body: 'Acompanhar paridades como EUR/BRL (Euro em Real), USD/BRL (Dólar em Real), o cruzamento internacional EUR/USD e moedas regionais como o Peso Argentino (ARS/BRL) é essencial para comércio exterior, viagens e remessas internacionais. A cotação EUR/BRL reflete simultaneamente a força global do Dólar frente ao Euro e o comportamento da moeda brasileira. No cenário global, o corredor econômico União Europeia – Mercosul ganha relevância crescente em exportações, contratos comerciais e fluxo financeiro bilateral, tornando a leitura integrada dessas divisas indispensável para planejar orçamentos internacionais com precisão.',
      },
      {
        id: 'spread-iof-custo-efetivo',
        title: 'Spread Cambial, IOF e Custo Efetivo em Remessas',
        body: 'Ao converter moeda em bancos tradicionais ou contas globais, a cotação comercial exibida na tela representa apenas a referência interbancária de mercado. Sobre essa base incidem o spread cambial — margem percentual cobrada pela instituição intermediadora — e o Imposto sobre Operações Financeiras (IOF), cuja alíquota varia conforme a finalidade da transferência (como mesma titularidade, terceiros ou gastos no exterior). Por isso, comparar apenas a taxa nominal de vitrine pode induzir a erro: o critério decisivo é sempre o resultado líquido efetivo entregue na moeda de destino após descontar spread e tributo.',
      },
      {
        id: 'juros-compostos-inflacao',
        title: 'Juros Compostos, Renda Fixa e Poder de Compra (Inflação)',
        body: 'Nos simuladores de Juros Compostos e Poder de Compra, duas forças atuam em sentidos opostos sobre o patrimônio ao longo do tempo. De um lado, a capitalização composta multiplica aportes recorrentes e rendimentos acumulados de forma exponencial quando mantida por horizontes médios e longos. De outro, a inflação — medida por índices como IPCA no Brasil, HICP na Zona do Euro ou CPI nos Estados Unidos — corrói silenciosamente o poder de compra de valores nominais parados. Avaliar o retorno real (descontada a inflação) em diferentes economias permite preservar valor tanto em Real quanto em Euro ou Dólar.',
      },
      {
        id: 'apuracao-resultados-darf',
        title: 'Apuração de Resultados e Imposto (DARF) com Responsabilidade',
        body: 'Para acompanhar operações em ações brasileiras, ativos internacionais ou criptoativos com organização, é fundamental registrar sistematicamente o preço médio ponderado de aquisição, custos operacionais (taxas de bolsa, corretagem e eventuais spreads cambiais) e as datas exatas de compra e alienação. Esses registros garantem consistência na verificação de limites mensais de isenção vigentes e no preenchimento correto de apurações fiscais. O simulador de Lucro & Imposto (DARF) do DinhEuro tem finalidade estritamente educativa e orientativa, não substituindo orientação contábil ou tributária especializada nem relatórios oficiais de custódia.',
      },
    ],
    faqEyebrow: 'Dúvidas Frequentes',
    faqTitle: 'Perguntas Frequentes sobre os Simuladores',
    faqSubtitle:
      'Esclarecimentos objetivos sobre cotações líquidas, planejamento educacional, simulações tributárias e privacidade de uso.',
    faqItems: [
      {
        id: 'tools-faq-1',
        question: 'Qual a diferença entre a cotação de referência na tela e o valor líquido após spread e IOF?',
        answer:
          'A cotação de referência reflete o preço interbancário comercial de compra ou venda no mercado global, sem encargos comerciais. Já o valor líquido calculado ao ativar o simulador de custos aplica o spread percentual da instituição e o IOF da operação, mostrando exatamente quantas unidades da moeda de destino você recebe (ou quantos reais desembolsa no total) na prática.',
      },
      {
        id: 'tools-faq-2',
        question: 'Como utilizar as calculadoras de juros compostos e inflação para planejamento educacional?',
        answer:
          'Comece simulando na aba de Juros Compostos o seu capital inicial, aporte mensal e taxa anual esperada para visualizar o peso dos juros ao longo dos anos. Em seguida, utilize a aba de Poder de Compra & Inflação com a inflação média projetada para verificar quanto o montante nominal continuará comprando no futuro e estimar o ganho real acima da perda inflacionária.',
      },
      {
        id: 'tools-faq-3',
        question: 'Quais cuidados adotar ao simular lucro e imposto (DARF) na calculadora?',
        answer:
          'Considere sempre o custo médio de aquisição incluindo taxas operacionais, confira o volume total alienado dentro do mês-calendário para verificar regras de isenção aplicáveis e observe a distinção entre operações comuns, negociações no mesmo dia e ativos no exterior. Utilize os números apenas como apoio didático e confirme os lançamentos finais nos informes oficiais da corretora e nas normas vigentes da Receita Federal.',
      },
      {
        id: 'tools-faq-4',
        question: 'Os valores digitados nos simuladores ficam armazenados ou coletam dados pessoais?',
        answer:
          'Não. Todos os cálculos de câmbio, juros compostos, inflação e imposto são processados diretamente na sessão do seu navegador, sem exigir cadastro, login, CPF ou envio de informações financeiras pessoais para servidores externos.',
      },
    ],
    educationalDisclaimer:
      'Aviso educacional: todas as ferramentas e simulações têm caráter exclusivamente informativo e didático, não configurando recomendação de investimento nem consultoria fiscal ou cambial.',
  },
  en: {
    guideEyebrow: 'Editorial Support Guide for Simulators',
    guideTitle: 'Practical Guide to FX, Interest, Inflation & Taxation',
    guideSubtitle:
      'Educational reference to interpret live exchange quotes, all-in international transfer costs across the EU–Mercosur corridor, compound interest, inflation, and responsible tax calculations.',
    blocks: [
      {
        id: 'eur-brl-eu-mercosul',
        title: 'EUR/BRL Exchange, Global Currencies & the EU–Mercosur Axis',
        body: 'Tracking parities such as EUR/BRL (Euro to Real), USD/BRL (US Dollar to Real), the global EUR/USD cross rate, and regional currencies like the Argentine Peso (ARS/BRL) is essential for foreign trade, travel, and international remittances. The EUR/BRL quote reflects both global US Dollar strength against the Euro and Brazilian currency dynamics. Globally, the European Union – Mercosur economic corridor plays an increasingly important role in exports, commercial contracts, and bilateral financial flows, making integrated currency literacy vital for accurate international budgeting.',
      },
      {
        id: 'spread-iof-custo-efetivo',
        title: 'FX Spread, IOF Tax & Effective Cost in Remittances',
        body: 'When converting currency through traditional banks or global multi-currency accounts, the commercial exchange rate shown on screen represents only the wholesale interbank market reference. Retail transfers layer on the institution’s FX spread—a percentage markup—and applicable transaction taxes such as IOF, whose rate depends on transfer purpose (same-ownership investment, third-party remittance, or travel spending). Comparing headline screen rates alone can be misleading; what matters is always the net effective amount delivered in the destination currency after spread and tax.',
      },
      {
        id: 'juros-compostos-inflacao',
        title: 'Compound Interest, Fixed Income & Purchasing Power (Inflation)',
        body: 'In the Compound Interest and Purchasing Power simulators, two opposing forces act on wealth over time. On one side, compounding multiplies recurring contributions and reinvested earnings exponentially across medium and long horizons. On the other side, inflation—tracked through indexes like IPCA in Brazil, HICP in the Eurozone, and CPI in the United States—quietly erodes nominal cash purchasing power. Measuring real inflation-adjusted returns across economies helps safeguard value in BRL, EUR, or USD.',
      },
      {
        id: 'apuracao-resultados-darf',
        title: 'Responsible Profit Tracking & Tax (DARF) Calculation',
        body: 'Keeping accurate records across Brazilian equities, international assets, and crypto requires systematically logging weighted average purchase cost, transaction fees (exchange fees, brokerage, and FX spreads), and exact buy/sell trade dates. Clean recordkeeping ensures consistency when checking monthly exemption thresholds and completing tax filings. DinhEuro’s Profit & Tax (DARF) simulator is strictly educational and illustrative, and does not replace professional accounting/tax advice or official brokerage statements.',
      },
    ],
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'Frequently Asked Questions About the Simulators',
    faqSubtitle:
      'Clear answers regarding net FX conversion values, educational financial planning, tax simulation precautions, and user privacy.',
    faqItems: [
      {
        id: 'tools-faq-1',
        question: 'What is the difference between the screen reference rate and the net amount after spread and IOF?',
        answer:
          'The reference quote reflects the global commercial interbank buy or sell benchmark without retail fees. Enabling the remittance cost simulator applies your institution’s percentage spread and applicable IOF tax, revealing the exact net currency units received (or total BRL paid) in practice.',
      },
      {
        id: 'tools-faq-2',
        question: 'How should I use the compound interest and inflation calculators for educational planning?',
        answer:
          'Start in the Compound Interest tab by entering your starting principal, monthly contribution, and expected annual rate to see how compounding builds over time. Then switch to Purchasing Power & Inflation using expected average inflation to evaluate how much real purchasing power that future nominal figure retains.',
      },
      {
        id: 'tools-faq-3',
        question: 'What precautions should I take when simulating profit and tax (DARF)?',
        answer:
          'Always factor in weighted average cost including transaction fees, verify total gross sales within the calendar month for applicable exemption thresholds, and distinguish standard trades, same-day trades, and foreign holdings. Treat results strictly as educational support and validate official filings against broker statements and current tax rules.',
      },
      {
        id: 'tools-faq-4',
        question: 'Do the simulators store my inputs or collect personal data?',
        answer:
          'No. All FX, compound interest, inflation, and tax calculations execute directly inside your active browser session without requiring registration, login, tax IDs, or sending personal financial inputs to external servers.',
      },
    ],
    educationalDisclaimer:
      'Educational notice: all tools and simulations are strictly informational and didactic, and do not constitute investment, tax, or FX advisory.',
  },
  es: {
    guideEyebrow: 'Guía Editorial de Apoyo a los Simuladores',
    guideTitle: 'Guía Práctica de Cambio, Interés, Inflación y Tributación',
    guideSubtitle:
      'Referencia educativa para interpretar cotizaciones en tiempo real, costos efectivos en remesas del eje Unión Europea – Mercosur, interés compuesto, inflación y cálculo fiscal responsable.',
    blocks: [
      {
        id: 'eur-brl-eu-mercosul',
        title: 'Cambio EUR/BRL, Divisas Globales y Eje Unión Europea – Mercosur',
        body: 'Seguir paridades como EUR/BRL (Euro a Real), USD/BRL (Dólar a Real), el cruce global EUR/USD y monedas regionales como el Peso Argentino (ARS/BRL) resulta clave en comercio exterior, viajes y remesas internacionales. La cotización EUR/BRL refleja simultáneamente la fortaleza global del Dólar frente al Euro y la dinámica cambiaria brasileña. En el plano internacional, el corredor Unión Europea – Mercosur cobra relevancia estratégica en exportaciones, contratos y flujos financieros bilaterales, haciendo indispensable leer estas divisas de forma integrada.',
      },
      {
        id: 'spread-iof-custo-efetivo',
        title: 'Spread Cambiario, IOF y Costo Efectivo en Remesas',
        body: 'Al convertir divisas en bancos tradicionales o cuentas globales, la cotización comercial en pantalla representa únicamente la referencia interbancaria mayorista. Sobre ella se suman el spread cambiario —margen porcentual aplicado por la entidad— y tributos como el IOF, cuya tasa varía según el tipo de envío (misma titularidad, terceros o consumo en el exterior). Comparar solo la tasa nominal visible induce a error: el criterio decisivo es siempre el monto neto efectivo entregado en la divisa de destino tras descontar spread e impuestos.',
      },
      {
        id: 'juros-compostos-inflacao',
        title: 'Interés Compuesto, Renta Fija y Poder Adquisitivo (Inflación)',
        body: 'En los simuladores de Interés Compuesto y Poder Adquisitivo operan dos fuerzas opuestas sobre el patrimonio con el paso del tiempo. Por un lado, la capitalización compuesta multiplica aportes periódicos y rendimientos reinvertidos de forma exponencial a mediano y largo plazo. Por otro, la inflación —medida por índices como IPCA en Brasil, HICP en la Eurozona o CPI en EE. UU.— erosiona el poder de compra del dinero nominal inactivo. Evaluar el retorno real descontando la inflación ayuda a proteger el valor en BRL, EUR o USD.',
      },
      {
        id: 'apuracao-resultados-darf',
        title: 'Cálculo de Resultados e Impuestos (DARF) con Responsabilidad',
        body: 'Para dar seguimiento ordenado a operaciones en bolsa brasileña, activos internacionales o criptoactivos, es esencial registrar el costo medio ponderado de compra, comisiones operativas (bolsa, corretaje y spreads cambiarios) y las fechas exactas de compra y venta. Estos registros facilitan comprobar límites mensuales de exención y preparar declaraciones correctamente. El simulador de Lucro e Impuesto (DARF) de DinhEuro es estrictamente educativo y no sustituye asesoría contable o fiscal especializada ni informes oficiales de custodia.',
      },
    ],
    faqEyebrow: 'Dudas Frecuentes',
    faqTitle: 'Preguntas Frecuentes sobre los Simuladores',
    faqSubtitle:
      'Aclaraciones objetivas sobre cotización neta, planificación educativa, precauciones tributarias y privacidad.',
    faqItems: [
      {
        id: 'tools-faq-1',
        question: '¿Cuál es la diferencia entre la cotización de referencia y el valor neto tras spread e IOF?',
        answer:
          'La cotización de referencia refleja el precio comercial interbancario de mercado sin cargos minoristas. Al activar el simulador de costos de envío se aplican el spread porcentual de la entidad y el impuesto IOF, mostrando exactamente cuántas unidades netas recibe en destino (o el desembolso total real).',
      },
      {
        id: 'tools-faq-2',
        question: '¿Cómo usar las calculadoras de interés compuesto e inflación para planificación educativa?',
        answer:
          'Comience en la pestaña de Interés Compuesto ingresando capital inicial, aporte mensual y tasa anual esperada para observar el efecto del tiempo sobre el saldo. Luego utilice Poder Adquisitivo e Inflación con la inflación promedio estimada para evaluar cuánto poder de compra real conserva ese capital futuro.',
      },
      {
        id: 'tools-faq-3',
        question: '¿Qué precauciones tomar al simular ganancia e impuesto (DARF) en la calculadora?',
        answer:
          'Incluya siempre el costo medio con comisiones operativas, verifique el volumen total vendido en el mes calendario respecto a los umbrales de exención aplicables y distinga operaciones normales, intradiarias y activos en el exterior. Use el cálculo solo como guía didáctica y valide sus declaraciones con los extractos del bróker y la normativa fiscal vigente.',
      },
      {
        id: 'tools-faq-4',
        question: '¿Los valores ingresados en los simuladores se almacenan o recopilan datos personales?',
        answer:
          'No. Todos los cálculos de divisas, interés compuesto, inflación e impuestos se ejecutan directamente en la sesión de su navegador, sin exigir registro, inicio de sesión, identificación fiscal ni envío de datos financieros personales a servidores externos.',
      },
    ],
    educationalDisclaimer:
      'Aviso educativo: todas las herramientas y simulaciones tienen carácter exclusivamente informativo y didáctico, y no constituyen recomendación de inversión ni asesoría fiscal o cambiaria.',
  },
};
