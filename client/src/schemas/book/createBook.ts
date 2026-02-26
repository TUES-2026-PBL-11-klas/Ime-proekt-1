import z from "zod";

export const CreateBookResponseSchema = z.object({
    id: z.number().int().positive(),
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    isbn: z.string().nullable(),
    publishedYear: z.number().int().nullable(),
    copies: z.number().int().positive(),
    available: z.number().int().nonnegative(),
    createdAt: z.string(),
});

export type CreateBookResponseType = z.infer<typeof CreateBookResponseSchema>;

export const CreateBookRequestSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    isbn: z.string().optional(),
});

export type CreateBookRequestType = z.infer<typeof CreateBookRequestSchema>;
