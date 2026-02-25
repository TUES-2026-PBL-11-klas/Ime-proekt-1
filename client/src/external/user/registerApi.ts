import { ApiResponse } from "@/schemas/api";
import { RegisterRequestType, RegisterResponseSchema, RegisterResponseType } from "@/schemas/user/register";
import { http } from "../http";

export const registerApi = async (data: Omit<RegisterRequestType, 'confirmPassword'>): Promise<ApiResponse<RegisterResponseType>> => {
    return http<RegisterResponseType>({
        method: "POST",
        path: "/users/register",
        options: {
            body: data
        },
        schema: RegisterResponseSchema
    })
}