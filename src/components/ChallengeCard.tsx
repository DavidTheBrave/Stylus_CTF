import React, { useState, useEffect } from 'react';
import { Code2, Trophy, AlertCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Challenge } from '../types';
import Editor from "@monaco-editor/react";
import { Timer } from './Timer';

interface Props {
  challenge: Challenge;
  onSolve: (id: string, timeBonus: number) => void;
}

export const ChallengeCard: React.FC<Props> = ({ challenge, onSolve }) => {
  const [code, setCode] = useState(challenge.template || '');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (challenge.template) {
      setStartTime(Date.now());
    }
  }, [challenge.template]);

  const difficultyColor = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-500'
  }[challenge.difficulty];
  
  const handleSubmit = () => {
      // Remove all whitespace (including tabs) from the code
      const cleanCodeString = (str) => {
        return str
          .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Remove comments
          .replace(/\s+/g, '') // Remove all whitespace
          .replace(/;/g, ''); // Remove semicolons
      };
    
      // Clean the solution and split into parts
      const cleanSolution = cleanCodeString(challenge.solution);
      const requiredParts = cleanSolution.split(/(?=[a-zA-Z])/);
    
      // Clean the submitted code
      const cleanCode = cleanCodeString(code);
    
      // Check if all required parts are present in the code
      const isCorrect = requiredParts.every(part => 
        cleanCode.includes(part)
      );

    if (isCorrect) {
      const timeSpent = startTime ? (Date.now() - startTime) / 1000 : 0;
      const timeBonus = challenge.timeLimit && timeSpent < challenge.timeLimit 
        ? Math.floor((challenge.bonusPoints || 0) * (1 - timeSpent / challenge.timeLimit))
        : 0;
      
      setFeedback({ 
        type: 'success', 
        message: `Great job! ${timeBonus ? `Time bonus: +${timeBonus} points!` : ''}`
      });
      onSolve(challenge.id, timeBonus);
    } else {
      setFeedback({ type: 'error', message: 'Not quite right. Try again!' });
    }
};

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
        <div className="flex items-center space-x-2">
          <span className={`${difficultyColor} text-sm font-medium`}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{challenge.points}</span>
          {challenge.bonusPoints && (
            <span className="text-cyan-400 text-sm">+{challenge.bonusPoints} bonus</span>
          )}
        </div>
      </div>
      
      <p className="text-gray-300 mb-4">{challenge.description}</p>
      
      {challenge.template && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            {challenge.timeLimit && (
              <Timer 
                timeLimit={challenge.timeLimit} 
                onTimeUp={() => setFeedback({ type: 'error', message: 'Time\'s up!' })}
              />
            )}
          </div>

          <div className="h-[300px] rounded-md overflow-hidden mb-4 border border-gray-700">
            <Editor
              height="100%"
              defaultLanguage="rust"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {feedback && (
            <div className={`flex items-center space-x-2 mb-4 ${
              feedback.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={challenge.solved}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              challenge.solved
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {challenge.solved ? 'Completed!' : 'Submit Solution'}
          </button>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-medium">{challenge.category}</span>
        </div>
        
        {challenge.hint && (
          <button
            className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
            onClick={() => alert(challenge.hint)}
          >
            <AlertCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};