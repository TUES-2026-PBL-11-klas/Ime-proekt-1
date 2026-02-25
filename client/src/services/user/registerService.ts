import { registerApi } from "@/external/user/registerApi";
import { ServerActionResponse } from "@/schemas/actions";
import { RegisterRequestType, RegisterResponseType } from "@/schemas/user/register";

export const registerUserService = async (data: RegisterRequestType): Promise<ServerActionResponse<RegisterResponseType>> => {
    const requestPayload = {
        username: data.username,
        email: data.email,
        password: data.password
    }

    const result = await registerApi(requestPayload);
    
    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    }
    
    return {
        success: false,
        message: result.error,
    };
}