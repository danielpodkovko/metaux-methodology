# Insight quality recognition - variable definitions

**Date**: September 06, 2025  
**Competency**: Insight Quality Recognition  
**Purpose**: Detailed variable definitions for scenario generation

---

## 1. Actionability

```yaml
actionability:
  display_name: "Insight Actionability"
  competency: "Insight Quality Recognition"
  family: "insight_quality"
  
  purpose: "Measures how directly insights translate into specific actions or decisions"
  
  concept_explanation: "Actionability determines whether insights lead to clear next steps or remain abstract observations. The best insights don't just describe problems but point to solutions. Vague insights like 'improve user experience' waste time, while specific insights like 'move payment button above fold' drive immediate action."
  
  values:
    useless:
      level: 1
      label: "No actionable content"
      quality_signal: "VERY_LOW"
      description: "Insights that lead nowhere"
      observable_signals:
        - "Generic observations anyone could make"
        - "No clear next steps"
        - "Circular reasoning"
      scenario_manifestation: "Research concludes 'users want better experience' with no specifics"
      real_example:
        context: "Website redesign research"
        observation: "Final insight: 'Make it more user-friendly' - team has no idea what to actually do"
        
    vague_direction:
      level: 2
      label: "Vague directional guidance"
      quality_signal: "LOW"
      description: "Points generally but lacks specificity"
      observable_signals:
        - "Broad suggestions without detail"
        - "Multiple interpretations possible"
        - "Requires significant translation"
      scenario_manifestation: "Suggests 'simplify the process' without identifying what to simplify"
      real_example:
        context: "Checkout optimization"
        observation: "Insight: 'Reduce friction' - but which friction points? How?"
        
    somewhat_actionable:
      level: 3
      label: "Somewhat actionable"
      quality_signal: "MEDIUM"
      description: "Clear direction but needs interpretation"
      observable_signals:
        - "Identifies what but not how"
        - "Requires some planning to implement"
        - "General approach clear"
      scenario_manifestation: "Points to problem areas with general solution direction"
      real_example:
        context: "Onboarding flow"
        observation: "Users confused by step 3 terminology - need clearer language"
        
    clear_actions:
      level: 4
      label: "Clear action items"
      quality_signal: "HIGH"
      description: "Specific actions with clear implementation path"
      observable_signals:
        - "Specific what and how"
        - "Clear priority and sequence"
        - "Measurable outcomes"
      scenario_manifestation: "Detailed recommendations with implementation guidance"
      real_example:
        context: "Form optimization"
        observation: "Move email field to top, add inline validation, change button text to 'Continue'"
        
    immediately_implementable:
      level: 5
      label: "Ready to implement"
      quality_signal: "VERY_HIGH"
      description: "So specific that teams can start immediately"
      observable_signals:
        - "Includes specifications"
        - "Priority and effort estimated"
        - "Success metrics defined"
      scenario_manifestation: "Insights include mockups, copy, and implementation plan"
      real_example:
        context: "Error message improvement"
        observation: "Replace 'Error 403' with 'You need to log in first. [Login button]' - mockup and A/B test plan included"
  
  scenario_generation:
    when_primary: "Show the insights/recommendations and their specificity level"
    when_secondary: "Mention whether findings lead to clear next steps"
    avoid_combinations: ["'immediately_implementable' rarely comes from 'ad_hoc' research"]
    realistic_pairings:
      high_quality: ["clear actions + strong evidence + specific details"]
      low_quality: ["useless insights + weak evidence + generic language"]
      mixed_quality: ["somewhat actionable + good research"]
    
  contextual_weight:
    high_importance:
      - context: "Any + Sprint planning"
        reason: "Team needs specific tasks for next sprint"
      - context: "Startup + Limited resources"
        reason: "Can't afford to interpret vague guidance"
    low_importance:
      - context: "Any + Strategic planning"
        reason: "High-level direction valuable even if not specific"
  
  recognition_patterns:
    obvious_indicators: ["Users want it better", "Improve the experience"]
    subtle_indicators: ["Missing the 'how'", "Multiple possible interpretations"]
    misleading_indicators: ["Long recommendations aren't necessarily actionable"]
  
  relationships:
    reinforces: [specificity, evidence_support, analytical_depth]
    tensions_with: [scope_creep, over_simplification]
    independent_of: [collection_environment, visual_design]
```

