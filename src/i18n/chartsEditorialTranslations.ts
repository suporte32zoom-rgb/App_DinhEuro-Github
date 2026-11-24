import type { SupportedLanguage } from './translations';

export interface ChartsEditorialGuideSection {
  id: string;
  title: string;
  body: string;
}

export interface ChartsEditorialFaqItem {
  question: string;
  answer: string;
}

export interface ChartsEditorialLocaleContent {
  eyebrow: string;
  title: string;
  intro: string;
  liveStripTitle: string;
  liveStripNote: string;
  selectedAssetLabel: string;
  selectedSupportLabel: string;
  selectedResistanceLabel: string;
  corridorBenchmarksTitle: string;
  sections: ChartsEditorialGuideSection[];
  faqEyebrow: string;
  faqTitle: string;
  faqItems: ChartsEditorialFaqItem[];
  educationalDisclaimer: string;
}

export const CHARTS_EDITORIAL_TRANSLATIONS: Record<
  SupportedLanguage,
  ChartsEditorialLocaleContent
> = {
  pt: {
    eyebrow: 'Guia Técnico & Contexto Macroeconômico',
    title: 'Leitura de Gráficos, Tendências e Eixo União Europeia – Mercosul',
    intro:
      'Este guia auxilia a interpretação dos gráficos interativos, indicadores técnicos e referências carregadas em tempo real nesta página, conectando a leitura de preços e pontos à dinâmica cambial e comercial entre Brasil/Mercosul, Europa e mercados globais.',
    liveStripTitle: 'Referências Reais Carregadas na Tela',
    liveStripNote: 'Valores sincronizados diretamente com o ativo selecionado e os benchmarks ativos da sessão.',
    selectedAssetLabel: 'Ativo em Análise',
    selectedSupportLabel: 'Suporte Imediato',
    selectedResistanceLabel: 'Resistência Técnica',
    corridorBenchmarksTitle: 'Benchmarks do Eixo UE–Mercosul e Global',
    sections: [
      {
        id: 'support-resistance',
        title: 'Suporte, Resistência e Amplitude do Pregão',
        body:
          'Zonas de suporte representam faixas de preço ou pontuação em que o interesse comprador historicamente desacelera quedas, enquanto resistências sinalizam tetos onde a oferta tende a conter avanços no curto prazo. Observar o patamar atual em relação às mínimas e máximas de 24 horas e de 52 semanas ajuda a dimensionar a amplitude do movimento sem pressupor reversões automáticas.',
      },
      {
        id: 'moving-averages',
        title: 'Médias Móveis (SMA 20 e SMA 50) e Direção de Tendência',
        body:
          'As médias móveis simples de curto prazo (SMA 20) e médio prazo (SMA 50) suavizam oscilações pontuais e facilitam a visualização da tendência predominante nos modos Área, Linha ou Candlesticks. Quando a cotação e a média mais curta permanecem acima da média mais longa, a leitura aponta fôlego comprador; o inverso indica pressão de baixa ou consolidação lateral.',
      },
      {
        id: 'volume-liquidity',
        title: 'Volume Negociado e Confirmação de Liquidez',
        body:
          'As barras de volume abaixo da série principal mostram a intensidade das negociações em cada intervalo do período selecionado. Movimentos acompanhados por aumento consistente de volume tendem a refletir maior participação institucional e liquidez efetiva, ao passo que oscilações com giro reduzido exigem cautela adicional na leitura técnica.',
      },
      {
        id: 'eu-mercosur-correlations',
        title: 'Correlações no Eixo União Europeia – Mercosul e Mercados Globais',
        body:
          'Ao acionar o seletor Comparar Ativo no topo do gráfico, é possível sobrepor a variação percentual do ativo principal a referências do Brasil/Mercosul (como IBOVESPA, PETR4 e VALE3), pares cambiais (EUR/BRL e USD/BRL) e índices europeus e globais (como EURO STOXX 50, DAX 40, CAC 40 e S&P 500). Essa comparação evidencia como diferenciais de juros, fluxos comerciais e oscilações de moedas afetam o retorno relativo entre mercados.',
      },
    ],
    faqEyebrow: 'Perguntas Frequentes',
    faqTitle: 'Dúvidas Comuns sobre Leitura de Gráficos e Prazos',
    faqItems: [
      {
        question: 'Como interpretar os diferentes prazos gráficos (1D, 5D, 1M, 6M, YTD, 1A e 5A)?',
        answer:
          'Os prazos curtos (1D e 5D) destacam oscilações intradiárias e comportamento imediato do pregão; intervalos intermediários (1M, 6M e YTD) mostram a formação de tendências e faixas de consolidação; já as janelas longas (1A e 5A) permitem observar ciclos estruturais de juros, câmbio e atividade econômica.',
      },
      {
        question: 'Por que índices como Ibovespa, DAX 40 e S&P 500 são exibidos em pontos (pts)?',
        answer:
          'Índices acionários medem o desempenho agregado de uma carteira teórica ponderada por valor de mercado e liquidez, e não o preço unitário de uma moeda. Por isso, suas variações de pontuação, suportes e resistências são expressos em pontos (pts), preservando a leitura técnica fiel sem conversão cambial direta.',
      },
      {
        question: 'Qual a utilidade de comparar um ativo brasileiro com EUR/BRL ou índices europeus?',
        answer:
          'A comparação percentual permite avaliar se a valorização de um ativo local em reais supera ou fica atrás do desempenho em moedas fortes ou de praças europeias no mesmo intervalo, oferecendo visão mais clara de poder de compra internacional e correlação macroeconômica no corredor UE–Mercosul.',
      },
      {
        question: 'As leituras técnicas e o diagnóstico desta página constituem recomendação de investimento?',
        answer:
          'Não. Todo o terminal gráfico, os níveis de suporte e resistência e os blocos analíticos do DinhEuro possuem caráter estritamente educativo e informativo, baseados exclusivamente nos dados carregados em tela, sem constituir indicação de compra, venda ou consultoria financeira.',
      },
    ],
    educationalDisclaimer:
      'Conteúdo estritamente educativo e informativo • Os níveis apresentados decorrem exclusivamente dos valores reais carregados para o ativo selecionado, sem projeções garantidas ou recomendações operacionais.',
  },
  en: {
    eyebrow: 'Technical Guide & Macroeconomic Context',
    title: 'Reading Charts, Trends, and the European Union – Mercosur Axis',
    intro:
      'This guide helps interpret the interactive charts, technical overlays, and real-time market references loaded on screen, linking price and index-point action to currency and trade dynamics across Brazil/Mercosur, Europe, and global markets.',
    liveStripTitle: 'Live On-Screen Market References',
    liveStripNote: 'Figures synchronized directly with the selected asset and active session benchmarks.',
    selectedAssetLabel: 'Selected Asset',
    selectedSupportLabel: 'Immediate Support',
    selectedResistanceLabel: 'Technical Resistance',
    corridorBenchmarksTitle: 'EU–Mercosur & Global Benchmarks',
    sections: [
      {
        id: 'support-resistance',
        title: 'Support, Resistance, and Session Range',
        body:
          'Support zones highlight price or point areas where buying demand has historically slowed declines, while resistance ceilings mark zones where supply tends to cap short-term advances. Comparing current levels against 24-hour and 52-week highs and lows frames market amplitude without implying guaranteed reversals.',
      },
      {
        id: 'moving-averages',
        title: 'Moving Averages (SMA 20 & SMA 50) and Trend Direction',
        body:
          'Short- and medium-term simple moving averages (SMA 20 and SMA 50) smooth short-lived noise across Area, Line, and Candlestick views. When price and the shorter average hold above the longer average, momentum leans upward; the opposite signals downward pressure or sideways consolidation.',
      },
      {
        id: 'volume-liquidity',
        title: 'Trading Volume and Liquidity Confirmation',
        body:
          'Volume bars beneath the price series reflect trading intensity within each interval of the chosen timeframe. Moves backed by expanding volume generally indicate broader market participation and deeper liquidity, whereas thin-volume swings call for extra caution when interpreting technical breakouts.',
      },
      {
        id: 'eu-mercosur-correlations',
        title: 'EU–Mercosur Axis and Global Market Correlations',
        body:
          'Using the Compare Asset control at the top of the chart lets you overlay percentage performance against Brazil/Mercosur benchmarks (IBOVESPA, PETR4, VALE3), currency pairs (EUR/BRL, USD/BRL), and European or US indices (EURO STOXX 50, DAX 40, CAC 40, S&P 500), illustrating how rate differentials, trade flows, and FX shifts shape relative returns.',
      },
    ],
    faqEyebrow: 'Frequently Asked Questions',
    faqTitle: 'Common Questions on Chart Reading and Timeframes',
    faqItems: [
      {
        question: 'How should I choose between chart timeframes (1D, 5D, 1M, 6M, YTD, 1A, and 5A)?',
        answer:
          'Short timeframes (1D and 5D) focus on intraday fluctuations and immediate session behavior; intermediate windows (1M, 6M, YTD) show trend structure and consolidation ranges; multi-year horizons (1A and 5A) reveal broader interest-rate, currency, and economic cycles.',
      },
      {
        question: 'Why are indices such as Ibovespa, DAX 40, and S&P 500 displayed in points (pts)?',
        answer:
          'Equity indices measure the weighted score of a theoretical basket of constituent stocks rather than a unit currency price. Displaying their levels, support, and resistance in points (pts) keeps technical readings accurate without distorting them with currency symbols.',
      },
      {
        question: 'Why compare a Brazilian or Mercosur asset against EUR/BRL or European indices?',
        answer:
          'Percentage comparison shows whether local gains in BRL outpace or lag major currencies and European benchmarks over the same window, clarifying international purchasing power and macro correlation across the EU–Mercosur corridor.',
      },
      {
        question: 'Do the technical readings and diagnostics on this page constitute investment advice?',
        answer:
          'No. DinhEuro’s charting terminal, support/resistance levels, and analytical summaries are strictly educational and informational, derived from live screen data without buy/sell recommendations or personalized financial advice.',
      },
    ],
    educationalDisclaimer:
      'Strictly educational and informational content • Displayed levels are computed solely from live figures loaded for the selected asset, with no guaranteed projections or trading advice.',
  },
  es: {
    eyebrow: 'Guía Técnica & Contexto Macroeconómico',
    title: 'Lectura de Gráficos, Tendencias y Eje Unión Europea – Mercosur',
    intro:
      'Esta guía ayuda a interpretar los gráficos interactivos, indicadores técnicos y referencias cargadas en tiempo real en esta página, conectando la lectura de precios y puntos con la dinámica cambiaria y comercial entre Brasil/Mercosur, Europa y mercados globales.',
    liveStripTitle: 'Referencias Reales Cargadas en Pantalla',
    liveStripNote: 'Valores sincronizados directamente con el activo seleccionado y los benchmarks activos de la sesión.',
    selectedAssetLabel: 'Activo en Análisis',
    selectedSupportLabel: 'Soporte Inmediato',
    selectedResistanceLabel: 'Resistencia Técnica',
    corridorBenchmarksTitle: 'Benchmarks del Eje UE–Mercosur y Global',
    sections: [
      {
        id: 'support-resistance',
        title: 'Soporte, Resistencia y Amplitud de la Sesión',
        body:
          'Las zonas de soporte señalan niveles de precio o puntuación donde la demanda compradora tiende a frenar caídas, mientras las resistencias marcan techos donde la oferta suele contener avances de corto plazo. Observar el nivel actual frente a los extremos de 24 horas y 52 semanas contextualiza la amplitud sin asumir giros garantizados.',
      },
      {
        id: 'moving-averages',
        title: 'Medias Móviles (SMA 20 y SMA 50) y Dirección de Tendencia',
        body:
          'Las medias móviles simples de corto plazo (SMA 20) y mediano plazo (SMA 50) suavizan el ruido puntual en los modos Área, Línea o Velas Japonesas. Cuando el precio y la media corta se mantienen sobre la media larga, prevalece sesgo alcista; lo contrario sugiere presión bajista o consolidación lateral.',
      },
      {
        id: 'volume-liquidity',
        title: 'Volumen Negociado y Confirmación de Liquidez',
        body:
          'Las barras de volumen bajo la serie principal reflejan la intensidad de negociación en cada tramo del período elegido. Los movimientos respaldados por mayor volumen suelen indicar participación institucional y liquidez real, mientras las variaciones con bajo giro exigen mayor cautela técnica.',
      },
      {
        id: 'eu-mercosur-correlations',
        title: 'Correlaciones en el Eje Unión Europea – Mercosur y Mercados Globales',
        body:
          'Al usar el selector Comparar Activo en la parte superior del gráfico, es posible superponer la variación porcentual frente a referentes de Brasil/Mercosur (IBOVESPA, PETR4, VALE3), pares cambiarios (EUR/BRL, USD/BRL) e índices europeos y globales (EURO STOXX 50, DAX 40, CAC 40 y S&P 500), mostrando cómo tasas, comercio y divisas influyen en el desempeño relativo.',
      },
    ],
    faqEyebrow: 'Preguntas Frecuentes',
    faqTitle: 'Dudas Frecuentes sobre Lectura de Gráficos y Plazos',
    faqItems: [
      {
        question: '¿Cómo elegir entre los plazos gráficos (1D, 5D, 1M, 6M, YTD, 1A y 5A)?',
        answer:
          'Los plazos cortos (1D y 5D) muestran oscilaciones intradiarias y el pulso inmediato de la sesión; las ventanas intermedias (1M, 6M y YTD) destacan tendencias y rangos de consolidación; y los horizontes largos (1A y 5A) revelan ciclos estructurales de tasas, cambio y actividad económica.',
      },
      {
        question: '¿Por qué índices como Ibovespa, DAX 40 y S&P 500 se muestran en puntos (pts)?',
        answer:
          'Los índices bursátiles miden el puntaje ponderado de una canasta teórica de acciones por capitalización y liquidez, y no el precio unitario de una divisa. Expresarlos en puntos (pts) mantiene una lectura técnica precisa sin símbolos monetarios impropios.',
      },
      {
        question: '¿Para qué comparar un activo brasileño o del Mercosur con EUR/BRL o índices europeos?',
        answer:
          'La comparación porcentual revela si el desempeño local en reales supera o queda por detrás de divisas fuertes y plazas europeas en el mismo intervalo, aportando claridad sobre poder adquisitivo internacional y correlación macroeconómica en el eje UE–Mercosur.',
      },
      {
        question: '¿Las lecturas técnicas y el diagnóstico de esta página son recomendación de inversión?',
        answer:
          'No. El terminal gráfico, los niveles de soporte y resistencia y los textos analíticos de DinhEuro tienen fines estrictamente educativos e informativos sobre los datos reales cargados en pantalla, sin constituir asesoría financiera ni recomendación de compra o venta.',
      },
    ],
    educationalDisclaimer:
      'Contenido estrictamente educativo e informativo • Los niveles mostrados derivan únicamente de los datos reales cargados para el activo seleccionado, sin proyecciones garantizadas ni recomendaciones operativas.',
  },
};
