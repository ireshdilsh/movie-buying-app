/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react'
import dark_logo from '../assets/dark_logo.png'
import { useNavigate, type NavigateFunction } from 'react-router-dom';

export default function UserNavbar() {

    const [profile, setprofile] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '' });
    const navigate : NavigateFunction = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserData({ name: parsedUser.name, email: parsedUser.email });
        }
    }, []);

    const gotoUserDashboard = () => {
        navigate('/user/dashboard')
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    const gotoFavourites = () => {
        navigate('/user/favourites');
        setprofile(false);
    }

    const gotoMyMovies = () => {
        navigate('/user/my-movies');
        setprofile(false);
    }

    return (
        <div>
            <nav className="flex justify-between items-center w-full mt-5 px-5 sm:px-8 md:px-12 lg:px-20 border-b border-b-neutral-100 pb-3">
                <img onClick={gotoUserDashboard} src={dark_logo} className="h-6 cursor-pointer sm:h-7" alt="Dark-Logo" />

                {/* Desktop Menu */}
                <div className=" sm:flex justify-center items-center gap-4 md:gap-6">
                    <div onClick={() => { setprofile(true) }} className='cursor-pointer flex justify-center items-center rounded-4xl bg-amber-600 px-3 py-1.5'>
                        <p className="text-white font-semibold text-sm">{userData.name.substring(0,2)}</p>
                    </div>
                </div>
            </nav>
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
                        <div className="flex justify-center items-center rounded-full bg-amber-600 px-3 py-1.5">
                            <p className="text-white font-semibold text-sm">{userData.name.substring(0,2)}</p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold text-sm sm:text-base">
                                {userData.name || 'User'}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-900">
                                {userData.email || 'user@example.com'}
                            </p>
                        </div>
                    </div>

                    {/* Menu Links */}
                    <div className="flex flex-col gap-3 mt-4 text-sm sm:text-base">

                        <button onClick={gotoUserDashboard} className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=yBugi9w42EET&format=png&color=000000" className="h-4" />
                            Dashboard
                        </button>

                        <button onClick={gotoFavourites} className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=87&format=png&color=000000" className="h-4" />
                            Favourites
                        </button>

                        <button onClick={gotoMyMovies} className="flex items-center gap-3 hover:bg-neutral-100 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=59842&format=png&color=000000" className="h-4" />
                            My Films
                        </button>

                        <button onClick={handleLogout} className="flex items-center gap-3 hover:bg-red-50 text-red-600 px-2 py-2 rounded cursor-pointer">
                            <img src="https://img.icons8.com/?size=100&id=24337&format=png&color=000000" className="h-4" />
                            Logout
                        </button>

                    </div>
                </div>
            )}

        </div>
    )
}
