import { returnLoanApi } from "@/external/loan/returnLoanApi";
import { ServerActionResponse } from "@/schemas/actions";
import { ReturnLoanResponseType } from "@/schemas/loan/loans";

export const returnLoanService = async (loanId: number): Promise<ServerActionResponse<ReturnLoanResponseType>> => {
    const result = await returnLoanApi(loanId);

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
