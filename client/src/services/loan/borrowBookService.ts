import { borrowBookApi } from "@/external/loan/borrowBookApi";
import { ServerActionResponse } from "@/schemas/actions";
import { BorrowBookResponseType } from "@/schemas/loan/loans";

export const borrowBookService = async (bookId: number): Promise<ServerActionResponse<BorrowBookResponseType>> => {
    const result = await borrowBookApi(bookId);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
