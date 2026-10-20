import React from 'react';
import { Job } from '@/types/job';
import JobCard from './JobCard';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';

interface JobListProps {
  jobs: Job[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  onClearFilters?: () => void;
}

export const JobList: React.FC<JobListProps> = ({
  jobs,
  loading = false,
  error = null,
  onRetry,
  onClearFilters,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm animate-pulse space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-3 w-16 bg-gray-100 rounded"></div>
            </div>
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            <div className="flex gap-4">
              <div className="h-3 w-24 bg-gray-100 rounded"></div>
              <div className="h-3 w-20 bg-gray-100 rounded"></div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="h-5 w-14 bg-gray-100 rounded-full"></div>
                <div className="h-5 w-16 bg-gray-100 rounded-full"></div>
              </div>
              <div className="h-4 w-28 bg-gray-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-100 rounded-xl text-center">
        <p className="text-sm font-medium text-red-800 mb-4">{error}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <EmptyState
        title="No matching jobs found"
        description="We couldn't find any positions matching your active filters. Try broadening your search or clear all filters."
        actionLabel={onClearFilters ? 'Clear All Filters' : undefined}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
