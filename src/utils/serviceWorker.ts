export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // onupdatefound will be called if there's a new service worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // At this point, the updated precached content has been fetched,
                  // but the previous service worker will still serve the older
                  // content until all client tabs are closed.
                  console.log(
                    'New content is available and will be used when all ' +
                      'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
                  );

                  // Optional: Show a notification to the user
                  if (confirm('New version available! Reload to update?')) {
                    window.location.reload();
                  }
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Check if the app is running offline
export function isOffline(): boolean {
  return !navigator.onLine;
}

// Listen for online/offline events
export function setupOfflineListener(callback: (isOffline: boolean) => void) {
  const updateOnlineStatus = () => {
    callback(!navigator.onLine);
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  // Return cleanup function
  return () => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  };
}
