import { ApiResponse } from "@/schemas/api";
import { BorrowBookResponseSchema, BorrowBookResponseType } from "@/schemas/loan/loans";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const borrowBookApi = async (bookId: number): Promise<ApiResponse<BorrowBookResponseType>> => {
    const token = await getAuthCookie();

    return http<BorrowBookResponseType>({
        method: "POST",
        path: "/loans",
        schema: BorrowBookResponseSchema,
        token,
        options: {
            body: { bookId },
        },
    });
};
