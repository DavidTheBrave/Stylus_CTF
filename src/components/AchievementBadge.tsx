import React from 'react';
import { Achievement } from '../types';

interface Props {
  achievement: Achievement;
  unlocked: boolean;
}

export const AchievementBadge: React.FC<Props> = ({ achievement, unlocked }) => {
  return (
    <div className={`flex items-center space-x-2 p-3 rounded-lg ${
      unlocked ? 'bg-blue-900 text-blue-100' : 'bg-gray-800 text-gray-400'
    }`}>
      <span className="text-2xl">{achievement.icon}</span>
      <div>
        <h3 className="font-bold">{achievement.name}</h3>
        <p className="text-sm">{achievement.description}</p>
      </div>
    </div>
  );
};