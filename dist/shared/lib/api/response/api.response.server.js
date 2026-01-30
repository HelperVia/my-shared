/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769776137052-2uy09
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { NextResponse } from "next/server";
export const ApiResponseServer = async (response, options) => {
    const { cookie = false } = options;
    const nextResponse = NextResponse.json(response?.data, {
        status: response?.status || 200,
    });
    if (cookie) {
        const setCookies = response.headers?.["set-cookie"];
        if (Array.isArray(setCookies)) {
            setCookies.forEach((cookieStr) => {
                nextResponse.headers.append("Set-Cookie", cookieStr);
            });
        }
    }
    return nextResponse;
};
