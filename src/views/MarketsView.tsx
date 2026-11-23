import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Sparkles,
  BarChart3,
  ExternalLink,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';
import { useMarket, MarketCategoryFilter } from '../context/MarketContext';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import {
  getLocalizedApiSourceSummary,
  getLocalizedAssetName,
  getLocalizedAssetSymbol,
  getLocalizedCategoryLabel,
} from '../i18n/marketDataTranslations';
import {
  MarketAsset,
  UniversalRates,
  getExtendedMarketsInitialAssets,
  fetchExtendedMarketsAssets,
} from '../services/marketData';
import {
  formatCurrencyValue,
  getAssetPriceDecimals,
  formatSignedCurrencyChange,
  formatSignedPercentChange,
} from '../utils/finance';
import { normalizePriceBounds } from '../utils/marketParsing';
import { DualPrice } from '../components/DualPrice';

export const MarketsView: React.FC = () => {
  const { t, lang } = useI18n();
  const {
    assets,
    setSelectedAsset,
    lastUpdated,
    universalRates,
    refreshData,
    apiSourceSummary,
    selectedMarketCategory: selectedCategory,
    setSelectedMarketCategory: setSelectedCategory,
  } = useMarket();
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<'change' | 'price' | 'symbol' | 'volume'>('change');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [visibleCount, setVisibleCount] = useState<number>(20);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [extendedAssets, setExtendedAssets] = useState<MarketAsset[]>(() =>
    getExtendedMarketsInitialAssets()
  );
  const [extendedRates, setExtendedRates] = useState<UniversalRates>({});

  // Carrega cotações ao vivo da Europa, Ásia-Pacífico e moedas de todos os continentes exclusivamente no painel /mercados
  useEffect(() => {
    let isMounted = true;
    const syncExtended = async () => {
      try {
        const res = await fetchExtendedMarketsAssets(extendedAssets, universalRates);
        if (!isMounted) return;
        setExtendedAssets(res.updatedAssets);
        setExtendedRates(res.extendedRates);
      } catch {
        // preserva últimos valores válidos ou cache local
      }
    };
    syncExtended();
    return () => {
      isMounted = false;
    };
  }, [lastUpdated]);

  const allAssets = useMemo(() => [...assets, ...extendedAssets], [assets, extendedAssets]);
  const effectiveRates = useMemo(
    () => ({ ...universalRates, ...extendedRates }),
    [universalRates, extendedRates]
  );

  // Dynamic counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allAssets.length,
      stocks_us: 0,
      stocks_br: 0,
      stocks_eu: 0,
      stocks_asia: 0,
      indices: 0,
      forex: 0,
      crypto: 0,
      commodities: 0,
    };
    allAssets.forEach((a) => {
      if (counts[a.category] !== undefined) {
        counts[a.category]++;
      }
    });
    return counts;
  }, [allAssets]);

  const categories: { id: MarketCategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: t.header.categories.all.label, count: categoryCounts.all },
    { id: 'stocks_us', label: t.header.categories.stocks_us.label, count: categoryCounts.stocks_us },
    { id: 'stocks_br', label: t.header.categories.stocks_br.label, count: categoryCounts.stocks_br },
    { id: 'stocks_eu', label: t.header.categories.stocks_eu.label, count: categoryCounts.stocks_eu },
    { id: 'stocks_asia', label: t.header.categories.stocks_asia.label, count: categoryCounts.stocks_asia },
    { id: 'indices', label: t.header.categories.indices.label, count: categoryCounts.indices },
    { id: 'forex', label: t.header.categories.forex.label, count: categoryCounts.forex },
    { id: 'crypto', label: t.header.categories.crypto.label, count: categoryCounts.crypto },
    { id: 'commodities', label: t.header.categories.commodities.label, count: categoryCounts.commodities },
  ];

  useEffect(() => {
    setVisibleCount(20);
  }, [selectedCategory]);

  // Filter
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return allAssets.filter((asset) => {
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      const matchesSearch =
        !term ||
        asset.symbol.toLowerCase().includes(term) ||
        asset.name.toLowerCase().includes(term) ||
        getLocalizedAssetSymbol(asset, lang).toLowerCase().includes(term) ||
        getLocalizedAssetName(asset, lang).toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [allAssets, selectedCategory, search, lang]);

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'change') {
        comparison = b.change24h - a.change24h;
      } else if (sortBy === 'price') {
        comparison = b.price - a.price;
      } else if (sortBy === 'symbol') {
        comparison = a.symbol.localeCompare(b.symbol);
      } else if (sortBy === 'volume') {
        comparison = b.volume.localeCompare(a.volume);
      }
      return sortOrder === 'desc' ? comparison : -comparison;
    });
  }, [filtered, sortBy, sortOrder]);

  // Paginated / Expanded slice
  const displayedAssets = useMemo(() => {
    return sorted.slice(0, visibleCount);
  }, [sorted, visibleCount]);

  const toggleSort = (newSort: 'change' | 'price' | 'symbol' | 'volume') => {
    if (sortBy === newSort) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortBy(newSort);
      setSortOrder('desc');
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 20, sorted.length));
  };

  const handleLoadAll = () => {
    setVisibleCount(sorted.length);
  };

  const handleCollapse = () => {
    setVisibleCount(20);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const [, extRes] = await Promise.all([
        refreshData(),
        fetchExtendedMarketsAssets(extendedAssets, universalRates),
      ]);
      setExtendedAssets(extRes.updatedAssets);
      setExtendedRates(extRes.extendedRates);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  const remainingCount = sorted.length - visibleCount;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Header, Real-Time Indicators & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009B77] dark:bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#006B52] dark:text-emerald-400">
              {t.markets.realtimeBadge}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight">
            {t.markets.title}
          </h1>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-1 flex flex-wrap items-center gap-1.5">
            <span>{allAssets.length} {t.markets.assetsListed}</span>
            <span>•</span>
            <span className="text-[#0F172A] dark:text-slate-300 font-medium">{getLocalizedApiSourceSummary(apiSourceSummary, lang)}</span>
            <span>•</span>
            <span>{t.dashboard.updatedAt} {lastUpdated.toLocaleTimeString(getNumberLocale(lang), { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </p>
        </div>

        {/* Action Controls: Refresh & Search */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F1F5F9] dark:bg-slate-800/90 dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold border border-[#CBD5E1] dark:border-slate-700/80 hover:border-[#009B77]/50 dark:hover:border-emerald-500/40 transition cursor-pointer shrink-0 disabled:opacity-50"
            title={t.markets.refreshBtn}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#006B52] dark:text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{t.markets.refreshBtn}</span>
          </button>

          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] dark:text-slate-400" />
            <input
              type="text"
              placeholder={t.markets.searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(20); // Reset page limit on new search
              }}
              className="w-full bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-[#0F172A] dark:text-white placeholder:text-[#64748B] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500 shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs with Dynamic Live Counters */}
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
        style={{ flexWrap: 'nowrap', WebkitOverflowScrolling: 'touch' }}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(20);
              }}
              data-on-dark={isSelected ? 'true' : undefined}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex-shrink-0 inline-flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 text-white shadow-md shadow-blue-950/20 dark:shadow-emerald-950/40'
                  : 'bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 text-[#334155] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white dark:bg-black/30 dark:text-emerald-200' : 'bg-[#F1F5F9] text-[#475569] dark:bg-slate-800 dark:text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Status & Catalog Stats Bar */}
      <div className="flex items-center justify-between text-xs text-[#475569] dark:text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <span>
            {t.markets.showingOf} <strong className="text-[#0F172A] dark:text-white font-mono">{displayedAssets.length}</strong> {t.markets.ofWord}{' '}
            <strong className="text-[#0F172A] dark:text-white font-mono">{sorted.length}</strong> {t.markets.assetsFound}
          </span>
          {search && (
            <span className="text-[#006B52] dark:text-emerald-400 font-medium">
              ({t.markets.searchTermPrefix} &ldquo;{search}&rdquo;)
            </span>
          )}
        </div>
        {sorted.length > 20 && (
          <div className="text-[11px] text-[#64748B] dark:text-slate-500 hidden sm:block">
            {visibleCount >= sorted.length ? t.markets.catalogFullVisible : `${remainingCount} ${t.markets.assetsReadyToExpand}`}
          </div>
        )}
      </div>

      {/* Assets Table */}
      <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-[#070e1b] text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase tracking-wider">
                <th
                  onClick={() => toggleSort('symbol')}
                  className="py-3 px-4 cursor-pointer hover:text-[#0F172A] dark:hover:text-white transition"
                >
                  <div className="flex items-center gap-1">
                    <span>{t.markets.colAsset}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('price')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>{t.markets.colPrice}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('change')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>{t.markets.colVar24h}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right hidden md:table-cell">{t.markets.colHighLow}</th>
                <th
                  onClick={() => toggleSort('volume')}
                  className="py-3 px-4 text-right hidden sm:table-cell cursor-pointer hover:text-white transition"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>{t.markets.colVolume}</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">{t.markets.colChart}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60 text-xs">
              {displayedAssets.map((asset) => {
                const dec = getAssetPriceDecimals(asset.price, asset.currency, asset.category);
                const pctInfo = formatSignedPercentChange(asset.change24h, 2);
                const bounds = normalizePriceBounds(asset.price, asset.high24h, asset.low24h, dec);
                const displayVolume = asset.category === 'forex' ? '--' : asset.volume;
                return (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{asset.flag || '📈'}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[#0F172A] dark:text-white text-xs group-hover:text-[#003399] dark:group-hover:text-emerald-400 transition font-mono">
                              {getLocalizedAssetSymbol(asset, lang)}
                            </span>
                            <span className="text-[10px] uppercase font-semibold text-[#475569] dark:text-slate-400 px-1.5 py-0.2 rounded bg-[#F1F5F9] dark:bg-slate-800/80 border border-[#CBD5E1] dark:border-slate-700/50">
                              {getLocalizedCategoryLabel(asset.category, lang)}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#64748B] dark:text-slate-400 block truncate max-w-[140px] sm:max-w-xs">
                            {getLocalizedAssetName(asset, lang)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <DualPrice
                        price={asset.price}
                        currency={asset.currency}
                        rates={effectiveRates}
                        isIndex={asset.category === 'indices'}
                        category={asset.category}
                        layout="compact"
                        primaryClassName="font-mono-numbers font-bold text-[#0F172A] dark:text-white text-xs sm:text-sm"
                        secondaryClassName="text-[11px] font-mono-numbers text-[#006B52] dark:text-emerald-400 font-medium"
                      />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center gap-1 font-mono-numbers font-bold text-xs px-2 py-0.5 rounded ${
                            pctInfo.isNegative
                              ? 'text-[#DC2626] bg-[#FEE2E2] dark:text-rose-400 dark:bg-rose-500/10'
                              : pctInfo.isPositive
                              ? 'text-[#006B52] bg-[#E3F7F2] dark:text-emerald-400 dark:bg-emerald-500/10'
                              : 'text-[#334155] bg-[#F1F5F9] dark:text-slate-300 dark:bg-slate-800/70'
                          }`}
                        >
                          {pctInfo.isPositive && <TrendingUp className="w-3 h-3" />}
                          {pctInfo.isNegative && <TrendingDown className="w-3 h-3" />}
                          {pctInfo.text}
                        </span>
                        <span className="text-[10px] font-mono-numbers text-[#64748B] dark:text-slate-400 mt-0.5">
                          {formatSignedCurrencyChange(asset.changeValue, asset.currency, dec)}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right hidden md:table-cell font-mono-numbers text-[11px] text-[#475569] dark:text-slate-400">
                      <div>
                        {formatCurrencyValue(bounds.high, asset.currency, dec)} /{' '}
                        {formatCurrencyValue(bounds.low, asset.currency, dec)}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right hidden sm:table-cell font-mono-numbers text-xs text-[#334155] dark:text-slate-300">
                      {displayVolume}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAsset(asset);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#E6EEFF] hover:bg-[#003399] hover:text-white dark:bg-slate-800 dark:hover:bg-emerald-600/30 text-[#003399] dark:text-emerald-400 text-xs font-semibold border border-[#003399]/25 dark:border-slate-700 dark:hover:border-emerald-500/40 transition cursor-pointer inline-flex items-center gap-1"
                      >
                        <BarChart3 className="w-3 h-3" />
                        <span>D3 v7</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {displayedAssets.length === 0 && (
          <div className="p-12 text-center space-y-3">
            <p className="text-sm text-[#475569] dark:text-slate-400">
              {t.markets.emptyMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-[#E6EEFF] hover:bg-[#D5E3FF] dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-[#003399] dark:text-emerald-400 border border-[#003399]/25 dark:border-slate-700 transition cursor-pointer"
            >
              {t.markets.clearFilters}
            </button>
          </div>
        )}
      </div>

      {/* DYNAMIC CATALOG EXPANSION ENGINE ("Ver Mais Ativos") */}
      {sorted.length > 20 && (
        <div className="bg-[#FFFFFF] dark:bg-[#0b1424] border border-[#E2E8F0] dark:border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#006B52] dark:text-emerald-400" />
              <span className="font-bold text-[#0F172A] dark:text-white">
                {t.markets.coverageStatus}
              </span>
              <span className="text-[#475569] dark:text-slate-400">
                {displayedAssets.length} {t.markets.ofWord} {sorted.length} {t.markets.assetsRenderedSuffix}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-48 bg-[#E2E8F0] dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#003399] to-[#009B77] dark:from-emerald-500 dark:to-teal-400 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (displayedAssets.length / sorted.length) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {remainingCount > 0 ? (
              <>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  data-on-dark="true"
                  className="px-5 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-400 dark:hover:to-teal-400 text-white dark:text-slate-950 font-black text-xs sm:text-sm transition shadow-lg shadow-blue-950/20 dark:shadow-emerald-950/40 cursor-pointer inline-flex items-center gap-2"
                >
                  <ChevronDown className="w-4 h-4 stroke-[3]" />
                  <span>{t.markets.viewMorePrefix}{Math.min(20, remainingCount)} {t.markets.ofWord} {remainingCount} {t.markets.availableSuffix}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadAll}
                  className="px-4 py-2.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E2E8F0] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs sm:text-sm border border-[#CBD5E1] dark:border-slate-700 hover:border-[#009B77]/40 dark:hover:border-emerald-500/40 transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#B45309] dark:text-amber-400" />
                  <span>{t.markets.loadAllPrefix} {sorted.length} {t.markets.loadAllSuffix}</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-[#009B77]/30 dark:border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.markets.fullCatalogLoadedPrefix}{sorted.length} {t.markets.fullCatalogLoadedSuffix}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCollapse}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4F7F9] hover:bg-[#E2E8F0] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-300 text-xs font-semibold border border-[#CBD5E1] dark:border-slate-700 transition cursor-pointer inline-flex items-center gap-1"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>{t.markets.collapseToTop20}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
