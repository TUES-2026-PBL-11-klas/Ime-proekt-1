"use client"

import { getUsers } from "@/actions/user/getUsers"
import { toast } from "@/components/ui/use-toast"
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error"
import { ServerActionResponse } from "@/schemas/actions"
import { UserResponseType } from "@/schemas/user/getUsers"

export const getUsersClient = async (): Promise<ServerActionResponse<UserResponseType>> => {
    // TODO: call server action
    const result = await getUsers()

    if(!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive"
        })
    }

    return result
}