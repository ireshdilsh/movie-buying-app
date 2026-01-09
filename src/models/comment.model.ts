import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    movieID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }
}, { timestamps: true });

export const Comment = mongoose.model("Comment", commentSchema);
