import { getUsersApi } from "@/external/user/getUsersApi";
import { ServerActionResponse } from "@/schemas/actions";
import { UserResponseType } from "@/schemas/user/getUsers";

export const getUsersService = async (): Promise<ServerActionResponse<UserResponseType>> => {
    const result = await getUsersApi();
    
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
