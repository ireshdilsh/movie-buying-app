import React from 'react'

export default function AdminDashboard() {
    return (
        <div className='w-full flex justify-center items-center flex-col'>
            <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">

                <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
                    Manage Movies, Bookings & Users in One Place
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
                    MAG Operations Hub
                </h1>

                <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
                    Control and monitor the entire MAG platform with ease. Add and manage movies, oversee bookings, track user activity, and ensure smooth operations—all from a powerful, centralized admin panel.
                </p>

                <div className='flex mt-6 justify-center items-center sm:mt-6 lg:mt-8 relative'>
                    <input
                        type="text"
                        className="px-5 w-full sm:w-[320px] md:w-[420px] pr-18 lg:w-[600px] h-10 sm:h-11 border bg-neutral-100 rounded-3xl border-none text-sm sm:text-base"
                        placeholder="Find Trending Movie..."
                    />
                    <button className='h-8.5 bg-black rounded-2xl px-3 absolute right-1.5 cursor-pointer'>
                        <img src="https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff" className="w-5 h-5 " alt="search icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}
