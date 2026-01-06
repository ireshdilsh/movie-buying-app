import cloudinary from "../config/cloudinary";
import { Movie } from "../models/movie.model";

export const saveMovie = async (req: any, res: any) => {
    try {
        const { name, description, releaseDate, genre, director, price } = req.body;
        let bannerURL = '';

        let uploadResult: any = null;

        if (req.file) {
            uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "posts" },
                    (error: any, result: any) => {
                        if (error) {
                            console.error("Cloudinary error:", error);
                            return reject(error);
                        }
                        resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            bannerURL = uploadResult.secure_url;  // ✔ Now safe
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
        return res.status(201).json({ message: 'Movie saved successfully', movie: newMovie });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving movie', error });
    }
}