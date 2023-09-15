import express from 'express';
import {  } from '../controllers/comment.js';
import { verifyToken } from '../verifyToken.js';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js';
const router = express.Router();

// CREATE A VIDEO
router.post("/", verifyToken, addVideo)

// UPDATE A VIDEO
router.put("/:id", verifyToken, updateVideo)

// DELETE A VIDEO
router.delete("/:id", verifyToken, deleteVideo)

// GET A VIDEO
router.get("/find/:id", getVideo)

// INCREASE VIEW COUNT
router.put("/view/:id", addView)

// TREND 
router.get("/trend", trend)

// GET RANDOM VIDEO
router.get("/random", random)

// SUBSCRIBE CHANNEL
router.get("/sub", verifyToken, sub)

// GET VIDEOS BY TAG
router.get("/tags", getByTag)

// SEARCH VIDEO
router.get("/search", search)

export default router;

