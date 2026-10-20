'use client';

import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto py-12">
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="group">
              <Logo size="sm" />
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              Browse, search and discover curated jobs easily with AI assistance.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/jobs" className="hover:text-black transition-colors">
              Find Jobs
            </Link>
            <Link href="/jobs/new" className="hover:text-black transition-colors">
              Post a Free Job
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} JobShuru Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
