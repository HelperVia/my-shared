import { NextRequest, NextResponse } from "next/server";
export declare function detectRouteLoop(req: NextRequest, res: NextResponse, options?: {
    cookieName?: string;
    maxRedirects?: number;
    maxAge?: number;
    redirectUrl?: string;
}): Promise<NextResponse<unknown>>;
//# sourceMappingURL=loopDetector.d.ts.map