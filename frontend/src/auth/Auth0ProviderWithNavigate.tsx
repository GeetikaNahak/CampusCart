// import { redirect } from "react-router-dom";

// import { useCreateMyUser } from "@/api/MyUserApi";
import {  Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// import React from 'react'
type Props={
    children:React.ReactNode;
}


export default function Auth0ProviderWithNavigate({children}:Props) {
    const navigate=useNavigate();
    const domain=import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId=import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri=import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience=import.meta.env.VITE_AUTH0_AUDIENCE;
    if(!domain || !clientId || !redirectUri || !audience){
        throw new Error("unable to initialize auth");
    }
    const onRedirectCallback=( )=>{
        navigate('/auth-callback')
    }
  return (
    <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
        redirect_uri:redirectUri,
        audience,
    }}
    onRedirectCallback={onRedirectCallback}
    >

        {children}
    </Auth0Provider>
  )
}

