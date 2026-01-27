export declare let _activeRequests: number;
/**
 * Called by the provider to pass in the setState function.
 * @param {function(boolean)} fn - The setState function from the provider
 */
export declare function setGlobalLoaderSetter(fn: React.Dispatch<React.SetStateAction<boolean>>): void;
export declare function setUpdateActiveRequest(activeRequestCount: number): void;
/**
 * Internal helper to update global loading state based on active requests
 */
export declare function _updateLoadingState(): void;
export declare function decrementActiveRequests(): void;
export declare function incrementActiveRequests(): void;
/**
 * apiFetch: a wrapper around fetch to manage global loading
 * Usage: await apiFetch("/api/endpoint", { method: "POST", body: JSON.stringify(...) })
 */
export declare function apiFetch(input: string, init?: {
    headers?: Record<string | any, any>;
}, options?: {
    loading?: boolean;
    loadingControl?: boolean;
    headers?: Record<string | any, any>;
}): Promise<Response>;
//# sourceMappingURL=api.fetch.d.ts.map