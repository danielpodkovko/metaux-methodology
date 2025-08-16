# Micro-Competency Variables Validation - Foundational Tier (REVISED)

## Variable Design Principles - UPDATED
- **Core Variables Only**: 3-4 essential variables per micro-competency
- **Relationship Metadata**: Variables tagged with attractions/repulsions
- **Variable Families**: Natural groupings for coherent scenarios
- **Dynamic Activation**: AI selects based on learning goals and coherence

---

## 1. SIGNAL VS NOISE DETECTION

### Statistical Pattern Validity Recognition
**Purpose**: Distinguish genuine statistical significance from random correlation

#### Core Variables (4):
```yaml
sample_size:
  values: [tiny_n<10, small_n<30, moderate_n<100, large_n<1000, massive_n>1000]
  tags: [statistical, validity]
  attracts: [confidence_indicators, study_design]
  
effect_magnitude:
  values: [negligible_<5%, small_5-15%, moderate_15-30%, large_30-50%, dramatic_>50%]
  tags: [statistical, impact]
  relationship: inverse_with_sample_size  # Large effects need smaller samples
  
confidence_indicators:
  values: [no_info, p_values_only, confidence_intervals, full_context]
  tags: [statistical, transparency]
  attracts: [study_design, sample_size]
  
study_design:
  values: [anecdotal, observational_biased, observational_controlled, experimental]
  tags: [methodology, validity]
  locks_when: [sample_size = tiny]  # Can't have tiny experimental
```

**Variable Family**: `statistical_validity`
**Coherence Rule**: `tiny sample + dramatic effect + no_info = RED FLAG scenario`

---

### Behavioral Pattern Consistency Recognition
**Purpose**: Identify repeated user behaviors vs one-off actions

#### Core Variables (3):
```yaml
occurrence_frequency:
  values: [single, sporadic, regular, frequent, constant]
  tags: [temporal, pattern]
  attracts: [user_diversity, temporal_consistency]
  
user_diversity:
  values: [single_user, same_segment, cross_segment, majority_users]
  tags: [reach, validity]
  locks_when: [occurrence = single]  # Single can't be diverse
  
temporal_consistency:
  values: [one_time_spike, irregular, seasonal, steady, growing]
  tags: [temporal, pattern]
  attracts: [occurrence_frequency]
```

**Variable Family**: `behavior_patterns`

---

### Data Outlier Assessment Recognition
**Purpose**: Recognize when outliers represent important edge cases vs noise

#### Core Variables (3):
```yaml
deviation_magnitude:
  values: [slight_1-2σ, moderate_2-3σ, significant_3-5σ, extreme_>5σ]
  tags: [statistical, anomaly]
  
outlier_frequency:
  values: [unique, rare_<1%, occasional_1-5%, regular_>5%]
  tags: [pattern, frequency]
  repels: [extreme_deviation]  # Extreme rarely regular
  
business_impact:
  values: [negligible, minor, moderate, significant, critical]
  tags: [business, priority]
  attracts: [user_segment_type]
```

---

## 2. CONTEXT RECOGNITION

### Industry Context Pattern Recognition
**Purpose**: Understand how industry shapes research needs

#### Core Variables (4):
```yaml
regulatory_intensity:
  values: [unregulated, light, standard, heavy, critical]
  tags: [industry, compliance]
  attracts: [risk_tolerance, decision_speed]
  repels: [fail_fast_approaches]
  
industry_maturity:
  values: [emerging, growth, competitive, mature, declining]
  tags: [industry, lifecycle]
  attracts: [user_sophistication, innovation_appetite]
  
risk_tolerance:
  values: [fail_fast, innovation_friendly, balanced, risk_averse, zero_failure]
  tags: [culture, decision]
  locks_when: [regulatory = critical, must_be = risk_averse OR zero_failure]
  
user_sophistication:
  values: [consumer, prosumer, professional, specialist, expert]
  tags: [audience, expertise]
```

