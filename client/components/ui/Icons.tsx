import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

// ── Arrow Left ───────────────────────────────────────────────

export const ArrowLeft = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 12H5" />
    <polyline points="11 6 5 12 11 18" />
  </svg>
);

// ── Arrow Right ──────────────────────────────────────────────
export const ArrowRight = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14" />
    <polyline points="13 6 19 12 13 18" />
  </svg>
);

// ── Search ───────────────────────────────────────────────────
export const Search = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
  </svg>
);

// ── Map Pin ──────────────────────────────────────────────────
export const MapPin = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
    <circle cx="12" cy="8" r="2.2" />
  </svg>
);

// ── Check Circle ─────────────────────────────────────────────
export const CheckCircle2 = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.8 2.8L16 9" />
  </svg>
);

// ── Sparkles (AI) ────────────────────────────────────────────
export const Sparkles = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2l1.8 5.4L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.6L12 2z" />
    <path d="M5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9L5 17z" />
    <path d="M19 2l.7 1.8L21.5 4.5l-1.8.7L19 7l-.7-1.8L16.5 4.5l1.8-.7L19 2z" />
  </svg>
);

// ── Alert Circle ─────────────────────────────────────────────
export const AlertCircle = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="12.5" />
    <circle cx="12" cy="15.5" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

// ── X (Close) ────────────────────────────────────────────────
export const X = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Search X (No Results) ────────────────────────────────────
export const SearchX = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="10.5" cy="10.5" r="7" />
    <line x1="16.5" y1="16.5" x2="22" y2="22" />
    <line x1="8" y1="8" x2="13" y2="13" />
    <line x1="13" y1="8" x2="8" y2="13" />
  </svg>
);

// ── Send (Submit) ────────────────────────────────────────────
export const Send = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
    <line x1="22" y1="2" x2="11" y2="13" />
  </svg>
);

// ── Menu (Hamburger) ─────────────────────────────────────────
export const Menu = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

// ── Plus Circle ──────────────────────────────────────────────
export const PlusCircle = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// ── Briefcase ────────────────────────────────────────────────
export const Briefcase = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="8" width="20" height="13" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="2" y1="13" x2="22" y2="13" />
  </svg>
);

// ── Filter ───────────────────────────────────────────────────
export const Filter = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ── Rotate CCW (Reset) ───────────────────────────────────────
export const RotateCcw = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 2.6-6.36L3 3" />
    <polyline points="3 3 3 9 9 9" />
  </svg>
);

// ── Chevron Left ─────────────────────────────────────────────
export const ChevronLeft = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

// ── Chevron Right ────────────────────────────────────────────
export const ChevronRight = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ── Clock ────────────────────────────────────────────────────
export const Clock = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15.5 14.5" />
  </svg>
);

// ── Check (Tick) ─────────────────────────────────────────────
export const Check = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Refresh CW (Try Again) ───────────────────────────────────
export const RefreshCw = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-2.6-6.36L21 3" />
    <polyline points="21 3 21 9 15 9" />
  </svg>
);

// ── Calendar ─────────────────────────────────────────────────
export const Calendar = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="16" y1="2" x2="16" y2="6" />
  </svg>
);

// ── Graduation Cap ───────────────────────────────────────────
export const GraduationCap = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 22 8 12 14 2 8 12 2" />
    <path d="M6 11v5c0 2.21 2.686 4 6 4s6-1.79 6-4v-5" />
    <line x1="22" y1="8" x2="22" y2="14" />
  </svg>
);

// ── Building ─────────────────────────────────────────────────
export const Building = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="13" height="18" />
    <path d="M16 8h4a1 1 0 0 1 1 1v12H16" />
    <line x1="7" y1="8" x2="9" y2="8" />
    <line x1="7" y1="12" x2="9" y2="12" />
    <line x1="7" y1="16" x2="9" y2="16" />
    <line x1="11" y1="8" x2="13" y2="8" />
    <line x1="11" y1="12" x2="13" y2="12" />
  </svg>
);

// ── FileText ─────────────────────────────────────────────────
export const FileText = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

// ── ChevronDown ──────────────────────────────────────────────
export const ChevronDown = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ── Layers ───────────────────────────────────────────────────
export const Layers = ({ size = 24, className = '', strokeWidth = 1.8 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

