"use client"

import { registerUser } from "@/actions/user/register";
import { ServerActionResponse } from "@/schemas/actions"
import { RegisterResponseType } from "@/schemas/user/register"
import { toast } from "@/components/ui/use-toast"

export const registerUserClient = async (formData: FormData): Promise<ServerActionResponse<RegisterResponseType>> => {
    const result = await registerUser(formData);

    if(result.success) {
        toast({
            title: "Success!",
            description: "You successfully registered on Library MS."
        })
    }

    return result
}