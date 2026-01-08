import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { Movie } from '../interfaces/movie';
import AdminNavbar from '../component/AdminNavbar';

export default function GetMovieById() {

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
            <AdminNavbar />
            <div className='flex justify-center items-center flex-col mt-5'>
                <div className='flex flex-start items-start flex-col w-200'>
                    <div className='border flex justify-center items-center gap-3 border-neutral-200 px-4 py-0.5 mt-10 rounded-2xl'>
                        <p className='text-sm text-neutral-500'>{movie?.genre}</p>
                        <div className='bg-amber-500 h-2 w-2 rounded-full'></div>
                    </div>
                    <h1 className='text-3xl font-bold mt-1'>{movie?.name}</h1>
                    <img src={movie?.bannerURL} alt="banner" className='my-7' />
                    <p className='text-gray-600 font-medium mt-2 text-justify'>{movie?.description}</p>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}
