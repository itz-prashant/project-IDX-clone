import express from "express"
import cors from "cors"
import { PORT } from "./config/serverConfig.js"

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/ping', (req,res)=>{
    return res.json({message: 'pong'})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT:${PORT}`)
})