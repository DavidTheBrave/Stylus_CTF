import React, { useState } from 'react';
import { ChallengeCard } from './components/ChallengeCard';
import { Leaderboard } from './components/Leaderboard';
import { challenges } from './data/challenges';
import { Challenge, User } from './types';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Code2, Trophy, Users, Terminal } from 'lucide-react';

function App() {
  const [currentChallenges, setCurrentChallenges] = useState<Challenge[]>(
    challenges.map(c => ({ ...c, solved: false }))
  );
  const [users] = useState<User[]>([
    {
      id: '1',
      username: 'StylusHacker.eth',
      points: 750,
      address: 0x1642E89656E65e8Af7e5ae0623Dc8e59815f8fB3,
      solvedChallenges: ['1', '2'],
      rank: 1
    },
    {
      id: '2',
      username: 'BlockchainNinja.eth',
      points: 362,
      address: 0xc4f6d861947b55bab34bd197616527c85C43aBEf,
      solvedChallenges: ['1'],
      rank: 2
    }
  ]);

  const handleSolveChallenge = (id: string) => {
    setCurrentChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id ? { ...challenge, solved: true } : challenge
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Terminal className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">Stylus CTF</span>
            </div>
            <div className="flex items-center space-x-4">
            <a href="https://practice.example.com" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Practice
              </a>
              <a href="https://challenge.example.com" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Challenge
              </a>
              <a href="https://scoreboard.example.com" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Scoreboard
              </a>
              <a href="https://classroom.example.com" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Classroom
              </a>
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                <ConnectButton />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Code2 className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Challenges</h2>
            </div>
            
            <div className="grid gap-6">
              {currentChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onSolve={handleSolveChallenge}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Leaderboard users={users} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
