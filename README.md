# AGENT BOLEK

**Bolek AI** to start osobistego **AI Operating System** — agenta, który ma z czasem stać się centralnym interfejsem do pracy z kodem, wiedzą, infrastrukturą, usługami i codziennymi zadaniami.

Na obecnym etapie Bolek jest prosty celowo. Ma przede wszystkim działać przez **Telegram**, korzystać z taniej/darmowej infrastruktury **Cloudflare** i mieć pierwsze praktyczne konektory: **GitHub** oraz **Vercel**. To nie jest jeszcze system z pełną autonomią, wektoryzacją, własnym LLM, sandboxem, browser automation i armią agentów. Te elementy są częścią dalszej wizji, ale nie powinny być dodawane przedwcześnie.

Od początku Bolek powinien jednak myśleć jak agent, który **rozpoznaje własne ograniczenia**. Jeśli nie potrafi wykonać zadania, nie powinien udawać, że potrafi. Powinien powiedzieć, czego mu brakuje, zaproponować obejście, zapisać brak jako potencjalny upgrade i — w późniejszych etapach — samodzielnie przygotować issue, branch albo Pull Request z poprawką.

To repozytorium jest rozwijane również przez **agentów kodowania AI**. README jest więc nie tylko instrukcją dla ludzi, ale też kontraktem projektowym dla kolejnych agentów: co budujemy, w jakiej kolejności i czego nie należy komplikować zbyt wcześnie.

---

## Najważniejsza zasada

**Najpierw fundament. Potem narzędzia. Potem pamięć. Potem workflow. Potem autonomia.**

Bolek ma rosnąć etapami. Nie chodzi o to, żeby od razu wrzucić wszystkie modne technologie. Chodzi o to, żeby każda kolejna warstwa miała sens, była potrzebna i pasowała do architektury.

Jeżeli jesteś agentem kodowania i czytasz ten plik: **nie przebudowuj projektu od razu pod docelowy system**. Najpierw respektuj aktualny etap.

Jeżeli zadanie wymaga funkcji, której Bolek jeszcze nie ma, właściwa reakcja to:

1. rozpoznać brak,
2. powiedzieć użytkownikowi, czego brakuje,
3. zaproponować najprostsze obejście,
4. zaproponować upgrade kodu,
5. zapisać ten brak do późniejszej implementacji,
6. dopiero w późniejszych etapach samodzielnie przygotować zmianę w repo.

---

## Self-improvement loop: Bolek ma rozumieć, czego mu brakuje

Bolek od początku powinien być projektowany tak, żeby umiał zauważyć różnicę między:

- tym, co już potrafi,
- tym, co potrafi częściowo,
- tym, czego jeszcze nie potrafi,
- tym, co jest zaplanowane na przyszłość.

To jest kluczowa różnica między chatbotem a agentem.

Chatbot odpowiada:

```text
Nie umiem tego zrobić.
```

Bolek powinien odpowiadać:

```text
Nie umiem jeszcze zrobić tego w pełni, bo brakuje mi modułu X.
Mogę teraz zrobić obejście Y.
Żeby robić to dobrze, trzeba dodać Z.
Mogę zapisać to jako proponowany upgrade albo przygotować plan implementacji.
```

Docelowo Bolek powinien działać w pętli:

```text
zadanie użytkownika
    ↓
sprawdzenie aktualnych capabilities
    ↓
jeśli capability istnieje → wykonaj zadanie
    ↓
jeśli capability nie istnieje → wykryj lukę
    ↓
zaproponuj obejście
    ↓
zaproponuj upgrade
    ↓
zapisz capability gap
    ↓
w późniejszym etapie: utwórz issue / branch / Pull Request
    ↓
po testach i zgodzie użytkownika: wdrożenie
```

Na obecnym etapie Bolek nie musi jeszcze sam modyfikować swojego kodu. Powinien jednak od początku być prowadzony tak, żeby **myślał w kategoriach własnych możliwości i braków**.

Minimalny kierunek implementacji tej idei:

- rejestr capabilities: co Bolek umie teraz,
- oznaczenie statusu capability: `implemented`, `partial`, `planned`, `future`,
- rejestr braków: czego użytkownik chciał, a czego Bolek nie potrafił,
- narzędzie do zapisania capability gap,
- narzędzie do listowania braków,
- narzędzie do proponowania następnego upgrade'u,
- prompt systemowy mówiący: nie udawaj brakujących funkcji, proponuj upgrade,
- później: generowanie issue,
- później: generowanie branchy i PR,
- jeszcze później: testy, sandbox i półautonomiczne self-upgrade.

Przykład:

```text
Użytkownik: monitoruj mi deploymenty i pisz, jak coś padnie.

Bolek:
- umiem sprawdzić Vercel ręcznie,
- nie mam jeszcze cyklicznego monitoringu,
- nie mam tabeli monitorowanych projektów,
- nie mam workflow alertów,
- proponowany upgrade: moduł deployment monitoring.
```

