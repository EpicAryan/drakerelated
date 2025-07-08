// hooks/usePageExit.ts
import { trackEvent } from '@/lib/analytics';
import { useEffect } from 'react';


export const usePageExit = (roomName: string) => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackEvent('Page Exit', {
        room: roomName,
        exit_type: 'browser_close'
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        trackEvent('Page Exit', {
          room: roomName,
          exit_type: 'tab_switch'
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [roomName]);
};
