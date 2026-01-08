import React, { useEffect, useState } from 'react'
import AdminNavbar from '../component/AdminNavbar'
import type { Movie } from '../interfaces/movie';
import axios from 'axios';
import { useNavigate, type NavigateFunction } from 'react-router-dom';

export default function ManageMovies() {

  const [movie, setmovie] = useState<Movie[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    getAllMovies()
  }, []);

  const getAllMovies = async () => {
    try {
      const resp = await axios.get('http://localhost:5000/api/movies/get/movies');
      console.log("Movies data:", resp.data.movies);
      setmovie(resp.data.movies);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  }

  const gotoMovie = (id: string) => {
    navigate(`/get/movie/by/${id}`)
  }

  const toggleMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  }

  const handleUpdate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Update movie:', id);
    // Add your update logic here
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const resp = await axios.delete(`http://localhost:5000/api/movies/delete/movie/${id}`)
      console.log('Delete response:', resp.data);
      getAllMovies();
    } catch (error) {
      console.log('Something went wrong while deleting the movie:', error);
    }
  }

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
      <div className='mt-15 flex justify-center items-center'>
        <div className='w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            movie.map((mov, index) => (
              <div key={index} className='border cursor-pointer hover:shadow-xl transition-all mb-5 border-neutral-200 rounded-sm p-3 flex flex-col justify-start items-start relative' onClick={() => gotoMovie(mov._id)}>
                {/* Dots menu */}
                <button
                  onClick={(e) => toggleMenu(mov._id, e)}
                  className='absolute top-3 right-3 p-1 cursor-pointer hover:bg-gray-100 rounded-full'
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 16 16">
                    <circle cx="8" cy="3" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="8" cy="13" r="1.5" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {openMenuId === mov._id && (
                  <div className='absolute top-10 right-3 bg-white border border-neutral-200 rounded-sm shadow-lg z-10 flex flex-col overflow-hidden'>
                    <button
                      onClick={(e) => handleUpdate(mov._id, e)}
                      className='cursor-pointer px-4 py-2 text-sm text-left hover:bg-blue-50 text-blue-600 whitespace-nowrap'
                    >
                      Update
                    </button>
                    <button
                      onClick={(e) => handleDelete(mov._id, e)}
                      className='cursor-pointer px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 whitespace-nowrap'
                    >
                      Delete
                    </button>
                  </div>
                )}

                <img src={mov.bannerURL} className='w-full h-40 object-cover rounded-sm' />
                <h2 className='font-medium text-xl mt-2 mb-3'>{mov.name}</h2>
                <p className='mt-1 mb-2'>Director: {mov.director}</p>
                <p className='text-sm text-gray-600 mt-1 text-justify'>{mov.description.substring(0, 180)}.....</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}


