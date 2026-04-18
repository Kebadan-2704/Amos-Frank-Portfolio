import { lazy } from 'react';

// Wrapper for React.lazy that retries imports on failure (e.g. dropped network connection)
// This conforms to the Netflix/Enterprise standard for SPA routing robustness.
export const lazyWithRetry = (componentImport, retries = 3, interval = 1500) => {
  return lazy(() =>
    new Promise((resolve, reject) => {
      const attemptImport = (attemptsLeft) => {
        componentImport()
          .then(resolve)
          .catch((error) => {
            if (attemptsLeft === 0) {
              console.error('Failed to load lazy chunk after retries:', error);
              reject(error);
              return;
            }
            setTimeout(() => attemptImport(attemptsLeft - 1), interval);
          });
      };
      
      attemptImport(retries);
    })
  );
};
