import userModel from "../models/userModel.js"


const createUser =async ({name,email,password})=>{
    try {
        const user=new userModel({
            name,
            email,
            password,
        })

            const savedUser =await user.save()
            return savedUser
        } catch (error) {
            return {error:error.message}
        }

}

const findUserByEmail =async (email)=>{
        const user =await userModel.findOne({email})
        return user
}



export {findUserByEmail,createUser}