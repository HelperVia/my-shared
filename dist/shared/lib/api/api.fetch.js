"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._activeRequests = void 0;
exports.setGlobalLoaderSetter = setGlobalLoaderSetter;
exports.setUpdateActiveRequest = setUpdateActiveRequest;
exports._updateLoadingState = _updateLoadingState;
exports.decrementActiveRequests = decrementActiveRequests;
exports.incrementActiveRequests = incrementActiveRequests;
exports.apiFetch = apiFetch;
exports._activeRequests = 1; // Number of ongoing API requests
let _setLoading = null; // Setter function for global loading state
/**
 * Called by the provider to pass in the setState function.
 * @param {function(boolean)} fn - The setState function from the provider
 */
function setGlobalLoaderSetter(fn) {
    _setLoading = fn;
}
function setUpdateActiveRequest(activeRequestCount) {
    exports._activeRequests = activeRequestCount;
    _updateLoadingState();
}
/**
 * Internal helper to update global loading state based on active requests
 */
function _updateLoadingState() {
    if (typeof _setLoading !== "function")
        return;
    _setLoading(exports._activeRequests > 0);
}
function decrementActiveRequests() {
    exports._activeRequests = Math.max(0, exports._activeRequests - 1);
    _updateLoadingState();
}
function incrementActiveRequests() {
    exports._activeRequests = Math.max(0, exports._activeRequests + 1);
    _updateLoadingState();
}
/**
 * apiFetch: a wrapper around fetch to manage global loading
 * Usage: await apiFetch("/api/endpoint", { method: "POST", body: JSON.stringify(...) })
 */
async function apiFetch(input, init = {}, options = {}) {
    const { loading = false, loadingControl = false, headers = {} } = options;
    if (loading) {
        incrementActiveRequests();
    }
    try {
        // Add default headers (Content-Type JSON)
        const defaultHeaders = headers ?? {
            "Content-Type": "application/json",
        };
        const merged = init && init.headers
            ? { ...init, headers: { ...defaultHeaders, ...init.headers } }
            : { ...init, headers: defaultHeaders };
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/" + input, merged);
        // Request may succeed or fail, finally block will decrease counter
        return res;
    }
    catch (err) {
        // Rethrow the error but still decrement the activeRequests counter
        throw err;
    }
    finally {
        if (loading && !loadingControl) {
            decrementActiveRequests();
        }
    }
}
//# sourceMappingURL=api.fetch.js.map