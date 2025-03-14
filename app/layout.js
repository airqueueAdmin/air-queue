import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AirQueue',
  description: '공항을 스마트하게, 여행을 더 여유롭게.',
  manifest: '/manifest.json'
};

export const viewport = {
  themeColor: '#000000',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="logo" href="/icons/logo.svg" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}