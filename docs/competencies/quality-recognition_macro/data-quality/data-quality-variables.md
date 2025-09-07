# Data quality assessment recognition - variable definitions

**Date**: September 06, 2025  
**Competency**: Data Quality Assessment Recognition  
**Purpose**: Detailed variable definitions for scenario generation

---

## 1. Collection rigor

```yaml
collection_rigor:
  display_name: "Data Collection Rigor"
  competency: "Data Quality Assessment Recognition"
  family: "data_quality"
  
  purpose: "Measures the systematic approach and professional standards applied during data collection"
  
  concept_explanation: "Collection rigor reflects how methodically and professionally data is gathered. It encompasses planning, protocol adherence, documentation standards, and researcher discipline. High rigor doesn't guarantee good data, but low rigor almost always compromises it."
  
  values:
    ad_hoc:
      level: 1
      label: "Ad hoc/opportunistic"
      quality_signal: "VERY_LOW"
      description: "No planning or structure, grabbing whatever data is available"
      observable_signals:
        - "No consistent questions or protocol across sessions"
        - "Different team members collecting different information"
        - "Making it up as they go along"
      scenario_manifestation: "Team members randomly grab people in hallways, asking whatever comes to mind"
      real_example:
        context: "Startup validating idea at coffee shop"
        observation: "Founder approaches random customers with different questions each time, no notes template"
        
    informal:
      level: 2
      label: "Informal/loose"
      quality_signal: "LOW"
      description: "Basic structure exists but loosely followed, significant variations"
      observable_signals:
        - "General topics to cover but no specific protocol"
        - "Inconsistent documentation between sessions"
        - "Researchers improvising significant portions"
      scenario_manifestation: "Team has rough interview guide but frequently goes off-script, forgets key questions"
      real_example:
        context: "Design team conducting user interviews"
        observation: "Basic question list exists but each interviewer asks differently, takes notes their own way"
        
    structured:
      level: 3
      label: "Structured approach"
      quality_signal: "MEDIUM"
      description: "Clear protocol exists and is generally followed with minor deviations"
      observable_signals:
        - "Documented research protocol or guide"
        - "Consistent core questions across sessions"
        - "Standard note-taking template used"
      scenario_manifestation: "Team follows interview guide, captures consistent data points, occasionally adapts questions"
      real_example:
        context: "Product team usability testing"
        observation: "Standard tasks and questions, some flexibility for follow-ups, organized documentation"
        
    professional:
      level: 4
      label: "Professional standards"
      quality_signal: "HIGH"
      description: "Rigorous protocols consistently applied with quality controls"
      observable_signals:
        - "Detailed protocol with contingency plans"
        - "Pilot testing before main study"
        - "Inter-rater reliability checks"
      scenario_manifestation: "Research team runs pilot session, refines protocol, maintains consistency across all sessions"
      real_example:
        context: "UX agency conducting client research"
        observation: "Screener, discussion guide, note template, debrief process all standardized and followed"
        
    research_grade:
      level: 5
      label: "Academic/research grade"
      quality_signal: "VERY_HIGH"
      description: "Publication-quality rigor with full methodology documentation"
      observable_signals:
        - "IRB approval or ethics review"
        - "Published methodology that could be replicated"
        - "Multiple researchers, training, calibration"
      scenario_manifestation: "Every aspect documented, peer-reviewed protocol, could be replicated by another team"
      real_example:
        context: "Healthcare UX research study"
        observation: "IRB-approved protocol, trained researchers, inter-rater reliability testing, audit trail"
  
  scenario_generation:
    when_primary: "Emphasize planning details, protocol description, how team prepares and executes"
    when_secondary: "Brief mention of approach - 'quick guerrilla testing' or 'formal study'"
    avoid_combinations: ["Don't pair 'research_grade' rigor with 'hostile' environment"]
    realistic_pairings:
      high_quality: ["professional rigor + controlled environment + comprehensive documentation"]
      low_quality: ["ad_hoc rigor + disruptive environment + sparse completeness"]
      mixed_quality: ["structured rigor + convenience sample", "professional rigor + time pressure"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Enterprise + Regulatory requirements"
        reason: "Medical device research requires documented rigor for FDA"
      - context: "Fintech + Enterprise + Compliance needs"
        reason: "Financial services have audit requirements"
    low_importance:
      - context: "Ecommerce + Startup + MVP validation"
        reason: "Speed matters more than perfect methodology"
  
  recognition_patterns:
    obvious_indicators: ["No protocol mentioned", "Each session completely different"]
    subtle_indicators: ["Protocol exists but not followed", "Drift over time in methodology"]
    misleading_indicators: ["Lots of documentation doesn't mean rigorous if method is flawed"]
  
  relationships:
    reinforces: [source_credibility, internal_consistency, protocol_consistency]
    tensions_with: [time_pressure, resource_constraints]
    independent_of: [visual_design, narrative_flow]
```

