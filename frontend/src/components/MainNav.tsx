// import React from 'react'

import { useAuth0 } from "@auth0/auth0-react";

export default function MainNav() {
  const {loginWithRedirect}=useAuth0();
  return (
    <div>
      <button className="flex-1 font-bold bg-black-500 hover:text-blue-500 hover:bg-white" onClick={()=>loginWithRedirect()}>Log In</button>
    </div>
  )
}

