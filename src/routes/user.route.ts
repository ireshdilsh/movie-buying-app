import express from 'express';
import { register, login, getMe, addToFavorites, removeFromFavorites, getFavoriteMovies, buyMovie, getPurchasedMovies } from '../controllers/user.controller';

export const user_router = express.Router();

user_router.post('/register', register);
user_router.post('/login', login);
user_router.get('/me', getMe);
user_router.post('/favorites/add', addToFavorites);
user_router.post('/favorites/remove', removeFromFavorites);
user_router.get('/favorites', getFavoriteMovies);
user_router.post('/purchase', buyMovie);
user_router.get('/purchases', getPurchasedMovies);
