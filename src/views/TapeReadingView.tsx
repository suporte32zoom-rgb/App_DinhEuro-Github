import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Activity,
  Filter,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  Flame,
  ChevronDown,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { getDualCurrencyDisplay } from '../utils/finance';
import { useI18n } from '../i18n/I18nContext';
import { getNumberLocale } from '../i18n/translations';
import { TRADING_TRANSLATIONS } from '../i18n/tradingTranslations';

interface TapeReadingAsset {
  symbol: string;
  name: string;
  type: string;
  tickSize: number;
  basePrice: number;
  unit: string;
}

const TAPE_ASSETS: TapeReadingAsset[] = [
  { symbol: 'WIN$', name: 'Mini Índice B3 (Futuro)', type: 'Futuros B3', tickSize: 5, basePrice: 171670, unit: 'pts' },
  { symbol: 'WDO$', name: 'Mini Dólar B3 (Futuro)', type: 'Futuros B3', tickSize: 0.5, basePrice: 5500.0, unit: 'pts' },
  { symbol: 'PETR4', name: 'Petrobras PN', type: 'Ação B3', tickSize: 0.01, basePrice: 38.65, unit: 'R$' },
  { symbol: 'VALE3', name: 'Vale ON', type: 'Ação B3', tickSize: 0.01, basePrice: 62.40, unit: 'R$' },
  { symbol: 'BTC/USD', name: 'Bitcoin Perpétuo', type: 'Cripto', tickSize: 1, basePrice: 89500, unit: '$' },
  { symbol: 'ETH/USD', name: 'Ethereum Perpétuo', type: 'Cripto', tickSize: 0.1, basePrice: 2650.0, unit: '$' },
];

const BROKERS_LIST = [
  'UBS',
  'Morgan Stanley',
  'BTG Pactual',
  'XP Investimentos',
  'Itaú BBA',
  'Bradesco',
  'Goldman Sachs',
  'Merrill Lynch',
  'Genial',
  'Santander',
  'Clear',
];

interface DomLevel {
  price: number;
  bidQty: number;
  bidOrders: number;
  askQty: number;
  askOrders: number;
  bidVolPct: number;
  askVolPct: number;
  isPoc?: boolean;
}

interface TapeItem {
  id: string;
  time: string;
  price: number;
  qty: number;
  buyerBroker: string;
  sellerBroker: string;
  aggressor: 'BUY' | 'SELL';
  isLargeTrade: boolean;
}

interface BrokerPosition {
  broker: string;
  netQty: number;
  buyQty: number;
  sellQty: number;
  avgPrice: number;
  volPercent: number;
}

