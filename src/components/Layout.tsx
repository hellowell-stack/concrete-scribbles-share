
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto p-4 pt-20">
        {children}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Layout;
