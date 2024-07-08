import express from 'express'
import "./db/connectDB.js"
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import blogRouter from './routes/blogRoutes.js'
import adminRouter from './routes/adminRoutes.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())

// user route
app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)

//blog route
app.use('/api/admin',adminRouter)

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})