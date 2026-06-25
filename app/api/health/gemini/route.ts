import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

export async function GET() {
  const model = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';
  const hasKey = Boolean(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

  try {
    if (!hasKey) {
      return Response.json(
        {
          ok: false,
          hasKey,
          model,
          error: 'Brakuje GOOGLE_GENERATIVE_AI_API_KEY w Vercel Environment Variables.',
        },
        { status: 500 }
      );
    }

    const result = await generateText({
      model: google(model),
      prompt: 'Odpowiedz dokładnie jednym słowem: OK',
      maxTokens: 5,
    });

    return Response.json({
      ok: true,
      hasKey,
      model,
      text: result.text,
    });
  } catch (error) {
    console.error('[health/gemini]', error);

    return Response.json(
      {
        ok: false,
        hasKey,
        model,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
