'use client';

import { useState } from 'react';
import ConfigSelector from './components/ConfigSelector';
import ScenarioDisplay from './components/ScenarioDisplay';
import ExerciseMechanic from './components/ExerciseMechanic';
import ResponseFeedback from './components/ResponseFeedback';
import DebugPanel from './components/DebugPanel';
import DebugToggle from './components/DebugToggle';
import { debugLogger } from './lib/debug-logger';
import { ScenarioConfig } from './lib/schemas/config';
import { GeneratedScenario, UserResponse } from './lib/schemas/scenario';
import { Evaluation } from './lib/schemas/evaluation';

type AppState = 'config' | 'scenario' | 'feedback';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('config');
  const [currentConfig, setCurrentConfig] = useState<ScenarioConfig | null>(null);
  const [currentScenario, setCurrentScenario] = useState<GeneratedScenario | null>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);
  const [mentorGuidance, setMentorGuidance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const handleGenerateScenario = async (config: ScenarioConfig) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Making API call to generate scenario:', config);
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Debug-Enabled': showDebugPanel ? 'true' : 'false'
        },
        body: JSON.stringify(config)
      });

      console.log('📡 API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error:', errorText);
        throw new Error('Failed to generate scenario');
      }

      const scenario = await response.json();
      console.log('✅ Scenario generated:', scenario);
      
      // Log debug info if available
      if (scenario._debugLog && showDebugPanel) {
        const log = {
          id: `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          ...scenario._debugLog
        };
        // Add to debug panel
        const currentSession = debugLogger.getCurrentSession();
        if (currentSession) {
          currentSession.logs.push(log);
          debugLogger.notifyListeners();
        }
      }
      
      // Remove debug info before setting state
      const { _debugLog, ...cleanScenario } = scenario;
      setCurrentConfig(config);
      setCurrentScenario(cleanScenario);
      setAppState('scenario');
    } catch (err) {
      setError('Failed to generate scenario. Please try again.');
      console.error('💥 Error in handleGenerateScenario:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResponse = async (userResponse: UserResponse) => {
    if (!currentScenario || !currentConfig) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Evaluate the response
      const evalResponse = await fetch('/api/evaluate-response', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Debug-Enabled': showDebugPanel ? 'true' : 'false'
        },
        body: JSON.stringify({
          scenario: currentScenario,
          userResponse
        })
      });

      if (!evalResponse.ok) {
        throw new Error('Failed to evaluate response');
      }

      const evaluation = await evalResponse.json();
      
      // Log debug info if available
      if (evaluation._debugLog && showDebugPanel) {
        const log = {
          id: `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          timestamp: new Date().toISOString(),
          ...evaluation._debugLog
        };
        const currentSession = debugLogger.getCurrentSession();
        if (currentSession) {
          currentSession.logs.push(log);
          debugLogger.notifyListeners();
        }
      }
      
      // Remove debug info before setting state
      const { _debugLog, ...cleanEvaluation } = evaluation;
      setCurrentEvaluation(cleanEvaluation);

      // Get mentor guidance
      const mentorResponse = await fetch('/api/provide-guidance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Debug-Enabled': showDebugPanel ? 'true' : 'false'
        },
        body: JSON.stringify({
          evaluation,
          config: currentConfig
        })
      });

      if (mentorResponse.ok) {
        const mentorData = await mentorResponse.json();
        
        // Log debug info if available
        if (mentorData._debugLog && showDebugPanel) {
          const log = {
            id: `mentor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            ...mentorData._debugLog
          };
          const currentSession = debugLogger.getCurrentSession();
          if (currentSession) {
            currentSession.logs.push(log);
            debugLogger.notifyListeners();
          }
        }
        
        setMentorGuidance(mentorData.guidance);
      }

      setAppState('feedback');
    } catch (err) {
      setError('Failed to evaluate response. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTryAnother = () => {
    if (currentConfig) {
      handleGenerateScenario(currentConfig);
    }
  };

  const handleChangeConfig = () => {
    setAppState('config');
    setCurrentScenario(null);
    setCurrentEvaluation(null);
    setMentorGuidance(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            MetaUX
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wider">
                {currentConfig?.competency.difficulty || 'Moderate'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-sm">
              <span>Scenario #{currentScenario ? currentScenario.id.slice(-4) : '0001'}</span>
            </div>
            <DebugToggle onTogglePanel={setShowDebugPanel} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-65px)]">
        {error && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
            {error}
          </div>
        )}

        {appState === 'config' && (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full">
              <ConfigSelector
                onGenerate={handleGenerateScenario}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {(appState === 'scenario' || appState === 'feedback') && currentScenario && (
          <>
            {/* Left Pane - Exercise Content */}
            <div className="flex-1 bg-white p-10 overflow-y-auto border-r border-gray-200">
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Competency Focus</div>
                  <h1 className="text-3xl font-semibold text-gray-900">Quality Recognition</h1>
                </div>
                
                <ScenarioDisplay scenario={currentScenario} />
                
                {appState === 'scenario' ? (
                  <ExerciseMechanic
                    scenario={currentScenario}
                    onSubmit={handleSubmitResponse}
                    isSubmitting={isSubmitting}
                  />
                ) : (
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <div className="text-center text-gray-600">
                      <p className="mb-4">Your response has been submitted and evaluated.</p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={handleTryAnother}
                          className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium"
                        >
                          Try Another Scenario
                        </button>
                        <button
                          onClick={handleChangeConfig}
                          className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                          Change Configuration
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Pane - AI Mentor */}
            <div className="w-[35%] bg-gray-900 text-white flex flex-col">
              {/* Mentor Header */}
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
                    🤖
                  </div>
                  <span className="text-lg font-medium">AI Mentor</span>
                </div>
              </div>
              
              {/* Mentor Chat Area */}
              <div className="flex-1 p-6 overflow-y-auto">
                {appState === 'feedback' && currentEvaluation ? (
                  <ResponseFeedback
                    evaluation={currentEvaluation}
                    mentorGuidance={mentorGuidance || undefined}
                  />
                ) : (
                  <div className="bg-gray-800 rounded-xl p-4">
                    <p className="text-gray-400 text-sm">I&apos;m here to help you develop pattern recognition skills. Submit your response and I&apos;ll provide detailed feedback on what you observed and what patterns to watch for.</p>
                  </div>
                )}
              </div>
              
              {/* Action Bar */}
              {appState === 'scenario' && (
                <div className="p-5 border-t border-gray-800">
                  <button
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Waiting for submission...'}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Debug Panel */}
      <DebugPanel isVisible={showDebugPanel} onClose={() => setShowDebugPanel(false)} />
    </div>
  );
}
