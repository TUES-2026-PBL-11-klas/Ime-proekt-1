"use client";

import { createBook } from "@/actions/book/createBook";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import {
    CreateBookRequestType,
    CreateBookResponseType,
} from "@/schemas/book/createBook";

export const createBookClient = async (
    data: CreateBookRequestType
): Promise<ServerActionResponse<CreateBookResponseType>> => {
    const result = await createBook(data);

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
