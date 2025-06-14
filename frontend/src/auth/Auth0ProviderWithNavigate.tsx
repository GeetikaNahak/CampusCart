// import { redirect } from "react-router-dom";

import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

// import React from 'react'
type Props={
    children:React.ReactNode;
}


export default function Auth0ProviderWithNavigate({children}:Props) {
    const {createUser}=useCreateMyUser();
    const domain=import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId=import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri=import.meta.env.VITE_AUTH0_CALLBACK_URL;
    if(!domain || !clientId || !redirectUri){
        throw new Error("unable to initialize auth");
    }
    const onRedirectCallback=(appstate?: AppState, user?:User )=>{
        if(user?.sub&&user?.email){
            createUser({authId: user.sub,email: user.email})
        }
    }
  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
        redirect_uri:redirectUri,
    }}
    onRedirectCallback={onRedirectCallback}
    >

        {children}
    </Auth0Provider>
  )
}

