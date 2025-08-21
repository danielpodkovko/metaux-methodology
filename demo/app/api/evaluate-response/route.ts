import { NextRequest, NextResponse } from 'next/server';
import { evaluateResponse } from '@/app/lib/claude';
import { GeneratedScenario, UserResponse } from '@/app/lib/schemas/scenario';
import { debugLogger } from '@/app/lib/debug-logger';

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

    const evaluation = await evaluateResponse(scenario, userResponse);
    
    return NextResponse.json(evaluation);
  } catch (error) {
    console.error('Error in evaluate-response API:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate response' },
      { status: 500 }
    );
  }
}