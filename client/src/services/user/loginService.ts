import { loginApi } from "@/external/user/loginApi";
import { ServerActionResponse } from "@/schemas/actions";
import { LoginRequestType, LoginResponseType } from "@/schemas/user/login";

export const loginUserService = async (data: LoginRequestType): Promise<ServerActionResponse<LoginResponseType>> => {
    const result = await loginApi(data);
    
    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    }
    
    return {
        success: false,
        message: result.message,
    };
}
