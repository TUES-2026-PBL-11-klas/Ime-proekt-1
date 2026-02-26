"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { ReturnLoanResponseType } from "@/schemas/loan/loans";
import { returnLoanService } from "@/services/loan/returnLoanService";

export const returnLoan = async (loanId: number): Promise<ServerActionResponse<ReturnLoanResponseType>> => {
    return returnLoanService(loanId);
};
