"use client";

import { returnLoan } from "@/actions/loan/returnLoan";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { ReturnLoanResponseType } from "@/schemas/loan/loans";

export const returnLoanClient = async (loanId: number): Promise<ServerActionResponse<ReturnLoanResponseType>> => {
    const result = await returnLoan(loanId);

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    } else {
        toast({
            title: "Success",
            description: "Book returned successfully.",
        });
    }

    return result;
};
