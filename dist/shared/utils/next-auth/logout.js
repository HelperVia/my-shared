"use strict";
"use server";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = void 0;
const headers_1 = require("next/headers");
const auth_1 = require("./auth");
const Logout = async (authOptions) => {
    const cookie = await (0, headers_1.cookies)();
    const cookieName = (0, auth_1.getSessionCookieName)(authOptions) ?? "";
    cookie.delete(cookieName);
};
exports.Logout = Logout;
//# sourceMappingURL=logout.js.map