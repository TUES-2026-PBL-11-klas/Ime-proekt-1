import { ApiResponse } from "@/schemas/api";
import { LoginRequestType, LoginResponseSchema, LoginResponseType } from "@/schemas/user/login";
import { http } from "../http";

export const loginApi = async (data: LoginRequestType): Promise<ApiResponse<LoginResponseType>> => {
    return http<LoginResponseType>({
        method: "POST",
        path: "/users/login",
        options: {
            body: data
        },
        schema: LoginResponseSchema
    })
}