---

## 2. Specificity

```yaml
specificity:
  display_name: "Insight Specificity"
  competency: "Insight Quality Recognition"
  family: "insight_quality"
  
  purpose: "Evaluates the precision and detail level of insights"
  
  concept_explanation: "Specificity separates meaningful insights from generic observations. Specific insights name exact problems, identify precise user groups, and pinpoint particular solutions. Generic insights could apply to any product; specific insights only fit this exact situation."
  
  values:
    generic_platitudes:
      level: 1
      label: "Generic platitudes"
      quality_signal: "VERY_LOW"
      description: "Could apply to literally any product"
      observable_signals:
        - "Users want easy to use"
        - "Speed is important"
        - "People like nice design"
      scenario_manifestation: "Insights that sound like fortune cookies"
      real_example:
        context: "Mobile app research"
        observation: "Key finding: 'Users prefer apps that work well'"
        
    broad_statements:
      level: 2
      label: "Broad generalizations"
      quality_signal: "LOW"
      description: "Some relevance but overly general"
      observable_signals:
        - "Category-level observations"
        - "Missing crucial details"
        - "No user segmentation"
      scenario_manifestation: "Talks about 'users' as monolithic group"
      real_example:
        context: "Feature research"
        observation: "Users find the navigation confusing' - but which users? Which navigation? How?"
        
    focused:
      level: 3
      label: "Focused insights"
      quality_signal: "MEDIUM"
      description: "Specific to product but lacks detail"
      observable_signals:
        - "Names specific features"
        - "Identifies user segments"
        - "Some quantification"
      scenario_manifestation: "Points to specific areas with moderate detail"
      real_example:
        context: "Dashboard study"
        observation: "New users can't find export button in reports section"
        
    precise:
      level: 4
      label: "Precise details"
      quality_signal: "HIGH"
      description: "Exact problems with specific contexts"
      observable_signals:
        - "Specific user quotes"
        - "Exact failure points"
        - "Quantified impacts"
      scenario_manifestation: "Names exact issues with supporting details"
      real_example:
        context: "Checkout analysis"
        observation: "67% abandon at shipping calculation when $12+ appears after free shipping promise"
        
    laser_targeted:
      level: 5
      label: "Laser-targeted precision"
      quality_signal: "VERY_HIGH"
      description: "Exhaustive specificity with complete context"
      observable_signals:
        - "Exact conditions and triggers"
        - "Specific user segments and contexts"
        - "Precise recommendations"
      scenario_manifestation: "Could only apply to this exact situation"
      real_example:
        context: "Error recovery study"
        observation: "Enterprise admins using SSO get stuck in login loop when session expires during bulk upload - occurs in Chrome 119+ with 2FA enabled"
  
  scenario_generation:
    when_primary: "Show the actual insights with their level of detail"
    when_secondary: "Indicate whether insights are specific or general"
    avoid_combinations: ["'laser_targeted' with 'sparse data' is unlikely"]
    realistic_pairings:
      high_quality: ["precise specificity + strong evidence + clear patterns"]
      low_quality: ["generic platitudes + weak methodology"]
      mixed_quality: ["focused insights + limited sample"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Safety-critical features"
        reason: "Vague insights could miss critical safety issues"
      - context: "Fintech + Compliance requirements"
        reason: "Regulators need specific details"
    low_importance:
      - context: "Startup + Early exploration"
        reason: "Even broad insights valuable when starting"
  
  recognition_patterns:
    obvious_indicators: ["Users want", "People prefer", "Everyone likes"]
    subtle_indicators: ["Missing quantification", "No user segmentation", "Vague terms"]
    misleading_indicators: ["Technical jargon doesn't mean specific"]
  
  relationships:
    reinforces: [actionability, evidence_support, pattern_identification]
    tensions_with: [oversimplification, scope_limitations]
    independent_of: [collection_rigor, environment_quality]
```

---

## 3. Evidence support

