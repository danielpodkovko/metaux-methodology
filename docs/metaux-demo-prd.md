# Product Requirements Document: MetaUX Demo
**Version:** 1.0  
**Date:** January 2025  
**Purpose:** Minimal viable demonstration of MetaUX pattern recognition training system

---

## 1. Executive Summary

### What This Demo Proves
A functional demonstration of the MetaUX pattern recognition training system that showcases AI-driven scenario generation, exercise mechanics, and competency assessment at minimal scale. This demo validates that AI can consistently generate pedagogically sound scenarios with embedded patterns, evaluate user responses accurately, and provide valuable feedback for developing UX judgment.

### Success Criteria
1. **Scenario Quality**: 80% of generated scenarios clearly embed the intended competency pattern
2. **Assessment Accuracy**: AI evaluation aligns with expert judgment in 75%+ of cases
3. **User Engagement**: Test users complete at least 5 scenarios voluntarily
4. **Pedagogical Value**: Users report recognizing new patterns in their work after demo
5. **System Coherence**: Config → Scenario → Assessment pipeline works end-to-end

### Non-Goals (Explicitly NOT Building)
- User authentication or accounts
- Progress tracking beyond session
- Multiple competencies simultaneously
- QA validation loop
- Complex agent orchestration
- Visual design competencies
- Mobile optimization (desktop-first is fine)
- Production-ready error handling

### Existing Codebase Context
**IMPORTANT**: Use the existing MetaUX repository as reference for:
- Competency definitions (see `product-competencies_v3.md`)
- Universal variables system (see `universal-variables_v2.md`)
- Training mechanics framework (see `training-mechanics_v2.md`)
- Agent architecture concepts (see `metaux-agent-architecture_v1.md`)
- Example configurations (see `implementation/metaux-config_v1.json`)

---

## 2. User Journey

### Screen 1: Configuration Selection
```
┌─────────────────────────────────────────┐
│  MetaUX Demo - Pattern Recognition       │
├─────────────────────────────────────────┤
│                                          │
│  Select Your Training Context:           │
│                                          │
│  Industry Context:                       │
│  [Fintech ▼]                            │
│                                          │
│  Company Stage:                          │
│  [Startup ▼]                            │
│                                          │
│  Time Pressure:                          │
│  [High ▼]                               │
│                                          │
│  Exercise Type:                          │
│  [Selection ▼]                          │
│                                          │
│  [Generate Scenario]                     │
│                                          │
└─────────────────────────────────────────┘
```

**User Actions:**
1. Selects industry from dropdown (Fintech/Healthcare/E-commerce)
2. Selects company stage (Startup/Scale-up/Enterprise)
3. Selects pressure level (Low/Moderate/High)
4. Selects exercise type (Selection/Ranking/Analysis)
5. Clicks "Generate Scenario"

### Screen 2: Scenario Display + Exercise
```
┌─────────────────────────────────────────┐
│  Scenario #1                             │
├─────────────────────────────────────────┤
│  [Fintech] [Startup] [High Pressure]     │
│                                          │
│  You're reviewing user research from     │
│  your fintech startup's payment flow     │
│  study. The PM needs results by EOD.     │
│                                          │
│  The research team surveyed 12 users     │
│  and reports: "92% of users strongly     │
│  prefer biometric authentication for     │
│  payments over $500."                    │
│                                          │
│  They recommend immediately implementing │
│  face ID as the primary authentication   │
│  method for large transactions.          │
│                                          │
│  ─────────────────────────────           │
│                                          │
│  Assess the quality of this research:    │
│                                          │
│  ○ High Quality                          │
│  ○ Medium Quality                        │
│  ● Low Quality                           │
│                                          │
│  Why? (optional but recommended):        │
│  ┌─────────────────────────────┐        │
│  │ Sample size too small for    │        │
│  │ such strong claims...        │        │
│  └─────────────────────────────┘        │
│                                          │
│  [Submit Response]                       │
│                                          │
└─────────────────────────────────────────┘
```

### Screen 3: AI Evaluation + Feedback
```
┌─────────────────────────────────────────┐
│  Your Assessment: ✓ Correct              │
├─────────────────────────────────────────┤
│                                          │
│  You correctly identified this as        │
│  LOW QUALITY research.                   │
│                                          │
│  Key Quality Issues:                     │
│  • Sample size (n=12) too small for     │
│    population-level claims               │
│  • No mention of participant selection   │
│  • No confidence intervals provided      │
│  • Recommendation jumps to solution      │
│                                          │
│  Your Reasoning:                         │
│  "Sample size too small for such         │
│  strong claims"                          │
│  → Good catch! This is the primary       │
│     quality issue.                       │
│                                          │
│  Pattern to Remember:                    │
│  In high-pressure startup contexts,      │
│  watch for overconfidence in small       │
│  samples. The pressure to move fast      │
│  can compromise research rigor.          │
│                                          │
│  [Try Another Scenario]                  │
│  [Change Configuration]                  │
│                                          │
└─────────────────────────────────────────┘
```

