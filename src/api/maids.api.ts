import { axiosInstance } from './axiosInstance';

// Types
export interface CreateMaidData {
  passport_id: string;
  passport_issue_date: string;
  passport_expiry_date: string;
  passport_image: string;
  religion: string;
  description: string;
  birthday: string;
  age: number;
  nationality_id: number;
  city: string;
  price: number;
  salary: number;
  gender: string;
  current_job: string;
  Name: string;
  rate?: number;
  height?: number;
  weight?: number;
  contact_number?: string;
}

export interface UpdateMaidData {
  passport_id?: string;
  passport_issue_date?: string;
  passport_expiry_date?: string;
  passport_image?: string;
  religion?: string;
  description?: string;
  birthday?: string;
  age?: number;
  nationality_id?: number;
  city?: string;
  price?: number;
  salary?: number;
  gender?: string;
  current_job?: string;
  Name?: string;
  rate?: number;
  height?: number;
  weight?: number;
  contact_number?: string;
}

export interface Maid {
  id: number;
  name: string;
  agent_id: number;
  agency_id: number;
  passport_id: string;
  passport_issue_date: string;
  passport_expiry_date: string;
  passport_image: string;
  religion: string;
  description: string;
  birthday: string;
  age: number;
  nationality_id: number;
  city: string;
  price: number;
  salary: number;
  gender: string;
  current_job: string;
  Name: string;
  rate?: number;
  height?: number;
  weight?: number;
  contact_number?: string;
  record_status: number;
  created_at: string;
  created_by: number;
  updated_at?: string;
  updated_by?: number;
  deleted_at?: string;
  deleted_by?: number;
}

export interface MaidsResponse {
  success: boolean;
  message: string;
  data: Maid[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  filters?: any;
}

export interface MaidResponse {
  success: boolean;
  message: string;
  data: Maid;
}

export interface SearchFilters {
  name?: string;
  nationality_id?: number;
  gender?: string;
  city?: string;
  minAge?: number;
  maxAge?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

// API Functions
export const createMaid = async (maidData: CreateMaidData): Promise<MaidResponse> => {
  const response = await axiosInstance.post('/maids', maidData);
  return response.data;
};

export const getAllMaids = async (page: number = 1, limit: number = 10): Promise<MaidsResponse> => {
  const response = await axiosInstance.get(`/maids?page=${page}&limit=${limit}`);
  return response.data;
};

export const getMaidById = async (id: number): Promise<MaidResponse> => {
  const response = await axiosInstance.get(`/maids/${id}`);
  return response.data;
};

export const updateMaid = async (id: number, maidData: UpdateMaidData): Promise<MaidResponse> => {
  const response = await axiosInstance.put(`/maids/${id}`, maidData);
  return response.data;
};

export const deleteMaid = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/maids/${id}`);
  return response.data;
};

export const searchMaids = async (filters: SearchFilters): Promise<MaidsResponse> => {
  const params = new URLSearchParams();
  
  // Add filters to params
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });

  const response = await axiosInstance.get(`/maids/search?${params.toString()}`);
  return response.data;
};

export const getMaidsWithExpiringPassports = async (daysAhead: number = 30): Promise<MaidsResponse> => {
  const response = await axiosInstance.get(`/maids/expiring-passports?daysAhead=${daysAhead}`);
  return response.data;
};
