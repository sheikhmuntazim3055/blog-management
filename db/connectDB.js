import mongoose from "mongoose";


const connectDB=()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/blog')
        console.log("databse connected");
    } catch (error) {
        console.log(error.message);
    }
}

connectDB()