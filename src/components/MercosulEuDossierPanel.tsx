import React, { useState } from 'react';
import { ChevronRight, Globe2, ShieldCheck, BookOpen } from 'lucide-react';
import mercosulEuBanner from '../assets/images/mercosul_eu_accord_1794626746963.jpg';

interface DossierSection {
  id: string;
  title: string;
  paragraphs: string[];
}

const MERCOSUL_EU_SECTIONS: DossierSection[] = [
  {
    id: 'visao-geral',
    title: 'Sobre o Acordo (Visão Geral e Contexto Estratégico)',
    paragraphs: [
      'O Acordo de Parceria entre o MERCOSUL e a União Europeia, assinado em 17 de janeiro de 2026, representa o maior acordo comercial já celebrado pelo bloco sul-americano e estabelece uma das maiores zonas de livre comércio do mundo, integrando um mercado de aproximadamente 720 milhões de pessoas e um Produto Interno Bruto combinado superior a US$ 22 trilhões.',
      'Na etapa final das negociações, conduzida entre 2023 e 2024, o Brasil liderou um processo de revisão dos textos então em negociação, que resultou no chamado “Pacote de Brasília”. Os ajustes promovidos conferiram maior equilíbrio aos compromissos assumidos pelas Partes, fortaleceram a dimensão do desenvolvimento sustentável, preservaram espaço para a implementação de políticas públicas e industriais de interesse nacional e permitiram o estabelecimento de um mecanismo de reequilíbrio de concessões, assim como a conclusão de temas que permaneciam em aberto, como propriedade intelectual, cooperação e disposições políticas.',
      'Foram assinados dois instrumentos jurídicos distintos: o Acordo de Parceria entre MERCOSUL e União Europeia (European Union and Mercosur Partnership Agreement – EMPA), com os três pilares – político, de cooperação e comercial, esse último de competência exclusiva da Comissão Europeia (pelo lado europeu); e o Acordo Provisório de Comércio (Interim Trade Agreement – ITA), que replica os compromissos do pilar comercial do EMPA. Ambos foram assinados pela Comissão Europeia, pelo MERCOSUL e por seus Estados Partes, permanecendo pendente, no caso do EMPA, a conclusão dos procedimentos necessários à internalização pelos Estados-Membros da União Europeia e pelos Estados Partes do MERCOSUL.',
      'As Partes decidiram aplicar provisoriamente o ITA a partir de 1º de maio de 2026, após a conclusão célere dos respectivos procedimentos internos e a troca das notificações pertinentes. O acordo comercial permanece sujeito à aprovação do Parlamento Europeu para sua entrada em vigor definitiva, enquanto o EMPA dependerá, adicionalmente, da ratificação pelos parlamentos nacionais dos Estados-Membros da União Europeia, assim como pelos Estados Partes do MERCOSUL. Com o início da aplicação provisória do ITA, passaram a produzir efeitos os cronogramas de eliminação tarifária, bem como as demais disposições do acordo comercial, incluindo a criação das instâncias institucionais responsáveis por sua implementação, monitoramento, revisão e governança.',
      'Além de seus efeitos econômicos, o Acordo possui elevada relevância política e estratégica. Ao consolidar uma associação abrangente entre o MERCOSUL e a União Europeia, fortalece o diálogo institucional e a cooperação em temas de interesse comum, reafirma o compromisso de ambas as regiões com a democracia, o multilateralismo e a promoção dos direitos humanos e cria mecanismos permanentes de coordenação política. O instrumento também reforça a inserção internacional do MERCOSUL, amplia sua atratividade para futuras negociações com terceiros parceiros e contribui para aprofundar a cooperação em áreas como desenvolvimento sustentável, inovação, investimentos e políticas públicas, preservando o espaço regulatório necessário para que os Estados implementem medidas voltadas à saúde, ao meio ambiente, ao desenvolvimento industrial e à inclusão social.',
      'A aplicação provisória do ITA representa, assim, um importante avanço na estratégia de inserção internacional do Brasil e do MERCOSUL, reforçando a diversificação das parcerias econômicas, ampliando oportunidades de comércio e investimentos e aprofundando as relações comerciais, políticas e de cooperação entre as duas regiões.',
    ],
  },
  {
    id: 'capitulo-bens',
    title: '1. Capítulo de Bens (Compromissos de Desgravação Tarifária)',
    paragraphs: [
      'O capítulo de comércio de bens do Acordo MERCOSUL-União Europeia é uma das áreas centrais do pacto, estruturado para promover maior integração econômica e competitividade entre as economias dos dois blocos. O instrumento contempla um amplo compromisso de liberalização tarifária em setores industriais e agrícolas, respeitando as especificidades de cada mercado e garantindo vantagens significativas para ambas as partes.',
      'No setor agrícola, o acordo representa um avanço importante para as exportações do MERCOSUL, com a União Europeia comprometendo-se a liberalizar 77% das linhas tarifárias do setor, que correspondem a um volume de comércio superior a 80%. Isso inclui acesso preferencial para uma série de produtos brasileiros de alto interesse, como carnes, frutas, grãos e café. Carnes bovinas, por exemplo, terão uma cota de 99 mil toneladas que, hoje sujeitas a tarifas que chegam a superar 100%, terão acesso ao mercado europeu com tarifas reduzidas para níveis competitivos. A carne de aves terá uma cota de 180 mil toneladas com isenção tarifária dentro da quota, enquanto a carne suína contará com 25 mil toneladas sob condições preferenciais. Produtos como açúcar e etanol, fundamentais para o Brasil, também terão tratamento especial: o açúcar contará com uma cota inicial de 180 mil toneladas, enquanto o etanol terá 450 mil toneladas destinadas a usos industriais e 200 mil toneladas para outros usos com tarifas reduzidas progressivamente.',
      'Outros produtos agrícolas igualmente relevantes receberão acesso preferencial ou desgravação total. Entre eles, destacam-se café torrado e solúvel, abacates, melões, limões, melancias, uvas de mesa e crustáceos, muitos dos quais terão tarifas completamente eliminadas em prazos que variam de 4 a 10 anos. Essa abertura reforça a posição do Brasil como um dos maiores fornecedores mundiais de produtos agrícolas e assegura vantagens competitivas no mercado europeu, mesmo em meio às regulamentações rigorosas do bloco.',
      'Já no setor industrial, a União Europeia se comprometeu a eliminar 100% de suas tarifas em até 10 anos, com aproximadamente 80% das linhas tarifárias liberalizadas já na entrada em vigor do acordo. Isso beneficiará diretamente exportadores de bens de alta complexidade tecnológica, como químicos, máquinas, equipamentos médicos e autopeças, setores em que o Brasil busca ampliar sua participação no mercado global. No caso do MERCOSUL, a liberalização será mais gradual, com prazos de até 30 anos para produtos sensíveis, como veículos automotivos baseados em novas tecnologias, garantindo tempo suficiente para que a indústria local se adapte ao aumento da concorrência.',
      'Produtos específicos também foram objeto de negociações detalhadas para assegurar o equilíbrio entre concessões e salvaguardas. Autopeças terão desgravação tarifária em prazos de 7 a 10 anos, enquanto têxteis e calçados serão liberalizados em até 10 anos, com medidas para proteger a produção local durante o período de transição. O setor de metais, por sua vez, contará com 80% de suas exportações livres de tarifas já na entrada em vigor do acordo, com o restante liberalizado em até 10 anos. Esses compromissos refletem o esforço conjunto de fomentar o comércio de bens industriais de maior valor agregado, promovendo inovação e competitividade.',
      'Além disso, o acordo prevê o uso de regimes aduaneiros especiais, como drawback, que permitem a importação temporária de insumos com isenção fiscal, desde que sejam utilizados para a produção de bens exportados. Essa medida, aliada à flexibilidade possível nas regras de origem, promove maior integração das economias locais em cadeias globais de valor, especialmente em setores com forte comércio intrafirma, como automotivo e eletrônico.',
      'Em resumo, o capítulo de comércio de bens oferece um equilíbrio estratégico, ampliando o acesso do MERCOSUL ao mercado europeu, enquanto protege os setores sensíveis da economia local. Com prazos adequados e concessões bem estruturadas, o acordo reforça o papel do MERCOSUL como um parceiro comercial estratégico da União Europeia, garantindo condições favoráveis para produtores agrícolas e industriais, além de fomentar o crescimento econômico sustentável em toda a região.',
      '1.1 Anexo sobre Direitos de Exportação: Mercosul e União Europeia se comprometem a não estabelecer entraves às exportações, com exceções específicas para aplicação de imposto de exportação para determinados produtos.',
      '1.2 Anexo sobre Monopólios: O anexo aborda os monopólios de importação e exportação, e define, no contexto do Acordo, os setores em que o Brasil e outros países do Mercosul podem manter ou designar monopólios, como petróleo, gás, hidrocarbonetos e minerais nucleares.',
      '1.3 Anexo de Vinhos e Destilados: O anexo trata das regras para comércio de vinhos e bebidas alcoólicas entre o Mercosul e a União Europeia, incluindo definições, práticas enológicas, rotulagem e certificação. Ele estabelece padrões alinhados à Organização Internacional da Vinha e do Vinho (OIV), prevendo cooperação, proteção de indicações geográficas e simplificação de certificações.',
    ],
  },
  {
    id: 'regras-origem',
    title: '2. Regras de Origem',
    paragraphs: [
      'O Capítulo sobre Regras de Origem do acordo está alinhado com as melhores práticas internacionais. Além da não alteração, disciplina que permite estabelecer centros de distribuição ao redor do mundo, estão previstas as seguintes inovações no acordo: disciplina sobre materiais fungíveis, jogos e sortidos e materiais neutros.',
      'Em relação à acumulação de origem, a disciplina prevê a acumulação apenas entre os Estados Partes do acordo. Adicionalmente, o texto estabelece 10% de tolerância aos produtos em geral e flexibilidades específicas para produtos têxteis.',
      'Já na seção de prova de origem, destaca-se que o modelo adotado é o da autocertificação, após um período de transição de cinco anos, no qual se poderá utilizar o Certificado de Origem opcionalmente. Na parte de verificação e controle, por seu turno, cumpre apontar que a verificação é conduzida pelo país exportador, com procedimentos rápidos e menos burocráticos, com o fito de preservar um ambiente de negócios justo.',
      'Desta forma, o texto de origem é uma normativa moderna, pautada no princípio de facilitação de comércio, garantindo que os operadores econômicos das Partes sejam os reais beneficiários das preferências negociadas.',
      'Em relação aos requisitos específicos de origem foram negociadas regras para todo o universo tarifário, privilegiando a formação de cadeias regionais de valor e as sensibilidades dos blocos, como em relação à utilização de açúcar originário e a aplicação de salto qualificado (que exclui as peças) para determinadas máquinas.',
      'Ferramenta ROSA: Adicionalmente, destaca-se a disponibilização, pela União Europeia, da ferramenta ROSA - Rules of Origin Self-Assessment, integrada ao portal Access2Markets. A ferramenta permite que exportadores e importadores realizem uma autoavaliação do cumprimento das regras de origem aplicáveis a cada produto no âmbito dos acordos comerciais celebrados pela União Europeia, inclusive o acordo com o Mercosul, auxiliando na verificação da elegibilidade para o tratamento tarifário preferencial.',
    ],
  },
  {
    id: 'facilitacao-comercio',
    title: '3. Facilitação de Comércio e Cooperação Aduaneira',
    paragraphs: [
      'O capítulo visa a acelerar e reduzir os custos dos processos relacionados à importação e exportação de bens, promovendo maior eficiência ao reduzir a burocracia e aumentar a transparência para os operadores econômicos.',
      'Está prevista a revisão e aprimoramento contínuo de regulamentos e práticas aduaneiras, em diálogo com o setor empresarial. Também se busca adotar o uso de sistemas eletrônicos para simplificar as operações alfandegárias.',
      'Destacam-se, entre as disposições do capítulo, a assunção de compromissos ambiciosos no tratamento de bens perecíveis nas aduanas; a utilização do gerenciamento de risco como forma de evitar discriminação ou restrições disfarçadas no comércio internacional; a simplificação da admissão temporária de bens, como o uso de carnês ATA; a colaboração para o reconhecimento mútuo de Operadores Econômicos Autorizados (OEA); e o estabelecimento de um Comitê para assegurar o funcionamento correto das disposições do capítulo de facilitação.',
      'De acordo com a Organização Mundial do Comércio (OMC), a simplificação e a harmonização de procedimentos alfandegários, como a melhoria na transparência e previsibilidade, podem reduzir os custos do comércio internacional em até 10% para países desenvolvidos e em até 15% para países em desenvolvimento.',
      'O Acordo inclui o Protocolo de Assistência Mútua e Cláusula Antifraude, que aborda a assistência administrativa mútua em matéria aduaneira entre os países do Mercosul e da União Europeia, e define mecanismos de cooperação para combater fraudes, garantir a aplicação correta das legislações aduaneiras e facilitar o comércio legítimo.',
      'Cláusula de Integração Regional: Visa facilitar - entre e dentro das duas regiões, respeitando os processos de integração regional de cada parte - o movimento de Bens (livre circulação de produtos do Mercosul na UE, tratamento aduaneiro não inferior para produtos europeus no Mercosul e revisão periódica de procedimentos) e Serviços (esforços para facilitar a liberdade de prestação de serviços entre empresas e indivíduos). A Cláusula também trata de cooperação e harmonização regulatória.',
    ],
  },
  {
    id: 'barreiras-tecnicas',
    title: '4. Barreiras Técnicas ao Comércio (TBT) e Anexo Automotivo',
    paragraphs: [
      'O capítulo de Barreiras Técnicas ao Comércio (TBT) do Acordo de Parceria entre Mercosul e União Europeia reflete o compromisso de ambos os blocos em facilitar o comércio de bens, promovendo Boas Práticas Regulatórias (BPR) e prevenindo barreiras técnicas desnecessárias. Em alinhamento com compromissos internacionais, como o Acordo TBT da OMC, e com a Estratégia Nacional de Melhoria Regulatória lançada pelo Brasil em 2024, o texto reforça a importância de equilibrar a facilitação do comércio com o direito dos países de regulamentar para atingir objetivos de políticas públicas, como a proteção da saúde humana, animal e vegetal, do meio ambiente, da segurança nacional e dos consumidores.',
      'Entre os compromissos assumidos, destaca-se o uso de padrões internacionais como base para regulamentos técnicos e procedimentos de avaliação da conformidade (ISO, IEC, ITU e Codex Alimentarius). A realização de consultas públicas com prazos adequados, permitindo a participação de stakeholders, e a implementação de análises de impacto regulatório (PRO-REG) também são elementos fundamentais do acordo.',
      'No que diz respeito aos procedimentos de avaliação da conformidade, o capítulo aborda os diferentes modelos adotados pelas partes: no Brasil, predominam certificações emitidas por organismos independentes, enquanto na União Europeia prevalece o sistema de declarações de conformidade do fornecedor. O Acordo estabelece que certificados emitidos por uma das partes poderão ser aceitos pela outra, respeitando os requisitos legais do país importador.',
      'Anexo Automotivo: Reforça a transparência e consolida a prática já adotada pelo Brasil e demais países do Mercosul de reconhecer como equivalentes os testes realizados com base nos requisitos da Comissão Econômica das Nações Unidas para a Europa (UNECE), mesmo sem serem membros da organização. A União Europeia também poderá reconhecer testes de laboratórios situados no Mercosul que integrem redes acreditadas pela UNECE ou sejam subcontratados.',
    ],
  },
  {
    id: 'medidas-sps',
    title: '5. Medidas Sanitárias e Fitossanitárias (SPS)',
    paragraphs: [
      'O Capítulo SPS estabelece disciplinas que vão além das previstas pela OMC, com o objetivo de facilitar o comércio inter-regional de produtos agropecuários. Para isso, promove princípios como o uso de evidências científicas, a transparência e a previsibilidade no estabelecimento de medidas sanitárias e fitossanitárias, além de trazer maior clareza a procedimentos relacionados a instrumentos como “regionalização” e “pré-listing”.',
      'A implementação do sistema de “pré-listing” visa simplificar e reduzir prazos e custos em processos como inspeção, aprovação e habilitação de estabelecimentos exportadores de produtos de origem animal, como carne bovina, frango, suínos e lácteos. Cabe ao país exportador atestar o cumprimento dos requisitos sanitários do país importador, eliminando a necessidade de inspeção individual. O capítulo estabelece limite de 60 dias para emissão de relatórios de missões de inspeção.',
      'O capítulo detalha e fixa prazos para os procedimentos de “regionalização” (reconhecimento de áreas livres de pragas ou doenças) e cria um subcomitê SPS para resolução de conflitos.',
      'Diálogos: Temas relevantes para o agronegócio, como bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana (AMR) e definição de limites máximos de resíduos (LMRs), poderão ser discutidos por meio de mecanismos denominados “Diálogos”.',
    ],
  },
  {
    id: 'dialogos',
    title: '6. Diálogos',
    paragraphs: [
      'O Capítulo denominado “Diálogos” estabelece mecanismos de cooperação entre o Mercosul e a União Europeia em temas como bem-estar animal, biotecnologia agrícola, combate à resistência antimicrobiana e segurança alimentar. O objetivo é trocar informações, harmonizar abordagens regulatórias e promover pesquisa colaborativa, criando subcomitês e grupos de trabalho com representantes técnicos de ambas as partes.',
    ],
  },
  {
    id: 'defesa-comercial',
    title: '7. Defesa Comercial',
    paragraphs: [
      'O capítulo de defesa comercial reafirma as obrigações contidas nos Acordos da OMC sobre o tema, garantindo o direito de adotar medidas antidumping, medidas compensatórias e salvaguardas globais, determinando que eventuais disputas sejam submetidas ao sistema de solução de controvérsias da OMC.',
    ],
  },
  {
    id: 'salvaguardas-bilaterais',
    title: '8. Salvaguardas Bilaterais e Anexo de Veículos',
    paragraphs: [
      'O Capítulo de Salvaguardas bilaterais fundamenta-se nas melhores práticas internacionais, protegendo as partes contra surtos de importação decorrentes da liberalização que causem ou ameacem causar prejuízo grave às indústrias domésticas. Vigência de até 2 anos (prorrogáveis por igual período) e medidas provisórias de até 200 dias (conduzidas no Brasil pelo Departamento de Defesa Comercial do MDIC).',
      'Anexo X.A (Setor Automotivo): Ao aplicar salvaguarda bilateral para veículos, uma parte poderá suspender o cronograma de desgravação ou retomar a alíquota aplicável às demais origens por um período de 3 anos (renovável por mais 2 anos) sem compensação, além de medida provisória de até 270 dias, mediante comprovação de dano material ou ameaça à indústria doméstica.',
    ],
  },
  {
    id: 'servicos-investimentos',
    title: '9. Serviços e Investimentos',
    paragraphs: [
      'O tratamento do comércio de serviços e de investimentos está contido em um só capítulo, ampliando transparência e segurança jurídica. Estabelece compromissos de tratamento nacional, acesso a mercados e movimentação temporária de profissionais.',
      'Contém disciplinas para regulamentação doméstica de serviços, serviços financeiros (preservando prerrogativas prudenciais e permitindo transferência de dados para processamento no exterior), telecomunicações (marcos regulatórios competitivos), serviços postais e comércio eletrônico (documentos eletrônicos, assinaturas e combate ao spam).',
      'Lista Brasileira: O Brasil assumiu compromissos em setores como telecomunicações, serviços financeiros, construção, engenharia, arquitetura, publicidade, distribuição, varejo, consultoria e informática, excluindo expressamente setores sensíveis e estratégicos como defesa, saúde, educação, mineração e extração de petróleo.',
    ],
  },
  {
    id: 'transacoes-correntes',
    title: '10. Transações Correntes e Movimentos de Capitais',
    paragraphs: [
      'Estabelece regras para a livre movimentação de capitais e pagamentos correntes entre os blocos, permitindo medidas excepcionais e temporárias em caso de dificuldades financeiras (consistentes com as normas do FMI) e garantindo a aplicação de leis nacionais de insolvência e combate à lavagem de dinheiro de forma não discriminatória.',
    ],
  },
  {
    id: 'compras-governamentais',
    title: '11. Compras Governamentais',
    paragraphs: [
      'Tem como objetivo promover maior integração econômico-comercial. Garante às empresas brasileiras acesso ao mercado de compras públicas da União Europeia (que representou 13,7% do PIB do bloco em 2020, totalizando EUR 2,4 bilhões, com destaque para máquinas, equipamentos, eletroeletrônicos, obras públicas, arquitetura, engenharia, publicidade, serviços de construção e financeiros).',
      'O Brasil incluiu aquisições federais e estaduais, mas excluiu expressamente de sua oferta políticas de fomento e desenvolvimento industrial, tais como: margens de preferência para produtos/serviços nacionais, encomendas tecnológicas, compensação comercial, compras do Sistema Único de Saúde (SUS), incentivos a Micro e Pequenas Empresas e apoio a produtores rurais.',
    ],
  },
  {
    id: 'propriedade-intelectual',
    title: '12. Propriedade Intelectual e Indicações Geográficas (IGs)',
    paragraphs: [
      'Cobre direitos de autor, patentes, marcas, desenhos industriais e IGs, preservando os compromissos do Acordo TRIPS (sem extensão de patentes ou proteção adicional de dados clínicos).',
      'Reconhecimento Mútuo de Indicações Geográficas: 37 indicações geográficas brasileiras passarão a ser protegidas na UE, incluindo "Cachaça", queijo "Canastra" e os vinhos e espumantes do "Vale dos Vinhedos", com trâmite ágil para novas IGs. O MERCOSUL reconheceu 358 IGs europeias, garantindo prazos de readequação e direitos aos produtores locais de boa-fé.',
    ],
  },
  {
    id: 'pmes',
    title: '13. Pequenas e Médias Empresas (PMEs)',
    paragraphs: [
      'Dedica ações específicas para PMEs, incluindo programas de capacitação, facilitação na integração em cadeias globais de valor, participação em licitações públicas, formação de joint ventures, parcerias e redes empresariais.',
    ],
  },
  {
    id: 'defesa-concorrencia',
    title: '14. Defesa da Concorrência',
    paragraphs: [
      'Reitera o compromisso de combater práticas anticompetitivas em consonância com as legislações nacionais e estabelece bases para cooperação entre autoridades competentes.',
    ],
  },
  {
    id: 'subsidios',
    title: '15. Subsídios',
    paragraphs: [
      'Permite subsídios para alcançar objetivos de políticas públicas, reconhecendo a necessidade de cooperação para melhorar a transparência, coordenar posições na OMC e trocar informações sobre sistemas de controle de subsídios que possam distorcer o comércio.',
    ],
  },
  {
    id: 'empresas-estatais',
    title: '16. Empresas Estatais',
    paragraphs: [
      'O capítulo busca estabelecer um equilíbrio entre a atuação comercial e o papel público das empresas estatais. Ele determina que essas empresas devem, em regra, operar com base em critérios comerciais, promovendo condições mais justas e competitivas no mercado. Contudo, reconhece a importância de sua natureza especial, permitindo que atuem fora dessas bases sempre que necessário para cumprir mandatos ou objetivos de interesse público e serviços públicos sob sua responsabilidade. No caso do Brasil, as disposições aplicam-se respeitando o marco institucional nacional.',
    ],
  },
];

