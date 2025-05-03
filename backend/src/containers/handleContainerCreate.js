import Docker from "dockerode"

const docker = new Docker();

export const listContainer = async()=>{
    const containers = await docker.listContainers()
    console.log('containers', containers)
    containers.forEach((containerInfo)=>{
        console.log(containerInfo.Ports)
    })
}

export const handleContainerCreate = async (projectId, terminalSocket, req, tcpSocket, head) => {
    console.log("Project id recieved for container create", projectId)
   try {
    const container = await docker.createContainer({
        Image: 'sandbox',
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Cmd: ['/bin/bash'],
        Tty: true,
        User: "sandbox",
        ExposedPorts:{
            "5173/tcp": {}
        },
        Env:["Host=0.0.0.0"],
        HostConfig: {
            Binds: [ // mounting the project dirextory to the container
                `${process.cwd()}/projects/${projectId}:/home/sandbox/app`
            ],
            PortBindings:{
                "5173/tcp":[
                    {
                        "HostPort": "0" // random port assign by docker
                    }
                ]
            },
        }
    })

    console.log("Container created", container.id)

    await container.start();

    console.log("Container started")

    terminalSocket.handleUpgrade(req, tcpSocket, head, (establishedWSConn)=>{
        terminalSocket.emit("connection", establishedWSConn, req, container)
    })

   } catch (error) {
    console.log("Error while creating container", error)
   }
}