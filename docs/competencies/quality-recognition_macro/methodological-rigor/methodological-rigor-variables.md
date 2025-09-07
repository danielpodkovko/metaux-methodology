# Methodological rigor recognition - variable definitions

**Date**: September 06, 2025  
**Competency**: Methodological Rigor Recognition  
**Purpose**: Detailed variable definitions for scenario generation

---

## 1. Method fit

```yaml
method_fit:
  display_name: "Method-Question Fit"
  competency: "Methodological Rigor Recognition"
  family: "methodological_rigor"
  
  purpose: "Evaluates whether the research method actually answers the research question"
  
  concept_explanation: "Method fit examines the alignment between what you're trying to learn and how you're trying to learn it. A perfectly executed study using the wrong method produces invalid results. This is about choosing the right tool for the job - surveys for attitudes, observation for behavior, experiments for causation."
  
  values:
    mismatched:
      level: 1
      label: "Fundamentally mismatched"
      quality_signal: "VERY_LOW"
      description: "Method cannot possibly answer the research question"
      observable_signals:
        - "Asking users to predict future behavior"
        - "Survey about visual design preferences"
        - "Focus group for individual task performance"
      scenario_manifestation: "Team uses survey to understand why users can't complete tasks"
      real_example:
        context: "Checkout abandonment study"
        observation: "Sent email survey asking 'Why did you abandon checkout?' - users don't remember or make up reasons"
        
    loosely_related:
      level: 2
      label: "Tangentially related"
      quality_signal: "LOW"
      description: "Method provides indirect or partial insights"
      observable_signals:
        - "Interviews about behavior instead of observation"
        - "Prototype testing for market sizing"
        - "Usability testing for strategic decisions"
      scenario_manifestation: "Using interviews to understand task completion issues instead of watching users"
      real_example:
        context: "Mobile app usability"
        observation: "Asked users to describe how they use the app instead of observing actual usage"
        
    appropriate:
      level: 3
      label: "Generally appropriate"
      quality_signal: "MEDIUM"
      description: "Method reasonably matches question with some limitations"
      observable_signals:
        - "Standard method for this type of question"
        - "Will answer main question, miss nuances"
        - "Industry-accepted approach"
      scenario_manifestation: "Usability testing to identify interface issues, though missing context of real use"
      real_example:
        context: "Feature prioritization"
        observation: "Card sorting for information architecture - good method but doesn't capture all navigation patterns"
        
    optimal:
      level: 4
      label: "Well-matched method"
      quality_signal: "HIGH"
      description: "Method directly addresses research question"
      observable_signals:
        - "Clear connection between method and question"
        - "Captures both what and why"
        - "Minimal inference needed"
      scenario_manifestation: "A/B test for conversion rate, ethnography for context understanding"
      real_example:
        context: "Conversion optimization"
        observation: "A/B test with large sample to measure actual behavior change, not opinions"
        
    precisely_targeted:
      level: 5
      label: "Perfect methodological fit"
      quality_signal: "VERY_HIGH"
      description: "Method precisely designed for specific question"
      observable_signals:
        - "Custom methodology for unique question"
        - "Multiple methods triangulating"
        - "Addresses all aspects of question"
      scenario_manifestation: "Mixed methods with observation, measurement, and inquiry perfectly sequenced"
      real_example:
        context: "Complex workflow analysis"
        observation: "Diary study + shadowing + task analysis + interviews, each revealing different layers"
  
  scenario_generation:
    when_primary: "Emphasize the research question first, then show method choice"
    when_secondary: "Brief mention of method selection"
    avoid_combinations: ["Don't pair 'precisely_targeted' with 'ad_hoc' collection"]
    realistic_pairings:
      high_quality: ["optimal method + professional rigor + appropriate sample"]
      low_quality: ["mismatched method + questionable sources"]
      mixed_quality: ["appropriate method + poor execution"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Clinical decisions"
        reason: "Wrong method could impact patient safety"
      - context: "Fintech + Risk assessment"
        reason: "Need behavioral data, not stated preferences"
    low_importance:
      - context: "Any + Early exploration"
        reason: "Any data better than no data when exploring"
  
  recognition_patterns:
    obvious_indicators: ["Survey for behavior", "Focus group for individual preferences"]
    subtle_indicators: ["Right method, wrong depth", "Missing contextual methods"]
    misleading_indicators: ["Popular method doesn't mean appropriate method"]
  
  relationships:
    reinforces: [sample_design, statistical_rigor, analysis_depth]
    tensions_with: [time_constraints, available_resources]
    independent_of: [polish_level, visual_design]
```

