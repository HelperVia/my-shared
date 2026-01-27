import { CookiesOptions, CookieOption } from "next-auth";
type createAuthCookiesType = {
    prefix?: string;
    sessionToken?: CookieOption;
    callbackUrl?: CookieOption;
    csrfToken?: CookieOption;
    pkceCodeVerifier?: CookieOption;
    state?: CookieOption;
    nonce?: CookieOption;
};
export declare const createAuthCookies: (props?: createAuthCookiesType) => CookiesOptions;
export {};
//# sourceMappingURL=cookie.d.ts.map