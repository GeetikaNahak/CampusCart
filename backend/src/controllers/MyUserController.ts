import {Request,Response} from "express";
import User from "../models/user";
const createCurrentUser=async(req:Request,res:Response)=>{
    try {
        const {authId}= req.body;
        const existingUser=await User.findOne(authId);
        if (existingUser) {
            res.status(200).send();
        }
        
        const newUser=new User(req.body);
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        res.status(500).json({message: "Error Creating User"});
    }
}
export default{
createCurrentUser
};