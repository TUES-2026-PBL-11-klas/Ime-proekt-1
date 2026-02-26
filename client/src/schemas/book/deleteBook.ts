import z from "zod";

export const DeleteBookResponseSchema = z.object({
    message: z.string(),
});

export type DeleteBookResponseType = z.infer<typeof DeleteBookResponseSchema>;

export const DeleteBookRequestSchema = z.object({
    id: z.number().int().positive(),
});

export type DeleteBookRequestType = z.infer<typeof DeleteBookRequestSchema>;
