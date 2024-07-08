import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre('save',async function (next){
    if (!this.isModified('password')) {
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken =async function(){
    return jwt.sign({id:this._id,email:this.email},process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY})
}

const userModel = mongoose.model('User',userSchema)
export default userModel