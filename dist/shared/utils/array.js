"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortLocale = void 0;
const sortLocale = (array, order = "asc") => {
    if (!array)
        return undefined;
    return [...array].sort((a, b) => order === "asc" ? a.localeCompare(b) : b.localeCompare(a));
};
exports.sortLocale = sortLocale;
//# sourceMappingURL=array.js.map