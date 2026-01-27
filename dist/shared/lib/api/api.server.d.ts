type WithOptionalContentType<T> = T & {
    "Content-Type"?: string;
};
type optionsType = {
    baseURL?: string;
    Timeout?: number;
    Accept?: string;
};
export declare const createAxiosServer: <T>(headers?: WithOptionalContentType<T>, options?: optionsType) => Promise<import("axios").AxiosInstance>;
export {};
//# sourceMappingURL=api.server.d.ts.map