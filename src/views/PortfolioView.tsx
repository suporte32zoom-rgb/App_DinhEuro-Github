import React, { useState } from 'react';
import {
  Wallet,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Trash2,
  PieChart,
  DollarSign,
  Briefcase,
  X,
  Check,
  BookOpen,
  Coins,
  Calculator,
  Globe2,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { formatCurrencyValue, formatSignedCurrencyChange, formatSignedPercentChange, getAssetPriceDecimals } from '../utils/finance';
import { DualPrice } from '../components/DualPrice';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { VIEWS_TRANSLATIONS } from '../i18n/viewsTranslations';
import { getLocalizedAssetName } from '../i18n/marketDataTranslations';
import { PortfolioPerformanceChart } from '../components/PortfolioPerformanceChart';

export const PortfolioView: React.FC = () => {
  const { portfolio, addPortfolioPosition, removePortfolioPosition, assets, universalRates } =
    useMarket();
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const tPort = VIEWS_TRANSLATIONS[lang].portfolio;

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState('PETR4');
  const [newName, setNewName] = useState('Petrobras PN');
  const [newType, setNewType] = useState<'stock_br' | 'stock_us' | 'crypto' | 'forex'>('stock_br');
  const [newQuantity, setNewQuantity] = useState<number>(100);
  const [newBuyPrice, setNewBuyPrice] = useState<number>(35.0);
  const [newCurrency, setNewCurrency] = useState<'BRL' | 'USD' | 'EUR'>('BRL');

  // Compute live value for each portfolio position
  const positionsWithLiveMetrics = portfolio.map((pos) => {
    // Find matching asset
    const matching = assets.find(
      (a) => a.symbol.toLowerCase() === pos.symbol.toLowerCase() || a.id.toLowerCase() === pos.symbol.toLowerCase()
    );
    const currentPrice = matching ? matching.price : pos.averageBuyPrice;
    const totalCost = pos.quantity * pos.averageBuyPrice;
    const currentTotalValue = pos.quantity * currentPrice;
    const profitLoss = currentTotalValue - totalCost;
    const profitPercent = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

    // Convert to BRL for unified total
    let currentTotalBRL = currentTotalValue;
    if (pos.currency === 'USD') {
      currentTotalBRL = currentTotalValue * universalRates.BRL;
    } else if (pos.currency === 'EUR') {
      currentTotalBRL = currentTotalValue * (universalRates.BRL / (universalRates.EUR || 0.92));
    }

    return {
      ...pos,
      displayName: matching ? getLocalizedAssetName(matching, lang) : pos.name,
      currentPrice,
      totalCost,
      currentTotalValue,
      currentTotalBRL,
      profitLoss,
      profitPercent,
    };
  });

  const totalPortfolioValueBRL = positionsWithLiveMetrics.reduce(
    (acc, p) => acc + p.currentTotalBRL,
    0
  );
  const totalCostBRL = positionsWithLiveMetrics.reduce((acc, p) => {
    let costInBRL = p.totalCost;
    if (p.currency === 'USD') costInBRL = p.totalCost * universalRates.BRL;
    else if (p.currency === 'EUR') costInBRL = p.totalCost * (universalRates.BRL / (universalRates.EUR || 0.92));
    return acc + costInBRL;
  }, 0);

  const totalPLBRL = totalPortfolioValueBRL - totalCostBRL;
  const totalPLPercent = totalCostBRL > 0 ? (totalPLBRL / totalCostBRL) * 100 : 0;
  const isOverallPositive = totalPLBRL >= 0;

  // Breakdown by asset type
  const typeTotals = positionsWithLiveMetrics.reduce(
    (acc, p) => {
      acc[p.assetType] = (acc[p.assetType] || 0) + p.currentTotalBRL;
      return acc;
    },
    {} as Record<string, number>
  );

  const handleSelectAssetPreset = (sym: string) => {
    if (!sym) return;
    const found = assets.find((a) => a.symbol === sym || a.id === sym);
    if (found) {
      setNewSymbol(found.symbol);
      setNewName(getLocalizedAssetName(found, lang));
      setNewBuyPrice(found.price > 0 ? found.price : 10);
      if (found.category === 'stocks_br') {
        setNewType('stock_br');
        setNewCurrency('BRL');
      } else if (found.category === 'stocks_us') {
        setNewType('stock_us');
        setNewCurrency('USD');
      } else if (found.category === 'crypto') {
        setNewType('crypto');
        setNewCurrency(found.currency === 'BRL' ? 'BRL' : 'USD');
      } else {
        setNewType('forex');
        setNewCurrency(found.currency === 'EUR' ? 'EUR' : found.currency === 'BRL' ? 'BRL' : 'USD');
      }
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymbol || newQuantity <= 0 || newBuyPrice <= 0) return;

    addPortfolioPosition({
      symbol: newSymbol.toUpperCase(),
      name: newName || newSymbol.toUpperCase(),
      assetType: newType,
      quantity: Number(newQuantity),
      averageBuyPrice: Number(newBuyPrice),
      currency: newCurrency,
      purchaseDate: new Date().toISOString().split('T')[0],
    });

    setShowAddModal(false);
  };

  const zeroDecimalStr = (0).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Portfolio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#006B52] dark:text-emerald-400" />
            <span>{tPort.title}</span>
          </h1>
          <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
            {tPort.subtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          data-on-dark="true"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-xs font-bold text-white shadow-lg shadow-blue-950/20 dark:shadow-emerald-950/40 transition cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{tPort.newPosition}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Value */}
        <div className="bg-[#FFFFFF] dark:bg-[#0d1627] rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-lg">
          <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-wider">
            {tPort.totalPortfolioValue}
          </span>
          <div className="text-2xl sm:text-3xl font-black font-mono-numbers text-[#0F172A] dark:text-white mt-1">
            {formatCurrencyValue(totalPortfolioValueBRL, 'BRL', 2, locale)}
          </div>
          <div className="flex items-center gap-3 text-xs text-[#475569] dark:text-slate-400 mt-2 font-mono">
            <span>
              ≈ €{' '}
              {portfolio.length > 0
                ? (totalPortfolioValueBRL / (universalRates.BRL / (universalRates.EUR || 0.92))).toLocaleString(locale, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : zeroDecimalStr}
            </span>
            <span>•</span>
            <span>
              ≈ ${' '}
              {portfolio.length > 0
                ? (totalPortfolioValueBRL / universalRates.BRL).toLocaleString(locale, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : zeroDecimalStr}
            </span>
          </div>
        </div>

        {/* Total Profit / Loss */}
        <div className="bg-[#FFFFFF] dark:bg-[#0d1627] rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-lg">
          <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-wider">
            {tPort.totalPL}
          </span>
          <div
            className={`text-2xl sm:text-3xl font-black font-mono-numbers mt-1 flex items-baseline gap-1.5 ${
              portfolio.length === 0 ? 'text-[#475569] dark:text-slate-400' : isOverallPositive ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
            }`}
          >
            <span>
              {portfolio.length > 0
                ? formatSignedCurrencyChange(totalPLBRL, 'BRL', 2, locale)
                : formatCurrencyValue(0, 'BRL', 2, locale)}
            </span>
          </div>
          <div
            className={`flex items-center gap-1 text-xs font-bold font-mono-numbers mt-2 ${
              portfolio.length === 0 ? 'text-[#475569] dark:text-slate-400' : isOverallPositive ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
            }`}
          >
            {portfolio.length > 0 ? (
              isOverallPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />
            ) : null}
            <span>
              {portfolio.length === 0
                ? tPort.accumulatedZero
                : `${formatSignedPercentChange(totalPLPercent, 2, locale).text} ${tPort.accumulatedReturnSuffix}`}
            </span>
          </div>
        </div>

        {/* Positions Count & Diversification */}
        <div className="bg-[#FFFFFF] dark:bg-[#0d1627] rounded-2xl border border-[#E2E8F0] dark:border-slate-800 p-5 shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-wider">
              {tPort.diversification}
            </span>
            <div className="text-2xl sm:text-3xl font-black font-mono-numbers text-[#0F172A] dark:text-white mt-1">
              {portfolio.length} <span className="text-xs font-normal text-[#475569] dark:text-slate-400">{tPort.assetsUnit}</span>
            </div>
          </div>

          {/* Allocation mini progress bars */}
          {portfolio.length > 0 ? (
            <div className="w-full bg-[#E2E8F0] dark:bg-slate-800 h-2 rounded-full overflow-hidden flex mt-3">
              <div
                style={{ width: `${((typeTotals.stock_br || 0) / (totalPortfolioValueBRL || 1)) * 100}%` }}
                className="bg-emerald-500 h-full"
                title={tPort.allocStocksBr}
              />
              <div
                style={{ width: `${((typeTotals.stock_us || 0) / (totalPortfolioValueBRL || 1)) * 100}%` }}
                className="bg-blue-500 h-full"
                title={tPort.allocStocksUs}
              />
              <div
                style={{ width: `${((typeTotals.crypto || 0) / (totalPortfolioValueBRL || 1)) * 100}%` }}
                className="bg-amber-500 h-full"
                title={tPort.allocCrypto}
              />
              <div
                style={{ width: `${((typeTotals.forex || 0) / (totalPortfolioValueBRL || 1)) * 100}%` }}
                className="bg-purple-500 h-full"
                title={tPort.allocForex}
              />
            </div>
          ) : (
            <div className="mt-3 flex items-center justify-between text-[11px] text-[#64748B] dark:text-slate-500">
              <span>{tPort.noAssetsAdded}</span>
              <span className="text-[10px]">{tPort.zeroAllocated}</span>
            </div>
          )}
        </div>
      </div>

      {/* Historical Portfolio Performance Line Charts */}
      <PortfolioPerformanceChart
        positions={positionsWithLiveMetrics}
        universalRates={universalRates}
        onAddAsset={() => setShowAddModal(true)}
      />

      {/* Positions Table or Empty State */}
      <div className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-[#070e1b] flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
            {tPort.openPositionsTitle}
          </h3>
          <span className="text-[11px] text-[#475569] dark:text-slate-400">
            {portfolio.length > 0 ? tPort.updatedEverySecond : tPort.emptyPortfolioBadge}
          </span>
        </div>

        {portfolio.length === 0 ? (
          <div className="py-14 px-6 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/30 dark:border-emerald-500/20 flex items-center justify-center text-[#006B52] dark:text-emerald-400">
              <Wallet className="w-7 h-7" />
            </div>
            <div className="max-w-md space-y-1">
              <h4 className="text-base font-bold text-[#0F172A] dark:text-white">{tPort.emptyTitle}</h4>
              <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed">
                {tPort.emptyDesc}
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              data-on-dark="true"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-xs font-bold text-white shadow-lg shadow-blue-950/20 dark:shadow-emerald-950 transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{tPort.addFirstAsset}</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-slate-900/50 text-[11px] font-bold text-[#475569] dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">{tPort.colAsset}</th>
                  <th className="py-3 px-4 text-right">{tPort.colQty}</th>
                  <th className="py-3 px-4 text-right">{tPort.colAvgPrice}</th>
                  <th className="py-3 px-4 text-right">{tPort.colCurrentPrice}</th>
                  <th className="py-3 px-4 text-right">{tPort.colTotalValue}</th>
                  <th className="py-3 px-4 text-right">{tPort.colReturnPL}</th>
                  <th className="py-3 px-4 text-center">{tPort.colActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60">
                {positionsWithLiveMetrics.map((pos) => {
                  const pctInfo = formatSignedPercentChange(pos.profitPercent, 2, locale);
                  const posCategory =
                    pos.assetType === 'stock_br'
                      ? 'stocks_br'
                      : pos.assetType === 'stock_us'
                      ? 'stocks_us'
                      : pos.assetType === 'crypto'
                      ? 'crypto'
                      : 'forex';
                  const dec = getAssetPriceDecimals(pos.currentPrice, pos.currency, posCategory);
                  return (
                    <tr key={pos.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div>
                          <div className="font-extrabold text-[#0F172A] dark:text-white text-xs">{pos.symbol}</div>
                          <div className="text-[11px] text-[#475569] dark:text-slate-400">{pos.displayName}</div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono-numbers font-semibold text-[#0F172A] dark:text-slate-200">
                        {pos.quantity.toLocaleString(locale)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono-numbers text-[#334155] dark:text-slate-300">
                        {formatCurrencyValue(pos.averageBuyPrice, pos.currency, dec, locale)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <DualPrice
                          price={pos.currentPrice}
                          currency={pos.currency}
                          rates={universalRates}
                          category={posCategory}
                          layout="compact"
                          primaryClassName="font-mono-numbers font-bold text-[#0F172A] dark:text-white text-xs"
                          secondaryClassName="text-[10px] font-mono-numbers text-[#006B52] dark:text-emerald-400"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <DualPrice
                          price={pos.currentTotalValue}
                          currency={pos.currency}
                          rates={universalRates}
                          category={posCategory}
                          layout="compact"
                          primaryClassName="font-mono-numbers font-bold text-[#0F172A] dark:text-white text-xs"
                          secondaryClassName="text-[10px] font-mono-numbers text-[#006B52] dark:text-emerald-400 font-medium"
                        />
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono-numbers font-bold">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${
                            !pctInfo.isNegative ? 'text-[#006B52] bg-[#E3F7F2] dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-[#DC2626] bg-[#FEE2E2] dark:text-rose-400 dark:bg-rose-500/10'
                          }`}
                        >
                          {formatSignedCurrencyChange(pos.profitLoss, pos.currency, 2, locale)} ({pctInfo.text})
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => removePortfolioPosition(pos.id)}
                          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#DC2626] dark:text-slate-500 dark:hover:text-rose-400 hover:bg-[#FEE2E2] dark:hover:bg-rose-500/10 transition cursor-pointer"
                          title={tPort.removeTooltip}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editorial Multi-Currency Portfolio Guide & FAQ */}
      <section
        aria-labelledby="portfolio-editorial-guide-heading"
        className="rounded-2xl bg-[#FFFFFF] dark:bg-[#0d1627] border border-[#E2E8F0] dark:border-slate-800/90 p-5 sm:p-6 shadow-xl space-y-6"
      >
        <div className="border-b border-[#E2E8F0] dark:border-slate-800/80 pb-4 space-y-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{tPort.editorialGuide.eyebrow}</span>
          </span>
          <h2
            id="portfolio-editorial-guide-heading"
            className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight"
          >
            {tPort.editorialGuide.title}
          </h2>
          <p className="text-xs sm:text-[13px] text-[#1E293B] dark:text-slate-300 leading-relaxed max-w-4xl">
            {tPort.editorialGuide.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tPort.editorialGuide.sections.map((section, idx) => {
            const SectionIcon = [Coins, Calculator, Globe2, ShieldCheck][idx] || BookOpen;
            return (
              <article
                key={section.id}
                className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 p-4 space-y-2"
              >
                <h3 className="text-xs sm:text-sm font-bold text-[#002266] dark:text-white leading-snug flex items-start gap-2">
                  <SectionIcon
                    className="w-4 h-4 text-[#003399] dark:text-emerald-400 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{section.title}</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed">
                  {section.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="border-t border-[#E2E8F0] dark:border-slate-800/80 pt-5 space-y-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003399] dark:text-emerald-400">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{tPort.faq.eyebrow}</span>
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              {tPort.faq.title}
            </h2>
          </div>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tPort.faq.items.map((item) => (
              <div
                key={item.question}
                className="rounded-xl bg-[#F4F7F9] dark:bg-[#070e1b] border border-[#E2E8F0] dark:border-slate-800/80 p-4 space-y-2"
              >
                <dt className="text-xs sm:text-sm font-bold text-[#002266] dark:text-white leading-snug">
                  {item.question}
                </dt>
                <dd className="text-[11px] sm:text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Modal Add Position */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#FFFFFF] dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 p-6 shadow-2xl text-[#0F172A] dark:text-slate-100 animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#006B52] dark:text-emerald-400" />
                <span>{tPort.modalTitle}</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#475569] hover:text-[#0F172A] dark:text-slate-400 dark:hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">
                  {tPort.selectCatalogLabel}
                </label>
                <select
                  defaultValue=""
                  onChange={(e) => handleSelectAssetPreset(e.target.value)}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                >
                  <option value="">{tPort.selectCatalogPlaceholder}</option>
                  <optgroup label={tPort.groupStocksBr}>
                    {assets.filter((a) => a.category === 'stocks_br').slice(0, 15).map((a) => (
                      <option key={a.id} value={a.symbol}>
                        {a.symbol} - {getLocalizedAssetName(a, lang)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={tPort.groupStocksUs}>
                    {assets.filter((a) => a.category === 'stocks_us').slice(0, 15).map((a) => (
                      <option key={a.id} value={a.symbol}>
                        {a.symbol} - {getLocalizedAssetName(a, lang)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={tPort.groupCrypto}>
                    {assets.filter((a) => a.category === 'crypto').slice(0, 10).map((a) => (
                      <option key={a.id} value={a.symbol}>
                        {a.symbol} - {getLocalizedAssetName(a, lang)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={tPort.groupForex}>
                    {assets.filter((a) => a.category === 'forex').slice(0, 10).map((a) => (
                      <option key={a.id} value={a.symbol}>
                        {a.symbol} - {getLocalizedAssetName(a, lang)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">{tPort.tickerLabel}</label>
                <input
                  type="text"
                  required
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
                  placeholder={tPort.tickerPlaceholder}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] dark:text-white font-mono uppercase focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">{tPort.assetNameLabel}</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={tPort.assetNamePlaceholder}
                  className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] dark:text-white focus:outline-none focus:border-[#003399] dark:focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">{tPort.categoryLabel}</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-[#0F172A] dark:text-white focus:outline-none"
                  >
                    <option value="stock_br">{tPort.catStockBr}</option>
                    <option value="stock_us">{tPort.catStockUs}</option>
                    <option value="crypto">{tPort.catCrypto}</option>
                    <option value="forex">{tPort.catForex}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">{tPort.currencyLabel}</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-[#0F172A] dark:text-white focus:outline-none"
                  >
                    <option value="BRL">{tPort.curBrl}</option>
                    <option value="EUR">{tPort.curEur}</option>
                    <option value="USD">{tPort.curUsd}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">{tPort.qtyLabel}</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#334155] dark:text-slate-300 mb-1">{tPort.avgBuyPriceLabel}</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={newBuyPrice}
                    onChange={(e) => setNewBuyPrice(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] dark:bg-slate-950 border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-[#0F172A] dark:text-white font-mono-numbers focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-slate-700 text-xs font-semibold text-[#334155] dark:text-slate-300 hover:bg-[#F1F5F9] dark:hover:bg-slate-800 cursor-pointer"
                >
                  {tPort.cancel}
                </button>
                <button
                  type="submit"
                  data-on-dark="true"
                  className="px-4 py-1.5 rounded-lg bg-[#003399] hover:bg-[#002266] dark:bg-gradient-to-r dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 text-xs font-bold text-white transition cursor-pointer"
                >
                  {tPort.addToPortfolio}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
