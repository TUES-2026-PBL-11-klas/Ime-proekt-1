import { updateUserRoleApi } from "@/external/user/updateUserRoleApi";
import { ServerActionResponse } from "@/schemas/actions";
import { UpdateUserRoleResponseType } from "@/schemas/user/updateUserRole";

export const updateUserRoleService = async (userId: number, role: string): Promise<ServerActionResponse<UpdateUserRoleResponseType>> => {
    const result = await updateUserRoleApi(userId, role);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
