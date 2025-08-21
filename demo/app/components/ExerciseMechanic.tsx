'use client';

import SelectionMechanic from './SelectionMechanic';
import RankingMechanic from './RankingMechanic';
import AnalysisMechanic from './AnalysisMechanic';
import { GeneratedScenario, UserResponse } from '@/app/lib/schemas/scenario';

interface ExerciseMechanicProps {
  scenario: GeneratedScenario;
  onSubmit: (response: UserResponse) => void;
  isSubmitting: boolean;
}

export default function ExerciseMechanic({ scenario, onSubmit, isSubmitting }: ExerciseMechanicProps) {
  const handleSelectionSubmit = (selection: 'high' | 'medium' | 'low', reasoning?: string) => {
    const response: UserResponse = {
      scenario_id: scenario.id,
      exercise_type: 'selection',
      response: {
        selection,
        reasoning
      },
      submitted_at: new Date().toISOString()
    };
    onSubmit(response);
  };

  const handleRankingSubmit = (ranking: number[], reasoning?: string) => {
    const response: UserResponse = {
      scenario_id: scenario.id,
      exercise_type: 'ranking',
      response: {
        ranking,
        reasoning
      },
      submitted_at: new Date().toISOString()
    };
    onSubmit(response);
  };

  const handleAnalysisSubmit = (analysis: string) => {
    const response: UserResponse = {
      scenario_id: scenario.id,
      exercise_type: 'analysis',
      response: {
        analysis
      },
      submitted_at: new Date().toISOString()
    };
    onSubmit(response);
  };

  switch (scenario.config.exercise_type) {
    case 'selection':
      return (
        <SelectionMechanic
          onSubmit={handleSelectionSubmit}
          isSubmitting={isSubmitting}
        />
      );
    
    case 'ranking':
      // For demo, we'll create some sample items to rank
      const rankingItems = [
        'Survey of 100 users with demographic diversity',
        'Quick poll of 10 team members',
        'In-depth interviews with 5 power users'
      ];
      return (
        <RankingMechanic
          items={rankingItems}
          onSubmit={handleRankingSubmit}
          isSubmitting={isSubmitting}
        />
      );
    
    case 'analysis':
      return (
        <AnalysisMechanic
          onSubmit={handleAnalysisSubmit}
          isSubmitting={isSubmitting}
        />
      );
    
    default:
      return null;
  }
}