import { getActiveLoansApi } from "@/external/loan/getActiveLoansApi";
import { ServerActionResponse } from "@/schemas/actions";
import { GetActiveLoansResponseType } from "@/schemas/loan/loans";

export const getActiveLoansService = async (): Promise<ServerActionResponse<GetActiveLoansResponseType>> => {
    const result = await getActiveLoansApi();

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
