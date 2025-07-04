import { useCreateMyUser } from "@/api/MyUserApi.tsx";
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate= useNavigate();
    const {user}= useAuth0();
    const {createUser}=useCreateMyUser();
    const hasCreatedUser=useRef(false);
    useEffect(() => {
      createUser
        if(user?.sub&&user?.email&&!hasCreatedUser.current){
            createUser({authId: user.sub,email: user.email});
            hasCreatedUser.current=true;
        }
        navigate("/");
    }, [createUser,navigate,user])
    
  return (
    <div>
      Loading...
    </div>
  )
}

export default AuthCallbackPage
