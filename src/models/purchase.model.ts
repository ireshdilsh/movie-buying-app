import mongoose, { Document, Schema } from 'mongoose';

export interface IPurchase extends Document {
  email: string;
  movieId: mongoose.Types.ObjectId;
  price: number;
  purchaseDate: Date;
  createdAt: Date;
}

const purchaseSchema = new Schema<IPurchase>(
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
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index to prevent duplicate purchases
purchaseSchema.index({ email: 1, movieId: 1 }, { unique: true });

export const Purchase = mongoose.model<IPurchase>('Purchase', purchaseSchema);
