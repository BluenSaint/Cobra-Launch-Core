import { inter, spaceGrotesk } from './fonts';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Cobra - Credit Report Dispute Platform',
  description: 'Automated credit report dispute processing and FCRA compliance management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-gray-950 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
