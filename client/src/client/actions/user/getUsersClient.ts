"use client"

import { toast } from "@/components/ui/use-toast"
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error"
import { ServerActionResponse } from "@/schemas/actions"
import { UserResponseType } from "@/schemas/user/getUsers"

export const getUsersClient = async (): Promise<ServerActionResponse<UserResponseType>> => {
    // TODO: call server action
    const result: ServerActionResponse<UserResponseType> = {
        success: false
    }

    if(!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive"
        })
    }

    return result
}