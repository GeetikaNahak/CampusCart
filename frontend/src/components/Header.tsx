// import React from 'react'

import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <div className='border-b-2 border-b-black-500 py-6'>
      <div className='container mx-auto flex justify-between items-center'></div>
      <Link to='/' className='text-3xl font-bold tracking-tight text-black-500'>CampusCart.com</Link>
      <div className="md:hidden">
        <MobileNav/>
      </div>
    </div>
  )
}

export default Header
