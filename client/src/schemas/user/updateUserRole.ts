import z from "zod";

export const UpdateUserRoleRequestSchema = z.object({
    role: z.enum(["admin", "user"]),
});
export type UpdateUserRoleRequestType = z.infer<typeof UpdateUserRoleRequestSchema>;

export const UpdateUserRoleResponseSchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    role: z.enum(["admin", "user"]),
    created_at: z.string(),
});
export type UpdateUserRoleResponseType = z.infer<typeof UpdateUserRoleResponseSchema>;
