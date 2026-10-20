'use client';

import React, { useState } from 'react';
import { Sparkles, AlertCircle, RefreshCw } from '../ui/Icons';

import { generateSummary } from '@/lib/api';
import Button from '../ui/Button';

interface AISummaryPanelProps {
  jobId: string;
}

export const AISummaryPanel: React.FC<AISummaryPanelProps> = ({ jobId }) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!jobId) return;

    setLoading(true);
    setError(null);

    try {
      const result = await generateSummary(jobId);
      setSummary(result);
    } catch (err: unknown) {
      console.error('AI summary error:', err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(
        axiosError.response?.data?.message || 'Could not generate AI summary at this moment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-50/50 via-white to-gray-50/50 border border-indigo-100 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">
            AI Role Summary
          </h3>
        </div>

        {!summary && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            loading={loading}
            onClick={handleGenerate}
            className="border-indigo-300 text-indigo-700 bg-white hover:bg-indigo-50 text-xs self-start sm:self-auto"
            icon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
          >
            {loading ? 'Synthesizing...' : '✨ Generate AI Summary'}
          </Button>
        )}
      </div>

      {/* Summary Content */}
      {summary ? (
        <div className="space-y-3 animate-in fade-in">
          <blockquote className="text-sm sm:text-base leading-relaxed text-gray-700 border-l-2 border-indigo-500 pl-4 py-1 italic bg-white/60 rounded-r-lg">
            &ldquo;{summary}&rdquo;
          </blockquote>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-gray-400">
              Summarized by Groq LLaMA-3.3 engine
            </span>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              Regenerate
            </button>
          </div>
        </div>
      ) : !loading && !error ? (
        <p className="text-xs sm:text-sm text-gray-500">
          Get a quick 2-3 sentence overview of this role&apos;s key responsibilities and expectations generated on-demand with AI.
        </p>
      ) : null}

      {/* Error State */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center justify-between text-xs text-red-700 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleGenerate}
            className="text-xs py-0.5 px-2 text-red-700 hover:bg-red-100"
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};

export default AISummaryPanel;
