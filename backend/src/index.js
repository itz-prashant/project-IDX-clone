import {createServer} from 'node:http'
import express from "express"
import cors from "cors"
import {Server} from "socket.io"
import { PORT } from "./config/serverConfig.js"
import apiRouter from './routes/index.js'
import chokidar from "chokidar"
import { handleEditorSocketEvents } from './socketHandler/editorHandlers.js'

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors:{
        origin: '*',
        methods:['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

io.on('connection', (socket)=>{
    console.log('A user connected')
})

app.use('/api', apiRouter);

app.get('/ping', (req,res)=>{
    return res.json({message: 'pong'})
});

const editorNameSpace = io.of('/editor')

editorNameSpace.on("connection", (socket)=>{
    console.log("editor connected")
    // somehow we will get the project id from frontend
    const projectId = socket.handshake.query['projectId']

    console.log("project id recieved after connection", projectId)

    if(projectId){
        var watcher = chokidar.watch(`./projects/${projectId}`,{
            ignored:(path)=> path.includes("node_modules"),
            persistent: true,
            awaitWriteFinish:{
                stabilityThreshold: 2000,
            },
            ignoreInitial: true
        })
        watcher.on("all", (event, path)=>{
            console.log(event, path)
        })
    }

    handleEditorSocketEvents(socket, editorNameSpace)

    socket.on("disconnect", async ()=>{
        await watcher.close()
        console.log("editor disconnected")
    })
})

server.listen(PORT, ()=>{
    console.log(`Server is running on PORT:${PORT}`)
});