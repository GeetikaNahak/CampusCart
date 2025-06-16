// import exp from "constants";

// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;
type CreateUserRequest={
    authId:string;
    email:string |null;

};
export const useCreateMyUser=()=>{
    
    const {getAccessTokenSilently}=useAuth0();
    const createMyUserRequest=async (user:CreateUserRequest)=>{
        // console.log("Creating...");
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
    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    };
};

type updateMyUserRequest={
    name:string | undefined;
    email?:string ;
    collegeId:string | undefined;
    branch:string ;
}

export const useUpdateMyUser=()=>{
    const {getAccessTokenSilently}=useAuth0();
    const accessToken=getAccessTokenSilently();
    const updateMyUserRequest=async(formData:updateMyUserRequest)=>{
        const response =await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"Put",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-type":"application/json",
            },
            body:JSON.stringify(formData),
        });
        if(!response.ok){
            throw new Error("Failed to update User");
        }
    };


    const {mutateAsync:updateUser, isLoading,isSuccess,isError,error,reset}=useMutation(updateMyUserRequest);

    return {
        updateUser,isLoading,
        isSuccess,
        isError,
        error,reset
    }
}