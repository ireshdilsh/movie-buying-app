import React from 'react'

export default function UserDashboard() {
    return (
        <div className="flex justify-center items-center px-4 sm:px-6">
            <div className="flex justify-center items-center flex-col mt-24 sm:mt-32 lg:mt-40">

                <p className="text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    Explore, search, buying, and book instantly
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
                    Movie Nights Made Simple
                </h1>

                <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
                    Discover new releases, browse showtimes, and reserve seats—all from your personalized dashboard.
                </p>

                <input
                    type="text"
                    className="px-5 mt-6 sm:mt-8 lg:mt-10 w-full sm:w-[320px] md:w-[420px] lg:w-[600px] h-10 sm:h-11 border bg-neutral-100 rounded-3xl border-none text-sm sm:text-base"
                    placeholder="Find Trending Movie..."
                />

            </div>
        </div>

    )
}
