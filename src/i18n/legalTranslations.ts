import type { SupportedLanguage } from './translations';

export interface LegalTranslations {
  backToHome: string;
  terms: {
    badge: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1P1Before: string;
    s1P1Mid: string;
    s1P1After: string;
    s1P2Before: string;
    s1P2Bold: string;
    s1P2After: string;
    s2Title: string;
    s2Warning: string;
    s2P2: string;
    s2P3: string;
    s3Title: string;
    s3Intro: string;
    s3Bullets: [string, string, string];
    s4Title: string;
    s4P1Before: string;
    s4P1After: string;
    s4P2: string;
    s5Title: string;
    s5P1: string;
    s6Title: string;
    s6P1: string;
    s6P2: string;
    s6Contact: string;
  };
  privacy: {
    badge: string;
    title: string;
    subtitle: string;
    dpoTitle: string;
    dpoDesc: string;
    s1Title: string;
    s1P1: string;
    s1P2: string;
    s2Title: string;
    s2Intro: string;
    s2ATitle: string;
    s2ADesc: string;
    s2BTitle: string;
    s2BDesc: string;
    s3Title: string;
    s3Intro: string;
    s3Items: Array<{ strong: string; text: string }>;
    s4Title: string;
    s4Intro: string;
    s4Items: Array<{ strong: string; text: string }>;
    s5Title: string;
    s5Intro: string;
    s5Bullets: string[];
    s5ContactPrefix: string;
    s5ContactSuffix: string;
    s6Title: string;
    s6Desc: string;
  };
  cookies: {
    badge: string;
    title: string;
    subtitle: string;
    manageTitle: string;
    manageDesc: string;
    resetBtn: string;
    s1Title: string;
    s1Desc: string;
    s2Title: string;
    catATitle: string;
    catABadge: string;
    catADesc: string;
    catAItems: Array<{ key: string; desc: string }>;
    catBTitle: string;
    catBBadge: string;
    catBDesc: string;
    catBItems: Array<{ key: string; desc: string }>;
    catCTitle: string;
    catCBadge: string;
    catCDesc: string;
    s3Title: string;
    s3Desc: string;
    browsers: Array<{ name: string; steps: string }>;
  };
  disclaimer: {
    badge: string;
    title: string;
    subtitle: string;
    s1Title: string;
    s1P1Before: string;
    s1P1After: string;
    s1P2: string;
    s2Title: string;
    s2Intro: string;
    s2Cards: Array<{ title: string; desc: string }>;
    s2LatencyLabel: string;
    s2LatencyDesc: string;
    s3Title: string;
    s3P1: string;
    s3P2: string;
    s4Title: string;
    s4P1: string;
    s4Contact: string;
  };
}

