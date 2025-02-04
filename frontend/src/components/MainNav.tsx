// import React from 'react'

// import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LoginPopup from "./AuthPopup";

export default function MainNav() {
  // const {loginWithRedirect}=useAuth0();
  const [isPopupOpen, setPopupOpen] = useState(false);
  return (
    <div>
      {/* <button className="flex-1 font-bold bg-black-500 hover:text-blue-500 hover:bg-white" onClick={()=>loginWithRedirect()}>Log In</button> */}
      <button 
        onClick={() => setPopupOpen(true)} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
      <LoginPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  )
}

