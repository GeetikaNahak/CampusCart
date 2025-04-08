import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    authId:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    name:{
        type: String,
    },
    collegeId:{
        type: String,
    }
});

const User = mongoose.model("User",userSchema);
export default User;