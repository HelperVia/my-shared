export declare let _activeRequests: number;
export declare function setGlobalLoaderSetter(fn: React.Dispatch<React.SetStateAction<boolean>>): void;
export declare function setUpdateActiveRequest(activeRequestCount: number): void;
export declare function _updateLoadingState(): void;
export declare function decrementActiveRequests(): void;
export declare function incrementActiveRequests(): void;
export declare function apiFetch(input: string, init?: {
    headers?: Record<string | any, any>;
}, options?: {
    loading?: boolean;
    loadingControl?: boolean;
    headers?: Record<string | any, any>;
}): Promise<Response>;
