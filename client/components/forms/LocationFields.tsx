import React from 'react';

interface LocationFieldsProps {
  locationType: 'WFH' | 'Hybrid' | 'WFO';
  country: string;
  state: string;
  city: string;
  onChange: (field: 'country' | 'state' | 'city', value: string) => void;
  errors?: {
    country?: string;
    city?: string;
  };
}

export const LocationFields: React.FC<LocationFieldsProps> = ({
  locationType,
  country,
  state,
  city,
  onChange,
  errors = {},
}) => {
  // If WFH, completely hidden from UI
  if (locationType === 'WFH') {
    return null;
  }

  return (
    <div className="pt-2 border-t border-gray-100 space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Physical Location Details ({locationType})
        </h4>
        <span className="text-xs text-amber-600 font-medium">
          Required for {locationType}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Country */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 block">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. United States"
            value={country || ''}
            onChange={(e) => onChange('country', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          {errors.country && (
            <p className="text-xs text-red-600 font-medium">{errors.country}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 block">
            State / Region <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. California"
            value={state || ''}
            onChange={(e) => onChange('state', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        {/* City */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 block">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. San Francisco"
            value={city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          {errors.city && (
            <p className="text-xs text-red-600 font-medium">{errors.city}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationFields;
