import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  ShieldCheck,
  RotateCcw,
  Lock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Square,
  SlidersHorizontal,
  Flame,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Home,
  Globe,
  BarChart3,
  FileText,
  Briefcase,
  Sparkles,
  Newspaper,
  Bell,
  Cpu,
  Target,
  PlayCircle,
  Settings,
  HelpCircle,
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { formatCurrencyValue, formatPointsValue, getDualCurrencyDisplay, formatSignedPercentChange, getAssetPriceDecimals } from '../utils/finance';
import { MarketAsset } from '../services/marketData';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { TRADING_TRANSLATIONS } from '../i18n/tradingTranslations';
import { getLocalizedAssetName, getLocalizedNewsCategory, localizeNewsItem } from '../i18n/marketDataTranslations';

export interface DayTradePosition {
  id: string;
  symbol: string;
  name: string;
  side: 'BUY' | 'SELL';
  contracts: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  openTime: string;
}

export interface DayTradeClosedTrade {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  contracts: number;
  entryPrice: number;
  exitPrice: number;
  pnlBrl: number;
  pnlUsd: number;
  closeTime: string;
}

export interface BookOffer {
  price: number;
  bidQty: number;
  askQty: number;
  bidVolPct: number;
  askVolPct: number;
  isPoc?: boolean;
}

export interface TradeTapeItem {
  id: string;
  time: string;
  price: number;
  qty: number;
  buyerBroker: string;
  sellerBroker: string;
  aggressor: 'BUY' | 'SELL';
  isLargeTrade?: boolean;
}

const BROKERS_POOL = [
  'UBS',
  'Morgan Stanley',
  'BTG Pactual',
  'XP Investimentos',
  'Itaú BBA',
  'Bradesco',
  'Goldman Sachs',
  'Merrill Lynch',
  'Genial',
  'Clear',
];

