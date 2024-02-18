import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const {DB_HOST} = process.env;

export const connectDb = async () => {

    try {
        await mongoose.connect(DB_HOST);
        console.log("Connected to database was successfully");

    } catch (error) {
        console.log(error);
    }
}

