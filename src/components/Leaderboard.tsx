import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { User } from '../types';

interface Props {
  users: User[];
}

export const Leaderboard: React.FC<Props> = ({ users }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
      </div>

      <div className="space-y-4">
        {sortedUsers.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-gray-400">#{index + 1}</span>
              <div>
                <p className="text-white font-medium">{user.username}</p>
                <p className="text-sm text-gray-400">
                  {user.solvedChallenges.length} challenges solved
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Medal className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold">{user.points}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};