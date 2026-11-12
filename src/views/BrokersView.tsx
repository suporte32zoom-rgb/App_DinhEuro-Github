import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Star,
  ExternalLink,
  CheckCircle,
  Search,
  Globe,
  Coins,
  Zap,
  TrendingUp,
  Award,
} from 'lucide-react';

export interface BrokerInfo {
  id: string;
  name: string;
  category: 'brasil' | 'global' | 'crypto';
  country: string;
  flag: string;
  logoText: string;
  badge?: string;
  rating: number;
  description: string;
  spreadCambio: string;
  brokerageFee: string;
  regulation: string;
  minDeposit: string;
  platforms: string[];
  features: string[];
  websiteUrl: string;
  isZeroFee?: boolean;
}

export const BROKERS_CATALOG: BrokerInfo[] = [
  // ==========================================
  // 1. CORRETORAS DO BRASIL (B3)
  // ==========================================
  {
    id: 'xp',
    name: 'XP Investimentos',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'XP',
    badge: 'Maior do Brasil',
    rating: 4.9,
    description:
      'Maior ecossistema financeiro independente do Brasil. Amplo portfólio de ações na B3, fundos imobiliários, renda fixa com títulos exclusivos e conta internacional integrada.',
    spreadCambio: '1,5% a 2,0%',
    brokerageFee: 'Zero para FIIs e Renda Fixa; R$ 0 online',
    regulation: 'CVM, ANBIMA, Banco Central do Brasil',
    minDeposit: 'Sem valor mínimo',
    platforms: ['XP Mobile', 'XP Desktop', 'Trader Evolution', 'Profit'],
    features: [
      'Assessoria especializada de investimentos',
      'Conta internacional em dólar integrada no mesmo app',
      'Cartão XP Visa Infinite com investback',
    ],
    websiteUrl: 'https://www.xpi.com.br',
    isZeroFee: true,
  },
  {
    id: 'btg',
    name: 'BTG Pactual',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'BTG',
    badge: 'Melhor Banco de Investimentos',
    rating: 4.9,
    description:
      'Maior banco de investimentos da América Latina. Prateleira nobre de renda fixa com emissão própria, crédito estruturado e banking completo de primeira linha.',
    spreadCambio: '1,2% a 1,8%',
    brokerageFee: 'Zero em planos digitais',
    regulation: 'CVM, Banco Central do Brasil, ANBIMA',
    minDeposit: 'R$ 0 (Sem mínimo)',
    platforms: ['BTG Banking & Invest', 'Profit Pro', 'Home Broker Web'],
    features: [
      'Solidez institucional e governança de banco líder',
      'Renda fixa com as melhores taxas de CDB e LCA do país',
      'Cartão Black modular com cashback ou milhas Livelo',
    ],
    websiteUrl: 'https://www.btgpactual.com',
    isZeroFee: true,
  },
  {
    id: 'nuinvest',
    name: 'Nubank / NuInvest',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'NU',
    badge: 'Super App Popular',
    rating: 4.8,
    description:
      'Integração total dos investimentos dentro do aplicativo do Nubank. Prático para compra de ações fracionárias na B3, Tesouro Direto, CDBs e criptomoedas em poucos toques.',
    spreadCambio: '1,5% via remessa internacional',
    brokerageFee: '100% Taxa Zero para Ações, FIIs e BDRs',
    regulation: 'CVM, Banco Central do Brasil',
    minDeposit: 'R$ 1 via PIX',
    platforms: ['App Nubank (iOS & Android)'],
    features: [
      'Experiência móvel ultra rápida e intuitiva',
      'Investimento em frações de ações a partir de R$ 1',
      'Caixinhas de rendimento com 100% do CDI imediato',
    ],
    websiteUrl: 'https://nubank.com.br/investimentos',
    isZeroFee: true,
  },
  {
    id: 'rico',
    name: 'Rico Investimentos',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Rico',
    badge: 'Jovem & Taxa Zero',
    rating: 4.7,
    description:
      'Braço jovem do Grupo XP com foco em investidores iniciantes e intermediários. Taxa zero para os principais ativos, conteúdo educativo dinâmico e carteiras recomendadas.',
    spreadCambio: '1,5% a 2,0%',
    brokerageFee: 'Taxa Zero em Ações, FIIs, BDRs e Renda Fixa',
    regulation: 'CVM, ANBIMA, Banco Central do Brasil',
    minDeposit: 'Sem mínimo',
    platforms: ['App Rico', 'Home Broker Web', 'Profit Rico Trader'],
    features: [
      'Corretagem zero para negociar na B3',
      'Carteiras recomendadas mensais de ações e dividendos',
      'Modo Riconnect com cursos e webinars ao vivo',
    ],
    websiteUrl: 'https://www.rico.com.vc',
    isZeroFee: true,
  },
  {
    id: 'clear',
    name: 'Clear Corretora',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Clear',
    badge: 'Pioneira Day Trade Zero',
    rating: 4.6,
    description:
      'A corretora que revolucionou o mercado brasileiro ao zerar a corretagem. Especializada em traders ativos de mini-índice, minidólar, ações e swing trade com plataformas profissionais.',
    spreadCambio: 'N/A (Foco em B3)',
    brokerageFee: 'Zero Corretagem em todas as operações na B3',
    regulation: 'CVM, ANBIMA (Grupo XP)',
    minDeposit: 'Sem mínimo',
    platforms: ['Profit Clear', 'Tryd Pro', 'Clear Mobile', 'MetaTrader 5'],
    features: [
      'Corretagem zero em Day Trade e Swing Trade',
      'Plataformas de alta performance (Profit Pro gratuito operando)',
      'Calculadora de Imposto de Renda integrada para traders',
    ],
    websiteUrl: 'https://www.clear.com.br',
    isZeroFee: true,
  },
  {
    id: 'toro',
    name: 'Toro Investimentos',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Toro',
    badge: 'Grupo Santander',
    rating: 4.7,
    description:
      'Corretora do Banco Santander com foco em usabilidade, recomendações de trading com um clique e modelo inovador de ganha-ganha, além de corretagem zero.',
    spreadCambio: '1,4% a 1,9%',
    brokerageFee: 'Taxa Zero em Ações, FIIs e Renda Fixa',
    regulation: 'CVM, Banco Central do Brasil, ANBIMA',
    minDeposit: 'Sem mínimo',
    platforms: ['App Toro', 'Toro Trader (Profit)', 'Web'],
    features: [
      'Ganha-Ganha: você só paga taxa se a operação recomendada der lucro',
      'Cashback em fundos de investimento',
      'Integração com a solidez global do Banco Santander',
    ],
    websiteUrl: 'https://www.toroinvestimentos.com.br',
    isZeroFee: true,
  },
  {
    id: 'genial',
    name: 'Genial Investimentos',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Genial',
    badge: 'Alta Performance',
    rating: 4.7,
    description:
      'Uma das corretoras que mais cresce no Brasil, combinando taxa zero em ações e FIIs com infraestrutura robusta para traders (DMA2 direto na B3 e salas ao vivo diárias).',
    spreadCambio: '1,3% a 1,8%',
    brokerageFee: 'Corretagem Zero em Ações, FIIs e BDRs',
    regulation: 'CVM, Banco Central do Brasil, ANBIMA',
    minDeposit: 'Sem mínimo',
    platforms: ['Profit Pro Gratuito', 'Genial Trader', 'App Genial'],
    features: [
      'Profit Pro 100% gratuito operando 1 minicontrato por mês',
      'Salas ao vivo no YouTube com análise técnica e fluxo',
      'Pesquisas eleitorais e macroeconômicas de referência (Genial/Quaest)',
    ],
    websiteUrl: 'https://www.genialinvestimentos.com.br',
    isZeroFee: true,
  },
  {
    id: 'agora',
    name: 'Ágora Investimentos',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Ágora',
    badge: 'Bradesco BBI',
    rating: 4.6,
    description:
      'Casa de investimentos do Banco Bradesco. Conecta análises premiadas do Bradesco BBI com produtos financeiros tradicionais, COE e operações estruturadas.',
    spreadCambio: '1,5% a 2,0%',
    brokerageFee: 'Planos com corretagem zero e assessoria',
    regulation: 'CVM, Banco Central do Brasil, ANBIMA',
    minDeposit: 'Sem mínimo',
    platforms: ['Ágora Mobile', 'Home Broker Ágora', 'Ágora Trader'],
    features: [
      'Relatórios e recomendações institucionais do Bradesco BBI',
      'Integração de saldo e contas com correntistas Bradesco',
      'Ágora Academy com trilhas educacionais completas',
    ],
    websiteUrl: 'https://www.agorainvestimentos.com.br',
    isZeroFee: false,
  },
  {
    id: 'inter',
    name: 'Inter Invest',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Inter',
    badge: 'Brasil + EUA Integrados',
    rating: 4.8,
    description:
      'Plataforma de investimentos do Banco Inter que une a Bolsa Brasileira (B3) e a Bolsa Americana (Nasdaq/NYSE) na mesma tela, com câmbio direto e taxa zero.',
    spreadCambio: '0,99% a 1,5% (um dos menores spreads bancários)',
    brokerageFee: 'Zero Corretagem na B3 e em ações americanas',
    regulation: 'CVM, Banco Central, SEC/FINRA (via Apex)',
    minDeposit: 'R$ 0 / $ 1',
    platforms: ['Super App Inter (iOS & Android)', 'Home Broker Web'],
    features: [
      'Global Account com cartão de débito internacional Mastercard',
      'Taxa zero para negociar ações nos EUA e no Brasil',
      'Cashback diário em fundos e compras no Inter Shop',
    ],
    websiteUrl: 'https://inter.co/pra-voce/investimentos',
    isZeroFee: true,
  },
  {
    id: 'c6',
    name: 'C6 Invest',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'C6',
    badge: 'Conta Global Dólar & Euro',
    rating: 4.7,
    description:
      'Solução de investimentos do C6 Bank (parceria JP Morgan). Notável pela Conta Global multimoeda com suporte nativo a Dólar americano e Euro da União Europeia.',
    spreadCambio: '1,0% a 2,0% em Dólar e Euro comercial',
    brokerageFee: 'Zero corretagem na B3',
    regulation: 'CVM, Banco Central do Brasil',
    minDeposit: 'Sem mínimo',
    platforms: ['App C6 Bank'],
    features: [
      'Contas internacionais em Euro (€) e Dólar ($) com cartões dedicados',
      'C6 TechInvest com carteiras geridas por algoritmo',
      'Pontos Átomos que nunca expiram e viram cashback ou milhas',
    ],
    websiteUrl: 'https://www.c6bank.com.br/investimentos',
    isZeroFee: true,
  },
  {
    id: 'safra',
    name: 'Safra Invest',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Safra',
    badge: 'Private & Tradição',
    rating: 4.8,
    description:
      'Braço de investimentos do quarto maior banco privado do Brasil. Foco em alta renda, preservação patrimonial, crédito privado e fundos Safra de alta performance.',
    spreadCambio: 'Negociável com mesa de câmbio',
    brokerageFee: 'Competitiva sob consulta',
    regulation: 'CVM, Banco Central, ANBIMA',
    minDeposit: 'R$ 1.000 para abertura de conta',
    platforms: ['App Safra', 'Safra Internet Banking', 'Home Broker'],
    features: [
      'Reconhecido mundialmente por solidez e gestão conservadora',
      'Fundos de investimento Safra Galileu e Safra Consumo',
      'Atendimento consultivo e private banking exclusivo',
    ],
    websiteUrl: 'https://www.safra.com.br/investimentos',
    isZeroFee: false,
  },
  {
    id: 'guide',
    name: 'Guide Investimentos',
    category: 'brasil',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Guide',
    badge: 'Multinacional Fosun',
    rating: 4.5,
    description:
      'Corretora brasileira controlada pelo conglomerado global Fosun. Oferece assessoria humanizada, curadoria de fundos independentes e produtos de previdência privada.',
    spreadCambio: '1,5%',
    brokerageFee: 'Planos com isenção em renda variável',
    regulation: 'CVM, ANBIMA, Banco Central',
    minDeposit: 'Sem mínimo',
    platforms: ['Guide App', 'Home Broker Guide'],
    features: [
      'Análises de mercado com visão macroeconômica global',
      'Plataforma completa de fundos e previdência',
      'Apoio consultivo personalizado com assessores credenciados',
    ],
    websiteUrl: 'https://www.guide.com.br',
    isZeroFee: false,
  },

  // ==========================================
  // 2. CORRETORAS INTERNACIONAIS (EUA & EUROPA)
  // ==========================================
  {
    id: 'ibkr',
    name: 'Interactive Brokers (IBKR)',
    category: 'global',
    country: 'Estados Unidos / Global',
    flag: '🇺🇸',
    logoText: 'IBKR',
    badge: 'Líder Mundial Absoluta',
    rating: 4.9,
    description:
      'A mais completa corretora internacional do planeta. Acesso direto a mais de 150 bolsas em 33 países com negociação em Dólar, Euro, Libra e Iene sob as menores margens.',
    spreadCambio: 'A partir de 0,08% (taxa interbancária institucional)',
    brokerageFee: 'A partir de $0.005 / ação nos EUA; €1,25 na Europa',
    regulation: 'SEC, FINRA, SIPC, FCA (Reino Unido), BaFin (Alemanha)',
    minDeposit: '$0 (Sem depósito mínimo)',
    platforms: ['Trader Workstation (TWS)', 'IBKR Desktop', 'IBKR Mobile', 'Client Portal Web'],
    features: [
      'Negociação em bolsas europeias (DAX, Euronext Paris, Amsterdam, Londres)',
      'Remuneração sobre saldo de caixa em dólar e euro não investido',
      'Menores taxas de margem e alavancagem do mercado global',
    ],
    websiteUrl: 'https://www.interactivebrokers.com',
    isZeroFee: false,
  },
  {
    id: 'avenue',
    name: 'Avenue Securities',
    category: 'global',
    country: 'Estados Unidos / Brasil',
    flag: '🇺🇸',
    logoText: 'Avenue',
    badge: 'Líder para Brasileiros',
    rating: 4.8,
    description:
      'Fundada nos EUA com foco total no investidor brasileiro. Aplicativo 100% em português, suporte local, integração bancária com PIX instantâneo e relatórios de IR mastigados.',
    spreadCambio: '1,4% a 2,0% (decrescente por volume)',
    brokerageFee: 'Zero corretagem em planos selecionados',
    regulation: 'SEC, FINRA, SIPC (Proteção até $500k)',
    minDeposit: 'R$ 100 via PIX com conversão na hora',
    platforms: ['App Avenue (iOS & Android)', 'Web Portal'],
    features: [
      'Depósitos via PIX com câmbio imediato para dólares',
      'Relatório de Imposto de Renda automatizado (DARF/GCAP/Declaração)',
      'Cartão de débito Avenue Mastercard aceito no mundo todo',
    ],
    websiteUrl: 'https://avenue.us',
    isZeroFee: true,
  },
  {
    id: 'nomad',
    name: 'Nomad Global',
    category: 'global',
    country: 'Estados Unidos / Brasil',
    flag: '🇺🇸',
    logoText: 'Nomad',
    badge: 'Conta Global & Viagens',
    rating: 4.7,
    description:
      'Fintech sediada nos EUA fornecendo conta corrente em dólares e plataforma de investimentos em Wall Street. Notória pelo cartão de débito para viagens à Europa e compras globais.',
    spreadCambio: '1,0% a 2,0% com programa Nomad Pass',
    brokerageFee: 'Zero corretagem para ações e ETFs americanos',
    regulation: 'SIPC (Proteção até $500.000), FDIC (até $250.000 em banking)',
    minDeposit: 'R$ 100 via PIX',
    platforms: ['App Nomad (iOS & Android)'],
    features: [
      'Cartão aceito em mais de 180 países com IOF reduzido de 1,1%',
      'Salas VIP no Aeroporto de Guarulhos para clientes fidelidade',
      'Investimento em frações de ações a partir de $1',
    ],
    websiteUrl: 'https://www.nomadglobal.com',
    isZeroFee: true,
  },
  {
    id: 'schwab',
    name: 'Charles Schwab',
    category: 'global',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    logoText: 'Schwab',
    badge: 'Maior Corretora dos EUA',
    rating: 4.9,
    description:
      'Uma das maiores gestoras de patrimônio do mundo. Fornece aos investidores internacionais a renomada plataforma thinkorswim, relatórios de equity research e solidez inquestionável.',
    spreadCambio: 'Interbancário direto',
    brokerageFee: '$0 em ações e ETFs listados nos EUA',
    regulation: 'SEC, FINRA, SIPC',
    minDeposit: '$25.000 para contas internacionais',
    platforms: ['thinkorswim Desktop/Mobile', 'Schwab.com Web'],
    features: [
      'Plataforma thinkorswim de ponta para análise técnica e opções',
      'Pesquisa e recomendações de analistas renomados de Wall Street',
      'Conta bancária com reembolso ilimitado de taxas de caixas eletrônicos (ATMs)',
    ],
    websiteUrl: 'https://www.schwab.com',
    isZeroFee: true,
  },
  {
    id: 'fidelity',
    name: 'Fidelity Investments',
    category: 'global',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    logoText: 'Fidelity',
    badge: 'Gigante de Wall Street',
    rating: 4.9,
    description:
      'Pilar do mercado de capitais norte-americano com trilhões de dólares sob custódia. Famosa por fundos mútuos de índice com taxa de administração ZERO e execução de ordens superior.',
    spreadCambio: 'Interbancário de mercado',
    brokerageFee: '$0 para ações e ETFs americanos online',
    regulation: 'SEC, FINRA, SIPC',
    minDeposit: '$0 para residentes / sob consulta para não-residentes',
    platforms: ['Active Trader Pro', 'Fidelity Mobile', 'Fidelity.com'],
    features: [
      'Melhoria de preço líder de mercado na execução de ordens',
      'Fundos Fidelity ZERO com 0,00% de taxa de administração',
      'Ferramentas abrangentes de planejamento de aposentadoria',
    ],
    websiteUrl: 'https://www.fidelity.com',
    isZeroFee: true,
  },
  {
    id: 'robinhood',
    name: 'Robinhood',
    category: 'global',
    country: 'Estados Unidos / Europa',
    flag: '🇺🇸',
    logoText: 'Robin',
    badge: 'Pioneira Zero Fee',
    rating: 4.6,
    description:
      'A corretora que democratizou o acesso a Wall Street para a geração moderna. Oferece negociação de ações, opções e criptoativos 24 horas por dia com interface simplificada.',
    spreadCambio: 'Embutido no spread de mercado',
    brokerageFee: '$0 em todas as ações e ETFs dos EUA',
    regulation: 'SEC, FINRA, SIPC',
    minDeposit: '$0',
    platforms: ['Robinhood Mobile (iOS & Android)', 'Robinhood Web'],
    features: [
      'Trading 24 Horas em ações selecionadas nos EUA',
      'Rendimento sobre saldo de caixa em dólares (Robinhood Gold)',
      'Carteira Web3 nativa para transferência de cripto',
    ],
    websiteUrl: 'https://robinhood.com',
    isZeroFee: true,
  },
  {
    id: 'etoro',
    name: 'eToro',
    category: 'global',
    country: 'Reino Unido / Europa',
    flag: '🇬🇧',
    logoText: 'eToro',
    badge: 'Líder em Copy Trading',
    rating: 4.6,
    description:
      'Pioneira global em investimento social e Copy Trading. Permite copiar automaticamente as carteiras e operações de investidores profissionais de sucesso do mundo todo.',
    spreadCambio: 'Spread padrão de mercado',
    brokerageFee: 'Zero comissão em ações e ETFs',
    regulation: 'FCA (Reino Unido), CySEC (Chipre), ASIC (Austrália), FinCEN',
    minDeposit: '$50 a $100',
    platforms: ['eToro Web Trader', 'App eToro'],
    features: [
      'CopyTrader: replicação de portfólio de investidores verificados',
      'Smart Portfolios temáticos (Inteligência Artificial, Energias Limpas)',
      'Suporte a ações dos EUA, Europa e criptomoedas na mesma carteira',
    ],
    websiteUrl: 'https://www.etoro.com',
    isZeroFee: true,
  },
  {
    id: 'saxobank',
    name: 'Saxo Bank',
    category: 'global',
    country: 'Dinamarca / Europa',
    flag: '🇩🇰',
    logoText: 'Saxo',
    badge: 'Banco de Trading Europeu',
    rating: 4.8,
    description:
      'Banco dinamarquês especializado em negociação de múltiplos ativos globais. Conecta mais de 71.000 instrumentos financeiros entre ações europeias, títulos soberanos e moedas.',
    spreadCambio: 'Spreads institucionais estreitos',
    brokerageFee: 'Taxas baixas e transparentes para a Europa',
    regulation: 'Danish FSA (Dinamarca), FCA, BaFin, FINMA',
    minDeposit: '€0 (Sem mínimo)',
    platforms: ['SaxoTraderGO', 'SaxoTraderPRO (Multitela)'],
    features: [
      'Acesso a todas as bolsas da Zona do Euro cotadas em €',
      'Licença bancária completa com garantia europeia de depósitos',
      'Amplo catálogo de títulos públicos soberanos da Europa e EUA',
    ],
    websiteUrl: 'https://www.home.saxo',
    isZeroFee: false,
  },
  {
    id: 'degiro',
    name: 'DEGIRO',
    category: 'global',
    country: 'Alemanha / Holanda',
    flag: '🇪🇺',
    logoText: 'Degiro',
    badge: 'Líder Europeia Low Cost',
    rating: 4.7,
    description:
      'Maior corretora de varejo da Europa (Grupo flatexDEGIRO). Ampla presença em mais de 18 países europeus com comissões ultrabaixas para ações do DAX, CAC 40 e bolsas globais.',
    spreadCambio: '0,25% (Auto FX)',
    brokerageFee: '€1 a €2 por ordem na Europa / EUA',
    regulation: 'BaFin (Alemanha), Bundesbank, AFM (Holanda)',
    minDeposit: '€0,01',
    platforms: ['DEGIRO App', 'DEGIRO WebTrader'],
    features: [
      'Seleção de ETFs populares com taxa de corretagem ZERO',
      'Depósito bancário com IBAN em euros',
      'Mais de 50 bolsas internacionais acessíveis em uma só conta',
    ],
    websiteUrl: 'https://www.degiro.com',
    isZeroFee: false,
  },
  {
    id: 'swissquote',
    name: 'Swissquote',
    category: 'global',
    country: 'Suíça',
    flag: '🇨🇭',
    logoText: 'Swiss',
    badge: 'Banco Suíço Privado',
    rating: 4.8,
    description:
      'Banco líder em trading online sediado em Gland, na Suíça. Combina o prestígio e a segurança secular do sigilo bancário suíço com tecnologia financeira moderna.',
    spreadCambio: 'Interbancário seguro',
    brokerageFee: 'Tabela bancária suíça',
    regulation: 'FINMA (Autoridade Supervisora do Mercado Financeiro Suíço)',
    minDeposit: '$0 para conta de trading',
    platforms: ['Advanced Trader', 'Swissquote Mobile', 'MetaTrader 4 & 5'],
    features: [
      'Garantia legal suíça de depósitos até CHF 100.000 por cliente',
      'Negociação em Franco Suíço (CHF), Euro (EUR), Dólar (USD) e Libra (GBP)',
      'Acesso direto a fundos de hedge e private equity internacional',
    ],
    websiteUrl: 'https://en.swissquote.com',
    isZeroFee: false,
  },
  {
    id: 'webull',
    name: 'Webull Financial',
    category: 'global',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    logoText: 'Webull',
    badge: 'Trading Tech & Gráficos',
    rating: 4.7,
    description:
      'Plataforma focada em gráficos avançados e dados de mercado gratuitos. Oferece horário estendido de negociação (das 4h às 20h de Nova York) e taxa zero.',
    spreadCambio: 'Taxas de mercado',
    brokerageFee: '$0 Corretagem em Ações e Opções',
    regulation: 'SEC, FINRA, SIPC',
    minDeposit: '$0',
    platforms: ['Webull Desktop App', 'Webull Mobile', 'Web App'],
    features: [
      'Negociação em Pré-Market e After-Hours completa (16 horas por dia)',
      'Gráficos avançados com dezenas de indicadores técnicos sem custo',
      'Simulador de investimentos (Paper Trading) integrado',
    ],
    websiteUrl: 'https://www.webull.com',
    isZeroFee: true,
  },
  {
    id: 'xtb',
    name: 'XTB Online Investing',
    category: 'global',
    country: 'Reino Unido / Polônia',
    flag: '🇵🇱',
    logoText: 'XTB',
    badge: 'Ações Reais + CFD',
    rating: 4.7,
    description:
      'Uma das maiores corretoras listadas em bolsa na Europa. Mais de 1 milhão de clientes usam sua premiada plataforma xStation para ações reais com 0% de comissão e derivativos.',
    spreadCambio: '0,5% em conversão de moedas',
    brokerageFee: '0% de comissão para volume mensal de até €100.000',
    regulation: 'FCA (Reino Unido), KNF (Polônia), CySEC',
    minDeposit: 'Sem mínimo',
    platforms: ['xStation 5', 'xStation Mobile'],
    features: [
      '0% de comissão em mais de 3.000 ações e ETFs reais',
      'Juros mensais pagos sobre o saldo em conta não investido',
      'Plataforma xStation premiada por velocidade de execução',
    ],
    websiteUrl: 'https://www.xtb.com',
    isZeroFee: true,
  },

  // ==========================================
  // 3. CORRETORAS DE CRIPTOATIVOS & WEB3
  // ==========================================
  {
    id: 'binance',
    name: 'Binance',
    category: 'crypto',
    country: 'Global',
    flag: '🌐',
    logoText: 'BNB',
    badge: 'Maior do Mundo em Volume',
    rating: 4.9,
    description:
      'A maior corretora de ativos digitais do mundo por volume de negócios diário. Negociação de Bitcoin, Ethereum, Solana e centenas de altcoins com saques imediatos via PIX.',
    spreadCambio: 'Paridade de livro de ofertas direto',
    brokerageFee: 'A partir de 0,075% (com desconto pagando em BNB)',
    regulation: 'Conformidade global e autorizações em dezenas de países',
    minDeposit: 'R$ 10 via PIX instantâneo',
    platforms: ['Binance Pro Mobile', 'Binance Desktop App', 'Web'],
    features: [
      'Depósitos e saques instantâneos em Reais (BRL) e Euros (EUR)',
      'Fundo de Garantia Seguro de Ativos para Usuários (SAFU)',
      'Mercado de Futuros, Staking com rendimentos e Launchpool',
    ],
    websiteUrl: 'https://www.binance.com',
    isZeroFee: false,
  },
  {
    id: 'mercadobitcoin',
    name: 'Mercado Bitcoin (MB)',
    category: 'crypto',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'MB',
    badge: 'Maior da América Latina',
    rating: 4.8,
    description:
      'Pioneira em criptomoedas no Brasil desde 2013 e licenciada como Instituição de Pagamento pelo Banco Central. Destaca-se por criptoativos, tokens de renda fixa e segurança.',
    spreadCambio: 'Paridade em Reais direto',
    brokerageFee: '0,3% a 0,7% por negociação',
    regulation: 'Banco Central do Brasil (Licença de IP), ABcripto',
    minDeposit: 'R$ 1 via PIX',
    platforms: ['App MB', 'Portal Web Pro'],
    features: [
      'Renda Fixa Digital com rendimentos previsíveis superiores ao CDI',
      'Suporte humanizado em português 24/7',
      'Custódia 100% no Brasil com governança institucional',
    ],
    websiteUrl: 'https://www.mercadobitcoin.com.br',
    isZeroFee: false,
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    category: 'crypto',
    country: 'Estados Unidos',
    flag: '🇺🇸',
    logoText: 'COIN',
    badge: 'Bolsa Nasdaq (COIN)',
    rating: 4.8,
    description:
      'Única exchange de criptoativos listada publicamente na Bolsa de Nova York (Nasdaq: COIN). Máximo padrão de auditoria, conformidade com a SEC e custódia para os ETFs de Bitcoin.',
    spreadCambio: 'Spread oficial transparente',
    brokerageFee: 'A partir de 0,05% no Coinbase Advanced',
    regulation: 'SEC, FinCEN, FCA (Reino Unido), BaFin (Alemanha)',
    minDeposit: '$2 / R$ 10',
    platforms: ['Coinbase App', 'Coinbase Advanced Trader', 'Coinbase Wallet'],
    features: [
      'Auditoria contábil pública das quatro maiores firmas (Big Four)',
      'Custodiante oficial de quase todos os ETFs de Bitcoin e Ethereum dos EUA',
      'Garantia de segurança institucional para clientes pessoas físicas',
    ],
    websiteUrl: 'https://www.coinbase.com',
    isZeroFee: false,
  },
  {
    id: 'kraken',
    name: 'Kraken',
    category: 'crypto',
    country: 'Estados Unidos / Europa',
    flag: '🇺🇸',
    logoText: 'Kraken',
    badge: 'Segurança Histórica Impecável',
    rating: 4.8,
    description:
      'Fundada em 2011, é uma das mais antigas e respeitadas exchanges do planeta. Notória por seu histórico impecável de nunca ter sofrido hacks e por sua Prova de Reservas auditada.',
    spreadCambio: 'Pares diretos em EUR e USD',
    brokerageFee: 'A partir de 0,16% Maker / 0,26% Taker',
    regulation: 'FinCEN (EUA), FCA (Reino Unido), AUSTRAC',
    minDeposit: '€10 / $10',
    platforms: ['Kraken Pro Web', 'Kraken Pro App', 'Kraken Mobile'],
    features: [
      'Auditoria de Prova de Reservas (Proof of Reserves) verificável pelo cliente',
      'Liquidez profunda em pares de Euro (EUR) com transferências SEPA',
      'Trading de futuros com margens reduzidas',
    ],
    websiteUrl: 'https://www.kraken.com',
    isZeroFee: false,
  },
  {
    id: 'foxbit',
    name: 'Foxbit',
    category: 'crypto',
    country: 'Brasil',
    flag: '🇧🇷',
    logoText: 'Fox',
    badge: 'Tradição Brasileira',
    rating: 4.6,
    description:
      'Uma das primeiras corretoras de Bitcoin criadas no Brasil. Plataforma rápida, depósitos e saques em PIX 24 horas por dia e soluções de gateway para empresas.',
    spreadCambio: 'Cotação em Reais',
    brokerageFee: 'A partir de 0,25%',
    regulation: 'ABcripto, Receita Federal (IN 1888)',
    minDeposit: 'R$ 10 via PIX',
    platforms: ['App Foxbit', 'Foxbit Pro Web'],
    features: [
      'PIX automático em qualquer horário do dia ou da noite',
      'Foxbit Pay para aceitar pagamentos em Bitcoin no comércio',
      'Relatórios prontos para declaração de imposto de renda anual',
    ],
    websiteUrl: 'https://foxbit.com.br',
    isZeroFee: false,
  },
  {
    id: 'okx',
    name: 'OKX',
    category: 'crypto',
    country: 'Global',
    flag: '🌐',
    logoText: 'OKX',
    badge: 'Inovação Web3 & DeFi',
    rating: 4.8,
    description:
      'Segunda maior exchange mundial em volume de derivativos. Líder absoluta em carteiras Web3 descentralizadas com suporte a mais de 80 blockchains e depósitos em BRL.',
    spreadCambio: 'Preço de tela interbancário',
    brokerageFee: 'A partir de 0,08%',
    regulation: 'VARA (Dubai), Bahamas, Hong Kong',
    minDeposit: 'R$ 10 via PIX',
    platforms: ['OKX Web3 Wallet', 'OKX App', 'TradingView Integrado'],
    features: [
      'Carteira Web3 não-custodial mais poderosa do mercado cripto',
      'Depósito instantâneo em Reais via PIX sem taxas',
      'Integração nativa com DEXs e mercado de ordens NFT/Inscriptions',
    ],
    websiteUrl: 'https://www.okx.com',
    isZeroFee: false,
  },
  {
    id: 'bybit',
    name: 'Bybit',
    category: 'crypto',
    country: 'Global',
    flag: '🌐',
    logoText: 'Bybit',
    badge: 'Alta Frequência & Futuros',
    rating: 4.7,
    description:
      'Plataforma de alta liquidez favorita de traders quantitativos e profissionais de derivativos. Motor de execução com capacidade para 100.000 transações por segundo.',
    spreadCambio: 'Livro de ofertas de alta liquidez',
    brokerageFee: 'A partir de 0,02% Maker / 0,055% Taker em futuros',
    regulation: 'Licenças internacionais e Prova de Reservas regular',
    minDeposit: 'R$ 10 via PIX',
    platforms: ['Bybit App', 'Bybit Web Pro', 'API de Alta Frequência'],
    features: [
      'Copy Trading de contratos futuros de alta liquidez',
      'Robôs de trading algorítmico (Grid Bots, DCA Bots) integrados',
      'Suporte a pagamentos via PIX e cartões internacionais',
    ],
    websiteUrl: 'https://www.bybit.com',
    isZeroFee: false,
  },
];

