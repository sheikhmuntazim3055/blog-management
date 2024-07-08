import { approveBlogService, createBlogService, findBlogById, getAllBlogsService, getApprovedBlogsService } from "../services/blogService.js";


const createBlog =async(req,res)=>{
    try {
        const {title,content}=req.body
       const blog =await createBlogService(title,content,req.user._id)
        res.status(201).json({
            success:true,
            blog,
            message:"Blog created successfully"
        })
    } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
    }
}

const getAllBlogs =async(req,res)=>{
    try {
        const blogs =await getAllBlogsService()

        if (blogs.length ==0) {
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            })   
        }
    
        return res.status(200).json({
            success:true,
            blogs,
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

const approveBlog =async (req,res)=>{
    try {
        const {id}=req.params;
         const blogExist =await findBlogById(id)
        if (!blogExist) {
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            }) 
        }
        const blog = await approveBlogService(id)
        if (!blog) {
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            })  
        }
        
        res.status(200).json({
            success:true,
            blog,
            message:"Blog updated successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
}

const getApprovedBlogs =async (req,res)=>{
    try {
    const blogs =await getApprovedBlogsService()
    if (blogs.length == 0) {
        return res.status(404).json({
            success:false,
            message:"Blog not found"
        })  
    }

    return res.status(200).json({
        success:true,
        blogs,
    })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        }) 
    }
}



export {createBlog,getAllBlogs,approveBlog,getApprovedBlogs}