To zachowanie powinno być częścią osobowości i architektury Bolka od początku, nawet zanim powstanie pełna automatyzacja.

---

## Aktualny etap: prosty agent Telegram + pierwsze konektory

Obecnie Bolek jest na etapie startowym.

Priorytetem tego etapu jest:

- działający bot Telegrama,
- prosty Cloudflare Worker,
- podstawowe połączenie z modelem AI,
- minimalny system narzędzi,
- podstawowa pamięć w D1/KV,
- dostęp do GitHuba,
- dostęp do Vercela,
- prosta i czytelna architektura,
- łatwy deploy,
- niski koszt utrzymania,
- podstawowe rozpoznawanie brakujących możliwości i proponowanie upgrade'ów.

Na tym etapie Bolek ma przede wszystkim **gadać przez Telegrama** i wykonywać pierwsze użyteczne akcje przez GitHub/Vercel. To jest wersja fundamentu, a nie finalny Terminator.

### Czego NIE dodawać jeszcze bez wyraźnej potrzeby

Na obecnym etapie nie należy na siłę dodawać:

- pełnej wektoryzacji i RAG,
- własnego LLM,
- fine-tuningu,
- serwerów GPU,
- Kubernetes,
- złożonego systemu wielu agentów,
- rozbudowanego workflow engine,
- browser automation,
- sandboxa do wykonywania kodu,
- pełnego MCP jako obowiązkowego rdzenia,
- dużej architektury mikroserwisowej,
- samodzielnego wdrażania zmian bez testów i zgody użytkownika.

Te elementy są ważne, ale później. Teraz najważniejsze jest to, żeby Bolek był mały, zrozumiały, stabilny i łatwy do rozwijania przez ludzi oraz agentów.

---

## Podstawowe konektory do wdrożenia

Konektory są najważniejszym sposobem rozbudowy Bolka. Każdy konektor powinien być osobnym modułem z jasnym zakresem, opisem ryzyka, wymaganymi sekretami i informacją, czy akcje są tylko odczytem, czy mogą zmieniać dane.

Najważniejsza zasada: **Bolek ma dostać kontrolowany warsztat pracy, a nie pełny dostęp do całego życia użytkownika**.

Oznacza to:

- wąskie uprawnienia zamiast pełnych scope'ów,
- osobne foldery, etykiety i kalendarze dla Bolka,
- tryb `read`, `draft`, `propose`, `execute`,
- potwierdzenie użytkownika przed ryzykownymi akcjami,
- brak automatycznego usuwania danych,
- brak wysyłania maili, deployowania, commitowania lub udostępniania plików bez zgody.

### Kolejność wdrożenia konektorów

#### 1. Telegram

Status: **obecny interfejs główny**.

Zakres:

- odbieranie wiadomości,
- wysyłanie odpowiedzi,
- powiadomienia,
- proste komendy,
- potwierdzanie akcji.

Telegram pozostaje pierwszym i najprostszym kanałem sterowania Bolkiem.

#### 2. GitHub Basic

Status: **jeden z pierwszych konektorów**.

Zakres na start:

- lista repozytoriów,
- czytanie plików,
- czytanie issues,
- tworzenie issues,
- sprawdzanie README i dokumentacji,
- później: branch, commit, Pull Request.

GitHub jest kluczowy, bo Bolek ma rozumieć własne repo i docelowo pomagać w swoim rozwoju.

#### 3. Vercel Basic

Status: **jeden z pierwszych konektorów**.

Zakres na start:

- lista projektów,
- ostatnie deploymenty,
- status deploymentu,
- podstawowe logi,
- później: redeploy po zgodzie,
- później: monitoring i alerty.

#### 4. Capabilities Registry

Status: **krytyczny moduł fundamentu**.

Zakres:

- lista tego, co Bolek umie,
- status capability: `implemented`, `partial`, `planned`, `future`, `blocked`,
- sprawdzanie, czy zadanie mieści się w aktualnych możliwościach,
- aktualizacja capabilities przy dodaniu nowej funkcji.

To nie jest zwykły konektor zewnętrzny, ale wewnętrzny konektor samoświadomości Bolka.

#### 5. Capability Gaps

Status: **krytyczny moduł fundamentu**.

Zakres:

- zapisywanie braków,
- listowanie braków,
- priorytetyzacja braków,
- powiązanie braku z rozmową,
- powiązanie braku z issue,
- proponowanie następnego upgrade'u.

To jest podstawa self-improvement loop.

#### 6. GitHub Issues dla upgrade proposals

Status: **najbezpieczniejszy pierwszy krok self-upgrade**.

Zakres:

- tworzenie issue z wykrytego capability gap,
- dodawanie opisu technicznego,
- dodawanie checklisty,
- oznaczanie priorytetu,
- linkowanie do rozmowy lub decyzji.