export const LEGAL_TRANSLATIONS: Record<SupportedLanguage, LegalTranslations> = {
  pt: {
    backToHome: 'Voltar ao Início',
    terms: {
      badge: 'Vigência: Novembro/2026',
      title: 'Termos de Uso e Serviço',
      subtitle:
        'Condições gerais de navegação, licença de uso da plataforma DinhEuro, propriedade intelectual e diretrizes regulatórias no mercado financeiro brasileiro e internacional.',
      s1Title: '1. Natureza Jurídica e Definição da Plataforma',
      s1P1Before: 'O',
      s1P1Mid: 'é um portal digital, agregador de dados econômicos públicos, provedor de ferramentas analíticas e simuladores financeiros de uso estritamente informativo e educacional.',
      s1P1After: '',
      s1P2Before:
        'O DinhEuro atua exclusivamente como portal digital informativo e educacional, agregador de dados econômicos públicos, ferramentas analíticas, simuladores financeiros e canal de mídia econômica. O DinhEuro',
      s1P2Bold: 'NÃO',
      s1P2After:
        'é uma instituição financeira, não realiza intermediação de câmbio direta, não efetua custódia de recursos ou valores mobiliários, e não atua como corretora de valores credenciada pela CVM (Comissão de Valores Mobiliários) ou Banco Central do Brasil.',
      s2Title: '2. Isenção de Responsabilidade Financeira (Disclaimer de Investimentos)',
      s2Warning:
        'NENHUMA INFORMAÇÃO, GRÁFICO, COTAÇÃO OU CONTEÚDO DISPONIBILIZADO NESTE SITE CONSTITUI RECOMENDAÇÃO, CONSULTORIA, ANÁLISE OU OFERTA DE COMPRA OU VENDA DE ATIVOS FINANCEIROS.',
      s2P2:
        'As cotações de moedas (Euro, Dólar, Real, Libra), ações da B3 e de bolsas internacionais (Wall Street, Frankfurt, Londres), criptoativos, taxas de juros e commodities são transmitidas via integrações com feeds institucionais de mercado, câmbio interbancário e livros públicos de negociação. O DinhEuro não se responsabiliza por eventuais latências de rede, atrasos na atualização de cotações, variações de spread de terceiros ou decisões de investimento tomadas pelo usuário com base nas informações visualizadas.',
      s2P3:
        'Investimentos em ativos de renda variável, Forex, contratos por diferença (CFDs) e criptomoedas envolvem elevado risco de volatilidade e perda de capital. O investidor deve sempre consultar profissionais certificados (CNPI, CFP, CGA) antes de qualquer aporte.',
      s3Title: '3. Regras de Conduta e Uso Aceitável',
      s3Intro: 'Ao utilizar o DinhEuro, você concorda em:',
      s3Bullets: [
        'Utilizar os recursos para finalidades lícitas, pessoais ou de pesquisa de mercado.',
        'Não empregar robôs maliciosos, técnicas de web scraping abusivo, engenharia reversa ou ataques de negação de serviço (DDoS) contra a infraestrutura do portal.',
        'Reconhecer que simulações tributárias ou de câmbio são aproximações algorítmicas e podem sofrer variações conforme IOF, spreads comerciais e regulamentação vigente da Receita Federal do Brasil.',
      ],
      s4Title: '4. Propriedade Intelectual da Marca DinhEuro',
      s4P1Before: 'A marca nominativa e figurativa',
      s4P1After:
        ', o logotipo oficial com o anel de câmbio Euro/Real, layouts, paleta de cores, código-fonte, arquitetura PWA, motores de gráficos customizados e algoritmos proprietários de paridade são de titularidade exclusiva de seus desenvolvedores e fundadores, protegidos pela Lei de Propriedade Industrial (Lei nº 9.279/1996) e Lei de Software (Lei nº 9.609/1998).',
      s4P2: 'É expressamente vedada a reprodução total ou parcial, cópia ou distribuição sem autorização prévia por escrito.',
      s5Title: '5. Links Externos, Corretoras e Parceiros Comerciais',
      s5P1:
        'O portal pode exibir links para serviços financeiros, casas de câmbio, corretoras internacionais reguladas (ex: Interactive Brokers, Nomad, Avenue, Wise) e fontes jornalísticas de notícias (ex: Reuters, Bloomberg, Valor Econômico). O DinhEuro não responde pelos termos, políticas de privacidade, solidez ou operações contratadas diretamente em plataformas de terceiros.',
      s6Title: '6. Alterações nos Termos e Foro Competente',
      s6P1:
        'Estes Termos podem ser atualizados periodicamente para refletir mudanças regulatórias ou lançamentos de novos módulos. A data de última revisão será sempre informada no topo desta página.',
      s6P2:
        'Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para a resolução de quaisquer controvérsias decorrentes deste instrumento, fica eleito o Foro da Comarca de São Paulo/SP, com renúncia expressa a qualquer outro.',
      s6Contact: 'Dúvidas ou solicitações jurídicas: envie e-mail diretamente para',
    },
    privacy: {
      badge: 'Em conformidade com a LGPD (Lei 13.709/2018) & GDPR',
      title: 'Política de Privacidade e Proteção de Dados',
      subtitle:
        'Transparência absoluta sobre o tratamento de informações, retenção local, segurança criptográfica e exercício dos direitos do titular no portal e PWA DinhEuro.',
      dpoTitle: 'Encarregado de Proteção de Dados (DPO)',
      dpoDesc:
        'Canal direto para solicitações de privacidade, revogação de consentimento e esclarecimentos sobre a LGPD:',
      s1Title: '1. Nosso Compromisso com a sua Privacidade',
      s1P1:
        'O DinhEuro preza pelo respeito irrestrito à intimidade, honra e autodeterminação informativa dos seus usuários, operando em rigorosa conformidade com a Lei Geral de Proteção de Dados Pessoais do Brasil (Lei nº 13.709/2018 - LGPD), com o Marco Civil da Internet (Lei nº 12.965/2014) e, subsidiariamente para usuários internacionais, com o Regulamento Geral sobre a Proteção de Dados da União Europeia (GDPR - Regulamento UE 2016/679).',
      s1P2:
        'Adotamos o princípio de Privacy by Design e Privacy by Default: o DinhEuro foi concebido para funcionar com o mínimo de dados possível, priorizando o processamento em tempo de execução no próprio navegador do usuário (Client-Side).',
      s2Title: '2. Dados Coletados e Finalidades do Tratamento',
      s2Intro: 'Diferenciamos os dados operados em dois níveis de armazenamento:',
      s2ATitle: 'A. Dados Locais no Dispositivo (Armazenamento Exclusivo do Usuário)',
      s2ADesc:
        'Suas simulações de câmbio, ativos da carteira de investimentos (`dinheuro_user_portfolio_v1`), preferências e escolhas de tema visual (`dinheuro_theme`) são gravados unicamente no localStorage do seu próprio navegador. Esses dados nunca são enviados ou armazenados em servidores centrais do DinhEuro.',
      s2BTitle: 'B. Dados de Telemetria Técnica e Desempenho',
      s2BDesc:
        'Registros de conexão estritamente necessários para entrega de conteúdo HTTP/HTTPS e segurança (endereço IP anonimizado, User-Agent, data/hora e páginas visitadas) coletados por infraestrutura de CDN e servidores em nuvem de alta segurança para prevenção de fraudes e mitigação de ataques cibernéticos (Art. 7º, IX da LGPD - Legítimo Interesse).',
      s3Title: '3. Hipóteses Legais para o Tratamento (Bases Legais)',
      s3Intro: 'Todo tratamento de dados realizado pelo DinhEuro possui fundamento jurídico expressamente previsto no Artigo 7º da LGPD:',
      s3Items: [
        {
          strong: 'Consentimento (Art. 7º, I):',
          text: 'obtido mediante aceite inequívoco no Banner LGPD para utilização de cookies funcionais e de análise.',
        },
        {
          strong: 'Cumprimento de Obrigação Legal (Art. 7º, II):',
          text: 'guarda de registros de acesso a aplicações de internet pelo prazo mínimo de 6 meses, nos termos do Art. 15 do Marco Civil da Internet.',
        },
        {
          strong: 'Legítimo Interesse (Art. 7º, IX):',
          text: 'monitoramento de estabilidade, desempenho do PWA, caching de cotações em tempo real e proteção contra acessos automatizados hostis.',
        },
      ],
      s4Title: '4. Compartilhamento de Dados com Terceiros',
      s4Intro:
        'O DinhEuro NÃO comercializa, não aluga e não repassa dados pessoais ou históricos de navegação para anunciantes, corretores de leads ou birôs de crédito. O compartilhamento ocorre estritamente com provedores de infraestrutura essencial:',
      s4Items: [
        {
          strong: 'Provedores de Infraestrutura de Nuvem e CDN:',
          text: 'servidores web seguros, nós de borda (edge) e balanceamento de carga com certificação SSL/TLS de ponta a ponta.',
        },
        {
          strong: 'Provedores de Feeds de Mercado Financeiro:',
          text: 'consultas de cotações e taxas interbancárias realizadas via canais anônimos sem qualquer vinculação à identidade civil do usuário.',
        },
      ],
      s5Title: '5. Direitos do Titular de Dados Pessoais',
      s5Intro:
        'Em observância ao Artigo 18 da LGPD, o usuário titular pode, a qualquer tempo e sem qualquer custo, solicitar:',
      s5Bullets: [
        'Confirmação da existência de tratamento e acesso aos dados.',
        'Correção de dados incompletos, inexatos ou desatualizados.',
        'Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.',
        'Revogação do consentimento concedido anteriormente para cookies e preferências.',
        'Informação sobre as entidades públicas e privadas com as quais o controlador compartilhou dados.',
      ],
      s5ContactPrefix: 'Para exercer qualquer um desses direitos, basta enviar uma mensagem formal ao Encarregado (DPO) através do endereço',
      s5ContactSuffix: 'Respondemos a todas as solicitações no prazo legal aplicável.',
      s6Title: '6. Medidas de Segurança Cibernética',
      s6Desc:
        'Implementamos protocolos modernos de segurança da informação, incluindo criptografia ponta a ponta via TLS 1.3 / HTTPS, cabeçalhos HTTP de segurança (HSTS, Content Security Policy, X-Frame-Options), isolamento de variáveis de ambiente no servidor e armazenamento modular sem sessões vulneráveis no cliente.',
    },
    cookies: {
      badge: 'Transparência & Gestão de Cookies',
      title: 'Política de Cookies e Tecnologias de Rastreamento',
      subtitle:
        'Entenda como o DinhEuro utiliza cookies essenciais, armazenamento local (localStorage) e service workers no PWA para garantir estabilidade, segurança e personalização sem invadir sua privacidade.',
      manageTitle: 'Gerenciar seu Consentimento no DinhEuro',
      manageDesc:
        'Você pode alterar ou revogar sua decisão de consentimento para cookies e armazenamento local a qualquer momento. Ao redefinir, o banner de consentimento reaparecerá imediatamente na tela.',
      resetBtn: 'Redefinir Preferências de Cookies',
      s1Title: '1. O que são Cookies e Tecnologias Similares?',
      s1Desc:
        'Cookies são pequenos arquivos de texto enviados pelo servidor web e armazenados no navegador do usuário. No contexto de aplicações modernas como o Progressive Web App (PWA) do DinhEuro, tecnologias complementares como o localStorage e Service Workers (Cache Storage) desempenham papel análogo, viabilizando o carregamento instantâneo offline e a persistência de configurações pessoais sem necessidade de login.',
      s2Title: '2. Categorias de Cookies e Armazenamento Utilizados',
      catATitle: 'A. Cookies e Storage Estritamente Necessários (Obrigatórios)',
      catABadge: 'Sempre Ativos',
      catADesc:
        'Essenciais para o funcionamento básico, segurança contra requisições forjadas e memorização da sua escolha de consentimento. Sem eles, o site não opera de forma estável.',
      catAItems: [
        { key: 'dinheuro_lgpd_accepted:', desc: 'registra a aceitação dos termos de privacidade.' },
        {
          key: 'workbox-precache:',
          desc: 'armazena arquivos da casca do aplicativo no PWA para funcionamento offline.',
        },
      ],
      catBTitle: 'B. Preferências e Personalização (Funcionais)',
      catBBadge: 'Personalização',
      catBDesc:
        'Armazenam suas escolhas estéticas e organizacionais para que você não precise reconfigurar o aplicativo a cada nova visita.',
      catBItems: [
        { key: 'dinheuro_theme:', desc: 'guarda a seleção de Tema Escuro ou Claro.' },
        {
          key: 'dinheuro_user_portfolio_v1:',
          desc: 'armazena os ativos e quantidades cadastradas na aba Minhas Carteiras no dispositivo do usuário.',
        },
        {
          key: 'dinheuro_market_pref:',
          desc: 'guarda preferências de exibição de cotações e sincronização de dados de mercado.',
        },
      ],
      catCTitle: 'C. Desempenho e Diagnóstico Técnico',
      catCBadge: 'Otimização',
      catCDesc:
        'Métricas anônimas e agregadas de latência na renderização de gráficos D3 e tempos de resposta de cotações em tempo real para prevenção de falhas sistêmicas. Não identificam o usuário pessoalmente.',
      s3Title: '3. Como Gerenciar ou Desativar Cookies no seu Navegador',
      s3Desc:
        'Você pode bloquear ou excluir cookies a qualquer momento nas opções de privacidade do seu navegador. Note que a desativação de cookies essenciais ou do localStorage pode desativar recursos essenciais, como a retenção das suas carteiras e o modo offline do PWA.',
      browsers: [
        {
          name: 'Google Chrome:',
          steps: 'Configurações → Privacidade e Segurança → Cookies de terceiros e dados de sites.',
        },
        {
          name: 'Mozilla Firefox:',
          steps: 'Opções → Privacidade e Segurança → Cookies e dados de sites → Limpar dados.',
        },
        {
          name: 'Apple Safari (iOS / macOS):',
          steps: 'Ajustes / Preferências → Safari → Privacidade → Bloquear todos os cookies.',
        },
        {
          name: 'Microsoft Edge:',
          steps: 'Configurações → Cookies e permissões do site → Gerenciar e excluir dados.',
        },
      ],
    },
    disclaimer: {
      badge: 'Aviso Regulatório Obrigatório',
      title: 'Aviso Legal & Disclaimer Financeiro',
      subtitle:
        'Origem dos dados de mercado, política de latência de cotações e ressalva regulatória sobre ausência de consultoria de valores mobiliários no DinhEuro.',
      s1Title: '1. Ausência de Consultoria ou Recomendação de Investimento',
      s1P1Before: 'O portal',
      s1P1After: 'destina-se exclusivamente a fins informativos, analíticos, estatísticos e educacionais.',
      s1P2:
        'Nenhum conteúdo divulgado na plataforma — incluindo índices, indicadores técnicos (SMA, RSI), diagnósticos quantitativos, simuladores de juros compostos ou conversões de paridade Euro-Dólar-Real — deve ser interpretado como aconselhamento financeiro, recomendação de alocação de ativos, solicitação de compra ou venda de ações, títulos ou moedas, ou parecer tributário.',
      s2Title: '2. Provedores Oficiais de Dados e Condições de Mercado',
      s2Intro: 'O DinhEuro agrega dados de provedores consolidados e fontes públicas oficiais internacionais:',
      s2Cards: [
        {
          title: '• Bolsas Internacionais & Ações Globais',
          desc: 'Cotações em tempo real de ações norte-americanas (Wall Street), dados de fechamento e fundamentos de empresas.',
        },
        {
          title: '• Câmbio Comercial & Taxas Interbancárias',
          desc: 'Taxas de câmbio comercial e paridades de moedas soberanas (EUR, USD, BRL, GBP, JPY, CHF).',
        },
        {
          title: '• Redes Globais de Criptoativos',
          desc: 'Preços e variações de 24 horas dos principais ativos digitais globais (BTC, ETH, SOL, BNB).',
        },
        {
          title: '• Mercado de Capitais Brasileiro (B3)',
          desc: 'Cotações das principais companhias listadas na Bolsa de Valores do Brasil (B3) e pontuação do Ibovespa.',
        },
      ],
      s2LatencyLabel: 'Ressalva de Latência:',
      s2LatencyDesc:
        'Salvo expressa indicação em contrário, os dados de mercado não são necessariamente fornecidos com execução no milissegundo de tick por bolsas de valores, podendo conter atrasos normais de transmissão de rede de 1 a 15 minutos dependendo da bolsa de origem.',
      s3Title: '3. Riscos Associados à Negociação nos Mercados Financeiros',
      s3P1:
        'A negociação de instrumentos financeiros, pares de moedas (Forex), derivativos, contratos futuros e criptomoedas envolve risco substancial de perda do patrimônio investido.',
      s3P2:
        'Rentabilidade pretérita não constitui garantia de rentabilidade futura. Flutuações nas taxas de câmbio podem gerar efeitos adversos sobre o valor, preço ou rentabilidade de qualquer investimento denominado em moeda estrangeira.',
      s4Title: '4. Limitação de Responsabilidade Técnica',
      s4P1:
        'Em nenhuma circunstância o DinhEuro, seus desenvolvedores, mantenedores ou parceiros tecnológicos serão responsáveis por qualquer perda direta, indireta, incidental, especial ou consequente resultante de erros, imprecisões nas cotações ou indisponibilidade temporária de servidores.',
      s4Contact: 'Dúvidas regulatórias ou comunicação formal:',
    },
  },
  en: {
    backToHome: 'Back to Home',
    terms: {
      badge: 'Effective: November/2026',
      title: 'Terms of Use and Service',
      subtitle:
        'General browsing terms, platform license conditions for DinhEuro, intellectual property, and regulatory guidelines across Brazilian and international financial markets.',
      s1Title: '1. Legal Nature and Platform Definition',
      s1P1Before: '',
      s1P1Mid:
        'is a digital portal, aggregator of public economic data, and provider of analytical tools and financial calculators strictly for informational and educational purposes.',
      s1P1After: '',
      s1P2Before:
        'DinhEuro operates exclusively as an informational and educational digital portal, aggregator of public economic data, analytical tools, financial calculators, and economic media channel. DinhEuro',
      s1P2Bold: 'IS NOT',
      s1P2After:
        'a financial institution, does not execute direct FX brokerage, does not hold custody of client funds or securities, and does not operate as a licensed broker-dealer under CVM or the Central Bank of Brazil.',
      s2Title: '2. Financial Liability Disclaimer (Investment Disclaimer)',
      s2Warning:
        'NO INFORMATION, CHART, QUOTE, OR CONTENT PROVIDED ON THIS WEBSITE CONSTITUTES FINANCIAL ADVICE, INVESTMENT RESEARCH, CONSULTANCY, OR AN OFFER TO BUY OR SELL ANY FINANCIAL ASSET.',
      s2P2:
        'Currency quotes (Euro, Dollar, Real, Pound), equities from B3 and international exchanges (Wall Street, Frankfurt, London), crypto assets, interest rates, and commodities are transmitted via institutional market feeds, interbank FX networks, and public order books. DinhEuro assumes no liability for network latency, quote refresh delays, third-party FX spreads, or investment decisions made by users based on displayed data.',
      s2P3:
        'Investing in equities, Forex, contracts for difference (CFDs), and cryptocurrencies carries substantial volatility risk and potential capital loss. Investors should always consult certified professionals before allocating capital.',
      s3Title: '3. Rules of Conduct and Acceptable Use',
      s3Intro: 'By using DinhEuro, you agree to:',
      s3Bullets: [
        'Use platform resources strictly for lawful, personal, or market-research purposes.',
        'Refrain from deploying malicious bots, abusive web scraping, reverse engineering, or denial-of-service (DDoS) attacks against the portal infrastructure.',
        'Acknowledge that tax and FX calculations are algorithmic estimates subject to variation from local taxes (IOF), commercial spreads, and current tax regulations.',
      ],
      s4Title: '4. DinhEuro Brand Intellectual Property',
      s4P1Before: 'The wordmark and figurative trademark',
      s4P1After:
        ', the official Euro/Real exchange ring logo, UI layouts, color system, source code, PWA architecture, custom charting engines, and proprietary parity algorithms belong exclusively to their founders and developers, protected under Industrial Property Law (Law No. 9,279/1996) and Software Law (Law No. 9,609/1998).',
      s4P2: 'Total or partial reproduction, copying, or distribution without prior written authorization is strictly prohibited.',
      s5Title: '5. External Links, Brokers, and Commercial Partners',
      s5P1:
        'The portal may display links to financial services, currency platforms, regulated international brokers (e.g., Interactive Brokers, Nomad, Avenue, Wise), and news publishers (e.g., Reuters, Bloomberg, Valor Econômico). DinhEuro is not responsible for the terms, privacy policies, solvency, or transactions conducted directly on third-party platforms.',
      s6Title: '6. Changes to Terms and Governing Jurisdiction',
      s6P1:
        'These Terms may be updated periodically to reflect regulatory updates or new module releases. The revision date will always appear at the top of this page.',
      s6P2:
        'These Terms of Use are governed by the laws of the Federative Republic of Brazil. The Courts of São Paulo/SP shall have exclusive jurisdiction over any disputes arising herefrom.',
      s6Contact: 'Legal inquiries or formal requests: email us directly at',
    },
    privacy: {
      badge: 'Compliant with LGPD (Law 13,709/2018) & GDPR',
      title: 'Privacy Policy and Data Protection',
      subtitle:
        'Full transparency regarding data processing, local-first storage, cryptographic security, and data-subject rights across the DinhEuro portal and PWA.',
      dpoTitle: 'Data Protection Officer (DPO)',
      dpoDesc:
        'Direct channel for privacy requests, consent withdrawal, and LGPD/GDPR inquiries:',
      s1Title: '1. Our Commitment to Your Privacy',
      s1P1:
        'DinhEuro upholds strict respect for user privacy and informational self-determination, operating in full compliance with Brazil’s General Data Protection Law (LGPD — Law No. 13,709/2018), the Brazilian Internet Civil Framework (Law No. 12,965/2014), and for international visitors, the European Union General Data Protection Regulation (GDPR — Regulation EU 2016/679).',
      s1P2:
        'We follow Privacy by Design and Privacy by Default principles: DinhEuro is engineered to operate with minimal data collection, prioritizing client-side execution inside your browser.',
      s2Title: '2. Data Collected and Processing Purposes',
      s2Intro: 'We separate operational data across two storage tiers:',
      s2ATitle: 'A. Local Device Data (User-Only Storage)',
      s2ADesc:
        'Your FX simulations, portfolio positions (`dinheuro_user_portfolio_v1`), language settings, and visual theme (`dinheuro_theme`) are saved solely in your browser’s localStorage. This data is never transmitted to or stored on central DinhEuro servers.',
      s2BTitle: 'B. Technical Telemetry and Performance Data',
      s2BDesc:
        'Connection logs strictly required for HTTP/HTTPS delivery and security (anonymized IP address, User-Agent, timestamp, and requested pages) processed by CDN and cloud edge infrastructure for fraud prevention and DDoS mitigation (Legitimate Interest — Art. 7, IX LGPD).',
      s3Title: '3. Legal Bases for Data Processing',
      s3Intro: 'All data processing carried out by DinhEuro relies on legal bases expressly established in Article 7 of the LGPD:',
      s3Items: [
        {
          strong: 'Consent (Art. 7, I):',
          text: 'obtained via explicit acceptance in the Privacy Consent Banner for functional and analytics storage.',
        },
        {
          strong: 'Legal Obligation Compliance (Art. 7, II):',
          text: 'retention of internet application access logs for the statutory 6-month minimum under Art. 15 of Law 12,965/2014.',
        },
        {
          strong: 'Legitimate Interest (Art. 7, IX):',
          text: 'uptime monitoring, PWA performance, real-time quote caching, and protection against malicious automated traffic.',
        },
      ],
      s4Title: '4. Data Sharing with Third Parties',
      s4Intro:
        'DinhEuro DOES NOT sell, rent, or transfer personal data or browsing history to advertisers, lead brokers, or credit bureaus. Sharing is strictly limited to essential infrastructure providers:',
      s4Items: [
        {
          strong: 'Cloud & CDN Infrastructure Providers:',
          text: 'secure web servers, edge nodes, and load balancers protected with end-to-end SSL/TLS encryption.',
        },
        {
          strong: 'Financial Market Feed Providers:',
          text: 'anonymous market-quote and interbank FX rate queries with zero linkage to user identity.',
        },
      ],
      s5Title: '5. Data Subject Rights',
      s5Intro:
        'Pursuant to Article 18 of the LGPD and equivalent GDPR provisions, you may at any time and free of charge request:',
      s5Bullets: [
        'Confirmation of processing and access to stored records.',
        'Correction of incomplete, inaccurate, or outdated data.',
        'Anonymization, blocking, or deletion of unnecessary or non-compliant data.',
        'Withdrawal of previously granted consent for cookies and preferences.',
        'Information on public or private entities with which data was shared.',
      ],
      s5ContactPrefix: 'To exercise any of these rights, please email our Data Protection Officer (DPO) at',
      s5ContactSuffix: 'We respond to all requests within the applicable statutory timeframe.',
      s6Title: '6. Cybersecurity Safeguards',
      s6Desc:
        'We implement modern information security controls including end-to-end TLS 1.3 / HTTPS encryption, security headers (HSTS, Content Security Policy, X-Frame-Options), server environment isolation, and stateless client storage.',
    },
    cookies: {
      badge: 'Transparency & Cookie Controls',
      title: 'Cookie Policy and Tracking Technologies',
      subtitle:
        'Understand how DinhEuro uses essential storage, browser localStorage, and PWA service workers to ensure stability, security, and personalization without invading your privacy.',
      manageTitle: 'Manage Your Consent on DinhEuro',
      manageDesc:
        'You can update or revoke your consent decision for cookies and local storage at any time. Resetting will immediately reopen the consent banner.',
      resetBtn: 'Reset Cookie Preferences',
      s1Title: '1. What Are Cookies and Similar Technologies?',
      s1Desc:
        'Cookies are small text files sent by web servers and stored by your browser. In modern Progressive Web Apps (PWAs) like DinhEuro, companion technologies such as localStorage and Service Workers (Cache Storage) serve an analogous role, enabling instant offline loading and persistent user preferences without requiring sign-in.',
      s2Title: '2. Categories of Cookies and Storage Used',
      catATitle: 'A. Strictly Necessary Cookies & Storage (Mandatory)',
      catABadge: 'Always Active',
      catADesc:
        'Essential for core platform functionality, request security, and remembering your consent choice. Without these, the site cannot function reliably.',
      catAItems: [
        { key: 'dinheuro_lgpd_accepted:', desc: 'records acceptance of the privacy notice.' },
        {
          key: 'workbox-precache:',
          desc: 'caches core PWA shell assets for offline availability.',
        },
      ],
      catBTitle: 'B. Preferences & Personalization (Functional)',
      catBBadge: 'Personalization',
      catBDesc:
        'Store your visual and layout choices so you do not have to reconfigure the app on every visit.',
      catBItems: [
        { key: 'dinheuro_theme:', desc: 'stores your Dark or Light theme selection.' },
        {
          key: 'dinheuro_user_portfolio_v1:',
          desc: 'stores the holdings and quantities saved under Portfolios on your device.',
        },
        {
          key: 'dinheuro_market_pref:',
          desc: 'saves quote display preferences and market data sync settings.',
        },
      ],
      catCTitle: 'C. Performance & Technical Diagnostics',
      catCBadge: 'Optimization',
      catCDesc:
        'Aggregated, anonymous latency metrics for D3 chart rendering and real-time quote responses used to prevent system failures. They never identify individual users.',
      s3Title: '3. How to Manage or Disable Cookies in Your Browser',
      s3Desc:
        'You may block or clear cookies anytime in your browser privacy settings. Please note that disabling essential storage or localStorage may disable portfolio persistence and PWA offline mode.',
      browsers: [
        {
          name: 'Google Chrome:',
          steps: 'Settings → Privacy and security → Third-party cookies and site data.',
        },
        {
          name: 'Mozilla Firefox:',
          steps: 'Settings → Privacy & Security → Cookies and Site Data → Clear Data.',
        },
        {
          name: 'Apple Safari (iOS / macOS):',
          steps: 'Settings / Preferences → Safari → Privacy → Block All Cookies.',
        },
        {
          name: 'Microsoft Edge:',
          steps: 'Settings → Cookies and site permissions → Manage and delete cookies and site data.',
        },
      ],
    },
    disclaimer: {
      badge: 'Mandatory Regulatory Notice',
      title: 'Legal Notice & Financial Disclaimer',
      subtitle:
        'Market data provenance, quote latency policy, and regulatory notice confirming absence of investment advisory services on DinhEuro.',
      s1Title: '1. No Financial Advice or Investment Recommendations',
      s1P1Before: 'The',
      s1P1After: 'portal is provided exclusively for informational, analytical, statistical, and educational purposes.',
      s1P2:
        'No content published on the platform — including indices, technical indicators (SMA, RSI), quantitative diagnostics, compound interest simulators, or EUR–USD–BRL FX conversions — should be construed as financial advice, asset allocation recommendations, solicitations to buy or sell securities or currencies, or tax opinions.',
      s2Title: '2. Official Data Feeds and Market Conditions',
      s2Intro: 'DinhEuro aggregates market data from consolidated institutional feeds and official international public sources:',
      s2Cards: [
        {
          title: '• International Exchanges & Global Equities',
          desc: 'Real-time US stock quotes (Wall Street), closing prices, and corporate valuation fundamentals.',
        },
        {
          title: '• Commercial FX & Interbank Rates',
          desc: 'Commercial FX rates and sovereign currency parities (EUR, USD, BRL, GBP, JPY, CHF).',
        },
        {
          title: '• Global Crypto Asset Networks',
          desc: '24-hour prices and percentage changes across major global digital assets (BTC, ETH, SOL, BNB).',
        },
        {
          title: '• Brazilian Capital Markets (B3)',
          desc: 'Quotes for leading companies listed on Brazil’s B3 Stock Exchange and Ibovespa index levels.',
        },
      ],
      s2LatencyLabel: 'Latency Notice:',
      s2LatencyDesc:
        'Unless explicitly stated otherwise, market quotes are not necessarily tick-by-tick millisecond exchange feeds and may reflect standard network delays of 1 to 15 minutes depending on the originating exchange.',
      s3Title: '3. Risks Associated with Financial Market Trading',
      s3P1:
        'Trading financial instruments, currency pairs (Forex), derivatives, futures contracts, and cryptocurrencies involves substantial risk of capital loss.',
      s3P2:
        'Past performance is not indicative of future results. Exchange-rate fluctuations may adversely affect the value, price, or return of any foreign-currency-denominated investment.',
      s4Title: '4. Limitation of Technical Liability',
      s4P1:
        'Under no circumstances shall DinhEuro, its developers, maintainers, or technology partners be liable for any direct, indirect, incidental, special, or consequential losses arising from quote inaccuracies, delays, or temporary server unavailability.',
      s4Contact: 'Regulatory inquiries or formal notices:',
    },
  },
  es: {
    backToHome: 'Volver al Inicio',
    terms: {
      badge: 'Vigencia: Noviembre/2026',
      title: 'Términos de Uso y Servicio',
      subtitle:
        'Condiciones generales de navegación, licencia de uso de la plataforma DinhEuro, propiedad intelectual y directrices regulatorias en el mercado financiero brasileño e internacional.',
      s1Title: '1. Naturaleza Jurídica y Definición de la Plataforma',
      s1P1Before: '',
      s1P1Mid:
        'es un portal digital, agregador de datos económicos públicos y proveedor de herramientas analíticas y simuladores financieros de uso estrictamente informativo y educativo.',
      s1P1After: '',
      s1P2Before:
        'DinhEuro actúa exclusivamente como portal digital informativo y educativo, agregador de datos económicos públicos, herramientas analíticas, simuladores financieros y medio informativo económico. DinhEuro',
      s1P2Bold: 'NO',
      s1P2After:
        'es una institución financiera, no realiza intermediación directa de divisas, no custodia fondos ni valores mobiliarios, y no opera como corredor regulado por la CVM ni por el Banco Central de Brasil.',
      s2Title: '2. Exención de Responsabilidad Financiera (Disclaimer)',
      s2Warning:
        'NINGUNA INFORMACIÓN, GRÁFICO, COTIZACIÓN O CONTENIDO DISPONIBLE EN ESTE SITIO CONSTITUYE RECOMENDACIÓN, ASESORÍA, ANÁLISIS NI OFERTA DE COMPRA O VENTA DE ACTIVOS FINANCIEROS.',
      s2P2:
        'Las cotizaciones de divisas (Euro, Dólar, Real, Libra), acciones de B3 y bolsas internacionales (Wall Street, Fráncfort, Londres), criptoactivos, tasas de interés y materias primas se transmiten mediante feeds institucionales de mercado, cambio interbancario y libros públicos de negociación. DinhEuro no se responsabiliza por latencias de red, demoras de actualización, diferenciales de terceros ni decisiones de inversión adoptadas por el usuario.',
      s2P3:
        'Las inversiones en renta variable, Forex, contratos por diferencia (CFD) y criptomonedas conllevan elevado riesgo de volatilidad y pérdida de capital. Consulte siempre a profesionales certificados antes de invertir.',
      s3Title: '3. Reglas de Conducta y Uso Aceptable',
      s3Intro: 'Al utilizar DinhEuro, usted acepta:',
      s3Bullets: [
        'Utilizar los recursos con fines lícitos, personales o de investigación de mercado.',
        'No emplear bots maliciosos, scraping abusivo, ingeniería inversa ni ataques de denegación de servicio (DDoS) contra la infraestructura del portal.',
        'Reconocer que las simulaciones fiscales o cambiarias son aproximaciones algorítmicas sujetas a variaciones por IOF, spreads comerciales y normativa fiscal vigente.',
      ],
      s4Title: '4. Propiedad Intelectual de la Marca DinhEuro',
      s4P1Before: 'La marca nominativa y figurativa',
      s4P1After:
        ', el logotipo oficial con el anillo cambiario Euro/Real, diseños, paleta cromática, código fuente, arquitectura PWA, motores gráficos propios y algoritmos propietarios están protegidos por la Ley de Propiedad Industrial (Ley n.º 9.279/1996) y la Ley de Software (Ley n.º 9.609/1998).',
      s4P2: 'Queda expresamente prohibida la reproducción total o parcial, copia o distribución sin autorización previa por escrito.',
      s5Title: '5. Enlaces Externos, Corredores y Socios Comerciales',
      s5P1:
        'El portal puede mostrar enlaces a servicios financieros, casas de cambio, brókeres internacionales regulados (p. ej., Interactive Brokers, Nomad, Avenue, Wise) y medios periodísticos (p. ej., Reuters, Bloomberg, Valor Econômico). DinhEuro no responde por los términos, políticas de privacidad u operaciones contratadas en plataformas de terceros.',
      s6Title: '6. Modificaciones y Jurisdicción Competente',
      s6P1:
        'Estos Términos pueden actualizarse periódicamente para reflejar cambios regulatorios o nuevos módulos. La fecha de última revisión figurará siempre en la parte superior.',
      s6P2:
        'Estos Términos de Uso se rigen por las leyes de la República Federativa del Brasil, con jurisdicción exclusiva de los tribunales de São Paulo/SP.',
      s6Contact: 'Consultas o solicitudes legales: escriba directamente a',
    },
    privacy: {
      badge: 'Conforme con LGPD (Ley 13.709/2018) & GDPR',
      title: 'Política de Privacidad y Protección de Datos',
      subtitle:
        'Transparencia absoluta sobre el tratamiento de información, retención local, seguridad criptográfica y ejercicio de derechos del titular en el portal y PWA DinhEuro.',
      dpoTitle: 'Delegado de Protección de Datos (DPO)',
      dpoDesc:
        'Canal directo para solicitudes de privacidad, revocación de consentimiento y consultas sobre LGPD/GDPR:',
      s1Title: '1. Nuestro Compromiso con su Privacidad',
      s1P1:
        'DinhEuro respeta irrestrictamente la privacidad y autodeterminación informativa de sus usuarios, operando conforme a la Ley General de Protección de Datos de Brasil (Ley n.º 13.709/2018 - LGPD), el Marco Civil de Internet (Ley n.º 12.965/2014) y el Reglamento General de Protección de Datos de la Unión Europea (GDPR - Reglamento UE 2016/679).',
      s1P2:
        'Aplicamos los principios de Privacy by Design y Privacy by Default: DinhEuro fue diseñado para funcionar con la mínima recolección de datos, priorizando el procesamiento local en el navegador del usuario.',
      s2Title: '2. Datos Recopilados y Finalidades del Tratamiento',
      s2Intro: 'Diferenciamos los datos operados en dos niveles de almacenamiento:',
      s2ATitle: 'A. Datos Locales en el Dispositivo (Almacenamiento Exclusivo del Usuario)',
      s2ADesc:
        'Sus simulaciones de cambio, posiciones de cartera (`dinheuro_user_portfolio_v1`), idioma y preferencias visuales (`dinheuro_theme`) se guardan únicamente en el localStorage de su navegador. Nunca se envían ni almacenan en servidores centrales de DinhEuro.',
      s2BTitle: 'B. Datos de Telemetría Técnica y Rendimiento',
      s2BDesc:
        'Registros técnicos estrictamente necesarios para entrega HTTP/HTTPS y seguridad (IP anonimizada, User-Agent, fecha/hora y páginas solicitadas) gestionados por CDN y servidores en la nube para prevención de fraudes y mitigación DDoS (Interés Legítimo - Art. 7, IX LGPD).',
      s3Title: '3. Bases Legales para el Tratamiento',
      s3Intro: 'Todo tratamiento de datos realizado por DinhEuro cuenta con fundamento legal previsto en el Artículo 7 de la LGPD:',
      s3Items: [
        {
          strong: 'Consentimiento (Art. 7, I):',
          text: 'obtenido mediante aceptación inequívoca en el banner de privacidad para almacenamiento funcional y analítico.',
        },
        {
          strong: 'Cumplimiento de Obligación Legal (Art. 7, II):',
          text: 'conservación mínima de 6 meses de registros de acceso según el Art. 15 del Marco Civil de Internet.',
        },
        {
          strong: 'Interés Legítimo (Art. 7, IX):',
          text: 'monitoreo de estabilidad, rendimiento de la PWA, caché de cotizaciones en tiempo real y defensa contra tráfico automatizado hostil.',
        },
      ],
      s4Title: '4. Compartición de Datos con Terceros',
      s4Intro:
        'DinhEuro NO comercializa, alquila ni cede datos personales o historial de navegación a anunciantes o intermediarios. La compartición se limita exclusivamente a infraestructura esencial:',
      s4Items: [
        {
          strong: 'Proveedores de Nube y CDN:',
          text: 'servidores seguros, nodos perimetrales y balanceo de carga con cifrado SSL/TLS de extremo a extremo.',
        },
        {
          strong: 'Proveedores de Feeds Financieros:',
          text: 'consultas anónimas de cotizaciones y tasas interbancarias sin vínculo con la identidad civil del usuario.',
        },
      ],
      s5Title: '5. Derechos del Titular de Datos Personales',
      s5Intro:
        'Conforme al Artículo 18 de la LGPD y disposiciones equivalentes del GDPR, el usuario puede solicitar en cualquier momento y sin costo:',
      s5Bullets: [
        'Confirmación de existencia de tratamiento y acceso a los datos.',
        'Corrección de datos incompletos, inexactos o desactualizados.',
        'Anonimización, bloqueo o eliminación de datos innecesarios o tratados en disconformidad.',
        'Revocación del consentimiento otorgado previamente para cookies y preferencias.',
        'Información sobre entidades públicas o privadas con las que se compartieron datos.',
      ],
      s5ContactPrefix: 'Para ejercer cualquiera de estos derechos, escriba formalmente a nuestro DPO a',
      s5ContactSuffix: 'Respondemos todas las solicitudes dentro del plazo legal aplicable.',
      s6Title: '6. Medidas de Seguridad Cibernética',
      s6Desc:
        'Implementamos protocolos modernos de seguridad de la información, incluyendo cifrado TLS 1.3 / HTTPS de extremo a extremo, cabeceras HTTP de seguridad (HSTS, CSP, X-Frame-Options) y almacenamiento modular sin sesiones vulnerables en cliente.',
    },
    cookies: {
      badge: 'Transparencia & Gestión de Cookies',
      title: 'Política de Cookies y Tecnologías de Seguimiento',
      subtitle:
        'Conozca cómo DinhEuro utiliza almacenamiento esencial, localStorage y service workers en la PWA para garantizar estabilidad, seguridad y personalización sin invadir su privacidad.',
      manageTitle: 'Gestionar su Consentimiento en DinhEuro',
      manageDesc:
        'Puede modificar o revocar su decisión de consentimiento para cookies y almacenamiento local en cualquier momento. Al restablecer, el banner volverá a mostrarse inmediatamente.',
      resetBtn: 'Restablecer Preferencias de Cookies',
      s1Title: '1. ¿Qué son las Cookies y Tecnologías Similares?',
      s1Desc:
        'Las cookies son pequeños archivos de texto guardados por su navegador. En aplicaciones modernas como la PWA de DinhEuro, tecnologías como localStorage y Service Workers cumplen una función equivalente, permitiendo carga instantánea offline y persistencia de ajustes sin requerir inicio de sesión.',
      s2Title: '2. Categorías de Cookies y Almacenamiento Utilizados',
      catATitle: 'A. Cookies y Almacenamiento Estrictamente Necesarios (Obligatorios)',
      catABadge: 'Siempre Activos',
      catADesc:
        'Esenciales para la operación básica, seguridad de solicitudes y memorización de su elección de consentimiento.',
      catAItems: [
        { key: 'dinheuro_lgpd_accepted:', desc: 'registra la aceptación de las políticas de privacidad.' },
        {
          key: 'workbox-precache:',
          desc: 'almacena archivos esenciales de la PWA para uso sin conexión.',
        },
      ],
      catBTitle: 'B. Preferencias y Personalización (Funcionales)',
      catBBadge: 'Personalización',
      catBDesc:
        'Guardan sus preferencias visuales y organizativas para no reconfigurar la app en cada visita.',
      catBItems: [
        { key: 'dinheuro_theme:', desc: 'guarda la selección de Tema Oscuro o Claro.' },
        {
          key: 'dinheuro_user_portfolio_v1:',
          desc: 'almacena los activos y cantidades registradas en Mis Carteras en su dispositivo.',
        },
        {
          key: 'dinheuro_market_pref:',
          desc: 'guarda preferencias de visualización de cotizaciones y sincronización de mercado.',
        },
      ],
      catCTitle: 'C. Rendimiento y Diagnóstico Técnico',
      catCBadge: 'Optimización',
      catCDesc:
        'Métricas anónimas y agregadas de latencia en el renderizado de gráficos D3 y tiempos de respuesta de cotizaciones para prevenir fallos técnicos.',
      s3Title: '3. Cómo Gestionar o Desactivar Cookies en su Navegador',
      s3Desc:
        'Puede bloquear o eliminar cookies en cualquier momento en la configuración de privacidad de su navegador. Desactivar el almacenamiento local puede impedir el guardado de carteras y el modo offline de la PWA.',
      browsers: [
        {
          name: 'Google Chrome:',
          steps: 'Configuración → Privacidad y seguridad → Cookies de terceros y datos de sitios.',
        },
        {
          name: 'Mozilla Firefox:',
          steps: 'Ajustes → Privacidad y Seguridad → Cookies y datos del sitio → Limpiar datos.',
        },
        {
          name: 'Apple Safari (iOS / macOS):',
          steps: 'Ajustes / Preferencias → Safari → Privacidad → Bloquear todas las cookies.',
        },
        {
          name: 'Microsoft Edge:',
          steps: 'Configuración → Cookies y permisos del sitio → Administrar y eliminar cookies.',
        },
      ],
    },
    disclaimer: {
      badge: 'Aviso Regulatorio Obligatorio',
      title: 'Aviso Legal & Disclaimer Financiero',
      subtitle:
        'Origen de los datos de mercado, política de latencia y aclaración regulatoria sobre la ausencia de asesoría financiera en DinhEuro.',
      s1Title: '1. Ausencia de Asesoría o Recomendación de Inversión',
      s1P1Before: 'El portal',
      s1P1After: 'se destina exclusivamente a fines informativos, analíticos, estadísticos y educativos.',
      s1P2:
        'Ningún contenido publicado en la plataforma — incluyendo índices, indicadores técnicos (SMA, RSI), diagnósticos cuantitativos, simuladores de interés compuesto o conversiones Euro-Dólar-Real — debe interpretarse como asesoría financiera, recomendación de asignación de activos, oferta de compra/venta ni dictamen fiscal.',
      s2Title: '2. Proveedores Oficiales de Datos y Condiciones de Mercado',
      s2Intro: 'DinhEuro agrega datos de feeds consolidados y fuentes públicas internacionales oficiales:',
      s2Cards: [
        {
          title: '• Bolsas Internacionales & Acciones Globales',
          desc: 'Cotizaciones en tiempo real de acciones estadounidenses (Wall Street), cierres y fundamentos corporativos.',
        },
        {
          title: '• Cambio Comercial & Tasas Interbancarias',
          desc: 'Tipos de cambio comerciales y paridades de divisas soberanas (EUR, USD, BRL, GBP, JPY, CHF).',
        },
        {
          title: '• Redes Globales de Criptoactivos',
          desc: 'Precios y variaciones de 24 horas de los principales activos digitales globales (BTC, ETH, SOL, BNB).',
        },
        {
          title: '• Mercado de Capitales Brasileño (B3)',
          desc: 'Cotizaciones de las principales empresas listadas en la Bolsa de Valores de Brasil (B3) e índice Ibovespa.',
        },
      ],
      s2LatencyLabel: 'Aviso de Latencia:',
      s2LatencyDesc:
        'Salvo indicación expresa, los datos de mercado no se suministran necesariamente al milisegundo de cada tick bursátil y pueden presentar demoras normales de red de 1 a 15 minutos según la bolsa de origen.',
      s3Title: '3. Riesgos Asociados a la Negociación Financiera',
      s3P1:
        'La negociación de instrumentos financieros, pares de divisas (Forex), derivados, contratos de futuros y criptomonedas implica riesgo sustancial de pérdida del capital invertido.',
      s3P2:
        'La rentabilidad pasada no garantiza resultados futuros. Las fluctuaciones cambiarias pueden afectar adversamente el valor o rendimiento de cualquier inversión en moneda extranjera.',
      s4Title: '4. Limitación de Responsabilidad Técnica',
      s4P1:
        'En ningún caso DinhEuro, sus desarrolladores, responsables o socios tecnológicos serán responsables por pérdidas directas, indirectas, incidentales o consecuentes derivadas de imprecisiones en cotizaciones o indisponibilidad temporal.',
      s4Contact: 'Consultas regulatorias o comunicación formal:',
    },
  },
};
