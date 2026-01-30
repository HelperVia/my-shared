/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769775313759-018nx
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
