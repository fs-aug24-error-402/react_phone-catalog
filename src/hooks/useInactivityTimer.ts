import { useState, useEffect, useRef, useCallback } from 'react';

export const useInactivityTimer = (
  inactivityDelay: number,
  onInactivity: () => void,
) => {
  const [isIdle, setIsIdle] = useState(false);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    inactivityTimer.current = setTimeout(() => {
      setIsIdle(true);
      onInactivity();
    }, inactivityDelay);
  }, [inactivityDelay, onInactivity]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }

      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer]);

  return isIdle;
};
