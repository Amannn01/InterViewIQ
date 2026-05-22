import axios from "axios"
import { ServerUrl } from "../App"

const axiosInstance = axios.create({
    baseURL: ServerUrl
})

// attach token to every request automatically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axiosInstance