
## Skill profile template structure

``` yaml
skill_profile:
├── id: [unique_identifier]
├── name: [display_name]
├── category: [foundational_research | synthesis_communication | strategic_business | soft_skills]
├── description: [what_this_skill_accomplishes]
├── typical_duration: [time_range_for_execution]
├── deliverable: [what_it_produces]
│
├── aspects:
│   └── [aspect_id]:
│       ├── name: [display_name]
│       ├── description: [what_this_aspect_focuses_on]
│       ├── enabling_competencies:
│       │   ├── primary:
│       │   │   └── [competency.micro_competency]
│       │   └── secondary:
│       │       └── [competency.micro_competency]
│       ├── scenario_instructions:
│       │   ├── must_include: [required_scenario_element]
│       │   ├── examples:
│       │   │   └── [specific_scenario_example]
│       │   └── avoid: [elements_to_exclude]
│       ├── variable_preferences:
│       │   └── [universal_variable]: [array_of_preferred_values]
│       └── assessment_focus:
│           └── [what_to_evaluate]
│
├── default_scenario_context:
│   ├── setting: [where_this_happens]
│   ├── participants: [who_is_involved]
│   ├── goal: [what_trying_to_achieve]
│   └── common_challenges:
│       └── [typical_problems]
│
├── pattern_recommendations:
│   ├── beginner:
│   │   └── [pattern]: [exercise_description]
│   ├── intermediate:
│   │   └── [pattern]: [exercise_description]
│   └── advanced:
│       └── [pattern]: [exercise_description]
│
└── related_skills:
    ├── prerequisites:
    │   └── [skill_needed_before_this]
    ├── enables:
    │   └── [skill_this_unlocks]
    └── complementary:
        └── [skill_that_pairs_well]
```

## Aspect template structure

``` yaml
aspect:
├── name: [user_facing_name]
├── description: [what_aspect_trains]
│
├── enabling_competencies:
│   ├── primary: [critical_patterns_for_this_aspect]
│   │   ├── [macro_competency].[micro_competency]
│   │   └── [macro_competency].[micro_competency]
│   └── secondary: [supporting_patterns]
│       ├── [macro_competency].[micro_competency]
│       └── [macro_competency].[micro_competency]
│
├── scenario_instructions:
│   ├── must_include: [required_element_in_every_scenario]
│   ├── examples:
│   │   ├── [concrete_scenario_example_1]
│   │   ├── [concrete_scenario_example_2]
│   │   └── [concrete_scenario_example_3]
│   └── avoid: [what_not_to_include]
│
├── variable_preferences:
│   ├── [universal_variable_1]: [value_1, value_2, value_3]
│   ├── [universal_variable_2]: [value_1, value_2]
│   └── [universal_variable_3]: [value_1, value_2, value_3, value_4]
│
└── assessment_focus:
    ├── [specific_recognition_ability_1]
    ├── [specific_recognition_ability_2]
    └── [specific_recognition_ability_3]
```

## Competency reference format

``` yaml
Competency References in Skills:
├── signal_vs_noise.[micro]
│   ├── .statistical_validity
│   ├── .behavioral_consistency
│   ├── .data_outlier
│   ├── .bias_source_detection
│   └── .sample_representativeness
│
├── human_pattern.[micro]
│   ├── .participant_authenticity
│   ├── .emotional_state
│   ├── .motivation_pattern
│   ├── .cognitive_load
│   ├── .social_desirability_bias
│   └── .power_distance
│
├── quality_recognition.[micro]
│   ├── .data_quality
│   ├── .methodological_rigor
│   ├── .analysis_quality
│   ├── .insight_quality
│   ├── .communication_quality
│   └── .output_quality
│
└── [Continue for all 17 macro competencies...]
```