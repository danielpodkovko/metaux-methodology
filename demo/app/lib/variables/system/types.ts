export interface VariableDefinition {
  display_name: string;
  competency: string;
  family: string;
  purpose: string;
  concept_explanation: string;
  values: {
    [key: string]: {
      level: number;
      label: string;
      quality_signal: string;
      description: string;
      observable_signals: string[];
      scenario_manifestation: string;
      real_example: {
        context: string;
        observation: string;
      };
    };
  };
  scenario_generation: {
    when_primary: string;
    when_secondary: string;
    avoid_combinations: string[];
    realistic_pairings: {
      high_quality: string[];
      low_quality: string[];
      mixed_quality: string[];
    };
  };
  contextual_weight: {
    high_importance: Array<{
      context: string;
      reason: string;
    }>;
    low_importance: Array<{
      context: string;
      reason: string;
    }>;
  };
  recognition_patterns: {
    obvious_indicators: string[];
    subtle_indicators: string[];
    misleading_indicators: string[];
  };
  relationships: {
    reinforces: string[];
    tensions_with: string[];
    independent_of: string[];
  };
}

export interface SelectedVariable {
  name: string;
  display_name: string;
  selectedLevel: string;
  levelDetails: any; // The specific value object
  quality_signal: string;
}

export interface SelectedVariables {
  primary: SelectedVariable[];
  metadata: {
    competency: string;
    difficulty: string;
    patterns: string[];
  };
}

export interface CompetencyVariables {
  competency: string;
  variables: Map<string, VariableDefinition>;
}