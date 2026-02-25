import { ServerActionResponse } from "@/schemas/actions";
import { RegisterRequestType, RegisterResponseType } from "@/schemas/user/register";

export const registerUserService = async (data: RegisterRequestType): Promise<ServerActionResponse<RegisterResponseType>> => {
    const requestPayload = {
        username: data.username,
        email: data.email,
        password: data.password
    }

    // TODO call external layer
    return {
        success: true
    }
}