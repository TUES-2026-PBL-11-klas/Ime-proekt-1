"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { UpdateUserRoleResponseType } from "@/schemas/user/updateUserRole";
import { updateUserRoleService } from "@/services/user/updateUserRoleService";

export const updateUserRole = async (userId: number, role: string): Promise<ServerActionResponse<UpdateUserRoleResponseType>> => {
    return updateUserRoleService(userId, role);
};