export const DayTradeView: React.FC = () => {
  const { assets, news, universalRates, setActiveTab, selectedAsset: globalSelectedAsset, theme } = useMarket();
  const isLight = theme === 'light';
  const dtGridStroke = isLight ? '#E2E8F0' : '#1e293b';
  const dtUpHex = isLight ? '#009B77' : '#10B981';
  const dtDownHex = isLight ? '#DC2626' : '#EF4444';
  const dtMa9Hex = isLight ? '#003399' : '#38BDF8';
  const dtMa200Hex = isLight ? '#D99B00' : '#F59E0B';
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const tDt = TRADING_TRANSLATIONS[lang].dayTrade;

  type MarketWatchCategoryKey = 'all' | 'stocks' | 'futures' | 'forex' | 'crypto' | 'bdrs';

  // Curated list of high-liquidity assets for Day Trading dynamically connected to live assets
  const dayTradeAssets = useMemo(() => {
    const ibov = assets.find((a) => a.symbol === 'IBOVESPA');
    const usdBrl = assets.find((a) => a.symbol === 'USD/BRL');

    const winPrice = ibov && ibov.price > 0 ? Math.round(ibov.price / 5) * 5 : 171670;
    const winChange = ibov ? ibov.change24h : 0.68;
    const winHigh = ibov && ibov.high24h > 0 ? Math.round(ibov.high24h / 5) * 5 : 172000;
    const winLow = ibov && ibov.low24h > 0 ? Math.round(ibov.low24h / 5) * 5 : 171200;
    const winSpark = ibov?.sparkline?.length ? ibov.sparkline.map((v) => Math.round(v / 5) * 5) : [171000, 171300, 171500, 171670];

    const wdoPrice = usdBrl ? Number((usdBrl.price * 1000).toFixed(1)) : 5482.5;
    const wdoChange = usdBrl ? usdBrl.change24h : -0.32;
    const wdoHigh = usdBrl ? Number((usdBrl.high24h * 1000).toFixed(1)) : 5510.0;
    const wdoLow = usdBrl ? Number((usdBrl.low24h * 1000).toFixed(1)) : 5468.0;
    const wdoSpark = usdBrl?.sparkline?.length ? usdBrl.sparkline.map((v) => Number((v * 1000).toFixed(1))) : [5505, 5495, 5488, 5482.5];

    const customList = [
      {
        id: 'win_fut',
        symbol: 'WINFUT',
        name: tDt.winfutName,
        category: 'indices',
        price: winPrice,
        currency: 'BRL',
        change24h: winChange,
        changeValue: Number(((winPrice * winChange) / 100).toFixed(0)),
        high24h: winHigh,
        low24h: winLow,
        volume: '18.4B',
        sparkline: winSpark,
        flag: '🇧🇷',
        tickSize: 5,
        tickValue: 1.0, // 5 pts = R$ 1.00 por contrato
        type: tDt.typeFutures,
        categoryKey: 'futures' as const,
      },
      {
        id: 'wdo_fut',
        symbol: 'WDOFUT',
        name: tDt.wdofutName,
        category: 'forex',
        price: wdoPrice,
        currency: 'BRL',
        change24h: wdoChange,
        changeValue: Number(((wdoPrice * wdoChange) / 100).toFixed(1)),
        high24h: wdoHigh,
        low24h: wdoLow,
        volume: '12.8B',
        sparkline: wdoSpark,
        flag: '🇧🇷',
        tickSize: 0.5,
        tickValue: 5.0, // 0.5 pt = R$ 5.00
        type: tDt.typeFutures,
        categoryKey: 'futures' as const,
      },
      ...assets.map((a) => ({
        ...a,
        name: getLocalizedAssetName(a, lang),
        type:
          a.category === 'crypto'
            ? tDt.typeCrypto
            : a.category === 'forex'
            ? tDt.typeForex
            : a.category === 'stocks_us'
            ? tDt.typeBdrs
            : tDt.typeStocks,
        categoryKey: (a.category === 'crypto'
          ? 'crypto'
          : a.category === 'forex'
          ? 'forex'
          : a.category === 'stocks_us'
          ? 'bdrs'
          : 'stocks') as Exclude<MarketWatchCategoryKey, 'all' | 'futures'>,
      })),
    ];
    return customList as (MarketAsset & { tickSize?: number; tickValue?: number; type: string; categoryKey: Exclude<MarketWatchCategoryKey, 'all'> })[];
  }, [assets, lang, tDt]);

  // Selected Active Asset (synchronized with global market navigation)
  const [selectedSymbol, setSelectedSymbol] = useState<string>(() => {
    return globalSelectedAsset?.symbol || 'WINFUT';
  });

  useEffect(() => {
    if (globalSelectedAsset?.symbol) {
      setSelectedSymbol(globalSelectedAsset.symbol);
    }
  }, [globalSelectedAsset]);

  const currentAsset = dayTradeAssets.find((a) => a.symbol === selectedSymbol) || dayTradeAssets[0];

  // Dual and Tri-currency real-time synchronized representation
  const dualAssetDisplay = useMemo(() => {
    return getDualCurrencyDisplay(currentAsset.price, currentAsset.currency, universalRates, undefined, locale);
  }, [currentAsset.price, currentAsset.currency, universalRates, locale]);

  // Active Main Center Tab
  const [activeCenterTab, setActiveCenterTab] = useState<'chart' | 'tape' | 'book' | 'indicators' | 'strategies'>('chart');

  // Timeframe for Intraday Chart (1m, 5m, 15m, 1h, 1D)
  const [chartInterval, setChartInterval] = useState<'1m' | '5m' | '15m' | '1h' | '1D'>('5m');

  // Indicator Toggles
  const [showMA9, setShowMA9] = useState<boolean>(true);
  const [showMA21, setShowMA21] = useState<boolean>(true);
  const [showMA200, setShowMA200] = useState<boolean>(true);
  const [showVWAP, setShowVWAP] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);

  // Market Watch Tab in Right Column
  const [marketWatchCategory, setMarketWatchCategory] = useState<MarketWatchCategoryKey>('all');
  const [marketWatchSearch, setMarketWatchSearch] = useState<string>('');

  // Mobile Responsiveness: Tabs and Accordion Controls
  const [mobileBottomSection, setMobileBottomSection] = useState<'boleta' | 'mercado' | 'book' | 'tape' | 'posicoes'>('boleta');
  const [isMobilePanelCollapsed, setIsMobilePanelCollapsed] = useState<boolean>(false);

  // Modals
  const [showRiskModal, setShowRiskModal] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // Risk Management State
  const [dailyProfitGoal, setDailyProfitGoal] = useState<number>(2000); // R$ 2.000
  const [dailyLossLimit, setDailyLossLimit] = useState<number>(1000); // R$ 1.000
  const [isRiskLocked, setIsRiskLocked] = useState<boolean>(false);

  // Paper Trading Account
  const [accountBalance, setAccountBalance] = useState<number>(100000); // R$ 100.000,00
  const [realizedPnl, setRealizedPnl] = useState<number>(0);
  const [positions, setPositions] = useState<DayTradePosition[]>([]);
  const [closedTrades, setClosedTrades] = useState<DayTradeClosedTrade[]>([]);
  const [sessionStartTime] = useState<Date>(new Date(Date.now() - 4 * 3600 * 1000 - 32 * 60 * 1000));
  const [sessionTimer, setSessionTimer] = useState<string>('04h 32m 18s');

  // Order Ticket State
  const [orderTicketTab, setOrderTicketTab] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [contracts, setContracts] = useState<number>(1);
  const [limitPrice, setLimitPrice] = useState<number>(currentAsset.price);
  const [useStopLoss, setUseStopLoss] = useState<boolean>(true);
  const [stopLossOffset, setStopLossOffset] = useState<number>(150);
  const [useTakeProfit, setUseTakeProfit] = useState<boolean>(true);
  const [takeProfitOffset, setTakeProfitOffset] = useState<number>(300);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Live price permanently tied to live central market price
  const currentMarketPrice = currentAsset.price;

  // Session elapsed timer update
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const diff = Math.floor((Date.now() - sessionStartTime.getTime()) / 1000);
      const hours = String(Math.floor(diff / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const seconds = String(diff % 60).padStart(2, '0');
      setSessionTimer(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [sessionStartTime]);

  // Synchronize limit price when asset changes
  useEffect(() => {
    setLimitPrice(currentAsset.price);
  }, [currentAsset.price, selectedSymbol]);

  // Floating P&L Calculation
  const floatingPnlBrl = useMemo(() => {
    return positions.reduce((acc, pos) => {
      const isWin = pos.symbol === 'WINFUT' || pos.symbol === 'WIN$';
      const isWdo = pos.symbol === 'WDOFUT' || pos.symbol === 'WDO$';
      const diff = pos.side === 'BUY' ? currentMarketPrice - pos.entryPrice : pos.entryPrice - currentMarketPrice;

      let tradeVal = 0;
      if (isWin) {
        tradeVal = diff * 0.2 * pos.contracts;
      } else if (isWdo) {
        tradeVal = diff * 10 * pos.contracts;
      } else {
        tradeVal = diff * pos.contracts;
      }
      return acc + tradeVal;
    }, 0);
  }, [positions, currentMarketPrice]);

  const floatingPnlUsd = floatingPnlBrl / (universalRates.BRL || 5.48);
  const totalDayPnl = realizedPnl + floatingPnlBrl;
  const returnPercentage = ((totalDayPnl / 100000) * 100).toFixed(2);

  // Risk lock evaluation
  useEffect(() => {
    if (totalDayPnl <= -Math.abs(dailyLossLimit)) {
      if (!isRiskLocked) {
        setIsRiskLocked(true);
        if (positions.length > 0) {
          handleCloseAllPositions(tDt.notifications.riskLimitAutoClose);
        }
      }
    }
  }, [totalDayPnl, dailyLossLimit, isRiskLocked, positions, tDt.notifications.riskLimitAutoClose]);

  // Deep Institutional DOM Book and Times & Trades
  const [bookOffers, setBookOffers] = useState<BookOffer[]>([]);
  const [timesAndTrades, setTimesAndTrades] = useState<TradeTapeItem[]>([]);

  useEffect(() => {
    const step = currentAsset.tickSize || (currentAsset.symbol.includes('WIN') ? 5 : currentAsset.symbol.includes('WDO') ? 0.5 : currentAsset.price < 5 ? 0.01 : 0.05);
    const base = currentAsset.price;

    const offers: BookOffer[] = [];
    let maxVol = 1;
    for (let i = 12; i >= -12; i--) {
      if (i === 0) continue;
      const p = Number((base + i * step).toFixed(step < 1 ? 2 : 0));
      const bQty = i < 0 ? Math.floor(Math.random() * 450 + 40) : 0;
      const aQty = i > 0 ? Math.floor(Math.random() * 450 + 40) : 0;
      if (bQty > maxVol) maxVol = bQty;
      if (aQty > maxVol) maxVol = aQty;
      offers.push({
        price: p,
        bidQty: bQty,
        askQty: aQty,
        bidVolPct: 0,
        askVolPct: 0,
        isPoc: i === -2,
      });
    }
    const normalizedOffers = offers.map((o) => ({
      ...o,
      bidVolPct: Math.min(100, Math.round((o.bidQty / maxVol) * 100)),
      askVolPct: Math.min(100, Math.round((o.askQty / maxVol) * 100)),
    }));
    setBookOffers(normalizedOffers);

    const initialTrades: TradeTapeItem[] = [];
    const now = Date.now();
    for (let i = 0; i < 20; i++) {
      const side = Math.random() > 0.5 ? 'BUY' : 'SELL';
      const offset = (Math.random() - 0.5) * step * 1.5;
      const qty = Math.random() > 0.8 ? Math.floor(Math.random() * 70 + 30) : Math.floor(Math.random() * 20 + 2);
      initialTrades.push({
        id: `trade_${now}_${i}`,
        time: new Date(now - i * 1200).toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        price: Number((base + offset).toFixed(step < 1 ? 2 : 0)),
        qty,
        buyerBroker: BROKERS_POOL[Math.floor(Math.random() * BROKERS_POOL.length)],
        sellerBroker: BROKERS_POOL[Math.floor(Math.random() * BROKERS_POOL.length)],
        aggressor: side,
        isLargeTrade: qty >= 40,
      });
    }
    setTimesAndTrades(initialTrades);
  }, [selectedSymbol, currentAsset.price, locale]);

  // Live Real-Time Tape Stream (anchored strictly around live asset price)
  useEffect(() => {
    const interval = setInterval(() => {
      const step = currentAsset.tickSize || (currentAsset.symbol.includes('WIN') ? 5 : currentAsset.symbol.includes('WDO') ? 0.5 : currentAsset.price < 5 ? 0.01 : 0.05);
      const side: 'BUY' | 'SELL' = Math.random() > 0.48 ? 'BUY' : 'SELL';
      const microOffset = (side === 'BUY' ? step * 0.5 : -step * 0.5) * (Math.random() > 0.5 ? 1 : 0);
      const tickPrice = Number((currentAsset.price + microOffset).toFixed(step < 1 ? 2 : 0));
      const qty = Math.random() > 0.82 ? Math.floor(Math.random() * 80 + 35) : Math.floor(Math.random() * 25 + 2);

      const newTrade: TradeTapeItem = {
        id: `tick_${Date.now()}_${Math.random()}`,
        time: new Date().toLocaleTimeString(locale, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        price: tickPrice,
        qty,
        buyerBroker: BROKERS_POOL[Math.floor(Math.random() * BROKERS_POOL.length)],
        sellerBroker: BROKERS_POOL[Math.floor(Math.random() * BROKERS_POOL.length)],
        aggressor: side,
        isLargeTrade: qty >= 40,
      };

      setTimesAndTrades((prev) => [newTrade, ...prev.slice(0, 35)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentAsset, locale]);

  // Order Execution Functions
  const handleExecuteOrder = (side: 'BUY' | 'SELL') => {
    if (isRiskLocked) {
      setOrderNotification(tDt.notifications.riskLockedError);
      setTimeout(() => setOrderNotification(null), 4000);
      return;
    }

    const price = orderType === 'MARKET' ? currentMarketPrice : limitPrice;

    const stopPrice = useStopLoss
      ? side === 'BUY'
        ? price - stopLossOffset
        : price + stopLossOffset
      : undefined;

    const takePrice = useTakeProfit
      ? side === 'BUY'
        ? price + takeProfitOffset
        : price - takeProfitOffset
      : undefined;

    const newPosition: DayTradePosition = {
      id: `pos_${Date.now()}`,
      symbol: currentAsset.symbol,
      name: currentAsset.name,
      side,
      contracts,
      entryPrice: price,
      currentPrice: price,
      stopLoss: stopPrice,
      takeProfit: takePrice,
      openTime: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setPositions((prev) => [...prev, newPosition]);
    setOrderNotification(
      `${tDt.notifications.orderExecutedPrefix} ${side === 'BUY' ? tDt.sideBuy : tDt.sideSell} ${tDt.notifications.orderExecutedMiddle} ${contracts}x ${currentAsset.symbol} ${tDt.notifications.orderExecutedAt} ${formatCurrencyValue(price, currentAsset.currency, 2, locale)}`
    );
    setTimeout(() => setOrderNotification(null), 3000);
  };

  const handleClosePosition = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;

    const isWin = pos.symbol === 'WINFUT' || pos.symbol === 'WIN$';
    const isWdo = pos.symbol === 'WDOFUT' || pos.symbol === 'WDO$';
    const diff = pos.side === 'BUY' ? currentMarketPrice - pos.entryPrice : pos.entryPrice - currentMarketPrice;

    let pnl = 0;
    if (isWin) {
      pnl = diff * 0.2 * pos.contracts;
    } else if (isWdo) {
      pnl = diff * 10 * pos.contracts;
    } else {
      pnl = diff * pos.contracts;
    }

    const closed: DayTradeClosedTrade = {
      id: pos.id,
      symbol: pos.symbol,
      side: pos.side,
      contracts: pos.contracts,
      entryPrice: pos.entryPrice,
      exitPrice: currentMarketPrice,
      pnlBrl: pnl,
      pnlUsd: pnl / (universalRates.BRL || 5.48),
      closeTime: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setClosedTrades((prev) => [closed, ...prev]);
    setRealizedPnl((prev) => prev + pnl);
    setAccountBalance((prev) => prev + pnl);
    setPositions((prev) => prev.filter((p) => p.id !== id));

    setOrderNotification(
      `${tDt.notifications.positionClosedPrefix} ${pos.symbol} ${tDt.notifications.positionClosedResult} ${pnl >= 0 ? '+' : ''}${formatCurrencyValue(pnl, 'BRL', 2, locale)}`
    );
    setTimeout(() => setOrderNotification(null), 3000);
  };

  const handleCloseAllPositions = (reason?: string) => {
    if (positions.length === 0) return;

    let batchPnl = 0;
    const newClosed: DayTradeClosedTrade[] = [];

    positions.forEach((pos) => {
      const isWin = pos.symbol === 'WINFUT' || pos.symbol === 'WIN$';
      const isWdo = pos.symbol === 'WDOFUT' || pos.symbol === 'WDO$';
      const diff = pos.side === 'BUY' ? currentMarketPrice - pos.entryPrice : pos.entryPrice - currentMarketPrice;

      let pnl = 0;
      if (isWin) {
        pnl = diff * 0.2 * pos.contracts;
      } else if (isWdo) {
        pnl = diff * 10 * pos.contracts;
      } else {
        pnl = diff * pos.contracts;
      }
      batchPnl += pnl;

      newClosed.push({
        id: pos.id,
        symbol: pos.symbol,
        side: pos.side,
        contracts: pos.contracts,
        entryPrice: pos.entryPrice,
        exitPrice: currentMarketPrice,
        pnlBrl: pnl,
        pnlUsd: pnl / (universalRates.BRL || 5.48),
        closeTime: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      });
    });

    setClosedTrades((prev) => [...newClosed, ...prev]);
    setRealizedPnl((prev) => prev + batchPnl);
    setAccountBalance((prev) => prev + batchPnl);
    setPositions([]);

    setOrderNotification(reason || `${tDt.notifications.allClosedPrefix} ${batchPnl >= 0 ? '+' : ''}${formatCurrencyValue(batchPnl, 'BRL', 2, locale)}`);
    setTimeout(() => setOrderNotification(null), 3500);
  };

  const handleReversePosition = () => {
    if (positions.length === 0) return;
    const firstPos = positions[0];
    const newSide = firstPos.side === 'BUY' ? 'SELL' : 'BUY';
    const totalQty = firstPos.contracts;

    handleCloseAllPositions();
    setTimeout(() => {
      const newPos: DayTradePosition = {
        id: `pos_${Date.now()}`,
        symbol: currentAsset.symbol,
        name: currentAsset.name,
        side: newSide,
        contracts: totalQty,
        entryPrice: currentMarketPrice,
        currentPrice: currentMarketPrice,
        openTime: new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setPositions([newPos]);
      setOrderNotification(`${tDt.notifications.reverseExecutedPrefix} ${newSide === 'BUY' ? tDt.notifications.boughtState : tDt.notifications.soldState} ${tDt.notifications.inWord} ${totalQty}x ${currentAsset.symbol}`);
      setTimeout(() => setOrderNotification(null), 3000);
    }, 200);
  };

  const handleResetSimulator = () => {
    setAccountBalance(100000);
    setRealizedPnl(0);
    setPositions([]);
    setClosedTrades([]);
    setIsRiskLocked(false);
    setOrderNotification(tDt.notifications.simulatorReset);
    setTimeout(() => setOrderNotification(null), 3000);
  };

  // Performance calculation
  const totalTradesCount = closedTrades.length;
  const winningTrades = closedTrades.filter((t) => t.pnlBrl > 0).length;
  const losingTrades = totalTradesCount - winningTrades;
  const winRate = totalTradesCount > 0 ? Math.round((winningTrades / totalTradesCount) * 100) : 75;

  // Global top continuous tickers list dynamically derived from real-time assets
  const globalTickers = useMemo(() => {
    const getAsset = (sym: string) =>
      assets.find(
        (a) =>
          a.symbol.toLowerCase() === sym.toLowerCase() ||
          a.id.toLowerCase() === sym.toLowerCase() ||
          a.name.toLowerCase().includes(sym.toLowerCase())
      );

    const ibov = getAsset('IBOVESPA');
    const usdBrl = getAsset('USD/BRL');
    const eurBrl = getAsset('EUR/BRL');
    const sp500 = getAsset('S&P 500');
    const btc = getAsset('BTC/USD');
    const petr = getAsset('PETR4');
    const vale = getAsset('VALE3');

    const ibovPrice = ibov && ibov.price > 0 ? ibov.price : 171670;
    const usdPrice = usdBrl && usdBrl.price > 0 ? usdBrl.price : 5.584;
    const eurPrice = eurBrl && eurBrl.price > 0 ? eurBrl.price : 6.2335;
    const sp500Price = sp500 && sp500.price > 0 ? sp500.price : 7575.4;
    const btcPrice = btc && btc.price > 0 ? btc.price : 87950;
    const petrPrice = petr && petr.price > 0 ? petr.price : 38.65;
    const valePrice = vale && vale.price > 0 ? vale.price : 62.4;

    return [
      {
        symbol: 'IBOVESPA',
        label: 'IBOV',
        price: formatPointsValue(ibovPrice, locale),
        change: ibov ? ibov.change24h : +0.68,
        spark: ibov?.sparkline?.length ? ibov.sparkline : [171000, 171300, 171500, 171670],
      },
      {
        symbol: 'USD/BRL',
        label: tDt.dollarLabel,
        price: formatCurrencyValue(usdPrice, 'BRL', getAssetPriceDecimals(usdPrice, 'BRL', 'forex'), locale),
        change: usdBrl ? usdBrl.change24h : -0.52,
        spark: usdBrl?.sparkline?.length ? usdBrl.sparkline : [5.52, 5.54, 5.57, 5.584],
      },
      {
        symbol: 'EUR/BRL',
        label: tDt.euroLabel,
        price: formatCurrencyValue(eurPrice, 'BRL', getAssetPriceDecimals(eurPrice, 'BRL', 'forex'), locale),
        change: eurBrl ? eurBrl.change24h : +0.21,
        spark: eurBrl?.sparkline?.length ? eurBrl.sparkline : [6.18, 6.20, 6.22, 6.2335],
      },
      {
        symbol: 'S&P 500',
        label: 'S&P 500',
        price: formatPointsValue(sp500Price, locale),
        change: sp500 ? sp500.change24h : +0.48,
        spark: sp500?.sparkline?.length ? sp500.sparkline : [7520, 7540, 7560, 7575],
      },
      {
        symbol: 'BTC/USD',
        label: 'BTC/USD',
        price: formatCurrencyValue(btcPrice, 'USD', getAssetPriceDecimals(btcPrice, 'USD', 'crypto'), locale),
        change: btc ? btc.change24h : +1.84,
        spark: btc?.sparkline?.length ? btc.sparkline : [85200, 86400, 87100, 87950],
      },
      {
        symbol: 'PETR4',
        label: 'PETR4',
        price: formatCurrencyValue(petrPrice, 'BRL', getAssetPriceDecimals(petrPrice, 'BRL', 'stocks_br'), locale),
        change: petr ? petr.change24h : +1.15,
        spark: petr?.sparkline?.length ? petr.sparkline : [38.1, 38.3, 38.5, 38.65],
      },
      {
        symbol: 'VALE3',
        label: 'VALE3',
        price: formatCurrencyValue(valePrice, 'BRL', getAssetPriceDecimals(valePrice, 'BRL', 'stocks_br'), locale),
        change: vale ? vale.change24h : -0.42,
        spark: vale?.sparkline?.length ? vale.sparkline : [62.9, 62.7, 62.5, 62.4],
      },
    ];
  }, [assets, locale, tDt]);

  // Filtered market watch items
  const filteredMarketWatch = useMemo(() => {
    return dayTradeAssets.filter((a) => {
      if (marketWatchCategory !== 'all' && a.categoryKey !== marketWatchCategory) return false;
      if (marketWatchSearch.trim()) {
        const query = marketWatchSearch.toLowerCase();
        return a.symbol.toLowerCase().includes(query) || a.name.toLowerCase().includes(query);
      }
      return true;
    });
  }, [dayTradeAssets, marketWatchCategory, marketWatchSearch]);

  const marketWatchCategories: { key: MarketWatchCategoryKey; label: string }[] = [
    { key: 'all', label: tDt.categories.all },
    { key: 'stocks', label: tDt.categories.stocks },
    { key: 'futures', label: tDt.categories.futures },
    { key: 'forex', label: tDt.categories.forex },
    { key: 'crypto', label: tDt.categories.crypto },
    { key: 'bdrs', label: tDt.categories.bdrs },
  ];

  // Left sidebar menu items definition
  const sidebarItems = [
    { id: 'dashboard', label: tDt.sidebar.dashboard, icon: Home, action: () => setActiveTab('dashboard') },
    { id: 'mercados', label: tDt.sidebar.mercados, icon: Globe, action: () => setActiveTab('mercados') },
    { id: 'graficos', label: tDt.sidebar.graficos, icon: BarChart3, action: () => setActiveTab('graficos') },
    { id: 'ordens', label: tDt.sidebar.ordens, icon: FileText, action: () => setActiveCenterTab('book') },
    { id: 'posicoes', label: tDt.sidebar.posicoes, icon: Activity, action: () => {} },
    { id: 'carteira', label: tDt.sidebar.carteira, icon: Briefcase, action: () => setActiveTab('carteiras') },
    { id: 'analises', label: tDt.sidebar.analises, icon: Sparkles, action: () => setActiveCenterTab('indicators') },
    { id: 'noticias', label: tDt.sidebar.noticias, icon: Newspaper, action: () => setActiveTab('noticias') },
    { id: 'alertas', label: tDt.sidebar.alertas, icon: Bell, action: () => setShowAlertModal(true) },
    { id: 'estrategias', label: tDt.sidebar.estrategias, icon: Target, action: () => setActiveCenterTab('strategies') },
    { id: 'simulador', label: tDt.sidebar.simulador, icon: PlayCircle, action: handleResetSimulator },
    { id: 'configuracoes', label: tDt.sidebar.configuracoes, icon: Settings, action: () => setShowRiskModal(true) },
    { id: 'ajuda', label: tDt.sidebar.ajuda, icon: HelpCircle, action: () => setShowHelpModal(true) },
  ];

  return (
    <div className="w-full h-full flex flex-col min-h-0 bg-[#F4F7F9] dark:bg-[#070d18] text-slate-900 dark:text-slate-100 select-none overflow-hidden text-xs">
      {/* =========================================================================
          1. TOP CONTINUOUS GLOBAL TICKERS MARQUEE (IBOV, DÓLAR, EURO, S&P 500, BTC)
         ========================================================================= */}
      <div className="bg-white dark:bg-[#050a14] border-b border-[#E2E8F0] dark:border-slate-800/90 px-2 py-1 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar shrink-0 text-[11px] font-mono-numbers">
        <div className="flex items-center gap-1.5 shrink-0 text-slate-600 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider pr-2 border-r border-[#E2E8F0] dark:border-slate-800">
          <span className="w-2 h-2 rounded-full bg-[#009B77] dark:bg-emerald-400 animate-pulse" />
          <span>{tDt.feedGlobalLive}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar flex-nowrap py-0.5">
          {globalTickers.map((t) => {
            const pctInfo = formatSignedPercentChange(t.change, 2);
            return (
              <div
                key={t.symbol}
                onClick={() => {
                  const match = dayTradeAssets.find((a) => a.symbol === t.symbol);
                  if (match) setSelectedSymbol(match.symbol);
                }}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#F8FAFC] dark:bg-slate-900/60 hover:bg-[#F1F5F9] dark:hover:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-800 transition cursor-pointer shrink-0"
              >
                <span className="font-bold text-slate-700 dark:text-slate-200 text-[10px]">{t.label}</span>
                <span className="font-black text-slate-950 dark:text-white text-[11px]">{t.price}</span>
                <span
                  className={`text-[10px] font-bold flex items-center ${
                    !pctInfo.isNegative ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
                  }`}
                >
                  {pctInfo.text}
                </span>
                {/* Micro SVG Sparkline */}
                <svg className="w-10 h-3 overflow-visible shrink-0" viewBox="0 0 40 12">
                  <polyline
                    fill="none"
                    stroke={!pctInfo.isNegative ? dtUpHex : dtDownHex}
                    strokeWidth="1.2"
                    points="0,8 12,4 24,9 40,2"
                  />
                </svg>
              </div>
            );
          })}
        </div>

        {/* Paper Trading Status Badge (Real API button excluded as requested) */}
        <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-[#E2E8F0] dark:border-slate-800 text-[10px]">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E3F7F2] dark:bg-emerald-500/15 border border-[#009B77]/40 dark:border-emerald-500/35 text-[#006B52] dark:text-emerald-400 font-black uppercase tracking-wider shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#009B77] dark:bg-emerald-400 animate-pulse" />
            {tDt.paperSimulatorBadge}
          </span>
        </div>
      </div>

      {/* Floating Notification */}
      {orderNotification && (
        <div className="bg-[#E3F7F2] dark:bg-emerald-950/95 border-b border-[#009B77]/50 dark:border-emerald-500/70 text-[#006B52] dark:text-emerald-200 px-3 py-1 text-xs flex items-center justify-between shadow-lg shrink-0">
          <span className="font-semibold">{orderNotification}</span>
          <button onClick={() => setOrderNotification(null)} className="text-[#006B52] dark:text-emerald-400 hover:text-slate-950 dark:hover:text-white ml-2 cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================================
          2. MAIN TRADING WORKSPACE BODY: (SIDEBAR + CENTER + RIGHT COLUMN)
         ========================================================================= */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* =======================================================================
            2A. SLIM LEFT SIDEBAR MENU (Icons with Institutional Seal)
           ======================================================================= */}
        <aside className="hidden lg:flex w-11 sm:w-12 bg-white dark:bg-[#050a14] border-r border-[#E2E8F0] dark:border-slate-800/90 flex-col items-center justify-between py-2 shrink-0 select-none z-10">
          <div className="flex flex-col items-center gap-1 w-full">
            {sidebarItems.slice(0, 10).map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  title={item.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#006B52] dark:hover:text-emerald-400 hover:bg-[#F1F5F9] dark:hover:bg-slate-800/70 transition cursor-pointer group relative"
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}
          </div>

          {/* Lower tools & DinhEuro Institutional Seal */}
          <div className="flex flex-col items-center gap-1 w-full pt-1 border-t border-[#E2E8F0] dark:border-slate-800/80">
            {sidebarItems.slice(10).map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.action}
                  title={item.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#B45309] dark:hover:text-amber-400 hover:bg-[#F1F5F9] dark:hover:bg-slate-800/70 transition cursor-pointer"
                >
                  <IconComp className="w-4 h-4" />
                </button>
              );
            })}

            {/* DinhEuro PRO Institutional Badge */}
            <div
              onClick={() => setActiveTab('sobre')}
              title={tDt.proSealTitle}
              className="mt-1 cursor-pointer group flex flex-col items-center"
            >
              <div
                data-on-dark="true"
                className="w-7 h-7 rounded-full bg-gradient-to-br from-[#009B77] to-[#003399] dark:from-emerald-500 dark:to-teal-700 p-0.5 shadow-md flex items-center justify-center"
              >
                <span className="text-[9px] font-black text-white dark:text-slate-950">D€</span>
              </div>
              <span className="text-[7px] text-[#006B52] dark:text-emerald-400 font-bold uppercase tracking-tighter mt-0.5">PRO</span>
            </div>
          </div>
        </aside>

        {/* =======================================================================
            2B. CENTRAL WORKSPACE: (TOP TABS & CONTROLS + CHART/VIEW + BOTTOM DOCK)
           ======================================================================= */}
        <div className="hidden lg:flex flex-1 min-h-0 flex-col overflow-hidden">
          {/* Top Asset & Function Tabs Header Strip */}
          <div className="bg-white dark:bg-[#09111e] border-b border-[#E2E8F0] dark:border-slate-800 px-3 py-1.5 flex items-center justify-between gap-2 flex-wrap shrink-0">
            {/* Left: Asset Select Dropdown & Current Price with Dual/Tri Conversion */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  aria-label={tDt.selectAssetAria}
                  className="bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-700 hover:border-[#009B77] dark:hover:border-emerald-500 rounded px-2 pr-6 py-1 text-xs font-black text-slate-900 dark:text-white font-mono-numbers outline-none cursor-pointer max-w-[210px] truncate"
                >
                  <optgroup label={tDt.groupFuturesB3}>
                    <option value="WINFUT">WINFUT • {tDt.winfutShort}</option>
                    <option value="WDOFUT">WDOFUT • {tDt.wdofutShort}</option>
                  </optgroup>
                  <optgroup label={tDt.groupStocksBr}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'stocks_br')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupWallStBdrs}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'stocks_us')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupCrypto}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'crypto')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupForex}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'forex')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupIndicesCommodities}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'indices' || a.category === 'commodities')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Price, 24h Variation & Synchronized Dual/Tri Currency Display */}
              {(() => {
                const dec = getAssetPriceDecimals(currentMarketPrice, currentAsset.currency, currentAsset.category);
                const pctInfo = formatSignedPercentChange(currentAsset.change24h, 2);
                const dispVol = currentAsset.category === 'forex' ? '--' : currentAsset.volume;
                return (
                  <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0] dark:border-slate-800 font-mono-numbers">
                    <div className="flex flex-col leading-tight">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
                          {formatCurrencyValue(currentMarketPrice, currentAsset.currency, dec, locale)}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            !pctInfo.isNegative ? 'text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10' : 'text-[#DC2626] dark:text-rose-400 bg-[#FEE2E2] dark:bg-rose-500/10'
                          }`}
                        >
                          {pctInfo.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] text-[#006B52] dark:text-emerald-400/90 font-semibold dark:font-medium">
                        <span>≈ {dualAssetDisplay.secondaryFormatted}</span>
                        <span className="text-slate-400 dark:text-slate-600">|</span>
                        <span className="text-slate-600 dark:text-slate-400">≈ {dualAssetDisplay.tertiaryFormatted}</span>
                      </div>
                    </div>

                    <div className="hidden 2xl:flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 pl-2 border-l border-[#E2E8F0] dark:border-slate-800/80">
                      <span>{tDt.minShort} <strong className="text-slate-900 dark:text-slate-200">{formatCurrencyValue(currentAsset.low24h, currentAsset.currency, dec, locale)}</strong></span>
                      <span>{tDt.maxShort} <strong className="text-slate-900 dark:text-slate-200">{formatCurrencyValue(currentAsset.high24h, currentAsset.currency, dec, locale)}</strong></span>
                      <span>{tDt.volShort} <strong className="text-slate-900 dark:text-slate-200">{dispVol}</strong></span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Center: Functional Terminal Tabs */}
            <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#060c18] p-0.5 rounded border border-[#E2E8F0] dark:border-slate-800 text-[11px] font-bold">
              {[
                { id: 'chart', label: tDt.tabs.chart },
                { id: 'tape', label: tDt.tabs.tape },
                { id: 'book', label: tDt.tabs.book },
                { id: 'indicators', label: tDt.tabs.indicators },
                { id: 'strategies', label: tDt.tabs.strategies },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCenterTab(tab.id as any)}
                  data-on-dark={activeCenterTab === tab.id ? 'true' : undefined}
                  className={`px-2 py-0.5 rounded transition cursor-pointer ${
                    activeCenterTab === tab.id
                      ? 'bg-[#003399] dark:bg-slate-800 text-white dark:text-emerald-400 font-black shadow-sm'
                      : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Timeframes & Indicator Badges */}
            <div className="flex items-center gap-2">
              {/* Timeframes */}
              <div className="flex items-center bg-[#F1F5F9] dark:bg-[#060c18] p-0.5 rounded border border-[#E2E8F0] dark:border-slate-800 text-[10px] font-bold">
                {(['1m', '5m', '15m', '1h', '1D'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartInterval(tf)}
                    className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                      chartInterval === tf
                        ? 'bg-white dark:bg-slate-800 text-[#003399] dark:text-emerald-400 font-black shadow-sm dark:shadow-none'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Indicator Toggles */}
              <div className="hidden lg:flex items-center gap-1 text-[9px] font-mono-numbers">
                <button
                  onClick={() => setShowMA9(!showMA9)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    showMA9
                      ? 'bg-[#E6EEFF] dark:bg-sky-500/20 text-[#003399] dark:text-sky-300 border-[#003399]/35 dark:border-sky-500/40 font-bold'
                      : 'text-slate-500 border-[#CBD5E1] dark:border-slate-800'
                  }`}
                >
                  MA 9
                </button>
                <button
                  onClick={() => setShowMA21(!showMA21)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    showMA21
                      ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-300 border-purple-400/50 dark:border-purple-500/40 font-bold'
                      : 'text-slate-500 border-[#CBD5E1] dark:border-slate-800'
                  }`}
                >
                  MA 21
                </button>
                <button
                  onClick={() => setShowMA200(!showMA200)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    showMA200
                      ? 'bg-[#FEF7E0] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border-[#E5A910]/50 dark:border-amber-500/40 font-bold'
                      : 'text-slate-500 border-[#CBD5E1] dark:border-slate-800'
                  }`}
                >
                  MA 200
                </button>
                <button
                  onClick={() => setShowVWAP(!showVWAP)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    showVWAP
                      ? 'bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-400/50 dark:border-fuchsia-500/40 font-bold'
                      : 'text-slate-500 border-[#CBD5E1] dark:border-slate-800'
                  }`}
                >
                  VWAP
                </button>
                <button
                  onClick={() => setShowVolume(!showVolume)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    showVolume
                      ? 'bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border-[#009B77]/40 dark:border-emerald-500/40 font-bold'
                      : 'text-slate-500 border-[#CBD5E1] dark:border-slate-800'
                  }`}
                >
                  Vol
                </button>
              </div>
            </div>
          </div>

          {/* Central Active View Area (Flex-1) */}
          <div className="flex-1 min-h-0 relative bg-[#F4F7F9] dark:bg-[#060c18] overflow-hidden p-1.5">
            {activeCenterTab === 'chart' && (
              <div className="w-full h-full relative rounded border border-[#E2E8F0] dark:border-slate-800/80 bg-white dark:bg-[#060c18] overflow-hidden flex flex-col">
                <svg className="w-full h-full flex-1" viewBox="0 0 700 280" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="vol-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={dtUpHex} stopOpacity="0.4" />
                      <stop offset="100%" stopColor={dtUpHex} stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Gridlines */}
                  <line x1="0" y1="50" x2="700" y2="50" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />
                  <line x1="0" y1="100" x2="700" y2="100" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />
                  <line x1="0" y1="150" x2="700" y2="150" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />
                  <line x1="0" y1="200" x2="700" y2="200" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />

                  {/* Candlesticks & Volume Histogram */}
                  {Array.from({ length: 35 }).map((_, i) => {
                    const x = 12 + i * 19.4;
                    const isUp = i % 2 === 0 || i % 5 === 0;
                    const open = 115 + Math.sin(i * 0.35) * 45;
                    const close = isUp ? open - 18 : open + 16;
                    const high = Math.min(open, close) - 12;
                    const low = Math.max(open, close) + 12;
                    const color = isUp ? dtUpHex : dtDownHex;
                    const volHeight = Math.abs(Math.sin(i * 0.5)) * 38 + 8;

                    return (
                      <g key={i}>
                        {/* Volume bar at base */}
                        {showVolume && (
                          <rect
                            x={x}
                            y={275 - volHeight}
                            width="8.5"
                            height={volHeight}
                            fill={color}
                            opacity="0.35"
                            rx="0.5"
                          />
                        )}
                        {/* Wick */}
                        <line x1={x + 4.2} y1={high} x2={x + 4.2} y2={low} stroke={color} strokeWidth="1.2" />
                        {/* Candle body */}
                        <rect
                          x={x}
                          y={Math.min(open, close)}
                          width="8.5"
                          height={Math.max(3, Math.abs(close - open))}
                          fill={color}
                          rx="0.5"
                        />
                      </g>
                    );
                  })}

                  {/* MA 9 Line */}
                  {showMA9 && (
                    <path
                      d="M 12 118 Q 180 85, 360 98 T 685 92"
                      fill="none"
                      stroke={dtMa9Hex}
                      strokeWidth="1.8"
                      opacity="0.95"
                    />
                  )}

                  {/* MA 21 Line (Purple) */}
                  {showMA21 && (
                    <path
                      d="M 12 126 Q 200 100, 380 112 T 685 106"
                      fill="none"
                      stroke="#C084FC"
                      strokeWidth="1.8"
                      opacity="0.9"
                    />
                  )}

                  {/* MA 200 Line (Gold / Amber) */}
                  {showMA200 && (
                    <path
                      d="M 12 142 Q 220 130, 420 128 T 685 120"
                      fill="none"
                      stroke={dtMa200Hex}
                      strokeWidth="2.2"
                      opacity="0.85"
                    />
                  )}

                  {/* VWAP Line (Magenta Dash) */}
                  {showVWAP && (
                    <path
                      d="M 12 112 Q 170 92, 340 104 T 685 98"
                      fill="none"
                      stroke="#E879F9"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                      opacity="0.85"
                    />
                  )}

                  {/* Active Positions Overlay Line */}
                  {positions.length > 0 && (
                    <g>
                      <line x1="0" y1="95" x2="700" y2="95" stroke={isLight ? '#003399' : '#3B82F6'} strokeWidth="1.5" strokeDasharray="5 3" />
                      <text x="8" y="90" fill={isLight ? '#003399' : '#60A5FA'} fontSize="9" fontWeight="bold">
                        {tDt.avgPriceOverlay} ({positions[0].side === 'BUY' ? tDt.sideBuy : tDt.sideSell}): {formatCurrencyValue(positions[0].entryPrice, currentAsset.currency, 2, locale)}
                      </text>
                    </g>
                  )}
                </svg>

                {/* Overlaid Indicators Legend */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] font-mono-numbers">
                  {showMA9 && <span className="text-[#003399] dark:text-sky-400 bg-[#E6EEFF]/95 dark:bg-sky-950/70 px-1 py-0.2 rounded border border-[#003399]/30 dark:border-sky-500/30 font-semibold">MA 9: {formatCurrencyValue(currentMarketPrice * 1.001, currentAsset.currency, 2, locale)}</span>}
                  {showMA21 && <span className="text-purple-800 dark:text-purple-400 bg-purple-100/95 dark:bg-purple-950/70 px-1 py-0.2 rounded border border-purple-400/40 dark:border-purple-500/30 font-semibold">MA 21: {formatCurrencyValue(currentMarketPrice * 0.998, currentAsset.currency, 2, locale)}</span>}
                  {showMA200 && <span className="text-[#B45309] dark:text-amber-400 bg-[#FEF7E0]/95 dark:bg-amber-950/70 px-1 py-0.2 rounded border border-[#E5A910]/40 dark:border-amber-500/30 font-semibold">MA 200: {formatCurrencyValue(currentMarketPrice * 0.985, currentAsset.currency, 2, locale)}</span>}
                  {showVWAP && <span className="text-fuchsia-800 dark:text-fuchsia-400 bg-fuchsia-100/95 dark:bg-fuchsia-950/70 px-1 py-0.2 rounded border border-fuchsia-400/40 dark:border-fuchsia-500/30 font-semibold">VWAP: {formatCurrencyValue(currentMarketPrice * 0.999, currentAsset.currency, 2, locale)}</span>}
                </div>
              </div>
            )}

            {/* Other functional views inside central pane */}
            {activeCenterTab === 'tape' && (
              <div className="w-full h-full flex flex-col rounded border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#070e1b] p-2 overflow-hidden">
                <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-[#E2E8F0] dark:border-slate-800 text-[11px] shrink-0">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
                    {tDt.tapeTabTitle} • {currentAsset.symbol}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono-numbers">
                    <span className="text-slate-600 dark:text-slate-400">{tDt.currentPriceLabel}</span>
                    <strong className="text-slate-950 dark:text-white font-bold">{formatCurrencyValue(currentMarketPrice, currentAsset.currency, 2, locale)}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-5 py-1 px-2 text-[9px] font-bold text-slate-600 dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800/80 uppercase tracking-wider shrink-0">
                  <span>{tDt.colTime}</span>
                  <span>{tDt.colTradedPrice}</span>
                  <span>{tDt.colLotVolume}</span>
                  <span>{tDt.colBuyer}</span>
                  <span className="text-right">{tDt.colSeller}</span>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 font-mono-numbers text-[10px]">
                  {timesAndTrades.map((t) => (
                    <div
                      key={t.id}
                      className={`grid grid-cols-5 py-0.5 px-2 rounded transition hover:bg-slate-100 dark:hover:bg-slate-800/50 ${
                        t.isLargeTrade ? 'bg-[#FEF7E0] dark:bg-amber-500/10 border-l-2 border-[#E5A910] dark:border-amber-400' : ''
                      }`}
                    >
                      <span className="text-slate-500 dark:text-slate-400 text-[9px]">{t.time}</span>
                      <span className={`font-black ${t.aggressor === 'BUY' ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                        {formatCurrencyValue(t.price, currentAsset.currency, 2, locale)}
                      </span>
                      <span className="text-slate-900 dark:text-white font-bold">{t.qty} {tDt.lotsUnit}</span>
                      <span className="text-[#003399] dark:text-sky-300 font-medium">{t.buyerBroker}</span>
                      <span className="text-[#DC2626] dark:text-rose-300 font-medium text-right">{t.sellerBroker}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCenterTab === 'book' && (
              <div className="w-full h-full flex flex-col rounded border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#070e1b] p-2 overflow-hidden">
                <div className="flex items-center justify-between pb-1.5 mb-1 border-b border-[#E2E8F0] dark:border-slate-800 text-[11px] shrink-0">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#003399] dark:text-sky-400" />
                    {tDt.bookTabTitle} • {currentAsset.symbol}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono-numbers">
                    <span className="text-[#006B52] dark:text-emerald-400 font-bold">{tDt.buyTotalLabel} {bookOffers.reduce((a, b) => a + b.bidQty, 0)}</span>
                    <span className="text-slate-400 dark:text-slate-600">|</span>
                    <span className="text-[#DC2626] dark:text-rose-400 font-bold">{tDt.sellTotalLabel} {bookOffers.reduce((a, b) => a + b.askQty, 0)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 py-1 px-2 text-[9px] font-bold text-slate-600 dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800/80 uppercase tracking-wider shrink-0">
                  <span>{tDt.colBidQty}</span>
                  <span className="text-center">{tDt.colOfficialPrice}</span>
                  <span className="text-right">{tDt.colAskQty}</span>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 font-mono-numbers text-[10px]">
                  {bookOffers.map((b, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLimitPrice(b.price)}
                      title={`${tDt.bookClickTitlePrefix} ${b.price} ${tDt.bookClickTitleSuffix}`}
                      className={`relative grid grid-cols-3 py-0.5 px-2 rounded transition cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60 ${
                        b.isPoc ? 'bg-[#FEF7E0] dark:bg-amber-500/10 border border-[#E5A910]/40 dark:border-amber-500/30' : ''
                      }`}
                    >
                      {/* Depth Bar Background for Bid / Ask */}
                      {b.bidQty > 0 && (
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-[#009B77]/15 dark:bg-emerald-500/15 pointer-events-none rounded-l"
                          style={{ width: `${b.bidVolPct / 2}%` }}
                        />
                      )}
                      {b.askQty > 0 && (
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-[#DC2626]/15 dark:bg-rose-500/15 pointer-events-none rounded-r"
                          style={{ width: `${b.askVolPct / 2}%` }}
                        />
                      )}

                      <span className="relative z-10 text-[#006B52] dark:text-emerald-400 font-bold">{b.bidQty > 0 ? b.bidQty : ''}</span>
                      <span className="relative z-10 text-center font-black text-slate-900 dark:text-white">
                        {formatCurrencyValue(b.price, currentAsset.currency, 2, locale)}
                      </span>
                      <span className="relative z-10 text-right text-[#DC2626] dark:text-rose-400 font-bold">{b.askQty > 0 ? b.askQty : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCenterTab === 'indicators' && (
              <div className="w-full h-full flex flex-col rounded border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#070e1b] p-3 overflow-y-auto no-scrollbar space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{tDt.indicatorsTabTitle}</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400 block text-[10px]">{tDt.rsiLabel}</span>
                    <strong className="text-[#006B52] dark:text-emerald-400 font-bold font-mono-numbers">{tDt.rsiStatus}</strong>
                  </div>
                  <div className="p-2 rounded bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400 block text-[10px]">{tDt.macdLabel}</span>
                    <strong className="text-[#006B52] dark:text-emerald-400 font-bold font-mono-numbers">{tDt.macdStatus}</strong>
                  </div>
                  <div className="p-2 rounded bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400 block text-[10px]">{tDt.stochLabel}</span>
                    <strong className="text-[#B45309] dark:text-amber-400 font-bold font-mono-numbers">{tDt.stochStatus}</strong>
                  </div>
                  <div className="p-2 rounded bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400 block text-[10px]">{tDt.bollingerLabel}</span>
                    <strong className="text-[#003399] dark:text-sky-400 font-bold font-mono-numbers">{tDt.bollingerStatus}</strong>
                  </div>
                </div>
              </div>
            )}

            {activeCenterTab === 'strategies' && (
              <div className="w-full h-full flex flex-col rounded border border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-[#070e1b] p-3 overflow-y-auto no-scrollbar space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 dark:text-white">{tDt.strategiesTabTitle}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-[#006B52] dark:text-emerald-400 block">{tDt.strat1Title}</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{tDt.strat1Desc}</p>
                  </div>
                  <div className="p-2.5 rounded bg-[#F8FAFC] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-[#003399] dark:text-sky-400 block">{tDt.strat2Title}</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{tDt.strat2Desc}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =====================================================================
              2C. BOTTOM MONITORING & PERFORMANCE DOCK (Minhas Posições + Performance + Notícias)
             ===================================================================== */}
          <div className="h-44 sm:h-48 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F4F7F9] dark:bg-[#070d18] grid grid-cols-12 gap-1.5 p-1.5 shrink-0 overflow-hidden">
            {/* Box 1: Minhas Posições (5 Cols) */}
            <div className="col-span-12 lg:col-span-5 bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded p-1.5 flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800/80 mb-1 shrink-0 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#009B77] dark:text-emerald-400" />
                  {tDt.myPositions} ({positions.length})
                </span>
                {positions.length > 0 && (
                  <button
                    onClick={() => handleCloseAllPositions()}
                    className="px-1.5 py-0.2 rounded bg-[#FEF7E0] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border border-[#E5A910]/50 dark:border-amber-500/40 text-[9px] font-bold cursor-pointer"
                  >
                    {tDt.closeAllShort}
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                {positions.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-500 text-[10px]">
                    {tDt.noOpenPositions}
                  </div>
                ) : (
                  <table className="w-full text-left text-[10px] font-mono-numbers">
                    <thead className="bg-[#F1F5F9] dark:bg-[#060c18] text-slate-600 dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 sticky top-0">
                      <tr>
                        <th className="py-0.5 px-1">{tDt.colAsset}</th>
                        <th className="py-0.5 px-1">{tDt.colSide}</th>
                        <th className="py-0.5 px-1 text-right">{tDt.colQty}</th>
                        <th className="py-0.5 px-1 text-right">{tDt.colEntry}</th>
                        <th className="py-0.5 px-1 text-right">{tDt.colCurrent}</th>
                        <th className="py-0.5 px-1 text-right">P&L</th>
                        <th className="py-0.5 px-1 text-center">{tDt.colAction}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800/60">
                      {positions.map((pos) => {
                        const isWin = pos.symbol.includes('WIN');
                        const isWdo = pos.symbol.includes('WDO');
                        const diff = pos.side === 'BUY' ? currentMarketPrice - pos.entryPrice : pos.entryPrice - currentMarketPrice;
                        let pnlBrl = isWin ? diff * 0.2 * pos.contracts : isWdo ? diff * 10 * pos.contracts : diff * pos.contracts;

                        return (
                          <tr key={pos.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-0.5 px-1 font-bold text-slate-900 dark:text-white">{pos.symbol}</td>
                            <td className="py-0.5 px-1">
                              <span className={`px-1 py-0.2 rounded text-[8px] font-bold ${pos.side === 'BUY' ? 'text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10' : 'text-[#DC2626] dark:text-rose-400 bg-[#FEE2E2] dark:bg-rose-500/10'}`}>
                                {pos.side === 'BUY' ? tDt.sideBuy : tDt.sideSell}
                              </span>
                            </td>
                            <td className="py-0.5 px-1 text-right text-slate-800 dark:text-slate-200">{pos.contracts}</td>
                            <td className="py-0.5 px-1 text-right text-slate-600 dark:text-slate-400">{pos.entryPrice}</td>
                            <td className="py-0.5 px-1 text-right text-slate-900 dark:text-white font-bold">{currentMarketPrice}</td>
                            <td className={`py-0.5 px-1 text-right font-bold ${pnlBrl >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                              {pnlBrl >= 0 ? '+' : ''}{formatCurrencyValue(pnlBrl, 'BRL', 2, locale)}
                            </td>
                            <td className="py-0.5 px-1 text-center">
                              <button
                                onClick={() => handleClosePosition(pos.id)}
                                className="px-1 py-0.2 rounded bg-[#F1F5F9] dark:bg-slate-800 hover:bg-[#DC2626] dark:hover:bg-rose-600 text-slate-700 hover:text-white dark:text-slate-300 text-[8px] font-bold transition cursor-pointer"
                              >
                                {tDt.flattenBtn}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Box 2: Performance do Dia (Anel Win Rate + P&L + Cronômetro) (3.5 Cols) */}
            <div className="col-span-12 lg:col-span-4 bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded p-2 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800/80 shrink-0 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Target className="w-3 h-3 text-[#D99B00] dark:text-amber-400" />
                  {tDt.dayPerformance}
                </span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono-numbers flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {sessionTimer}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 flex-1 py-1">
                {/* SVG Progress Ring */}
                <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#009B77] dark:text-emerald-500"
                      strokeDasharray={`${winRate}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xs font-black font-mono-numbers text-slate-900 dark:text-white">{winRate}%</span>
                    <span className="text-[7px] text-slate-500 dark:text-slate-400 uppercase font-bold">{tDt.winRateLabel}</span>
                  </div>
                </div>

                {/* Performance Metrics Values */}
                <div className="space-y-1 font-mono-numbers text-[10px] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{tDt.netResultLabel}</span>
                    <strong className={`font-black text-xs ${totalDayPnl >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                      {totalDayPnl >= 0 ? '+' : ''}{formatCurrencyValue(totalDayPnl, 'BRL', 2, locale)}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{tDt.dayReturnLabel}</span>
                    <span className={`font-bold ${totalDayPnl >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                      {totalDayPnl >= 0 ? '+' : ''}{returnPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[9px]">
                    <span>{tDt.tradesWord} {winningTrades} Gain / {losingTrades} Loss</span>
                    <span>{tDt.totalWord} {totalTradesCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Notícias do Mercado (3.5 Cols) */}
            <div className="col-span-12 lg:col-span-3 bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded p-1.5 flex flex-col min-h-0 overflow-hidden">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800/80 mb-1 shrink-0 text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <Newspaper className="w-3 h-3 text-[#003399] dark:text-sky-400" />
                  {tDt.marketNewsTitle}
                </span>
                <span className="text-[9px] text-[#006B52] dark:text-emerald-400 font-bold uppercase">{tDt.realTimeTag}</span>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 text-[10px]">
                {news.slice(0, 4).map((item, idx) => {
                  const localizedItem = localizeNewsItem(item, lang);
                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => setActiveTab('noticias')}
                      className="p-1 rounded bg-[#F8FAFC] dark:bg-[#060c18] hover:bg-[#F1F5F9] dark:hover:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-800/60 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                        <span className="font-mono-numbers">{localizedItem.datetime ? localizedItem.datetime.split(' ')[1] || '14:32' : '14:32'}</span>
                        <span className="text-[#006B52] dark:text-emerald-400 font-semibold">{getLocalizedNewsCategory(item.category || 'Macro', lang)}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-300 font-medium line-clamp-1 text-[10px] leading-tight hover:text-slate-950 dark:hover:text-white">
                        {localizedItem.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            2D. RIGHT COLUMN: "MERCADO EM TEMPO REAL" + BOLETA DE EXECUÇÃO RÁPIDA
           ======================================================================= */}
        <div className="hidden lg:flex w-64 sm:w-72 bg-white dark:bg-[#050a14] border-l border-[#E2E8F0] dark:border-slate-800/90 flex-col shrink-0 select-none overflow-hidden">
          {/* Upper Right: Mercado em Tempo Real */}
          <div className="h-56 flex flex-col border-b border-[#E2E8F0] dark:border-slate-800 p-2 overflow-hidden shrink-0">
            <div className="flex items-center justify-between pb-1 mb-1">
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-[#009B77] dark:text-emerald-400" />
                {tDt.realTimeMarketTitle}
              </span>
              <span className="text-[9px] text-slate-500 font-mono-numbers">{filteredMarketWatch.length} {tDt.assetsCountSuffix}</span>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-[9px] font-bold mb-1">
              {marketWatchCategories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setMarketWatchCategory(cat.key)}
                  data-on-dark={marketWatchCategory === cat.key ? 'true' : undefined}
                  className={`px-1.5 py-0.5 rounded transition cursor-pointer shrink-0 ${
                    marketWatchCategory === cat.key
                      ? 'bg-[#009B77] dark:bg-emerald-600 text-white font-bold'
                      : 'bg-[#F1F5F9] dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-[#CBD5E1] dark:border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search input */}
            <div className="relative mb-1">
              <Search className="w-3 h-3 text-slate-500 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={tDt.searchAssetPlaceholder}
                value={marketWatchSearch}
                onChange={(e) => setMarketWatchSearch(e.target.value)}
                className="w-full bg-[#F8FAFC] dark:bg-[#08111e] border border-[#CBD5E1] dark:border-slate-800 rounded pl-6 pr-2 py-0.5 text-[10px] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none"
              />
            </div>

            {/* Market Watch Table */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5 font-mono-numbers text-[10px]">
              {filteredMarketWatch.map((item) => {
                const isSelected = item.symbol === selectedSymbol;
                const pctInfo = formatSignedPercentChange(item.change24h, 2);
                const dec = getAssetPriceDecimals(item.price, item.currency, item.category);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSymbol(item.symbol)}
                    className={`flex items-center justify-between px-1.5 py-1 rounded transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#E3F7F2] dark:bg-emerald-950/40 border border-[#009B77]/50 dark:border-emerald-500/40'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block text-[10px]">{item.symbol}</span>
                      <span className="text-[8px] text-slate-500">{item.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 dark:text-white text-[10px] block font-mono-numbers">
                        {formatCurrencyValue(item.price, item.currency, dec, locale)}
                      </span>
                      <div className="flex items-center justify-end gap-1 text-[9px] font-mono-numbers">
                        <span className="text-slate-500 dark:text-slate-400 text-[8px]">
                          ≈ {getDualCurrencyDisplay(item.price, item.currency, universalRates, undefined, locale, item.category).secondaryFormatted}
                        </span>
                        <span className={`font-bold ${!pctInfo.isNegative ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                          {pctInfo.text}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lower Right: Boleta de Execução Rápida */}
          <div className="flex-1 min-h-0 bg-white dark:bg-[#09111e] p-2.5 flex flex-col justify-between overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white uppercase text-[10px] tracking-wider flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-[#009B77] dark:text-emerald-400" />
                  {tDt.quickTicketTitle}
                </span>
                <span className="text-[9px] text-slate-600 dark:text-slate-400 font-mono-numbers font-semibold">
                  Spread: {currentAsset.symbol.includes('WIN') ? '5 pts' : '0.5 pt'}
                </span>
              </div>

              {/* Order Ticket Tabs (Compra / Venda) */}
              <div className="grid grid-cols-2 gap-1 bg-[#F1F5F9] dark:bg-[#060c18] p-0.5 rounded border border-[#E2E8F0] dark:border-slate-800 text-xs font-black">
                <button
                  type="button"
                  onClick={() => setOrderTicketTab('BUY')}
                  data-on-dark={orderTicketTab === 'BUY' ? 'true' : undefined}
                  className={`py-1 rounded transition cursor-pointer flex items-center justify-center gap-1 ${
                    orderTicketTab === 'BUY'
                      ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                      : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-3 h-3" /> {tDt.ticketBuyTab}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderTicketTab('SELL')}
                  data-on-dark={orderTicketTab === 'SELL' ? 'true' : undefined}
                  className={`py-1 rounded transition cursor-pointer flex items-center justify-center gap-1 ${
                    orderTicketTab === 'SELL'
                      ? 'bg-[#DC2626] dark:bg-rose-600 text-white shadow'
                      : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <ArrowDownRight className="w-3 h-3" /> {tDt.ticketSellTab}
                </button>
              </div>

              {/* Order Type (Mercado / Limitada) */}
              <div className="grid grid-cols-2 gap-1 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setOrderType('MARKET')}
                  data-on-dark={orderType === 'MARKET' ? 'true' : undefined}
                  className={`py-1 rounded border transition cursor-pointer ${
                    orderType === 'MARKET'
                      ? 'bg-[#003399] dark:bg-slate-800 border-[#003399] dark:border-slate-700 text-white'
                      : 'bg-[#F8FAFC] dark:bg-[#060c18] border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tDt.marketOrderBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('LIMIT')}
                  data-on-dark={orderType === 'LIMIT' ? 'true' : undefined}
                  className={`py-1 rounded border transition cursor-pointer ${
                    orderType === 'LIMIT'
                      ? 'bg-[#003399] dark:bg-slate-800 border-[#003399] dark:border-slate-700 text-white'
                      : 'bg-[#F8FAFC] dark:bg-[#060c18] border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {tDt.limitOrderBtn}
                </button>
              </div>

              {/* Quantity / Contratos */}
              <div>
                <div className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>{tDt.contractsQtyLabel}</span>
                  <span className="font-mono-numbers text-slate-900 dark:text-white font-bold">{contracts}x</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={contracts}
                    onChange={(e) => setContracts(Math.max(1, Number(e.target.value)))}
                    className="w-16 bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-700 rounded px-1.5 py-1 text-slate-900 dark:text-white font-mono-numbers text-xs font-bold outline-none text-center"
                  />
                  <div className="flex-1 grid grid-cols-5 gap-1">
                    {[1, 5, 10, 25, 50].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setContracts(q)}
                        className={`py-1 rounded text-[10px] font-bold border transition cursor-pointer ${
                          contracts === q
                            ? 'bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border-[#009B77]/50 dark:border-emerald-500/40'
                            : 'bg-[#F1F5F9] dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Limit Price if selected */}
              {orderType === 'LIMIT' && (
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{tDt.limitPriceLabel}</span>
                  <input
                    type="number"
                    step={currentAsset.symbol.includes('WIN') ? 5 : 0.5}
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-white font-mono-numbers text-xs font-bold outline-none"
                  />
                </div>
              )}

              {/* Stop Loss & Gain Offsets */}
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                <div className="bg-[#F8FAFC] dark:bg-[#060c18] p-1 rounded border border-[#E2E8F0] dark:border-slate-800/80 flex items-center justify-between">
                  <label className="text-[#DC2626] dark:text-rose-400 font-bold flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useStopLoss}
                      onChange={(e) => setUseStopLoss(e.target.checked)}
                      className="accent-rose-500 cursor-pointer"
                    />
                    <span>SL</span>
                  </label>
                  {useStopLoss && (
                    <input
                      type="number"
                      value={stopLossOffset}
                      onChange={(e) => setStopLossOffset(Number(e.target.value))}
                      className="w-14 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded px-1 text-slate-900 dark:text-white font-mono-numbers text-right text-[10px]"
                    />
                  )}
                </div>

                <div className="bg-[#F8FAFC] dark:bg-[#060c18] p-1 rounded border border-[#E2E8F0] dark:border-slate-800/80 flex items-center justify-between">
                  <label className="text-[#006B52] dark:text-emerald-400 font-bold flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useTakeProfit}
                      onChange={(e) => setUseTakeProfit(e.target.checked)}
                      className="accent-emerald-500 cursor-pointer"
                    />
                    <span>TP</span>
                  </label>
                  {useTakeProfit && (
                    <input
                      type="number"
                      value={takeProfitOffset}
                      onChange={(e) => setTakeProfitOffset(Number(e.target.value))}
                      className="w-14 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded px-1 text-slate-900 dark:text-white font-mono-numbers text-right text-[10px]"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* ACTION EXECUTION BUTTONS */}
            <div className="space-y-1.5 pt-1">
              {orderTicketTab === 'BUY' ? (
                <button
                  type="button"
                  onClick={() => handleExecuteOrder('BUY')}
                  data-on-dark="true"
                  className="w-full py-2.5 rounded-lg bg-[#009B77] hover:bg-[#008263] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer flex flex-col items-center justify-center shadow-lg active:scale-98"
                >
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{tDt.buyActionVerb} {contracts}x {currentAsset.symbol}</span>
                  </div>
                  <span className="text-[10px] font-mono-numbers opacity-90">
                    {formatCurrencyValue(currentMarketPrice, currentAsset.currency, getAssetPriceDecimals(currentMarketPrice, currentAsset.currency, currentAsset.category), locale)} (≈ {dualAssetDisplay.secondaryFormatted})
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleExecuteOrder('SELL')}
                  data-on-dark="true"
                  className="w-full py-2.5 rounded-lg bg-[#DC2626] hover:bg-red-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider transition cursor-pointer flex flex-col items-center justify-center shadow-lg active:scale-98"
                >
                  <div className="flex items-center gap-1">
                    <ArrowDownRight className="w-3.5 h-3.5" />
                    <span>{tDt.sellActionVerb} {contracts}x {currentAsset.symbol}</span>
                  </div>
                  <span className="text-[10px] font-mono-numbers opacity-90">
                    {formatCurrencyValue(currentMarketPrice, currentAsset.currency, getAssetPriceDecimals(currentMarketPrice, currentAsset.currency, currentAsset.category), locale)} (≈ {dualAssetDisplay.secondaryFormatted})
                  </span>
                </button>
              )}

              {/* Botão de Emergência ZERAR + Inverter */}
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => handleCloseAllPositions()}
                  className="py-1.5 px-2 rounded bg-[#E5A910] hover:bg-[#D99B00] dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide transition cursor-pointer flex items-center justify-center gap-1 shadow-md"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>{tDt.flattenBtn.toUpperCase()}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReversePosition}
                  className="py-1.5 px-2 rounded bg-[#F1F5F9] hover:bg-[#E2E8F0] dark:bg-slate-800 dark:hover:bg-slate-700 border border-[#CBD5E1] dark:border-slate-700 text-slate-900 dark:text-slate-200 font-bold text-xs uppercase tracking-wide transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                  <span>{tDt.reverseBtn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================================
            2E. MOBILE WORKSPACE (100% Width Chart + Abas/Accordion for Boleta & Mercado)
           ======================================================================= */}
        <div className="lg:hidden flex-1 min-h-0 flex flex-col overflow-y-auto w-full bg-[#F4F7F9] dark:bg-[#050a14]">
          {/* Mobile Top Asset Strip */}
          <div className="bg-white dark:bg-[#09111e] border-b border-[#E2E8F0] dark:border-slate-800 px-3 py-2 flex flex-col gap-1.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  aria-label={tDt.selectAssetAria}
                  className="w-full bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-700 hover:border-[#009B77] dark:hover:border-emerald-500 rounded px-2 pr-6 py-1.5 text-xs font-black text-slate-900 dark:text-white font-mono-numbers outline-none cursor-pointer"
                >
                  <optgroup label={tDt.groupFuturesB3}>
                    <option value="WINFUT">WINFUT • {tDt.winfutShort}</option>
                    <option value="WDOFUT">WDOFUT • {tDt.wdofutShort}</option>
                  </optgroup>
                  <optgroup label={tDt.groupStocksBr}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'stocks_br')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupWallStBdrs}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'stocks_us')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupCrypto}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'crypto')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupForex}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'forex')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label={tDt.groupIndicesCommodities}>
                    {dayTradeAssets
                      .filter((a) => a.category === 'indices' || a.category === 'commodities')
                      .map((a) => (
                        <option key={a.id} value={a.symbol}>
                          {a.symbol} • {a.name}
                        </option>
                      ))}
                  </optgroup>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Price & Variation */}
              {(() => {
                const dec = getAssetPriceDecimals(currentMarketPrice, currentAsset.currency, currentAsset.category);
                const pctInfo = formatSignedPercentChange(currentAsset.change24h, 2);
                return (
                  <div className="flex items-baseline gap-1.5 font-mono-numbers shrink-0">
                    <span className="text-sm font-black text-slate-950 dark:text-white">
                      {formatCurrencyValue(currentMarketPrice, currentAsset.currency, dec, locale)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        !pctInfo.isNegative ? 'text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10' : 'text-[#DC2626] dark:text-rose-400 bg-[#FEE2E2] dark:bg-rose-500/10'
                      }`}
                    >
                      {pctInfo.text}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Timeframes & Dual Conversion */}
            <div className="flex items-center justify-between text-[10px] font-mono-numbers">
              <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#060c18] p-0.5 rounded border border-[#E2E8F0] dark:border-slate-800">
                {(['1m', '5m', '15m', '1h', '1D'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartInterval(tf)}
                    className={`px-2 py-0.5 rounded transition cursor-pointer ${
                      chartInterval === tf ? 'bg-white dark:bg-slate-800 text-[#003399] dark:text-emerald-400 font-black shadow-sm dark:shadow-none' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="text-[9px] text-[#006B52] dark:text-emerald-400/90 font-semibold dark:font-medium truncate max-w-[170px]">
                ≈ {dualAssetDisplay.secondaryFormatted} | {dualAssetDisplay.tertiaryFormatted}
              </div>
            </div>
          </div>

          {/* 100% Width Main Chart Container (Smartphones & Tablets) */}
          <div className="w-full h-[320px] sm:h-[380px] shrink-0 relative bg-white dark:bg-[#060c18] border-b border-[#E2E8F0] dark:border-slate-800 p-1.5 overflow-hidden flex flex-col">
            <svg className="w-full h-full flex-1" viewBox="0 0 700 280" preserveAspectRatio="none">
              <defs>
                <linearGradient id="vol-grad-mob" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={dtUpHex} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={dtUpHex} stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1="0" y1="50" x2="700" y2="50" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />
              <line x1="0" y1="100" x2="700" y2="100" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />
              <line x1="0" y1="150" x2="700" y2="150" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />
              <line x1="0" y1="200" x2="700" y2="200" stroke={dtGridStroke} strokeDasharray="3 3" opacity={isLight ? '0.9' : '0.4'} />

              {/* Candlesticks & Volume */}
              {Array.from({ length: 35 }).map((_, i) => {
                const x = 12 + i * 19.4;
                const isUp = i % 2 === 0 || i % 5 === 0;
                const open = 115 + Math.sin(i * 0.35) * 45;
                const close = isUp ? open - 18 : open + 16;
                const high = Math.min(open, close) - 12;
                const low = Math.max(open, close) + 12;
                const color = isUp ? dtUpHex : dtDownHex;
                const volHeight = Math.abs(Math.sin(i * 0.5)) * 38 + 8;

                return (
                  <g key={i}>
                    {showVolume && (
                      <rect
                        x={x}
                        y={275 - volHeight}
                        width="8.5"
                        height={volHeight}
                        fill={color}
                        opacity="0.35"
                        rx="0.5"
                      />
                    )}
                    <line x1={x + 4.2} y1={high} x2={x + 4.2} y2={low} stroke={color} strokeWidth="1.2" />
                    <rect
                      x={x}
                      y={Math.min(open, close)}
                      width="8.5"
                      height={Math.max(3, Math.abs(close - open))}
                      fill={color}
                      rx="0.5"
                    />
                  </g>
                );
              })}

              {/* Indicator Lines */}
              {showMA9 && (
                <path d="M 12 118 Q 180 85, 360 98 T 685 92" fill="none" stroke={dtMa9Hex} strokeWidth="1.8" opacity="0.95" />
              )}
              {showMA21 && (
                <path d="M 12 126 Q 200 100, 380 112 T 685 106" fill="none" stroke="#C084FC" strokeWidth="1.8" opacity="0.9" />
              )}
              {showMA200 && (
                <path d="M 12 142 Q 220 130, 420 128 T 685 120" fill="none" stroke={dtMa200Hex} strokeWidth="2.2" opacity="0.85" />
              )}
              {showVWAP && (
                <path d="M 12 112 Q 170 92, 340 104 T 685 98" fill="none" stroke="#E879F9" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.85" />
              )}

              {/* Position Overlay Line */}
              {positions.length > 0 && (
                <g>
                  <line x1="0" y1="95" x2="700" y2="95" stroke={isLight ? '#003399' : '#3B82F6'} strokeWidth="1.5" strokeDasharray="5 3" />
                  <text x="8" y="90" fill={isLight ? '#003399' : '#60A5FA'} fontSize="10" fontWeight="bold">
                    {tDt.avgPriceOverlay} ({positions[0].side === 'BUY' ? tDt.sideBuy : tDt.sideSell}): {formatCurrencyValue(positions[0].entryPrice, currentAsset.currency, 2, locale)}
                  </text>
                </g>
              )}
            </svg>

            {/* Overlaid Badges */}
            <div className="absolute top-2 left-2 flex items-center gap-1 text-[8px] font-mono-numbers">
              {showMA9 && <span className="text-[#003399] dark:text-sky-400 bg-[#E6EEFF]/95 dark:bg-sky-950/80 px-1 py-0.2 rounded border border-[#003399]/30 dark:border-sky-500/30 font-semibold">MA9</span>}
              {showMA21 && <span className="text-purple-800 dark:text-purple-400 bg-purple-100/95 dark:bg-purple-950/80 px-1 py-0.2 rounded border border-purple-400/40 dark:border-purple-500/30 font-semibold">MA21</span>}
              {showMA200 && <span className="text-[#B45309] dark:text-amber-400 bg-[#FEF7E0]/95 dark:bg-amber-950/80 px-1 py-0.2 rounded border border-[#E5A910]/40 dark:border-amber-500/30 font-semibold">MA200</span>}
              {showVWAP && <span className="text-fuchsia-800 dark:text-fuchsia-400 bg-fuchsia-100/95 dark:bg-fuchsia-950/80 px-1 py-0.2 rounded border border-fuchsia-400/40 dark:border-fuchsia-500/30 font-semibold">VWAP</span>}
            </div>
          </div>

          {/* Mobile Module Navigation (Abas / Accordion Header) */}
          <div className="bg-white dark:bg-[#09111e] border-b border-[#E2E8F0] dark:border-slate-800 px-2.5 py-2 flex items-center justify-between gap-2 shrink-0 sticky top-0 z-20 shadow-md">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-xs font-bold">
              <button
                type="button"
                onClick={() => { setMobileBottomSection('boleta'); setIsMobilePanelCollapsed(false); }}
                data-on-dark={mobileBottomSection === 'boleta' && !isMobilePanelCollapsed ? 'true' : undefined}
                className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  mobileBottomSection === 'boleta' && !isMobilePanelCollapsed
                    ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                    : 'bg-[#F1F5F9] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <SlidersHorizontal className={`w-3.5 h-3.5 ${mobileBottomSection === 'boleta' && !isMobilePanelCollapsed ? 'text-white' : 'text-[#009B77] dark:text-emerald-400'}`} />
                <span>{tDt.mobileTabs.ticket}</span>
              </button>

              <button
                type="button"
                onClick={() => { setMobileBottomSection('mercado'); setIsMobilePanelCollapsed(false); }}
                data-on-dark={mobileBottomSection === 'mercado' && !isMobilePanelCollapsed ? 'true' : undefined}
                className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  mobileBottomSection === 'mercado' && !isMobilePanelCollapsed
                    ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                    : 'bg-[#F1F5F9] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Globe className={`w-3.5 h-3.5 ${mobileBottomSection === 'mercado' && !isMobilePanelCollapsed ? 'text-white' : 'text-[#009B77] dark:text-emerald-400'}`} />
                <span>{tDt.mobileTabs.market}</span>
              </button>

              <button
                type="button"
                onClick={() => { setMobileBottomSection('book'); setIsMobilePanelCollapsed(false); }}
                data-on-dark={mobileBottomSection === 'book' && !isMobilePanelCollapsed ? 'true' : undefined}
                className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  mobileBottomSection === 'book' && !isMobilePanelCollapsed
                    ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                    : 'bg-[#F1F5F9] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${mobileBottomSection === 'book' && !isMobilePanelCollapsed ? 'text-white' : 'text-[#009B77] dark:text-emerald-400'}`} />
                <span>{tDt.mobileTabs.bookDom}</span>
              </button>

              <button
                type="button"
                onClick={() => { setMobileBottomSection('tape'); setIsMobilePanelCollapsed(false); }}
                data-on-dark={mobileBottomSection === 'tape' && !isMobilePanelCollapsed ? 'true' : undefined}
                className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  mobileBottomSection === 'tape' && !isMobilePanelCollapsed
                    ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                    : 'bg-[#F1F5F9] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Activity className={`w-3.5 h-3.5 ${mobileBottomSection === 'tape' && !isMobilePanelCollapsed ? 'text-white' : 'text-[#009B77] dark:text-emerald-400'}`} />
                <span>{tDt.mobileTabs.tape}</span>
              </button>

              <button
                type="button"
                onClick={() => { setMobileBottomSection('posicoes'); setIsMobilePanelCollapsed(false); }}
                data-on-dark={mobileBottomSection === 'posicoes' && !isMobilePanelCollapsed ? 'true' : undefined}
                className={`px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
                  mobileBottomSection === 'posicoes' && !isMobilePanelCollapsed
                    ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                    : 'bg-[#F1F5F9] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Briefcase className={`w-3.5 h-3.5 ${mobileBottomSection === 'posicoes' && !isMobilePanelCollapsed ? 'text-white' : 'text-[#009B77] dark:text-emerald-400'}`} />
                <span>{tDt.mobileTabs.positions} ({positions.length})</span>
              </button>
            </div>

            {/* Accordion Collapse/Expand Button */}
            <button
              type="button"
              onClick={() => setIsMobilePanelCollapsed(!isMobilePanelCollapsed)}
              className="p-1 rounded bg-[#F1F5F9] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white shrink-0 cursor-pointer"
              title={isMobilePanelCollapsed ? tDt.expandPanelTitle : tDt.collapsePanelTitle}
            >
              {isMobilePanelCollapsed ? <ChevronDown className="w-4 h-4 text-[#009B77] dark:text-emerald-400" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Panel Content Body (When Not Collapsed) */}
          {!isMobilePanelCollapsed && (
            <div className="p-3 bg-[#F4F7F9] dark:bg-[#060c18] flex-1">
              {/* 1. BOLETA DE EXECUÇÃO */}
              {mobileBottomSection === 'boleta' && (
                <div className="space-y-3 bg-white dark:bg-[#09111e] p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                      <SlidersHorizontal className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
                      {tDt.quickTicketTitle} • {currentAsset.symbol}
                    </span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono-numbers">
                      Spread: {currentAsset.symbol.includes('WIN') ? '5 pts' : '0.5 pt'}
                    </span>
                  </div>

                  {/* Compra / Venda Tabs */}
                  <div className="grid grid-cols-2 gap-1.5 bg-[#F1F5F9] dark:bg-[#060c18] p-1 rounded-lg border border-[#E2E8F0] dark:border-slate-800 text-xs font-black">
                    <button
                      type="button"
                      onClick={() => setOrderTicketTab('BUY')}
                      data-on-dark={orderTicketTab === 'BUY' ? 'true' : undefined}
                      className={`py-2 rounded-md transition cursor-pointer flex items-center justify-center gap-1 ${
                        orderTicketTab === 'BUY'
                          ? 'bg-[#009B77] dark:bg-emerald-600 text-white shadow'
                          : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" /> {tDt.ticketBuyTab}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderTicketTab('SELL')}
                      data-on-dark={orderTicketTab === 'SELL' ? 'true' : undefined}
                      className={`py-2 rounded-md transition cursor-pointer flex items-center justify-center gap-1 ${
                        orderTicketTab === 'SELL'
                          ? 'bg-[#DC2626] dark:bg-rose-600 text-white shadow'
                          : 'text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      <ArrowDownRight className="w-4 h-4" /> {tDt.ticketSellTab}
                    </button>
                  </div>

                  {/* Mercado / Limitada Tabs */}
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setOrderType('MARKET')}
                      data-on-dark={orderType === 'MARKET' ? 'true' : undefined}
                      className={`py-1.5 rounded-lg border transition cursor-pointer ${
                        orderType === 'MARKET'
                          ? 'bg-[#003399] dark:bg-slate-800 border-[#003399] dark:border-slate-700 text-white'
                          : 'bg-[#F8FAFC] dark:bg-[#060c18] border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {tDt.marketOrderBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('LIMIT')}
                      data-on-dark={orderType === 'LIMIT' ? 'true' : undefined}
                      className={`py-1.5 rounded-lg border transition cursor-pointer ${
                        orderType === 'LIMIT'
                          ? 'bg-[#003399] dark:bg-slate-800 border-[#003399] dark:border-slate-700 text-white'
                          : 'bg-[#F8FAFC] dark:bg-[#060c18] border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                      }`}
                    >
                      {tDt.limitOrderBtn}
                    </button>
                  </div>

                  {/* Contratos */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                      <span>{tDt.contractsQtyLabel}</span>
                      <span className="font-mono-numbers text-slate-900 dark:text-white font-bold">{contracts}x</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={contracts}
                        onChange={(e) => setContracts(Math.max(1, Number(e.target.value)))}
                        className="w-20 bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-900 dark:text-white font-mono-numbers text-sm font-bold outline-none text-center"
                      />
                      <div className="flex-1 grid grid-cols-5 gap-1">
                        {[1, 5, 10, 25, 50].map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => setContracts(q)}
                            className={`py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                              contracts === q
                                ? 'bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border-[#009B77]/50 dark:border-emerald-500/40'
                                : 'bg-[#F1F5F9] dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Limit Price if selected */}
                  {orderType === 'LIMIT' && (
                    <div className="space-y-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">{tDt.limitPriceLabel}</span>
                      <input
                        type="number"
                        step={currentAsset.symbol.includes('WIN') ? 5 : 0.5}
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(Number(e.target.value))}
                        className="w-full bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono-numbers text-sm font-bold outline-none"
                      />
                    </div>
                  )}

                  {/* Stop Loss & Take Profit */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-[#F8FAFC] dark:bg-[#060c18] p-2 rounded-lg border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
                      <label className="text-[#DC2626] dark:text-rose-400 font-bold flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useStopLoss}
                          onChange={(e) => setUseStopLoss(e.target.checked)}
                          className="accent-rose-500 cursor-pointer"
                        />
                        <span>SL</span>
                      </label>
                      {useStopLoss && (
                        <input
                          type="number"
                          value={stopLossOffset}
                          onChange={(e) => setStopLossOffset(Number(e.target.value))}
                          className="w-16 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded px-1.5 py-0.5 text-slate-900 dark:text-white font-mono-numbers text-right text-xs"
                        />
                      )}
                    </div>

                    <div className="bg-[#F8FAFC] dark:bg-[#060c18] p-2 rounded-lg border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
                      <label className="text-[#006B52] dark:text-emerald-400 font-bold flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useTakeProfit}
                          onChange={(e) => setUseTakeProfit(e.target.checked)}
                          className="accent-emerald-500 cursor-pointer"
                        />
                        <span>TP</span>
                      </label>
                      {useTakeProfit && (
                        <input
                          type="number"
                          value={takeProfitOffset}
                          onChange={(e) => setTakeProfitOffset(Number(e.target.value))}
                          className="w-16 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 rounded px-1.5 py-0.5 text-slate-900 dark:text-white font-mono-numbers text-right text-xs"
                        />
                      )}
                    </div>
                  </div>

                  {/* Big Execution Button */}
                  {orderTicketTab === 'BUY' ? (
                    <button
                      type="button"
                      onClick={() => handleExecuteOrder('BUY')}
                      data-on-dark="true"
                      className="w-full py-3 rounded-xl bg-[#009B77] hover:bg-[#008263] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider transition cursor-pointer flex flex-col items-center justify-center shadow-lg active:scale-98"
                    >
                      <div className="flex items-center gap-1.5">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>{tDt.buyActionVerb} {contracts}x {currentAsset.symbol}</span>
                      </div>
                      <span className="text-[11px] font-mono-numbers opacity-90">
                        {formatCurrencyValue(currentMarketPrice, currentAsset.currency, 2, locale)}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleExecuteOrder('SELL')}
                      data-on-dark="true"
                      className="w-full py-3 rounded-xl bg-[#DC2626] hover:bg-red-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-black text-sm uppercase tracking-wider transition cursor-pointer flex flex-col items-center justify-center shadow-lg active:scale-98"
                    >
                      <div className="flex items-center gap-1.5">
                        <ArrowDownRight className="w-4 h-4" />
                        <span>{tDt.sellActionVerb} {contracts}x {currentAsset.symbol}</span>
                      </div>
                      <span className="text-[11px] font-mono-numbers opacity-90">
                        {formatCurrencyValue(currentMarketPrice, currentAsset.currency, 2, locale)}
                      </span>
                    </button>
                  )}

                  {/* Zerar & Inverter Emergency Controls */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCloseAllPositions()}
                      className="py-2.5 px-3 rounded-lg bg-[#E5A910] hover:bg-[#D99B00] dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wide transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>{tDt.flattenAllBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReversePosition}
                      className="py-2.5 px-3 rounded-lg bg-[#F1F5F9] hover:bg-[#E2E8F0] dark:bg-slate-800 dark:hover:bg-slate-700 border border-[#CBD5E1] dark:border-slate-700 text-slate-900 dark:text-slate-200 font-bold text-xs uppercase tracking-wide transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>{tDt.reverseBtn}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. MERCADO EM TEMPO REAL */}
              {mobileBottomSection === 'mercado' && (
                <div className="space-y-2 bg-white dark:bg-[#09111e] p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
                      {tDt.realTimeMarketTitle}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-numbers">{filteredMarketWatch.length} {tDt.assetsCountSuffix}</span>
                  </div>

                  {/* Categories */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold">
                    {marketWatchCategories.map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => setMarketWatchCategory(cat.key)}
                        data-on-dark={marketWatchCategory === cat.key ? 'true' : undefined}
                        className={`px-2.5 py-1 rounded-lg transition cursor-pointer shrink-0 ${
                          marketWatchCategory === cat.key
                            ? 'bg-[#009B77] dark:bg-emerald-600 text-white font-bold'
                            : 'bg-[#F1F5F9] dark:bg-[#060c18] text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-[#CBD5E1] dark:border-slate-800'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={tDt.filterAssetsMobilePlaceholder}
                      value={marketWatchSearch}
                      onChange={(e) => setMarketWatchSearch(e.target.value)}
                      className="w-full bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none"
                    />
                  </div>

                  {/* Asset List */}
                  <div className="space-y-1 max-h-[360px] overflow-y-auto no-scrollbar font-mono-numbers text-xs">
                    {filteredMarketWatch.map((item) => {
                      const isSelected = item.symbol === selectedSymbol;
                      const pctInfo = formatSignedPercentChange(item.change24h, 2);
                      const dec = getAssetPriceDecimals(item.price, item.currency, item.category);
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            setSelectedSymbol(item.symbol);
                            setMobileBottomSection('boleta');
                          }}
                          className={`flex items-center justify-between px-2.5 py-2 rounded-lg transition cursor-pointer border ${
                            isSelected
                              ? 'bg-[#E3F7F2] dark:bg-emerald-950/60 border-[#009B77]/50 dark:border-emerald-500/50'
                              : 'bg-[#F8FAFC] dark:bg-[#060c18] border-[#E2E8F0] dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block text-xs">{item.symbol}</span>
                            <span className="text-[10px] text-slate-600 dark:text-slate-400">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-900 dark:text-white text-xs block">
                              {formatCurrencyValue(item.price, item.currency, dec, locale)}
                            </span>
                            <span className={`text-[10px] font-bold ${!pctInfo.isNegative ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                              {pctInfo.text}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. BOOK DE OFERTAS (DOM) */}
              {mobileBottomSection === 'book' && (
                <div className="space-y-2 bg-white dark:bg-[#09111e] p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
                      {tDt.tabs.book} (DOM) • {currentAsset.symbol}
                    </span>
                    <span className="text-[10px] font-mono-numbers text-slate-600 dark:text-slate-400">
                      {tDt.priceShort} <strong className="text-slate-900 dark:text-white">{formatCurrencyValue(currentMarketPrice, currentAsset.currency, 2, locale)}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 py-1 px-2 text-[10px] font-bold text-slate-600 dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 uppercase">
                    <span>{tDt.bidMobile}</span>
                    <span className="text-center">{tDt.colCurrent}</span>
                    <span className="text-right">{tDt.askMobile}</span>
                  </div>

                  <div className="space-y-1 font-mono-numbers text-xs">
                    {bookOffers.slice(0, 10).map((row, idx) => (
                      <div key={idx} className="grid grid-cols-3 items-center py-1 px-2 rounded bg-[#F8FAFC] dark:bg-[#060c18] border border-[#E2E8F0] dark:border-slate-800/60 relative overflow-hidden">
                        {/* Bid depth bar */}
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-[#009B77]/15 dark:bg-emerald-500/15 pointer-events-none"
                          style={{ width: `${Math.min(100, row.bidVolPct * 1.5)}%` }}
                        />
                        {/* Ask depth bar */}
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-[#DC2626]/15 dark:bg-rose-500/15 pointer-events-none"
                          style={{ width: `${Math.min(100, row.askVolPct * 1.5)}%` }}
                        />

                        <span className="text-[#006B52] dark:text-emerald-400 font-bold z-10">{row.bidQty}</span>
                        <span className="text-center font-bold text-slate-900 dark:text-white z-10">
                          {formatCurrencyValue(row.price, currentAsset.currency, 2, locale)}
                        </span>
                        <span className="text-right text-[#DC2626] dark:text-rose-400 font-bold z-10">{row.askQty}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. TAPE READING */}
              {mobileBottomSection === 'tape' && (
                <div className="space-y-2 bg-white dark:bg-[#09111e] p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
                      Tape Reading (Times & Trades) • {currentAsset.symbol}
                    </span>
                    <span className="text-[10px] font-mono-numbers text-[#006B52] dark:text-emerald-400 font-bold">
                      {tDt.liveFlowTag}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 py-1 px-2 text-[10px] font-bold text-slate-600 dark:text-slate-400 border-b border-[#E2E8F0] dark:border-slate-800 uppercase">
                    <span>{tDt.colTime}</span>
                    <span>{tDt.priceShort.replace(':', '')}</span>
                    <span className="text-center">{tDt.colQty}</span>
                    <span className="text-right">{tDt.aggressorCol}</span>
                  </div>

                  <div className="space-y-1 max-h-[340px] overflow-y-auto no-scrollbar font-mono-numbers text-xs">
                    {timesAndTrades.map((t) => (
                      <div
                        key={t.id}
                        className={`grid grid-cols-4 py-1 px-2 rounded items-center ${
                          t.aggressor === 'BUY' ? 'bg-[#E3F7F2]/70 dark:bg-emerald-950/30 text-[#006B52] dark:text-emerald-300' : 'bg-[#FEE2E2]/70 dark:bg-rose-950/30 text-[#DC2626] dark:text-rose-300'
                        }`}
                      >
                        <span className="text-slate-600 dark:text-slate-400 text-[10px]">{t.time}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{formatCurrencyValue(t.price, currentAsset.currency, 2, locale)}</span>
                        <span className="text-center font-bold">{t.qty}</span>
                        <span className="text-right font-black">{t.aggressor === 'BUY' ? tDt.sideBuy : tDt.sideSell}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. MINHAS POSIÇÕES */}
              {mobileBottomSection === 'posicoes' && (
                <div className="space-y-2 bg-white dark:bg-[#09111e] p-3 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm dark:shadow-none">
                  <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-wider flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
                      {tDt.myPositions} ({positions.length})
                    </span>
                    {positions.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleCloseAllPositions()}
                        className="px-2 py-0.5 rounded bg-[#FEF7E0] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border border-[#E5A910]/50 dark:border-amber-500/40 text-[10px] font-bold cursor-pointer"
                      >
                        {tDt.closeAllShort}
                      </button>
                    )}
                  </div>

                  {positions.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      {tDt.noOpenPositionsMobile}
                    </div>
                  ) : (
                    <div className="space-y-2 font-mono-numbers text-xs">
                      {positions.map((pos) => {
                        const isWin = pos.symbol.includes('WIN');
                        const isWdo = pos.symbol.includes('WDO');
                        const diff = pos.side === 'BUY' ? currentMarketPrice - pos.entryPrice : pos.entryPrice - currentMarketPrice;
                        const pnlBrl = isWin ? diff * 0.2 * pos.contracts : isWdo ? diff * 10 * pos.contracts : diff * pos.contracts;

                        return (
                          <div key={pos.id} className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#060c18] border border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-900 dark:text-white text-xs">{pos.symbol}</span>
                                <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${pos.side === 'BUY' ? 'text-[#006B52] dark:text-emerald-400 bg-[#E3F7F2] dark:bg-emerald-500/10' : 'text-[#DC2626] dark:text-rose-400 bg-[#FEE2E2] dark:bg-rose-500/10'}`}>
                                  {pos.side === 'BUY' ? tDt.sideBuy : tDt.sideSell}
                                </span>
                                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold">{pos.contracts}x</span>
                              </div>
                              <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
                                {tDt.entryShort} {pos.entryPrice} | {tDt.currentShort} {currentMarketPrice}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`block font-black text-xs ${pnlBrl >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                                {pnlBrl >= 0 ? '+' : ''}{pnlBrl.toLocaleString(locale, { style: 'currency', currency: 'BRL' })}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleClosePosition(pos.id)}
                                className="text-[9px] text-[#DC2626] dark:text-rose-400 hover:underline font-bold mt-0.5 cursor-pointer"
                              >
                                {tDt.closePositionMobile}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          3. FIXED INSTITUTIONAL BOTTOM STATUS BAR (Connection: Estável)
         ========================================================================= */}
      <footer className="bg-white dark:bg-[#050a14] border-t border-[#E2E8F0] dark:border-slate-800/90 px-3 py-1 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 shrink-0 font-mono-numbers select-none">
        {/* Left: Connection Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#009B77] dark:bg-emerald-400 animate-pulse" />
            <strong className="text-[#006B52] dark:text-emerald-400 font-sans font-bold">{tDt.connectionStable}</strong>
          </div>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span className="text-slate-600 dark:text-slate-400 hidden sm:inline">{tDt.feedFooter}</span>
          <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-600 dark:text-slate-400 hidden md:inline">{tDt.latencyFooter}</span>
        </div>

        {/* Center: System Clock */}
        <div className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <span>DinhEuro Engine Pro v3.2</span>
        </div>

        {/* Right: Security & Compliance Indicator */}
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <ShieldCheck className="w-3 h-3 text-[#009B77] dark:text-emerald-400" />
            {tDt.e2eEncryption}
          </span>
          <span className="text-slate-400 dark:text-slate-600">|</span>
          <span className="text-slate-500 hidden sm:inline">{tDt.lgpdAudited}</span>
        </div>
      </footer>

      {/* =========================================================================
          MODALS: RISK SETTINGS, ALERTS, HELP
         ========================================================================= */}

      {showRiskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0b1322] border border-[#CBD5E1] dark:border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-3 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#009B77] dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{tDt.riskModalTitle}</h3>
              </div>
              <button onClick={() => setShowRiskModal(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="text-slate-700 dark:text-slate-400 block mb-1 font-medium">{tDt.gainGoalLabel}</label>
                <input
                  type="number"
                  value={dailyProfitGoal}
                  onChange={(e) => setDailyProfitGoal(Number(e.target.value))}
                  className="w-full bg-[#F8FAFC] dark:bg-[#070e1b] border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono-numbers text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-400 block mb-1 font-medium">{tDt.dailyStopLossLabel}</label>
                <input
                  type="number"
                  value={dailyLossLimit}
                  onChange={(e) => setDailyLossLimit(Number(e.target.value))}
                  className="w-full bg-[#F8FAFC] dark:bg-[#070e1b] border border-[#CBD5E1] dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono-numbers text-sm font-bold"
                />
              </div>

              {isRiskLocked && (
                <div className="p-2.5 rounded-xl bg-[#FEE2E2] dark:bg-rose-500/20 border border-[#DC2626]/40 dark:border-rose-500/40 text-[#DC2626] dark:text-rose-300 text-xs flex items-center justify-between">
                  <span>{tDt.riskLockTriggered}</span>
                  <button
                    onClick={() => setIsRiskLocked(false)}
                    data-on-dark="true"
                    className="px-2 py-1 rounded bg-[#DC2626] dark:bg-rose-600 text-white font-bold cursor-pointer"
                  >
                    {tDt.unlockBtn}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
              <button
                onClick={() => setShowRiskModal(false)}
                data-on-dark="true"
                className="px-3 py-1.5 rounded-lg bg-[#009B77] hover:bg-[#008263] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                {tDt.saveParamsBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0b1322] border border-[#CBD5E1] dark:border-slate-700 rounded-2xl max-w-sm w-full p-5 space-y-3 shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#D99B00] dark:text-amber-400" />
                <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs">{tDt.alertModalTitle}</h3>
              </div>
              <button onClick={() => setShowAlertModal(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-400">{tDt.alertModalDescPrefix} {currentAsset.symbol} {tDt.alertModalDescSuffix}</p>
            <input
              type="number"
              defaultValue={currentMarketPrice}
              className="w-full bg-[#F8FAFC] dark:bg-[#070e1b] border border-[#CBD5E1] dark:border-slate-700 rounded px-3 py-1.5 text-slate-900 dark:text-white font-mono-numbers font-bold"
            />
            <button
              onClick={() => {
                setShowAlertModal(false);
                setOrderNotification(`${tDt.notifications.alertConfiguredPrefix} ${currentAsset.symbol} ${tDt.notifications.alertConfiguredSuffix}`);
                setTimeout(() => setOrderNotification(null), 3000);
              }}
              data-on-dark="true"
              className="w-full py-2 rounded bg-[#009B77] hover:bg-[#008263] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold cursor-pointer"
            >
              {tDt.createAlertBtn}
            </button>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0b1322] border border-[#CBD5E1] dark:border-slate-700 rounded-2xl max-w-md w-full p-5 space-y-3 shadow-2xl text-left text-xs">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#009B77] dark:text-emerald-400" />
                <h3 className="font-bold text-slate-900 dark:text-white uppercase text-xs">{tDt.helpModalTitle}</h3>
              </div>
              <button onClick={() => setShowHelpModal(false)} className="text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <div className="flex justify-between p-1.5 bg-[#F8FAFC] dark:bg-slate-900 rounded border border-[#E2E8F0] dark:border-transparent">
                <span>{tDt.shortcutBuyMarket}</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-transparent rounded font-mono text-[#006B52] dark:text-emerald-400 font-bold">Shift + B</kbd>
              </div>
              <div className="flex justify-between p-1.5 bg-[#F8FAFC] dark:bg-slate-900 rounded border border-[#E2E8F0] dark:border-transparent">
                <span>{tDt.shortcutSellMarket}</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-transparent rounded font-mono text-[#DC2626] dark:text-rose-400 font-bold">Shift + S</kbd>
              </div>
              <div className="flex justify-between p-1.5 bg-[#F8FAFC] dark:bg-slate-900 rounded border border-[#E2E8F0] dark:border-transparent">
                <span>{tDt.shortcutFlattenNow}</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-transparent rounded font-mono text-[#B45309] dark:text-amber-400 font-bold">{tDt.shortcutSpaceEsc}</kbd>
              </div>
              <div className="flex justify-between p-1.5 bg-[#F8FAFC] dark:bg-slate-900 rounded border border-[#E2E8F0] dark:border-transparent">
                <span>{tDt.shortcutReverse}</span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-transparent rounded font-mono text-[#003399] dark:text-sky-400 font-bold">Shift + R</kbd>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-1.5 rounded bg-[#F1F5F9] hover:bg-[#E2E8F0] dark:bg-slate-800 dark:hover:bg-slate-700 border border-[#CBD5E1] dark:border-transparent text-slate-900 dark:text-slate-200 font-bold cursor-pointer"
            >
              {tDt.closeBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
