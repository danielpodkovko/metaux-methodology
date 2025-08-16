# MetaUX Framework - Latest Decisions & Architecture Summary

## Core Framework Status

### ✅ **Finalized Components**

#### **15 Macro-Competencies (Confirmed)**
**Tier 1 - Foundational (4)**
1. Signal vs Noise Detection
2. Context Recognition
3. Constraints Recognition
4. Quality Recognition

**Tier 2 - Intermediate (4)**
5. Problem Understanding
6. Human Pattern Recognition
7. AI Integration Recognition
8. Systems Pattern Recognition

**Tier 3 - Advanced (7)**
9. Business Opportunity Recognition
10. Value Translation Recognition
11. Credibility Building Recognition
12. Impact Prediction
13. Influence Strategy Recognition
14. Power Dynamics Navigation
15. Strategic Positioning Recognition

#### **Special Training Modes**
- **Boss-Level Modifier**: Disruption Tolerance (difficulty modifier)
- **Simulation Mode**: Complexity Navigation (live stakeholder dynamics - Slack-like interface)
- **Design Decision Challenges**: Solution synthesis training (not a competency but a training mode)

#### **~100 Micro-Competencies** 
- Validated through skill mapping
- 2 micro-competencies DROPPED:
  - ❌ Geographic/Market Context (redundant with Industry Context)
  - ❌ Resource Maturity Context (redundant with Organizational Culture)

---

## Key Architectural Decisions

### **1. System Architecture**

```
PEDAGOGICAL FRAMEWORK (Foundation)
    ↓
Layer 1: Universal Variables (Context & Constraints)
    ↓
Layer 2: Pattern Rules (NEW! - competency selection & clustering)
    ↓
Layer 3: Competencies (macro & micro patterns)
    ↓
Layer 4: Scenario Generation
    ↓
TRAINING EXPERIENCE
```

### **2. Universal Variables Enhancement**

**Added User Role as Universal Variable:**
```yaml
user_role:
  - qual_researcher
  - quant_researcher
  - product_designer
  - product_manager
  - ux_strategist
  - junior_generalist
```

This enables role-based competency weighting and personalization.

### **3. Pattern Rules Layer (NEW)**

Separate configuration layer for intelligent competency selection:

```yaml
pattern_rules:
  # Universality Classification
  universal_competencies: [
    behavioral_consistency,
    data_quality,
    bias_detection,
    participant_authenticity
  ]
  
  # Clustering Rules
  clustering_rules:
    business_cluster: [market_size, revenue_impact, competitive_advantage]
    quality_cluster: [data_quality, method_rigor, insight_quality]
    
  # Role-Based Specialization
  role_specializations:
    quant_researcher:
      emphasize: [statistical_validity, correlation_analysis]
      deprioritize: [power_distance]
    product_manager:
      emphasize: [business_opportunity_all, value_translation]
```

---

## Training Modes (Confirmed)

### **6 Core Training Modes**
1. **🥋 Dojo Mode** - Single competency isolation
2. **🦄 Unicorn Path** - Multiple competencies integrated
3. **🎯 Skill-Focused** - Specific skill competency combinations
4. **🎨 Design Decision Challenges** - Solution synthesis (for designers)
5. **🏆 Boss-Level Challenges** - With Disruption/Complexity modifiers
6. **💬 Stakeholder Dynamics Simulation** - Live complexity navigation

### **Skill Aspect Control**
Skills can be decomposed into aspects for granular training:
```yaml
user_interview_conducting:
  aspects:
    - question_formulation
    - response_evaluation
    - probing_techniques
    - rapport_building
```

---

## Validation Results

### **Competency-Skill Mapping**
- ✅ 84% of skills map cleanly to competencies
- ✅ Foundational competencies enable 64% of skills directly
- ✅ Most skills need 4-6 competencies (sweet spot)

### **Micro-Competency Validation**
- ✅ 80% of micros validated as distinct patterns
- ✅ Our additions (Cognitive Load, Social Desirability) confirmed critical
- ✅ Some specialization-specific (Statistical Validity for quant only)

### **Identified Patterns**

**Competency Types:**
1. **Universal** - Always relevant (Behavioral Consistency, Data Quality)
2. **Specialized** - Role-specific (Statistical Validity, Power Distance)
3. **Clustered** - Appear together (Business Opportunity micros)

**Natural Skill Families:**
- **Qual Research**: Human Pattern + Quality + Context
- **Quant Research**: Signal/Noise + Systems + Quality
- **Strategic Work**: Advanced tier competencies dominant
- **Planning**: Constraints + Context + Problem Understanding

---

## Implementation Principles

### **Core Innovation**
- **Pattern recognition training** over knowledge transfer
- **Competencies enable skills** (not vice versa)
- **Variables create natural progression** (not artificial levels)
- **Text-first scenarios** with AI assessment

### **Prompt Generation Engine**
The entire system is essentially a sophisticated prompt generator:
- Variables control scenario context
- Pattern rules select competencies
- Competencies define patterns to embed
- AI generates infinite variations

### **Learning Goal Designer Breadcrumbs**
Pattern rules serve as pedagogical guardrails:
- Ensure sensible progressions from day one
- Can be overridden as AI learns from user data
- Provide predictable, debuggable behavior

---

## Next Steps & Open Items

### **Completed ✅**
- Macro-competency structure
- Micro-competency validation
- Training modes definition
- Universal variables
- Pattern rules concept

### **To Do 📝**
1. Define variables for remaining ~70 micro-competencies
2. Complete skill → competency mapping for all 117 skills
3. Implement pattern rules configuration
4. Design Stakeholder Dynamics Simulation mechanics

### **Deferred for Later 🔄**
- Risk Recognition competency (needs more evidence)
- Additional micro-competencies for edge cases
- Visual design competencies (out of scope)

---

## Key Insights

### **The System is Complete Enough**
- Framework covers expert judgment patterns comprehensively
- Gaps are primarily knowledge/craft, not pattern recognition
- Personalization enabled through role variables and pattern rules

### **Not All Competencies Are Equal**
- Universal competencies form the foundation
- Specialized competencies enable role differentiation
- Clustered competencies create realistic scenarios

### **Breadcrumbs Enhance AI**
- Pattern rules provide pedagogical soundness from launch
- AI can learn and adapt while respecting educational principles
- System remains transparent and debuggable

---

## Architecture Summary

```
USER PROFILE (including role)
    ↓
UNIVERSAL VARIABLES (context + constraints)
    ↓
PATTERN RULES (select & cluster competencies)
    ↓
COMPETENCIES (pattern recognition targets)
    ↓
SCENARIO GENERATION (AI creates training)
    ↓
ASSESSMENT (AI evaluates recognition)
    ↓
LEARNING GOAL DESIGNER (adjusts based on performance)
    ↓
NEXT SCENARIO
```

**Result**: An adaptive, personalized pattern recognition training system that develops expert UX judgment through systematic exposure to contextually appropriate scenarios.