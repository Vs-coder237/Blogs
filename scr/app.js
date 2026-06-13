import express from 'express'
import router from "./routes/blogs.routes.js"
import userRouter from './routes/users.routes.js' 
import commentRouter from './routes/comment.routes.js'

const app = express()

// routing for blogs
app.use(express.json())

app.use('/api/blogs', router)

// routing for users
app.use('/api/users', userRouter)

//routes for comment
app.user('/api/comment')

export default app