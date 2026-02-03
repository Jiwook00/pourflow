import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(totalTime: number) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const totalTimeRef = useRef(totalTime);
  totalTimeRef.current = totalTime;

  const start = useCallback(() => {
    accumulatedRef.current = 0;
    elapsedRef.current = 0;
    setElapsedTime(0);
    setIsComplete(false);
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    accumulatedRef.current = elapsedRef.current;
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    accumulatedRef.current = 0;
    elapsedRef.current = 0;
    setElapsedTime(0);
    setIsRunning(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (!isRunning || isComplete) return;

    startTimeRef.current = Date.now();
    const intervalId = setInterval(() => {
      const elapsed =
        accumulatedRef.current + (Date.now() - startTimeRef.current) / 1000;

      if (elapsed >= totalTimeRef.current) {
        elapsedRef.current = totalTimeRef.current;
        setElapsedTime(totalTimeRef.current);
        setIsComplete(true);
        setIsRunning(false);
        return;
      }

      elapsedRef.current = elapsed;
      setElapsedTime(elapsed);
    }, 100);

    return () => clearInterval(intervalId);
  }, [isRunning, isComplete]);

  return { elapsedTime, isRunning, isComplete, start, pause, resume, reset };
}
