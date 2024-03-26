import axios from "axios"
import { getToken } from "./auth"
import { jwtDecode } from "jwt-decode"

export const baseURL = `https://api.interv.co.in`

const axiosInstance = axios.create({
    baseURL
})

axiosInstance.interceptors.request.use(() => {
    const token = getToken()
    if (Boolean(token)) {
        const accessToken = token[`access`]
        const decodedToken = jwtDecode(accessToken)
        const currentTime = Math.floor(Date.now() / 1000)

        if (decodedToken?.exp < currentTime) {
            
        }
    }
}, () => {
    
})