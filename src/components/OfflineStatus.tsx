import { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { setupOfflineListener } from '@/utils/serviceWorker';

const OfflineStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);

    // Setup listener for online/offline events
    const cleanup = setupOfflineListener(setIsOffline);

    return cleanup;
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 bg-yellow-500 text-white px-4 py-2 flex items-center justify-center gap-2 text-sm font-medium">
      <WifiOff className="h-4 w-4" />
      <span>You're currently offline. Some features may be limited.</span>
    </div>
  );
};

export default OfflineStatus;
