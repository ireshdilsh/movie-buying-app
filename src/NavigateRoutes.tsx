import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function NavigateRoutes() {
  return (
    <div>                                           
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/user/dashboard' element={<UserDashboard/>}></Route>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  )
}
