"use client";

import { deleteBook } from "@/actions/book/deleteBook";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import {
    DeleteBookRequestType,
    DeleteBookResponseType,
} from "@/schemas/book/deleteBook";

export const deleteBookClient = async (
    data: DeleteBookRequestType
): Promise<ServerActionResponse<DeleteBookResponseType>> => {
    const result = await deleteBook(data);

    toast({
        title: result.success ? "Success" : "Error",
        description: result.message ?? (result.success ? "Book deleted successfully" : DEFAULT_ERROR_MESSAGE)
    })

    return result;
};
