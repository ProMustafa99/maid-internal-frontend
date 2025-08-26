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


export interface UsersResponse {
    data: {
      columns: string[];
      users: User[];
      totalPages: number;
      currentPage: number;
      count: number;
    };
    message: string;
  }