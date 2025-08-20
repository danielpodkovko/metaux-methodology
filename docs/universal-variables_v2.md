# Universal DNA Variables v2.0 - Complete Framework

**Version**: 2.0  
**Last Updated**: 15 Aug 2025  
**Purpose**: Comprehensive environmental settings and challenge creation for MetaUX competency training  
**Total Variables**: 49

---

## 📋 Quick Reference List

### Context Variables (27)
**Product Context (4)**
- product_category
- technical_complexity_level
- product_maturity_stage
- user_base_sophistication

**Company Context (3)**
- organizational_stage
- company_culture_type
- strategic_priority_focus

**Scenario Context (5)**
- problem_knowledge_state
- user_motivation_driver
- accessibility_requirements
- decision_urgency 🆕
- stakes_level 🆕

**User Context (3)**
- user_role
- experience_level
- domain_expertise

**Communication Context (3)** 🆕
- communication_setting
- communication_medium
- feedback_culture

**Relationship Context (3)** 🆕
- relationship_duration
- trust_level
- power_relationship

**Market Context (3)** 🆕
- organizational_change_state
- market_disruption_level
- geographic_distribution

**Research Context (3)** 🆕
- existing_data_availability
- previous_research_history
- success_metrics_clarity

### Constraint Variables (22)
**Resource Constraints (4)**
- time_constraint_pressure
- budget_constraint_severity
- team_constraint_reality
- tool_access_limitations

**Stakeholder Constraints (5)**
- stakeholder_resistance_level
- decision_authority_clarity
- ux_literacy_constraint
- stakeholder_availability
- communication_constraint_severity

**Technical Constraints (4)**
- engineering_constraint_type
- technical_stakeholder_involvement
- implementation_complexity
- technical_debt_impact

**Business Constraints (6)**
- competitive_pressure_intensity
- regulatory_compliance_pressure
- business_impact_urgency
- innovation_constraint_severity
- external_pressure_sources
- decision_timeline_constraint

**Quality Constraints (3)**
- accuracy_requirement_level
- risk_tolerance_boundary
- documentation_requirement_depth

---

## 🌍 Universal Context DNA Variables

These establish the environmental setting for scenarios. Typically **locked** during training sequences for consistency.

### Product Context Variables

#### **Product Category**
```json
{
  "product_category": {
    "description": "Primary domain and industry context for the UX work",
    "values": {
      "financial_technology": {
        "description": "Banking, payments, crypto, investment platforms",
        "scenario_impact": "High security requirements, regulatory constraints, user trust critical"
      },
      "healthcare_platform": {
        "description": "Medical software, patient portals, health tracking",
        "scenario_impact": "HIPAA compliance, safety-critical decisions, expert user workflows"
      },
      "enterprise_tools": {
        "description": "Business software, productivity platforms, internal tools",
        "scenario_impact": "Complex workflows, power user needs, integration requirements"
      },
      "consumer_mobile": {
        "description": "Mobile apps, social platforms, entertainment",
        "scenario_impact": "Mass market appeal, engagement focus, platform constraints"
      },
      "e_commerce": {
        "description": "Online retail, marketplaces, shopping platforms",
        "scenario_impact": "Conversion optimization, transaction flows, trust indicators"
      }
    }
  }
}
```

#### **Technical Complexity Level**
```json
{
  "technical_complexity_level": {
    "description": "Technical sophistication and architecture complexity of the product",
    "values": {
      "simple_web": {
        "description": "Basic website with standard functionality",
        "scenario_impact": "Straightforward implementation, few technical constraints"
      },
      "standard_mobile": {
        "description": "Mobile app with typical features and integrations",
        "scenario_impact": "Platform-specific considerations, performance awareness needed"
      },
      "complex_platform": {
        "description": "Multi-service platform with extensive integrations",
        "scenario_impact": "System-wide design decisions, integration complexity affects UX"
      },
      "ai_powered": {
        "description": "Machine learning, AI-driven features and interfaces",
        "scenario_impact": "Algorithmic considerations, model limitations, transparency needs"
      }
    }
  }
}
```

#### **Product Maturity Stage**
```json
{
  "product_maturity_stage": {
    "description": "Development phase and lifecycle stage of the product",
    "values": {
      "concept": {
        "description": "Early ideation, prototype, or proof-of-concept phase",
        "scenario_impact": "High uncertainty, foundational decisions, vision alignment critical"
      },
      "mvp": {
        "description": "Minimum viable product, early validation phase",
        "scenario_impact": "Resource constraints, rapid iteration, core functionality focus"
      },
      "growth": {
        "description": "Scaling product with established product-market fit",
        "scenario_impact": "Optimization focus, feature expansion, user base growth challenges"
      },
      "mature": {
        "description": "Established product with stable user base",
        "scenario_impact": "Incremental improvements, legacy considerations, competitive differentiation"
      }
    }
  }
}
```

