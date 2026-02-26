"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { GetBooksResponseType } from "@/schemas/book/getBooks";
import { getBooksService } from "@/services/book/getBooksService";

export const getBooks = async (): Promise<ServerActionResponse<GetBooksResponseType>> => {
    return getBooksService();
};
