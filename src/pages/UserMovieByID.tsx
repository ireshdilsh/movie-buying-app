/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [isFavorite, setIsFavorite] = useState(false);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [isPurchased, setIsPurchased] = useState(false);

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
            const userString = localStorage.getItem('user');
            const user = userString ? JSON.parse(userString) : null;
            await axios.post('http://localhost:5000/api/comments/add/new/comment', {
                content: commentInput,
                name: user?.name || 'Anonymous',
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

    const addToFavorites = async () => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) {
                alert('Please login to add favorites');
                return;
            }

            const user = JSON.parse(userString);
            // Try multiple possible endpoints
            let response;
            try {
                response = await axios.post('http://localhost:5000/api/users/favorites/add', {
                    email: user.email,
                    movieId: id
                });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                // If first endpoint fails, try alternative
                response = await axios.post('http://localhost:5000/api/users/favorites/add', {
                    email: user.email,
                    movieId: id
                });
            }

            if (response.data.success) {
                setIsFavorite(true);
                alert('Movie added to favorites!');
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Failed to add to favorites');
            }
            console.error("Error adding to favorites:", error);
        }
    }

    const handleBuyMovie = async () => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) {
                alert('Please login to purchase movies');
                return;
            }

            const user = JSON.parse(userString);
            const response = await axios.post('http://localhost:5000/api/users/purchase', {
                email: user.email,
                movieId: id
            });

            if (response.data.success) {
                setIsPurchased(true);
                setShowBuyModal(false);
                alert('Movie purchased successfully!');
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Failed to purchase movie');
            }
            console.error("Error purchasing movie:", error);
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

                        <button 
                            onClick={addToFavorites}
                            disabled={isFavorite}
                            className={`border border-neutral-400 mt-4 px-4 py-1.5 rounded-sm cursor-pointer flex font-medium justify-center items-center gap-2.5 hover:opacity-80 ${isFavorite ? 'bg-gray-200 cursor-not-allowed' : ''}`}>
                            {isFavorite ? 'Added to Favorites' : 'Add to favourite'}
                            <img
                                src={isFavorite ? "https://img.icons8.com/?size=100&id=87&format=png&color=000000" : "https://img.icons8.com/?size=100&id=99981&format=png&color=000000"}
                                className='h-5'
                                alt=""
                            />
                        </button>

                        <button 
                            onClick={() => setShowBuyModal(true)}
                            disabled={isPurchased}
                            className={`bg-amber-500 mt-4 px-4 py-1.5 rounded-sm cursor-pointer flex font-medium justify-center items-center gap-2.5 hover:opacity-80 ${isPurchased ? 'bg-gray-400 cursor-not-allowed' : ''}`}>
                            {isPurchased ? 'Already Purchased' : 'Buy Now'}
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
                            comments.map((comment, index) => (
                                <div
                                    key={comment.id || index}
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

            {/* Buy Movie Modal */}
            {showBuyModal && (
                <div className="flex justify-center items-center fixed inset-0 bg-black/50 z-50 px-4 sm:px-6">
                    <div className="bg-white rounded-lg py-8 sm:py-10 px-6 sm:px-10 flex flex-col w-full max-w-md sm:max-w-lg">
                        
                        {/* Close Button */}
                        <div className="w-full flex justify-end cursor-pointer" onClick={() => setShowBuyModal(false)}>
                            <img
                                src="https://img.icons8.com/?size=100&id=83149&format=png&color=000000"
                                alt="close-icon"
                                className="h-5 sm:h-6"
                            />
                        </div>

                        {/* Modal Header */}
                        <div className="flex justify-center items-center mb-4">
                            <img 
                                src="https://img.icons8.com/?size=100&id=84998&format=png&color=F59E0B" 
                                className="h-16 sm:h-20"
                                alt="purchase-icon"
                            />
                        </div>

                        <h1 className="text-xl sm:text-2xl font-semibold text-center">Purchase Movie</h1>
                        
                        <p className="text-sm sm:text-base text-gray-600 text-center mt-2">
                            You're about to purchase this movie
                        </p>

                        {/* Movie Details */}
                        <div className="mt-6 border border-neutral-200 rounded-lg p-4">
                            <div className="flex gap-4">
                                <img 
                                    src={movie?.bannerURL} 
                                    className="w-24 h-32 object-cover rounded-md"
                                    alt={movie?.name}
                                />
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{movie?.name}</h2>
                                    <p className="text-sm text-gray-600 mt-1">Director: {movie?.director}</p>
                                    <p className="text-sm text-gray-600">Genre: {movie?.genre}</p>
                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Price:</span>
                                        <span className="text-xl font-bold text-amber-500">Rs.{movie?.price}/=</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Info */}
                        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-sm text-amber-800">
                                <strong>Note:</strong> Once purchased, you'll have lifetime access to this movie.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={() => setShowBuyModal(false)}
                                className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button 
                                onClick={handleBuyMovie}
                                className="flex-1 px-6 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
                                Confirm Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}
