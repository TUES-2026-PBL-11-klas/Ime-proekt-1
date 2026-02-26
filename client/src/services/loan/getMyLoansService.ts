import { getMyLoansApi } from "@/external/loan/getMyLoansApi";
import { ServerActionResponse } from "@/schemas/actions";
import { GetMyLoansResponseType } from "@/schemas/loan/loans";

export const getMyLoansService = async (): Promise<ServerActionResponse<GetMyLoansResponseType>> => {
    const result = await getMyLoansApi();

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
