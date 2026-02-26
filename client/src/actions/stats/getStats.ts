"use server";

import { ServerActionResponse } from "@/schemas/actions";
import { StatsResponseType } from "@/schemas/stats/stats";
import { getStatsService } from "@/services/stats/getStatsService";

export const getStats = async (): Promise<ServerActionResponse<StatsResponseType>> => {
    return getStatsService();
};
