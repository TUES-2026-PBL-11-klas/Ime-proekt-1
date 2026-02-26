"use server";

import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import {
    DeleteBookRequestSchema,
    DeleteBookRequestType,
    DeleteBookResponseType,
} from "@/schemas/book/deleteBook";
import { deleteBookService } from "@/services/book/deleteBookService";

export async function deleteBook(
    payload: FormData | DeleteBookRequestType
): Promise<ServerActionResponse<DeleteBookResponseType>> {
    try {
        const data =
            payload instanceof FormData
                ? {
                      id: Number(payload.get("id")),
                  }
                : payload;

        const validatedData = DeleteBookRequestSchema.safeParse(data);
        if (!validatedData.success) {
            const errorMessages = validatedData.error.issues
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join(", ");

            return {
                success: false,
                message: errorMessages,
            };
        }

        return deleteBookService(validatedData.data);
    } catch (_error) {
        return {
            success: false,
            message: DEFAULT_ERROR_MESSAGE,
        };
    }
}
