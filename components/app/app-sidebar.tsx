'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { kulfonModules, type KulfonModuleId } from './modules';

type AppSidebarProps = {
  activeModule: KulfonModuleId;
  onModuleChange: (module: KulfonModuleId) => void;
};

export function AppSidebar({ activeModule, onModuleChange }: AppSidebarProps) {
  return (
    <aside className="flex h-full min-h-[calc(100vh-2rem)] flex-col rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-lg font-black text-primary-foreground shadow-[0_0_42px_rgba(139,92,246,0.5)]">
          K
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Kulfon OS</p>
          <h1 className="text-xl font-bold tracking-tight">Panel operacyjny</h1>
        </div>
      </div>

      <Separator className="my-5" />

      <nav className="space-y-2" aria-label="Moduły Kulfona">
        {kulfonModules.map((module) => {
          const isActive = module.id === activeModule;

          return (
            <button
              key={module.id}
              type="button"
              onClick={() => onModuleChange(module.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition',
                isActive
                  ? 'bg-white/10 text-foreground shadow-inner shadow-white/5'
                  : 'text-muted-foreground hover:bg-white/8 hover:text-foreground',
              )}
            >
              <span>{module.label}</span>
              {module.badge ? <Badge variant={module.id === 'decisions' ? 'warning' : 'outline'}>{module.badge}</Badge> : null}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-border/70 bg-background/45 p-4">
        <Badge variant="success">Sprint 2.1</Badge>
        <h2 className="mt-3 text-base font-semibold">AppShell</h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Kulfon ma już ciało aplikacji: moduły, nawigację i miejsce pod przyszłe ekrany.
        </p>
      </div>
    </aside>
  );
}
