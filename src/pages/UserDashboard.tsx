import React, { useEffect, useState } from 'react';
import UserNavbar from '../component/UserNavbar';
import type { Movie } from '../interfaces/movie';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import axios from 'axios';

export default function UserDashboard() {

    const [movie, setmovie] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        getAllMovies()
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            getAllMovies()
        }
    }, [searchQuery]);

    const getAllMovies = async () => {
        try {
            const resp = await axios.get('http://localhost:5000/api/movies/get/movies');
            console.log("Movies data:", resp.data.movies);
            setmovie(resp.data.movies);
        } catch (error) {
            console.log("Error fetching movies:", error);
        }
    }

    const handleSearch = async () => {
        try {
            if (!searchQuery.trim()) {
                getAllMovies();
                return;
            }

            const resp = await axios.get(`http://localhost:5000/api/movies/search?name=${searchQuery}`);
            console.log("Search results:", resp.data.movies);
            setmovie(resp.data.movies);
        } catch (error) {
            console.log("Error searching movies:", error);
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const gotoMovieById = (id: string) => {
        navigate(`/user/get/movie/by/${id}`)
    }
    return (
        <div className="flex flex-col px-4 sm:px-6">

            {/* user navbar */}
            <UserNavbar />

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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="px-5 w-full sm:w-[320px] md:w-[420px] pr-18 lg:w-[600px] h-10 sm:h-11 border bg-neutral-100 rounded-3xl border-none text-sm sm:text-base"
                        placeholder="Find Trending Movie..."
                    />
                    <button
                        onClick={handleSearch}
                        className='h-8.5 bg-black rounded-2xl px-3 absolute right-1.5 cursor-pointer hover:opacity-80'>
                        <img src="https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff" className="w-5 h-5 " alt="search icon" />
                    </button>
                </div>
            </div>

            {/* Movie cards */}
            <div className='mt-15 flex justify-center items-center'>
                <div className='w-300 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {
                        movie.map((mov, index) => (
                            <div key={index} className='cursor-pointer hover:shadow-xl transition-all mb-5 rounded-sm p-3 flex flex-col justify-start items-start relative' onClick={() => gotoMovieById(mov._id)}>
                                {/* Dots menu */}
                                <img src={mov.bannerURL} className='w-full h-40 object-cover ' />
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
