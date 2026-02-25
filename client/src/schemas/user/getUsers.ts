import z from "zod";

export const UserResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["admin", "user"]),
    registeredDate: z.string()
})

export type UserResponseType = z.infer<typeof UserResponseSchema>