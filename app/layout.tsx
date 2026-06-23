import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kulfon OS',
  description: 'Prywatne centrum operacyjne z agentem, narzędziami i approval flow.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
