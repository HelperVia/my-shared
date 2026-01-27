import { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";
export declare const getAuthToken: (req: NextRequest, cookieName?: string, secret?: string) => Promise<JWT | null>;
export declare const getSessionCookieName: (authOptions: AuthOptions) => string | undefined;
export declare const getSession: (authOptions: AuthOptions) => Promise<import("next-auth").Session | null>;
//# sourceMappingURL=auth.d.ts.map