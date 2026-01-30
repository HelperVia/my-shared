export declare class HelperViaLocalStorage {
    private static isAvailable;
    static get<T = any>(key: string, defaultValue?: T): T | null;
    static set<T = any>(key: string, value: T): boolean;
    static remove(key: string): boolean;
    static clear(): boolean;
    static has(key: string): boolean;
    static keys(): string[];
    static getAll(): Record<string, any>;
    static getSize(): number;
    static setWithExpiry<T = any>(key: string, value: T, expirationMs: number): boolean;
    static getWithExpiry<T = any>(key: string, defaultValue?: T): T | null;
    static setMultiple(items: Record<string, any>): boolean;
    static removeMultiple(keys: string[]): boolean;
    static removeByPrefix(prefix: string): number;
}
export declare const HVStorage: typeof HelperViaLocalStorage;
export default HelperViaLocalStorage;
