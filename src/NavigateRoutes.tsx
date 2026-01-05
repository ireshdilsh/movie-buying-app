import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'

export default function NavigateRoutes() {
  return (
    <div>                                           
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/user/dashbord' element={<UserDashboard/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  )
}
