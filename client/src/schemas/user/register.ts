import z from "zod";

export const RegisterResponseSchema = z.object({
    id: z.number().int().positive(),
    username: z.string(),
    email: z.string().email(),
    role: z.enum(["user", "admin"]),
    createdAt: z.string().datetime(),
});

export type RegisterResponseType = z.infer<typeof RegisterResponseSchema>


export const RegisterRequestSchema = z.object({
    username: z.string()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(100, "Username must not exceed 100 characters"),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email format"),
    password: z.string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(128, "Password must not exceed 128 characters"),
    confirmPassword: z.string()
        .min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error to confirmPassword field
});

export type RegisterRequestType = z.infer<typeof RegisterRequestSchema>