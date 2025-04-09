// import React from 'react'

// import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LoginPopup from "./AuthPopup";
import { useAuth } from "@/context/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import UsernameMenu from "./UsernameMenu";
import { useCreateMyUser } from "@/api/MyUserApi";

export default function MainNav() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { user } = useAuth(); // Get user authentication status
  const {createUser}=useCreateMyUser();
  useEffect(() => {
    if(user){
      createUser({authId:user?.uid, email:user?.email});
    }
  }, [user])
  

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          {/* <span className="text-lg font-semibold">Welcome, {user.email}</span> */}
          <UsernameMenu/>
          <button 
            onClick={() => signOut(auth)} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button 
            onClick={() => setPopupOpen(true)} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <LoginPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
        </>
      )}
    </div>
  );
}

