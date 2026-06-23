'use client';

import { useState } from 'react';

import { AppShell } from '@/components/app/app-shell';
import { ChatModule } from '@/components/app/chat-module';
import { getKulfonModule, type KulfonModuleId } from '@/components/app/modules';
import { ModulePlaceholder } from '@/components/app/module-placeholder';

export default function Home() {
  const [activeModule, changeModule] = useState<KulfonModuleId>('chat');
  const activeModuleDefinition = getKulfonModule(activeModule);

  return (
    <AppShell activeModule={activeModule} onModuleChange={(module) => changeModule(module)}>
      {activeModule === 'chat' ? <ChatModule /> : <ModulePlaceholder module={activeModuleDefinition} />}
    </AppShell>
  );
}
