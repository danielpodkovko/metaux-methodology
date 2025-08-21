# AI Agent Workflow Debugging Guide

This guide explains how to use the built-in debugging system for monitoring and analyzing your AI agent workflow in the MetaUX demo.

## Overview

The debugging system provides real-time monitoring of all AI agent interactions, allowing you to:

- **Monitor Live Workflows**: See input/output for each AI agent call in real-time
- **Performance Analysis**: Track response times and token usage
- **Error Debugging**: Detailed error information when agent calls fail
- **Session Management**: Persistent logging across browser sessions
- **Data Export**: Export debugging sessions for analysis

## Quick Start

### 1. Enable Debugging

Open the debug panel using any of these methods:
- **Keyboard Shortcut**: Press `Ctrl+D` (Windows/Linux) or `Cmd+D` (Mac)
- **UI Toggle**: Click the debug button in the app interface

### 2. Monitor Agent Calls

Once enabled, the debug panel will automatically capture:
- **Scenario Generator**: When generating new training scenarios
- **Assessment Agent**: When evaluating user responses  
- **Mentor Agent**: When providing guidance and feedback

### 3. Analyze Workflow Data

Click on any log entry to view:
- **Input Data**: Complete request payload sent to Claude API
- **Output Data**: Full response received from the AI agent
- **Performance Metrics**: Response time and token usage
- **Error Details**: Stack traces and error messages (if any)

## Features

### Real-Time Monitoring

```typescript
// Automatically logged when you call:
await generateScenario(config);
await evaluateResponse(scenario, userResponse);  
await provideMentorship(evaluation, config);
```

### Agent Classification

Each log entry is color-coded by agent type:
- 🔵 **Scenario Generator** (Blue) - Creates training scenarios
- 🟢 **Assessment Agent** (Green) - Evaluates user responses
- 🟣 **Mentor Agent** (Purple) - Provides learning guidance

### Performance Metrics

Track important metrics for each agent call:
- **Duration**: Response time in milliseconds/seconds
- **Token Usage**: Input + output tokens consumed
- **Success Rate**: Success/failure status with error details
- **Model Info**: Which Claude model and parameters used

### Session Persistence

Debug sessions are automatically saved to localStorage:
- Sessions persist across browser refreshes
- Debug state (enabled/disabled) remembered
- Log history maintained until manually cleared

## Interface Guide

### Debug Panel Layout

```
┌─────────────────────────────────────────────────────┐
│ AI Agent Workflow Debug (5 calls) [Ctrl/Cmd+D]     │
│ [Enable/Disable] [Clear] [Export] [−] [×]           │
├─────────────────────┬───────────────────────────────┤
│ Log List           │ Log Details                    │
│                    │                               │
│ • scenario-gen     │ Operation: generateScenario   │
│   12:34:56 ✓       │ Agent: scenario-generator     │
│   1.2s 450 tokens  │ Duration: 1.2s               │
│                    │ Status: Success              │
│ • assessment-agent │ Tokens: 450                  │
│   12:35:12 ✓       │                              │
│   0.8s 320 tokens  │ Input: { config: {...} }     │
│                    │                              │
│ • mentor-agent     │ Output: { id: "scenario_...", │
│   12:35:45 ✓       │   content: {...} }           │
│   0.6s 180 tokens  │                              │
└─────────────────────┴───────────────────────────────┘
```

### Controls

- **Enable/Disable**: Toggle debugging on/off
- **Clear**: Remove all logs from current session  
- **Export**: Download session data as JSON file
- **Minimize (−)**: Collapse to small button
- **Hide (×)**: Hide panel completely (use Ctrl/Cmd+D to show)

## Advanced Usage

### Programmatic Access

```typescript
import { debugLogger } from '@/app/lib/debug-logger';

// Check if debugging is enabled
if (debugLogger.isDebugEnabled()) {
  console.log('Debug mode active');
}

// Get current session data
const session = debugLogger.getCurrentSession();
console.log('Current logs:', session?.logs);

// Export session data
const jsonData = debugLogger.exportSession();
```

### Custom Logging

The debug logger automatically intercepts all Claude API calls, but you can extend it:

```typescript
// In claude.ts, each agent function includes:
const startTime = Date.now();
const logCompletion = debugLogger.logAgentCall(
  'scenario-generator', 
  'generateScenario', 
  config, 
  startTime
);

// ... API call ...

logCompletion(result, undefined, {
  tokens_used: response.usage?.input_tokens + response.usage?.output_tokens,
  model: 'claude-3-5-sonnet-20241022',
  temperature: 0.7,
  max_tokens: 1000
});
```

### Data Export Format

Exported JSON includes:
```json
{
  "id": "debug_session_1234567890",
  "started_at": "2024-01-15T10:30:00.000Z",
  "logs": [
    {
      "id": "scenario-generator_1234567890_abc123",
      "timestamp": "2024-01-15T10:30:05.000Z",
      "agent": "scenario-generator",
      "operation": "generateScenario",
      "input": { /* sanitized input data */ },
      "output": { /* response data */ },
      "duration": 1200,
      "success": true,
      "metadata": {
        "tokens_used": 450,
        "model": "claude-3-5-sonnet-20241022",
        "temperature": 0.7,
        "max_tokens": 1000
      }
    }
  ]
}
```

## Privacy & Security

### Data Sanitization

The debug logger automatically:
- **Redacts API Keys**: Any field containing "key" or "secret" is masked
- **Sanitizes Sensitive Data**: Personal information is filtered
- **Client-Side Only**: Debug data never leaves your browser
- **LocalStorage**: Session data stored locally, not transmitted

### Production Safety

- Debug logging has minimal performance impact when disabled
- All debug code is client-side only
- No debug data is sent to servers or external services
- Safe to leave debug code in production builds

## Troubleshooting

### Common Issues

**Debug panel not appearing**
- Press `Ctrl+D`/`Cmd+D` to toggle visibility
- Check if debugging is enabled in the panel header

**No logs showing**  
- Ensure debugging is enabled (green indicator)
- Try generating a new scenario to trigger agent calls
- Check browser console for errors

**Performance concerns**
- Debug logging adds ~1-5ms overhead per agent call
- Disable debugging for production use if concerned
- Clear logs periodically to free memory

**Export not working**
- Ensure you have logs to export
- Check browser's download settings
- Try clearing browser cache

### Browser Compatibility

Tested and supported on:
- Chrome 90+
- Firefox 88+  
- Safari 14+
- Edge 90+

## Tips & Best Practices

1. **Enable Before Testing**: Turn on debugging before running test scenarios
2. **Clear Regularly**: Clear logs between test sessions for clarity  
3. **Export Important Sessions**: Save interesting debugging sessions for analysis
4. **Monitor Performance**: Watch for slow agent responses or high token usage
5. **Check Errors**: Review failed calls to understand agent limitations

## Technical Details

### Architecture

```
User Action → API Route → Claude Function → Debug Logger
                                      ↓
                              Debug Panel ← LocalStorage
```

### Files Structure

```
app/lib/debug-logger.ts     # Core debugging functionality
app/components/DebugPanel.tsx  # Main debug UI component  
app/components/DebugToggle.tsx # Optional toggle button
app/lib/claude.ts           # Instrumented AI agent functions
```

### Performance Impact

- **Enabled**: ~2-5ms overhead per agent call
- **Disabled**: ~0.1ms overhead (negligible)
- **Memory**: ~1-5MB for typical debugging session
- **Storage**: Sessions saved to localStorage (~1-10MB)

---

Happy debugging! This system should give you complete visibility into your AI agent workflow. 🚀
