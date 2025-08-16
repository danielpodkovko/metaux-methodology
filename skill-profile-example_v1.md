## **The Key System Design Insight:**

**Skills are INSTRUCTIONS for configuring existing variables**, not new variables themselves:


```yaml
"Train feedback skills" 
    ↓
Instructs system to:
- Use competencies X, Y, Z
- Set variables to create feedback contexts
- Generate scenarios with evaluation moments
- Focus assessment on feedback quality
    ↓
But uses SAME variables, SAME competencies, SAME patterns
```


``` yaml

skill_profile:
  id: "user_interview_conducting"
  name: "User Interview Conducting"
  category: "foundational_research"
  
  # Skill-level metadata
  description: "Conducting effective user interviews to gather insights"
  typical_duration: "30-60 minutes per interview"
  deliverable: "Interview insights and patterns"
  
  # Decomposed aspects (what users can focus on)
  aspects:
    question_quality:
      name: "Question Quality"
      description: "Asking open, unbiased, effective questions"
      enabling_competencies:
        primary:
          - signal_vs_noise.bias_source_detection  # Leading questions
          - quality_recognition.communication_quality  # Clear questions
        secondary:
          - human_pattern.cognitive_load  # Not overwhelming participant
      
      scenario_instructions:
        must_include: "interview question formulation moment"
        examples: 
          - "Preparing questions for user interview"
          - "Real-time question adjustment during interview"
        avoid: "Analysis or synthesis tasks"
      
      variable_preferences:  # How to set universal variables
        time_pressure: ["comfortable", "tight"]  # Not "immediate"
        stakeholder_resistance: ["neutral", "skeptical"]  # Participant mood
        communication_constraints: ["open", "standard"]  # Not "restricted"
      
      assessment_focus:
        - "Identifies leading questions"
        - "Recognizes biased framing"
        - "Spots closed vs open questions"
    
    response_evaluation:
      name: "Response Evaluation"
      description: "Recognizing valuable insights vs surface responses"
      enabling_competencies:
        primary:
          - signal_vs_noise.behavioral_consistency  # Real patterns
          - human_pattern.participant_authenticity  # Genuine vs performed
          - human_pattern.social_desirability_bias  # Saying what's expected
        secondary:
          - analysis_quality.insight_quality  # Depth of insight
      
      scenario_instructions:
        must_include: "participant responses to analyze"
        examples:
          - "Interview transcript with varied response quality"
          - "Live interview with shallow answers"
      
      variable_preferences:
        user_motivation: ["efficiency", "social"]  # Why they agreed
        stakeholder_resistance: ["defensive", "neutral", "eager"]
      
      assessment_focus:
        - "Identifies surface vs deep responses"
        - "Recognizes when to probe deeper"
        - "Spots social desirability bias"
    
    probing_techniques:
      name: "Probing Techniques"
      description: "Knowing when and how to dig deeper"
      enabling_competencies:
        primary:
          - human_pattern.emotional_state  # Reading comfort level
          - human_pattern.trust_building  # Creating safety to share
        secondary:
          - timing_recognition.interaction_timing  # When to probe
      
      scenario_instructions:
        must_include: "moment requiring follow-up questions"
        examples:
          - "Participant gives vague answer"
          - "Interesting thread emerges unexpectedly"
      
      variable_preferences:
        time_pressure: ["comfortable", "tight"]
        stakeholder_resistance: ["defensive", "neutral"]
      
      assessment_focus:
        - "Recognizes when probing needed"
        - "Selects appropriate probing technique"
        - "Balances depth with rapport"
    
    process_management:
      name: "Process Management"
      description: "Managing interview flow and time"
      enabling_competencies:
        primary:
          - constraint_recognition.timeline_constraint
          - problem_understanding.scope_appropriateness
        secondary:
          - human_pattern.emotional_state  # Participant fatigue
      
      scenario_instructions:
        must_include: "time management decision"
        examples:
          - "Interview running long with more topics"
          - "Participant going off-topic"
      
      variable_preferences:
        time_pressure: ["tight", "impossible"]
        team_capacity: ["solo", "limited"]
      
      assessment_focus:
        - "Prioritizes topics appropriately"
        - "Manages time without rushing"
        - "Handles digressions gracefully"
  
  # Skill-level configuration
  default_scenario_context:
    setting: "user research session"
    participants: "researcher and user(s)"
    goal: "gather user insights"
    common_challenges:
      - "Participant reluctance"
      - "Time constraints"
      - "Unexpected insights emerging"
      - "Technical difficulties"
  
  # How this skill maps to cognitive patterns
  pattern_recommendations:
    beginner:
      - selection: "Is this a good interview question?"
      - ranking: "Order questions by effectiveness"
    intermediate:
      - analysis: "Break down why interview failed"
      - synthesis: "Create interview guide"
    advanced:
      - dialogue: "Conduct mock interview with challenges"
  
  # Links to other skills
  related_skills:
    prerequisites:
      - "research_planning"
      - "participant_recruitment"
    enables:
      - "insight_synthesis"
      - "persona_development"
    complementary:
      - "survey_design"
      - "usability_testing"
```
