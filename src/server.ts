import mongoose, { MongooseOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();


 const connnectionNewDB = async (mongoURI: string)  => {
    try {
         await mongoose.connect(mongoURI, );;
        console.log("Connected to the database"); 
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
};
export default connnectionNewDB
