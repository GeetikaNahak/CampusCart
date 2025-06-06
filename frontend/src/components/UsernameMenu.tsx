// import React from 'react'

import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { useAuth } from "../context/AppContext";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
// import { useContext } from "react";

export default function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center bg-white px-3 font-bold hover:text-blue-500 gap-2">
            <CircleUserRound className="text-black-500"/>
              {user?.email}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-blue">
            <DropdownMenuItem>
            <Link to="/user-profile" className="font-bold hover:text-blue-500">User Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
              onClick={()=>logout()}
              className="flex flex-1 bg-blue-600 text-white  rounded hover:bg-blue-700">Log Out</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
