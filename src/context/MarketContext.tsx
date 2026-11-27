import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  MarketAsset,
  NewsItem,
  UniversalRates,
  INITIAL_ASSETS,
  INITIAL_NEWS,
  fetchCompleteLiveMarketData,
  getStoredFinnhubKey,
  setStoredFinnhubKey,
} from '../services/marketData';
import { normalizeRoutePath, syncCanonicalLink } from '../utils/seo';
import {
  getAssetPriceDecimals,
  roundToDecimals,
  calculateMarketSentimentIndex,
  MarketSentimentResult,
} from '../utils/finance';
import { normalizePriceBounds } from '../utils/marketParsing';
import { getPublishedArticleBySlug } from '../data/newsArticleDirectory';

export function extractNewsArticleSlug(pathname: string): string | null {
  const normalized = normalizeRoutePath(pathname);
  if (!normalized.startsWith('/noticias/')) return null;
  const rawSlug = normalized.slice('/noticias/'.length).split('/')[0];
  if (!rawSlug) return null;
  try {
    const decoded = decodeURIComponent(rawSlug).trim();
    return getPublishedArticleBySlug(decoded)?.id ?? null;
  } catch {
    return getPublishedArticleBySlug(rawSlug)?.id ?? null;
  }
}

export interface PortfolioPosition {
  id: string;
  symbol: string;
  name: string;
  assetType: 'stock_br' | 'stock_us' | 'crypto' | 'forex';
  quantity: number;
  averageBuyPrice: number;
  currency: string;
  purchaseDate: string;
}

export type NavigationTab =
  | 'dashboard'
  | 'mercados'
  | 'carteiras'
  | 'guia_cambio'
  | 'politica_monetaria'
  | 'renda_fixa'
  | 'noticias'
  | 'corretoras'
  | 'graficos'
  | 'ferramentas'
  | 'academy'
  | 'sobre'
  | 'termos'
  | 'privacidade'
  | 'cookies'
  | 'disclaimer';

export const TAB_ROUTE_MAP: Record<NavigationTab, string> = {
  dashboard: '/',
  mercados: '/mercados',
  carteiras: '/carteiras',
  guia_cambio: '/guia-cambio-remessas',
  politica_monetaria: '/politica-monetaria-juros',
  renda_fixa: '/renda-fixa-derivativos',
  noticias: '/noticias',
  corretoras: '/corretoras',
  graficos: '/graficos',
  ferramentas: '/ferramentas',
  academy: '/academy',
  sobre: '/sobre',
  termos: '/termos-de-uso',
  privacidade: '/politica-de-privacidade',
  cookies: '/politica-de-cookies',
  disclaimer: '/disclaimer',
};

export const LEGACY_ROUTE_REDIRECTS: Record<string, string> = {
  '/day-trade': '/guia-cambio-remessas',
  '/daytrade': '/guia-cambio-remessas',
  '/fluxo-tape-reading': '/politica-monetaria-juros',
  '/tape-reading': '/politica-monetaria-juros',
};

export const ROUTE_TAB_MAP: Record<string, NavigationTab> = {
  '/': 'dashboard',
  '/mercados': 'mercados',
  '/carteiras': 'carteiras',
  '/guia-cambio-remessas': 'guia_cambio',
  '/politica-monetaria-juros': 'politica_monetaria',
  '/day-trade': 'guia_cambio',
  '/daytrade': 'guia_cambio',
  '/fluxo-tape-reading': 'politica_monetaria',
  '/tape-reading': 'politica_monetaria',
  '/renda-fixa-derivativos': 'renda_fixa',
  '/renda-fixa': 'renda_fixa',
  '/noticias': 'noticias',
  '/corretoras': 'corretoras',
  '/graficos': 'graficos',
  '/ferramentas': 'ferramentas',
  '/academy': 'academy',
  '/sobre': 'sobre',
  '/termos-de-uso': 'termos',
  '/termos': 'termos',
  '/politica-de-privacidade': 'privacidade',
  '/privacidade': 'privacidade',
  '/politica-de-cookies': 'cookies',
  '/cookies': 'cookies',
  '/disclaimer': 'disclaimer',
  '/aviso-legal': 'disclaimer',
};

export type ThemeMode = 'dark' | 'light';

export type MarketCategoryFilter =
  | 'all'
  | 'stocks_br'
  | 'stocks_us'
  | 'stocks_eu'
  | 'stocks_asia'
  | 'indices'
  | 'forex'
  | 'crypto'
  | 'commodities';

