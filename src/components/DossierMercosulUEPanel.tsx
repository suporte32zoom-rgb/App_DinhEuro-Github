import React, { useState } from 'react';
import {
  Globe2,
  BookOpen,
  FileText,
  Scale,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Landmark,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';

interface ChapterBlock {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: { label?: string; text: string }[];
  subBlocks?: { title: string; paragraphs: string[] }[];
}

const CHAPTERS: ChapterBlock[] = [
  {
    id: 'cap-1',
    title: '1. Capítulo de Bens (Compromissos de Desgravação Tarifária)',
    paragraphs: [
      'O capítulo de comércio de bens do Acordo MERCOSUL-União Europeia é uma das áreas centrais do pacto, estruturado para promover maior integração econômica e competitividade entre as economias dos dois blocos. O instrumento contempla um amplo compromisso de liberalização tarifária em setores industriais e agrícolas, respeitando as especificidades de cada mercado e garantindo vantagens significativas para ambas as partes.',
      'No setor agrícola, o acordo representa um avanço importante para as exportações do MERCOSUL, com a União Europeia comprometendo-se a liberalizar 77% das linhas tarifárias do setor, que correspondem a um volume de comércio superior a 80%. Isso inclui acesso preferencial para uma série de produtos brasileiros de alto interesse, como carnes, frutas, grãos e café. Carnes bovinas, por exemplo, terão uma cota de 99 mil toneladas que, hoje sujeitas a tarifas que chegam a superar 100%, terão acesso ao mercado europeu com tarifas reduzidas para níveis competitivos. A carne de aves terá uma cota de 180 mil toneladas com isenção tarifária dentro da quota, enquanto a carne suína contará com 25 mil toneladas sob condições preferenciais. Produtos como açúcar e etanol, fundamentais para o Brasil, também terão tratamento especial: o açúcar contará com uma cota inicial de 180 mil toneladas, enquanto o etanol terá 450 mil toneladas destinadas a usos industriais e 200 mil toneladas para outros usos com tarifas reduzidas progressivamente.',
      'Outros produtos agrícolas igualmente relevantes receberão acesso preferencial ou desgravação total. Entre eles, destacam-se café torrado e solúvel, abacates, melões, limões, melancias, uvas de mesa e crustáceos, muitos dos quais terão tarifas completamente eliminadas em prazos que variam de 4 a 10 anos. Essa abertura reforça a posição do Brasil como um dos maiores fornecedores mundiais de produtos agrícolas e assegura vantagens competitivas no mercado europeu, mesmo em meio às regulamentações rigorosas do bloco.',
      'Já no setor industrial, a União Europeia se comprometeu a eliminar 100% de suas tarifas em até 10 anos, com aproximadamente 80% das linhas tarifárias liberalizadas já na entrada em vigor do acordo. Isso beneficiará diretamente exportadores de bens de alta complexidade tecnológica, como químicos, máquinas, equipamentos médicos e autopeças, setores em que o Brasil busca ampliar sua participação no mercado global. No caso do MERCOSUL, a liberalização será mais gradual, com prazos de até 30 anos para produtos sensíveis, como veículos automotivos baseados em novas tecnologias, garantindo tempo suficiente para que a indústria local se adapte ao aumento da concorrência.',
      'Produtos específicos também foram objeto de negociações detalhadas para assegurar o equilíbrio entre concessões e salvaguardas. Autopeças terão desgravação tarifária em prazos de 7 a 10 anos, enquanto têxteis e calçados serão liberalizados em até 10 anos, com medidas para proteger a produção local durante o período de transição. O setor de metais, por sua vez, contará com 80% de suas exportações livres de tarifas já na entrada em vigor do acordo, com o restante liberalizado em até 10 anos. Esses compromissos refletem o esforço conjunto de fomentar o comércio de bens industriais de maior valor agregado, promovendo inovação e competitividade.',
      'Além disso, o acordo prevê o uso de regimes aduaneiros especiais, como drawback, que permitem a importação temporária de insumos com isenção fiscal, desde que sejam utilizados para a produção de bens exportados. Essa medida, aliada à flexibilidade possível nas regras de origem, promove maior integração das economias locais em cadeias globais de valor, especialmente em setores com forte comércio intrafirma, como automotivo e eletrônico.',
      'Em resumo, o capítulo de comércio de bens oferece um equilíbrio estratégico, ampliando o acesso do MERCOSUL ao mercado europeu, enquanto protege os setores sensíveis da economia local. Com prazos adequados e concessões bem estruturadas, o acordo reforça o papel do MERCOSUL como um parceiro comercial estratégico da União Europeia, garantindo condições favoráveis para produtores agrícolas e industriais, além de fomentar o crescimento econômico sustentável em toda a região.',
    ],
    subBlocks: [
      {
        title: '1.1 Anexo sobre Direitos de Exportação',
        paragraphs: [
          'Mercosul e União Europeia se comprometem a não estabelecer entraves às exportações, com exceções específicas para aplicação de imposto de exportação para determinados produtos.',
        ],
      },
      {
        title: '1.2. Anexo sobre Monopólios',
        paragraphs: [
          'O anexo aborda os monopólios de importação e exportação, e define, no contexto do Acordo, os setores em que o Brasil e outros países do Mercosul podem manter ou designar monopólios, como petróleo, gás, hidrocarbonetos e minerais nucleares.',
        ],
      },
      {
        title: '1.3. Anexo de Vinhos e Destilados',
        paragraphs: [
          'O anexo trata das regras para comércio de vinhos e bebidas alcoólicas entre o Mercosul e a União Europeia, incluindo definições, práticas enológicas, rotulagem e certificação. Ele estabelece padrões alinhados à Organização Internacional da Vinha e do Vinho (OIV), prevendo cooperação, proteção de indicações geográficas e simplificação de certificações.',
        ],
      },
    ],
  },
  {
    id: 'cap-2',
    title: '2. Regras de Origem',
    paragraphs: [
      'O Capítulo sobre Regras de Origem do acordo está alinhado com as melhores práticas internacionais. Além da não alteração, disciplina que permite estabelecer centros de distribuição ao redor do mundo, estão previstas as seguintes inovações no acordo: disciplina sobre materiais fungíveis, jogos e sortidos e materiais neutros.',
      'Em relação à acumulação de origem, a disciplina prevê a acumulação apenas entre os Estados Partes do acordo. Adicionalmente, o texto estabelece 10% de tolerância aos produtos em geral e flexibilidades específicas para produtos têxteis.',
      'Já na seção de prova de origem, destaca-se que o modelo adotado é o da autocertificação, após um período de transição de cinco anos, no qual se poderá utilizar o Certificado de Origem opcionalmente. Na parte de verificação e controle, por seu turno, cumpre apontar que a verificação é conduzida pelo país exportador, com procedimentos rápidos e menos burocráticos, com o fito de preservar um ambiente de negócios justo.',
      'Desta forma, o texto de origem é uma normativa moderna, pautada no princípio de facilitação de comércio, garantindo que os operadores econômicos das Partes sejam os reais beneficiários das preferências negociadas.',
      'Em relação aos requisitos específicos de origem foram negociadas regras para todo o universo tarifário, privilegiando a formação de cadeias regionais de valor e as sensibilidades dos blocos, como em relação à utilização de açúcar originário e a aplicação de salto qualificado (que exclui as peças) para determinadas máquinas.',
      'Maiores informações sobre o Regime de Origem estão disponíveis na Ficha Técnica do Acordo.',
      'Adicionalmente, destaca-se a disponibilização, pela União Europeia, da ferramenta ROSA - Rules of Origin Self-Assessment, integrada ao portal Access2Markets. A ferramenta permite que exportadores e importadores realizem uma autoavaliação do cumprimento das regras de origem aplicáveis a cada produto no âmbito dos acordos comerciais celebrados pela União Europeia, inclusive o acordo com o Mercosul, auxiliando na verificação da elegibilidade para o tratamento tarifário preferencial. Trata-se de importante instrumento de transparência e facilitação de comércio, que contribui para ampliar a utilização das preferências tarifárias negociadas, ao oferecer orientações práticas e acessíveis aos operadores econômicos sobre os requisitos de origem aplicáveis às suas operações.',
    ],
  },
  {
    id: 'cap-3',
    title: '3. Facilitação de Comércio e Cooperação Aduaneira',
    paragraphs: [
      'O capítulo visa a acelerar e reduzir os custos dos processos relacionados à importação e exportação de bens, promovendo maior eficiência ao reduzir a burocracia e aumentar a transparência para os operadores econômicos.',
      'Está prevista a revisão e aprimoramento contínuo de regulamentos e práticas aduaneiras, em diálogo com o setor empresarial. Também se busca adotar o uso de sistemas eletrônicos para simplificar as operações alfandegárias.',
      'Destacam-se, entre as disposições do capítulo, a assunção de compromissos ambiciosos no tratamento de bens perecíveis nas aduanas; a utilização do gerenciamento de risco como forma de evitar discriminação ou restrições disfarçadas no comércio internacional; a simplificação da admissão temporária de bens, como o uso de carnês ATA; a colaboração para o reconhecimento mútuo de Operadores Econômicos Autorizados (OEA); e o estabelecimento de um Comitê para assegurar o funcionamento correto das disposições do capítulo de facilitação.',
      'De acordo com a Organização Mundial do Comércio (OMC), a simplificação e a harmonização de procedimentos alfandegários, como a melhoria na transparência e previsibilidade, podem reduzir os custos do comércio internacional em até 10% para países desenvolvidos e em até 15% para países em desenvolvimento.',
      'O Acordo inclui o Protocolo de Assistência Mútua e Cláusula Antifraude, que aborda a assistência administrativa mútua em matéria aduaneira entre os países do Mercosul e da União Europeia, e define mecanismos de cooperação para combater fraudes, garantir a aplicação correta das legislações aduaneiras e facilitar o comércio legítimo.',
      'Além disso, faz parte do Acordo a Cláusula de Integração Regional, que visa facilitar - entre e dentro das duas regiões, respeitando os processos de integração regional de cada parte - o movimento de',
    ],
    bullets: [
      {
        label: 'Bens',
        text: 'produtos originários do Mercosul que entram na União Europeia terão livre circulação dentro do bloco europeu; produtos europeus importados por um país do Mercosul devem receber tratamento aduaneiro não inferior ao dado a bens de outros países do Mercosul; e procedimentos aduaneiros no Mercosul serão revisados periodicamente para facilitar o comércio e evitar duplicações.',
      },
      {
        label: 'Serviços',
        text: 'esforços para facilitar a liberdade de prestação de serviços entre empresas e indivíduos estabelecidos nas regiões.',
      },
      {
        text: 'A Cláusula também trata de cooperação e harmonização regulatória.',
      },
    ],
  },
  {
    id: 'cap-4',
    title: '4. Barreiras Técnicas Ao Comércio',
    paragraphs: [
      'O capítulo de Barreiras Técnicas ao Comércio (TBT) do Acordo de Parceria entre Mercosul e União Europeia reflete o compromisso de ambos os blocos em facilitar o comércio de bens, promovendo Boas Práticas Regulatórias (BPR) e prevenindo barreiras técnicas desnecessárias. Em alinhamento com compromissos internacionais, como o Acordo TBT da OMC, e com a Estratégia Nacional de Melhoria Regulatória lançada pelo Brasil em 2024, o texto reforça a importância de equilibrar a facilitação do comércio com o direito dos países de regulamentar para atingir objetivos de políticas públicas, como a proteção da saúde humana, animal e vegetal, do meio ambiente, da segurança nacional e dos consumidores.',
      'Entre os compromissos assumidos, destaca-se o uso de padrões internacionais como base para regulamentos técnicos e procedimentos de avaliação da conformidade, salvo em casos em que tais padrões sejam inadequados ou ineficazes para os objetivos legítimos do regulamento. A realização de consultas públicas com prazos adequados, permitindo a participação de stakeholders, e a implementação de análises de impacto regulatório, uma prática que o Brasil vem consolidando há mais de duas décadas por meio do Programa de Fortalecimento da Capacidade Institucional para Gestão em Regulação (PRO-REG), também são elementos fundamentais do acordo. Essas práticas buscam assegurar que as regulamentações sejam proporcionais e baseadas em evidências, promovendo previsibilidade e segurança para os operadores econômicos.',
      'O Acordo reconhece como referência entidades internacionais como a International Organization for Standardization (ISO), a International Electrotechnical Commission (IEC), a International Telecommunications Union (ITU) e o Codex Alimentarius. Isso reflete o alinhamento regulatório do Brasil, que já adota normas dessas organizações em suas regulamentações técnicas. Além disso, incentiva-se a harmonização de regulamentos entre os blocos e o fortalecimento de capacidades técnicas, promovendo maior integração regulatória e redução de custos para o comércio.',
      'No que diz respeito aos procedimentos de avaliação da conformidade, o capítulo aborda os diferentes modelos adotados pelas partes: no Brasil, predominam certificações emitidas por organismos independentes, enquanto na União Europeia prevalece o sistema de declarações de conformidade do fornecedor. O Acordo estabelece que certificados emitidos por uma das partes poderão ser aceitos pela outra, respeitando os requisitos legais do país importador, podendo incluir a necessidade de acordos entre organismos certificadores. Essa abordagem busca facilitar o reconhecimento mútuo de resultados, preservando a autonomia regulatória de cada bloco.',
      'Adicionalmente, o capítulo promove a transparência por meio da publicação de regulamentos técnicos e informações relevantes para os operadores econômicos, além de fomentar a cooperação técnica e institucional entre as partes. Também prevê a designação de um coordenador TBT para cada bloco, responsável por monitorar a implementação das disposições do acordo, facilitar discussões técnicas e resolver potenciais problemas comerciais, contribuindo para maior eficiência e previsibilidade no comércio bilateral.',
    ],
    subBlocks: [
      {
        title: 'Anexo Automotivo',
        paragraphs: [
          'O anexo automotivo reforça a transparência e consolida a prática já adotada pelo Brasil e demais países do Mercosul de reconhecer como equivalentes os testes realizados com base nos requisitos da Comissão Econômica das Nações Unidas para a Europa (UNECE), mesmo sem serem membros da organização. A União Europeia também poderá reconhecer testes de laboratórios situados no Mercosul que integrem redes acreditadas pela UNECE ou sejam subcontratados, publicando uma lista para transparência. O texto incentiva a instalação de laboratórios no Brasil, promovendo a ampliação da capacidade técnica local.',
        ],
      },
    ],
  },
  {
    id: 'cap-5',
    title: '5. Medidas Sanitárias e Fitossanitárias',
    paragraphs: [
      'O Capítulo SPS estabelece disciplinas que vão além das previstas pela OMC, com o objetivo de facilitar o comércio inter-regional de produtos agropecuários. Para isso, promove princípios como o uso de evidências científicas, a transparência e a previsibilidade no estabelecimento de medidas sanitárias e fitossanitárias, além de trazer maior clareza a procedimentos relacionados a instrumentos como “regionalização” e “pré-listing”.',
      'A implementação do sistema de “pré-listing” visa simplificar e reduzir prazos e custos em processos como inspeção, aprovação e habilitação de estabelecimentos exportadores de produtos de origem animal, como carne bovina, frango, suínos e lácteos. Nesse sistema, cabe ao país exportador atestar o cumprimento dos requisitos sanitários do país importador, incluindo a listagem de estabelecimentos conformes, eliminando a necessidade de inspeção individual. Além disso, o capítulo estabelece prazos fixos e um limite de 60 dias para a emissão de relatórios das missões de inspeção realizadas pelo país importador, etapa essencial para a implementação do “pré-listing”.',
      'O capítulo também detalha e fixa prazos para os procedimentos de “regionalização”, prática respaldada pelo Acordo SPS da OMC. Esse instrumento permite que o país importador reconheça áreas específicas do território do país exportador como livres de pragas ou doenças específicas. Tal prática tem sido um desafio histórico para o Brasil, dada sua dimensão continental. Para abordar divergências e eventuais entraves comerciais decorrentes, foram criados mecanismos de consulta e um subcomitê SPS, ampliando a capacidade de resolução de conflitos.',
      'Por fim, temas relevantes para o agronegócio, como bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana (AMR) e definição de limites máximos de resíduos (LMRs), poderão ser discutidos entre o Mercosul e a União Europeia por meio de mecanismos previstos no capítulo de cooperação, denominados “Diálogos”. Esses instrumentos têm como objetivo fomentar o intercâmbio de informações e a colaboração técnica entre as partes.',
    ],
  },
  {
    id: 'cap-6',
    title: '6. Diálogos',
    paragraphs: [
      'O Capítulo denominado “Diálogos” estabelece mecanismos de cooperação entre o Mercosul e a União Europeia em temas como bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana e segurança alimentar. O objetivo é trocar informações, harmonizar abordagens regulatórias e promover pesquisa colaborativa. Ele cria subcomitês e grupos de trabalho com representantes técnicos de ambas as partes para conduzir discussões e implementar ações. O texto também respeita a autonomia regulatória das partes e protege informações confidenciais.',
    ],
  },
  {
    id: 'cap-7',
    title: '7. Defesa Comercial',
    paragraphs: [
      'O capítulo de defesa comercial reafirma as obrigações contidas nos Acordos da OMC sobre o tema. Nesse sentido, garante o direito de Mercosul e União Europeia adotarem as medidas de defesa comercial previstas pelos referidos Acordos (medidas antidumping, medidas compensatórias e salvaguardas globais) e determina que eventuais disputas sobre defesa comercial sejam submetidas ao sistema de solução de controvérsias da OMC.',
    ],
  },
  {
    id: 'cap-8',
    title: '8. Salvaguardas Bilaterais',
    paragraphs: [
      'O Capítulo de Salvaguardas bilaterais fundamenta-se nas melhores e mais modernas práticas internacionais sobre o tema. O texto garante que as partes possam se proteger de surtos de importação decorrentes do processo de liberalização bilateral que causem ou ameacem causar prejuízo grave às indústrias domésticas. O mecanismo reveste-se de caráter excepcional e pode ser utilizado tanto para produtos industrializados como para produtos agrícolas, com exceção de determinados veículos, aos quais deverão se aplicar as disposições do Anexo X.A do capítulo.',
      'O Capítulo detalha os principais requisitos técnicos a serem observados na investigação que poderá ensejar a aplicação da salvaguarda bilateral, a qual será conduzida, no Brasil, pelo Departamento de Defesa Comercial do MDIC, garantindo-se a ampla defesa e o contraditório de todas as partes interessadas.',
      'Eventuais salvaguardas bilaterais aplicadas poderão vigorar por até dois anos, prorrogáveis por uma vez, por igual período. Para casos críticos, o capítulo prevê a possibilidade de aplicação de medidas de salvaguarda provisórias, por um período de até 200 dias, considerando que eventual demora para a conclusão da investigação poderá levar ao agravamento da situação a indústria doméstica.',
      'O Anexo X.A do capítulo de salvaguardas bilaterais dispõe sobre mecanismo específico para veículos, semelhante às salvaguardas previstas na parte principal do Capítulo, porém com algumas diferenças importantes.',
      'Ao aplicar uma salvaguarda bilateral para veículos, uma parte poderá suspender o cronograma de desgravação de todo o setor ou retomar a alíquota aplicável às demais origens por um período de 3 anos, renovável por mais 2 anos, sem oferecer compensação. Ademais, há previsão de aplicação de medida de salvaguarda provisória, antes da conclusão da investigação, por um período de até 270 dias.',
      'Para que sejam aplicadas as salvaguardas bilaterais para veículos, será necessária a comprovação do dano à indústria doméstica, sob a forma de dano material, ameaça de dano material ou atraso material na implantação da indústria. Para tanto, serão analisados determinados indicadores econômico-financeiros, que abarcam volumes de produção e vendas, nível de emprego, lucratividade e capacidade instalada de produção e seu grau de ocupação.',
      'A previsão de mecanismo específico para o setor automotivo visa a preservar os níveis de investimentos externos no setor e representa instrumento relevante de proteção à indústria local em caso de surto de importações decorrente da entrada em vigor do Acordo.',
    ],
  },
  {
    id: 'cap-9',
    title: '9. Serviços e Investimentos',
    paragraphs: [
      'O tratamento do comércio de serviços e de investimentos no acordo está contido em um só capítulo normativo. O objetivo é ampliar a transparência e a segurança jurídica para prestadores de serviços e investidores realizarem negócios e concretizarem investimentos bilateralmente.',
      'Os dispositivos principais do capítulo normativo estão em linha com as disciplinas da OMC, já adotadas pelos países europeus e sul-americanos.',
      'Além de estabelecer compromissos de tratamento nacional e acesso a mercados, o capítulo define categorias de técnicos e pessoas de negócios que podem exercer temporariamente atividade econômica no território do outro bloco.',
      'Foram acordadas também disciplinas de regulamentação doméstica de serviços, serviços financeiros, telecomunicações, serviços postais e comércio eletrônico.',
    ],
    bullets: [
      {
        label: 'Regulamentação doméstica de serviços',
        text: 'dispositivos visam evitar que exigências de licenças e qualificações estabeleçam restrições disfarçadas ao comércio;',
      },
      {
        label: 'Serviços financeiros',
        text: 'dispositivos resguardam as prerrogativas de autoridades monetárias e reguladores do mercado em adotar medidas prudenciais para manter a estabilidade macroeconômica, proteger correntistas e combater fraudes. Houve entendimento para permitir a transferência de informação financeira para processamento no exterior em condições estabelecidas na jurisdição de origem dos dados.',
      },
      {
        label: 'Telecomunicações',
        text: 'compromissos visam manter marcos regulatórios competitivos no setor, inclusive para evitar práticas anticoncorrenciais de operadoras dominantes.',
      },
      {
        label: 'Serviços postais',
        text: 'cláusulas reconhecem a legitimidade de diferenciar os serviços de correspondência simples, de utilidade pública, e de entrega expressa, para fins comerciais.',
      },
      {
        label: 'Comércio eletrônico',
        text: 'as partes acordaram promover o reconhecimento de documentos e assinaturas eletrônicas, além de trabalhar conjuntamente no combate ao spam e na proteção ao consumidor.',
      },
    ],
    subBlocks: [
      {
        title: 'Listas de Compromissos Específicos',
        paragraphs: [
          'Nas listas de compromissos específicos, os Sócios do Mercosul e a União Europeia realizam compromissos em matéria de tratamento nacional e acesso a mercados, e estabelecem em quais atividades econômicas e em quais condições podem atuar as empresas, investidores e prestadores de serviços da contraparte.',
          'A lista brasileira busca refletir a legislação vigente no país em setores representativos, como telecomunicações, serviços financeiros, construção, engenharia, arquitetura, publicidade, serviços de distribuição, comércio varejista, consultoria e serviços de informática. O Brasil excluiu dos compromissos do acordo setores mais sensíveis e estratégicos para o país, como defesa, saúde, educação, mineração e extração de petróleo.',
        ],
      },
    ],
  },
  {
    id: 'cap-10',
    title: '10. Transações Correntes e Movimentos de Capitais',
    paragraphs: [
      'O Capítulos estabelece regras para a livre movimentação de capitais e pagamentos correntes entre o Mercosul e a União Europeia - permite medidas excepcionais, e caso de dificuldades econômicas ou financeiras, desde que sejam proporcionais, temporárias e consistentes com normas internacionais, como as do FMI, e garante que leis nacionais, como as de insolvência ou combate à lavagem de dinheiro, possam ser aplicadas de forma não discriminatória.',
    ],
  },
  {
    id: 'cap-11',
    title: '11. Compras Governamentais',
    paragraphs: [
      'O Capítulo de Compras Governamentais tem como objetivo promover maior integração econômico-comercial entre Mercosul e União Europeia. O Capítulo conta com um marco normativo e listas de compromissos específicos de cada Sócio do Mercosul e da UE.',
      'No marco normativo, o capítulo estabelece, como regra, compromissos de transparência e igualdade de tratamento para fornecedores estrangeiros entre os países.',
      'Os compromissos acordados garantirão às empresas brasileiras acesso ao mercado de compras públicas da União Europeia. Segundo informações da Revisão de Política Comercial da UE na OMC, o mercado de compras governamentais, excluindo a área de serviços de utilidade pública e o setor defesa, representou 13,7% do PIB do bloco em 2020, alcançando um total de EUR 2,4 bilhões.',
      'Em relação aos possíveis ganhos para as empresas brasileiras, destacam-se, na área de bens, os setores de máquinas e equipamentos e eletroeletrônicos e, na área de serviços, os setores de obras públicas, arquitetura, engenharia, publicidade, serviços de construção e financeiros.',
      'Ao mesmo tempo em que passou a promover a participação de empresas da União Europeia em suas compras públicas, o Brasil garantiu importantes exceções em sua oferta ao bloco. Dentre as políticas públicas que utilizam o poder de compra do Estado para fomento à inovação e ao desenvolvimento econômico e industrial que estão expressamente excluídas da cobertura do acordo estão: adoção de margens de preferência para produtos e serviços nacionais, encomendas tecnológicas, utilização de compensação comercial, compras do Sistema Único de Saúde, políticas de incentivo a Micro e Pequenas Empresas e políticas de apoio a produtores rurais. Além das compras públicas do governo federal, o Brasil incluiu em sua oferta, respeitadas as exclusões, cobertura sobre aquisições de Estados da federação.',
    ],
  },
  {
    id: 'cap-12',
    title: '12. Propriedade Intelectual, incluindo Indicações Geográficas',
    paragraphs: [
      'O Capítulo de Propriedade Intelectual consolida e reafirma padrões internacionais de proteção que orientam a legislação doméstica dos dois blocos. O Capítulo conta com um marco normativo e Anexos referentes à proteção de Indicações Geográficas (IGs).',
      'Estão cobertos pelo acordo temas de direitos de autor, patentes, marcas, desenhos industriais e IGs. Não estão presentes no capítulo temas sensíveis para o Brasil e países do Mercosul como extensão do período de patentes e proteção de dados de testes clínicos. Nestes temas, as partes preservaram os compromissos do Acordo TRIPS.',
      'A principal novidade trazida pelo acordo foram as negociações em relação ao reconhecimento mútuo de indicações geográficas. Com o Acordo, 37 indicações geográficas brasileiras passarão a ser protegidas na UE, reforçando a “Marca Brasil” na Europa. Entre as IGs estão termos que designam produtos icônicos como "Cachaça", queijo "Canastra" e os vinhos e espumantes do "Vale dos Vinhedos". O acordo abre, ainda, a possibilidade de tramitação mais ágil do processo de reconhecimento de novas indicações geográficas brasileiras.',
      'Com relação ao reconhecimento de IGs europeias no Brasil, foram preservados os direitos dos produtores que se utilizavam dos termos de boa fé; garantido aos setores prazo adequado para readequação de produção; e previstas atividades de cooperação em benefício dos produtores afetados. O Mercosul reconheceu ao todo 358 indicações geográficas europeias.',
    ],
  },
  {
    id: 'cap-13',
    title: '13. Pequenas e Médias Empresas',
    paragraphs: [
      'Considerando o papel vital que desempenham na geração de empregos e renda, o Acordo dedica um Capítulo para as Pequenas e Médias Empresas que inclui programas de capacitação e ações para facilitar integração nas cadeias globais de valor, participação em licitações públicas, formação de joint ventures, parcerias, redes empresariais, entre outros.',
    ],
  },
  {
    id: 'cap-14',
    title: '14. Defesa da Concorrência',
    paragraphs: [
      'Mercosul e União Europeia reiteram o compromisso de combater práticas anticompetitivas, em consonância com suas legislações nacionais, assim como estabeleceram as bases para cooperação entre suas autoridades competentes para fortalecer as instituições dedicadas à defesa da concorrência.',
    ],
  },
  {
    id: 'cap-15',
    title: '15. Subsídios',
    paragraphs: [
      'O Capítulo trata das regras para subsídios no contexto do Acordo. Ele permite subsídios para alcançar objetivos de políticas públicas, mas reconhece que alguns podem distorcer mercados e prejudicar a liberalização do comércio.',
      'Prevê cooperação entre as partes para melhorar a transparência, coordenar posições na OMC e trocar informações sobre sistemas de controle de subsídios.',
      'Essas medidas serão revisadas regularmente após a entrada em vigor do acordo.',
    ],
  },
  {
    id: 'cap-16',
    title: '16. Empresas Estatais',
    paragraphs: [
      'O capítulo busca estabelecer um equilíbrio entre a atuação comercial e o papel público das empresas estatais. Ele determina que essas empresas devem, em regra, operar com base em critérios comerciais, promovendo condições mais justas e competitivas no mercado. Contudo, reconhece a importância de sua natureza especial, permitindo que atuem fora dessas bases sempre que necessário para cumprir mandatos ou objetivos de interesse público.',
      'O acordo também garante que as empresas estatais possam continuar desempenhando plenamente os serviços públicos sob sua responsabilidade. No caso do Brasil, as disposições do capítulo se aplicam apenas às empresas estatais federais com faturamento acima de um determinado limite. Além disso, empresas de setores estratégicos, como o de defesa, estão excluídas das regras.',
    ],
  },
  {
    id: 'cap-17',
    title: '17. Comércio e Desenvolvimento Sustentável',
    paragraphs: [
      'O Capítulo de Comércio e Desenvolvimento Sustentável apresenta de maneira abrangente compromissos relacionados ao desenvolvimento sustentável e tem como objetivo melhorar de maneira cooperativa a integração do desenvolvimento sustentável na relação comercial e de investimentos entre Mercosul e UE. O Capítulo conta com um marco normativo e um Anexo.',
      'O Capítulo reconhece os três pilares do desenvolvimento sustentável e reafirma instrumentos multilaterais fundamentais, como a Declaração do Rio e a Agenda 2030 para o Desenvolvimento Sustentável.',
      'Os dispositivos do Capítulo asseguram o direito de cada país de regular aspectos ambientais e trabalhistas em suas legislações domésticas, enfatizando a necessidade de respeitar acordos internacionais e o compromisso de que medidas voltadas para a proteção do meio ambiente ou das condições de trabalho não devem constituir uma discriminação arbitrária ou injustificada ou uma restrição disfarçada ao comércio. Mercosul e UE também devem assegurar que essas medidas sejam baseadas em evidências científicas e técnicas de órgãos reconhecidos e nos padrões internacionais relevantes. O acordo reconhece a possibilidade de adoção de medidas com base no princípio da precaução, respeitadas algumas condições, mas este princípio não pode ser aplicado indevidamente e a medida deve ser revista periodicamente. Há também compromisso com a transparência e a participação pública na elaboração dessas medidas.',
      'Há artigos específicos relacionados a acordos e padrões trabalhistas multilaterais, Acordos Multilaterais Ambientais, comércio e mudança climática, comércio e biodiversidade, comércio e manejo sustentável de florestas, pesca e aquicultura e comércio e manutenção sustentável de cadeias produtivas, com foco na gestão sustentável das cadeias de suprimento.',
      'Os artigos também estabelecem temas para discussão futura e a criação de um subcomitê destinado a monitorar a implementação dos compromissos, promovendo uma abordagem integrada entre comércio e desenvolvimento sustentável. Dentre esses temas, consta a previsão de concessão de tratamento prioritário por parte da União Europeia a produtos do Mercosul que que contribuam para a conservação, a recuperação, a utilização e a gestão sustentáveis das florestas e de outros ecossistemas vulneráveis, nos temos do parágrafo 39 do Anexo 18-A. Com o objetivo de reunir contribuições para a elaboração de uma lista de produtos do Mercosul com essas características, a Secretaria de Comércio Exterior lançou, em agosto de 2026, consulta pública (Circular Secex 73/2026), cujos resultados podem ser acessados aqui.',
      'No Anexo, Mercosul e União Europeia reconhecem que o Acordo é assinado em meio a crises sem precedentes, destacando a urgência de enfrentar desafios ambientais, geopolíticos e comerciais. Com vistas a promover o comércio internacional neste cenário, e ao mesmo tempo contribuir para o alcance do desenvolvimento sustentável, o Anexo inclui dispositivos em cinco áreas:',
    ],
    bullets: [
      {
        label: 'Regimes multilaterais',
        text: 'cooperação na implementação de relevantes acordos multilaterais, como UNFCCC, Acordo de Paris, CBD, CITES, Convenções da OIT, entre outros.',
      },
      {
        label: 'Relação birregional de comércio e investimentos',
        text: 'ações com vistas a desfrutar do potencial do acordo para promoção do desenvolvimento sustentável.',
      },
      {
        label: 'Políticas domésticas',
        text: 'reconhecimento e promoção de abordagens para atingir o desenvolvimento sustentável. Após 1 ano da entrada em vigor do Acordo, será acordada lista de produtos sustentáveis do Mercosul que terão condições melhoradas de acesso a mercado no Bloco Europeu.',
      },
      {
        label: 'Comércio e empoderamento feminino',
        text: 'pela primeira vez um acordo do Mercosul contará com dispositivos sobre o tema, com vistas a cooperação e troca de melhores práticas em políticas que promovam a participação das mulheres no comércio internacional.',
      },
      {
        label: 'Cooperação',
        text: 'ações de cooperação para implementação dos compromissos do Acordo e de outros acordos relevantes para o desenvolvimento sustentável. Mercosul e EU se comprometem ainda a adotar uma abordagem cooperativa em medidas sustentáveis domésticas que impactam o comércio. A UE se compromete a utilizar os dados de autoridades do Mercosul para avaliar a conformidade com a legislação doméstica.',
      },
    ],
    subBlocks: [
      {
        title: 'Painel de Especialistas e Solução Específica',
        paragraphs: [
          'O Capítulo e o Anexo não estão sujeitos ao Capítulo de Solução de Controvérsias do Acordo, prevendo um mecanismo específico de consultas e estabelecimento de um Painel de Especialistas para examinar eventuais desentendimentos a respeito da interpretação ou aplicação dos dispositivos.',
        ],
      },
    ],
  },
  {
    id: 'cap-18',
    title: '18. Transparência',
    paragraphs: [
      'O Capítulo sobre transparência visa promover um ambiente regulatório previsível e eficiente, e inclui:',
    ],
    bullets: [
      {
        label: 'Publicação de Medidas',
        text: 'exige que medidas regulatórias sejam publicadas de forma acessível, preferencialmente online; e prevê a realização de consultas públicas antes da adoção de leis ou regulamentos importantes;',
      },
      {
        label: 'Mecanismos de Consulta',
        text: 'prevê consultas antes da adoção de medidas, possibilitando às Partes apresentar perguntas e comentários sobre medidas regulatórias;',
      },
      {
        label: 'Administração e Revisão',
        text: 'estabelece compromissos que garantem aplicação objetiva e imparcial de regulamentos; e prevê mecanismos de revisão e recurso para decisões administrativas;',
      },
      {
        label: 'Boas Práticas Regulatórias',
        text: 'promove o uso de avaliações de impacto regulatório e revisões periódicas de medidas existentes.',
      },
    ],
  },
  {
    id: 'cap-19',
    title: '19. Exceções',
    paragraphs: [
      'O Capítulo de Exceções prevê a possibilidade das partes adotem medidas necessárias para proteger segurança, saúde, meio ambiente, recursos naturais, patrimônios culturais e cumprir obrigações da ONU, sem que seja considerado violação ao Acordo, desde que não haja discriminação ou restrições disfarçadas ao comércio.',
      'Também garantem que convenções fiscais prevalecem em conflitos com o acordo, assim como medidas contra evasão tributária são permitidas.',
      'Informações confidenciais são protegidas, salvo em disputas com garantia de sigilo. Por fim, medidas aprovadas pela OMC (“waivers”) são consideradas compatíveis com o acordo, assegurando equilíbrio entre soberania nacional e cooperação internacional.',
    ],
  },
  {
    id: 'cap-20',
    title: '20. Solução de Controvérsias',
    paragraphs: [
      'O capítulo sobre Solução de Controvérsias do Acordo MERCOSUL-UE estabelece um mecanismo abrangente para resolver disputas entre as partes, abarcando tanto questões de interpretação e aplicação do acordo quanto a preservação do equilíbrio de concessões, mesmo na ausência de violações explícitas dos termos. O processo inicia-se com consultas entre as partes, buscando uma solução amigável. Caso as consultas não resultem em acordo, pode-se recorrer à mediação, desde que haja consenso mútuo. Se essas etapas não forem bem-sucedidas, uma das partes pode solicitar a formação de um painel arbitral para avaliar a conformidade de medidas específicas com as obrigações previstas no acordo.',
      'O painel emite um laudo arbitral vinculante, que deve ser implementado dentro de um prazo razoável. Caso a parte responsável não cumpra as determinações, podem ser aplicadas medidas como compensações temporárias ou suspensão de concessões.',
      'Esse capítulo busca garantir a eficácia do acordo, oferecendo flexibilidade para corrigir desequilíbrios e fortalecer a confiança mútua entre MERCOSUL e UE, preservando o caráter de reciprocidade das concessões comerciais.',
    ],
  },
];

const NORMATIVAS = [
  {
    normativa: 'Decreto de Promulgação do Acordo',
    descricao: 'Promulga o Acordo Provisório de Comércio entre a União Europeia e o Mercado Comum do Sul',
    vigencia: [
      'Entrada em vigor: 01/05/2026',
      'Internalização:',
      'DECRETO Nº 12.953, DE 28 DE ABRIL DE 2026',
    ],
  },
  {
    normativa: 'Portaria SECEX nº490',
    descricao: 'Dispõe sobre certificação de origem preferencial e autocertificação de origem em acordos comerciais',
    vigencia: [
      'Portaria SECEX nº490, de 29 de abril de 2026',
      'Portaria SECEX Nº 496, de 13 de maio de 2026',
    ],
  },
  {
    normativa: 'Portaria SECEX nº491',
    descricao:
      'Estabelece critérios para alocação, de 1º de maio a 31 de dezembro de 2026, de cotas para importação determinadas pelo Acordo Provisório de Comércio entre o Mercosul União Europeia (UE)',
    vigencia: [
      'Portaria SECEX nº491, de 29 de abril de 2026',
      'Alterada pela Portaria SECEX nº494, de 04 de maio de 2026',
      'A portaria consolidada está disponível em https://www.gov.br/siscomex/pt-br/legislacao/secex',
    ],
    linkUrl: 'https://www.gov.br/siscomex/pt-br/legislacao/secex',
  },
  {
    normativa: 'Portaria SECEX nº492',
    descricao:
      'Estabelece critérios para alocação, de 1º de maio a 31 de dezembro de 2026, de cotas para exportação determinadas pelo Acordo Provisório de Comércio entre o Mercosul União Europeia (UE)',
    vigencia: [
      'Portaria SECEX nº492, de 29 de abril de 2026',
      'Alterada pelas Portaria SECEX nº495, de 05 de maio de 2026 e Portaria SECEX nº501, de 19 de maio de 2026.',
      'A consolidação está disponível, na Portaria 72/2020, em https://www.gov.br/siscomex/pt-br/legislacao/secex',
    ],
    linkUrl: 'https://www.gov.br/siscomex/pt-br/legislacao/secex',
  },
];

export const DossierMercosulUEPanel: React.FC = () => {
  const [compactChapters, setCompactChapters] = useState(false);

  return (
    <article
      aria-labelledby="mercosul-ue-dossier-title"
      className="bg-[#0d1627] rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6"
    >
      {/* CABEÇALHO DO DOSSIÊ */}
      <header className="border-b border-slate-800 pb-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
              <Globe2 className="w-3 h-3" />
              <span>Dossiê Geoeconômico &amp; Comércio Exterior</span>
            </div>

            <h2
              id="mercosul-ue-dossier-title"
              className="text-base sm:text-xl font-black text-white tracking-tight leading-snug"
            >
              Dossiê DinhEuro: Acordo de Parceria MERCOSUL–União Europeia
            </h2>

            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              Análise completa capítulo a capítulo — Assinado em <strong className="text-slate-200">17/01/2026</strong> | Aplicação Provisória do ITA desde <strong className="text-emerald-400">01/05/2026</strong> | Atualizado em <strong className="text-slate-200">03/11/2026</strong> | Fontes oficiais: <strong className="text-slate-200">MDIC e Governo Federal</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCompactChapters((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/40 text-[11px] font-semibold text-slate-300 hover:text-white transition cursor-pointer self-start flex-shrink-0"
          >
            {compactChapters ? (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Expandir Grade Visual</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recolher Grade Visual</span>
              </>
            )}
          </button>
        </div>

        {/* KPI Strip do Acordo */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div className="bg-slate-900/75 rounded-xl border border-slate-800/90 p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Mercado Integrado</span>
            <span className="text-sm font-black font-mono-numbers text-emerald-400">~720 milhões</span>
            <span className="text-[10px] text-slate-400 block">de consumidores</span>
          </div>
          <div className="bg-slate-900/75 rounded-xl border border-slate-800/90 p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">PIB Combinado</span>
            <span className="text-sm font-black font-mono-numbers text-white">&gt; US$ 22 tri</span>
            <span className="text-[10px] text-slate-400 block">zona de livre comércio</span>
          </div>
          <div className="bg-slate-900/75 rounded-xl border border-slate-800/90 p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Corrente BR–UE (2025)</span>
            <span className="text-sm font-black font-mono-numbers text-amber-400">US$ 100 bi</span>
            <span className="text-[10px] text-slate-400 block">16% do comex brasileiro</span>
          </div>
          <div className="bg-slate-900/75 rounded-xl border border-slate-800/90 p-2.5">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vigência Provisória ITA</span>
            <span className="text-sm font-black font-mono-numbers text-sky-400">01/05/2026</span>
            <span className="text-[10px] text-slate-400 block">Decreto nº 12.953/2026</span>
          </div>
        </div>
      </header>

      {/* Índice rápido de âncoras */}
      <nav aria-label="Navegação interna do dossiê" className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { href: '#sobre-o-acordo', label: 'Sobre o Acordo' },
          { href: '#capitulo-a-capitulo', label: 'Capítulos 1 a 20' },
          { href: '#textos-e-preferencias', label: 'Textos & Preferências' },
          { href: '#normativas-relacionadas', label: 'Normativas (SECEX)' },
          { href: '#dados-comerciais', label: 'Dados Comerciais' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-semibold text-slate-300 hover:text-emerald-300 transition flex-shrink-0"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* SEÇÃO 1: SOBRE O ACORDO */}
      <section id="sobre-o-acordo" className="space-y-3 bg-slate-900/50 rounded-xl border border-slate-800/90 p-4">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
          <Landmark className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <h3 className="text-sm sm:text-base font-extrabold text-white">Sobre o Acordo</h3>
        </div>

        <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
          <p>
            O Acordo de Parceria entre o MERCOSUL e a União Europeia, assinado em 17 de janeiro de 2026, representa o maior acordo comercial já celebrado pelo bloco sul-americano e estabelece uma das maiores zonas de livre comércio do mundo, integrando um mercado de aproximadamente 720 milhões de pessoas e um Produto Interno Bruto combinado superior a US$ 22 trilhões.
          </p>
          <p>
            Na etapa final das negociações, conduzida entre 2023 e 2024, o Brasil liderou um processo de revisão dos textos então em negociação, que resultou no chamado “Pacote de Brasília”. Os ajustes promovidos conferiram maior equilíbrio aos compromissos assumidos pelas Partes, fortaleceram a dimensão do desenvolvimento sustentável, preservaram espaço para a implementação de políticas públicas e industriais de interesse nacional e permitiram o estabelecimento de um mecanismo de reequilíbrio de concessões, assim como a conclusão de temas que permaneciam em aberto, como propriedade intelectual, cooperação e disposições políticas.
          </p>
          <p>
            Foram assinados dois instrumentos jurídicos distintos: o Acordo de Parceria entre MERCOSUL e União Europeia (European Union and Mercosur Partnership Agreement – EMPA), com os três pilares – político, de cooperação e comercial, esse último de competência exclusiva da Comissão Europeia (pelo lado europeu); e o Acordo Provisório de Comércio (Interim Trade Agreement – ITA), que replica os compromissos do pilar comercial do EMPA. Ambos foram assinados pela Comissão Europeia, pelo MERCOSUL e por seus Estados Partes, permanecendo pendente, no caso do EMPA, a conclusão dos procedimentos necessários à internalização pelos Estados-Membros da União Europeia e pelos Estados Partes do MERCOSUL.
          </p>
          <p>
            As Partes decidiram aplicar provisoriamente o ITA a partir de 1º de maio de 2026, após a conclusão célere dos respectivos procedimentos internos e a troca das notificações pertinentes. O acordo comercial permanece sujeito à aprovação do Parlamento Europeu para sua entrada em vigor definitiva, enquanto o EMPA dependerá, adicionalmente, da ratificação pelos parlamentos nacionais dos Estados-Membros da União Europeia, assim Como pelos Estados Partes do MERCOSUL. Com o início da aplicação provisória do ITA, passaram a produzir efeitos os cronogramas de eliminação tarifária, bem como as demais disposições do acordo comercial, incluindo a criação das instâncias institucionais responsáveis por sua implementação, monitoramento, revisão e governança.
          </p>
          <p>
            Além de seus efeitos econômicos, o Acordo possui elevada relevância política e estratégica. Ao consolidar uma associação abrangente entre o MERCOSUL e a União Europeia, fortalece o diálogo institucional e a cooperação em temas de interesse comum, reafirma o compromisso de ambas as regiões com a democracia, o multilateralismo e a promoção dos direitos humanos e cria mecanismos permanentes de coordenação política. O instrumento também reforça a inserção internacional do MERCOSUL, amplia sua atratividade para futuras negociações com terceiros parceiros e contribui para aprofundar a cooperação em áreas como desenvolvimento sustentável, inovação, investimentos e políticas públicas, preservando o espaço regulatório necessário para que os Estados implementem medidas voltadas à saúde, ao meio ambiente, ao desenvolvimento industrial e à inclusão social.
          </p>
          <p>
            A aplicação provisória do ITA representa, assim, um importante avanço na estratégia de inserção internacional do Brasil e do MERCOSUL, reforçando a diversificação das parcerias econômicas, ampliando oportunidades de comércio e investimentos e aprofundando as relações comerciais, políticas e de cooperação entre as duas regiões.
          </p>
          <p className="text-slate-400">
            Informações adicionais sobre os principais econômicos-comerciais do Acordo entre MERCOSUL e a União Europeia disponíveis no Factsheet – Acordo Mercosul–União Europeia, elaborado pelo Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC), disponível no link: Confira o Factsheet.
          </p>
        </div>
      </section>

      {/* SEÇÃO 2: O ACORDO CAPÍTULO A CAPÍTULO (1 A 20 - INTEGRALMENTE NO DOM) */}
      <section id="capitulo-a-capitulo" className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-extrabold text-white">
              O Acordo Capítulo a Capítulo
            </h3>
          </div>
          <span className="text-[10px] font-mono-numbers text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            20 Capítulos + Anexos
          </span>
        </div>

        <div className={`space-y-3 ${compactChapters ? 'max-h-[460px] overflow-y-auto pr-1' : ''}`}>
          {CHAPTERS.map((cap) => (
            <div
              key={cap.id}
              id={cap.id}
              className="bg-slate-900/55 rounded-xl border border-slate-800/90 p-3.5 sm:p-4 space-y-2.5"
            >
              <h3 className="text-xs sm:text-sm font-bold text-emerald-300 leading-snug">
                {cap.title}
              </h3>

              <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {cap.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {cap.bullets && cap.bullets.length > 0 && (
                <ul className="space-y-1.5 pl-3 border-l-2 border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
                  {cap.bullets.map((b, idx) => (
                    <li key={idx}>
                      {b.label ? (
                        <>
                          <strong className="text-white">{b.label}:</strong> {b.text}
                        </>
                      ) : (
                        b.text
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {cap.subBlocks && cap.subBlocks.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  {cap.subBlocks.map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-[#070d18]/70 rounded-lg border border-slate-800/80 p-3 space-y-1.5"
                    >
                      <h4 className="text-[11px] sm:text-xs font-bold text-amber-300">{sub.title}</h4>
                      <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                        {sub.paragraphs.map((sp, spIdx) => (
                          <p key={spIdx}>{sp}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 3: TEXTOS DO ACORDO, PREFERÊNCIAS TARIFÁRIAS E MANUAIS */}
      <section id="textos-e-preferencias" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Textos do Acordo & Manuais */}
        <div className="bg-slate-900/55 rounded-xl border border-slate-800/90 p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
              <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-white">Textos do Acordo</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed list-disc pl-4">
              <li>Acordo de Comércio Provisório entre MERCOSUL e União Europeia (ITA) - textos em português</li>
              <li>Acordo de Comércio Provisório entre MERCOSUL e União Europeia (ITA) - textos em inglês</li>
              <li>Acordo de Parceria entre MERCOSUL e União Europeia (EMPA) - textos em português</li>
            </ul>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-white">Manuais e outras informações</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 leading-relaxed list-disc pl-4">
              <li>Manual de desgravação tarifária</li>
              <li>Manual de Regras de Origem</li>
              <li>Manual de Indicações Geográficas</li>
              <li>Aprendendo a Exportar para a União Europeia</li>
            </ul>
          </div>
        </div>

        {/* Preferências Tarifárias e Requisitos Específicos de Origem */}
        <div className="bg-slate-900/55 rounded-xl border border-slate-800/90 p-4 space-y-2.5">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
            <PackageCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-white">
              Preferências Tarifárias e Requisitos Específicos de Origem
            </h3>
          </div>
          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>
              A oferta da União Europeia ao MERCOSUL em cestas de desgravação - imediata ou linear em prazos de 4, 7, 8, 10 ou 12 anos - cobre aproximadamente 95% das exportações brasileiras ao bloco em termos de número de códigos tarifários, que correspondem a 92% em termos do valor exportado.
            </p>
            <p>
              Já os produtos cobertos pela oferta da UE por meio de cotas ou reduções tarifárias parciais – que abrange principalmente produtos agrícolas e agroindustriais – correspondem a cerca de 3% dos códigos tarifários e 5 % do valor exportador pelo Brasil à União Europeia.
            </p>
            <p>
              A oferta do MERCOSUL à União Europeia, com cestas de produtos submetidos a desgravação imediata ou linear por prazos de 4, 8, 10 ou 15 anos, cobre aproximadamente 91% dos códigos tarifários e 85% do valor das importações brasileiras de produtos provenientes da União Europeia. Apenas uma parcela muito reduzida dos bens está sujeita a cotas ou outras reduções parciais, enquanto a lista de exclusões representa aproximadamente 9% dos bens e 8% do valor total das importações brasileiras procedentes da UE.
            </p>
          </div>
          <ul className="space-y-1 text-xs text-emerald-300/90 pt-1 list-disc pl-4">
            <li>Preferências Tarifárias na Importação - em Nomenclatura Comum do MERCOSUL (NCM)</li>
            <li>Preferências Tarifárias na Exportação - em Nomenclatura Combinada (NC)</li>
            <li>Requisitos Específicos de Origem - por código do Sistema Harmonizado (SH)</li>
          </ul>
        </div>
      </section>

      {/* SEÇÃO 4: NORMATIVAS RELACIONADAS */}
      <section id="normativas-relacionadas" className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white">Normativas Relacionadas</h3>
              <p className="text-[11px] text-slate-400">Normativas de implementação do Acordo</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden bg-[#070d18]/70">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Normativa</th>
                  <th className="py-2.5 px-3">Descrição</th>
                  <th className="py-2.5 px-3">Vigência/Texto da Normativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {NORMATIVAS.map((row) => (
                  <tr key={row.normativa} className="hover:bg-slate-800/35 transition align-top">
                    <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                      {row.normativa}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 leading-relaxed min-w-[200px]">
                      {row.descricao}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 space-y-1 min-w-[220px]">
                      {row.vigencia.map((line, idx) => (
                        <div key={idx} className="leading-snug">
                          {line.includes('DECRETO') || line.includes('01/05/2026') ? (
                            <span className="font-semibold text-emerald-400">{line}</span>
                          ) : line.includes('https://') && row.linkUrl ? (
                            <a
                              href={row.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-400 hover:underline break-all"
                            >
                              <span>{line}</span>
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            </a>
                          ) : (
                            <span>{line}</span>
                          )}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: DADOS COMERCIAIS */}
      <section id="dados-comerciais" className="bg-slate-900/55 rounded-xl border border-slate-800/90 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <h3 className="text-sm sm:text-base font-extrabold text-white">Dados Comerciais</h3>
          </div>
          <span className="text-[10px] font-mono-numbers text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Balança Brasil–UE
          </span>
        </div>

        {/* Mini resumo de dados comerciais */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-[#070d18]/70 rounded-lg border border-slate-800 p-2.5">
            <span className="text-[10px] text-slate-400 block">Exportações BR (Bens 2025)</span>
            <span className="text-xs sm:text-sm font-black font-mono-numbers text-emerald-400">US$ 49,8 bi</span>
          </div>
          <div className="bg-[#070d18]/70 rounded-lg border border-slate-800 p-2.5">
            <span className="text-[10px] text-slate-400 block">Importações BR (Bens 2025)</span>
            <span className="text-xs sm:text-sm font-black font-mono-numbers text-white">US$ 50,3 bi</span>
          </div>
          <div className="bg-[#070d18]/70 rounded-lg border border-slate-800 p-2.5">
            <span className="text-[10px] text-slate-400 block">Transformação (47,4%)</span>
            <span className="text-xs sm:text-sm font-black font-mono-numbers text-amber-400">US$ 23,6 bi</span>
          </div>
          <div className="bg-[#070d18]/70 rounded-lg border border-slate-800 p-2.5">
            <span className="text-[10px] text-slate-400 block">Serviços BR–UE (2024)</span>
            <span className="text-xs sm:text-sm font-black font-mono-numbers text-sky-400">US$ 36 bi</span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
          <p>
            Para o Brasil, o Acordo possui valor estratégico central. A União Europeia é o segundo principal parceiro comercial brasileiro. Em 2025, a corrente de comércio de bens entre Brasil e União Europeia alcançou US$ 100 bilhões, o equivalente a 16% do comércio exterior brasileiro. No mesmo período, o Brasil exportou US$ 49,8 bilhões em bens para o bloco europeu e importou US$ 50,3 bilhões, refletindo a profundidade e a complementaridade da relação econômica bilateral.
          </p>
          <p>
            No comércio de serviços, em 2024, o intercâmbio entre Brasil e União Europeia somou US$ 36 bilhões, com exportações brasileiras de US$ 10 bilhões e importações de US$ 26 bilhões, evidenciando a relevância do bloco europeu também como parceiro estratégico nesse setor.
          </p>
          <p>
            As exportações brasileiras de bens para a União Europeia em 2025 apresentaram elevada diversificação setorial. A indústria de transformação respondeu por 47,4% do total exportado (US$ 23,6 bilhões), sendo a União Europeia o segundo principal destino desses produtos. Destacam-se os bens de média e alta tecnologia, que representaram 43,2% das exportações industriais, incluindo aeronaves, motores, produtos químicos, equipamentos elétricos, autopeças, polímeros plásticos, medicamentos e máquinas.
          </p>
          <p>
            A indústria extrativa respondeu por 29% das exportações (US$ 14,4 bilhões), enquanto a agropecuária representou 22,8% (US$ 11,4 bilhões). A União Europeia figura como principal destino de diversos produtos brasileiros, entre os quais café em grão, farelo de soja, minérios de cobre, frutas, carnes salgadas, óleos essenciais, polímeros plásticos, estanho e joias.
          </p>
          <p>
            No mesmo ano, o Brasil importou US$ 50,3 bilhões em bens da União Europeia. Insumos e bens intermediários corresponderam a 57,4% das importações (US$ 28,8 bilhões), fazendo do bloco europeu o segundo maior fornecedor do Brasil nesse segmento. Os bens de consumo representaram 23,3% (US$ 11,7 bilhões), com destaque para medicamentos, enquanto os bens de capital responderam por 17,5% (US$ 8,8 bilhões). As importações de combustíveis corresponderam a 1,7% do total.
          </p>
          <p className="text-slate-400">
            Para informações sobre o fluxo comercial entre Brasil e União Europeia, clique aqui.
          </p>
          <p className="text-slate-400">
            Para entender melhor sobre os benefícios do Acordo Mercosul - União Europeia, clique aqui: Panorama do Comércio Brasil-UE.
          </p>
        </div>
      </section>

      {/* Rodapé Institucional */}
      <footer className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[10px] text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span>
          Fontes oficiais: Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC) e Governo Federal • Editoria Geoeconômica DinhEuro.
        </span>
      </footer>
    </article>
  );
};
