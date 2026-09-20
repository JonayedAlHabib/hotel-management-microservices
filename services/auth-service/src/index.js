import dotenv from "dotenv"
import connectDB from "./db/db.js";
import { connectRedis } from "./db/redis.js";
import { app } from "./app.js";
dotenv.config({
    path: './.env'
})


const PORT = process.env.PORT || 8000;

connectDB()
.then(() => connectRedis())
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("Startup failed !!! ", err);
})