Najpierw issue. Dopiero później branch i PR.

#### 7. Google Drive — folder `Bolek OS`

Status: **bardzo wysoki priorytet po fundamencie**.

Zakres:

- tworzenie i zapisywanie dokumentów,
- raporty,
- plany techniczne,
- eksporty rozmów,
- pliki do późniejszej pamięci semantycznej,
- przestrzeń robocza Bolka.

Zasada: Bolek nie powinien od razu mieć pełnego dostępu do całego Drive. Powinien zaczynać od własnego folderu i wąskich uprawnień.

#### 8. Google Docs

Status: **wysoki priorytet**.

Zakres:

- specyfikacje,
- roadmapy,
- decyzje architektoniczne,
- opisy upgrade'ów,
- raporty po zadaniach,
- dokumentacja tworzona przez Bolka.

#### 9. Google Sheets

Status: **wysoki priorytet**.

Zakres:

- backlog,
- capability gaps,
- koszty modeli,
- lista konektorów,
- logi zadań,
- priorytety rozwoju.

Sheets może być prostą warstwą roboczą zanim wszystko trafi do D1 albo dedykowanego panelu.

#### 10. Gmail Readonly + Drafts

Status: **wysoki priorytet, ale ostrożnie**.

Zakres na start:

- wyszukiwanie maili,
- czytanie wybranych wątków,
- podsumowanie maili,
- etykietowanie,
- tworzenie draftów,
- brak automatycznego wysyłania bez zgody,
- brak permanentnego usuwania maili.

Bolek może przygotować wiadomość, ale użytkownik powinien zatwierdzić wysyłkę.

#### 11. Google Calendar

Status: **wysoki priorytet**.

Zakres:

- sprawdzanie wolnych terminów,
- czytanie wydarzeń,
- tworzenie wydarzeń w kalendarzu Bolka,
- proponowanie wydarzeń w głównym kalendarzu,
- przypomnienia,
- blokowanie czasu na pracę po zgodzie.

#### 12. Google Tasks

Status: **średni/wysoki priorytet**.

Zakres:

- zadania z rozmów,
- follow-upy,
- TODO,
- zadania self-upgrade,
- synchronizacja z pamięcią Bolka.

#### 13. Google Contacts / People Readonly

Status: **średni priorytet**.

Zakres:

- rozpoznawanie osób,
- dobieranie adresata maila,
- podstawowy kontekst kontaktów,
- bez edycji kontaktów na start.

#### 14. Cloudflare Connector

Status: **wysoki priorytet systemowy**.

Zakres:

- status Workera,
- podstawowe usage,
- D1/KV/R2 status,
- Workers AI usage,
- później Vectorize,
- później Queues i Workflows.

Write access do Cloudflare powinien być ograniczony i wymagać potwierdzenia.

#### 15. Markdown / Docs Memory

Status: **bardzo wysoki priorytet**.

Zakres:

- czytanie README,
- czytanie plików `.md`,
- changelog,
- decyzje projektowe,
- dokumentacja repo.

To jest najprostszy krok do tego, żeby Bolek rozumiał własny projekt.

#### 16. Semantic Memory MVP / Vectorize

Status: **wysoki priorytet, ale jako MVP**.

Zakres:

- indeks README,
- indeks ważnych plików `src/`,
- indeks decyzji projektowych,
- indeks ważnych rozmów,
- wyszukiwanie po pamięci,
- pytania typu: `co wiesz o swoim kodzie?`, `gdzie jest logika X?`.

Nie robić od razu wielkiego RAG. Zacząć od małego hipokampa Bolka.

#### 17. Vercel Monitoring

Status: **wysoki priorytet po Vercel Basic**.

Zakres:

- cykliczne sprawdzanie statusu deploymentów,
- alert Telegram,
- historia awarii,
- powiązanie awarii z commitami.

#### 18. GitHub Pull Requests

Status: **później, po issue i upgrade plannerze**.

Zakres:

- tworzenie branchy,
- modyfikacja plików,
- tworzenie PR,
- opis PR,
- powiązanie PR z capability gap.

#### 19. GitHub Actions

Status: **wysoki priorytet dla agenta kodującego**.

Zakres:

- status CI,
- logi workflow,
- analiza błędów,
- retry po zgodzie,
- raport po testach.

#### 20. Sentry / Error Monitoring

Status: **średni/wysoki priorytet**.

Zakres:

- błędy runtime,
- stack trace,
- powiązanie błędu z deploymentem,
- tworzenie issue z błędu.

#### 21. Sandbox / Runner

Status: **później, ale kluczowy dla self-upgrade**.

Zakres:

- `npm test`,
- `npm run build`,
- lint,
- uruchamianie skryptów,
- sprawdzanie patchy przed PR.