---

## 2. Sample design

```yaml
sample_design:
  display_name: "Sample Design Quality"
  competency: "Methodological Rigor Recognition"
  family: "methodological_rigor"
  
  purpose: "Assesses whether the sample represents the population and supports valid conclusions"
  
  concept_explanation: "Sample design determines whose voices are heard and whether findings generalize. It's not just about size but about representation, diversity, and relevance. A small but well-designed sample beats a large but biased one."
  
  values:
    convenience:
      level: 1
      label: "Convenience sample"
      quality_signal: "VERY_LOW"
      description: "Whoever was easiest to recruit"
      observable_signals:
        - "Friends and family"
        - "First volunteers who responded"
        - "Internal employees only"
      scenario_manifestation: "Tested with whoever was in the office that day"
      real_example:
        context: "New feature validation"
        observation: "Posted in company Slack asking for volunteers, got 10 engineers"
        
    biased:
      level: 2
      label: "Systematically biased"
      quality_signal: "LOW"
      description: "Sample skews toward certain groups"
      observable_signals:
        - "Only power users"
        - "Single demographic dominance"
        - "Geographic limitation"
      scenario_manifestation: "All participants from San Francisco tech workers"
      real_example:
        context: "Consumer app research"
        observation: "Recruited only from Twitter, got young, technical, early adopters"
        
    acceptable:
      level: 3
      label: "Reasonable representation"
      quality_signal: "MEDIUM"
      description: "Decent coverage with known limitations"
      observable_signals:
        - "Mix of user types"
        - "Some demographic diversity"
        - "Acknowledged gaps"
      scenario_manifestation: "Good mix but missing edge cases and extremes"
      real_example:
        context: "E-commerce study"
        observation: "Range of ages and tech comfort, but all from urban areas"
        
    representative:
      level: 4
      label: "Representative sample"
      quality_signal: "HIGH"
      description: "Accurately reflects target population"
      observable_signals:
        - "Matches population demographics"
        - "Includes edge cases"
        - "Proper screening criteria"
      scenario_manifestation: "Sample mirrors actual user base in key dimensions"
      real_example:
        context: "Banking app redesign"
        observation: "Matched customer database on age, income, tech proficiency, geography"
        
    statistically_powered:
      level: 5
      label: "Statistically powered"
      quality_signal: "VERY_HIGH"
      description: "Sample size and design calculated for statistical validity"
      observable_signals:
        - "Power analysis conducted"
        - "Stratified sampling used"
        - "Confidence intervals stated"
      scenario_manifestation: "N=384 calculated for 95% confidence with 5% margin"
      real_example:
        context: "Pricing study"
        observation: "Stratified random sample, calculated sample size per segment, recruitment until statistical power achieved"
  
  scenario_generation:
    when_primary: "Detail participant demographics, recruitment method, representation"
    when_secondary: "Brief mention of who participated"
    avoid_combinations: ["'statistically_powered' rarely pairs with 'informal' rigor"]
    realistic_pairings:
      high_quality: ["representative sample + professional rigor + complete data"]
      low_quality: ["convenience sample + ad_hoc collection"]
      mixed_quality: ["biased sample + excellent methodology"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Diverse patient populations"
        reason: "Missing groups could face health risks"
      - context: "Enterprise + Global deployment"
        reason: "Need cultural and regional representation"
    low_importance:
      - context: "Startup + Initial validation"
        reason: "Any user feedback valuable early on"
  
  recognition_patterns:
    obvious_indicators: ["All participants from one source", "Friends and family"]
    subtle_indicators: ["Missing key user segment", "Over-representation of enthusiasts"]
    misleading_indicators: ["Large sample doesn't mean representative"]
  
  relationships:
    reinforces: [source_credibility, method_fit, statistical_rigor]
    tensions_with: [recruitment_budget, timeline_pressure]
    independent_of: [visual_design, narrative_flow]
```

