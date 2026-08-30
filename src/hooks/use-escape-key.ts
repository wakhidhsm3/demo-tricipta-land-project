import { useEffect } from 'react';

/**
 * Custom hook to listen for the Escape key and trigger a callback when active.
 */
export function useEscapeKey(handler: () => void, isActive = true): void {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handler, isActive]);
}
