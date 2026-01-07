import express from 'express';
import { upload } from '../middlewares/upload';
import { getMovies, saveMovie } from '../controllers/movie.controller';

export const movie_router = express.Router();

movie_router.post('/post/new/movie',upload.single('image'),saveMovie)
movie_router.get('/get/movies',getMovies)