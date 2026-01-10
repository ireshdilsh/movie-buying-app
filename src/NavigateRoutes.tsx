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
import MyMovies from './pages/MyMovies'
import BuyingMovies from './pages/BuyingMovies'
import AdminBuyingMovies from './pages/AdminBuyingMovies'
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
          <Route 
            path='/user/my-movies' 
            element={
              <ProtectedRoute requiredRole="user">
                <MyMovies />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/user/buying-movies' 
            element={
              <ProtectedRoute requiredRole="user">
                <BuyingMovies />
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
          <Route 
            path='/admin/buying-movies' 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminBuyingMovies />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
