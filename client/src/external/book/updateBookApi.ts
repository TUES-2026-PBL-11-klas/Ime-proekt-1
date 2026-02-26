import { getAuthCookie } from "@/lib/cookies";
import { ApiResponse } from "@/schemas/api";
import {
    UpdateBookRequestType,
    UpdateBookResponseSchema,
    UpdateBookResponseType,
} from "@/schemas/book/updateBook";
import { http } from "../http";

export const updateBookApi = async (
    data: UpdateBookRequestType
): Promise<ApiResponse<UpdateBookResponseType>> => {
    const token = await getAuthCookie();

    return http<UpdateBookResponseType>({
        method: "PUT",
        path: `/books/${data.id}`,
        options: {
            body: data,
        },
        schema: UpdateBookResponseSchema,
        token,
    });
};
