import axios from "../config/axiosConfig.js"

export const createProjectApi = async()=>{
    try {
        const response = await axios.post(`/api/v1/projects`);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}