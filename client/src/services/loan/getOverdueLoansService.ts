import { getOverdueLoansApi } from "@/external/loan/getOverdueLoansApi";
import { ServerActionResponse } from "@/schemas/actions";
import { GetOverdueLoansResponseType } from "@/schemas/loan/loans";

export const getOverdueLoansService = async (): Promise<ServerActionResponse<GetOverdueLoansResponseType>> => {
    const result = await getOverdueLoansApi();

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
