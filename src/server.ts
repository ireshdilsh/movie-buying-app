import express from "express";
import cors from 'cors';
import { connectDB } from "./config/dbConfig";
import { movie_router } from "./routes/movie.route";
import { genre_router } from "./routes/genre.route";
// import connectDB from "./config/dbConfig";

const server = express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// api routes
server.use('/api/movies', movie_router);
server.use('/api/genres', genre_router);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB()