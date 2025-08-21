export interface ScenarioConfig {
  scenario_id: string;
  competency: {
    macro: "quality_recognition";
    micro: "data_quality_assessment" | "methodological_rigor" | "insight_quality";
    difficulty: "obvious" | "moderate" | "subtle";
  };
  universal_variables: {
    industry_context: "fintech" | "healthcare" | "ecommerce";
    company_stage: "startup" | "scaleup" | "enterprise";
    time_pressure: "low" | "moderate" | "high";
    stakeholder_resistance?: "supportive" | "neutral" | "skeptical";
  };
  exercise_type: "selection" | "ranking" | "analysis";
  learning_goal: string;
}