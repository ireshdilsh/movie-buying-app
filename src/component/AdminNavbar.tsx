import React from 'react'
import dark_logo from '../assets/dark_logo.png';

export default function AdminNavbar() {
    return (
        <div>
            <nav className="flex justify-between items-center w-full mt-5 px-5 sm:px-8 md:px-12 lg:px-20 border-b border-b-neutral-100 pb-3">
                <img src={dark_logo} className="h-6 sm:h-7" alt="Dark-Logo" />

                {/* Desktop Menu */}
                <div className=" sm:flex justify-center items-center gap-5 md:gap-6">
                    <a href="http://">Add Movie</a>
                    <a href="http://">Manage Users</a>
                    <a href="http://">Manage Movies</a>
                    <a href=""></a>
                    <div className='cursor-pointer flex justify-center items-center rounded-4xl bg-amber-600 px-3 py-2'>
                        <p className="text-white font-semibold text-sm">ID</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}
