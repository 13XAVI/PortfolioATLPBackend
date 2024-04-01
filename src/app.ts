import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import AllRoutes from "./Routes/AllRoutes";
import connnectionNewDB from "./server";
import { Request, Response } from 'express';

const app = express();

dotenv.config();


if (process.env.MONGO_URL) {
  connnectionNewDB(process.env.MONGO_URL as string);
} else if (process.env.MONGODB_TEST) {
  connnectionNewDB(process.env.MONGODB_TEST as string);
}

app.use("/api/V1", AllRoutes);
app.get("/", (req:Request, res:Response) => {
    res.status(200).json({ message: "pass!" });
  });
 app.use("/**", (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found!" });
  });

export default app;
