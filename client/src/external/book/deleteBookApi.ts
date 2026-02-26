import { getAuthCookie } from "@/lib/cookies";
import { ApiResponse } from "@/schemas/api";
import {
    DeleteBookRequestType,
    DeleteBookResponseSchema,
    DeleteBookResponseType,
} from "@/schemas/book/deleteBook";
import { http } from "../http";

export const deleteBookApi = async (
    data: DeleteBookRequestType
): Promise<ApiResponse<DeleteBookResponseType>> => {
    const token = await getAuthCookie();

    return http<DeleteBookResponseType>({
        method: "DELETE",
        path: `/books/${data.id}`,
        schema: DeleteBookResponseSchema,
        token,
    });
};
