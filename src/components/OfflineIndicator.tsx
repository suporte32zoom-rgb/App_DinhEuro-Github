import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const OfflineIndicator: React.FC = () => {
  const { t } = useI18n();
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-[#FEF7E0]/95 dark:bg-amber-500/90 text-[#002266] dark:text-slate-950 font-semibold px-3 py-2 text-xs shadow-xl backdrop-blur-md border border-[#E5A910]">
      <WifiOff className="w-4 h-4 animate-pulse text-[#D99B00] dark:text-slate-950" />
      <span>{t.offline.banner}</span>
    </div>
  );
};
