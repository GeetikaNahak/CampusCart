// import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layouts from './layouts/layouts'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Layouts>HOME PAGE</Layouts>}/>
        <Route path='/user-profile' element={<span>USER PROFILE PAGE </span>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default AppRoutes
