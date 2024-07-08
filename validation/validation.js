import { check, validationResult } from "express-validator"

const registrationValidation =[
    check("name","Please enter a valid name").not().trim().isEmpty(),
    check("email","Please enter a valid email").isEmail(),
    check("password","Password must be 6 or more characters").isLength({min:6})
]



const loginValidation = [
    check("email","Please enter a valid email").isEmail(),
    check("password","Password must be 6 or more characters").isLength({min:6})
]


const blogValidation = [
    check("title","Title is required").not().trim().isEmpty(),
    check("content","Content is required").not().trim().isEmpty()
]

const validate =(req,res,next)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success:false,
            errors:errors.array().map(msg=>msg.msg)
        })
        
    }

    next()
}


export {registrationValidation,loginValidation,blogValidation,validate}