
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";



export default function MobileNav() {
  

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
          {(
            <>
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                
              >
                Login
              </Button>
              
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
