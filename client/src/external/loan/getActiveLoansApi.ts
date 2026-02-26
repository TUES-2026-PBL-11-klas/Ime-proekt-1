import { ApiResponse } from "@/schemas/api";
import { GetActiveLoansResponseSchema, GetActiveLoansResponseType } from "@/schemas/loan/loans";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const getActiveLoansApi = async (): Promise<ApiResponse<GetActiveLoansResponseType>> => {
    const token = await getAuthCookie();

    return http<GetActiveLoansResponseType>({
        method: "GET",
        path: "/loans/active",
        schema: GetActiveLoansResponseSchema,
        token,
    });
};
