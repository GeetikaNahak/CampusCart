// import React from 'react'

import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";
import Hero from "@/components/Hero.tsx";
type Props={
  children:React.ReactNode;
  showHero?:boolean;
}
export default function Layouts({children, showHero=false}:Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      {showHero  && <Hero/>}
      
      
      <div className="container mx-auto flex-1 py-10" >{children}</div>
      <Footer/>
    </div>
  )
}
