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

    console.log('🤖 Calling generateScenario function...');
    let scenario = await generateScenario(config);
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