Bez sandboxa Bolek może pisać kod, ale nie powinien twierdzić, że go sprawdził.

#### 22. Browser Automation

Status: **później**.

Zakres:

- otwieranie stron,
- screenshoty,
- pobieranie treści,
- testy UI,
- generowanie PDF,
- praca z panelami bez API.

#### 23. MCP

Status: **docelowo ważne, ale nie jako pierwszy fundament**.

Zakres:

- Bolek jako MCP client,
- Bolek jako MCP server,
- standardowe podpinanie narzędzi agentowych.

---

## Minimalny zestaw Google na start

Jeżeli wdrażany jest Google connector, startowy zakres powinien być ograniczony.

Rekomendowany kierunek:

```text
Drive:
- praca w folderze "Bolek OS"
- tworzenie plików
- odczyt plików utworzonych lub udostępnionych Bolkowi

Gmail:
- readonly
- compose/drafts
- labels
- bez automatycznego wysyłania
- bez permanentnego usuwania

Calendar:
- freebusy
- events readonly
- tworzenie wydarzeń po zgodzie
- preferowany osobny kalendarz "Bolek"

Contacts:
- readonly

Tasks:
- zadania Bolka
- follow-upy
- self-upgrade backlog
```

Nie należy wdrażać konektora Google przez przekazanie Bolkowi hasła. Dostęp powinien iść przez OAuth, wąskie scope'y, bezpieczne przechowywanie tokenów i możliwość odłączenia konektora.

---

## Docelowa wizja

Docelowo Bolek ma być osobistym AI Operating System.

Nie chodzi o kolejnego chatbota. Chodzi o agenta, który z czasem będzie potrafił:

- rozumieć długoterminowy kontekst użytkownika,
- pamiętać projekty, decyzje i wcześniejsze rozmowy,
- rozpoznawać własne ograniczenia,
- proponować ulepszenia własnego kodu,
- pracować z repozytoriami kodu,
- analizować błędy,
- pisać kod,
- uruchamiać testy,
- tworzyć Pull Requesty,
- monitorować deploymenty,
- zarządzać zadaniami,
- korzystać z dokumentów i własnej bazy wiedzy,
- automatyzować powtarzalne procesy,
- wybierać właściwy model AI do danego zadania,
- korzystać z wielu narzędzi i konektorów,
- wykonywać długotrwałe zadania krok po kroku,
- pytać o zgodę przed ryzykownymi akcjami,
- z czasem działać coraz bardziej autonomicznie.

W skrócie: teraz prosty bot, potem agent roboczy, docelowo prywatny cyfrowy Terminator do pracy z kodem, wiedzą i infrastrukturą. Terminator w sensie metafory: skuteczny, wytrwały, pamiętający kontekst, znający własne ograniczenia i wykonujący zadania do końca — nie zabawka i nie przypadkowy chatbot.

---

## Architektura docelowa

Docelowo system powinien iść w tym kierunku:

```text
Kanały wejścia
Telegram / Web / Email / Slack / Discord / Webhooks / Voice
        ↓
Agent Gateway
auth, rate limit, uprawnienia, tryb pracy
        ↓
Agent Runtime
sesja, stan zadania, pamięć robocza, capabilities, approval, historia decyzji
        ↓
Capability Engine
co umiem, czego nie umiem, czego brakuje, jaki upgrade zaproponować
        ↓
Planner
dzielenie zadań na kroki, wybór narzędzi, ocena ryzyka
        ↓
Model Router
Cloudflare AI / OpenAI / Claude / Gemini / DeepSeek / modele lokalne
        ↓
Tool Layer
GitHub, Vercel, Cloudflare, Gmail, Drive, Browser, terminal, MCP
        ↓
Execution Layer
Queues, Workflows, Durable Objects, sandbox, CI/CD
        ↓
Memory Layer
D1, KV, R2, Vectorize, RAG, project memory, capability gaps
        ↓
Observability
logi, koszty, trace, błędy, retry, audyt decyzji
```

To jest kierunek, nie obecny stan.

---

## Roadmapa rozwoju

### Etap 0 — Bootstrap

Status: obecny kierunek projektu.

Cel:

- bot Telegrama,
- Cloudflare Worker,
- podstawowe AI,
- GitHub connector,
- Vercel connector,
- prosta pamięć,
- prosty system narzędzi,
- prosty deploy,
- zalążek myślenia o brakujących możliwościach.

W tym etapie nie optymalizujemy pod wielką skalę. Kod ma być możliwie prosty.

---

### Etap 1 — Stabilny fundament

Cel: uporządkować projekt tak, żeby dało się go rozwijać przez lata.

Do zrobienia:

