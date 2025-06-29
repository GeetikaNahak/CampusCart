import { SearchState } from "@/pages/SearchPage";
import { StoreSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchStore = (searchState:SearchState,storeName?: string) => {
  const createSearchRequest = async ():Promise<StoreSearchResponse> => {
    const params=new URLSearchParams();
    params.set("searchQuery",searchState.searchQuery);
    const response = await fetch(
      `${API_BASE_URL}/api/store/search/${storeName}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to get store");
    }
    return response.json();
  };
  const {data:results,isLoading}=useQuery(["searchStores",searchState],createSearchRequest,{enabled:!!storeName});
  return {results,isLoading}
};
