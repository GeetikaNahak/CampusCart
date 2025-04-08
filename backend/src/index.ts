import express, { Request,Response} from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoutes from  "./routes/myUserRoutes" 
// mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>console.log("Connected to Database Successfully !"));


const app = express();
app.use(express.json())
app.use(cors())
app.use("/api/my/user",myUserRoutes)

app.get("/test",async(req: Request,res: Response)=>{
    res.json({ message: "Hello!" });
});

app.listen(8000,()=>{
    console.log("Server running at http://localhost:8000");
});