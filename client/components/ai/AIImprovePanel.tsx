'use client';

import React, { useState } from 'react';
import { Sparkles, Check, X, AlertCircle } from '../ui/Icons';

import { improveDescription } from '@/lib/api';
import Button from '../ui/Button';

interface AIImprovePanelProps {
  currentDescription: string;
  onApply: (improvedText: string) => void;
}

export const AIImprovePanel: React.FC<AIImprovePanelProps> = ({
  currentDescription,
  onApply,
}) => {
  const [loading, setLoading] = useState(false);
  const [improvedText, setImprovedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = async () => {
    // Strip HTML to check if there is actual text
    const plainText = currentDescription?.replace(/<[^>]*>/g, '').trim();
    if (!plainText) {
      setError('Please write a draft description first before improving with AI.');
      return;
    }

    setLoading(true);
    setError(null);
    setImprovedText(null);

    try {
      const result = await improveDescription(currentDescription);
      setImprovedText(result);
    } catch (err: unknown) {
      console.error('AI improvement failed:', err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(
        axiosError.response?.data?.message || 'AI improvement service encountered an error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (improvedText) {
      onApply(improvedText);
      setImprovedText(null);
    }
  };

  const handleDiscard = () => {
    setImprovedText(null);
    setError(null);
  };

  return (
    <div className="space-y-3">
      {/* Action Trigger */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          Want a more professional, polished job description?
        </span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          loading={loading}
          onClick={handleImprove}
          className="border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300"
          icon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
        >
          {loading ? 'Refining with AI...' : '✨ Improve with AI'}
        </Button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-center justify-between text-xs text-red-700 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* AI Preview Card */}
      {improvedText && (
        <div className="p-4 bg-indigo-50/40 border border-indigo-200 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Suggested Version Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleApply}
                className="bg-indigo-600 hover:bg-indigo-700 text-xs py-1 px-3"
                icon={<Check className="w-3.5 h-3.5" />}
              >
                Apply
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDiscard}
                className="text-xs py-1 px-2.5 text-gray-500 hover:text-gray-700"
                icon={<X className="w-3.5 h-3.5" />}
              >
                Discard
              </Button>
            </div>
          </div>

          {/* Render preview */}
          <div
            className="p-3.5 bg-white border border-indigo-100 rounded-lg text-sm text-gray-700 max-h-72 overflow-y-auto rich-description"
            dangerouslySetInnerHTML={{ __html: improvedText }}
          />

          <p className="text-[11px] text-gray-400 italic">
            Clicking &quot;Apply&quot; will replace the current editor content with this polished version.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIImprovePanel;
