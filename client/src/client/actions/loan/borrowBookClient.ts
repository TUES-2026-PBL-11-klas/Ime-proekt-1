"use client";

import { borrowBook } from "@/actions/loan/borrowBook";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { BorrowBookResponseType } from "@/schemas/loan/loans";

export const borrowBookClient = async (bookId: number): Promise<ServerActionResponse<BorrowBookResponseType>> => {
    const result = await borrowBook(bookId);

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Success",
            description: "Book borrowed successfully.",
        });
    }

    return result;
};
