import { NextRequest, NextResponse } from 'next/server';
import { provideMentorship } from '@/app/lib/claude';
import { Evaluation } from '@/app/lib/schemas/evaluation';
import { ScenarioConfig } from '@/app/lib/schemas/config';
import { debugLogger } from '@/app/lib/debug-logger';

export async function POST(request: NextRequest) {
  try {
    // Check if debug is enabled from client
    const debugEnabled = request.headers.get('X-Debug-Enabled') === 'true';
    if (debugEnabled && !debugLogger.isDebugEnabled()) {
      debugLogger.enable();
    }
    const { evaluation, config }: { 
      evaluation: Evaluation; 
      config: ScenarioConfig;
    } = await request.json();
    
    if (!evaluation || !config) {
      return NextResponse.json(
        { error: 'Missing evaluation or config' },
        { status: 400 }
      );
    }

    const result = await provideMentorship(evaluation, config);
    
    return NextResponse.json({ 
      guidance: result.guidance,
      _debugLog: result._debugLog 
    });
  } catch (error) {
    console.error('Error in provide-guidance API:', error);
    return NextResponse.json(
      { error: 'Failed to provide guidance' },
      { status: 500 }
    );
  }
}