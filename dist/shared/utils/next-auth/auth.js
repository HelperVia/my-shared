"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.getSessionCookieName = exports.getAuthToken = void 0;
const jwt_1 = require("next-auth/jwt");
const next_auth_1 = require("next-auth");
const getAuthToken = (req, cookieName, secret) => {
    return (0, jwt_1.getToken)({
        req,
        secret: secret || process.env.NEXTAUTH_SECRET || "",
        ...(cookieName ? { cookieName: cookieName } : {}),
    });
};
exports.getAuthToken = getAuthToken;
const getSessionCookieName = (authOptions) => {
    return authOptions.cookies?.sessionToken?.name;
};
exports.getSessionCookieName = getSessionCookieName;
const getSession = async (authOptions) => {
    const session = await (0, next_auth_1.getServerSession)(authOptions);
    return session;
};
exports.getSession = getSession;
//# sourceMappingURL=auth.js.map