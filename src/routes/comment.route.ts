import express from 'express';
import { newComment, getCommentsByMovie } from '../controllers/comment.controller';

export const comment_router = express.Router();

comment_router.post('/add/new/comment', newComment);
comment_router.get('/all/comments/:movieID', getCommentsByMovie);