---

## 3. Control measures

```yaml
control_measures:
  display_name: "Control Measures"
  competency: "Methodological Rigor Recognition"
  family: "methodological_rigor"
  
  purpose: "Evaluates how well the research controls for confounding variables and bias"
  
  concept_explanation: "Control measures ensure you're measuring what you think you're measuring. Without controls, you can't separate the effect of your variable from other factors. This includes controlling environment, order effects, researcher bias, and participant variables."
  
  values:
    uncontrolled:
      level: 1
      label: "No controls"
      quality_signal: "VERY_LOW"
      description: "Multiple variables changing simultaneously"
      observable_signals:
        - "Testing new design with new users on new tasks"
        - "No baseline measurement"
        - "Researcher bias unchecked"
      scenario_manifestation: "Changed everything at once, claimed one thing caused improvement"
      real_example:
        context: "Site redesign"
        observation: "Launched new design, new features, new content simultaneously - can't isolate impact"
        
    minimal:
      level: 2
      label: "Basic controls"
      quality_signal: "LOW"
      description: "Some attempt at control but major confounds remain"
      observable_signals:
        - "Randomization but no matching"
        - "Single researcher, no bias check"
        - "Some variables controlled, others not"
      scenario_manifestation: "Randomized participants but didn't control for experience level"
      real_example:
        context: "Feature comparison"
        observation: "Random assignment to A/B test, but version A users were all morning people, version B afternoon"
        
    standard:
      level: 3
      label: "Standard controls"
      quality_signal: "MEDIUM"
      description: "Common confounds addressed"
      observable_signals:
        - "Counterbalancing order"
        - "Baseline measurements"
        - "Random assignment"
      scenario_manifestation: "Controlled for major variables, some minor confounds remain"
      real_example:
        context: "Usability comparison"
        observation: "Randomized task order, controlled for experience, but didn't control for time of day"
        
    rigorous:
      level: 4
      label: "Rigorous controls"
      quality_signal: "HIGH"
      description: "Comprehensive control of variables"
      observable_signals:
        - "Multiple control conditions"
        - "Researcher blind to conditions"
        - "Environmental constants"
      scenario_manifestation: "Careful isolation of variables with multiple controls"
      real_example:
        context: "Performance study"
        observation: "Control group, matched samples, double-blind protocol, standardized environment"
        
    laboratory_grade:
      level: 5
      label: "Laboratory-grade controls"
      quality_signal: "VERY_HIGH"
      description: "Every possible confound identified and controlled"
      observable_signals:
        - "Multiple control groups"
        - "Placebo conditions"
        - "Statistical control of covariates"
      scenario_manifestation: "Publication-quality experimental control"
      real_example:
        context: "Cognitive load study"
        observation: "Eye-tracking calibration, controlled lighting, sound-proof room, physiological monitoring, multiple control conditions"
  
  scenario_generation:
    when_primary: "Describe what's being controlled vs what's varying"
    when_secondary: "Mention level of experimental control"
    avoid_combinations: ["'laboratory_grade' with 'guerrilla testing'"]
    realistic_pairings:
      high_quality: ["rigorous controls + optimal environment + professional rigor"]
      low_quality: ["uncontrolled + convenience sample + informal collection"]
      mixed_quality: ["standard controls + hostile environment"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Treatment comparison"
        reason: "Uncontrolled variables could affect patient outcomes"
      - context: "Fintech + Algorithm testing"
        reason: "Need to isolate algorithm performance from other factors"
    low_importance:
      - context: "Startup + Exploratory research"
        reason: "Looking for any signal, not causal proof"
  
  recognition_patterns:
    obvious_indicators: ["Everything changed at once", "No baseline", "No randomization"]
    subtle_indicators: ["Order effects", "Researcher expectations influencing", "Time of day variations"]
    misleading_indicators: ["Complex statistics don't fix poor control"]
  
  relationships:
    reinforces: [method_fit, statistical_rigor, analytical_depth]
    tensions_with: [natural_context, time_pressure]
    independent_of: [narrative_flow, audience_fit]
```

---

## 4. Protocol consistency

