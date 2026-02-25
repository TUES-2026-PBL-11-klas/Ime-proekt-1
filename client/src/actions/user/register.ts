"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { RegisterRequestSchema } from "@/schemas/user/register";
import type { RegisterRequestType, RegisterResponseType } from "@/schemas/user/register";

export async function registerUser(formData: FormData | RegisterRequestType): Promise<ServerActionResponse<RegisterResponseType>> {
    try {
        // Extract data from FormData if it's FormData, otherwise use the object directly
        const data = formData instanceof FormData
        ? {
            username: formData.get("username") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
        }
        : formData;

        // Validate input with Zod schema
        const validatedData = RegisterRequestSchema.safeParse(data);
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

        // TODO: Call service to register user
        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            message: "An unknown error occurred",
        };
    }
}