import express from "express";
import cors from 'cors';
import { connectDB } from "./config/dbConfig";
// import connectDB from "./config/dbConfig";

const server = express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB()