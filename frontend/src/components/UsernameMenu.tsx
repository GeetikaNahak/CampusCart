// import React from 'react'

import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu.tsx";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

export default function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2  rounded-md bg-white hover:text-blue-600 max-w-[200px] truncate shadow-lg">
          <CircleUserRound className="text-gray-600" />
          <span className="truncate">{user?.email}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white rounded-md shadow-md mt-2 p-2 w-48 space-y-1">
          <DropdownMenuItem className="hover:bg-blue-100 px-2 py-1 rounded-md cursor-pointer">
            <Link
              to="/user-profile"
              className="text-sm font-medium text-gray-700"
            >
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => logout()}
            className="hover:bg-red-100 px-2 py-1 rounded-md cursor-pointer text-red-600 text-sm font-medium"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
