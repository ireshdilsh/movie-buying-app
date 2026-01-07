import express from "express";
import { createGenre, getGenres } from "../controllers/genre.controller";

export const genre_router = express.Router();

genre_router.post('/add/new/genre',createGenre)
genre_router.get('/get/genres',getGenres)