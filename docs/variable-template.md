# Quality recognition variable definition template

**Date**: September 06, 2025  
**Purpose**: Standardized template for rich variable definitions that guide scenario generation

---

## Variable definition template

```yaml
variable_name: [snake_case identifier]
  display_name: "[Human-readable name]"
  competency: "[Parent micro-competency]"
  family: "[Variable family name]"
  
  purpose: "[One sentence: What quality aspect this variable measures]"
  
  values:
    value_1_name:
      level: [1-5, where 1 is worst]
      label: "[Short descriptor]"
      description: "[1-2 sentences explaining this level]"
      signals: ["Observable sign 1", "Observable sign 2", "Observable sign 3"]
      example: "[Concrete real-world example]"
      
    value_2_name:
      level: 2
      label: "[Short descriptor]"
      description: "[1-2 sentences explaining this level]"
      signals: ["Observable sign 1", "Observable sign 2", "Observable sign 3"]
      example: "[Concrete real-world example]"
    
    # ... continue for all values
  
  scenario_guidance:
    high_impact_contexts: ["Context where this variable is critical"]
    low_impact_contexts: ["Context where this variable matters less"]
    common_combinations: ["Often appears with X variable", "Conflicts with Y"]
    
  red_flags: ["Pattern that signals major quality issue"]
  green_flags: ["Pattern that signals excellence"]
  
  common_misconceptions: ["What people often get wrong about this"]
  
  tags: [methodology, quality, validity, etc.]
  attracts: [related_variable_1, related_variable_2]
  conflicts: [conflicting_variable_1, conflicting_variable_2]
```

---

## Example: Complete variable definition

