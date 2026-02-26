"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { GetActiveLoansResponseType } from "@/schemas/loan/loans";
import { getActiveLoansService } from "@/services/loan/getActiveLoansService";

export const getActiveLoans = async (): Promise<ServerActionResponse<GetActiveLoansResponseType>> => {
    return getActiveLoansService();
};
