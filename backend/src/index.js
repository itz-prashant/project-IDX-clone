import express from "express"
import cors from "cors"
import { PORT } from "./config/serverConfig.js"
import apiRouter from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api', apiRouter)

app.get('/ping', (req,res)=>{
    return res.json({message: 'pong'})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT:${PORT}`)
})