# Quality recognition micro-competency variables

**Date**: September 06, 2025  
**Status**: Variable identification phase (Complete with additions)

---

## Macro-competency: Quality Recognition

### 1. Data quality assessment recognition
**Purpose**: Sense data reliability
#### Core variables (5):
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
  
collection_environment:  # NEW - critical for quality
  values: [hostile, disruptive, suboptimal, controlled, optimal]
  tags: [quality, context]
```
**Variable family**: `data_quality`

---

### 2. Methodological rigor recognition
**Purpose**: Recognize research process validity
#### Core variables (5):
```yaml
method_fit:
  values: [mismatched, loosely_related, appropriate, optimal, precisely_targeted]
  tags: [methodology, validity]
  attracts: [sample_design, control_measures]
  
sample_design:
  values: [convenience, biased, acceptable, representative, statistically_powered]
  tags: [methodology, validity]
  
control_measures:
  values: [uncontrolled, minimal, standard, rigorous, laboratory_grade]
  tags: [methodology, quality]
  
protocol_consistency:
  values: [chaotic, variable, mostly_consistent, standardized, strict_adherence]
  tags: [methodology, reliability]
  
research_timing:  # NEW - when research happens matters
  values: [invalidating, poor, acceptable, natural, optimal]
  tags: [methodology, context]
```
**Variable family**: `methodological_rigor`

---

### 3. Analysis quality recognition
**Purpose**: Identify thorough vs superficial analysis
#### Core variables (5):
```yaml
analytical_depth:
  values: [surface_only, basic, thorough, comprehensive, exhaustive]
  tags: [analysis, quality]
  attracts: [pattern_identification, statistical_rigor]
  
bias_management:
  values: [amplified_bias, unaware, acknowledged, controlled, eliminated]
  tags: [analysis, validity]
  
pattern_identification:
  values: [missed_obvious, basic_patterns, solid_recognition, nuanced, expert_level]
  tags: [analysis, insight]
  
statistical_rigor:
  values: [inappropriate, questionable, acceptable, solid, bulletproof]
  tags: [analysis, validity]
  
triangulation:  # NEW - multiple data sources crucial for analysis
  values: [single_source, limited, multiple, comprehensive, exhaustive]
  tags: [analysis, validation]
```
**Variable family**: `analysis_quality`

---

### 4. Insight quality recognition
**Purpose**: Distinguish actionable insights from vague observations
#### Core variables (5):
```yaml
actionability:
  values: [useless, vague_direction, somewhat_actionable, clear_actions, immediately_implementable]
  tags: [insight, utility]
  attracts: [specificity, evidence_support]
  
specificity:
  values: [generic_platitudes, broad_statements, focused, precise, laser_targeted]
  tags: [insight, clarity]
  
evidence_support:
  values: [unsupported, weak_evidence, reasonable_support, strong_evidence, overwhelming_proof]
  tags: [insight, validity]
  
novelty_value:
  values: [obvious_known, confirming, incremental, revealing, paradigm_shifting]
  tags: [insight, impact]
  
confidence_calibration:  # NEW - critical for decision-making
  values: [reckless_certainty, overconfident, appropriate, cautious, precisely_calibrated]
  tags: [insight, reliability]
```
**Variable family**: `insight_quality`

---

### 5. Communication quality recognition
**Purpose**: Recognize effective vs obscured findings presentation
#### Core variables (4):
```yaml
clarity_structure:
  values: [incoherent, confusing, followable, clear, crystal_clear]
  tags: [communication, effectiveness]
  attracts: [audience_fit, visual_design]
  
audience_fit:
  values: [mismatched, generic, adapted, tailored, perfectly_calibrated]
  tags: [communication, relevance]
  
visual_design:
  values: [misleading, cluttered, functional, effective, exceptional]
  tags: [communication, presentation]
  
narrative_flow:
  values: [disjointed, meandering, logical, compelling, masterful]
  tags: [communication, engagement]
```
**Variable family**: `communication_quality`

---

### 6. Process adaptation quality recognition
**Purpose**: Know when adjustments improve vs compromise quality
#### Core variables (4):
```yaml
adaptation_timing:
  values: [too_late, reactive, timely, proactive, prescient]
  tags: [process, agility]
  attracts: [change_rationale, impact_assessment]
  
