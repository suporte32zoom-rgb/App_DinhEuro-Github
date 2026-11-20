import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useI18n } from '../i18n/I18nContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { t } = useI18n();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return (
      <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E3F7F2] dark:bg-emerald-500/10 border border-[#009B77]/30 dark:border-emerald-500/20 text-[#006B52] dark:text-emerald-400 text-xs font-medium">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>{t.pwa.installed}</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        data-on-dark="true"
        className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#003399] to-[#009B77] hover:from-[#002266] hover:to-[#006B52] dark:from-emerald-600 dark:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition active:scale-95 cursor-pointer flex-shrink-0"
        title={t.pwa.installTitle}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{t.pwa.installApp}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] dark:border-slate-700 bg-[#F4F7F9] dark:bg-slate-800/80 hover:bg-[#E6EEFF] dark:hover:bg-slate-700 px-2.5 py-1.5 text-xs font-medium text-[#003399] dark:text-slate-200 transition flex-shrink-0 cursor-pointer"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#D99B00] dark:text-amber-400" />
          <span>{t.pwa.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/60 dark:bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-[#FFFFFF] dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-700 p-6 shadow-2xl text-[#0F172A] dark:text-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="DinhEuro Logo" className="w-8 h-8 rounded-full border border-amber-400/30" />
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-white">{t.pwa.modalTitle}</h3>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="text-[#475569] dark:text-slate-400 hover:text-[#003399] dark:hover:text-white p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#1E293B] dark:text-slate-300 leading-relaxed space-y-2">
                {t.pwa.iosStep1Prefix}<strong>{t.pwa.iosStep1Action}</strong>{t.pwa.iosStep1Suffix}<br /><br />
                {t.pwa.iosStep2Prefix}<strong>{t.pwa.iosStep2Action}</strong>.<br /><br />
                {t.pwa.iosStep3Prefix}<strong>{t.pwa.iosStep3Action}</strong>{t.pwa.iosStep3Suffix}
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                data-on-dark="true"
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#003399] to-[#009B77] hover:from-[#002266] hover:to-[#006B52] dark:from-emerald-600 dark:to-teal-600 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
              >
                {t.pwa.understood}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback direct install button for other platforms / browsers
  return (
    <button
      onClick={() => {
        alert(t.pwa.fallbackAlert);
      }}
      className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] dark:border-slate-700/80 bg-[#F4F7F9] dark:bg-slate-800/60 hover:bg-[#E6EEFF] dark:hover:bg-slate-700/80 px-2.5 py-1.5 text-xs font-medium text-[#003399] dark:text-slate-300 hover:text-[#002266] dark:hover:text-white transition flex-shrink-0 cursor-pointer"
      title={t.pwa.fallbackPromptTitle}
    >
      <Download className="w-3.5 h-3.5 text-[#D99B00] dark:text-amber-400" />
      <span>{t.pwa.installApp}</span>
    </button>
  );
};
