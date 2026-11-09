import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  TrendingUp,
  Clock,
  X,
  Menu,
  Sun,
  Moon,
  Home,
  Briefcase,
  Zap,
  Layers,
  Percent,
  BarChart2,
  Calculator,
  Info,
  ChevronRight,
} from 'lucide-react';
import { useMarket, NavigationTab } from '../context/MarketContext';
import { DualPrice } from './DualPrice';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    assets,
    setSelectedAsset,
    displayCurrency,
    setDisplayCurrency,
    theme,
    toggleTheme,
    universalRates,
    refreshData,
    lastUpdated,
  } = useMarket();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [worldTimes, setWorldTimes] = useState({
    sp: '',
    ny: '',
    lon: '',
    fra: '',
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Update clocks every second
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setWorldTimes({
        sp: now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }),
        ny: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        lon: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        fra: now.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileDrawerOpen]);

  // Essential Navigation items for Desktop and Mobile Drawer
  const navItems: { id: NavigationTab; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'mercados', label: 'Mercados', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'carteiras', label: 'Carteiras', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'daytrade', label: 'Day Trade & Scalping', badge: 'PRO', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
    { id: 'tape_reading', label: 'Fluxo & Tape Reading', badge: 'DOM', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'renda_fixa', label: 'Renda Fixa & Derivativos', icon: <Percent className="w-4 h-4" /> },
    { id: 'graficos', label: 'Gráficos Avançados', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'ferramentas', label: 'Ferramentas', icon: <Calculator className="w-4 h-4" /> },
    { id: 'sobre', label: 'Sobre o DinhEuro', icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  // Filter assets for search
  const filteredAssets = searchQuery.trim()
    ? assets.filter(
        (a) =>
          a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : assets.slice(0, 6);

  return (
    <header className="sticky top-0 z-40 bg-[#0B1320]/95 backdrop-blur-md border-b border-slate-800 shadow-xl max-w-[100vw] overflow-x-hidden">
      {/* Top Utility Bar */}
      <div className="border-b border-slate-800/60 bg-[#070e1a]/80 px-3 sm:px-6 py-1.5 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* World financial hub clocks */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 flex-nowrap">
            <span className="flex items-center gap-1 font-semibold text-slate-300 flex-shrink-0">
              <Clock className="w-3 h-3 text-amber-400" />
              <span className="hidden xs:inline">Centros Financeiros:</span>
            </span>
            <span className="flex-shrink-0 text-slate-400">
              🇧🇷 SP <strong className="text-slate-200 font-mono-numbers">{worldTimes.sp}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex-shrink-0 text-slate-400">
              🇺🇸 NY <strong className="text-slate-200 font-mono-numbers">{worldTimes.ny}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex-shrink-0 text-slate-400">
              🇩🇪 FRA <strong className="text-slate-200 font-mono-numbers">{worldTimes.fra}</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex-shrink-0 text-slate-400">
              🇬🇧 LON <strong className="text-slate-200 font-mono-numbers">{worldTimes.lon}</strong>
            </span>
          </div>

          {/* Sync Timestamp indicator */}
          <div className="flex items-center gap-2 flex-shrink-0 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <button
              type="button"
              onClick={() => refreshData()}
              className="text-slate-400 hover:text-emerald-300 transition cursor-pointer flex items-center gap-1 font-mono-numbers bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800"
              title="Clique para sincronizar cotações agora"
            >
              <span>{lastUpdated.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="relative">
            <img
              src="./logo.png"
              alt="DinhEuro Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-contain shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition duration-200 border-2 border-amber-400/30 bg-white/5"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0B1320] rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-white">
                Dinh<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">Euro</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider hidden xs:inline">
                Global
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 tracking-wide">
              Hub Financeiro em Tempo Real
            </span>
          </div>
        </div>

        {/* Global Asset Search Bar (Desktop) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar ações (AAPL, PETR4), pares forex, cripto, índices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchModal(true)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9.5 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Mobile Search trigger */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
            aria-label="Abrir busca de ativos"
          >
            <Search className="w-4 h-4" />
          </button>



          {/* Theme Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
            title={theme === 'dark' ? 'Alternar para tema claro (Clean Finance)' : 'Alternar para tema escuro (Terminal)'}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium cursor-pointer shadow-sm flex-shrink-0"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline text-[11px]">Tema Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden lg:inline text-[11px]">Tema Escuro</span>
              </>
            )}
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-emerald-500/50 text-slate-200 hover:text-white transition cursor-pointer flex items-center justify-center shadow-sm"
            aria-label="Abrir menu de navegação"
          >
            <Menu className="w-5 h-5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Universal Desktop Horizontal Navigation Bar */}
      <nav
        className="hidden md:flex w-full border-t border-slate-800/80 bg-[#08101e]/90 px-3 sm:px-6"
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          className="max-w-7xl mx-auto w-full flex items-center gap-1 sm:gap-2 py-1.5 no-scrollbar"
          style={{
            flexWrap: 'nowrap',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavClick(item.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex-shrink-0 select-none flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600/30 to-teal-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                }`}
                style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer (Gaveta Lateral Moderna e Responsiva) */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-[85%] max-w-xs bg-[#0B1320] border-r border-slate-800 p-5 flex flex-col justify-between shadow-2xl z-10 h-full overflow-y-auto no-scrollbar">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="./logo.png"
                    alt="DinhEuro"
                    className="w-8 h-8 rounded-full border border-emerald-500/40"
                  />
                  <div>
                    <h3 className="text-base font-black text-white leading-tight">
                      Dinh<span className="text-emerald-400">Euro</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">Menu Institucional</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider px-2 mb-2">
                  Navegação Principal
                </p>
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Moeda de Exibição</span>
                <span className="font-bold text-emerald-400">{displayCurrency}</span>
              </div>
              <div className="flex items-center gap-2">
                {(['BRL', 'EUR', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setDisplayCurrency(curr)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      displayCurrency === curr
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 text-center pt-2">
                DinhEuro &bull; Cotações em Tempo Real
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Results Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 p-4 sm:p-5 shadow-2xl text-slate-100 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3">
              <Search className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                placeholder="Buscar ações (AAPL, PETR4), pares forex, cripto, índices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-1.5 no-scrollbar">
              <p className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                {searchQuery ? 'Resultados Encontrados' : 'Ativos em Destaque'}
              </p>

              {filteredAssets.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  Nenhum ativo encontrado para "{searchQuery}". Tente outro símbolo ou nome.
                </div>
              ) : (
                filteredAssets.map((asset) => {
                  const isPositive = asset.change24h >= 0;
                  const isIndex = asset.category === 'indices' || asset.currency === 'PTS';
                  return (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset);
                        setShowSearchModal(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{asset.flag || '📈'}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs">{asset.symbol}</span>
                            <span className="text-[10px] text-slate-400 uppercase px-1.5 py-0.2 rounded bg-slate-800">
                              {asset.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate max-w-[160px] sm:max-w-xs">
                            {asset.name}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <DualPrice
                          price={asset.price}
                          currency={asset.currency}
                          rates={universalRates}
                          isIndex={isIndex}
                          layout="compact"
                          primaryClassName="font-mono-numbers text-xs font-semibold text-white"
                          secondaryClassName="text-[10px] font-mono-numbers text-emerald-400"
                        />
                        <div
                          className={`text-[11px] font-semibold font-mono-numbers ${
                            isPositive ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {asset.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
