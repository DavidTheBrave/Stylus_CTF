import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface Props {
  timeLimit: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<Props> = ({ timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center space-x-2 text-cyan-400">
      <Clock className="w-4 h-4" />
      <span>{`${minutes}:${seconds.toString().padStart(2, '0')}`}</span>
    </div>
  );
};