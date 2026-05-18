import app from "./scr/app.js"
import dotenv from 'dotenv/config'

const Port = process.env.PORT

app.listen(Port, () => {
    console.log(`the server is running on http://localhost:${Port}`)
})