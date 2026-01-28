type WithOptionalContentType<T> = T & {
    "Content-Type"?: string;
};
type optionsType = {
    baseURL: string;
    Timeout?: number;
    Accept?: string;
    debug?: boolean;
};
export declare const createAxiosServer: <T>(headers: WithOptionalContentType<T> | undefined, options: optionsType) => Promise<import("axios").AxiosInstance>;
export {};
