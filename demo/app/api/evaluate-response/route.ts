import { NextRequest, NextResponse } from 'next/server';
import { GeneratedScenario, UserResponse } from '@/app/lib/schemas/scenario';
import { debugLogger } from '@/app/lib/debug-logger';
import { getPatternNames, getPatternDetails } from '@/app/lib/competencies/definitions';
import { DEBUG_CONFIG } from '@/app/lib/debug-config';
import { calculateScore } from '@/app/lib/scoring/scoring-system';

export async function POST(request: NextRequest) {
  try {
    // Check if debug is enabled from client
    const debugEnabled = request.headers.get('X-Debug-Enabled') === 'true';
    if (debugEnabled && !debugLogger.isDebugEnabled()) {
      debugLogger.enable();
    }
    const { scenario, userResponse }: { 
      scenario: GeneratedScenario; 
      userResponse: UserResponse;
    } = await request.json();
    
    if (!scenario || !userResponse) {
      return NextResponse.json(
        { error: 'Missing scenario or user response' },
        { status: 400 }
      );
    }

    const config = scenario.config;

    // Validate that embedded patterns match framework
    const validPatterns = getPatternNames(
      config.competency.macro,
      config.competency.micro
    );

    const invalidPatterns = scenario.embedded_patterns.filter(
      p => !validPatterns.includes(p)
    );

    if (invalidPatterns.length > 0) {
      console.error('⚠️ Invalid patterns in scenario:', invalidPatterns);
      console.log('Valid patterns should be:', validPatterns);
    }

    // Calculate score using new system
    const scoringResult = calculateScore({
      userSelection: userResponse.response.selection || 'low',
      correctAnswer: determineCorrectAnswer(scenario),
      userReasoning: userResponse.response.reasoning,
      embeddedPatterns: scenario.embedded_patterns,
      competency: config.competency
    });

    // Build evaluation response
    const evaluation = {
      scenario_id: scenario.id,
      user_response: userResponse,
      assessment: {
        correct: scoringResult.score >= 40, // At least got selection right
        accuracy_score: scoringResult.score,
        score_breakdown: scoringResult.breakdown,
        recognized_patterns: scoringResult.recognizedPatterns,
        missed_patterns: scoringResult.missedPatterns,
        reasoning_quality: determineReasoningQuality(scoringResult)
      },
      feedback: {
        summary: scoringResult.feedback.join(' '),
        key_points: scoringResult.feedback.slice(0, 3),
        pattern_guidance: generatePatternGuidance(scoringResult.missedPatterns, config.competency),
        encouragement: scoringResult.encouragement
      }
    };
    
    // Debug logging for assessment
    if (DEBUG_CONFIG.logAssessment) {
      console.log('=== Assessment Debug ===');
      console.log('User recognized:', evaluation.assessment?.recognized_patterns);
      console.log('User missed:', evaluation.assessment?.missed_patterns);
      console.log('Score breakdown:', evaluation.assessment?.score_breakdown);
    }
    
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error in evaluate-response API:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate response' },
      { status: 500 }
    );
  }
}

// Helper functions
function determineCorrectAnswer(scenario: GeneratedScenario): "high" | "medium" | "low" {
  // Logic to determine correct answer based on number/severity of patterns
  const patternCount = scenario.embedded_patterns.length;
  if (patternCount >= 4) return "low";
  if (patternCount >= 2) return "medium";
  return "high";
}

function determineReasoningQuality(scoringResult: any): string {
  if (!scoringResult.recognizedPatterns.length) return "not_provided";
  const recognitionRate = scoringResult.recognizedPatterns.length / 
    (scoringResult.recognizedPatterns.length + scoringResult.missedPatterns.length);
  
  if (recognitionRate >= 0.8) return "excellent";
  if (recognitionRate >= 0.6) return "good";
  if (recognitionRate >= 0.4) return "developing";
  return "needs_improvement";
}

function generatePatternGuidance(missedPatterns: string[], competency: any): string {
  if (missedPatterns.length === 0) {
    return "Excellent pattern recognition! You identified all quality issues.";
  }
  
  const firstMissed = missedPatterns[0];
  const details = getPatternDetails(competency.macro, competency.micro, firstMissed);
  
  return `Focus on ${firstMissed.replace('_', ' ')}: ${details?.description || 'this quality pattern'}`;
}