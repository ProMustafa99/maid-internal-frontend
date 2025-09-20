import { axiosInstance } from './axiosInstance';

// Types
export interface Skill {
  id: number;
  name: string;
  description?: string;
  agency_id: number;
  record_status: number;
  created_at: string;
  created_by: number;
  updated_at?: string;
  updated_by?: number;
  deleted_at?: string;
  deleted_by?: number;
}

export interface CreateSkillData {
  name: string;
  description?: string;
  agency_id?: number;
}

export interface UpdateSkillData {
  name?: string;
  description?: string;
}

export interface SkillsResponse {
  success: boolean;
  message: string;
  data: Skill[];
}

export interface SkillResponse {
  success: boolean;
  message: string;
  data: Skill;
}

// API Functions
export const getAllSkills = async (): Promise<SkillsResponse> => {
  const response = await axiosInstance.get('/skills');
  return response.data;
};

export const getSkillById = async (id: number): Promise<SkillResponse> => {
  const response = await axiosInstance.get(`/skills/${id}`);
  return response.data;
};

export const createSkill = async (skillData: CreateSkillData): Promise<SkillResponse> => {
  const response = await axiosInstance.post('/skills', skillData);
  return response.data;
};

export const updateSkill = async (id: number, skillData: UpdateSkillData): Promise<SkillResponse> => {
  const response = await axiosInstance.put(`/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.delete(`/skills/${id}`);
  return response.data;
};
