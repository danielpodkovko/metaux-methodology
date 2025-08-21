import { NextRequest, NextResponse } from 'next/server';
import { generateScenario } from '@/app/lib/claude';
import { ScenarioConfig } from '@/app/lib/schemas/config';
import { debugLogger } from '@/app/lib/debug-logger';

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
    const scenario = await generateScenario(config);
    console.log('✅ Scenario generated successfully');
    
    return NextResponse.json(scenario);
  } catch (error) {
    console.error('💥 Error in generate-scenario API:', error);
    return NextResponse.json(
      { error: 'Failed to generate scenario' },
      { status: 500 }
    );
  }
}