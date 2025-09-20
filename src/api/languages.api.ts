// import { axiosInstance } from './axiosInstance';

// // Types
// export interface Language {
//   id: number;
//   name: string;
//   description?: string;
//   agency_id: number;
//   record_status: number;
//   created_at: string;
//   created_by: number;
//   updated_at?: string;
//   updated_by?: number;
//   deleted_at?: string;
//   deleted_by?: number;
// }

// export interface CreateLanguageData {
//   name: string;
//   description?: string;
//   agency_id?: number;
// }

// export interface UpdateLanguageData {
//   name?: string;
//   description?: string;
// }

// export interface LanguagesResponse {
//   success: boolean;
//   message: string;
//   data: Language[];
// }

// export interface LanguageResponse {
//   success: boolean;
//   message: string;
//   data: Language;
// }

// // API Functions
// export const getAllLanguages = async (): Promise<LanguagesResponse> => {
//   const response = await axiosInstance.get('/languages');
//   return response.data;
// };

// export const getLanguageById = async (id: number): Promise<LanguageResponse> => {
//   const response = await axiosInstance.get(`/languages/${id}`);
//   return response.data;
// };

// export const createLanguage = async (languageData: CreateLanguageData): Promise<LanguageResponse> => {
//   const response = await axiosInstance.post('/languages', languageData);
//   return response.data;
// };

// export const updateLanguage = async (id: number, languageData: UpdateLanguageData): Promise<LanguageResponse> => {
//   const response = await axiosInstance.put(`/languages/${id}`, languageData);
//   return response.data;
// };

// export const deleteLanguage = async (id: number): Promise<{ success: boolean; message: string }> => {
//   const response = await axiosInstance.delete(`/languages/${id}`);
//   return response.data;
// };
