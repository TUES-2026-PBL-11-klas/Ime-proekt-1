"use client";

import { getStats } from "@/actions/stats/getStats";
import { toast } from "@/components/ui/use-toast";
import { DEFAULT_ERROR_MESSAGE } from "@/domain/error";
import { ServerActionResponse } from "@/schemas/actions";
import { StatsResponseType } from "@/schemas/stats/stats";

export const getStatsClient = async (): Promise<ServerActionResponse<StatsResponseType>> => {
    const result = await getStats();

    if (!result.success) {
        toast({
            title: "Error",
            description: result.message ?? DEFAULT_ERROR_MESSAGE,
            variant: "destructive",
        });
    }

    return result;
};