#### **User Base Sophistication**
```json
{
  "user_base_sophistication": {
    "description": "Target user's technical and domain expertise level",
    "values": {
      "mainstream": {
        "description": "General consumers with basic digital literacy",
        "scenario_impact": "Simplicity priority, intuitive design, minimal learning curve"
      },
      "informed": {
        "description": "Users with moderate domain or technical knowledge",
        "scenario_impact": "Balanced approach, some complexity acceptable, efficiency valued"
      },
      "expert": {
        "description": "Domain experts with deep professional knowledge",
        "scenario_impact": "Power user features, workflow efficiency, advanced functionality"
      },
      "technical": {
        "description": "Technical professionals or developers",
        "scenario_impact": "Technical accuracy, advanced controls, API/integration focus"
      }
    }
  }
}
```

### Company Context Variables

#### **Organizational Stage**
```json
{
  "organizational_stage": {
    "description": "Company size, maturity, and operational complexity",
    "values": {
      "startup": {
        "description": "Early-stage company, under 50 employees, rapid change",
        "scenario_impact": "Resource constraints, fast decisions, role flexibility"
      },
      "scaleup": {
        "description": "Growing company, 50-500 employees, establishing processes",
        "scenario_impact": "Process development, team coordination, scaling challenges"
      },
      "enterprise": {
        "description": "Large organization, 500+ employees, established hierarchy",
        "scenario_impact": "Complex approval processes, stakeholder alignment, compliance focus"
      },
      "government": {
        "description": "Government agency or public sector organization",
        "scenario_impact": "Regulatory requirements, accessibility mandates, procurement processes"
      }
    }
  }
}
```

#### **Company Culture Type**
```json
{
  "company_culture_type": {
    "description": "Organizational decision-making style and cultural approach",
    "values": {
      "move_fast": {
        "description": "Rapid iteration, bias toward action, minimal process",
        "scenario_impact": "Quick decisions expected, prototype over perfect, speed valued"
      },
      "consensus_driven": {
        "description": "Collaborative decision-making, team alignment valued",
        "scenario_impact": "Multiple stakeholder input, longer decision cycles, alignment critical"
      },
      "process_heavy": {
        "description": "Structured workflows, documentation, formal approvals",
        "scenario_impact": "Detailed justification required, compliance procedures, formal presentations"
      },
      "data_driven": {
        "description": "Evidence-based decisions, metrics focus, testing culture",
        "scenario_impact": "Quantitative justification needed, A/B testing, measurement emphasis"
      }
    }
  }
}
```

#### **Strategic Priority Focus**
```json
{
  "strategic_priority_focus": {
    "description": "Company's primary strategic objective and success metrics",
    "values": {
      "growth": {
        "description": "User acquisition, market expansion, scaling focus",
        "scenario_impact": "Acquisition metrics priority, onboarding optimization, virality considerations"
      },
      "efficiency": {
        "description": "Cost reduction, process optimization, productivity focus",
        "scenario_impact": "ROI justification, workflow streamlining, automation opportunities"
      },
      "innovation": {
        "description": "Competitive differentiation, cutting-edge features, market leadership",
        "scenario_impact": "Novel approaches valued, competitive analysis, risk tolerance higher"
      },
      "stability": {
        "description": "Reliability, risk mitigation, consistent performance",
        "scenario_impact": "Conservative approaches, thorough testing, risk assessment priority"
      }
    }
  }
}
```

### Scenario Context Variables

#### **Problem Knowledge State**
```json
{
  "problem_knowledge_state": {
    "description": "Level of understanding about the UX problem being addressed",
    "values": {
      "unknown": {
        "description": "Problem poorly understood, exploratory research needed",
        "scenario_impact": "Discovery focus, broad investigation, hypothesis generation"
      },
      "hypothesis_driven": {
        "description": "Suspected causes identified, validation needed",
        "scenario_impact": "Targeted research, assumption testing, specific validation methods"
      },
      "known_issue": {
        "description": "Problem well-understood, solution development phase",
        "scenario_impact": "Solution-focused work, optimization, implementation planning"
      },
      "crisis": {
        "description": "Critical problem requiring immediate attention",
        "scenario_impact": "Urgent response, damage control, rapid solution deployment"
      }
    }
  }
}
```

#### **User Motivation Driver**
```json
{
  "user_motivation_driver": {
    "description": "Primary motivational factor driving user behavior and engagement",
    "values": {
      "efficiency": {
        "description": "Users motivated by speed, productivity, and task completion",
        "scenario_impact": "Workflow optimization, time-saving features, friction reduction"
      },
      "entertainment": {
        "description": "Users seeking enjoyment, engagement, and fun experiences",
        "scenario_impact": "Engagement mechanics, delight factors, emotional design"
      },
      "achievement": {
        "description": "Users driven by goals, progress, and accomplishment",
        "scenario_impact": "Progress indicators, goal-setting, achievement recognition"
      },
      "social": {
        "description": "Users motivated by connection, sharing, and community",
        "scenario_impact": "Social features, sharing mechanisms, community building"
      }
    }
  }
}
```

