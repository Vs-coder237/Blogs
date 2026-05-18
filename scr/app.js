import express from 'express'
import router from "./routes/blogs.routes.js"

const app = express()


app.use(express.json())

app.use('/api/blogs', router)

export default app