// app/lib/validation/pattern-validator.ts

import { getPatternNames, isValidPattern } from '../competencies/definitions';

export function validateScenarioPatterns(
  scenario: any,
  competency: { macro: string; micro: string }
): {
  valid: boolean;
  invalidPatterns: string[];
  suggestions: string[];
} {
  const validPatternNames = getPatternNames(competency.macro, competency.micro);
  const invalidPatterns: string[] = [];
  const suggestions: string[] = [];

  for (const pattern of scenario.embedded_patterns) {
    if (!isValidPattern(pattern, competency.macro, competency.micro)) {
      invalidPatterns.push(pattern);
      
      // Try to suggest the correct pattern
      const suggestion = findClosestValidPattern(pattern, validPatternNames);
      if (suggestion) {
        suggestions.push(`"${pattern}" → "${suggestion}"`);
      }
    }
  }

  return {
    valid: invalidPatterns.length === 0,
    invalidPatterns,
    suggestions
  };
}

function findClosestValidPattern(invalid: string, valid: string[]): string | null {
  // Simple matching - could be improved with fuzzy matching
  const invalidLower = invalid.toLowerCase();
  
  for (const validPattern of valid) {
    if (invalidLower.includes(validPattern.split('_')[0])) {
      return validPattern;
    }
  }
  
  return null;
}

// Add this to your scenario generation to validate:
export function enforcePatternCompliance(scenario: any, competency: any) {
  const validation = validateScenarioPatterns(scenario, competency);
  
  if (!validation.valid) {
    console.error('❌ Pattern Validation Failed:');
    console.error('Invalid patterns:', validation.invalidPatterns);
    console.error('Suggestions:', validation.suggestions);
    
    // Optionally throw error or filter out invalid patterns
    scenario.embedded_patterns = scenario.embedded_patterns.filter(
      p => isValidPattern(p, competency.macro, competency.micro)
    );
  }
  
  return scenario;
}