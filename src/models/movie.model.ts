import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    releaseDate:{
        type: Date,
        required: false
    },
    genre:{
        type: String,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    bannerURL:{
        type: String,
        required: true
    }
},{timestamps: true});

export const Movie = mongoose.model('Movie', movieSchema);