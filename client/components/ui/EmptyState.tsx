import React from 'react';
import { SearchX } from './Icons';

import Button from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No jobs found',
  description = 'Try adjusting your search criteria or filters to discover new opportunities.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="w-14 h-14 mb-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100">
        {icon || <SearchX className="w-7 h-7" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
