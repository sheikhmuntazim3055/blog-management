import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';



const authMiddleware =async (req,res,next)=>{
   try {
    let token ;
    const {authorization}=req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        token =authorization.split(' ')[1];
        const SECRET_KEY =process.env.SECRET_KEY
        const {id}=jwt.verify(token,SECRET_KEY)
        const user = await userModel.findById(id).select('-password');
        if (!user) {
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        req.user =user
        next()
        
    }

    if (!token) {
        return res.status(401).json({
            success:false,
            message:"Unauthorized user ,No token"
        })
    }
   } catch (error) {
    return res.status(401).json({
        success:false,
        message:error.message
    })
   }
}

const admin =async(req,res,next)=>{

        if (req.user && req.user.isAdmin) {
            next();
        } else{
            res.status(401).json({
                success:false,
                message:"Not authorized as an admin"
            })
        } 
    
}

export {authMiddleware,admin}