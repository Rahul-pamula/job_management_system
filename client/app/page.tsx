'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
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
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Subtitle tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Recruitment &amp; Discovery</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
          Find the Right Opportunity.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Hire Smarter.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Explore curated roles across engineering, product, and design. Post free positions and refine job descriptions instantly with artificial intelligence.
        </p>

        {/* Dual Search Bar Container */}
        <div className="mt-10 max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="p-2 sm:p-2.5 bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-100/60 flex flex-col sm:flex-row items-center gap-2"
          >
            {/* Title / Keyword Input */}
            <div className="flex-1 w-full flex items-center gap-2 px-3 py-2 text-gray-700">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
                placeholder="Job title, skills, or company"
                className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

            {/* Location Input */}
            <div className="flex-1 w-full flex items-center gap-2 px-3 py-2 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="City, country, or Remote"
                className="w-full text-sm bg-transparent outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Find Jobs Submit */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold"
            >
              Find Jobs
            </Button>
          </form>

          {/* Secondary CTA underneath */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Hiring talent?</span>
            <Link
              href="/jobs/new"
              className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              Post a Free Job <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Recent Opportunities Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Recent Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Latest hand-picked openings from innovative companies worldwide
            </p>
          </div>

          <Link href="/jobs">
            <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 font-semibold gap-1">
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm animate-pulse space-y-4"
              >
                <div className="h-4 w-28 bg-gray-200 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        ) : recentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500">No jobs posted yet.</p>
            <Link href="/jobs/new" className="mt-3 inline-block">
              <Button variant="primary" size="sm">
                Post the First Job
              </Button>
            </Link>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link href="/jobs" className="block w-full">
            <Button variant="outline" size="md" className="w-full justify-center">
              Browse All Jobs
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="bg-gray-50/60 border-y border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              A Simpler Way to Connect
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Designed for speed and clarity. No passwords, no friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Job Seekers */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900">For Job Seekers</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discover positions with transparent requirements, location flexibility (WFH, Hybrid, WFO), and on-demand AI summaries.
              </p>
              <ul className="space-y-2 text-xs text-gray-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Real-time multi-filter search (category, skills, experience)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Instant 2-sentence AI summaries of complex roles</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Clean URL sync for sharing and bookmarking filters</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/jobs">
                  <Button variant="outline" size="sm" className="font-semibold">
                    Start Searching
                  </Button>
                </Link>
              </div>
            </div>

            {/* For Employers */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900">For Hiring Teams</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Publish positions in minutes with zero signup roadblocks. Use integrated Groq AI to rewrite and polish job descriptions.
              </p>
              <ul className="space-y-2 text-xs text-gray-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Free job postings with rich text formatting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>&quot;✨ Improve with AI&quot; generator transforms rough drafts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Immediate visibility in the global directory</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link href="/jobs/new">
                  <Button variant="primary" size="sm" className="font-semibold">
                    Post a Free Job
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
