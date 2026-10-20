'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import RichTextEditor from './RichTextEditor';
import SkillsInput from './SkillsInput';
import LocationFields from './LocationFields';
import AIImprovePanel from '../ai/AIImprovePanel';
import Toast from '../ui/Toast';
import { createJob } from '@/lib/api';

const formSchema = z
  .object({
    title: z.string().min(2, 'Job title must be at least 2 characters'),
    companyName: z.string().min(2, 'Company name must be at least 2 characters'),
    jobCategory: z.string().min(1, 'Please select a job category'),
    description: z
      .string()
      .min(10, 'Job description must be at least 10 characters')
      .refine(
        (val) => val.replace(/<[^>]*>/g, '').trim().length > 0,
        'Job description cannot be empty'
      ),
    locationType: z.enum(['WFH', 'Hybrid', 'WFO']),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    skills: z.array(z.string()),
    education: z.array(z.string()),
    experienceMin: z.number().min(0, 'Minimum experience cannot be negative'),
    experienceMax: z.number().min(0, 'Maximum experience cannot be negative'),
  })
  .refine(
    (data) => {
      if (data.locationType !== 'WFH') {
        return Boolean(data.country && data.country.trim() && data.city && data.city.trim());
      }
      return true;
    },
    {
      message: 'Country and City are required for Hybrid or WFO positions',
      path: ['country'],
    }
  )
  .refine(
    (data) => data.experienceMax >= data.experienceMin,
    {
      message: 'Maximum experience must be greater than or equal to minimum experience',
      path: ['experienceMax'],
    }
  );

type FormData = z.infer<typeof formSchema>;

const CATEGORIES = [
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

const EDUCATION_OPTIONS = [
  "Bachelor's Degree",
  "Master's Degree",
  'Diploma',
  'PhD / Doctorate',
];

export const JobForm: React.FC = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      companyName: '',
      jobCategory: 'Engineering',
      description: '',
      locationType: 'WFH',
      country: '',
      state: '',
      city: '',
      skills: [],
      education: [],
      experienceMin: 0,
      experienceMax: 3,
    },
  });

  const locationType = watch('locationType');
  const country = watch('country');
  const state = watch('state');
  const city = watch('city');
  const education = watch('education') || [];
  const description = watch('description');

  const handleLocationTypeChange = (type: 'WFH' | 'Hybrid' | 'WFO') => {
    setValue('locationType', type);
    if (type === 'WFH') {
      setValue('country', '');
      setValue('state', '');
      setValue('city', '');
    }
  };

  const toggleEducation = (item: string) => {
    if (education.includes(item)) {
      setValue(
        'education',
        education.filter((e) => e !== item)
      );
    } else {
      setValue('education', [...education, item]);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const created = await createJob(data);
      setToastMessage('Job posted successfully! Redirecting to listing...');
      setTimeout(() => {
        router.push(`/jobs/${created._id}`);
      }, 1500);
    } catch (err: unknown) {
      console.error('Job submission failed:', err);
      const axiosError = err as { response?: { data?: { message?: string } } };
      alert(
        axiosError.response?.data?.message || 'Failed to submit job. Please check all required fields.'
      );
      setSubmitting(false);
    }
  };

  return (
    <>
      {toastMessage && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastMessage(null)}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8"
      >
        {/* Section 1: Role Overview */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            1. Role Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 block">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                {...register('title')}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {errors.title && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Corp"
                {...register('companyName')}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {errors.companyName && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700 block">
              Job Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register('jobCategory')}
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.jobCategory && (
              <p className="text-xs text-red-600 font-medium">
                {errors.jobCategory.message}
              </p>
            )}
          </div>
        </div>

        {/* Section 2: Description & AI Polish */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              2. Job Description
            </h2>
            <span className="text-xs text-gray-400">Rich text editor</span>
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                error={errors.description?.message}
              />
            )}
          />

          {/* AI Description Refinement */}
          <AIImprovePanel
            currentDescription={description}
            onApply={(improved) => setValue('description', improved, { shouldValidate: true })}
          />
        </div>

        {/* Section 3: Workplace & Location */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            3. Workplace & Location
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 block">
              Workplace Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['WFH', 'Hybrid', 'WFO'] as const).map((type) => {
                const isSelected = locationType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleLocationTypeChange(type)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold shadow-xs ring-1 ring-indigo-500'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium">{type === 'WFH' ? 'Remote (WFH)' : type}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {type === 'WFH'
                        ? 'Work from anywhere'
                        : type === 'Hybrid'
                        ? 'Office + Remote'
                        : 'On-site required'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional Location Fields */}
          <LocationFields
            locationType={locationType}
            country={country || ''}
            state={state || ''}
            city={city || ''}
            onChange={(field, val) => setValue(field, val, { shouldValidate: true })}
            errors={{
              country: errors.country?.message,
              city: errors.city?.message,
            }}
          />
        </div>

        {/* Section 4: Skills & Education */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            4. Skills & Education
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-700 block">
              Target Skills
            </label>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <SkillsInput
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.skills?.message}
                />
              )}
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-medium text-gray-700 block">
              Preferred Education
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {EDUCATION_OPTIONS.map((opt) => {
                const checked = education.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggleEducation(opt)}
                    className={`py-2 px-3 text-xs rounded-lg border text-left flex items-center justify-between transition-all ${
                      checked
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{opt}</span>
                    {checked && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 5: Experience Requirements */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            5. Experience Range
          </h2>

          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 block">
                Minimum Years
              </label>
              <input
                type="number"
                min="0"
                {...register('experienceMin', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {errors.experienceMin && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.experienceMin.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 block">
                Maximum Years
              </label>
              <input
                type="number"
                min="0"
                {...register('experienceMax', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {errors.experienceMax && (
                <p className="text-xs text-red-600 font-medium">
                  {errors.experienceMax.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/jobs')}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={submitting}
            icon={<Send className="w-4 h-4" />}
          >
            {submitting ? 'Publishing...' : 'Publish Job'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default JobForm;
