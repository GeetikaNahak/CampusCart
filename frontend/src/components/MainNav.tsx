// import React from 'react'

// import { useEffect, useState } from "react";
// import LoginPopup from "./AuthPopup";
// import { useAuth } from "@/context/AppContext";
// import {  signOut } from "firebase/auth";
// import { auth } from "@/firebase";
// import UsernameMenu from "./UsernameMenu";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
// import { useCreateMyUser } from "@/api/MyUserApi"

export default function MainNav() {
  // const [isPopupOpen, setPopupOpen] = useState(false);
  // const { user } = useAuth(); // Get user authentication status
  // const {createUser}=useCreateMyUser();
  // useEffect(() => {
  //   if(user){
  //     createUser({authId:user?.uid, email:user?.email});
  //   }
  // }, [user])
  const {loginWithRedirect}=useAuth0();

  return (
    <Button
      variant="ghost"
      className="font-bold hover:text-blue-600 hover:bg-white"
      onClick={async()=>await loginWithRedirect()}
    >Log In

    </Button>
  );
}

