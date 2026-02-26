"use client";

import { updateBook } from "@/actions/book/updateBook";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import {
    UpdateBookRequestType,
    UpdateBookResponseType,
} from "@/schemas/book/updateBook";

export const updateBookClient = async (
    data: UpdateBookRequestType
): Promise<ServerActionResponse<UpdateBookResponseType>> => {
    const result = await updateBook(data);

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
