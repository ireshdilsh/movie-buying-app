import cloudinary from "../config/cloudinary";
import { Movie } from "../models/movie.model";


export const saveMovie = async (req: any, res: any) => {
    try {
        const { name, description, releaseDate, genre, director, price } = req.body;

        let bannerURL = "";

        if (req.file) {
            const uploadResult: any = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "movies" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                uploadStream.end(req.file.buffer);
            });

            bannerURL = uploadResult.secure_url;
        }

        const newMovie = new Movie({
            name,
            description,
            releaseDate,
            genre,
            director,
            price,
            bannerURL
        });

        await newMovie.save();

        res.status(201).json({
            message: "Movie saved successfully",
            movie: newMovie
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: "Error saving movie",
            error: error.message
        });
    }
};

export const getMovies = async (req: any, res: any) => {
    try {
        const movies = await Movie.find();
        return res.status(200).json({ movies });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching movies', error });
    }
}

export const searchMovies = async (req: any, res: any) => {
    try {
        const { name } = req.query;
        
        if (!name) {
            return res.status(400).json({ message: 'Movie name is required' });
        }

        const movies = await Movie.find({
            name: { $regex: name, $options: 'i' }
        });

        return res.status(200).json({ 
            movies,
            count: movies.length 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error searching movies', error });
    }
}

export const getMovieById = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json({ movie });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching movie', error });
    }
}

export const deleteMovie = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting movie', error });
    }
}