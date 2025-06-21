// import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layouts from './layouts/layout.tsx'
import HomePage from './pages/HomePage.tsx'
import UserProfilePage from './pages/UserProfilePage.tsx'
import AuthCallbackPage from './pages/AuthCallbackPage.tsx'
import ProtectedRoute from './auth/ProtectedRoute.tsx'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Layouts showHero={true}><HomePage/></Layouts>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path='/user-profile' element={<Layouts> <UserProfilePage/> </Layouts>}/>
        </Route>
        
        <Route path='*' element={<Navigate to="/"/>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
    </Routes>
  )
}

export default AppRoutes
