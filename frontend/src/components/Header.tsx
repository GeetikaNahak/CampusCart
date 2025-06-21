// import React from 'react'

import { Link } from "react-router-dom"
import MobileNav from "./MobileNav.tsx"
import MainNav from "./MainNav.tsx"

const Header = () => {
  return (
    <div className='border-b-2  border-b-black-500 py-6'>
      <div className='container mx-auto flex justify-between items-center'>
      <Link to='/' className='text-3xl font-bold tracking-tight text-black-400'>CampusCart</Link>
      <div className="md:hidden">
        <MobileNav/>
      </div>
      <div className="hidden md:block">
        <MainNav/>
      </div>
    </div>
    </div>
  )
}

export default Header
