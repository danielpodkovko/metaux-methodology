# Lightweight scenario generation system for demo

**Date**: September 06, 2025  
**Purpose**: Practical implementation for immediate demo use

---

## General Idea

### Core Concept
Scenarios should be **mini-narratives** that embed quality patterns naturally within engaging human stories. Rather than presenting dry data lists, we create authentic moments that trigger pattern recognition through varied presentation styles and component combinations.

### Key Principles
1. **Engagement drives learning** - Authentic voices and human moments make patterns memorable
2. **Variety prevents fatigue** - Different templates and components keep cognitive load fresh
3. **Discovery over declaration** - Patterns are embedded, not highlighted
4. **Context shapes revelation** - Some patterns best revealed through data, others through emotion

---

## Core Structure (Keep it Simple)

```markdown
### [Context Line]
[Industry] [Stage] • [Optional: Pressure/Timeline]

### [Story Block]
[2-3 paragraphs mixing narrative and evidence]

### [Question]
[Directed but not leading]
```

---

## Component Pool System (v1)

### For Demo: Fixed Component Types

```typescript
interface ScenarioComponents {
  // Always include
  context: string;        // "Healthcare Enterprise • Board demo next week"
  narrative: string;      // The main story (1-2 paragraphs)
  question: string;       // Focus prompt
  
  // Pick 2-3 from these based on variables
  dataPoint?: string;     // "15 participants, 100% completion"
  quote?: string;         // "Participant 3: 'Need API access'"
  observation?: string;   // "Researcher noted PA announcements"
  emotion?: string;       // "Founder excited: 'Everyone loves it!'"
  discrepancy?: string;   // "Survey: 89% interested / Testing: 42% completion"
}
```

---

## Simple Selection Rules for Demo

```typescript
function selectComponents(primaryVariable: string): string[] {
  const componentMap = {
    // Pattern → Best reveal method
    'source_credibility': ['quote', 'observation'],
    'internal_consistency': ['dataPoint', 'discrepancy'],
    'collection_environment': ['observation', 'quote'],
    'data_completeness': ['dataPoint', 'observation'],
    'collection_rigor': ['emotion', 'discrepancy']
  };
  
  return componentMap[primaryVariable] || ['dataPoint', 'quote'];
}
```

---

## Three Demo Templates (Rotate for Variety)

### Template A: Professional Report
```markdown
### [Context]
The UX team completed their study with [dataPoint]. 
[narrative with embedded observation].

[Optional quote or discrepancy]

**Question:** [Focus on quality assessment]
```

### Template B: Team Perspective  
```markdown
### [Context]
[Emotion/attitude about research]. [Narrative with story].

[Quote or observation that reveals pattern]

**Question:** [Focus on quality assessment]
```

### Template C: Evidence-Based
```markdown
### [Context]
[Brief narrative setup]

The data showed:
- [DataPoint 1]
- [DataPoint 2 or Quote]
- [Observation]

**Question:** [Focus on quality assessment]
```

---

## Available Template Types (Discovered Through Exploration)

### Templates We Explored:
1. **Research Documentary** - Reports + recordings + data excerpts
2. **Team Conversation** - Dialogue revealing different perspectives  
3. **Observational Narrative** - Scene-setting with embedded details
4. **Data Comparison** - Contrasting methods/results
5. **Timeline Reveal** - Progressive discovery of issues

Each template naturally highlights different quality patterns and maintains engagement through variety.

---

## Future Development Action Plan

### Phase 1: Systematize Component Library (Months 1-2)
```typescript
// Build comprehensive component bank
const componentLibrary = {
  contextual: ['industry_mention', 'deadline_pressure', 'team_dynamics'],
  quantitative: ['completion_rates', 'sample_sizes', 'time_metrics'],
  qualitative: ['participant_quotes', 'researcher_notes', 'observations'],
  emotional: ['excitement', 'frustration', 'confusion', 'confidence'],
  documentary: ['report_excerpts', 'database_logs', 'recordings'],
  discrepancy: ['conflicting_data', 'method_misalignment', 'expectation_gaps']
};
```

### Phase 2: Develop Combination Rules (Months 2-3)
- **Narrative coherence engine** - Ensure components tell consistent story
- **Difficulty calibration** - More components for advanced users
- **Pattern-component matching** - Optimal revelation methods per pattern
- **Engagement tracking** - Measure which combinations work best

### Phase 3: Advanced Template System (Months 3-4)
- **Dynamic template generation** based on variables + user history
- **Component weighting** based on pattern recognition success rates
- **Narrative AI agent** to ensure story flow regardless of components
- **Multi-variable orchestration** for complex scenarios

### Phase 4: Adaptive System (Months 4-6)
- **Performance-based adaptation** - System learns which templates work for which users
- **Context hiding progression** - Gradually remove scaffolding
- **Cross-competency scenarios** - Mix multiple competency patterns
- **Personalized difficulty curves** based on recognition patterns

---

## Limitations & Solutions

### Current Limitations:

