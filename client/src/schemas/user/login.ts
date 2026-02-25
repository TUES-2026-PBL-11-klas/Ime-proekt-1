import z from "zod";

export const LoginResponseSchema = z.object({
    token: z.string(),
    user: z.object({
        id: z.number().int().positive(),
        username: z.string(),
        email: z.string().email(),
        role: z.enum(["user", "admin"]),
        createdAt: z.string().datetime(),
    }),
});

export type LoginResponseType = z.infer<typeof LoginResponseSchema>


export const LoginRequestSchema = z.object({
    username: z.string()
        .min(1, "Username is required"),
    password: z.string()
        .min(1, "Password is required")
});

export type LoginRequestType = z.infer<typeof LoginRequestSchema>