---

## 2. Data completeness

```yaml
data_completeness:
  display_name: "Data Completeness"
  competency: "Data Quality Assessment Recognition"
  family: "data_quality"
  
  purpose: "Assesses gaps, missing data points, and coverage of intended information"
  
  concept_explanation: "Data completeness examines whether all planned data was actually collected and documented. Missing data can occur from dropouts, technical failures, poor documentation, or inadequate planning. Even small gaps can invalidate findings if they're in critical areas."
  
  values:
    sparse_gaps:
      level: 1
      label: "Sparse with major gaps"
      quality_signal: "VERY_LOW"
      description: "More missing than present, critical data absent"
      observable_signals:
        - "Over 50% of planned data missing"
        - "Key metrics not captured at all"
        - "Can't answer basic research questions"
      scenario_manifestation: "Report mentions 'data unavailable' repeatedly, core questions unanswered"
      real_example:
        context: "Mobile app testing session"
        observation: "Recording failed for 7/10 sessions, task completion data missing, only remember 'users struggled'"
        
    significant_missing:
      level: 2
      label: "Significant gaps"
      quality_signal: "LOW"
      description: "Notable gaps that limit analysis options"
      observable_signals:
        - "25-50% of data points missing"
        - "Some complete sessions, others fragmentary"
        - "Inconsistent data across participants"
      scenario_manifestation: "Half the participants missing demographic data, several incomplete task recordings"
      real_example:
        context: "Remote user research study"
        observation: "5 full recordings, 3 audio only, 4 just notes, can't compare across all users"
        
    mostly_complete:
      level: 3
      label: "Mostly complete"
      quality_signal: "MEDIUM"
      description: "Minor gaps that don't affect main findings"
      observable_signals:
        - "80-90% data captured"
        - "Core research questions answerable"
        - "Some nice-to-have data missing"
      scenario_manifestation: "Main task data complete, missing some demographic details or optional feedback"
      real_example:
        context: "Usability study of checkout flow"
        observation: "All task completions tracked, most think-aloud captured, few post-task ratings missing"
        
    comprehensive:
      level: 4
      label: "Comprehensive coverage"
      quality_signal: "HIGH"
      description: "All planned data successfully collected with minimal gaps"
      observable_signals:
        - "95%+ completion rate"
        - "All critical metrics captured"
        - "Rich supplementary data"
      scenario_manifestation: "Complete data for all participants, all planned metrics captured successfully"
      real_example:
        context: "Design system component testing"
        observation: "Every participant completed all tasks, all metrics recorded, screen recordings intact"
  
  scenario_generation:
    when_primary: "Detail what data is missing/present, mention percentages, describe gaps explicitly"
    when_secondary: "Quick reference to completeness - 'comprehensive data' or 'several gaps'"
    avoid_combinations: ["Don't have 'comprehensive' data with 'ad_hoc' collection"]
    realistic_pairings:
      high_quality: ["comprehensive data + structured protocol + good documentation"]
      low_quality: ["sparse gaps + poor environment + ad_hoc collection"]
      mixed_quality: ["comprehensive data + biased sample", "mostly complete + professional rigor"]
    
  contextual_weight:
    high_importance:
      - context: "Any + Enterprise + Quantitative decisions"
        reason: "Statistical analysis requires complete datasets"
      - context: "Healthcare + Any + Clinical trials"
        reason: "Regulatory requirements demand complete data"
    low_importance:
      - context: "Any + Startup + Directional insights"
        reason: "Looking for patterns, not statistical significance"
  
  recognition_patterns:
    obvious_indicators: ["'Data not available', 'Recording failed', 'Lost notes'"]
    subtle_indicators: ["Different N values across metrics", "Selective reporting"]
    misleading_indicators: ["Lots of data doesn't mean complete if wrong data collected"]
  
  relationships:
    reinforces: [documentation_quality, internal_consistency]
    tensions_with: [time_pressure, technical_difficulties]
    independent_of: [method_fit, audience_fit]
```

---

## 3. Source credibility

