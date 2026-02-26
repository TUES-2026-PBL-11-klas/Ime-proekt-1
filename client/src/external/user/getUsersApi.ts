import { ApiResponse } from "@/schemas/api";
import { http } from "../http";
import { UserResponseSchema, UserResponseType } from "@/schemas/user/getUsers";

export const loginApi = async (): Promise<ApiResponse<UserResponseType>> => {
    return http<UserResponseType>({
        method: "GET",
        path: "/users/",
        schema: UserResponseSchema
    })
}
