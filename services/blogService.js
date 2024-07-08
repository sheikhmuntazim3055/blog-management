import blogModel from "../models/blogModel.js"


const createBlogService=async(title,content,id)=>{
    try {
        const blob = blogModel({
            title,
            content,
            author:id
        })

        const savedBlog =await blob.save()
        return savedBlog
    } catch (error) {
        return {error:error.message}
    }
}

const getAllBlogsService=async()=>{
    const blogs =await blogModel.find().populate("author", "name -_id")
    console.log(blogs);
    return blogs
}

const approveBlogService =async(id)=>{
    const blog =await blogModel.findById(id)
    blog.approved=true;
        const updatedBlog =await blog.save()
    return updatedBlog
}

const getApprovedBlogsService =async()=>{
    const blogs =await blogModel.find({approved:true}).populate("author", "name -_id")
    return blogs
}

const findBlogById =async (id)=>{
    const blog = await blogModel.findById(id)
    return blog
}

export {createBlogService,getAllBlogsService,approveBlogService,getApprovedBlogsService,findBlogById}