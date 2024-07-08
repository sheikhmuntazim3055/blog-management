import express from "express"
import { admin, authMiddleware } from "../middlewares/authMiddleware.js"
import { approveBlog, getAllBlogs } from "../controllers/blogContoller.js"

const adminRouter=express.Router()

adminRouter.get('/get-all-blogs',authMiddleware,admin,getAllBlogs)
adminRouter.put('/blog/:id/approve',authMiddleware,admin,approveBlog)

export default adminRouter