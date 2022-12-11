import express from "express";
import { generateToken } from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { ThreadModel } from "../model/thread.model.js";


// threadRouter.post("/create", isAuth, attachCurrentUser, async (req, res) => {
//     try {
        
//     }
//     catch {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// });

const threadRouter = express.Router();

threadRouter.post("/create", isAuth, attachCurrentUser, async (req, res) => {
    try {
        const loggedInUser = req.currentUser;

        const newThread = await ThreadModel.create({
            ...req.body,
            creator: loggedInUser._id
        });

        return res.status(201).json(newThread);
    }
    catch {
        console.log(err);
        return res.status(500).json(err);
    }
});

threadRouter.get("/:threadID", async (req, res) => {
    try {
        const thread = await ThreadModel.findOne({ _id: req.params.threadID });
        return res.status(200).json(thread);
    }
    catch {
        console.log(err);
        return res.status(500).json(err);
    }
});

// threadRouter.get("/:userID", async (req, res) => {
//     try {
//         const thread = await ThreadModel.findOne({ creator: req.params.userID });
//         return res.status(200).json(thread);
//     }
//     catch {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// });



export { threadRouter };