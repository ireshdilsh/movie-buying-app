/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from 'react'
import UserNavbar from '../component/UserNavbar'
import axios from 'axios'
import type { Movie } from '../interfaces/movie'
import { useNavigate, type NavigateFunction } from 'react-router-dom'

interface Purchase {
  _id: string;
  email: string;
  movieId: string;
  price: number;
  purchaseDate: Date;
  movie?: Movie;
}

export default function MyMovies() {

  const [purchasedMovies, setPurchasedMovies] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    getPurchasedMovies();
  }, []);

  const getPurchasedMovies = async () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        alert('Please login to view your movies');
        navigate('/');
        return;
      }

      const user = JSON.parse(userString);
      const response = await axios.get(`http://localhost:5000/api/users/purchases?email=${user.email}`);
      
      if (response.data.success) {
        setPurchasedMovies(response.data.purchases);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching purchased movies:', error);
      setLoading(false);
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
          <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
          Your purchased movies collection
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
          My Movies
        </h1>

        <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
          Access all your purchased movies anytime, anywhere. Enjoy unlimited streaming!
        </p>
      </div>

      {/* Movie cards */}
      <div className='mt-15 flex justify-center items-center'>
        {loading ? (
          <p className='text-gray-600'>Loading your movies...</p>
        ) : purchasedMovies.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <img 
              src="https://img.icons8.com/?size=100&id=59842&format=png&color=CCCCCC" 
              className='h-20 mb-4 opacity-50' 
              alt="no purchases" 
            />
            <p className='text-gray-600 text-lg'>No purchased movies yet</p>
            <p className='text-gray-500 text-sm mt-2'>Browse and buy movies to build your collection!</p>
            <button 
              onClick={() => navigate('/user/dashboard')}
              className='mt-6 bg-amber-500 px-6 py-2.5 rounded-lg font-medium hover:opacity-80'>
              Browse Movies
            </button>
          </div>
        ) : (
          <div className='w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {purchasedMovies.map((purchase, index) => (
              <div 
                key={index} 
                className='cursor-pointer hover:shadow-xl transition-all mb-5 rounded-sm p-3 flex flex-col justify-start items-start relative'
                onClick={() => gotoMovieById(purchase.movieId)}
              >
                {/* Purchased Badge */}
                <div className='absolute top-5 left-5 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold z-10'>
                  Purchased
                </div>

                <img 
                  src={purchase.movie?.bannerURL} 
                  className='w-full h-40 object-cover rounded-sm' 
                  alt={purchase.movie?.name}
                />
                <h2 className='font-medium text-xl mt-2 mb-3'>{purchase.movie?.name}</h2>
                <p className='mt-1 mb-2'>Director: {purchase.movie?.director}</p>
                <p className='text-sm text-gray-600 mt-1 text-justify'>
                  {purchase.movie?.description.substring(0, 180)}...
                </p>
                
                {/* Purchase Info */}
                <div className='flex justify-between items-center w-full mt-3 pt-3 border-t border-neutral-200'>
                  <p className='text-xs text-gray-500'>
                    Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </p>
                  <p className='text-sm font-semibold text-amber-600'>
                    Rs.{purchase.price}
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
