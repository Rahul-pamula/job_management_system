import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'indigo' | 'emerald' | 'amber' | 'sky' | 'gray' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  onRemove,
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700 border border-gray-200',
    gray: 'bg-gray-100 text-gray-700 border border-gray-200',
    indigo: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    sky: 'bg-sky-50 text-sky-700 border border-sky-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 font-medium rounded-full transition-colors',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 text-current hover:opacity-75 focus:outline-none"
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Badge;
