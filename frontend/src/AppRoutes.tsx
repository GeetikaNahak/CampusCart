// import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Layouts showHero={true}><HomePage/></Layouts>}/>
        <Route path='/user-profile' element={<Layouts> <UserProfilePage/> </Layouts>}/>
        <Route path='*' element={<Navigate to="/"/>}/>
        {/* <Route path='' element /> */}
    </Routes>
  )
}

export default AppRoutes