#### **Accessibility Requirements**
```json
{
  "accessibility_requirements": {
    "description": "Inclusive design needs and accessibility compliance level",
    "values": {
      "basic": {
        "description": "Standard accessibility practices, WCAG awareness",
        "scenario_impact": "Color contrast, keyboard navigation, alt text considerations"
      },
      "compliance": {
        "description": "WCAG 2.1 AA compliance required",
        "scenario_impact": "Formal accessibility testing, compliance documentation, audit preparation"
      },
      "inclusive": {
        "description": "Comprehensive inclusive design for diverse abilities",
        "scenario_impact": "Universal design principles, multiple interaction modes, extensive testing"
      },
      "specialized": {
        "description": "Specific accessibility needs for target user group",
        "scenario_impact": "Specialized accommodations, assistive technology integration, expert consultation"
      }
    }
  }
}
```

#### **Decision Urgency** 🆕
```json
{
  "decision_urgency": {
    "description": "How quickly decisions need to be made regardless of implementation timeline",
    "values": {
      "immediate": {
        "description": "Decision needed within hours",
        "scenario_impact": "Crisis mode, gut decisions, minimal deliberation"
      },
      "today": {
        "description": "Decision needed by end of day",
        "scenario_impact": "Rapid assessment, quick consensus, streamlined approval"
      },
      "this_week": {
        "description": "Decision needed within days",
        "scenario_impact": "Brief research possible, key stakeholder input, focused analysis"
      },
      "this_quarter": {
        "description": "Decision can wait weeks or months",
        "scenario_impact": "Thorough research, comprehensive analysis, full stakeholder engagement"
      }
    }
  }
}
```

#### **Stakes Level** 🆕
```json
{
  "stakes_level": {
    "description": "Consequence severity of decisions and potential impact of failure",
    "values": {
      "low": {
        "description": "Minimal consequences, easy to reverse or fix",
        "scenario_impact": "Experimentation encouraged, quick iterations, failure acceptable"
      },
      "moderate": {
        "description": "Notable impact but recoverable",
        "scenario_impact": "Careful consideration, some risk acceptable, recovery plans needed"
      },
      "high": {
        "description": "Significant business or user impact",
        "scenario_impact": "Thorough validation, stakeholder alignment critical, risk mitigation required"
      },
      "critical": {
        "description": "Business survival or user safety at stake",
        "scenario_impact": "Extreme caution, multiple approvals, extensive validation, no failure option"
      }
    }
  }
}
```

### User Context Variables

#### **User Role**
```json
{
  "user_role": {
    "description": "The practitioner's professional role and perspective",
    "values": {
      "ux_researcher": {
        "description": "Focused on user research and insights",
        "scenario_impact": "Research methodology emphasis, insight generation, evidence focus"
      },
      "product_designer": {
        "description": "Focused on design solutions and user experience",
        "scenario_impact": "Solution creation, visual design, interaction patterns"
      },
      "product_manager": {
        "description": "Focused on product strategy and business outcomes",
        "scenario_impact": "Business metrics, stakeholder management, roadmap priorities"
      },
      "ux_strategist": {
        "description": "Focused on strategic UX vision and organizational impact",
        "scenario_impact": "Strategic thinking, organizational change, long-term vision"
      }
    }
  }
}
```

#### **Experience Level**
```json
{
  "experience_level": {
    "description": "Professional experience and expertise depth",
    "values": {
      "junior": {
        "description": "0-2 years experience, learning fundamentals",
        "scenario_impact": "Guidance needed, structured approaches, foundational skills"
      },
      "mid": {
        "description": "2-5 years experience, developing expertise",
        "scenario_impact": "Independent work, some mentoring, skill refinement"
      },
      "senior": {
        "description": "5-10 years experience, deep expertise",
        "scenario_impact": "Leadership expected, complex problems, mentoring others"
      },
      "principal": {
        "description": "10+ years experience, strategic leadership",
        "scenario_impact": "Organizational influence, strategic decisions, thought leadership"
      }
    }
  }
}
```

#### **Domain Expertise**
```json
{
  "domain_expertise": {
    "description": "Familiarity with the specific industry or problem domain",
    "values": {
      "new_to_domain": {
        "description": "No prior experience in this industry or domain",
        "scenario_impact": "Learning curve, research needed, fresh perspective"
      },
      "familiar": {
        "description": "Some knowledge of domain but not expert",
        "scenario_impact": "Basic understanding, some context, moderate confidence"
      },
      "expert": {
        "description": "Deep domain knowledge and experience",
        "scenario_impact": "Nuanced understanding, industry connections, high credibility"
      }
    }
  }
}
```

### Communication Context Variables 🆕

