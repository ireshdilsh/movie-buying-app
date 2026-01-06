import React from 'react'
import AdminNavbar from '../component/AdminNavbar'

export default function ManageMovies() {
  return (
    <div className='flex flex-col px-4 sm:px-6'>
        {/* admin navbar */}
        <AdminNavbar/>

         <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">

                <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
                    View, Update & Remove Films
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
                    Manage Movies
                </h1>

                <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
                    Browse all movies available on the MAG platform. Update film details, manage availability, or remove outdated content to keep your catalog accurate and up to date.
                </p>
            </div>
    </div>
  )
}
