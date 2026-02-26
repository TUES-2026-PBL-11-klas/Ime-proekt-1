"use server";

import { removeAuthCookie } from "@/lib/cookies";
import { redirect } from "next/navigation";

export const logout = async () => {
    await removeAuthCookie();
    redirect("/login");
};
