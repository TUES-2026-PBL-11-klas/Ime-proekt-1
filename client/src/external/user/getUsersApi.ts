import { ApiResponse } from "@/schemas/api";
import { http } from "../http";
import { UserResponseSchema, UserResponseType } from "@/schemas/user/getUsers";
import { getAuthCookie } from "@/lib/cookies";

export const getUsersApi = async (): Promise<ApiResponse<UserResponseType>> => {
    const token = await getAuthCookie()
    
    return http<UserResponseType>({
        method: "GET",
        path: "/users/",
        schema: UserResponseSchema,
        token
    })
}
