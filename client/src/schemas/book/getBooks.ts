import z from "zod";

export const BookObjectSchema = z.object({
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

export type BookObjectType = z.infer<typeof BookObjectSchema>;

export const GetBooksResponseSchema = z.array(BookObjectSchema);

export type GetBooksResponseType = z.infer<typeof GetBooksResponseSchema>;
