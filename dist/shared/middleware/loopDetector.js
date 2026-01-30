/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769774561483-6nhizh
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { NextResponse } from "next/server";
const COOKIE = "X-Redirect-Count";
export async function detectRouteLoop(req, res, options = {}) {
    const { cookieName = COOKIE, maxRedirects = 3, maxAge = 3, redirectUrl = "/error/redirect", } = options;
    let redirectCount = Number(req.cookies.get(cookieName)?.value ?? 0);
    redirectCount++;
    const pathname = req.nextUrl.pathname;
    const errorRedirectRoute = [redirectUrl];
    const isErrorRedirectRoute = errorRedirectRoute.some((r) => pathname.startsWith(r));
    if (redirectCount > maxRedirects) {
        if (!isErrorRedirectRoute)
            return NextResponse.redirect(new URL(redirectUrl, req.url));
        return NextResponse.next();
    }
    res.cookies.set(cookieName, redirectCount.toString(), { maxAge: maxAge });
    return res;
}
