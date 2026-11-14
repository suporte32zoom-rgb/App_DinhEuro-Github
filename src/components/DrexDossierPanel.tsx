import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, Cpu, Landmark } from 'lucide-react';
import drexBanner from '../assets/images/drex_cbdc_currency_1794626746831.jpg';

interface DrexSection {
  id: string;
  title: string;
  paragraphs: string[];
}

const DREX_SECTIONS: DrexSection[] = [
  {
    id: 'o-que-e-drex',
    title: 'O que é o Drex e como vai funcionar?',
    paragraphs: [
      'O Drex é a moeda digital oficial do Banco Central do Brasil (Real Digital). O nome Drex vem da combinação de letras em uma palavra com som forte e moderno: as letras "d" e "r" fazem referência ao Real Digital, o "e" vem de eletrônico e o "x" traz a ideia de conexão, associada à tecnologia utilizada.',
      'O Drex vai permitir que vários tipos de transações financeiras seguras com ativos digitais estejam à sua disposição. Esses serviços financeiros serão liquidados dentro da Plataforma Drex do Banco Central (BC), que é um ambiente integrado e padronizado.',
      'Para ter acesso à Plataforma Drex, você precisará de um intermediário financeiro autorizado, como um banco. Esse intermediário fará a transferência do seu dinheiro depositado em conta para sua carteira digital do Drex, para que você possa realizar transações com ativos digitais com total segurança.',
    ],
  },
  {
    id: 'infraestrutura-smart-contracts',
    title: 'Infraestrutura de Segurança e Execução (Smart Contracts)',
    paragraphs: [
      'Os serviços na Plataforma Drex serão realizados dentro de uma infraestrutura integrada e padronizada, desenhada para garantir que as transações ocorram apenas quando todas as condições necessárias forem cumpridas, trazendo previsibilidade e segurança para todas as partes.',
      'O Drex vai democratizar o acesso aos benefícios da economia digital, tornando as transações financeiras mais simples, eficientes e seguras.',
      'Exemplo prático de liquidação atômica: Se você for comprar um carro, pode ficar com receio de pagar e o vendedor não passar a propriedade do veículo. Com o Drex, não importa quem vai fazer o primeiro movimento, pois o contrato só será concluído quando ambos acontecerem. Assim, o dinheiro e a propriedade do carro serão transferidos de forma simultânea. Se uma das partes falhar, o valor pago e o carro voltam para seus respectivos donos.',
    ],
  },
  {
    id: 'identidade-visual-drex',
    title: 'Conceito Visual e Identidade da Marca',
    paragraphs: [
      'O conceito visual da marca Drex remete ao universo digital, refletindo o contexto da agenda de modernização financeira conduzida pelo Banco Central, a Agenda BC#.',
      'As duas setas inseridas na letra "d" representam etapas de uma transação digital e simbolizam a evolução da moeda brasileira para o ambiente digital.',
      'A transição de cores nas setas, do azul para verde claro, passa a mensagem de "transação concluída". Todos os elementos reforçam a ideia de agilidade da moeda digital do Banco Central, o Drex.',
      'Veja mais casos de usos testados no LIFT Challenge Real Digital e exemplos práticos em Perguntas e Respostas oficiais do Drex.',
    ],
  },
];

export const DrexDossierPanel: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['o-que-e-drex']);
  const [imgFailed, setImgFailed] = useState(false);

  const toggleSection = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenIds(DREX_SECTIONS.map((s) => s.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const allExpanded = openIds.length === DREX_SECTIONS.length;

  return (
    <section
      aria-labelledby="drex-dossier-heading"
      className="bg-[#0d1627] rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
    >
      {/* 1. Imagem Ilustrativa Institucional do Drex no Topo */}
      <div className="relative h-44 sm:h-52 w-full bg-[#070d18] overflow-hidden border-b border-slate-800">
        {!imgFailed ? (
          <img
            src={drexBanner}
            alt="Identidade conceitual do Drex — Moeda Digital Oficial do Banco Central do Brasil com setas de liquidação atômica"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0c1a30] via-[#0B1320] to-[#07111a] flex items-center justify-center p-6">
            <div className="flex items-center gap-4 text-slate-300">
              <Cpu className="w-10 h-10 text-sky-400" />
              <span className="text-sm font-bold tracking-wide">Drex · Real Digital (BCB)</span>
            </div>
          </div>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d1627] via-[#0d1627]/65 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-3.5 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[11px] font-medium text-sky-300">
            <span>Agenda BC#</span>
            <span aria-hidden="true">·</span>
            <span>Real Digital</span>
            <span aria-hidden="true">·</span>
            <span>Liquidação Atômica</span>
          </div>
          <h2
            id="drex-dossier-heading"
            className="text-base sm:text-lg font-extrabold text-white tracking-tight text-balance leading-snug"
          >
            Dossiê DinhEuro: Drex — A Moeda Digital do Banco Central (BC)
          </h2>
          <p className="text-[11px] text-slate-300 leading-snug">
            Arquitetura, Casos de Uso, Liquidação Atômica e Identidade Visual | Fonte oficial: Banco Central do Brasil (Agenda BC#)
          </p>
        </div>
      </div>

      {/* Barra de Controle Compacta */}
      <div className="px-4 sm:px-5 py-3 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Landmark className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
          <span>3 capítulos técnicos e conceituais sobre o Real Digital (Drex)</span>
        </div>

        <button
          type="button"
          onClick={allExpanded ? collapseAll : expandAll}
          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/80 text-[11px] font-semibold text-slate-200 transition cursor-pointer whitespace-nowrap shrink-0"
        >
          {allExpanded ? 'Recolher capítulos' : 'Expandir todos'}
        </button>
      </div>

      {/* 2. Acordeões Interativos com Seta à Esquerda e Texto Integral sempre montado no DOM */}
      <div className="divide-y divide-slate-800/80">
        {DREX_SECTIONS.map((section) => {
          const isOpen = openIds.includes(section.id);
          return (
            <div key={section.id} className="transition-colors">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`drex-panel-${section.id}`}
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
                id={`drex-panel-${section.id}`}
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
          Dossiê compilado e estruturado pela equipe editorial do DinhEuro com base nas diretrizes oficiais e documentações técnicas do Banco Central do Brasil (BCB).
        </span>
      </footer>
    </section>
  );
};
