import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Check,
  Newspaper,
  Building2,
  Coins,
  BarChart3,
  DollarSign,
  Landmark,
  GraduationCap,
} from 'lucide-react';
import { useMarket, NavigationTab, MarketCategoryFilter } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale, type SupportedLanguage } from '../i18n/translations';
import {
  getLocalizedAssetName,
  getLocalizedAssetSymbol,
  getLocalizedCategoryLabel,
} from '../i18n/marketDataTranslations';
import { DualPrice } from './DualPrice';
import { formatSignedPercentChange } from '../utils/finance';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedMarketCategory,
    setSelectedMarketCategory,
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
  const { lang, setLang, t } = useI18n();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Support Schema.org SearchAction query param (?q=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const qParam = new URLSearchParams(window.location.search).get('q');
      if (qParam && qParam.trim()) {
        setSearchQuery(qParam.trim());
        setShowSearchModal(true);
      }
    } catch {
      // ignore URL parsing errors
    }
  }, []);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [categoryMenuPos, setCategoryMenuPos] = useState<{ top: number; left: number }>({ top: 110, left: 16 });
  const categoryBtnRef = useRef<HTMLButtonElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [worldTimes, setWorldTimes] = useState({
    sp: '',
    ny: '',
    lon: '',
    fra: '',
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateNavScrollState = React.useCallback(() => {
    const el = navScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = navScrollRef.current;
    if (!el) return;

    updateNavScrollState();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateNavScrollState();
      });
      resizeObserver.observe(el);
    }

    window.addEventListener('resize', updateNavScrollState);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateNavScrollState);
    };
  }, [updateNavScrollState]);

  const scrollNavBy = (direction: 'left' | 'right') => {
    const el = navScrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -260 : 260,
      behavior: 'smooth',
    });
  };

  // Update clocks every second
  useEffect(() => {
    const spLocale = getNumberLocale(lang);
    const updateTimes = () => {
      const now = new Date();
      setWorldTimes({
        sp: now.toLocaleTimeString(spLocale, { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }),
        ny: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
        lon: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        fra: now.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  // Prevent background scrolling, handle Escape, and auto-close if resized to desktop
  useEffect(() => {
    if (!isMobileDrawerOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileDrawerOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileDrawerOpen]);

  // Market Category options for Top Horizontal Category Selector
  const marketCategories: {
    id: MarketCategoryFilter;
    label: string;
    shortLabel: string;
    description: string;
    icon: React.ReactNode;
    count: number;
  }[] = [
    {
      id: 'all',
      label: t.header.categories.all.label,
      shortLabel: t.header.categories.all.shortLabel,
      description: t.header.categories.all.description,
      icon: <Globe className="w-4 h-4 text-emerald-400" />,
      count: assets.length,
    },
    {
      id: 'stocks_br',
      label: t.header.categories.stocks_br.label,
      shortLabel: t.header.categories.stocks_br.shortLabel,
      description: t.header.categories.stocks_br.description,
      icon: <BarChart3 className="w-4 h-4 text-emerald-400" />,
      count: assets.filter((a) => a.category === 'stocks_br').length,
    },
    {
      id: 'stocks_us',
      label: t.header.categories.stocks_us.label,
      shortLabel: t.header.categories.stocks_us.shortLabel,
      description: t.header.categories.stocks_us.description,
      icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
      count: assets.filter((a) => a.category === 'stocks_us').length,
    },
    {
      id: 'indices',
      label: t.header.categories.indices.label,
      shortLabel: t.header.categories.indices.shortLabel,
      description: t.header.categories.indices.description,
      icon: <BarChart2 className="w-4 h-4 text-cyan-400" />,
      count: assets.filter((a) => a.category === 'indices').length,
    },
    {
      id: 'forex',
      label: t.header.categories.forex.label,
      shortLabel: t.header.categories.forex.shortLabel,
      description: t.header.categories.forex.description,
      icon: <DollarSign className="w-4 h-4 text-teal-400" />,
      count: assets.filter((a) => a.category === 'forex').length,
    },
    {
      id: 'crypto',
      label: t.header.categories.crypto.label,
      shortLabel: t.header.categories.crypto.shortLabel,
      description: t.header.categories.crypto.description,
      icon: <Coins className="w-4 h-4 text-amber-400" />,
      count: assets.filter((a) => a.category === 'crypto').length,
    },
    {
      id: 'commodities',
      label: t.header.categories.commodities.label,
      shortLabel: t.header.categories.commodities.shortLabel,
      description: t.header.categories.commodities.description,
      icon: <Landmark className="w-4 h-4 text-orange-400" />,
      count: assets.filter((a) => a.category === 'commodities').length,
    },
  ];

  const activeCategoryObj = marketCategories.find((c) => c.id === selectedMarketCategory) || marketCategories[0];

  // Position and outside-click handling for Category Selector dropdown
  useEffect(() => {
    if (!isCategoryMenuOpen) return;

    const updatePosition = () => {
      if (categoryBtnRef.current) {
        const rect = categoryBtnRef.current.getBoundingClientRect();
        const maxLeft = Math.max(12, window.innerWidth - 310);
        setCategoryMenuPos({
          top: rect.bottom + 8,
          left: Math.min(rect.left, maxLeft),
        });
      }
    };

    updatePosition();

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        categoryBtnRef.current?.contains(target) ||
        categoryDropdownRef.current?.contains(target)
      ) {
        return;
      }
      setIsCategoryMenuOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCategoryMenuOpen(false);
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isCategoryMenuOpen]);

  const handleSelectMarketCategory = (categoryId: MarketCategoryFilter) => {
    setSelectedMarketCategory(categoryId);
    setActiveTab('mercados');
    setIsCategoryMenuOpen(false);
    setIsMobileDrawerOpen(false);
  };

  // Essential Navigation items for Desktop and Mobile Drawer
  const navItems: { id: NavigationTab; label: string; badge?: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.header.nav.dashboard, icon: <Home className="w-4 h-4" /> },
    { id: 'mercados', label: t.header.nav.mercados, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'carteiras', label: t.header.nav.carteiras, icon: <Briefcase className="w-4 h-4" /> },
    { id: 'noticias', label: t.header.nav.noticias, badge: 'LIVE', icon: <Newspaper className="w-4 h-4 text-emerald-400" /> },
    { id: 'corretoras', label: t.header.nav.corretoras, icon: <Building2 className="w-4 h-4 text-teal-400" /> },
    { id: 'daytrade', label: t.header.nav.daytrade, badge: 'PRO', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
    { id: 'tape_reading', label: t.header.nav.tape_reading, badge: 'DOM', icon: <Layers className="w-4 h-4 text-cyan-400" /> },
    { id: 'renda_fixa', label: t.header.nav.renda_fixa, icon: <Percent className="w-4 h-4" /> },
    { id: 'graficos', label: t.header.nav.graficos, icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'ferramentas', label: t.header.nav.ferramentas, icon: <Calculator className="w-4 h-4" /> },
    { id: 'academy', label: t.header.nav.academy, badge: lang === 'en' ? 'FREE' : lang === 'es' ? 'GRATIS' : 'GRÁTIS', icon: <GraduationCap className="w-4 h-4 text-emerald-400" /> },
    { id: 'sobre', label: t.header.nav.sobre, icon: <Info className="w-4 h-4" /> },
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    setIsMobileDrawerOpen(false);
    setIsCategoryMenuOpen(false);
  };

  // Filter assets for search
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredAssets = normalizedQuery
    ? assets.filter(
        (a) =>
          a.symbol.toLowerCase().includes(normalizedQuery) ||
          a.name.toLowerCase().includes(normalizedQuery) ||
          getLocalizedAssetSymbol(a, lang).toLowerCase().includes(normalizedQuery) ||
          getLocalizedAssetName(a, lang).toLowerCase().includes(normalizedQuery)
      )
    : assets.slice(0, 6);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 dark:bg-[#0B1320]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-slate-800 shadow-sm dark:shadow-xl max-w-[100vw] overflow-x-clip">
      {/* Top Utility Bar */}
      <div className="border-b border-[#E2E8F0] dark:border-slate-800/60 bg-[#F4F7F9] dark:bg-[#070e1a]/80 px-3 sm:px-6 py-1.5 text-[11px] text-[#475569] dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* World financial hub clocks */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5 flex-nowrap">
            <span className="flex items-center gap-1 font-semibold text-[#003399] dark:text-slate-300 flex-shrink-0">
              <Clock className="w-3 h-3 text-[#D99B00] dark:text-amber-400" />
              <span className="hidden xs:inline">{t.header.financialHubs}</span>
            </span>
            <span className="flex-shrink-0 text-[#475569] dark:text-slate-400">
              🇧🇷 SP <strong className="text-[#0F172A] dark:text-slate-200 font-mono-numbers">{worldTimes.sp}</strong>
            </span>
            <span className="text-[#CBD5E1] dark:text-slate-600">|</span>
            <span className="flex-shrink-0 text-[#475569] dark:text-slate-400">
              🇺🇸 NY <strong className="text-[#0F172A] dark:text-slate-200 font-mono-numbers">{worldTimes.ny}</strong>
            </span>
            <span className="text-[#CBD5E1] dark:text-slate-600">|</span>
            <span className="flex-shrink-0 text-[#475569] dark:text-slate-400">
              🇩🇪 FRA <strong className="text-[#0F172A] dark:text-slate-200 font-mono-numbers">{worldTimes.fra}</strong>
            </span>
            <span className="text-[#CBD5E1] dark:text-slate-600">|</span>
            <span className="flex-shrink-0 text-[#475569] dark:text-slate-400">
              🇬🇧 LON <strong className="text-[#0F172A] dark:text-slate-200 font-mono-numbers">{worldTimes.lon}</strong>
            </span>
          </div>

          {/* Sync Timestamp indicator */}
          <div className="flex items-center gap-2 flex-shrink-0 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#009B77] dark:bg-emerald-400 animate-pulse"></span>
            <button
              type="button"
              onClick={() => refreshData()}
              className="text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-emerald-300 transition cursor-pointer flex items-center gap-1 font-mono-numbers bg-[#FFFFFF] dark:bg-slate-900/60 px-2 py-0.5 rounded border border-[#E2E8F0] dark:border-slate-800"
              title={t.header.syncTooltip}
            >
              <span>{lastUpdated.toLocaleTimeString(getNumberLocale(lang), { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Action Header */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 md:flex-initial lg:flex-shrink-0"
        >
          <div className="relative flex-shrink-0">
            <img
              src="/logo.png"
              alt="DinhEuro Logo"
              className="w-8 h-8 sm:w-11 sm:h-11 rounded-full object-contain shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition duration-200 border-2 border-amber-400/30 bg-white/5"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#009B77] border-2 border-[#FFFFFF] dark:border-[#0B1320] rounded-full"></span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-base sm:text-2xl font-black tracking-tight text-[#003399] dark:text-white truncate">
                Dinh<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#009B77] via-[#006B52] to-[#009B77] dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400">Euro</span>
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#E6EEFF] dark:bg-emerald-500/15 border border-[#6699CC]/40 dark:border-emerald-500/30 text-[#003399] dark:text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline flex-shrink-0">
                Global
              </span>
            </div>
            <span className="text-[9.5px] sm:text-[11px] font-medium text-[#475569] dark:text-slate-400 tracking-wide truncate">
              {t.header.hubSubtitle}
            </span>
          </div>
        </div>

        {/* Global Asset Search Bar (Desktop & Tablet) */}
        <div className="flex-1 min-w-[140px] max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] dark:text-slate-400" />
            <input
              type="text"
              placeholder={t.header.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearchModal(true)}
              className="w-full bg-[#F4F7F9] dark:bg-slate-900/90 border border-[#CBD5E1] dark:border-slate-700/80 rounded-xl pl-9.5 pr-4 py-2 text-xs text-[#0F172A] dark:text-slate-100 placeholder:text-[#64748B] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#003399] focus:ring-1 focus:ring-[#003399] dark:focus:border-emerald-500 dark:focus:ring-emerald-500 transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#003399] dark:text-slate-400 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Mobile Search trigger */}
          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#F4F7F9] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700/80 text-[#0F172A] dark:text-slate-200 hover:text-[#003399] dark:hover:text-white transition cursor-pointer flex-shrink-0"
            aria-label={t.header.openSearchAria}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Discreet Language Selector (PT | EN | ES) */}
          <div
            role="group"
            aria-label={t.header.languageSelectorAria}
            className="inline-flex items-center rounded-lg border border-[#CBD5E1] dark:border-slate-700/80 bg-[#F4F7F9] dark:bg-slate-900/90 p-0.5 text-[10px] sm:text-[11px] font-bold flex-shrink-0"
          >
            {(['pt', 'en', 'es'] as SupportedLanguage[]).map((code, idx) => {
              const isSelected = lang === code;
              return (
                <React.Fragment key={code}>
                  {idx > 0 && <span className="hidden sm:inline text-[#CBD5E1] dark:text-slate-700 select-none px-0.5" aria-hidden="true">|</span>}
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={isSelected}
                    data-on-dark={isSelected ? 'true' : undefined}
                    className={`px-1.5 sm:px-2 py-1 rounded-md uppercase transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#003399] text-white dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'text-[#475569] hover:text-[#003399] dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {code.toUpperCase()}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.header.themeLight : t.header.themeDark}
            title={theme === 'dark' ? t.header.themeLight : t.header.themeDark}
            className="w-9 h-9 sm:w-10 sm:h-10 xl:w-auto xl:h-auto xl:px-2.5 xl:py-1.5 rounded-xl border border-[#CBD5E1] dark:border-slate-700/80 bg-[#F4F7F9] dark:bg-slate-900/90 hover:bg-[#E6EEFF] dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-200 hover:text-[#003399] dark:hover:text-white transition flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer shadow-sm flex-shrink-0"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden xl:inline text-[11px]">{t.header.themeLight}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#003399]" />
                <span className="hidden xl:inline text-[11px]">{t.header.themeDark}</span>
              </>
            )}
          </button>

          {/* Mobile & Tablet Hamburger Menu Button (visible below desktop lg breakpoint) */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen((prev) => !prev)}
            className="flex lg:hidden relative z-10 w-11 h-11 min-w-[44px] min-h-[44px] items-center justify-center rounded-xl bg-[#E6EEFF] dark:bg-slate-800 border-2 border-[#003399]/35 dark:border-emerald-400/50 hover:bg-[#D6E4FF] dark:hover:bg-slate-700 hover:border-[#003399]/70 dark:hover:border-emerald-400 text-[#003399] dark:text-emerald-300 transition cursor-pointer shadow-sm flex-shrink-0"
            aria-label={isMobileDrawerOpen ? t.header.closeMenuAria : t.header.openMenuAria}
            aria-expanded={isMobileDrawerOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {isMobileDrawerOpen ? (
              <X className="w-5 h-5 stroke-[2.5] text-[#003399] dark:text-emerald-300" />
            ) : (
              <Menu className="w-5 h-5 stroke-[2.5] text-[#003399] dark:text-emerald-300" />
            )}
          </button>
        </div>
      </div>

      {/* Universal Desktop Horizontal Navigation Bar */}
      <nav className="hidden lg:flex w-full border-t border-[#E2E8F0] dark:border-slate-800/80 bg-[#F4F7F9] dark:bg-[#08101e]/90 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto w-full min-w-0 flex items-center gap-1 sm:gap-2 py-1.5">
          {/* Seletor de Categorias fixo à esquerda no Menu Horizontal Superior */}
          <button
            ref={categoryBtnRef}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsCategoryMenuOpen((prev) => !prev);
            }}
            aria-haspopup="menu"
            aria-expanded={isCategoryMenuOpen}
            data-on-dark={isCategoryMenuOpen || (activeTab === 'mercados' && selectedMarketCategory !== 'all') ? 'true' : undefined}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex-shrink-0 select-none flex items-center gap-1.5 border ${
              isCategoryMenuOpen || (activeTab === 'mercados' && selectedMarketCategory !== 'all')
                ? 'bg-[#003399] text-white border-[#002266] shadow-sm dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/40'
                : 'bg-[#FFFFFF] dark:bg-slate-900/90 text-[#1E293B] dark:text-slate-200 hover:text-[#003399] dark:hover:text-white border-[#E2E8F0] dark:border-slate-700/80 hover:border-[#003399]/40 dark:hover:border-emerald-500/40'
            }`}
            style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
            title={t.header.categoriesLabel}
          >
            <LayoutGrid className={`w-3.5 h-3.5 ${isCategoryMenuOpen || (activeTab === 'mercados' && selectedMarketCategory !== 'all') ? 'text-white dark:text-emerald-400' : 'text-[#003399] dark:text-emerald-400'}`} />
            <span>
              {activeTab === 'mercados' && selectedMarketCategory !== 'all'
                ? `${t.header.categoriesLabel}: ${activeCategoryObj.shortLabel}`
                : t.header.categoriesLabel}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-150 ${
                isCategoryMenuOpen ? 'rotate-180 text-white dark:text-emerald-400' : 'text-[#475569] dark:text-slate-400'
              }`}
            />
          </button>

          <span className="h-4 w-px bg-[#CBD5E1] dark:bg-slate-800 flex-shrink-0 mx-0.5" aria-hidden="true" />

          {/* Container relativo da lista horizontal rolável com setas discretas */}
          <div className="relative flex-1 min-w-0 flex items-center overflow-hidden">
            {canScrollLeft && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollNavBy('left');
                }}
                aria-label={t.header.scrollLeftAria}
                className="hidden md:flex items-center justify-center absolute left-0 z-10 bg-[#FFFFFF]/95 dark:bg-[#0B1221]/90 backdrop-blur-sm border border-[#E2E8F0] dark:border-slate-800/80 rounded-full w-7 h-7 text-[#003399] dark:text-slate-300 hover:text-[#002266] dark:hover:text-white hover:border-[#003399]/40 dark:hover:border-slate-700 transition cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div
              ref={navScrollRef}
              onScroll={updateNavScrollState}
              className="flex items-center gap-1 sm:gap-2 w-full overflow-x-auto no-scrollbar scrollbar-none scroll-smooth"
              style={{
                flexWrap: 'nowrap',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
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
                    data-on-dark={isActive ? 'true' : undefined}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer flex-shrink-0 select-none flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#003399] text-white border border-[#002266] shadow-sm font-semibold dark:bg-gradient-to-r dark:from-emerald-600/30 dark:to-teal-600/20 dark:text-emerald-300 dark:border-emerald-500/40'
                        : 'text-[#1E293B] dark:text-slate-400 hover:text-[#003399] dark:hover:text-slate-100 hover:bg-[#E6EEFF]/80 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                    style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded font-bold border ${
                          isActive
                            ? 'bg-[#E5A910] text-[#002266] border-[#E5A910] dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                            : 'bg-[#FEF7E0] text-[#D99B00] border-[#E5A910]/40 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {canScrollRight && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollNavBy('right');
                }}
                aria-label={t.header.scrollRightAria}
                className="hidden md:flex items-center justify-center absolute right-0 z-10 bg-[#FFFFFF]/95 dark:bg-[#0B1221]/90 backdrop-blur-sm border border-[#E2E8F0] dark:border-slate-800/80 rounded-full w-7 h-7 text-[#003399] dark:text-slate-300 hover:text-[#002266] dark:hover:text-white hover:border-[#003399]/40 dark:hover:border-slate-700 transition cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Portal Dropdown for Top Horizontal Category Selector */}
      {isCategoryMenuOpen && typeof document !== 'undefined' && createPortal(
        <div
          ref={categoryDropdownRef}
          role="menu"
          aria-label={t.header.categoryMenuAria}
          style={{ top: `${categoryMenuPos.top}px`, left: `${categoryMenuPos.left}px` }}
          className={`fixed z-[9999] w-80 rounded-2xl border shadow-2xl p-2 animate-in fade-in duration-150 ${
            theme === 'light'
              ? 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A] shadow-slate-900/15'
              : 'bg-[#0B1320] border-slate-700/90 text-slate-100 shadow-black/70'
          }`}
        >
          <div className={`px-2.5 py-1.5 flex items-center justify-between border-b mb-1.5 ${
            theme === 'light' ? 'border-[#E2E8F0]' : 'border-slate-800/60'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
              {t.header.categoryMenuTitle}
            </span>
            <span className="text-[10px] text-[#475569] dark:text-slate-400 font-mono-numbers">
              {assets.length} {t.header.assetsCountLabel}
            </span>
          </div>

          <div className="space-y-0.5 max-h-[65vh] overflow-y-auto no-scrollbar">
            {marketCategories.map((cat) => {
              const isSelected = activeTab === 'mercados' && selectedMarketCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="menuitem"
                  onClick={() => handleSelectMarketCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left transition cursor-pointer ${
                    isSelected
                      ? theme === 'light'
                        ? 'bg-[#E6EEFF] border border-[#003399]/30 text-[#003399]'
                        : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : theme === 'light'
                      ? 'hover:bg-[#F4F7F9] text-[#0F172A] border border-transparent'
                      : 'hover:bg-slate-800/80 text-slate-200 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                      theme === 'light'
                        ? 'bg-[#F4F7F9] border-[#E2E8F0]'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}>
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight truncate">{cat.label}</div>
                      <div className="text-[10px] text-[#475569] dark:text-slate-400 truncate">{cat.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span className={`text-[10px] font-mono-numbers px-1.5 py-0.5 rounded border ${
                      theme === 'light'
                        ? 'bg-[#F4F7F9] border-[#E2E8F0] text-[#475569]'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300'
                    }`}>
                      {cat.count}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`mt-1.5 pt-1.5 border-t flex items-center justify-between gap-1 ${
            theme === 'light' ? 'border-[#E2E8F0]' : 'border-slate-800/60'
          }`}>
            <button
              type="button"
              onClick={() => handleNavClick('academy')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                theme === 'light'
                  ? 'hover:bg-[#E6EEFF] text-[#003399]'
                  : 'hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#D99B00] dark:text-amber-400" />
              <span>DinhEuro Academy</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('renda_fixa')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition cursor-pointer ${
                theme === 'light'
                  ? 'hover:bg-[#E3F7F2] text-[#006B52]'
                  : 'hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <Percent className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
              <span>{t.header.fixedIncomeShortcut}</span>
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Mobile & Tablet Drawer (Camada Superior z-[9999]) */}
      {isMobileDrawerOpen && typeof document !== 'undefined' && createPortal(
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-[9999] flex lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t.header.openMenuAria}
        >
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-[#0F172A]/60 dark:bg-black/85 backdrop-blur-md transition-opacity duration-200 z-[9998] cursor-pointer"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative w-[85%] max-w-xs sm:w-80 bg-[#FFFFFF] dark:bg-[#0B1320] border-r border-[#E2E8F0] dark:border-slate-800 p-5 flex flex-col justify-between shadow-2xl z-[9999] h-full overflow-y-auto no-scrollbar animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/logo.png"
                    alt="DinhEuro"
                    className="w-8 h-8 rounded-full border border-emerald-500/40"
                  />
                  <div>
                    <h3 className="text-base font-black text-[#003399] dark:text-white leading-tight">
                      Dinh<span className="text-[#009B77] dark:text-emerald-400">Euro</span>
                    </h3>
                    <p className="text-[10px] text-[#475569] dark:text-slate-400 font-medium">{t.header.drawerSubtitle}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileDrawerOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-[#F4F7F9] dark:bg-slate-800/90 text-[#0F172A] dark:text-slate-100 hover:text-[#003399] dark:hover:text-white hover:bg-[#E6EEFF] dark:hover:bg-slate-700 transition cursor-pointer"
                  aria-label={t.header.closeMenuAria}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-[#475569] dark:text-slate-500 tracking-wider px-2 mb-2">
                  {t.header.drawerNavTitle}
                </p>
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      data-on-dark={isActive ? 'true' : undefined}
                      className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#003399] text-white border border-[#002266] font-bold dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30'
                          : 'text-[#1E293B] dark:text-slate-300 hover:bg-[#E6EEFF] dark:hover:bg-slate-800/80 hover:text-[#003399] dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white dark:text-emerald-400' : 'text-[#475569] dark:text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                              isActive
                                ? 'bg-[#E5A910] text-[#002266] border-[#E5A910] dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                                : 'bg-[#FEF7E0] text-[#D99B00] border-[#E5A910]/40 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-[#475569] dark:text-slate-500'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Quick Market Categories in Mobile Drawer */}
              <div className="space-y-2 pt-2 border-t border-[#E2E8F0] dark:border-slate-800/80">
                <p className="text-[10px] uppercase font-bold text-[#475569] dark:text-slate-500 tracking-wider px-2">
                  {t.header.drawerCategoriesTitle}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {marketCategories.map((cat) => {
                    const isSelected = activeTab === 'mercados' && selectedMarketCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectMarketCategory(cat.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-semibold transition cursor-pointer text-left border ${
                          isSelected
                            ? 'bg-[#E3F7F2] text-[#006B52] border-[#009B77]/40 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30'
                            : 'bg-[#F4F7F9] dark:bg-slate-900/70 text-[#1E293B] dark:text-slate-300 border-[#E2E8F0] dark:border-slate-800 hover:text-[#003399] dark:hover:text-white hover:border-[#003399]/30 dark:hover:border-slate-700'
                        }`}
                      >
                        <span className="flex-shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 mt-6 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#475569] dark:text-slate-400">
                <span>{t.header.displayCurrency}</span>
                <span className="font-bold text-[#006B52] dark:text-emerald-400">{displayCurrency}</span>
              </div>
              <div className="flex items-center gap-2">
                {(['BRL', 'EUR', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setDisplayCurrency(curr)}
                    data-on-dark={displayCurrency === curr ? 'true' : undefined}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      displayCurrency === curr
                        ? 'bg-[#003399] text-white dark:bg-emerald-500 dark:text-slate-950 shadow-md'
                        : 'bg-[#F4F7F9] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 text-[#1E293B] dark:text-slate-300 hover:text-[#003399] dark:hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#475569] dark:text-slate-500 text-center pt-2">
                {t.header.drawerFooterNote}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Instant Search Results Modal */}
      {showSearchModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 bg-[#0F172A]/60 dark:bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setShowSearchModal(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-[#FFFFFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 p-4 sm:p-5 shadow-2xl text-[#0F172A] dark:text-slate-100 animate-in fade-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] dark:border-slate-800 pb-3 mb-3">
              <Search className="w-5 h-5 text-[#003399] dark:text-emerald-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                placeholder={t.header.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-1.5 no-scrollbar">
              <p className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 px-2 py-1 uppercase tracking-wider">
                {searchQuery ? t.header.searchResults : t.header.featuredAssets}
              </p>

              {filteredAssets.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#475569] dark:text-slate-500">
                  {t.header.noAssetFound}
                </div>
              ) : (
                filteredAssets.map((asset) => {
                  const pctInfo = formatSignedPercentChange(asset.change24h, 2);
                  const isIndex = asset.category === 'indices' || asset.currency === 'PTS';
                  return (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset);
                        setShowSearchModal(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#E6EEFF]/60 dark:hover:bg-slate-800 transition cursor-pointer border border-transparent hover:border-[#6699CC]/40 dark:hover:border-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{asset.flag || '📈'}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0F172A] dark:text-white text-xs">{getLocalizedAssetSymbol(asset, lang)}</span>
                            <span className="text-[10px] text-[#003399] dark:text-slate-400 uppercase px-1.5 py-0.2 rounded bg-[#E6EEFF] dark:bg-slate-800">
                              {getLocalizedCategoryLabel(asset.category, lang)}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#475569] dark:text-slate-400 truncate max-w-[160px] sm:max-w-xs">
                            {getLocalizedAssetName(asset, lang)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <DualPrice
                          price={asset.price}
                          currency={asset.currency}
                          rates={universalRates}
                          isIndex={isIndex}
                          category={asset.category}
                          layout="compact"
                          primaryClassName="font-mono-numbers text-xs font-semibold text-[#0F172A] dark:text-white"
                          secondaryClassName="text-[10px] font-mono-numbers text-[#006B52] dark:text-emerald-400"
                        />
                        <div
                          className={`text-[11px] font-semibold font-mono-numbers ${
                            !pctInfo.isNegative ? 'text-[#009B77] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
                          }`}
                        >
                          {pctInfo.text}
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
