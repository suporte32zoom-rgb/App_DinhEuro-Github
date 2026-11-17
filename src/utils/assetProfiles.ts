import { MarketAsset } from '../services/marketData';
import type { SupportedLanguage } from '../i18n/translations';
import { getLocalizedAssetName } from '../i18n/marketDataTranslations';

export interface AssetMetadata {
  ticker: string;
  marketOrigin: string;
  tags: string[];
  description: string;
  week52High: number;
  week52Low: number;
  openPrice: number;
  peRatioDisplay: string;
  dividendYieldDisplay: string;
  institutionalProfile: {
    nature: string;
    sector: string;
    segment: string;
    benchmark: string;
    governance?: string;
    foundation?: string;
  };
  aiDiagnosis: {
    scenarioSummary: string;
    supportLevel: number;
    resistanceLevel: number;
    liquidityAnalysis: string;
    correlation: string;
    strengths: string[];
    risks: string[];
  };
}

/**
 * Returns comprehensive, institutional-grade metadata, quantitative diagnosis, and key statistics
 * for any asset on the DinhEuro portal, localized for PT / EN / ES.
 */
export function getAssetMetadata(
  asset: MarketAsset,
  lang: SupportedLanguage = 'pt'
): AssetMetadata {
  const price = asset.price;
  const openPrice = Number((price - asset.changeValue).toFixed(2));
  const week52High = Number((price * 1.24).toFixed(2));
  const week52Low = Number((price * 0.78).toFixed(2));
  const supportLevel = Number((price * 0.965).toFixed(2));
  const resistanceLevel = Number((price * 1.042).toFixed(2));
  const localizedName = getLocalizedAssetName(asset, lang);

  // 1. Brazilian B3 Equities
  if (asset.category === 'stocks_br') {
    if (asset.symbol === 'PETR4') {
      if (lang === 'en') {
        return {
          ticker: 'PETR4',
          marketOrigin: 'B3 - Brasil, Bolsa, Balcão (São Paulo)',
          tags: ['Oil & Gas', 'B3 Equities', '#Brazil', '#Dividends', '#BlueChip'],
          description:
            'Petrobras is the largest oil and natural gas exploration, refining, and distribution company in Latin America, and a global leader in ultra-deepwater offshore production technology (Pre-Salt).',
          week52High: 54.8,
          week52Low: 34.2,
          openPrice,
          peRatioDisplay: '4.8x',
          dividendYieldDisplay: '14.8%',
          institutionalProfile: {
            nature: 'Mixed-Capital Publicly Traded Corporation',
            sector: 'Oil, Gas & Biofuels',
            segment: 'Exploration, Refining & Distribution',
            benchmark: 'Ibovespa Index (IBOV) & IEE',
            governance: 'B3 Governance Level 2',
            foundation: '1953',
          },
          aiDiagnosis: {
            scenarioSummary: `PETR4 maintains solid operating cash generation supported by international Brent crude prices. Shares trade at an attractive valuation discount versus global peers, with strong technical support at R$ ${supportLevel} and resistance at R$ ${resistanceLevel}.`,
            supportLevel,
            resistanceLevel,
            liquidityAnalysis: 'Extremely High (most actively traded equity on B3, daily turnover > R$ 1.5B).',
            correlation: 'Positive correlation of 0.82 with Brent crude and 0.74 with IBOVESPA.',
            strengths: [
              'Pre-Salt lifting cost among the lowest globally (< US$ 6/barrel).',
              'Track record of double-digit Dividend Yield above global energy peers.',
              'Strong Free Cash Flow (FCF) generation even across Brent price cycles.',
            ],
            risks: [
              'Sensitivity to domestic fuel pricing policy and state-ownership decisions.',
              'Macroeconomic volatility and long-term global energy transition.',
            ],
          },
        };
      }
      if (lang === 'es') {
        return {
          ticker: 'PETR4',
          marketOrigin: 'B3 - Brasil, Bolsa, Balcão (São Paulo)',
          tags: ['Petróleo & Gas', 'Acciones B3', '#Brasil', '#Dividendos', '#BlueChip'],
          description:
            'Petrobras es la mayor empresa de exploración, refinación y distribución de petróleo y gas natural de América Latina, líder mundial en tecnología de producción en aguas ultraprofundas (Presal).',
          week52High: 54.8,
          week52Low: 34.2,
          openPrice,
          peRatioDisplay: '4.8x',
          dividendYieldDisplay: '14.8%',
          institutionalProfile: {
            nature: 'Sociedad de Economía Mixta (Capital Abierto)',
            sector: 'Petróleo, Gas y Biocombustibles',
            segment: 'Exploración, Refinación y Distribución',
            benchmark: 'Índice Bovespa (IBOV) & IEE',
            governance: 'Nivel 2 de Gobernanza B3',
            foundation: '1953',
          },
          aiDiagnosis: {
            scenarioSummary: `PETR4 mantiene sólida generación de caja operativa respaldada por los precios internacionales del crudo Brent. Cotiza con descuento atractivo frente a pares globales, con soporte sólido en R$ ${supportLevel} y resistencia técnica en R$ ${resistanceLevel}.`,
            supportLevel,
            resistanceLevel,
            liquidityAnalysis: 'Extremadamente Alta (activo más negociado de B3, volumen diario > R$ 1.5B).',
            correlation: 'Correlación positiva de 0.82 con el Brent y 0.74 con el IBOVESPA.',
            strengths: [
              'Costo de extracción (lifting cost) del presal entre los más bajos del mundo (< US$ 6/barril).',
              'Historial de dividendos con Dividend Yield de dos dígitos superior a la media global.',
              'Fuerte generación de Flujo de Caja Libre (FCL) incluso ante oscilaciones del Brent.',
            ],
            risks: [
              'Sensibilidad a políticas públicas de precios de combustibles e interferencia estatal.',
              'Volatilidad macroeconómica y transición energética global a largo plazo.',
            ],
          },
        };
      }
      return {
        ticker: 'PETR4',
        marketOrigin: 'B3 - Brasil, Bolsa, Balcão',
        tags: ['Petróleo & Gás', 'Ações B3', '#Brasil', '#Dividendos', '#BlueChip'],
        description:
          'A Petrobras é a maior empresa de exploração, refino e distribuição de petróleo e gás natural da América Latina, líder mundial no desenvolvimento de tecnologia de produção em águas ultraprofundas (Pré-Sal).',
        week52High: 54.8,
        week52Low: 34.2,
        openPrice,
        peRatioDisplay: '4.8x',
        dividendYieldDisplay: '14.8%',
        institutionalProfile: {
          nature: 'Sociedade de Economia Mista (Capital Aberto)',
          sector: 'Petróleo, Gás e Biocombustíveis',
          segment: 'Exploração, Refino e Distribuição',
          benchmark: 'Índice Bovespa (IBOV) & IEE',
          governance: 'Nível 2 de Governança B3',
          foundation: '1953',
        },
        aiDiagnosis: {
          scenarioSummary:
            'PETR4 mantém sólida geração de caixa operacional com sustentação nos preços internacionais do petróleo Brent. O papel negocia com desconto atrativo em relação aos pares globais, com suporte forte em R$ ' +
            supportLevel +
            ' e resistência técnica em R$ ' +
            resistanceLevel +
            '.',
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Extremamente Alta (ativo mais negociado da B3, giro diário > R$ 1.5B).',
          correlation: 'Correlação positiva de 0.82 com o Brent e 0.74 com o IBOVESPA.',
          strengths: [
            'Custo de extração (lifting cost) do pré-sal entre os mais baixos do mundo (< US$ 6/barril).',
            'Histórico de proventos com Dividend Yield de dois dígitos superior à média global.',
            'Forte geração de Fluxo de Caixa Livre (FCL) mesmo sob oscilações do Brent.',
          ],
          risks: [
            'Sensibilidade a políticas públicas de preços de combustíveis e interferência estatal.',
            'Volatilidade macroeconômica e transição energética global a longo prazo.',
          ],
        },
      };
    }

    if (asset.symbol === 'VALE3') {
      if (lang === 'en') {
        return {
          ticker: 'VALE3',
          marketOrigin: 'B3 - Brasil, Bolsa, Balcão (São Paulo)',
          tags: ['Mining & Steel', 'B3 Equities', '#Exports', '#Commodities', '#BlueChip'],
          description:
            'Vale S.A. is one of the world’s largest mining companies and the leading global producer of high-grade iron ore and pellets, alongside major nickel and copper operations for the energy transition.',
          week52High: 72.5,
          week52Low: 53.1,
          openPrice,
          peRatioDisplay: '6.8x',
          dividendYieldDisplay: '9.2%',
          institutionalProfile: {
            nature: 'Publicly Traded Corporation (True Corporation)',
            sector: 'Basic Materials',
            segment: 'Mining & Pelletizing',
            benchmark: 'Ibovespa Index (IBOV) & IMAT',
            governance: 'Novo Mercado (Highest B3 Standard)',
            foundation: '1942',
          },
          aiDiagnosis: {
            scenarioSummary: `VALE3 reflects Chinese port iron-ore inventory dynamics and Asian property-sector stimulus. The company retains a quality premium for 65% Fe ore with technical support around R$ ${supportLevel}.`,
            supportLevel,
            resistanceLevel,
            liquidityAnalysis: 'Leading foreign institutional liquidity equity on B3.',
            correlation: 'High correlation with Dalian iron ore futures and the Chinese Yuan.',
            strengths: [
              'High-grade pellet and iron ore portfolio capturing steel-decarbonization premiums.',
              'Moderately leveraged balance sheet paired with consistent shareholder distributions.',
              'Base Metals division (Copper & Nickel) with substantial unlockable valuation.',
            ],
            risks: [
              'Swings in steel demand from China’s property and infrastructure sectors.',
              'Socio-environmental provisions and railway concession negotiations.',
            ],
          },
        };
      }
      if (lang === 'es') {
        return {
          ticker: 'VALE3',
          marketOrigin: 'B3 - Brasil, Bolsa, Balcão (São Paulo)',
          tags: ['Minería & Siderurgia', 'Acciones B3', '#Exportación', '#MateriasPrimas', '#BlueChip'],
          description:
            'Vale S.A. es una de las mayores mineras globales y la principal productora mundial de mineral de hierro y pellets de alta pureza, además de destacada productora de níquel y cobre para la transición energética.',
          week52High: 72.5,
          week52Low: 53.1,
          openPrice,
          peRatioDisplay: '6.8x',
          dividendYieldDisplay: '9.2%',
          institutionalProfile: {
            nature: 'Corporación Privada (True Corporation)',
            sector: 'Materiales Básicos',
            segment: 'Minería y Peletización',
            benchmark: 'Índice Bovespa (IBOV) & IMAT',
            governance: 'Novo Mercado (Máximo Estándar B3)',
            foundation: '1942',
          },
          aiDiagnosis: {
            scenarioSummary: `VALE3 refleja la dinámica de inventarios portuarios de mineral en China y los estímulos al sector inmobiliario asiático. Mantiene prima de calidad por el mineral de 65% Fe con soporte en R$ ${supportLevel}.`,
            supportLevel,
            resistanceLevel,
            liquidityAnalysis: 'Líder en liquidez institucional extranjera en B3.',
            correlation: 'Alta correlación con el mineral de hierro en Dalian y el Yuan chino.',
            strengths: [
              'Portafolio de pellets y mineral de alta ley con prima por descarbonización siderúrgica.',
              'Estructura de capital moderadamente apalancada con sólida remuneración al accionista.',
              'Unidad de Metales Básicos (Cobre y Níquel) con alto valor estratégico.',
            ],
            risks: [
              'Oscilaciones en la demanda de acero del sector inmobiliario e infraestructura chino.',
              'Pasivos socioambientales y negociaciones de concesiones ferroviarias.',
            ],
          },
        };
      }
      return {
        ticker: 'VALE3',
        marketOrigin: 'B3 - Brasil, Bolsa, Balcão',
        tags: ['Mineração & Siderurgia', 'Ações B3', '#Exportação', '#Commodities', '#BlueChip'],
        description:
          'A Vale S.A. é uma das maiores mineradoras globais e a principal produtora mundial de minério de ferro e pelotas de alta pureza, além de expressiva produtora de níquel e cobre para transição energética.',
        week52High: 72.5,
        week52Low: 53.1,
        openPrice,
        peRatioDisplay: '6.8x',
        dividendYieldDisplay: '9.2%',
        institutionalProfile: {
          nature: 'Corporação Privada (True Corporation)',
          sector: 'Materiais Básicos',
          segment: 'Mineração e Pelotização',
          benchmark: 'Índice Bovespa (IBOV) & IMAT',
          governance: 'Novo Mercado (Padrão Máximo B3)',
          foundation: '1942',
        },
        aiDiagnosis: {
          scenarioSummary:
            'VALE3 reflete a dinâmica dos estoques portuários de minério na China e estímulos do setor imobiliário asiático. Mantém prêmio de qualidade pelo minério de 65% Fe com suporte em R$ ' +
            supportLevel +
            '.',
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Líder de liquidez institucional estrangeira na B3.',
          correlation: 'Alta correlação com minério de ferro em Dalian e Yuan chinês.',
          strengths: [
            'Portfólio de pelotas e minério de alta qualidade com prêmio de descarbonização siderúrgica.',
            'Estrutura de capital alavancada moderadamente com robusta remuneração a acionistas.',
            'Unidade de Metais Básicos (Cobre e Níquel) com alto valor destravável.',
          ],
          risks: [
            'Oscilação na demanda de aço pelo setor imobiliário e de infraestrutura chinês.',
            'Passivos socioambientais e discussões de outorgas ferroviárias.',
          ],
        },
      };
    }

    if (lang === 'en') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'B3 - Brasil, Bolsa, Balcão (São Paulo)',
        tags: ['B3 Equities', '#Brazil', '#EquityMarket', '#Equities'],
        description: `${localizedName} is one of the benchmark companies traded during regular sessions on Brazil’s B3 exchange, with a strong footprint in the Brazilian corporate landscape.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '8.5x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '6.4%',
        institutionalProfile: {
          nature: 'Publicly Traded Corporation (S.A.)',
          sector: 'Brazilian Equities',
          segment: 'B3 Exchange Listing',
          benchmark: 'Ibovespa Index (IBOV)',
          governance: 'Novo Mercado / Level 1',
        },
        aiDiagnosis: {
          scenarioSummary: `Asset consolidating technically with dynamic support projected at ${asset.currency} ${supportLevel} and resistance at ${asset.currency} ${resistanceLevel}. Adequate liquidity for balanced portfolio allocation.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'High order-book liquidity on B3.',
          correlation: 'Moderate correlation with the DI interest-rate curve and IBOV.',
          strengths: [
            'Established domestic revenue base with pricing pass-through capacity.',
            'Competitive return on equity and capital efficiency metrics.',
          ],
          risks: [
            'Sensitivity to domestic policy interest rates (Selic) and credit cycles.',
            'Cyclical swings in Brazil’s fiscal outlook and exchange rate.',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'B3 - Brasil, Bolsa, Balcão (São Paulo)',
        tags: ['Acciones B3', '#Brasil', '#MercadoAccionario', '#RentaVariable'],
        description: `${localizedName} es una de las compañías de referencia negociadas en la sesión regular de B3, con sólida presencia en el mercado corporativo brasileño.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '8.5x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '6.4%',
        institutionalProfile: {
          nature: 'Sociedad Anónima de Capital Abierto',
          sector: 'Mercado de Acciones Brasil',
          segment: 'Listado en B3',
          benchmark: 'Índice Bovespa (IBOV)',
          governance: 'Novo Mercado / Nivel 1',
        },
        aiDiagnosis: {
          scenarioSummary: `Activo en consolidación técnica con soporte dinámico proyectado en ${asset.currency} ${supportLevel} y resistencia en ${asset.currency} ${resistanceLevel}. Liquidez adecuada para carteras equilibradas.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Elevada liquidez en el libro de órdenes de B3.',
          correlation: 'Correlación moderada con la curva de tasas DI y el IBOV.',
          strengths: [
            'Generación de ingresos consolidada en el mercado interno con capacidad de traspaso de precios.',
            'Métricas financieras con retorno sobre patrimonio competitivo.',
          ],
          risks: [
            'Sensibilidad a las tasas de interés locales (Selic) y al ciclo de crédito.',
            'Fluctuaciones coyunturales del escenario fiscal y cambiario brasileño.',
          ],
        },
      };
    }

    return {
      ticker: asset.symbol,
      marketOrigin: 'B3 - Brasil, Bolsa, Balcão',
      tags: ['Ações B3', '#Brasil', '#MercadoAcionário', '#RendaVariável'],
      description: `${asset.name} é uma das empresas de referência negociadas no pregão regular da B3, com sólida presença no mercado corporativo brasileiro.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '8.5x',
      dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '6.4%',
      institutionalProfile: {
        nature: 'Sociedade Anônima de Capital Aberto',
        sector: 'Mercado de Ações Brasil',
        segment: 'Listagem B3',
        benchmark: 'Índice Bovespa (IBOV)',
        governance: 'Novo Mercado / Nível 1',
      },
      aiDiagnosis: {
        scenarioSummary: `Ativo em consolidação técnica com suporte dinâmico projetado em ${asset.currency} ${supportLevel} e resistência em ${asset.currency} ${resistanceLevel}. Liquidez satisfatória para alocação de carteiras equilibradas.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Elevada liquidez no livro de ofertas da B3.',
        correlation: 'Moderada correlação com a curva de juros DI e o IBOV.',
        strengths: [
          'Geração de receita estabelecida no mercado doméstico com poder de repasse de preços.',
          'Métricas financeiras com rentabilidade do patrimônio líquido competitiva.',
        ],
        risks: [
          'Sensibilidade às taxas de juros locais (Selic) e ao ciclo de crédito.',
          'Flutuações conjunturais do cenário fiscal e de câmbio brasileiro.',
        ],
      },
    };
  }

  // 2. US Equities (Wall Street)
  if (asset.category === 'stocks_us') {
    const isTech = ['AAPL', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'TSLA'].includes(asset.symbol);
    if (lang === 'en') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'NASDAQ / NYSE - United States',
        tags: isTech
          ? ['Global Technology', 'Big Tech', '#USA', '#WallStreet', '#S&P500']
          : ['US Market', '#USA', '#WallStreet', '#BlueChip'],
        description: `${localizedName} is a publicly traded multinational corporation listed in the United States, recognized for global scale, market leadership, and heavyweight representation in the S&P 500 and Nasdaq Composite.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '32.4x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '0.5%',
        institutionalProfile: {
          nature: 'U.S. Publicly Listed Corporation',
          sector: isTech ? 'Information Technology & Innovation' : 'Global Consumer & Industrials',
          segment: 'U.S. Equity Market (SEC Regulated)',
          benchmark: 'S&P 500 & Nasdaq 100',
          governance: 'SEC Standard / NASDAQ Compliance',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} shows strong institutional momentum on Wall Street, backed by durable economic moats and cloud computing expansion. Technical support sits at US$ ${supportLevel} with resistance near US$ ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Peak global liquidity across U.S. equity venues.',
          correlation: 'High correlation with U.S. 10-Year Treasury yields (US10Y) and Nasdaq.',
          strengths: [
            'Leading competitive position with high operating margins and return on invested capital.',
            'Balance sheet with substantial cash reserves and low net leverage.',
            'Superior capacity to reinvest in R&D and global infrastructure.',
          ],
          risks: [
            'Stretched valuation multiples relative to historical averages.',
            'Antitrust regulatory scrutiny across global jurisdictions (U.S. and EU).',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'NASDAQ / NYSE - Estados Unidos',
        tags: isTech
          ? ['Tecnología Global', 'Big Tech', '#EEUU', '#WallStreet', '#S&P500']
          : ['Mercado Estadounidense', '#EEUU', '#WallStreet', '#BlueChip'],
        description: `${localizedName} es una corporación multinacional cotizada en Estados Unidos, con liderazgo global, escala internacional y alta ponderación en los índices S&P 500 y Nasdaq Composite.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '32.4x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '0.5%',
        institutionalProfile: {
          nature: 'Corporación Pública Estadounidense',
          sector: isTech ? 'Tecnología de la Información & Innovación' : 'Consumo e Industria Global',
          segment: 'Mercado Accionario de EE. UU. (Regulado por SEC)',
          benchmark: 'S&P 500 & Nasdaq 100',
          governance: 'Estándar SEC / Cumplimiento NASDAQ',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} presenta sólido impulso institucional en Wall Street, respaldado por ventajas competitivas duraderas y expansión en computación en la nube. Soporte técnico en US$ ${supportLevel} y resistencia en US$ ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Liquidez global máxima en el mercado accionario estadounidense.',
          correlation: 'Alta correlación con el rendimiento de los bonos del Tesoro de EE. UU. a 10 años (US10Y) y Nasdaq.',
          strengths: [
            'Posición de liderazgo consolidada con elevados márgenes operativos y retorno sobre capital.',
            'Balance sólido con amplias reservas de efectivo y bajo endeudamiento neto.',
            'Capacidad superior de inversión en I+D e infraestructura tecnológica global.',
          ],
          risks: [
            'Múltiplos de valuación exigentes frente a promedios históricos.',
            'Escrutinio regulatorio antimonopolio en jurisdicciones globales (EE. UU. y UE).',
          ],
        },
      };
    }

    return {
      ticker: asset.symbol,
      marketOrigin: 'NASDAQ / NYSE - Estados Unidos',
      tags: isTech
        ? ['Tecnologia Global', 'Big Tech', '#EUA', '#WallStreet', '#S&P500']
        : ['Mercado Americano', '#EUA', '#WallStreet', '#BlueChip'],
      description: `${asset.name} é uma corporação multinacional de capital aberto listada nos Estados Unidos, com liderança tecnológica, escala global e alta representatividade nos índices S&P 500 e Nasdaq Composite.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '32.4x',
      dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '0.5%',
      institutionalProfile: {
        nature: 'Corporação Aberta Americana (Public Company)',
        sector: isTech ? 'Tecnologia da Informação & Inovação' : 'Consumo e Indústria Global',
        segment: 'Mercado de Ações Americano (SEC Regulated)',
        benchmark: 'S&P 500 & Nasdaq 100',
        governance: 'SEC Standard / NASDAQ Compliance',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} apresenta forte momentum institucional em Wall Street, suportado por vantagens competitivas (economic moats) e expansão em computação em nuvem. Nível de suporte em US$ ${supportLevel} e teto de resistência técnica em US$ ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Liquidez global máxima no mercado acionário americano.',
        correlation: 'Alta correlação com rendimento dos Treasuries americanos de 10 anos (US10Y) e Nasdaq.',
        strengths: [
          'Posição de liderança incontestável com elevadas margens operacionais e retorno sobre capital.',
          'Balanço patrimonial com vasta reserva de caixa e baixo endividamento líquido.',
          'Capacidade superior de investimento em P&D e infraestrutura tecnológica global.',
        ],
        risks: [
          'Múltiplos de avaliação (valuation) esticados em comparação com médias históricas.',
          'Escrutínio regulatório antitruste em jurisdições globais (EUA e União Europeia).',
        ],
      },
    };
  }

  // 2B. European Equities
  if (asset.category === 'stocks_eu') {
    if (lang === 'en') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'Euronext / Xetra / SIX / LSE - Europe',
        tags: ['European Equities', '#Europe', '#STOXX50', '#BlueChip', '#Multinational'],
        description: `${localizedName} is a leading European listed corporation anchored in major continental and UK stock exchanges, forming a cornerstone of STOXX Europe 50 and FTSE indices.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '18.6x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '2.8%',
        institutionalProfile: {
          nature: 'European Public Limited Company',
          sector: 'Industry, Luxury, Healthcare, Energy & Technology',
          segment: 'European Regulated Exchanges (ESMA / FCA)',
          benchmark: 'EURO STOXX 50 / DAX 40 / FTSE 100',
          governance: 'IFRS / EU Corporate Governance Code',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} maintains solid institutional sponsorship across European equity desks, combining global export revenues with resilient dividend distributions. Technical support sits at ${asset.currency} ${supportLevel} and resistance at ${asset.currency} ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Deep order-book liquidity on European primary venues.',
          correlation: 'Sensitive to ECB / BoE monetary policy paths and EUR/USD parity.',
          strengths: [
            'Strong global brand franchises with high pricing power across exports.',
            'Consistent free-cash-flow generation and shareholder dividend track record.',
          ],
          risks: [
            'Exposure to European industrial energy costs and cross-border FX swings.',
            'Regulatory compliance requirements across the European Single Market.',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'Euronext / Xetra / SIX / LSE - Europa',
        tags: ['Acciones Europa', '#Europa', '#STOXX50', '#BlueChip', '#Multinacional'],
        description: `${localizedName} es una corporación europea líder cotizada en las principales bolsas del continente y Reino Unido, con fuerte peso en los índices EURO STOXX 50 y FTSE.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '18.6x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '2.8%',
        institutionalProfile: {
          nature: 'Sociedad Anónima Europea Cotizada',
          sector: 'Industria, Lujo, Salud, Energía y Tecnología',
          segment: 'Bolsas Europeas Reguladas (ESMA / FCA)',
          benchmark: 'EURO STOXX 50 / DAX 40 / FTSE 100',
          governance: 'Normativa IFRS / Código de Gobernanza UE',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} mantiene sólido respaldo institucional en las mesas europeas, combinando ingresos globales por exportación con pagos consistentes de dividendos. Soporte en ${asset.currency} ${supportLevel} y resistencia en ${asset.currency} ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Amplia liquidez en el libro de órdenes de los mercados europeos.',
          correlation: 'Sensible al ciclo de tasas del BCE / BoE y a la paridad EUR/USD.',
          strengths: [
            'Marcas globales líderes con elevado poder de fijación de precios.',
            'Generación sólida de flujo de caja libre e historial recurrente de dividendos.',
          ],
          risks: [
            'Exposición a costos energéticos industriales y variaciones cambiarias.',
            'Marco regulatorio exigente en el mercado único europeo.',
          ],
        },
      };
    }

    return {
      ticker: asset.symbol,
      marketOrigin: 'Euronext / Xetra / SIX / LSE - Europa',
      tags: ['Ações Europa', '#Europa', '#STOXX50', '#BlueChip', '#Multinacional'],
      description: `${asset.name} é uma corporação europeia de capital aberto listada nas principais bolsas do continente e do Reino Unido, com elevada representatividade nos índices EURO STOXX 50, DAX 40 e FTSE 100.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '18.6x',
      dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '2.8%',
      institutionalProfile: {
        nature: 'Corporação Aberta Europeia (Listed Equity)',
        sector: 'Indústria, Luxo, Saúde, Energia e Tecnologia',
        segment: 'Bolsas Reguladas da Europa (ESMA / FCA)',
        benchmark: 'EURO STOXX 50 / DAX 40 / FTSE 100',
        governance: 'IFRS Standard / Governança Corporativa UE',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} apresenta sólido acompanhamento institucional nas mesas europeias, unindo receitas globais de exportação com distribuição recorrente de dividendos. Suporte técnico em ${asset.currency} ${supportLevel} e resistência em ${asset.currency} ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Alta liquidez diária nos livros de ofertas das principais praças europeias.',
        correlation: 'Sensibilidade às decisões de juros do BCE / BoE e à taxa EUR/USD.',
        strengths: [
          'Liderança global em nichos de alto valor agregado e forte poder de repasse de preços.',
          'Geração consistente de caixa livre e histórico maduro de proventos.',
        ],
        risks: [
          'Exposição a custos energéticos industriais e oscilações cambiais entre EUR, GBP e CHF.',
          'Rigidez regulatória em jurisdições da União Europeia e Reino Unido.',
        ],
      },
    };
  }

  // 2C. Asia-Pacific Equities
  if (asset.category === 'stocks_asia') {
    if (lang === 'en') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'TSE / HKEX / TWSE / KRX / ASX - Asia-Pacific',
        tags: ['Asia-Pacific', '#Nikkei225', '#HangSeng', '#Semiconductors', '#APAC'],
        description: `${localizedName} is a flagship Asia-Pacific corporation listed on major regional exchanges, playing a pivotal role in global semiconductor, industrial, banking, and consumer supply chains.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '16.8x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '2.2%',
        institutionalProfile: {
          nature: 'Asia-Pacific Listed Corporation',
          sector: 'Semiconductors, Automotive, Financials, Internet & Resources',
          segment: 'Tokyo / Hong Kong / Taipei / Seoul / Sydney / Singapore / Mumbai',
          benchmark: 'Nikkei 225 / Hang Seng / ASX 200 / KOSPI',
          governance: 'Regional Exchange Listing & Audit Standards',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} captures structural Asia-Pacific growth and global supply-chain leadership. Technical support sits at ${asset.currency} ${supportLevel} and resistance at ${asset.currency} ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Institutional benchmark liquidity during Asian trading hours.',
          correlation: 'Tracked alongside Bank of Japan policy, China stimulus, and USD FX trends.',
          strengths: [
            'Critical scale in global manufacturing, semiconductors, or regional banking.',
            'Strong balance-sheet buffers and export competitiveness.',
          ],
          risks: [
            'Sensitivity to global trade tariffs and regional currency volatility.',
            'Macroeconomic demand cycles across East Asia and global tech capex.',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'TSE / HKEX / TWSE / KRX / ASX - Asia-Pacífico',
        tags: ['Asia-Pacífico', '#Nikkei225', '#HangSeng', '#Semiconductores', '#APAC'],
        description: `${localizedName} es una corporación emblemática de Asia-Pacífico cotizada en las mayores bolsas de la región, con rol central en cadenas globales de semiconductores, industria, banca y consumo.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '16.8x',
        dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '2.2%',
        institutionalProfile: {
          nature: 'Corporación Cotizada de Asia-Pacífico',
          sector: 'Semiconductores, Automotriz, Finanzas, Internet y Materias Primas',
          segment: 'Tokio / Hong Kong / Taipéi / Seúl / Sídney / Singapur / Mumbai',
          benchmark: 'Nikkei 225 / Hang Seng / ASX 200 / KOSPI',
          governance: 'Estándares Bursátiles Regionales de Asia-Pacífico',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} refleja el crecimiento estructural de Asia-Pacífico y el liderazgo en cadenas globales de suministro. Soporte en ${asset.currency} ${supportLevel} y resistencia en ${asset.currency} ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Liquidez institucional de referencia en la sesión asiática.',
          correlation: 'Sensible a la política del Banco de Japón, estímulos en China y ciclo del dólar.',
          strengths: [
            'Escala crítica en manufactura global, semiconductores o banca regional.',
            'Sólidos balances y elevada competitividad exportadora.',
          ],
          risks: [
            'Exposición a aranceles comerciales y volatilidad de divisas asiáticas.',
            'Ciclos globales de inversión en tecnología y demanda industrial.',
          ],
        },
      };
    }

    return {
      ticker: asset.symbol,
      marketOrigin: 'TSE / HKEX / TWSE / KRX / ASX - Ásia-Pacífico',
      tags: ['Ásia-Pacífico', '#Nikkei225', '#HangSeng', '#Semicondutores', '#APAC'],
      description: `${asset.name} é uma corporação líder da região Ásia-Pacífico negociada nas principais bolsas asiáticas e da Oceania, com papel central nas cadeias globais de tecnologia, indústria, finanças e consumo.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: asset.peRatio ? `${asset.peRatio}x` : '16.8x',
      dividendYieldDisplay: asset.dividendYield ? `${asset.dividendYield}%` : '2.2%',
      institutionalProfile: {
        nature: 'Corporação Aberta da Ásia-Pacífico',
        sector: 'Semicondutores, Automotivo, Bancos, Tecnologia e Mineração',
        segment: 'Tóquio / Hong Kong / Taipei / Seul / Sydney / Singapura / Mumbai',
        benchmark: 'Nikkei 225 / Hang Seng / ASX 200 / KOSPI',
        governance: 'Padrões Regulatórios das Bolsas da Ásia-Pacífico',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} captura o dinamismo econômico da Ásia-Pacífico e a liderança industrial e tecnológica global. Nível de suporte em ${asset.currency} ${supportLevel} e resistência técnica em ${asset.currency} ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Alta liquidez institucional durante o pregão asiático.',
        correlation: 'Sensibilidade à política monetária do Banco do Japão, estímulos asiáticos e paridade cambial.',
        strengths: [
          'Escala dominante em semicondutores, manufatura avançada, bancos ou recursos naturais.',
          'Estrutura financeira sólida e forte geração de receitas em divisas fortes.',
        ],
        risks: [
          'Exposição a tarifas comerciais internacionais e oscilações de iene, won e dólar de Hong Kong.',
          'Ciclos globais de investimento industrial e tecnológico.',
        ],
      },
    };
  }

  // 3. World Indices
  if (asset.category === 'indices') {
    const isBr = asset.symbol === 'IBOVESPA';
    if (lang === 'en') {
      return {
        ticker: isBr ? 'IBOV' : asset.symbol.replace(/\s+/g, ''),
        marketOrigin: isBr ? 'B3 - Brasil, Bolsa, Balcão (São Paulo)' : 'Global Capital Markets',
        tags: isBr
          ? ['Latin America', 'Indices', '#Brazil', '#B3', '#Benchmark']
          : ['Global Indices', '#WallStreet', '#Europe', '#Asia', '#Benchmark'],
        description: `${localizedName} is the primary equity-market barometer in its region, composed of the largest and most liquid listed companies and serving as a mandatory institutional benchmark for global funds.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: isBr ? '8.9x' : '23.4x',
        dividendYieldDisplay: isBr ? '6.8%' : '1.8%',
        institutionalProfile: {
          nature: 'Market-Cap / Liquidity Weighted Equity Index',
          sector: 'Broad Capital Markets',
          segment: 'Benchmark Basket of Constituents',
          benchmark: 'Regional Risk-Free Rate',
          governance: 'Official Quarterly / Semi-Annual Rebalancing Methodology',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} reflects global risk appetite and central bank monetary policy expectations. Immediate support sits at ${asset.currency === 'BRL' ? 'R$' : '$'} ${supportLevel} and resistance at ${asset.currency === 'BRL' ? 'R$' : '$'} ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Maximum depth via index futures contracts and tracked ETFs.',
          correlation: 'Direct sensitivity to sovereign yields and inflation prints (CPI / IPCA).',
          strengths: [
            'Broad sector diversification mitigating single-company idiosyncratic risk.',
            'Preferred macro allocation vehicle for international institutional managers.',
          ],
          risks: [
            'Exposure to global GDP slowdowns and sovereign debt liquidity shocks.',
            'Weighted concentration in the largest index constituents.',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: isBr ? 'IBOV' : asset.symbol.replace(/\s+/g, ''),
        marketOrigin: isBr ? 'B3 - Brasil, Bolsa, Balcão (São Paulo)' : 'Mercados Globales de Capitales',
        tags: isBr
          ? ['América Latina', 'Índices', '#Brasil', '#B3', '#ÍndiceDeReferencia']
          : ['Índices Globales', '#WallStreet', '#Europa', '#Asia', '#Benchmark'],
        description: `${localizedName} es el principal termómetro del desempeño accionario de su región, integrado por las compañías de mayor capitalización y liquidez como referencia institucional para fondos globales.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: isBr ? '8.9x' : '23.4x',
        dividendYieldDisplay: isBr ? '6.8%' : '1.8%',
        institutionalProfile: {
          nature: 'Índice Bursátil Ponderado por Capitalización / Liquidez',
          sector: 'Mercado de Capitales General',
          segment: 'Canasta de Activos de Referencia',
          benchmark: 'Tasa Libre de Riesgo Regional',
          governance: 'Metodología Oficial de Rebalanceo Trimestral / Semestral',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} refleja el apetito por riesgo global y los ciclos de política monetaria de los bancos centrales. Soporte inmediato en ${asset.currency === 'BRL' ? 'R$' : '$'} ${supportLevel} y resistencia en ${asset.currency === 'BRL' ? 'R$' : '$'} ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Profundidad máxima mediante contratos de futuros y ETFs indexados.',
          correlation: 'Sensibilidad directa a tasas soberanas y datos de inflación (CPI / IPCA).',
          strengths: [
            'Amplia diversificación sectorial que reduce el riesgo específico individual.',
            'Vehículo preferente para asignación macroeconómica de grandes gestores internacionales.',
          ],
          risks: [
            'Exposición a desaceleraciones del PIB global y choques de liquidez en mercados de deuda.',
            'Concentración ponderada en los componentes de mayor peso del índice.',
          ],
        },
      };
    }

    return {
      ticker: isBr ? 'IBOV' : asset.symbol.replace(/\s+/g, ''),
      marketOrigin: isBr ? 'B3 - Brasil, Bolsa, Balcão' : 'Mercados Globais de Capitais',
      tags: isBr
        ? ['América Latina', 'Índices', '#Brasil', '#B3', '#Índice de Referência']
        : ['Índices Globais', '#WallStreet', '#Europa', '#Ásia', '#Benchmark'],
      description: `${asset.name} é o principal termômetro de desempenho do mercado acionário da sua região, composto pelas companhias de maior capitalização e liquidez, servindo como benchmark institucional mandatório para fundos e investidores globais.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: isBr ? '8.9x' : '23.4x',
      dividendYieldDisplay: isBr ? '6.8%' : '1.8%',
      institutionalProfile: {
        nature: 'Índice de Ações Ponderado por Valor de Mercado / Liquidez',
        sector: 'Mercado de Capitais Geral',
        segment: 'Cesta de Ativos de Referência',
        benchmark: 'Taxa Livre de Risco Regional',
        governance: 'Metodologia Oficial de Rebalanceamento Trimestral / Semestral',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} reflete o apetite por risco global e a precificação de ciclos de política monetária dos bancos centrais. Suporte imediato em ${asset.currency === 'BRL' ? 'R$' : '$'} ${supportLevel} e resistência em ${asset.currency === 'BRL' ? 'R$' : '$'} ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Profundidade máxima de liquidez via contratos futuros e ETFs indexados.',
        correlation: 'Sensibilidade direta às taxas de juros soberanas e aos dados de inflação (CPI / IPCA).',
        strengths: [
          'Ampla diversificação setorial reduzindo risco específico de empresas individuais.',
          'Veículo preferencial para alocação macroeconômica por grandes gestores internacionais.',
        ],
        risks: [
          'Exposição a desacelerações do PIB global e choques de liquidez nos mercados de dívida.',
          'Concentração ponderada nos maiores componentes de peso da carteira teórica.',
        ],
      },
    };
  }

  // 4. Forex
  if (asset.category === 'forex') {
    if (lang === 'en') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'Interbank Foreign Exchange Market (Forex)',
        tags: ['Global FX', 'Forex', '#Currencies', '#CentralBanks', '#Liquidity'],
        description:
          'International currency pair quoting the direct exchange parity between two major economies, trading continuously 24/5 with direct impact on foreign trade, remittances, and cross-border investing.',
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: 'N/A',
        dividendYieldDisplay: 'N/A (Carry Trade)',
        institutionalProfile: {
          nature: 'Sovereign Currency Pair (Foreign Exchange)',
          sector: 'Currencies & FX Markets',
          segment: 'Over-The-Counter (OTC) Interbank',
          benchmark: 'Commercial FX / PTAX / Interbank Parity',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} trades in a floating regime driven by interest-rate differentials across major central banks and commercial FX flows. Technical support sits at ${supportLevel} and resistance at ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'World’s deepest financial market (US$ 7.5 trillion daily turnover).',
          correlation: 'High correlation with real interest-rate spreads and sovereign risk (CDS).',
          strengths: [
            'Instant liquidity for commercial and financial currency hedging.',
            'Transparent price discovery grounded in global macroeconomic fundamentals.',
          ],
          risks: [
            'Unscheduled FX interventions by monetary authorities.',
            'Abrupt geopolitical events and terms-of-trade shifts in commodities.',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: asset.symbol,
        marketOrigin: 'Mercado Cambiario Interbancario (Forex)',
        tags: ['Cambio Global', 'Forex', '#Divisas', '#BancosCentrales', '#Liquidez'],
        description:
          'Par cambiario internacional que cotiza la paridad directa entre dos de las mayores economías mundiales, con negociación continua 24h e impacto directo en comercio exterior, remesas e inversiones transfronterizas.',
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: 'N/A',
        dividendYieldDisplay: 'N/A (Carry Trade)',
        institutionalProfile: {
          nature: 'Par Cambiario Soberano (Foreign Exchange)',
          sector: 'Mercado de Monedas y Divisas',
          segment: 'Over-The-Counter (OTC) Interbancario',
          benchmark: 'Dólar Comercial / PTAX / Cambio Interbancario',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} opera en régimen de flotación influenciado por el diferencial de tasas entre las principales autoridades monetarias y flujos comerciales. Soporte técnico en ${supportLevel} y resistencia en ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Mercado de mayor liquidez mundial (US$ 7.5 billones diarios).',
          correlation: 'Alta correlación con tasas reales de interés y riesgo país (CDS).',
          strengths: [
            'Liquidez instantánea para operaciones de cobertura comercial y financiera.',
            'Formación transparente de precios basada en fundamentos macroeconómicos globales.',
          ],
          risks: [
            'Intervenciones cambiarias extraordinarias por parte de bancos centrales.',
            'Eventos geopolíticos abruptos y variaciones en términos de intercambio.',
          ],
        },
      };
    }

    return {
      ticker: asset.symbol,
      marketOrigin: 'Mercado de Câmbio Interbancário (Forex)',
      tags: ['Câmbio Global', 'Forex', '#Moedas', '#BancosCentrais', '#Liquidez'],
      description:
        'Par cambial internacional cotando a paridade de troca direta entre duas das maiores economias mundiais, com negociação contínua 24h e impacto direto no comércio exterior, remessas e investimentos transfronteiriços.',
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: 'N/A',
      dividendYieldDisplay: 'N/A (Carry Trade)',
      institutionalProfile: {
        nature: 'Par Cambial Soberano (Foreign Exchange)',
        sector: 'Mercado de Moedas e Divisas',
        segment: 'Over-The-Counter (OTC) Interbancário',
        benchmark: 'Dólar Comercial / PTAX / Câmbio Interbancário',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} opera em regime de flutuação limpa influenciado pelo diferencial de juros entre as principais autoridades monetárias e fluxo cambial comercial. Níveis de suporte técnico em ${supportLevel} e resistência em ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Mercado de maior liquidez mundial (US$ 7.5 trilhões diários).',
        correlation: 'Alta correlação com taxas de juros reais e risco-país (CDS).',
        strengths: [
          'Liquidez instantânea para operações de hedge comercial e financeiro.',
          'Formação transparente de preço com base em fundamentos macroeconômicos globais.',
        ],
        risks: [
          'Intervenções cambiais extraordinárias por autoridades monetárias.',
          'Eventos geopolíticos abruptos e oscilações nos termos de troca de commodities.',
        ],
      },
    };
  }

  // 5. Crypto
  if (asset.category === 'crypto') {
    if (lang === 'en') {
      return {
        ticker: asset.symbol.split('/')[0],
        marketOrigin: 'Global Crypto Asset Market (24/7 Blockchain)',
        tags: ['Crypto Assets', 'Blockchain', '#Web3', '#Decentralization', '#24/7'],
        description: `${localizedName} is a decentralized digital asset secured by a cryptographic blockchain network operating uninterruptedly 24/7 with transparent programmatic supply.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: 'N/A',
        dividendYieldDisplay: 'N/A (Staking / Yield)',
        institutionalProfile: {
          nature: 'Decentralized Native Digital Asset',
          sector: 'Cryptographic Technology & Decentralized Finance',
          segment: 'Layer 1 / Open Protocol',
          benchmark: 'Bitcoin Dominance (BTC.D) & Hashrate',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} shows accumulation consolidation backed by spot ETF demand and regulated institutional custody. Support sits at US$ ${supportLevel} with resistance at US$ ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: '24/7 global trading across spot venues and perpetual derivatives.',
          correlation: 'Moderate correlation with technology risk assets and Nasdaq.',
          strengths: [
            'Self-custodial ownership transferable globally without intermediaries.',
            'Programmatic mathematical scarcity enforced by decentralized consensus.',
          ],
          risks: [
            'Higher price volatility than traditional equity asset classes.',
            'Regulatory classification shifts across major financial jurisdictions.',
          ],
        },
      };
    }
    if (lang === 'es') {
      return {
        ticker: asset.symbol.split('/')[0],
        marketOrigin: 'Mercado Global de Criptoactivos (Blockchain 24/7)',
        tags: ['Criptoactivos', 'Blockchain', '#Web3', '#Descentralización', '#24/7'],
        description: `${localizedName} es un activo digital descentralizado respaldado por una red blockchain criptográfica con funcionamiento ininterrumpido 24/7 y emisión programática transparente.`,
        week52High,
        week52Low,
        openPrice,
        peRatioDisplay: 'N/A',
        dividendYieldDisplay: 'N/A (Staking / Yield)',
        institutionalProfile: {
          nature: 'Activo Digital Nativo Descentralizado',
          sector: 'Tecnología Criptográfica y Finanzas Descentralizadas',
          segment: 'Layer 1 / Protocolo Abierto',
          benchmark: 'Dominancia de Bitcoin (BTC.D) & Hashrate',
        },
        aiDiagnosis: {
          scenarioSummary: `${asset.symbol} presenta consolidación de acumulación con respaldo institucional de ETFs al contado y custodios regulados. Soporte en US$ ${supportLevel} y resistencia en US$ ${resistanceLevel}.`,
          supportLevel,
          resistanceLevel,
          liquidityAnalysis: 'Negociación global 24/7 con liquidez en spot y derivados perpetuos.',
          correlation: 'Correlación moderada con activos tecnológicos de riesgo y Nasdaq.',
          strengths: [
            'Propiedad autocustodiable transferible globalmente sin intermediarios.',
            'Escasez matemática programada e inmutable por consenso descentralizado.',
          ],
          risks: [
            'Volatilidad de precios superior a la de clases tradicionales de renta variable.',
            'Incertidumbres regulatorias en jurisdicciones emergentes y desarrolladas.',
          ],
        },
      };
    }

    return {
      ticker: asset.symbol.split('/')[0],
      marketOrigin: 'Mercado Global de Criptoativos (Blockchain 24/7)',
      tags: ['Criptoativos', 'Blockchain', '#Web3', '#Descentralização', '#24/7'],
      description: `${asset.name} é um ativo digital descentralizado suportado por rede blockchain criptográfica com funcionamento ininterrupto 24 horas por dia, 7 dias por semana, com oferta programática transparente.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: 'N/A',
      dividendYieldDisplay: 'N/A (Staking / Yield)',
      institutionalProfile: {
        nature: 'Ativo Digital Nativo Descentralizado',
        sector: 'Tecnologia Criptográfica e Finanças Descentralizadas',
        segment: 'Layer 1 / Protocolo Aberto',
        benchmark: 'Bitcoin Dominance (BTC.D) & Hashrate',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} apresenta consolidação de acumulação com suporte institucional formado por ETFs à vista e custodiantes regulados. Suporte em US$ ${supportLevel} e resistência em US$ ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Negociação global 24/7 com liquidez em spot e derivativos perpétuos.',
        correlation: 'Moderada correlação com ativos de risco de tecnologia e Nasdaq.',
        strengths: [
          'Propriedade não confiscável, transferível globalmente sem intermediários.',
          'Escassez matemática programada e imutável pelo protocolo descentralizado.',
        ],
        risks: [
          'Volatilidade de preços superior à de classes tradicionais de renda variável.',
          'Incertezas de classificação regulatória em mercados emergentes.',
        ],
      },
    };
  }

  // 6. Commodities
  if (lang === 'en') {
    return {
      ticker: asset.symbol,
      marketOrigin: 'International Commodity Exchanges (NYMEX / COMEX / ICE)',
      tags: ['Global Commodities', '#RawMaterials', '#Hedge', '#InflationProtection', '#GlobalTrade'],
      description: `${localizedName} is an essential commodity traded internationally on standardized contracts, vital for global industry and sovereign strategic reserves.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: 'N/A',
      dividendYieldDisplay: 'N/A',
      institutionalProfile: {
        nature: 'Standardized Physical / Futures Contract',
        sector: 'Global Goods & Raw Materials',
        segment: 'Energy / Precious Metals / Industrials',
        benchmark: 'CRB Commodity Index',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} responds to global physical supply-and-demand balances, shipping-route geopolitics, and storage costs. Technical support sits at US$ ${supportLevel} and resistance at US$ ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'High liquidity across Chicago and London futures venues.',
        correlation: 'Inverse correlation with the US Dollar Index (DXY) and real Treasury yields.',
        strengths: [
          'Effective inflation hedge and protection against supply shocks.',
          'Inelastic physical demand embedded in global energy and industrial production.',
        ],
        risks: [
          'Sensitivity to production quota announcements (e.g., OPEC+) and manufacturing slowdowns.',
          'Futures contract roll costs across contango and backwardation regimes.',
        ],
      },
    };
  }
  if (lang === 'es') {
    return {
      ticker: asset.symbol,
      marketOrigin: 'Bolsas Internacionales de Mercancías (NYMEX / COMEX / ICE)',
      tags: ['Materias Primas', '#Commodities', '#Cobertura', '#Protección', '#ComercioMundial'],
      description: `${localizedName} es una materia prima esencial negociada internacionalmente mediante contratos estandarizados, clave para la industria global y reservas estratégicas.`,
      week52High,
      week52Low,
      openPrice,
      peRatioDisplay: 'N/A',
      dividendYieldDisplay: 'N/A',
      institutionalProfile: {
        nature: 'Contrato Físico / Futuro Estandarizado',
        sector: 'Mercancías y Materias Primas Globales',
        segment: 'Energía / Metales Preciosos / Industriales',
        benchmark: 'Índice CRB de Commodities',
      },
      aiDiagnosis: {
        scenarioSummary: `${asset.symbol} responde a la dinámica global de oferta y demanda física, tensiones geopolíticas en rutas logísticas y costos de almacenamiento. Soporte técnico en US$ ${supportLevel} y resistencia en US$ ${resistanceLevel}.`,
        supportLevel,
        resistanceLevel,
        liquidityAnalysis: 'Elevada liquidez en los mercados de futuros de Chicago y Londres.',
        correlation: 'Correlación inversa con el índice del Dólar (DXY) y tasas reales de los Treasuries.',
        strengths: [
          'Excelente instrumento de cobertura (hedge) contra inflación y choques de oferta.',
          'Demanda física inelástica en la matriz energética y productiva mundial.',
        ],
        risks: [
          'Sensibilidad a decisiones de cuotas de producción (ej. OPEP+) y desaceleración industrial.',
          'Costos de renovación de contratos de futuros (contango y backwardation).',
        ],
      },
    };
  }

  return {
    ticker: asset.symbol,
    marketOrigin: 'Bolsas Internacionais de Mercadorias (NYMEX / COMEX / ICE)',
    tags: ['Commodities Globais', '#MatériasPrimas', '#Hedge', '#Proteção', '#ComércioMundial'],
    description: `${asset.name} é uma commodity essencial negociada internacionalmente com contratos padronizados, essencial para a indústria e reserva estratégica soberana.`,
    week52High,
    week52Low,
    openPrice,
    peRatioDisplay: 'N/A',
    dividendYieldDisplay: 'N/A',
    institutionalProfile: {
      nature: 'Contrato Físico / Futuro Padronizado',
      sector: 'Mercadorias e Matérias-Primas Globais',
      segment: 'Energia / Metais Preciosos / Industriais',
      benchmark: 'Índice CRB de Commodities',
    },
    aiDiagnosis: {
      scenarioSummary: `${asset.symbol} responde à dinâmica de oferta e demanda física global, tensões geopolíticas em rotas de escoamento e custos de estocagem. Suporte técnico em US$ ${supportLevel} e resistência em US$ ${resistanceLevel}.`,
      supportLevel,
      resistanceLevel,
      liquidityAnalysis: 'Elevada liquidez nos mercados de futuros de Chicago e Londres.',
      correlation: 'Correlação inversa com o índice do Dólar (DXY) e taxas reais dos Treasuries.',
      strengths: [
        'Excelente instrumento de proteção (hedge) contra inflação e choques de oferta.',
        'Demanda física inelástica com utilização na matriz energética e produtiva mundial.',
      ],
      risks: [
        'Sensibilidade a decisões de cotas de produção (ex: OPEP+) e desaceleração manufatureira.',
        'Custos de rolagem de contratos futuros (contango e backwardation).',
      ],
    },
  };
}
