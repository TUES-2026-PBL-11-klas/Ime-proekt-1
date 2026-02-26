"use client";

import { updateUserRole } from "@/actions/user/updateUserRole";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { UpdateUserRoleResponseType } from "@/schemas/user/updateUserRole";

export const updateUserRoleClient = async (userId: number, role: string): Promise<ServerActionResponse<UpdateUserRoleResponseType>> => {
    const result = await updateUserRole(userId, role);

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Success",
            description: `User role updated to ${role}.`,
        });
    }

    return result;
};
