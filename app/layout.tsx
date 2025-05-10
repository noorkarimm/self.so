import type React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { Metadata } from 'next';
import PlausibleProvider from 'next-plausible';

const mono = JetBrains_Mono({ subsets: ['latin'] });

if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

export const metadata: Metadata = {
  metadataBase: new URL('https://self.so'),
  title: 'Self.so - Resume to Website',
  description:
    'LinkedIn to Website in one click! Powered by Together AI and Llama 3.3',
  openGraph: {
    images: '/og.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <PlausibleProvider domain="self.so">
        <ReactQueryClientProvider>
          <html lang="en">
            <head>
              {/* {process.env.NODE_ENV === "development" && (
              <script
                crossOrigin="anonymous"
                src="//unpkg.com/react-scan/dist/auto.global.js"
              />
            )} */}
              {/* rest of your scripts go under */}
            </head>
            <body className={`${mono.className} min-h-screen flex flex-col`}>
              <main className="flex-1 flex flex-col">{children}</main>
              <Toaster richColors position="bottom-center" />
            </body>
          </html>
        </ReactQueryClientProvider>
      </PlausibleProvider>
    </ClerkProvider>
  );
}