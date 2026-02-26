import { getBookByIdApi } from "@/external/book/getBookByIdApi";
import { ServerActionResponse } from "@/schemas/actions";
import { BookObjectType } from "@/schemas/book/getBooks";

export const getBookByIdService = async (id: number): Promise<ServerActionResponse<BookObjectType>> => {
    const result = await getBookByIdApi(id);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
