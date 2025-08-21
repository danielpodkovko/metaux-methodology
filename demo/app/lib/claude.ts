import Anthropic from '@anthropic-ai/sdk';
import { ScenarioConfig } from './schemas/config';
import { GeneratedScenario, UserResponse } from './schemas/scenario';
import { Evaluation } from './schemas/evaluation';
import { SCENARIO_GENERATOR_PROMPT, ASSESSMENT_AGENT_PROMPT, MENTOR_AGENT_PROMPT } from './prompts';
import { debugLogger } from './debug-logger';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface ScenarioWithDebug extends GeneratedScenario {
  _debugLog?: any;
}

export async function generateScenario(config: ScenarioConfig): Promise<ScenarioWithDebug> {
  const startTime = Date.now();
  
  try {
    console.log('🔥 Claude API call starting...', { config, apiKey: process.env.ANTHROPIC_API_KEY ? 'SET' : 'MISSING' });
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.7,
      system: SCENARIO_GENERATOR_PROMPT,
      messages: [{
        role: 'user',
        content: `Generate a scenario based on this configuration:\n${JSON.stringify(config, null, 2)}`
      }]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response format');
    }

    const scenarioData = JSON.parse(content.text);
    
    const duration = Date.now() - startTime;
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
          model: 'claude-3-5-sonnet-20241022',
          temperature: 0.7,
          max_tokens: 1000
        }
      }
    };

    return result;
  } catch (error) {
    console.error('Error generating scenario:', error);
    const duration = Date.now() - startTime;
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
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    };
    throw errorResult;
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
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      temperature: 0.3,
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

    const duration = Date.now() - startTime;
    const parsedResult = JSON.parse(content.text);
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
          model: 'claude-3-5-sonnet-20241022',
          temperature: 0.3,
          max_tokens: 1000
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
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      temperature: 0.5,
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
          model: 'claude-3-5-sonnet-20241022',
          temperature: 0.5,
          max_tokens: 500
        }
      }
    };

    return result;
  } catch (error) {
    console.error('Error providing mentorship:', error);
    throw error;
  }
}