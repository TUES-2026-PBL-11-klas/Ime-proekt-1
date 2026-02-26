"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { BorrowBookResponseType } from "@/schemas/loan/loans";
import { borrowBookService } from "@/services/loan/borrowBookService";

export const borrowBook = async (bookId: number): Promise<ServerActionResponse<BorrowBookResponseType>> => {
    return borrowBookService(bookId);
};
