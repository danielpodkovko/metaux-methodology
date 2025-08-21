import { UserResponse } from './scenario';

export interface Evaluation {
  scenario_id: string;
  user_response: UserResponse;
  assessment: {
    correct: boolean;
    accuracy_score: number; // 0-100
    recognized_patterns: string[];
    missed_patterns: string[];
    reasoning_quality: "excellent" | "good" | "developing" | "poor";
  };
  feedback: {
    summary: string;
    key_points: string[];
    pattern_guidance: string;
    encouragement: string;
  };
}