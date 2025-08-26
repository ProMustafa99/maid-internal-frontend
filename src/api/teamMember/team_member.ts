import axios from 'axios';

// Define the User interface based on actual API response
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  gender: string;
  country_id: number;
  role_id: number;
  agency_id: number | null;
  record_status: number;
  created_at: string;
  created_by: number | null;
}

// Define the API response interface based on actual structure
export interface UsersResponse {
  data: {
    columns: string[];
    data: User[];
    totalCount: number;
  };
  message: string;
}

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all users
export const getUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await api.get<UsersResponse>('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Helper function to get just the users array
export const getUsersList = async (): Promise<User[]> => {
  try {
    const response = await getUsers();
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};

// Helper function to get total count of users
export const getUsersCount = async (): Promise<number> => {
  try {
    const response = await getUsers();
    return response.data.totalCount;
  } catch (error) {
    console.error('Error fetching users count:', error);
    throw error;
  }
};

// Function to get a single user by ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new user
export const createUser = async (userData: Omit<User, 'id' | 'created_at' | 'created_by'>): Promise<User> => {
  try {
    const response = await api.post<User>('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Function to update a user
export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put<User>(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

// Export the api instance for custom requests
export { api };
