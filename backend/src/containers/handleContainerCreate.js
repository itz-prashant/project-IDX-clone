import Docker from "dockerode"

const docker = new Docker();

export const handleContainerCreate = async (projectId, socket) => {
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
        HostConfig: {
            Binds: [ // mounting the project dirextory to the container
                `${import.meta.dirname}/../projects/${projectId}:/home/sandbox/app`
            ],
            PortBindings:{
                "5173/tcp":[
                    {
                        "HostPort": "0" // random port assign by docker
                    }
                ]
            },
            ExposedPorts:{
                "5173/tcp": {}
            },
            Env:["Host=0.0.0.0"]
        }
    })

    console.log("Container created", container.id)

    await container.start();

    console.log("Container started")

   } catch (error) {
    console.log("Error while creating container", error)
   }
}