import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kulfon Agent',
  description: 'Prywatny agent developerski z Gemini, GitHubem, Vercel i Julesem.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
