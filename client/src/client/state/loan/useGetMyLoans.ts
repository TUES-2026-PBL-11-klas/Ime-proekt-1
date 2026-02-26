"use client";

import { getMyLoansClient } from "@/client/actions/loan/getMyLoansClient";
import { LoanObjectType } from "@/schemas/loan/loans";
import { useEffect, useState } from "react";

export const useGetMyLoans = () => {
    const [loans, setLoans] = useState<LoanObjectType[]>([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            setLoading(true);
            const result = await getMyLoansClient();

            if (result.success && result.data) {
                setLoans(result.data);
            }
            setLoading(false);
        };

        fetchLoans();
    }, []);

    const filtered = loans.filter((l) => {
        if (filter === "all") return true;
        if (filter === "overdue") {
            return l.status === "active" && new Date(l.due_date) < new Date();
        }
        return l.status === filter;
    });

    return {
        loans: filtered,
        filter,
        setFilter,
        loading,
    };
};