export const TapeReadingView: React.FC = () => {
  const { universalRates, assets } = useMarket();
  const { lang } = useI18n();
  const locale = getNumberLocale(lang);
  const tTape = TRADING_TRANSLATIONS[lang].tapeReading;

  // Dynamic assets matching real-time market quotes
  const dynamicTapeAssets = useMemo(() => {
    const ibov = assets.find((a) => a.symbol === 'IBOVESPA');
    const usdBrl = assets.find((a) => a.symbol === 'USD/BRL');
    const petr4 = assets.find((a) => a.symbol === 'PETR4');
    const vale3 = assets.find((a) => a.symbol === 'VALE3');
    const btc = assets.find((a) => a.symbol === 'BTC');
    const eth = assets.find((a) => a.symbol === 'ETH');

    return TAPE_ASSETS.map((item) => {
      if (item.symbol === 'WIN$' && ibov) {
        return { ...item, basePrice: Math.round(ibov.price / 5) * 5 };
      }
      if (item.symbol === 'WDO$' && usdBrl) {
        return { ...item, basePrice: Number((usdBrl.price * 1000).toFixed(1)) };
      }
      if (item.symbol === 'PETR4' && petr4) {
        return { ...item, basePrice: petr4.price };
      }
      if (item.symbol === 'VALE3' && vale3) {
        return { ...item, basePrice: vale3.price };
      }
      if (item.symbol === 'BTC/USD' && btc) {
        return { ...item, basePrice: btc.price };
      }
      if (item.symbol === 'ETH/USD' && eth) {
        return { ...item, basePrice: eth.price };
      }
      return item;
    });
  }, [assets]);

  // Selected active asset
  const [selectedAsset, setSelectedAsset] = useState<TapeReadingAsset>(TAPE_ASSETS[0]);
  const [currentPrice, setCurrentPrice] = useState<number>(selectedAsset.basePrice);

  // Sync selectedAsset when dynamic base price updates
  useEffect(() => {
    const matched = dynamicTapeAssets.find((a) => a.symbol === selectedAsset.symbol);
    if (matched && matched.basePrice !== selectedAsset.basePrice) {
      setSelectedAsset(matched);
      setCurrentPrice(matched.basePrice);
    }
  }, [dynamicTapeAssets, selectedAsset.symbol, selectedAsset.basePrice]);

  // Streaming control
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [audioFeedback, setAudioFeedback] = useState<boolean>(false);
  const [minTradeFilter, setMinTradeFilter] = useState<number>(0);
  const [brokerFilter, setBrokerFilter] = useState<string>('ALL');

  // Tape and DOM state
  const [tapeData, setTapeData] = useState<TapeItem[]>([]);
  const [domLevels, setDomLevels] = useState<DomLevel[]>([]);
  const [cvdValue, setCvdValue] = useState<number>(1420);
  const [totalBuyVol, setTotalBuyVol] = useState<number>(45800);
  const [totalSellVol, setTotalSellVol] = useState<number>(39200);
  const [lastNotification, setLastNotification] = useState<string | null>(null);

  // Generate initial DOM levels centered on current price
  useEffect(() => {
    setCurrentPrice(selectedAsset.basePrice);
    const tick = selectedAsset.tickSize;
    const center = selectedAsset.basePrice;
    const levelsCount = 14;

    const newDom: DomLevel[] = [];
    let maxVol = 1;

    for (let i = levelsCount; i >= -levelsCount; i--) {
      const price = Number((center + i * tick).toFixed(selectedAsset.tickSize < 1 ? 2 : 0));
      const isAsk = i > 0;
      const isBid = i < 0;
      const isCurrent = i === 0;

      const bidBase = isBid ? Math.floor(Math.random() * 450 + 40) : (isCurrent ? Math.floor(Math.random() * 80 + 10) : 0);
      const askBase = isAsk ? Math.floor(Math.random() * 450 + 40) : (isCurrent ? Math.floor(Math.random() * 80 + 10) : 0);

      const bidQty = bidBase;
      const askQty = askBase;
      if (bidQty > maxVol) maxVol = bidQty;
      if (askQty > maxVol) maxVol = askQty;

      newDom.push({
        price,
        bidQty,
        bidOrders: bidQty > 0 ? Math.max(1, Math.floor(bidQty / 15)) : 0,
        askQty,
        askOrders: askQty > 0 ? Math.max(1, Math.floor(askQty / 15)) : 0,
        bidVolPct: 0,
        askVolPct: 0,
        isPoc: i === -2,
      });
    }

    const calculatedDom = newDom.map((item) => ({
      ...item,
      bidVolPct: Math.min(100, Math.round((item.bidQty / maxVol) * 100)),
      askVolPct: Math.min(100, Math.round((item.askQty / maxVol) * 100)),
    }));

    setDomLevels(calculatedDom);

    // Initial trades
    const initialTrades: TapeItem[] = [];
    const now = Date.now();
    for (let j = 0; j < 30; j++) {
      const isBuy = Math.random() > 0.48;
      const qty = Math.random() > 0.82 ? Math.floor(Math.random() * 80 + 45) : Math.floor(Math.random() * 20 + 1);
      const bBroker = BROKERS_LIST[Math.floor(Math.random() * BROKERS_LIST.length)];
      let sBroker = BROKERS_LIST[Math.floor(Math.random() * BROKERS_LIST.length)];
      if (sBroker === bBroker) sBroker = 'BTG Pactual';

      const tradeTime = new Date(now - j * 800);
      const timeStr = tradeTime.toLocaleTimeString(locale, { hour12: false }) + '.' + String(tradeTime.getMilliseconds()).padStart(3, '0');

      initialTrades.push({
        id: 'trade-' + j + '-' + now,
        time: timeStr,
        price: Number((center + (Math.random() - 0.5) * tick * 2).toFixed(selectedAsset.tickSize < 1 ? 2 : 0)),
        qty,
        buyerBroker: bBroker,
        sellerBroker: sBroker,
        aggressor: isBuy ? 'BUY' : 'SELL',
        isLargeTrade: qty >= 45,
      });
    }
    setTapeData(initialTrades);
  }, [selectedAsset, locale]);

  // Real-time ticking stream
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = Math.max(200, Math.floor(800 / speedMultiplier));
    const interval = setInterval(() => {
      const isAggressorBuy = Math.random() > 0.47;
      const isLargeTrade = Math.random() > 0.85;
      const qty = isLargeTrade
        ? Math.floor(Math.random() * 110 + 50)
        : Math.floor(Math.random() * 25 + 1);

      const tick = selectedAsset.tickSize;
      const maxSpread = tick * 2;
      const rawDelta = currentPrice + (Math.random() > 0.55 ? tick : -tick) * (Math.random() > 0.7 ? 1 : 0) - selectedAsset.basePrice;
      const clampedDelta = Math.max(-maxSpread, Math.min(maxSpread, rawDelta));
      const newPrice = Number((selectedAsset.basePrice + clampedDelta).toFixed(selectedAsset.tickSize < 1 ? 2 : 0));
      setCurrentPrice(newPrice);

      const bBroker = BROKERS_LIST[Math.floor(Math.random() * BROKERS_LIST.length)];
      let sBroker = BROKERS_LIST[Math.floor(Math.random() * BROKERS_LIST.length)];
      if (sBroker === bBroker) sBroker = 'Goldman Sachs';

      const now = new Date();
      const timeStr =
        now.toLocaleTimeString(locale, { hour12: false }) +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0');

      const newTrade: TapeItem = {
        id: 'trade-' + Date.now() + '-' + Math.random(),
        time: timeStr,
        price: newPrice,
        qty,
        buyerBroker: bBroker,
        sellerBroker: sBroker,
        aggressor: isAggressorBuy ? 'BUY' : 'SELL',
        isLargeTrade,
      };

      setTapeData((prev) => [newTrade, ...prev.slice(0, 45)]);
      setCvdValue((prev) => prev + (isAggressorBuy ? qty : -qty));
      if (isAggressorBuy) {
        setTotalBuyVol((prev) => prev + qty);
      } else {
        setTotalSellVol((prev) => prev + qty);
      }

      setDomLevels((prevLevels) => {
        return prevLevels.map((lvl) => {
          if (Math.abs(lvl.price - newPrice) < tick * 0.1) {
            return {
              ...lvl,
              bidQty: isAggressorBuy ? Math.max(0, lvl.bidQty - Math.floor(qty * 0.3)) : lvl.bidQty + Math.floor(qty * 0.2),
              askQty: !isAggressorBuy ? Math.max(0, lvl.askQty - Math.floor(qty * 0.3)) : lvl.askQty + Math.floor(qty * 0.2),
            };
          }
          return lvl;
        });
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier, currentPrice, selectedAsset, locale]);

  // Filtered Tape trades
  const filteredTape = useMemo(() => {
    return tapeData.filter((item) => {
      if (minTradeFilter > 0 && item.qty < minTradeFilter) return false;
      if (brokerFilter !== 'ALL') {
        if (item.buyerBroker !== brokerFilter && item.sellerBroker !== brokerFilter) return false;
      }
      return true;
    });
  }, [tapeData, minTradeFilter, brokerFilter]);

  // Broker net position tracking
  const brokerRankings = useMemo<BrokerPosition[]>(() => {
    const map = new Map<string, { buy: number; sell: number; totalNotional: number }>();
    BROKERS_LIST.forEach((b) => map.set(b, { buy: 0, sell: 0, totalNotional: 0 }));

    tapeData.forEach((t) => {
      const bObj = map.get(t.buyerBroker);
      if (bObj) {
        bObj.buy += t.qty;
        bObj.totalNotional += t.qty * t.price;
      }
      const sObj = map.get(t.sellerBroker);
      if (sObj) {
        sObj.sell += t.qty;
        sObj.totalNotional += t.qty * t.price;
      }
    });

    const totalAllVol = tapeData.reduce((acc, curr) => acc + curr.qty, 0) || 1;
    const list: BrokerPosition[] = [];
    map.forEach((val, broker) => {
      const net = val.buy - val.sell;
      const totalBrokerVol = val.buy + val.sell;
      const avg = totalBrokerVol > 0 ? val.totalNotional / totalBrokerVol : currentPrice;
      list.push({
        broker,
        netQty: net,
        buyQty: val.buy,
        sellQty: val.sell,
        avgPrice: avg,
        volPercent: Math.min(100, Math.round((totalBrokerVol / totalAllVol) * 100)),
      });
    });

    return list.sort((a, b) => Math.abs(b.netQty) - Math.abs(a.netQty));
  }, [tapeData, currentPrice]);

  const totalVol = totalBuyVol + totalSellVol || 1;
  const buyRatio = Math.round((totalBuyVol / totalVol) * 100);
  const sellRatio = 100 - buyRatio;

  const formatPrice = (val: number) => {
    if (selectedAsset.tickSize < 1) {
      return val.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return val.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleDomClick = (price: number, side: 'BUY' | 'SELL') => {
    const action = side === 'BUY' ? tTape.buyLimitSent : tTape.sellLimitSent;
    setLastNotification(`${action} ${tTape.sentAtWord} ${formatPrice(price)} ${selectedAsset.unit}`);
    setTimeout(() => setLastNotification(null), 3000);
  };

  return (
    <div className="w-full flex flex-col h-full min-h-0 text-slate-900 dark:text-slate-100 select-none overflow-hidden pb-1">
      {/* =========================================================================
          1. TOP CONTROL & FLOW METRICS STRIP (ULTRA DENSE - 42px)
         ========================================================================= */}
      <div className="bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded-lg px-2.5 py-1 mb-1.5 flex items-center justify-between gap-2 flex-wrap shrink-0 shadow-sm dark:shadow-none">
        {/* Left: Asset Switcher & Live Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <select
              value={selectedAsset.symbol}
              onChange={(e) => {
                const found = dynamicTapeAssets.find((a) => a.symbol === e.target.value);
                if (found) setSelectedAsset(found);
              }}
              aria-label={tTape.selectAssetAria}
              className="bg-[#F8FAFC] dark:bg-[#0f1a2e] border border-[#CBD5E1] dark:border-slate-700 hover:border-[#009B77] dark:hover:border-emerald-500 rounded-md pl-2 pr-6 py-1 text-xs font-black text-slate-900 dark:text-white font-mono-numbers focus:outline-none cursor-pointer"
            >
              {dynamicTapeAssets.map((a) => (
                <option key={a.symbol} value={a.symbol}>
                  {a.symbol} • {tTape.assetOverrides[a.symbol]?.name || a.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Quick asset tags */}
          <div className="hidden xl:flex items-center gap-1">
            {dynamicTapeAssets.map((a) => (
              <button
                key={a.symbol}
                onClick={() => setSelectedAsset(a)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer border ${
                  selectedAsset.symbol === a.symbol
                    ? 'bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border-[#009B77]/40 dark:border-emerald-500/50'
                    : 'bg-[#F1F5F9] dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border-[#CBD5E1] dark:border-slate-800'
                }`}
              >
                {a.symbol}
              </button>
            ))}
          </div>

          {/* Current Price & Dual Currency Display */}
          <div className="flex items-center gap-1.5 pl-1.5 border-l border-[#E2E8F0] dark:border-slate-800 font-mono-numbers">
            <span className="text-sm font-black text-slate-950 dark:text-white">
              {formatPrice(currentPrice)} {selectedAsset.unit}
            </span>
            <span className="text-[10px] text-[#006B52] dark:text-emerald-400 font-semibold dark:font-medium">
              (≈ {selectedAsset.unit === 'R$' || selectedAsset.symbol.includes('WIN') || selectedAsset.symbol.includes('WDO')
                ? getDualCurrencyDisplay(currentPrice, 'BRL', universalRates, false, locale).secondaryFormatted
                : getDualCurrencyDisplay(currentPrice, 'USD', universalRates, false, locale).secondaryFormatted})
            </span>
          </div>
        </div>

        {/* Center: Live Flow Metrics in Single Row */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono-numbers">
          {/* CVD */}
          <div className="bg-[#F8FAFC] dark:bg-[#060c18] border border-[#E2E8F0] dark:border-slate-800/90 rounded px-2 py-0.5 flex items-center gap-1.5">
            <span className="text-slate-600 dark:text-slate-500 text-[10px]">CVD:</span>
            <strong
              className={`font-bold flex items-center gap-0.5 ${
                cvdValue >= 0 ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'
              }`}
            >
              {cvdValue >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {cvdValue >= 0 ? '+' : ''}
              {cvdValue.toLocaleString(locale)} {tTape.lotsUnit}
            </strong>
          </div>

          {/* Aggression Ratio */}
          <div className="bg-[#F8FAFC] dark:bg-[#060c18] border border-[#E2E8F0] dark:border-slate-800/90 rounded px-2 py-0.5 flex items-center gap-2 min-w-[170px]">
            <span className="text-[#006B52] dark:text-emerald-400 font-bold text-[10px]">{tTape.buyLetter} {buyRatio}%</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 flex overflow-hidden">
              <div className="bg-[#009B77] dark:bg-emerald-500 h-full transition-all" style={{ width: `${buyRatio}%` }} />
              <div className="bg-[#DC2626] dark:bg-rose-500 h-full transition-all" style={{ width: `${sellRatio}%` }} />
            </div>
            <span className="text-[#DC2626] dark:text-rose-400 font-bold text-[10px]">{tTape.sellLetter} {sellRatio}%</span>
          </div>
        </div>

        {/* Right: Tape Streaming Controls & Filters */}
        <div className="flex items-center gap-1.5 text-xs">
          {/* Pause / Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
              isPlaying
                ? 'bg-[#FEF7E0] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border border-[#E5A910]/50 dark:border-amber-500/40'
                : 'bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border border-[#009B77]/50 dark:border-emerald-500/40'
            }`}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isPlaying ? tTape.pauseBtn : tTape.playBtn}</span>
          </button>

          {/* Speed */}
          <div className="flex items-center bg-[#F1F5F9] dark:bg-[#060c18] p-0.5 rounded border border-[#E2E8F0] dark:border-slate-800 text-[10px] font-bold">
            {[1, 2, 5].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-1.5 py-0.2 rounded transition cursor-pointer ${
                  speedMultiplier === s
                    ? 'bg-white dark:bg-slate-800 text-[#006B52] dark:text-emerald-400 shadow-sm dark:shadow-none'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Sound */}
          <button
            onClick={() => setAudioFeedback(!audioFeedback)}
            className={`p-1 rounded border transition cursor-pointer ${
              audioFeedback
                ? 'bg-[#E3F7F2] dark:bg-emerald-500/20 text-[#006B52] dark:text-emerald-300 border-[#009B77]/50 dark:border-emerald-500/40'
                : 'bg-[#F1F5F9] dark:bg-slate-900 text-slate-600 dark:text-slate-500 border-[#CBD5E1] dark:border-slate-800'
            }`}
          >
            {audioFeedback ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          </button>

          {/* Lot Filter */}
          <div className="hidden sm:flex items-center bg-[#F1F5F9] dark:bg-[#060c18] p-0.5 rounded border border-[#E2E8F0] dark:border-slate-800 text-[10px] font-bold">
            {[0, 10, 50].map((f) => (
              <button
                key={f}
                onClick={() => setMinTradeFilter(f)}
                data-on-dark={minTradeFilter === f ? 'true' : undefined}
                className={`px-1.5 py-0.2 rounded transition cursor-pointer ${
                  minTradeFilter === f
                    ? 'bg-[#003399] dark:bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {f === 0 ? tTape.allFilter : `≥${f}`}
              </button>
            ))}
          </div>

          {/* Broker Filter */}
          <select
            value={brokerFilter}
            onChange={(e) => setBrokerFilter(e.target.value)}
            aria-label={tTape.filterBrokerAria}
            className="bg-[#F8FAFC] dark:bg-[#060c18] border border-[#CBD5E1] dark:border-slate-800 text-slate-800 dark:text-slate-300 text-[10px] rounded px-1.5 py-0.5 outline-none font-semibold"
          >
            <option value="ALL">{tTape.allBrokersOption}</option>
            {BROKERS_LIST.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Floating Notification */}
      {lastNotification && (
        <div className="bg-[#E3F7F2] dark:bg-emerald-950/90 border border-[#009B77]/50 dark:border-emerald-500/60 text-[#006B52] dark:text-emerald-200 px-3 py-1 rounded text-xs flex items-center gap-1.5 shadow-lg mb-1 animate-in fade-in shrink-0">
          <Zap className="w-3 h-3 text-[#009B77] dark:text-emerald-400" />
          <span className="font-semibold">{lastNotification}</span>
        </div>
      )}

      {/* =========================================================================
          2. MAIN 3-COLUMN DESK GRID (NO SCROLL, FITS SCREEN)
         ========================================================================= */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-1.5 overflow-hidden">
        {/* =====================================================================
            COL 1: LIVRO DE PROFUNDIDADE (DOM LADDER) (4.5 Cols on Desktop)
           ===================================================================== */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col h-full min-h-0 bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded-lg p-1.5 overflow-hidden shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800/80 mb-1 shrink-0 text-xs">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#009B77] dark:text-emerald-400" />
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider">{tTape.domTitle}</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-numbers">{domLevels.length} {tTape.levelsUnit}</span>
          </div>

          {/* Columns Header */}
          <div className="grid grid-cols-12 text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase py-0.5 px-1 bg-[#F1F5F9] dark:bg-[#060c18] rounded mb-1 shrink-0">
            <div className="col-span-2 text-left pl-0.5">{tTape.colOrd}</div>
            <div className="col-span-3 text-right text-[#003399] dark:text-sky-400">{tTape.colBid}</div>
            <div className="col-span-2 text-center text-slate-900 dark:text-slate-200">{tTape.colPrice}</div>
            <div className="col-span-3 text-left text-[#DC2626] dark:text-rose-400 pl-1">{tTape.colAsk}</div>
            <div className="col-span-2 text-right pr-0.5">{tTape.colOrd}</div>
          </div>

          {/* DOM Ladder Rows (Ultra Dense) */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-0.5 text-[10px] font-mono-numbers">
            {domLevels.map((lvl) => {
              const isCurrent = Math.abs(lvl.price - currentPrice) < selectedAsset.tickSize * 0.1;
              return (
                <div
                  key={lvl.price}
                  onClick={() => handleDomClick(lvl.price, lvl.price <= currentPrice ? 'BUY' : 'SELL')}
                  className={`grid grid-cols-12 items-center py-0.5 px-0.5 rounded transition cursor-pointer select-none relative ${
                    isCurrent
                      ? 'bg-[#FEF7E0] dark:bg-amber-500/15 border border-[#E5A910]/60 dark:border-amber-500/40 text-[#B45309] dark:text-amber-300 font-bold'
                      : lvl.isPoc
                      ? 'bg-[#E6EEFF] dark:bg-indigo-950/40 border border-[#003399]/30 dark:border-indigo-700/30'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="col-span-2 text-[9px] text-slate-500 pl-0.5">
                    {lvl.bidOrders > 0 ? lvl.bidOrders : ''}
                  </div>

                  {/* Bid Volume Bar */}
                  <div className="col-span-3 text-right pr-1 relative">
                    {lvl.bidQty > 0 && (
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-[#003399]/15 dark:bg-sky-500/25 rounded"
                        style={{ width: `${lvl.bidVolPct}%` }}
                      />
                    )}
                    <span className="relative z-10 text-[#003399] dark:text-sky-300 font-bold">
                      {lvl.bidQty > 0 ? lvl.bidQty : ''}
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="col-span-2 text-center font-bold text-slate-900 dark:text-white">
                    {formatPrice(lvl.price)}
                    {lvl.isPoc && (
                      <span className="block text-[7px] uppercase tracking-widest text-[#003399] dark:text-indigo-400 font-sans font-black">
                        POC
                      </span>
                    )}
                  </div>

                  {/* Ask Volume Bar */}
                  <div className="col-span-3 text-left pl-1 relative">
                    {lvl.askQty > 0 && (
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-[#DC2626]/15 dark:bg-rose-500/25 rounded"
                        style={{ width: `${lvl.askVolPct}%` }}
                      />
                    )}
                    <span className="relative z-10 text-[#DC2626] dark:text-rose-300 font-bold">
                      {lvl.askQty > 0 ? lvl.askQty : ''}
                    </span>
                  </div>

                  <div className="col-span-2 text-[9px] text-slate-500 text-right pr-0.5">
                    {lvl.askOrders > 0 ? lvl.askOrders : ''}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-1.5 border-t border-[#E2E8F0] dark:border-slate-800/80 grid grid-cols-2 gap-1 shrink-0 text-[10px]">
            <button
              onClick={() => handleDomClick(currentPrice, 'BUY')}
              data-on-dark="true"
              className="py-1 rounded bg-[#009B77] hover:bg-[#008263] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold uppercase transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowUpRight className="w-3 h-3" /> {tTape.buyMarketBtn}
            </button>
            <button
              onClick={() => handleDomClick(currentPrice, 'SELL')}
              data-on-dark="true"
              className="py-1 rounded bg-[#DC2626] hover:bg-red-700 dark:bg-rose-600 dark:hover:bg-rose-500 text-white font-bold uppercase transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowDownRight className="w-3 h-3" /> {tTape.sellMarketBtn}
            </button>
          </div>
        </div>

        {/* =====================================================================
            COL 2: TIMES & TRADES (FITA DE NEGÓCIOS) (4.5 Cols on Desktop)
           ===================================================================== */}
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col h-full min-h-0 bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded-lg p-1.5 overflow-hidden shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800/80 mb-1 shrink-0 text-xs">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#003399] dark:text-sky-400" />
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider">{tTape.tapeTitle}</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono-numbers">{filteredTape.length} {tTape.tradesCountLabel}</span>
          </div>

          {/* Tape Header */}
          <div className="grid grid-cols-12 text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase py-0.5 px-1 bg-[#F1F5F9] dark:bg-[#060c18] rounded mb-1 shrink-0">
            <div className="col-span-3 text-left">{tTape.colTime}</div>
            <div className="col-span-3 text-center">{tTape.colPrice}</div>
            <div className="col-span-2 text-right">{tTape.colLot}</div>
            <div className="col-span-2 text-center text-[#003399] dark:text-sky-400">{tTape.colBuyer}</div>
            <div className="col-span-2 text-center text-[#DC2626] dark:text-rose-400">{tTape.colSeller}</div>
          </div>

          {/* Tape Rows */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-0.5 text-[10px] font-mono-numbers">
            {filteredTape.map((trade) => {
              const isBuy = trade.aggressor === 'BUY';
              return (
                <div
                  key={trade.id}
                  className={`grid grid-cols-12 items-center py-0.5 px-1 rounded transition border ${
                    trade.isLargeTrade
                      ? 'bg-[#FEF7E0] dark:bg-amber-500/15 border-[#E5A910]/50 dark:border-amber-500/40'
                      : isBuy
                      ? 'bg-[#E3F7F2]/60 dark:bg-emerald-950/20 border-[#009B77]/20 dark:border-emerald-900/20'
                      : 'bg-[#FEE2E2]/60 dark:bg-rose-950/20 border-[#DC2626]/20 dark:border-rose-900/20'
                  }`}
                >
                  <div className="col-span-3 text-[9px] text-slate-500 dark:text-slate-400 truncate">{trade.time}</div>
                  <div className={`col-span-3 text-center font-bold ${isBuy ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                    {formatPrice(trade.price)}
                  </div>
                  <div className="col-span-2 text-right font-bold text-slate-900 dark:text-white">
                    {trade.qty}
                    {trade.isLargeTrade && <span className="text-[7px] text-[#B45309] dark:text-amber-300 ml-0.5 font-sans font-bold">BIG</span>}
                  </div>
                  <div className="col-span-2 text-center text-[9px] text-slate-700 dark:text-slate-300 truncate px-0.5">
                    {trade.buyerBroker}
                  </div>
                  <div className="col-span-2 text-center text-[9px] text-slate-600 dark:text-slate-400 truncate px-0.5">
                    {trade.sellerBroker}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tape Legend Footer */}
          <div className="pt-1.5 border-t border-[#E2E8F0] dark:border-slate-800/80 flex items-center justify-between text-[9px] text-slate-600 dark:text-slate-400 shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#009B77] dark:bg-emerald-400"></span> {tTape.aggressorBuy}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] dark:bg-rose-400"></span> {tTape.aggressorSell}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D99B00] dark:bg-amber-400"></span> {tTape.bigLotLegend}
            </span>
          </div>
        </div>

        {/* =====================================================================
            COL 3: SALDO DE PLAYERS & MICROESTRUTURA (3 Cols on Desktop)
           ===================================================================== */}
        <div className="col-span-12 lg:col-span-4 flex flex-col h-full min-h-0 bg-white dark:bg-[#09111e] border border-[#E2E8F0] dark:border-slate-800 rounded-lg p-1.5 overflow-hidden shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between pb-1 border-b border-[#E2E8F0] dark:border-slate-800/80 mb-1 shrink-0 text-xs">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#D99B00] dark:text-amber-400" />
              <span className="font-bold text-slate-900 dark:text-white uppercase text-[11px] tracking-wider">{tTape.playersTitle}</span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">{tTape.institutionalTag}</span>
          </div>

          {/* Ranking Header */}
          <div className="grid grid-cols-12 text-[9px] font-bold text-slate-600 dark:text-slate-400 uppercase py-0.5 px-1 bg-[#F1F5F9] dark:bg-[#060c18] rounded mb-1 shrink-0">
            <div className="col-span-5 text-left">{tTape.colBroker}</div>
            <div className="col-span-4 text-right">{tTape.colNetBalance}</div>
            <div className="col-span-3 text-right">{tTape.colVolPct}</div>
          </div>

          {/* Broker Positioning List */}
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-1 text-[10px] font-mono-numbers">
            {brokerRankings.map((b) => {
              const isLong = b.netQty >= 0;
              return (
                <div key={b.broker} className="p-1 rounded bg-[#F8FAFC] dark:bg-[#060c18] border border-[#E2E8F0] dark:border-slate-800/70">
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-5 font-bold text-slate-900 dark:text-white truncate text-[10px]">{b.broker}</div>
                    <div className={`col-span-4 text-right font-bold ${isLong ? 'text-[#006B52] dark:text-emerald-400' : 'text-[#DC2626] dark:text-rose-400'}`}>
                      {isLong ? '+' : ''}
                      {b.netQty.toLocaleString(locale)}
                    </div>
                    <div className="col-span-3 text-right text-slate-600 dark:text-slate-400">{b.volPercent}%</div>
                  </div>
                  <div className="flex items-center gap-1 text-[8px] text-slate-500 dark:text-slate-400 pt-0.5">
                    <span className="text-[#006B52] dark:text-emerald-400 font-semibold">{b.buyQty} {tTape.buyLetter}</span>
                    <span className="text-slate-400 dark:text-slate-600">/</span>
                    <span className="text-[#DC2626] dark:text-rose-400 font-semibold">{b.sellQty} {tTape.sellLetter}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compact Educational Tips Dock at bottom */}
          <div className="pt-1.5 border-t border-[#E2E8F0] dark:border-slate-800/80 shrink-0 space-y-1 text-[9px] text-slate-600 dark:text-slate-400">
            <div className="bg-[#F8FAFC] dark:bg-[#060c18] p-1.5 rounded border border-[#E2E8F0] dark:border-slate-800/70">
              <span className="text-[#006B52] dark:text-emerald-400 font-bold block">{tTape.tip1Title}</span>
              <span>{tTape.tip1Desc}</span>
            </div>
            <div className="bg-[#F8FAFC] dark:bg-[#060c18] p-1.5 rounded border border-[#E2E8F0] dark:border-slate-800/70">
              <span className="text-[#B45309] dark:text-amber-400 font-bold block">{tTape.tip2Title}</span>
              <span>{tTape.tip2Desc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
