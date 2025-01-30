// import React from 'react'

import Footer from "@/components/footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
type Props={
  children:React.ReactNode;
}
export default function Layouts({children}:Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Hero/>
      
      <div className="container mx-auto flex-1 py-10" >{children}</div>
      <Footer/>
    </div>
  )
}
