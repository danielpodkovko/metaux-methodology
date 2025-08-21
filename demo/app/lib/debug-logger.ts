// Debug logger for AI agent workflow monitoring
export interface DebugLog {
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

export interface DebugSession {
  id: string;
  started_at: string;
  logs: DebugLog[];
}

class DebugLogger {
  private session: DebugSession | null = null;
  private isEnabled: boolean = false;
  private listeners: ((logs: DebugLog[]) => void)[] = [];

  enable() {
    this.isEnabled = true;
    this.startNewSession();
    this.saveToLocalStorage();
  }

  disable() {
    this.isEnabled = false;
    this.session = null;
    this.clearLocalStorage();
  }

  isDebugEnabled(): boolean {
    return this.isEnabled;
  }

  startNewSession() {
    this.session = {
      id: `debug_session_${Date.now()}`,
      started_at: new Date().toISOString(),
      logs: []
    };
    this.notifyListeners();
  }

  addListener(callback: (logs: DebugLog[]) => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: (logs: DebugLog[]) => void) {
    this.listeners = this.listeners.filter(l => l !== callback);
  }

  notifyListeners() {
    if (this.session) {
      this.listeners.forEach(callback => callback(this.session!.logs));
    }
  }

  logAgentCall(
    agent: DebugLog['agent'],
    operation: string,
    input: unknown,
    startTime: number
  ): (output: unknown, error?: string, metadata?: DebugLog['metadata']) => void {
    console.log('🔍 Debug logger called:', { agent, operation, enabled: this.isEnabled, hasSession: !!this.session });
    
    if (!this.isEnabled || !this.session) {
      console.log('⚠️ Debug logging skipped - not enabled or no session');
      return () => {}; // No-op if debugging is disabled
    }

    const logId = `${agent}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return (output: unknown, error?: string, metadata?: DebugLog['metadata']) => {
      const duration = Date.now() - startTime;
      
      const log: DebugLog = {
        id: logId,
        timestamp: new Date().toISOString(),
        agent,
        operation,
        input: this.sanitizeForLogging(input),
        output: this.sanitizeForLogging(output),
        duration,
        success: !error,
        error,
        metadata
      };

      this.session!.logs.push(log);
      this.notifyListeners();
      this.saveToLocalStorage();
    };
  }

  getCurrentSession(): DebugSession | null {
    return this.session;
  }

  exportSession(): string {
    if (!this.session) return '';
    return JSON.stringify(this.session, null, 2);
  }

  clearSession() {
    if (this.session) {
      this.session.logs = [];
      this.notifyListeners();
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('metaux-debug-enabled', this.isEnabled.toString());
        if (this.session) {
          localStorage.setItem('metaux-debug-session', JSON.stringify(this.session));
        }
      } catch (error) {
        console.warn('Failed to save debug state to localStorage:', error);
      }
    }
  }

  private clearLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('metaux-debug-enabled');
        localStorage.removeItem('metaux-debug-session');
      } catch (error) {
        console.warn('Failed to clear debug state from localStorage:', error);
      }
    }
  }

  private loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      try {
        const savedEnabled = localStorage.getItem('metaux-debug-enabled');
        const savedSession = localStorage.getItem('metaux-debug-session');
        
        if (savedEnabled === 'true') {
          this.isEnabled = true;
          if (savedSession) {
            this.session = JSON.parse(savedSession);
            this.notifyListeners();
          } else {
            this.startNewSession();
          }
        }
      } catch (error) {
        console.warn('Failed to load debug state from localStorage:', error);
      }
    }
  }

  // Initialize from localStorage on first load
  init() {
    this.loadFromLocalStorage();
  }

  private sanitizeForLogging(data: unknown): unknown {
    // Create a deep copy and sanitize sensitive information
    try {
      const sanitized = JSON.parse(JSON.stringify(data));
      return this.recursiveSanitize(sanitized);
    } catch {
      return { error: 'Could not serialize data for logging' };
    }
  }

  private recursiveSanitize(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) return obj;
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.recursiveSanitize(item));
    }
    
    const sanitized: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(obj)) {
      // Sanitize API keys and sensitive data
      if (key.toLowerCase().includes('key') || key.toLowerCase().includes('secret')) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object') {
        sanitized[key] = this.recursiveSanitize(value);
      } else {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }
}

// Singleton instance
export const debugLogger = new DebugLogger();

// Initialize on module load (client-side only)
if (typeof window !== 'undefined') {
  debugLogger.init();
}

// Hook for React components - import React in the component that uses this
export function useDebugLogs() {
  // This will be used in React components that import React
  return {
    debugLogger,
    isEnabled: debugLogger.isDebugEnabled(),
    enable: () => debugLogger.enable(),
    disable: () => debugLogger.disable(),
    clear: () => debugLogger.clearSession(),
    exportSession: () => debugLogger.exportSession()
  };
}

// For use in non-React contexts
export { debugLogger as default };
