/**
 * @copyright 2026 HelperVia / Yaşar Demirtaş
 * @license UNLICENSED - Proprietary and Confidential
 * @build-id 1769524312172-6vmzm
 * Unauthorized copying, distribution, or use is strictly prohibited.
 */

export const sortLocale = (array, order = "asc") => {
    if (!array)
        return undefined;
    return [...array].sort((a, b) => order === "asc" ? a.localeCompare(b) : b.localeCompare(a));
};
