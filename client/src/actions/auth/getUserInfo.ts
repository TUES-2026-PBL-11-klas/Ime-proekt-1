"use server";

import { getAuthCookie } from "@/lib/cookies";
import { decodeJWT } from "@/lib/token";

export type UserInfo = {
  id: number;
  role: string;
  username?: string;
} | null;

export const getUserInfo = async (): Promise<UserInfo> => {
  const token = await getAuthCookie();
  if (!token) return null;

  const payload = decodeJWT(token);
  if (!payload) return null;

  return {
    id: payload.id as number,
    role: payload.role as string,
    username: (payload.username as string) ?? undefined,
  };
};
