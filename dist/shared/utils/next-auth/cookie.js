/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769537849211-4xs6l5
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

const DEFAULT_COOKIE_PREFIX = "yd";
export const createAuthCookies = (props = {}) => {
    const { prefix = process.env.NEXT_PUBLIC_APP_PREFIX ?? DEFAULT_COOKIE_PREFIX, sessionToken, callbackUrl, csrfToken, pkceCodeVerifier, state, nonce, } = props;
    return {
        sessionToken: sessionToken ?? {
            name: `${prefix}-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        callbackUrl: callbackUrl ?? {
            name: `${prefix}.callback-url`,
            options: {
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        csrfToken: csrfToken ?? {
            name: `${prefix}.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        pkceCodeVerifier: pkceCodeVerifier ?? {
            name: `${prefix}.code_verifier`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                maxAge: 900,
            },
        },
        state: state ?? {
            name: `${prefix}.state`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
                maxAge: 900,
            },
        },
        nonce: nonce ?? {
            name: `${prefix}.nonce`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    };
};
