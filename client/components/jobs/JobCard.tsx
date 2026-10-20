'use client';

import React from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Briefcase, Clock } from '../ui/Icons';

import { Job } from '@/types/job';
import Badge from '../ui/Badge';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getLocationBadgeVariant = (type: string) => {
    switch (type) {
      case 'WFH':
        return 'emerald';
      case 'Hybrid':
        return 'amber';
      case 'WFO':
        return 'sky';
      default:
        return 'gray';
    }
  };

  const formattedDate = job.postedDate
    ? formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })
    : 'Recently';

  const locationDisplay =
    job.locationType === 'WFH'
      ? 'Remote'
      : [job.city, job.state, job.country].filter(Boolean).join(', ') || 'On-site';

  const visibleSkills = job.skills?.slice(0, 3) || [];
  const hiddenSkillsCount = (job.skills?.length || 0) - visibleSkills.length;

  return (
    <Link
      href={`/jobs/${job._id}`}
      className="block p-5 bg-white border border-gray-200/90 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex flex-col h-full justify-between gap-4">
        <div>
          {/* Header Row: Company and Posted Date */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 truncate">
              {job.companyName}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
              <Clock className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Job Title */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {job.title}
          </h3>

          {/* Location & Experience Meta */}
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate max-w-[180px]">{locationDisplay}</span>
            </div>
            {(job.experienceMin !== undefined || job.experienceMax !== undefined) && (
              <div className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                <span>
                  {job.experienceMin}-{job.experienceMax} yrs exp
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Badges & Tags Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={getLocationBadgeVariant(job.locationType)} size="sm">
              {job.locationType}
            </Badge>
            {job.jobCategory && (
              <Badge variant="indigo" size="sm">
                {job.jobCategory}
              </Badge>
            )}
          </div>

          {/* Skills Preview */}
          {visibleSkills.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {visibleSkills.map((skill, index) => (
                <span
                  key={index}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                >
                  {skill}
                </span>
              ))}
              {hiddenSkillsCount > 0 && (
                <span className="text-[11px] text-gray-400 font-medium">
                  +{hiddenSkillsCount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
