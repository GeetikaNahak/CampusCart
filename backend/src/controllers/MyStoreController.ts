import { Request, Response } from "express";
import Store from "../models/store";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
const createMyStore=async (req:Request,res:Response):Promise<any>=>{
    
    try {
        const existingStore=await Store.findOne({user:req.userId});
        if(existingStore){
            
            return res.status(409).json({message:"user Exists"});
        }

        // const image=req.file as Express.Multer.File;
        // const base64Image=Buffer.from(image.buffer).toString("base64");
        // const dataURI=`data:${image.mimetype};base64,${base64Image}`;

        // const uploadResponse=await cloudinary.v2.uploader.upload(dataURI);
        const imageUrl=await uploadImage(req.file as Express.Multer.File);

        const store=new Store(req.body);
        store.imageUrl=imageUrl;
        store.user=new mongoose.Types.ObjectId(req.userId);
        store.lastUpdated=new Date();
        await store.save();
        res.status(200).send(store);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Weng Wrong"});
    }
}


const getMyStore=async(req:Request,res:Response):Promise<any>=>{
    try {
        const store=await Store.findOne({user:req.userId});
        if(!store){
            return res.status(404).json({message:"User Not Found"});
        }
        res.json(store);
  } catch (error) {
      console.log(error);
        res.status(500).json({ message: "Error Fetching store" });
    }

}


const updateMyStore=async(req:Request,res:Response):Promise<any>=>{
    try{
        const store=await Store.findOne({user:req.userId})
        if(!store){
            return res.status(500).json({message:"something Went Wrong"});
        }
        
        store.storeName=req.body.storeName;
        store.location=req.body.location;
        store.description=req.body.description;
        store.cuisines=req.body.cuisines;
        store.items=req.body.items;
        if(req.file){
            const imageUrl=await uploadImage(req.file as Express.Multer.File);
            store.imageUrl=imageUrl;
        }
        await store.save();
        res.status(200).send(store);

    }
    catch (error) {
      console.log(error);
        res.status(500).json({ message: "Error Updating store" });
    }
}

const uploadImage=async(file:Express.Multer.File)=>{
    const image=file;
        const base64Image=Buffer.from(image.buffer).toString("base64");
        const dataURI=`data:${image.mimetype};base64,${base64Image}`;

        const uploadResponse=await cloudinary.v2.uploader.upload(dataURI);
        return uploadResponse.url;

}

export default {
    getMyStore,
    createMyStore,
    updateMyStore,
    
}