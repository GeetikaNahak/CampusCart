import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import UsernameMenu from "./UsernameMenu";
import LoginPopup from "./AuthPopup";
import { useAuth } from "@/context/AppContext"; // Custom Auth Context
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

export default function MobileNav() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const { user } = useAuth(); // Get authenticated user

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-black cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="bg-white p-6 space-y-4">
        <SheetTitle className="text-lg font-bold text-center">
          Welcome to Campus Cart
        </SheetTitle>
        <Separator />
        
        <div className="flex flex-col items-center space-y-4">
          {user ? (
            <>
              <UsernameMenu />
              <Button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => signOut(auth)}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setPopupOpen(true)}
              >
                Login
              </Button>
              <LoginPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
