import { deleteBookApi } from "@/external/book/deleteBookApi";
import { ServerActionResponse } from "@/schemas/actions";
import {
    DeleteBookRequestType,
    DeleteBookResponseType,
} from "@/schemas/book/deleteBook";

export const deleteBookService = async (
    data: DeleteBookRequestType
): Promise<ServerActionResponse<DeleteBookResponseType>> => {
    const result = await deleteBookApi(data);

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
