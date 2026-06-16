import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/redux/StoreProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'ContentHub AI — Personalized Content Dashboard',
  description:
    'A personalized dashboard combining news, movies, and social posts into one unified feed. Powered by GNews and TMDB APIs.',
  keywords: ['dashboard', 'news', 'movies', 'social', 'personalized', 'AI'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans antialiased`}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
