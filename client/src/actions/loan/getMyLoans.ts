"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { GetMyLoansResponseType } from "@/schemas/loan/loans";
import { getMyLoansService } from "@/services/loan/getMyLoansService";

export const getMyLoans = async (): Promise<ServerActionResponse<GetMyLoansResponseType>> => {
    return getMyLoansService();
};
