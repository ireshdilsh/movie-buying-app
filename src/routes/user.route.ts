import express from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controller';

export const user_router = express.Router();

// Public routes
user_router.post('/register', registerUser);
user_router.post('/login', loginUser);

// Protected route (optional - requires auth middleware)
user_router.get('/me', getCurrentUser);
