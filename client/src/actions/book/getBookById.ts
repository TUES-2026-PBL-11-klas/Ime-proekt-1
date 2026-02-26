"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { BookObjectType } from "@/schemas/book/getBooks";
import { getBookByIdService } from "@/services/book/getBookByIdService";

export const getBookById = async (id: number): Promise<ServerActionResponse<BookObjectType>> => {
    return getBookByIdService(id);
};
