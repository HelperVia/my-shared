"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiException = ApiException;
const server_1 = require("next/server");
const error_normalize_1 = require("../../lib/error/error.normalize");
const axios_1 = __importDefault(require("axios"));
function ApiException(handler) {
    return async (req, context) => {
        try {
            const response = await handler(req, context);
            return response;
        }
        catch (e) {
            const errorData = e || {};
            if (process.env.NEXT_PUBLIC_DEBUG === "true") {
                errorData.debug =
                    errorData.debug ??
                        JSON.stringify({
                            stack: e?.stack,
                            response: e?.response?.data,
                            status: e?.response?.status,
                            config: e?.config,
                        }, null, 2);
            }
            if (axios_1.default.isAxiosError(e)) {
                return server_1.NextResponse.json(errorData, {
                    status: errorData?.status ?? 500,
                });
            }
            return server_1.NextResponse.json((0, error_normalize_1.toError)(errorData?.error, e?.status, errorData?.debug), {
                status: errorData?.status ?? 500,
            });
        }
    };
}
//# sourceMappingURL=api.exception.js.map