**Variable Family**: `industry_context`
**Coherence Rule**: `critical regulation + fail_fast = INVALID combination`

---

### Business Model Context Recognition
**Purpose**: Recognize how business model affects priorities

#### Core Variables (3):
```yaml
revenue_model:
  values: [freemium, subscription, transactional, enterprise, marketplace]
  tags: [business, monetization]
  attracts: [customer_value, acquisition_cost]
  
customer_lifetime_value:
  values: [minimal_<$100, moderate_<$1K, high_<$10K, enterprise_>$10K]
  tags: [business, metrics]
  relationship: typically_correlates_with_acquisition_cost
  
growth_stage:
  values: [pre_revenue, early_revenue, growth_focus, efficiency_focus]
  tags: [business, lifecycle]
  attracts: [resource_availability, risk_tolerance]
```

**Variable Family**: `business_model`

---

### Organizational Culture Context Recognition
**Purpose**: Adapt to organizational values and practices

#### Core Variables (4):
```yaml
decision_style:
  values: [founder_driven, consensus, data_driven, hierarchical]
  tags: [organizational, process]
  attracts: [evidence_culture, speed_preference]
  
speed_vs_quality:
  values: [ship_iterate, rapid, balanced, quality_first, perfection]
  tags: [culture, priority]
  repels: [heavy_regulation]  # Perfection rarely with heavy regulation
  
failure_tolerance:
  values: [celebrate_failure, learn_from, cautious, avoided, punished]
  tags: [culture, risk]
  locks_when: [regulatory = critical, cannot_be = celebrate]
  
innovation_appetite:
  values: [bleeding_edge, early_adopter, fast_follower, traditional]
  tags: [culture, change]
```

**Variable Family**: `org_culture`

---

## 3. CONSTRAINTS RECOGNITION

### Resource Constraint Assessment Recognition
**Purpose**: Match scope to available resources

#### Core Variables (3):
```yaml
budget_availability:
  values: [zero, shoestring_<$1K, limited_<$5K, moderate_<$20K, comfortable_>$20K]
  tags: [resource, financial]
  attracts: [team_capacity, tool_availability]
  
time_availability:
  values: [hours, days, one_week, two_weeks, month_plus]
  tags: [resource, temporal]
  attracts: [method_options, sample_size_possible]
  
team_capacity:
  values: [solo_part_time, solo_full, small_team, full_team]
  tags: [resource, human]
  locks_when: [budget = zero, must_be = solo]
```

**Variable Family**: `resource_constraints`

---

### Timeline Constraint Optimization Recognition
**Purpose**: Maximize value within deadlines

#### Core Variables (3):
```yaml
deadline_flexibility:
  values: [fixed_unmovable, slightly_negotiable, flexible, open_ended]
  tags: [temporal, constraint]
  
deadline_proximity:
  values: [immediate_<24hr, urgent_3days, short_1week, moderate_1month]
  tags: [temporal, pressure]
  repels: [comprehensive_research, large_samples]
  
stakeholder_patience:
  values: [need_yesterday, impatient, deadline_focused, quality_aware]
  tags: [stakeholder, expectation]
  attracts: [evidence_culture, decision_style]
```

**Variable Family**: `timeline_pressure`

---

## 4. QUALITY RECOGNITION

### Data Quality Assessment Recognition
**Purpose**: Sense data reliability

#### Core Variables (4):
```yaml
collection_rigor:
  values: [ad_hoc, informal, structured, professional, research_grade]
  tags: [methodology, quality]
  attracts: [source_credibility, consistency]
  
data_completeness:
  values: [sparse_gaps, significant_missing, mostly_complete, comprehensive]
  tags: [quality, coverage]
  
source_credibility:
  values: [unknown, questionable, acceptable, trusted, authoritative]
  tags: [quality, trust]
  
internal_consistency:
  values: [contradictory, conflicting, mostly_aligned, coherent]
  tags: [quality, validity]
```

**Variable Family**: `data_quality`

---

