import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/Comments.js'
import authRoute from './routes/auth.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
dotenv.config();

const connect = () => {
    mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("Connected to mongo");
    }).catch((err) => {throw err})
}

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoute)
app.use("/api/videos", videoRoute)
app.use("/api/comments", commentRoute)
app.use("/api/auth", authRoute)

// MIDDLEWARE FOR ERROR HANDLING
app.use((err,req,res,next)=> {
    
    // GRABING THE STATUS AND ERROR MESSAGE
    const status = err.status || 500
    const message = err.message || "Something went wrong"

    // SENDING ERROR
    res.status(status).json({success: false,status,message})
})


app.listen(3055, () => {
    connect();
    console.log("Server started");
})