---

## 3. Technical Architecture

### System Overview
```
┌──────────┐     ┌─────────────┐     ┌─────────────┐
│          │────▶│             │────▶│             │
│ Next.js  │     │ API Routes  │     │ Claude API  │
│ Frontend │◀────│             │◀────│  (Anthropic)│
│          │     │             │     │             │
└──────────┘     └─────────────┘     └─────────────┘
     │                  │                    │
     ▼                  ▼                    ▼
┌──────────┐     ┌─────────────┐     ┌─────────────┐
│  Config  │     │   Prompts   │     │  Response   │
│  State   │     │  Templates  │     │ Processing  │
└──────────┘     └─────────────┘     └─────────────┘
```

### Component Responsibilities

**Frontend (Next.js)**
- Config selection interface
- Scenario display
- Exercise mechanics (Selection/Ranking/Analysis)
- Response collection
- Feedback display

**API Routes**
- `/api/generate-scenario`: Calls Claude to create scenario
- `/api/evaluate-response`: Calls Claude to assess user response
- `/api/provide-guidance`: Calls Claude for mentorship feedback

**Claude Integration**
- Uses Anthropic SDK for Claude API calls
- System prompts stored as templates
- Context injection from config
- Response parsing and validation

---

## 4. Data Structures

### Config Object
```typescript
interface ScenarioConfig {
  scenario_id: string;
  competency: {
    macro: "quality_recognition";
    micro: "data_quality_assessment" | "methodological_rigor" | "insight_quality";
    difficulty: "obvious" | "moderate" | "subtle";
  };
  universal_variables: {
    industry_context: "fintech" | "healthcare" | "ecommerce";
    company_stage: "startup" | "scaleup" | "enterprise";
    time_pressure: "low" | "moderate" | "high";
    stakeholder_resistance?: "supportive" | "neutral" | "skeptical";
  };
  exercise_type: "selection" | "ranking" | "analysis";
  learning_goal: string;
}
```

### Example Config
```json
{
  "scenario_id": "demo_001",
  "competency": {
    "macro": "quality_recognition",
    "micro": "data_quality_assessment",
    "difficulty": "moderate"
  },
  "universal_variables": {
    "industry_context": "fintech",
    "company_stage": "startup",
    "time_pressure": "high",
    "stakeholder_resistance": "skeptical"
  },
  "exercise_type": "selection",
  "learning_goal": "Recognize quality issues in rushed startup research"
}
```

### Scenario Object
```typescript
interface GeneratedScenario {
  id: string;
  config: ScenarioConfig;
  content: {
    context: string;      // 1-2 sentences setting the scene
    situation: string;    // The main scenario text
    data_presented: string; // Specific data/claim to evaluate
    decision_prompt: string; // What the user needs to decide
  };
  embedded_patterns: string[]; // Quality issues present
  generated_at: string;
}
```

### User Response Object
```typescript
interface UserResponse {
  scenario_id: string;
  exercise_type: "selection" | "ranking" | "analysis";
  response: {
    selection?: "high" | "medium" | "low";
    ranking?: number[];
    analysis?: string;
    reasoning?: string; // Optional explanation
  };
  submitted_at: string;
}
```

### Evaluation Object
```typescript
interface Evaluation {
  scenario_id: string;
  user_response: UserResponse;
  assessment: {
    correct: boolean;
    accuracy_score: number; // 0-100
    recognized_patterns: string[];
    missed_patterns: string[];
    reasoning_quality: "excellent" | "good" | "developing" | "poor";
  };
  feedback: {
    summary: string;
    key_points: string[];
    pattern_guidance: string;
    encouragement: string;
  };
}
```

---

## 5. AI Agent Specifications

### Scenario Generator Agent

**Input:**
- ScenarioConfig object

**System Prompt:**
```markdown
You are a scenario generator for UX competency training, specifically focused on quality recognition patterns.

Given a configuration with competency focus and contextual variables, generate a realistic workplace scenario that:
1. Embeds the specified quality pattern naturally (don't explicitly state it)
2. Matches the industry context and company stage
3. Reflects the time pressure appropriately
4. Includes specific data, quotes, or claims to evaluate
5. Feels authentic to real UX practice

Output a JSON object with:
- context: 1-2 sentences setting the scene
- situation: Main scenario description
- data_presented: Specific claim or data to evaluate  
- decision_prompt: What the user needs to judge
- embedded_patterns: Array of quality issues present (for internal use)

Reference the existing competency definitions from the MetaUX framework.
```

