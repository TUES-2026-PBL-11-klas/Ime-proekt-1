"use server";

import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import {
    CreateBookRequestSchema,
    CreateBookRequestType,
    CreateBookResponseType,
} from "@/schemas/book/createBook";
import { createBookService } from "@/services/book/createBookService";

export async function createBook(
    payload: FormData | CreateBookRequestType
): Promise<ServerActionResponse<CreateBookResponseType>> {
    try {
        const data =
            payload instanceof FormData
                ? {
                      title: payload.get("title"),
                      author: payload.get("author"),
                      genre: payload.get("genre"),
                      isbn: payload.get("isbn"),
                  }
                : payload;

        const validatedData = CreateBookRequestSchema.safeParse(data);
        if (!validatedData.success) {
            const errorMessages = validatedData.error.issues
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            return {
                success: false,
                message: errorMessages,
            };
        }

        return createBookService(validatedData.data);
    } catch (_error) {
        return {
            success: false,
            message: DEFAULT_ERROR_MESSAGE,
        };
    }
}
