'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }[size];

  const textStyles = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Sleek Geometric Isometric Layers Mark */}
      <div className={`${iconDimensions} flex items-center justify-center relative flex-shrink-0`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform hover:scale-105 transition-transform duration-300"
        >
          {/* Top Layer */}
          <path
            d="M18 4L32 11.5L18 19L4 11.5L18 4Z"
            fill="#111827"
          />
          {/* Middle Accent Strip / Gap */}
          <path
            d="M7 16.5L18 22.5L29 16.5L32 18.2L18 25.8L4 18.2L7 16.5Z"
            fill="#1F2937"
          />
          {/* Bottom Foundation Layer */}
          <path
            d="M7 23.5L18 29.5L29 23.5L32 25.2L18 32.8L4 25.2L7 23.5Z"
            fill="#374151"
          />
        </svg>
      </div>

      {/* Modern Wordmark */}
      {showText && (
        <span
          className={`${textStyles} font-extrabold tracking-[-0.03em] text-gray-950 font-sans flex items-center`}
        >
          JobShuru
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-black ml-0.5 self-end mb-1"></span>
        </span>
      )}
    </div>
  );
};

export default Logo;
