// This route generates scenarios for quality recognition training
// It validates that generated patterns match the intended competency
// to prevent mixing Signal vs Noise patterns with Quality Recognition

import { NextRequest, NextResponse } from 'next/server';
import { generateScenario } from '@/app/lib/claude';
import { ScenarioConfig } from '@/app/lib/schemas/config';
import { debugLogger } from '@/app/lib/debug-logger';
import { COMPETENCY_DEFINITIONS, getPatternNames, isValidPattern } from '@/app/lib/competencies/definitions';
import { DEBUG_CONFIG } from '@/app/lib/debug-config';
import { enforcePatternCompliance } from '@/app/lib/validation/pattern-validator';
import { VariableLoader } from '@/app/lib/variables/system/variable-loader';
import { VariableSelector } from '@/app/lib/variables/system/variable-selector';
import { SelectedVariables } from '@/app/lib/variables/system/types';

export async function POST(request: NextRequest) {
  try {
    // Check if debug is enabled from client
    const debugEnabled = request.headers.get('X-Debug-Enabled') === 'true';
    if (debugEnabled && !debugLogger.isDebugEnabled()) {
      debugLogger.enable();
    }
    
    console.log('🎯 API Route: generate-scenario called');
    const config: ScenarioConfig = await request.json();
    console.log('📝 Config received:', config);
    
    if (!config.scenario_id || !config.competency || !config.universal_variables || !config.exercise_type) {
      console.log('❌ Invalid configuration');
      return NextResponse.json(
        { error: 'Invalid configuration' },
        { status: 400 }
      );
    }

    // Load variables for this competency
    // Map micro-competency names to folder names
    const competencyFolderMap: { [key: string]: string } = {
      'data_quality_assessment': 'data-quality',
      'methodological_rigor': 'methodological-rigor',
      'insight_quality': 'insights-quality'
    };
    
    const microCompetencyFolder = competencyFolderMap[config.competency.micro] || 
                                  config.competency.micro.replace(/_/g, '-');
    
    const loader = new VariableLoader();
    await loader.loadCompetency('quality-recognition', microCompetencyFolder);
    
    // Select variables for this scenario
    const selector = new VariableSelector();
    const variables = selector.selectForScenario(
      microCompetencyFolder,
      config.competency.difficulty || 'moderate',
      loader
    );
    
    // Add selected variables to config for Claude
    const enhancedConfig = {
      ...config,
      selectedVariables: variables
    };
    
    console.log('🤖 Calling generateScenario function with variables...');
    console.log('Selected variables:', variables.primary.map(v => v.display_name));
    let scenario = await generateScenario(enhancedConfig);
    console.log('✅ Scenario generated successfully');
    
    // Enforce pattern compliance - validate and clean invalid patterns
    scenario = enforcePatternCompliance(scenario, config.competency);
    
    // Filter embedded_patterns to ensure they match the competency
    const validPatterns = getPatternNames(config.competency.macro, config.competency.micro);
    
    // Log if any invalid patterns were generated (for debugging)
    const invalidPatterns = scenario.embedded_patterns.filter(
      pattern => !validPatterns.some(valid => pattern.toLowerCase().includes(valid.split('_')[0]))
    );
    
    if (invalidPatterns.length > 0) {
      console.warn('Invalid patterns generated:', invalidPatterns);
      console.warn('Expected pattern types:', validPatterns);
    }
    
    // Debug logging for pattern generation
    if (DEBUG_CONFIG.logPatternGeneration) {
      console.log('=== Scenario Generation Debug ===');
      console.log('Requested competency:', config.competency);
      console.log('Generated patterns:', scenario.embedded_patterns);
      console.log('Expected pattern types:', getPatternNames(config.competency.macro, config.competency.micro));
    }
    
    return NextResponse.json(scenario);
  } catch (error) {
    console.error('💥 Error in generate-scenario API:', error);
    return NextResponse.json(
      { error: 'Failed to generate scenario' },
      { status: 500 }
    );
  }
}

function buildPromptWithVariables(config: ScenarioConfig, variables: SelectedVariables): string {
  return `
Generate a scenario for ${config.competency.micro} pattern recognition.

Context: ${config.universal_variables.industry_context} ${config.universal_variables.company_stage}
Time Pressure: ${config.universal_variables.time_pressure}

EMBED THESE QUALITY PATTERNS:
${variables.primary.map(v => `
Variable: ${v.display_name}
Quality Level: ${v.selectedLevel} (${v.levelDetails?.quality_signal || v.quality_signal})
Signals to show: ${v.levelDetails?.observable_signals?.join(', ') || 'Not specified'}
Manifestation: ${v.levelDetails?.scenario_manifestation || 'Natural manifestation'}
`).join('\n')}

Create a realistic scenario that naturally embeds these patterns without explicitly stating them.
The scenario should feel authentic to the context and show these quality issues through specific examples and observations.
`;
}