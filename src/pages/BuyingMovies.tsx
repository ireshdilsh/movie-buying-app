/* eslint-disable react-hooks/immutability */
import React, { useEffect, useState } from 'react';
import UserNavbar from '../component/UserNavbar';
import type { Movie } from '../interfaces/movie';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import axios from 'axios';

export default function BuyingMovies() {
    const [movie, setmovie] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        getAllMovies();
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            getAllMovies();
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
    };

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
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const gotoMovieById = (id: string) => {
        navigate(`/user/get/movie/by/${id}`);
    };

    const filterMoviesByGenre = () => {
        if (selectedGenre === 'all') {
            return movie;
        }
        return movie.filter(mov => mov.genre?.toLowerCase().includes(selectedGenre.toLowerCase()));
    };

    const filteredMovies = filterMoviesByGenre();

    return (
        <div className="flex flex-col px-4 sm:px-6 min-h-screen bg-white">
            {/* User Navbar */}
            <UserNavbar />

            {/* Hero Section */}
            <div className="flex justify-center items-center flex-col mt-20 sm:mt-32 lg:mt-40">
                <p className="flex justify-center items-center gap-2 text-sm sm:text-sm text-gray-600 font-medium border border-neutral-200 px-3 py-1 rounded-3xl text-center">
                    <div className='bg-amber-500 rounded-full h-2.5 w-2.5'></div>
                    Browse, select, and buy your tickets
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2 font-medium text-center tracking-tight">
                    Buy Movie Tickets
                </h1>

                <p className="text-gray-600 text-center w-full sm:w-[420px] md:w-[560px] lg:w-[560px] text-sm sm:text-base">
                    Choose from the latest releases and upcoming movies. Book your seats and enjoy an unforgettable cinema experience.
                </p>

                {/* Search Bar */}
                <div className='flex mt-6 justify-center items-center sm:mt-6 lg:mt-8 relative'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="px-5 w-full sm:w-[320px] md:w-[420px] pr-18 lg:w-[600px] h-10 sm:h-11 border bg-neutral-100 rounded-3xl border-none text-sm sm:text-base"
                        placeholder="Search for movies..."
                    />
                    <button
                        onClick={handleSearch}
                        className='h-8.5 bg-black rounded-2xl px-3 absolute right-1.5 cursor-pointer hover:opacity-80'>
                        <img src="https://img.icons8.com/?size=100&id=59878&format=png&color=ffffff" className="w-5 h-5" alt="search icon" />
                    </button>
                </div>

                {/* Genre Filter */}
                <div className='flex gap-3 mt-6 flex-wrap justify-center items-center'>
                    <button
                        onClick={() => setSelectedGenre('all')}
                        className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all cursor-pointer ${selectedGenre === 'all'
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                            }`}
                    >
                        All Movies
                    </button>
                    <button
                        onClick={() => setSelectedGenre('action')}
                        className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all cursor-pointer ${selectedGenre === 'action'
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                            }`}
                    >
                        Action
                    </button>
                    <button
                        onClick={() => setSelectedGenre('drama')}
                        className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all cursor-pointer ${selectedGenre === 'drama'
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                            }`}
                    >
                        Drama
                    </button>
                    <button
                        onClick={() => setSelectedGenre('comedy')}
                        className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all cursor-pointer ${selectedGenre === 'comedy'
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                            }`}
                    >
                        Comedy
                    </button>
                    <button
                        onClick={() => setSelectedGenre('thriller')}
                        className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all cursor-pointer ${selectedGenre === 'thriller'
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                            }`}
                    >
                        Thriller
                    </button>
                    <button
                        onClick={() => setSelectedGenre('sci-fi')}
                        className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all cursor-pointer ${selectedGenre === 'sci-fi'
                                ? 'bg-amber-500 text-white'
                                : 'bg-neutral-100 text-gray-700 hover:bg-neutral-200'
                            }`}
                    >
                        Sci-Fi
                    </button>
                </div>
            </div>

            {/* Movies Count */}
            <div className='flex justify-center mt-12'>
                <p className='text-gray-600 text-sm'>
                    Showing <span className='font-semibold'>{filteredMovies.length}</span> movies
                </p>
            </div>

            {/* Movie Cards Grid */}
            <div className='mt-8 flex justify-center items-center pb-12'>
                <div className='w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((mov, index) => (
                            <div
                                key={index}
                                className='cursor-pointer hover:shadow-xl transition-all rounded-lg border border-neutral-200 overflow-hidden bg-white flex flex-col'
                                onClick={() => gotoMovieById(mov._id)}
                            >
                                {/* Movie Banner */}
                                <div className='relative w-full h-56 bg-neutral-200'>
                                    <img
                                        src={mov.bannerURL}
                                        alt={mov.name}
                                        className='w-full h-full object-cover'
                                    />
                                    {/* Genre Badge */}
                                    {mov.genre && (
                                        <div className='absolute top-3 right-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full'>
                                            {mov.genre}
                                        </div>
                                    )}
                                </div>

                                {/* Movie Details */}
                                <div className='p-4 flex flex-col flex-grow'>
                                    <h2 className='font-semibold text-lg mb-2 line-clamp-1'>{mov.name}</h2>
                                    <p className='text-sm text-gray-600 mb-2'>
                                        <span className='font-medium'>Director:</span> {mov.director}
                                    </p>
                                    <p className='text-sm text-gray-600 text-justify line-clamp-3 mb-4 flex-grow'>
                                        {mov.description}
                                    </p>

                                    {/* Buy Button */}
                                    <button className='w-full bg-amber-500 hover:opacity-85 text-white font-medium py-2 rounded-lg text-sm transition-all cursor-pointer'>
                                        Buy Tickets
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full text-center py-12'>
                            <p className='text-gray-600 text-lg'>No movies found</p>
                            <p className='text-gray-500 text-sm mt-2'>Try adjusting your search or filter</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
