export const TEST_CONFIGS = [
  {
    name: "Quality Recognition - Data Quality Test",
    config: {
      scenario_id: "test_quality_001",
      competency: {
        macro: "quality_recognition",
        micro: "data_quality_assessment",
        difficulty: "moderate"
      },
      universal_variables: {
        industry_context: "healthcare",
        company_stage: "enterprise",
        time_pressure: "low"
      },
      exercise_type: "selection",
      learning_goal: "Recognize data collection quality issues"
    },
    expectedPatterns: ["collection_rigor", "data_completeness", "internal_consistency"],
    invalidPatterns: ["sample_size", "selection_bias", "statistical_significance"]
  },
  {
    name: "Quality Recognition - Methodological Rigor Test",
    config: {
      scenario_id: "test_quality_002",
      competency: {
        macro: "quality_recognition",
        micro: "methodological_rigor",
        difficulty: "moderate"
      },
      universal_variables: {
        industry_context: "fintech",
        company_stage: "startup",
        time_pressure: "high"
      },
      exercise_type: "selection",
      learning_goal: "Recognize process quality issues"
    },
    expectedPatterns: ["process_documentation", "execution_consistency", "protocol_adherence"],
    invalidPatterns: ["sample_size", "participant_bias", "statistical_power"]
  }
];