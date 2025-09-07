# MetaUX complete system architecture

**Date**: September 06, 2025  
**Status**: System architecture overview

---

## Three-layer system with AI orchestration

```
┌─────────────────────────────────────────────────────────────┐
│                    CONFIGURATION LAYER                       │
│                   (Universal Variables)                      │
│  • Industry Context (fintech, healthcare, ecommerce)         │
│  • Company Stage (startup, scaleup, enterprise)              │
│  • Time Pressure (low, moderate, high)                       │
│  • Resource Constraints                                      │
│  • Stakeholder Dynamics                                      │
│  → Sets the contextual scene for scenarios                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     COMPETENCY LAYER                         │
│                  (Pattern Recognition DNA)                   │
│  • 37 Quality Recognition Variables                          │
│  • Variable Selection System                                 │
│  • Quality Level Mixing                                      │
│  • Pattern Embedding Logic                                   │
│  → Teaches specific recognizable patterns                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ASSESSMENT LAYER                          │
│                 (Learning & Adaptation)                      │
│  • Response Evaluation                                       │
│  • Pattern Recognition Tracking                              │
│  • Competency Gap Analysis                                   │
│  • Next Exercise Recommendations                             │
│  → Adapts training based on performance                      │
└─────────────────────────────────────────────────────────────┘
```

---

## AI agents working "between the lines"

### 1. Scenario generator agent
```
INPUTS: Configuration + Selected Variables + User History
                            ↓
    🤖 Weaves context and patterns into realistic scenario
                            ↓
OUTPUT: Natural scenario with embedded quality patterns
```

### 2. Assessment agent
```
INPUTS: User Response + Embedded Patterns + Expected Recognition
                            ↓
    🤖 Evaluates which patterns were recognized/missed
                            ↓
OUTPUT: Score + Pattern Breakdown + Specific Feedback
```

### 3. Learning path agent (Future)
```
INPUTS: Performance History + Pattern Recognition Rates + Goals
                            ↓
    🤖 Identifies weaknesses and adapts next exercise
                            ↓
OUTPUT: Next Variable Selection + Difficulty Adjustment
```

### 4. Mentor agent
```
INPUTS: Assessment + Context + User's Recognition Gaps
                            ↓
    🤖 Provides personalized guidance and encouragement
                            ↓
OUTPUT: Contextual learning insights + Real-world connections
```

---

## Complete flow example

### Exercise 1: Initial assessment
```yaml
Configuration Layer:
  industry: fintech
  stage: startup
  pressure: high

Competency Layer:
  micro: data_quality_assessment
  variables_selected:
    - collection_environment: hostile
    - data_completeness: sparse_gaps
    - source_credibility: questionable
  quality_profile: all_low

User Performance:
  recognized: [collection_environment]
  missed: [data_completeness, source_credibility]
  score: 40%

Assessment Layer Analysis:
  weakness_identified: "Misses data completeness issues"
  recommendation: "Focus on completeness patterns next"
```

### Exercise 2: Adapted focus
```yaml
Configuration Layer:
  industry: healthcare  # Changed for variety
  stage: enterprise     # Different context
  pressure: low         # Remove time excuse

Competency Layer:
  micro: data_quality_assessment
  variables_selected:
    - data_completeness: significant_missing  # TARGET WEAKNESS
    - collection_rigor: professional          # Mixed quality
    - internal_consistency: contradictory     # Additional pattern
  quality_profile: mixed  # More nuanced

Expected: User should now recognize completeness issues better
```