interface MarketContextType {
  assets: MarketAsset[];
  universalRates: UniversalRates;
  news: NewsItem[];
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  activeArticleSlug: string | null;
  openArticle: (slug: string) => void;
  selectedMarketCategory: MarketCategoryFilter;
  setSelectedMarketCategory: (category: MarketCategoryFilter) => void;
  selectedAcademyTarget: { courseId: string; moduleIndex?: number } | null;
  setSelectedAcademyTarget: (target: { courseId: string; moduleIndex?: number } | null) => void;
  openAcademyCourse: (courseId: string, moduleIndex?: number) => void;
  selectedAsset: MarketAsset | null;
  setSelectedAsset: (asset: MarketAsset | null) => void;
  openAssetDetail: (symbolOrId: string) => void;
  portfolio: PortfolioPosition[];
  addPortfolioPosition: (position: Omit<PortfolioPosition, 'id'>) => void;
  removePortfolioPosition: (id: string) => void;
  finnhubKey: string;
  updateFinnhubKey: (key: string) => void;
  isLiveUpdating: boolean;
  isSyncing: boolean;
  syncStatus: 'syncing' | 'live' | 'offline';
  lastUpdated: Date | null;
  refreshData: () => Promise<void>;
  displayCurrency: 'BRL' | 'EUR' | 'USD';
  setDisplayCurrency: (currency: 'BRL' | 'EUR' | 'USD') => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  apiSourceSummary: string;
  riskAppetite: MarketSentimentResult;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const PORTFOLIO_STORAGE_KEY = 'dinheuro_user_portfolio_v2';
const RATES_STORAGE_KEY = 'dinheuro_universal_rates';
const LAST_SYNCED_STORAGE_KEY = 'dinheuro_last_synced_at';

// A carteira inicia 100% zerada para que o usuário monte e gerencie suas próprias posições
const INITIAL_DEMO_PORTFOLIO: PortfolioPosition[] = [];

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<MarketAsset[]>(() => {
    if (typeof window === 'undefined') return INITIAL_ASSETS;
    try {
      const cached = localStorage.getItem('dinheuro_live_assets_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.some((a) => a.price > 0)) {
          // Sanitização ativa: normaliza decimais, volume de FX e garante Mín <= Preço <= Máx sem valores estáticos
          return parsed.map((item: MarketAsset) => {
            const safePrice = typeof item.price === 'number' && Number.isFinite(item.price) && item.price > 0 ? item.price : 0;
            const dec = getAssetPriceDecimals(safePrice, item.currency, item.category);
            const bounds = normalizePriceBounds(safePrice, item.high24h, item.low24h, dec);
            return {
              ...item,
              price: bounds.price > 0 ? bounds.price : safePrice,
              high24h: bounds.high > 0 ? bounds.high : safePrice,
              low24h: bounds.low > 0 ? bounds.low : safePrice,
              changeValue: roundToDecimals(item.changeValue || 0, dec),
              change24h: roundToDecimals(item.change24h || 0, 2),
              volume: item.category === 'forex' ? '--' : (item.volume && item.volume !== 'N/A' ? item.volume : '--'),
            };
          });
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_ASSETS;
  });
  const [universalRates, setUniversalRates] = useState<UniversalRates>(() => {
    if (typeof window === 'undefined') return { USD: 1.0 };
    try {
      const cached = localStorage.getItem(RATES_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed.BRL === 'number' && Number.isFinite(parsed.BRL) && parsed.BRL > 0) {
          return { USD: 1.0, ...parsed };
        }
      }
    } catch {
      // fallback
    }
    return { USD: 1.0 };
  });
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  // Active Tab & Article Slug State with URL routing support
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return extractNewsArticleSlug(window.location.pathname);
  });

  const [activeTab, setActiveTabState] = useState<NavigationTab>(() => {
    if (typeof window === 'undefined') return 'dashboard';
    const path = normalizeRoutePath(window.location.pathname);
    if (extractNewsArticleSlug(path) || path.startsWith('/noticias/')) {
      return 'noticias';
    }
    if (ROUTE_TAB_MAP[path]) {
      return ROUTE_TAB_MAP[path];
    }
    // Also check hash
    const hash = normalizeRoutePath('/' + window.location.hash.replace('#', ''));
    if (hash && ROUTE_TAB_MAP[hash]) {
      return ROUTE_TAB_MAP[hash];
    }
    return 'dashboard';
  });

  const [selectedMarketCategory, setSelectedMarketCategory] = useState<MarketCategoryFilter>('all');
  const [selectedAcademyTarget, setSelectedAcademyTarget] = useState<{ courseId: string; moduleIndex?: number } | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [finnhubKey, setFinnhubKey] = useState<string>(getStoredFinnhubKey());
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'live' | 'offline'>('syncing');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const savedTs = localStorage.getItem(LAST_SYNCED_STORAGE_KEY);
      const cachedAssets = localStorage.getItem('dinheuro_live_assets_cache');
      if (savedTs && cachedAssets) {
        const parsedAssets = JSON.parse(cachedAssets);
        const parsedDate = new Date(savedTs);
        if (
          Array.isArray(parsedAssets) &&
          parsedAssets.some((a) => a.price > 0) &&
          !Number.isNaN(parsedDate.getTime())
        ) {
          return parsedDate;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });
  const [displayCurrency, setDisplayCurrency] = useState<'BRL' | 'EUR' | 'USD'>('BRL');
  const [apiSourceSummary, setApiSourceSummary] = useState<string>('Bolsas Mundiais • Câmbio Interbancário • Criptoativos Globais');

  const assetsRef = useRef<MarketAsset[]>(assets);
  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  // Theme State: Light is the mandatory opening theme; Dark mode activates only on manual header toggle
  const [theme, setThemeState] = useState<ThemeMode>('light');

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  // Sync theme with HTML document element and meta theme-color
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    root.style.backgroundColor = theme === 'dark' ? '#0B1320' : '#F8FAFC';
    root.style.color = theme === 'dark' ? '#F8FAFC' : '#0F172A';

    // Update meta theme-color for mobile chrome / safari address bar
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0B1320' : '#F8FAFC');
    }
  }, [theme]);

  // Load portfolio from localStorage
  const [portfolio, setPortfolio] = useState<PortfolioPosition[]>(() => {
    if (typeof window === 'undefined') return INITIAL_DEMO_PORTFOLIO;
    try {
      const saved = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_DEMO_PORTFOLIO;
  });

  // Save portfolio
  useEffect(() => {
    try {
      localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(portfolio));
    } catch {
      // ignore
    }
  }, [portfolio]);

  // Dynamically synchronize <link rel="canonical"> in <head> and redirect legacy paths whenever route changes
  useEffect(() => {
    const routePath =
      activeTab === 'noticias' && activeArticleSlug
        ? `/noticias/${activeArticleSlug}`
        : TAB_ROUTE_MAP[activeTab] || '/';
    syncCanonicalLink(routePath);
    if (typeof window !== 'undefined') {
      const currentPath = normalizeRoutePath(window.location.pathname);
      const redirectTarget = LEGACY_ROUTE_REDIRECTS[currentPath];
      if (redirectTarget && window.location.pathname !== redirectTarget) {
        try {
          window.history.replaceState(null, '', redirectTarget);
        } catch {
          // ignore in restricted environments
        }
      }
    }
  }, [activeTab, activeArticleSlug]);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = normalizeRoutePath(window.location.pathname);
      const redirectTarget = LEGACY_ROUTE_REDIRECTS[path];
      if (redirectTarget) {
        try {
          window.history.replaceState(null, '', redirectTarget);
        } catch {
          // ignore
        }
      }
      const matchedArticleSlug = extractNewsArticleSlug(path);
      if (matchedArticleSlug) {
        setActiveTabState('noticias');
        setActiveArticleSlug(matchedArticleSlug);
        return;
      }
      if (path.startsWith('/noticias/')) {
        setActiveTabState('noticias');
        setActiveArticleSlug(null);
        return;
      }
      if (ROUTE_TAB_MAP[path]) {
        setActiveTabState(ROUTE_TAB_MAP[path]);
        setActiveArticleSlug(null);
      } else {
        const hash = normalizeRoutePath('/' + window.location.hash.replace('#', ''));
        if (hash && ROUTE_TAB_MAP[hash]) {
          const hashRedirect = LEGACY_ROUTE_REDIRECTS[hash];
          if (hashRedirect) {
            try {
              window.history.replaceState(null, '', hashRedirect);
            } catch {
              // ignore
            }
          }
          setActiveTabState(ROUTE_TAB_MAP[hash]);
          setActiveArticleSlug(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setActiveTab = useCallback((tab: NavigationTab) => {
    setActiveArticleSlug(null);
    setActiveTabState(tab);
    if (typeof window !== 'undefined') {
      const targetRoute = TAB_ROUTE_MAP[tab] || '/';
      if (normalizeRoutePath(window.location.pathname) !== targetRoute || window.location.pathname !== targetRoute) {
        try {
          window.history.pushState(null, '', targetRoute);
        } catch {
          // ignore in environments with restricted history
        }
      }
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const openArticle = useCallback((slug: string) => {
    const matched = getPublishedArticleBySlug(slug);
    const resolvedSlug = matched?.id ?? slug.trim();
    if (!resolvedSlug) return;
    setActiveTabState('noticias');
    setActiveArticleSlug(resolvedSlug);
    if (typeof window !== 'undefined') {
      const targetRoute = `/noticias/${resolvedSlug}`;
      if (normalizeRoutePath(window.location.pathname) !== targetRoute || window.location.pathname !== targetRoute) {
        try {
          window.history.pushState(null, '', targetRoute);
        } catch {
          // ignore in environments with restricted history
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const openAcademyCourse = useCallback(
    (courseId: string, moduleIndex: number = 0) => {
      setSelectedAcademyTarget({ courseId, moduleIndex });
      setActiveTab('academy');
    },
    [setActiveTab]
  );

  const openAssetDetail = useCallback((symbolOrId: string) => {
    const match = assets.find(
      (a) => a.id.toLowerCase() === symbolOrId.toLowerCase() || a.symbol.toLowerCase() === symbolOrId.toLowerCase()
    );
    if (match) {
      setSelectedAsset(match);
    }
  }, [assets]);

  const addPortfolioPosition = useCallback((position: Omit<PortfolioPosition, 'id'>) => {
    const newPos: PortfolioPosition = {
      ...position,
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    setPortfolio((prev) => [newPos, ...prev]);
  }, []);

  const removePortfolioPosition = useCallback((id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateFinnhubKey = useCallback((key: string) => {
    setFinnhubKey(key);
    setStoredFinnhubKey(key);
  }, []);

  // Fetch live market data across configured multi-source feeds
  const refreshData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const snapshot = await fetchCompleteLiveMarketData(assetsRef.current);
      if (snapshot.rates && Object.keys(snapshot.rates).length > 1) {
        setUniversalRates((prev) => {
          const next = { ...prev, ...snapshot.rates };
          if (typeof window !== 'undefined' && snapshot.hasLiveData) {
            try {
              localStorage.setItem(RATES_STORAGE_KEY, JSON.stringify(next));
            } catch {
              // ignore
            }
          }
          return next;
        });
      }
      if (snapshot.updatedAssets && snapshot.updatedAssets.length > 0) {
        setAssets(snapshot.updatedAssets);
      }
      if (snapshot.news && snapshot.news.length > 0) {
        setNews(snapshot.news);
      }
      if (snapshot.sourceSummary) {
        setApiSourceSummary(snapshot.sourceSummary);
      }
      if (snapshot.hasLiveData && snapshot.syncedAt) {
        const syncedDate = new Date(snapshot.syncedAt);
        if (!Number.isNaN(syncedDate.getTime())) {
          setLastUpdated(syncedDate);
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(LAST_SYNCED_STORAGE_KEY, syncedDate.toISOString());
            } catch {
              // ignore
            }
          }
        }
        setSyncStatus('live');
      } else {
        setSyncStatus('offline');
      }
    } catch (err) {
      console.warn('[DinhEuro] Erro ao sincronizar mercado em tempo real:', err);
      setSyncStatus('offline');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Periodic heartbeat every 10 seconds for active real-time market updates
  useEffect(() => {
    refreshData();
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      refreshData();
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshData, isLiveUpdating]);

  // Reactive Risk Appetite (0-100) calculated from weighted % variations of global assets in MarketContext
  const riskAppetite = useMemo(
    () => calculateMarketSentimentIndex(assets),
    [assets]
  );

  return (
    <MarketContext.Provider
      value={{
        assets,
        universalRates,
        news,
        activeTab,
        setActiveTab,
        activeArticleSlug,
        openArticle,
        selectedMarketCategory,
        setSelectedMarketCategory,
        selectedAcademyTarget,
        setSelectedAcademyTarget,
        openAcademyCourse,
        selectedAsset,
        setSelectedAsset,
        openAssetDetail,
        portfolio,
        addPortfolioPosition,
        removePortfolioPosition,
        finnhubKey,
        updateFinnhubKey,
        isLiveUpdating,
        isSyncing,
        syncStatus,
        lastUpdated,
        refreshData,
        displayCurrency,
        setDisplayCurrency,
        theme,
        toggleTheme,
        setTheme,
        apiSourceSummary,
        riskAppetite,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = (): MarketContextType => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};
