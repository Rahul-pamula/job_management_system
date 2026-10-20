import React from 'react';
import Link from 'next/link';
import { Briefcase } from '../ui/Icons';


export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                JobBoard<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 mt-1">
              Find the right opportunity. Hire smarter.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="/jobs" className="hover:text-indigo-600 transition-colors">
              Find Jobs
            </Link>
            <Link href="/jobs/new" className="hover:text-indigo-600 transition-colors">
              Post a Free Job
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} JobBoard Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
