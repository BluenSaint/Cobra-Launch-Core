import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Cobra - AI-Powered Credit Repair',
  description: 'Dispute inaccuracies, remove errors, and boost your score 2x faster. 100% FCRA/CROA compliant.',
  keywords: 'credit repair, AI credit repair, fix credit score, FCRA credit repair, credit report errors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 