```yaml
evidence_support:
  display_name: "Evidence Support"
  competency: "Insight Quality Recognition"
  family: "insight_quality"
  
  purpose: "Assesses whether insights are backed by solid evidence or speculation"
  
  concept_explanation: "Evidence support determines whether insights rest on solid data or shaky assumptions. Strong insights trace directly to observed behaviors, quotes, and metrics. Weak insights involve leaps of logic, assumptions, and 'probably' statements. Evidence is the foundation of trustworthy insights."
  
  values:
    unsupported:
      level: 1
      label: "Pure speculation"
      quality_signal: "VERY_LOW"
      description: "No evidence, just opinions"
      observable_signals:
        - "I think users probably..."
        - "No data referenced"
        - "Personal assumptions"
      scenario_manifestation: "Insights based on what team thinks users want"
      real_example:
        context: "Feature prioritization"
        observation: "PM claims 'users will love this' based on gut feeling, no research done"
        
    weak_evidence:
      level: 2
      label: "Minimal evidence"
      quality_signal: "LOW"
      description: "Single data point or anecdote"
      observable_signals:
        - "One user said..."
        - "Cherry-picked examples"
        - "Correlation assumed as causation"
      scenario_manifestation: "Entire strategy based on one customer complaint"
      real_example:
        context: "Redesign decision"
        observation: "CEO's friend couldn't find button, entire nav restructured"
        
    reasonable_support:
      level: 3
      label: "Reasonable evidence"
      quality_signal: "MEDIUM"
      description: "Multiple data points support claim"
      observable_signals:
        - "Several examples cited"
        - "Pattern across participants"
        - "Some quantification"
      scenario_manifestation: "Insight supported by consistent observations"
      real_example:
        context: "Usability finding"
        observation: "6 of 10 users struggled with same task, quotes provided"
        
    strong_evidence:
      level: 4
      label: "Strong evidence base"
      quality_signal: "HIGH"
      description: "Multiple sources converge on insight"
      observable_signals:
        - "Qualitative and quantitative alignment"
        - "Multiple methods confirm"
        - "Statistical significance"
      scenario_manifestation: "Triangulated evidence from different sources"
      real_example:
        context: "Conversion optimization"
        observation: "Analytics show 47% drop, heatmaps confirm, 8/10 users verbalized confusion"
        
    overwhelming_proof:
      level: 5
      label: "Overwhelming evidence"
      quality_signal: "VERY_HIGH"
      description: "Incontrovertible multi-source proof"
      observable_signals:
        - "Every data source confirms"
        - "No contradicting evidence"
        - "Causal relationship clear"
      scenario_manifestation: "Evidence so strong that no alternative explanation exists"
      real_example:
        context: "Critical bug impact"
        observation: "100% failure rate, error logs confirm, user recordings show exact issue, support tickets align"
  
  scenario_generation:
    when_primary: "Show what evidence supports (or doesn't support) the insights"
    when_secondary: "Mention strength of evidence briefly"
    avoid_combinations: ["'overwhelming_proof' from 'convenience sample' is suspect"]
    realistic_pairings:
      high_quality: ["strong evidence + rigorous methodology + multiple sources"]
      low_quality: ["unsupported claims + no research"]
      mixed_quality: ["reasonable support + small sample"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Treatment decisions"
        reason: "Lives depend on evidence-based decisions"
      - context: "Enterprise + Major investment"
        reason: "Big bets need solid evidence"
    low_importance:
      - context: "Startup + Rapid experimentation"
        reason: "Can test assumptions quickly and cheaply"
  
  recognition_patterns:
    obvious_indicators: ["We think", "Probably", "No data but..."]
    subtle_indicators: ["Single source", "Outlier treated as norm", "Missing contradicting data"]
    misleading_indicators: ["Confidence doesn't equal evidence"]
  
  relationships:
    reinforces: [triangulation, data_completeness, analytical_depth]
    tensions_with: [time_pressure, limited_access]
    independent_of: [visual_design, narrative_flow]
```

---

## 4. Novelty value

