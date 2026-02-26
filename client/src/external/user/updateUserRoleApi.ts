import { ApiResponse } from "@/schemas/api";
import { UpdateUserRoleResponseSchema, UpdateUserRoleResponseType } from "@/schemas/user/updateUserRole";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const updateUserRoleApi = async (userId: number, role: string): Promise<ApiResponse<UpdateUserRoleResponseType>> => {
    const token = await getAuthCookie();

    return http<UpdateUserRoleResponseType>({
        method: "PUT",
        path: `/users/${userId}/role`,
        schema: UpdateUserRoleResponseSchema,
        token,
        options: {
            body: { role },
        },
    });
};
