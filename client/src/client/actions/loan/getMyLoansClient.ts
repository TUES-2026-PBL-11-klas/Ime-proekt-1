"use client";

import { getMyLoans } from "@/actions/loan/getMyLoans";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { GetMyLoansResponseType } from "@/schemas/loan/loans";

export const getMyLoansClient = async (): Promise<ServerActionResponse<GetMyLoansResponseType>> => {
    const result = await getMyLoans();

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