```yaml
novelty_value:
  display_name: "Insight Novelty"
  competency: "Insight Quality Recognition"
  family: "insight_quality"
  
  purpose: "Evaluates whether insights reveal new understanding or confirm known issues"
  
  concept_explanation: "Novelty value determines if research money was well spent. Novel insights change thinking, reveal hidden problems, or unlock new opportunities. Obvious insights waste resources confirming what everyone knew. The best insights make stakeholders say 'we never realized that!'"
  
  values:
    obvious_known:
      level: 1
      label: "Stating the obvious"
      quality_signal: "VERY_LOW"
      description: "Everyone already knew this"
      observable_signals:
        - "Stakeholders say 'we know'"
        - "Common sense findings"
        - "No surprise to anyone"
      scenario_manifestation: "Research confirms water is wet"
      real_example:
        context: "E-commerce study"
        observation: "Key finding: Users want free shipping - something company knew for years"
        
    confirming:
      level: 2
      label: "Confirming assumptions"
      quality_signal: "LOW"
      description: "Validates what was suspected"
      observable_signals:
        - "As expected..."
        - "Confirms our hypothesis"
        - "No surprises"
      scenario_manifestation: "Research proves what team assumed"
      real_example:
        context: "Mobile app study"
        observation: "Confirmed: younger users prefer mobile over desktop"
        
    incremental:
      level: 3
      label: "Incremental insights"
      quality_signal: "MEDIUM"
      description: "Adds nuance to known issues"
      observable_signals:
        - "Deeper understanding"
        - "New details on known problems"
        - "Unexpected variations"
      scenario_manifestation: "Known problem but new contributing factors discovered"
      real_example:
        context: "Cart abandonment"
        observation: "Known issue but discovered it's specifically shipping calculator timing"
        
    revealing:
      level: 4
      label: "Revealing discoveries"
      quality_signal: "HIGH"
      description: "Uncovers hidden patterns"
      observable_signals:
        - "We never realized..."
        - "Counterintuitive finding"
        - "Hidden connection revealed"
      scenario_manifestation: "Unexpected insight changes team's understanding"
      real_example:
        context: "Feature usage study"
        observation: "Power users avoiding advanced features due to fear of breaking workflows"
        
    paradigm_shifting:
      level: 5
      label: "Paradigm shifting"
      quality_signal: "VERY_HIGH"
      description: "Completely changes understanding"
      observable_signals:
        - "Challenges fundamental assumptions"
        - "Opens new opportunity space"
        - "Changes entire strategy"
      scenario_manifestation: "Insight that revolutionizes approach"
      real_example:
        context: "User segmentation study"
        observation: "Discovered primary users are IT admins buying for others, not end users - entire product strategy shifts"
  
  scenario_generation:
    when_primary: "Emphasize stakeholder reactions to insights"
    when_secondary: "Mention whether findings were surprising"
    avoid_combinations: ["'paradigm_shifting' rarely comes from small studies"]
    realistic_pairings:
      high_quality: ["revealing insights + deep analysis + diverse methods"]
      low_quality: ["obvious findings + surface-level research"]
      mixed_quality: ["incremental insights + solid methodology"]
    
  contextual_weight:
    high_importance:
      - context: "Any + Mature product"
        reason: "After years, need fresh insights to improve"
      - context: "Enterprise + Innovation initiatives"
        reason: "Looking for breakthrough opportunities"
    low_importance:
      - context: "Startup + Initial validation"
        reason: "Even confirming basics is valuable early"
  
  recognition_patterns:
    obvious_indicators: ["Everyone knows", "As expected", "No surprises"]
    subtle_indicators: ["Predictable findings", "Safe conclusions", "Nothing challenged"]
    misleading_indicators: ["Surprising doesn't mean valuable"]
  
  relationships:
    reinforces: [analytical_depth, pattern_identification, triangulation]
    tensions_with: [confirmation_bias, safe_research]
    independent_of: [protocol_consistency, environment_quality]
```

---

## 5. Confidence calibration

