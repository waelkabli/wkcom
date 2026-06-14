import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wael Kabli | وائل كابلي',
  description: 'Serial Tech Entrepreneur, Digital Health Pioneer, Strategic Advisor & Speaker — waelkabli.com',
  metadataBase: new URL('https://waelkabli.com'),
  icons: {
    icon: '/images/wael-profile.jpg',
    shortcut: '/images/wael-profile.jpg',
    apple: '/images/wael-profile.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
