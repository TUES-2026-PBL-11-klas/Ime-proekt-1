import { getAuthCookie } from "./cookies"
import { decodeJWT } from "./token"

export const isUserAdmin = async (): Promise<boolean> => {
    const token = await getAuthCookie()
    if(!token) return false

    const payload = decodeJWT(token)

    if(payload && payload?.role && payload?.role === "admin") return true
    return false
}