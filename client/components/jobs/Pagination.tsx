import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Pagination as PaginationType } from '@/types/job';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const { total, page, limit, totalPages } = pagination;

  if (totalPages <= 1) return null;

  // Generate page numbers to display (up to 5 pages around current page)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
      {/* Showing count indicator */}
      <span className="text-xs text-gray-500">
        Showing <span className="font-medium text-gray-900">{startItem}</span> to{' '}
        <span className="font-medium text-gray-900">{endItem}</span> of{' '}
        <span className="font-medium text-gray-900">{total}</span> jobs
      </span>

      {/* Page controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Numbered buttons */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={clsx(
              'w-8 h-8 rounded-lg text-xs font-medium transition-colors',
              pageNum === page
                ? 'bg-indigo-600 text-white font-semibold'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            {pageNum}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
