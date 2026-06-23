export type KulfonModuleId = 'chat' | 'today' | 'decisions' | 'tools' | 'projects' | 'memory' | 'audit' | 'settings';

export type KulfonModule = {
  id: KulfonModuleId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  items: string[];
};

export const kulfonModules: KulfonModule[] = [
  {
    id: 'chat',
    label: 'Chat',
    eyebrow: 'Agent',
    title: 'Chat operacyjny',
    description: 'Rozmowa z Kulfonem, narzędzia, approval i szybkie działania developerskie.',
    badge: 'live',
    items: ['Gemini', 'GitHub', 'Vercel', 'Jules', 'Approval'],
  },
  {
    id: 'today',
    label: 'Dzisiaj',
    eyebrow: 'Dashboard dnia',
    title: 'Centrum dnia',
    description: 'Docelowo: priorytety, kalendarz, blokady, follow-upy i najważniejsze decyzje dnia.',
    badge: 'next',
    items: ['Priorytety', 'Kalendarz', 'Blokady', 'Follow-upy'],
  },
  {
    id: 'decisions',
    label: 'Decyzje',
    eyebrow: 'Decision Inbox',
    title: 'Inbox decyzyjny',
    description: 'Miejsce na zgody, approval cards i akcje wymagające potwierdzenia użytkownika.',
    badge: 'MVP',
    items: ['Approval', 'Ryzyko', 'Podgląd akcji', 'Historia decyzji'],
  },
  {
    id: 'tools',
    label: 'Narzędzia',
    eyebrow: 'Tool Registry UI',
    title: 'Panel narzędzi',
    description: 'Widok pod GitHub, Vercel, Jules i przyszły rejestr narzędzi z poziomami ryzyka.',
    items: ['GitHub', 'Vercel', 'Jules', 'Permission Engine'],
  },
  {
    id: 'projects',
    label: 'Projekty',
    eyebrow: 'System spraw',
    title: 'Projekty i sprawy',
    description: 'Docelowo: sprawy, taski, milestone’y, statusy i działania prowadzone przez Kulfona.',
    items: ['Sprawy', 'Taski', 'Milestone’y', 'Statusy'],
  },
  {
    id: 'memory',
    label: 'Pamięć',
    eyebrow: 'Memory Center',
    title: 'Pamięć Kulfona',
    description: 'Docelowe centrum jawnej, edytowalnej i usuwalnej pamięci użytkownika.',
    items: ['Preferencje', 'Reguły', 'Ludzie', 'Projekty'],
  },
  {
    id: 'audit',
    label: 'Audit',
    eyebrow: 'Timeline akcji',
    title: 'Audit timeline',
    description: 'Docelowo: historia tool calls, zgód, akcji, błędów i ważnych decyzji systemu.',
    items: ['Tool calls', 'Approval', 'Błędy', 'Zmiany'],
  },
  {
    id: 'settings',
    label: 'Ustawienia',
    eyebrow: 'Konfiguracja',
    title: 'Ustawienia i integracje',
    description: 'Miejsce na modele, integracje, limity, tryby pracy i globalne kontrolki Kulfona.',
    items: ['Modele', 'Integracje', 'Limity', 'Tryby pracy'],
  },
];

export function getKulfonModule(id: KulfonModuleId) {
  return kulfonModules.find((module) => module.id === id) ?? kulfonModules[0];
}
