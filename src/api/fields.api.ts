import axios from "axios";
import { axiosInstance } from "./axiosInstance";
class Fields {

  public getFieldsByPageId = async (pageId: number, useg_slug: string = 'create'): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/fields/page/${pageId}?useg_slug=${useg_slug}`);
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

  public getFieldsForEditPage = async (
    pageId: number,
    recordId: number,
    tableName: string
  ): Promise<any> => {
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
}

export const fieldsAPI = new Fields();

// Export individual functions for backward compatibility
export const getFieldsByPageId = (pageId: number, useg_slug: string = 'create') => fieldsAPI.getFieldsByPageId(pageId, useg_slug);
export const getFieldsForEditPage = (pageId: number, recordId: number, tableName: string) => 
  fieldsAPI.getFieldsForEditPage(pageId, recordId, tableName);
