import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const getFieldsByPageId = async (page: number): Promise<any> => {
    try {      
      const response = await axiosInstance.get(
        `/fields/page/${page}`,
      );
      console.log("Fields by page ID fetch response", response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Fields by page ID fetch failed"
        );
      }
      throw error;
    }
  };


  export const useGetFieldsByPageId = (page: number) => {
    return useQuery({
      queryKey: ['fields', page],
      queryFn: () => getFieldsByPageId(page),
      enabled: !!page,
    });
  };
  