import { Application, Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response): Promise<Response<any> | any> => {
    try {
        const { authId } = req.body;

        const existingUser = await User.findOne({ authId });
        if (existingUser) {
            return res.status(200).send();  
        }

        const newUser = new User(req.body);
        await newUser.save();

        return res.status(201).json(newUser.toObject());
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error Creating User" });
    }
};

export default {
    createCurrentUser,
};
