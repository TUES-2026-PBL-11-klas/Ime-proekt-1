import { updateBookApi } from "@/external/book/updateBookApi";
import { ServerActionResponse } from "@/schemas/actions";
import {
    UpdateBookRequestType,
    UpdateBookResponseType,
} from "@/schemas/book/updateBook";

export const updateBookService = async (
    data: UpdateBookRequestType
): Promise<ServerActionResponse<UpdateBookResponseType>> => {
    const result = await updateBookApi(data);

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
