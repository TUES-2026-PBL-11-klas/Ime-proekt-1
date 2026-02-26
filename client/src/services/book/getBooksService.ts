import { getBooksApi } from "@/external/book/getBooksApi";
import { ServerActionResponse } from "@/schemas/actions";
import { GetBooksResponseType } from "@/schemas/book/getBooks";

export const getBooksService = async (): Promise<ServerActionResponse<GetBooksResponseType>> => {
    const result = await getBooksApi();

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
