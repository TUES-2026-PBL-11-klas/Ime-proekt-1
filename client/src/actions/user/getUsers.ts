"use server"

import { ServerActionResponse } from "@/schemas/actions"
import { UserResponseType } from "@/schemas/user/getUsers"
import { getUsersService } from "@/services/user/getUsersService"

export const getUsers = async (): Promise<ServerActionResponse<UserResponseType>> => {
    return getUsersService()
}