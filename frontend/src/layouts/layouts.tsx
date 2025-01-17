// import React from 'react'

import Header from "@/components/ui/Header";
import from "../components/ui/Header";
type Props={
  children:React.ReactNode;
}
export default function layouts({children}:Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="container mx-auto flex-1 py-10" >{children}</div>
    </div>
  )
}
