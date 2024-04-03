import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import AllRoutes from "./Routes/AllRoutes";
import connectionNewDB from "./server";
import { Request, Response } from 'express';
import cors from "cors";



const app = express();

const port = process.env.PORT1

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (`${process.env.MONGO_URL}`) {
  connectionNewDB(`${process.env.MONGO_URL}`);
} else if (`${process.env.MONGODB_TEST}`) {
  connectionNewDB(`${process.env.MONGODB_TEST}`);
}

app.use("/api/V1", AllRoutes);


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "pass!" });
});

app.use("/**", (req: Request, res: Response) => {
    res.status(404).json({ message: "Not Found!" });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

export default app;
