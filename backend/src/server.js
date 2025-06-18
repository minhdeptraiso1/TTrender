import express from 'express'
dotenv.config() // Đặt dòng này trước connectDB()
import cors from 'cors'
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import dotenv from 'dotenv'
import { connectDB } from "./config/database.config.js";
import orderRouter from "./routers/order.router.js";


import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
connectDB()
const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)
const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

const PORT = process.env.PORT || 5000

app.use("/api/foods", foodRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
const publicFolder = path.join(__dirname, '/public')
app.use(express.static(publicFolder))

app.get("*", (req, res) => {
    const indexFilePath = path.join(publicFolder, 'index.html')
    res.sendFile(indexFilePath)
})
app.use()
app.listen(PORT, () => {
    console.log(`Máy hoạt động tại cổng : ${PORT}`)
})