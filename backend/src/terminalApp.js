import cors from "cors"
import express from "express"
import { createServer } from 'node:http'
import { WebSocketServer } from "ws"
import { handleContainerCreate } from './containers/handleContainerCreate.js'
import { handleTerminalCreration } from './containers/handleTerminalCreration.js'

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


server.listen(4000, ()=>{
    console.log(`Server is running on PORT:4000`)
});

const webSocketForTerminal = new WebSocketServer({
    server
})

webSocketForTerminal.on("connection", async (ws, req, container)=>{

    const terminal = req.url.includes("/terminal")

    if(terminal){
        console.log("req url recieved",req.url)
        const projectId = req.url.split("=")[1]
        console.log(projectId)

        const container = await handleContainerCreate(projectId, webSocketForTerminal)
        handleTerminalCreration(container, ws)
    }
 
})


