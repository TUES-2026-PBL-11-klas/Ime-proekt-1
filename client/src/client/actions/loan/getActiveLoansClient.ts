"use client";

import { getActiveLoans } from "@/actions/loan/getActiveLoans";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { GetActiveLoansResponseType } from "@/schemas/loan/loans";

export const getActiveLoansClient = async (): Promise<ServerActionResponse<GetActiveLoansResponseType>> => {
    const result = await getActiveLoans();

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
