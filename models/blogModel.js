import mongoose from "mongoose";
const blogSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    approved:{
        type:Boolean,
        default:false
    }
})

const blogModel =mongoose.model('Blog',blogSchema)

export default blogModel