```yaml
confidence_calibration:
  display_name: "Confidence Calibration"
  competency: "Insight Quality Recognition"
  family: "insight_quality"
  
  purpose: "Assesses whether confidence in insights matches the strength of evidence"
  
  concept_explanation: "Confidence calibration prevents both over-confident decisions based on weak data and under-confident hesitation despite strong evidence. Well-calibrated insights acknowledge limitations, quantify uncertainty, and match claims to proof. Poor calibration leads to bad bets or missed opportunities."
  
  values:
    reckless_certainty:
      level: 1
      label: "Recklessly certain"
      quality_signal: "VERY_LOW"
      description: "Extreme confidence from minimal data"
      observable_signals:
        - "This definitely proves..."
        - "All users want..."
        - "No caveats despite small sample"
      scenario_manifestation: "N=3 presented as universal truth"
      real_example:
        context: "Product pivot decision"
        observation: "Three customer interviews lead to 'We must completely change direction!'"
        
    overconfident:
      level: 2
      label: "Overconfident claims"
      quality_signal: "LOW"
      description: "Confidence exceeds evidence"
      observable_signals:
        - "Probably becomes definitely"
        - "Missing confidence intervals"
        - "Ignoring contradictions"
      scenario_manifestation: "Strong claims from moderate evidence"
      real_example:
        context: "Feature success prediction"
        observation: "Limited testing but claiming 'This will double engagement'"
        
    appropriate:
      level: 3
      label: "Appropriate confidence"
      quality_signal: "MEDIUM"
      description: "Claims match evidence strength"
      observable_signals:
        - "Qualifiers where needed"
        - "Limitations acknowledged"
        - "Confidence intervals provided"
      scenario_manifestation: "Strong claims for strong evidence, tentative for weak"
      real_example:
        context: "Usability findings"
        observation: "High confidence in observed issues, tentative about causes"
        
    cautious:
      level: 4
      label: "Appropriately cautious"
      quality_signal: "HIGH"
      description: "Conservative interpretation of data"
      observable_signals:
        - "Multiple interpretations considered"
        - "Edge cases acknowledged"
        - "Further validation suggested"
      scenario_manifestation: "Even strong patterns presented with appropriate caveats"
      real_example:
        context: "A/B test results"
        observation: "Significant result but notes: seasonal factors, needs longer test"
        
    precisely_calibrated:
      level: 5
      label: "Precisely calibrated"
      quality_signal: "VERY_HIGH"
      description: "Perfect match between evidence and confidence"
      observable_signals:
        - "Quantified uncertainty"
        - "Bayesian thinking evident"
        - "Graduated confidence levels"
      scenario_manifestation: "Different confidence levels for different aspects"
      real_example:
        context: "Comprehensive study"
        observation: "95% confident in problem identification, 70% in root cause, 60% in solution effectiveness"
  
  scenario_generation:
    when_primary: "Show how insights are presented with their confidence levels"
    when_secondary: "Mention whether claims match evidence"
    avoid_combinations: ["'precisely_calibrated' with 'weak evidence' doesn't work"]
    realistic_pairings:
      high_quality: ["appropriate confidence + strong evidence + acknowledged limits"]
      low_quality: ["reckless certainty + minimal data"]
      mixed_quality: ["cautious interpretation + solid evidence"]
    
  contextual_weight:
    high_importance:
      - context: "Healthcare + Clinical decisions"
        reason: "Overconfidence can harm patients"
      - context: "Fintech + Risk assessment"
        reason: "Need accurate confidence for risk models"
    low_importance:
      - context: "Startup + Fast iteration"
        reason: "Can quickly test and adjust if wrong"
  
  recognition_patterns:
    obvious_indicators: ["Definitely from n=5", "All users", "Guaranteed results"]
    subtle_indicators: ["Missing error bars", "No alternative explanations", "Too clean"]
    misleading_indicators: ["Hedging doesn't mean weak evidence"]
  
  relationships:
    reinforces: [evidence_support, statistical_rigor, bias_management]
    tensions_with: [stakeholder_pressure, simplification_needs]
    independent_of: [collection_environment, visual_design]
```

---

## Usage notes for scenario generation

### When using Insight Quality variables:

1. **Show the actual insights** - Don't just describe them, quote them
2. **Include stakeholder reactions** - "The team was surprised..." or "CEO said 'we knew this'"
3. **Connect to decisions** - Show how insights do (or don't) drive action
4. **Layer evidence** - Show what supports each claim
5. **Reveal confidence through language** - "Definitely" vs "suggests" vs "might indicate"

### Progressive complexity:
- **Beginner**: Focus on actionability alone
- **Intermediate**: Actionability + evidence support
- **Advanced**: All five variables creating nuanced patterns

### Example combination:
```yaml
Scenario with:
- actionability: vague_direction ("improve flow")
- specificity: generic_platitudes ("users want easier")
- evidence_support: weak ("one user mentioned")
- novelty: obvious_known ("users like speed")
- confidence: overconfident ("this will transform experience")

Creates: "Weak insights presented as game-changing discoveries"
```