```yaml
source_credibility:
  display_name: "Source Credibility"
  competency: "Data Quality Assessment Recognition"
  family: "data_quality"
  
  purpose: "Evaluates the believability and authenticity of data sources and participants"
  
  concept_explanation: "Source credibility examines whether the people providing data are who they claim to be, have relevant experience, and can provide authentic insights. It includes participant screening, recruitment quality, and potential biases in who participates."
  
  values:
    unknown:
      level: 1
      label: "Unknown/unverified"
      quality_signal: "VERY_LOW"
      description: "No verification of source identity or relevance"
      observable_signals:
        - "No screening or verification process"
        - "Anonymous responses with no context"
        - "Could be anyone, including bots"
      scenario_manifestation: "Online survey with no screening, responses could be from anyone or automated"
      real_example:
        context: "Public feedback form on website"
        observation: "Anonymous responses, some obvious spam, no way to verify if actual users"
        
    questionable:
      level: 2
      label: "Questionable sources"
      quality_signal: "LOW"
      description: "Sources may not represent target users or have conflicts"
      observable_signals:
        - "Friends and family as participants"
        - "Employees testing own product"
        - "Incentivized to give positive feedback"
      scenario_manifestation: "Team tests with internal employees who know the product roadmap"
      real_example:
        context: "Startup validation with team's network"
        observation: "Founder's friends testing app, obvious desire to be supportive rather than critical"
        
    acceptable:
      level: 3
      label: "Acceptable credibility"
      quality_signal: "MEDIUM"
      description: "Reasonable confidence in source authenticity and relevance"
      observable_signals:
        - "Basic screening for target criteria"
        - "Mix of recruited participants"
        - "Some verification of identity"
      scenario_manifestation: "Recruited users who match basic criteria, though not perfectly screened"
      real_example:
        context: "User panel participants"
        observation: "Screened for product usage, verified email, reasonable match to target audience"
        
    trusted:
      level: 4
      label: "Trusted sources"
      quality_signal: "HIGH"
      description: "Well-screened, verified participants matching target profiles"
      observable_signals:
        - "Thorough screening process"
        - "Verified target user characteristics"
        - "No conflicts of interest"
      scenario_manifestation: "Carefully screened participants matching exact persona criteria"
      real_example:
        context: "Enterprise software research"
        observation: "Verified job titles, company size, actual software users, behavioral screening passed"
        
    authoritative:
      level: 5
      label: "Authoritative sources"
      quality_signal: "VERY_HIGH"
      description: "Expert users or highly validated sources with deep domain knowledge"
      observable_signals:
        - "Subject matter experts"
        - "Power users with years of experience"
        - "Multiple validation of credentials"
      scenario_manifestation: "Industry experts with proven track record providing strategic insights"
      real_example:
        context: "Medical device expert review"
        observation: "Board-certified physicians with 10+ years using similar devices, published papers"
  
  scenario_generation:
    when_primary: "Detail participant background, screening process, potential biases"
    when_secondary: "Brief mention - 'verified users' or 'convenience sample'"
    avoid_combinations: ["Don't mix 'authoritative' sources with 'ad_hoc' collection"]
    realistic_pairings:
      high_quality: ["trusted sources + professional rigor + comprehensive data"]
      low_quality: ["questionable sources + informal collection + biased sample"]
      mixed_quality: ["authoritative sources + poor environment", "unknown sources + professional rigor"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Any + Patient safety"
        reason: "Need actual patients/clinicians, not proxies"
      - context: "B2B + Enterprise + Workflow changes"
        reason: "Need actual users who understand workflow impact"
    low_importance:
      - context: "Consumer + Startup + General usability"
        reason: "Basic usability issues visible with any users"
  
  recognition_patterns:
    obvious_indicators: ["Friends and family", "Anonymous responses", "Team members"]
    subtle_indicators: ["Professional participants over-familiar with research", "Recruitment bias"]
    misleading_indicators: ["Job title doesn't guarantee expertise in specific area"]
  
  relationships:
    reinforces: [source_expertise, sample_design, verification_level]
    tensions_with: [recruitment_timeline, budget_constraints]
    independent_of: [visual_design, narrative_flow]
```

---

## 4. Internal consistency

