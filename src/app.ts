import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import AllRoutes from './Routes/AllRoutes';


dotenv.config();

const app = express();


app.use(express.json());

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/v1', AllRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
