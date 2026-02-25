"use client"

import { loginUser } from "@/actions/user/login";
import { ServerActionResponse } from "@/schemas/actions"
import { LoginResponseType } from "@/schemas/user/login"
import { toast } from "@/components/ui/use-toast"

export const loginUserClient = async (formData: FormData): Promise<ServerActionResponse<LoginResponseType>> => {
    const result = await loginUser(formData);

    if(result.success) {
        toast({
            title: "Success!",
            description: "You successfully logged in to Library MS."
        })
    }

    return result
}