```yaml
internal_consistency:
  display_name: "Internal Consistency"
  competency: "Data Quality Assessment Recognition"
  family: "data_quality"
  
  purpose: "Detects contradictions, conflicts, and alignment within the dataset"
  
  concept_explanation: "Internal consistency examines whether different parts of the data tell the same story. Inconsistencies might indicate measurement problems, participant confusion, or real complexity. High consistency suggests reliable measurement; low consistency questions data validity."
  
  values:
    contradictory:
      level: 1
      label: "Contradictory/conflicting"
      quality_signal: "VERY_LOW"
      description: "Data points directly contradict each other"
      observable_signals:
        - "Same user gives opposite responses"
        - "Behavior contradicts stated preferences"
        - "Metrics show impossible patterns"
      scenario_manifestation: "Users rate feature 5/5 but nobody uses it, say it's intuitive but all fail"
      real_example:
        context: "Feature satisfaction survey"
        observation: "Users say they love the feature in survey, analytics shows 0% usage, interviews reveal confusion"
        
    conflicting:
      level: 2
      label: "Conflicting signals"
      quality_signal: "LOW"
      description: "Mixed messages that are hard to reconcile"
      observable_signals:
        - "Different methods show different results"
        - "Subgroups have opposing patterns"
        - "Qual and quant don't align"
      scenario_manifestation: "Survey shows high satisfaction, but interviews reveal frustration"
      real_example:
        context: "Product redesign research"
        observation: "A/B test shows worse performance, but qualitative feedback is positive"
        
    mostly_aligned:
      level: 3
      label: "Mostly aligned"
      quality_signal: "MEDIUM"
      description: "General agreement with explainable variations"
      observable_signals:
        - "Main patterns consistent"
        - "Minor variations have clear causes"
        - "Different methods generally agree"
      scenario_manifestation: "Most data points align, few outliers have reasonable explanations"
      real_example:
        context: "Usability testing results"
        observation: "8/10 users show similar patterns, 2 power users have different but explainable behavior"
        
    coherent:
      level: 4
      label: "Internally coherent"
      quality_signal: "HIGH"
      description: "All data points tell consistent story"
      observable_signals:
        - "Multiple data sources converge"
        - "Patterns hold across segments"
        - "Qual and quant strongly align"
      scenario_manifestation: "Task performance, satisfaction ratings, and comments all point same direction"
      real_example:
        context: "Design system evaluation"
        observation: "Task times improved, errors decreased, satisfaction increased, comments praise efficiency"
  
  scenario_generation:
    when_primary: "Show contrasting data points, highlight contradictions or alignment"
    when_secondary: "Brief note about whether findings align or conflict"
    avoid_combinations: ["'Coherent' data rarely comes from 'ad_hoc' collection"]
    realistic_pairings:
      high_quality: ["coherent data + professional rigor + triangulation"]
      low_quality: ["contradictory data + questionable sources + poor documentation"]
      mixed_quality: ["mostly aligned + good rigor", "coherent data + small sample"]
    
  contextual_weight:
    high_importance:
      - context: "Any + Any + Major decisions"
        reason: "Inconsistent data makes decisions risky"
      - context: "Fintech + Any + Financial calculations"
        reason: "Financial data must be internally consistent"
    low_importance:
      - context: "Any + Startup + Exploring problem space"
        reason: "Inconsistency might reveal opportunity"
  
  recognition_patterns:
    obvious_indicators: ["Say one thing, do another", "Numbers don't add up"]
    subtle_indicators: ["Satisfaction high but renewal low", "Praise feature but use workarounds"]
    misleading_indicators: ["Perfect consistency might indicate response bias"]
  
  relationships:
    reinforces: [data_completeness, triangulation, pattern_identification]
    tensions_with: [diverse_perspectives, complex_problems]
    independent_of: [polish_level, adaptation_timing]
```

---

## 5. Collection environment

