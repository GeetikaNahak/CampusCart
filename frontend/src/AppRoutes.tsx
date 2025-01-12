import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<span>Home Page </span>}/>
    </Routes>
  )
}

export default AppRoutes
