import React, { useState, useEffect, useCallback } from 'react';

export default function DealTimer({ endTime }) {
  // Store the target time in a ref so it doesn't change on re-renders
  const targetTime = React.useRef(
    endTime
      ? new Date(endTime)
      : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000 + 34 * 60 * 1000 + 56 * 1000)
  );

  const calculateTimeLeft = useCallback(() => {
    const difference = targetTime.current - new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const TimeBox = ({ value, label }) => (
    <div className="bg-gray-800 text-white px-4 py-3 rounded-lg text-center shadow-md min-w-[60px]">
      <div className="text-2xl font-bold font-mono">{String(value).padStart(2, '0')}</div>
      <div className="text-xs uppercase tracking-widest mt-1">{label}</div>
    </div>
  );

  return (
    <div className="flex gap-3 items-center">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hrs" />
      <TimeBox value={timeLeft.minutes} label="Min" />
      <TimeBox value={timeLeft.seconds} label="Sec" />
    </div>
  );
}