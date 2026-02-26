"use server";

import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import {
    UpdateBookRequestSchema,
    UpdateBookRequestType,
    UpdateBookResponseType,
} from "@/schemas/book/updateBook";
import { updateBookService } from "@/services/book/updateBookService";

export async function updateBook(
    payload: FormData | UpdateBookRequestType
): Promise<ServerActionResponse<UpdateBookResponseType>> {
    try {
        const data =
            payload instanceof FormData
                ? {
                      id: Number(payload.get("id")),
                      title: payload.get("title"),
                      author: payload.get("author"),
                      genre: payload.get("genre"),
                      isbn: payload.get("isbn"),
                  }
                : payload;

        const validatedData = UpdateBookRequestSchema.safeParse(data);
        if (!validatedData.success) {
            const errorMessages = validatedData.error.issues
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            return {
                success: false,
                message: errorMessages,
            };
        }

        return updateBookService(validatedData.data);
    } catch (_error) {
        return {
            success: false,
            message: DEFAULT_ERROR_MESSAGE,
        };
    }
}
