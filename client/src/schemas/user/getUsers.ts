import z from "zod";

export const UserObjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.enum(["admin", "user"]),
    registeredDate: z.string()
})

export type UserObjectType = z.infer<typeof UserObjectSchema>

export const UserResponseSchema = z.array(UserObjectSchema)

export type UserResponseType = z.infer<typeof UserResponseSchema>