#### **Communication Setting**
```json
{
  "communication_setting": {
    "description": "The environment and audience size for communication",
    "values": {
      "public": {
        "description": "Large audience, formal presentation, high visibility",
        "scenario_impact": "Polished delivery, careful messaging, reputation impact"
      },
      "small_group": {
        "description": "Team or department meeting, semi-formal",
        "scenario_impact": "Interactive discussion, some formality, group dynamics"
      },
      "one_on_one": {
        "description": "Individual conversation, informal setting",
        "scenario_impact": "Personal connection, candid discussion, relationship focus"
      },
      "async_written": {
        "description": "Email, documentation, or chat communication",
        "scenario_impact": "Clarity critical, no immediate feedback, permanent record"
      }
    }
  }
}
```

#### **Communication Medium**
```json
{
  "communication_medium": {
    "description": "The channel through which communication occurs",
    "values": {
      "face_to_face": {
        "description": "In-person interaction with full context",
        "scenario_impact": "Body language visible, immediate feedback, personal connection"
      },
      "video_call": {
        "description": "Remote video communication",
        "scenario_impact": "Some visual cues, technical considerations, screen sharing"
      },
      "written_formal": {
        "description": "Documentation, reports, formal emails",
        "scenario_impact": "Permanent record, careful wording, asynchronous"
      },
      "chat_informal": {
        "description": "Slack, Teams, informal messaging",
        "scenario_impact": "Quick exchanges, informal tone, context switching"
      }
    }
  }
}
```

#### **Feedback Culture**
```json
{
  "feedback_culture": {
    "description": "Organizational norms around giving and receiving feedback",
    "values": {
      "direct": {
        "description": "Frank, straightforward feedback expected",
        "scenario_impact": "Blunt communication acceptable, efficiency valued, thick skin needed"
      },
      "diplomatic": {
        "description": "Tactful, careful feedback delivery",
        "scenario_impact": "Softened messaging, relationship preservation, indirect communication"
      },
      "hierarchical": {
        "description": "Feedback flows down hierarchy, rarely upward",
        "scenario_impact": "Power dynamics critical, upward feedback risky, formal channels"
      },
      "radical_candor": {
        "description": "Direct but caring feedback culture",
        "scenario_impact": "Honest but supportive, growth mindset, psychological safety"
      }
    }
  }
}
```

### Relationship Context Variables 🆕

#### **Relationship Duration**
```json
{
  "relationship_duration": {
    "description": "Length and depth of professional relationship",
    "values": {
      "first_interaction": {
        "description": "No prior relationship or context",
        "scenario_impact": "Establishing credibility, building rapport, unknown dynamics"
      },
      "new_relationship": {
        "description": "Less than 3 months, still building trust",
        "scenario_impact": "Developing understanding, some context, growing trust"
      },
      "established": {
        "description": "6+ months, solid working relationship",
        "scenario_impact": "Mutual understanding, established patterns, predictable interactions"
      },
      "long_term": {
        "description": "Years of collaboration, deep trust",
        "scenario_impact": "Shorthand communication, high trust, accumulated context"
      }
    }
  }
}
```

#### **Trust Level**
```json
{
  "trust_level": {
    "description": "Degree of mutual trust and confidence in the relationship",
    "values": {
      "none": {
        "description": "No trust established, skepticism present",
        "scenario_impact": "Proof required, defensive postures, formal communication"
      },
      "building": {
        "description": "Early trust development, cautious optimism",
        "scenario_impact": "Small tests, growing confidence, relationship investment"
      },
      "moderate": {
        "description": "Reasonable trust, professional confidence",
        "scenario_impact": "Assumption of good intent, collaborative work, some vulnerability"
      },
      "high": {
        "description": "Deep trust, strong partnership",
        "scenario_impact": "Open communication, risk-taking together, mutual support"
      }
    }
  }
}
```

#### **Power Relationship**
```json
{
  "power_relationship": {
    "description": "Hierarchical relationship and power dynamics",
    "values": {
      "upward": {
        "description": "Communicating to higher authority",
        "scenario_impact": "Careful framing, political awareness, respect dynamics"
      },
      "peer": {
        "description": "Equal level collaboration",
        "scenario_impact": "Balanced exchange, mutual respect, collaborative approach"
      },
      "downward": {
        "description": "Managing or mentoring junior team members",
        "scenario_impact": "Teaching opportunity, patience needed, development focus"
      },
      "cross_functional": {
        "description": "Different department or expertise area",
        "scenario_impact": "Translation needed, different priorities, bridge-building"
      }
    }
  }
}
```

### Market Context Variables 🆕

#### **Organizational Change State**
```json
{
  "organizational_change_state": {
    "description": "Current state of organizational transformation or stability",
    "values": {
      "stable": {
        "description": "Organization in steady state, no major changes",
        "scenario_impact": "Predictable environment, established processes, incremental improvements"
      },
      "restructuring": {
        "description": "Internal reorganization, role changes, new leadership",
        "scenario_impact": "Uncertainty, political dynamics, relationship rebuilding"
      },
      "merger_acquisition": {
        "description": "Company merger or acquisition in progress",
        "scenario_impact": "Culture clash, process integration, survival mode"
      },
      "pivot": {
        "description": "Major strategic or product direction change",
        "scenario_impact": "Rapid changes, new priorities, previous work deprecated"
      }
    }
  }
}
```

