import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"

export const TOKEN_KEY = `interv_user_token`

export function getToken() {
    return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
    Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
    Cookies.remove(TOKEN_KEY)
}

export function decodeToken() {
    const token = getToken()
    if (Boolean(token)) {
        return jwtDecode(token)
    }
}