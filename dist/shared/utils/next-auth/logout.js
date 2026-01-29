/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769719902629-vxp0s
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

"use server";
import { cookies } from "next/headers";
import { getSessionCookieName } from "./auth";
export const Logout = async (authOptions) => {
    const cookie = await cookies();
    const cookieName = getSessionCookieName(authOptions) ?? "";
    cookie.delete(cookieName);
};
