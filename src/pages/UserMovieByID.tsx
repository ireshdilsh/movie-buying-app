import React, { useEffect, useState } from 'react'
import UserNavbar from '../component/UserNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import type { Movie } from '../interfaces/movie';
import type { Comment } from '../interfaces/comments';

export default function UserMovieByID() {

    const { id } = useParams<{ id: string }>()
    const [movie, setmovie] = useState<Movie | null>(null);
    const [comments, setcomments] = useState<Comment[]>([]);
    const [commentInput, setCommentInput] = useState('');

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
        // eslint-disable-next-line react-hooks/immutability
        getAllComments();
    }, []);

    const addNewComments = async () => {
        try {
            if (!commentInput.trim()) {
                alert('Please write a comment');
                return;
            }
            await axios.post('http://localhost:5000/api/comments/add/new/comment', {
                content: commentInput,
                name: 'User', // In real application, replace with actual user name
                movieID: id
            });
            setCommentInput('');
            getAllComments();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }

    const getAllComments = async () => {
        try {
            const resp = await axios.get<Comment[]>(`http://localhost:5000/api/comments/all/comments/${id}`)
            setcomments(resp.data)
            console.log('Comments Data', resp.data)
        } catch (error) {
            console.log('Something Went Wrong', error)
        }
    }

    return (
        <div className='flex flex-col px-4 sm:px-6'>
            <UserNavbar />

            <div className='flex justify-center items-center flex-col mt-16 sm:mt-20'>

                {/* Main section */}
                <div className='flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 w-full'>

                    <img
                        src={movie?.bannerURL}
                        className='object-cover h-72 sm:h-80 lg:h-90 rounded-lg w-full lg:w-auto'
                        alt=""
                    />

                    <div className='flex justify-start items-start flex-col'>
                        <p className='border border-neutral-200 px-4 py-1 text-sm text-gray-600 rounded-2xl font-medium'>
                            {movie?.genre}
                        </p>

                        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium mt-2 max-w-full lg:w-74'>
                            {movie?.name}
                        </h1>

                        <div className='flex flex-wrap justify-start items-center gap-3 mt-5'>
                            <p className='px-4 py-1.5 bg-black rounded-sm text-white text-sm'>Trailer</p>
                            <p className='px-4 py-1.5 border rounded-sm text-sm'>WEBDL</p>
                            <p className='px-4 py-1.5 bg-red-500 rounded-sm text-white text-sm'>IMDB 7.3</p>
                        </div>

                        {/* director */}
                        <div className='flex items-center text-neutral-500 gap-2.5 text-sm mt-5'>
                            <span>Director:</span>
                            <span className='font-medium text-black'>{movie?.director}</span>
                        </div>

                        {/* price */}
                        <div className='flex items-center text-neutral-500 gap-2.5 text-sm mt-1'>
                            <span>Price:</span>
                            <span className='font-medium text-black'>Rs.{movie?.price}/=</span>
                        </div>

                        <button className='bg-amber-500 mt-4 px-4 py-1.5 rounded-sm cursor-pointer flex font-medium justify-center items-center gap-2.5 hover:opacity-80'>
                            Buy Now
                            <img
                                src="https://img.icons8.com/?size=100&id=84998&format=png&color=000000"
                                className='h-5'
                                alt=""
                            />
                        </button>
                    </div>
                </div>

                {/* description */}
                <p className='w-full lg:w-245 mt-10 text-justify border-b border-b-neutral-300 pb-7'>
                    {movie?.description}
                </p>

                {/* comments */}
                <div className='w-full lg:w-245 mt-5 flex flex-col mb-8'>
                    <h2 className='text-2xl sm:text-3xl font-medium'>
                        Comments ({comments?.length})
                    </h2>

                    <div className='flex gap-2 mt-5'>
                        <input
                            type="text"
                            className='bg-neutral-100 px-4 h-10 w-full'
                            placeholder='Write your comment'
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button
                            onClick={addNewComments}
                            className='bg-black flex justify-center items-center h-10 rounded-sm cursor-pointer hover:opacity-80'
                        >
                            <img
                                className='h-6 px-4'
                                src="https://img.icons8.com/?size=100&id=bmqaSU1DN4QP&format=png&color=ffffff"
                                alt=""
                            />
                        </button>
                    </div>

                    {/* load all comments */}
                    <div className='flex flex-col mt-7 gap-5'>
                        {comments &&
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className='border-b border-b-neutral-200 px-4 py-3 rounded-md'
                                >
                                    <h2 className='font-medium text-lg'>{comment.name}</h2>
                                    <p className='text-sm text-gray-600 mt-1'>{comment.content}</p>
                                    <p className='text-sm mt-2'>
                                        {comment?.createdAt?.toString().substring(0, 10)}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
