import React from 'react'
import AdminNavbar from '../component/AdminNavbar'

export default function AddMovies() {
  return (
    <div className='flex flex-col px-4 sm:px-6'>
      {/* admin navbar */}
      <AdminNavbar />
      <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">

        <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
          <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
          Upload & Manage Movie Details
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
          Add New Movies
        </h1>

        <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
          Add new movies to the MAG platform by entering film details, showtimes, and media—making them instantly available to users.
        </p>
      </div>

      {/* add movie form */}
      <div className='w-full flex justify-center items-center flex-col mt-10'>
        
        <div className='flex justify-center items-center gap-5'>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Movie Name</p>
            <input type="text" className='h-11 mt-1 w-100 border px-4 border-neutral-200 rounded-sm' />
          </div>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Director</p>
            <input type="text" className='h-11 mt-1 w-100 border px-4 border-neutral-200 rounded-sm' />
          </div>
        </div>

        <div className='flex flex-col items-start justify-start'>
          <p className='text-gray-800 font-medium text-sm mt-4'>Description</p>
          <textarea name="" id="" className='w-205 h-40 border px-4 py-2 border-neutral-200 rounded-sm mt-1'></textarea>
        </div>

         <div className='flex justify-center items-center gap-5 mt-5'>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Price</p>
            <input type="text" className='h-11 mt-1 w-100 border px-4 border-neutral-200 rounded-sm' />
          </div>
          <div className='flex flex-col justify-start items-start'>
            <p className='text-gray-800 font-medium text-sm'>Genre</p>
            <select name="" id="" className='w-100 h-11 mt-1 border border-neutral-200 rounded-sm px-4'>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="sci-fi">Sci-Fi</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col justify-start items-start mt-5'>
            <p className='text-sm text-gray-800 font-medium'>Movie Banner</p>
            <button className='flex-col w-205 h-50 cursor-pointer bg-neutral-50 rounded-md mt-1 text-gray-400 border border-dashed border-neutral-300 flex justify-center items-center gap-2'>
              <img src="https://img.icons8.com/?size=100&id=1501&format=png&color=999999" className='h-15' alt="add-mark" />
              <p className='text-lg text-neutral-400'>Add Movie Banner</p>
            </button>
        </div>

        <div className='flex justify-end items-end w-205 my-5'>
          <button className='cursor-pointer bg-amber-500 py-2 px-4 rounded-sm font-medium hover:opacity-80'>Published Movie</button>
        </div>
      </div>
    </div>
  )
}
 