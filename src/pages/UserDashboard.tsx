import React from 'react'

export default function UserDashboard() {
    return (
        <div className="flex justify-center items-center px-4 sm:px-6">
            <div className="flex justify-center items-center flex-col mt-24 sm:mt-32 lg:mt-50">

                <p className="text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    Explore, search, buying, and book instantly
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
                    Movie Nights Made Simple
                </h1>

                <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
                    Discover new releases, browse showtimes, and reserve seats—all from your personalized dashboard.
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
