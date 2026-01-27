"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectRouteLoop = detectRouteLoop;
const server_1 = require("next/server");
const COOKIE = "X-Redirect-Count";
async function detectRouteLoop(req, res, options = {}) {
    const { cookieName = COOKIE, maxRedirects = 3, maxAge = 3, redirectUrl = "/error/redirect", } = options;
    let redirectCount = Number(req.cookies.get(cookieName)?.value ?? 0);
    redirectCount++;
    const pathname = req.nextUrl.pathname;
    const errorRedirectRoute = [redirectUrl];
    const isErrorRedirectRoute = errorRedirectRoute.some((r) => pathname.startsWith(r));
    if (redirectCount > maxRedirects) {
        if (!isErrorRedirectRoute)
            return server_1.NextResponse.redirect(new URL(redirectUrl, req.url));
        return server_1.NextResponse.next();
    }
    res.cookies.set(cookieName, redirectCount.toString(), { maxAge: maxAge });
    return res;
}
//# sourceMappingURL=loopDetector.js.map