"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserZodError = exports.getErrorSchema = exports.toError = void 0;
exports.looksLikeZodError = looksLikeZodError;
const zod_1 = require("zod");
const toError = (errorOrStatus, status, debug) => {
    if (typeof errorOrStatus === "number") {
        return (0, exports.getErrorSchema)(undefined, errorOrStatus, debug);
    }
    const error = errorOrStatus;
    if (error instanceof zod_1.ZodError) {
        const parsed = (0, exports.parserZodError)(error);
        return (0, exports.getErrorSchema)(parsed, status, debug);
    }
    if (looksLikeZodError(error)) {
        const parsed = (0, exports.parserZodError)(error);
        return (0, exports.getErrorSchema)(parsed, status ?? 400, debug);
    }
    if (error instanceof Error ||
        (error && typeof error === "object" && "message" in error)) {
        const msg = error instanceof Error ? error.message : String(error.message);
        return (0, exports.getErrorSchema)(msg, status ?? 500, debug);
    }
    return (0, exports.getErrorSchema)(error, status, debug);
};
exports.toError = toError;
const getErrorSchema = (error, status, debug) => {
    return {
        success: false,
        error: error ?? "Something went wrong, please try again",
        debug: debug,
        status: status ?? 500,
    };
};
exports.getErrorSchema = getErrorSchema;
function looksLikeZodError(obj) {
    if (!obj || typeof obj !== "object")
        return false;
    const anyObj = obj;
    if (!Array.isArray(anyObj.issues))
        return false;
    return anyObj.issues.every((it) => {
        if (!it || typeof it !== "object")
            return false;
        const hasMessage = typeof it.message === "string";
        const pathIsOk = it.path === undefined || Array.isArray(it.path);
        return hasMessage && pathIsOk;
    });
}
const parserZodError = (error) => {
    const errors = {};
    let issues;
    if (error instanceof zod_1.ZodError) {
        issues = error.issues;
    }
    else if (looksLikeZodError(error)) {
        issues = error.issues;
    }
    else {
        return errors;
    }
    if (!issues)
        return errors;
    issues.forEach((v, k) => {
        errors[k] = v.message;
    });
    return errors;
};
exports.parserZodError = parserZodError;
//# sourceMappingURL=error.normalize.js.map