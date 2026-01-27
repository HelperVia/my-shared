import { ErrorPayload, ErrorEnvelope } from "../../types/error/error";
export declare const toError: (errorOrStatus?: unknown, status?: number, debug?: string) => ErrorEnvelope;
export declare const getErrorSchema: (error?: ErrorPayload, status?: number, debug?: string) => ErrorEnvelope;
export declare function looksLikeZodError(obj: unknown): obj is {
    issues: Array<{
        path?: any[];
        message: string;
    }>;
};
export declare const parserZodError: (error: unknown) => ErrorPayload;
//# sourceMappingURL=error.normalize.d.ts.map