- czytelny orchestrator,
- jasny rejestr narzędzi,
- spójne typy,
- dobra obsługa błędów,
- migracje bazy,
- bezpieczne sekrety,
- logowanie zdarzeń,
- tryby pracy agenta: manualny, potwierdzany, autonomiczny,
- podstawowy rejestr capabilities,
- podstawowe wykrywanie capability gaps,
- dokumentacja dla ludzi i agentów kodowania.

Dopiero po tym etapie warto poważniej rozbudowywać pamięć i workflow.

---

### Etap 2 — Pamięć użytkownika i projektów

Cel: Bolek zaczyna pamiętać rzeczy w sposób użyteczny.

Najpierw prosto:

- fakty o użytkowniku,
- historia rozmów,
- zadania,
- notatki,
- przypomnienia,
- podstawowe streszczenia,
- pamięć projektów.

Na tym etapie nadal można obyć się bez pełnego RAG i wektorów. Jeżeli danych jest mało, D1 i dobre streszczenia wystarczą.

---

### Etap 2.5 — Świadomość własnych możliwości

Cel: Bolek zaczyna rozumieć, czego mu brakuje, zanim zacznie sam zmieniać kod.

Zakres:

- lista aktualnych capabilities,
- status każdej capability: `implemented`, `partial`, `planned`, `future`,
- tabela lub plik `capability_gaps`,
- zapisywanie próśb użytkownika, których Bolek nie umiał spełnić,
- komenda typu: `czego ci brakuje?`,
- komenda typu: `zaproponuj następny upgrade`,
- generowanie planów implementacji,
- tworzenie issue jako pierwszy bezpieczny krok self-upgrade.

Na tym etapie Bolek nadal nie powinien samodzielnie commitować zmian bez zgody. Ma rozpoznawać braki, proponować rozwiązania i przygotowywać plan.

---

### Etap 3 — Więcej konektorów

Cel: Bolek zaczyna działać z realnymi usługami.

Priorytetowe konektory:

- GitHub,
- Vercel,
- Cloudflare,
- Gmail,
- Google Drive,
- Google Docs,
- Google Sheets,
- Google Calendar,
- Google Tasks,
- Google Contacts / People,
- monitoring/logi,
- system zadań.

Każdy konektor powinien być osobnym modułem. Nie mieszamy logiki konektorów z głównym orchestratoriem.

---

### Etap 3.1 — Google Workspace Core

Cel: Bolek dostaje kontrolowaną przestrzeń roboczą Google.

Zakres:

- folder `Bolek OS` w Google Drive,
- Google Docs jako dokumentacja i plany,
- Google Sheets jako backlog, capability gaps i koszty,
- Gmail readonly + drafts,
- Calendar freebusy + wydarzenia po zgodzie,
- Tasks jako proste zadania,
- Contacts readonly.

Zasada:

- Bolek nie dostaje pełnego dostępu do całego konta,
- Bolek pracuje w folderach, labelkach i kalendarzach przeznaczonych dla niego,
- wysyłanie maili, udostępnianie plików i modyfikacja głównego kalendarza wymagają zgody,
- tokeny OAuth muszą być przechowywane bezpiecznie,
- konektor musi dać się odłączyć.

---

### Etap 3.5 — Self-upgrade planner

Cel: Bolek potrafi przełożyć wykryty brak na konkretną zmianę w repo.

Zakres:

- analiza README i roadmapy,
- analiza własnej struktury projektu,
- wskazanie plików, które trzeba zmienić,
- proponowanie migracji D1, jeśli potrzebne,
- proponowanie nowego narzędzia w `src/tools/`,
- przygotowanie checklisty implementacji,
- tworzenie issue,
- później tworzenie branchy i Pull Requestów.

Ten etap jest mostem między „wiem, czego mi brakuje” a „umiem przygotować upgrade”.

---

### Etap 4 — Pamięć semantyczna i RAG

Cel: Bolek potrafi szukać po własnej wiedzy.

Dopiero gdy pojawi się wystarczająco dużo danych, dokumentów, repozytoriów i notatek, warto dodać:

- embeddingi,
- Cloudflare Vectorize albo inną bazę wektorową,
- R2 na większe pliki,
- indeksowanie dokumentów,
- indeksowanie repozytoriów,
- wyszukiwanie semantyczne,
- RAG oparty o projekty i historię użytkownika.

Ważne: nie dodawać wektoryzacji tylko dlatego, że brzmi profesjonalnie. Dodać wtedy, gdy Bolek ma już co indeksować. Jeśli jednak Bolek ma rozumieć własne repo i historię decyzji, mały Semantic Memory MVP może zostać wprowadzony wcześniej jako ograniczona wersja tej warstwy.

---

### Etap 5 — Workflow i zadania długotrwałe

Cel: Bolek nie tylko odpowiada, ale prowadzi zadanie do końca.

Wtedy wchodzą:

- kolejki,
- retry,
- zadania opóźnione,
- zadania cykliczne,
- human-in-the-loop,
- zapisywanie postępu,
- wznawianie po błędzie,
- raport końcowy.

