import z from "zod";

export const UserObjectSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    role: z.enum(["admin", "user"]),
    created_at: z.string()
})

export type UserObjectType = z.infer<typeof UserObjectSchema>

export const UserResponseSchema = z.array(UserObjectSchema)

export type UserResponseType = z.infer<typeof UserResponseSchema>