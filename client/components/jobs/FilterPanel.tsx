'use client';

import React, { useState } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { JobFilters } from '@/types/job';
import Button from '../ui/Button';

interface FilterPanelProps {
  filters: JobFilters;
  onFilterChange: (key: keyof JobFilters, value: string | number) => void;
  onClear: () => void;
  activeFilterCount: number;
}

const CATEGORIES = [
  'All',
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Operations',
  'DevOps',
  'Data Science',
  'QA',
  'Mobile',
  'Other',
];

const LOCATION_TYPES = ['All', 'WFH', 'Hybrid', 'WFO'];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClear,
  activeFilterCount,
}) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <aside className="w-full">
      {/* Mobile Accordion Toggle */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700">
                {activeFilterCount}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 font-normal">
            {mobileExpanded ? 'Hide Filters' : 'Show Filters'}
          </span>
        </button>
      </div>

      {/* Filter Content */}
      <div
        className={`bg-white border border-gray-200/80 rounded-xl p-5 shadow-sm space-y-6 ${
          mobileExpanded ? 'block' : 'hidden lg:block'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Filter Jobs</h2>
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all
            </button>
          )}
        </div>

        {/* 1. Job Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Engineer"
            value={filters.title || ''}
            onChange={(e) => onFilterChange('title', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-gray-400"
          />
        </div>

        {/* 2. Company Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g. Stripe, Figma"
            value={filters.companyName || ''}
            onChange={(e) => onFilterChange('companyName', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-gray-400"
          />
        </div>

        {/* 3. Job Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Category
          </label>
          <select
            value={filters.jobCategory || 'All'}
            onChange={(e) => onFilterChange('jobCategory', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Location Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Workplace Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LOCATION_TYPES.map((type) => {
              const isSelected = (filters.locationType || 'All') === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onFilterChange('locationType', type)}
                  className={`text-xs py-1.5 px-3 rounded-lg border text-center font-medium transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {type === 'WFH' ? 'Remote (WFH)' : type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Skills */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Skills <span className="text-gray-400 font-normal">(comma-separated)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. React, Node.js"
            value={filters.skills || ''}
            onChange={(e) => onFilterChange('skills', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all placeholder:text-gray-400"
          />
        </div>

        {/* 6. Experience Range */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-700 block">
            Experience (years)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={filters.experienceMin ?? ''}
              onChange={(e) => onFilterChange('experienceMin', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
            <span className="text-gray-400 text-xs">to</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={filters.experienceMax ?? ''}
              onChange={(e) => onFilterChange('experienceMax', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Clear Filters CTA */}
        {activeFilterCount > 0 && (
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="w-full justify-center text-xs"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterPanel;