### Insight Quality Recognition
**Purpose**: Distinguish actionable insights from observations

#### Core Variables (4):
```yaml
specificity:
  values: [vague, somewhat_specific, clear, precise_actionable]
  tags: [quality, clarity]
  attracts: [evidence_support, actionability]
  
evidence_support:
  values: [no_evidence, anecdotal, some_data, well_supported, triangulated]
  tags: [quality, validity]
  
actionability:
  values: [interesting_only, somewhat_useful, actionable, immediately_implementable]
  tags: [quality, utility]
  
impact_potential:
  values: [trivial, minor, moderate, significant, transformational]
  tags: [business, value]
  attracts: [stakeholder_buy_in, resource_allocation]
```

**Variable Family**: `insight_quality`

---

## Compatibility Rules System

### Global Compatibility Rules:
```yaml
compatibility_rules:
  - name: "Startup Context"
    when: growth_stage = pre_revenue OR early_revenue
    then:
      budget: [zero, shoestring, limited]
      decision_style: [founder_driven, consensus]
      speed: [ship_iterate, rapid]
      
  - name: "Enterprise Context"  
    when: revenue_model = enterprise
    then:
      customer_value: [high, enterprise]
      decision_style: [hierarchical, committee]
      timeline: [moderate, quarterly]
      
  - name: "Regulated Industry"
    when: regulatory_intensity >= heavy
    then:
      risk_tolerance: [risk_averse, zero_failure]
      evidence_culture: [data_preferred, data_mandatory]
      speed: [quality_first, perfection]
      
  - name: "Crisis Mode"
    when: deadline_proximity = immediate OR urgent
    then:
      method_options: [limited, quick_dirty]
      sample_size: [tiny, small]
      quality_tradeoffs: [accepted]
```

### Variable Families for Coherent Scenarios:
```yaml
scenario_families:
  startup_hustle:
    core: [pre_revenue, shoestring, ship_iterate]
    compatible: [founder_driven, fail_fast, small_team]
    incompatible: [heavy_regulation, perfection, hierarchical]
    
  enterprise_rigor:
    core: [enterprise_model, comfortable_budget, hierarchical]
    compatible: [quality_first, full_team, quarterly_planning]
    incompatible: [ship_iterate, solo_work, daily_changes]
    
  regulatory_compliance:
    core: [heavy_regulation, risk_averse, evidence_mandatory]
    compatible: [professional_grade, comprehensive_data, careful]
    incompatible: [ad_hoc, fail_fast, shortcuts]
```

---

## Validation Results - REVISED

### ✅ **Improvements Made**
1. **Reduced to 3-4 variables** per micro-competency (from 5-6)
2. **Added relationship metadata** (attracts, repels, locks_when)
3. **Defined variable families** for coherent grouping
4. **Created compatibility rules** to prevent nonsensical combinations

### 📊 **Final Count**
- **4 Macro-competencies** validated
- **10 Micro-competencies** defined
- **35 Variables total** (average 3.5 per micro)
- **4 Variable families** identified
- **4 Global compatibility rules** established

### 🎯 **Coherence Example**
```yaml
# Coherent Scenario Generation
User struggling with: regulatory contexts
Learning Goal: Master heavy regulation patterns

Activated Variables:
- regulatory_intensity: heavy ✓
- risk_tolerance: risk_averse ✓ (attracted)
- evidence_culture: data_mandatory ✓ (attracted)
- speed_vs_quality: quality_first ✓ (compatible)

Disabled Variables:
- innovation_appetite: bleeding_edge ✗ (repelled)
- failure_tolerance: celebrate ✗ (locked)
- timeline: immediate ✗ (incompatible)

Coherence Score: 94% (highly realistic scenario)
```

### 🚀 **Ready for Scale**
This approach is now ready to scale to all 102 micro-competencies:
- Clear structure for variable definition
- Relationship system prevents impossible combinations
- Variable families enable coherent scenario generation
- AI has enough breadcrumbs to create personalized, realistic training