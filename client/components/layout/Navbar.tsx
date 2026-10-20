'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from '@/components/ui/Icons';
import Logo from '@/components/ui/Logo';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Find Jobs', href: '/jobs' },
    { label: 'Post a Free Job', href: '/jobs/new' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo matching reference */}
          <Link href="/" className="group focus:outline-none">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'text-sm font-medium transition-colors hover:text-black',
                    isActive ? 'text-black font-semibold' : 'text-gray-600'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Pill matching reference */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/jobs/new"
              className="inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all shadow-sm active:scale-95"
            >
              Post a Free Job
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  'block px-4 py-2.5 rounded-xl text-base font-medium transition-colors',
                  isActive ? 'bg-gray-100 text-black font-semibold' : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/jobs/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center bg-black hover:bg-neutral-800 text-white text-sm font-medium py-3 rounded-full transition-all"
            >
              Post a Free Job
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
