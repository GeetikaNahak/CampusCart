import { Store } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL=`http://localhost:8000`;

export const useCreateMyStore= ()=>{
    const {getAccessTokenSilently}= useAuth0();
    const createMyStoreRequest=async( storeFormData:FormData):Promise<Store[]>=>{
        const accessToken=await getAccessTokenSilently();
    const response=await fetch(`${API_BASE_URL}/api/my/store`,{
        method:"POST",
        headers:{
            Authorization: `Bearer ${accessToken}`,
        },
        body:storeFormData,
    });
    if (response.ok) {
            toast.success("Store Created");
            const data = await response.json();
            return data;
        } else if (response.status === 409) {
            toast.error("User already exists");
        } else {
            toast.error("Unable to create Store");
        }
    return response.json();
    }

    const {mutate: createStore,isLoading,error}=useMutation(createMyStoreRequest);
    // if(isSuccess){
    //     toast.success("Store Created");
    // }
    if(error){
        
        toast.error("Unable to create Store");
    }
    return {createStore,isLoading}
}

export const useGetMyStore = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyStoreRequest = async (): Promise<Store> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/store`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch store");
    }

    return await response.json(); // Await the parsed JSON
  };

  const { data: store, isLoading } = useQuery<Store>(
    "fetchMyStore",
    getMyStoreRequest
  );

  return { store, isLoading };
};