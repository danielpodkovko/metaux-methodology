'use client';

import { GeneratedScenario } from '@/app/lib/schemas/scenario';

interface ScenarioDisplayProps {
  scenario: GeneratedScenario;
}

export default function ScenarioDisplay({ scenario }: ScenarioDisplayProps) {
  const { content } = scenario;

  return (
    <div className="mb-8">
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mb-8">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Scenario Context</h3>
        <div className="space-y-3">
          <p className="text-gray-700">{content.context}</p>
          <p className="text-gray-600">{content.situation}</p>
        </div>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-4">Research Data Presented</h3>
        <div className="font-mono text-sm leading-relaxed p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-800">{content.data_presented}</p>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200">
        <p className="text-gray-700 font-medium text-lg">{content.decision_prompt}</p>
      </div>
    </div>
  );
}