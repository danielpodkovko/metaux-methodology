'use client';

import React, { useEffect, useState } from 'react';
import { debugLogger } from '@/app/lib/debug-logger';

interface DebugToggleProps {
  onTogglePanel: (visible: boolean) => void;
}

const DebugToggle: React.FC<DebugToggleProps> = ({ onTogglePanel }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [logCount, setLogCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    setIsEnabled(debugLogger.isDebugEnabled());
    setShowPanel(debugLogger.isDebugEnabled());
    
    const currentSession = debugLogger.getCurrentSession();
    setLogCount(currentSession?.logs.length || 0);

    const updateLogs = (logs: unknown[]) => {
      setLogCount(logs.length);
    };

    debugLogger.addListener(updateLogs);
    return () => debugLogger.removeListener(updateLogs);
  }, []);

  const toggleDebug = () => {
    if (isEnabled) {
      debugLogger.disable();
      setIsEnabled(false);
      setShowPanel(false);
      setLogCount(0);
      onTogglePanel(false);
    } else {
      debugLogger.enable();
      setIsEnabled(true);
      setShowPanel(true);
      onTogglePanel(true);
      // Also notify parent that debug panel should be shown
      setTimeout(() => onTogglePanel(true), 0);
    }
  };

  const togglePanel = () => {
    const newShowPanel = !showPanel;
    setShowPanel(newShowPanel);
    onTogglePanel(newShowPanel);
  };

  const testDebugLogging = () => {
    console.log('🧪 Testing debug logging...');
    const testStartTime = Date.now();
    const testLogCompletion = debugLogger.logAgentCall('scenario-generator', 'testCall', { test: true }, testStartTime);
    setTimeout(() => {
      testLogCompletion({ result: 'test successful' }, undefined, { 
        tokens_used: 100, 
        model: 'test-model', 
        temperature: 0.7, 
        max_tokens: 1000 
      });
    }, 500);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Debug Enable/Disable Button */}
      <button
        onClick={toggleDebug}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          isEnabled 
            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        title={isEnabled ? 'Disable debugging' : 'Enable debugging'}
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          Debug
        </div>
      </button>

      {/* Panel Toggle Button (only show when debugging is enabled) */}
      {isEnabled && (
        <button
          onClick={togglePanel}
          className="px-3 py-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
          title={showPanel ? 'Hide debug panel' : 'Show debug panel'}
        >
          {showPanel ? 'Hide' : 'Show'} ({logCount})
        </button>
      )}

      {/* Test Button (only show when debugging is enabled and panel is visible) */}
      {isEnabled && showPanel && (
        <button
          onClick={testDebugLogging}
          className="px-2 py-1.5 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 rounded text-xs font-medium transition-colors"
          title="Test debug logging"
        >
          Test
        </button>
      )}
    </div>
  );
};

export default DebugToggle;
