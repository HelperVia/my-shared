"use server";
import { cookies } from "next/headers";
import { getSessionCookieName } from "./auth";
export const Logout = async (authOptions) => {
    const cookie = await cookies();
    const cookieName = getSessionCookieName(authOptions) ?? "";
    cookie.delete(cookieName);
};
//# sourceMappingURL=logout.js.map