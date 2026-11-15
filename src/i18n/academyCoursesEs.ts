import type { AcademyCourse, AcademyFaqItem } from '../data/academyCourses';

export const ACADEMY_COURSES_ES: Record<
  string,
  Pick<AcademyCourse, 'title' | 'shortTitle' | 'duration' | 'description' | 'shortDescription' | 'objective'> & {
    modules: Array<{
      id: string;
      title: string;
      duration: string;
      summary: string;
      paragraphs: string[];
      numericExample: {
        title: string;
        scenario: string;
        steps: string[];
        result: string;
      };
      keyConcepts: Array<{ term: string; explanation: string }>;
      targetButtonLabel: string;
      targetDescription: string;
    }>;
  }
> = {
  'renda-fixa-tesouro': {
    title: 'Fundamentos de Renta Fija & Bonos Soberanos',
    shortTitle: 'Renta Fija & Bonos',
    duration: '1h 20min',
    description:
      'Domine la relación entre Selic, CDI e IPCA, comprenda la valoración a mercado en bonos públicos y compare CDB, LCI y LCA según su rentabilidad neta real.',
    shortDescription:
      'Selic, CDI, IPCA, valoración a mercado y comparación de títulos públicos y bancarios netos de impuestos.',
    objective:
      'Construir una reserva de liquidez sólida y una cartera de intereses reales con control de vencimientos.',
    modules: [
      {
        id: 'rf-m1',
        title: 'Selic, CDI e IPCA: Cómo el Interés Real Moldea el Patrimonio',
        duration: '20 min',
        summary:
          'Comprenda la diferencia entre rentabilidad nominal e interés real descontada la inflación oficial.',
        paragraphs: [
          'Toda decisión en renta fija comienza distinguiendo entre tasa nominal e interés real. La tasa nominal es el porcentaje anunciado por el título (por ejemplo, 13,75% anual en la Selic), mientras que el interés real mide cuánto gana efectivamente su dinero por encima de la inflación (IPCA).',
          'En Brasil, el Copom define la meta de la tasa Selic para controlar el nivel de precios. El CDI acompaña de cerca a la Selic (históricamente unos 0,10 puntos porcentuales por debajo) y sirve de índice de referencia para CDBs, LCIs, LCAs y fondos DI.',
          'Para evaluar si una inversión preserva el poder adquisitivo, nunca basta con restar la inflación a la tasa nominal: el cálculo exacto utiliza la ecuación de Fisher, dividiendo los factores acumulados en 12 meses.',
        ],
        numericExample: {
          title: 'Cálculo de Interés Real (Ecuación de Fisher)',
          scenario:
            'Inversión de R$ 50.000,00 al 13,75% anual (Selic) en un año con inflación IPCA proyectada de 5,22% anual.',
          steps: [
            'Factor nominal bruto: 1 + 0,1375 = 1,1375',
            'Rentabilidad neta tras impuesto del 17,5% (361 a 720 días): 13,75% × (1 - 0,175) = 11,34% anual → factor 1,1134',
            'Factor de inflación (IPCA): 1 + 0,0522 = 1,0522',
            'Interés real neto = (1,1134 ÷ 1,0522) - 1 = 0,05816',
          ],
          result:
            'Ganancia real neta de +5,82% por encima de la inflación (equivalente a R$ 2.908,00 de poder adquisitivo adicional en el primer año).',
        },
        keyConcepts: [
          {
            term: 'Tasa Selic Meta',
            explanation:
              'Tasa básica de interés de la economía brasileña definida por el Comité de Política Monetaria (Copom) cada 45 días.',
          },
          {
            term: 'CDI (Certificado de Depósito Interbancario)',
            explanation:
              'Referencia diaria de préstamos entre bancos; base para el 90% de la renta fija privada posfijada.',
          },
          {
            term: 'Interés Real (Fisher)',
            explanation:
              'Rendimiento efectivo tras descontar impuesto sobre la renta e inflación oficial del período.',
          },
        ],
        targetButtonLabel: 'Probar en Mesa de Renta Fija',
        targetDescription:
          'Compare títulos Selic, Prefijados e IPCA+ con proyección neta en tiempo real.',
      },
      {
        id: 'rf-m2',
        title: 'Tesouro Selic, Prefijado e IPCA+: Valoración a Mercado',
        duration: '22 min',
        summary:
          'Aprenda por qué los bonos largos oscilan antes del vencimiento y cómo la duración genera ganancias o pérdidas anticipadas.',
        paragraphs: [
          'Los títulos públicos de Tesouro Direto se dividen en tres familias: posfijados (Tesouro Selic), prefijados (Tesouro Prefixado) e híbridos ligados a la inflación (Tesouro IPCA+). Solo el Tesouro Selic presenta volatilidad cercana a cero en el rescate diario.',
          'En los papeles prefijados e IPCA+, el precio de mercado varía a diario de forma inversa a la tasa de interés negociada — fenómeno llamado valoración a mercado (Mark-to-Market). Si compra un título a IPCA + 6,50% y la tasa cae a IPCA + 5,50%, el precio unitario (PU) sube de inmediato.',
          'La sensibilidad de un bono ante cambios en los tipos de interés se mide por la Duración. Cuanto mayor sea el plazo restante y menores los cupones intermedios, mayor será la oscilación porcentual del precio.',
        ],
        numericExample: {
          title: 'Impacto de la Valoración a Mercado en Bono IPCA+ Largo',
          scenario:
            'Bono Tesouro IPCA+ con duración de 12 años adquirido a tasa real de 6,50% anual por R$ 10.000,00.',
          steps: [
            'Caída en la tasa real de mercado: de 6,50% a 5,50% (-1,00 punto porcentual)',
            'Aproximación por duración modificada: ΔP ≈ -Duración × ΔTasa',
            'Valorización estimada en el precio unitario: -12 × (-1,00%) = +12,0% de ganancia de capital inmediata',
            'Precio ajustado estimado: R$ 10.000,00 × 1,12 = R$ 11.200,00 (además del devengo acumulado)',
          ],
          result:
            'Si se mantiene hasta el vencimiento, el inversor recibe exactamente la tasa pactada; si se vende antes, liquida al precio de mercado del día.',
        },
        keyConcepts: [
          {
            term: 'Valoración a Mercado (MtM)',
            explanation:
              'Actualización diaria del valor de rescate anticipado de un bono según las tasas futuras negociadas en el mercado.',
          },
          {
            term: 'Duración Modificada',
            explanation:
              'Indicador en años que estima cuánto varía el precio de un título por cada 1% de cambio en los tipos de interés.',
          },
          {
            term: 'Precio Unitario (PU)',
            explanation:
              'Valor financiero de 1 unidad integral del título público negociado en B3 y Tesouro Direto.',
          },
        ],
        targetButtonLabel: 'Simular Valoración y Curva DI',
        targetDescription:
          'Visualice curvas de tipos y precios teóricos de renta fija en Renta Fija & Derivados.',
      },
      {
        id: 'rf-m3',
        title: 'CDB, LCI, LCA y Bonos Corporativos: Comparando Rentabilidad Neta',
        duration: '20 min',
        summary:
          'Calcule la equivalencia fiscal entre papeles exentos (LCI/LCA) y títulos gravados (CDB/Tesoro).',
        paragraphs: [
          'Los títulos emitidos por bancos privados ofrecen cobertura del Fondo Garantizador de Créditos (FGC) hasta R$ 250.000 por documento fiscal e institución, con tope global de R$ 1 millón cada 4 años. Los bonos corporativos no tienen FGC y exigen analizar la calificación crediticia del emisor.',
          'Un error frecuente entre principiantes es comparar directamente el porcentaje bruto del CDI entre un CDB y una LCI o LCA. Mientras el CDB sufre retención fiscal regresiva (22,5% hasta 180 días; 20% de 181 a 360 días; 17,5% de 361 a 720 días; 15% sobre 720 días), las LCI y LCA están exentas para personas físicas.',
          'Para decidir racionalmente entre dos títulos de riesgo y plazo equivalentes, multiplique la tasa del CDB por (1 - alícuota fiscal) y compárela con el porcentaje neto de la LCI/LCA.',
        ],
        numericExample: {
          title: 'Equivalencia LCI 92% CDI vs CDB 112% CDI',
          scenario:
            'Inversión de R$ 20.000,00 a 24 meses (retención del 15% para el CDB; CDI base 13,65% anual).',
          steps: [
            'CDB 112% del CDI bruto: 112% × 13,65% = 15,29% anual bruto',
            'Descuento del impuesto (15%): 15,29% × 0,85 = 12,99% anual neto (o 95,2% neto del CDI)',
            'LCI 92% del CDI exenta: 92% × 13,65% = 12,56% anual neto',
            'Comparación directa equivalente: LCI 92% CDI equivale a un CDB de 92% ÷ 0,85 = 108,24% del CDI',
          ],
          result:
            'En este plazo de 24 meses, el CDB al 112% del CDI entrega un retorno neto superior al de la LCI al 92% del CDI.',
        },
        keyConcepts: [
          {
            term: 'Tabla Regresiva Fiscal',
            explanation:
              'La alícuota sobre rendimientos baja según el plazo: 22,5% (≤180d), 20% (181–360d), 17,5% (361–720d) y 15% (>720d).',
          },
          {
            term: 'FGC (Fondo Garantizador de Créditos)',
            explanation:
              'Mecanismo privado que cubre depósitos, CDBs, LCIs y LCAs hasta R$ 250 mil por institución y titular.',
          },
          {
            term: 'Gross-Up Fiscal',
            explanation:
              'División de la tasa exenta entre (1 - impuesto) para hallar qué tasa bruta equivalente tendría que pagar un CDB.',
          },
        ],
        targetButtonLabel: 'Calcular en Interés Compuesto',
        targetDescription:
          'Proyecte la acumulación patrimonial a largo plazo aplicando la tasa neta calculada.',
      },
      {
        id: 'rf-m4',
        title: 'Reserva de Emergencia y Escalera de Vencimientos (Bond Ladder)',
        duration: '18 min',
        summary:
          'Estructure liquidez inmediata sin sacrificar rentabilidad usando vencimientos escalonados.',
        paragraphs: [
          'La reserva de emergencia debe mantenerse exclusivamente en activos de liquidez diaria (D+0 o D+1) y riesgo soberano o bancario de primera línea, como Tesouro Selic o CDBs de bancos sólidos al 100% del CDI con rescate inmediato. Su función no es maximizar retorno, sino evitar vender activos volátiles con pérdidas en crisis.',
          'Para metas de mediano y largo plazo, la técnica institucional de la escalera de vencimientos (Bond Ladder) distribuye el capital entre títulos que vencen en ventanas sucesivas (por ejemplo, 1, 2, 3 y 5 años).',
          'A medida que cada peldaño vence, el capital y los intereses se reinvierten en el plazo más largo de la escalera o se utilizan según necesidad, reduciendo el riesgo de reinversión y suavizando vaivenes en la curva de tipos.',
        ],
        numericExample: {
          title: 'Asignación en Reserva + Escalera de 4 Peldaños',
          scenario:
            'Patrimonio en renta fija de R$ 100.000,00 con gasto mensual de R$ 5.000,00.',
          steps: [
            'Capa 1 — Reserva de Emergencia (6 meses de gastos): R$ 30.000,00 en Tesouro Selic (liquidez inmediata)',
            'Capa 2 — Escalera de 4 peldaños con R$ 70.000,00 restantes (R$ 17.500,00 por vencimiento):',
            'Peldaño 1 año: CDB 105% CDI | 2 años: LCI 94% CDI | 3 años: IPCA+ 6,4% | 5 años: IPCA+ 6,6%',
            'Cada 12 meses, R$ 17.500,00 + intereses quedan disponibles sin riesgo de rescate anticipado con descuento.',
          ],
          result:
            'La estructura combina R$ 30 mil en liquidez inmediata y R$ 70 mil capitalizando intereses reales sin exposición forzada a mercado.',
        },
        keyConcepts: [
          {
            term: 'Liquidez D+0 / D+1',
            explanation:
              'Plazo en días hábiles entre la solicitud de rescate y el abono efectivo del dinero en cuenta.',
          },
          {
            term: 'Bond Ladder (Escalera de Bonos)',
            explanation:
              'Distribución escalonada de vencimientos para equilibrar liquidez periódica y captura de tasas largas.',
          },
          {
            term: 'Riesgo de Reinversión',
            explanation:
              'Posibilidad de que los tipos hayan bajado cuando un bono vence y el capital deba reinvertirse.',
          },
        ],
        targetButtonLabel: 'Simular en Renta Fija',
        targetDescription:
          'Explore vencimientos, indexadores y sensibilidad a tasas en la herramienta dedicada.',
      },
    ],
  },
  'cambio-dolar-protecao': {
    title: 'Mercado de Cambio, Dólar & Protección Internacional',
    shortTitle: 'Cambio, Dólar & Protección',
    duration: '1h 35min',
    description:
      'Comprenda el funcionamiento del cambio comercial, cruces EUR/USD y USD/BRL, impacto de spreads e impuestos, además de estrategias graduales en divisa fuerte.',
    shortDescription:
      'Cambio comercial vs turismo, cruces EUR/USD y USD/BRL, IOF, spread y compra escalonada.',
    objective:
      'Proteger poder adquisitivo internacional reduciendo costos operativos en remesas y conversiones.',
    modules: [
      {
        id: 'fx-m1',
        title: 'Cambio Comercial vs Turismo, Spread Bancario e IOF',
        duration: '22 min',
        summary:
          'Descubra por qué el cambio en ventanilla cuesta mucho más que la tasa interbancaria y cómo calcular el VET.',
        paragraphs: [
          'El mercado cambiario distingue el cambio comercial (referencia interbancaria usada en comercio exterior e inversiones globales) del cambio turismo (billete físico sujeto a logística, custodia y márgenes superiores).',
          'Además de la cotización comercial spot/PTAX, toda conversión minorista incorpora dos componentes clave: el spread cobrado por la entidad (de 0,3% en brókeres globales hasta 5,5% en banca tradicional) y el impuesto cambiario (IOF).',
          'Por ello, el único criterio válido para comparar plataformas es el Valor Efectivo Total (VET), que refleja cuánto paga realmente por cada dólar o euro tras sumar tasa, spread e impuestos.',
        ],
        numericExample: {
          title: 'Comparación de Envío de US$ 2.000,00 vía Banco vs Cuenta Global',
          scenario:
            'Dólar comercial spot en R$ 5,5840. Envío de US$ 2.000,00 a cuenta de inversión propia (IOF 1,1%).',
          steps: [
            'Valor comercial puro: 2.000 × R$ 5,5840 = R$ 11.168,00',
            'Escenario A (Spread 1,0% + IOF 1,1%): R$ 11.168,00 × 1,010 × 1,011 = R$ 11.403,76 (VET: R$ 5,7019/US$)',
            'Escenario B (Banco tradicional Spread 4,5% + IOF 1,1%): R$ 11.168,00 × 1,045 × 1,011 = R$ 11.798,94 (VET: R$ 5,8995/US$)',
          ],
          result:
            'Elegir la infraestructura eficiente ahorra R$ 395,18 en una sola remesa de US$ 2.000,00 (3,35% menos costo).',
        },
        keyConcepts: [
          {
            term: 'VET (Valor Efectivo Total)',
            explanation:
              'Costo final real por unidad de divisa extranjera incluyendo tipo de cambio, spread e impuestos.',
          },
          {
            term: 'PTAX (Banco Central)',
            explanation:
              'Tasa media ponderada publicada por el Banco Central a partir de 4 ventanas de consulta a operadores.',
          },
          {
            term: 'Spread Cambiario',
            explanation:
              'Margen porcentual cobrado por el bróker o banco por encima del precio interbancario de mercado.',
          },
        ],
        targetButtonLabel: 'Abrir Calculadora de Cambio',
        targetDescription:
          'Simule cotizaciones interbancarias globales en tiempo real con cálculo de Spread e IOF.',
      },
      {
        id: 'fx-m2',
        title: 'Cruces Cambiarios (EUR/USD, USD/BRL) y Diferencial de Tasas',
        duration: '25 min',
        summary:
          'Comprenda cómo el Euro frente al Real refleja tanto la fuerza global del Dólar como la prima de riesgo local.',
        paragraphs: [
          'La cotización del Euro en Reales (EUR/BRL) no se mueve aislada: es matemáticamente el producto entre el Dólar en Brasil (USD/BRL) y la paridad internacional Euro-Dólar (EUR/USD).',
          'Cuando datos de inflación o empleo fortalecen al Dólar globalmente, el par EUR/USD baja y el USD/BRL suele subir. Entender este doble engranaje evita errores al seguir el mercado europeo.',
          'Otro motor estructural es el diferencial de tipos de interés (Carry Trade). Cuando las tasas locales ofrecen una prima amplia sobre EE. UU. (Fed) y Europa (BCE), los flujos hacia renta fija ayudan a moderar presiones cambiarias.',
        ],
        numericExample: {
          title: 'Descomposición Cruzada EUR/BRL vía USD/BRL y EUR/USD',
          scenario:
            'Sesión con USD/BRL en R$ 5,5840 y EUR/BRL en R$ 6,2335 al cierre interbancario.',
          steps: [
            'Paridad internacional implícita: EUR/USD = EUR/BRL ÷ USD/BRL',
            '6,2335 ÷ 5,5840 = 1,1163 dólares por euro',
            'Si el Euro sube +2% frente al Dólar (EUR/USD a 1,1386) con USD/BRL estable en 5,5840:',
            'Nuevo EUR/BRL proyectado = 5,5840 × 1,1386 = R$ 6,3579 (+2,00%)',
          ],
          result:
            'Incluso sin noticias locales en Brasil, el EUR/BRL oscila proporcionalmente cuando el BCE y la Fed mueven el par EUR/USD.',
        },
        keyConcepts: [
          {
            term: 'Cross Rate (Tasa Cruzada)',
            explanation:
              'Relación cambiaria calculada indirectamente a través de una divisa pivote común (generalmente USD).',
          },
          {
            term: 'Carry Trade',
            explanation:
              'Estrategia que financia en divisas de bajos tipos para invertir en divisas con altos tipos reales.',
          },
          {
            term: 'Índice DXY',
            explanation:
              'Cesta ponderada que mide la fortaleza del Dólar frente a seis divisas fuertes globales (el Euro pesa 57,6%).',
          },
        ],
        targetButtonLabel: 'Convertir Pares en Calculadora',
        targetDescription:
          'Alterne entre EUR, USD, GBP, CHF y BRL en la Calculadora de Cambio Universal en tiempo real.',
      },
      {
        id: 'fx-m3',
        title: 'Dolarización y Euroización Gradual (Precio Medio / DCA)',
        duration: '24 min',
        summary:
          'Sustituya intentar adivinar el piso del dólar por aportes periódicos que suavizan el costo medio.',
        paragraphs: [
          'Intentar predecir el mínimo exacto del tipo de cambio suele paralizar al inversor: cuando baja, espera que caiga más; cuando salta por choques fiscales o geopolíticos, acaba comprando en pánico.',
          'Los gestores patrimoniales aplican el Dollar Cost Averaging (DCA cambiario): dividir el monto planeado en compras periódicas fijas en moneda local. Si la divisa cae, compra más unidades; si sube, compra menos.',
          'Además de optimizar el costo medio ponderado, esta disciplina mantiene el patrimonio en moneda fuerte creciendo de forma constante para viajes, estudios o retiro internacional.',
        ],
        numericExample: {
          title: 'DCA Mensual de R$ 2.500,00 durante 4 Meses de Volatilidad',
          scenario:
            'Aportes fijos de R$ 2.500,00 mensuales con EUR/BRL oscilando entre R$ 6,10, R$ 6,40, R$ 5,95 y R$ 6,25.',
          steps: [
            'Mes 1 (R$ 6,10): R$ 2.500 ÷ 6,10 = € 409,84',
            'Mes 2 (R$ 6,40): R$ 2.500 ÷ 6,40 = € 390,63',
            'Mes 3 (R$ 5,95): R$ 2.500 ÷ 5,95 = € 420,17',
            'Mes 4 (R$ 6,25): R$ 2.500 ÷ 6,25 = € 400,00',
            'Total acumulado: R$ 10.000,00 convertidos en € 1.620,64',
          ],
          result:
            'Precio medio efectivo: R$ 10.000 ÷ € 1.620,64 = R$ 6,1704 por Euro (por debajo de la media simple de R$ 6,1750).',
        },
        keyConcepts: [
          {
            term: 'DCA (Dollar Cost Averaging)',
            explanation:
              'Método de compras periódicas por monto constante para diluir el riesgo de momento cambiario.',
          },
          {
            term: 'Cobertura Patrimonial',
            explanation:
              'Parte de la cartera mantenida en moneda fuerte para proteger poder de consumo global y reducir riesgo-país.',
          },
          {
            term: 'Media Armónica',
            explanation:
              'Propiedad matemática del DCA que sitúa el costo medio por debajo del promedio simple al comprar más unidades en caídas.',
          },
        ],
        targetButtonLabel: 'Registrar Posición en Carteras',
        targetDescription:
          'Siga la diversificación de su cartera entre BRL, USD y EUR en tiempo real.',
      },
      {
        id: 'fx-m4',
        title: 'Cuentas Globales, Brókeres Internacionales y Tributación',
        duration: '24 min',
        summary:
          'Diferencie cuentas multidivisa de consumo frente a brókeres regulados en el exterior con protección SIPC.',
        paragraphs: [
          'Mantener efectivo ocioso en una cuenta internacional protege contra la devaluación local, pero no contra la inflación estadounidense o europea (CPI). Para preservar poder real en dólares o euros, conviene invertir en Treasuries de EE. UU., ETFs irlandeses de acumulación o acciones globales.',
          'Al elegir brókeres internacionales, verifique siempre la regulación (SEC/FINRA en EE. UU., FCA en Reino Unido, BaFin o BCE en la Eurozona) y esquemas de protección como el SIPC (hasta US$ 500 mil en custodia en EE. UU.).',
          'En materia fiscal para inversiones en el exterior, las ganancias realizadas y dividendos suelen requerir control ordenado de remesas, costos de adquisición y declaración anual conforme la normativa vigente (ej. 15% unificado bajo la Ley 14.754 en Brasil).',
        ],
        numericExample: {
          title: 'Impacto de Inflación Externa vs Treasury Corto en USD',
          scenario:
            'US$ 10.000,00 inactivos en cuenta corriente vs invertidos en bonos cortos del Tesoro de EE. UU. al 4,20% anual (CPI 2,6% anual).',
          steps: [
            'Cuenta sin rendimiento tras 3 años: US$ 10.000 nominales, poder real cae a US$ 9.259 (-7,4%)',
            'Títulos cortos al 4,20% anual bruto en 3 años: US$ 10.000 × (1,042)³ = US$ 11.313,66',
            'Impuesto del 15% sobre ganancia nominal de US$ 1.313,66 al rescate: US$ 197,05 → saldo neto US$ 11.116,61',
          ],
          result:
            'La inversión productiva en dólares supera la inflación de EE. UU. y genera US$ 1.116,61 netos sobre el principal.',
        },
        keyConcepts: [
          {
            term: 'SIPC / FDIC',
            explanation:
              'Programas de protección al inversor en EE. UU.: SIPC cubre hasta US$ 500 mil en valores custodiados en brókeres miembros.',
          },
          {
            term: 'US Treasuries / T-Bills',
            explanation:
              'Títulos soberanos emitidos por el Tesoro de EE. UU., referencia global de activo libre de riesgo.',
          },
          {
            term: 'ETFs Irlandeses (UCITS)',
            explanation:
              'Fondos domiciliados en Irlanda que reducen la retención sobre dividendos de EE. UU. del 30% al 15% por tratado fiscal.',
          },
        ],
        targetButtonLabel: 'Comparar Brókeres Globales',
        targetDescription:
          'Consulte el directorio completo de brókeres regulados con enlaces oficiales.',
      },
    ],
  },
  'analise-tecnica-acoes-cripto': {
    title: 'Análisis Técnico, Acciones & Criptoactivos',
    shortTitle: 'Análisis Técnico, Acciones & Cripto',
    duration: '1h 40min',
    description:
      'Combine lectura gráfica profesional (velas japonesas, medias móviles y riesgo/retorno) con múltiplos fundamentales de B3 y Wall Street y gestión de criptoactivos.',
    shortDescription:
      'Velas japonesas, SMA 20/50/200, múltiplos P/U y EV/EBITDA, ciclos cripto y control de riesgo.',
    objective:
      'Seleccionar acciones y criptoactivos con criterio técnico, fundamento sólido y control estricto de pérdida máxima.',
    modules: [
      {
        id: 'at-m1',
        title: 'Lectura de Velas Japonesas, Soportes, Resistencias y Riesgo/Retorno',
        duration: '25 min',
        summary:
          'Interprete la psicología compradora y vendedora en cada vela y estructure asimetrías 1:3.',
        paragraphs: [
          'Cada vela japonesa (candlestick) resume cuatro precios del período: Apertura (Open), Máxima (High), Mínima (Low) y Cierre (Close). El cuerpo refleja la fuerza neta entre compradores y vendedores, mientras las mechas revelan rechazo en los extremos.',
          'Las zonas de soporte concentran demanda capaz de frenar caídas; las resistencias concentran presión vendedora. Cuando una resistencia relevante rompe con volumen superior al promedio, suele invertir su polaridad y actuar como soporte.',
          'Más decisivo que acertar el 80% de las operaciones es mantener una relación Riesgo/Retorno positiva. Con un objetivo 3 veces mayor que el stop loss (asimetría 1:3), incluso un 40% de acierto genera esperanza matemática positiva.',
        ],
        numericExample: {
          title: 'Operación Estructurada con Asimetría 1:3 en Acción B3',
          scenario:
            'El activo rompe resistencia en R$ 36,00 con stop técnico bajo el piso previo en R$ 34,50 y objetivo en R$ 40,50.',
          steps: [
            'Riesgo por acción: R$ 36,00 - R$ 34,50 = R$ 1,50 (4,17% bajo la entrada)',
            'Retorno potencial al objetivo: R$ 40,50 - R$ 36,00 = R$ 4,50 (+12,50%)',
            'Ratio Retorno/Riesgo: R$ 4,50 ÷ R$ 1,50 = 3,0 (3 a 1)',
            'Pérdida máxima aceptada = R$ 600,00 → Tamaño ideal: R$ 600 ÷ R$ 1,50 = 400 acciones',
          ],
          result:
            'Un lote de 400 acciones limita la eventual pérdida a R$ 600,00 exactos mientras proyecta ganancia bruta de R$ 1.800,00.',
        },
        keyConcepts: [
          {
            term: 'OHLC (Open, High, Low, Close)',
            explanation:
              'Los cuatro precios estructurales que forman cada vela japonesa en el intervalo elegido.',
          },
          {
            term: 'Inversión de Polaridad',
            explanation:
              'Fenómeno gráfico donde una resistencia superada pasa a funcionar como nuevo soporte (o viceversa).',
          },
          {
            term: 'Position Sizing (Dimensionamiento)',
            explanation:
              'Cálculo de la cantidad de acciones dividiendo el riesgo máximo aceptado entre la distancia al stop loss.',
          },
        ],
        targetButtonLabel: 'Abrir Terminal Gráfico D3 v7',
        targetDescription:
          'Inspeccione velas, máximos, mínimos y soportes en los activos del catálogo global.',
      },
      {
        id: 'at-m2',
        title: 'Medias Móviles (SMA 20/50/200), Volumen y Tendencia',
        duration: '25 min',
        summary:
          'Use medias móviles para filtrar ruido diario e identificar regímenes alcistas o bajistas institucionales.',
        paragraphs: [
          'Las Medias Móviles Simples (SMA) suavizan el ruido de corto plazo promediando los últimos N cierres. En la práctica profesional, la SMA 20 sigue el impulso corto, la SMA 50 marca la tendencia intermedia y la SMA 200 actúa como frontera institucional entre mercado alcista y bajista.',
          'Cuando la SMA 20 o SMA 50 cruza por encima de la SMA 200 con pendiente positiva (Golden Cross), se refuerza el sesgo alcista. El cruce inverso (Death Cross) alerta deterioro estructural.',
          'Sin embargo, las medias móviles fallan en mercados laterales. Por ello deben combinarse con el volumen financiero: rupturas sin expansión de volumen suelen derivar en falsas rupturas (bull/bear traps).',
        ],
        numericExample: {
          title: 'Filtro de Tendencia con SMA 20 y SMA 50',
          scenario:
            'Acción de Wall Street cotizando a US$ 218,00 con SMA 20 en US$ 212,40, SMA 50 en US$ 204,10 y volumen 45% sobre su media de 20 días.',
          steps: [
            'Alineación alcista: Precio (218,00) > SMA 20 (212,40) > SMA 50 (204,10)',
            'Distancia saludable a la SMA 20: (218,00 - 212,40) ÷ 212,40 = +2,64% (sin sobreextensión)',
            'Un retroceso (pullback) hacia la SMA 20 ofrece entrada con stop técnico debajo de la SMA 50.',
          ],
          result:
            'La alineación ascendente junto a expansión de volumen confirma participación institucional en la tendencia.',
        },
        keyConcepts: [
          {
            term: 'SMA 20 / 50 / 200',
            explanation:
              'Medias Móviles Simples de 20, 50 y 200 sesiones para lectura de tendencia corta, media y larga.',
          },
          {
            term: 'Golden Cross',
            explanation:
              'Cruce alcista de una media corta (como 50 días) por encima de la media larga de 200 días.',
          },
          {
            term: 'Falsa Ruptura',
            explanation:
              'Superación momentánea de resistencia con poco volumen seguida de retorno rápido al rango previo.',
          },
        ],
        targetButtonLabel: 'Graficar SMA 20 y 50',
        targetDescription:
          'Active medias móviles superpuestas y volumen interactivo en el motor gráfico de DinhEuro.',
      },
      {
        id: 'at-m3',
        title: 'Múltiplos Fundamentales (P/U, EV/EBITDA, DY) en B3 y Wall St',
        duration: '25 min',
        summary:
          'Evalúe si una acción está cara o barata comparando beneficios, caja operativa y dividendos.',
        paragraphs: [
          'Mientras el gráfico indica el momento de entrada, los fundamentos explican la calidad y el valor intrínseco del negocio. El múltiplo Precio/Beneficio (P/U o P/L) muestra cuántos años de lucro actual paga el mercado por la compañía.',
          'Para comparar empresas con distinto endeudamiento, los analistas prefieren EV/EBITDA (Valor de Empresa entre beneficio operativo antes de intereses, impuestos, depreciación y amortización), ya que el EV incluye deuda neta.',
          'El Dividend Yield (DY) mide el retorno anual en dividendos sobre el precio actual. Un DY muy alto solo es sostenible si está respaldado por un payout prudente y flujo de caja libre sólido.',
        ],
        numericExample: {
          title: 'Comparativa de Valoración: Valor (B3) vs Crecimiento (EE. UU.)',
          scenario:
            'Acción A (eléctrica B3): R$ 40,00, BPA R$ 5,00, dividendo anual R$ 3,20. Acción B (tecnología EE. UU.): US$ 180,00, BPA US$ 6,00.',
          steps: [
            'P/U Acción A = R$ 40,00 ÷ R$ 5,00 = 8,0x lucros | Earnings Yield = 1 ÷ 8 = 12,5% anual',
            'Dividend Yield Acción A = R$ 3,20 ÷ R$ 40,00 = 8,00% anual | Payout = 3,20 ÷ 5,00 = 64%',
            'P/U Acción B = US$ 180,00 ÷ US$ 6,00 = 30,0x lucros (descuenta fuerte crecimiento futuro de márgenes).',
          ],
          result:
            'La Acción A aporta renta previsible a múltiplo descontado (8x), mientras la Acción B exige crecimiento continuo superior al 20% anual.',
        },
        keyConcepts: [
          {
            term: 'P/U (Precio / Beneficio)',
            explanation:
              'Relación entre precio de la acción y utilidad por acción de 12 meses; inverso del rendimiento implícito sobre ganancias.',
          },
          {
            term: 'EV / EBITDA',
            explanation:
              'Múltiplo que relaciona el valor total de la empresa (incluyendo deuda neta) con su generación operativa de caja.',
          },
          {
            term: 'Payout Ratio',
            explanation:
              'Porcentaje de la utilidad neta distribuido a los accionistas en dividendos.',
          },
        ],
        targetButtonLabel: 'Explorar Acciones B3 y Wall St',
        targetDescription:
          'Consulte múltiplos, Dividend Yield y cotizaciones en tiempo real de las mayores empresas globales.',
      },
      {
        id: 'at-m4',
        title: 'Ciclos de Criptoactivos, Dominancia de Bitcoin y Gestión de Riesgo',
        duration: '25 min',
        summary:
          'Comprenda la liquidez global, el halving y reglas matemáticas de exposición máxima en activos volátiles.',
        paragraphs: [
          'Los criptoactivos operan 24/7 con volatilidad histórica 3 a 5 veces superior a la de los índices bursátiles. Bitcoin actúa como ancla del ecosistema, influido por su emisión decreciente (halvings cada 4 años) y la liquidez global en dólares.',
          'La Dominancia de Bitcoin (BTC.D) mide qué parte de la capitalización total cripto se concentra en BTC. En fases de aversión al riesgo, el capital busca refugio en Bitcoin o stablecoins; en expansiones avanzadas, rota hacia redes como Ethereum y Solana.',
          'En gestión de cartera, el tamaño de posición debe ser inversamente proporcional a la volatilidad: asignar entre 3% y 8% del portafolio captura asimetrías alcistas sin comprometer la estabilidad patrimonial en caídas de -40% a -60%.',
        ],
        numericExample: {
          title: 'Dimensionamiento de Riesgo en Cartera con Exposición Cripto',
          scenario:
            'Cartera total de R$ 100.000,00 asignando 5% (R$ 5.000,00) a Bitcoin y Ethereum con banda de reequilibrio 3%–7%.',
          steps: [
            'Si cripto cae -50%: pérdida sobre cartera total = 5% × (-50%) = -2,50% (R$ 2.500,00)',
            'Si cripto sube +140%: la posición pasa de R$ 5.000,00 a R$ 12.000,00 (11,2% de la cartera)',
            'Reequilibrio disciplinado: toma R$ 4.500,00 de ganancias hacia Renta Fija / ETFs, devolviendo cripto a ~7%.',
          ],
          result:
            'El reequilibrio por bandas convierte la volatilidad cripto en toma sistemática de beneficios bajo riesgo global acotado.',
        },
        keyConcepts: [
          {
            term: 'Dominancia de Bitcoin (BTC.D)',
            explanation:
              'Porcentaje de la capitalización total del mercado cripto representado exclusivamente por Bitcoin.',
          },
          {
            term: 'Halving',
            explanation:
              'Reducción programada del 50% en la recompensa por bloque minado de Bitcoin aproximadamente cada 4 años.',
          },
          {
            term: 'Reequilibrio por Bandas',
            explanation:
              'Regla automática de comprar o realizar ganancias parciales cuando el peso de un activo supera límites fijados.',
          },
        ],
        targetButtonLabel: 'Calcular Lucro e Impuestos Cripto',
        targetDescription:
          'Verifique reglas de exención mensual y cálculo estimado en la herramienta de impuestos.',
      },
    ],
  },
  'fluxo-futuros-opcoes': {
    title: 'Flujo (Tape Reading), Futuros & Opciones',
    shortTitle: 'Flujo, Futuros & Opciones',
    duration: '1h 50min',
    description:
      'Domine la lectura del libro de órdenes (DOM) y agresiones en Times & Trades, apalancamiento y ajuste diario en futuros (WIN/WDO) y estrategias con opciones y griegas.',
    shortDescription:
      'Libro de órdenes (DOM), agresión institucional, contratos futuros WIN/WDO y griegas de opciones.',
    objective:
      'Ejecutar lecturas precisas de microestructura de mercado, gestionar apalancamiento futuro y valorar coberturas con derivados.',
    modules: [
      {
        id: 'fl-m1',
        title: 'Libro de Órdenes (DOM), Times & Trades y Absorción Institucional',
        duration: '28 min',
        summary:
          'Distinga órdenes pasivas en el Book de agresiones reales ejecutadas a mercado en Times & Trades.',
        paragraphs: [
          'El precio de un activo no se mueve solo porque haya muchos lotes en el Libro de Órdenes (DOM — Depth of Market), sino cuando compradores o vendedores agreden la contraparte consumiendo la liquidez disponible.',
          'El Tape Reading cruza dos pantallas en vivo: el DOM, que muestra intención pasiva por nivel de precio, y el Times & Trades (cinta), que registra cada operación ejecutada con hora, volumen, precio y bróker agresor.',
          'Una señal clave de microestructura es la Absorción: cientos de contratos agreden la venta en cierto nivel, pero el precio no logra caer porque un jugador institucional renueva órdenes pasivas ocultas (iceberg) en compra.',
        ],
        numericExample: {
          title: 'Detección de Absorción Compradora en Mini-Dólar (WDO)',
          scenario:
            'WDO cotizando a 5.585,00. El Book muestra solo 40 contratos visibles en compra a 5.584,50 mientras entran ventas agresivas seguidas.',
          steps: [
            'Times & Trades registra 480 contratos vendidos a mercado en 5.584,50 en 18 segundos',
            'Pese al volumen vendedor 12 veces mayor que el lote visible, no rompe 5.584,00',
            'El comprador pasivo recarga inmediatamente el lote tras cada ejecución (orden iceberg)',
            'Acto seguido entran 150 contratos de agresión compradora barriendo 5.585,50 y 5.586,00 sin resistencia.',
          ],
          result:
            'El agotamiento vendedor ante la absorción institucional desplaza el equilibrio de corto plazo y crea entrada con stop corto bajo 5.583,50.',
        },
        keyConcepts: [
          {
            term: 'DOM (Depth of Market)',
            explanation:
              'Mapa vertical de precios que muestra el saldo de ofertas pasivas de compra y venta por nivel.',
          },
          {
            term: 'Agresión de Mercado',
            explanation:
              'Orden ejecutada de inmediato contra la mejor postura contraria en el libro, consumiendo liquidez.',
          },
          {
            term: 'Orden Iceberg (Lote Oculto)',
            explanation:
              'Orden institucional fraccionada que exhibe solo una pequeña parte en el libro para no alertar al mercado.',
          },
        ],
        targetButtonLabel: 'Observar Flujo en Terminal DOM',
        targetDescription:
          'Siga el libro de profundidad dinámico, saldo de agresión y Times & Trades en DinhEuro.',
      },
      {
        id: 'fl-m2',
        title: 'Contratos Futuros (WIN, WDO, S&P): Margen, Punto y Ajuste Diario',
        duration: '28 min',
        summary:
          'Domine la matemática real del apalancamiento en minicontratos y evite la trampa del margen mínimo.',
        paragraphs: [
          'Los futuros de Índice (WIN) y Dólar (WDO) en B3 liquidan mediante ajuste diario en efectivo y exigen solo una fracción del valor nocional como margen de garantía — multiplicando tanto ganancias como pérdidas.',
          'En Mini-Índice (WIN), cada punto vale R$ 0,20 por contrato; en Mini-Dólar (WDO), cada punto equivale a R$ 10,00 (tick mínimo de 0,5 pt = R$ 5,00). Ignorar el valor nocional real es la causa principal de quiebra en cuentas principiantes.',
          'Los operadores consistentes calculan el apalancamiento sobre el capital total asignado, manteniendo margen holgado para soportar oscilaciones normales sin cierre compulsorio por riesgo.',
        ],
        numericExample: {
          title: 'Valor Nocional vs Margen Exigido en 2 Contratos WDO',
          scenario:
            'WDO a 5.584,00 puntos. Cada contrato representa US$ 10.000,00 (10% del contrato lleno).',
          steps: [
            'Valor nocional de 1 contrato WDO: 10.000 × R$ 5,5840 = R$ 55.840,00',
            'Exposición nocional de 2 contratos WDO: R$ 111.680,00',
            'Oscilación adversa de 12 puntos (0,21% en el cambio): 2 × 12 pts × R$ 10,00 = -R$ 240,00',
            'Para limitar el riesgo diario ≤ 2% del capital, la cuenta debe tener al menos R$ 12.000,00 (no solo R$ 300 de margen mínimo).',
          ],
          result:
            'Dimensionar contratos según el nocional y el stop evita que variaciones triviales de 0,2% destruyan una cuenta subcapitalizada.',
        },
        keyConcepts: [
          {
            term: 'Valor Nocional',
            explanation:
              'Monto financiero total representado por el contrato futuro (US$ 10 mil en WDO; 20% de los puntos del Ibovespa en WIN).',
          },
          {
            term: 'Ajuste Diario',
            explanation:
              'Liquidación automática diaria de ganancias y pérdidas al cierre de la sesión sobre posiciones abiertas.',
          },
          {
            term: 'Margen de Garantía',
            explanation:
              'Colateral (bonos, CDB o efectivo) retenido para respaldar el cumplimiento del ajuste diario.',
          },
        ],
        targetButtonLabel: 'Practicar en Terminal Day Trade Pro',
        targetDescription:
          'Pruebe lectura gráfica intradía, boleta rápida y gestión de puntos en Day Trade & Scalping.',
      },
      {
        id: 'fl-m3',
        title: 'Estructura de Opciones: Calls, Puts, Strike y Coberturas',
        duration: '27 min',
        summary:
          'Use opciones como seguro patrimonial (Protective Put) o ingreso extra sobre acciones (Covered Call).',
        paragraphs: [
          'Las opciones son derivados que otorgan al comprador el derecho —no la obligación— de comprar (Call) o vender (Put) un activo subyacente a un precio fijado (Strike) hasta o en el vencimiento, pagando una prima.',
          'La prima se divide en Valor Intrínseco (ganancia inmediata si se ejerciera hoy) y Valor Extrínseco o Valor Tiempo (prima pagada por volatilidad e incertidumbre restante).',
          'En carteras de acciones, la Venta Cubierta (Covered Call) genera prima extra en mercados laterales, mientras la Compra de Put (Protective Put) fija un piso garantizado contra caídas severas.',
        ],
        numericExample: {
          title: 'Seguro de Cartera con Protective Put vs Covered Call',
          scenario:
            'Inversor posee 1.000 acciones de PETR4 a R$ 38,00 (R$ 38.000,00) y evalúa ingreso o cobertura a 30 días.',
          steps: [
            'Estrategia 1 (Covered Call): Vende 1.000 Calls Strike R$ 40,00 cobrando prima R$ 1,10/acción (+R$ 1.100,00 = 2,89% en el mes)',
            'Si cierra en R$ 39,00: conserva acciones + R$ 1.100,00 libres. Sobre R$ 40,00: entrega a R$ 40,00 + R$ 1,10 = R$ 41,10 (+8,16%).',
            'Estrategia 2 (Protective Put): Compra 1.000 Puts Strike R$ 36,00 pagando R$ 0,75/acción (costo R$ 750,00 = 1,97%/mes).',
          ],
          result:
            'Aunque la acción caiga a R$ 28,00 en un choque extremo, la Put garantiza venta a R$ 36,00 protegiendo el capital mínimo.',
        },
        keyConcepts: [
          {
            term: 'Call & Put (Opciones)',
            explanation:
              'Call da derecho de comprar el activo al strike; Put da derecho de vender el activo al strike.',
          },
          {
            term: 'ITM / ATM / OTM',
            explanation:
              'Clasificación respecto al precio spot: Dentro del Dinero (ITM), En el Dinero (ATM) y Fuera del Dinero (OTM).',
          },
          {
            term: 'Covered Call (Venta Cubierta)',
            explanation:
              'Venta de Call respaldada por tenencia del activo subyacente, reduciendo costo medio a cambio de limitar el alza sobre el strike.',
          },
        ],
        targetButtonLabel: 'Simular Payoff en Opciones',
        targetDescription:
          'Calcule Black-Scholes, precio justo y perfil de retorno en Renta Fija & Derivados.',
      },
      {
        id: 'fl-m4',
        title: 'Griegas (Delta, Gamma, Theta, Vega) y Control de Exposición',
        duration: '27 min',
        summary:
          'Comprenda cómo precio del subyacente, paso del tiempo y volatilidad implícita alteran la prima.',
        paragraphs: [
          'Las “Griegas” miden la sensibilidad matemática de la prima de una opción respecto a las variables de Black-Scholes. Sin dominarlas, el operador puede perder dinero incluso acertando la dirección del mercado.',
          'El Delta (0 a 1 en Calls; 0 a -1 en Puts) indica cuánto varía la prima por cada unidad que mueve el activo y aproxima la probabilidad de ejercicio. El Gamma mide la aceleración del Delta cerca del vencimiento.',
          'El Theta representa el desgaste diario del valor temporal en contra del comprador (acelerándose en las últimas 21 ruedas), mientras el Vega mide sensibilidad a la Volatilidad Implícita (IV): comprar opciones tras picos de IV suele resultar caro.',
        ],
        numericExample: {
          title: 'Lectura Integrada de Griegas en una Call ATM',
          scenario:
            'Call Strike R$ 50,00 (spot R$ 50,00) a 20 sesiones, prima R$ 2,20, Delta +0,52, Gamma 0,09, Theta -0,06/día, Vega +0,11.',
          steps: [
            'Si la acción sube R$ 1,00 hoy (a R$ 51,00): la prima sube ~+R$ 0,52 (a ~R$ 2,72) y el Delta sube a ~0,61',
            'Si la acción queda lateral 5 días hábiles: desgaste por Theta ≈ 5 × (-R$ 0,06) = -R$ 0,30 (-13,6% de la prima)',
            'Si la volatilidad implícita cae 4 puntos tras resultados: impacto Vega = -4 × 0,11 = -R$ 0,44.',
          ],
          result:
            'Incluso con leve subida de la acción, una caída brusca de volatilidad (IV Crush) sumada al Theta puede erosionar opciones compradas antes de eventos.',
        },
        keyConcepts: [
          {
            term: 'Delta & Gamma',
            explanation:
              'Delta mide variación de prima por 1 unidad del activo; Gamma mide la aceleración de ese Delta cerca del strike.',
          },
          {
            term: 'Theta (Time Decay)',
            explanation:
              'Desgaste diario del valor extrínseco al acercarse el vencimiento — favorece a vendedores y exige agilidad a compradores.',
          },
          {
            term: 'Vega & Volatilidad Implícita (IV)',
            explanation:
              'Vega mide la sensibilidad de la prima ante cambios en la expectativa de oscilación futura del precio.',
          },
        ],
        targetButtonLabel: 'Calcular Griegas en Black-Scholes',
        targetDescription:
          'Pruebe variar strike, plazo y volatilidad en la calculadora de derivados del portal.',
      },
    ],
  },
};

