import { axiosInstance } from './axiosInstance';

export type LoginCredentials = {
  email: string;
  password: string;
}

export type SignupCredentials = {
  email: string;
  password: string;
  name: string;
  phone?: string;
  gender: string;
  country_id: number;
  role_id: number;
  agency_id?: number;
}

export type LoginResponse = {
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

export type SignupResponse = {
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


class AuthAPI {
  private endPoints = {
    login: '/login',
    signup: '/signup',
    logout: '/logout',
  }

  login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post(this.endPoints.login, credentials);
    return {
      user: response.data.data,
      token: response.data.token,
      cookie: response.data.cookie,
    };
  }

  signup = async (credentials: SignupCredentials): Promise<SignupResponse> => {
    const response = await axiosInstance.post(this.endPoints.signup, credentials);
    return {
      user: response.data.data,
    };
  }

  logout = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
      await axiosInstance.post(this.endPoints.logout, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
}

export const authAPI = new AuthAPI();
