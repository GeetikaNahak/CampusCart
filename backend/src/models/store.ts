import mongoose from "mongoose";


const ItemSchema=new mongoose.Schema({
    name:{
        type: String, required: true
    },
    price:{
        type:Number,required:true
    },
    available:{
        type:Boolean
    }

})
const storeSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    storeName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    imageUrl:{
        type:String,required:true
    },
    cuisines:[{type:String,required:true}],
    items:[ItemSchema],
    createdAt:{
        type:Date,default:Date.now
    },
    lastUpdated:{
        type:Date,required:true
    },

})

const Store = mongoose.model("Store",storeSchema);
export default Store;