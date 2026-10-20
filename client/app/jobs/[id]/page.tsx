'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';
import DOMPurify from 'dompurify';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  GraduationCap,
  Building,
} from 'lucide-react';
import { getJobById } from '@/lib/api';
import { Job } from '@/types/job';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import EmptyState from '@/components/ui/EmptyState';
import AISummaryPanel from '@/components/ai/AISummaryPanel';

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (err: unknown) {
        console.error('Failed to load job details:', err);
        const axiosError = err as { response?: { status?: number; data?: { message?: string } } };
        setError(
          axiosError.response?.status === 404
            ? 'Job not found'
            : axiosError.response?.data?.message || 'Failed to load job details'
        );
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-xs text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <EmptyState
          title={error === 'Job not found' ? 'Job Not Found' : 'Something went wrong'}
          description="The job you are looking for may have been removed or does not exist."
          actionLabel="← Back to All Jobs"
          onAction={() => (window.location.href = '/jobs')}
        />
      </div>
    );
  }

  const formattedDate = job.postedDate
    ? formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })
    : 'Recently';

  const locationDisplay =
    job.locationType === 'WFH'
      ? 'Remote (Worldwide / Flexible)'
      : [job.city, job.state, job.country].filter(Boolean).join(', ') || 'On-site';

  const sanitizedDescription = DOMPurify.sanitize(job.description || '');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Navigation */}
      <div>
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Jobs</span>
        </Link>
      </div>

      {/* Main Job Header Card */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <Building className="w-4 h-4 text-gray-400" />
              <span>{job.companyName}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {job.title}
            </h1>

            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{locationDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span>
                  {job.experienceMin}-{job.experienceMax} years experience
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Posted {formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col items-end gap-2 flex-wrap sm:flex-nowrap">
            <Badge
              variant={
                job.locationType === 'WFH'
                  ? 'emerald'
                  : job.locationType === 'Hybrid'
                  ? 'amber'
                  : 'sky'
              }
              size="md"
            >
              {job.locationType}
            </Badge>
            {job.jobCategory && (
              <Badge variant="indigo" size="md">
                {job.jobCategory}
              </Badge>
            )}
          </div>
        </div>

        {/* AI Summary Section Card */}
        <div className="pt-2">
          <AISummaryPanel jobId={job._id} />
        </div>

        {/* Role Description */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">About the Role</h2>
          <div
            className="text-sm sm:text-base text-gray-700 rich-description leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />
        </div>

        {/* Required Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-xs text-gray-500">
              Required Skills &amp; Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 border border-gray-200/80 rounded-lg text-xs font-medium text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education Requirements */}
        {job.education && job.education.length > 0 && (
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider text-xs text-gray-500">
              Education Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50/50 border border-indigo-100 rounded-lg text-xs font-medium text-indigo-700"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{edu}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Back Action */}
      <div className="text-center pt-4">
        <Link href="/jobs">
          <Button variant="outline" size="sm">
            ← Back to All Positions
          </Button>
        </Link>
      </div>
    </div>
  );
}
