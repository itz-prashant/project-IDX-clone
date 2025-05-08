import fs from "fs/promises"
import { getContainerPort } from "../containers/handleContainerCreate.js"

export const handleEditorSocketEvents = (socket, editorNameSpace)=>{
    socket.on("writeFile", async ({data, pathToFileOrFolder})=>{
        try {
            await fs.writeFile(pathToFileOrFolder, data)
            editorNameSpace.emit('writeFileSuccess', {
                data: "File written successfully",
                path: pathToFileOrFolder
            })
        } catch (error) {
            console.log("error writing the file", error)
            socket.emit('writeFileError', {
                data: "Error writing file"
            })
        }
    })

    socket.on("createFile", async({pathToFileOrFolder})=>{
        const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder)
        if(isFileAlreadyPresent){
            socket.emit("error", {
                data: "File already exists"
            })
            return;
        }
        try {
            const response = await fs.writeFile(pathToFileOrFolder, "");
            socket.emit("createFileSuccess", {
                data: "File created successfully",
            });
        } catch (error) {
            console.log("Error creating the file", error)
            socket.emit('error', {
                data: "Error creating the file"
            })
        }    
    })
   
    socket.on("readFile", async ({pathToFileOrFolder})=>{
        try {
            const response = await fs.readFile(pathToFileOrFolder);
            console.log(response)
            socket.emit("readFileSuccess", {
                data: response.toString(),
                path: pathToFileOrFolder
            })
        } catch (error) {
            console.log("Error rading the file", error)
            socket.emit('error', {
                data: "Error reading the file"
            })
        }
    })

    socket.on("deleteFile", async({pathToFileOrFolder})=>{
        try {
            const response = await fs.unlink(pathToFileOrFolder);
            socket.emit("deleteFileSuccess", {
                data: response.toString()
            })
        } catch (error) {
            console.log("Error deleting the file", error)
            socket.emit('error', {
                data: "Error deleting the file"
            })
        }
    })

    socket.on("createFolder", async({pathToFileOrFolder})=>{
        try {
            const response = await fs.mkdir(pathToFileOrFolder);
            socket.emit("createFolderSuccess", {
                data: "Folder created successfully"
            })
        } catch (error) {
            console.log("Error creating the folder", error)
            socket.emit('error', {
                data: "Error creating the folder"
            })
        }
    })

    socket.on("deleteFolder", async({pathToFileOrFolder})=>{
        try {
            const response = await fs.rmdir(pathToFileOrFolder);
            socket.emit("deleteFolderSuccess", {
                data: "Folder delete successfully"
            })
        } catch (error) {
            console.log("Error delete the folder", error)
            socket.emit('error', {
                data: "Error delete the folder"
            })
        }
    })

    socket.on("getPort", async ({containerName})=>{
        const port = await getContainerPort(containerName);
        console.log("port data", port)
        socket.emit("getPortSuccess", {
            port: port
        })
    })
}