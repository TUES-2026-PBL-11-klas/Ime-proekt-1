import { ApiResponse } from "@/schemas/api";
import { ReturnLoanResponseSchema, ReturnLoanResponseType } from "@/schemas/loan/loans";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const returnLoanApi = async (loanId: number): Promise<ApiResponse<ReturnLoanResponseType>> => {
    const token = await getAuthCookie();

    return http<ReturnLoanResponseType>({
        method: "PUT",
        path: `/loans/${loanId}/return`,
        schema: ReturnLoanResponseSchema,
        token,
    });
};
