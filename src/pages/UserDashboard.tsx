import { useState } from 'react';
import dark_logo from '../assets/dark_logo.png'

export default function UserDashboard() {

    const [profile, setprofile] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center px-4 sm:px-6">

            {/* user navbar */}
            <nav className="flex justify-between items-center w-full mt-5 px-5 sm:px-8 md:px-12 lg:px-20 border-b border-b-neutral-100 pb-3">
                <img src={dark_logo} className="h-6 sm:h-7" alt="Dark-Logo" />

                {/* Desktop Menu */}
                <div className=" sm:flex justify-center items-center gap-4 md:gap-6">
                    <div onClick={() => { setprofile(true) }} className='cursor-pointer flex justify-center items-center rounded-4xl bg-amber-600 px-3 py-2'>
                        <p className="text-white font-semibold text-sm">ID</p>
                    </div>
                </div>
            </nav>

            <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">

                <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
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

            {/* profile */}
            {profile && (
                <div className="
                    absolute
                    top-14 sm:top-15
                    right-3 sm:right-10 lg:right-25
                    w-72 sm:w-80
                    flex flex-col
                    px-4 sm:px-5 py-3
                    bg-white
                    border border-neutral-100
                    rounded-md
                    shadow-md
                    z-50
                ">
                    {/* Close button */}
                    <button
                        className="w-full flex justify-end items-end mb-2 cursor-pointer"
                        onClick={() => setprofile(false)}
                    >
                        <img
                            src="https://img.icons8.com/?size=100&id=82771&format=png&color=000000"
                            className="h-4"
                            alt="close-icon"
                        />
                    </button>

                    {/* User Info */}
                    <div className="flex items-center gap-4 w-full border-b border-neutral-200 pb-4">
                        <div className="flex justify-center items-center rounded-full bg-amber-600 px-3 py-2">
                            <p className="text-white font-semibold text-sm">ID</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold text-sm sm:text-base">
                                Iresh Dilshan
                            </p>
                            <p className="text-xs sm:text-sm text-gray-900">
                                ireshsilva1234@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <div className="flex flex-col gap-3 mt-4 text-sm sm:text-base">

                        <button className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=87&format=png&color=000000" className="h-4" />
                            Favourites
                        </button>

                        {/* NEW: Bookings */}
                        <button className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img
                                src="https://img.icons8.com/?size=100&id=114034&format=png&color=000000"
                                className="h-4"
                                alt="bookings-icon"
                            />
                            Bookings
                        </button>

                        <button className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=59842&format=png&color=000000" className="h-4" />
                            My Films
                        </button>

                        <button className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=59996&format=png&color=000000" className="h-4" />
                            Settings
                        </button>

                        <button className="flex items-center gap-3 hover:bg-red-50 text-red-600 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=24337&format=png&color=000000" className="h-4" />
                            Logout
                        </button>

                    </div>
                </div>
            )}


        </div>

    )
}
