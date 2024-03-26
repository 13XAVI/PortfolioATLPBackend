import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import AllRoutes from "./Routes/AllRoutes"

const app = express()
app.use(express.json());
dotenv.config()
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URL as string).then(()=> console.log("Connected to the database")).catch((err)=>console.log(err))
app.get('/', (req, res) => res.send('Hello World!'))

app.use("/api/v1",AllRoutes)

app.listen(port, () => console.log(` app listening on port ${port}!`))