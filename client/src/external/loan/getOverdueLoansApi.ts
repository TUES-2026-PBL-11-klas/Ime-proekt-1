import { ApiResponse } from "@/schemas/api";
import { GetOverdueLoansResponseSchema, GetOverdueLoansResponseType } from "@/schemas/loan/loans";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const getOverdueLoansApi = async (): Promise<ApiResponse<GetOverdueLoansResponseType>> => {
    const token = await getAuthCookie();

    return http<GetOverdueLoansResponseType>({
        method: "GET",
        path: "/loans/overdue",
        schema: GetOverdueLoansResponseSchema,
        token,
    });
};
