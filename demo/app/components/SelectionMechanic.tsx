'use client';

import { useState } from 'react';

interface SelectionMechanicProps {
  onSubmit: (selection: 'high' | 'medium' | 'low', reasoning?: string) => void;
  isSubmitting: boolean;
}

export default function SelectionMechanic({ onSubmit, isSubmitting }: SelectionMechanicProps) {
  const [selection, setSelection] = useState<'high' | 'medium' | 'low' | null>(null);
  const [reasoning, setReasoning] = useState('');

  const handleSubmit = () => {
    if (selection) {
      onSubmit(selection, reasoning || undefined);
    }
  };

  return (
    <div>
      <h3 className="text-sm text-gray-500 uppercase tracking-wider mb-4">Select Your Assessment</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          onClick={() => setSelection('high')}
          className={`p-4 bg-white border-2 rounded-xl cursor-pointer transition-all ${
            selection === 'high' 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="font-medium text-gray-900 mb-1">High Quality</div>
          <div className="text-sm text-gray-600">Rigorous methodology, reliable data</div>
        </div>

        <div
          onClick={() => setSelection('medium')}
          className={`p-4 bg-white border-2 rounded-xl cursor-pointer transition-all ${
            selection === 'medium' 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="font-medium text-gray-900 mb-1">Medium Quality</div>
          <div className="text-sm text-gray-600">Some limitations but usable</div>
        </div>

        <div
          onClick={() => setSelection('low')}
          className={`p-4 bg-white border-2 rounded-xl cursor-pointer transition-all ${
            selection === 'low' 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="font-medium text-gray-900 mb-1">Low Quality</div>
          <div className="text-sm text-gray-600">Significant flaws, unreliable</div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why? (optional but recommended):
        </label>
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Explain your reasoning..."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selection || isSubmitting}
        className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Response'}
      </button>
    </div>
  );
}