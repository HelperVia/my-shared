"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseServer = void 0;
const server_1 = require("next/server");
const ApiResponseServer = async (response) => {
    return server_1.NextResponse.json(response, {
        status: response?.status,
    });
};
exports.ApiResponseServer = ApiResponseServer;
//# sourceMappingURL=api.response.server.js.map