export const ACADEMY_FAQ_ES: Record<string, Pick<AcademyFaqItem, 'question' | 'answer'>> = {
  'faq-1': {
    question: '¿Los cursos de DinhEuro Academy son realmente 100% gratuitos?',
    answer:
      'Sí. Las 4 rutas y sus 16 módulos completos tienen acceso libre, sin matrícula, suscripciones ni registro obligatorio. El objetivo es democratizar el conocimiento financiero y cambiario con estándar institucional.',
  },
  'faq-2': {
    question: '¿Necesito ver videos externos para seguir las lecciones?',
    answer:
      'No. Todo el contenido está estructurado en formato de lectura interactiva dentro de la plataforma, con explicaciones claras, cálculos numéricos paso a paso, tarjetas de conceptos clave e integración directa con los simuladores del portal.',
  },
  'faq-3': {
    question: '¿Cómo se guarda mi progreso en los módulos?',
    answer:
      'Cuando marca cualquier lección como completada, el historial se guarda localmente en su navegador (vía localStorage), conservando su avance entre visitas sin enviar datos personales a servidores.',
  },
  'faq-4': {
    question: '¿Qué ruta debo elegir si estoy empezando ahora?',
    answer:
      'Recomendamos iniciar por la ruta “Fundamentos de Renta Fija & Bonos Soberanos” (Nivel Principiante) para dominar interés real, valoración a mercado y liquidez, avanzando luego hacia Cambio y Protección Internacional.',
  },
  'faq-5': {
    question: '¿Cómo practicar los cálculos aprendidos en los módulos?',
    answer:
      'Al final de cada módulo hay un acceso contextual directo a la herramienta correspondiente de DinhEuro, incluyendo la Calculadora de Cambio Universal, Simuladores de Interés Compuesto/Impuestos, Terminal Gráfico D3 v7, Flujo DOM y Renta Fija & Derivados.',
  },
  'faq-6': {
    question: '¿El contenido de las rutas constituye recomendación de compra o venta?',
    answer:
      'No. Los materiales de DinhEuro Academy tienen carácter exclusivamente educativo y analítico. Los ejemplos numéricos emplean escenarios didácticos para ilustrar mecánica de mercado, gestión de riesgo y matemática financiera.',
  },
};
