import { Request, Response } from "express";
import Store from "../models/store";

const getStore=async(req:Request,res:Response):Promise<any>=>{
    try {
        const storeId=req.params.storeId;
        const store=await Store.findById(storeId);
        if(!store){
            return res.status(404).json({message:"store not found"});
        }
        res.json(store)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}


const searchStore=async (req:Request,res:Response):Promise<any>=>{
    try {
        const city=req.params.city;
        const searchQuery=(req.query.searchQuery as string) || "";
        const selectedCuisines=(req.query.selectedCuisines as string)||"";
        const sortOption=(req.query.sortOption as string)||"lastUpdated";
        const page=parseInt(req.query.page as string)||1;
        let query:any={};
        query["storeName"]=new RegExp(city,"i");
        const cityCheck=await Store.countDocuments(query)
        if(cityCheck===0){
            return res.status(404).json({
                data:[],
                pagination:{
                    total:0,
                    page:1,pages:1,
                }
            });
        }
        if(selectedCuisines){
            const cuisinesArray=selectedCuisines.split(",").map((cuisine)=>new RegExp(cuisine,"i"));
            query["cuisines"]={$all:cuisinesArray};
        }
        if(searchQuery){
            const searchRegex=new RegExp(searchQuery,"i");
            query["$or"]=[
                {storeName:searchRegex},
                {cuisines:{$in:[searchRegex]}},
            ]
        }
        const pageSize=10;
        const skip=(page-1)*pageSize;
        const stores=await Store.find(query).sort({[sortOption]:1}).skip(skip).limit(pageSize).lean();
        const total=await Store.countDocuments(query);
        const response={
            data:stores,
            pagination:{
                total,page,
                pages:Math.ceil(total/pageSize),

            }
        }
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong searching"});
    }
}

export default { searchStore,getStore }