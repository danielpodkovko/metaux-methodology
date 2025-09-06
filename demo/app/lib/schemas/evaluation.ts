import { UserResponse } from './scenario';

export interface Evaluation {
  scenario_id: string;
  user_response: UserResponse;
  assessment: {
    correct: boolean;
    accuracy_score: number; // 0-100
    score_breakdown?: {
      selectionPoints: number;
      patternPoints: number;
      bonusPoints: number;
      penalties: number;
    };
    recognized_patterns: string[];
    missed_patterns: string[];
    confused_competencies?: string[]; // Added for tracking competency confusion
    reasoning_quality: string;
  };
  feedback: {
    summary: string;
    key_points: string[];
    pattern_guidance: string;
    encouragement: string;
    competency_clarification?: string; // Added for competency confusion feedback
  };
}