import React, { useEffect, useState } from 'react'
import UserNavbar from '../component/UserNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import type { Movie } from '../interfaces/movie';

export default function UserMovieByID() {

    const { id } = useParams<{ id: string }>()
    const [movie, setmovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovieById = async () => {
            try {
                const response = await axios.get<{ movie: Movie }>(`http://localhost:5000/api/movies/get/movie/${id}`);
                setmovie(response.data.movie)
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }
        fetchMovieById();
    }, []);

    return (
        <div className='flex flex-col px-4 sm:px-6'>
            <UserNavbar />
            <div className='flex justify-center items-center flex-col mt-5'>
                <div className='flex flex-start items-start flex-col 
                    w-full max-w-5xl'>

                    <div className='border flex justify-center items-center gap-3 
                      border-neutral-200 px-4 py-0.5 mt-6 sm:mt-10 
                      rounded-2xl self-start'>
                        <h2 className='text-sm text-neutral-500'>{movie?.genre}</h2>
                        <div className='bg-amber-500 h-2 w-2 rounded-full'></div>
                    </div>

                    <h2 className='text-2xl sm:text-3xl font-bold mt-1'>
                        {movie?.name}
                    </h2>

                    {/* Responsive image */}
                    {movie?.bannerURL && (
                        <img
                            src={movie.bannerURL}
                            alt="banner"
                            className='my-5 sm:my-7 w-full max-h-[450px] object-cover'
                        />
                    )}

                    <p className='text-gray-600 font-medium mt-2 text-justify text-sm sm:text-base'>
                        {movie?.description}
                    </p>

                    {/* Responsive bottom section */}
                    <div className='flex flex-col sm:flex-row 
                      justify-between items-start sm:items-center 
                      mt-5 w-full gap-3 my-5'>
                        <h2 className='text-gray-900 font-medium border rounded-sm 
                      border-neutral-200 px-4 py-1.5 text-sm sm:text-base'>
                            Directors is {movie?.director}
                        </h2>

                        <h2 className='text-gray-900 font-medium bg-amber-500 
                      px-4 py-2 rounded-sm text-sm sm:text-base'>
                            Rs.{movie?.price}.00
                        </h2>
                    </div>

                </div>
            </div>
        </div>
    )
}
