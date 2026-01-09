import { Comment } from "../models/comment.model";

export const newComment = async (req: any, res: any) => {
    try {
        const { content, name, movieID } = req.body;
        const comment = new Comment({ content, name, movieID });
        await comment.save();
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
}

export const getCommentsByMovie = async (req: any, res: any) => {
    try {
        const { movieID } = req.params;
        const comments = await Comment.find({ movieID }).sort({ createdAt: -1 });
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};