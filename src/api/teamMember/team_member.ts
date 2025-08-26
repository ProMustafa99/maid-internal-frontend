import axios from 'axios';
import { axiosInstance } from '../axiosInstance';
import { useQuery } from '@tanstack/react-query';

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

// React Query hook for fetching users
export const useUsers = (page: number = 1) => {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => getSubUsers(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};



