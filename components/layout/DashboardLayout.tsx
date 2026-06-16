'use client';

import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-md-bg text-md-on-bg transition-colors duration-300">
      {/* MD3 Organic blur shapes — atmospheric background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="md3-blur-shape -left-20 top-10 h-72 w-72 bg-md-primary-container opacity-30" />
        <div className="md3-blur-shape -right-16 top-40 h-64 w-64 bg-md-secondary-container opacity-20" />
        <div className="md3-blur-shape bottom-20 left-1/3 h-56 w-80 bg-md-tertiary-container opacity-15" />
      </div>

      <Header />
      <div className="flex">
        <Sidebar />
        <main className="min-h-[calc(100vh-4rem)] flex-1 overflow-x-hidden">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
