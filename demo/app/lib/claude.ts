import Anthropic from '@anthropic-ai/sdk';
import { ScenarioConfig } from './schemas/config';
import { GeneratedScenario, UserResponse } from './schemas/scenario';
import { Evaluation } from './schemas/evaluation';
import { SCENARIO_GENERATOR_PROMPT, ASSESSMENT_AGENT_PROMPT, MENTOR_AGENT_PROMPT } from './prompts';
import { debugLogger } from './debug-logger';
import { SelectedVariables } from './variables/system/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Multi-model configuration for different tasks
export const MODEL_CONFIG = {
  // Creative tasks - need quality
  scenario: {
    model: 'claude-3-5-sonnet-latest',  // 2-3x faster than Opus
    max_tokens: 800,  // Balanced for speed and completeness
    temperature: 0.7
  },
  // Analytical tasks - can use faster model
  assessment: {
    model: 'claude-3-haiku-20240307',  // 10x faster
    max_tokens: 400,
    temperature: 0.3
  },
  // Simple formatting tasks
  mentor: {
    model: 'claude-3-haiku-20240307',  // Very fast
    max_tokens: 200,
    temperature: 0.5
  }
};

export interface ScenarioWithDebug extends GeneratedScenario {
  _debugLog?: any;
}

function buildEnhancedPrompt(config: any): string {
  const variables = config.selectedVariables;
  
  return `Generate a scenario for ${config.competency.micro} pattern recognition.

Configuration:
- Industry: ${config.universal_variables.industry_context}
- Company Stage: ${config.universal_variables.company_stage}
- Time Pressure: ${config.universal_variables.time_pressure}
- Exercise Type: ${config.exercise_type}

QUALITY PATTERNS TO EMBED:
${variables.primary.map((v: any) => `
Pattern: ${v.display_name}
- Quality Level: ${v.selectedLevel} (${v.levelDetails?.quality_signal || v.quality_signal})
- Observable Signals: ${v.levelDetails?.observable_signals?.join(', ') || 'Natural signals'}
- How it manifests: ${v.levelDetails?.scenario_manifestation || 'Show through realistic examples'}
`).join('\n')}

Generate a realistic scenario that:
1. Naturally embeds ALL these quality patterns
2. Shows the patterns through specific examples and observations
3. Does NOT explicitly state what the patterns are
4. Feels authentic to the ${config.universal_variables.industry_context} context
5. Reflects the ${config.universal_variables.time_pressure} time pressure appropriately

CRITICAL JSON FORMATTING RULES:
- Return ONLY valid JSON, no markdown, no explanations
- Use double quotes for all strings
- Escape any quotes inside strings with \"
- Replace newlines in text with spaces or \\n
- No trailing commas
- No comments

Return this EXACT JSON structure:
{
  "context": "1-2 sentences setting the scene WITHOUT newlines",
  "situation": "Detailed scenario where patterns manifest naturally - use spaces not newlines",
  "data_presented": "Specific research output/data to evaluate - format as single paragraph",
  "decision_prompt": "What the user needs to judge",
  "embedded_patterns": ["pattern1", "pattern2", "pattern3"]
}`;
}

