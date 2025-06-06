import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

export default function MobileNav() {
  const { user,isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-black cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="bg-white p-6 space-y-4">
        <SheetTitle className="text-lg font-bold text-center">
          {isAuthenticated ? (
            <span className="flex flex-col font-bold gap-2">
              <div className="flex items-center text-center gap-2"><CircleUserRound className="text-black-500"/>
              {user?.email}</div>
              <Separator className="text-black"/>
              <MobileNavLinks/>
            </span>
          ) : (
            <div>
              <span>Welcome to The CampusCart! Your Favorite in College</span>
              

              <div className="flex flex-col gap-4 space-y-4">
               
                  <Button onClick={()=>{loginWithRedirect()}} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Login
                  </Button>
               
              </div>
            </div>
          )}
        </SheetTitle>
      </SheetContent>
    </Sheet>
  );
}
