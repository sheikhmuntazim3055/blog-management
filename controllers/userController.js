import { createUser, findUserByEmail } from "../services/userService.js";


const registerUser = async (req,res)=>{
    try {
        const {email} =req.body
    
        const emailExists = await findUserByEmail(email)
        if (emailExists) {
            return res.status(409).json({
                success:false,
                message:"Email ID already registered"
            })
        }
    
        const user =await createUser(req.body);

        if (user.error) {
            console.log(user);
            return res.status(400).json({
                success:false,
                message:user.error
            })
        }
        const token = await user.generateToken()
        return res.status(201).json({
            success:true,
            token,
            message:"User registered successfully"
        })
    
} catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
}
}


const loginUser =async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user =await findUserByEmail(email)
        if (!user) {
            return res.status(404).json({
                success:false,
                message:"Email ID is not valid"
            })
        }

        const isPasswordMatched=await user.comparePassword(password)
        if (!isPasswordMatched) {
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token =await user.generateToken()
        return res.status(201).json({
            success:true,
            token,
            message:"Login successfully"
        })

    } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
    }
}


export {registerUser,loginUser}