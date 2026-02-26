import { getAuthCookie } from "@/lib/cookies";
import { ApiResponse } from "@/schemas/api";
import {
    CreateBookRequestType,
    CreateBookResponseSchema,
    CreateBookResponseType,
} from "@/schemas/book/createBook";
import { http } from "../http";

export const createBookApi = async (
    data: CreateBookRequestType
): Promise<ApiResponse<CreateBookResponseType>> => {
    const token = await getAuthCookie();

    return http<CreateBookResponseType>({
        method: "POST",
        path: "/books/",
        options: {
            body: data
        },
        schema: CreateBookResponseSchema,
        token,
    });
};
