/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769774561492-srn5v
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

export class HelperViaLocalStorage {
    static isAvailable() {
        try {
            const test = "__localStorage_test__";
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    static get(key, defaultValue) {
        if (!this.isAvailable()) {
            console.warn("localStorage is not available");
            return defaultValue ?? null;
        }
        try {
            const item = localStorage.getItem(key);
            if (item === null) {
                return defaultValue ?? null;
            }
            try {
                return JSON.parse(item);
            }
            catch {
                return item;
            }
        }
        catch (error) {
            console.error(`Error getting localStorage item "${key}":`, error);
            return defaultValue ?? null;
        }
    }
    static set(key, value) {
        if (!this.isAvailable()) {
            console.warn("localStorage is not available");
            return false;
        }
        try {
            const stringValue = typeof value === "string" ? value : JSON.stringify(value);
            localStorage.setItem(key, stringValue);
            return true;
        }
        catch (error) {
            console.error(`Error setting localStorage item "${key}":`, error);
            return false;
        }
    }
    static remove(key) {
        if (!this.isAvailable()) {
            console.warn("localStorage is not available");
            return false;
        }
        try {
            localStorage.removeItem(key);
            return true;
        }
        catch (error) {
            console.error(`Error removing localStorage item "${key}":`, error);
            return false;
        }
    }
    static clear() {
        if (!this.isAvailable()) {
            console.warn("localStorage is not available");
            return false;
        }
        try {
            localStorage.clear();
            return true;
        }
        catch (error) {
            console.error("Error clearing localStorage:", error);
            return false;
        }
    }
    static has(key) {
        if (!this.isAvailable()) {
            return false;
        }
        return localStorage.getItem(key) !== null;
    }
    static keys() {
        if (!this.isAvailable()) {
            return [];
        }
        try {
            return Object.keys(localStorage);
        }
        catch (error) {
            console.error("Error getting localStorage keys:", error);
            return [];
        }
    }
    static getAll() {
        if (!this.isAvailable()) {
            return {};
        }
        try {
            const items = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    items[key] = this.get(key);
                }
            }
            return items;
        }
        catch (error) {
            console.error("Error getting all localStorage items:", error);
            return {};
        }
    }
    static getSize() {
        if (!this.isAvailable()) {
            return 0;
        }
        try {
            let total = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    const value = localStorage.getItem(key);
                    if (value) {
                        total += key.length + value.length;
                    }
                }
            }
            return total * 2;
        }
        catch (error) {
            console.error("Error calculating localStorage size:", error);
            return 0;
        }
    }
    static setWithExpiry(key, value, expirationMs) {
        const item = {
            value,
            expiry: Date.now() + expirationMs,
        };
        return this.set(key, item);
    }
    static getWithExpiry(key, defaultValue) {
        const item = this.get(key);
        if (!item) {
            return defaultValue ?? null;
        }
        if (Date.now() > item.expiry) {
            this.remove(key);
            return defaultValue ?? null;
        }
        return item.value;
    }
    static setMultiple(items) {
        try {
            Object.entries(items).forEach(([key, value]) => {
                this.set(key, value);
            });
            return true;
        }
        catch (error) {
            console.error("Error setting multiple localStorage items:", error);
            return false;
        }
    }
    static removeMultiple(keys) {
        try {
            keys.forEach((key) => {
                this.remove(key);
            });
            return true;
        }
        catch (error) {
            console.error("Error removing multiple localStorage items:", error);
            return false;
        }
    }
    static removeByPrefix(prefix) {
        if (!this.isAvailable()) {
            return 0;
        }
        try {
            const keys = this.keys().filter((key) => key.startsWith(prefix));
            keys.forEach((key) => this.remove(key));
            return keys.length;
        }
        catch (error) {
            console.error(`Error removing items with prefix "${prefix}":`, error);
            return 0;
        }
    }
}
export const HVStorage = HelperViaLocalStorage;
export default HelperViaLocalStorage;