#### **Market Disruption Level**
```json
{
  "market_disruption_level": {
    "description": "Degree of market volatility and competitive disruption",
    "values": {
      "stable": {
        "description": "Mature market with established players",
        "scenario_impact": "Predictable competition, incremental innovation, established patterns"
      },
      "evolving": {
        "description": "Market growing with new entrants",
        "scenario_impact": "Increasing competition, feature race, differentiation focus"
      },
      "disrupting": {
        "description": "New technologies or models threatening status quo",
        "scenario_impact": "Urgent innovation, existential questions, rapid adaptation"
      },
      "crisis": {
        "description": "Market collapse or fundamental shift",
        "scenario_impact": "Survival mode, radical pivots, emergency measures"
      }
    }
  }
}
```

#### **Geographic Distribution**
```json
{
  "geographic_distribution": {
    "description": "Team and user geographic spread",
    "values": {
      "colocated": {
        "description": "Everyone in same location",
        "scenario_impact": "Easy collaboration, shared context, informal communication"
      },
      "distributed": {
        "description": "Team across multiple offices",
        "scenario_impact": "Coordination challenges, time zone considerations, travel needs"
      },
      "global": {
        "description": "Worldwide presence across many time zones",
        "scenario_impact": "Async communication, cultural differences, localization needs"
      },
      "remote_first": {
        "description": "Fully remote organization",
        "scenario_impact": "Digital collaboration, documentation critical, intentional culture"
      }
    }
  }
}
```

### Research Context Variables 🆕

#### **Existing Data Availability**
```json
{
  "existing_data_availability": {
    "description": "Amount of prior research and data available",
    "values": {
      "none": {
        "description": "No existing research or data",
        "scenario_impact": "Start from scratch, primary research needed, longer timeline"
      },
      "minimal": {
        "description": "Some basic data or outdated research",
        "scenario_impact": "Limited foundation, validation needed, gaps to fill"
      },
      "moderate": {
        "description": "Reasonable amount of recent research",
        "scenario_impact": "Good starting point, can build on existing, some validation needed"
      },
      "extensive": {
        "description": "Rich research history and data",
        "scenario_impact": "Synthesis focus, meta-analysis possible, incremental additions"
      }
    }
  }
}
```

#### **Previous Research History**
```json
{
  "previous_research_history": {
    "description": "Nature and quality of prior research efforts",
    "values": {
      "greenfield": {
        "description": "No prior research in this area",
        "scenario_impact": "Exploratory approach, foundational work, methodology flexibility"
      },
      "fragmented": {
        "description": "Some research but disconnected or inconsistent",
        "scenario_impact": "Integration needed, validation required, coherence building"
      },
      "solid_foundation": {
        "description": "Good prior research to build upon",
        "scenario_impact": "Can go deeper, expand scope, leverage existing insights"
      },
      "conflicting": {
        "description": "Prior research with contradictory findings",
        "scenario_impact": "Resolution needed, methodology scrutiny, careful validation"
      }
    }
  }
}
```

#### **Success Metrics Clarity**
```json
{
  "success_metrics_clarity": {
    "description": "How well-defined success measures are",
    "values": {
      "undefined": {
        "description": "No clear success metrics established",
        "scenario_impact": "Definition needed, alignment required, measurement challenges"
      },
      "vague": {
        "description": "General ideas but not quantified",
        "scenario_impact": "Clarification needed, operationalization required, alignment work"
      },
      "clear": {
        "description": "Well-defined metrics and targets",
        "scenario_impact": "Clear goals, measurable outcomes, focused work"
      },
      "sophisticated": {
        "description": "Advanced metrics with leading/lagging indicators",
        "scenario_impact": "Nuanced measurement, predictive capability, strategic alignment"
      }
    }
  }
}
```

---

## 🔗 Universal Constraint DNA Variables

These create challenges and pressures. Typically **variable** across scenarios for diverse learning.

### Resource Constraint Variables

#### **Time Constraint Pressure**
```json
{
  "time_constraint_pressure": {
    "description": "Timeline pressure affecting decision-making speed",
    "values": {
      "unlimited": {
        "description": "No time pressure, can take optimal approach",
        "scenario_impact": "Comprehensive research possible, thorough iteration, quality focus"
      },
      "comfortable": {
        "description": "Adequate time for good UX process",
        "scenario_impact": "Standard methodology applicable, reasonable validation"
      },
      "tight": {
        "description": "Limited time requiring process adaptation",
        "scenario_impact": "Prioritization needed, streamlined methods, efficiency focus"
      },
      "impossible": {
        "description": "Extreme time pressure demanding immediate decisions",
        "scenario_impact": "Crisis decision-making, minimal validation, rapid response"
      }
    }
  }
}
```

