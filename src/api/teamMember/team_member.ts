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

// React Query hook for fetching a single user
export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Only run query if id exists
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Function to get a single user by ID
export const getUserById = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "User fetch failed"
      );
    }
    throw error;
  }
};

// Example of how to use React Query for mutations
// You can add these to your components when you need them:

/*
import { useMutation, useQueryClient } from '@tanstack/react-query';

// In your component:
const queryClient = useQueryClient();

const createUserMutation = useMutation({
  mutationFn: (userData) => createUser(userData),
  onSuccess: () => {
    // Invalidate and refetch users list
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

const updateUserMutation = useMutation({
  mutationFn: ({ id, userData }) => updateUser(id, userData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

const deleteUserMutation = useMutation({
  mutationFn: (id) => deleteUser(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
*/