```yaml
collection_environment:
  display_name: "Data Collection Environment"
  competency: "Data Quality Assessment Recognition"
  family: "data_quality"
  
  purpose: "Assesses whether physical and social environment enables or corrupts quality data collection"
  
  concept_explanation: "The collection environment encompasses all external factors during data gathering - physical space, technical setup, social dynamics, and interruptions. Even the best methodology can be undermined by a hostile environment, while a well-controlled environment enables authentic responses."
  
  values:
    hostile:
      level: 1
      label: "Actively hostile"
      quality_signal: "VERY_LOW"
      description: "Environment actively corrupts data through hostility or system failures"
      observable_signals:
        - "Participants angry about situation itself"
        - "Technical systems failing during collection"
        - "Researchers abandoning protocol due to chaos"
      scenario_manifestation: "Session degenerates into complaints about problems rather than feedback"
      real_example:
        context: "Testing during system outage"
        observation: "Users couldn't complete tasks due to crashes, sessions became venting about reliability"
        
    disruptive:
      level: 2
      label: "Significantly disruptive"
      quality_signal: "LOW"
      description: "Environment introduces noise and interruptions compromising quality"
      observable_signals:
        - "Multiple interruptions breaking flow"
        - "Background noise obscuring responses"
        - "Participants visibly distracted"
      scenario_manifestation: "Researchers struggle to hear responses, participants keep losing focus"
      real_example:
        context: "Coffee shop interviews"
        observation: "Espresso machine noise made recordings partially inaudible, participants kept checking phones"
        
    suboptimal:
      level: 3
      label: "Less than ideal"
      quality_signal: "MEDIUM"
      description: "Minor environmental issues requiring workarounds"
      observable_signals:
        - "Occasional interruptions managed well"
        - "Some constraints acknowledged in notes"
        - "Researchers successfully adapt"
      scenario_manifestation: "Team works around minor issues, maintains data quality despite constraints"
      real_example:
        context: "Conference room with some distractions"
        observation: "Closed doors when needed, repeated questions after interruptions, all critical data captured"
        
    controlled:
      level: 4
      label: "Well-controlled"
      quality_signal: "HIGH"
      description: "Environment supports quality data collection"
      observable_signals:
        - "Quiet, private space"
        - "Participants relaxed and focused"
        - "Technical setup working smoothly"
      scenario_manifestation: "Participants can think deeply and respond thoughtfully"
      real_example:
        context: "Dedicated research room"
        observation: "No interruptions, good recording quality, participants took time with responses"
        
    optimal:
      level: 5
      label: "Purpose-built optimal"
      quality_signal: "VERY_HIGH"
      description: "Environment specifically designed for research quality"
      observable_signals:
        - "Professional research facility"
        - "All environmental variables controlled"
        - "Participants comment on comfort"
      scenario_manifestation: "Environment actively enhances data quality through thoughtful design"
      real_example:
        context: "Usability lab setup"
        observation: "One-way mirror, perfect recording, comfortable seating, participants fully engaged"
  
  scenario_generation:
    when_primary: "Describe sounds, interruptions, space, technical issues, participant comfort in detail"
    when_secondary: "Brief environmental mention - 'quiet room' or 'busy office'"
    avoid_combinations: ["'Optimal' environment with 'ad_hoc' collection is unlikely"]
    realistic_pairings:
      high_quality: ["controlled environment + professional rigor + comprehensive data"]
      low_quality: ["disruptive environment + rushed timing + incomplete data"]
      mixed_quality: ["optimal environment + convenience sample", "hostile environment + structured protocol"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Any + Sensitive topics"
        reason: "Privacy and comfort essential for health discussions"
      - context: "Any + Any + Think-aloud protocol"
        reason: "Need quiet environment to hear verbalization"
    low_importance:
      - context: "Retail + Any + Contextual inquiry"
        reason: "Natural environment noise is part of context"
  
  recognition_patterns:
    obvious_indicators: ["Can't hear responses", "System crashes", "Participants leave early"]
    subtle_indicators: ["Shortened responses", "Body language shows discomfort", "Researchers rush"]
    misleading_indicators: ["Fancy lab doesn't guarantee good environment if intimidating"]
  
  relationships:
    reinforces: [collection_rigor, data_completeness, documentation_quality]
    tensions_with: [budget_constraints, timeline_pressure, natural_context]
    independent_of: [method_fit, statistical_rigor]
```

---

## Usage notes for LLM scenario generation

### When generating scenarios:

1. **Select 3-4 variables** from this competency as primary focus
2. **Choose quality levels** that create realistic combinations (use the realistic_pairings guidance)
3. **Embed observable_signals** naturally in the scenario narrative
4. **Use scenario_manifestation** as inspiration for how to present the pattern
5. **Reference real_examples** to ground scenarios in realistic situations
6. **Consider contextual_weight** based on the configuration (industry/stage/pressure)

### Quality profile generation:
- **All high**: All variables at levels 4-5
- **All low**: All variables at levels 1-2  
- **Mixed**: Realistic combination of high and low
- **Mostly high**: One variable low, rest high
- **Mostly low**: One variable high, rest low

### Example scenario prompt:
"Generate a scenario with:
- collection_rigor: informal (level 2)
- data_completeness: comprehensive (level 4)
- source_credibility: questionable (level 2)
This creates an interesting pattern where lots of data was collected but methodology and sources are problematic."