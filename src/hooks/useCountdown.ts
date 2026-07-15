import { useState, useEffect, useRef } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateCountdown = (targetDate: Date | string): CountdownValues => {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  let diff = target - now;

  if (diff < 0) {
    diff = 0;
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

export const useCountdown = (targetDate: Date | string): CountdownValues => {
  const [countdown, setCountdown] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCountdown(calculateCountdown(targetDate));

    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return countdown;
};
