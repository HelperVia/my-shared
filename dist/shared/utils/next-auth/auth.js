/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769761005363-94pr4h
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
export const getAuthToken = (req, cookieName, secret) => {
    return getToken({
        req,
        secret: secret || process.env.NEXTAUTH_SECRET || "",
        ...(cookieName ? { cookieName: cookieName } : {}),
    });
};
export const getSessionCookieName = (authOptions) => {
    return authOptions.cookies?.sessionToken?.name;
};
export const getSession = async (authOptions) => {
    const session = await getServerSession(authOptions);
    return session;
};
