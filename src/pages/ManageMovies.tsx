import React, { useEffect, useState } from 'react'
import AdminNavbar from '../component/AdminNavbar'
import type { Movie } from '../interfaces/movie';
import axios from 'axios';

export default function ManageMovies() {

  const [movie, setmovie] = useState<Movie[]>([]);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/api/movies/get/movies');
        console.log("Movies data:", resp.data.movies);
        setmovie(resp.data.movies);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    }

    getAllMovies()
  }, []);

  return (
    <div className='flex flex-col px-4 sm:px-6'>
      {/* admin navbar */}
      <AdminNavbar />

      <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">

        <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
          <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
          View, Update & Remove Movies
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
          Manage Movies
        </h1>

        <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
          Browse all movies available on the MAG platform. Update film details, manage availability, or remove outdated content to keep your catalog accurate and up to date.
        </p>
      </div>

      {/* loading all movies cards */}
      <div className='mt-10 flex justify-center items-center'>
        <div className='w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            movie.map((mov, index) => (
              <div key={index} className='border border-neutral-200 rounded-sm p-3 flex flex-col justify-start items-start'>
                <img src={mov.bannerURL} className='w-full h-40 object-cover rounded-sm' />
                <h2 className='text-lg font-medium mt-2'>{mov.name}</h2>
                <p className='text-sm text-gray-600 mt-1'>Director: {mov.director}</p>
                <p className='text-sm text-gray-600 mt-1'>Genre: {mov.genre}</p>
                <p className='text-sm text-gray-600 mt-1'>Price: ${mov.price}</p>
                <div className='mt-3 flex justify-start items-center gap-3'>
                  <button className='cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-sm text-sm hover:opacity-80'>Update</button>
                  <button className='cursor-pointer bg-red-500 text-white px-3 py-1 rounded-sm text-sm hover:opacity-80'>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
