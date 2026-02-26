import { getStatsApi } from "@/external/stats/getStatsApi";
import { ServerActionResponse } from "@/schemas/actions";
import { StatsResponseType } from "@/schemas/stats/stats";

export const getStatsService = async (): Promise<ServerActionResponse<StatsResponseType>> => {
    const result = await getStatsApi();

    if (result.success) {
        return { success: true, data: result.data };
    }

    return { success: false, message: result.message };
};
