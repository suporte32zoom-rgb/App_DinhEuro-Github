/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { MarketProvider, TAB_ROUTE_MAP, useMarket } from './context/MarketContext';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { getPublishedArticleBySlug } from './data/newsArticleDirectory';
import {
  syncArticleHeadMetadata,
  syncRouteHeadMetadata,
  trackAnalyticsPageView,
} from './utils/seo';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { Footer } from './components/Footer';
import { AssetDetailModal } from './components/AssetDetailModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ErrorBoundary } from './components/ErrorBoundary';

import { DashboardView } from './views/DashboardView';
import { MarketsView } from './views/MarketsView';
import { PortfolioView } from './views/PortfolioView';
import { FxRemittanceGuideView } from './views/FxRemittanceGuideView';
import { MonetaryPolicyView } from './views/MonetaryPolicyView';
import { FixedIncomeDerivativesView } from './views/FixedIncomeDerivativesView';
import { NewsView } from './views/NewsView';
import { NewsArticleDetailView } from './views/NewsArticleDetailView';
import { BrokersView } from './views/BrokersView';
import { AdvancedChartsView } from './views/AdvancedChartsView';
import { ToolsView } from './views/ToolsView';
import { AcademyView } from './views/AcademyView';
import { AboutView } from './views/AboutView';
import { TermsOfUseView } from './views/TermsOfUseView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { CookiePolicyView } from './views/CookiePolicyView';
import { DisclaimerView } from './views/DisclaimerView';
import { LgpdConsentBanner } from './components/LgpdConsentBanner';

const MainContent: React.FC = () => {
  const { activeTab, activeArticleSlug } = useMarket();

  return (
    <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-5 sm:pt-6 flex-1 w-full">
      <ErrorBoundary>
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'mercados' && <MarketsView />}
        {activeTab === 'carteiras' && <PortfolioView />}
        {activeTab === 'guia_cambio' && <FxRemittanceGuideView />}
        {activeTab === 'politica_monetaria' && <MonetaryPolicyView />}
        {activeTab === 'renda_fixa' && <FixedIncomeDerivativesView />}
        {activeTab === 'noticias' &&
          (activeArticleSlug ? (
            <NewsArticleDetailView slug={activeArticleSlug} />
          ) : (
            <NewsView />
          ))}
        {activeTab === 'corretoras' && <BrokersView />}
        {activeTab === 'graficos' && <AdvancedChartsView />}
        {activeTab === 'ferramentas' && <ToolsView />}
        {activeTab === 'academy' && <AcademyView />}
        {activeTab === 'sobre' && <AboutView />}
        {activeTab === 'termos' && <TermsOfUseView />}
        {activeTab === 'privacidade' && <PrivacyPolicyView />}
        {activeTab === 'cookies' && <CookiePolicyView />}
        {activeTab === 'disclaimer' && <DisclaimerView />}
      </ErrorBoundary>
    </main>
  );
};

const AppShell: React.FC = () => {
  const { theme, activeTab, activeArticleSlug } = useMarket();
  const { lang } = useI18n();

  const lastTrackedRouteRef = useRef<string | null>(null);

  useEffect(() => {
    const activeArticle =
      activeTab === 'noticias' && activeArticleSlug
        ? getPublishedArticleBySlug(activeArticleSlug)
        : null;

    const seoMeta = activeArticle
      ? syncArticleHeadMetadata(activeArticle, lang)
      : syncRouteHeadMetadata(activeTab, lang);
    const routePath = activeArticle
      ? `/noticias/${activeArticle.id}`
      : TAB_ROUTE_MAP[activeTab] || '/';

    if (lastTrackedRouteRef.current === null) {
      lastTrackedRouteRef.current = routePath;
      return;
    }
    if (lastTrackedRouteRef.current !== routePath) {
      lastTrackedRouteRef.current = routePath;
      trackAnalyticsPageView(routePath, seoMeta.title, seoMeta.canonicalUrl);
    }
  }, [activeTab, activeArticleSlug, lang]);

  // Quando o React montar a interface no DOM com sucesso, dissolve o splash screen suavemente
  useEffect(() => {
    const splash = document.getElementById('dinheuro-splash');
    if (splash) {
      splash.style.transition = 'opacity 0.3s ease-out';
      splash.style.opacity = '0';
      const timer = setTimeout(() => {
        if (splash && splash.parentElement) {
          splash.parentElement.removeChild(splash);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-[#0B1320] text-slate-100' : 'bg-[#F8FAFC] text-[#0F172A]'
      } flex flex-col font-sans selection:bg-[#003399] selection:text-white transition-colors duration-150`}
    >
      {/* Real-time Top Marquee Ribbon */}
      <ErrorBoundary>
        <TickerTape />
      </ErrorBoundary>

      {/* Global Responsive Navigation Header */}
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>

      {/* Dynamic Route View */}
      <MainContent />

      {/* Interactive Asset Detail & Candlestick Modal */}
      <ErrorBoundary>
        <AssetDetailModal />
      </ErrorBoundary>

      {/* PWA Offline Mode Indicator */}
      <OfflineIndicator />

      {/* Institutional Footer */}
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>

      {/* LGPD & Cookie Consent Persistent Banner */}
      <ErrorBoundary>
        <LgpdConsentBanner />
      </ErrorBoundary>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <I18nProvider>
        <MarketProvider>
          <AppShell />
        </MarketProvider>
      </I18nProvider>
    </ErrorBoundary>
  );
}