export async function generateScenario(config: any): Promise<ScenarioWithDebug> {
  const startTime = Date.now();
  let modelUsed = MODEL_CONFIG.scenario.model;
  
  try {
    console.log('🔥 Claude API call starting...', { 
      config, 
      apiKey: process.env.ANTHROPIC_API_KEY ? 'SET' : 'MISSING',
      model: modelUsed 
    });
    
    // Check if we have selected variables to include in the prompt
    let userMessage: string;
    if (config.selectedVariables) {
      userMessage = buildEnhancedPrompt(config);
    } else {
      userMessage = `Generate a scenario for this configuration:
${JSON.stringify(config, null, 2)}

Focus specifically on the ${config.competency.micro} micro-competency patterns.
Remember: Do NOT include patterns from other competencies like Signal vs Noise.

Return ONLY a valid JSON object with the required fields.`;
    }
    
    let response;
    try {
      // Try with optimized model first
      response = await anthropic.messages.create({
        model: MODEL_CONFIG.scenario.model,
        max_tokens: MODEL_CONFIG.scenario.max_tokens,
        temperature: MODEL_CONFIG.scenario.temperature,
        system: SCENARIO_GENERATOR_PROMPT,
        messages: [{
          role: 'user',
          content: userMessage
        }]
      });
    } catch (modelError) {
      console.warn('Sonnet model failed, falling back to Opus:', modelError);
      // Fallback to original Opus model
      modelUsed = 'claude-opus-4-1-20250805';
      response = await anthropic.messages.create({
        model: modelUsed,
        max_tokens: 1000,
        temperature: 0.7,
        system: SCENARIO_GENERATOR_PROMPT,
        messages: [{
          role: 'user',
          content: userMessage
        }]
      });
    }

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Clean up the response - remove markdown code blocks if present
    let cleanedText = content.text;
    if (cleanedText.includes('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.includes('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }
    cleanedText = cleanedText.trim();

    // Sanitize JSON to handle control characters
    // Replace literal newlines, tabs, and other control characters in string values
    cleanedText = cleanedText
      .replace(/\\n/g, '\\\\n')  // Escape newlines
      .replace(/\\t/g, '\\\\t')  // Escape tabs
      .replace(/[\x00-\x1F\x7F-\x9F]/g, ' '); // Remove other control characters

    let scenarioData;
    try {
      scenarioData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw text (first 500 chars):', cleanedText.substring(0, 500));
      
      // Try one more time with aggressive cleaning
      const aggressivelyCleaned = cleanedText
        .split('\n')
        .map(line => line.trim())
        .join(' ')
        .replace(/\s+/g, ' ');
      
      try {
        scenarioData = JSON.parse(aggressivelyCleaned);
        console.log('Successfully parsed after aggressive cleaning');
      } catch (secondError) {
        console.error('Second parse attempt failed, retrying generation...');
        
        // Retry the entire generation with stronger instructions
        const retryResponse = await anthropic.messages.create({
          model: modelUsed,
          max_tokens: modelUsed === 'claude-opus-4-1-20250805' ? 1000 : MODEL_CONFIG.scenario.max_tokens,
          temperature: 0.5, // Lower temperature for more consistent output
          system: SCENARIO_GENERATOR_PROMPT + '\n\nIMPORTANT: Return ONLY valid JSON with no formatting issues.',
          messages: [{
            role: 'user',
            content: userMessage + '\n\nREMINDER: Output must be valid JSON only, no markdown, no extra text.'
          }]
        });
        
        const retryContent = retryResponse.content[0];
        if (retryContent.type === 'text') {
          let retryText = retryContent.text.trim();
          if (retryText.includes('```')) {
            retryText = retryText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
          }
          scenarioData = JSON.parse(retryText);
          console.log('Successfully generated on retry');
        } else {
          throw new Error('Failed to generate valid JSON after retry');
        }
      }
    }
    
    const duration = Date.now() - startTime;
    console.log(`Scenario generation took ${duration}ms with ${modelUsed}`);
    
    const result: ScenarioWithDebug = {
      id: `scenario_${Date.now()}`,
      config,
      content: scenarioData,
      embedded_patterns: scenarioData.embedded_patterns,
      generated_at: new Date().toISOString(),
      _debugLog: {
        agent: 'scenario-generator',
        operation: 'generateScenario',
        duration,
        success: true,
        input: config,
        output: scenarioData,
        metadata: {
          tokens_used: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
          model: modelUsed,
          temperature: MODEL_CONFIG.scenario.temperature,
          max_tokens: modelUsed === 'claude-opus-4-1-20250805' ? 1000 : MODEL_CONFIG.scenario.max_tokens
        }
      }
    };

    return result;
  } catch (error) {
    console.error('Error generating scenario:', error);
    console.error('Full error details:', JSON.stringify(error, null, 2));
    const duration = Date.now() - startTime;
    
    // Log specific error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Include debug info even on error
    const errorResult: any = {
      error: error instanceof Error ? error.message : 'Unknown error',
      _debugLog: {
        agent: 'scenario-generator',
        operation: 'generateScenario',
        duration,
        success: false,
        input: config,
        output: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        model_used: MODEL_CONFIG.scenario.model
      }
    };
    throw error; // Throw original error for better debugging
  }
}

export interface EvaluationWithDebug extends Evaluation {
  _debugLog?: any;
}

export async function evaluateResponse(
  scenario: GeneratedScenario,
  userResponse: UserResponse
): Promise<EvaluationWithDebug> {
  const startTime = Date.now();
  
  try {
    const response = await anthropic.messages.create({
      model: MODEL_CONFIG.assessment.model,
      max_tokens: MODEL_CONFIG.assessment.max_tokens,
      temperature: MODEL_CONFIG.assessment.temperature,
      system: ASSESSMENT_AGENT_PROMPT,
      messages: [{
        role: 'user',
        content: `Evaluate this user response:\n\nScenario: ${JSON.stringify(scenario, null, 2)}\n\nUser Response: ${JSON.stringify(userResponse, null, 2)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    // Clean up the response - remove markdown code blocks if present
    let cleanedText = content.text;
    if (cleanedText.includes('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedText.includes('```')) {
      cleanedText = cleanedText.replace(/```\n?/g, '');
    }
    cleanedText = cleanedText.trim();

    const duration = Date.now() - startTime;
    console.log(`Assessment took ${duration}ms with ${MODEL_CONFIG.assessment.model}`);
    
    const parsedResult = JSON.parse(cleanedText);
    const result: EvaluationWithDebug = {
      ...parsedResult,
      _debugLog: {
        agent: 'assessment-agent',
        operation: 'evaluateResponse',
        duration,
        success: true,
        input: { scenario, userResponse },
        output: parsedResult,
        metadata: {
          tokens_used: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
          model: MODEL_CONFIG.assessment.model,
          temperature: MODEL_CONFIG.assessment.temperature,
          max_tokens: MODEL_CONFIG.assessment.max_tokens
        }
      }
    };

    return result;
  } catch (error) {
    console.error('Error evaluating response:', error);
    throw error;
  }
}

export interface MentorshipWithDebug {
  guidance: string;
  _debugLog?: any;
}

export async function provideMentorship(
  evaluation: Evaluation,
  config: ScenarioConfig
): Promise<MentorshipWithDebug> {
  const startTime = Date.now();
  
  try {
    const response = await anthropic.messages.create({
      model: MODEL_CONFIG.mentor.model,
      max_tokens: MODEL_CONFIG.mentor.max_tokens,
      temperature: MODEL_CONFIG.mentor.temperature,
      system: MENTOR_AGENT_PROMPT,
      messages: [{
        role: 'user',
        content: `Provide mentorship based on this evaluation:\n\nEvaluation: ${JSON.stringify(evaluation, null, 2)}\n\nConfig: ${JSON.stringify(config, null, 2)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    const duration = Date.now() - startTime;
    console.log(`Mentor feedback took ${duration}ms with ${MODEL_CONFIG.mentor.model}`);
    
    const result: MentorshipWithDebug = {
      guidance: content.text,
      _debugLog: {
        agent: 'mentor-agent',
        operation: 'provideMentorship',
        duration,
        success: true,
        input: { evaluation, config },
        output: content.text,
        metadata: {
          tokens_used: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
          model: MODEL_CONFIG.mentor.model,
          temperature: MODEL_CONFIG.mentor.temperature,
          max_tokens: MODEL_CONFIG.mentor.max_tokens
        }
      }
    };

    return result;
  } catch (error) {
    console.error('Error providing mentorship:', error);
    throw error;
  }
}