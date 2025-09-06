// app/lib/scoring/scoring-system.ts

interface ScoringInput {
  userSelection: "high" | "medium" | "low";
  correctAnswer: "high" | "medium" | "low";
  userReasoning?: string;
  embeddedPatterns: string[];
  competency: {
    macro: string;
    micro: string;
  };
}

interface ScoringResult {
  score: number;
  breakdown: {
    selectionPoints: number;
    patternPoints: number;
    bonusPoints: number;
    penalties: number;
  };
  recognizedPatterns: string[];
  missedPatterns: string[];
  feedback: string[];
  encouragement: string;
}

export function calculateScore(input: ScoringInput): ScoringResult {
  const result: ScoringResult = {
    score: 0,
    breakdown: {
      selectionPoints: 0,
      patternPoints: 0,
      bonusPoints: 0,
      penalties: 0
    },
    recognizedPatterns: [],
    missedPatterns: [],
    feedback: [],
    encouragement: ""
  };

  // STEP 1: Base score for selection (max 40% without reasoning)
  const selectionCorrect = input.userSelection === input.correctAnswer;
  
  if (selectionCorrect) {
    result.breakdown.selectionPoints = 40;
    result.feedback.push("✓ Correct quality level identified");
  } else {
    result.breakdown.selectionPoints = 0;
    result.feedback.push(`✗ Incorrect: This was ${input.correctAnswer} quality, not ${input.userSelection}`);
  }

  // STEP 2: Pattern recognition scoring (up to 60% with reasoning)
  if (input.userReasoning && input.userReasoning.length > 20) {
    // Analyze reasoning for pattern recognition
    const recognizedPatterns = analyzePatternRecognition(
      input.userReasoning, 
      input.embeddedPatterns,
      input.competency
    );
    
    result.recognizedPatterns = recognizedPatterns.found;
    result.missedPatterns = recognizedPatterns.missed;
    
    // Each pattern worth proportional points
    const pointsPerPattern = 60 / input.embeddedPatterns.length;
    result.breakdown.patternPoints = Math.round(recognizedPatterns.found.length * pointsPerPattern);
    
    // Bonus for exceptional pattern recognition
    if (recognizedPatterns.found.length === input.embeddedPatterns.length && selectionCorrect) {
      result.breakdown.bonusPoints = 10;
      result.feedback.push("🌟 Perfect pattern recognition!");
    }
    
    // Check for competency confusion
    const confusions = detectCompetencyConfusion(input.userReasoning);
    if (confusions.length > 0) {
      result.breakdown.penalties = -5 * Math.min(confusions.length, 3); // Max -15
      result.feedback.push(`⚠️ Note: You mentioned ${confusions.join(', ')} which belong to other competencies`);
    }
    
    // Pattern-specific feedback
    if (result.recognizedPatterns.length > 0) {
      result.feedback.push(`✓ Patterns recognized: ${result.recognizedPatterns.join(', ')}`);
    }
    if (result.missedPatterns.length > 0) {
      result.feedback.push(`→ Patterns to look for: ${result.missedPatterns.join(', ')}`);
    }
    
  } else {
    // No reasoning provided
    result.missedPatterns = input.embeddedPatterns;
    result.feedback.push("💡 Add reasoning to show which patterns you recognized (worth up to 60% more!)");
  }

  // STEP 3: Calculate final score
  const totalScore = result.breakdown.selectionPoints + 
                     result.breakdown.patternPoints + 
                     result.breakdown.bonusPoints + 
                     result.breakdown.penalties;
  
  result.score = Math.max(0, Math.min(100, totalScore));

  // STEP 4: Generate encouragement based on performance
  result.encouragement = generateEncouragement(result.score, selectionCorrect, input.userReasoning);

  return result;
}

function analyzePatternRecognition(
  reasoning: string, 
  embeddedPatterns: string[],
  competency: { macro: string, micro: string }
) {
  const reasoningLower = reasoning.toLowerCase();
  const found: string[] = [];
  const missed: string[] = [];

  // Get pattern details for better matching
  const { getPatternDetails } = require('../competencies/definitions');

  for (const pattern of embeddedPatterns) {
    const patternDetails = getPatternDetails(competency.macro, competency.micro, pattern);
    
    // Check for pattern name or related keywords
    let recognized = false;
    
    // Direct pattern name mention
    if (reasoningLower.includes(pattern.replace('_', ' '))) {
      recognized = true;
    }
    
    // Check for pattern concept mentions
    if (patternDetails) {
      const keywords = patternDetails.description.toLowerCase().split(' ');
      const significantWords = keywords.filter(w => w.length > 4);
      
      for (const word of significantWords) {
        if (reasoningLower.includes(word)) {
          recognized = true;
          break;
        }
      }
    }
    
    if (recognized) {
      found.push(pattern);
    } else {
      missed.push(pattern);
    }
  }

  return { found, missed };
}

function detectCompetencyConfusion(reasoning: string): string[] {
  const confusions: string[] = [];
  const reasoningLower = reasoning.toLowerCase();

  // Signal vs Noise patterns (shouldn't appear in Quality Recognition)
  const signalNoiseTerms = [
    { term: 'sample size', competency: 'Signal vs Noise' },
    { term: 'statistical significance', competency: 'Signal vs Noise' },
    { term: 'selection bias', competency: 'Signal vs Noise' },
    { term: 'participant bias', competency: 'Signal vs Noise' },
    { term: 'correlation', competency: 'Signal vs Noise' },
    { term: 'p-value', competency: 'Signal vs Noise' },
    { term: 'confidence interval', competency: 'Signal vs Noise' }
  ];

  for (const { term, competency } of signalNoiseTerms) {
    if (reasoningLower.includes(term)) {
      confusions.push(`"${term}" (${competency})`);
    }
  }

  return confusions;
}

function generateEncouragement(score: number, correct: boolean, reasoning?: string): string {
  if (score >= 90) {
    return "Exceptional pattern recognition! You're mastering quality assessment.";
  } else if (score >= 70) {
    return "Strong performance! You're recognizing most quality patterns effectively.";
  } else if (score >= 50) {
    return "Good progress! Focus on identifying all the quality patterns in the scenario.";
  } else if (correct && !reasoning) {
    return "Right answer! Add your reasoning next time to demonstrate pattern recognition.";
  } else {
    return "Keep practicing! Look for specific quality issues in how data was collected and documented.";
  }
}

export { analyzePatternRecognition, detectCompetencyConfusion };