import { ApiResponse } from "@/schemas/api";
import { BookObjectSchema, BookObjectType } from "@/schemas/book/getBooks";
import { http } from "../http";

export const getBookByIdApi = async (id: number): Promise<ApiResponse<BookObjectType>> => {
    return http<BookObjectType>({
        method: "GET",
        path: `/books/${id}`,
        schema: BookObjectSchema,
    });
};
