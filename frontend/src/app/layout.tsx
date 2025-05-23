import { inter, spaceGrotesk } from './fonts';
import './globals.css';

export const metadata = {
  title: 'Project Cobra | AI-Powered Credit Dispute Automation',
  description: 'Transform your credit repair process with Project Cobra. Our AI-powered platform streamlines credit report disputes, increases success rates, and helps rebuild financial futures faster.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
