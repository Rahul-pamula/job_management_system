'use client';

import React, { useState, KeyboardEvent } from 'react';
import Badge from '../ui/Badge';

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
  error?: string;
}

export const SkillsInput: React.FC<SkillsInputProps> = ({
  value = [],
  onChange,
  error,
}) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !value.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...value, trimmed]);
    }
    setInputValue('');
  };

  const removeSkill = (indexToRemove: number) => {
    onChange(value.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeSkill(value.length - 1);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2 p-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white focus-within:border-transparent transition-all min-h-[46px]">
        {value.map((skill, index) => (
          <Badge
            key={index}
            variant="indigo"
            size="md"
            onRemove={() => removeSkill(index)}
          >
            {skill}
          </Badge>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => inputValue && addSkill(inputValue)}
          placeholder={value.length === 0 ? 'Type a skill (e.g. React) and press Enter or comma...' : 'Add more skills...'}
          className="flex-1 min-w-[140px] text-sm bg-transparent outline-none placeholder:text-gray-400"
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-gray-500">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-700">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-700">,</kbd> to add tag.
        </p>
        {value.length > 0 && (
          <span className="text-[11px] text-gray-400 font-medium">
            {value.length} skill{value.length !== 1 ? 's' : ''} added
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default SkillsInput;
