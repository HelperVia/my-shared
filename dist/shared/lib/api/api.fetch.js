/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769776137049-2869c
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
export async function apiFetch(input, init, options) {
    const { loading = false, loadingControl = false, baseUrl } = options;
    if (loading) {
        incrementActiveRequests();
    }
    try {
        const merged = {
            ...init,
            headers: {
                "Content-Type": "application/json",
                ...init.headers,
            },
        };
        const cleanInput = input.startsWith("/") ? input.slice(1) : input;
        const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        const url = `${cleanBase}/${cleanInput}`;
        const res = await fetch(url, merged);
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
