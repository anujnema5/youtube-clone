import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
    if (req.params.id === req.user?.id) {
        // todo
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })

            res.status(200).json(updatedUser);
        } catch (error) {

        }

    } else {
        return next(createError(403, "You can update only your account"))
    }
}

export const deleteUser = async (req, res) => {
    if (req.params.id === req.user?.id) {
        // todo
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted");
        } catch (error) {

        }

    } else {
        return next(createError(403, "You can delete only your account"))
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

export const susbscribe = async (req, res, next) => {
    try {
        // THE USER WHO IS SUSBSCRIBING A CHANNEL SO 
        // WE ARE PUSHING SUSBSCRiBED CHANNEL ID INTO THE 
        // SUSBSCRIBEDUSERS ARRAY OF LOGGED-IN USER
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });

        // WE ALSO HAVE TO UPDATE THE CHANNEL SUSBSCRIBER COUNT
        // HERE WE ARE FINDING THAT CHANNEL BY PARAMS ID 
        // AND INCREMENTING THE SUBSCRIBER
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscriber: 1 }
        });

        res.status(200).json("Subscribed successfull")
    } catch (error) {
        next(error)
    }
}

export const unsubscribe = async (req, res, next) => {
    try {
        // THE USER WHO IS SUSBSCRIBING A CHANNEL SO 
        // WE ARE PUSHING SUSBSCRiBED CHANNEL ID INTO THE 
        // SUSBSCRIBEDUSERS ARRAY OF USER

        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });

        // WE ALSO HAVE TO UPDATE THE CHANNEL SUSBSCRIBER COUNT
        // HERE WE ARE FINDING THAT CHANNEL AND INCREMENTING 
        // THE SUBSCRIBER

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscriber: -1 }
        });

        res.status(200).json("Un-Subscribed successfull")
    } catch (error) {
        next(error)
    }
}

export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes: id},
            $pull: {dislikes: id}
        }, {new: true})
        res.status(200).json("Video liked successful")
    } catch (error) {
        next(error)
    }
}

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;

    try {
        Video.findByIdAndUpdate(videoId, {
            $addToSet: {dislikes: id},
            $pull: {likes: id}
        })
        res.status(200).json("Video Dislike successful")
    } catch (error) {
        next(error)
    }
}
