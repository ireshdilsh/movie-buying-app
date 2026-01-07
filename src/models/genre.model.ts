import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    wrequired: true
  }
},{timestamps: true});

export const Genre = mongoose.model("Genre", genreSchema);