#### **Budget Constraint Severity**
```json
{
  "budget_constraint_severity": {
    "description": "Financial limitations affecting research methods and scope",
    "values": {
      "unlimited": {
        "description": "No budget constraints",
        "scenario_impact": "Premium methods available, external agencies, extensive research"
      },
      "adequate": {
        "description": "Standard budget for normal processes",
        "scenario_impact": "Typical research methods, standard tools, reasonable scope"
      },
      "limited": {
        "description": "Tight budget requiring creativity",
        "scenario_impact": "Cost-effective methods, free tools, internal recruitment"
      },
      "minimal": {
        "description": "Extremely low budget",
        "scenario_impact": "Guerrilla methods only, existing data focus, volunteer participants"
      }
    }
  }
}
```

#### **Team Constraint Reality**
```json
{
  "team_constraint_reality": {
    "description": "Team capacity and skill limitations",
    "values": {
      "full_team": {
        "description": "Complete team with all skills",
        "scenario_impact": "Complex solutions feasible, specialized expertise, collaboration"
      },
      "adequate": {
        "description": "Standard team with some gaps",
        "scenario_impact": "Most solutions feasible, some adaptation needed"
      },
      "limited": {
        "description": "Reduced team or skill gaps",
        "scenario_impact": "Simplified solutions, skill constraints, limited collaboration"
      },
      "solo": {
        "description": "Single person handling everything",
        "scenario_impact": "Must be implementable alone, broad skills needed"
      }
    }
  }
}
```

#### **Tool Access Limitations**
```json
{
  "tool_access_limitations": {
    "description": "Restrictions on available software and platforms",
    "values": {
      "full_access": {
        "description": "Premium tools and platforms available",
        "scenario_impact": "Advanced methodologies, sophisticated analysis"
      },
      "standard": {
        "description": "Basic professional tools available",
        "scenario_impact": "Standard UX tools, typical capabilities"
      },
      "limited": {
        "description": "Restricted tool access",
        "scenario_impact": "Creative workarounds, manual processes"
      },
      "restricted": {
        "description": "Minimal tools, mostly manual",
        "scenario_impact": "Paper-based processes, extreme creativity needed"
      }
    }
  }
}
```

### Stakeholder Constraint Variables

#### **Stakeholder Resistance Level**
```json
{
  "stakeholder_resistance_level": {
    "description": "Degree of stakeholder opposition to UX work",
    "values": {
      "supportive": {
        "description": "Stakeholders champion UX",
        "scenario_impact": "Resource support, collaboration, advocacy"
      },
      "neutral": {
        "description": "Neither support nor oppose",
        "scenario_impact": "Standard interaction, basic cooperation"
      },
      "skeptical": {
        "description": "Question UX value",
        "scenario_impact": "Justification required, evidence needed, persuasion necessary"
      },
      "hostile": {
        "description": "Actively oppose UX work",
        "scenario_impact": "Political navigation, crisis communication, resistance management"
      }
    }
  }
}
```

#### **Decision Authority Clarity**
```json
{
  "decision_authority_clarity": {
    "description": "Clarity of decision-making authority",
    "values": {
      "clear": {
        "description": "Single clear decision-maker",
        "scenario_impact": "Straightforward approval, direct communication"
      },
      "somewhat_clear": {
        "description": "Primary decision-maker with some ambiguity",
        "scenario_impact": "Minor navigation, some alignment needed"
      },
      "unclear": {
        "description": "Multiple potential decision-makers",
        "scenario_impact": "Stakeholder mapping, consensus building required"
      },
      "contested": {
        "description": "Competing claims to authority",
        "scenario_impact": "Political navigation essential, conflict management"
      }
    }
  }
}
```

#### **UX Literacy Constraint**
```json
{
  "ux_literacy_constraint": {
    "description": "Stakeholder understanding of UX",
    "values": {
      "expert": {
        "description": "Deep UX understanding",
        "scenario_impact": "Technical discussions, methodology appreciation"
      },
      "informed": {
        "description": "Basic UX awareness",
        "scenario_impact": "Some education needed, method explanation"
      },
      "business_focused": {
        "description": "Values UX but wants ROI",
        "scenario_impact": "Business translation, outcome emphasis"
      },
      "naive": {
        "description": "Little UX understanding",
        "scenario_impact": "Basic education, simple explanations, value demonstration"
      }
    }
  }
}
```

#### **Stakeholder Availability**
```json
{
  "stakeholder_availability": {
    "description": "Accessibility of key stakeholders",
    "values": {
      "high": {
        "description": "Readily available",
        "scenario_impact": "Regular check-ins, immediate feedback"
      },
      "medium": {
        "description": "Available with scheduling",
        "scenario_impact": "Planned meetings, moderate responsiveness"
      },
      "low": {
        "description": "Limited availability",
        "scenario_impact": "Efficient meetings, async communication"
      },
      "minimal": {
        "description": "Extremely limited access",
        "scenario_impact": "Brief updates only, decision delays"
      }
    }
  }
}
```