```yaml
protocol_consistency:
  display_name: "Protocol Consistency"
  competency: "Methodological Rigor Recognition"
  family: "methodological_rigor"
  
  purpose: "Measures how consistently research procedures are followed across sessions"
  
  concept_explanation: "Protocol consistency ensures each participant has a comparable experience, making data comparable. Inconsistency introduces noise and makes it impossible to know if differences come from participants or procedure variations. This is about standardization versus chaos."
  
  values:
    chaotic:
      level: 1
      label: "Chaotic/no protocol"
      quality_signal: "VERY_LOW"
      description: "Every session completely different"
      observable_signals:
        - "Different questions each time"
        - "Researchers doing own thing"
        - "No documentation of approach"
      scenario_manifestation: "Each researcher improvises, no two sessions alike"
      real_example:
        context: "Customer feedback sessions"
        observation: "Three researchers, three completely different approaches, can't compare findings"
        
    variable:
      level: 2
      label: "Highly variable"
      quality_signal: "LOW"
      description: "Major inconsistencies between sessions"
      observable_signals:
        - "Core structure varies"
        - "Key questions sometimes skipped"
        - "Different tools/materials used"
      scenario_manifestation: "Protocol exists but frequently ignored or modified"
      real_example:
        context: "User interviews"
        observation: "Interview guide exists but researchers go off-script, forget key questions"
        
    mostly_consistent:
      level: 3
      label: "Generally consistent"
      quality_signal: "MEDIUM"
      description: "Core protocol followed with minor variations"
      observable_signals:
        - "Same key questions asked"
        - "Similar session structure"
        - "Documented deviations"
      scenario_manifestation: "Standard protocol with flexibility for follow-ups"
      real_example:
        context: "Usability testing"
        observation: "Same tasks for all users, follow-up questions vary based on responses"
        
    standardized:
      level: 4
      label: "Standardized protocol"
      quality_signal: "HIGH"
      description: "Consistent procedures with controlled variations"
      observable_signals:
        - "Detailed protocol followed"
        - "Scripted introductions"
        - "Minimal unplanned deviation"
      scenario_manifestation: "Every participant gets nearly identical experience"
      real_example:
        context: "Benchmark study"
        observation: "Scripted sessions, timed segments, standardized prompts, deviation log maintained"
        
    strict_adherence:
      level: 5
      label: "Strict protocol adherence"
      quality_signal: "VERY_HIGH"
      description: "Zero deviation from protocol"
      observable_signals:
        - "Word-for-word scripts"
        - "Exact timing maintained"
        - "Multiple researcher calibration"
      scenario_manifestation: "Laboratory-precision consistency across all sessions"
      real_example:
        context: "Clinical UX trial"
        observation: "Verbatim scripts, timer-controlled segments, researcher training and certification"
  
  scenario_generation:
    when_primary: "Show how procedures vary or remain consistent across sessions"
    when_secondary: "Mention standardization level"
    avoid_combinations: ["'strict_adherence' with 'ad_hoc' recruitment"]
    realistic_pairings:
      high_quality: ["standardized protocol + professional rigor + controlled environment"]
      low_quality: ["chaotic protocol + informal collection"]
      mixed_quality: ["mostly consistent + time pressure"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Comparative studies"
        reason: "Inconsistency invalidates comparisons"
      - context: "Enterprise + Benchmarking"
        reason: "Need comparable data across sessions"
    low_importance:
      - context: "Startup + Exploratory interviews"
        reason: "Flexibility more valuable than consistency"
  
  recognition_patterns:
    obvious_indicators: ["Different questions per session", "No protocol mentioned"]
    subtle_indicators: ["Protocol drift over time", "Researcher personality affecting"]
    misleading_indicators: ["Having a protocol doesn't mean following it"]
  
  relationships:
    reinforces: [collection_rigor, data_completeness, internal_consistency]
    tensions_with: [natural_conversation, participant_needs]
    independent_of: [visual_design, stakeholder_readiness]
```

---

## 5. Research timing

