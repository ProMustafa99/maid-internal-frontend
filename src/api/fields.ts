import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { axiosInstance } from "./axiosInstance";

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

export const getFieldsForEditPage = async (pageId: number, recordId: number, tableName: string): Promise<any> => {
    try {      
      const response = await axiosInstance.get(
        `/fields/page/${pageId}/edit/${recordId}?table=${tableName}`
      );
      console.log("Fields for edit page fetch response", response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Fields for edit page fetch failed"
        );
      }
      throw error;
    }
  };


  