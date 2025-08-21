import { ScenarioConfig } from './config';

export interface GeneratedScenario {
  id: string;
  config: ScenarioConfig;
  content: {
    context: string;      // 1-2 sentences setting the scene
    situation: string;    // The main scenario text
    data_presented: string; // Specific data/claim to evaluate
    decision_prompt: string; // What the user needs to decide
  };
  embedded_patterns: string[]; // Quality issues present
  generated_at: string;
}

export interface UserResponse {
  scenario_id: string;
  exercise_type: "selection" | "ranking" | "analysis";
  response: {
    selection?: "high" | "medium" | "low";
    ranking?: number[];
    analysis?: string;
    reasoning?: string; // Optional explanation
  };
  submitted_at: string;
}