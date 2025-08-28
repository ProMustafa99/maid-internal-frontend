import { axiosInstance } from './axiosInstance';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  phone?: string;
  gender: string;
  country_id: number;
  role_id: number;
  agency_id?: number;
}

export interface LoginResponse {
  user: {
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
  };
  token?: string;
  cookie?: string;
}

export interface SignupResponse {
  user: {
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
  };
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/login', credentials);
    return {
      user: response.data.data,
      token: response.data.token,
      cookie: response.data.cookie,
    };
  },

  signup: async (credentials: SignupCredentials): Promise<SignupResponse> => {
    const response = await axiosInstance.post('/signup', credentials);
    return {
      user: response.data.data,
    };
  },

  logout: async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
      await axiosInstance.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
};