**Expected Output Format:**
```json
{
  "context": "You're reviewing research from your fintech startup's payment team.",
  "situation": "The PM needs results by EOD for tomorrow's board meeting...",
  "data_presented": "Survey of 12 users shows 92% prefer biometric auth...",
  "decision_prompt": "Assess the quality of this research finding",
  "embedded_patterns": ["small_sample_size", "no_confidence_intervals", "selection_bias_unclear"]
}
```

### Assessment Agent

**Input:**
- GeneratedScenario object
- UserResponse object

**System Prompt:**
```markdown
You are an assessment agent evaluating user responses for pattern recognition training.

Given a scenario and user response, evaluate:
1. Whether they correctly identified the quality level
2. Which quality patterns they recognized (from their reasoning)
3. Which important patterns they missed
4. The sophistication of their reasoning

Be encouraging but accurate. Focus on pattern recognition rather than perfect answers.

Output a JSON object with assessment and feedback sections.
```

### Mentor Agent

**Input:**
- Evaluation object
- ScenarioConfig object

**System Prompt:**
```markdown
You are a supportive mentor helping UX practitioners develop pattern recognition skills.

Given an evaluation, provide:
1. Encouraging acknowledgment of what they recognized
2. Gentle guidance on missed patterns
3. A memorable insight about this pattern in context
4. Motivation to continue practicing

Keep responses concise (3-4 sentences max). Be warm but professional.
Reference how this pattern appears in real UX work.
```

---

## 6. UI Components

### Component Hierarchy
```
App
├── ConfigSelector
│   ├── DropdownField (reusable)
│   └── GenerateButton
├── ScenarioDisplay
│   ├── ContextBadges
│   ├── ScenarioContent
│   └── DecisionPrompt
├── ExerciseMechanic
│   ├── SelectionMechanic
│   ├── RankingMechanic
│   └── AnalysisMechanic
├── ResponseFeedback
│   ├── AssessmentSummary
│   ├── PatternBreakdown
│   └── MentorGuidance
└── NavigationControls
    ├── NextScenarioButton
    └── ChangeConfigButton
```

### State Management
- Use React useState for local component state
- Config state lifted to App level
- No global state management needed for demo

### Key Interactions
- Dropdowns: Update config state on change
- Generate button: Triggers API call, shows loading state
- Submit response: Sends to evaluation, disables form
- Navigation: Resets or maintains config based on choice

---

## 7. Implementation Priorities

### P0: Must Have for Demo
- Single competency (quality_recognition) fully working
- 3 industry contexts functional
- Selection exercise type working
- Basic scenario generation via Claude
- Simple correct/incorrect evaluation
- One-line feedback

### P1: Significantly Improves Demo
- All 3 exercise types (Selection, Ranking, Analysis)
- Detailed feedback with pattern breakdown
- Mentor guidance messages
- 3 difficulty levels
- Session statistics (e.g., "3/5 correct")

### P2: Nice to Have
- Multiple micro-competencies within quality_recognition
- Confidence calibration addition
- Export results summary
- Dark mode
- Accessibility features (keyboard navigation)

---

## 8. Testing Scenarios

### Path 1: High-Pressure Startup
- Config: Fintech + Startup + High Pressure + Selection
- Expected: Scenario with rushed research, small samples
- Success: User identifies quality issues from time pressure

### Path 2: Enterprise Rigor
- Config: Healthcare + Enterprise + Low Pressure + Analysis
- Expected: Scenario with regulatory context, formal process
- Success: User recognizes different quality standards

### Path 3: Edge Case - All High Pressure
- Config: Any + Any + High + Selection
- Expected: System handles pressure variable consistently
- Success: Pressure reflected regardless of other variables

### Path 4: Exercise Type Variation
- Config: Same config, try all 3 exercise types
- Expected: Same scenario core, different interaction
- Success: Each exercise type works with same content

### Path 5: Difficulty Progression
- Config: Keep same, manually set difficulty low → high
- Expected: Patterns become more subtle
- Success: Users find high difficulty genuinely harder

---

## 9. File Structure

