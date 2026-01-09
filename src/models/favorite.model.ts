import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  email: string;
  movieId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const favoriteSchema = new Schema<IFavorite>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie ID is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to prevent duplicate favorites
favoriteSchema.index({ email: 1, movieId: 1 }, { unique: true });

export const Favorite = mongoose.model<IFavorite>('Favorite', favoriteSchema);
