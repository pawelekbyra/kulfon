import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { KulfonModule } from './modules';

type AppHeaderProps = {
  activeModule: KulfonModule;
  isBusy?: boolean;
};

export function AppHeader({ activeModule, isBusy = false }: AppHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{activeModule.eyebrow}</Badge>
            <Badge variant="outline">Kulfon OS</Badge>
            <Badge variant="outline">kontrolowalna autonomia</Badge>
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl">{activeModule.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{activeModule.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-2xl border border-border/70 bg-background/50 px-4 py-3 text-sm text-muted-foreground">
            Status: <span className="font-semibold text-foreground">{isBusy ? 'pracuje' : 'gotowy'}</span>
          </div>
          <Button type="button" variant="outline" size="sm">
            Tryb Operator
          </Button>
        </div>
      </div>
    </header>
  );
}
