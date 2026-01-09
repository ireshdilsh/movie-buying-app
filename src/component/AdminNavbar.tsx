import React, { useState } from 'react'
import dark_logo from '../assets/dark_logo.png';
import { useNavigate, type NavigateFunction } from 'react-router-dom';

export default function AdminNavbar() {

    const navigate: NavigateFunction = useNavigate()

    const navigateAdminDashboard = () => {
        navigate('/admin/dashboard')
    }

    const navigateAddMoviesPage = () => {
        navigate('/add/new/movies')
    }

    const navigateManageMoviesPage = () => {
        navigate('/manage/movies')
    }

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <nav className="flex justify-between items-center w-full mt-5 px-5 sm:px-8 md:px-12 lg:px-20 border-b border-b-neutral-100 pb-3">

                <img
                    src={dark_logo}
                    className="h-6 sm:h-7 cursor-pointer"
                    onClick={navigateAdminDashboard}
                    alt="Dark-Logo"
                />

                {/* Hamburger (mobile only) */}
                <button
                    className="sm:hidden text-2xl cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {/* Desktop + Mobile Menu */}
                <div
                    className={`
                        ${menuOpen ? "flex" : "hidden"}
                        sm:flex
                        justify-center items-center
                        gap-5 md:gap-6
                        flex-col sm:flex-row
                        absolute sm:static
                        top-16 right-5 sm:top-auto sm:right-auto
                        bg-white sm:bg-transparent
                        border sm:border-0
                        px-6 py-4 sm:p-0
                        rounded-sm sm:rounded-none
                        shadow sm:shadow-none
                    `}
                >
                    <button onClick={navigateAddMoviesPage} className='cursor-pointer text-sm'>
                        Add Movie
                    </button>

                    <button onClick={navigateManageMoviesPage} className='cursor-pointer text-sm'>
                        Manage Movies
                    </button>

                    <button className='cursor-pointer text-sm'>
                        Buying Movies
                    </button>

                    <button className='cursor-pointer text-sm font-medium bg-amber-500 px-4 py-2 rounded-sm hover:opacity-80'>
                        Sign out
                    </button>
                </div>

            </nav>
        </div>
    )
}
