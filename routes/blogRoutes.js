import express from 'express'
import {  createBlog, getApprovedBlogs } from '../controllers/blogContoller.js';
import {  authMiddleware } from '../middlewares/authMiddleware.js';
import { blogValidation, validate } from '../validation/validation.js';

const blogRouter = express.Router();

blogRouter.post('/create',authMiddleware,blogValidation,validate,createBlog)

blogRouter.get('/get-approved-blogs',authMiddleware,getApprovedBlogs)


export default blogRouter