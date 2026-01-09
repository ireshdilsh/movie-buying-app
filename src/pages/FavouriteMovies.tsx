/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from 'react'
import UserNavbar from '../component/UserNavbar'
import axios from 'axios'
import type { Movie } from '../interfaces/movie'
import { useNavigate, type NavigateFunction } from 'react-router-dom'

export default function FavouriteMovies() {

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  const getFavoriteMovies = async () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        alert('Please login to view favorites');
        navigate('/');
        return;
      }

      const user = JSON.parse(userString);
      let response;
      try {
        response = await axios.get(`http://localhost:5000/api/users/favorites?email=${user.email}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Try alternative endpoint
        response = await axios.get(`http://localhost:5000/api/users/favorites?email=${user.email}`);
      }
      
      if (response.data.success) {
        setFavoriteMovies(response.data.favorites);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setLoading(false);
    }
  };

  const removeFromFavorites = async (movieId: string) => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) return;

      const user = JSON.parse(userString);
      let response;
      try {
        response = await axios.post('http://localhost:5000/api/auth/favorites/remove', {
          email: user.email,
          movieId: movieId
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        // Try alternative endpoint
        response = await axios.post('http://localhost:5000/api/users/remove/favorites', {
          email: user.email,
          movieId: movieId
        });
      }

      if (response.data.success) {
        setFavoriteMovies(favoriteMovies.filter(movie => movie._id !== movieId));
        alert('Removed from favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Failed to remove from favorites');
    }
  };

  const gotoMovieById = (id: string) => {
    navigate(`/user/get/movie/by/${id}`);
  };

  return (
    <div className='flex flex-col px-4 sm:px-6'>
      <UserNavbar />

      <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">
        <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
          <div className='bg-red-500 rounded-full h-2.5 w-2.5'></div>
          Your favorite movies collection
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
          My Favorite Movies
        </h1>

        <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
          Browse and manage your collection of favorite movies all in one place.
        </p>
      </div>

      {/* Movie cards */}
      <div className='mt-15 flex justify-center items-center'>
        {loading ? (
          <p className='text-gray-600'>Loading your favorites...</p>
        ) : favoriteMovies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <img 
              src="https://img.icons8.com/?size=100&id=87&format=png&color=CCCCCC" 
              className='h-20 mb-4 opacity-50' 
              alt="no favorites" 
            />
            <p className='text-gray-600 text-lg'>No favorite movies yet</p>
            <p className='text-gray-500 text-sm mt-2'>Start adding movies to your favorites!</p>
          </div>
        ) : (
          <div className='w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {favoriteMovies.map((movie, index) => (
              <div 
                key={index} 
                className='cursor-pointer hover:shadow-xl transition-all mb-5 rounded-sm p-3 flex flex-col justify-start items-start relative'
              >
                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavorites(movie._id);
                  }}
                  className='absolute top-5 right-5 bg-white rounded-full p-2 shadow-md hover:bg-red-50 z-10'
                >
                  <img 
                    src="https://img.icons8.com/?size=100&id=83149&format=png&color=000000" 
                    className='h-4' 
                    alt="remove" 
                  />
                </button>

                <div onClick={() => gotoMovieById(movie._id)}>
                  <img 
                    src={movie.bannerURL} 
                    className='w-full h-40 object-cover rounded-sm' 
                    alt={movie.name}
                  />
                  <h2 className='font-medium text-xl mt-2 mb-3'>{movie.name}</h2>
                  <p className='mt-1 mb-2'>Director: {movie.director}</p>
                  <p className='text-sm text-gray-600 mt-1 text-justify'>
                    {movie.description.substring(0, 180)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
