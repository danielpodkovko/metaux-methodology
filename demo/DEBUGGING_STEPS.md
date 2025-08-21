# Debugging Steps for AI Agent Workflow

## Current Status
- ✅ Debug panel UI working (shows/hides correctly)
- ✅ API key configured in .env.local
- ✅ Dev server running on port 3000
- ❓ API calls not appearing in debug panel

## Debugging Steps

### Step 1: Test Basic Debug Logging
1. Open your app at http://localhost:3000
2. Click "Debug" button (should turn green)
3. Click "Show" button (debug panel opens)
4. Click the yellow "Test" button
5. **Expected**: Should see a test log entry appear immediately

### Step 2: Test API Call Flow
1. With debug panel open, try to generate a scenario
2. **Check browser console** for these logs:
   - 🚀 Making API call to generate scenario
   - 🎯 API Route: generate-scenario called
   - 🔍 Debug logger called
   - 🔥 Claude API call starting

### Step 3: Check for Issues
If you don't see logs, check:

#### Browser Console Errors
- Open Developer Tools (F12)
- Look for any red errors
- Check Network tab for failed requests

#### API Response Issues  
- Look for 400/500 status codes
- Check if ANTHROPIC_API_KEY is properly loaded
- Verify config object structure

#### Debug Logger Issues
- Check if debug logger is enabled
- Verify session creation
- Look for "Debug logging skipped" messages

## Expected Flow
```
User clicks "Generate Scenario"
↓
Frontend: handleGenerateScenario() 
↓
API Route: /api/generate-scenario
↓
Claude Function: generateScenario()
↓
Debug Logger: logAgentCall()
↓
Debug Panel: Shows new log entry
```

## Common Issues

### Issue 1: Debug Logger Not Enabled
**Symptoms**: "Debug logging skipped" in console
**Fix**: Make sure to click "Debug" button first

### Issue 2: API Key Missing
**Symptoms**: 401/403 errors from Anthropic
**Fix**: Check .env.local file has valid ANTHROPIC_API_KEY

### Issue 3: Config Validation Failure
**Symptoms**: 400 error from API route
**Fix**: Check browser console for config object structure

### Issue 4: Network Issues
**Symptoms**: Failed to fetch errors
**Fix**: Ensure dev server is running on port 3000

## Manual Test Commands
```bash
# Check if server is running
lsof -ti:3000

# Check environment variables
cat .env.local

# Restart dev server
npm run dev
```

## Next Steps
1. Try the test button first
2. Check browser console during scenario generation
3. Report what logs you see (or don't see)
4. We'll debug from there!
