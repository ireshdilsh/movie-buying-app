import express from 'express';
import { register, login, getMe } from '../controllers/user.controller';

export const user_router = express.Router();

user_router.post('/register', register);
user_router.post('/login', login);
user_router.get('/me', getMe);
