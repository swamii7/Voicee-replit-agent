import OpenAI from "openai";

// This is using Replit's AI Integrations service, which provides OpenAI-compatible API access without requiring your own OpenAI API key.
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export async function parseVoiceCommand(transcript: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant that extracts task information from natural language.
Extract the following information from the user's message:
- title: The main task title (required)
- notes: Any additional details or notes (optional)
- dueDate: The due date in ISO format YYYY-MM-DD. For relative dates like "tomorrow", "next week", convert to actual dates. Today is ${new Date().toISOString().split('T')[0]}. (optional)
- dueTime: The time in 12-hour format like "3:00 PM" (optional)
- priority: One of "low", "medium", or "high". Default to "medium" if not specified. (optional)

Return ONLY valid JSON with these fields. Do not include any explanation.`
      },
      {
        role: "user",
        content: transcript
      }
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 500
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  return JSON.parse(content);
}
