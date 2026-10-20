'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Briefcase,
  FileText
} from '@/components/ui/Icons';
import { Job } from '@/types/job';
import { getJobs } from '@/lib/api';
import JobCard from '@/components/jobs/JobCard';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();
  const [titleQuery, setTitleQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentJobs() {
      try {
        setLoading(true);
        const data = await getJobs({ limit: 6 });
        setRecentJobs(data.jobs || []);
      } catch (err) {
        console.error('Failed to load recent jobs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (titleQuery.trim()) params.set('title', titleQuery.trim());
    if (locationQuery.trim()) params.set('city', locationQuery.trim());
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden">
      {/* 1. Hero Section matching reference */}
      <section className="relative pt-8 sm:pt-12 pb-20 lg:pb-28 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32">
        {/* Background Subtle Concentric Rings */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[750px] h-[750px] pointer-events-none opacity-40 hidden lg:block">
          <svg viewBox="0 0 600 600" fill="none" className="w-full h-full stroke-gray-200">
            <circle cx="300" cy="300" r="140" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="300" cy="300" r="210" strokeWidth="1" />
            <circle cx="300" cy="300" r="280" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-center relative z-10">
          {/* Left Column: Headline & Floating Search Capsule */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-9">
            <div className="space-y-5">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] 2xl:text-[90px] font-bold text-gray-950 tracking-tight leading-[1.06] font-sans">
                Get Hired Faster<br />
                <span className="font-semibold text-gray-900">and Smarter</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-500 font-normal max-w-xl leading-relaxed">
                Browse, search and discover curated jobs easily with AI assistance.
              </p>
            </div>

            {/* Floating Capsule Search Bar */}
            <div className="w-full max-w-3xl relative">
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-3xl p-3 sm:p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 transition-shadow hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)]"
              >
                {/* Search Segment */}
                <div className="flex-1 w-full flex items-center gap-3 px-3 py-1.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      Search
                    </span>
                    <input
                      type="text"
                      value={titleQuery}
                      onChange={(e) => setTitleQuery(e.target.value)}
                      placeholder="Job title or keyword"
                      className="w-full text-sm font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Subtle Divider */}
                <div className="hidden sm:block w-px h-10 bg-gray-200"></div>

                {/* Location Segment */}
                <div className="flex-1 w-full flex items-center gap-3 px-3 py-1.5">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                      Location
                    </span>
                    <input
                      type="text"
                      value={locationQuery}
                      onChange={(e) => setLocationQuery(e.target.value)}
                      placeholder="Select Location"
                      className="w-full text-sm font-medium text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Black Rounded Search Button */}
                <button
                  type="submit"
                  className="w-full sm:w-14 h-12 sm:h-14 bg-black hover:bg-neutral-800 text-white rounded-2xl flex items-center justify-center transition-all shadow-md active:scale-95 flex-shrink-0"
                  aria-label="Search jobs"
                >
                  <Search className="w-5 h-5 text-white" />
                </button>
              </form>
            </div>

            {/* Bottom floating micro card & link */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                href="/jobs/new"
                className="inline-flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-md transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-black flex items-center justify-center text-white">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-900">Start Your Career</span>
                  <span className="block text-[11px] text-gray-400">Post a free job listing</span>
                </div>
              </Link>

              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-black transition-colors"
              >
                <span>How it works</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Portrait, Badges & Numbers */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col items-center relative">
            <div className="relative w-full max-w-[460px] xl:max-w-[520px] aspect-[4/5] flex items-center justify-center">
              {/* Floating Calendar Badge (top left) */}
              <div className="absolute top-10 -left-3 z-20 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                <Calendar className="w-5 h-5" />
              </div>

              {/* Floating Google Badge (top right) */}
              <div className="absolute top-16 -right-3 z-20 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-100 p-3">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>

              {/* Main Portrait with Soft Radial Blend */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-sm">
                <Image
                  src="/images/hero-woman.jpg"
                  alt="Professional woman finding opportunities"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Metrics Section matching reference slider tick style */}
            <div className="w-full max-w-[420px] mt-6 pt-2">
              {/* Slider Line with markers */}
              <div className="relative flex items-center justify-between mb-4 px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                <div className="flex-1 h-px bg-gray-300 mx-3 relative">
                  <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-px h-6 bg-gray-400"></div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="border-r border-gray-100 pr-4">
                  <span className="block text-4xl font-extrabold text-gray-950 font-sans tracking-tight">
                    50K+
                  </span>
                  <span className="block text-sm text-gray-500 font-medium mt-1">
                    Active job seekers
                  </span>
                </div>
                <div className="pl-4">
                  <span className="block text-4xl font-extrabold text-gray-950 font-sans tracking-tight">
                    20K+
                  </span>
                  <span className="block text-sm text-gray-500 font-medium mt-1">
                    Verified companies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recent Opportunities Section */}
      <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-20 border-t border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Explore curated roles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
              Recent Opportunities
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Latest hand-picked openings from innovative companies worldwide
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm animate-pulse space-y-4"
              >
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : recentJobs.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
            <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900">No jobs listed yet</h3>
            <p className="text-sm text-gray-500 mt-1">Be the first company to post an opening.</p>
            <Link href="/jobs/new" className="mt-4 inline-block">
              <Button variant="primary" size="sm">
                Post a Free Job
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
