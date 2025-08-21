'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debugLogger } from '@/app/lib/debug-logger';

interface DebugLog {
  id: string;
  timestamp: string;
  agent: 'scenario-generator' | 'assessment-agent' | 'mentor-agent';
  operation: string;
  input: unknown;
  output: unknown;
  duration: number;
  success: boolean;
  error?: string;
  metadata?: {
    tokens_used?: number;
    model: string;
    temperature: number;
    max_tokens: number;
  };
}

interface DebugPanelProps {
  isVisible: boolean;
  onClose: () => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ isVisible, onClose }) => {
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedLog, setSelectedLog] = useState<DebugLog | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Panel position and size state (with SSR-safe defaults)
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsEnabled(debugLogger.isDebugEnabled());
    
    const currentSession = debugLogger.getCurrentSession();
    if (currentSession) {
      setLogs(currentSession.logs);
    }

    debugLogger.addListener(setLogs);
    
    // Initialize position and load saved state (client-side only)
    if (typeof window !== 'undefined') {
      // Set initial position to bottom-right
      const defaultPos = { 
        x: window.innerWidth - 820, 
        y: window.innerHeight - 620 
      };
      
      // Load saved position and size from localStorage
      const savedState = localStorage.getItem('debug-panel-state');
      if (savedState) {
        try {
          const { position: savedPos, size: savedSize } = JSON.parse(savedState);
          if (savedPos) setPosition(savedPos);
          else setPosition(defaultPos);
          if (savedSize) setSize(savedSize);
        } catch (e) {
          console.error('Failed to load debug panel state:', e);
          setPosition(defaultPos);
        }
      } else {
        setPosition(defaultPos);
      }
    }
    
    return () => {
      debugLogger.removeListener(setLogs);
    };
  }, []);
  
  // Save position and size to localStorage
  useEffect(() => {
    if (position && size) {
      localStorage.setItem('debug-panel-state', JSON.stringify({ position, size }));
    }
  }, [position, size]);
  
  // Mouse move handler for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        
        // Keep panel within viewport
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 50;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      } else if (isResizing) {
        const newWidth = resizeStart.width + (e.clientX - resizeStart.x);
        const newHeight = resizeStart.height + (e.clientY - resizeStart.y);
        
        setSize({
          width: Math.max(400, Math.min(newWidth, window.innerWidth - position.x)),
          height: Math.max(300, Math.min(newHeight, window.innerHeight - position.y))
        });
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, position]);
  
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);
  
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    });
  }, [size]);

  const toggleDebug = () => {
    if (isEnabled) {
      debugLogger.disable();
      setIsEnabled(false);
      setLogs([]);
    } else {
      debugLogger.enable();
      setIsEnabled(true);
    }
  };

  const clearLogs = () => {
    debugLogger.clearSession();
  };

  const exportLogs = () => {
    const data = debugLogger.exportSession();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-session-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'scenario-generator': return 'bg-blue-100 text-blue-800';
      case 'assessment-agent': return 'bg-green-100 text-green-800';
      case 'mentor-agent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const formatDuration = (duration: number) => {
    return duration >= 1000 ? `${(duration / 1000).toFixed(1)}s` : `${duration}ms`;
  };

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 flex items-center gap-2"
          title="Click to expand debug panel"
        >
          <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
          Debug ({logs.length})
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={panelRef}
      className="fixed bg-white border border-gray-300 shadow-2xl z-50 flex flex-col"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Header */}
      <div 
        className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between cursor-grab select-none"
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <h3 className="font-semibold">AI Agent Workflow Debug</h3>
          <span className="text-sm text-gray-300">({logs.length} calls)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDebug}
            className={`px-3 py-1 rounded text-sm font-medium ${
              isEnabled 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isEnabled ? 'Disable' : 'Enable'}
          </button>
          <button
            onClick={clearLogs}
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm"
            disabled={logs.length === 0}
          >
            Clear
          </button>
          <button
            onClick={exportLogs}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
            disabled={logs.length === 0}
          >
            Export
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="px-2 py-1 hover:bg-gray-700 rounded text-sm"
            title="Minimize panel"
          >
            −
          </button>
          <button
            onClick={onClose}
            className="px-2 py-1 hover:bg-gray-700 rounded text-sm"
            title="Hide panel (use toggle button to show)"
          >
            ×
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Log List */}
        <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
          {!isEnabled && (
            <div className="p-4 text-center text-gray-500">
              <p>Enable debugging to monitor AI agent calls</p>
            </div>
          )}
          
          {isEnabled && logs.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              <p>No agent calls yet...</p>
              <p className="text-sm mt-1">Interact with the app to see logs</p>
            </div>
          )}

          {logs.map((log) => (
            <div
              key={log.id}
              onClick={() => setSelectedLog(log)}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedLog?.id === log.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentColor(log.agent)}`}>
                  {log.agent}
                </span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatTimestamp(log.timestamp)}</span>
                  <span className={`px-1 rounded ${log.success ? 'text-green-600' : 'text-red-600'}`}>
                    {log.success ? '✓' : '✗'}
                  </span>
                </div>
              </div>
              
              <div className="text-sm font-medium mb-1">{log.operation}</div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{formatDuration(log.duration)}</span>
                {log.metadata?.tokens_used && (
                  <span>{log.metadata.tokens_used} tokens</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Log Details */}
        <div className="w-1/2 overflow-y-auto">
          {selectedLog ? (
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2">{selectedLog.operation}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Agent:</span> 
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${getAgentColor(selectedLog.agent)}`}>
                      {selectedLog.agent}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span> 
                    <span className="ml-2 font-mono">{formatDuration(selectedLog.duration)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span> 
                    <span className={`ml-2 ${selectedLog.success ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedLog.success ? 'Success' : 'Error'}
                    </span>
                  </div>
                  {selectedLog.metadata?.tokens_used && (
                    <div>
                      <span className="text-gray-500">Tokens:</span> 
                      <span className="ml-2 font-mono">{selectedLog.metadata.tokens_used}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedLog.error && (
                <div className="mb-4">
                  <h5 className="font-medium text-red-600 mb-2">Error</h5>
                  <pre className="bg-red-50 p-3 rounded text-sm text-red-800 overflow-x-auto">
                    {selectedLog.error}
                  </pre>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Input</h5>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto max-h-48 overflow-y-auto">
                    {JSON.stringify(selectedLog.input, null, 2)}
                  </pre>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Output</h5>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto max-h-48 overflow-y-auto">
                    {JSON.stringify(selectedLog.output, null, 2)}
                  </pre>
                </div>

                {selectedLog.metadata && (
                  <div>
                    <h5 className="font-medium mb-2">Metadata</h5>
                    <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>Select a log entry to view details</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize group"
        onMouseDown={handleResizeStart}
        title="Drag to resize"
      >
        <div 
          className="absolute bottom-0 right-0 w-full h-full"
          style={{ 
            background: 'linear-gradient(135deg, transparent 30%, #9ca3af 30%, #9ca3af 50%, transparent 50%, transparent 60%, #9ca3af 60%, #9ca3af 80%, transparent 80%)',
          }}
        />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

export default DebugPanel;
