// app/lib/competencies/definitions.ts

export const COMPETENCY_DEFINITIONS = {
  quality_recognition: {
    name: "Quality Recognition",
    description: "Instant recognition of 'good' vs 'problematic' outcomes in research execution, analysis, and communication",
    micro_competencies: {
      data_quality_assessment: {
        name: "Data Quality Assessment Recognition",
        description: "Instantly sensing when data collection produces reliable vs unreliable information",
        patterns: {
          collection_rigor: {
            name: "Collection Rigor",
            description: "Whether data collection follows structured, consistent methods vs ad-hoc, unstructured approaches. Includes protocol adherence, standardized procedures, and systematic execution.",
            examples: [
              "Inconsistent interview protocols across participants",
              "Switching between methods mid-study",
              "Lack of standardized data collection procedures"
            ]
          },
          data_completeness: {
            name: "Data Completeness",
            description: "Whether all necessary data is captured vs missing critical information. Includes gaps in recordings, incomplete responses, partial session data.",
            examples: [
              "Missing audio during key moments",
              "Incomplete survey responses",
              "Technical issues causing data loss",
              "Sessions ending early"
            ]
          },
          internal_consistency: {
            name: "Internal Consistency",
            description: "Whether data points align and corroborate vs containing contradictions. Includes conflicting user responses, inconsistent observations, misaligned findings.",
            examples: [
              "User says 'easy' but struggles for 10 minutes",
              "Conflicting feedback within same session",
              "Observations don't match user statements"
            ]
          },
          collection_environment: {
            name: "Collection Environment",
            description: "Whether the setting enables quality data collection vs introducing noise and disruption. Includes physical space, technical setup, and environmental factors.",
            examples: [
              "Noisy coffee shop backgrounds",
              "Interruptions during sessions",
              "Poor internet causing disconnections",
              "Distracting environments"
            ]
          },
          instrument_quality: {
            name: "Instrument Quality",
            description: "Whether research instruments (surveys, guides, prototypes) are well-designed and appropriate vs flawed or misaligned with research goals.",
            examples: [
              "Leading or biased questions",
              "Wrong screening criteria",
              "Outdated survey instruments",
              "Unclear task instructions"
            ]
          },
          documentation_quality: {
            name: "Documentation Quality",
            description: "Whether research process and findings are thoroughly documented vs poorly recorded. Includes note-taking quality, session recording completeness, and observation detail.",
            examples: [
              "Progressive degradation of notes",
              "Missing timestamps or context",
              "Inconsistent detail across sessions",
              "Vague or generic observations"
            ]
          }
        },
        // These are patterns that belong to other competencies
        not_patterns: [
          "sample_size (Signal vs Noise Detection)",
          "statistical_significance (Signal vs Noise Detection)",
          "selection_bias (Signal vs Noise Detection)",
          "participant_bias (Signal vs Noise Detection)",
          "correlation_validity (Signal vs Noise Detection)"
        ]
      },
      methodological_rigor: {
        name: "Methodological Rigor Recognition",
        description: "Recognizing when research processes maintain vs compromise validity",
        patterns: {
          process_documentation: {
            name: "Process Documentation",
            description: "Whether research methods and decisions are clearly documented and justified vs unclear or absent.",
            examples: ["No explanation of method choice", "Missing research protocol"]
          },
          method_question_alignment: {
            name: "Method-Question Alignment",
            description: "Whether chosen methods appropriately address research questions vs mismatched approaches.",
            examples: ["Using surveys for behavioral observation needs", "Interviews for quantitative questions"]
          },
          execution_consistency: {
            name: "Execution Consistency",
            description: "Whether research is executed consistently across all participants and sessions vs varying approaches.",
            examples: ["Different facilitators using different styles", "Protocol changes mid-study"]
          },
          protocol_adherence: {
            name: "Protocol Adherence",
            description: "Whether established research protocols are followed vs ignored or modified without justification.",
            examples: ["Skipping screener questions", "Changing session structure arbitrarily"]
          },
          quality_controls: {
            name: "Quality Controls",
            description: "Whether quality assurance measures are in place vs absent.",
            examples: ["No pilot testing", "No data validation checks", "Missing peer review"]
          },
          researcher_expertise: {
            name: "Researcher Expertise",
            description: "Whether researcher has appropriate skills and preparation vs lacking necessary expertise.",
            examples: ["Untrained moderator", "No domain knowledge", "Poor facilitation skills"]
          }
        }
      },
      insight_quality: {
        name: "Insight Quality Recognition",
        description: "Distinguishing actionable insights from vague observations",
        patterns: {
          specificity_level: {
            name: "Specificity Level",
            description: "Whether insights are specific and detailed vs vague and generic.",
            examples: ["'Users had issues' vs detailing exact problems", "Generic recommendations"]
          },
          evidence_connection: {
            name: "Evidence Connection",
            description: "Whether insights clearly link to supporting data vs unsupported claims.",
            examples: ["Recommendations without data backing", "Insights that contradict findings"]
          },
          actionability: {
            name: "Actionability",
            description: "Whether insights lead to clear next steps vs unclear implications.",
            examples: ["'Improve usability' without specifics", "Clear design changes identified"]
          },
          appropriate_scope: {
            name: "Appropriate Scope",
            description: "Whether conclusions match the data scope vs over/undergeneralization.",
            examples: ["Claiming 'all users' from 5 participants", "Missing important segments"]
          },
          nuance_recognition: {
            name: "Nuance Recognition",
            description: "Whether insights capture complexity and edge cases vs oversimplification.",
            examples: ["Binary thinking on complex issues", "Missing contextual factors"]
          },
          practical_feasibility: {
            name: "Practical Feasibility",
            description: "Whether recommendations are implementable vs unrealistic.",
            examples: ["Suggesting complete redesign for minor issue", "Ignoring technical constraints"]
          }
        }
      }
    }
  }
};

// Helper function to get pattern names for a micro-competency
export function getPatternNames(macro: string, micro: string): string[] {
  const patterns = COMPETENCY_DEFINITIONS[macro]?.micro_competencies[micro]?.patterns;
  return patterns ? Object.keys(patterns) : [];
}

// Helper function to get pattern details
export function getPatternDetails(macro: string, micro: string, patternName: string) {
  return COMPETENCY_DEFINITIONS[macro]?.micro_competencies[micro]?.patterns[patternName];
}

// Validate if a pattern belongs to the competency
export function isValidPattern(patternName: string, macro: string, micro: string): boolean {
  const validPatterns = getPatternNames(macro, micro);
  return validPatterns.includes(patternName);
}