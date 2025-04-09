// import exp from "constants";

import { useMutation } from "react-query";

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;
type CreateUserRequest={
    authId:string;
    email:string |null;

};
export const useCreateMyUser=()=>{
    const createMyUserRequest=async (user:CreateUserRequest)=>{
        // console.log("Creating...");
        const response=await fetch(`${API_BASE_URL}/api/my/user`,{
            method:"POST",
            headers:{
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