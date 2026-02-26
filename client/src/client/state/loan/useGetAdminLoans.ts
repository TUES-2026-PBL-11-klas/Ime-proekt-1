"use client";

import { getActiveLoansClient } from "@/client/actions/loan/getActiveLoansClient";
import { getOverdueLoansClient } from "@/client/actions/loan/getOverdueLoansClient";
import { returnLoanClient } from "@/client/actions/loan/returnLoanClient";
import { LoanObjectType } from "@/schemas/loan/loans";
import { useEffect, useState } from "react";

export const useGetAdminLoans = () => {
    const [activeLoans, setActiveLoans] = useState<LoanObjectType[]>([]);
    const [overdueLoans, setOverdueLoans] = useState<LoanObjectType[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const fetchLoans = async () => {
        setLoading(true);
        const [activeResult, overdueResult] = await Promise.all([
            getActiveLoansClient(),
            getOverdueLoansClient(),
        ]);

        if (activeResult.success && activeResult.data) {
            setActiveLoans(activeResult.data);
        }
        if (overdueResult.success && overdueResult.data) {
            setOverdueLoans(overdueResult.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLoans();
    }, []);

    // Merge active and overdue, mark overdue ones
    const allLoans = [
        ...overdueLoans.map((l) => ({ ...l, displayStatus: "overdue" as const })),
        ...activeLoans
            .filter((al) => !overdueLoans.some((ol) => ol.id === al.id))
            .map((l) => ({ ...l, displayStatus: "active" as const })),
    ];

    const filtered = allLoans
        .filter((l) => filter === "all" || l.displayStatus === filter)
        .filter(
            (l) =>
                (l.username?.toLowerCase() ?? "").includes(search.toLowerCase()) ||
                (l.book_title?.toLowerCase() ?? "").includes(search.toLowerCase())
        );

    const handleReturn = async (loanId: number) => {
        const result = await returnLoanClient(loanId);
        if (result.success) {
            // Remove from active/overdue lists
            setActiveLoans((prev) => prev.filter((l) => l.id !== loanId));
            setOverdueLoans((prev) => prev.filter((l) => l.id !== loanId));
        }
    };

    return {
        loans: filtered,
        search,
        setSearch,
        filter,
        setFilter,
        handleReturn,
        loading,
    };
};
