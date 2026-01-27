/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769535335324-nf7n7l
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

import { ZodError } from "zod";
export const toError = (errorOrStatus, status, debug) => {
    if (typeof errorOrStatus === "number") {
        return getErrorSchema(undefined, errorOrStatus, debug);
    }
    const error = errorOrStatus;
    if (error instanceof ZodError) {
        const parsed = parserZodError(error);
        return getErrorSchema(parsed, status, debug);
    }
    if (looksLikeZodError(error)) {
        const parsed = parserZodError(error);
        return getErrorSchema(parsed, status ?? 400, debug);
    }
    if (error instanceof Error ||
        (error && typeof error === "object" && "message" in error)) {
        const msg = error instanceof Error ? error.message : String(error.message);
        return getErrorSchema(msg, status ?? 500, debug);
    }
    return getErrorSchema(error, status, debug);
};
export const getErrorSchema = (error, status, debug) => {
    return {
        success: false,
        error: error ?? "Something went wrong, please try again",
        debug: debug,
        status: status ?? 500,
    };
};
export function looksLikeZodError(obj) {
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
export const parserZodError = (error) => {
    const errors = {};
    let issues;
    if (error instanceof ZodError) {
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
