# MetaUX System Design Decisions & Validated Concepts

## Executive Summary
MetaUX is a pattern recognition training platform for UX practitioners that develops expert-level judgment through systematic exposure to contextual scenarios. The system uses AI-driven scenario generation, validation, and assessment to train micro-competencies that underlie UX expertise.

---

## Core Framework Decisions

### 1. Competency Architecture ✅
**Decision:** Three-tier system with 17 macro-competencies and 85+ micro-competencies

**Validated Concepts:**
- Pattern recognition (Layer 3) is the true differentiator of expertise
- Competencies are context-agnostic patterns that manifest differently across industries
- Micro-competencies are discrete, trainable pattern recognition abilities
- Skills emerge from competency combinations (skills = outputs, competencies = capabilities)

### 2. Training Modes ✅
**Decision:** Start with Dojo Mode for MVP, expand to integrated modes later

**Progression:**
1. **🥋 Dojo Mode** (MVP) - Single competency isolation
2. **🦄 Unicorn Path** (Future) - Multiple competencies integrated
3. **🎯 Skill-Focused** (Future) - Specific skill competency combinations
4. **🎨 Design Decision** (Future) - Solution synthesis for designers
5. **🏆 Boss-Level** (Future) - With disruption/complexity modifiers
6. **💬 Stakeholder Dynamics** (Future) - Live complexity navigation

**Rationale:** Prove single-competency training effectiveness before complex integration

---

## System Architecture Decisions

### 3. Variable System ✅
**Decision:** Templated variable profiles with minimal LLM-facing content

**Structure:**
```yaml
variable_template:
  system:  # REQUIRED - For orchestration
    modifies: {competency_weights}
    incompatible_with: [variables]
    clusters_with: [variables]
  prompt:  # MINIMAL - LLM already knows concepts
    hint: "brief context"
```

**Key Insight:** Variables need rich system logic but minimal explanation for LLMs

### 4. Competency Profiles ✅
**Decision:** Rich, detailed profiles for competencies (our unique IP)

**Structure:**
```yaml
competency_template:
  core:  # REQUIRED - LLM needs this
    definition: "What this pattern recognition means"
    patterns: {positive, negative, edge_cases}
    assessment_criteria: {excellent, good, poor}
    context_variations: {b2c, b2b, web3}
  system:  # REQUIRED - For orchestration
    tier: foundational|intermediate|advanced
    prerequisites: []
    clusters_with: []
```

**Key Insight:** Competencies are our taxonomy - LLMs need detailed explanation

### 5. Pattern Rules as Breadcrumbs ✅
**Decision:** Create pedagogical guardrails for the Learning Goal Designer

**Types:**
- **Clustering Rules:** Which competencies appear together
- **Universality Rules:** Always relevant vs. specialized
- **Role-Based Weights:** Adjust importance by user role
- **Compatibility Rules:** Prevent nonsensical combinations

**Rationale:** Ensures pedagogically sound progressions from day one while allowing AI to learn and adapt

---

## Generation & Assessment Pipeline

### 6. Scenario Validation Chain ✅
**Decision:** QA Agent validates all generated scenarios before use

**Pipeline:**
```
CONFIG (intention) 
  → GENERATION (scenario)
  → QA VALIDATION (verify patterns present)
  → ACTUAL RUBRIC (based on what's there)
  → USER RESPONSE
  → ASSESSMENT (against actual + intended)
```

**Key Innovation:** Assess what's actually in the scenario, not just what was intended

### 7. Hybrid Failure Recovery ✅
**Decision:** Use thresholds to handle generation issues intelligently

**Thresholds:**
- **<50% fidelity:** Silent regeneration (critical failure)
- **50-70% fidelity:** Educational challenge (advanced) or simplification (beginner)
- **70-85% fidelity:** Minor note or silent proceed
- **>85% fidelity:** Normal operation

**Key Insight:** Turn generation flaws into learning opportunities when appropriate

### 8. Dynamic Rubrics ✅
**Decision:** Create assessment criteria based on validated content, not original intent

**Benefits:**
- Fair assessment of user performance
- Accurate difficulty calibration
- System learning from generation patterns
- Maintains pedagogical integrity

---

## User Experience Decisions

### 9. Optional Personalization ✅
**Decision:** Users can specify context preferences or skip for system-driven adaptation

