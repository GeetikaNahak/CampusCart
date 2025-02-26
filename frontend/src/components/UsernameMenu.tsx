// import React from 'react'

import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
// import { useContext } from "react";
import { useAuth } from "../context/AppContext";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useContext } from "react";

export default function UsernameMenu() {
  const { user } = useAuth();
  return (
    <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-black-500 gap-2">
            <CircleUserRound className="text-black-500"/>
              {user?.email}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
            <Link to="/user-profile" className="font-bold hover:text-blue-500">User Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
