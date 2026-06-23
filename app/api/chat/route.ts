import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText, stepCountIs, type UIMessage } from 'ai';
import { githubTools } from '@/lib/tools';
import { SYSTEM_PROMPT } from '@/lib/system-prompt';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google(process.env.GEMINI_MODEL ?? 'gemini-2.5-flash'),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    tools: githubTools,
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}
