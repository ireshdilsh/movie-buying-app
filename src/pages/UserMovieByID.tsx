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
            <div className='flex justify-center items-center flex-col mt-20'>
                <div className='flex justify-center gap-10'>
                    <img src={movie?.bannerURL} className='object-cover h-90 rounded-lg' alt="" />
                    <div className='flex justify-start items-start flex-col'>
                        <p className='border border-neutral-200 px-4 py-1 text-sm text-gray-600 rounded-2xl font-medium'>{movie?.genre}</p>
                        <h1 className='text-4xl font-medium w-74'>{movie?.name}</h1>
                        <div className='flex justify-center items-center gap-3 mt-5'>
                            <p className='px-4 py-1.5 bg-black rounded-sm text-white text-sm'>Trailer</p>
                            <p className='px-4 py-1.5 border rounded-sm text-sm'>WEBDL</p>
                            <p className='px-4 py-1.5 bg-red-500 rounded-sm text-white text-sm'>IMDB 7.3</p>
                        </div>
                        <p className='flex justify-center items-center text-neutral-500 gap-2.5 text-sm mt-5'>
                            Director:<p className='font-medium text-black'>{movie?.director}</p>
                        </p>
                        <p className='flex justify-center items-center text-neutral-500 gap-2.5 text-sm mt-1'>
                            Price:<p className='font-medium text-black'>Rs.{movie?.price}/=</p>
                        </p>
                        <button className='bg-amber-500 mt-3 px-4 py-1.5 rounded-sm cursor-pointer flex font-medium justify-center items-center gap-2.5 hover:opacity-80'>Buy Now
                            <img src="https://img.icons8.com/?size=100&id=84998&format=png&color=000000" className='h-5' alt="" />
                        </button>
                    </div>
                </div>
                <p className='w-245 mt-10 text-justify border-b border-b-neutral-300 pb-7'>{movie?.description}</p>
                <div className='w-245 mt-5 flex flex-col mb-8'>
                    <h2 className='text-3xl font-medium'>Comments</h2>
                    <div className='flex justify-center items-center gap-2 mt-5'>
                        <input type="text" className='bg-neutral-100 px-4 h-10 w-full' placeholder='Write your comment' />
                        <button className='bg-black flex justify-center items-center h-10 rounded-sm cursor-pointer hover:opacity-80'><img className='h-6 px-4' src="https://img.icons8.com/?size=100&id=bmqaSU1DN4QP&format=png&color=ffffff" alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
