import child_process from "child_process";
import util from "util";
import fs from "fs/promises"
import uuid4 from "uuid4"
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";

const execPromisified = util.promisify(child_process.exec)

export const createProjectController = async (req, res) => {

    // Create a unique id and then inside the project folder create a new folder with that id
    const projectId = uuid4()
    console.log("projectId", projectId)

    await fs.mkdir(`./projects/${projectId}`)

    // After this call the npm create vite command in the newly created project folder

    const response = await execPromisified(REACT_PROJECT_COMMAND, {
        cwd: `./projects/${projectId}`
    })

    return res.json({message: "Project created", data: projectId})
};
 