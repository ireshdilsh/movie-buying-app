import express from 'express';
import { upload } from '../middlewares/upload';
import { saveMovie } from '../controllers/movie.controller';

export const movie_router = express.Router();

movie_router.post('/post/new/movie',upload.single('file'),saveMovie)