"use server"

import { ServerActionResponse } from "@/schemas/actions"
import { UserResponseType } from "@/schemas/user/getUsers"

export const getUsers = async (): Promise<ServerActionResponse<UserResponseType>> => {
    return {
        success: false
    }
}