change_rationale:
  values: [arbitrary, assumption_based, evidence_informed, data_driven, validated]
  tags: [process, decision_making]
  
impact_assessment:
  values: [unconsidered, assumed_positive, evaluated, measured, validated]
  tags: [process, quality]
  
trade_off_awareness:  # RENAMED from stakeholder_alignment - more relevant
  values: [blind, acknowledged, considered, balanced, optimized]
  tags: [process, decision_quality]
```
**Variable family**: `process_adaptation`

---

### 7. Source quality recognition
**Purpose**: Evaluate credibility and expertise of information sources
#### Core variables (5):
```yaml
source_expertise:
  values: [unqualified, amateur, practitioner, expert, thought_leader]
  tags: [source, credibility]
  attracts: [source_independence, verification_level]
  
source_independence:
  values: [conflicted, influenced, mostly_neutral, independent, verified_neutral]
  tags: [source, bias]
  
verification_level:
  values: [unverified, self_reported, peer_reviewed, independently_validated, multiply_confirmed]
  tags: [source, reliability]
  
recency_relevance:
  values: [outdated, aging, current, fresh, cutting_edge]
  tags: [source, timeliness]
  
sample_size_adequacy:  # NEW - often overlooked in source evaluation
  values: [anecdotal, underpowered, adequate, robust, comprehensive]
  tags: [source, validity]
```
**Variable family**: `source_quality`

---

### 8. Output quality recognition
**Purpose**: Assess deliverable quality and fitness for purpose
#### Core variables (5):
```yaml
completeness:
  values: [fragmentary, partial, adequate, thorough, exhaustive]
  tags: [output, quality]
  attracts: [polish_level, utility_value]
  
polish_level:
  values: [rough_draft, working_version, professional, refined, exceptional]
  tags: [output, presentation]
  
utility_value:
  values: [unusable, limited_use, functional, valuable, indispensable]
  tags: [output, impact]
  
stakeholder_readiness:
  values: [premature, rushed, ready, optimal_timing, perfectly_timed]
  tags: [output, delivery]
  
accessibility:  # NEW - crucial for actual use
  values: [inaccessible, difficult, manageable, user_friendly, effortless]
  tags: [output, usability]
```
**Variable family**: `output_quality`

---

## Summary of additions

### New variables added (7 total):
1. **collection_environment** - Data quality assessment
2. **research_timing** - Methodological rigor
3. **triangulation** - Analysis quality
4. **confidence_calibration** - Insight quality
5. **sample_size_adequacy** - Source quality
6. **accessibility** - Output quality
7. **trade_off_awareness** - Process adaptation (renamed from stakeholder_alignment)

### Final count:
- **37 total variables** across 8 micro-competencies
- 5 variables for 6 competencies
- 4 variables for 2 competencies (Communication & Process Adaptation)

---

## Variable relationships

### Attraction patterns
Variables that tend to correlate:
- High `collection_rigor` → High `source_credibility`
- High `method_fit` → High `sample_design`
- High `analytical_depth` → High `pattern_identification`
- High `actionability` → High `specificity`
- High `clarity_structure` → High `audience_fit`
- High `adaptation_timing` → High `change_rationale`
- High `source_expertise` → High `verification_level`
- High `completeness` → High `polish_level`

### Tension patterns
Variables that can conflict:
- High `statistical_rigor` ↔ Low `narrative_flow` (too technical)
- High `analytical_depth` ↔ Low `actionability` (analysis paralysis)
- High `trade_off_awareness` ↔ Low `adaptation_timing` (overthinking delays)
- High `polish_level` ↔ Low `stakeholder_readiness` (perfectionism delays)

---

## Implementation notes

1. **Each scenario should**:
   - Focus on 1 primary micro-competency
   - Use 3-4 variables from that competency
   - Include 1-2 variables from related competencies
   - Mix quality levels across variables for realism

2. **Quality calculation**:
   - Not simple average of variable values
   - Some variables are more critical (e.g., `method_fit` can invalidate everything)
   - Context affects weight (e.g., `polish_level` matters more for executives)

3. **Pattern generation**:
   - Each variable value implies certain patterns
   - Combinations create emergent patterns
   - Patterns should be discoverable, not explicitly stated