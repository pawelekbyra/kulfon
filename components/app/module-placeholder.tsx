import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { KulfonModule } from './modules';

type ModulePlaceholderProps = {
  module: KulfonModule;
};

export function ModulePlaceholder({ module }: ModulePlaceholderProps) {
  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="min-h-[560px]">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardDescription>{module.eyebrow}</CardDescription>
              <CardTitle className="mt-2 text-2xl">{module.title}</CardTitle>
            </div>
            <Badge variant="outline">placeholder</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-3xl border border-border/70 bg-background/45 p-6">
            <p className="text-sm leading-7 text-muted-foreground">{module.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {module.items.map((item) => (
                <div key={item} className="rounded-2xl border border-border/70 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-foreground">{item}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Miejsce na przyszły moduł operacyjny.</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Co dalej?</CardTitle>
            <CardDescription>Ten ekran ma tylko rezerwować miejsce w systemie.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Kolejne sprinty mogą podmieniać placeholder na prawdziwą logikę bez zmiany całego układu aplikacji.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kontrola</CardTitle>
            <CardDescription>Autonomia Kulfona ma pozostać widoczna i zatwierdzalna.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="outline">approval</Badge>
            <Badge variant="outline">audit</Badge>
            <Badge variant="outline">tool details</Badge>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
