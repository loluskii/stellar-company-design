import { useState, useEffect } from 'react';
import { setupOfflineListener } from '@/utils/serviceWorker';

export interface OfflineData {
  [key: string]: any;
}

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);
  const [offlineData, setOfflineData] = useState<OfflineData>({});

  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);

    // Setup listener for online/offline events
    const cleanup = setupOfflineListener(setIsOffline);

    return cleanup;
  }, []);

  // Store data for offline use
  const storeOfflineData = (key: string, data: any) => {
    const newData = { ...offlineData, [key]: data };
    setOfflineData(newData);
    
    // Also store in localStorage for persistence
    try {
      localStorage.setItem('offlineData', JSON.stringify(newData));
    } catch (error) {
      console.warn('Failed to store offline data:', error);
    }
  };

  // Retrieve offline data
  const getOfflineData = (key: string) => {
    return offlineData[key];
  };

  // Load offline data from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('offlineData');
      if (stored) {
        const parsed = JSON.parse(stored);
        setOfflineData(parsed);
      }
    } catch (error) {
      console.warn('Failed to load offline data:', error);
    }
  }, []);

  // Clear offline data
  const clearOfflineData = () => {
    setOfflineData({});
    try {
      localStorage.removeItem('offlineData');
    } catch (error) {
      console.warn('Failed to clear offline data:', error);
    }
  };

  return {
    isOffline,
    offlineData,
    storeOfflineData,
    getOfflineData,
    clearOfflineData,
  };
}
