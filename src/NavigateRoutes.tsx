import React from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AddMovies from './pages/AddMovies'
import ManageMovies from './pages/ManageMovies'
import GetMovieById from './pages/GetMovieById'
import UserMovieByID from './pages/UserMovieByID'
import FavouriteMovies from './pages/FavouriteMovies'
import ProtectedRoute from './component/ProtectedRoute'

export default function NavigateRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          
          {/* User Routes - Protected */}
          <Route 
            path='/user/dashboard' 
            element={
              <ProtectedRoute requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/user/get/movie/by/:id' 
            element={
              <ProtectedRoute requiredRole="user">
                <UserMovieByID />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/user/favourites' 
            element={
              <ProtectedRoute requiredRole="user">
                <FavouriteMovies />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes - Protected */}
          <Route 
            path='/admin/dashboard' 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/add/new/movies' 
            element={
              <ProtectedRoute requiredRole="admin">
                <AddMovies />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/manage/movies' 
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageMovies />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/get/movie/by/:id' 
            element={
              <ProtectedRoute requiredRole="admin">
                <GetMovieById />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