#### **Communication Constraint Severity**
```json
{
  "communication_constraint_severity": {
    "description": "Restrictions on information sharing",
    "values": {
      "open": {
        "description": "Free information sharing",
        "scenario_impact": "Transparent updates, flexible communication"
      },
      "standard": {
        "description": "Normal business protocols",
        "scenario_impact": "Professional communication, standard channels"
      },
      "formal": {
        "description": "Structured communication required",
        "scenario_impact": "Formal presentations, documented processes"
      },
      "restricted": {
        "description": "Limited communication allowed",
        "scenario_impact": "Minimal sharing, controlled access, security protocols"
      }
    }
  }
}
```

### Technical Constraint Variables

#### **Engineering Constraint Type**
```json
{
  "engineering_constraint_type": {
    "description": "Primary technical limitation type",
    "values": {
      "performance": {
        "description": "Speed or processing limitations",
        "scenario_impact": "Optimization focus, interaction limits"
      },
      "security": {
        "description": "Privacy or safety requirements",
        "scenario_impact": "Security-UX balance, compliance needs"
      },
      "platform": {
        "description": "OS or device limitations",
        "scenario_impact": "Platform-specific design, compatibility"
      },
      "integration": {
        "description": "Legacy system constraints",
        "scenario_impact": "System compatibility, interface restrictions"
      }
    }
  }
}
```

#### **Technical Stakeholder Involvement**
```json
{
  "technical_stakeholder_involvement": {
    "description": "Engineering team participation level",
    "values": {
      "minimal": {
        "description": "Engineering provides constraints only",
        "scenario_impact": "Work within given constraints"
      },
      "collaborative": {
        "description": "Active engineering participation",
        "scenario_impact": "Joint problem-solving, integration"
      },
      "leading": {
        "description": "Engineering drives technical decisions",
        "scenario_impact": "Technical priorities first"
      },
      "blocking": {
        "description": "Engineering resistance",
        "scenario_impact": "Technical objections, negotiation needed"
      }
    }
  }
}
```

#### **Implementation Complexity**
```json
{
  "implementation_complexity": {
    "description": "Development difficulty required",
    "values": {
      "simple": {
        "description": "Straightforward implementation",
        "scenario_impact": "Quick implementation, few barriers"
      },
      "standard": {
        "description": "Typical development effort",
        "scenario_impact": "Normal timeline, standard resources"
      },
      "complex": {
        "description": "Challenging implementation",
        "scenario_impact": "Extended timeline, specialized skills"
      },
      "architectural": {
        "description": "System redesign required",
        "scenario_impact": "Major project, long-term commitment"
      }
    }
  }
}
```

#### **Technical Debt Impact**
```json
{
  "technical_debt_impact": {
    "description": "Legacy technical decisions affecting design",
    "values": {
      "none": {
        "description": "Clean codebase",
        "scenario_impact": "Full design freedom"
      },
      "minor": {
        "description": "Some legacy considerations",
        "scenario_impact": "Slight adaptations needed"
      },
      "significant": {
        "description": "Notable legacy constraints",
        "scenario_impact": "Design solutions constrained"
      },
      "blocking": {
        "description": "Major legacy obstacles",
        "scenario_impact": "Severe limitations, innovation constrained"
      }
    }
  }
}
```

### Business Constraint Variables

#### **Competitive Pressure Intensity**
```json
{
  "competitive_pressure_intensity": {
    "description": "Market competition level",
    "values": {
      "none": {
        "description": "No immediate competition",
        "scenario_impact": "User experience focus"
      },
      "low": {
        "description": "Some competitive awareness",
        "scenario_impact": "Differentiation opportunities"
      },
      "moderate": {
        "description": "Active competition",
        "scenario_impact": "Feature parity needs, positioning"
      },
      "extreme": {
        "description": "Intense competition",
        "scenario_impact": "Speed over perfection, defensive strategies"
      }
    }
  }
}
```

#### **Regulatory Compliance Pressure**
```json
{
  "regulatory_compliance_pressure": {
    "description": "Legal and regulatory requirements",
    "values": {
      "none": {
        "description": "No specific requirements",
        "scenario_impact": "Design freedom"
      },
      "guidelines": {
        "description": "Industry best practices",
        "scenario_impact": "Best practice adherence"
      },
      "strict_rules": {
        "description": "Mandatory compliance",
        "scenario_impact": "Compliance-first design"
      },
      "legal_requirements": {
        "description": "Legal mandates with penalties",
        "scenario_impact": "Legal approval required, risk mitigation"
      }
    }
  }
}
```

#### **Business Impact Urgency**
```json
{
  "business_impact_urgency": {
    "description": "Timeline for business results",
    "values": {
      "long_term": {
        "description": "Results over months/years",
        "scenario_impact": "Strategic thinking, quality focus"
      },
      "medium_term": {
        "description": "Results within quarters",
        "scenario_impact": "Balanced approach, milestones"
      },
      "short_term": {
        "description": "Results within weeks",
        "scenario_impact": "Quick wins, immediate impact"
      },
      "immediate": {
        "description": "Results needed now",
        "scenario_impact": "Crisis response, emergency measures"
      }
    }
  }
}
```