**Configurable:**
- Role (PM, Designer, Researcher, etc.)
- Industry (Healthcare, Fintech, Web3, etc.)
- Company Stage (Startup, Scale-up, Enterprise)
- Product Complexity (Simple consumer → Complex B2B)

**Principle:** Both paths (specified or emergent) lead to personalized mastery

### 10. Progressive Transparency ✅
**Decision:** Adapt system transparency based on user level

**Approach:**
- **Beginners:** Seamless experience, hide complexity
- **Intermediate:** Gentle notes about adaptations
- **Advanced:** Educational transparency about patterns
- **Expert:** Full system awareness, meta-challenges

---

## Technical Implementation Decisions

### 11. Storage & Retrieval ✅
**Decision:** Use RAG with vector database for competency/variable profiles

**Rationale:**
- Immediate deployment without fine-tuning
- Flexibility to iterate on definitions
- A/B testing different approaches
- Maintain transparency and debuggability

**Future:** Consider fine-tuning after definitions stabilize and volume justifies cost

### 12. Config Architecture ✅
**Decision:** Hierarchical competency focus in complex scenarios

**Structure:**
```yaml
scenario_config:
  primary_competencies: [1-2 full detail]
  secondary_competencies: [2-3 compressed]
  background_competencies: [2-3 hints only]
```

**Benefit:** Manages token limits while maintaining complexity

---

## Validated Concepts

### Pattern Recognition as Core
✅ Expertise = unconscious pattern recognition, not knowledge or execution
✅ Patterns can be systematically trained through exposure
✅ Competencies are universal patterns that manifest contextually

### System Extensibility
✅ New industries/contexts only require variable profiles, not framework changes
✅ Competencies remain stable as contexts expand
✅ Pattern rules can evolve based on usage data

### Assessment Integrity
✅ Validation ensures scenarios contain intended patterns
✅ Dynamic rubrics provide fair assessment
✅ Fidelity thresholds enable graceful degradation

### Pedagogical Soundness
✅ Breadcrumbs ensure quality from day one
✅ Progressive difficulty based on actual performance
✅ Flaws can become educational opportunities

---

## MVP Focus

### Priorities for Launch:
1. **10-15 foundational competencies** with complete profiles
2. **Dojo mode** with single-competency training
3. **Basic validation pipeline** (pattern present/absent)
4. **Simple assessment** (recognized/missed/partial)
5. **Core variable set** (5-6 industries, 3-4 roles)

### Success Metrics:
- Pattern recognition improvement >30%
- Assessment accuracy >80% agreement with experts
- User retention (multiple sessions)
- Clear difficulty progression

### Deferred to Post-MVP:
- Complex multi-competency scenarios
- Advanced training modes
- Visual design competencies
- Comprehensive skill mapping
- Fine-tuned models

---

## Key Principles

1. **Competencies > Skills:** Train the underlying patterns, not surface procedures
2. **Validation > Assumption:** Verify patterns exist before assessing
3. **Adaptation > Perfection:** Good enough scenarios that adapt beat perfect but rigid
4. **Transparency > Magic:** Build trust through appropriate transparency
5. **Breadcrumbs > Emergence:** Guide AI with pedagogical expertise

---

## Next Steps

### Immediate (MVP Development):
- [ ] Define 10-15 foundational competency profiles
- [ ] Build scenario generation pipeline
- [ ] Implement QA validation agent
- [ ] Create assessment rubrics
- [ ] Design user progress tracking

### Short-term (Post-MVP):
- [ ] Expand to all foundational competencies
- [ ] Add role-based personalization
- [ ] Implement clustering rules
- [ ] Test 2-competency integration
- [ ] Gather data for system refinement

### Long-term (Scale):
- [ ] Complete all 85+ micro-competencies
- [ ] Implement advanced training modes
- [ ] Consider fine-tuning for efficiency
- [ ] Build comprehensive skill → competency mapping
- [ ] Develop organizational assessment tools

---

## System Learning Loops

The platform continuously improves through:
1. **Generation Quality:** Track which patterns generate well/poorly
2. **Assessment Accuracy:** Validate against expert judgment
3. **User Progress:** Identify effective difficulty progressions
4. **Flaw Impact:** Learn which imperfections help vs. hinder
5. **Competency Validity:** Refine definitions based on outcomes

---

*This document represents the foundational decisions for the MetaUX platform as of the current design phase. These decisions prioritize pedagogical soundness, system extensibility, and user learning outcomes while maintaining technical feasibility for MVP development.*