```yaml
research_timing:
  display_name: "Research Timing"
  competency: "Methodological Rigor Recognition"
  family: "methodological_rigor"
  
  purpose: "Evaluates whether research happens when users naturally engage with the problem"
  
  concept_explanation: "Research timing affects validity because user needs, behaviors, and contexts vary by time. Testing tax software in October misses deadline stress. Testing morning routines at 3pm misses authentic context. Timing can make the difference between genuine and artificial insights."
  
  values:
    invalidating:
      level: 1
      label: "Invalidating timing"
      quality_signal: "VERY_LOW"
      description: "Timing completely undermines validity"
      observable_signals:
        - "Testing seasonal product off-season"
        - "Crisis response during calm period"
        - "Future behavior asked retrospectively"
      scenario_manifestation: "Testing holiday shopping patterns in February"
      real_example:
        context: "Tax software study"
        observation: "Tested in June when users have no urgency or real documents"
        
    poor:
      level: 2
      label: "Poor timing"
      quality_signal: "LOW"
      description: "Timing significantly affects authenticity"
      observable_signals:
        - "Wrong time of day for use case"
        - "Too early/late in customer journey"
        - "Missing contextual pressures"
      scenario_manifestation: "Testing morning productivity app in afternoon sessions"
      real_example:
        context: "Commute app testing"
        observation: "Tested in office instead of during actual commute"
        
    acceptable:
      level: 3
      label: "Acceptable timing"
      quality_signal: "MEDIUM"
      description: "Reasonable proxy for actual use"
      observable_signals:
        - "Close enough to real context"
        - "Some temporal validity"
        - "Limitations acknowledged"
      scenario_manifestation: "Testing within reasonable window of actual use"
      real_example:
        context: "Lunch ordering app"
        observation: "Tested at 11am, close enough to lunch decision time"
        
    natural:
      level: 4
      label: "Natural timing"
      quality_signal: "HIGH"
      description: "Research during actual use periods"
      observable_signals:
        - "In-the-moment research"
        - "Seasonal alignment"
        - "Authentic time pressure"
      scenario_manifestation: "Catching users when they naturally engage with problem"
      real_example:
        context: "Black Friday shopping"
        observation: "Tested during actual Black Friday with real shopping goals"
        
    optimal:
      level: 5
      label: "Optimal timing"
      quality_signal: "VERY_HIGH"
      description: "Perfect temporal validity"
      observable_signals:
        - "Longitudinal at key moments"
        - "Multiple time points captured"
        - "Full temporal context"
      scenario_manifestation: "Research perfectly timed across entire user journey"
      real_example:
        context: "Student registration system"
        observation: "Tested during actual registration period with real course selection pressure"
  
  scenario_generation:
    when_primary: "Emphasize when research happened vs when behavior occurs"
    when_secondary: "Mention timing considerations"
    avoid_combinations: ["'optimal timing' rarely happens with 'high pressure'"]
    realistic_pairings:
      high_quality: ["natural timing + representative sample + appropriate method"]
      low_quality: ["invalidating timing + convenience sample"]
      mixed_quality: ["acceptable timing + good methodology"]
    
  contextual_weight:
    high_importance:
      - context: "E-commerce + Seasonal shopping"
        reason: "Shopping behavior completely different in/out of season"
      - context: "Healthcare + Emergency protocols"
        reason: "Can't simulate real emergency pressure"
    low_importance:
      - context: "Enterprise + General usability"
        reason: "Basic usability issues visible anytime"
  
  recognition_patterns:
    obvious_indicators: ["Tax software in summer", "Holiday shopping in spring"]
    subtle_indicators: ["Morning app tested afternoon", "Missing deadline pressure"]
    misleading_indicators: ["Recent doesn't mean right timing"]
  
  relationships:
    reinforces: [method_fit, source_credibility, collection_environment]
    tensions_with: [researcher_availability, participant_scheduling]
    independent_of: [polish_level, visual_design]
```

---

## Usage notes for scenario generation

### When using these variables:

1. **Method fit** often drives the narrative - start with what they're trying to learn
2. **Sample design** creates natural character descriptions 
3. **Control measures** shows through what changed/didn't change
4. **Protocol consistency** revealed through different sessions
5. **Research timing** sets temporal context

### Example combination:
```yaml
Scenario with:
- method_fit: mismatched (survey for behavior)
- sample_design: representative (good demographics)
- research_timing: poor (wrong season)

Creates: "Great sample answering wrong questions at wrong time"
```