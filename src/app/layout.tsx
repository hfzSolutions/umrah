'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/context/authContext';
import { Toaster } from 'react-hot-toast';
import { MyProvider } from '@/context/myContext';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from './dashboard/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get current pathname

  // Define routes where sidebar should be visible
  const showSidebarRoutes = [
    '/dashboard',
    '/calendar',
    '/booking',
    '/destination',
    '/feedback',
    '/guider',
  ]; // Example routes

  // Determine if sidebar should be shown based on current route
  const showSidebar = showSidebarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MyProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex">
                {showSidebar ? (
                  <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                      <Header />
                      {children}
                    </SidebarInset>
                  </SidebarProvider>
                ) : (
                  children
                )}
                <Toaster />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </MyProvider>
      </body>
    </html>
  );
}
