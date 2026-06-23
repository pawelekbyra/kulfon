# Kulfon Agent

Czysty starter prywatnego agenta developerskiego zbudowanego na Next.js, Vercel AI SDK i Gemini API z Google AI Studio.

## Co już jest

- Next.js App Router
- Ładny interfejs chatu
- Streaming odpowiedzi przez AI SDK
- Gemini przez `@ai-sdk/google`
- Narzędzia serwerowe dla GitHuba
- Narzędzie do tworzenia issue dla Julesa przez label `jules`
- Podstawowy tool do odczytu deploymentów Vercel

## Uruchomienie lokalne

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Aplikacja będzie dostępna pod adresem:

```txt
http://localhost:3000
```

## Zmienne środowiskowe

Uzupełnij `.env.local` lokalnie oraz Environment Variables w Vercel:

```env
GOOGLE_GENERATIVE_AI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
GITHUB_TOKEN=
GITHUB_OWNER=pawelekbyra
GITHUB_REPO=kulfon
VERCEL_TOKEN=
VERCEL_PROJECT_ID=
VERCEL_TEAM_ID=
```

## Bezpieczeństwo

Na start używaj tokenów z możliwie wąskimi uprawnieniami. Agent powinien domyślnie czytać, analizować i tworzyć issue/PR, a nie samodzielnie robić destrukcyjne zmiany.
