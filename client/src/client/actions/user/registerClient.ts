"use client"

import { registerUser } from "@/actions/user/register";
import { ServerActionResponse } from "@/schemas/actions"
import { RegisterResponseType } from "@/schemas/user/register"

export const registerUserClient = async (formData: FormData): Promise<ServerActionResponse<RegisterResponseType>> => {
    const result = await registerUser(formData);

    if(result.success) {
        // TODO toast
    }

    return result
}