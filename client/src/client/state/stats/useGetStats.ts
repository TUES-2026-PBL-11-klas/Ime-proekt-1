"use client";

import { getStatsClient } from "@/client/actions/stats/getStatsClient";
import { StatsResponseType, RecentLoanType } from "@/schemas/stats/stats";
import { useEffect, useState } from "react";

export const useGetStats = () => {
    const [stats, setStats] = useState<StatsResponseType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const result = await getStatsClient();

            if (result.success && result.data) {
                setStats(result.data);
            }
            setLoading(false);
        };

        fetchStats();
    }, []);

    return {
        totalUsers: stats?.totalUsers ?? 0,
        totalBooks: stats?.totalBooks ?? 0,
        activeLoans: stats?.activeLoans ?? 0,
        overdueLoans: stats?.overdueLoans ?? 0,
        recentLoans: (stats?.recentLoans ?? []) as RecentLoanType[],
        loading,
    };
};
