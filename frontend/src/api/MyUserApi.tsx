import { useAuth0 } from "@auth0/auth0-react";
import { error } from "console";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;
type CreateUserRequest={
    authId:string;
    email:string ;

};
export const useCreateMyUser=()=>{
    
    const {getAccessTokenSilently}=useAuth0();
    const createMyUserRequest=async (user:CreateUserRequest)=>{
        const accessToken=await getAccessTokenSilently();
        const response=await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
            
        })
        if(!response.ok){
            throw new Error("Failed to create User");
        }
    };
    const {mutateAsync: createUser,isLoading,isError,isSuccess}=useMutation(createMyUserRequest);
    if(isSuccess){
        toast.success("Account Created Successfully");
    }
    if(isError){
        toast.success("Error Creating Account");
    }
    return {
        createUser,
        isLoading,
    };
};

type UpdateMyUserRequest={
    name:string;
    collegeId:string;
    branch:string ;
}

export const useUpdateMyUser = () => {
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    isError,
    reset,
  } = useMutation(updateMyUserRequest);

  if(isSuccess){
    toast.success("User Profile Updated");
  }
  if(isError){
    toast.error("Error Updating User Profile");
    reset();
  }
  return {
    updateUser,
    isLoading,
    
    
    reset,
  };
};