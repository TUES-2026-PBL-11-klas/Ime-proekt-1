"use client";

import { getOverdueLoans } from "@/actions/loan/getOverdueLoans";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { GetOverdueLoansResponseType } from "@/schemas/loan/loans";

export const getOverdueLoansClient = async (): Promise<ServerActionResponse<GetOverdueLoansResponseType>> => {
    const result = await getOverdueLoans();

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
