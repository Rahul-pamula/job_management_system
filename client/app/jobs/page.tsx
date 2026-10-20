'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getJobs } from '@/lib/api';
import { Job, Pagination as PaginationType, JobFilters } from '@/types/job';
import FilterPanel from '@/components/jobs/FilterPanel';
import JobList from '@/components/jobs/JobList';
import Pagination from '@/components/jobs/Pagination';
import Spinner from '@/components/ui/Spinner';

function JobsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync state from URL search params
  const currentFilters: JobFilters = {
    title: searchParams.get('title') || '',
    companyName: searchParams.get('companyName') || '',
    jobCategory: searchParams.get('jobCategory') || '',
    locationType: searchParams.get('locationType') || '',
    city: searchParams.get('city') || '',
    skills: searchParams.get('skills') || '',
    experienceMin: searchParams.get('experienceMin') || '',
    experienceMax: searchParams.get('experienceMax') || '',
    page: searchParams.get('page') || '1',
    limit: 10,
  };

  const activeFilterCount = [
    searchParams.get('title') || '',
    searchParams.get('companyName') || '',
    searchParams.get('jobCategory') && searchParams.get('jobCategory') !== 'All' ? searchParams.get('jobCategory') : '',
    searchParams.get('locationType') && searchParams.get('locationType') !== 'All' ? searchParams.get('locationType') : '',
    searchParams.get('skills') || '',
    searchParams.get('experienceMin') || '',
    searchParams.get('experienceMax') || '',
    searchParams.get('city') || '',
  ].filter(Boolean).length;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const filters: JobFilters = {
        title: searchParams.get('title') || '',
        companyName: searchParams.get('companyName') || '',
        jobCategory: searchParams.get('jobCategory') || '',
        locationType: searchParams.get('locationType') || '',
        city: searchParams.get('city') || '',
        skills: searchParams.get('skills') || '',
        experienceMin: searchParams.get('experienceMin') || '',
        experienceMax: searchParams.get('experienceMax') || '',
        page: searchParams.get('page') || '1',
        limit: 10,
      };

      const data = await getJobs(filters);
      setJobs(data.jobs || []);
      setPagination(
        data.pagination || {
          total: data.jobs?.length || 0,
          page: Number(filters.page) || 1,
          limit: 10,
          totalPages: 1,
        }
      );
    } catch (err: unknown) {
      console.error('Failed to fetch jobs:', err);
      setError('Could not load jobs from server. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const updateUrlParams = (newParams: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, val]) => {
      if (val === undefined || val === '' || val === null || val === 'All') {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    router.push(`/jobs?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof JobFilters, value: string | number) => {
    // Changing any filter always resets page to 1
    updateUrlParams({
      [key]: value,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    router.push('/jobs');
  };

  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
          Find Jobs
        </h1>
        <p className="text-base text-gray-500 mt-1">
          Search and filter verified positions across engineering, product, and design.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Sidebar Filter Panel */}
        <div className="lg:col-span-4 xl:col-span-3">
          <FilterPanel
            filters={currentFilters}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Right Main Content */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-sm">
            <span className="font-medium text-gray-700">
              {loading ? (
                'Searching jobs...'
              ) : (
                <>
                  <span className="font-semibold text-gray-900">{pagination.total}</span>{' '}
                  {pagination.total === 1 ? 'position' : 'positions'} found
                </>
              )}
            </span>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Job List */}
          <JobList
            jobs={jobs}
            loading={loading}
            error={error}
            onRetry={fetchJobs}
            onClearFilters={handleClearFilters}
          />

          {/* Pagination */}
          {!loading && jobs.length > 0 && (
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <JobsContent />
    </Suspense>
  );
}
