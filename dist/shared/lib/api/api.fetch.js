/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769537849199-e783u
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

export let _activeRequests = 1;
let _setLoading = null;
export function setGlobalLoaderSetter(fn) {
    _setLoading = fn;
}
export function setUpdateActiveRequest(activeRequestCount) {
    _activeRequests = activeRequestCount;
    _updateLoadingState();
}
export function _updateLoadingState() {
    if (typeof _setLoading !== "function")
        return;
    _setLoading(_activeRequests > 0);
}
export function decrementActiveRequests() {
    _activeRequests = Math.max(0, _activeRequests - 1);
    _updateLoadingState();
}
export function incrementActiveRequests() {
    _activeRequests = Math.max(0, _activeRequests + 1);
    _updateLoadingState();
}
export async function apiFetch(input, init = {}, options = {}) {
    const { loading = false, loadingControl = false, headers = {} } = options;
    if (loading) {
        incrementActiveRequests();
    }
    try {
        const defaultHeaders = headers ?? {
            "Content-Type": "application/json",
        };
        const merged = init && init.headers
            ? { ...init, headers: { ...defaultHeaders, ...init.headers } }
            : { ...init, headers: defaultHeaders };
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/" + input, merged);
        return res;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (loading && !loadingControl) {
            decrementActiveRequests();
        }
    }
}
