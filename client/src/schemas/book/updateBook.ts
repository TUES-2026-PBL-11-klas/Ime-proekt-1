import z from "zod";
import { BookObjectSchema } from "./getBooks";

export const UpdateBookResponseSchema = BookObjectSchema;

export type UpdateBookResponseType = z.infer<typeof UpdateBookResponseSchema>;

export const UpdateBookRequestSchema = z.object({
    id: z.number().int().positive(),
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    genre: z.string().min(1, "Genre is required"),
    isbn: z.string().optional(),
});

export type UpdateBookRequestType = z.infer<typeof UpdateBookRequestSchema>;
