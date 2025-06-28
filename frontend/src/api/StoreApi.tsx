import { StoreSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchStore = (storeName?: string) => {
  const createSearchRequest = async ():Promise<StoreSearchResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/store/search/${storeName}`
    );
    if (!response.ok) {
      throw new Error("Failed to get store");
    }
    return response.json();
  };
  const {data:results,isLoading}=useQuery(["searcchStores"],createSearchRequest,{enabled:!!storeName});
  return {results,isLoading}
};