Technologie kandydujące:

- Cloudflare Queues,
- Cloudflare Workflows,
- Durable Objects,
- Cron Triggers.

---

### Etap 6 — Agent programistyczny

Cel: Bolek realnie pomaga w kodzie.

Zakres:

- analiza repozytoriów,
- czytanie plików,
- proponowanie zmian,
- generowanie patchy,
- tworzenie branchy,
- tworzenie Pull Requestów,
- analiza CI/CD,
- sprawdzanie deploymentów,
- code review.

Na początku Bolek może działać przez API GitHuba i Vercela. Później powinien dostać sandbox albo runner, żeby mógł uruchamiać testy i sprawdzać kod przed PR-em.

---

### Etap 7 — Browser automation i terminal

Cel: Bolek potrafi pracować także tam, gdzie nie ma wygodnego API.

Możliwości:

- otwieranie stron,
- czytanie paneli webowych,
- screenshoty,
- testowanie UI,
- pobieranie dokumentów,
- generowanie PDF,
- automatyzacja przeglądarki,
- bezpieczne wykonywanie komend w izolowanym środowisku.

To etap późniejszy. Nie dodawać go, dopóki proste API i konektory wystarczają.

---

### Etap 8 — MCP i ekosystem narzędzi

Cel: Bolek staje się częścią większego świata agentów.

Docelowo powinien działać jako:

- MCP client — korzysta z narzędzi innych systemów,
- MCP server — udostępnia własne narzędzia innym agentom.

MCP ma sens, gdy Bolek ma już stabilny własny system narzędzi. Nie powinien być wymówką do przedwczesnej komplikacji architektury.

---

### Etap 9 — Routing modeli AI

Cel: Bolek wybiera najlepszy model do zadania.

Docelowo:

- tani model do prostych rozmów,
- mocny model do planowania,
- model kodowy do programowania,
- model embeddingowy do pamięci,
- model lokalny do prostych/prywatnych zadań,
- fallback między providerami,
- kontrola kosztów.

Możliwi dostawcy:

- Cloudflare Workers AI,
- OpenAI,
- Anthropic Claude,
- Google Gemini,
- DeepSeek,
- modele open source,
- modele lokalne.

---

### Etap 10 — Własne modele i własna infrastruktura

Cel: Bolek zaczyna uczyć się na własnej historii.

To dopiero etap po zebraniu realnych danych z użycia.

Wtedy można rozważyć:

- małe lokalne modele,
- fine-tuning,
- LoRA,
- modele specjalistyczne,
- własne runnery,
- prywatny VPS,
- serwery GPU,
- własne środowisko wykonywania kodu.

Nie trenujemy modelu, zanim nie mamy danych. Najpierw Bolek musi zebrać historię rozmów, decyzji, zadań, błędów i skutecznych workflow.

---

## Zasady dla agentów kodowania

Jeżeli jesteś agentem AI modyfikującym to repozytorium, trzymaj się tych zasad:

1. **Nie przeskakuj etapów.**
   Jeśli projekt jest na etapie Telegram + GitHub/Vercel, nie dodawaj od razu wielkiej architektury RAG, MCP, Kubernetes albo własnego LLM.

2. **Małe zmiany są lepsze niż wielkie przebudowy.**
   Dodawaj funkcje modułowo i tak, żeby można było je łatwo usunąć lub wymienić.

3. **Nie hardcoduj sekretów.**
   Tokeny i klucze muszą iść przez Cloudflare secrets albo zmienne środowiskowe.

4. **Nie mieszaj konektorów z orchestratoriem.**
   GitHub, Vercel i kolejne integracje powinny być osobnymi narzędziami/modułami.

5. **Ryzykowne akcje wymagają potwierdzenia.**
   Commit, deploy, usuwanie danych, zmiana infrastruktury i wysyłanie wiadomości do zewnętrznych osób nie powinny dziać się przypadkiem.

6. **Aktualizuj README, gdy zmieniasz etap projektu.**
   Jeśli dodajesz realną nową warstwę, opisz ją tutaj.

7. **Nie udawaj, że funkcja istnieje.**
   W README jasno rozdzielaj: działa teraz, eksperyment, plan, wizja.

8. **Projekt ma być czytelny dla następnego agenta.**
   Kod, nazwy plików, migracje i dokumentacja mają pomagać kolejnym agentom szybko zrozumieć system.

9. **Wykrywaj capability gaps.**
   Jeśli użytkownik chce czegoś, czego Bolek nie umie, nie kończ na odmowie. Zapisz brak, opisz obejście i zaproponuj upgrade.

10. **Self-upgrade ma być bezpieczny.**
    Najpierw plan albo issue, potem branch/PR, potem testy, potem zgoda użytkownika. Nigdy odwrotnie.

