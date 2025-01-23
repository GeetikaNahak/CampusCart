// import React from 'react'

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";

export default function MobileNav() {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-black-500"/>
        </SheetTrigger>
        <SheetContent>
            <SheetTitle>
                <span>Welcome to Campus Cart</span>
            </SheetTitle>
            <Separator/>
            <SheetDescription className="flex">
                Button
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