#### 1. Complexity Ceiling
**Problem**: Simple templates work for 1-2 variables but break down with 4-5 variables
**Solution**: Create complexity-aware template selection:
```typescript
if (variableCount <= 2) {
  // Use simple templates (A, B, C)
  // Focus on single revelation moment
} else if (variableCount <= 3) {
  // Use documentary or comparison templates
  // Multiple evidence types needed
} else {
  // Use timeline or multi-perspective templates
  // Progressive revelation required
}
```

#### 2. Engagement Fatigue
**Problem**: Even 3 templates get repetitive over dozens of scenarios
**Solution**: 
- Component randomization within templates
- Seasonal template themes (startup chaos, enterprise bureaucracy)
- User-generated scenario contests
- Real-world case study integration

#### 3. Variable Interaction Complexity
**Problem**: Some variable combinations create narrative conflicts
**Solution**: Compatibility matrix for variables and templates:
```typescript
compatibilityRules = {
  'hostile_environment': {
    avoid: ['casual_conversation_template'],
    prefer: ['observational_narrative', 'timeline_reveal']
  },
  'perfect_consistency': {
    avoid: ['conflict_template'],
    prefer: ['documentary', 'data_comparison']
  }
};
```

#### 4. Context Recognition Challenge
**Problem**: When universal variables are the learning target, they can't be explicit
**Solution**: Progressive context hiding:
- **Level 1**: "Healthcare Enterprise • High pressure"
- **Level 2**: Story mentions "medical devices" and "board tomorrow"
- **Level 3**: Only behavioral cues reveal context
- **Level 4**: Mixed signals require inference

### Scaling Considerations:

#### For 5+ Variables:
- Use **multi-act structure** (setup → complication → revelation)
- Implement **focus hints** ("Pay attention to the recruitment process")
- Create **layered discovery** (obvious patterns hide subtle ones)

#### For Cross-Competency:
- **Interweaved narratives** showing how collection affects analysis
- **Cascade templates** where one quality issue leads to another
- **Portfolio scenarios** with multiple documents/perspectives

---

## Implementation for Your Demo

### 1. Update Scenario Generator Prompt

```typescript
const SCENARIO_PROMPT = `
Generate a scenario using this structure:
1. Context line (industry, stage, optional pressure)
2. 2-3 paragraph story
3. Embed these components naturally:
   ${components.map(c => `- Include a ${c}`).join('\n')}
4. End with focused question

Keep total length under 150 words.
Use Template ${selectedTemplate} style.
Make quality patterns discoverable but not obvious.
`;
```

### 2. Add Component Variety Tracking

```typescript
// Simple rotation to avoid repetition
let lastTemplate = null;
let lastComponents = [];

function getNextScenarioStyle() {
  const templates = ['A', 'B', 'C'];
  const available = templates.filter(t => t !== lastTemplate);
  const selected = available[Math.floor(Math.random() * available.length)];
  lastTemplate = selected;
  return selected;
}
```

### 3. Context Visibility Control

```typescript
interface ScenarioConfig {
  // ... existing config
  contextVisibility: 'explicit' | 'embedded' | 'hidden';
}

// Examples:
// Explicit: "Healthcare Enterprise • High pressure"
// Embedded: Story mentions "enterprise client" and "deadline tomorrow"
// Hidden: No context given, student must infer
```

---

## Implementation Priority:

### Now (Demo):
✅ 3 basic templates
✅ Simple component pool
✅ Manual variety tracking

### Next (Post-Demo):
⭕ Component library expansion
⭕ Template-variable matching rules
⭕ Basic engagement metrics

### Later (Scale):
⭕ Dynamic template generation
⭕ Narrative coherence engine
⭕ Adaptive difficulty system
⭕ Cross-competency orchestration

---

## Success Metrics:

1. **Engagement**: Time spent analyzing vs skimming
2. **Recognition accuracy**: Which patterns spotted vs missed
3. **Transfer**: Recognizing patterns in real work
4. **Retention**: Remembering scenarios weeks later
5. **Enjoyment**: "One more scenario" behavior

---

## Why This Works for Demo

### Immediate Benefits:
1. **Quick to implement** - Just template strings and simple selection
2. **Enough variety** - 3 templates × different components = feels diverse
3. **Preserves discovery** - Components reveal patterns without spelling them out
4. **Scalable later** - Can expand component pool and rules over time

### Captures Key Insights:
- ✅ Multiple voices/perspectives through components
- ✅ Playful elements through emotion/quotes
- ✅ Pattern-appropriate revelation methods
- ✅ Universal variables can be hidden/embedded

---

## Example Output

```typescript
// Config: source_credibility issue, Template B selected
// Components: emotion, quote

Output:
"### Fintech Startup • Demo day approaching

The founder burst in Monday morning, exhausted but thrilled: 
'Weekend validation was incredible! 47 people, universal love!'

The designer pulled up her notes from the same sessions. 
'Participant 8 asked if this was for professionals or beginners. 
Participant 12 couldn't find the invest button.'

**Question:** What patterns in the team's findings raise concerns?"
```