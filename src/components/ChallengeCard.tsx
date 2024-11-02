import React from 'react';
import { Code2, Trophy, AlertCircle } from 'lucide-react';
import { Challenge } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface Props {
  challenge: Challenge;
  onSolve: (id: string) => void;
}

export const ChallengeCard: React.FC<Props> = ({ challenge, onSolve }) => {
  const difficultyColor = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-500'
  }[challenge.difficulty];

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`${difficultyColor} text-sm font-medium`}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{challenge.points}</span>
        </div>
      </div>
      
      <p className="text-gray-300 mb-4">{challenge.description}</p>
      
      {challenge.code && (
        <div className="mb-4 rounded-md overflow-hidden">
          <SyntaxHighlighter 
            language="rust"
            style={vs2015}
            customStyle={{
              padding: '1rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem'
            }}
          >
            {challenge.code}
          </SyntaxHighlighter>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-medium">{challenge.category}</span>
        </div>
        
        <button
          onClick={() => onSolve(challenge.id)}
          className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
            challenge.solved
              ? 'bg-green-600 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          disabled={challenge.solved}
        >
          {challenge.solved ? 'Solved!' : 'Submit Solution'}
        </button>
      </div>
    </div>
  );
};