import { ApiResponse } from "@/schemas/api";
import { StatsResponseSchema, StatsResponseType } from "@/schemas/stats/stats";
import { http } from "../http";
import { getAuthCookie } from "@/lib/cookies";

export const getStatsApi = async (): Promise<ApiResponse<StatsResponseType>> => {
    const token = await getAuthCookie();

    return http<StatsResponseType>({
        method: "GET",
        path: "/stats",
        schema: StatsResponseSchema,
        token,
    });
};
