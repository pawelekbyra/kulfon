'use client';

import { useChat } from '@ai-sdk/react';
import { useMemo, useState } from 'react';

function renderPart(part: any, index: number) {
  if (part.type === 'text') {
    return (
      <div key={index} className="message-text">
        {part.text}
      </div>
    );
  }

  if (typeof part.type === 'string' && part.type.startsWith('tool-')) {
    return (
      <details key={index} className="tool-card">
        <summary>{part.type.replace('tool-', 'tool: ')}</summary>
        <pre>{JSON.stringify(part, null, 2)}</pre>
      </details>
    );
  }

  return null;
}

export default function Home() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error } = useChat();

  const isBusy = status === 'submitted' || status === 'streaming';

  const suggestions = useMemo(
    () => [
      'Sprawdź informacje o repozytorium.',
      'Wypisz otwarte issue.',
      'Utwórz issue dla Julesa: dodaj tryb ciemny i panel ustawień.',
      'Pokaż ostatnie deploymenty Vercel.',
    ],
    []
  );

  return (
    <main className="shell">
      <section className="hero">
        <div className="badge">Kulfon Agent · Gemini · GitHub · Vercel · Jules</div>
        <h1>Twój prywatny agent developerski</h1>
        <p>
          Czysty starter gotowy pod Google AI Studio. Podłącz tokeny, rozmawiaj z agentem i pozwól mu
          tworzyć dobrze opisane zadania dla Julesa.
        </p>
      </section>

      <section className="chat-panel" aria-label="Chat z agentem">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="orb" />
              <h2>Od czego zaczynamy?</h2>
              <p>Zapytaj o repo, deploymenty albo poproś o przygotowanie zadania dla Julesa.</p>
              <div className="suggestions">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setInput(suggestion)}
                    className="suggestion"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <article key={message.id} className={`message ${message.role}`}>
                <div className="avatar">{message.role === 'user' ? 'Ty' : 'AI'}</div>
                <div className="bubble">
                  {message.parts.map((part, index) => renderPart(part, index))}
                </div>
              </article>
            ))
          )}

          {isBusy && <div className="status">Agent pracuje…</div>}
          {error && <div className="error">Błąd: {error.message}</div>}
        </div>

        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            const text = input.trim();
            if (!text || isBusy) return;
            sendMessage({ text });
            setInput('');
          }}
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Napisz, co agent ma zrobić…"
            rows={3}
          />
          <button type="submit" disabled={isBusy || !input.trim()}>
            Wyślij
          </button>
        </form>
      </section>
    </main>
  );
}
