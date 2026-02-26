"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { GetOverdueLoansResponseType } from "@/schemas/loan/loans";
import { getOverdueLoansService } from "@/services/loan/getOverdueLoansService";

export const getOverdueLoans = async (): Promise<ServerActionResponse<GetOverdueLoansResponseType>> => {
    return getOverdueLoansService();
};
