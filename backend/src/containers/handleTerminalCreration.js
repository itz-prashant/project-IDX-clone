export const handleTerminalCreration = (container, webSocketForTerminal)=>{
    container.exec({
        Cmd:["/bin/bash"],
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        User: "sandbox",
    }, (err, exec)=>{
        if(err){
            console.log("Error while creating exec", err);
            return;
        }

        exec.start({
            hijack: true
        }, (err, stream)=>{
            if(err){
                console.log("Error while starting exec", err);
                return;
            }

            // Step 1: Stream process
            processStreamOutput(stream, webSocketForTerminal);

            // Step 2: Stream writing
            webSocketForTerminal.on("message", (data)=>{
                if(data === "getPort"){
                    container.inspect((err, data)=>{
                        const port = data.NetworkSettings;
                        console.log(port)
                    })
                    return;
                }
                stream.write(data)
            })
        })
    })
}

function processStreamOutput(stream, webSocketForTerminal){
    let nextDataType = null; // stores the type of the next message
    let nextDataLength = null; // stores the length of the next message
    let buffer = Buffer.from("");

    function processStreamData(data){
        if(data){
            buffer = Buffer.concat([buffer, data])
        }

        if(!nextDataType){
            if(buffer.length >= 8){
                const header = bufferSlicer(8);
                nextDataType = header.readUInt32BE(0) // The first 4 bytes represent the type of the message
                nextDataLength = header.readUInt32BE(4) // The next 4 bytes represent the length of the message

                processStreamData()
            }
        }else{
            if(buffer.length >= nextDataLength){
                const content = bufferSlicer(nextDataLength) // slice the buffer to get the message content
                webSocketForTerminal.send(content); // send the message to the client
                nextDataType = null; // reset the type and length of the next message
                nextDataLength = null;
                processStreamData()
            }
        }
    }

    function bufferSlicer(end){
        const output = buffer.slice(0, end) // header of the chunk
        buffer = Buffer.from(buffer.slice(end, buffer.lengh)) // remaining part of the chunk
        return output;
    }

    stream.on("data", processStreamData)
}