11. **Konektory mają mieć minimalne uprawnienia.**
    Każdy konektor powinien zaczynać od najmniejszych możliwych scope'ów i dopiero później rozszerzać dostęp, jeśli jest realna potrzeba.

12. **Google ma być warsztatem Bolka, nie pełnym dostępem do konta.**
    Preferuj folder `Bolek OS`, labelki Gmaila, osobny kalendarz i drafty zamiast pełnego dostępu do całego konta.

---

## Jak to działa teraz

Obecny podstawowy przepływ:

```text
Ty → Telegram → Cloudflare Worker → Orchestrator → AI → Tools → D1/KV
                                                  ↓
                                           GitHub / Vercel
```

Piszesz do Bolka na Telegramie. Worker odbiera wiadomość, przekazuje ją do orchestratora, model AI pomaga zinterpretować intencję, a system narzędzi może wykonać prostą akcję, np. związaną z GitHubem albo Vercel.

Jeśli Bolek nie ma narzędzia potrzebnego do wykonania zadania, powinien powiedzieć to wprost i zaproponować następny krok: obejście, plan techniczny, issue albo przyszły upgrade.

---

## Czego potrzebujesz zanim zaczniesz

### 1. Konto Cloudflare

Załóż konto na Cloudflare. Darmowy plan wystarczy na start: Workers, D1, KV i podstawowe AI są dobrym fundamentem dla wersji początkowej.

### 2. Bot na Telegramie

- Otwórz Telegram i wyszukaj **@BotFather**.
- Wyślij `/newbot`.
- Podaj nazwę bota i username.
- Skopiuj token bota.

### 3. Node.js

Wymagana jest wersja 18 lub nowsza.

### 4. GitHub token

Opcjonalny, ale potrzebny do pracy z repozytoriami.

Wymagany scope zależy od funkcji, ale dla pełnego dostępu do prywatnych repozytoriów zwykle potrzebny jest zakres `repo`.

### 5. Vercel token

Opcjonalny, ale potrzebny do odczytu projektów, deploymentów i logów Vercela.

### 6. Google OAuth

Opcjonalny, ale docelowo ważny dla Google Workspace Core.

Na start Google powinien być wdrażany jako kontrolowana przestrzeń robocza Bolka:

- folder `Bolek OS` w Drive,
- Gmail readonly + drafts,
- Calendar z potwierdzeniem zmian,
- Sheets dla backlogu i capability gaps,
- Docs dla dokumentacji.

### 7. Anthropic/OpenAI/inne modele

Na obecnym etapie dodatkowe modele są opcjonalne. System powinien być projektowany tak, żeby można było je podłączyć później bez przebudowy całego projektu.

---

## Pierwsze uruchomienie

```bash
npm install
./setup.sh
```

Skrypt powinien przeprowadzić przez podstawową konfigurację:

1. Logowanie do Cloudflare.
2. Utworzenie zasobów D1/KV, jeśli są wymagane.
3. Dodanie tokena Telegrama.
4. Dodanie opcjonalnych tokenów GitHub/Vercel.
5. Deploy Workera.
6. Ustawienie webhooka Telegrama.

Po zakończeniu napisz do swojego bota na Telegramie.

---

## Migracje bazy danych

Baza D1 jest używana do danych trwałych, takich jak wiadomości, fakty, zadania albo inne elementy pamięci.

Przy pierwszym uruchomieniu setup może wykonać migracje automatycznie. Przy dodawaniu kolejnych funkcji uruchamiaj migracje ręcznie:

```bash
# Lokalne testowanie
npm run db:migrate:local

# Produkcja Cloudflare
npm run db:migrate:remote
```

Nie usuwaj starych migracji. Kolejni agenci muszą mieć możliwość odtworzenia pełnego stanu bazy od początku.

---

## Sekrety i zmienne środowiskowe

Ustawianie sekretów po pierwszym setupie:

```bash
wrangler secret put TELEGRAM_BOT_TOKEN
wrangler secret put GITHUB_TOKEN
wrangler secret put VERCEL_TOKEN
```

Przykładowe zmienne:

| Zmienna | Wymagana | Do czego |
|---|---:|---|
| `TELEGRAM_BOT_TOKEN` | tak | odbieranie i wysyłanie wiadomości przez Telegram |
| `TELEGRAM_WEBHOOK_SECRET` | tak | zabezpieczenie webhooka |
| `GITHUB_TOKEN` | nie | dostęp do GitHuba |
| `VERCEL_TOKEN` | nie | dostęp do Vercela |
| `GOOGLE_CLIENT_ID` | nie | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | nie | Google OAuth |
| `GOOGLE_REDIRECT_URI` | nie | callback OAuth |
| `AI_MODEL` | nie | wybór modelu AI |
| `ANTHROPIC_API_KEY` | nie | późniejsze zadania kodowania / mocniejszy model |
| `OPENAI_API_KEY` | nie | przyszły model router |

