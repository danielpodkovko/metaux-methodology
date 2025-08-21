'use client';

import { useState } from 'react';

interface RankingMechanicProps {
  items: string[];
  onSubmit: (ranking: number[], reasoning?: string) => void;
  isSubmitting: boolean;
}

export default function RankingMechanic({ items, onSubmit, isSubmitting }: RankingMechanicProps) {
  const [ranking, setRanking] = useState<string[]>(items);
  const [reasoning, setReasoning] = useState('');

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newRanking = [...ranking];
      [newRanking[index - 1], newRanking[index]] = [newRanking[index], newRanking[index - 1]];
      setRanking(newRanking);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < ranking.length - 1) {
      const newRanking = [...ranking];
      [newRanking[index], newRanking[index + 1]] = [newRanking[index + 1], newRanking[index]];
      setRanking(newRanking);
    }
  };

  const handleSubmit = () => {
    const rankingIndices = ranking.map(item => items.indexOf(item));
    onSubmit(rankingIndices, reasoning || undefined);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Rank these items by quality (best to worst):</h3>
      
      <div className="space-y-2">
        {ranking.map((item, index) => (
          <div key={item} className="flex items-center space-x-2 p-3 bg-gray-50 rounded">
            <span className="font-semibold text-gray-600 w-6">{index + 1}.</span>
            <span className="flex-1">{item}</span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
              >
                ↑
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === ranking.length - 1}
                className="p-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Explain your ranking (optional):
        </label>
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Why did you rank them this way?"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Ranking'}
      </button>
    </div>
  );
}