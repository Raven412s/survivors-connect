'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggler } from '../togglers/ThemeToggler';
import { Button } from '../ui/button';
import { Footer } from './footer';

interface AdminLayoutProps {
  children: React.ReactNode;
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // determine current locale from pathname and redirect to locale-aware login
      const segments = pathname?.split('/') || [];
      const locale = segments[1] || 'en';
      router.push(`/${locale}/admin/login`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Connect Requests', href: '/admin/connect-requests', icon: '🆘' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 w-full z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                {/* Hamburger icon */}
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white ml-2">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Welcome, {user.email}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-sm border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Logout
              </Button>
              <ThemeToggler
                variant='rectangle'
                start='bottom-up'
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 flex z-40">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="shrink-0 flex items-center px-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Navigation
                  </h2>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="mr-3 text-lg">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content with sidebar for desktop */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 mt-16">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center shrink-0 px-4 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Main Menu
                </h2>
              </div>
              <nav className="flex-1 px-2 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-3 text-sm font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* User info at bottom */}
            <div className="shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user.email}
                  </p>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:pl-64 flex flex-col flex-1 pt-16 min-h-screen">
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
            <Footer />
        </div>
      </div>
    </div>
  );
}