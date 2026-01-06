import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL as string);
        console.log('Database connected successfully', conn.connection.host);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}
