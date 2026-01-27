"use strict";
"use server";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAxiosServer = void 0;
const axios_1 = __importDefault(require("axios"));
const error_normalize_1 = require("../../lib/error/error.normalize");
const createAxiosServer = async (headers = {}, options) => {
    const AxiosServer = axios_1.default.create({
        baseURL: options?.baseURL || process.env.NEXT_PUBLIC_REACT_APP_SERVICE || "",
        timeout: options?.Timeout ?? 100000,
        headers: {
            Accept: options?.Accept || "application/json",
        },
    });
    AxiosServer.interceptors.request.use(async (conf) => {
        const newConf = { ...conf };
        if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
                newConf.headers.set(key, String(value));
            });
        }
        newConf.headers["Content-Type"] =
            headers["Content-Type"] || "application/x-www-form-urlencoded";
        newConf.params = conf.params || {};
        return newConf;
    });
    AxiosServer.interceptors.response.use((response) => {
        if (typeof response.data !== "object" ||
            response.data === null ||
            Array.isArray(response.data)) {
            return (0, error_normalize_1.toError)(response.status);
        }
        return response.data;
    }, (error) => {
        let status = error.response?.status || 500;
        if (status >= 400 && status < 500) {
            if (typeof error.response.data !== "object" ||
                error.response.data === null ||
                Array.isArray(error.response.data)) {
                return (0, error_normalize_1.toError)(status);
            }
            return Promise.reject((0, error_normalize_1.toError)(error.response?.data?.error, status, process.env.NEXT_PUBLIC_DEBUG === "true"
                ? JSON.stringify(error.response?.data?.exception)
                : undefined));
        }
        return Promise.reject((0, error_normalize_1.toError)(status));
    });
    return AxiosServer;
};
exports.createAxiosServer = createAxiosServer;
//# sourceMappingURL=api.server.js.map