export const MercosulEuDossierPanel: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['visao-geral']);
  const [imgFailed, setImgFailed] = useState(false);

  const toggleSection = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(MERCOSUL_EU_SECTIONS.map((s) => s.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const allExpanded = openIds.length === MERCOSUL_EU_SECTIONS.length;

  return (
    <section
      aria-labelledby="mercosul-eu-dossier-heading"
      className="bg-[#0d1627] rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
    >
      {/* 1. Imagem Ilustrativa Institucional de Destaque no Topo */}
      <div className="relative h-44 sm:h-52 w-full bg-[#070d18] overflow-hidden border-b border-slate-800">
        {!imgFailed ? (
          <img
            src={mercosulEuBanner}
            alt="Ilustração institucional do Acordo de Parceria MERCOSUL e União Europeia — Brasil e UE"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0c1a30] via-[#0B1320] to-[#07111a] flex items-center justify-center p-6">
            <div className="flex items-center gap-4 text-slate-300">
              <Globe2 className="w-10 h-10 text-emerald-400" />
              <span className="text-sm font-bold tracking-wide">MERCOSUL · União Europeia</span>
            </div>
          </div>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d1627] via-[#0d1627]/65 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-300">
            <span>Dossiê Especial</span>
            <span aria-hidden="true">·</span>
            <span>Comércio Internacional</span>
            <span aria-hidden="true">·</span>
            <span>720 milhões de consumidores</span>
          </div>
          <h2
            id="mercosul-eu-dossier-heading"
            className="text-base sm:text-lg font-extrabold text-white tracking-tight text-balance leading-snug"
          >
            Dossiê DinhEuro: Acordo MERCOSUL–União Europeia (Capítulo a Capítulo)
          </h2>
          <p className="text-[11px] text-slate-300 leading-snug">
            Publicado em 23/06/2026 | Atualizado em 03/11/2026 | Fontes oficiais: MDIC e Governo Federal
          </p>
        </div>
      </div>

      {/* Barra de Controle Compacta */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>17 seções integrais (EMPA &amp; ITA — 16 capítulos + visão estratégica)</span>
        </div>

        <button
          type="button"
          onClick={allExpanded ? collapseAll : expandAll}
          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-[11px] font-semibold text-slate-200 transition cursor-pointer whitespace-nowrap shrink-0"
        >
          {allExpanded ? 'Recolher capítulos' : 'Expandir todos'}
        </button>
      </div>

      {/* 2. Acordeões Interativos com Seta à Esquerda e Texto Integral sempre montado no HTML */}
      <div className="divide-y divide-slate-800/80">
        {MERCOSUL_EU_SECTIONS.map((section) => {
          const isOpen = openIds.includes(section.id);
          return (
            <div key={section.id} className="transition-colors">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`mercosul-panel-${section.id}`}
                onClick={() => toggleSection(section.id)}
                className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center gap-3 hover:bg-slate-800/40 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <ChevronRight
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-90 text-emerald-400' : 'text-slate-400'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs sm:text-sm font-bold leading-snug ${
                    isOpen ? 'text-emerald-300' : 'text-slate-100'
                  }`}
                >
                  {section.title}
                </span>
              </button>

              {/* Conteúdo integral mantido no DOM para indexação SEO / AdSense */}
              <article
                id={`mercosul-panel-${section.id}`}
                className={`px-4 sm:px-5 pl-11 sm:pl-12 pb-4 space-y-2.5 text-xs text-slate-300 leading-relaxed ${
                  isOpen ? 'block' : 'hidden'
                }`}
              >
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </article>
            </div>
          );
        })}
      </div>

      {/* Rodapé da Seção */}
      <footer className="px-4 sm:px-5 py-3.5 bg-slate-900/70 border-t border-slate-800 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <span>
          Dossiê compilado e estruturado pela equipe editorial do DinhEuro com base nas informações oficiais do Ministério do Desenvolvimento, Indústria, Comércio e Serviços (MDIC) e do Governo Federal.
        </span>
      </footer>
    </section>
  );
};
