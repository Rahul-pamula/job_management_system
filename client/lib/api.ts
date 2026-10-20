import axios from 'axios';
import { Job, JobsResponse, JobFilters, ApiResponse } from '@/types/job';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000,
});

export const getJobs = async (filters: JobFilters = {}): Promise<JobsResponse> => {
  const cleanParams: Record<string, string | number> = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'All') {
      cleanParams[key] = value;
    }
  });

  const response = await api.get<ApiResponse<JobsResponse>>('/api/jobs', {
    params: cleanParams,
  });

  return response.data.data;
};

export const getJobById = async (id: string): Promise<Job> => {
  const response = await api.get<ApiResponse<Job>>(`/api/jobs/${id}`);
  return response.data.data;
};

export const createJob = async (jobData: Partial<Job>): Promise<Job> => {
  const response = await api.post<ApiResponse<Job>>('/api/jobs', jobData);
  return response.data.data;
};

export const improveDescription = async (description: string): Promise<string> => {
  const response = await api.post<ApiResponse<{ improvedDescription: string }>>('/api/ai/improve', {
    description,
  });
  return response.data.data.improvedDescription;
};

export const generateSummary = async (jobId: string): Promise<string> => {
  const response = await api.post<ApiResponse<{ summary: string }>>('/api/ai/summary', {
    jobId,
  });
  return response.data.data.summary;
};

export default api;
