'use client';

import { useState } from 'react';

interface AnalysisMechanicProps {
  onSubmit: (analysis: string) => void;
  isSubmitting: boolean;
}

export default function AnalysisMechanic({ onSubmit, isSubmitting }: AnalysisMechanicProps) {
  const [analysis, setAnalysis] = useState('');

  const handleSubmit = () => {
    if (analysis.trim()) {
      onSubmit(analysis);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Analyze the quality of this research:</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Provide your analysis:
        </label>
        <textarea
          value={analysis}
          onChange={(e) => setAnalysis(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
          placeholder="Identify quality issues, strengths, and provide your overall assessment..."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!analysis.trim() || isSubmitting}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Analysis'}
      </button>
    </div>
  );
}