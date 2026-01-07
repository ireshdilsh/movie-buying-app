import { Genre } from "../models/genre.model";

export const createGenre = async (req: any, res: any) => {
    try {
        const{name} = req.body;
        const newGenre = new Genre({
            name
        });
        await newGenre.save();
        return res.status(201).json({ message: 'Genre saved successfully', genre: newGenre });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving genre', error });
    }
}

export const getGenres = async (req: any, res: any) => {
    try {
        const genres = await Genre.find();
        return res.status(200).json({ genres });
    }catch (error) {
        return res.status(500).json({ message: 'Error fetching genres', error });
    }
}