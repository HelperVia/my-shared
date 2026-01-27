import { NextRequest, NextResponse } from "next/server";
type ApiHandler<C = Record<string, any>, R = NextRequest, T = any> = (req: R | T, context?: C) => Promise<NextResponse>;
export declare function ApiException<C extends Record<string, any> | undefined = Record<string, any>, R = NextRequest, T = any>(handler: ApiHandler<C, R, T>): (req: R | T, context?: C) => Promise<NextResponse<unknown>>;
export {};
//# sourceMappingURL=api.exception.d.ts.map