```yaml
collection_environment:
  display_name: "Data Collection Environment"
  competency: "Data Quality Assessment Recognition"
  family: "data_quality"
  
  purpose: "Assesses whether the physical and social environment enables or corrupts quality data collection"
  
  concept_explanation: "The collection environment encompasses all external factors during data gathering - physical space, technical setup, social dynamics, and interruptions. In UX research, even the best methodology can be undermined by a hostile or disruptive environment, while a well-controlled environment enables participants to focus and provide authentic responses."
  
  values:
    hostile:
      level: 1
      label: "Actively hostile"
      quality_signal: "VERY_LOW"
      description: "Environment actively corrupts data through hostility, chaos, or system failures"
      observable_signals:
        - "Participants expressing anger or frustration with the situation itself"
        - "Technical systems failing during critical moments"
        - "Researchers abandoning protocol due to environment"
      scenario_manifestation: "The session degenerates into chaos with participants venting frustration about technical issues rather than providing feedback"
      real_example:
        context: "Testing new checkout flow during Black Friday site crash"
        observation: "Users couldn't complete tasks due to 500 errors, sessions became complaint sessions about site reliability"
      
    disruptive:
      level: 2
      label: "Significantly disruptive"
      quality_signal: "LOW"
      description: "Environment introduces noise and interruptions that compromise data quality"
      observable_signals:
        - "Multiple interruptions breaking participant flow"
        - "Background noise obscuring verbal responses"
        - "Participants visibly distracted or checking time"
      scenario_manifestation: "Researchers struggle to hear responses over ambient noise, participants frequently lose focus"
      real_example:
        context: "Conducting interviews in busy WeWork common area"
        observation: "Coffee grinder noise made 30% of recordings inaudible, participants kept getting distracted by people walking by"
      
    suboptimal:
      level: 3
      label: "Less than ideal"
      quality_signal: "MEDIUM"
      description: "Minor environmental issues that require workarounds but don't invalidate data"
      observable_signals:
        - "Occasional interruptions that are quickly managed"
        - "Some environmental constraints noted in research notes"
        - "Researchers successfully adapt protocol to environment"
      scenario_manifestation: "The team works around minor issues, maintaining data quality despite constraints"
      real_example:
        context: "Conference room testing with occasional hallway noise"
        observation: "Closed doors when needed, repeated questions when interrupted, all critical data captured"
      
    controlled:
      level: 4
      label: "Well-controlled"
      quality_signal: "HIGH"
      description: "Environment supports quality data collection with minimal interference"
      observable_signals:
        - "Quiet, private space with no interruptions"
        - "Participants relaxed and focused"
        - "All technical equipment functioning properly"
      scenario_manifestation: "Participants can think deeply and respond thoughtfully without environmental pressure"
      real_example:
        context: "Dedicated research room with scheduled time slots"
        observation: "Participants took their time, provided detailed feedback, no session disruptions"
      
    optimal:
      level: 5
      label: "Purpose-built optimal"
      quality_signal: "VERY_HIGH"
      description: "Environment specifically designed to enable highest quality data collection"
      observable_signals:
        - "Purpose-built research facilities with professional setup"
        - "All environmental variables actively controlled"
        - "Participants commenting on comfort and ease"
      scenario_manifestation: "The environment actively enhances data quality through thoughtful design"
      real_example:
        context: "Professional usability lab with observation room"
        observation: "Eye-tracking, screen recording, and biometric data all captured flawlessly, participants fully engaged"
  
  scenario_generation:
    when_primary: "Make environment details prominent - describe sounds, interruptions, technical issues, participant comfort"
    when_secondary: "Mention environment briefly in setup, don't dwell on details"
    avoid_combinations: ["Don't pair 'optimal' environment with 'ad_hoc' collection_rigor - unrealistic"]
    realistic_pairings:
      high_quality: ["controlled environment + structured protocol + comprehensive documentation"]
      low_quality: ["disruptive environment + rushed timing + sparse documentation"]
      mixed_quality: ["optimal environment + convenience sample", "hostile environment + professional protocol attempt"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Enterprise + Low pressure"
        reason: "Regulated environments require controlled conditions for valid data"
      - context: "Fintech + Any + High security needs"
        reason: "Sensitive financial data requires private, secure environment"
    low_importance:
      - context: "Ecommerce + Startup + Guerrilla testing"
        reason: "Quick validation may prioritize speed over perfect environment"
  
  recognition_patterns:
    obvious_indicators: ["Can't hear participant responses", "System crashes during testing"]
    subtle_indicators: ["Participant body language shows discomfort", "Shortened responses due to time pressure"]
    misleading_indicators: ["Fancy lab doesn't guarantee good environment if participants feel intimidated"]
  
  relationships:
    reinforces: [collection_rigor, data_completeness, documentation_quality]
    tensions_with: [time_pressure, resource_constraints]
    independent_of: [method_fit, statistical_rigor]
```

---

## Template usage notes

### For LLMs generating scenarios:
1. **Check value level** to determine quality signal
2. **Use signals list** to embed recognizable patterns
3. **Reference examples** for realistic details
4. **Consider scenario_guidance** for context appropriateness
5. **Include red/green flags** as teaching moments

### For humans creating definitions:
1. **Keep descriptions concise** (1-2 sentences max)
2. **Make signals observable** (what you'd actually see/hear)
3. **Use real examples** from actual UX work
4. **Include 3-5 values** (enough variety, not overwhelming)
5. **Focus on recognition** not prescription

### Key principles:
- **Observable over theoretical** - Focus on what practitioners would actually encounter
- **Contextual over absolute** - Same value might be good/bad depending on context
- **Recognition over judgment** - Help identify patterns, not prescribe solutions
- **Realistic over ideal** - Include messy middle grounds, not just extremes

---

## Quick template (for rapid definition):

```yaml
variable_name:
  purpose: "[What it measures]"
  values:
    worst: "[Description] - Example: [concrete example]"
    bad: "[Description] - Example: [concrete example]"
    medium: "[Description] - Example: [concrete example]"
    good: "[Description] - Example: [concrete example]"
    best: "[Description] - Example: [concrete example]"
  critical_for: ["Context 1", "Context 2"]
  watch_for: ["Red flag pattern", "Green flag pattern"]
```

This lighter version can be used for initial passes, then expanded to full template for key variables.