#### **Innovation Constraint Severity**
```json
{
  "innovation_constraint_severity": {
    "description": "Limitations on creative approaches",
    "values": {
      "experimental": {
        "description": "Innovation encouraged",
        "scenario_impact": "Creative solutions, experimentation"
      },
      "balanced": {
        "description": "Innovation within bounds",
        "scenario_impact": "Calculated risks, validation"
      },
      "conservative": {
        "description": "Proven approaches preferred",
        "scenario_impact": "Established patterns, risk aversion"
      },
      "rigid": {
        "description": "No deviation allowed",
        "scenario_impact": "Standard practices only"
      }
    }
  }
}
```

#### **External Pressure Sources**
```json
{
  "external_pressure_sources": {
    "description": "External forces affecting decisions",
    "values": {
      "none": {
        "description": "No external pressures",
        "scenario_impact": "Internal focus, team-driven"
      },
      "some": {
        "description": "Limited external pressure",
        "scenario_impact": "Some external considerations"
      },
      "multiple": {
        "description": "Several pressure sources",
        "scenario_impact": "Multiple stakeholder management"
      },
      "overwhelming": {
        "description": "Intense external pressure",
        "scenario_impact": "Crisis management, reactive mode"
      }
    }
  }
}
```

#### **Decision Timeline Constraint**
```json
{
  "decision_timeline_constraint": {
    "description": "Speed of organizational decisions",
    "values": {
      "immediate": {
        "description": "Decisions within hours",
        "scenario_impact": "Rapid decision-making, crisis response"
      },
      "urgent": {
        "description": "Decisions within days",
        "scenario_impact": "Fast turnaround, quick consensus"
      },
      "standard": {
        "description": "Decisions within weeks",
        "scenario_impact": "Standard approval processes"
      },
      "extended": {
        "description": "Decisions over months",
        "scenario_impact": "Thorough analysis, slow progress"
      }
    }
  }
}
```

### Quality Constraint Variables

#### **Accuracy Requirement Level**
```json
{
  "accuracy_requirement_level": {
    "description": "Precision expected in UX work",
    "values": {
      "rough": {
        "description": "General insights sufficient",
        "scenario_impact": "Quick assessments, approximations"
      },
      "adequate": {
        "description": "Standard professional accuracy",
        "scenario_impact": "Professional quality, typical standards"
      },
      "high": {
        "description": "Detailed accuracy required",
        "scenario_impact": "Rigorous methodology, comprehensive validation"
      },
      "perfect": {
        "description": "No margin for error",
        "scenario_impact": "Scientific rigor, extensive validation"
      }
    }
  }
}
```

#### **Risk Tolerance Boundary**
```json
{
  "risk_tolerance_boundary": {
    "description": "Acceptable uncertainty level",
    "values": {
      "experimental": {
        "description": "High risk tolerance",
        "scenario_impact": "Innovation encouraged, failure acceptable"
      },
      "balanced": {
        "description": "Moderate risk tolerance",
        "scenario_impact": "Calculated risks, managed approach"
      },
      "conservative": {
        "description": "Low risk tolerance",
        "scenario_impact": "Proven methods, safe choices"
      },
      "zero_risk": {
        "description": "No risk tolerance",
        "scenario_impact": "Guaranteed success required"
      }
    }
  }
}
```

#### **Documentation Requirement Depth**
```json
{
  "documentation_requirement_depth": {
    "description": "Level of documentation needed",
    "values": {
      "minimal": {
        "description": "Basic notes sufficient",
        "scenario_impact": "Quick documentation, informal"
      },
      "standard": {
        "description": "Professional documentation",
        "scenario_impact": "Standard deliverables, organized"
      },
      "comprehensive": {
        "description": "Detailed documentation",
        "scenario_impact": "Extensive records, thorough processes"
      },
      "legal": {
        "description": "Legal-grade documentation",
        "scenario_impact": "Audit-ready, compliance standards"
      }
    }
  }
}
```

---

## 📊 Variable Summary

### Total Variables: 49

#### Context Variables (27)
- **Product Context**: 4 variables
- **Company Context**: 3 variables
- **Scenario Context**: 5 variables
- **User Context**: 3 variables
- **Communication Context**: 3 variables 🆕
- **Relationship Context**: 3 variables 🆕
- **Market Context**: 3 variables 🆕
- **Research Context**: 3 variables 🆕

#### Constraint Variables (22)
- **Resource Constraints**: 4 variables
- **Stakeholder Constraints**: 5 variables
- **Technical Constraints**: 4 variables
- **Business Constraints**: 6 variables
- **Quality Constraints**: 3 variables

### Usage Guidelines
- **Context Variables**: Typically LOCKED during training sequences for consistency
- **Constraint Variables**: Typically VARIABLE to expose learners to different challenges
- **Combinations**: 49 variables with 4-5 values each = millions of unique scenario combinations

---

*This comprehensive variable system provides the foundation for generating unlimited, realistic UX training scenarios across all competencies while maintaining precise control over environmental settings and learning challenges.*