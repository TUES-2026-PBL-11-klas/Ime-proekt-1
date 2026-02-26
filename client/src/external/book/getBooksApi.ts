import { ApiResponse } from "@/schemas/api";
import { GetBooksResponseSchema, GetBooksResponseType } from "@/schemas/book/getBooks";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const getBooksApi = async (): Promise<ApiResponse<GetBooksResponseType>> => {
    const token = await getAuthCookie()
    
    return http<GetBooksResponseType>({
        method: "GET",
        path: "/books/",
        schema: GetBooksResponseSchema,
        token
    });
};
