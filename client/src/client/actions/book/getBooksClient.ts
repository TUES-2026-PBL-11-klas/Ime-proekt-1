"use client";

import { getBooks } from "@/actions/book/getBooks";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { GetBooksResponseType } from "@/schemas/book/getBooks";

export const getBooksClient = async (): Promise<ServerActionResponse<GetBooksResponseType>> => {
    const result = await getBooks();

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
