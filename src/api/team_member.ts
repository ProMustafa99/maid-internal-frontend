import axios from 'axios';
import { axiosInstance } from './axiosInstance';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Interface for create user data based on CreateUserDto
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: 'Female' | 'Male';
  country_id?: number;
  role_id: number;
  agency_id?: number;
  record_status?: number;
}

export const getSubUsers = async (page: number): Promise<any> => {
    try {      
      const response = await axiosInstance.get(
        `/users?page=${page}`,
      );
      console.log("response", response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Sub users fetch failed"
        );
      }
      throw error;
    }
  };

// Create user API function
export const createUser = async (userData: CreateUserData): Promise<any> => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Enhanced error handling with more specific error messages
      const status = error.response?.status;
      if (status === 403) {
        throw new Error('You are not authorized to create users with this role');
      } else if (status === 409) {
        throw new Error(error.response?.data?.message || 'User with this email already exists');
      } else if (status === 400) {
        throw new Error(error.response?.data?.message || 'Invalid data provided');
      } else if (status && status >= 500) {
        throw new Error('Server error occurred. Please try again later.');
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error(
          error.response?.data?.message || "User creation failed"
        );
      }
    }
    throw error;
  }
};

// React Query hook for fetching users
export const useUsers = (page: number = 1) => {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => getSubUsers(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// React Query hook for creating users
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch users list after successful creation
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    },
  });
};



