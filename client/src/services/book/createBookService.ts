import { createBookApi } from "@/external/book/createBookApi";
import { ServerActionResponse } from "@/schemas/actions";
import {
    CreateBookRequestType,
    CreateBookResponseType,
} from "@/schemas/book/createBook";

export const createBookService = async (
    data: CreateBookRequestType
): Promise<ServerActionResponse<CreateBookResponseType>> => {
    const result = await createBookApi(data);

    if (result.success) {
        return {
            success: true,
            data: result.data,
        };
    }

    return {
        success: false,
        message: result.message,
    };
};