```
metaux-demo/
├── app/
│   ├── api/
│   │   ├── generate-scenario/
│   │   │   └── route.ts
│   │   ├── evaluate-response/
│   │   │   └── route.ts
│   │   └── provide-guidance/
│   │       └── route.ts
│   ├── components/
│   │   ├── ConfigSelector.tsx
│   │   ├── ScenarioDisplay.tsx
│   │   ├── ExerciseMechanic.tsx
│   │   ├── SelectionMechanic.tsx
│   │   ├── RankingMechanic.tsx
│   │   ├── AnalysisMechanic.tsx
│   │   └── ResponseFeedback.tsx
│   ├── lib/
│   │   ├── prompts/
│   │   │   ├── scenario-generator.ts
│   │   │   ├── assessment-agent.ts
│   │   │   └── mentor-agent.ts
│   │   ├── schemas/
│   │   │   ├── config.ts
│   │   │   ├── scenario.ts
│   │   │   └── evaluation.ts
│   │   └── claude.ts (Anthropic client setup)
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 10. Development Milestones

### Milestone 1: Static UI Complete (Day 1)
- [ ] Config selector with dropdowns
- [ ] Scenario display layout
- [ ] Selection exercise mechanic
- [ ] Basic styling with Tailwind

### Milestone 2: Scenario Generation Working (Day 2)
- [ ] Claude API integration
- [ ] Scenario generator prompt refined
- [ ] API route working
- [ ] Loading states implemented

### Milestone 3: Evaluation Working (Day 3)
- [ ] Assessment agent prompt refined
- [ ] Evaluation API route working
- [ ] Feedback display component
- [ ] Basic error handling

### Milestone 4: Full Loop Complete (Day 4)
- [ ] End-to-end flow tested
- [ ] All three exercise types working
- [ ] Mentor guidance integrated
- [ ] Edge cases handled

### Milestone 5: Polish & Testing (Day 5)
- [ ] UI polish and responsive design
- [ ] Comprehensive testing
- [ ] Documentation updated
- [ ] Demo script prepared

---

## 11. Claude API Integration Notes

### API Configuration
```typescript
// lib/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateScenario(config: ScenarioConfig) {
  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1000,
    temperature: 0.7,
    system: SCENARIO_GENERATOR_PROMPT,
    messages: [{
      role: 'user',
      content: JSON.stringify(config)
    }]
  });
  
  return JSON.parse(response.content[0].text);
}
```

### Error Handling
- Retry logic for rate limits
- Graceful fallbacks for API failures
- User-friendly error messages
- Timeout handling (10 second max)

### Cost Optimization
- Cache generated scenarios for identical configs
- Use claude-3-sonnet for evaluation (cheaper)
- Implement request debouncing
- Track token usage for monitoring

---

## 12. Success Metrics & Analytics

### Quantitative Metrics
- Scenario generation success rate (target: >95%)
- Average time to complete exercise (target: <2 min)
- Evaluation agreement with expert baseline (target: >75%)
- User completion rate (target: >80% complete 3+ scenarios)

### Qualitative Metrics
- User feedback on scenario realism
- Self-reported pattern recognition improvement
- Willingness to use full platform
- Specific patterns users report noticing

### Demo Feedback Questions
1. "Did the scenarios feel realistic to your work?"
2. "Did you learn anything about quality recognition?"
3. "Would practicing these patterns help you improve?"
4. "What was confusing or frustrating?"
5. "Would you pay for access to this training?"

---

## Appendix: Example Scenarios for Reference

### Example 1: Fintech Startup High Pressure
```json
{
  "context": "Your payment team needs user validation for tomorrow's investor demo.",
  "situation": "The designer quickly surveyed 8 friends who use finance apps...",
  "data_presented": "100% said they'd prefer your checkout flow over competitors",
  "embedded_patterns": ["sample_bias", "tiny_sample", "leading_questions_likely"]
}
```

### Example 2: Healthcare Enterprise Low Pressure
```json
{
  "context": "Quarterly usability review of patient portal completed.",
  "situation": "Professional research firm conducted 45 moderated sessions...",
  "data_presented": "Report includes confidence intervals, methodology section, limitations",
  "embedded_patterns": ["high_quality_indicators", "appropriate_rigor"]
}
```

### Example 3: E-commerce Scale-up Moderate
```json
{
  "context": "Conversion team analyzed last month's checkout funnel data.",
  "situation": "500K users tracked, but only desktop users included...",
  "data_presented": "23% cart abandonment, recommended mobile-first redesign",
  "embedded_patterns": ["platform_bias", "recommendation_data_mismatch"]
}
```

---

*This PRD provides a complete specification for building a functional MetaUX demo that proves the core concept while maintaining manageable scope.*