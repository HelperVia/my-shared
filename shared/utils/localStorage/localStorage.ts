/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗       │
 * │  ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗      │
 * │  ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝      │
 * │  ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗      │
 * │  ██║  ██║███████╗███████╗██║     ███████╗██║  ██║      │
 * │  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝      │
 * │                     VIA                                  │
 * ├─────────────────────────────────────────────────────────┤
 * │  Developer: Yaşar Demirtaş                              │
 * │  Email: ydemirtas1745@gmail.com                         │
 * │  Component: LocalStorage Utility                        │
 * │  Description: Type-safe localStorage wrapper            │
 * └─────────────────────────────────────────────────────────┘
 */

export class HelperViaLocalStorage {
  /**
   * Check if localStorage is available
   */
  private static isAvailable(): boolean {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get item from localStorage
   * @param key - Storage key
   * @param defaultValue - Default value if key doesn't exist
   * @returns Parsed value or default value
   */
  static get<T = any>(key: string, defaultValue?: T): T | null {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return defaultValue ?? null;
    }

    try {
      const item = localStorage.getItem(key);

      if (item === null) {
        return defaultValue ?? null;
      }

      // Try to parse JSON
      try {
        return JSON.parse(item) as T;
      } catch {
        // If not JSON, return as string
        return item as T;
      }
    } catch (error) {
      console.error(`Error getting localStorage item "${key}":`, error);
      return defaultValue ?? null;
    }
  }

  /**
   * Set item in localStorage
   * @param key - Storage key
   * @param value - Value to store (will be JSON.stringified)
   * @returns Success status
   */
  static set<T = any>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);

      localStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error(`Error setting localStorage item "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   * @param key - Storage key
   * @returns Success status
   */
  static remove(key: string): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage item "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all items from localStorage
   * @returns Success status
   */
  static clear(): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  /**
   * Check if key exists in localStorage
   * @param key - Storage key
   * @returns True if key exists
   */
  static has(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }

  /**
   * Get all keys from localStorage
   * @returns Array of all keys
   */
  static keys(): string[] {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error("Error getting localStorage keys:", error);
      return [];
    }
  }

  /**
   * Get all items from localStorage
   * @returns Object with all key-value pairs
   */
  static getAll(): Record<string, any> {
    if (!this.isAvailable()) {
      return {};
    }

    try {
      const items: Record<string, any> = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          items[key] = this.get(key);
        }
      }

      return items;
    } catch (error) {
      console.error("Error getting all localStorage items:", error);
      return {};
    }
  }

  /**
   * Get localStorage size in bytes (approximate)
   * @returns Size in bytes
   */
  static getSize(): number {
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

      // Multiply by 2 because JavaScript strings are UTF-16
      return total * 2;
    } catch (error) {
      console.error("Error calculating localStorage size:", error);
      return 0;
    }
  }

  /**
   * Set item with expiration time
   * @param key - Storage key
   * @param value - Value to store
   * @param expirationMs - Expiration time in milliseconds
   * @returns Success status
   */
  static setWithExpiry<T = any>(
    key: string,
    value: T,
    expirationMs: number,
  ): boolean {
    const item = {
      value,
      expiry: Date.now() + expirationMs,
    };

    return this.set(key, item);
  }

  /**
   * Get item with expiration check
   * @param key - Storage key
   * @param defaultValue - Default value if expired or doesn't exist
   * @returns Value or default value
   */
  static getWithExpiry<T = any>(key: string, defaultValue?: T): T | null {
    const item = this.get<{ value: T; expiry: number }>(key);

    if (!item) {
      return defaultValue ?? null;
    }

    // Check if expired
    if (Date.now() > item.expiry) {
      this.remove(key);
      return defaultValue ?? null;
    }

    return item.value;
  }

  /**
   * Set multiple items at once
   * @param items - Object with key-value pairs
   * @returns Success status
   */
  static setMultiple(items: Record<string, any>): boolean {
    try {
      Object.entries(items).forEach(([key, value]) => {
        this.set(key, value);
      });
      return true;
    } catch (error) {
      console.error("Error setting multiple localStorage items:", error);
      return false;
    }
  }

  /**
   * Remove multiple items at once
   * @param keys - Array of keys to remove
   * @returns Success status
   */
  static removeMultiple(keys: string[]): boolean {
    try {
      keys.forEach((key) => {
        this.remove(key);
      });
      return true;
    } catch (error) {
      console.error("Error removing multiple localStorage items:", error);
      return false;
    }
  }

  /**
   * Remove all items with a specific prefix
   * @param prefix - Key prefix
   * @returns Number of items removed
   */
  static removeByPrefix(prefix: string): number {
    if (!this.isAvailable()) {
      return 0;
    }

    try {
      const keys = this.keys().filter((key) => key.startsWith(prefix));
      keys.forEach((key) => this.remove(key));
      return keys.length;
    } catch (error) {
      console.error(`Error removing items with prefix "${prefix}":`, error);
      return 0;
    }
  }
}

// Alias for shorter usage
export const HVStorage = HelperViaLocalStorage;

export default HelperViaLocalStorage;
