# Kulfon OS — Roadmapa

Ten dokument jest operacyjną roadmapą projektu. Główny manifest znajduje się w `README.md`.

Roadmapa ma prowadzić pracę małymi sprintami. Nie budujemy wszystkiego naraz. Najpierw stabilny rdzeń, potem coraz mocniejsze integracje.

## Sprint 0 — repo gotowe dla agentów

Cel: przygotować repo do bezpiecznej pracy ludzi i agentów.

Zakres:

- `AGENTS.md`,
- `docs/ROADMAP.md`,
- `docs/BACKLOG.md`,
- `docs/SECURITY.md`,
- `docs/PROMPTBOOK.md`,
- `docs/adr/template.md`,
- `docs/adr/0001-documentation-first.md`.

Poza zakresem:

- brak zmian runtime,
- brak zmian UI,
- brak nowych zależności,
- brak integracji Gmail/Calendar/Drive/MCP,
- brak migracji AI SDK.

Definition of Done:

- repo ma operacyjne instrukcje dla agentów,
- dokumenty są krótkie i praktyczne,
- README pozostaje głównym manifestem,
- issue #3 można zamknąć po merge.

## Sprint 1 — rdzeń narzędzi, permissions i audytu

Cel: uporządkować układ nerwowy Kulfona przed dokładaniem nowych integracji.

Zakres:

- Tool Registry MVP,
- Permission Engine MVP,
- Audit Log MVP,
- refactor obecnych GitHub/Vercel/Jules tools do wzorca registry,
- zachowanie obecnego działania chatu.

Poza zakresem:

- brak nowego UI,
- brak Supabase/Postgres,
- brak MCP,
- brak Gmail/Calendar,
- brak migracji AI SDK, chyba że osobne ADR/ticket to nakaże.

Definition of Done:

- każde obecne narzędzie ma manifest,
- każde obecne narzędzie ma risk level,
- akcje `external_action` wymagają approval,
- tool calls i approval events są minimalnie audytowane,
- istniejące prompty testowe nadal działają.

## Sprint 2 — pierwszy wygląd centrum dowodzenia

Cel: aplikacja przestaje być tylko chatem i zaczyna wyglądać jak Kulfon OS.

Zakres:

- layout z miejscem na sidebar,
- Chat jako moduł,
- Decision Inbox MVP,
- Approval Card,
- Tool Call Card / Timeline MVP,
- Dashboard placeholder.

Poza zakresem:

- brak pełnego design system migration bez ADR,
- brak memory center,
- brak nowych integracji życiowych.

Definition of Done:

- chat nadal działa,
- approval jest czytelny dla użytkownika,
- istnieje miejsce na przyszłe dashboardy i decyzje.

## Sprint 3 — dane, auth i pamięć MVP

Cel: Kulfon zaczyna mieć trwały stan i kontrolowaną pamięć.

Zakres:

- ADR dla bazy/auth,
- decyzja Supabase/Drizzle/Auth.js lub alternatywa,
- schemat rozmów,
- schemat audit events,
- schemat approval requests,
- schemat memory items,
- Memory Center placeholder albo MVP.

Poza zakresem:

- brak masowej migracji danych,
- brak zapisywania wszystkiego automatycznie,
- brak danych wrażliwych bez zgody.

Definition of Done:

- istnieje wybrana strategia danych,
- istnieje pierwszy model pamięci,
- użytkownik ma docelowo kontrolę nad tym, co Kulfon pamięta.

## Sprint 4 — pierwsza życiowa integracja

Rekomendacja architektoniczna: zacząć od Google Calendar, nie od Gmaila.

Powód: Calendar daje szybki efekt centrum dnia, a ryzyko prywatności i prompt injection jest niższe niż w mailach.

Zakres:

- Calendar read,
- plan dnia jako draft,
- create event tylko po approval,
- daily briefing MVP.

Poza zakresem:

- automatyczne wysyłanie zaproszeń bez approval,
- Gmail,
- Drive,
- MCP,
- pełny scheduler.

Definition of Done:

- Kulfon potrafi przeczytać kalendarz,
- Kulfon potrafi zaproponować plan dnia,
- Kulfon potrafi przygotować event,
- utworzenie eventu wymaga approval.

## Dalsze sprinty

Po Sprint 4 decyzje będą zależeć od stanu projektu. Kandydaci:

- Gmail read + draft reply,
- Drive/Docs search,
- Memory Center pełniejsze,
- MCP Gateway,
- n8n/Trigger.dev automatyzacje,
- Cases/Projects,
- research UI stacku: assistant-ui / CopilotKit / shadcn,
- observability/evals,
- PWA/mobile,
- voice.

## Zasada aktualizacji roadmapy

Każdy większy PR może aktualizować ten plik. Roadmapa nie jest święta, ale zmiany kolejności muszą mieć uzasadnienie architektoniczne.
