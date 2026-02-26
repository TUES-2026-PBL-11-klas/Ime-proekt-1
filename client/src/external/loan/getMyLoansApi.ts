import { ApiResponse } from "@/schemas/api";
import { GetMyLoansResponseSchema, GetMyLoansResponseType } from "@/schemas/loan/loans";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const getMyLoansApi = async (): Promise<ApiResponse<GetMyLoansResponseType>> => {
    const token = await getAuthCookie();

    return http<GetMyLoansResponseType>({
        method: "GET",
        path: "/loans/my",
        schema: GetMyLoansResponseSchema,
        token,
    });
};
