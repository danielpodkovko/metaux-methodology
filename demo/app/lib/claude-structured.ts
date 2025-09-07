// Alternative approach using structured outputs to guarantee valid JSON
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

// Define the scenario schema for structured output
const SCENARIO_TOOL = {
  name: "generate_scenario",
  description: "Generate a training scenario with quality patterns",
  input_schema: {
    type: "object",
    properties: {
      context: {
        type: "string",
        description: "1-2 sentences setting the scene"
      },
      situation: {
        type: "string",
        description: "Detailed scenario where patterns manifest naturally"
      },
      data_presented: {
        type: "string",
        description: "Specific research output/data to evaluate"
      },
      decision_prompt: {
        type: "string",
        description: "What the user needs to judge"
      },
      embedded_patterns: {
        type: "array",
        items: { type: "string" },
        description: "Array of pattern names that were embedded"
      }
    },
    required: ["context", "situation", "data_presented", "decision_prompt", "embedded_patterns"]
  }
};

export async function generateScenarioStructured(config: any, prompt: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-latest',
    max_tokens: 800,
    temperature: 0.7,
    tools: [SCENARIO_TOOL],
    tool_choice: { type: "tool", name: "generate_scenario" },
    messages: [{
      role: 'user',
      content: prompt
    }]
  });

  // Extract the tool use response
  const toolUse = response.content.find(c => c.type === 'tool_use');
  if (toolUse && toolUse.type === 'tool_use') {
    return toolUse.input; // This is guaranteed to be valid JSON
  }
  
  throw new Error('No structured output received');
}