Nigdy nie commituj wartości sekretów do repozytorium. Tokeny OAuth użytkownika powinny być przechowywane bezpiecznie, najlepiej zaszyfrowane.

---

## Obecne możliwości

Na starcie Bolek powinien być traktowany jako prosty agent komunikacyjny.

### Telegram

Przykłady:

```text
"cześć Bolek"
"co potrafisz?"
"pomóż mi z repo"
```

### Rozpoznawanie braków

Już od początku Bolek powinien uczyć się odpowiadać w ten sposób:

```text
"Nie mam jeszcze takiego narzędzia. Mogę zrobić X ręcznie, a docelowo trzeba dodać moduł Y. Chcesz, żebym zapisał to jako upgrade?"
```

Przykłady:

```text
"czego ci brakuje?"
"zaproponuj następny upgrade"
"zapisz brak: automatyczny monitoring deploymentów"
```

### GitHub

Jeśli skonfigurowano `GITHUB_TOKEN`, Bolek może dostać pierwsze możliwości pracy z GitHubem.

Przykłady docelowe dla tego etapu:

```text
"pokaż moje repozytoria"
"pokaż otwarte issues w pawelekbyra/kulfon"
"sprawdź plik README w repo kulfon"
```

### Vercel

Jeśli skonfigurowano `VERCEL_TOKEN`, Bolek może dostać pierwsze możliwości pracy z Vercel.

Przykłady docelowe dla tego etapu:

```text
"pokaż projekty na Vercel"
"sprawdź ostatni deployment projektu kulfon"
"czy ostatni deploy się udał?"
```

### Google Workspace

Na obecnym etapie Google Workspace jest planowanym konektorem, a nie obowiązkowym fundamentem.

Przykłady docelowe dla pierwszej wersji:

```text
"utwórz dokument z planem upgrade'u w Bolek OS"
"zapisz ten capability gap w arkuszu"
"przygotuj draft maila, ale go nie wysyłaj"
"sprawdź, kiedy mam wolny czas jutro"
```

---

## Struktura projektu

Przykładowy kierunek struktury:

```text
src/
  index.ts              # Cloudflare Worker, webhooki, routing
  telegram.ts           # obsługa Telegrama
  orchestrator.ts       # główny przepływ agenta
  memory.ts             # prosta pamięć / D1
  capabilities.ts       # rejestr tego, co Bolek umie i czego mu brakuje
  env.ts                # typy środowiska
  tools/
    index.ts            # rejestr narzędzi
    github.ts           # GitHub connector
    vercel.ts           # Vercel connector
    google-drive.ts     # przyszły Google Drive connector
    google-gmail.ts     # przyszły Gmail connector
    google-calendar.ts  # przyszły Calendar connector
    capability-gaps.ts  # narzędzia do zapisywania i listowania braków
  db/migrations/        # migracje D1

web/                    # opcjonalny interfejs webowy, jeśli jest rozwijany
setup.sh                # pierwsza konfiguracja
wrangler.toml           # konfiguracja Cloudflare
```

Jeżeli aktualna struktura różni się od tej listy, traktuj powyższe jako kierunek organizacyjny, nie sztywny obowiązek.

---

## Jak dodawać nowe narzędzie

Nowe funkcje powinny trafiać do `src/tools/` albo równoważnego modułu narzędziowego.

Zasada:

1. Dodaj osobny plik narzędzia.
2. Opisz nazwę, parametry i ryzyko akcji.
3. Zarejestruj narzędzie w centralnym rejestrze.
4. Zaktualizuj rejestr capabilities.
5. Jeżeli potrzeba danych trwałych, dodaj migrację.
6. Zaktualizuj README, jeśli funkcja zmienia realny etap projektu.

Nie dopisuj dużej logiki bezpośrednio do głównego Workera, jeśli może być osobnym narzędziem.

---

## Definicja sukcesu

Bolek odniesie sukces, jeśli będzie rozwijał się stopniowo:

1. Najpierw odpowiada na Telegramie.
2. Potem korzysta z GitHuba i Vercela.
3. Potem rozumie, czego jeszcze nie umie, i proponuje upgrade'y.
4. Potem dostaje kontrolowany warsztat Google Workspace.
5. Potem pamięta kontekst użytkownika i projektów.
6. Potem wykonuje coraz więcej narzędzi.
7. Potem planuje zadania.
8. Potem prowadzi workflow do końca.
9. Potem działa z kodem, testami i deploymentem.
10. Potem sam przygotowuje issue, branch i Pull Request dla własnych ulepszeń.
11. Potem korzysta z wielu modeli i agentów.
12. Potem dostaje własną pamięć semantyczną, sandbox i automatyzację przeglądarki.
13. Na końcu staje się osobistym AI Operating System.

To repozytorium jest początkiem tej drogi.
