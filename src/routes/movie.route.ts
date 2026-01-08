import express from 'express';
import { upload } from '../middlewares/upload';
import { deleteMovie, getMovieById, getMovies, saveMovie } from '../controllers/movie.controller';

export const movie_router = express.Router();

movie_router.post('/post/new/movie',upload.single('image'),saveMovie)
movie_router.get('/get/movies',getMovies)
movie_router.get('/get/movie/:id',getMovieById)
movie_router.delete('/delete/movie/:id',deleteMovie)
