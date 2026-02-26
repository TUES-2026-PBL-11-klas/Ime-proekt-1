"use server";

import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { LoginRequestSchema } from "@/schemas/user/login";
import type { LoginRequestType, LoginResponseType } from "@/schemas/user/login";
import { loginUserService } from "@/services/user/loginService";
import { setAuthCookie } from "@/lib/cookies";

export async function loginUser(formData: FormData | LoginRequestType): Promise<ServerActionResponse<LoginResponseType>> {
    try {
        // Extract data from FormData if it's FormData, otherwise use the object directly
        const data = formData instanceof FormData
        ? {
            username: formData.get("username"),
            password: formData.get("password"),
        }
        : formData;

        // Validate input with Zod schema
        const validatedData = LoginRequestSchema.safeParse(data);
        if(!validatedData.success) {
            // Format Zod validation errors into a readable message
            const errorMessages = validatedData.error.issues.map(
                (err) => `${err.path.join(".")}: ${err.message}`
            ).join(", ");
            
            return {
                success: false,
                message: errorMessages,
            };
        }

        const result = await loginUserService(validatedData.data);
        
        if (result.success && result.data) {
            await setAuthCookie(result.data.token);
        }
        
        return result;
    } catch (error) {
        return {
            success: false,
            message: DEFAULT_ERROR_MESSAGE,
        };
    }
}
