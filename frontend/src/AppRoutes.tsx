// import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import HomePage from './pages/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Layouts><HomePage/></Layouts>}/>
        <Route path='/user-profile' element={<span>USER PROFILE PAGE </span>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
        {/* <Route path='' element /> */}
    </Routes>
  )
}

export default AppRoutes
