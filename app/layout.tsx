import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wael Kabli | وائل كابلي',
  description: 'Serial Tech Entrepreneur, Digital Health Pioneer, Strategic Advisor & Speaker — waelkabli.com',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
