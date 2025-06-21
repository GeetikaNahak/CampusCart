import { Application, Request, Response } from "express";
import User from "../models/user";

export const createCurrentUser = async (req: Request, res: Response): Promise<Response<any> | any> => {

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

export const updateCurrentUser = async (req: Request, res: Response):Promise<any> => {
  try {
    const { email ,name, collegeId, branch } = req.body;
    
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.collegeId = collegeId;
    user.branch = branch;

    await user.save();
    console.log("Success");
    res.send(user);
  } catch (error) {
    console.log("error 500",error);
    res.status(500).json({ message: "Error updating user" });
  }
};



