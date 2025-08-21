'use client';

import { useState } from 'react';
import { ScenarioConfig } from '@/app/lib/schemas/config';

interface ConfigSelectorProps {
  onGenerate: (config: ScenarioConfig) => void;
  isLoading: boolean;
}

export default function ConfigSelector({ onGenerate, isLoading }: ConfigSelectorProps) {
  const [industryContext, setIndustryContext] = useState<'fintech' | 'healthcare' | 'ecommerce'>('fintech');
  const [companyStage, setCompanyStage] = useState<'startup' | 'scaleup' | 'enterprise'>('startup');
  const [timePressure, setTimePressure] = useState<'low' | 'moderate' | 'high'>('high');
  const [exerciseType, setExerciseType] = useState<'selection' | 'ranking' | 'analysis'>('selection');

  const handleGenerate = () => {
    const config: ScenarioConfig = {
      scenario_id: `demo_${Date.now()}`,
      competency: {
        macro: 'quality_recognition',
        micro: 'data_quality_assessment',
        difficulty: 'moderate'
      },
      universal_variables: {
        industry_context: industryContext,
        company_stage: companyStage,
        time_pressure: timePressure
      },
      exercise_type: exerciseType,
      learning_goal: `Recognize quality issues in ${industryContext} ${companyStage} context with ${timePressure} pressure`
    };

    onGenerate(config);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Pattern Recognition Training</h2>
      <p className="text-gray-600 mb-8">Configure your training scenario to practice quality recognition patterns</p>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry Context:
          </label>
          <select
            value={industryContext}
            onChange={(e) => setIndustryContext(e.target.value as 'fintech' | 'healthcare' | 'ecommerce')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="fintech">Fintech</option>
            <option value="healthcare">Healthcare</option>
            <option value="ecommerce">E-commerce</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Stage:
          </label>
          <select
            value={companyStage}
            onChange={(e) => setCompanyStage(e.target.value as 'startup' | 'scaleup' | 'enterprise')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="startup">Startup</option>
            <option value="scaleup">Scale-up</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Pressure:
          </label>
          <select
            value={timePressure}
            onChange={(e) => setTimePressure(e.target.value as 'low' | 'moderate' | 'high')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exercise Type:
          </label>
          <select
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value as 'selection' | 'ranking' | 'analysis')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="selection">Selection</option>
            <option value="ranking">Ranking</option>
            <option value="analysis">Analysis</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Scenario'}
        </button>
      </div>
    </div>
  );
}