export const BrokersView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'brasil' | 'global' | 'crypto' | 'zero'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrokers = BROKERS_CATALOG.filter((broker) => {
    // Category check
    let matchesCategory = true;
    if (filter === 'brasil') matchesCategory = broker.category === 'brasil';
    else if (filter === 'global') matchesCategory = broker.category === 'global';
    else if (filter === 'crypto') matchesCategory = broker.category === 'crypto';
    else if (filter === 'zero') matchesCategory = !!broker.isZeroFee;

    // Search check
    const matchesSearch =
      searchTerm.trim() === '' ||
      broker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.regulation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      broker.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <span>Guia Oficial de Corretoras do Brasil & do Mundo</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Catálogo completo com {BROKERS_CATALOG.length} corretoras reguladas na B3, Wall Street, Europa e ecossistema Cripto. Compare taxas, spreads, plataformas e acesse os sites oficiais com segurança.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome, país, taxa zero..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9.5 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {(
          [
            { id: 'all', label: `Todas as Corretoras (${BROKERS_CATALOG.length})` },
            { id: 'brasil', label: 'Brasil / B3 (12)' },
            { id: 'global', label: 'Internacionais & Europa (12)' },
            { id: 'crypto', label: 'Cripto & Web3 (7)' },
            { id: 'zero', label: 'Taxa Zero / Low Cost' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 ${
              filter === item.id
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Security Disclaimer Banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-blue-950/30 border border-emerald-500/30 p-4 flex items-start gap-3 shadow-lg">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Transparência & Segurança Institucional:</strong> Todas as instituições listadas pelo DinhEuro são autorizadas pelos órgãos competentes de suas jurisdições: CVM e Banco Central no Brasil, SEC e FINRA nos Estados Unidos (com proteção SIPC de até $500.000), BaFin, FCA e FINMA na Europa. Sempre verifique os termos diretamente no portal oficial da instituição.
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Exibindo <strong>{filteredBrokers.length}</strong> instituições encontradas</span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            Limpar busca
          </button>
        )}
      </div>

      {/* Brokers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBrokers.map((broker) => (
          <div
            key={broker.id}
            className="rounded-2xl bg-[#0d1627] border border-slate-800 hover:border-slate-700/80 p-5 shadow-xl transition flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base">{broker.flag}</span>
                    <h2 className="text-base font-bold text-white group-hover:text-emerald-300 transition">
                      {broker.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap pt-0.5">
                    {broker.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300">
                        {broker.badge}
                      </span>
                    )}
                    {broker.isZeroFee && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        Taxa Zero
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-400 font-semibold">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-slate-300 text-[11px]">({broker.rating.toFixed(1)})</span>
                    <span className="text-slate-500">&bull;</span>
                    <span className="text-slate-400 text-[11px]">{broker.country}</span>
                  </div>
                </div>

                <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xs text-emerald-400 flex-shrink-0 shadow-inner">
                  {broker.logoText}
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mt-2 line-clamp-3">
                {broker.description}
              </p>

              {/* Specs Grid */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Corretagem:</span>
                  <span className="font-semibold text-slate-200 text-right">{broker.brokerageFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Câmbio / Spread:</span>
                  <span className="font-semibold text-slate-300 text-right">{broker.spreadCambio}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Depósito Mínimo:</span>
                  <span className="font-semibold text-emerald-400 font-mono-numbers text-right">
                    {broker.minDeposit}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Regulação Oficial:</span>
                  <span className="font-semibold text-slate-300 text-right text-[11px] truncate max-w-[170px]" title={broker.regulation}>
                    {broker.regulation}
                  </span>
                </div>
              </div>

              {/* Supported Platforms tags */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap gap-1">
                {broker.platforms.map((p, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* Key Features Bullet points */}
              <div className="mt-3.5 space-y-1.5">
                {broker.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Link Button (direct URL to broker's website with external safe links) */}
            <div className="pt-3 border-t border-slate-800/80">
              <a
                href={broker.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-xs font-bold text-slate-200 hover:text-white transition flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                title={`Acessar portal oficial de ${broker.name}`}
              >
                <span>Acessar Site Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
