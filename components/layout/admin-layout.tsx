'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggler } from '../togglers/ThemeToggler';
import { Button } from '../ui/button';
import { Footer } from './footer';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Mail, 
  FileText, 
  Star,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  Shield
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      const segments = pathname?.split('/') || [];
      const locale = segments[1] || 'en';
      router.push(`/${locale}/admin/login`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: LayoutDashboard,
      description: 'Overview and analytics'
    },
    { 
      name: 'Connect Requests', 
      href: '/admin/connect-requests', 
      icon: MessageSquare,
      description: 'Emergency support requests'
    },
    { 
      name: 'Applications', 
      href: '/admin/applications', 
      icon: FileText,
      description: 'Job applications'
    },
    { 
      name: 'Contact Submissions', 
      href: '/admin/contact-submissions', 
      icon: Mail,
      description: 'Contact form messages'
    },
    { 
      name: 'Testimonials', 
      href: '/admin/testimonials', 
      icon: Star,
      description: 'Customer testimonials'
    },
  ];

  const isActivePath = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 w-full z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center ml-2 md:ml-0">
                <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                    Management Dashboard
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 max-w-32 truncate">
                  {user.email}
                </span>
              </div>
              
              <ThemeToggler
                variant="rectangle"
                start="bottom-up"
              />
              
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              
              {/* Mobile logout button */}
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="icon"
                className="sm:hidden text-gray-600 dark:text-gray-300"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 flex z-50">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-600/75 dark:bg-gray-900/80 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative flex-1 flex flex-col w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Navigation
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Admin Menu
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-3 space-y-1">
                  {navigation.map((item) => {
                    const isActive = isActivePath(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => setMobileSidebarOpen(false)}
                      >
                        <item.icon className={`mr-3 h-5 w-5 shrink-0 ${
                          isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-blue-600 dark:text-blue-400 ml-auto" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* User info at bottom */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-linear-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 mt-16">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto">
              {/* User Profile Card */}
              <div className="px-4 mb-6">
                <div className="flex items-center p-3 rounded-xl bg-linear-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 space-y-1">
                {navigation.map((item) => {
                  const isActive = isActivePath(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 shrink-0 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className={`text-xs mt-0.5 ${
                          isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full ml-2" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats or Footer */}
            <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Admin Panel v1.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="md:pl-64 flex flex-col flex-1 pt-16 min-h-screen">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}