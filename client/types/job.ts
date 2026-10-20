export interface Job {
  _id: string;
  title: string;
  companyName: string;
  description: string;
  locationType: 'WFH' | 'Hybrid' | 'WFO';
  country?: string;
  state?: string;
  city?: string;
  skills: string[];
  jobCategory: string;
  education?: string[];
  experienceMin: number;
  experienceMax: number;
  postedDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobsResponse {
  jobs: Job[];
  pagination: Pagination;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface JobFilters {
  title?: string;
  companyName?: string;
  jobCategory?: string;
  locationType?: string;
  city?: string;
  skills?: string;
  experienceMin?: string | number;
  experienceMax?: string | number;
  page?: string | number;
  limit?: string | number;
}
