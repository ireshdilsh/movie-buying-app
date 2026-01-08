import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AddMovies from './pages/AddMovies'
import ManageMovies from './pages/ManageMovies'
import GetMovieById from './pages/GetMovieById'

export default function NavigateRoutes() {
  return (
    <div>                                           
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/user/dashboard' element={<UserDashboard/>}></Route>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        <Route path='/add/new/movies' element={<AddMovies/>}></Route>
        <Route path='/manage/movies' element={<ManageMovies/>}></Route>
        <Route path='/get/movie/by/:id' element={<GetMovieById/>}></Route>
      </Routes>
     </BrowserRouter>
    </div>
  )
}
