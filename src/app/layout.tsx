import type { Metadata } from 'next';
import { Sansita } from 'next/font/google'; // Changed from Geist to Sansita
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AppShell } from '@/components/layout/app-shell';
import { Toaster } from "@/components/ui/toaster";

const sansita = Sansita({ // Changed from geistSans to sansita
  variable: '--font-sansita', // Changed variable name
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'], // Sansita requires specifying weights
});

// Removed geistMono as Sansita doesn't have a direct mono counterpart in this setup
// and the request is to use Sansita generally.

export const metadata: Metadata = {
  title: 'Sanctuary Matrix Dashboard',
  description: 'Business Analytics for Financial Advisors using Sanctuary Matrix',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sansita.variable} font-sans antialiased`}> {/* Use sansita.variable and font-sans */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>
            {children}
          </AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
